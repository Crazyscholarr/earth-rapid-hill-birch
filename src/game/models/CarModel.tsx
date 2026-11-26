import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, type RefObject } from "react";
import {
  BoxGeometry,
  CapsuleGeometry,
  CylinderGeometry,
  DoubleSide,
  ExtrudeGeometry,
  LatheGeometry,
  PlaneGeometry,
  Shape,
  SphereGeometry,
  TorusGeometry,
  Vector2,
  type BufferGeometry,
  type CanvasTexture,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  type MeshLambertMaterial,
} from "three";
import { mergeParts, placeGeo } from "@/game/geo";
import { sim } from "@/game/sim";
import {
  createAoShadowTexture,
  createDashboardTexture,
  createMudTexture,
  createPlateTexture,
  createTireTreadTexture,
  drawDriverFace,
  paint,
} from "@/game/textures";

type CarStyle = "sedan" | "ev" | "devil";

function buildFrontClipGeo(style: CarStyle) {
  const s = new Shape();
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
    curveSegments: 10,
  });
  geo.translate(0, 0, -0.74);
  geo.rotateY(-Math.PI / 2);
  return geo;
}

function buildRearClipGeo(style: CarStyle) {
  const s = new Shape();
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
    curveSegments: 10,
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
    curveSegments: 8,
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
    parts.push(placeGeo(new BoxGeometry(0.072, 0.52, 1.42), [sx, 0.51, -0.15]));
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

  // Passenger-Side Fixed Exterior Mirror Housing
  parts.push(placeGeo(new SphereGeometry(0.066, 12, 8), [-0.86, 0.85, 0.52], [0, 0, 0], [1.22, 0.76, 0.7]));

  return mergeParts(parts);
}

function buildDarkChassisAndCabinGeo(): BufferGeometry {
  const parts: BufferGeometry[] = [];

  // 1. Recessed Hollow Cabin Floor Pan (y = 0.28!) + Headliner + Sun Visors + Rearview Mirror
  parts.push(placeGeo(new BoxGeometry(1.42, 0.06, 1.48), [0, 0.28, -0.15]));
  parts.push(placeGeo(new BoxGeometry(0.56, 0.015, 0.52), [0.34, 0.315, 0.22]));
  parts.push(placeGeo(new BoxGeometry(1.24, 0.025, 1.26), [0, 1.355, -0.33]));
  parts.push(placeGeo(new BoxGeometry(0.36, 0.015, 0.11), [0.32, 1.335, 0.22], [0.1, 0, 0]));
  parts.push(placeGeo(new BoxGeometry(0.36, 0.015, 0.11), [-0.32, 1.335, 0.22], [0.1, 0, 0]));
  parts.push(placeGeo(new CylinderGeometry(0.008, 0.008, 0.07, 6), [0, 1.32, 0.26], [0.25, 0, 0]));
  parts.push(placeGeo(new BoxGeometry(0.18, 0.048, 0.024), [0, 1.28, 0.25], [0, 0.18, 0]));

  // 2. Sculpted Inner Door Trim Cards + Armrests + Speaker Grilles
  for (const sx of [-1, 1]) {
    const ix = sx * 0.698;
    parts.push(placeGeo(new BoxGeometry(0.024, 0.46, 1.38), [ix, 0.52, -0.15]));
    parts.push(placeGeo(new BoxGeometry(0.058, 0.045, 0.52), [ix - sx * 0.024, 0.56, 0.12]));
    parts.push(placeGeo(new BoxGeometry(0.052, 0.042, 0.44), [ix - sx * 0.022, 0.56, -0.52]));
    parts.push(
      placeGeo(new CylinderGeometry(0.068, 0.068, 0.018, 12), [ix - sx * 0.014, 0.41, 0.36], [0, 0, Math.PI / 2]),
    );
    parts.push(placeGeo(new BoxGeometry(0.076, 0.022, 1.42), [sx * 0.745, 0.778, -0.15]));
  }

  // 3. Center Transmission Tunnel, Storage Armrest, Gear Shifter, Handbrake & Coffee Cup
  parts.push(placeGeo(new BoxGeometry(0.22, 0.18, 0.88), [0, 0.38, 0.12]));
  parts.push(placeGeo(new BoxGeometry(0.2, 0.08, 0.32), [0, 0.5, -0.16]));
  parts.push(placeGeo(new CylinderGeometry(0.045, 0.062, 0.06, 10), [0, 0.49, 0.26]));
  parts.push(placeGeo(new CylinderGeometry(0.036, 0.028, 0.09, 10), [0.03, 0.51, 0.08]));
  parts.push(placeGeo(new BoxGeometry(0.026, 0.028, 0.16), [0.06, 0.5, -0.02], [-0.28, 0, 0]));

  // 4. Driver Footwell Accelerator & Brake Pedals
  parts.push(placeGeo(new BoxGeometry(0.045, 0.09, 0.015), [0.26, 0.39, 0.48], [-0.45, 0, 0]));
  parts.push(placeGeo(new BoxGeometry(0.075, 0.065, 0.015), [0.37, 0.39, 0.46], [-0.45, 0, 0]));

  // 5. Sculpted Dashboard Shell + Driver Gauge Binnacle Hood + Steering Wheel
  parts.push(placeGeo(new BoxGeometry(1.34, 0.26, 0.28), [0, 0.65, 0.46]));
  parts.push(placeGeo(new CylinderGeometry(0.16, 0.16, 0.28, 12, 1, false, 0, Math.PI), [0.33, 0.77, 0.44], [0, 0, Math.PI / 2]));
  parts.push(placeGeo(new CylinderGeometry(0.028, 0.036, 0.24, 10), [0.33, 0.71, 0.34], [1.15, 0, 0]));
  parts.push(placeGeo(new CylinderGeometry(0.007, 0.007, 0.18, 6), [0.33, 0.72, 0.3], [0, 0, Math.PI / 2]));
  parts.push(placeGeo(new TorusGeometry(0.142, 0.018, 8, 20), [0.33, 0.75, 0.24], [0.42, 0, 0]));
  parts.push(placeGeo(new CylinderGeometry(0.046, 0.046, 0.028, 12), [0.33, 0.75, 0.24], [Math.PI / 2 + 0.42, 0, 0]));
  parts.push(placeGeo(new BoxGeometry(0.26, 0.024, 0.018), [0.33, 0.75, 0.24], [0.42, 0, 0]));
  parts.push(placeGeo(new BoxGeometry(0.026, 0.13, 0.018), [0.33, 0.69, 0.265], [0.42, 0, 0]));

  // 6. Middle B-Pillars
  for (const sx of [-0.68, 0.68]) {
    parts.push(placeGeo(new BoxGeometry(0.044, 0.58, 0.092), [sx, 1.08, -0.18]));
  }

  // 7. Wheelhouse Inner Liners, Dark Wheel Barrels, Fender Flares, Mudflaps, Side Skirts & Door Shut-Lines
  for (const [wx, wz] of [
    [-0.58, 1.14],
    [0.58, 1.14],
    [-0.58, -1.1],
    [0.58, -1.1],
  ] as const) {
    parts.push(placeGeo(new CylinderGeometry(0.328, 0.328, 0.42, 14, 1, false, 0, Math.PI), [wx, 0.31, wz], [0, 0, Math.PI / 2]));
  }
  for (const [fx, fz] of [
    [-0.782, 1.14],
    [0.782, 1.14],
    [-0.782, -1.1],
    [0.782, -1.1],
  ] as const) {
    const dir = fx > 0 ? 1 : -1;
    // Stationary dark wheel hub barrel behind alloy spokes (saves 4 draw calls!)
    parts.push(placeGeo(new CylinderGeometry(0.182, 0.182, 0.04, 12), [dir * 0.778, 0.3, fz], [0, 0, Math.PI / 2]));
    parts.push(placeGeo(new TorusGeometry(0.335, 0.02, 6, 16, Math.PI), [fx, 0.3, fz], [0, Math.PI / 2, 0]));
    parts.push(placeGeo(new BoxGeometry(0.14, 0.14, 0.018), [dir * 0.7, 0.2, fz - 0.33]));
  }

  for (const sx of [-1, 1]) {
    const ox = sx * 0.783;
    parts.push(placeGeo(new BoxGeometry(0.045, 0.055, 1.56), [sx * 0.76, 0.26, 0.02]));
    parts.push(placeGeo(new BoxGeometry(0.016, 0.024, 1.44), [ox, 0.45, -0.14]));
    parts.push(placeGeo(new BoxGeometry(0.008, 0.5, 0.012), [ox, 0.52, 0.54]));
    parts.push(placeGeo(new BoxGeometry(0.008, 0.5, 0.012), [ox, 0.52, -0.18]));
    parts.push(placeGeo(new BoxGeometry(0.008, 0.4, 0.012), [ox, 0.57, -0.82]));
    parts.push(placeGeo(new BoxGeometry(0.01, 0.042, 0.13), [ox, 0.69, -0.04]));
    parts.push(placeGeo(new BoxGeometry(0.01, 0.042, 0.13), [ox, 0.7, -0.54]));
  }

  // Bumpers, Grille Backing, Wipers, Passenger Mirror Stem & Fuel Port Bezel Ring
  parts.push(placeGeo(new BoxGeometry(1.56, 0.12, 0.09), [0, 0.26, 1.88]));
  parts.push(placeGeo(new BoxGeometry(0.84, 0.2, 0.04), [0, 0.47, 1.86]));
  parts.push(placeGeo(new BoxGeometry(1.56, 0.14, 0.1), [0, 0.28, -1.85]));
  parts.push(placeGeo(new CylinderGeometry(0.008, 0.008, 0.44, 6), [-0.24, 0.82, 0.68], [0, 0.15, Math.PI / 2 - 0.1]));
  parts.push(placeGeo(new CylinderGeometry(0.008, 0.008, 0.44, 6), [0.24, 0.82, 0.68], [0, 0.15, Math.PI / 2 - 0.1]));
  parts.push(placeGeo(new BoxGeometry(0.08, 0.032, 0.055), [-0.78, 0.83, 0.54], [0, 0, 0.42]));
  parts.push(placeGeo(new TorusGeometry(0.074, 0.014, 8, 16), [0.798, 0.68, -1.0], [0, Math.PI / 2, 0]));

  return mergeParts(parts);
}

function buildStaticCarAccentsGeo() {
  // 1) 4 Stationary Red Brake Calipers + 2 Taillight Brake Lenses -> 1 draw call!
  const redParts: BufferGeometry[] = [];
  for (const [wx, wz] of [
    [-0.76, 1.14],
    [0.76, 1.14],
    [-0.76, -1.1],
    [0.76, -1.1],
  ] as const) {
    const dir = wx > 0 ? 1 : -1;
    redParts.push(placeGeo(new BoxGeometry(0.032, 0.075, 0.05), [wx + dir * 0.044, 0.395, wz + 0.065]));
  }
  for (const x of [-0.54, 0.54]) {
    redParts.push(placeGeo(new PlaneGeometry(0.34, 0.12), [x, 0.56, -1.875], [0, Math.PI, 0]));
  }

  // 2) Headlights (2 planes -> 1 draw call)
  const headParts = [-0.56, 0.56].map((x) => placeGeo(new PlaneGeometry(0.24, 0.11), [x, 0.53, 1.86]));

  // 3) Amber Turn Indicators (Front + Rear -> 1 draw call)
  const amberParts: BufferGeometry[] = [];
  for (const x of [-0.56, 0.56]) {
    amberParts.push(placeGeo(new PlaneGeometry(0.055, 0.11), [x + (x > 0 ? 0.13 : -0.13), 0.53, 1.862]));
  }
  for (const x of [-0.54, 0.54]) {
    amberParts.push(placeGeo(new PlaneGeometry(0.32, 0.028), [x, 0.518, -1.878], [0, Math.PI, 0]));
  }

  // 4) White Reverse Lenses (2 planes -> 1 draw call)
  const revParts = [-0.54, 0.54].map((x) =>
    placeGeo(new PlaneGeometry(0.09, 0.04), [x + (x > 0 ? -0.11 : 0.11), 0.58, -1.879], [0, Math.PI, 0]),
  );

  // 5) Merged Rear Backlight + 2 Rear Side Windows + Far Passenger Front Window -> 1 draw call!
  const glassParts: BufferGeometry[] = [
    placeGeo(new PlaneGeometry(1.26, 0.7), [0, 1.09, -1.15], [0.64, 0, 0]),
    placeGeo(new PlaneGeometry(0.78, 0.58), [-0.695, 1.08, -0.58], [0, Math.PI / 2, 0]),
    placeGeo(new PlaneGeometry(0.78, 0.58), [0.695, 1.08, -0.58], [0, Math.PI / 2, 0]),
    placeGeo(new PlaneGeometry(0.72, 0.58), [-0.695, 1.08, 0.18], [0, Math.PI / 2, 0]),
  ];

  return {
    caliperTailGeo: mergeParts(redParts),
    headlightGeo: mergeParts(headParts),
    amberLightGeo: mergeParts(amberParts),
    reverseLightGeo: mergeParts(revParts),
    sideRearGlassGeo: mergeParts(glassParts),
  };
}

function buildInteriorSeatsGeo(): BufferGeometry {
  const parts: BufferGeometry[] = [];
  for (const sx of [-0.33, 0.33]) {
    parts.push(placeGeo(new BoxGeometry(0.38, 0.09, 0.42), [sx, 0.36, 0.0]));
    parts.push(placeGeo(new CapsuleGeometry(0.038, 0.34, 4, 8), [sx - 0.18, 0.4, 0.0], [Math.PI / 2, 0, 0]));
    parts.push(placeGeo(new CapsuleGeometry(0.038, 0.34, 4, 8), [sx + 0.18, 0.4, 0.0], [Math.PI / 2, 0, 0]));
    parts.push(placeGeo(new BoxGeometry(0.38, 0.48, 0.1), [sx, 0.64, -0.22], [-0.2, 0, 0]));
    parts.push(placeGeo(new CapsuleGeometry(0.04, 0.4, 4, 8), [sx - 0.18, 0.64, -0.2], [-0.2, 0, 0]));
    parts.push(placeGeo(new CapsuleGeometry(0.04, 0.4, 4, 8), [sx + 0.18, 0.64, -0.2], [-0.2, 0, 0]));
    parts.push(placeGeo(new CapsuleGeometry(0.062, 0.13, 6, 8), [sx, 0.99, -0.29], [0, 0, Math.PI / 2]));
  }
  parts.push(placeGeo(new BoxGeometry(1.32, 0.11, 0.4), [0, 0.38, -0.6]));
  parts.push(placeGeo(new BoxGeometry(1.32, 0.46, 0.12), [0, 0.64, -0.8], [-0.16, 0, 0]));
  parts.push(placeGeo(new CapsuleGeometry(0.052, 0.12, 4, 8), [-0.36, 0.94, -0.85], [0, 0, Math.PI / 2]));
  parts.push(placeGeo(new CapsuleGeometry(0.052, 0.12, 4, 8), [0.36, 0.94, -0.85], [0, 0, Math.PI / 2]));
  parts.push(placeGeo(new BoxGeometry(1.3, 0.03, 0.34), [0, 0.79, -0.98]));

  return mergeParts(parts);
}

function buildChromeDetailsGeo(isEv: boolean): BufferGeometry {
  const parts: BufferGeometry[] = [];
  for (const sx of [-1, 1]) {
    parts.push(placeGeo(new CapsuleGeometry(0.012, 0.1, 4, 8), [sx * 0.795, 0.69, -0.04], [Math.PI / 2, 0, 0]));
    parts.push(placeGeo(new CapsuleGeometry(0.012, 0.1, 4, 8), [sx * 0.795, 0.7, -0.54], [Math.PI / 2, 0, 0]));
    parts.push(placeGeo(new BoxGeometry(0.015, 0.022, 0.065), [sx * 0.675, 0.63, 0.24]));
    parts.push(placeGeo(new CylinderGeometry(0.008, 0.008, 0.1, 6), [sx * 0.33 - 0.055, 0.91, -0.27]));
    parts.push(placeGeo(new CylinderGeometry(0.008, 0.008, 0.1, 6), [sx * 0.33 + 0.055, 0.91, -0.27]));
  }
  parts.push(placeGeo(new CylinderGeometry(0.008, 0.01, 0.11, 8), [0, 0.56, 0.25], [0.22, 0, 0]));
  parts.push(placeGeo(new SphereGeometry(0.024, 10, 8), [0, 0.62, 0.265]));
  parts.push(placeGeo(new BoxGeometry(0.168, 0.038, 0.006), [0, 1.28, 0.238], [0, 0.18, 0]));

  if (!isEv) {
    for (const yy of [0.41, 0.47, 0.53]) {
      parts.push(placeGeo(new BoxGeometry(0.78, 0.016, 0.02), [0, yy, 1.882]));
    }
    for (const ex of [-0.52, 0.52]) {
      parts.push(placeGeo(new CylinderGeometry(0.036, 0.04, 0.18, 10), [ex, 0.22, -1.9], [Math.PI / 2, 0, 0]));
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
  const geo = new LatheGeometry(pts, 20);
  geo.rotateZ(Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

function buildWheelAlloyRimGeo(): BufferGeometry {
  const parts: BufferGeometry[] = [
    placeGeo(new TorusGeometry(0.182, 0.02, 6, 18), [0.062, 0, 0], [0, Math.PI / 2, 0]),
    placeGeo(new CylinderGeometry(0.048, 0.048, 0.028, 10), [0.068, 0, 0], [0, 0, Math.PI / 2]),
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

function buildDriverGeometries() {
  const legsParts: BufferGeometry[] = [];
  for (const lx of [-0.076, 0.076]) {
    legsParts.push(placeGeo(new CapsuleGeometry(0.056, 0.22, 5, 8), [lx, 0.02, 0.14], [Math.PI / 2 - 0.12, 0, 0]));
    legsParts.push(placeGeo(new SphereGeometry(0.052, 8, 6), [lx, 0.005, 0.26]));
    legsParts.push(placeGeo(new CapsuleGeometry(0.045, 0.18, 5, 8), [lx, -0.065, 0.34], [0.58, 0, 0]));
  }

  const jacketParts: BufferGeometry[] = [
    placeGeo(new CylinderGeometry(0.162, 0.128, 0.3, 12), [0, 0.2, -0.045], [-0.14, 0, 0], [1.08, 1.0, 0.72]),
    placeGeo(new CapsuleGeometry(0.068, 0.23, 5, 10), [0, 0.315, -0.062], [0, 0, Math.PI / 2], [1, 0.85, 0.88]),
    placeGeo(new BoxGeometry(0.042, 0.12, 0.022), [-0.052, 0.3, 0.032], [-0.14, 0.22, -0.28]),
    placeGeo(new BoxGeometry(0.042, 0.12, 0.022), [0.052, 0.3, 0.032], [-0.14, -0.22, 0.28]),
  ];
  for (const s of [-1, 1]) {
    jacketParts.push(placeGeo(new SphereGeometry(0.052, 8, 8), [s * 0.168, 0.305, -0.035]));
    jacketParts.push(
      placeGeo(new CapsuleGeometry(0.044, 0.135, 5, 8), [s * 0.166, 0.265, 0.048], [1.05, s * 0.08, 0]),
    );
    jacketParts.push(placeGeo(new SphereGeometry(0.041, 8, 6), [s * 0.16, 0.23, 0.125]));
    jacketParts.push(
      placeGeo(new CapsuleGeometry(0.037, 0.13, 5, 8), [s * 0.142, 0.255, 0.205], [1.38, -s * 0.22, 0]),
    );
  }

  const handParts: BufferGeometry[] = [];
  for (const s of [-1, 1]) {
    const hx = s * 0.125;
    handParts.push(placeGeo(new BoxGeometry(0.038, 0.046, 0.048), [hx, 0.275, 0.278], [0.35, -s * 0.2, 0]));
    handParts.push(placeGeo(new CapsuleGeometry(0.011, 0.024, 4, 6), [hx - s * 0.018, 0.295, 0.272], [0.2, 0, s * 0.5]));
    handParts.push(placeGeo(new CapsuleGeometry(0.014, 0.03, 4, 6), [hx + s * 0.006, 0.275, 0.298], [0.4, 0, 0]));
  }

  const headPts = [
    new Vector2(0.0, 0.068),
    new Vector2(0.062, 0.074),
    new Vector2(0.106, 0.108),
    new Vector2(0.124, 0.168),
    new Vector2(0.122, 0.228),
    new Vector2(0.102, 0.276),
    new Vector2(0.055, 0.304),
    new Vector2(0.0, 0.312),
  ];
  const headLathe = new LatheGeometry(headPts, 16);
  const headParts: BufferGeometry[] = [
    placeGeo(new CylinderGeometry(0.046, 0.056, 0.11, 10), [0, 0.048, -0.008]),
    placeGeo(headLathe, [0, 0, 0], [0, 0, 0], [0.88, 1.0, 0.96]),
    placeGeo(new CapsuleGeometry(0.013, 0.028, 4, 6), [0, 0.175, 0.116], [-0.26, 0, 0]),
    placeGeo(new SphereGeometry(0.032, 8, 8), [-0.11, 0.182, -0.005], [0, 0, 0.12], [0.44, 0.92, 0.68]),
    placeGeo(new SphereGeometry(0.032, 8, 8), [0.11, 0.182, -0.005], [0, 0, -0.12], [0.44, 0.92, 0.68]),
  ];

  const hairParts: BufferGeometry[] = [
    placeGeo(new SphereGeometry(0.128, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.56), [0, 0.214, -0.016], [-0.14, 0, 0], [0.91, 0.92, 0.99]),
    placeGeo(new CapsuleGeometry(0.032, 0.095, 4, 8), [0.01, 0.278, 0.082], [0.15, 0, 1.48]),
    placeGeo(new BoxGeometry(0.022, 0.075, 0.048), [-0.104, 0.205, 0.012], [0.1, 0, 0.08]),
    placeGeo(new BoxGeometry(0.022, 0.075, 0.048), [0.104, 0.205, 0.012], [0.1, 0, -0.08]),
    placeGeo(new CylinderGeometry(0.098, 0.078, 0.09, 10, 1, false, Math.PI * 0.6, Math.PI * 0.8), [0, 0.16, -0.018]),
  ];

  const capParts: BufferGeometry[] = [
    placeGeo(
      new SphereGeometry(0.136, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5),
      [0, 0.228, -0.004],
      [-0.1, 0, 0],
      [0.93, 0.92, 1.02],
    ),
    placeGeo(new SphereGeometry(0.014, 6, 6), [0, 0.352, -0.016]),
    placeGeo(
      new CylinderGeometry(0.118, 0.128, 0.02, 12, 1, false, -Math.PI * 0.42, Math.PI * 0.84),
      [0, 0.258, 0.072],
      [-0.05, 0, 0],
      [0.94, 1, 1.15],
    ),
  ];

  return {
    legsGeo: mergeParts(legsParts),
    jacketGeo: mergeParts(jacketParts),
    handsGeo: mergeParts(handParts),
    headGeo: mergeParts(headParts),
    hairGeo: mergeParts(hairParts),
    capGeo: mergeParts(capParts),
  };
}

export function LiveCar() {
  const ref = useRef<Group>(null);
  const w1 = useRef<Group>(null);
  const w2 = useRef<Group>(null);
  const w3 = useRef<Group>(null);
  const w4 = useRef<Group>(null);
  const blower = useRef<Group>(null);
  const headRef = useRef<Group>(null);
  const hatRef = useRef<Mesh>(null);
  const hairRef = useRef<Mesh>(null);
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
  const mudMat1 = useRef<MeshLambertMaterial>(null);
  const mudMat2 = useRef<MeshLambertMaterial>(null);
  const mudMat3 = useRef<MeshLambertMaterial>(null);
  const prevCapped = useRef<boolean | null>(null);
  const prevBarCharge = useRef<boolean | null>(null);

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
  const accents = useMemo(() => buildStaticCarAccentsGeo(), []);
  const seatsGeo = useMemo(() => buildInteriorSeatsGeo(), []);
  const chromeGasGeo = useMemo(() => buildChromeDetailsGeo(false), []);
  const chromeEvGeo = useMemo(() => buildChromeDetailsGeo(true), []);
  const drvGeo = useMemo(() => buildDriverGeometries(), []);
  const faceArt = useMemo(() => paint(() => undefined, 128, 128), []);

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
        const isChg = c.job === "charge";
        if (prevBarCharge.current !== isChg) {
          prevBarCharge.current = isChg;
          (bar.material as MeshBasicMaterial).color.set(isChg ? "#38bdf8" : "#eab308");
        }
      }
    }

    const cap = capRef.current;
    if (cap) {
      cap.visible = c.capped || c.job !== "cap";
      if (prevCapped.current !== c.capped) {
        prevCapped.current = c.capped;
        (cap.material as MeshLambertMaterial).color.set(c.capped ? "#dc2626" : "#94a3b8");
      }
    }

    const fk = `${c.skin}|${c.face}|${c.mad}|${c.asleep}|${c.caught}|${c.devil}`;
    if (faceArt.key !== fk) {
      faceArt.key = fk;
      drawDriverFace(faceArt.ctx, 128, 128, {
        skin: c.skin,
        face: c.face,
        mad: c.mad,
        asleep: c.asleep,
        caught: c.caught,
        devil: c.devil,
      });
      faceArt.tex.needsUpdate = true;
    }
  });

  const style: CarStyle = look.devil ? "devil" : look.job === "charge" ? "ev" : "sedan";
  const bodyGeo = style === "devil" ? devilBody : style === "ev" ? evBody : sedanBody;
  const chromeGeo = style === "ev" ? chromeEvGeo : chromeGasGeo;

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

      {/* 1) Merged Glossy Clearcoat Exterior Bodywork (Phong Specular — 5x faster than PBR GGX!) */}
      <mesh geometry={bodyGeo}>
        <meshPhongMaterial color={look.color} specular="#64748b" shininess={72} />
      </mesh>

      {/* 2) Merged Dark Chassis, Panel Seams, Hollow Cabin Floor, Inner Doors, Console & Steering */}
      <mesh geometry={darkGeo}>
        <meshLambertMaterial color="#161920" />
      </mesh>

      {/* 3) Merged Contoured Bolstered Bucket Seats & Rear Bench */}
      <mesh geometry={seatsGeo}>
        <meshLambertMaterial color="#272c36" />
      </mesh>

      {/* 4) Merged Bright Chrome Handles, Shifter, Exhausts & Grille Trim */}
      <mesh geometry={chromeGeo}>
        <meshPhongMaterial color="#eef2f6" specular="#ffffff" shininess={92} />
      </mesh>

      {/* 5) Merged Brake Calipers + Taillights, Headlights, Amber Indicators & Reverse Lenses (4 Draw Calls!) */}
      <mesh geometry={accents.caliperTailGeo}>
        <meshLambertMaterial color="#dc2626" emissive="#ef4444" emissiveIntensity={0.65} />
      </mesh>
      <mesh geometry={accents.headlightGeo}>
        <meshLambertMaterial color="#fef3c7" emissive="#fde047" emissiveIntensity={0.85} />
      </mesh>
      <mesh geometry={accents.amberLightGeo}>
        <meshLambertMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.65} />
      </mesh>
      <mesh geometry={accents.reverseLightGeo}>
        <meshBasicMaterial color="#f8fafc" />
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
          <meshLambertMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.95} />
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

      {/* Double-Sided Tinted Automotive Glass (Merged into 2 Draw Calls!) */}
      <mesh position={[0, 1.085, 0.52]} rotation={[-0.66, 0, 0]}>
        <planeGeometry args={[1.28, 0.72]} />
        <meshPhongMaterial
          color="#132938"
          specular="#94a3b8"
          shininess={85}
          transparent
          opacity={0.34}
          side={DoubleSide}
        />
      </mesh>
      <mesh geometry={accents.sideRearGlassGeo}>
        <meshPhongMaterial
          color="#0c1522"
          specular="#64748b"
          shininess={80}
          transparent
          opacity={0.72}
          side={DoubleSide}
        />
      </mesh>

      {/* Devil Muscle Supercharger */}
      <group ref={flamesRef} visible={false} position={[0, 0.85, 1.08]}>
        <mesh>
          <boxGeometry args={[0.34, 0.16, 0.42]} />
          <meshPhongMaterial color="#cbd5e1" specular="#ffffff" shininess={90} />
        </mesh>
        <group ref={blower} position={[0, 0.08, 0.22]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.075, 0.075, 0.06, 12]} />
            <meshLambertMaterial color="#dc2626" />
          </mesh>
        </group>
      </group>

      <group ref={poopRef} position={[0.12, 0.81, 1.15]} visible={false}>
        <mesh>
          <torusGeometry args={[0.08, 0.035, 8, 12]} />
          <meshLambertMaterial color="#5c361e" />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <torusGeometry args={[0.05, 0.03, 8, 10]} />
          <meshLambertMaterial color="#6b3e26" />
        </mesh>
      </group>

      {/* Mud Splatter Decals */}
      <group ref={mudGroupRef}>
        <mesh position={[0.798, 0.52, 0.0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[2.1, 0.52]} />
          <meshLambertMaterial ref={mudMat1} map={mudTex} transparent depthWrite={false} />
        </mesh>
        <mesh position={[-0.798, 0.52, 0.0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[2.1, 0.52]} />
          <meshLambertMaterial ref={mudMat2} map={mudTex} transparent depthWrite={false} />
        </mesh>
        <mesh position={[0, 0.82, 1.18]} rotation={[-Math.PI / 2 + 0.08, 0, 0]}>
          <planeGeometry args={[1.1, 0.68]} />
          <meshLambertMaterial ref={mudMat3} map={mudTex} transparent depthWrite={false} />
        </mesh>
      </group>

      {/* 4 Optimized 17" Multi-Spoke Alloy Wheels (2 Meshes Each!) */}
      <Wheel refObj={w1} at={[-0.76, 0.3, 1.14]} tireGeo={tireGeo} rimGeo={rimGeo} treadTex={treadTex} />
      <Wheel refObj={w2} at={[0.76, 0.3, 1.14]} tireGeo={tireGeo} rimGeo={rimGeo} treadTex={treadTex} flip />
      <Wheel refObj={w3} at={[-0.76, 0.3, -1.1]} tireGeo={tireGeo} rimGeo={rimGeo} treadTex={treadTex} />
      <Wheel refObj={w4} at={[0.76, 0.3, -1.1]} tireGeo={tireGeo} rimGeo={rimGeo} treadTex={treadTex} flip />

      {/* Removable Driver Side Mirror */}
      <group ref={mirrorRef} position={[0.75, 0.82, 0.52]}>
        <mesh position={[0.03, -0.01, 0.02]} rotation={[0, 0, -0.45]}>
          <boxGeometry args={[0.08, 0.032, 0.055]} />
          <meshLambertMaterial color="#18181b" />
        </mesh>
        <mesh position={[0.11, 0.015, 0]} scale={[1.25, 0.78, 0.72]}>
          <sphereGeometry args={[0.068, 12, 10]} />
          <meshPhongMaterial color={look.color} specular="#64748b" shininess={72} />
        </mesh>
        <mesh position={[0.11, 0.015, -0.048]} scale={[1.18, 0.74, 1]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.052, 14]} />
          <meshPhongMaterial color="#e2e8f0" specular="#ffffff" shininess={95} />
        </mesh>
      </group>

      {/* Recessed Rear-Quarter Fuel Cap */}
      <mesh ref={capRef} position={[0.813, 0.68, -1.0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.066, 0.066, 0.03, 14]} />
        <meshLambertMaterial color="#94a3b8" />
      </mesh>

      {/* Loose Contraband Cheese */}
      <group ref={cheeseRef} position={[-0.33, 0.46, 0.04]} visible={false}>
        <mesh rotation={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.105, 0.105, 0.075, 3]} />
          <meshLambertMaterial color="#eab308" />
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
          SCULPTED ANATOMICAL DRIVER (Broad Shoulders, Seamless Arms, Jawline Head)
         ============================================================ */}
      <group position={[0.33, 0.44, -0.04]}>
        <mesh geometry={drvGeo.legsGeo}>
          <meshLambertMaterial color="#1e293b" />
        </mesh>
        <mesh geometry={drvGeo.jacketGeo}>
          <meshLambertMaterial color={look.shirt} />
        </mesh>
        <mesh position={[0, 0.33, -0.015]}>
          <cylinderGeometry args={[0.056, 0.068, 0.05, 10]} />
          <meshLambertMaterial color="#f1f5f9" />
        </mesh>
        <mesh position={[0.01, 0.235, 0.048]} rotation={[-0.14, 0, 0.58]}>
          <boxGeometry args={[0.038, 0.32, 0.01]} />
          <meshLambertMaterial color="#111827" />
        </mesh>
        <mesh geometry={drvGeo.handsGeo}>
          <meshLambertMaterial color={look.skin} />
        </mesh>

        <group ref={headRef} position={[0, 0.385, -0.04]}>
          <mesh geometry={drvGeo.headGeo}>
            <meshLambertMaterial color={look.skin} />
          </mesh>
          <mesh position={[0, 0.182, 0.014]} scale={[0.92, 1.0, 1.03]}>
            <cylinderGeometry args={[0.126, 0.112, 0.155, 14, 1, true, -0.68, 1.36]} />
            <meshLambertMaterial map={faceArt.tex} transparent depthWrite={false} />
          </mesh>
          <mesh ref={hairRef} geometry={drvGeo.hairGeo}>
            <meshLambertMaterial color="#1f1b18" />
          </mesh>
          <mesh ref={hatRef} geometry={drvGeo.capGeo} visible={Boolean(look.hat)}>
            <meshLambertMaterial color={look.hat ?? "#2d9d5c"} />
          </mesh>
          <group ref={hornsRef} visible={look.devil}>
            <mesh position={[-0.062, 0.31, 0]} rotation={[0, 0, 0.42]}>
              <coneGeometry args={[0.026, 0.15, 8]} />
              <meshLambertMaterial color="#dc2626" />
            </mesh>
            <mesh position={[0.062, 0.31, 0]} rotation={[0, 0, -0.42]}>
              <coneGeometry args={[0.026, 0.15, 8]} />
              <meshLambertMaterial color="#dc2626" />
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
      <mesh geometry={tireGeo}>
        <meshLambertMaterial map={treadTex} />
      </mesh>
      <mesh geometry={rimGeo} scale={[dir, 1, 1]}>
        <meshPhongMaterial color="#edf2f7" specular="#ffffff" shininess={88} />
      </mesh>
    </group>
  );
}
