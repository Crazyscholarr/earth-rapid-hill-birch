import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, type RefObject } from "react";
import {
  BoxGeometry,
  CapsuleGeometry,
  CylinderGeometry,
  DoubleSide,
  ExtrudeGeometry,
  LatheGeometry,
  Shape,
  SphereGeometry,
  TorusGeometry,
  Vector2,
  type BufferGeometry,
  type CanvasTexture,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  type MeshStandardMaterial,
} from "three";
import { mergeParts, placeGeo } from "@/game/geo";
import { sim } from "@/game/sim";
import {
  createAoShadowTexture,
  createDashboardTexture,
  createMudTexture,
  createPlateTexture,
  createTireTreadTexture,
} from "@/game/textures";

type CarStyle = "sedan" | "ev" | "devil";

function buildFrontClipGeo(style: CarStyle) {
  const s = new Shape();
  // Front section only: X from cowl (+0.54) to front bumper (+1.86) -> leaves cabin hollow!
  s.moveTo(0.54, 0.25);
  s.lineTo(0.8, 0.25);
  s.absarc(1.14, 0.3, 0.335, Math.PI, 0, true);
  s.lineTo(1.78, 0.27);
  s.quadraticCurveTo(1.9, 0.42, 1.84, 0.62);
  if (style === "ev") {
    s.quadraticCurveTo(1.42, 0.76, 0.54, 0.79);
  } else if (style === "devil") {
    s.lineTo(0.54, 0.8);
  } else {
    s.quadraticCurveTo(1.38, 0.74, 0.54, 0.78);
  }
  s.closePath();

  const geo = new ExtrudeGeometry(s, {
    depth: 1.48,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.038,
    bevelSegments: 2,
    curveSegments: 12,
  });
  geo.translate(0, 0, -0.74);
  geo.rotateY(-Math.PI / 2);
  return geo;
}

function buildRearClipGeo(style: CarStyle) {
  const s = new Shape();
  // Rear trunk & quarter panels only: X from rear bumper (-1.84) to rear cabin bulkhead (-0.84)
  s.moveTo(-1.82, 0.29);
  s.lineTo(-1.44, 0.28);
  s.absarc(-1.1, 0.3, 0.335, Math.PI, 0, true);
  s.lineTo(-0.84, 0.25);
  s.lineTo(-0.84, 0.8);
  if (style === "ev") {
    s.lineTo(-1.3, 0.85);
    s.quadraticCurveTo(-1.68, 0.84, -1.82, 0.7);
  } else if (style === "devil") {
    s.quadraticCurveTo(-1.28, 0.88, -1.84, 0.8);
  } else {
    s.lineTo(-1.26, 0.81);
    s.quadraticCurveTo(-1.66, 0.79, -1.82, 0.67);
  }
  s.closePath();

  const geo = new ExtrudeGeometry(s, {
    depth: 1.48,
    bevelEnabled: true,
    bevelThickness: 0.045,
    bevelSize: 0.038,
    bevelSegments: 2,
    curveSegments: 12,
  });
  geo.translate(0, 0, -0.74);
  geo.rotateY(-Math.PI / 2);
  return geo;
}

function buildRoofCapGeo(style: CarStyle) {
  const s = new Shape();
  const frontX = style === "ev" ? 0.34 : 0.31;
  const backX = style === "ev" ? -1.14 : -0.98;
  s.moveTo(backX, 1.38);
  s.lineTo(frontX, 1.38);
  s.quadraticCurveTo((frontX + backX) / 2, 1.45, backX, 1.38);
  s.closePath();

  const geo = new ExtrudeGeometry(s, {
    depth: 1.28,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.028,
    bevelSegments: 2,
    curveSegments: 10,
  });
  geo.translate(0, 0, -0.64);
  geo.rotateY(-Math.PI / 2);
  return geo;
}

function buildPaintedBodyGeo(style: CarStyle): BufferGeometry {
  const parts: BufferGeometry[] = [
    placeGeo(buildFrontClipGeo(style)),
    placeGeo(buildRearClipGeo(style)),
    placeGeo(buildRoofCapGeo(style)),
  ];

  // Thin Left (+X, player side) & Right (-X, passenger side) Doors -> Hollow Cabin in between!
  for (const sx of [-0.745, 0.745]) {
    // Outer sculpted door skin (y: 0.25 -> 0.77, z: -0.86 -> +0.56)
    parts.push(placeGeo(new BoxGeometry(0.072, 0.52, 1.42), [sx, 0.51, -0.15]));
    // Subtle upper door shoulder chamfer
    parts.push(placeGeo(new BoxGeometry(0.055, 0.05, 1.42), [sx * 0.985, 0.755, -0.15], [0, 0, sx > 0 ? 0.22 : -0.22]));
  }

  // Hood Sculpted Power-Dome Crease Lines
  for (const hx of [-0.32, 0.32]) {
    parts.push(placeGeo(new BoxGeometry(0.04, 0.018, 1.02), [hx, 0.74, 1.18], [0.12, 0, 0]));
  }

  // Subtle Rear Trunk Lip Spoiler
  parts.push(placeGeo(new BoxGeometry(1.42, 0.035, 0.08), [0, 0.76, -1.78], [-0.2, 0, 0]));

  // Roof Side Drip Rails, Front A-Pillars & Rear C-Pillars
  for (const sx of [-0.655, 0.655]) {
    parts.push(placeGeo(new BoxGeometry(0.052, 0.048, 1.3), [sx, 1.375, -0.33]));
    parts.push(placeGeo(new BoxGeometry(0.052, 0.72, 0.064), [sx, 1.085, 0.52], [-0.66, 0, 0]));
    parts.push(placeGeo(new BoxGeometry(0.056, 0.7, 0.088), [sx, 1.09, -1.15], [0.64, 0, 0]));
  }

  // Passenger-Side Fixed Exterior Mirror Housing (Driver side is removable!)
  parts.push(placeGeo(new SphereGeometry(0.066, 12, 8), [-0.86, 0.85, 0.52], [0, 0, 0], [1.22, 0.76, 0.7]));

  return mergeParts(parts);
}

function buildDarkChassisAndCabinGeo(): BufferGeometry {
  const parts: BufferGeometry[] = [];

  // 1. Recessed Hollow Cabin Floor Pan (y = 0.28!) + Front & Rear Bulkheads + Dark Roof Headliner
  parts.push(placeGeo(new BoxGeometry(1.42, 0.06, 1.48), [0, 0.28, -0.15]));
  parts.push(placeGeo(new BoxGeometry(0.56, 0.015, 0.52), [0.34, 0.315, 0.22])); // Ribbed rubber driver mat
  parts.push(placeGeo(new BoxGeometry(1.24, 0.025, 1.26), [0, 1.355, -0.33])); // Dark interior roof headliner
  // Sun visors + Rearview Mirror housing
  parts.push(placeGeo(new BoxGeometry(0.36, 0.015, 0.11), [0.32, 1.335, 0.22], [0.1, 0, 0]));
  parts.push(placeGeo(new BoxGeometry(0.36, 0.015, 0.11), [-0.32, 1.335, 0.22], [0.1, 0, 0]));
  parts.push(placeGeo(new CylinderGeometry(0.008, 0.008, 0.07, 6), [0, 1.32, 0.26], [0.25, 0, 0]));
  parts.push(placeGeo(new BoxGeometry(0.18, 0.048, 0.024), [0, 1.28, 0.25], [0, 0.18, 0]));

  // 2. Sculpted Inner Door Trim Cards (Left & Right) with Padded Armrests & Speaker Grilles
  for (const sx of [-1, 1]) {
    const ix = sx * 0.698;
    parts.push(placeGeo(new BoxGeometry(0.024, 0.46, 1.38), [ix, 0.52, -0.15]));
    // Interior padded door armrest
    parts.push(placeGeo(new BoxGeometry(0.058, 0.045, 0.52), [ix - sx * 0.024, 0.56, 0.12]));
    parts.push(placeGeo(new BoxGeometry(0.052, 0.042, 0.44), [ix - sx * 0.022, 0.56, -0.52]));
    // Round lower door speaker grille
    parts.push(
      placeGeo(new CylinderGeometry(0.068, 0.068, 0.018, 12), [ix - sx * 0.014, 0.41, 0.36], [0, 0, Math.PI / 2]),
    );
    // Window sill black rubber weatherstrip
    parts.push(placeGeo(new BoxGeometry(0.076, 0.022, 1.42), [sx * 0.745, 0.778, -0.15]));
  }

  // 3. Center Transmission Tunnel, Storage Armrest, Gear Shifter, Handbrake & Coffee Cup!
  parts.push(placeGeo(new BoxGeometry(0.22, 0.18, 0.88), [0, 0.38, 0.12]));
  parts.push(placeGeo(new BoxGeometry(0.2, 0.08, 0.32), [0, 0.5, -0.16])); // Padded center armrest lid
  parts.push(placeGeo(new CylinderGeometry(0.045, 0.062, 0.06, 10), [0, 0.49, 0.26])); // Leather shifter boot
  parts.push(placeGeo(new CylinderGeometry(0.036, 0.028, 0.09, 10), [0.03, 0.51, 0.08])); // To-go coffee cup in cupholder
  parts.push(placeGeo(new BoxGeometry(0.026, 0.028, 0.16), [0.06, 0.5, -0.02], [-0.28, 0, 0])); // Handbrake lever

  // 4. Driver Footwell Accelerator & Brake Pedals
  parts.push(placeGeo(new BoxGeometry(0.045, 0.09, 0.015), [0.26, 0.39, 0.48], [-0.45, 0, 0]));
  parts.push(placeGeo(new BoxGeometry(0.075, 0.065, 0.015), [0.37, 0.39, 0.46], [-0.45, 0, 0]));

  // 5. Sculpted Dashboard Shell + Driver Gauge Binnacle Hood
  parts.push(placeGeo(new BoxGeometry(1.34, 0.26, 0.28), [0, 0.65, 0.46]));
  parts.push(placeGeo(new CylinderGeometry(0.16, 0.16, 0.28, 12, 1, false, 0, Math.PI), [0.33, 0.77, 0.44], [0, 0, Math.PI / 2]));
  // Steering Column + Indicator Stalks + 3-Spoke Steering Wheel Rim
  parts.push(placeGeo(new CylinderGeometry(0.028, 0.036, 0.24, 10), [0.33, 0.71, 0.34], [1.15, 0, 0]));
  parts.push(placeGeo(new CylinderGeometry(0.007, 0.007, 0.18, 6), [0.33, 0.72, 0.3], [0, 0, Math.PI / 2]));
  parts.push(placeGeo(new TorusGeometry(0.142, 0.018, 8, 20), [0.33, 0.75, 0.24], [0.42, 0, 0]));
  parts.push(placeGeo(new CylinderGeometry(0.046, 0.046, 0.028, 12), [0.33, 0.75, 0.24], [Math.PI / 2 + 0.42, 0, 0]));
  parts.push(placeGeo(new BoxGeometry(0.26, 0.024, 0.018), [0.33, 0.75, 0.24], [0.42, 0, 0]));
  parts.push(placeGeo(new BoxGeometry(0.026, 0.13, 0.018), [0.33, 0.69, 0.265], [0.42, 0, 0]));

  // 6. Middle Gloss-Black B-Pillars + A/C Pillar Inner Trim
  for (const sx of [-0.68, 0.68]) {
    parts.push(placeGeo(new BoxGeometry(0.044, 0.58, 0.092), [sx, 1.08, -0.18]));
  }

  // 7. Wheelhouse Inner Liners, Fender Flares, Mudflaps, Side Skirts & Door Shut-Lines!
  for (const [wx, wz] of [
    [-0.58, 1.14],
    [0.58, 1.14],
    [-0.58, -1.1],
    [0.58, -1.1],
  ] as const) {
    parts.push(placeGeo(new CylinderGeometry(0.328, 0.328, 0.42, 16, 1, false, 0, Math.PI), [wx, 0.31, wz], [0, 0, Math.PI / 2]));
  }
  for (const [fx, fz] of [
    [-0.782, 1.14],
    [0.782, 1.14],
    [-0.782, -1.1],
    [0.782, -1.1],
  ] as const) {
    parts.push(placeGeo(new TorusGeometry(0.335, 0.02, 6, 18, Math.PI), [fx, 0.3, fz], [0, Math.PI / 2, 0]));
    // Mudflap behind wheel
    parts.push(placeGeo(new BoxGeometry(0.14, 0.14, 0.018), [fx > 0 ? 0.7 : -0.7, 0.2, fz - 0.33]));
  }

  for (const sx of [-1, 1]) {
    const ox = sx * 0.783;
    // Lower Rocker Side Skirt + Side Rub Strip
    parts.push(placeGeo(new BoxGeometry(0.045, 0.055, 1.56), [sx * 0.76, 0.26, 0.02]));
    parts.push(placeGeo(new BoxGeometry(0.016, 0.024, 1.44), [ox, 0.45, -0.14]));
    // Crisp Vertical Automotive Door Panel Shut-Lines (Front Fender, B-Pillar, Rear Door)
    parts.push(placeGeo(new BoxGeometry(0.008, 0.5, 0.012), [ox, 0.52, 0.54]));
    parts.push(placeGeo(new BoxGeometry(0.008, 0.5, 0.012), [ox, 0.52, -0.18]));
    parts.push(placeGeo(new BoxGeometry(0.008, 0.4, 0.012), [ox, 0.57, -0.82]));
    // Recessed Black Door Handle Cups
    parts.push(placeGeo(new BoxGeometry(0.01, 0.042, 0.13), [ox, 0.69, -0.04]));
    parts.push(placeGeo(new BoxGeometry(0.01, 0.042, 0.13), [ox, 0.7, -0.54]));
  }

  // Front Bumper Splitter, Grille Backing, Rear Bumper Diffuser & Windshield Wipers
  parts.push(placeGeo(new BoxGeometry(1.56, 0.12, 0.09), [0, 0.26, 1.88]));
  parts.push(placeGeo(new BoxGeometry(0.84, 0.2, 0.04), [0, 0.47, 1.86]));
  parts.push(placeGeo(new BoxGeometry(1.56, 0.14, 0.1), [0, 0.28, -1.85]));
  parts.push(placeGeo(new CylinderGeometry(0.008, 0.008, 0.44, 6), [-0.24, 0.82, 0.68], [0, 0.15, Math.PI / 2 - 0.1]));
  parts.push(placeGeo(new CylinderGeometry(0.008, 0.008, 0.44, 6), [0.24, 0.82, 0.68], [0, 0.15, Math.PI / 2 - 0.1]));
  // Passenger Mirror Stem
  parts.push(placeGeo(new BoxGeometry(0.08, 0.032, 0.055), [-0.78, 0.83, 0.54], [0, 0, 0.42]));

  return mergeParts(parts);
}

function buildInteriorSeatsGeo(): BufferGeometry {
  const parts: BufferGeometry[] = [];
  // Contoured Bolstered Front Bucket Seats (Driver +0.33, Passenger -0.33)
  for (const sx of [-0.33, 0.33]) {
    // Base cushion + side thigh bolsters
    parts.push(placeGeo(new BoxGeometry(0.38, 0.09, 0.42), [sx, 0.36, 0.0]));
    parts.push(placeGeo(new CapsuleGeometry(0.038, 0.34, 4, 8), [sx - 0.18, 0.4, 0.0], [Math.PI / 2, 0, 0]));
    parts.push(placeGeo(new CapsuleGeometry(0.038, 0.34, 4, 8), [sx + 0.18, 0.4, 0.0], [Math.PI / 2, 0, 0]));
    // Reclined backrest + side shoulder bolsters
    parts.push(placeGeo(new BoxGeometry(0.38, 0.48, 0.1), [sx, 0.64, -0.22], [-0.2, 0, 0]));
    parts.push(placeGeo(new CapsuleGeometry(0.04, 0.4, 4, 8), [sx - 0.18, 0.64, -0.2], [-0.2, 0, 0]));
    parts.push(placeGeo(new CapsuleGeometry(0.04, 0.4, 4, 8), [sx + 0.18, 0.64, -0.2], [-0.2, 0, 0]));
    // Sculpted Headrest
    parts.push(placeGeo(new CapsuleGeometry(0.062, 0.13, 6, 8), [sx, 0.99, -0.29], [0, 0, Math.PI / 2]));
  }
  // Rear 3-Passenger Bench Cushion, Backrest, Headrests & Rear Parcel Shelf
  parts.push(placeGeo(new BoxGeometry(1.32, 0.11, 0.4), [0, 0.38, -0.6]));
  parts.push(placeGeo(new BoxGeometry(1.32, 0.46, 0.12), [0, 0.64, -0.8], [-0.16, 0, 0]));
  parts.push(placeGeo(new CapsuleGeometry(0.052, 0.12, 4, 8), [-0.36, 0.94, -0.85], [0, 0, Math.PI / 2]));
  parts.push(placeGeo(new CapsuleGeometry(0.052, 0.12, 4, 8), [0.36, 0.94, -0.85], [0, 0, Math.PI / 2]));
  parts.push(placeGeo(new BoxGeometry(1.3, 0.03, 0.34), [0, 0.79, -0.98]));

  return mergeParts(parts);
}

function buildChromeDetailsGeo(isEv: boolean): BufferGeometry {
  const parts: BufferGeometry[] = [];
  // 4 Exterior Chrome Door Handles + Keyhole + 2 Interior Chrome Latches
  for (const sx of [-1, 1]) {
    parts.push(placeGeo(new CapsuleGeometry(0.012, 0.1, 4, 8), [sx * 0.795, 0.69, -0.04], [Math.PI / 2, 0, 0]));
    parts.push(placeGeo(new CapsuleGeometry(0.012, 0.1, 4, 8), [sx * 0.795, 0.7, -0.54], [Math.PI / 2, 0, 0]));
    parts.push(placeGeo(new BoxGeometry(0.015, 0.022, 0.065), [sx * 0.675, 0.63, 0.24]));
    // Twin Chrome Headrest Posts
    parts.push(placeGeo(new CylinderGeometry(0.008, 0.008, 0.1, 6), [sx * 0.33 - 0.055, 0.91, -0.27]));
    parts.push(placeGeo(new CylinderGeometry(0.008, 0.008, 0.1, 6), [sx * 0.33 + 0.055, 0.91, -0.27]));
  }
  // Gear Shifter Shaft + Chrome Ball Knob
  parts.push(placeGeo(new CylinderGeometry(0.008, 0.01, 0.11, 8), [0, 0.56, 0.25], [0.22, 0, 0]));
  parts.push(placeGeo(new SphereGeometry(0.024, 10, 8), [0, 0.62, 0.265]));
  // Interior Rearview Mirror Reflective Face
  parts.push(placeGeo(new BoxGeometry(0.168, 0.038, 0.006), [0, 1.28, 0.238], [0, 0.18, 0]));

  if (!isEv) {
    // 3 Chrome Front Grille Bars + Dual Beveled Exhaust Pipes
    for (const yy of [0.41, 0.47, 0.53]) {
      parts.push(placeGeo(new BoxGeometry(0.78, 0.016, 0.02), [0, yy, 1.882]));
    }
    for (const ex of [-0.52, 0.52]) {
      parts.push(placeGeo(new CylinderGeometry(0.036, 0.04, 0.18, 12), [ex, 0.22, -1.9], [Math.PI / 2, 0, 0]));
    }
  }
  return mergeParts(parts);
}

function buildTireGeo() {
  const pts = [
    new Vector2(0.185, -0.095),
    new Vector2(0.278, -0.102),
    new Vector2(0.3, -0.078),
    new Vector2(0.3, 0.078),
    new Vector2(0.278, 0.102),
    new Vector2(0.185, 0.095),
    new Vector2(0.185, -0.095),
  ];
  const geo = new LatheGeometry(pts, 24);
  geo.rotateZ(Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

function buildWheelAlloyRimGeo(): BufferGeometry {
  // Bright machined alloy outer rim, 5 split twin-spokes, hubcap & lug nuts (backed by dark barrel for high contrast!)
  const parts: BufferGeometry[] = [
    placeGeo(new TorusGeometry(0.182, 0.02, 8, 22), [0.062, 0, 0], [0, Math.PI / 2, 0]),
    placeGeo(new CylinderGeometry(0.048, 0.048, 0.028, 12), [0.068, 0, 0], [0, 0, Math.PI / 2]),
    placeGeo(new CylinderGeometry(0.006, 0.006, 0.026, 6), [0.062, -0.155, 0.03], [0, 0, -0.4]),
  ];
  for (let i = 0; i < 5; i++) {
    const a = (i * Math.PI * 2) / 5;
    parts.push(
      placeGeo(new BoxGeometry(0.018, 0.155, 0.02), [0.066, Math.cos(a + 0.11) * 0.102, Math.sin(a + 0.11) * 0.102], [a, 0, 0]),
    );
    parts.push(
      placeGeo(new BoxGeometry(0.018, 0.155, 0.02), [0.066, Math.cos(a - 0.11) * 0.102, Math.sin(a - 0.11) * 0.102], [a, 0, 0]),
    );
    parts.push(
      placeGeo(
        new CylinderGeometry(0.008, 0.008, 0.016, 6),
        [0.078, Math.cos(a) * 0.03, Math.sin(a) * 0.03],
        [0, 0, Math.PI / 2],
      ),
    );
  }
  return mergeParts(parts);
}

export function LiveCar() {
  const ref = useRef<Group>(null);
  const w1 = useRef<Group>(null);
  const w2 = useRef<Group>(null);
  const w3 = useRef<Group>(null);
  const w4 = useRef<Group>(null);
  const blower = useRef<Group>(null);
  const headRef = useRef<Group>(null);
  const hatRef = useRef<Group>(null);
  const hairRef = useRef<Group>(null);
  const hornsRef = useRef<Group>(null);
  const flamesRef = useRef<Group>(null);
  const poopRef = useRef<Group>(null);
  const cheeseRef = useRef<Group>(null);
  const mirrorRef = useRef<Group>(null);
  const outlineRef = useRef<Mesh>(null);
  const barRef = useRef<Mesh>(null);
  const barBgRef = useRef<Mesh>(null);
  const capRef = useRef<Mesh>(null);
  const mudGroupRef = useRef<Group>(null);
  const mudMat1 = useRef<MeshStandardMaterial>(null);
  const mudMat2 = useRef<MeshStandardMaterial>(null);
  const mudMat3 = useRef<MeshStandardMaterial>(null);

  const aoTex = useMemo(() => createAoShadowTexture(), []);
  const dashTex = useMemo(() => createDashboardTexture(), []);
  const plateTex = useMemo(() => createPlateTexture(), []);
  const mudTex = useMemo(() => createMudTexture(), []);
  const treadTex = useMemo(() => createTireTreadTexture(), []);
  const tireGeo = useMemo(() => buildTireGeo(), []);
  const rimGeo = useMemo(() => buildWheelAlloyRimGeo(), []);

  const sedanBody = useMemo(() => buildPaintedBodyGeo("sedan"), []);
  const evBody = useMemo(() => buildPaintedBodyGeo("ev"), []);
  const devilBody = useMemo(() => buildPaintedBodyGeo("devil"), []);
  const darkGeo = useMemo(() => buildDarkChassisAndCabinGeo(), []);
  const seatsGeo = useMemo(() => buildInteriorSeatsGeo(), []);
  const chromeGasGeo = useMemo(() => buildChromeDetailsGeo(false), []);
  const chromeEvGeo = useMemo(() => buildChromeDetailsGeo(true), []);

  const [look, setLook] = useState({
    id: -1,
    color: "#b8732a",
    shirt: "#334e68",
    hat: null as string | null,
    skin: "#e8b393",
    devil: false,
    face: null as string | null,
    mad: false,
    job: "fuel",
  });

  useFrame((_, dt) => {
    const g = ref.current;
    const c = sim.car;
    if (!g) return;
    if (!c) {
      g.visible = false;
      return;
    }
    g.visible = true;
    const idleVib = c.phase === "wait" && !c.asleep && c.job !== "charge" ? Math.sin(sim.clock * 44) * 0.0018 : 0;
    g.position.set(c.x, idleVib, c.z);
    g.rotation.y = c.yaw + Math.PI;

    if (c.id !== look.id || c.hat !== look.hat || c.color !== look.color || c.mad !== look.mad || c.job !== look.job) {
      setLook({
        id: c.id,
        color: c.color,
        shirt: c.shirt,
        hat: c.hat,
        skin: c.skin,
        devil: c.devil,
        face: c.face,
        mad: c.mad,
        job: c.job,
      });
    }

    if (c.phase !== "wait") {
      const spin = dt * 10;
      if (w1.current) w1.current.rotation.x += spin;
      if (w2.current) w2.current.rotation.x += spin;
      if (w3.current) w3.current.rotation.x += spin;
      if (w4.current) w4.current.rotation.x += spin;
    }
    if (blower.current && c.devil) blower.current.rotation.z = sim.clock * 6;

    // Zero-traverse mud opacity update
    if (mudGroupRef.current) {
      const vis = c.dirty > 0.2 && c.wash < 0.96;
      mudGroupRef.current.visible = vis;
      if (vis) {
        const op = Math.max(0.08, 1 - c.wash);
        if (mudMat1.current) mudMat1.current.opacity = op;
        if (mudMat2.current) mudMat2.current.opacity = op;
        if (mudMat3.current) mudMat3.current.opacity = op;
      }
    }

    if (hatRef.current) hatRef.current.visible = Boolean(c.hat);
    if (hairRef.current) hairRef.current.visible = !c.hat && !c.devil;
    if (hornsRef.current) hornsRef.current.visible = c.horns;
    if (flamesRef.current) flamesRef.current.visible = c.devil;
    if (poopRef.current) poopRef.current.visible = c.devil && c.dirty > 0.25 && c.wash < 0.9;
    if (cheeseRef.current) cheeseRef.current.visible = c.loose;
    if (mirrorRef.current) mirrorRef.current.visible = c.mirror;
    if (outlineRef.current) outlineRef.current.visible = Boolean(sim.up.scanner && c.wanted && !c.caught);

    const head = headRef.current;
    if (head) {
      const targetTurn = c.phase === "wait" && !c.asleep && !c.caught ? 1.15 : 0;
      head.rotation.y += (targetTurn - head.rotation.y) * Math.min(1, dt * 6);
      if (c.caught) {
        head.rotation.z = 0.62;
        head.rotation.x = Math.sin(sim.clock * 28) * 0.1;
      } else if (c.asleep) {
        head.rotation.z = 0.24 + Math.sin(sim.clock * 2.5) * 0.04;
        head.rotation.x = 0.24;
      } else {
        head.rotation.z = 0;
        head.rotation.x = Math.sin(sim.clock * 2.2) * 0.02;
      }
    }

    const bar = barRef.current;
    const showBar = (c.job === "fuel" || c.job === "charge") && c.phase === "wait";
    if (barBgRef.current) barBgRef.current.visible = showBar;
    if (bar) {
      bar.visible = showBar;
      if (showBar) {
        bar.scale.y = Math.max(0.05, c.fuel);
        (bar.material as MeshBasicMaterial).color.set(c.job === "charge" ? "#38bdf8" : "#eab308");
      }
    }

    const cap = capRef.current;
    if (cap) {
      cap.visible = c.capped || c.job !== "cap";
      (cap.material as MeshStandardMaterial).color.set(c.capped ? "#dc2626" : "#94a3b8");
    }
  });

  const wideEyes = look.face === "thief";
  const angryBrows = look.face === "bully" || look.mad || look.devil;
  const bigGrin = look.face === "worst";
  const style: CarStyle = look.devil ? "devil" : look.job === "charge" ? "ev" : "sedan";
  const bodyGeo = style === "devil" ? devilBody : style === "ev" ? evBody : sedanBody;
  const chromeGeo = style === "ev" ? chromeEvGeo : chromeGasGeo;
  const headlightEmissive = 0.6 + sim.night * 1.4;

  return (
    <group ref={ref} visible={false}>
      {/* Ground Contact Ambient Occlusion Shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.028, 0]}>
        <planeGeometry args={[2.35, 4.45]} />
        <meshBasicMaterial map={aoTex} transparent depthWrite={false} />
      </mesh>

      {/* Scanner Outline */}
      <mesh ref={outlineRef} position={[0, 0.85, 0]} rotation={[Math.PI / 2, 0, 0]} visible={false}>
        <torusGeometry args={[2.1, 0.035, 8, 32]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* 1) Merged Metallic Clearcoat Exterior Bodywork (Hollow Cabin!) */}
      <mesh geometry={bodyGeo} castShadow receiveShadow>
        <meshStandardMaterial color={look.color} roughness={0.2} metalness={0.56} />
      </mesh>

      {/* 2) Merged Dark Chassis, Panel Seams, Hollow Cabin Floor, Inner Doors, Console & Steering */}
      <mesh geometry={darkGeo} receiveShadow>
        <meshStandardMaterial color="#161920" roughness={0.72} metalness={0.18} />
      </mesh>

      {/* 3) Merged Contoured Bolstered Bucket Seats & Rear Bench */}
      <mesh geometry={seatsGeo} receiveShadow>
        <meshStandardMaterial color="#272c36" roughness={0.84} metalness={0.05} />
      </mesh>

      {/* 4) Merged Bright Chrome Handles, Shifter, Exhausts & Grille Trim */}
      <mesh geometry={chromeGeo}>
        <meshStandardMaterial color="#e2e8f0" roughness={0.16} metalness={0.92} />
      </mesh>

      {/* Illuminated Dashboard Gauges, AC Vents & GPS Navigation Screen */}
      <mesh position={[0, 0.67, 0.318]} rotation={[-0.12, Math.PI, 0]}>
        <planeGeometry args={[1.24, 0.24]} />
        <meshBasicMaterial map={dashTex} toneMapped={false} />
      </mesh>

      {/* EV Cyan Nose Light Bar */}
      {style === "ev" ? (
        <mesh position={[0, 0.54, 1.87]}>
          <boxGeometry args={[1.38, 0.042, 0.03]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.95} />
        </mesh>
      ) : null}

      {/* Front & Rear License Plates */}
      <mesh position={[0, 0.34, 1.928]}>
        <planeGeometry args={[0.38, 0.15]} />
        <meshBasicMaterial map={plateTex} />
      </mesh>
      <mesh position={[0, 0.54, -1.875]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.38, 0.16]} />
        <meshBasicMaterial map={plateTex} />
      </mesh>

      {/* Projector Headlights + Amber Corner Indicators */}
      {[-0.56, 0.56].map((x) => (
        <group key={`hl-${x}`} position={[x, 0.53, 1.86]}>
          <mesh>
            <planeGeometry args={[0.24, 0.11]} />
            <meshStandardMaterial color="#fef3c7" emissive="#fde047" emissiveIntensity={headlightEmissive} roughness={0.1} />
          </mesh>
          <mesh position={[x > 0 ? 0.13 : -0.13, 0, 0.002]}>
            <planeGeometry args={[0.055, 0.11]} />
            <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.7} />
          </mesh>
        </group>
      ))}

      {/* 3-Zone Wrap-Around LED Taillights (Brake + Amber Turn + Reverse) */}
      {[-0.54, 0.54].map((x) => (
        <group key={`tl-${x}`} position={[x, 0.56, -1.875]} rotation={[0, Math.PI, 0]}>
          <mesh>
            <planeGeometry args={[0.34, 0.12]} />
            <meshStandardMaterial color="#dc2626" emissive="#ef4444" emissiveIntensity={0.9} roughness={0.18} />
          </mesh>
          <mesh position={[0, -0.042, 0.003]}>
            <planeGeometry args={[0.32, 0.028]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={0.6} />
          </mesh>
          <mesh position={[x > 0 ? 0.11 : -0.11, 0.02, 0.004]}>
            <planeGeometry args={[0.09, 0.04]} />
            <meshBasicMaterial color="#f8fafc" />
          </mesh>
        </group>
      ))}

      {/* Double-Sided Tinted Automotive Glass (Zero Backface Culling Through Cabin!) */}
      {/* Front Windshield */}
      <mesh position={[0, 1.085, 0.52]} rotation={[-0.66, 0, 0]}>
        <planeGeometry args={[1.28, 0.72]} />
        <meshStandardMaterial
          color="#132938"
          roughness={0.06}
          metalness={0.65}
          transparent
          opacity={0.34}
          side={DoubleSide}
        />
      </mesh>
      {/* Rear Backlight Glass (Flush with [0.64, 0, 0] C-Pillars!) */}
      <mesh position={[0, 1.09, -1.15]} rotation={[0.64, 0, 0]}>
        <planeGeometry args={[1.26, 0.7]} />
        <meshStandardMaterial
          color="#0b1320"
          roughness={0.08}
          metalness={0.6}
          transparent
          opacity={0.72}
          side={DoubleSide}
        />
      </mesh>
      {/* Rear Side Door Tinted Glass (Both Left & Right, DoubleSide!) */}
      {[-0.695, 0.695].map((sx) => (
        <mesh key={`rglass-${sx}`} position={[sx, 1.08, -0.58]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.78, 0.58]} />
          <meshStandardMaterial
            color="#0b111c"
            roughness={0.08}
            metalness={0.55}
            transparent
            opacity={0.74}
            side={DoubleSide}
          />
        </mesh>
      ))}
      {/* Far-Side Passenger Front Door Smoked Glass (DoubleSide! Front driver side stays rolled down!) */}
      <mesh position={[-0.695, 1.08, 0.18]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.72, 0.58]} />
        <meshStandardMaterial
          color="#0f1d2b"
          roughness={0.08}
          metalness={0.55}
          transparent
          opacity={0.68}
          side={DoubleSide}
        />
      </mesh>

      {/* Devil Muscle Supercharger */}
      <group ref={flamesRef} visible={false} position={[0, 0.85, 1.08]}>
        <mesh castShadow>
          <boxGeometry args={[0.34, 0.16, 0.42]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.18} metalness={0.9} />
        </mesh>
        <group ref={blower} position={[0, 0.08, 0.22]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.075, 0.075, 0.06, 12]} />
            <meshStandardMaterial color="#dc2626" roughness={0.3} />
          </mesh>
        </group>
      </group>

      <group ref={poopRef} position={[0.12, 0.81, 1.15]} visible={false}>
        <mesh>
          <torusGeometry args={[0.08, 0.035, 8, 12]} />
          <meshStandardMaterial color="#5c361e" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <torusGeometry args={[0.05, 0.03, 8, 10]} />
          <meshStandardMaterial color="#6b3e26" roughness={0.95} />
        </mesh>
      </group>

      {/* Mud Splatter Decals */}
      <group ref={mudGroupRef}>
        <mesh position={[0.798, 0.52, 0.0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[2.1, 0.52]} />
          <meshStandardMaterial ref={mudMat1} map={mudTex} transparent depthWrite={false} roughness={0.95} />
        </mesh>
        <mesh position={[-0.798, 0.52, 0.0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[2.1, 0.52]} />
          <meshStandardMaterial ref={mudMat2} map={mudTex} transparent depthWrite={false} roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.82, 1.18]} rotation={[-Math.PI / 2 + 0.08, 0, 0]}>
          <planeGeometry args={[1.1, 0.68]} />
          <meshStandardMaterial ref={mudMat3} map={mudTex} transparent depthWrite={false} roughness={0.95} />
        </mesh>
      </group>

      {/* 4 Optimized 17" Multi-Spoke Alloy Wheels */}
      <Wheel refObj={w1} at={[-0.76, 0.3, 1.14]} tireGeo={tireGeo} rimGeo={rimGeo} treadTex={treadTex} />
      <Wheel refObj={w2} at={[0.76, 0.3, 1.14]} tireGeo={tireGeo} rimGeo={rimGeo} treadTex={treadTex} flip />
      <Wheel refObj={w3} at={[-0.76, 0.3, -1.1]} tireGeo={tireGeo} rimGeo={rimGeo} treadTex={treadTex} />
      <Wheel refObj={w4} at={[0.76, 0.3, -1.1]} tireGeo={tireGeo} rimGeo={rimGeo} treadTex={treadTex} flip />

      {/* Removable Driver Side Mirror */}
      <group ref={mirrorRef} position={[0.75, 0.82, 0.52]}>
        <mesh position={[0.03, -0.01, 0.02]} rotation={[0, 0, -0.45]}>
          <boxGeometry args={[0.08, 0.032, 0.055]} />
          <meshStandardMaterial color="#18181b" roughness={0.6} />
        </mesh>
        <mesh position={[0.11, 0.015, 0]} scale={[1.25, 0.78, 0.72]}>
          <sphereGeometry args={[0.068, 12, 10]} />
          <meshStandardMaterial color={look.color} roughness={0.2} metalness={0.55} />
        </mesh>
        <mesh position={[0.11, 0.015, -0.048]} scale={[1.18, 0.74, 1]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.052, 14]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.04} metalness={0.96} />
        </mesh>
      </group>

      {/* Recessed Rear-Quarter Fuel Port & Cap */}
      <group position={[0.798, 0.68, -1.0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <torusGeometry args={[0.074, 0.014, 8, 16]} />
          <meshStandardMaterial color="#18181b" roughness={0.5} metalness={0.5} />
        </mesh>
        <mesh ref={capRef} position={[0, 0, 0.015]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.066, 0.066, 0.03, 16]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* Loose Contraband Cheese Clearly Visible on Hollow Passenger Bucket Seat! */}
      <group ref={cheeseRef} position={[-0.33, 0.46, 0.04]} visible={false}>
        <mesh rotation={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.105, 0.105, 0.075, 3]} />
          <meshStandardMaterial color="#eab308" roughness={0.62} />
        </mesh>
      </group>

      {/* Sleek Side Fuel Progress Bar */}
      <mesh ref={barBgRef} position={[0.8, 0.68, -1.44]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.022, 0.4, 6, 8]} />
        <meshBasicMaterial color="#09090b" />
      </mesh>
      <mesh ref={barRef} position={[0.81, 0.68, -1.44]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.016, 0.36, 6, 8]} />
        <meshBasicMaterial color="#eab308" />
      </mesh>

      {/* ============================================================
          FULL SEATED DRIVER INSIDE HOLLOW CABIN (Legs, Seatbelt, Arms, Head)
         ============================================================ */}
      <group position={[0.33, 0.44, -0.04]}>
        {/* Seated Denim Thighs & Calves Reaching Toward Footwell Pedals */}
        {[-0.075, 0.075].map((lx) => (
          <group key={`leg-${lx}`} position={[lx, 0.02, 0.14]}>
            <mesh rotation={[Math.PI / 2 - 0.12, 0, 0]}>
              <capsuleGeometry args={[0.056, 0.22, 6, 8]} />
              <meshStandardMaterial color="#1e293b" roughness={0.88} />
            </mesh>
            <mesh position={[0, -0.06, 0.2]} rotation={[0.58, 0, 0]}>
              <capsuleGeometry args={[0.046, 0.18, 6, 8]} />
              <meshStandardMaterial color="#1e293b" roughness={0.88} />
            </mesh>
          </group>
        ))}

        {/* Jacket Torso, Flush Collar & Diagonal Shoulder Seatbelt Strap */}
        <mesh position={[0, 0.22, -0.05]} rotation={[-0.14, 0, 0]} scale={[1.12, 1.05, 0.78]}>
          <capsuleGeometry args={[0.14, 0.22, 8, 12]} />
          <meshStandardMaterial color={look.shirt} roughness={0.82} />
        </mesh>
        <mesh position={[0, 0.34, -0.015]}>
          <cylinderGeometry args={[0.058, 0.068, 0.045, 10]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.85} />
        </mesh>
        {/* Diagonal 3-Point Seatbelt Across Chest */}
        <mesh position={[0.01, 0.24, 0.045]} rotation={[-0.14, 0, 0.58]}>
          <boxGeometry args={[0.038, 0.32, 0.01]} />
          <meshStandardMaterial color="#111827" roughness={0.6} />
        </mesh>

        {/* Jointed Upper Arms, Forearms & Hands Gripping Steering Wheel Rim */}
        {[-0.155, 0.155].map((ax) => (
          <group key={`arm-${ax}`} position={[ax, 0.31, -0.02]}>
            <mesh position={[0, -0.04, 0.1]} rotation={[0.98, ax > 0 ? 0.14 : -0.14, 0]}>
              <capsuleGeometry args={[0.042, 0.16, 6, 8]} />
              <meshStandardMaterial color={look.shirt} roughness={0.82} />
            </mesh>
            <mesh position={[ax > 0 ? -0.025 : 0.025, -0.02, 0.23]} rotation={[1.45, ax > 0 ? 0.22 : -0.22, 0]}>
              <capsuleGeometry args={[0.036, 0.14, 6, 8]} />
              <meshStandardMaterial color={look.shirt} roughness={0.82} />
            </mesh>
            <mesh position={[ax > 0 ? -0.035 : 0.035, -0.01, 0.3]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshStandardMaterial color={look.skin} roughness={0.7} />
            </mesh>
          </group>
        ))}

        {/* Articulated Neck & Sculpted Head (Clean Headroom Below y=1.36 Roof!) */}
        <group ref={headRef} position={[0, 0.4, -0.04]}>
          <mesh position={[0, 0.045, 0]}>
            <cylinderGeometry args={[0.046, 0.055, 0.1, 10]} />
            <meshStandardMaterial color={look.skin} roughness={0.72} />
          </mesh>
          <mesh position={[0, 0.185, 0]} scale={[0.84, 1.04, 0.92]}>
            <sphereGeometry args={[0.138, 16, 14]} />
            <meshStandardMaterial color={look.skin} roughness={0.68} />
          </mesh>
          {/* Ears */}
          <mesh position={[-0.118, 0.185, 0]} scale={[0.42, 0.9, 0.68]}>
            <sphereGeometry args={[0.036, 8, 8]} />
            <meshStandardMaterial color={look.skin} roughness={0.7} />
          </mesh>
          <mesh position={[0.118, 0.185, 0]} scale={[0.42, 0.9, 0.68]}>
            <sphereGeometry args={[0.036, 8, 8]} />
            <meshStandardMaterial color={look.skin} roughness={0.7} />
          </mesh>
          {/* Hair */}
          <group ref={hairRef} position={[0, 0.235, -0.01]}>
            <mesh scale={[0.88, 0.74, 0.96]}>
              <sphereGeometry args={[0.142, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
              <meshStandardMaterial color="#1f1c1a" roughness={0.9} />
            </mesh>
          </group>
          {/* Nose, Eyes, Eyebrows & Mouth */}
          <mesh position={[0, 0.175, 0.125]} rotation={[-0.22, 0, 0]}>
            <capsuleGeometry args={[0.014, 0.03, 4, 6]} />
            <meshStandardMaterial color={look.skin} roughness={0.66} />
          </mesh>
          <mesh position={[-0.044, 0.205, 0.11]} scale={wideEyes ? 1.35 : [1.05, 0.82, 0.6]}>
            <sphereGeometry args={[0.019, 8, 8]} />
            <meshBasicMaterial color="#f8fafc" />
          </mesh>
          <mesh position={[0.044, 0.205, 0.11]} scale={wideEyes ? 1.35 : [1.05, 0.82, 0.6]}>
            <sphereGeometry args={[0.019, 8, 8]} />
            <meshBasicMaterial color="#f8fafc" />
          </mesh>
          <mesh position={[-0.044, 0.205, 0.122]}>
            <sphereGeometry args={[0.009, 8, 8]} />
            <meshBasicMaterial color="#09090b" />
          </mesh>
          <mesh position={[0.044, 0.205, 0.122]}>
            <sphereGeometry args={[0.009, 8, 8]} />
            <meshBasicMaterial color="#09090b" />
          </mesh>
          <mesh position={[-0.044, 0.236, 0.118]} rotation={[0, 0, Math.PI / 2 + (angryBrows ? -0.32 : 0)]}>
            <capsuleGeometry args={[0.007, 0.034, 4, 6]} />
            <meshBasicMaterial color="#1c1917" />
          </mesh>
          <mesh position={[0.044, 0.236, 0.118]} rotation={[0, 0, Math.PI / 2 + (angryBrows ? 0.32 : 0)]}>
            <capsuleGeometry args={[0.007, 0.034, 4, 6]} />
            <meshBasicMaterial color="#1c1917" />
          </mesh>
          {bigGrin ? (
            <mesh position={[0, 0.128, 0.118]} rotation={[0.1, 0, Math.PI / 2]}>
              <capsuleGeometry args={[0.014, 0.055, 4, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          ) : (
            <mesh position={[0, 0.13, 0.118]} rotation={[0, 0, Math.PI / 2]}>
              <capsuleGeometry args={[0.005, 0.03, 4, 6]} />
              <meshBasicMaterial color="#7c3f28" />
            </mesh>
          )}
          {/* Baseball Cap */}
          <group ref={hatRef} position={[0, 0.27, 0]} visible={Boolean(look.hat)}>
            <mesh scale={[0.9, 0.64, 0.96]}>
              <sphereGeometry args={[0.142, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
              <meshStandardMaterial color={look.hat ?? "#2d9d5c"} roughness={0.78} />
            </mesh>
            <mesh position={[0, 0.005, 0.108]} rotation={[0.12, 0, 0]} scale={[1.1, 0.2, 0.9]}>
              <cylinderGeometry args={[0.118, 0.128, 0.042, 12, 1, false, -Math.PI * 0.45, Math.PI * 0.9]} />
              <meshStandardMaterial color={look.hat ?? "#2d9d5c"} roughness={0.78} />
            </mesh>
          </group>
          {/* Devil Horns */}
          <group ref={hornsRef} visible={look.devil}>
            <mesh position={[-0.062, 0.32, 0]} rotation={[0, 0, 0.42]}>
              <coneGeometry args={[0.026, 0.15, 8]} />
              <meshStandardMaterial color="#dc2626" roughness={0.35} />
            </mesh>
            <mesh position={[0.062, 0.32, 0]} rotation={[0, 0, -0.42]}>
              <coneGeometry args={[0.026, 0.15, 8]} />
              <meshStandardMaterial color="#dc2626" roughness={0.35} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

function Wheel({
  at,
  refObj,
  flip,
  tireGeo,
  rimGeo,
  treadTex,
}: {
  at: [number, number, number];
  refObj: RefObject<Group | null>;
  flip?: boolean;
  tireGeo: LatheGeometry;
  rimGeo: BufferGeometry;
  treadTex: CanvasTexture;
}) {
  const dir = flip ? 1 : -1;
  return (
    <group ref={refObj} position={at}>
      <mesh geometry={tireGeo} castShadow>
        <meshStandardMaterial map={treadTex} roughness={0.86} metalness={0.05} />
      </mesh>
      {/* Dark Inner Wheel Barrel & Gunmetal Brake Rotor for Crisp Spoke Contrast */}
      <mesh position={[dir * 0.018, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.182, 0.182, 0.04, 16]} />
        <meshStandardMaterial color="#14171f" roughness={0.75} metalness={0.35} />
      </mesh>
      <mesh geometry={rimGeo} scale={[dir, 1, 1]}>
        <meshStandardMaterial color="#e2e8f0" roughness={0.16} metalness={0.9} />
      </mesh>
      <mesh position={[dir * 0.044, 0.095, 0.065]}>
        <boxGeometry args={[0.032, 0.075, 0.05]} />
        <meshStandardMaterial color="#dc2626" roughness={0.35} metalness={0.35} />
      </mesh>
    </group>
  );
}
