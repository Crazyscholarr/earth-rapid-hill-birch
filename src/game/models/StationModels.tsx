import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import {
  BoxGeometry,
  CapsuleGeometry,
  CatmullRomCurve3,
  CircleGeometry,
  ConeGeometry,
  CylinderGeometry,
  DodecahedronGeometry,
  ExtrudeGeometry,
  LatheGeometry,
  PlaneGeometry,
  Shape,
  SphereGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector2,
  Vector3,
  type BufferGeometry,
  type CanvasTexture,
  type Group,
  type MeshLambertMaterial,
} from "three";
import { GRADES } from "@/game/content";
import { colorGeo, mergeColoredParts, mergeParts, placeGeo } from "@/game/geo";
import { getPropGeos } from "@/game/models/PropGeos";
import { sim } from "@/game/sim";
import {
  createAoShadowTexture,
  createAsphaltTexture,
  createBrickTexture,
  createBunTexture,
  createCanyonRockTexture,
  createConcreteTexture,
  createConsoleLabelTexture,
  createHazardTexture,
  createIceChestTexture,
  createOpenSignTexture,
  createPriceTotemTexture,
  createPumpFaceTexture,
  createPumpTopperTexture,
  createSandTexture,
  createSignTexture,
  createSpongeTexture,
  createStoreBackWallTexture,
  createVendingFrontTexture,
  drawMonitor,
  drawPoster,
  getSharedPosterArt,
  paint,
} from "@/game/textures";

type PropRefs = {
  nozzle: RefObject<Group | null>;
  nozzleBootMat: RefObject<MeshLambertMaterial | null>;
  charger: RefObject<Group | null>;
  sponge: RefObject<Group | null>;
  burger: RefObject<Group | null>;
  burgerExtra: RefObject<Group | null>;
  cap: RefObject<Group | null>;
  capExtra: RefObject<Group | null>;
  taser: RefObject<Group | null>;
};

function roundedRectShape(w: number, h: number, r: number) {
  const s = new Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function buildRoundedSlab(w: number, d: number, h: number, r: number, bevel = 0.025) {
  const geo = new ExtrudeGeometry(roundedRectShape(w, d, r), {
    depth: h,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 1,
    curveSegments: 5,
  });
  geo.rotateX(-Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

function buildDesertTerrainGeo() {
  const geo = new PlaneGeometry(176, 176, 36, 36);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position!;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const inRoad = Math.abs(z - 0.5) < 3.2;
    const inPad = x > -11.5 && x < 9.0 && z > -9.8 && z < 8.2;
    if (inRoad || inPad) {
      pos.setY(i, 0);
      continue;
    }
    const distRoad = Math.max(0, Math.abs(z - 0.5) - 3.2);
    const distPad = Math.max(0, Math.max(-11.5 - x, x - 9.0, -9.8 - z, z - 8.2));
    const blend = Math.min(1, Math.min(distRoad, distPad) / 8);
    const ridge = Math.max(0, (-z - 22) * 0.14);
    const dune =
      (Math.sin(x * 0.1 + z * 0.07) * 0.58 +
        Math.cos(x * 0.055 - z * 0.09) * 0.85 +
        Math.sin(x * 0.22 + z * 0.18) * 0.18) *
      blend;
    pos.setY(i, Math.max(0, dune + 0.18 * blend + ridge * blend));
  }
  geo.computeVertexNormals();
  return geo;
}

function buildButteLayerGeo(rTop: number, rBot: number, height: number, seed: number) {
  const pts: Vector2[] = [
    new Vector2(rBot, 0),
    new Vector2(rBot * 0.88, height * 0.28),
    new Vector2(rTop * 1.12, height * 0.68),
    new Vector2(rTop, height),
    new Vector2(0, height),
  ];
  const lathe = new LatheGeometry(pts, 14);
  const pos = lathe.attributes.position!;
  for (let i = 0; i < pos.count; i++) {
    const vx = pos.getX(i);
    const vy = pos.getY(i);
    const vz = pos.getZ(i);
    const r = Math.hypot(vx, vz);
    if (r > 0.01) {
      const ang = Math.atan2(vz, vx);
      const flute =
        1 +
        0.1 * Math.sin(ang * 5 + seed) +
        0.06 * Math.cos(ang * 9 - seed * 1.7) +
        0.03 * Math.sin(vy * 1.5 + ang * 3);
      pos.setXYZ(i, vx * flute, vy, vz * flute);
    }
  }
  lathe.computeVertexNormals();
  return lathe;
}

function buildHopperGeo() {
  const pts = [
    new Vector2(0.42, 0),
    new Vector2(0.42, 0.15),
    new Vector2(0.68, 0.42),
    new Vector2(0.62, 0.42),
    new Vector2(0.38, 0.16),
  ];
  return new LatheGeometry(pts, 14);
}

function buildWorldStaticGeos() {
  // 1) All untextured matte environment + roadside + utility poles + guardrails + barrier posts + canopy -> 1 Draw Call!
  const solid: BufferGeometry[] = [];

  // Guardrails, Posts & Highway Curbs
  for (const cx of [-16.5, 16.5]) {
    solid.push(colorGeo(new BoxGeometry(15, 0.24, 0.06), "#cbd5e1", [cx, 0.56, -1.82]));
    solid.push(colorGeo(new BoxGeometry(15, 0.05, 0.08), "#cbd5e1", [cx, 0.62, -1.8]));
    solid.push(colorGeo(new BoxGeometry(15, 0.05, 0.08), "#cbd5e1", [cx, 0.5, -1.8]));
    for (const px of [-6, -3, 0, 3, 6]) {
      solid.push(colorGeo(new BoxGeometry(0.1, 0.7, 0.1), "#64748b", [cx + px, 0.35, -1.87]));
    }
  }
  solid.push(colorGeo(new BoxGeometry(104, 0.07, 0.18), "#cbd5e1", [0, 0.045, -1.52]));
  solid.push(colorGeo(new BoxGeometry(104, 0.07, 0.18), "#cbd5e1", [0, 0.045, 2.52]));

  // Desert Saguaro Cacti & Sagebrush
  const cactusSpots: [number, number, number][] = [
    [10.2, -3.4, 1.05],
    [14.8, -5.8, 1.3],
    [8.4, -8.2, 0.9],
    [15.5, 4.8, 1.15],
    [-13.5, -2.8, 1.22],
    [-12.5, 4.8, 0.95],
    [7.2, 7.2, 1.08],
    [-8.8, 6.6, 0.98],
  ];
  for (const [x, z, s] of cactusSpots) {
    solid.push(colorGeo(new CylinderGeometry(0.13 * s, 0.155 * s, 1.48 * s, 8), "#365931", [x, 0.78 * s, z]));
    solid.push(colorGeo(new SphereGeometry(0.13 * s, 8, 5), "#365931", [x, 1.52 * s, z]));
    solid.push(colorGeo(new CapsuleGeometry(0.075 * s, 0.38 * s, 3, 6), "#365931", [x + 0.24 * s, 0.82 * s, z], [0, 0, -0.68]));
    solid.push(colorGeo(new CapsuleGeometry(0.07 * s, 0.34 * s, 3, 6), "#365931", [x - 0.24 * s, 0.96 * s, z], [0, 0, 0.68]));
  }
  for (const [x, z, s] of [
    [8.2, -2.2, 0.36],
    [11.8, 3.6, 0.44],
    [-10.8, 3.2, 0.4],
    [-8.2, -2.4, 0.34],
    [13.4, -2.6, 0.38],
  ] as const) {
    solid.push(colorGeo(new DodecahedronGeometry(s, 0), "#676e49", [x, s * 0.45, z], [0, x, 0], [1.35, 0.72, 1.2]));
  }

  // Roadside Oil Drums & Tire Stack
  solid.push(colorGeo(new CylinderGeometry(0.25, 0.25, 0.88, 12), "#b94827", [5.55, 0.44, 3.65]));
  solid.push(colorGeo(new CylinderGeometry(0.25, 0.25, 0.88, 12), "#1f4246", [6.08, 0.44, 4.15]));
  for (const [x, z] of [
    [5.55, 3.65],
    [6.08, 4.15],
  ] as const) {
    solid.push(colorGeo(new TorusGeometry(0.255, 0.015, 5, 12), "#18181b", [x, 0.28, z], [Math.PI / 2, 0, 0]));
    solid.push(colorGeo(new TorusGeometry(0.255, 0.015, 5, 12), "#18181b", [x, 0.6, z], [Math.PI / 2, 0, 0]));
  }
  for (const [i, yy] of [0.1, 0.28, 0.46].entries()) {
    solid.push(colorGeo(new TorusGeometry(0.24, 0.09, 6, 12), "#18181b", [5.75 + i * 0.03, yy, 2.25], [Math.PI / 2, 0, 0]));
  }

  // Utility Poles & Transformer
  for (const [idx, x] of [-20, -7.5, 8.5, 21].entries()) {
    solid.push(colorGeo(new CylinderGeometry(0.09, 0.135, 5.8, 8), "#543d2d", [x, 2.9, -2.55]));
    solid.push(colorGeo(new BoxGeometry(0.09, 1.5, 0.09), "#543d2d", [x, 5.38, -2.55], [Math.PI / 2, 0, 0]));
    for (const iz of [-0.55, 0, 0.55]) {
      solid.push(colorGeo(new CylinderGeometry(0.03, 0.04, 0.11, 6), "#94a3b8", [x, 5.48, -2.55 + iz]));
    }
    if (idx === 2) {
      solid.push(colorGeo(new CylinderGeometry(0.16, 0.16, 0.58, 10), "#94a3b8", [x + 0.24, 4.45, -2.55]));
    }
  }

  // Exit Boom Barrier Static Posts (at [-5.4, 0, -1.42])
  solid.push(colorGeo(new BoxGeometry(0.36, 1.24, 0.36), "#eab308", [-5.4, 0.62, -1.42]));
  solid.push(colorGeo(new BoxGeometry(0.38, 0.92, 0.38), "#1e293b", [-5.4, 0.66, -1.42]));
  solid.push(colorGeo(new CylinderGeometry(0.13, 0.16, 1.12, 10), "#1e293b", [-5.4, 0.56, 2.42]));
  solid.push(colorGeo(new BoxGeometry(0.26, 0.22, 0.22), "#eab308", [-5.4, 0.94, 2.42]));

  // Canopy Fascia, Soffit, Steel I-Beams, Columns, Gussets, Downspouts, Yellow Piers & Fire Extinguisher
  solid.push(colorGeo(buildRoundedSlab(11.6, 7.2, 0.34, 0.32, 0.03), "#a83d20", [0, 4.02, 1.32]));
  solid.push(colorGeo(buildRoundedSlab(11.1, 6.7, 0.08, 0.24, 0.02), "#e2dad0", [0, 3.94, 1.32]));
  for (const bx of [-3.6, -1.2, 1.2, 3.6]) {
    solid.push(colorGeo(new BoxGeometry(0.14, 0.1, 6.55), "#272c35", [bx, 3.9, 1.32]));
  }
  for (const bz of [-0.6, 1.32, 3.25]) {
    solid.push(colorGeo(new BoxGeometry(10.9, 0.08, 0.14), "#272c35", [0, 3.91, bz]));
  }
  for (const [x, z] of [
    [-5.0, -1.6],
    [5.0, -1.6],
    [-5.0, 4.25],
    [5.0, 4.25],
  ] as const) {
    solid.push(colorGeo(new BoxGeometry(0.26, 3.96, 0.26), "#272c35", [x, 1.98, z]));
    solid.push(colorGeo(new BoxGeometry(0.46, 0.18, 0.46), "#272c35", [x, 3.84, z]));
    solid.push(colorGeo(new CylinderGeometry(0.32, 0.34, 0.16, 10), "#272c35", [x, 0.08, z]));
    solid.push(colorGeo(new CylinderGeometry(0.036, 0.036, 3.85, 6), "#272c35", [x + (x > 0 ? 0.18 : -0.18), 1.95, z]));
    solid.push(colorGeo(new CylinderGeometry(0.26, 0.3, 0.72, 10), "#eab308", [x, 0.36, z]));
  }
  solid.push(colorGeo(new CylinderGeometry(0.008, 0.008, 0.38, 5), "#272c35", [2.6, 3.74, 0.5]));
  solid.push(colorGeo(new CylinderGeometry(0.008, 0.008, 0.38, 5), "#272c35", [4.2, 3.74, 0.5]));
  solid.push(colorGeo(new CylinderGeometry(0.045, 0.045, 1.85, 8), "#eab308", [3.4, 3.54, 0.5], [0, 0, Math.PI / 2]));
  solid.push(colorGeo(new CylinderGeometry(0.075, 0.075, 0.42, 10), "#dc2626", [4.82, 1.25, 4.25]));
  solid.push(colorGeo(new SphereGeometry(0.075, 8, 6), "#dc2626", [4.82, 1.47, 4.25]));
  solid.push(colorGeo(new BoxGeometry(0.06, 0.06, 0.08), "#272c35", [4.82, 1.54, 4.25]));
  for (const [lx, ly, lz] of [
    [-2.4, 3.88, 0.36],
    [2.4, 3.88, 0.36],
    [-2.4, 3.88, 2.3],
    [2.4, 3.88, 2.3],
  ] as const) {
    solid.push(colorGeo(new BoxGeometry(1.15, 0.04, 0.46), "#272c35", [lx, ly, lz]));
  }

  // Shredder Static Body (at [-5.4, 0, 3.6])
  solid.push(colorGeo(new CylinderGeometry(0.58, 0.64, 1.24, 14), "#374440", [-5.4, 0.74, 3.6]));
  solid.push(colorGeo(buildHopperGeo(), "#64748b", [-5.4, 1.32, 3.6]));
  solid.push(colorGeo(new CylinderGeometry(0.09, 0.11, 0.9, 8), "#334155", [-6.02, 1.15, 3.6]));

  // 2) Canyon Mesas & Boulders (Textured with rockTex -> 1 Draw Call)
  const mesaParts: BufferGeometry[] = [];
  const specs: [number, number, number, number, number, number, number, number][] = [
    [-28, -34, 5.2, 9.8, 4.6, 3.4, 3.2, 1.1],
    [-9, -38, 6.8, 12.6, 5.8, 4.5, 4.1, 3.2],
    [13, -35, 5.8, 10.8, 5.0, 3.8, 3.6, 5.3],
    [31, -29, 4.8, 8.9, 4.2, 2.9, 2.8, 7.4],
    [-34, 28, 5.4, 10.2, 4.4, 3.2, 2.9, 2.9],
    [28, 32, 5.0, 9.4, 4.1, 3.1, 2.7, 6.5],
  ];
  for (const [x, z, rt, rb, h1, crt, ch, seed] of specs) {
    mesaParts.push(placeGeo(buildButteLayerGeo(rt, rb, h1, seed), [x, -0.1, z]));
    mesaParts.push(placeGeo(buildButteLayerGeo(crt, rt * 0.92, ch, seed + 1.4), [x + 0.4, h1 - 0.4, z - 0.3]));
  }
  for (const [x, z, s, idx] of [
    [9.2, -2.6, 0.58, 0],
    [-11.8, -2.1, 0.72, 1],
    [7.8, 6.2, 0.48, 2],
    [-9.6, 6.1, 0.66, 3],
  ] as const) {
    mesaParts.push(placeGeo(new DodecahedronGeometry(s, 0), [x, s * 0.42, z], [idx, idx * 0.7, 0], [1.25, 0.82, 1.1]));
  }

  // 3) All World-Space Ground Ambient Occlusion Contact Shadows -> 1 Draw Call!
  const aos: BufferGeometry[] = [
    placeGeo(new PlaneGeometry(13.2, 1.2), [-1.4, 0.085, -3.6], [-Math.PI / 2, 0, 0]),
    placeGeo(new PlaneGeometry(1.95, 1.8), [-2.32, 0.026, 3.46], [-Math.PI / 2, 0, 0]),
    placeGeo(new PlaneGeometry(0.85, 0.85), [-2.96, 0.026, 4.28], [-Math.PI / 2, 0, 0]),
    placeGeo(new PlaneGeometry(2.1, 1.4), [-3.82, 0.026, 4.96], [-Math.PI / 2, 0, 2.52]),
    placeGeo(new PlaneGeometry(3.5, 1.75), [3.2, 0.026, 2.82], [-Math.PI / 2, 0, 0]),
    placeGeo(new PlaneGeometry(1.95, 1.95), [-5.4, 0.026, 3.6], [-Math.PI / 2, 0, 0]),
    placeGeo(new PlaneGeometry(1.1, 1.1), [-5.4, 0.028, -1.42], [-Math.PI / 2, 0, 0]),
    placeGeo(new PlaneGeometry(0.95, 0.95), [-5.4, 0.028, 2.42], [-Math.PI / 2, 0, 0]),
    placeGeo(new PlaneGeometry(0.95, 0.95), [5.55, 0.025, 3.65], [-Math.PI / 2, 0, 0]),
    placeGeo(new PlaneGeometry(0.95, 0.95), [6.08, 0.025, 4.15], [-Math.PI / 2, 0, 0]),
    placeGeo(new PlaneGeometry(1.05, 1.05), [5.75, 0.025, 2.25], [-Math.PI / 2, 0, 0]),
    ...([
      [-5.0, -1.6],
      [5.0, -1.6],
      [-5.0, 4.25],
      [5.0, 4.25],
    ] as const).map(([x, z]) => placeGeo(new PlaneGeometry(1.35, 1.35), [x, 0.028, z], [-Math.PI / 2, 0, 0])),
  ];

  // 4) Utility Wires
  const w1 = new TubeGeometry(
    new CatmullRomCurve3([
      new Vector3(-20, 5.45, -2.85),
      new Vector3(-13.75, 4.95, -2.85),
      new Vector3(-7.5, 5.45, -2.85),
      new Vector3(0.5, 4.92, -2.85),
      new Vector3(8.5, 5.45, -2.85),
      new Vector3(14.75, 4.95, -2.85),
      new Vector3(21, 5.45, -2.85),
    ]),
    20,
    0.015,
    4,
    false,
  );
  const w2 = new TubeGeometry(
    new CatmullRomCurve3([
      new Vector3(-20, 5.45, -2.25),
      new Vector3(-13.75, 4.95, -2.25),
      new Vector3(-7.5, 5.45, -2.25),
      new Vector3(0.5, 4.92, -2.25),
      new Vector3(8.5, 5.45, -2.25),
      new Vector3(14.75, 4.95, -2.25),
      new Vector3(21, 5.45, -2.25),
    ]),
    20,
    0.015,
    4,
    false,
  );

  // 5) Road Stripes
  const xs = [-28, -24, -20, -16, -12, -8, -4.2, 4.2, 8, 12, 16, 20, 24, 28];
  const stripesGeo = mergeParts(xs.map((x) => placeGeo(new PlaneGeometry(1.65, 0.13), [x, 0.027, 0.5], [-Math.PI / 2, 0, 0])));

  // 6) Merged Concrete Surfaces (Service Apron + Storefront Sidewalk + Fuel Island -> 1 Draw Call!)
  const concreteGeo = mergeParts([
    placeGeo(buildRoundedSlab(15.2, 5.4, 0.055, 0.32, 0.02), [-0.7, -0.018, 4.8]),
    placeGeo(new BoxGeometry(13.2, 0.08, 1.5), [-1.4, 0.04, -2.95]),
    placeGeo(buildRoundedSlab(2.85, 1.06, 0.13, 0.28, 0.02), [3.2, -0.01, 2.82]),
  ]);

  // 7) Boom Barrier Arm (7 parts -> 1 Draw Call!)
  const boomArmGeo = mergeColoredParts([
    colorGeo(new BoxGeometry(0.24, 0.22, 0.42), "#0f172a", [0, 0, -0.34]),
    colorGeo(new CylinderGeometry(0.048, 0.056, 3.82, 8), "#dc2626", [0, 0, 1.9], [Math.PI / 2, 0, 0]),
    ...[0.45, 1.18, 1.9, 2.62, 3.35].map((zz) =>
      colorGeo(new CylinderGeometry(0.053, 0.053, 0.34, 8), "#f8fafc", [0, 0, zz], [Math.PI / 2, 0, 0]),
    ),
  ]);

  // 8) Shredder Spinning Blades (5 parts -> 1 Draw Call!)
  const shredderBladesGeo = mergeColoredParts([
    colorGeo(new CylinderGeometry(0.1, 0.1, 0.72, 10), "#475569", [0, 0, 0], [0, 0, Math.PI / 2]),
    ...[-0.25, -0.08, 0.08, 0.25].map((x) => colorGeo(new ConeGeometry(0.06, 0.18, 6), "#e2e8f0", [x, 0.08, 0], [0.4, 0, 0])),
  ]);

  // 9) Bright Unlit White/Cream Light Panels (Stop line + Store ceiling + Canopy troffers + Towel strip -> 1 Draw Call!)
  const unlitBrightGeo = mergeColoredParts([
    colorGeo(new PlaneGeometry(0.22, 3.4), "#e2e8f0", [-2.25, 0.027, 0.55], [-Math.PI / 2, 0, 0]),
    colorGeo(new PlaneGeometry(9.8, 1.5), "#fef3c7", [-1.4, 2.5, -4.18], [Math.PI / 2, 0, 0]),
    colorGeo(new PlaneGeometry(0.18, 0.06), "#f8fafc", [3.25, 0.86, 2.715]),
    ...([
      [-2.4, 3.857, 0.36],
      [2.4, 3.857, 0.36],
      [-2.4, 3.857, 2.3],
      [2.4, 3.857, 2.3],
    ] as const).map(([lx, ly, lz]) => colorGeo(new PlaneGeometry(1.04, 0.36), "#fffbeb", [lx, ly, lz], [Math.PI / 2, 0, 0])),
  ]);

  return {
    worldSolidGeo: mergeColoredParts(solid),
    mesaRockGeo: mergeParts(mesaParts),
    allAoGeo: mergeParts(aos),
    wireGeo: mergeParts([w1, w2]),
    stripesGeo,
    concreteGeo,
    boomArmGeo,
    shredderBladesGeo,
    unlitBrightGeo,
  };
}

export function Station() {
  const aoTex = useMemo(() => createAoShadowTexture(), []);
  const sandTex = useMemo(() => createSandTexture(), []);
  const concreteTex = useMemo(() => createConcreteTexture(), []);
  const asphaltTex = useMemo(() => createAsphaltTexture(), []);
  const signTex = useMemo(() => createSignTexture(), []);
  const totemTex = useMemo(() => createPriceTotemTexture(), []);
  const rockTex = useMemo(() => createCanyonRockTexture(), []);
  const hazardTex = useMemo(() => createHazardTexture(), []);
  const terrainGeo = useMemo(() => buildDesertTerrainGeo(), []);
  const wg = useMemo(() => buildWorldStaticGeos(), []);

  const monitor = useMemo(() => paint((ctx, w, h) => drawMonitor(ctx, w, h), 384, 240), []);
  const poster = useMemo(() => getSharedPosterArt(), []);

  const nozzleRef = useRef<Group>(null);
  const nozzleBootMat = useRef<MeshLambertMaterial>(null);
  const chargerRef = useRef<Group>(null);
  const spongeRef = useRef<Group>(null);
  const burgerRef = useRef<Group>(null);
  const burgerExtraRef = useRef<Group>(null);
  const capRef = useRef<Group>(null);
  const capExtraRef = useRef<Group>(null);
  const taserRef = useRef<Group>(null);

  const propRefs = useMemo<PropRefs>(
    () => ({
      nozzle: nozzleRef,
      nozzleBootMat,
      charger: chargerRef,
      sponge: spongeRef,
      burger: burgerRef,
      burgerExtra: burgerExtraRef,
      cap: capRef,
      capExtra: capExtraRef,
      taser: taserRef,
    }),
    [],
  );

  const bar = useRef<Group>(null);
  const blades = useRef<Group>(null);
  const gateBeaconMat = useRef<MeshLambertMaterial>(null);
  const skullBtnMat = useRef<MeshLambertMaterial>(null);
  const lastPropKey = useRef("");
  const lastSkull = useRef<boolean | null>(null);

  useFrame((_, dt) => {
    const mk = `${sim.money}|${sim.stars.toFixed(1)}|${sim.review}|${sim.customer}|${sim.day}`;
    if (monitor.key !== mk) {
      monitor.key = mk;
      drawMonitor(monitor.ctx, monitor.canvas.width, monitor.canvas.height);
      monitor.tex.needsUpdate = true;
    }
    const wk = String(sim.warrant);
    if (poster.key !== wk) {
      poster.key = wk;
      drawPoster(poster.ctx, poster.canvas.width, poster.canvas.height);
      poster.tex.needsUpdate = true;
    }

    const pk = `${sim.hold}|${sim.burgers}|${sim.caps}|${sim.grade}`;
    if (lastPropKey.current !== pk) {
      lastPropKey.current = pk;
      if (nozzleRef.current) nozzleRef.current.visible = sim.hold !== "nozzle";
      if (nozzleBootMat.current) {
        nozzleBootMat.current.color.set(GRADES.find((g) => g.id === sim.grade)?.color ?? "#f59e0b");
      }
      if (chargerRef.current) chargerRef.current.visible = sim.hold !== "charger";
      if (spongeRef.current) spongeRef.current.visible = sim.hold !== "sponge";
      if (burgerRef.current) burgerRef.current.visible = sim.hold !== "burger" && sim.burgers > 0;
      if (burgerExtraRef.current) burgerExtraRef.current.visible = sim.burgers > 1;
      if (capRef.current) capRef.current.visible = sim.hold !== "cap" && sim.caps > 0;
      if (capExtraRef.current) capExtraRef.current.visible = sim.caps > 1;
      if (taserRef.current) taserRef.current.visible = sim.hold !== "taser";
    }

    if (bar.current) bar.current.rotation.x = -1.25 * sim.barrier;
    if (blades.current) blades.current.rotation.x += dt * 4.2;

    if (lastSkull.current !== sim.skull) {
      lastSkull.current = sim.skull;
      if (gateBeaconMat.current) {
        const col = sim.skull ? "#ef4444" : "#22c55e";
        gateBeaconMat.current.color.set(col);
        gateBeaconMat.current.emissive.set(col);
      }
      if (skullBtnMat.current) {
        skullBtnMat.current.emissiveIntensity = sim.skull ? 1.25 : 0.42;
      }
    }
  });

  return (
    <group>
      {/* Sculpted Desert Terrain */}
      <mesh geometry={terrainGeo}>
        <meshLambertMaterial map={sandTex} />
      </mesh>

      {/* Merged Concrete Slabs (Service Apron + Storefront Sidewalk + Fuel Island) */}
      <mesh geometry={wg.concreteGeo}>
        <meshLambertMaterial map={concreteTex} />
      </mesh>

      {/* Asphalt Highway (Lối đi của xe) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.5]}>
        <planeGeometry args={[104, 4.1]} />
        <meshLambertMaterial map={asphaltTex} />
      </mesh>

      {/* Subtle Oil Drip + Merged Ground AO Contact Shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.1, 0.024, 0.55]}>
        <planeGeometry args={[3.2, 1.5]} />
        <meshBasicMaterial map={aoTex} transparent opacity={0.42} depthWrite={false} />
      </mesh>
      <mesh geometry={wg.allAoGeo}>
        <meshBasicMaterial map={aoTex} transparent depthWrite={false} />
      </mesh>

      {/* Stop Line, Light Panels, Road Stripes & Utility Wires */}
      <mesh geometry={wg.unlitBrightGeo}>
        <meshBasicMaterial vertexColors />
      </mesh>
      <mesh geometry={wg.stripesGeo}>
        <meshBasicMaterial color="#eab308" />
      </mesh>
      <mesh geometry={wg.wireGeo}>
        <meshBasicMaterial color="#18181b" />
      </mesh>

      {/* Single Master Vertex-Colored World & Canopy Architecture Mesh (1 Draw Call!) */}
      <mesh geometry={wg.worldSolidGeo}>
        <meshLambertMaterial vertexColors />
      </mesh>
      {/* Canopy Warm Front LED Accent Strip */}
      <mesh position={[0, 4.16, 4.95]}>
        <boxGeometry args={[11.1, 0.055, 0.04]} />
        <meshLambertMaterial color="#fef3c7" emissive="#f59e0b" emissiveIntensity={1.0} />
      </mesh>

      {/* Stratified Canyon Ridges */}
      <mesh geometry={wg.mesaRockGeo}>
        <meshLambertMaterial map={rockTex} />
      </mesh>

      {/* Shredder Hazard Band & Spinning Blades */}
      <mesh position={[-5.4, 0.34, 3.6]}>
        <cylinderGeometry args={[0.625, 0.635, 0.22, 14]} />
        <meshLambertMaterial map={hazardTex} />
      </mesh>
      <group ref={blades} position={[-5.4, 1.28, 3.85]}>
        <mesh geometry={wg.shredderBladesGeo}>
          <meshLambertMaterial vertexColors />
        </mesh>
      </group>

      {/* Exit Boom Barrier Beacon & Animated Arm */}
      <mesh position={[-5.4, 1.36, -1.42]}>
        <cylinderGeometry args={[0.11, 0.11, 0.18, 10]} />
        <meshLambertMaterial ref={gateBeaconMat} color="#22c55e" emissive="#22c55e" emissiveIntensity={1.0} />
      </mesh>
      <group ref={bar} position={[-5.4, 1.02, -1.42]}>
        <mesh geometry={wg.boomArmGeo}>
          <meshLambertMaterial vertexColors />
        </mesh>
      </group>

      {/* Route 66 Convenience Store with True 3D Recessed Interior */}
      <Building sign={signTex} totem={totemTex} concrete={concreteTex} ao={aoTex} />

      {/* Interactive Console, Supply Locker, H-Frame Fuel Pump, Squeegee Caddy & DC Supercharger */}
      <Props refs={propRefs} monitor={monitor.tex} poster={poster.tex} skullMatRef={skullBtnMat} />
    </group>
  );
}

function Building({
  sign,
  totem,
  concrete,
  ao,
}: {
  sign: CanvasTexture;
  totem: CanvasTexture;
  concrete: CanvasTexture;
  ao: CanvasTexture;
}) {
  const backGlowRef = useRef<MeshLambertMaterial>(null);
  const lastNight = useRef(-1);
  const brickTex = useMemo(() => createBrickTexture(), []);
  const backWallTex = useMemo(() => createStoreBackWallTexture(), []);
  const iceTex = useMemo(() => createIceChestTexture(), []);
  const vendingTex = useMemo(() => createVendingFrontTexture(), []);
  const openNeonTex = useMemo(() => createOpenSignTexture(), []);

  // Merge ALL untextured solid parts of the Convenience Store into 1 single draw call!
  const bldgSolidGeo = useMemo(() => {
    const p: BufferGeometry[] = [
      // Interior floor, checkout counter, counter top, register, snack gondola, neon box
      colorGeo(new PlaneGeometry(9.8, 1.5), "#8c7e6d", [0, 0.1, 1.62], [-Math.PI / 2, 0, 0]),
      colorGeo(new BoxGeometry(2.1, 0.88, 0.54), "#3e3126", [0.45, 0.52, 1.68]),
      colorGeo(new BoxGeometry(2.18, 0.05, 0.6), "#d6d3d1", [0.45, 0.98, 1.68]),
      colorGeo(new BoxGeometry(0.36, 0.3, 0.28), "#1e293b", [0.05, 1.16, 1.68]),
      colorGeo(new BoxGeometry(1.85, 1.18, 0.42), "#292524", [3.1, 0.72, 1.74]),
      colorGeo(new BoxGeometry(0.92, 0.32, 0.04), "#0f172a", [-3.85, 2.15, 2.22]),
      // Hollow-front stucco shell
      colorGeo(new BoxGeometry(12.1, 3.65, 3.15), "#dfd3be", [0, 1.825, -0.72]),
      colorGeo(new BoxGeometry(1.15, 3.65, 1.52), "#dfd3be", [-5.48, 1.825, 1.6]),
      colorGeo(new BoxGeometry(1.15, 3.65, 1.52), "#dfd3be", [5.48, 1.825, 1.6]),
      colorGeo(new BoxGeometry(9.8, 1.13, 1.52), "#dfd3be", [0, 3.085, 1.6]),
      colorGeo(new BoxGeometry(4.0, 0.84, 0.3), "#dfd3be", [-2.9, 0.42, 2.22]),
      colorGeo(new BoxGeometry(4.0, 0.84, 0.3), "#dfd3be", [2.9, 0.42, 2.22]),
      colorGeo(new BoxGeometry(0.28, 2.52, 0.32), "#dfd3be", [-0.96, 1.26, 2.22]),
      colorGeo(new BoxGeometry(0.28, 2.52, 0.32), "#dfd3be", [0.96, 1.26, 2.22]),
      // Parapet & Awning
      colorGeo(buildRoundedSlab(12.6, 5.0, 0.32, 0.26, 0.03), "#a63e22", [0, 3.66, 0]),
      colorGeo(buildRoundedSlab(9.8, 1.18, 0.09, 0.12, 0.02), "#1f4246", [0, 2.58, 2.78], [0.16, 0, 0]),
      // Metal HVAC, coping, tie-rods, lamp shades, trash bin, push bars
      colorGeo(new BoxGeometry(12.68, 0.07, 0.12), "#94a3b8", [0, 4.02, 2.52]),
      colorGeo(new BoxGeometry(1.65, 0.72, 1.25), "#94a3b8", [-3.4, 4.38, -0.4]),
      colorGeo(new BoxGeometry(1.2, 0.28, 0.38), "#94a3b8", [-2.0, 4.18, -0.4]),
      colorGeo(new CylinderGeometry(0.06, 0.06, 0.65, 8), "#94a3b8", [2.8, 4.3, -0.6]),
      colorGeo(new CylinderGeometry(0.14, 0.06, 0.12, 8), "#94a3b8", [2.8, 4.65, -0.6]),
      ...[-4.35, -2.95, 2.95, 4.35].map((rx) =>
        colorGeo(new CylinderGeometry(0.015, 0.015, 1.05, 5), "#94a3b8", [rx, 2.95, 2.68], [-0.65, 0, 0]),
      ),
      ...[-3.1, 0, 3.1].map((lx) => colorGeo(new CylinderGeometry(0.05, 0.16, 0.12, 8), "#94a3b8", [lx, 2.86, 2.55])),
      colorGeo(new CylinderGeometry(0.24, 0.22, 0.74, 10), "#94a3b8", [-1.38, 0.45, 2.75]),
      colorGeo(new CapsuleGeometry(0.015, 0.34, 3, 6), "#f8fafc", [-0.12, 1.12, 2.39]),
      colorGeo(new CapsuleGeometry(0.015, 0.34, 3, 6), "#f8fafc", [0.12, 1.12, 2.39]),
      // Yellow Bollards
      ...[-4.2, -1.85, 1.85, 4.2].map((bx) => colorGeo(new CylinderGeometry(0.072, 0.082, 0.84, 8), "#eab308", [bx, 0.46, 3.45])),
      // Outdoor Ice Chest & Cold Drinks Machine Bodies
      colorGeo(new BoxGeometry(1.28, 0.92, 0.68), "#f1f5f9", [-5.12, 0.54, 2.74]),
      colorGeo(new BoxGeometry(1.26, 0.07, 0.68), "#94a3b8", [-5.12, 1.04, 2.71], [0.26, 0, 0]),
      colorGeo(new BoxGeometry(0.92, 1.9, 0.66), "#7f1d1d", [5.25, 1.03, 2.72]),
    ];
    for (const wx of [-2.95, 2.95]) {
      p.push(colorGeo(new BoxGeometry(3.72, 0.06, 0.09), "#18181b", [wx, 2.5, 2.34]));
      p.push(colorGeo(new BoxGeometry(3.72, 0.06, 0.09), "#18181b", [wx, 0.84, 2.34]));
      for (const mx of [-1.84, -0.62, 0.62, 1.84]) {
        p.push(colorGeo(new BoxGeometry(0.045, 1.68, 0.08), "#18181b", [wx + mx, 1.67, 2.34]));
      }
    }
    p.push(colorGeo(new BoxGeometry(1.68, 0.06, 0.09), "#18181b", [0, 2.49, 2.34]));
    p.push(colorGeo(new BoxGeometry(0.05, 2.42, 0.08), "#18181b", [-0.82, 1.26, 2.34]));
    p.push(colorGeo(new BoxGeometry(0.05, 2.42, 0.08), "#18181b", [0, 1.26, 2.34]));
    p.push(colorGeo(new BoxGeometry(0.05, 2.42, 0.08), "#18181b", [0.82, 1.26, 2.34]));
    p.push(colorGeo(new BoxGeometry(1.64, 0.22, 0.05), "#18181b", [0, 0.19, 2.34]));
    p.push(colorGeo(new BoxGeometry(1.45, 0.015, 0.72), "#18181b", [0, 0.088, 2.82]));
    p.push(colorGeo(new BoxGeometry(5.4, 1.34, 0.14), "#18181b", [0, 3.36, 2.37]));
    return mergeColoredParts(p);
  }, []);

  const brickGeo = useMemo(
    () =>
      mergeParts([
        placeGeo(new PlaneGeometry(3.9, 0.84), [-2.95, 0.42, 2.375]),
        placeGeo(new PlaneGeometry(3.9, 0.84), [2.95, 0.42, 2.375]),
        placeGeo(new BoxGeometry(0.42, 3.64, 0.32), [-5.95, 1.82, 2.26]),
        placeGeo(new BoxGeometry(0.42, 3.64, 0.32), [5.95, 1.82, 2.26]),
      ]),
    [],
  );

  const storeGlassGeo = useMemo(
    () =>
      mergeParts([
        placeGeo(new PlaneGeometry(3.68, 1.62), [-2.95, 1.67, 2.34]),
        placeGeo(new PlaneGeometry(3.68, 1.62), [2.95, 1.67, 2.34]),
        placeGeo(new PlaneGeometry(1.6, 2.18), [0, 1.38, 2.34]),
      ]),
    [],
  );

  const totemSolidGeo = useMemo(
    () =>
      mergeColoredParts([
        colorGeo(new CylinderGeometry(0.09, 0.1, 5.1, 8), "#27272a", [-0.64, 2.65, 0]),
        colorGeo(new CylinderGeometry(0.09, 0.1, 5.1, 8), "#27272a", [0.64, 2.65, 0]),
        colorGeo(new BoxGeometry(1.38, 2.55, 0.24), "#18181b", [0, 3.35, 0]),
      ]),
    [],
  );

  useFrame(() => {
    if (backGlowRef.current && Math.abs(sim.night - lastNight.current) > 0.01) {
      lastNight.current = sim.night;
      backGlowRef.current.emissiveIntensity = 0.52 + sim.night * 0.48;
    }
  });

  return (
    <group position={[-1.4, 0, -5.8]}>
      {/* Merged Convenience Store Solid Architecture (1 Draw Call!) */}
      <mesh geometry={bldgSolidGeo}>
        <meshLambertMaterial vertexColors />
      </mesh>
      <mesh geometry={brickGeo}>
        <meshLambertMaterial map={brickTex} />
      </mesh>
      <mesh position={[0, 1.42, 0.9]}>
        <planeGeometry args={[9.7, 2.38]} />
        <meshLambertMaterial
          ref={backGlowRef}
          map={backWallTex}
          emissiveMap={backWallTex}
          emissive="#ffffff"
          emissiveIntensity={0.52}
        />
      </mesh>
      <mesh position={[0.95, 1.18, 1.68]}>
        <boxGeometry args={[0.62, 0.36, 0.38]} />
        <meshLambertMaterial color="#fde68a" emissive="#f59e0b" emissiveIntensity={0.35} transparent opacity={0.75} />
      </mesh>
      <mesh position={[-3.85, 2.15, 2.245]}>
        <planeGeometry args={[0.84, 0.28]} />
        <meshBasicMaterial map={openNeonTex} toneMapped={false} />
      </mesh>
      <mesh geometry={storeGlassGeo}>
        <meshPhongMaterial color="#bae6fd" specular="#ffffff" shininess={90} transparent opacity={0.22} />
      </mesh>

      {/* Ice & Cold Drinks Front Panels + Rooftop Sign */}
      <mesh position={[-5.12, 0.54, 3.084]}>
        <planeGeometry args={[1.2, 0.82]} />
        <meshBasicMaterial map={iceTex} />
      </mesh>
      <mesh position={[5.25, 1.06, 3.054]}>
        <planeGeometry args={[0.82, 1.72]} />
        <meshBasicMaterial map={vendingTex} />
      </mesh>
      <mesh position={[0, 3.36, 2.445]}>
        <planeGeometry args={[5.2, 1.22]} />
        <meshBasicMaterial map={sign} toneMapped={false} />
      </mesh>

      {/* Tall Illuminated Highway Fuel Price Totem */}
      <group position={[7.6, 0, 2.2]} rotation={[0, -0.22, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <planeGeometry args={[2.2, 1.6]} />
          <meshBasicMaterial map={ao} transparent depthWrite={false} />
        </mesh>
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[1.7, 0.36, 0.72]} />
          <meshLambertMaterial map={concrete} />
        </mesh>
        <mesh geometry={totemSolidGeo}>
          <meshLambertMaterial vertexColors />
        </mesh>
        <mesh position={[0, 3.35, 0.125]}>
          <planeGeometry args={[1.28, 2.42]} />
          <meshBasicMaterial map={totem} toneMapped={false} />
        </mesh>
        <mesh position={[0, 3.35, -0.125]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[1.28, 2.42]} />
          <meshBasicMaterial map={totem} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function Props({
  refs,
  monitor,
  poster,
  skullMatRef,
}: {
  refs: PropRefs;
  monitor: CanvasTexture;
  poster: CanvasTexture;
  skullMatRef: RefObject<MeshLambertMaterial | null>;
}) {
  const pg = useMemo(() => getPropGeos(), []);
  const pumpFaceTex = useMemo(() => createPumpFaceTexture(), []);
  const pumpTopperTex = useMemo(() => createPumpTopperTexture(), []);
  const spongeTex = useMemo(() => createSpongeTexture(), []);
  const bunTex = useMemo(() => createBunTexture(), []);
  const skullTex = useMemo(() => createConsoleLabelTexture("!", "#dc2626"), []);
  const goTex = useMemo(() => createConsoleLabelTexture("GO", "#16a34a"), []);
  const goldBtnTex = useMemo(() => createConsoleLabelTexture("$", "#15803d", "#fef08a"), []);

  // 1) Merged World-Space Forecourt Equipment Solids: Console + Buttons + Bucket + Bollards + Squeegee Caddy + Fuel Pump + EV Charger -> 1 Draw Call!
  const forecourtSolidGeo = useMemo(() => {
    const hoseCurve = new CatmullRomCurve3([
      new Vector3(2.12, 1.74, 2.88),
      new Vector3(1.96, 1.24, 2.98),
      new Vector3(2.02, 0.68, 2.92),
      new Vector3(2.15, 1.24, 2.8),
    ]);
    const evCurve = new CatmullRomCurve3([
      new Vector3(3.64, 1.6, 2.88),
      new Vector3(3.48, 1.07, 2.96),
      new Vector3(3.54, 0.6, 2.88),
      new Vector3(3.66, 1.22, 2.8),
    ]);

    const p: BufferGeometry[] = [
      // Attendant Console Base & Top ([-2.32, 0, 3.46])
      colorGeo(buildRoundedSlab(1.22, 1.04, 0.92, 0.14, 0.025), "#27303f", [-2.32, 0, 3.46]),
      colorGeo(buildRoundedSlab(1.3, 1.12, 0.065, 0.16, 0.02), "#141b26", [-2.32, 0.93, 3.46]),
      // Console Button Housings ($ Gold, ! Lock, GO Green)
      colorGeo(new BoxGeometry(0.34, 0.065, 0.34), "#1e293b", [-1.98, 1.02, 3.42]),
      colorGeo(new CylinderGeometry(0.145, 0.165, 0.06, 14), "#eab308", [-2.22, 1.02, 3.12]),
      colorGeo(new CylinderGeometry(0.145, 0.165, 0.06, 14), "#334155", [-2.56, 1.02, 3.32]),
      // Wash Bucket + Wire Bail + Soap Suds ([-3.49, 0.91, 5.06])
      colorGeo(new CylinderGeometry(0.155, 0.12, 0.2, 10), "#1d4ed8", [-3.49, 1.01, 5.06]),
      colorGeo(new TorusGeometry(0.16, 0.007, 5, 10, Math.PI), "#e2e8f0", [-3.49, 1.1, 5.06], [0.45, 0, 0]),
      colorGeo(new CircleGeometry(0.142, 10), "#e0f2fe", [-3.49, 1.09, 5.06], [-Math.PI / 2, 0, 0]),
      // Fuel Island Yellow U-Bollards ([3.2, 0, 2.82])
      colorGeo(new BoxGeometry(2.35, 0.1, 0.05), "#eab308", [3.2, 0.05, 3.34]),
      colorGeo(new BoxGeometry(2.35, 0.1, 0.05), "#eab308", [3.2, 0.05, 2.3]),
      ...[-1.26, 1.26].flatMap((bx) => [
        colorGeo(new CylinderGeometry(0.042, 0.042, 0.84, 8), "#eab308", [3.2 + bx, 0.54, 2.58]),
        colorGeo(new CylinderGeometry(0.042, 0.042, 0.84, 8), "#eab308", [3.2 + bx, 0.54, 3.06]),
        colorGeo(new TorusGeometry(0.24, 0.042, 6, 10, Math.PI), "#eab308", [3.2 + bx, 0.96, 2.82], [0, Math.PI / 2, 0]),
      ]),
      // Forecourt Blue Windshield Squeegee & Paper-Towel Caddy ([3.25, 0.12, 2.6])
      colorGeo(new BoxGeometry(0.28, 0.72, 0.24), "#1e3a8a", [3.25, 0.48, 2.6]),
      colorGeo(new BoxGeometry(0.3, 0.22, 0.22), "#1e293b", [3.25, 0.94, 2.6]),
      colorGeo(new CylinderGeometry(0.01, 0.01, 0.44, 6), "#a16207", [3.41, 0.7, 2.6], [0, 0, -0.18]),
      colorGeo(new BoxGeometry(0.03, 0.03, 0.18), "#09090b", [3.45, 0.9, 2.6], [0, 0, -0.18]),
      // Commercial H-Frame Multi-Product Fuel Pump ([2.48, 0.12, 2.82])
      colorGeo(new BoxGeometry(0.76, 0.76, 0.48), "#1f242d", [2.48, 0.5, 2.82]),
      colorGeo(new PlaneGeometry(0.66, 0.64), "#b9381e", [2.48, 0.5, 3.065]),
      colorGeo(new PlaneGeometry(0.66, 0.64), "#b9381e", [2.48, 0.5, 2.575], [0, Math.PI, 0]),
      colorGeo(new BoxGeometry(0.09, 2.08, 0.44), "#cbd5e1", [2.13, 1.16, 2.82]),
      colorGeo(new BoxGeometry(0.09, 2.08, 0.44), "#cbd5e1", [2.83, 1.16, 2.82]),
      colorGeo(new BoxGeometry(0.62, 0.78, 0.4), "#18181b", [2.48, 1.36, 2.82]),
      colorGeo(new BoxGeometry(0.88, 0.32, 0.52), "#b9381e", [2.48, 2.06, 2.82]),
      colorGeo(new PlaneGeometry(0.3, 0.85), "#18181b", [2.08, 1.34, 2.82], [0, -Math.PI / 2, 0]),
      colorGeo(new BoxGeometry(0.08, 0.28, 0.18), "#09090b", [2.07, 1.24, 2.82]),
      colorGeo(new TubeGeometry(hoseCurve, 12, 0.024, 6, false), "#141417"),
      // 150kW Hollow-Arch DC Ultra-Fast EV Supercharger ([3.92, 0.12, 2.82])
      colorGeo(new BoxGeometry(0.68, 0.72, 0.42), "#18181b", [3.92, 0.48, 2.82]),
      colorGeo(new BoxGeometry(0.12, 1.4, 0.38), "#e2e8f0", [3.65, 1.4, 2.82]),
      colorGeo(new BoxGeometry(0.12, 1.4, 0.38), "#e2e8f0", [4.19, 1.4, 2.82]),
      colorGeo(new BoxGeometry(0.68, 0.16, 0.4), "#e2e8f0", [3.92, 2.1, 2.82]),
      colorGeo(new BoxGeometry(0.44, 0.36, 0.32), "#0f172a", [3.92, 1.3, 2.82]),
      colorGeo(new TubeGeometry(evCurve, 12, 0.026, 6, false), "#141417"),
    ];
    return mergeColoredParts(p);
  }, []);

  // 2) Merged Static Emissive Pads ($ Gold, GO Green, EV Cyan Strips & Screen -> 3 tiny meshes)
  const evGlowGeo = useMemo(
    () =>
      mergeParts([
        placeGeo(new BoxGeometry(0.015, 1.28, 0.18), [3.712, 1.4, 2.82]),
        placeGeo(new BoxGeometry(0.015, 1.28, 0.18), [4.128, 1.4, 2.82]),
        placeGeo(new PlaneGeometry(0.34, 0.24), [3.92, 1.3, 2.985]),
      ]),
    [],
  );

  // 3) Monitor Case, Lectern Stand, and Supply Locker Merged Solids
  const monitorCaseGeo = useMemo(() => buildRoundedSlab(1.02, 0.68, 0.045, 0.05, 0.015), []);
  const lecternGeo = useMemo(
    () =>
      mergeColoredParts([
        colorGeo(new CylinderGeometry(0.032, 0.042, 1.24, 8), "#334155", [0, 0.62, 0]),
        colorGeo(new CylinderGeometry(0.2, 0.22, 0.06, 10), "#1e293b", [0, 0.04, 0]),
        colorGeo(new BoxGeometry(0.48, 0.62, 0.028), "#44403c", [0, 1.315, 0.022], [-0.28, 0, 0]),
        colorGeo(new BoxGeometry(0.16, 0.045, 0.035), "#e2e8f0", [0, 1.6, 0.128], [-0.28, 0, 0]),
      ]),
    [],
  );
  const lockerShellGeo = useMemo(
    () =>
      mergeColoredParts([
        colorGeo(new BoxGeometry(1.44, 2.16, 0.1), "#2c3340", [0, 1.08, -0.34]),
        colorGeo(new BoxGeometry(0.08, 2.16, 0.76), "#2c3340", [-0.68, 1.08, 0]),
        colorGeo(new BoxGeometry(0.08, 2.16, 0.76), "#2c3340", [0.68, 1.08, 0]),
        ...[0.08, 0.88, 1.34, 2.08].map((sy) => colorGeo(new BoxGeometry(1.38, 0.055, 0.76), "#475569", [0, sy, 0])),
      ]),
    [],
  );

  const pumpFacesGeo = useMemo(
    () =>
      mergeParts([
        placeGeo(new PlaneGeometry(0.54, 0.68), [2.48, 1.36, 3.025]),
        placeGeo(new PlaneGeometry(0.54, 0.68), [2.48, 1.36, 2.615], [0, Math.PI, 0]),
      ]),
    [],
  );
  const pumpToppersGeo = useMemo(
    () =>
      mergeParts([
        placeGeo(new PlaneGeometry(0.8, 0.22), [2.48, 2.06, 3.085]),
        placeGeo(new PlaneGeometry(0.8, 0.22), [2.48, 2.06, 2.555], [0, Math.PI, 0]),
      ]),
    [],
  );

  return (
    <group>
      {/* Merged Forecourt Solids (1 Draw Call!) */}
      <mesh geometry={forecourtSolidGeo}>
        <meshLambertMaterial vertexColors />
      </mesh>
      <mesh geometry={evGlowGeo}>
        <meshLambertMaterial color="#0ea5e9" emissive="#38bdf8" emissiveIntensity={0.95} />
      </mesh>
      <mesh geometry={pumpFacesGeo}>
        <meshBasicMaterial map={pumpFaceTex} toneMapped={false} />
      </mesh>
      <mesh geometry={pumpToppersGeo}>
        <meshBasicMaterial map={pumpTopperTex} toneMapped={false} />
      </mesh>

      {/* Widescreen POS Touchscreen Terminal */}
      <group position={[-2.4, 1.0, 3.7]} rotation={[0, 0.95, 0]}>
        <mesh position={[0, 0.15, -0.1]} rotation={[0.18, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.068, 0.32, 8]} />
          <meshLambertMaterial color="#475569" />
        </mesh>
        <group position={[0, 0.38, 0]} rotation={[-0.2, 0, 0]}>
          <mesh geometry={monitorCaseGeo} position={[0, 0, -0.065]} rotation={[Math.PI / 2, 0, 0]}>
            <meshLambertMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, 0, 0.018]}>
            <planeGeometry args={[0.94, 0.6]} />
            <meshBasicMaterial map={monitor} toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* Dedicated Wanted Warrant Lectern Stand */}
      <group position={[-2.96, 0, 4.28]} rotation={[0, 0.88, 0]}>
        <mesh geometry={lecternGeo}>
          <meshLambertMaterial vertexColors />
        </mesh>
        <mesh position={[0, 1.31, 0.042]} rotation={[-0.28, 0, 0]}>
          <planeGeometry args={[0.42, 0.56]} />
          <meshBasicMaterial map={poster} toneMapped={false} />
        </mesh>
      </group>

      {/* Console Button Caps & Labels */}
      <mesh position={[-1.98, 1.058, 3.42]}>
        <cylinderGeometry args={[0.135, 0.15, 0.045, 14]} />
        <meshLambertMaterial color="#eab308" emissive="#d97706" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[-1.98, 1.083, 3.42]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.115, 14]} />
        <meshBasicMaterial map={goldBtnTex} />
      </mesh>

      <mesh position={[-2.22, 1.065, 3.12]}>
        <cylinderGeometry args={[0.108, 0.118, 0.055, 14]} />
        <meshLambertMaterial ref={skullMatRef} color="#dc2626" emissive="#ef4444" emissiveIntensity={0.42} />
      </mesh>
      <mesh position={[-2.22, 1.095, 3.12]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.095, 14]} />
        <meshBasicMaterial map={skullTex} />
      </mesh>

      <mesh position={[-2.56, 1.065, 3.32]}>
        <cylinderGeometry args={[0.108, 0.118, 0.055, 14]} />
        <meshLambertMaterial color="#16a34a" emissive="#22c55e" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-2.56, 1.095, 3.32]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.095, 14]} />
        <meshBasicMaterial map={goTex} />
      </mesh>

      {/* LEFT-BACK: INDUSTRIAL GLASS-FRONT SUPPLY LOCKER */}
      <group position={[-3.82, 0, 4.96]} rotation={[0, 2.52, 0]}>
        <mesh geometry={lockerShellGeo}>
          <meshLambertMaterial vertexColors />
        </mesh>
        <group position={[0.68, 1.08, 0.38]} rotation={[0, 1.18, 0]}>
          <mesh position={[-0.34, 0, 0]}>
            <boxGeometry args={[0.68, 1.96, 0.032]} />
            <meshPhongMaterial color="#bae6fd" specular="#ffffff" shininess={85} transparent opacity={0.3} />
          </mesh>
          <mesh position={[-0.66, 0, 0]}>
            <boxGeometry args={[0.04, 1.98, 0.045]} />
            <meshLambertMaterial color="#334155" />
          </mesh>
        </group>
      </group>

      {/* Pickable Interactive Props on Shelves & Holsters */}
      <group ref={refs.burger} position={[-3.49, 1.39, 5.06]}>
        <BurgerProp bunTex={bunTex} />
      </group>
      <group ref={refs.burgerExtra} position={[-3.72, 1.39, 4.92]} scale={0.9}>
        <BurgerProp bunTex={bunTex} />
      </group>

      <group ref={refs.cap} position={[-4.02, 1.39, 4.71]}>
        <GasCapProp />
      </group>
      <group ref={refs.capExtra} position={[-4.19, 1.39, 4.58]} scale={0.92}>
        <GasCapProp />
      </group>

      <group ref={refs.sponge} position={[-3.49, 1.11, 5.06]} rotation={[0, 0.35, 0]} scale={1.12}>
        <mesh geometry={pg.spongeYellowGeo}>
          <meshLambertMaterial map={spongeTex} />
        </mesh>
        <mesh geometry={pg.spongeGreenGeo}>
          <meshLambertMaterial color="#15803d" />
        </mesh>
      </group>

      <group ref={refs.taser} position={[-4.02, 0.96, 4.71]} rotation={[0, -1.15, Math.PI / 2]} scale={1.15}>
        <mesh geometry={pg.taserDarkGeo}>
          <meshLambertMaterial color="#18181b" />
        </mesh>
        <mesh geometry={pg.taserYellowGeo}>
          <meshLambertMaterial color="#eab308" />
        </mesh>
        <mesh geometry={pg.taserArcGeo}>
          <meshLambertMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={1.1} />
        </mesh>
      </group>

      <group ref={refs.nozzle} position={[2.08, 1.24, 2.8]} rotation={[0.95, 1.57, 0]}>
        <mesh geometry={pg.nozzleMetalGeo}>
          <meshPhongMaterial color="#d8e0ea" specular="#ffffff" shininess={80} />
        </mesh>
        <mesh geometry={pg.nozzleBootGeo}>
          <meshLambertMaterial ref={refs.nozzleBootMat} color="#f59e0b" />
        </mesh>
      </group>

      <group ref={refs.charger} position={[3.6, 1.22, 2.8]} rotation={[0.95, 1.57, 0]}>
        <mesh geometry={pg.chargerDarkGeo}>
          <meshLambertMaterial color="#1e293b" />
        </mesh>
        <mesh geometry={pg.chargerCyanGeo}>
          <meshLambertMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={1.1} />
        </mesh>
      </group>
    </group>
  );
}

function BurgerProp({ bunTex }: { bunTex: CanvasTexture }) {
  const pg = useMemo(() => getPropGeos(), []);
  return (
    <group>
      <mesh geometry={pg.burgerSolidGeo}>
        <meshLambertMaterial vertexColors />
      </mesh>
      <mesh geometry={pg.burgerBunAndFriesGeo}>
        <meshLambertMaterial map={bunTex} />
      </mesh>
    </group>
  );
}

function GasCapProp() {
  const pg = useMemo(() => getPropGeos(), []);
  return (
    <group>
      <mesh geometry={pg.capDarkGeo}>
        <meshLambertMaterial color="#18181b" />
      </mesh>
      <mesh geometry={pg.capRedGeo}>
        <meshPhongMaterial color="#dc2626" specular="#fca5a5" shininess={65} />
      </mesh>
    </group>
  );
}
