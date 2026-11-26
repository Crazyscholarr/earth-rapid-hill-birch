import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import {
  BoxGeometry,
  CapsuleGeometry,
  CatmullRomCurve3,
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
  type MeshStandardMaterial,
} from "three";
import { GRADES } from "@/game/content";
import { mergeParts, placeGeo } from "@/game/geo";
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
  createPriceTotemTexture,
  createPumpFaceTexture,
  createPumpTopperTexture,
  createSandTexture,
  createSignTexture,
  createSpongeTexture,
  createStoreBackWallTexture,
  createSurfaceBumpTexture,
  createVendingFrontTexture,
  drawMonitor,
  drawPoster,
  paint,
} from "@/game/textures";

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
    bevelSegments: 2,
    curveSegments: 8,
  });
  geo.rotateX(-Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

function buildDesertTerrainGeo() {
  // Optimized 42x42 grid (3.5x fewer vertices than 72x72 with identical smooth dune silhouette!)
  const geo = new PlaneGeometry(176, 176, 42, 42);
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
  const lathe = new LatheGeometry(pts, 20);
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
  return new LatheGeometry(pts, 20);
}

function buildMergedRoadStripesGeo(): BufferGeometry {
  const xs = [-28, -24, -20, -16, -12, -8, -4.2, 4.2, 8, 12, 16, 20, 24, 28];
  return mergeParts(xs.map((x) => placeGeo(new PlaneGeometry(1.65, 0.13), [x, 0.027, 0.5], [-Math.PI / 2, 0, 0])));
}

function buildMergedGuardrailsGeo() {
  const rails: BufferGeometry[] = [];
  const posts: BufferGeometry[] = [];
  for (const cx of [-16.5, 16.5]) {
    rails.push(placeGeo(new BoxGeometry(15, 0.24, 0.06), [cx, 0.56, -1.82]));
    rails.push(placeGeo(new BoxGeometry(15, 0.05, 0.08), [cx, 0.62, -1.8]));
    rails.push(placeGeo(new BoxGeometry(15, 0.05, 0.08), [cx, 0.5, -1.8]));
    for (const px of [-6, -3, 0, 3, 6]) {
      posts.push(placeGeo(new BoxGeometry(0.1, 0.7, 0.1), [cx + px, 0.35, -1.87]));
    }
  }
  return { railGeo: mergeParts(rails), postGeo: mergeParts(posts) };
}

function buildMergedEnvironmentGeo() {
  // Merge all cacti, desert sagebrush, boulders, and canyon mesas into 4 static draw calls!
  const cactusParts: BufferGeometry[] = [];
  const spots: [number, number, number][] = [
    [10.2, -3.4, 1.05],
    [14.8, -5.8, 1.3],
    [8.4, -8.2, 0.9],
    [15.5, 4.8, 1.15],
    [-13.5, -2.8, 1.22],
    [-12.5, 4.8, 0.95],
    [7.2, 7.2, 1.08],
    [-8.8, 6.6, 0.98],
  ];
  for (const [x, z, s] of spots) {
    cactusParts.push(placeGeo(new CylinderGeometry(0.13 * s, 0.155 * s, 1.48 * s, 10), [x, 0.78 * s, z]));
    cactusParts.push(placeGeo(new SphereGeometry(0.13 * s, 10, 6), [x, 1.52 * s, z]));
    cactusParts.push(placeGeo(new CapsuleGeometry(0.075 * s, 0.38 * s, 4, 8), [x + 0.24 * s, 0.82 * s, z], [0, 0, -0.68]));
    cactusParts.push(placeGeo(new CapsuleGeometry(0.07 * s, 0.34 * s, 4, 8), [x - 0.24 * s, 0.96 * s, z], [0, 0, 0.68]));
  }

  const shrubParts: BufferGeometry[] = [];
  for (const [x, z, s] of [
    [8.2, -2.2, 0.36],
    [11.8, 3.6, 0.44],
    [-10.8, 3.2, 0.4],
    [-8.2, -2.4, 0.34],
    [13.4, -2.6, 0.38],
  ] as const) {
    shrubParts.push(placeGeo(new DodecahedronGeometry(s, 1), [x, s * 0.45, z], [0, x, 0], [1.35, 0.72, 1.2]));
  }

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
    mesaParts.push(placeGeo(new DodecahedronGeometry(s, 1), [x, s * 0.42, z], [idx, idx * 0.7, 0], [1.25, 0.82, 1.1]));
  }

  return {
    cactusGeo: mergeParts(cactusParts),
    shrubGeo: mergeParts(shrubParts),
    mesaRockGeo: mergeParts(mesaParts),
  };
}

export function Station() {
  const aoTex = useMemo(() => createAoShadowTexture(), []);
  const sandTex = useMemo(() => createSandTexture(), []);
  const bumpTex = useMemo(() => createSurfaceBumpTexture(), []);
  const concreteTex = useMemo(() => createConcreteTexture(), []);
  const asphaltTex = useMemo(() => createAsphaltTexture(), []);
  const signTex = useMemo(() => createSignTexture(), []);
  const totemTex = useMemo(() => createPriceTotemTexture(), []);
  const rockTex = useMemo(() => createCanyonRockTexture(), []);
  const terrainGeo = useMemo(() => buildDesertTerrainGeo(), []);
  const padGeo = useMemo(() => buildRoundedSlab(15.2, 5.4, 0.055, 0.32, 0.02), []);
  const stripesGeo = useMemo(() => buildMergedRoadStripesGeo(), []);
  const { railGeo, postGeo } = useMemo(() => buildMergedGuardrailsGeo(), []);
  const { cactusGeo, shrubGeo, mesaRockGeo } = useMemo(() => buildMergedEnvironmentGeo(), []);

  const monitor = useMemo(
    () =>
      paint((ctx, w, h) => {
        drawMonitor(ctx, w, h);
      }, 640, 400),
    [],
  );

  const poster = useMemo(
    () =>
      paint((ctx, w, h) => {
        drawPoster(ctx, w, h);
      }, 512, 680),
    [],
  );

  const prop = useRef<Group>(null);
  const bar = useRef<Group>(null);
  const blades = useRef<Group>(null);
  const gateBeaconMat = useRef<MeshStandardMaterial>(null);
  const skullBtnMat = useRef<MeshStandardMaterial>(null);

  useFrame((_, dt) => {
    const mk = `${sim.money}|${sim.stars.toFixed(1)}|${sim.tipI}|${sim.review}|${sim.customer}|${sim.day}`;
    if (monitor.key !== mk) {
      monitor.key = mk;
      drawMonitor(monitor.ctx, 640, 400);
      monitor.tex.needsUpdate = true;
    }
    const wk = `${sim.warrant}|${sim.posterUp}`;
    if (poster.key !== wk) {
      poster.key = wk;
      drawPoster(poster.ctx, 512, 680);
      poster.tex.needsUpdate = true;
    }
    const root = prop.current;
    if (root) {
      const vis = (name: string, on: boolean) => {
        const o = root.getObjectByName(name);
        if (o) o.visible = on;
      };
      vis("prop-nozzle", sim.hold !== "nozzle");
      vis("prop-charger", sim.hold !== "charger");
      vis("prop-sponge", sim.hold !== "sponge");
      vis("prop-burger", sim.hold !== "burger" && sim.burgers > 0);
      vis("prop-burger-extra", sim.burgers > 1);
      vis("prop-cap", sim.hold !== "cap" && sim.caps > 0);
      vis("prop-cap-extra", sim.caps > 1);
      vis("prop-taser", sim.hold !== "taser");
    }
    if (bar.current) bar.current.rotation.x = -1.25 * sim.barrier;
    if (blades.current) blades.current.rotation.x += dt * 4.2;
    if (gateBeaconMat.current) {
      const col = sim.skull ? "#ef4444" : "#22c55e";
      gateBeaconMat.current.color.set(col);
      gateBeaconMat.current.emissive.set(col);
    }
    if (skullBtnMat.current) {
      skullBtnMat.current.emissiveIntensity = sim.skull ? 1.35 : 0.42;
    }
  });

  return (
    <group>
      {/* Sculpted Desert Terrain (Pre-baked contrast & mipmaps, zero bump shader overhead) */}
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial map={sandTex} roughness={0.95} metalness={0} />
      </mesh>

      {/* Open Concrete Service Apron (Employee Forecourt) */}
      <mesh geometry={padGeo} position={[-0.7, -0.018, 4.8]} receiveShadow>
        <meshStandardMaterial map={concreteTex} roughness={0.85} metalness={0.04} />
      </mesh>

      {/* Asphalt Highway (Lối đi của xe) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.5]} receiveShadow>
        <planeGeometry args={[104, 4.1]} />
        <meshStandardMaterial map={asphaltTex} roughness={0.88} metalness={0.05} />
      </mesh>
      {/* Subtle Oil Drip & Tire Stop Wear Patch on Service Bay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.1, 0.024, 0.55]}>
        <planeGeometry args={[3.2, 1.5]} />
        <meshBasicMaterial map={aoTex} transparent opacity={0.42} depthWrite={false} />
      </mesh>
      {/* Concrete Curbs */}
      <mesh position={[0, 0.045, -1.52]} receiveShadow>
        <boxGeometry args={[104, 0.07, 0.18]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.82} />
      </mesh>
      <mesh position={[0, 0.045, 2.52]} receiveShadow>
        <boxGeometry args={[104, 0.07, 0.18]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.82} />
      </mesh>
      {/* Stop Line & Merged Road Stripes (1 Draw Call!) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.25, 0.027, 0.55]}>
        <planeGeometry args={[0.22, 3.4]} />
        <meshBasicMaterial color="#e2e8f0" />
      </mesh>
      <mesh geometry={stripesGeo}>
        <meshBasicMaterial color="#eab308" />
      </mesh>

      {/* Route 66 Convenience Store with True 3D Recessed Interior! */}
      <Building sign={signTex} totem={totemTex} bump={bumpTex} concrete={concreteTex} ao={aoTex} />
      {/* Structural Steel Forecourt Canopy with Gussets, Downspouts, Fire Extinguisher & Clearance Sign */}
      <Canopy ao={aoTex} />
      {/* Interactive Console, Supply Locker, H-Frame Fuel Pump, Squeegee Caddy & DC Supercharger */}
      <Props
        root={prop}
        monitor={monitor.tex}
        poster={poster.tex}
        ao={aoTex}
        concrete={concreteTex}
        skullMatRef={skullBtnMat}
      />
      {/* Industrial Shredder */}
      <Shredder blades={blades} ao={aoTex} />
      <RoadsideDecor ao={aoTex} />

      {/* Heavy-Duty Exit Boom Barrier Gate spanning the left lane (Cái cổng chặn xe) */}
      <group position={[-5.4, 0, -1.42]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.028, 0]}>
          <planeGeometry args={[1.1, 1.1]} />
          <meshBasicMaterial map={aoTex} transparent depthWrite={false} />
        </mesh>
        <mesh position={[0, 0.62, 0]} castShadow>
          <boxGeometry args={[0.36, 1.24, 0.36]} />
          <meshStandardMaterial color="#eab308" roughness={0.42} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0.66, 0]} castShadow>
          <boxGeometry args={[0.38, 0.92, 0.38]} />
          <meshStandardMaterial color="#1e293b" roughness={0.45} metalness={0.55} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.028, 3.84]}>
          <planeGeometry args={[0.95, 0.95]} />
          <meshBasicMaterial map={aoTex} transparent depthWrite={false} />
        </mesh>
        <mesh position={[0, 0.56, 3.84]} castShadow>
          <cylinderGeometry args={[0.13, 0.16, 1.12, 14]} />
          <meshStandardMaterial color="#1e293b" roughness={0.45} metalness={0.55} />
        </mesh>
        <mesh position={[0, 0.94, 3.84]}>
          <boxGeometry args={[0.26, 0.22, 0.22]} />
          <meshStandardMaterial color="#eab308" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.36, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.18, 14]} />
          <meshStandardMaterial
            ref={gateBeaconMat}
            color="#22c55e"
            emissive="#22c55e"
            emissiveIntensity={1.1}
          />
        </mesh>
        <group ref={bar} position={[0, 1.02, 0]}>
          <mesh position={[0, 0, -0.34]}>
            <boxGeometry args={[0.24, 0.22, 0.42]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0, 1.9]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.048, 0.056, 3.82, 10]} />
            <meshStandardMaterial color="#dc2626" roughness={0.35} />
          </mesh>
          {[0.45, 1.18, 1.9, 2.62, 3.35].map((zz) => (
            <mesh key={zz} position={[0, 0, zz]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.053, 0.053, 0.34, 10]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>
          ))}
        </group>
      </group>

      {/* Merged Highway Guardrails */}
      <mesh geometry={railGeo}>
        <meshStandardMaterial color="#cbd5e1" roughness={0.36} metalness={0.78} />
      </mesh>
      <mesh geometry={postGeo}>
        <meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.65} />
      </mesh>

      <UtilityPoles />

      {/* Merged Desert Flora, Boulders & Stratified Canyon Ridges (3 Draw Calls Total, Zero Shadow-Pass Cost!) */}
      <mesh geometry={cactusGeo}>
        <meshStandardMaterial color="#365931" roughness={0.88} />
      </mesh>
      <mesh geometry={shrubGeo}>
        <meshStandardMaterial color="#676e49" roughness={0.95} flatShading />
      </mesh>
      <mesh geometry={mesaRockGeo}>
        <meshStandardMaterial map={rockTex} roughness={0.94} />
      </mesh>
    </group>
  );
}

function Building({
  sign,
  totem,
  bump,
  concrete,
  ao,
}: {
  sign: CanvasTexture;
  totem: CanvasTexture;
  bump: CanvasTexture;
  concrete: CanvasTexture;
  ao: CanvasTexture;
}) {
  const backGlowRef = useRef<MeshStandardMaterial>(null);
  const brickTex = useMemo(() => createBrickTexture(), []);
  const backWallTex = useMemo(() => createStoreBackWallTexture(), []);
  const iceTex = useMemo(() => createIceChestTexture(), []);
  const vendingTex = useMemo(() => createVendingFrontTexture(), []);
  const openNeonTex = useMemo(() => createConsoleLabelTexture("OPEN", "#0f172a", "#f87171"), []);
  const parapetGeo = useMemo(() => buildRoundedSlab(12.6, 5.0, 0.32, 0.26, 0.03), []);
  const awningGeo = useMemo(() => buildRoundedSlab(9.8, 1.18, 0.09, 0.12, 0.02), []);

  // Hollow-front stucco shell so the 3D interior room is genuinely recessed 1.55m inside!
  const stuccoShellGeo = useMemo(() => {
    const parts: BufferGeometry[] = [
      // Rear & Side solid building walls (z: -2.3 -> +0.85)
      placeGeo(new BoxGeometry(12.1, 3.65, 3.15), [0, 1.825, -0.72]),
      // Left & Right front outer wall wings (flanking windows)
      placeGeo(new BoxGeometry(1.15, 3.65, 1.52), [-5.48, 1.825, 1.6]),
      placeGeo(new BoxGeometry(1.15, 3.65, 1.52), [5.48, 1.825, 1.6]),
      // Upper header wall above storefront windows & doors (y: 2.52 -> 3.65)
      placeGeo(new BoxGeometry(9.8, 1.13, 1.52), [0, 3.085, 1.6]),
      // Lower knee-wall under left & right windows (y: 0 -> 0.84)
      placeGeo(new BoxGeometry(4.0, 0.84, 0.3), [-2.9, 0.42, 2.22]),
      placeGeo(new BoxGeometry(4.0, 0.84, 0.3), [2.9, 0.42, 2.22]),
      // Columns flanking center double entrance door
      placeGeo(new BoxGeometry(0.28, 2.52, 0.32), [-0.96, 1.26, 2.22]),
      placeGeo(new BoxGeometry(0.28, 2.52, 0.32), [0.96, 1.26, 2.22]),
    ];
    return mergeParts(parts);
  }, []);

  // Storefront aluminum window/door mullions, tie-rods & HVAC merged
  const storeMetalGeo = useMemo(() => {
    const parts: BufferGeometry[] = [
      // Parapet metal coping
      placeGeo(new BoxGeometry(12.68, 0.07, 0.12), [0, 4.02, 2.52]),
      // Rooftop HVAC + Sheet-Metal Duct + Vent Pipes
      placeGeo(new BoxGeometry(1.65, 0.72, 1.25), [-3.4, 4.38, -0.4]),
      placeGeo(new BoxGeometry(1.2, 0.28, 0.38), [-2.0, 4.18, -0.4]),
      placeGeo(new CylinderGeometry(0.06, 0.06, 0.65, 8), [2.8, 4.3, -0.6]),
      placeGeo(new CylinderGeometry(0.14, 0.06, 0.12, 8), [2.8, 4.65, -0.6]),
      // Awning Steel Tie-Rods
      ...[-4.35, -2.95, 2.95, 4.35].map((rx) =>
        placeGeo(new CylinderGeometry(0.015, 0.015, 1.05, 6), [rx, 2.95, 2.68], [-0.65, 0, 0]),
      ),
      // 3 Gooseneck Storefront Lamp Shades
      ...[-3.1, 0, 3.1].map((lx) => placeGeo(new CylinderGeometry(0.05, 0.16, 0.12, 10), [lx, 2.86, 2.55])),
      // Outdoor Trash Receptacle beside door
      placeGeo(new CylinderGeometry(0.24, 0.22, 0.74, 12), [-1.38, 0.45, 2.75]),
    ];
    return mergeParts(parts);
  }, []);

  const darkFramesGeo = useMemo(() => {
    const parts: BufferGeometry[] = [];
    // Left & Right Storefront Window Frames + Mullions
    for (const wx of [-2.95, 2.95]) {
      parts.push(placeGeo(new BoxGeometry(3.72, 0.06, 0.09), [wx, 2.5, 2.34]));
      parts.push(placeGeo(new BoxGeometry(3.72, 0.06, 0.09), [wx, 0.84, 2.34]));
      for (const mx of [-1.84, -0.62, 0.62, 1.84]) {
        parts.push(placeGeo(new BoxGeometry(0.045, 1.68, 0.08), [wx + mx, 1.67, 2.34]));
      }
    }
    // Center Double Glass Entrance Door Frames
    parts.push(placeGeo(new BoxGeometry(1.68, 0.06, 0.09), [0, 2.49, 2.34]));
    parts.push(placeGeo(new BoxGeometry(0.05, 2.42, 0.08), [-0.82, 1.26, 2.34]));
    parts.push(placeGeo(new BoxGeometry(0.05, 2.42, 0.08), [0, 1.26, 2.34]));
    parts.push(placeGeo(new BoxGeometry(0.05, 2.42, 0.08), [0.82, 1.26, 2.34]));
    // Lower door kickplates + rubber welcome doormat
    parts.push(placeGeo(new BoxGeometry(1.64, 0.22, 0.05), [0, 0.19, 2.34]));
    parts.push(placeGeo(new BoxGeometry(1.45, 0.015, 0.72), [0, 0.088, 2.82]));
    // Signboard Housing
    parts.push(placeGeo(new BoxGeometry(5.4, 1.34, 0.14), [0, 3.36, 2.37]));
    return mergeParts(parts);
  }, []);

  useFrame(() => {
    if (backGlowRef.current) {
      backGlowRef.current.emissiveIntensity = 0.58 + sim.night * 0.55;
    }
  });

  return (
    <group position={[-1.4, 0, -5.8]}>
      {/* Storefront Concrete Sidewalk Apron */}
      <mesh position={[0, 0.04, 2.85]} receiveShadow>
        <boxGeometry args={[13.2, 0.08, 1.5]} />
        <meshStandardMaterial map={concrete} roughness={0.84} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.085, 2.2]}>
        <planeGeometry args={[13.2, 1.2]} />
        <meshBasicMaterial map={ao} transparent depthWrite={false} />
      </mesh>
      {[-4.2, -1.85, 1.85, 4.2].map((bx) => (
        <mesh key={bx} position={[bx, 0.46, 3.45]} castShadow>
          <cylinderGeometry args={[0.072, 0.082, 0.84, 12]} />
          <meshStandardMaterial color="#eab308" roughness={0.4} metalness={0.3} />
        </mesh>
      ))}

      {/* ============================================================
          REAL 3D RECESSED CONVENIENCE STORE INTERIOR (1.5m Deep Parallax!)
         ============================================================ */}
      <group>
        {/* Checkered Store Tile Floor & Lit Ceiling */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 1.62]}>
          <planeGeometry args={[9.8, 1.5]} />
          <meshStandardMaterial color="#8c7e6d" roughness={0.55} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 2.5, 1.62]}>
          <planeGeometry args={[9.8, 1.5]} />
          <meshBasicMaterial color="#fef3c7" />
        </mesh>
        {/* Back Wall: Stainless Walk-In Beverage Coolers, Cashier & Coffee Bar */}
        <mesh position={[0, 1.42, 0.9]}>
          <planeGeometry args={[9.7, 2.38]} />
          <meshStandardMaterial
            ref={backGlowRef}
            map={backWallTex}
            emissiveMap={backWallTex}
            emissive="#ffffff"
            emissiveIntensity={0.58}
            roughness={0.5}
          />
        </mesh>
        {/* Foreground 3D Checkout Counter + POS Register + Pastry Case + Snack Gondola (True 3D Depth!) */}
        <mesh position={[0.45, 0.52, 1.68]}>
          <boxGeometry args={[2.1, 0.88, 0.54]} />
          <meshStandardMaterial color="#3e3126" roughness={0.72} />
        </mesh>
        <mesh position={[0.45, 0.98, 1.68]}>
          <boxGeometry args={[2.18, 0.05, 0.6]} />
          <meshStandardMaterial color="#d6d3d1" roughness={0.35} />
        </mesh>
        {/* Store Cash Register & Glass Bakery Display on Counter */}
        <mesh position={[0.05, 1.16, 1.68]}>
          <boxGeometry args={[0.36, 0.3, 0.28]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        <mesh position={[0.95, 1.18, 1.68]}>
          <boxGeometry args={[0.62, 0.36, 0.38]} />
          <meshStandardMaterial color="#fde68a" emissive="#f59e0b" emissiveIntensity={0.35} transparent opacity={0.75} />
        </mesh>
        {/* Foreground 3D Snack Gondola Rack inside Right Window */}
        <mesh position={[3.1, 0.72, 1.74]}>
          <boxGeometry args={[1.85, 1.18, 0.42]} />
          <meshStandardMaterial color="#292524" roughness={0.75} />
        </mesh>
        {/* Glowing Neon "OPEN" Sign Hanging Inside Left Storefront Glass */}
        <mesh position={[-3.85, 2.15, 2.22]}>
          <boxGeometry args={[0.92, 0.34, 0.04]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
        <mesh position={[-3.85, 2.15, 2.245]}>
          <planeGeometry args={[0.84, 0.28]} />
          <meshBasicMaterial map={openNeonTex} toneMapped={false} />
        </mesh>
      </group>

      {/* Hollow-Front Stucco Building Shell */}
      <mesh geometry={stuccoShellGeo} receiveShadow>
        <meshStandardMaterial color="#dfd3be" bumpMap={bump} bumpScale={0.015} roughness={0.88} />
      </mesh>
      {/* Brick Lower Wainscoting (Left & Right of Door) + Corner Pilasters */}
      {[-2.95, 2.95].map((wx) => (
        <mesh key={wx} position={[wx, 0.42, 2.375]}>
          <planeGeometry args={[3.9, 0.84]} />
          <meshStandardMaterial map={brickTex} roughness={0.9} />
        </mesh>
      ))}
      {[-5.95, 5.95].map((px) => (
        <mesh key={px} position={[px, 1.82, 2.26]}>
          <boxGeometry args={[0.42, 3.64, 0.32]} />
          <meshStandardMaterial map={brickTex} roughness={0.88} />
        </mesh>
      ))}

      {/* Parapet Roof, Awning, Merged Metal Hardware & Dark Window/Door Frames */}
      <mesh geometry={parapetGeo} position={[0, 3.66, 0]}>
        <meshStandardMaterial color="#a63e22" roughness={0.54} />
      </mesh>
      <mesh geometry={awningGeo} position={[0, 2.58, 2.78]} rotation={[0.16, 0, 0]}>
        <meshStandardMaterial color="#1f4246" roughness={0.42} metalness={0.45} />
      </mesh>
      <mesh geometry={storeMetalGeo}>
        <meshStandardMaterial color="#94a3b8" roughness={0.36} metalness={0.72} />
      </mesh>
      <mesh geometry={darkFramesGeo}>
        <meshStandardMaterial color="#18181b" roughness={0.38} metalness={0.6} />
      </mesh>

      {/* Transparent Reflective Storefront Glass + Double Glass Doors + Chrome Push Bars */}
      {[-2.95, 2.95].map((wx) => (
        <mesh key={`glass-${wx}`} position={[wx, 1.67, 2.34]}>
          <planeGeometry args={[3.68, 1.62]} />
          <meshStandardMaterial color="#bae6fd" roughness={0.06} metalness={0.75} transparent opacity={0.22} />
        </mesh>
      ))}
      <mesh position={[0, 1.38, 2.34]}>
        <planeGeometry args={[1.6, 2.18]} />
        <meshStandardMaterial color="#93c5fd" roughness={0.06} metalness={0.78} transparent opacity={0.28} />
      </mesh>
      {[-0.12, 0.12].map((hx) => (
        <mesh key={hx} position={[hx, 1.12, 2.39]}>
          <capsuleGeometry args={[0.015, 0.34, 4, 8]} />
          <meshStandardMaterial color="#f8fafc" metalness={0.92} roughness={0.14} />
        </mesh>
      ))}

      {/* Outdoor "ICE" Merchandiser Chest & Realistic "COLD DRINKS" Machine */}
      <group position={[-5.12, 0.08, 2.74]}>
        <mesh position={[0, 0.46, 0]} castShadow>
          <boxGeometry args={[1.28, 0.92, 0.68]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.38} />
        </mesh>
        <mesh position={[0, 0.46, 0.344]}>
          <planeGeometry args={[1.2, 0.82]} />
          <meshBasicMaterial map={iceTex} />
        </mesh>
        <mesh position={[0, 0.96, -0.03]} rotation={[0.26, 0, 0]}>
          <boxGeometry args={[1.26, 0.07, 0.68]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.75} />
        </mesh>
      </group>
      <group position={[5.25, 0.08, 2.72]}>
        <mesh position={[0, 0.95, 0]} castShadow>
          <boxGeometry args={[0.92, 1.9, 0.66]} />
          <meshStandardMaterial color="#7f1d1d" roughness={0.34} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0.98, 0.334]}>
          <planeGeometry args={[0.82, 1.72]} />
          <meshBasicMaterial map={vendingTex} />
        </mesh>
      </group>

      {/* Framed 3D Rooftop Signboard */}
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
          <meshStandardMaterial map={concrete} roughness={0.85} />
        </mesh>
        {[-0.64, 0.64].map((px) => (
          <mesh key={px} position={[px, 2.65, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.1, 5.1, 12]} />
            <meshStandardMaterial color="#27272a" roughness={0.38} metalness={0.68} />
          </mesh>
        ))}
        <mesh position={[0, 3.35, 0]} castShadow>
          <boxGeometry args={[1.38, 2.55, 0.24]} />
          <meshStandardMaterial color="#18181b" roughness={0.4} metalness={0.5} />
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

function Canopy({ ao }: { ao: CanvasTexture }) {
  const fasciaGeo = useMemo(() => buildRoundedSlab(11.6, 7.2, 0.34, 0.32, 0.03), []);
  const soffitGeo = useMemo(() => buildRoundedSlab(11.1, 6.7, 0.08, 0.24, 0.02), []);

  // Merge all structural I-beams, columns, bolted gussets, rainwater downspouts & troffer frames!
  const { steelGeo, pierGeo, lightPanelGeo } = useMemo(() => {
    const steel: BufferGeometry[] = [];
    const piers: BufferGeometry[] = [];
    const lights: BufferGeometry[] = [];

    for (const bx of [-3.6, -1.2, 1.2, 3.6]) {
      steel.push(placeGeo(new BoxGeometry(0.14, 0.1, 6.55), [bx, 3.9, 1.32]));
    }
    for (const bz of [-0.6, 1.32, 3.25]) {
      steel.push(placeGeo(new BoxGeometry(10.9, 0.08, 0.14), [0, 3.91, bz]));
    }

    const posts: [number, number][] = [
      [-5.0, -1.6],
      [5.0, -1.6],
      [-5.0, 4.25],
      [5.0, 4.25],
    ];
    for (const [x, z] of posts) {
      steel.push(placeGeo(new BoxGeometry(0.26, 3.96, 0.26), [x, 1.98, z]));
      // Bolted structural gusset collar at top of column
      steel.push(placeGeo(new BoxGeometry(0.46, 0.18, 0.46), [x, 3.84, z]));
      steel.push(placeGeo(new CylinderGeometry(0.32, 0.34, 0.16, 14), [x, 0.08, z]));
      // Galvanized Rainwater Downspout Pipe alongside column
      steel.push(placeGeo(new CylinderGeometry(0.036, 0.036, 3.85, 8), [x + (x > 0 ? 0.18 : -0.18), 1.95, z]));
      piers.push(placeGeo(new CylinderGeometry(0.26, 0.3, 0.72, 14), [x, 0.36, z]));
    }

    // Hanging Clearance Bar Chains + Recessed LED Troffer Frames
    steel.push(placeGeo(new CylinderGeometry(0.008, 0.008, 0.38, 6), [2.6, 3.74, 0.5]));
    steel.push(placeGeo(new CylinderGeometry(0.008, 0.008, 0.38, 6), [4.2, 3.74, 0.5]));
    piers.push(placeGeo(new CylinderGeometry(0.045, 0.045, 1.85, 10), [3.4, 3.54, 0.5], [0, 0, Math.PI / 2]));

    for (const [lx, ly, lz] of [
      [-2.4, 3.88, 0.36],
      [2.4, 3.88, 0.36],
      [-2.4, 3.88, 2.3],
      [2.4, 3.88, 2.3],
    ] as const) {
      steel.push(placeGeo(new BoxGeometry(1.15, 0.04, 0.46), [lx, ly, lz]));
      lights.push(placeGeo(new PlaneGeometry(1.04, 0.36), [lx, ly - 0.023, lz], [Math.PI / 2, 0, 0]));
    }

    return {
      steelGeo: mergeParts(steel),
      pierGeo: mergeParts(piers),
      lightPanelGeo: mergeParts(lights),
    };
  }, []);

  return (
    <group>
      <mesh geometry={fasciaGeo} position={[0, 4.02, 1.32]}>
        <meshStandardMaterial color="#a83d20" roughness={0.46} metalness={0.25} />
      </mesh>
      <mesh position={[0, 4.16, 4.95]}>
        <boxGeometry args={[11.1, 0.055, 0.04]} />
        <meshStandardMaterial color="#fef3c7" emissive="#f59e0b" emissiveIntensity={1.15} />
      </mesh>
      <mesh geometry={soffitGeo} position={[0, 3.94, 1.32]}>
        <meshStandardMaterial color="#e2dad0" roughness={0.72} metalness={0.12} />
      </mesh>
      <mesh geometry={steelGeo}>
        <meshStandardMaterial color="#272c35" roughness={0.4} metalness={0.68} />
      </mesh>
      <mesh geometry={pierGeo}>
        <meshStandardMaterial color="#eab308" roughness={0.5} />
      </mesh>
      <mesh geometry={lightPanelGeo}>
        <meshStandardMaterial color="#fffbeb" emissive="#fde68a" emissiveIntensity={1.25} />
      </mesh>

      {/* Safety Fire Extinguisher Mounted on Front-Right Canopy Column! */}
      <group position={[4.82, 1.25, 4.25]}>
        <mesh>
          <cylinderGeometry args={[0.075, 0.075, 0.42, 12]} />
          <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.075, 10, 8]} />
          <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0.29, 0]}>
          <boxGeometry args={[0.06, 0.06, 0.08]} />
          <meshStandardMaterial color="#18181b" roughness={0.5} />
        </mesh>
      </group>

      {/* Column Contact AO Shadows */}
      {[
        [-5.0, -1.6],
        [5.0, -1.6],
        [-5.0, 4.25],
        [5.0, 4.25],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} rotation={[-Math.PI / 2, 0, 0]} position={[x!, 0.028, z!]}>
          <planeGeometry args={[1.35, 1.35]} />
          <meshBasicMaterial map={ao} transparent depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

function Props({
  root,
  monitor,
  poster,
  ao,
  concrete,
  skullMatRef,
}: {
  root: RefObject<Group | null>;
  monitor: CanvasTexture;
  poster: CanvasTexture;
  ao: CanvasTexture;
  concrete: CanvasTexture;
  skullMatRef: RefObject<MeshStandardMaterial | null>;
}) {
  const pg = useMemo(() => getPropGeos(), []);
  const consoleBaseGeo = useMemo(() => buildRoundedSlab(1.22, 1.04, 0.92, 0.14, 0.025), []);
  const consoleTopGeo = useMemo(() => buildRoundedSlab(1.3, 1.12, 0.065, 0.16, 0.02), []);
  const monitorCaseGeo = useMemo(() => buildRoundedSlab(1.02, 0.68, 0.045, 0.05, 0.015), []);
  const pumpFaceTex = useMemo(() => createPumpFaceTexture(), []);
  const pumpTopperTex = useMemo(() => createPumpTopperTexture(), []);
  const spongeTex = useMemo(() => createSpongeTexture(), []);
  const bunTex = useMemo(() => createBunTexture(), []);
  const skullTex = useMemo(() => createConsoleLabelTexture("!", "#dc2626"), []);
  const goTex = useMemo(() => createConsoleLabelTexture("GO", "#16a34a"), []);
  const goldBtnTex = useMemo(() => createConsoleLabelTexture("$", "#15803d", "#fef08a"), []);

  const hoseGeo = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(-0.36, 1.62, 0.06),
      new Vector3(-0.52, 1.12, 0.16),
      new Vector3(-0.46, 0.56, 0.1),
      new Vector3(-0.33, 1.12, -0.02),
    ]);
    return new TubeGeometry(curve, 18, 0.024, 8, false);
  }, []);
  const evCableGeo = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(-0.28, 1.48, 0.06),
      new Vector3(-0.44, 0.95, 0.14),
      new Vector3(-0.38, 0.48, 0.06),
      new Vector3(-0.26, 1.1, -0.02),
    ]);
    return new TubeGeometry(curve, 18, 0.026, 8, false);
  }, []);

  const islandGeo = useMemo(() => buildRoundedSlab(2.85, 1.06, 0.13, 0.28, 0.02), []);

  // Merged U-bar yellow bollards on Fuel Island
  const uBollardGeo = useMemo(() => {
    const parts: BufferGeometry[] = [
      placeGeo(new BoxGeometry(2.35, 0.1, 0.05), [0, 0.05, 0.52]),
      placeGeo(new BoxGeometry(2.35, 0.1, 0.05), [0, 0.05, -0.52]),
    ];
    for (const bx of [-1.26, 1.26]) {
      parts.push(placeGeo(new CylinderGeometry(0.042, 0.042, 0.84, 10), [bx, 0.54, -0.24]));
      parts.push(placeGeo(new CylinderGeometry(0.042, 0.042, 0.84, 10), [bx, 0.54, 0.24]));
      parts.push(placeGeo(new TorusGeometry(0.24, 0.042, 8, 14, Math.PI), [bx, 0.96, 0], [0, Math.PI / 2, 0]));
    }
    return mergeParts(parts);
  }, []);

  return (
    <group ref={root}>
      {/* ============================================================
          LEFT: ATTENDANT CONTROL DESK & WARRANT STAND (Bảng điều khiển)
         ============================================================ */}
      <group position={[-2.32, 0, 3.46]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.026, 0]}>
          <planeGeometry args={[1.95, 1.8]} />
          <meshBasicMaterial map={ao} transparent depthWrite={false} />
        </mesh>
        <mesh geometry={consoleBaseGeo} castShadow receiveShadow>
          <meshStandardMaterial color="#27303f" roughness={0.48} metalness={0.45} />
        </mesh>
        <mesh geometry={consoleTopGeo} position={[0, 0.93, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#141b26" roughness={0.32} metalness={0.55} />
        </mesh>

        {/* Widescreen POS Touchscreen Terminal */}
        <group position={[-0.08, 1.0, 0.24]} rotation={[0, 0.95, 0]}>
          <mesh position={[0, 0.15, -0.1]} rotation={[0.18, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.068, 0.32, 12]} />
            <meshStandardMaterial color="#475569" metalness={0.72} roughness={0.28} />
          </mesh>
          <group position={[0, 0.38, 0]} rotation={[-0.2, 0, 0]}>
            <mesh geometry={monitorCaseGeo} position={[0, 0, -0.065]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.6} />
            </mesh>
            <mesh position={[0, 0, 0.018]}>
              <planeGeometry args={[0.94, 0.6]} />
              <meshBasicMaterial map={monitor} toneMapped={false} />
            </mesh>
          </group>
        </group>
      </group>

      {/* Dedicated Wanted Warrant Lectern Stand */}
      <group position={[-2.96, 0, 4.28]} rotation={[0, 0.88, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.026, 0]}>
          <planeGeometry args={[0.85, 0.85]} />
          <meshBasicMaterial map={ao} transparent depthWrite={false} />
        </mesh>
        <mesh position={[0, 0.62, 0]} castShadow>
          <cylinderGeometry args={[0.032, 0.042, 1.24, 10]} />
          <meshStandardMaterial color="#334155" roughness={0.38} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.2, 0.22, 0.06, 14]} />
          <meshStandardMaterial color="#1e293b" roughness={0.45} metalness={0.6} />
        </mesh>
        <group position={[0, 1.32, 0.04]} rotation={[-0.28, 0, 0]}>
          <mesh position={[0, 0, -0.018]} castShadow>
            <boxGeometry args={[0.48, 0.62, 0.028]} />
            <meshStandardMaterial color="#44403c" roughness={0.65} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0.29, 0.01]}>
            <boxGeometry args={[0.16, 0.045, 0.035]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, -0.01, 0.002]}>
            <planeGeometry args={[0.42, 0.56]} />
            <meshBasicMaterial map={poster} toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* Gold $ Cash Deposit Validator Pad */}
      <group name="prop-gold" position={[-1.98, 1.02, 3.42]}>
        <mesh>
          <boxGeometry args={[0.34, 0.065, 0.34]} />
          <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.65} />
        </mesh>
        <mesh position={[0, 0.038, 0]}>
          <cylinderGeometry args={[0.135, 0.15, 0.045, 18]} />
          <meshStandardMaterial color="#eab308" emissive="#d97706" emissiveIntensity={0.35} roughness={0.22} metalness={0.72} />
        </mesh>
        <mesh position={[0, 0.063, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.115, 18]} />
          <meshBasicMaterial map={goldBtnTex} />
        </mesh>
      </group>

      {/* Guarded Red Emergency Lock Button */}
      <group position={[-2.22, 1.02, 3.12]}>
        <mesh>
          <cylinderGeometry args={[0.145, 0.165, 0.06, 18]} />
          <meshStandardMaterial color="#eab308" roughness={0.38} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0.045, 0]}>
          <cylinderGeometry args={[0.108, 0.118, 0.055, 18]} />
          <meshStandardMaterial ref={skullMatRef} color="#dc2626" emissive="#ef4444" emissiveIntensity={0.42} />
        </mesh>
        <mesh position={[0, 0.075, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.095, 18]} />
          <meshBasicMaterial map={skullTex} />
        </mesh>
      </group>

      {/* Illuminated Green GO Dispatch Button */}
      <group position={[-2.56, 1.02, 3.32]}>
        <mesh>
          <cylinderGeometry args={[0.145, 0.165, 0.06, 18]} />
          <meshStandardMaterial color="#334155" roughness={0.38} metalness={0.55} />
        </mesh>
        <mesh position={[0, 0.045, 0]}>
          <cylinderGeometry args={[0.108, 0.118, 0.055, 18]} />
          <meshStandardMaterial color="#16a34a" emissive="#22c55e" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, 0.075, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.095, 18]} />
          <meshBasicMaterial map={goTex} />
        </mesh>
      </group>

      {/* ============================================================
          LEFT-BACK: INDUSTRIAL GLASS-FRONT SUPPLY LOCKER
         ============================================================ */}
      <group position={[-3.82, 0, 4.96]} rotation={[0, 2.52, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.026, 0]}>
          <planeGeometry args={[2.1, 1.4]} />
          <meshBasicMaterial map={ao} transparent depthWrite={false} />
        </mesh>
        <mesh position={[0, 1.08, -0.34]} castShadow receiveShadow>
          <boxGeometry args={[1.44, 2.16, 0.1]} />
          <meshStandardMaterial color="#1f242d" roughness={0.48} metalness={0.48} />
        </mesh>
        {[-0.68, 0.68].map((sx) => (
          <mesh key={sx} position={[sx, 1.08, 0]} castShadow>
            <boxGeometry args={[0.08, 2.16, 0.76]} />
            <meshStandardMaterial color="#2e3543" roughness={0.42} metalness={0.52} />
          </mesh>
        ))}
        {[0.08, 0.88, 1.34, 2.08].map((sy) => (
          <mesh key={sy} position={[0, sy, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.38, 0.055, 0.76]} />
            <meshStandardMaterial color="#475569" roughness={0.36} metalness={0.58} />
          </mesh>
        ))}
        {[1.3, 2.02].map((ly) => (
          <mesh key={ly} position={[0, ly, 0.12]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.018, 0.018, 1.22, 8]} />
            <meshStandardMaterial color="#fef3c7" emissive="#fde68a" emissiveIntensity={1.1} />
          </mesh>
        ))}
        <group position={[0.68, 1.08, 0.38]} rotation={[0, 1.18, 0]}>
          <mesh position={[-0.34, 0, 0]}>
            <boxGeometry args={[0.68, 1.96, 0.032]} />
            <meshStandardMaterial color="#bae6fd" roughness={0.08} metalness={0.35} transparent opacity={0.3} />
          </mesh>
          <mesh position={[-0.66, 0, 0]}>
            <boxGeometry args={[0.04, 1.98, 0.045]} />
            <meshStandardMaterial color="#334155" roughness={0.35} metalness={0.7} />
          </mesh>
          <mesh position={[-0.6, 0, 0.036]}>
            <capsuleGeometry args={[0.015, 0.22, 4, 8]} />
            <meshStandardMaterial color="#f1f5f9" metalness={0.9} roughness={0.18} />
          </mesh>
        </group>
      </group>

      {/* Diner Cheeseburger + Fries Combo Baskets */}
      <group name="prop-burger" position={[-3.49, 1.39, 5.06]}>
        <BurgerProp bunTex={bunTex} />
      </group>
      <group name="prop-burger-extra" position={[-3.72, 1.39, 4.92]} scale={0.9}>
        <BurgerProp bunTex={bunTex} />
      </group>

      {/* OEM Click-Torque Threaded Red Fuel Caps */}
      <group name="prop-cap" position={[-4.02, 1.39, 4.71]}>
        <GasCapProp />
      </group>
      <group name="prop-cap-extra" position={[-4.19, 1.39, 4.58]} scale={0.92}>
        <GasCapProp />
      </group>

      {/* Auto Detailing Wash Bucket + Suds + Figure-8 Bone Car Sponge */}
      <group position={[-3.49, 0.91, 5.06]}>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.155, 0.12, 0.2, 14]} />
          <meshStandardMaterial color="#1d4ed8" roughness={0.38} />
        </mesh>
        <mesh position={[0, 0.19, 0]} rotation={[0.45, 0, 0]}>
          <torusGeometry args={[0.16, 0.007, 6, 14, Math.PI]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.142, 14]} />
          <meshStandardMaterial color="#e0f2fe" roughness={0.18} />
        </mesh>
      </group>
      <group name="prop-sponge" position={[-3.49, 1.11, 5.06]} rotation={[0, 0.35, 0]} scale={1.12}>
        <mesh geometry={pg.spongeYellowGeo}>
          <meshStandardMaterial map={spongeTex} roughness={0.92} />
        </mesh>
        <mesh geometry={pg.spongeGreenGeo}>
          <meshStandardMaterial color="#15803d" roughness={0.95} />
        </mesh>
      </group>

      {/* Tactical Pistol-Grip X26 Stun Gun / Taser Lying on Shelf */}
      <group name="prop-taser" position={[-4.02, 0.96, 4.71]} rotation={[0, -1.15, Math.PI / 2]} scale={1.15}>
        <mesh geometry={pg.taserDarkGeo}>
          <meshStandardMaterial color="#18181b" roughness={0.68} />
        </mesh>
        <mesh geometry={pg.taserYellowGeo}>
          <meshStandardMaterial color="#eab308" roughness={0.36} />
        </mesh>
        <mesh geometry={pg.taserArcGeo}>
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={1.1} />
        </mesh>
      </group>

      {/* ============================================================
          RIGHT: COMMERCIAL H-FRAME FUEL DISPENSER, SQUEEGEE CADDY & EV SUPERCHARGER
         ============================================================ */}
      <group position={[3.2, 0, 2.82]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.026, 0]}>
          <planeGeometry args={[3.5, 1.75]} />
          <meshBasicMaterial map={ao} transparent depthWrite={false} />
        </mesh>
        <mesh geometry={islandGeo} position={[0, -0.01, 0]} receiveShadow>
          <meshStandardMaterial map={concrete} roughness={0.78} />
        </mesh>
        <mesh geometry={uBollardGeo} castShadow>
          <meshStandardMaterial color="#eab308" roughness={0.38} metalness={0.4} />
        </mesh>

        {/* Authentic Forecourt Blue Windshield Squeegee & Paper-Towel Caddy! */}
        <group position={[0.05, 0.12, -0.22]}>
          <mesh position={[0, 0.36, 0]} castShadow>
            <boxGeometry args={[0.28, 0.72, 0.24]} />
            <meshStandardMaterial color="#1e3a8a" roughness={0.5} />
          </mesh>
          {/* Paper Towel Dispenser Top Hood */}
          <mesh position={[0, 0.82, 0]}>
            <boxGeometry args={[0.3, 0.22, 0.22]} />
            <meshStandardMaterial color="#1e293b" roughness={0.45} />
          </mesh>
          <mesh position={[0, 0.74, 0.115]}>
            <planeGeometry args={[0.18, 0.06]} />
            <meshBasicMaterial color="#f8fafc" />
          </mesh>
          {/* Wooden Squeegee Handle Sticking Out of Side Bucket */}
          <mesh position={[0.16, 0.58, 0]} rotation={[0, 0, -0.18]}>
            <cylinderGeometry args={[0.01, 0.01, 0.44, 6]} />
            <meshStandardMaterial color="#a16207" roughness={0.8} />
          </mesh>
          <mesh position={[0.2, 0.78, 0]} rotation={[0, 0, -0.18]}>
            <boxGeometry args={[0.03, 0.03, 0.18]} />
            <meshStandardMaterial color="#09090b" roughness={0.6} />
          </mesh>
        </group>
      </group>

      {/* Modern Commercial H-Frame Multi-Product Fuel Pump (x = 2.48, z = 2.82) */}
      <group position={[2.48, 0.12, 2.82]}>
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.76, 0.76, 0.48]} />
          <meshStandardMaterial color="#1f242d" roughness={0.42} metalness={0.48} />
        </mesh>
        <mesh position={[0, 0.38, 0.245]}>
          <planeGeometry args={[0.66, 0.64]} />
          <meshStandardMaterial color="#b9381e" roughness={0.34} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0.38, -0.245]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.66, 0.64]} />
          <meshStandardMaterial color="#b9381e" roughness={0.34} metalness={0.35} />
        </mesh>
        {[-0.35, 0.35].map((cx) => (
          <mesh key={cx} position={[cx, 1.04, 0]} castShadow>
            <boxGeometry args={[0.09, 2.08, 0.44]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.24} metalness={0.82} />
          </mesh>
        ))}
        <mesh position={[0, 1.24, 0]} castShadow>
          <boxGeometry args={[0.62, 0.78, 0.4]} />
          <meshStandardMaterial color="#18181b" roughness={0.38} metalness={0.5} />
        </mesh>
        <mesh position={[0, 1.24, 0.205]}>
          <planeGeometry args={[0.54, 0.68]} />
          <meshBasicMaterial map={pumpFaceTex} toneMapped={false} />
        </mesh>
        <mesh position={[0, 1.24, -0.205]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.54, 0.68]} />
          <meshBasicMaterial map={pumpFaceTex} toneMapped={false} />
        </mesh>
        <mesh position={[0, 1.94, 0]} castShadow>
          <boxGeometry args={[0.88, 0.32, 0.52]} />
          <meshStandardMaterial color="#b9381e" roughness={0.32} metalness={0.3} />
        </mesh>
        <mesh position={[0, 1.94, 0.265]}>
          <planeGeometry args={[0.8, 0.22]} />
          <meshBasicMaterial map={pumpTopperTex} toneMapped={false} />
        </mesh>
        <mesh position={[0, 1.94, -0.265]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.8, 0.22]} />
          <meshBasicMaterial map={pumpTopperTex} toneMapped={false} />
        </mesh>
        <mesh position={[-0.4, 1.22, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[0.3, 0.85]} />
          <meshStandardMaterial color="#18181b" roughness={0.55} />
        </mesh>
        <mesh position={[-0.41, 1.12, 0]}>
          <boxGeometry args={[0.08, 0.28, 0.18]} />
          <meshStandardMaterial color="#09090b" roughness={0.6} />
        </mesh>
        <mesh geometry={hoseGeo}>
          <meshStandardMaterial color="#141417" roughness={0.72} />
        </mesh>
      </group>

      {/* Holstered OPW Automatic Fuel Nozzle */}
      <group name="prop-nozzle" position={[2.08, 1.24, 2.8]} rotation={[0.95, 1.57, 0]}>
        <mesh geometry={pg.nozzleMetalGeo}>
          <meshStandardMaterial color="#d8e0ea" roughness={0.22} metalness={0.85} />
        </mesh>
        <mesh geometry={pg.nozzleBootGeo}>
          <meshStandardMaterial
            color={GRADES.find((g) => g.id === sim.grade)?.color ?? "#f59e0b"}
            roughness={0.34}
          />
        </mesh>
      </group>

      {/* 150kW Hollow-Arch DC Ultra-Fast EV Supercharger */}
      <group position={[3.92, 0.12, 2.82]}>
        <mesh position={[0, 0.36, 0]} castShadow>
          <boxGeometry args={[0.68, 0.72, 0.42]} />
          <meshStandardMaterial color="#18181b" roughness={0.38} metalness={0.55} />
        </mesh>
        {[-0.27, 0.27].map((ax) => (
          <group key={ax} position={[ax, 1.28, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.12, 1.4, 0.38]} />
              <meshStandardMaterial color="#e2e8f0" roughness={0.24} metalness={0.68} />
            </mesh>
            <mesh position={[ax > 0 ? -0.062 : 0.062, 0, 0]}>
              <boxGeometry args={[0.015, 1.28, 0.18]} />
              <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={1.25} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 1.98, 0]} castShadow>
          <boxGeometry args={[0.68, 0.16, 0.4]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.24} metalness={0.68} />
        </mesh>
        <mesh position={[0, 1.18, 0]}>
          <boxGeometry args={[0.44, 0.36, 0.32]} />
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[0, 1.18, 0.165]}>
          <planeGeometry args={[0.34, 0.24]} />
          <meshStandardMaterial color="#0284c7" emissive="#38bdf8" emissiveIntensity={0.75} />
        </mesh>
        <mesh geometry={evCableGeo}>
          <meshStandardMaterial color="#141417" roughness={0.72} />
        </mesh>
      </group>
      <group name="prop-charger" position={[3.6, 1.22, 2.8]} rotation={[0.95, 1.57, 0]}>
        <mesh geometry={pg.chargerDarkGeo}>
          <meshStandardMaterial color="#1e293b" roughness={0.36} metalness={0.35} />
        </mesh>
        <mesh geometry={pg.chargerCyanGeo}>
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={1.1} />
        </mesh>
      </group>
    </group>
  );
}

function BurgerProp({ bunTex }: { bunTex: CanvasTexture }) {
  const pg = useMemo(() => getPropGeos(), []);
  return (
    <group>
      <mesh geometry={pg.burgerBasketGeo}>
        <meshStandardMaterial color="#dc2626" roughness={0.48} />
      </mesh>
      <mesh geometry={pg.burgerBunAndFriesGeo}>
        <meshStandardMaterial map={bunTex} roughness={0.68} />
      </mesh>
      <mesh geometry={pg.burgerPattyGeo}>
        <meshStandardMaterial color="#5c2810" roughness={0.88} />
      </mesh>
      <mesh geometry={pg.burgerCheeseGeo}>
        <meshStandardMaterial color="#f59e0b" roughness={0.42} />
      </mesh>
      <mesh geometry={pg.burgerLettuceGeo}>
        <meshStandardMaterial color="#65a30d" roughness={0.78} />
      </mesh>
      <mesh geometry={pg.burgerTomatoGeo}>
        <meshStandardMaterial color="#dc2626" roughness={0.35} />
      </mesh>
    </group>
  );
}

function GasCapProp() {
  const pg = useMemo(() => getPropGeos(), []);
  return (
    <group>
      <mesh geometry={pg.capDarkGeo}>
        <meshStandardMaterial color="#18181b" roughness={0.68} />
      </mesh>
      <mesh geometry={pg.capRedGeo}>
        <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.2} />
      </mesh>
    </group>
  );
}

function Shredder({ blades, ao }: { blades: RefObject<Group | null>; ao: CanvasTexture }) {
  const hazardTex = useMemo(() => createHazardTexture(), []);
  const hopperGeo = useMemo(() => buildHopperGeo(), []);
  return (
    <group position={[-5.4, 0, 3.6]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.026, 0]}>
        <planeGeometry args={[1.95, 1.95]} />
        <meshBasicMaterial map={ao} transparent depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.58, 0.64, 1.24, 18]} />
        <meshStandardMaterial color="#374440" roughness={0.5} metalness={0.48} />
      </mesh>
      <mesh position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.625, 0.635, 0.22, 18]} />
        <meshStandardMaterial map={hazardTex} roughness={0.48} />
      </mesh>
      <mesh geometry={hopperGeo} position={[0, 1.32, 0]} castShadow>
        <meshStandardMaterial color="#64748b" roughness={0.36} metalness={0.65} />
      </mesh>
      <mesh position={[-0.62, 1.15, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.11, 0.9, 12]} />
        <meshStandardMaterial color="#334155" roughness={0.38} metalness={0.6} />
      </mesh>
      <group ref={blades} position={[0, 1.28, 0.25]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.72, 12]} />
          <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.28} />
        </mesh>
        {[-0.25, -0.08, 0.08, 0.25].map((x) => (
          <mesh key={x} position={[x, 0.08, 0]} rotation={[0.4, 0, 0]}>
            <coneGeometry args={[0.06, 0.18, 6]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.22} metalness={0.85} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function RoadsideDecor({ ao }: { ao: CanvasTexture }) {
  const { tiresGeo, ringsGeo } = useMemo(() => {
    const tires = [0.1, 0.28, 0.46].map((yy, i) =>
      placeGeo(new TorusGeometry(0.24, 0.09, 8, 16), [5.75 + i * 0.03, yy, 2.25], [Math.PI / 2, 0, 0]),
    );
    const rings: BufferGeometry[] = [];
    for (const [x, z] of [
      [5.55, 3.65],
      [6.08, 4.15],
    ] as const) {
      rings.push(placeGeo(new TorusGeometry(0.255, 0.015, 6, 14), [x, 0.28, z], [Math.PI / 2, 0, 0]));
      rings.push(placeGeo(new TorusGeometry(0.255, 0.015, 6, 14), [x, 0.6, z], [Math.PI / 2, 0, 0]));
    }
    return { tiresGeo: mergeParts(tires), ringsGeo: mergeParts(rings) };
  }, []);

  return (
    <group>
      {[
        [5.55, 3.65, "#b94827"],
        [6.08, 4.15, "#1f4246"],
      ].map(([x, z, col], i) => (
        <group key={i} position={[Number(x), 0, Number(z)]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
            <planeGeometry args={[0.95, 0.95]} />
            <meshBasicMaterial map={ao} transparent depthWrite={false} />
          </mesh>
          <mesh position={[0, 0.44, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.25, 0.88, 14]} />
            <meshStandardMaterial color={String(col)} roughness={0.44} metalness={0.45} />
          </mesh>
        </group>
      ))}
      <mesh geometry={ringsGeo}>
        <meshStandardMaterial color="#18181b" roughness={0.55} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5.75, 0.025, 2.25]}>
        <planeGeometry args={[1.05, 1.05]} />
        <meshBasicMaterial map={ao} transparent depthWrite={false} />
      </mesh>
      <mesh geometry={tiresGeo} castShadow>
        <meshStandardMaterial color="#18181b" roughness={0.86} />
      </mesh>
    </group>
  );
}

function UtilityPoles() {
  const { woodGeo, insulatorGeo, wireGeo } = useMemo(() => {
    const wood: BufferGeometry[] = [];
    const ins: BufferGeometry[] = [];
    for (const [idx, x] of [-20, -7.5, 8.5, 21].entries()) {
      wood.push(placeGeo(new CylinderGeometry(0.09, 0.135, 5.8, 10), [x, 2.9, -2.55]));
      wood.push(placeGeo(new BoxGeometry(0.09, 1.5, 0.09), [x, 5.38, -2.55], [Math.PI / 2, 0, 0]));
      for (const iz of [-0.55, 0, 0.55]) {
        ins.push(placeGeo(new CylinderGeometry(0.03, 0.04, 0.11, 6), [x, 5.48, -2.55 + iz]));
      }
      if (idx === 2) {
        ins.push(placeGeo(new CylinderGeometry(0.16, 0.16, 0.58, 12), [x + 0.24, 4.45, -2.55]));
      }
    }
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
      32,
      0.015,
      5,
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
      32,
      0.015,
      5,
      false,
    );
    return {
      woodGeo: mergeParts(wood),
      insulatorGeo: mergeParts(ins),
      wireGeo: mergeParts([w1, w2]),
    };
  }, []);

  return (
    <group>
      <mesh geometry={woodGeo} castShadow>
        <meshStandardMaterial color="#543d2d" roughness={0.92} />
      </mesh>
      <mesh geometry={insulatorGeo}>
        <meshStandardMaterial color="#94a3b8" roughness={0.35} metalness={0.5} />
      </mesh>
      <mesh geometry={wireGeo}>
        <meshBasicMaterial color="#18181b" />
      </mesh>
    </group>
  );
}
