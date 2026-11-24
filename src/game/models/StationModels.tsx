import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import {
  CatmullRomCurve3,
  ExtrudeGeometry,
  LatheGeometry,
  PlaneGeometry,
  Shape,
  TubeGeometry,
  Vector2,
  Vector3,
  type CanvasTexture,
  type Group,
  type MeshStandardMaterial,
} from "three";
import { GRADES } from "@/game/content";
import { sim } from "@/game/sim";
import {
  createAsphaltTexture,
  createBrickTexture,
  createBunTexture,
  createConcreteTexture,
  createConsoleLabelTexture,
  createHazardTexture,
  createPumpFaceTexture,
  createSandTexture,
  createSignTexture,
  createSpongeTexture,
  createSurfaceBumpTexture,
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

function buildRoundedSlab(w: number, d: number, h: number, r: number, bevel = 0.03) {
  const geo = new ExtrudeGeometry(roundedRectShape(w, d, r), {
    depth: h,
    bevelEnabled: bevel > 0,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 3,
    curveSegments: 12,
  });
  geo.rotateX(-Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

function buildRetroPumpGeo() {
  const s = new Shape();
  s.moveTo(-0.3, 0);
  s.lineTo(0.3, 0);
  s.lineTo(0.3, 1.32);
  s.quadraticCurveTo(0.3, 1.62, 0, 1.62);
  s.quadraticCurveTo(-0.3, 1.62, -0.3, 1.32);
  s.closePath();
  const geo = new ExtrudeGeometry(s, {
    depth: 0.44,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.03,
    bevelSegments: 4,
    curveSegments: 14,
  });
  geo.translate(0, 0, -0.22);
  geo.computeVertexNormals();
  return geo;
}

function buildDesertTerrainGeo() {
  const geo = new PlaneGeometry(160, 160, 64, 64);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position!;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const inRoad = Math.abs(z - 0.5) < 2.8;
    const inPad = x > -10 && x < 7.5 && z > -9 && z < 7.5;
    if (inRoad || inPad) {
      pos.setY(i, 0);
      continue;
    }
    const distRoad = Math.max(0, Math.abs(z - 0.5) - 2.8);
    const distPad = Math.max(0, Math.max(-10 - x, x - 7.5, -9 - z, z - 7.5));
    const blend = Math.min(1, Math.min(distRoad, distPad) / 7);
    const dune =
      (Math.sin(x * 0.12 + z * 0.08) * 0.5 +
        Math.cos(x * 0.06 - z * 0.11) * 0.72 +
        Math.sin(x * 0.24 + z * 0.2) * 0.16) *
      blend;
    pos.setY(i, Math.max(0, dune + 0.2 * blend));
  }
  geo.computeVertexNormals();
  return geo;
}

function buildHopperGeo() {
  const pts = [new Vector2(0.42, 0), new Vector2(0.42, 0.15), new Vector2(0.68, 0.42), new Vector2(0.62, 0.42), new Vector2(0.38, 0.16)];
  return new LatheGeometry(pts, 22);
}

export function Station() {
  const sandTex = useMemo(() => createSandTexture(), []);
  const bumpTex = useMemo(() => createSurfaceBumpTexture(), []);
  const concreteTex = useMemo(() => createConcreteTexture(), []);
  const asphaltTex = useMemo(() => createAsphaltTexture(), []);
  const signTex = useMemo(() => createSignTexture(), []);
  const terrainGeo = useMemo(() => buildDesertTerrainGeo(), []);
  const padGeo = useMemo(() => buildRoundedSlab(14.5, 5.2, 0.05, 0.35, 0.02), []);

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
      vis("prop-cap", sim.hold !== "cap" && sim.caps > 0);
      vis("prop-taser", sim.hold !== "taser");
    }
    if (bar.current) bar.current.rotation.x = -1.25 * sim.barrier;
    if (blades.current) blades.current.rotation.x += dt * 4.2;
  });

  return (
    <group>
      {/* Desert Gravel & Dune Terrain */}
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial map={sandTex} bumpMap={bumpTex} bumpScale={0.035} roughness={0.96} metalness={0} />
      </mesh>

      {/* Open Concrete Forecourt (Employee Workspace) */}
      <mesh geometry={padGeo} position={[-0.8, -0.02, 4.7]} receiveShadow>
        <meshStandardMaterial map={concreteTex} bumpMap={bumpTex} bumpScale={0.015} roughness={0.86} metalness={0.04} />
      </mesh>

      {/* Asphalt Highway (Lối đi của xe) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.5]} receiveShadow>
        <planeGeometry args={[84, 3.8]} />
        <meshStandardMaterial map={asphaltTex} bumpMap={bumpTex} bumpScale={0.02} roughness={0.9} metalness={0.05} />
      </mesh>
      {/* Concrete Curbs & Road Stripes */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.026, -1.25]}>
        <planeGeometry args={[84, 0.12]} />
        <meshBasicMaterial color="#cbd5e1" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.026, 2.25]}>
        <planeGeometry args={[84, 0.12]} />
        <meshBasicMaterial color="#cbd5e1" />
      </mesh>
      {[-24, -20, -16, -12, -8, -4, 0, 4, 8, 12, 16, 20, 24].map((x) => (
        <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.03, 0.5]}>
          <planeGeometry args={[1.55, 0.13]} />
          <meshBasicMaterial color="#eab308" />
        </mesh>
      ))}

      {/* Far-Side Diner & Station Building */}
      <Building sign={signTex} />
      {/* Wide Airy Canopy (Zero middle pillars!) */}
      <Canopy />
      {/* Interactive Console, Supply Cabinet, Gas Pump & EV Charger */}
      <Props root={prop} monitor={monitor.tex} poster={poster.tex} />
      {/* Industrial Shredder */}
      <Shredder blades={blades} />
      <RoadsideDecor />

      {/* Exit Barrier Gate spanning across the left road (Cái cổng chặn xe) */}
      <group position={[-4.6, 0, -1.4]}>
        {/* Gate Pivot Post (Far Side) */}
        <mesh position={[0, 0.62, 0]} castShadow>
          <cylinderGeometry args={[0.16, 0.2, 1.24, 16]} />
          <meshStandardMaterial color="#334155" roughness={0.45} metalness={0.55} />
        </mesh>
        {/* Opposite Stop Bollard (Near Side) */}
        <mesh position={[0, 0.56, 3.7]} castShadow>
          <cylinderGeometry args={[0.14, 0.18, 1.12, 16]} />
          <meshStandardMaterial color="#334155" roughness={0.45} metalness={0.55} />
        </mesh>
        <mesh position={[0, 0.92, 3.7]}>
          <cylinderGeometry args={[0.15, 0.15, 0.22, 16]} />
          <meshStandardMaterial color="#eab308" roughness={0.4} />
        </mesh>
        {/* Traffic Beacon */}
        <mesh position={[0, 1.3, 0]}>
          <sphereGeometry args={[0.11, 12, 12]} />
          <meshStandardMaterial
            color={sim.skull ? "#ef4444" : "#22c55e"}
            emissive={sim.skull ? "#ef4444" : "#22c55e"}
            emissiveIntensity={0.9}
          />
        </mesh>
        {/* Swinging Striped Boom Arm across full lane */}
        <group ref={bar} position={[0, 1.02, 0]}>
          <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.36, 14]} />
            <meshStandardMaterial color="#1e293b" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0, 1.82]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.052, 0.06, 3.65, 12]} />
            <meshStandardMaterial color="#dc2626" roughness={0.38} />
          </mesh>
          {[0.45, 1.15, 1.85, 2.55, 3.25].map((zz) => (
            <mesh key={zz} position={[0, 0, zz]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.058, 0.058, 0.32, 12]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.35} />
            </mesh>
          ))}
        </group>
      </group>

      <UtilityPoles />
      <Cacti />
      <Mesas />
    </group>
  );
}

function Building({ sign }: { sign: CanvasTexture }) {
  const winGlow = useRef<MeshStandardMaterial>(null);
  const winGlow2 = useRef<MeshStandardMaterial>(null);
  const brickTex = useMemo(() => createBrickTexture(), []);
  const bodyGeo = useMemo(() => buildRoundedSlab(11.4, 4.4, 3.5, 0.28, 0.04), []);
  const roofGeo = useMemo(() => buildRoundedSlab(12.0, 5.0, 0.28, 0.35, 0.05), []);
  const awningGeo = useMemo(() => buildRoundedSlab(8.2, 1.05, 0.08, 0.15, 0.02), []);

  useFrame(() => {
    const ei = sim.night * 0.78;
    if (winGlow.current) winGlow.current.emissiveIntensity = ei;
    if (winGlow2.current) winGlow2.current.emissiveIntensity = ei;
  });

  return (
    <group position={[-1.8, 0, -5.6]}>
      {/* Stucco Upper Structure */}
      <mesh geometry={bodyGeo} position={[0, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color="#e8decb" roughness={0.88} />
      </mesh>
      {/* Brick Lower Wainscoting */}
      <mesh position={[0, 0.45, 2.26]}>
        <planeGeometry args={[11.2, 0.9]} />
        <meshStandardMaterial map={brickTex} roughness={0.9} />
      </mesh>
      {/* Terracotta Roof Overhang */}
      <mesh geometry={roofGeo} position={[0, 3.52, 0]} castShadow>
        <meshStandardMaterial color="#b94827" roughness={0.58} />
      </mesh>
      {/* Awning over Diner Windows */}
      <mesh geometry={awningGeo} position={[0, 2.52, 2.65]} rotation={[0.25, 0, 0]} castShadow>
        <meshStandardMaterial color="#264e52" roughness={0.5} />
      </mesh>
      {/* Framed Diner Storefront Windows with Aluminum Mullions */}
      {[
        [-2.8, 3.2],
        [2.6, 3.2],
      ].map(([wx, ww], idx) => (
        <group key={idx} position={[wx!, 1.62, 2.26]}>
          <mesh position={[0, 0, 0.01]}>
            <planeGeometry args={[ww!, 1.65]} />
            <meshStandardMaterial color="#27272a" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0, 0.03]}>
            <planeGeometry args={[ww! - 0.16, 1.5]} />
            <meshStandardMaterial
              ref={idx === 0 ? winGlow : winGlow2}
              color="#1e3a4c"
              emissive="#fbbf24"
              emissiveIntensity={0}
              roughness={0.1}
              metalness={0.5}
            />
          </mesh>
          {/* Vertical Mullion Divider */}
          <mesh position={[0, 0, 0.045]}>
            <capsuleGeometry args={[0.022, 1.46, 4, 6]} />
            <meshStandardMaterial color="#52525b" metalness={0.7} roughness={0.25} />
          </mesh>
        </group>
      ))}
      {/* Glass Entrance Door with Push Bar */}
      <group position={[-0.1, 1.15, 2.26]}>
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[1.25, 2.25]} />
          <meshStandardMaterial color="#18181b" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.08, 2.08]} />
          <meshStandardMaterial color="#1e3a4c" roughness={0.1} metalness={0.55} />
        </mesh>
        <mesh position={[0.36, -0.05, 0.06]}>
          <capsuleGeometry args={[0.02, 0.34, 4, 6]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.18} />
        </mesh>
      </group>
      {/* Illuminated Roof Sign */}
      <mesh position={[0, 3.18, 2.3]}>
        <planeGeometry args={[5.0, 1.2]} />
        <meshBasicMaterial map={sign} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Canopy() {
  // Wide outer steel columns so the central forecourt is 100% open!
  const posts = [
    [-4.8, -1.6],
    [4.8, -1.6],
    [-4.8, 4.1],
    [4.8, 4.1],
  ];
  const fasciaGeo = useMemo(() => buildRoundedSlab(10.8, 6.8, 0.28, 0.45, 0.05), []);
  const soffitGeo = useMemo(() => buildRoundedSlab(10.4, 6.4, 0.1, 0.35, 0.02), []);

  return (
    <group>
      {/* High Airy Canopy Roof (y = 3.95) */}
      <mesh geometry={fasciaGeo} position={[0, 3.95, 1.25]} castShadow>
        <meshStandardMaterial color="#b94827" roughness={0.55} />
      </mesh>
      <mesh geometry={soffitGeo} position={[0, 3.84, 1.25]}>
        <meshStandardMaterial color="#ebe2d2" roughness={0.8} />
      </mesh>
      {posts.map(([x, z]) => (
        <group key={`${x}-${z}`} position={[x!, 0, z!]}>
          <mesh position={[0, 1.92, 0]} castShadow>
            <cylinderGeometry args={[0.14, 0.16, 3.84, 16]} />
            <meshStandardMaterial color="#27272a" roughness={0.42} metalness={0.55} />
          </mesh>
          <mesh position={[0, 0.14, 0]}>
            <cylinderGeometry args={[0.24, 0.3, 0.28, 16]} />
            <meshStandardMaterial color="#52525b" roughness={0.7} />
          </mesh>
        </group>
      ))}
      {/* Recessed Ceiling LEDs */}
      {[
        [-2.2, 3.8, 0.5],
        [2.2, 3.8, 0.5],
        [-2.2, 3.8, 2.8],
        [2.2, 3.8, 2.8],
      ].map(([x, y, z]) => (
        <mesh key={`${x}-${z}`} position={[x!, y!, z!]}>
          <cylinderGeometry args={[0.26, 0.26, 0.04, 16]} />
          <meshStandardMaterial color="#fff8eb" emissive="#ffe2b0" emissiveIntensity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function Props({
  root,
  monitor,
  poster,
}: {
  root: RefObject<Group | null>;
  monitor: CanvasTexture;
  poster: CanvasTexture;
}) {
  const consoleBaseGeo = useMemo(() => buildRoundedSlab(1.05, 1.05, 0.92, 0.16, 0.03), []);
  const consoleTopGeo = useMemo(() => buildRoundedSlab(1.12, 1.12, 0.07, 0.18, 0.025), []);
  const monitorCaseGeo = useMemo(() => buildRoundedSlab(1.06, 0.72, 0.04, 0.06, 0.018), []);
  const pumpGeo = useMemo(() => buildRetroPumpGeo(), []);
  const pumpFaceTex = useMemo(() => createPumpFaceTexture(), []);
  const spongeTex = useMemo(() => createSpongeTexture(), []);
  const bunTex = useMemo(() => createBunTexture(), []);
  const skullTex = useMemo(() => createConsoleLabelTexture("!", "#dc2626"), []);
  const goTex = useMemo(() => createConsoleLabelTexture("GO", "#16a34a"), []);
  const goldBtnTex = useMemo(() => createConsoleLabelTexture("$", "#15803d", "#fef08a"), []);

  const hoseGeo = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(-0.28, 1.05, 0.1),
      new Vector3(-0.42, 0.65, 0.18),
      new Vector3(-0.34, 0.4, 0.04),
      new Vector3(-0.14, 1.15, -0.04),
    ]);
    return new TubeGeometry(curve, 18, 0.025, 8, false);
  }, []);
  const evCableGeo = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(-0.18, 0.9, 0.1),
      new Vector3(-0.28, 0.55, 0.15),
      new Vector3(-0.2, 0.38, 0.02),
      new Vector3(-0.1, 1.15, -0.02),
    ]);
    return new TubeGeometry(curve, 18, 0.022, 8, false);
  }, []);

  const islandGeo = useMemo(() => buildRoundedSlab(2.35, 0.92, 0.12, 0.25, 0.02), []);

  return (
    <group ref={root}>
      {/* ============================================================
          LEFT: CONTROL CONSOLE (Bảng điều khiển & nút bấm)
         ============================================================ */}
      <group position={[-2.35, 0, 3.48]}>
        <mesh geometry={consoleBaseGeo} castShadow receiveShadow>
          <meshStandardMaterial color="#334155" roughness={0.55} metalness={0.35} />
        </mesh>
        <mesh geometry={consoleTopGeo} position={[0, 0.93, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.45} />
        </mesh>

        {/* POS Touchscreen Monitor facing player */}
        <group position={[-0.08, 1.0, 0.26]} rotation={[0, 0.55, 0]}>
          <mesh position={[0, 0.16, -0.14]} rotation={[0.2, 0, 0]}>
            <cylinderGeometry args={[0.038, 0.065, 0.34, 12]} />
            <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.3} />
          </mesh>
          <group position={[0, 0.4, -0.02]} rotation={[-0.25, 0, 0]}>
            <mesh geometry={monitorCaseGeo} position={[0, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#0f172a" roughness={0.35} metalness={0.5} />
            </mesh>
            <mesh position={[0, 0, 0.012]}>
              <planeGeometry args={[0.98, 0.64]} />
              <meshBasicMaterial map={monitor} toneMapped={false} />
            </mesh>
          </group>
        </group>

        {/* Wanted Poster Clipboard on Console */}
        <mesh position={[0.38, 1.22, 0.32]} rotation={[-0.18, 0.55, 0]}>
          <planeGeometry args={[0.34, 0.45]} />
          <meshBasicMaterial map={poster} toneMapped={false} />
        </mesh>
      </group>

      {/* Gold $ Cash Deposit Pad (SPOT.gold: -2.05, 1.05, 3.35) */}
      <group name="prop-gold" position={[-2.05, 1.02, 3.35]}>
        <mesh>
          <cylinderGeometry args={[0.16, 0.19, 0.06, 20]} />
          <meshStandardMaterial color="#eab308" emissive="#d97706" emissiveIntensity={0.3} roughness={0.25} metalness={0.65} />
        </mesh>
        <mesh position={[0, 0.034, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.13, 0.018, 8, 20]} />
          <meshStandardMaterial color="#fef08a" roughness={0.2} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.033, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.115, 18]} />
          <meshBasicMaterial map={goldBtnTex} />
        </mesh>
      </group>

      {/* Red Skull Emergency Lock Button (SPOT.skull: -2.35, 1.08, 3.12) */}
      <group position={[-2.35, 1.03, 3.12]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.17, 0.06, 20]} />
          <meshStandardMaterial color="#eab308" roughness={0.4} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.045, 0]}>
          <cylinderGeometry args={[0.115, 0.125, 0.05, 20]} />
          <meshStandardMaterial color="#dc2626" emissive="#ef4444" emissiveIntensity={sim.skull ? 1.15 : 0.4} />
        </mesh>
        <mesh position={[0, 0.072, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.1, 18]} />
          <meshBasicMaterial map={skullTex} />
        </mesh>
      </group>

      {/* Green GO Barrier Release Button (SPOT.go: -2.55, 1.08, 3.40) */}
      <group position={[-2.55, 1.03, 3.4]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.17, 0.06, 20]} />
          <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.045, 0]}>
          <cylinderGeometry args={[0.115, 0.125, 0.05, 20]} />
          <meshStandardMaterial color="#16a34a" emissive="#22c55e" emissiveIntensity={0.45} />
        </mesh>
        <mesh position={[0, 0.072, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.1, 18]} />
          <meshBasicMaterial map={goTex} />
        </mesh>
      </group>

      {/* ============================================================
          LEFT-BACK: LARGE SUPPLY CABINET (Tủ chứa vật phẩm lớn)
         ============================================================ */}
      <group position={[-3.8, 0, 4.95]} rotation={[0, 2.55, 0]}>
        {/* Steel Cabinet Outer Frame */}
        <mesh position={[0, 1.05, -0.32]} castShadow receiveShadow>
          <boxGeometry args={[1.36, 2.1, 0.12]} />
          <meshStandardMaterial color="#27272a" roughness={0.5} metalness={0.4} />
        </mesh>
        {[-0.64, 0.64].map((sx) => (
          <mesh key={sx} position={[sx, 1.05, 0]} castShadow>
            <boxGeometry args={[0.08, 2.1, 0.72]} />
            <meshStandardMaterial color="#3f3f46" roughness={0.45} metalness={0.45} />
          </mesh>
        ))}
        {/* Top Cap, Base Plinth & Display Shelves */}
        {[0.08, 0.88, 1.32, 2.04].map((sy) => (
          <mesh key={sy} position={[0, sy, 0]} castShadow receiveShadow>
            <boxGeometry args={[1.32, 0.06, 0.72]} />
            <meshStandardMaterial color="#52525b" roughness={0.4} metalness={0.5} />
          </mesh>
        ))}
        {/* Interior Cabinet Warm LED Light Strip */}
        <mesh position={[0, 1.98, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 1.15, 8]} />
          <meshStandardMaterial color="#fef3c7" emissive="#fde68a" emissiveIntensity={0.9} />
        </mesh>
        {/* Swung-Open Glass Cabinet Door (just like user's drawing!) */}
        <group position={[0.64, 1.05, 0.36]} rotation={[0, 1.15, 0]}>
          <mesh position={[-0.32, 0, 0]}>
            <boxGeometry args={[0.64, 1.92, 0.035]} />
            <meshStandardMaterial color="#bae6fd" roughness={0.1} metalness={0.2} transparent opacity={0.32} />
          </mesh>
          <mesh position={[-0.58, 0, 0.03]}>
            <capsuleGeometry args={[0.015, 0.18, 4, 8]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.85} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* Detailed Items Placed Squarely on Cabinet Shelves */}
      {/* Burger on Tray (SPOT.burger: -3.49, 1.38, 5.06) */}
      <group name="prop-burger" position={[-3.49, 1.38, 5.06]}>
        <mesh position={[0, -0.025, 0]}>
          <cylinderGeometry args={[0.14, 0.12, 0.02, 16]} />
          <meshStandardMaterial color="#dc2626" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.045, 0]}>
          <sphereGeometry args={[0.105, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          <meshStandardMaterial map={bunTex} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.018, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.016, 14]} />
          <meshStandardMaterial color="#65a30d" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.105, 0.105, 0.03, 14]} />
          <meshStandardMaterial color="#78350f" roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.018, 0]}>
          <cylinderGeometry args={[0.1, 0.095, 0.025, 14]} />
          <meshStandardMaterial color="#d97706" roughness={0.7} />
        </mesh>
      </group>

      {/* Threaded Red Gas Cap (SPOT.cap: -4.02, 1.38, 4.71) */}
      <group name="prop-cap" position={[-4.02, 1.38, 4.71]}>
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
          <meshStandardMaterial color="#18181b" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.105, 0.11, 0.05, 18]} />
          <meshStandardMaterial color="#dc2626" roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.052, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.016, 0.14, 4, 8]} />
          <meshStandardMaterial color="#ef4444" roughness={0.35} />
        </mesh>
      </group>

      {/* Wash Bucket + Porous Car Sponge (SPOT.sponge: -3.49, 1.09, 5.06) */}
      <group position={[-3.49, 0.91, 5.06]}>
        <mesh position={[0, 0.09, 0]}>
          <cylinderGeometry args={[0.15, 0.12, 0.18, 16]} />
          <meshStandardMaterial color="#2563eb" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.14, 16]} />
          <meshStandardMaterial color="#bae6fd" roughness={0.2} />
        </mesh>
      </group>
      <group name="prop-sponge" position={[-3.49, 1.09, 5.06]}>
        <mesh rotation={[0, 0.25, Math.PI / 2]}>
          <capsuleGeometry args={[0.055, 0.13, 6, 12]} />
          <meshStandardMaterial map={spongeTex} roughness={0.92} />
        </mesh>
        <mesh position={[0, 0.042, 0]} rotation={[0, 0.25, Math.PI / 2]}>
          <capsuleGeometry args={[0.048, 0.13, 6, 12]} />
          <meshStandardMaterial color="#15803d" roughness={0.95} />
        </mesh>
      </group>

      {/* Tactical Stun Gun / Taser (SPOT.taser: -4.02, 0.96, 4.71) */}
      <group name="prop-taser" position={[-4.02, 0.96, 4.71]} rotation={[0, 0.4, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.045, 0.18, 6, 12]} />
          <meshStandardMaterial color="#eab308" roughness={0.4} />
        </mesh>
        <mesh position={[-0.04, -0.05, 0]} rotation={[0, 0, 0.25]}>
          <capsuleGeometry args={[0.028, 0.09, 6, 10]} />
          <meshStandardMaterial color="#18181b" roughness={0.65} />
        </mesh>
        <mesh position={[0.13, 0.01, 0.024]}>
          <cylinderGeometry args={[0.01, 0.01, 0.06, 8]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0.13, 0.01, -0.024]}>
          <cylinderGeometry args={[0.01, 0.01, 0.06, 8]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* ============================================================
          RIGHT: FUEL PUMP & EV CHARGER ISLAND (Cây trụ chứa xăng)
         ============================================================ */}
      <mesh geometry={islandGeo} position={[3.15, -0.01, 2.8]} receiveShadow>
        <meshStandardMaterial color="#eab308" roughness={0.75} />
      </mesh>

      {/* Gas Pump Dispenser (x = 2.45, z = 2.8) */}
      <group position={[2.45, 0.1, 2.8]}>
        <mesh geometry={pumpGeo} castShadow receiveShadow>
          <meshStandardMaterial color="#c84b26" roughness={0.35} metalness={0.28} />
        </mesh>
        <mesh position={[0, 1.05, 0.255]}>
          <planeGeometry args={[0.46, 0.46]} />
          <meshBasicMaterial map={pumpFaceTex} />
        </mesh>
        <mesh position={[0, 1.05, -0.255]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.46, 0.46]} />
          <meshBasicMaterial map={pumpFaceTex} />
        </mesh>
        <mesh position={[0, 1.66, 0]}>
          <cylinderGeometry args={[0.2, 0.24, 0.14, 18]} />
          <meshStandardMaterial color="#efe4d2" emissive="#fde68a" emissiveIntensity={0.28} roughness={0.4} />
        </mesh>
        <mesh geometry={hoseGeo}>
          <meshStandardMaterial color="#18181b" roughness={0.75} />
        </mesh>
      </group>
      {/* Fuel Nozzle in Holster (SPOT.nozzle: 2.35, 1.18, 2.75) */}
      <group name="prop-nozzle" position={[2.12, 1.25, 2.75]}>
        <mesh rotation={[0.4, 0, -0.5]}>
          <capsuleGeometry args={[0.04, 0.18, 6, 10]} />
          <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.6} />
        </mesh>
        <mesh position={[-0.12, 0.04, 0]}>
          <cylinderGeometry args={[0.052, 0.052, 0.09, 12]} />
          <meshStandardMaterial color={GRADES.find((g) => g.id === sim.grade)?.color ?? "#22c55e"} roughness={0.35} />
        </mesh>
      </group>

      {/* EV Fast Charger (x = 3.85, z = 2.8) */}
      <group position={[3.85, 0.1, 2.8]}>
        <mesh position={[0, 0.72, 0]} castShadow>
          <capsuleGeometry args={[0.21, 1.05, 8, 16]} />
          <meshStandardMaterial color="#264e52" roughness={0.35} metalness={0.35} />
        </mesh>
        <mesh position={[0, 1.08, 0.21]}>
          <torusGeometry args={[0.1, 0.015, 8, 18]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0, 1.08, 0.212]}>
          <circleGeometry args={[0.09, 18]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        <mesh geometry={evCableGeo}>
          <meshStandardMaterial color="#18181b" roughness={0.75} />
        </mesh>
      </group>
      <group name="prop-charger" position={[3.62, 1.24, 2.75]} rotation={[0.5, -0.2, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.038, 0.15, 6, 10]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        <mesh position={[-0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.08, 12]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

function Shredder({ blades }: { blades: RefObject<Group | null> }) {
  const hazardTex = useMemo(() => createHazardTexture(), []);
  const hopperGeo = useMemo(() => buildHopperGeo(), []);
  return (
    <group position={[-5.4, 0, 3.6]}>
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.58, 0.64, 1.24, 20]} />
        <meshStandardMaterial color="#3f4d47" roughness={0.55} metalness={0.42} />
      </mesh>
      <mesh position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.62, 0.63, 0.2, 20]} />
        <meshStandardMaterial map={hazardTex} roughness={0.5} />
      </mesh>
      <mesh geometry={hopperGeo} position={[0, 1.32, 0]} castShadow>
        <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.55} />
      </mesh>
      <mesh position={[-0.62, 1.15, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.11, 0.9, 12]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.55} />
      </mesh>
      <group ref={blades} position={[0, 1.28, 0.25]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.72, 12]} />
          <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.3} />
        </mesh>
        {[-0.25, -0.08, 0.08, 0.25].map((x) => (
          <mesh key={x} position={[x, 0.08, 0]} rotation={[0.4, 0, 0]}>
            <coneGeometry args={[0.06, 0.18, 6]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.25} metalness={0.8} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function RoadsideDecor() {
  return (
    <group>
      {/* Ribbed Steel Oil Drums */}
      {[
        [5.4, 3.6, "#b94827"],
        [5.9, 4.1, "#264e52"],
      ].map(([x, z, col], i) => (
        <group key={i} position={[Number(x), 0, Number(z)]}>
          <mesh position={[0, 0.42, 0]} castShadow>
            <cylinderGeometry args={[0.24, 0.24, 0.84, 16]} />
            <meshStandardMaterial color={String(col)} roughness={0.5} metalness={0.35} />
          </mesh>
          <mesh position={[0, 0.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.245, 0.015, 6, 16]} />
            <meshStandardMaterial color="#1f2937" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.58, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.245, 0.015, 6, 16]} />
            <meshStandardMaterial color="#1f2937" roughness={0.6} />
          </mesh>
        </group>
      ))}
      {/* Stacked Spare Tires */}
      <group position={[5.6, 0, 2.2]}>
        {[0.1, 0.28, 0.46].map((yy, i) => (
          <mesh key={i} position={[i * 0.03, yy, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[0.24, 0.09, 10, 18]} />
            <meshStandardMaterial color="#18181b" roughness={0.88} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function UtilityPoles() {
  const poles = [-18, -6, 6, 18];
  const wireGeo = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(-18, 5.2, -3.1),
      new Vector3(-12, 4.75, -3.1),
      new Vector3(-6, 5.2, -3.1),
      new Vector3(0, 4.75, -3.1),
      new Vector3(6, 5.2, -3.1),
      new Vector3(12, 4.75, -3.1),
      new Vector3(18, 5.2, -3.1),
    ]);
    return new TubeGeometry(curve, 36, 0.018, 5, false);
  }, []);
  return (
    <group>
      {poles.map((x) => (
        <group key={x} position={[x, 0, -2.5]}>
          <mesh position={[0, 2.75, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.13, 5.5, 10]} />
            <meshStandardMaterial color="#5c4433" roughness={0.92} />
          </mesh>
          <mesh position={[0, 5.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1.4, 8]} />
            <meshStandardMaterial color="#4a3728" roughness={0.9} />
          </mesh>
        </group>
      ))}
      <mesh geometry={wireGeo}>
        <meshBasicMaterial color="#1e293b" />
      </mesh>
    </group>
  );
}

function Cacti() {
  const spots = [
    [9.5, -3.2, 1],
    [14, -5.5, 1.25],
    [7.2, -7.5, 0.85],
    [15, 4.5, 1.1],
    [-13, -2.5, 1.2],
    [-12, 4.5, 0.9],
    [6.5, 6.8, 1.05],
    [-8.5, 6.2, 0.95],
  ];
  const shrubs = [
    [7.8, -1.9, 0.35],
    [11.2, 3.4, 0.42],
    [-10.4, 2.9, 0.38],
    [-7.8, -2.2, 0.32],
  ];
  return (
    <>
      {spots.map(([x, z, s]) => (
        <group key={`${x}-${z}`} position={[x!, 0, z!]} scale={s}>
          {/* Ribbed Saguaro Trunk */}
          <mesh position={[0, 0.72, 0]} castShadow>
            <cylinderGeometry args={[0.14, 0.16, 1.28, 9]} />
            <meshStandardMaterial color="#3d6138" roughness={0.9} flatShading />
          </mesh>
          <mesh position={[0, 1.36, 0]}>
            <sphereGeometry args={[0.14, 9, 6]} />
            <meshStandardMaterial color="#3d6138" roughness={0.9} />
          </mesh>
          <mesh position={[0.24, 0.72, 0]} rotation={[0, 0, -0.78]} castShadow>
            <capsuleGeometry args={[0.075, 0.36, 5, 8]} />
            <meshStandardMaterial color="#32522e" roughness={0.9} flatShading />
          </mesh>
          <mesh position={[-0.24, 0.88, 0]} rotation={[0, 0, 0.78]} castShadow>
            <capsuleGeometry args={[0.07, 0.3, 5, 8]} />
            <meshStandardMaterial color="#32522e" roughness={0.9} flatShading />
          </mesh>
        </group>
      ))}
      {/* Dry Desert Sagebrush Shrubs */}
      {shrubs.map(([x, z, s], i) => (
        <group key={`s-${i}`} position={[x!, 0, z!]}>
          <mesh position={[0, s! * 0.5, 0]} scale={[1.2, 0.75, 1.1]}>
            <dodecahedronGeometry args={[s!, 1]} />
            <meshStandardMaterial color="#6e734e" roughness={0.95} flatShading />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Mesas() {
  const mesas: [number, number, number, string][] = [
    [-25, -28, 7.0, "#a8704a"],
    [-9, -31, 9.0, "#97613e"],
    [11, -29, 7.5, "#ad744e"],
    [27, -25, 6.5, "#9c6542"],
  ];
  return (
    <>
      {mesas.map(([x, z, s, color]) => (
        <group key={`${x}`} position={[x, 0, z]}>
          <mesh position={[0, s * 0.25, 0]}>
            <cylinderGeometry args={[s * 0.55, s * 0.98, s * 0.5, 9]} />
            <meshStandardMaterial color={color} roughness={0.96} flatShading />
          </mesh>
          <mesh position={[s * 0.15, s * 0.55, -s * 0.1]}>
            <cylinderGeometry args={[s * 0.32, s * 0.5, s * 0.35, 8]} />
            <meshStandardMaterial color="#b87e56" roughness={0.96} flatShading />
          </mesh>
        </group>
      ))}
      {[
        [8.5, -2.5, 0.55],
        [-11.5, -1.8, 0.7],
        [7.2, 5.8, 0.45],
        [-9.2, 5.8, 0.65],
      ].map(([x, z, s], i) => (
        <mesh key={i} position={[x!, s! * 0.45, z!]} rotation={[i, i * 0.7, 0]} castShadow>
          <dodecahedronGeometry args={[s!, 1]} />
          <meshStandardMaterial color="#946e4c" roughness={0.94} flatShading />
        </mesh>
      ))}
    </>
  );
}
