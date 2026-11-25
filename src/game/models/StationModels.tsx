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
  createAoShadowTexture,
  createAsphaltTexture,
  createBrickTexture,
  createBunTexture,
  createCanyonRockTexture,
  createConcreteTexture,
  createConsoleLabelTexture,
  createHazardTexture,
  createPriceTotemTexture,
  createPumpFaceTexture,
  createPumpTopperTexture,
  createSandTexture,
  createSignTexture,
  createSpongeTexture,
  createStoreWindowTexture,
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

function buildDesertTerrainGeo() {
  const geo = new PlaneGeometry(180, 180, 72, 72);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position!;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const inRoad = Math.abs(z - 0.5) < 3.1;
    const inPad = x > -11 && x < 8.5 && z > -9.5 && z < 8.0;
    if (inRoad || inPad) {
      pos.setY(i, 0);
      continue;
    }
    const distRoad = Math.max(0, Math.abs(z - 0.5) - 3.1);
    const distPad = Math.max(0, Math.max(-11 - x, x - 8.5, -9.5 - z, z - 8.0));
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
  const segs = 24;
  const geo = new PlaneGeometry(1, 1, segs, 4);
  // Build sculpted irregular canyon cliff cylinder via radial vertex displacement
  const pts: Vector2[] = [
    new Vector2(rBot, 0),
    new Vector2(rBot * 0.88, height * 0.28),
    new Vector2(rTop * 1.12, height * 0.68),
    new Vector2(rTop, height),
    new Vector2(0, height),
  ];
  void geo;
  const lathe = new LatheGeometry(pts, segs);
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
  return new LatheGeometry(pts, 24);
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
      vis("prop-burger-extra", sim.burgers > 1);
      vis("prop-cap", sim.hold !== "cap" && sim.caps > 0);
      vis("prop-cap-extra", sim.caps > 1);
      vis("prop-taser", sim.hold !== "taser");
    }
    if (bar.current) bar.current.rotation.x = -1.25 * sim.barrier;
    if (blades.current) blades.current.rotation.x += dt * 4.2;
  });

  return (
    <group>
      {/* Sculpted Desert Terrain */}
      <mesh geometry={terrainGeo} receiveShadow>
        <meshStandardMaterial map={sandTex} bumpMap={bumpTex} bumpScale={0.04} roughness={0.95} metalness={0} />
      </mesh>

      {/* Open Concrete Service Apron (Employee Forecourt) */}
      <mesh geometry={padGeo} position={[-0.7, -0.018, 4.8]} receiveShadow>
        <meshStandardMaterial map={concreteTex} bumpMap={bumpTex} bumpScale={0.018} roughness={0.85} metalness={0.04} />
      </mesh>

      {/* Two-Way / Service Asphalt Highway (Lối đi của xe) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.5]} receiveShadow>
        <planeGeometry args={[104, 4.1]} />
        <meshStandardMaterial map={asphaltTex} bumpMap={bumpTex} bumpScale={0.024} roughness={0.88} metalness={0.05} />
      </mesh>
      {/* Raised Concrete Road Shoulders / Curbs */}
      <mesh position={[0, 0.045, -1.52]} receiveShadow>
        <boxGeometry args={[104, 0.07, 0.18]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.82} />
      </mesh>
      <mesh position={[0, 0.045, 2.52]} receiveShadow>
        <boxGeometry args={[104, 0.07, 0.18]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.82} />
      </mesh>
      {/* White Stop Line & Service Bay Pavement Markings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.25, 0.027, 0.55]}>
        <planeGeometry args={[0.22, 3.4]} />
        <meshBasicMaterial color="#e2e8f0" />
      </mesh>
      {[-28, -24, -20, -16, -12, -8, -4.2, 4.2, 8, 12, 16, 20, 24, 28].map((x) => (
        <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.027, 0.5]}>
          <planeGeometry args={[1.65, 0.13]} />
          <meshBasicMaterial color="#eab308" />
        </mesh>
      ))}

      {/* Route 66 Convenience Store, Diner & Price Totem */}
      <Building sign={signTex} totem={totemTex} bump={bumpTex} concrete={concreteTex} ao={aoTex} />
      {/* Structural Steel Forecourt Canopy */}
      <Canopy ao={aoTex} />
      {/* Interactive Console, Supply Locker, H-Frame Fuel Pump & DC Supercharger */}
      <Props root={prop} monitor={monitor.tex} poster={poster.tex} ao={aoTex} concrete={concreteTex} />
      {/* Industrial Shredder */}
      <Shredder blades={blades} ao={aoTex} />
      <RoadsideDecor ao={aoTex} />

      {/* Heavy-Duty Exit Boom Barrier Gate spanning the left lane (Cái cổng chặn xe) */}
      <group position={[-5.4, 0, -1.42]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.028, 0]}>
          <planeGeometry args={[1.1, 1.1]} />
          <meshBasicMaterial map={aoTex} transparent depthWrite={false} />
        </mesh>
        {/* Steel Pedestal Housing (Far Side) */}
        <mesh position={[0, 0.62, 0]} castShadow>
          <boxGeometry args={[0.36, 1.24, 0.36]} />
          <meshStandardMaterial color="#eab308" roughness={0.42} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0.66, 0]} castShadow>
          <boxGeometry args={[0.38, 0.92, 0.38]} />
          <meshStandardMaterial color="#1e293b" roughness={0.45} metalness={0.55} />
        </mesh>
        {/* Opposite Catch Post (Near Side) */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.028, 3.84]}>
          <planeGeometry args={[0.95, 0.95]} />
          <meshBasicMaterial map={aoTex} transparent depthWrite={false} />
        </mesh>
        <mesh position={[0, 0.56, 3.84]} castShadow>
          <cylinderGeometry args={[0.13, 0.16, 1.12, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.45} metalness={0.55} />
        </mesh>
        <mesh position={[0, 0.94, 3.84]}>
          <boxGeometry args={[0.26, 0.22, 0.22]} />
          <meshStandardMaterial color="#eab308" roughness={0.4} />
        </mesh>
        {/* Traffic Signal Light Beacon */}
        <mesh position={[0, 1.36, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.18, 16]} />
          <meshStandardMaterial
            color={sim.skull ? "#ef4444" : "#22c55e"}
            emissive={sim.skull ? "#ef4444" : "#22c55e"}
            emissiveIntensity={1.1}
          />
        </mesh>
        {/* Swinging Reflective Boom Arm + Counterweight */}
        <group ref={bar} position={[0, 1.02, 0]}>
          <mesh position={[0, 0, -0.34]}>
            <boxGeometry args={[0.24, 0.22, 0.42]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0, 1.9]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.048, 0.056, 3.82, 12]} />
            <meshStandardMaterial color="#dc2626" roughness={0.35} />
          </mesh>
          {[0.45, 1.18, 1.9, 2.62, 3.35].map((zz) => (
            <mesh key={zz} position={[0, 0, zz]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.053, 0.053, 0.34, 12]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>
          ))}
        </group>
      </group>

      <Guardrails />
      <UtilityPoles />
      <Cacti />
      <Mesas rockTex={rockTex} bumpTex={bumpTex} />
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
  const winGlow = useRef<MeshStandardMaterial>(null);
  const winGlow2 = useRef<MeshStandardMaterial>(null);
  const brickTex = useMemo(() => createBrickTexture(), []);
  const winLeftTex = useMemo(() => createStoreWindowTexture("left"), []);
  const winRightTex = useMemo(() => createStoreWindowTexture("right"), []);
  const vendingTex = useMemo(() => createVendingFrontTexture(), []);
  const bodyGeo = useMemo(() => buildRoundedSlab(12.2, 4.6, 3.65, 0.22, 0.04), []);
  const parapetGeo = useMemo(() => buildRoundedSlab(12.6, 5.0, 0.32, 0.26, 0.04), []);
  const awningGeo = useMemo(() => buildRoundedSlab(9.6, 1.18, 0.09, 0.12, 0.02), []);

  useFrame(() => {
    const ei = 0.42 + sim.night * 0.72;
    if (winGlow.current) winGlow.current.emissiveIntensity = ei;
    if (winGlow2.current) winGlow2.current.emissiveIntensity = ei;
  });

  return (
    <group position={[-1.4, 0, -5.8]}>
      {/* Storefront Concrete Sidewalk Apron */}
      <mesh position={[0, 0.04, 2.85]} receiveShadow>
        <boxGeometry args={[13.2, 0.08, 1.5]} />
        <meshStandardMaterial map={concrete} bumpMap={bump} bumpScale={0.015} roughness={0.84} />
      </mesh>
      {/* Building Ground Contact AO */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.085, 2.2]}>
        <planeGeometry args={[13.2, 1.2]} />
        <meshBasicMaterial map={ao} transparent depthWrite={false} />
      </mesh>
      {/* Yellow Storefront Safety Bollards */}
      {[-4.2, -1.6, 1.6, 4.2].map((bx) => (
        <mesh key={bx} position={[bx, 0.46, 3.45]} castShadow>
          <cylinderGeometry args={[0.075, 0.085, 0.84, 14]} />
          <meshStandardMaterial color="#eab308" roughness={0.4} metalness={0.3} />
        </mesh>
      ))}

      {/* Textured Plaster Stucco Main Building */}
      <mesh geometry={bodyGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#dfd3be" bumpMap={bump} bumpScale={0.02} roughness={0.88} />
      </mesh>
      {/* Brick Lower Wainscoting + Stone Corner Pilasters */}
      <mesh position={[0, 0.48, 2.36]}>
        <planeGeometry args={[11.8, 0.96]} />
        <meshStandardMaterial map={brickTex} bumpMap={bump} bumpScale={0.025} roughness={0.9} />
      </mesh>
      {[-5.95, 5.95].map((px) => (
        <mesh key={px} position={[px, 1.82, 2.26]} castShadow>
          <boxGeometry args={[0.42, 3.64, 0.32]} />
          <meshStandardMaterial map={brickTex} roughness={0.88} />
        </mesh>
      ))}

      {/* Architectural Parapet Roof + Metal Coping Trim */}
      <mesh geometry={parapetGeo} position={[0, 3.66, 0]} castShadow>
        <meshStandardMaterial color="#a63e22" roughness={0.54} />
      </mesh>
      <mesh position={[0, 4.02, 2.52]}>
        <boxGeometry args={[12.68, 0.07, 0.12]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.75} />
      </mesh>

      {/* Rooftop HVAC Air Conditioning Unit & Vent Stack */}
      <group position={[-3.4, 4.02, -0.4]}>
        <mesh position={[0, 0.36, 0]} castShadow>
          <boxGeometry args={[1.65, 0.72, 1.25]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.48} metalness={0.55} />
        </mesh>
        <mesh position={[-0.36, 0.73, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.38, 18]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} />
        </mesh>
        <mesh position={[0.46, 0.73, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.32, 18]} />
          <meshStandardMaterial color="#1e293b" roughness={0.7} />
        </mesh>
      </group>

      {/* Cantilevered Metal Storefront Awning + Steel Tie-Rods (Clear of Sign!) */}
      <mesh geometry={awningGeo} position={[0, 2.58, 2.78]} rotation={[0.16, 0, 0]} castShadow>
        <meshStandardMaterial color="#1f4246" roughness={0.42} metalness={0.45} />
      </mesh>
      {[-4.3, -2.95, 2.95, 4.3].map((rx) => (
        <mesh key={rx} position={[rx, 2.95, 2.68]} rotation={[-0.65, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 1.05, 8]} />
          <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.25} />
        </mesh>
      ))}

      {/* Illuminated Convenience Store Windows (Visible Fridges, Snacks & Neon Signs!) */}
      {[
        [-3.05, 3.5, winLeftTex],
        [3.05, 3.5, winRightTex],
      ].map(([wx, ww, tex], idx) => (
        <group key={idx} position={[Number(wx), 1.66, 2.36]}>
          {/* Anodized Aluminum Outer Frame */}
          <mesh position={[0, 0, 0.01]}>
            <boxGeometry args={[Number(ww), 1.72, 0.06]} />
            <meshStandardMaterial color="#18181b" roughness={0.35} metalness={0.65} />
          </mesh>
          {/* Lit Store Interior Behind Glass */}
          <mesh position={[0, 0, 0.045]}>
            <planeGeometry args={[Number(ww) - 0.16, 1.56]} />
            <meshStandardMaterial
              ref={idx === 0 ? winGlow : winGlow2}
              map={tex as CanvasTexture}
              emissiveMap={tex as CanvasTexture}
              emissive="#ffffff"
              emissiveIntensity={0.45}
              roughness={0.12}
              metalness={0.28}
            />
          </mesh>
          {/* Aluminum Vertical Mullion Dividers */}
          {[-Number(ww) * 0.18, Number(ww) * 0.18].map((mx) => (
            <mesh key={mx} position={[mx, 0, 0.055]}>
              <boxGeometry args={[0.04, 1.58, 0.03]} />
              <meshStandardMaterial color="#3f3f46" metalness={0.75} roughness={0.25} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Double Aluminum-Framed Glass Store Entrance Doors */}
      <group position={[0, 1.2, 2.36]}>
        <mesh position={[0, 0, 0.015]}>
          <boxGeometry args={[1.68, 2.28, 0.07]} />
          <meshStandardMaterial color="#18181b" roughness={0.35} metalness={0.65} />
        </mesh>
        {[-0.4, 0.4].map((dx) => (
          <mesh key={dx} position={[dx, 0.04, 0.052]}>
            <planeGeometry args={[0.72, 2.08]} />
            <meshStandardMaterial color="#1e3a4c" emissive="#fbbf24" emissiveIntensity={0.18} roughness={0.08} metalness={0.65} />
          </mesh>
        ))}
        {/* Chrome Push Handles */}
        {[-0.1, 0.1].map((hx) => (
          <mesh key={hx} position={[hx, -0.02, 0.075]}>
            <capsuleGeometry args={[0.016, 0.34, 4, 8]} />
            <meshStandardMaterial color="#f1f5f9" metalness={0.92} roughness={0.15} />
          </mesh>
        ))}
      </group>

      {/* Outdoor Ice Merchandiser Chest ("ICE") & Cold Soda Machine */}
      <group position={[-5.1, 0.08, 2.75]}>
        <mesh position={[0, 0.48, 0]} castShadow>
          <boxGeometry args={[1.25, 0.96, 0.68]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.35} />
        </mesh>
        <mesh position={[0, 1.0, -0.04]} rotation={[0.28, 0, 0]}>
          <boxGeometry args={[1.22, 0.08, 0.68]} />
          <meshStandardMaterial color="#0284c7" roughness={0.3} metalness={0.3} />
        </mesh>
      </group>
      <group position={[5.25, 0.08, 2.72]}>
        <mesh position={[0, 0.95, 0]} castShadow>
          <boxGeometry args={[0.92, 1.9, 0.66]} />
          <meshStandardMaterial color="#991b1b" roughness={0.34} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0.98, 0.335]}>
          <planeGeometry args={[0.82, 1.72]} />
          <meshBasicMaterial map={vendingTex} toneMapped={false} />
        </mesh>
      </group>

      {/* Framed 3D Rooftop Signboard */}
      <group position={[0, 3.36, 2.42]}>
        <mesh position={[0, 0, -0.05]} castShadow>
          <boxGeometry args={[5.4, 1.34, 0.14]} />
          <meshStandardMaterial color="#18181b" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[5.2, 1.22]} />
          <meshBasicMaterial map={sign} toneMapped={false} />
        </mesh>
      </group>

      {/* Tall Illuminated Highway Fuel Price Totem (Right side of building) */}
      <group position={[7.6, 0, 2.2]} rotation={[0, -0.22, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <planeGeometry args={[2.2, 1.6]} />
          <meshBasicMaterial map={ao} transparent depthWrite={false} />
        </mesh>
        <mesh position={[0, 0.18, 0]} castShadow>
          <boxGeometry args={[1.7, 0.36, 0.72]} />
          <meshStandardMaterial map={concrete} roughness={0.85} />
        </mesh>
        {[-0.64, 0.64].map((px) => (
          <mesh key={px} position={[px, 2.65, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.1, 5.1, 14]} />
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
  // Wide outer steel columns so central employee workspace is 100% unobstructed!
  const posts = [
    [-5.0, -1.6],
    [5.0, -1.6],
    [-5.0, 4.25],
    [5.0, 4.25],
  ];
  const fasciaGeo = useMemo(() => buildRoundedSlab(11.6, 7.2, 0.34, 0.32, 0.04), []);
  const soffitGeo = useMemo(() => buildRoundedSlab(11.1, 6.7, 0.08, 0.24, 0.02), []);

  return (
    <group>
      {/* Ribbed Steel Canopy Fascia + Glowing Amber Perimeter Strip */}
      <mesh geometry={fasciaGeo} position={[0, 4.02, 1.32]} castShadow>
        <meshStandardMaterial color="#a83d20" roughness={0.46} metalness={0.25} />
      </mesh>
      <mesh position={[0, 4.16, 4.95]}>
        <boxGeometry args={[11.1, 0.055, 0.04]} />
        <meshStandardMaterial color="#fef3c7" emissive="#f59e0b" emissiveIntensity={1.15} />
      </mesh>
      <mesh position={[0, 4.16, -2.31]}>
        <boxGeometry args={[11.1, 0.055, 0.04]} />
        <meshStandardMaterial color="#fef3c7" emissive="#f59e0b" emissiveIntensity={1.15} />
      </mesh>

      {/* Recessed Metal Deck Soffit + Structural Steel Ceiling Beams */}
      <mesh geometry={soffitGeo} position={[0, 3.94, 1.32]}>
        <meshStandardMaterial color="#e2dad0" roughness={0.72} metalness={0.12} />
      </mesh>
      {[-3.6, -1.2, 1.2, 3.6].map((bx) => (
        <mesh key={`beam-x-${bx}`} position={[bx, 3.9, 1.32]}>
          <boxGeometry args={[0.14, 0.1, 6.55]} />
          <meshStandardMaterial color="#334155" roughness={0.45} metalness={0.6} />
        </mesh>
      ))}
      {[-0.6, 1.32, 3.25].map((bz) => (
        <mesh key={`beam-z-${bz}`} position={[0, 3.91, bz]}>
          <boxGeometry args={[10.9, 0.08, 0.14]} />
          <meshStandardMaterial color="#475569" roughness={0.48} metalness={0.55} />
        </mesh>
      ))}

      {/* Heavy Steel Columns with Concrete Crash Piers */}
      {posts.map(([x, z]) => (
        <group key={`${x}-${z}`} position={[x!, 0, z!]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.028, 0]}>
            <planeGeometry args={[1.35, 1.35]} />
            <meshBasicMaterial map={ao} transparent depthWrite={false} />
          </mesh>
          <mesh position={[0, 1.98, 0]} castShadow>
            <boxGeometry args={[0.26, 3.96, 0.26]} />
            <meshStandardMaterial color="#27272a" roughness={0.38} metalness={0.68} />
          </mesh>
          {/* Yellow/Charcoal Concrete Crash Pier */}
          <mesh position={[0, 0.36, 0]} castShadow>
            <cylinderGeometry args={[0.26, 0.3, 0.72, 18]} />
            <meshStandardMaterial color="#eab308" roughness={0.55} />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.32, 0.34, 0.16, 18]} />
            <meshStandardMaterial color="#3f3f46" roughness={0.75} />
          </mesh>
        </group>
      ))}

      {/* Framed Rectangular Recessed LED Canopy Troffers */}
      {[
        [-2.4, 3.88, 0.36],
        [2.4, 3.88, 0.36],
        [-2.4, 3.88, 2.3],
        [2.4, 3.88, 2.3],
      ].map(([x, y, z]) => (
        <group key={`${x}-${z}`} position={[x!, y!, z!]}>
          <mesh>
            <boxGeometry args={[1.15, 0.04, 0.46]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0, -0.022, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.04, 0.36]} />
            <meshStandardMaterial color="#fffbeb" emissive="#fde68a" emissiveIntensity={1.25} />
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
  ao,
  concrete,
}: {
  root: RefObject<Group | null>;
  monitor: CanvasTexture;
  poster: CanvasTexture;
  ao: CanvasTexture;
  concrete: CanvasTexture;
}) {
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
    return new TubeGeometry(curve, 22, 0.024, 10, false);
  }, []);
  const evCableGeo = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(-0.28, 1.48, 0.06),
      new Vector3(-0.44, 0.95, 0.14),
      new Vector3(-0.38, 0.48, 0.06),
      new Vector3(-0.26, 1.1, -0.02),
    ]);
    return new TubeGeometry(curve, 22, 0.026, 10, false);
  }, []);

  const islandGeo = useMemo(() => buildRoundedSlab(2.75, 1.06, 0.13, 0.28, 0.02), []);

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
        {/* Brushed Steel Kickplate & Front Louver Trim */}
        <mesh position={[0.62, 0.46, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.78, 0.62]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} metalness={0.5} />
        </mesh>
        <mesh geometry={consoleTopGeo} position={[0, 0.93, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#141b26" roughness={0.32} metalness={0.55} />
        </mesh>

        {/* Unobstructed Widescreen POS Touchscreen Terminal (Facing employee workspace!) */}
        <group position={[-0.08, 1.0, 0.24]} rotation={[0, 0.95, 0]}>
          <mesh position={[0, 0.15, -0.1]} rotation={[0.18, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.068, 0.32, 14]} />
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

      {/* Dedicated Wanted Warrant Lectern Stand (Zero screen overlap!) */}
      <group position={[-2.96, 0, 4.28]} rotation={[0, 0.88, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.026, 0]}>
          <planeGeometry args={[0.85, 0.85]} />
          <meshBasicMaterial map={ao} transparent depthWrite={false} />
        </mesh>
        <mesh position={[0, 0.62, 0]} castShadow>
          <cylinderGeometry args={[0.032, 0.042, 1.24, 12]} />
          <meshStandardMaterial color="#334155" roughness={0.38} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.2, 0.22, 0.06, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.45} metalness={0.6} />
        </mesh>
        <group position={[0, 1.32, 0.04]} rotation={[-0.28, 0, 0]}>
          {/* Cork / Steel Clipboard Backing */}
          <mesh position={[0, 0, -0.018]} castShadow>
            <boxGeometry args={[0.48, 0.62, 0.028]} />
            <meshStandardMaterial color="#44403c" roughness={0.65} metalness={0.3} />
          </mesh>
          {/* Chrome Binder Clip */}
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

      {/* Gold $ Cash Deposit Validator Pad (SPOT.gold: -1.98, 1.05, 3.42) */}
      <group name="prop-gold" position={[-1.98, 1.02, 3.42]}>
        <mesh>
          <boxGeometry args={[0.34, 0.065, 0.34]} />
          <meshStandardMaterial color="#1e293b" roughness={0.35} metalness={0.65} />
        </mesh>
        <mesh position={[0, 0.038, 0]}>
          <cylinderGeometry args={[0.135, 0.15, 0.045, 22]} />
          <meshStandardMaterial color="#eab308" emissive="#d97706" emissiveIntensity={0.35} roughness={0.22} metalness={0.72} />
        </mesh>
        <mesh position={[0, 0.063, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.115, 20]} />
          <meshBasicMaterial map={goldBtnTex} />
        </mesh>
      </group>

      {/* Guarded Red Emergency Lock Button (SPOT.skull: -2.22, 1.08, 3.12) */}
      <group position={[-2.22, 1.02, 3.12]}>
        <mesh>
          <cylinderGeometry args={[0.145, 0.165, 0.06, 20]} />
          <meshStandardMaterial color="#eab308" roughness={0.38} metalness={0.35} />
        </mesh>
        <mesh position={[0, 0.045, 0]}>
          <cylinderGeometry args={[0.108, 0.118, 0.055, 20]} />
          <meshStandardMaterial color="#dc2626" emissive="#ef4444" emissiveIntensity={sim.skull ? 1.25 : 0.42} />
        </mesh>
        <mesh position={[0, 0.075, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.095, 20]} />
          <meshBasicMaterial map={skullTex} />
        </mesh>
      </group>

      {/* Illuminated Green GO Dispatch Button (SPOT.go: -2.56, 1.08, 3.32) */}
      <group position={[-2.56, 1.02, 3.32]}>
        <mesh>
          <cylinderGeometry args={[0.145, 0.165, 0.06, 20]} />
          <meshStandardMaterial color="#334155" roughness={0.38} metalness={0.55} />
        </mesh>
        <mesh position={[0, 0.045, 0]}>
          <cylinderGeometry args={[0.108, 0.118, 0.055, 20]} />
          <meshStandardMaterial color="#16a34a" emissive="#22c55e" emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, 0.075, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.095, 20]} />
          <meshBasicMaterial map={goTex} />
        </mesh>
      </group>

      {/* ============================================================
          LEFT-BACK: INDUSTRIAL GLASS-FRONT SUPPLY LOCKER (Tủ vật phẩm lớn)
         ============================================================ */}
      <group position={[-3.82, 0, 4.96]} rotation={[0, 2.52, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.026, 0]}>
          <planeGeometry args={[2.1, 1.4]} />
          <meshBasicMaterial map={ao} transparent depthWrite={false} />
        </mesh>
        {/* Heavy Powder-Coated Steel Back & Side Walls */}
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
        {/* Base Plinth, Illuminated Shelves & Header Canopy */}
        {[0.08, 0.88, 1.34, 2.08].map((sy) => (
          <group key={sy} position={[0, sy, 0]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[1.38, 0.055, 0.76]} />
              <meshStandardMaterial color="#475569" roughness={0.36} metalness={0.58} />
            </mesh>
            {/* Chrome Front Lip Rail */}
            <mesh position={[0, 0.015, 0.375]}>
              <boxGeometry args={[1.36, 0.025, 0.02]} />
              <meshStandardMaterial color="#cbd5e1" roughness={0.22} metalness={0.85} />
            </mesh>
          </group>
        ))}
        {/* Interior Warm LED Shelf Strips */}
        {[1.3, 2.02].map((ly) => (
          <mesh key={ly} position={[0, ly, 0.12]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.018, 0.018, 1.22, 8]} />
            <meshStandardMaterial color="#fef3c7" emissive="#fde68a" emissiveIntensity={1.1} />
          </mesh>
        ))}
        {/* Framed Tempered-Glass Door Swung Open */}
        <group position={[0.68, 1.08, 0.38]} rotation={[0, 1.18, 0]}>
          <mesh position={[-0.34, 0, 0]}>
            <boxGeometry args={[0.68, 1.96, 0.032]} />
            <meshStandardMaterial color="#bae6fd" roughness={0.08} metalness={0.35} transparent opacity={0.3} />
          </mesh>
          {/* Door Aluminum Perimeter Frame + Chrome Handle */}
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

      {/* Diner Cheeseburger Basket (SPOT.burger: -3.49, 1.39, 5.06) */}
      <group name="prop-burger" position={[-3.49, 1.39, 5.06]}>
        <BurgerProp bunTex={bunTex} />
      </group>
      <group name="prop-burger-extra" position={[-3.68, 1.39, 4.94]} scale={0.9}>
        <BurgerProp bunTex={bunTex} />
      </group>

      {/* OEM Threaded Red Fuel Cap (SPOT.cap: -4.02, 1.39, 4.71) */}
      <group name="prop-cap" position={[-4.02, 1.39, 4.71]}>
        <GasCapProp />
      </group>
      <group name="prop-cap-extra" position={[-4.18, 1.39, 4.58]} scale={0.92}>
        <GasCapProp />
      </group>

      {/* Auto Detailing Wash Bucket + Suds + Microfiber Sponge (SPOT.sponge: -3.49, 1.09, 5.06) */}
      <group position={[-3.49, 0.91, 5.06]}>
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.155, 0.12, 0.2, 18]} />
          <meshStandardMaterial color="#1d4ed8" roughness={0.38} />
        </mesh>
        <mesh position={[0, 0.19, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.155, 0.012, 8, 18]} />
          <meshStandardMaterial color="#1e40af" roughness={0.4} />
        </mesh>
        {/* Chrome Bail Handle */}
        <mesh position={[0, 0.19, 0]} rotation={[0.45, 0, 0]}>
          <torusGeometry args={[0.16, 0.007, 6, 18, Math.PI]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.142, 16]} />
          <meshStandardMaterial color="#e0f2fe" roughness={0.18} />
        </mesh>
      </group>
      <group name="prop-sponge" position={[-3.49, 1.11, 5.06]}>
        <mesh rotation={[0, 0.25, Math.PI / 2]}>
          <capsuleGeometry args={[0.052, 0.13, 6, 12]} />
          <meshStandardMaterial map={spongeTex} roughness={0.92} />
        </mesh>
        <mesh position={[0, 0.04, 0]} rotation={[0, 0.25, Math.PI / 2]}>
          <capsuleGeometry args={[0.046, 0.13, 6, 12]} />
          <meshStandardMaterial color="#15803d" roughness={0.95} />
        </mesh>
      </group>

      {/* Police-Issue X26 Stun Gun / Taser (SPOT.taser: -4.02, 0.96, 4.71) */}
      <group name="prop-taser" position={[-4.02, 0.96, 4.71]} rotation={[0, 0.42, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.24, 0.082, 0.058]} />
          <meshStandardMaterial color="#eab308" roughness={0.36} />
        </mesh>
        <mesh position={[-0.02, 0.005, 0]}>
          <boxGeometry args={[0.14, 0.04, 0.062]} />
          <meshStandardMaterial color="#18181b" roughness={0.6} />
        </mesh>
        <mesh position={[-0.05, -0.065, 0]} rotation={[0, 0, 0.28]}>
          <boxGeometry args={[0.058, 0.11, 0.048]} />
          <meshStandardMaterial color="#18181b" roughness={0.72} />
        </mesh>
        {[-0.018, 0.018].map((tz) => (
          <mesh key={tz} position={[0.14, 0.012, tz]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.009, 0.009, 0.055, 8]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={1.0} />
          </mesh>
        ))}
      </group>

      {/* ============================================================
          RIGHT: COMMERCIAL H-FRAME FUEL DISPENSER & DC EV SUPERCHARGER
         ============================================================ */}
      <group position={[3.2, 0, 2.82]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.026, 0]}>
          <planeGeometry args={[3.5, 1.75]} />
          <meshBasicMaterial map={ao} transparent depthWrite={false} />
        </mesh>
        <mesh geometry={islandGeo} position={[0, -0.01, 0]} receiveShadow>
          <meshStandardMaterial map={concrete} roughness={0.78} />
        </mesh>
        {/* Yellow Painted Island Safety Rim */}
        <mesh position={[0, 0.05, 0.52]}>
          <boxGeometry args={[2.3, 0.1, 0.05]} />
          <meshStandardMaterial color="#eab308" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.05, -0.52]}>
          <boxGeometry args={[2.3, 0.1, 0.05]} />
          <meshStandardMaterial color="#eab308" roughness={0.5} />
        </mesh>
        {/* Heavy Yellow Steel U-Bar Crash Bollards on Island Ends */}
        {[-1.22, 1.22].map((bx) => (
          <group key={bx} position={[bx, 0.12, 0]}>
            {[-0.24, 0.24].map((bz) => (
              <mesh key={bz} position={[0, 0.42, bz]} castShadow>
                <cylinderGeometry args={[0.042, 0.042, 0.84, 12]} />
                <meshStandardMaterial color="#eab308" roughness={0.38} metalness={0.4} />
              </mesh>
            ))}
            <mesh position={[0, 0.84, 0]} rotation={[0, Math.PI / 2, 0]}>
              <torusGeometry args={[0.24, 0.042, 10, 18, Math.PI]} />
              <meshStandardMaterial color="#eab308" roughness={0.38} metalness={0.4} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Modern Commercial H-Frame Multi-Product Fuel Pump (x = 2.48, z = 2.82) */}
      <group position={[2.48, 0.12, 2.82]}>
        {/* Lower Hydraulics Steel Cabinet */}
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

        {/* Brushed Stainless Steel Side Structural Columns */}
        {[-0.35, 0.35].map((cx) => (
          <mesh key={cx} position={[cx, 1.04, 0]} castShadow>
            <boxGeometry args={[0.09, 2.08, 0.44]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.24} metalness={0.82} />
          </mesh>
        ))}

        {/* Central Recessed Digital Meter & Grade Selector Head */}
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

        {/* Overhead Illuminated Dispenser Valence Header */}
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

        {/* Side Nozzle Holster Boot, Recessed Cradle Panel & High-Hang Hose */}
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

      {/* Holstered Aluminum Fuel Nozzle (SPOT.nozzle: 2.15, 1.22, 2.8) */}
      <group name="prop-nozzle" position={[2.12, 1.26, 2.8]}>
        <mesh rotation={[0.35, 0, -0.45]}>
          <boxGeometry args={[0.055, 0.18, 0.08]} />
          <meshStandardMaterial
            color={GRADES.find((g) => g.id === sim.grade)?.color ?? "#f59e0b"}
            roughness={0.32}
          />
        </mesh>
        <mesh position={[0.04, 0.1, 0]} rotation={[0, 0, -0.65]}>
          <cylinderGeometry args={[0.014, 0.016, 0.16, 12]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

      {/* 150kW Hollow-Arch DC Ultra-Fast EV Supercharger (x = 3.92, z = 2.82) */}
      <group position={[3.92, 0.12, 2.82]}>
        {/* Lower Power Electronics Base */}
        <mesh position={[0, 0.36, 0]} castShadow>
          <boxGeometry args={[0.68, 0.72, 0.42]} />
          <meshStandardMaterial color="#18181b" roughness={0.38} metalness={0.55} />
        </mesh>
        {/* Pearl-Silver Outer Arch Columns + Top Crown */}
        {[-0.27, 0.27].map((ax) => (
          <group key={ax} position={[ax, 1.28, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.12, 1.4, 0.38]} />
              <meshStandardMaterial color="#e2e8f0" roughness={0.24} metalness={0.68} />
            </mesh>
            {/* Glowing Cyan Inner Supercharger Status LED Strip */}
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
        {/* Central DC Fast-Charge Screen Crossbar */}
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
      {/* Holstered CCS2 Fast-Charger Connector (SPOT.charger: 3.62, 1.22, 2.8) */}
      <group name="prop-charger" position={[3.62, 1.24, 2.8]} rotation={[0.45, -0.2, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.036, 0.15, 6, 10]} />
          <meshStandardMaterial color="#1e293b" roughness={0.36} metalness={0.45} />
        </mesh>
        <mesh position={[-0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.048, 0.048, 0.08, 14]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.85} />
        </mesh>
      </group>
    </group>
  );
}

function BurgerProp({ bunTex }: { bunTex: CanvasTexture }) {
  return (
    <group>
      {/* Red Diner Serving Basket */}
      <mesh position={[0, -0.03, 0]}>
        <boxGeometry args={[0.25, 0.028, 0.22]} />
        <meshStandardMaterial color="#dc2626" roughness={0.48} />
      </mesh>
      {/* Parchment Liner */}
      <mesh position={[0, -0.014, 0]} rotation={[0, 0.35, 0]}>
        <boxGeometry args={[0.21, 0.006, 0.19]} />
        <meshStandardMaterial color="#fef3c7" roughness={0.85} />
      </mesh>
      {/* Bottom Bun, Beef Patty, Melted Cheddar Slice, Lettuce, Tomato & Sesame Crown */}
      <mesh position={[0, -0.002, 0]}>
        <cylinderGeometry args={[0.098, 0.092, 0.024, 16]} />
        <meshStandardMaterial color="#d97706" roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.104, 0.104, 0.028, 16]} />
        <meshStandardMaterial color="#5c2810" roughness={0.88} />
      </mesh>
      <mesh position={[0, 0.036, 0]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[0.165, 0.007, 0.165]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.046, 0]}>
        <cylinderGeometry args={[0.108, 0.108, 0.014, 16]} />
        <meshStandardMaterial color="#65a30d" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.058, 0]}>
        <sphereGeometry args={[0.102, 16, 10, 0, Math.PI * 2, 0, Math.PI * 0.54]} />
        <meshStandardMaterial map={bunTex} roughness={0.68} />
      </mesh>
    </group>
  );
}

function GasCapProp() {
  return (
    <group>
      <mesh position={[0, -0.022, 0]}>
        <cylinderGeometry args={[0.072, 0.072, 0.048, 16]} />
        <meshStandardMaterial color="#18181b" roughness={0.65} />
      </mesh>
      <mesh position={[0, 0.018, 0]}>
        <cylinderGeometry args={[0.106, 0.11, 0.045, 20]} />
        <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.25} />
      </mesh>
      <mesh position={[0, 0.052, 0]}>
        <boxGeometry args={[0.17, 0.032, 0.036]} />
        <meshStandardMaterial color="#ef4444" roughness={0.32} metalness={0.2} />
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
        <cylinderGeometry args={[0.58, 0.64, 1.24, 22]} />
        <meshStandardMaterial color="#374440" roughness={0.5} metalness={0.48} />
      </mesh>
      <mesh position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.625, 0.635, 0.22, 22]} />
        <meshStandardMaterial map={hazardTex} roughness={0.48} />
      </mesh>
      <mesh geometry={hopperGeo} position={[0, 1.32, 0]} castShadow>
        <meshStandardMaterial color="#64748b" roughness={0.36} metalness={0.65} />
      </mesh>
      <mesh position={[-0.62, 1.15, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.11, 0.9, 14]} />
        <meshStandardMaterial color="#334155" roughness={0.38} metalness={0.6} />
      </mesh>
      <group ref={blades} position={[0, 1.28, 0.25]}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 0.72, 14]} />
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
  return (
    <group>
      {/* Ribbed Steel 55-Gallon Oil Drums */}
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
            <cylinderGeometry args={[0.25, 0.25, 0.88, 18]} />
            <meshStandardMaterial color={String(col)} roughness={0.44} metalness={0.45} />
          </mesh>
          {[0.28, 0.6].map((ry) => (
            <mesh key={ry} position={[0, ry, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.255, 0.015, 6, 18]} />
              <meshStandardMaterial color="#18181b" roughness={0.55} metalness={0.4} />
            </mesh>
          ))}
        </group>
      ))}
      {/* Stacked Spare Radial Tires */}
      <group position={[5.75, 0, 2.25]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
          <planeGeometry args={[1.05, 1.05]} />
          <meshBasicMaterial map={ao} transparent depthWrite={false} />
        </mesh>
        {[0.1, 0.28, 0.46].map((yy, i) => (
          <mesh key={i} position={[i * 0.03, yy, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <torusGeometry args={[0.24, 0.09, 10, 20]} />
            <meshStandardMaterial color="#18181b" roughness={0.86} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Guardrails() {
  // Galvanized W-beam highway guardrails flanking road approaches
  const spans: [number, number][] = [
    [-16.5, 15],
    [16.5, 15],
  ];
  return (
    <group>
      {spans.map(([cx, len], idx) => (
        <group key={idx} position={[cx, 0, -1.82]}>
          <mesh position={[0, 0.56, 0]} castShadow>
            <boxGeometry args={[len, 0.24, 0.06]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.36} metalness={0.78} />
          </mesh>
          {[-6, -3, 0, 3, 6].map((px) => (
            <mesh key={px} position={[px, 0.35, -0.05]} castShadow>
              <boxGeometry args={[0.1, 0.7, 0.1]} />
              <meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.65} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function UtilityPoles() {
  const poles = [-20, -7.5, 8.5, 21];
  const wireGeo = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(-20, 5.45, -2.85),
      new Vector3(-13.75, 4.95, -2.85),
      new Vector3(-7.5, 5.45, -2.85),
      new Vector3(0.5, 4.92, -2.85),
      new Vector3(8.5, 5.45, -2.85),
      new Vector3(14.75, 4.95, -2.85),
      new Vector3(21, 5.45, -2.85),
    ]);
    return new TubeGeometry(curve, 42, 0.016, 6, false);
  }, []);
  const wireGeo2 = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(-20, 5.45, -2.25),
      new Vector3(-13.75, 4.95, -2.25),
      new Vector3(-7.5, 5.45, -2.25),
      new Vector3(0.5, 4.92, -2.25),
      new Vector3(8.5, 5.45, -2.25),
      new Vector3(14.75, 4.95, -2.25),
      new Vector3(21, 5.45, -2.25),
    ]);
    return new TubeGeometry(curve, 42, 0.016, 6, false);
  }, []);

  return (
    <group>
      {poles.map((x, idx) => (
        <group key={x} position={[x, 0, -2.55]}>
          <mesh position={[0, 2.9, 0]} castShadow>
            <cylinderGeometry args={[0.09, 0.135, 5.8, 12]} />
            <meshStandardMaterial color="#543d2d" roughness={0.92} />
          </mesh>
          <mesh position={[0, 5.38, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.09, 1.5, 0.09]} />
            <meshStandardMaterial color="#463224" roughness={0.9} />
          </mesh>
          {/* Ceramic Insulators */}
          {[-0.55, 0, 0.55].map((iz) => (
            <mesh key={iz} position={[0, 5.48, iz]}>
              <cylinderGeometry args={[0.03, 0.04, 0.11, 8]} />
              <meshStandardMaterial color="#cbd5e1" roughness={0.25} />
            </mesh>
          ))}
          {/* Pole-Mounted Transformer Drum on Pole #2 */}
          {idx === 2 ? (
            <mesh position={[0.24, 4.45, 0]} castShadow>
              <cylinderGeometry args={[0.16, 0.16, 0.58, 14]} />
              <meshStandardMaterial color="#64748b" roughness={0.45} metalness={0.55} />
            </mesh>
          ) : null}
        </group>
      ))}
      <mesh geometry={wireGeo}>
        <meshBasicMaterial color="#18181b" />
      </mesh>
      <mesh geometry={wireGeo2}>
        <meshBasicMaterial color="#18181b" />
      </mesh>
    </group>
  );
}

function Cacti() {
  const spots = [
    [10.2, -3.4, 1.05],
    [14.8, -5.8, 1.3],
    [8.4, -8.2, 0.9],
    [15.5, 4.8, 1.15],
    [-13.5, -2.8, 1.22],
    [-12.5, 4.8, 0.95],
    [7.2, 7.2, 1.08],
    [-8.8, 6.6, 0.98],
  ];
  const shrubs = [
    [8.2, -2.2, 0.36],
    [11.8, 3.6, 0.44],
    [-10.8, 3.2, 0.4],
    [-8.2, -2.4, 0.34],
    [13.4, -2.6, 0.38],
  ];
  return (
    <>
      {spots.map(([x, z, s]) => (
        <group key={`${x}-${z}`} position={[x!, 0, z!]} scale={s}>
          <mesh position={[0, 0.78, 0]} castShadow>
            <cylinderGeometry args={[0.13, 0.155, 1.48, 12]} />
            <meshStandardMaterial color="#385b33" roughness={0.88} />
          </mesh>
          <mesh position={[0, 1.52, 0]}>
            <sphereGeometry args={[0.13, 12, 8]} />
            <meshStandardMaterial color="#385b33" roughness={0.88} />
          </mesh>
          <mesh position={[0.24, 0.82, 0]} rotation={[0, 0, -0.68]} castShadow>
            <capsuleGeometry args={[0.075, 0.38, 6, 10]} />
            <meshStandardMaterial color="#2f4f2b" roughness={0.88} />
          </mesh>
          <mesh position={[-0.24, 0.96, 0]} rotation={[0, 0, 0.68]} castShadow>
            <capsuleGeometry args={[0.07, 0.34, 6, 10]} />
            <meshStandardMaterial color="#2f4f2b" roughness={0.88} />
          </mesh>
        </group>
      ))}
      {shrubs.map(([x, z, s], i) => (
        <group key={`s-${i}`} position={[x!, 0, z!]}>
          <mesh position={[0, s! * 0.45, 0]} scale={[1.35, 0.72, 1.2]}>
            <dodecahedronGeometry args={[s!, 1]} />
            <meshStandardMaterial color="#676e49" roughness={0.95} flatShading />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Mesas({ rockTex, bumpTex }: { rockTex: CanvasTexture; bumpTex: CanvasTexture }) {
  const buttes = useMemo(
    () => [
      {
        x: -28,
        z: -34,
        base: buildButteLayerGeo(5.2, 9.8, 4.6, 1.1),
        cap: buildButteLayerGeo(3.4, 4.8, 3.2, 2.4),
      },
      {
        x: -9,
        z: -38,
        base: buildButteLayerGeo(6.8, 12.6, 5.8, 3.2),
        cap: buildButteLayerGeo(4.5, 6.2, 4.1, 4.7),
      },
      {
        x: 13,
        z: -35,
        base: buildButteLayerGeo(5.8, 10.8, 5.0, 5.3),
        cap: buildButteLayerGeo(3.8, 5.2, 3.6, 6.1),
      },
      {
        x: 31,
        z: -29,
        base: buildButteLayerGeo(4.8, 8.9, 4.2, 7.4),
        cap: buildButteLayerGeo(2.9, 4.2, 2.8, 8.2),
      },
      {
        x: -34,
        z: 28,
        base: buildButteLayerGeo(5.4, 10.2, 4.4, 2.9),
        cap: buildButteLayerGeo(3.2, 4.6, 2.9, 1.8),
      },
      {
        x: 28,
        z: 32,
        base: buildButteLayerGeo(5.0, 9.4, 4.1, 6.5),
        cap: buildButteLayerGeo(3.1, 4.4, 2.7, 3.9),
      },
    ],
    [],
  );

  return (
    <>
      {buttes.map((b, idx) => (
        <group key={idx} position={[b.x, -0.1, b.z]}>
          <mesh geometry={b.base}>
            <meshStandardMaterial map={rockTex} bumpMap={bumpTex} bumpScale={0.08} roughness={0.94} />
          </mesh>
          <mesh geometry={b.cap} position={[0.4, 4.1, -0.3]}>
            <meshStandardMaterial map={rockTex} bumpMap={bumpTex} bumpScale={0.08} roughness={0.94} />
          </mesh>
        </group>
      ))}
      {/* Foreground Weathered Sandstone Boulders */}
      {[
        [9.2, -2.6, 0.58],
        [-11.8, -2.1, 0.72],
        [7.8, 6.2, 0.48],
        [-9.6, 6.1, 0.66],
      ].map(([x, z, s], i) => (
        <mesh key={i} position={[x!, s! * 0.42, z!]} rotation={[i, i * 0.7, 0]} scale={[1.25, 0.82, 1.1]} castShadow>
          <dodecahedronGeometry args={[s!, 1]} />
          <meshStandardMaterial map={rockTex} bumpMap={bumpTex} bumpScale={0.04} roughness={0.92} />
        </mesh>
      ))}
    </>
  );
}
