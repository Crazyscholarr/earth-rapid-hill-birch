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
  createConcreteTexture,
  createHazardTexture,
  createPumpFaceTexture,
  createSandTexture,
  createSignTexture,
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

function buildRoundedSlab(w: number, d: number, h: number, r: number, bevel = 0.04) {
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
  s.moveTo(-0.27, 0);
  s.lineTo(0.27, 0);
  s.lineTo(0.27, 1.15);
  s.quadraticCurveTo(0.27, 1.44, 0, 1.44);
  s.quadraticCurveTo(-0.27, 1.44, -0.27, 1.15);
  s.closePath();
  const geo = new ExtrudeGeometry(s, {
    depth: 0.44,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.035,
    bevelSegments: 4,
    curveSegments: 14,
  });
  geo.translate(0, 0, -0.22);
  geo.computeVertexNormals();
  return geo;
}

function buildDesertTerrainGeo() {
  const geo = new PlaneGeometry(140, 140, 64, 64);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position!;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    // Keep road (z in [-2, 3]) and station pad (x in [-13, 6], z in [-10, 6]) flat
    const inRoad = Math.abs(z - 0.55) < 2.6;
    const inPad = x > -13 && x < 6.5 && z > -10 && z < 6.2;
    if (inRoad || inPad) {
      pos.setY(i, 0);
      continue;
    }
    const distRoad = Math.max(0, Math.abs(z - 0.55) - 2.6);
    const distPad = Math.max(0, Math.max(-13 - x, x - 6.5, -10 - z, z - 6.2));
    const blend = Math.min(1, Math.min(distRoad, distPad) / 6);
    const dune =
      (Math.sin(x * 0.14 + z * 0.09) * 0.55 +
        Math.cos(x * 0.07 - z * 0.13) * 0.75 +
        Math.sin(x * 0.25 + z * 0.22) * 0.18) *
      blend;
    pos.setY(i, Math.max(0, dune + 0.25 * blend));
  }
  geo.computeVertexNormals();
  return geo;
}

function buildHopperGeo() {
  const pts = [new Vector2(0.42, 0), new Vector2(0.42, 0.15), new Vector2(0.68, 0.42), new Vector2(0.62, 0.42), new Vector2(0.38, 0.16)];
  return new LatheGeometry(pts, 20);
}

export function Station() {
  const sandTex = useMemo(() => createSandTexture(), []);
  const concreteTex = useMemo(() => createConcreteTexture(), []);
  const asphaltTex = useMemo(() => createAsphaltTexture(), []);
  const signTex = useMemo(() => createSignTexture(), []);
  const terrainGeo = useMemo(() => buildDesertTerrainGeo(), []);
  const padGeo = useMemo(() => buildRoundedSlab(13.6, 6.4, 0.05, 0.6, 0.02), []);

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
      {/* Sculpted Desert Terrain with Sand Dunes */}
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial map={sandTex} roughness={0.95} metalness={0} />
      </mesh>

      {/* Rounded Concrete Station Apron */}
      <mesh geometry={padGeo} position={[-1.4, -0.02, 2.8]} receiveShadow>
        <meshStandardMaterial map={concreteTex} roughness={0.86} metalness={0.04} />
      </mesh>

      {/* Asphalt Highway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.55]} receiveShadow>
        <planeGeometry args={[72, 3.6]} />
        <meshStandardMaterial map={asphaltTex} roughness={0.9} metalness={0.05} />
      </mesh>
      {/* Road Markings & Curbs */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.026, -1.12]}>
        <planeGeometry args={[72, 0.1]} />
        <meshBasicMaterial color="#cbd5e1" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.026, 2.22]}>
        <planeGeometry args={[72, 0.1]} />
        <meshBasicMaterial color="#cbd5e1" />
      </mesh>
      {[-20, -16, -12, -8, -4, 0, 4, 8, 12, 16, 20, 24].map((x) => (
        <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.03, 0.55]}>
          <planeGeometry args={[1.45, 0.12]} />
          <meshBasicMaterial color="#e5b84b" />
        </mesh>
      ))}

      <Building sign={signTex} />
      <Canopy />
      <Props root={prop} monitor={monitor.tex} poster={poster.tex} />
      <Shredder blades={blades} />
      <RoadsideDecor />

      {/* Exit Boom Barrier */}
      <group position={[-4.55, 0, -0.15]}>
        <mesh position={[0, 0.52, 0]} castShadow>
          <cylinderGeometry args={[0.14, 0.18, 1.04, 14]} />
          <meshStandardMaterial color="#374151" roughness={0.45} metalness={0.5} />
        </mesh>
        <mesh position={[0, 1.1, 0]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial
            color={sim.skull ? "#ef4444" : "#22c55e"}
            emissive={sim.skull ? "#ef4444" : "#22c55e"}
            emissiveIntensity={0.85}
          />
        </mesh>
        <group ref={bar} position={[0, 0.96, 0]}>
          {/* Counterweight */}
          <mesh position={[0, 0, -0.24]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.28, 12]} />
            <meshStandardMaterial color="#1f2937" roughness={0.5} />
          </mesh>
          {/* Cylindrical Boom Arm */}
          <mesh position={[0, 0, 1.0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.045, 0.055, 2.05, 10]} />
            <meshStandardMaterial color="#d95d39" roughness={0.4} />
          </mesh>
          {[0.38, 0.92, 1.46].map((zz) => (
            <mesh key={zz} position={[0, 0, zz]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.052, 0.052, 0.24, 10]} />
              <meshStandardMaterial color="#f5efe6" roughness={0.4} />
            </mesh>
          ))}
        </group>
      </group>

      <Cacti />
      <Mesas />
      <Pumpkins />
    </group>
  );
}

function Building({ sign }: { sign: CanvasTexture }) {
  const winGlow = useRef<MeshStandardMaterial>(null);
  const winGlow2 = useRef<MeshStandardMaterial>(null);
  const bodyGeo = useMemo(() => buildRoundedSlab(9.6, 4.4, 3.3, 0.35, 0.05), []);
  const roofGeo = useMemo(() => buildRoundedSlab(10.2, 5.0, 0.26, 0.45, 0.06), []);
  const awningGeo = useMemo(() => buildRoundedSlab(6.8, 1.0, 0.08, 0.18, 0.02), []);

  useFrame(() => {
    const ei = sim.night * 0.75;
    if (winGlow.current) winGlow.current.emissiveIntensity = ei;
    if (winGlow2.current) winGlow2.current.emissiveIntensity = ei;
  });

  return (
    <group>
      {/* Rounded Stucco Building Shell */}
      <mesh geometry={bodyGeo} position={[-6.2, 0, -5.9]} castShadow receiveShadow>
        <meshStandardMaterial color="#efe4d2" roughness={0.86} />
      </mesh>
      {/* Beveled Terracotta Roof Overhang */}
      <mesh geometry={roofGeo} position={[-6.2, 3.35, -5.9]} castShadow>
        <meshStandardMaterial color="#d95d39" roughness={0.58} />
      </mesh>
      {/* Storefront Window Awning */}
      <mesh geometry={awningGeo} position={[-6.2, 2.42, -3.32]} rotation={[0.25, 0, 0]} castShadow>
        <meshStandardMaterial color="#2b5c61" roughness={0.5} />
      </mesh>
      {/* Diner Storefront Windows with Clean Trim & Sills */}
      {[
        [-4.3, 3.1],
        [-8.1, 2.5],
      ].map(([wx, ww], idx) => (
        <group key={idx} position={[wx!, 1.48, -3.62]}>
          <mesh position={[0, 0, -0.02]}>
            <planeGeometry args={[ww!, 1.84]} />
            <meshStandardMaterial color="#3b3834" roughness={0.6} />
          </mesh>
          <mesh>
            <planeGeometry args={[ww! - 0.16, 1.68]} />
            <meshStandardMaterial
              ref={idx === 0 ? winGlow : winGlow2}
              color="#1f3b4d"
              emissive="#fbbf24"
              emissiveIntensity={0.0}
              roughness={0.14}
              metalness={0.35}
            />
          </mesh>
        </group>
      ))}
      {/* Main Roof Sign */}
      <mesh position={[-6.2, 3.05, -3.56]}>
        <planeGeometry args={[4.6, 1.15]} />
        <meshBasicMaterial map={sign} toneMapped={false} />
      </mesh>
      {/* Cylindrical Rooftop Vent & AC Drum */}
      <group position={[-7.8, 3.65, -6.2]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.45, 0.5, 0.5, 14]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[0.56, 0.45, 0.12, 14]} />
          <meshStandardMaterial color="#64748b" roughness={0.4} metalness={0.5} />
        </mesh>
      </group>
      {/* Corner Stone Column */}
      <group position={[-1.9, 0, -4.1]}>
        <mesh position={[0, 1.65, 0]} castShadow>
          <cylinderGeometry args={[0.32, 0.36, 3.3, 14]} />
          <meshStandardMaterial color="#3b3834" roughness={0.65} />
        </mesh>
        <mesh position={[0, 2.55, 0]}>
          <cylinderGeometry args={[0.36, 0.36, 0.28, 14]} />
          <meshStandardMaterial color="#d95d39" roughness={0.45} />
        </mesh>
      </group>
    </group>
  );
}

function Canopy() {
  const posts = [
    [-2.5, 1.15],
    [3.35, 1.15],
    [-2.5, 4.35],
    [3.35, 4.35],
  ];
  const fasciaGeo = useMemo(() => buildRoundedSlab(7.4, 4.6, 0.26, 0.48, 0.05), []);
  const soffitGeo = useMemo(() => buildRoundedSlab(7.0, 4.2, 0.1, 0.4, 0.02), []);

  return (
    <group>
      {/* Rounded Beveled Canopy Roof */}
      <mesh geometry={fasciaGeo} position={[0.4, 3.16, 2.55]} castShadow>
        <meshStandardMaterial color="#d95d39" roughness={0.55} />
      </mesh>
      <mesh geometry={soffitGeo} position={[0.4, 3.04, 2.55]}>
        <meshStandardMaterial color="#efe4d2" roughness={0.78} />
      </mesh>
      {/* Cylindrical Steel Columns with Base Flanges & Collars */}
      {posts.map(([x, z]) => (
        <group key={`${x}-${z}`} position={[x!, 0, z!]}>
          <mesh position={[0, 1.54, 0]} castShadow>
            <cylinderGeometry args={[0.13, 0.15, 3.08, 16]} />
            <meshStandardMaterial color="#3b3834" roughness={0.45} metalness={0.45} />
          </mesh>
          <mesh position={[0, 2.15, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.32, 16]} />
            <meshStandardMaterial color="#d95d39" roughness={0.45} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.2, 0.26, 0.24, 16]} />
            <meshStandardMaterial color="#6b655d" roughness={0.75} />
          </mesh>
        </group>
      ))}
      {/* Circular Warm Downlights */}
      {[
        [-1.1, 3.0, 1.5],
        [1.7, 3.0, 1.5],
        [-1.1, 3.0, 3.5],
        [1.7, 3.0, 3.5],
      ].map(([x, y, z]) => (
        <group key={`${x}-${z}`} position={[x!, y!, z!]}>
          <mesh>
            <cylinderGeometry args={[0.24, 0.24, 0.05, 16]} />
            <meshStandardMaterial color="#fff8eb" emissive="#ffe2b0" emissiveIntensity={0.9} />
          </mesh>
        </group>
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
  const counterBaseGeo = useMemo(() => buildRoundedSlab(3.05, 0.78, 0.98, 0.28, 0.03), []);
  const counterTopGeo = useMemo(() => buildRoundedSlab(3.2, 0.92, 0.08, 0.32, 0.03), []);
  const pumpGeo = useMemo(() => buildRetroPumpGeo(), []);
  const pumpFaceTex = useMemo(() => createPumpFaceTexture(), []);
  const hoseGeo = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(0.28, 0.95, 0.18),
      new Vector3(0.42, 0.6, 0.26),
      new Vector3(0.32, 0.35, 0.12),
      new Vector3(0.08, 1.15, 0.02),
    ]);
    return new TubeGeometry(curve, 18, 0.025, 8, false);
  }, []);
  const evCableGeo = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(0.18, 0.85, 0.12),
      new Vector3(0.26, 0.55, 0.16),
      new Vector3(0.18, 0.4, 0.02),
      new Vector3(0.05, 1.12, 0.02),
    ]);
    return new TubeGeometry(curve, 18, 0.022, 8, false);
  }, []);
  const monitorCaseGeo = useMemo(() => buildRoundedSlab(1.22, 0.82, 0.05, 0.08, 0.02), []);
  const fridgeGeo = useMemo(() => buildRoundedSlab(0.74, 0.58, 1.44, 0.18, 0.04), []);
  const goldBtnTex = useMemo(
    () =>
      paint((ctx, w, h) => {
        ctx.fillStyle = "#15803d";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#fef08a";
        ctx.font = "900 88px Georgia, serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("$", w / 2, h / 2 + 4);
      }, 128, 128).tex,
    [],
  );

  return (
    <group ref={root}>
      {/* Beveled Rounded Service Counter */}
      <mesh geometry={counterBaseGeo} position={[0.95, 0, 2.66]} castShadow receiveShadow>
        <meshStandardMaterial color="#4a3b32" roughness={0.78} />
      </mesh>
      <mesh geometry={counterTopGeo} position={[0.95, 0.99, 2.66]} castShadow receiveShadow>
        <meshStandardMaterial color="#2b2725" roughness={0.4} metalness={0.25} />
      </mesh>

      {/* POS Monitor on Rear Support Arm */}
      <group position={[0.15, 1.07, 2.34]}>
        <mesh position={[0, 0.18, -0.15]} rotation={[0.2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.07, 0.36, 12]} />
          <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.3} />
        </mesh>
        <group position={[0, 0.44, -0.02]} rotation={[-0.28, 0, 0]}>
          <mesh geometry={monitorCaseGeo} position={[0, 0, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.015]}>
            <planeGeometry args={[1.12, 0.74]} />
            <meshBasicMaterial map={monitor} toneMapped={false} />
          </mesh>
        </group>
      </group>

      {/* Brass Gold Cash Deposit Pad ($) */}
      <group name="prop-gold" position={[1.02, 1.12, 2.46]}>
        <mesh>
          <cylinderGeometry args={[0.21, 0.24, 0.08, 24]} />
          <meshStandardMaterial color="#eab308" emissive="#d97706" emissiveIntensity={0.3} roughness={0.25} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.045, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.16, 0.022, 8, 24]} />
          <meshStandardMaterial color="#fef08a" roughness={0.2} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.044, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.14, 20]} />
          <meshBasicMaterial map={goldBtnTex} />
        </mesh>
      </group>

      {/* Contoured Sponge */}
      <group name="prop-sponge" position={[1.62, 1.13, 2.42]}>
        <mesh rotation={[0, 0.2, Math.PI / 2]}>
          <capsuleGeometry args={[0.055, 0.14, 6, 10]} />
          <meshStandardMaterial color="#eab308" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.045, 0]} rotation={[0, 0.2, Math.PI / 2]}>
          <capsuleGeometry args={[0.048, 0.14, 6, 10]} />
          <meshStandardMaterial color="#15803d" roughness={0.95} />
        </mesh>
      </group>

      {/* Ergonomic Taser */}
      <group name="prop-taser" position={[1.82, 1.14, 2.62]} rotation={[0, 0.4, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.045, 0.16, 6, 10]} />
          <meshStandardMaterial color="#334155" roughness={0.45} metalness={0.35} />
        </mesh>
        <mesh position={[0.12, 0, 0.025]}>
          <cylinderGeometry args={[0.012, 0.012, 0.06, 8]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.7} />
        </mesh>
        <mesh position={[0.12, 0, -0.025]}>
          <cylinderGeometry args={[0.012, 0.012, 0.06, 8]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.7} />
        </mesh>
      </group>

      {/* Ribbed Red Gas Cap */}
      <group name="prop-cap" position={[2.05, 1.13, 2.4]}>
        <mesh>
          <cylinderGeometry args={[0.1, 0.11, 0.06, 16]} />
          <meshStandardMaterial color="#dc2626" roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.035, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.016, 0.14, 4, 8]} />
          <meshStandardMaterial color="#ef4444" roughness={0.35} />
        </mesh>
      </group>

      {/* Retro Rounded Fuel Pump with Hose */}
      <group position={[-0.32, 0, 1.5]}>
        <mesh geometry={pumpGeo} castShadow receiveShadow>
          <meshStandardMaterial color="#d95d39" roughness={0.4} metalness={0.18} />
        </mesh>
        <mesh position={[0, 0.96, 0.265]}>
          <planeGeometry args={[0.42, 0.42]} />
          <meshBasicMaterial map={pumpFaceTex} />
        </mesh>
        <mesh position={[0, 0.96, -0.265]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.42, 0.42]} />
          <meshBasicMaterial map={pumpFaceTex} />
        </mesh>
        <mesh position={[0, 1.48, 0]}>
          <cylinderGeometry args={[0.2, 0.24, 0.14, 18]} />
          <meshStandardMaterial color="#efe4d2" emissive="#fde68a" emissiveIntensity={0.25} roughness={0.4} />
        </mesh>
        <mesh geometry={hoseGeo}>
          <meshStandardMaterial color="#1f2937" roughness={0.7} />
        </mesh>
      </group>
      <group name="prop-nozzle" position={[-0.28, 1.25, 1.45]}>
        <mesh rotation={[0.4, 0, 0.6]}>
          <capsuleGeometry args={[0.042, 0.18, 6, 10]} />
          <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.55} />
        </mesh>
        <mesh position={[0.12, 0.04, 0]}>
          <cylinderGeometry args={[0.055, 0.055, 0.09, 12]} />
          <meshStandardMaterial color={GRADES.find((g) => g.id === sim.grade)?.color ?? "#22c55e"} roughness={0.35} />
        </mesh>
      </group>

      {/* Sleek EV Fast Charger with Coiled Cable */}
      <group position={[-1.08, 0, 1.58]}>
        <mesh position={[0, 0.65, 0]} castShadow>
          <capsuleGeometry args={[0.19, 0.95, 8, 16]} />
          <meshStandardMaterial color="#2b5c61" roughness={0.35} metalness={0.3} />
        </mesh>
        <mesh position={[0, 0.98, 0.19]}>
          <torusGeometry args={[0.095, 0.014, 8, 18]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.75} />
        </mesh>
        <mesh position={[0, 0.98, 0.192]}>
          <circleGeometry args={[0.085, 18]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        <mesh geometry={evCableGeo}>
          <meshStandardMaterial color="#0f172a" roughness={0.7} />
        </mesh>
      </group>
      <group name="prop-charger" position={[-0.95, 1.22, 1.55]} rotation={[0.6, 0.2, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.04, 0.15, 6, 10]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        <mesh position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.055, 0.055, 0.08, 12]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Retro Rounded Snack Fridge */}
      <group position={[-1.2, 0, 3.25]}>
        <mesh geometry={fridgeGeo} castShadow>
          <meshStandardMaterial color="#2b5c61" roughness={0.42} metalness={0.22} />
        </mesh>
        <mesh position={[0, 0.85, 0.29]}>
          <planeGeometry args={[0.52, 0.78]} />
          <meshStandardMaterial color="#bae6fd" emissive="#e0f2fe" emissiveIntensity={0.2} roughness={0.18} />
        </mesh>
        <group name="prop-burger" position={[0.12, 1.02, 0.34]}>
          <mesh position={[0, 0.035, 0]}>
            <sphereGeometry args={[0.1, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <meshStandardMaterial color="#d97706" roughness={0.7} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.1, 0.1, 0.028, 12]} />
            <meshStandardMaterial color="#78350f" roughness={0.85} />
          </mesh>
          <mesh position={[0, -0.028, 0]}>
            <cylinderGeometry args={[0.095, 0.09, 0.028, 12]} />
            <meshStandardMaterial color="#d97706" roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* Wanted Poster on Counter */}
      <mesh position={[0.35, 1.18, 2.95]} rotation={[-0.15, 0, 0]}>
        <planeGeometry args={[0.42, 0.56]} />
        <meshBasicMaterial map={poster} toneMapped={false} />
      </mesh>

      {/* Cylindrical Skull / Go Control Pedestal */}
      <group position={[2.15, 0, 1.85]}>
        <mesh position={[0, 2.65, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 1.4, 10]} />
          <meshStandardMaterial color="#eab308" roughness={0.35} metalness={0.5} />
        </mesh>
        <mesh position={[0, 2.15, 0]} castShadow>
          <capsuleGeometry args={[0.24, 0.72, 8, 14]} />
          <meshStandardMaterial color="#1f2937" roughness={0.45} metalness={0.4} />
        </mesh>
        {/* Red Skull Button */}
        <mesh position={[0, 2.42, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.17, 0.19, 0.06, 20]} />
          <meshStandardMaterial color="#dc2626" emissive="#ef4444" emissiveIntensity={sim.skull ? 1.15 : 0.45} />
        </mesh>
        <mesh position={[0, 2.42, 0.29]}>
          <sphereGeometry args={[0.065, 10, 10]} />
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
        {/* Green GO Button */}
        <mesh position={[0, 1.92, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.17, 0.19, 0.06, 20]} />
          <meshStandardMaterial color="#16a34a" emissive="#22c55e" emissiveIntensity={0.45} />
        </mesh>
      </group>
    </group>
  );
}

function Shredder({ blades }: { blades: RefObject<Group | null> }) {
  const hazardTex = useMemo(() => createHazardTexture(), []);
  const hopperGeo = useMemo(() => buildHopperGeo(), []);
  return (
    <group position={[-4.05, 0, 3.55]}>
      {/* Cylindrical Industrial Drum Body */}
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.58, 0.64, 1.24, 20]} />
        <meshStandardMaterial color="#3f4d47" roughness={0.6} metalness={0.38} />
      </mesh>
      {/* Hazard Stripe Collar */}
      <mesh position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.62, 0.63, 0.2, 20]} />
        <meshStandardMaterial map={hazardTex} roughness={0.5} />
      </mesh>
      {/* Flared Lathe Hopper Funnel */}
      <mesh geometry={hopperGeo} position={[0, 1.32, 0]} castShadow>
        <meshStandardMaterial color="#64748b" roughness={0.45} metalness={0.45} />
      </mesh>
      {/* Side Exhaust Stack */}
      <mesh position={[-0.62, 1.15, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.11, 0.9, 12]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.55} />
      </mesh>
      {/* Rotating Toothed Roller */}
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
      {/* Rustic Ribbed Oil Drums */}
      {[
        [-2.8, 4.15, "#d95d39"],
        [-2.2, 4.45, "#2b5c61"],
      ].map(([x, z, col], i) => (
        <group key={i} position={[Number(x), 0, Number(z)]}>
          <mesh position={[0, 0.42, 0]} castShadow>
            <cylinderGeometry args={[0.24, 0.24, 0.84, 14]} />
            <meshStandardMaterial color={String(col)} roughness={0.55} metalness={0.25} />
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
      {/* Stacked Tires by Station */}
      <group position={[3.85, 0, 3.8]}>
        {[0.1, 0.28, 0.46].map((yy, i) => (
          <mesh key={i} position={[i * 0.04, yy, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[0.24, 0.09, 10, 18]} />
            <meshStandardMaterial color="#1f2937" roughness={0.88} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Cacti() {
  const spots = [
    [8.5, -3.2, 1],
    [12, -5, 1.25],
    [6.2, -6.5, 0.85],
    [14, 3.5, 1.1],
    [-13, -2, 1.2],
    [-12, 4, 0.9],
    [4.5, 6.2, 1.05],
    [-8, 5.5, 0.95],
  ];
  return (
    <>
      {spots.map(([x, z, s]) => (
        <group key={`${x}-${z}`} position={[x!, 0, z!]} scale={s}>
          <mesh position={[0, 0.72, 0]} castShadow>
            <capsuleGeometry args={[0.16, 0.95, 6, 10]} />
            <meshStandardMaterial color="#4d7c4a" roughness={0.85} />
          </mesh>
          <mesh position={[0.24, 0.72, 0]} rotation={[0, 0, -0.78]} castShadow>
            <capsuleGeometry args={[0.08, 0.36, 5, 8]} />
            <meshStandardMaterial color="#3f6a3c" roughness={0.85} />
          </mesh>
          <mesh position={[-0.24, 0.88, 0]} rotation={[0, 0, 0.78]} castShadow>
            <capsuleGeometry args={[0.075, 0.3, 5, 8]} />
            <meshStandardMaterial color="#3f6a3c" roughness={0.85} />
          </mesh>
          {/* Cactus Flower Blossom */}
          <mesh position={[0, 1.38, 0]}>
            <sphereGeometry args={[0.06, 8, 6]} />
            <meshStandardMaterial color="#fb7185" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Mesas() {
  const mesas: [number, number, number, string][] = [
    [-22, -26, 6.5, "#b87b52"],
    [-8, -29, 8.5, "#a66c46"],
    [9, -27, 7.2, "#bd8259"],
    [24, -24, 6.0, "#a96e48"],
  ];
  return (
    <>
      {mesas.map(([x, z, s, color]) => (
        <group key={`${x}`} position={[x, 0, z]}>
          {/* Stepped Flat-Top Desert Mesa Plateau */}
          <mesh position={[0, s * 0.25, 0]}>
            <cylinderGeometry args={[s * 0.55, s * 0.95, s * 0.5, 9]} />
            <meshStandardMaterial color={color} roughness={0.95} />
          </mesh>
          <mesh position={[s * 0.15, s * 0.55, -s * 0.1]}>
            <cylinderGeometry args={[s * 0.32, s * 0.5, s * 0.35, 8]} />
            <meshStandardMaterial color="#c48a60" roughness={0.95} />
          </mesh>
        </group>
      ))}
      {/* Scattered Desert Boulders */}
      {[
        [7.5, -2.5, 0.55],
        [-11.5, -1.8, 0.7],
        [5.8, 5.6, 0.45],
        [-9.2, 5.8, 0.65],
      ].map(([x, z, s], i) => (
        <mesh key={i} position={[x!, s! * 0.5, z!]} rotation={[i, i * 0.7, 0]} castShadow>
          <dodecahedronGeometry args={[s!, 1]} />
          <meshStandardMaterial color="#a67c58" roughness={0.92} />
        </mesh>
      ))}
    </>
  );
}

function Pumpkins() {
  return (
    <group>
      {[
        [-3.2, 4.8],
        [4.2, 4.6],
      ].map(([x, z]) => (
        <group key={x} position={[x!, 0.18, z!]}>
          {[0, 1, 2, 3].map((r) => (
            <mesh key={r} rotation={[0, (r * Math.PI) / 4, 0]} scale={[1.1, 0.85, 0.7]} castShadow>
              <sphereGeometry args={[0.2, 10, 8]} />
              <meshStandardMaterial color="#d96b27" roughness={0.72} />
            </mesh>
          ))}
          <mesh position={[0, 0.18, 0]} rotation={[0.2, 0, 0.15]}>
            <cylinderGeometry args={[0.022, 0.035, 0.1, 6]} />
            <meshStandardMaterial color="#4d7c4a" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
