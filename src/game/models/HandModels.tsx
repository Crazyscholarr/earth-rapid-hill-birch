import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { CatmullRomCurve3, TubeGeometry, Vector3, type Group, type Mesh, type MeshLambertMaterial } from "three";
import { GRADES } from "@/game/content";
import { getPropGeos } from "@/game/models/PropGeos";
import { sim } from "@/game/sim";
import { createBillTexture, createBunTexture, createSpongeTexture, drawBubble, drawPoster, getSharedPosterArt, paint } from "@/game/textures";

export function Bubble() {
  const ref = useRef<Mesh>(null);
  const art = useMemo(() => paint(() => undefined, 256, 256), []);
  useFrame(() => {
    const mesh = ref.current;
    const c = sim.car;
    if (!mesh) return;
    if (!c || c.phase === "leave") {
      mesh.visible = false;
      return;
    }
    mesh.visible = true;
    const th = c.yaw + Math.PI;
    const co = Math.cos(th);
    const si = Math.sin(th);
    mesh.position.set(c.x + 0.18 * co + 0.08 * si, 1.76 + Math.sin(sim.clock * 3) * 0.025, c.z - 0.18 * si + 0.08 * co);
    mesh.lookAt(sim.player.x, 1.54, sim.player.z);

    // Only redraw bubble when actual order/status changes — NEVER mid-pump or mid-wash!
    const key = `${c.id}:${c.job}:${c.asleep}:${c.caught}:${c.wanted && sim.posterUp}:${c.grade}`;
    if (art.key !== key) {
      art.key = key;
      drawBubble(art.ctx, c);
      art.tex.needsUpdate = true;
    }
  });
  return (
    <mesh ref={ref} visible={false}>
      <planeGeometry args={[0.52, 0.52]} />
      <meshBasicMaterial map={art.tex} transparent toneMapped={false} />
    </mesh>
  );
}

export function Bills() {
  const ref = useRef<Group>(null);
  const billTex = useMemo(() => createBillTexture(), []);
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    if (sim.bills.length === 0) {
      if (g.visible) g.visible = false;
      return;
    }
    g.visible = true;
    for (let i = 0; i < g.children.length; i++) {
      const m = g.children[i] as Group;
      const b = sim.bills[i];
      if (!b) {
        m.visible = false;
        continue;
      }
      m.visible = true;
      m.position.set(b.x, b.y + Math.sin(sim.clock * 4 + b.id) * 0.025, b.z);
      m.rotation.y = sim.clock * 1.5 + b.id;
      const s = 0.9 + Math.min(0.65, b.amount / 180);
      m.scale.setScalar(s);
    }
  });
  return (
    <group ref={ref} visible={false}>
      {Array.from({ length: 6 }, (_, i) => (
        <group key={i} visible={false}>
          <mesh>
            <boxGeometry args={[0.26, 0.038, 0.13]} />
            <meshLambertMaterial map={billTex} color="#dcfce7" emissive="#16a34a" emissiveIntensity={0.18} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.052, 0.042, 0.136]} />
            <meshLambertMaterial color="#f59e0b" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function Bits() {
  const ref = useRef<Group>(null);
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    if (sim.bits.length === 0) {
      if (g.visible) g.visible = false;
      return;
    }
    g.visible = true;
    for (let i = 0; i < g.children.length; i++) {
      const m = g.children[i] as Mesh;
      const b = sim.bits[i];
      if (!b) {
        m.visible = false;
        continue;
      }
      m.visible = true;
      m.position.set(b.x, b.y, b.z);
      m.rotation.x += 0.15;
      m.rotation.y += 0.12;
    }
  });
  return (
    <group ref={ref} visible={false}>
      {Array.from({ length: 14 }, (_, i) => (
        <mesh key={i} visible={false}>
          <dodecahedronGeometry args={[0.052, 0]} />
          <meshLambertMaterial color={i % 2 ? "#22c55e" : "#eab308"} />
        </mesh>
      ))}
    </group>
  );
}

export function Marker() {
  const ref = useRef<Mesh>(null);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const groundPick = sim.aimKind === "bill" || sim.aimKind === "mdrop" || sim.aimKind === "loot";
    const vis = sim.phase === "play" && groundPick;
    m.visible = vis;
    if (vis) {
      m.position.set(sim.aimPos.x, sim.aimPos.y + 0.24 + Math.sin(sim.clock * 6) * 0.035, sim.aimPos.z);
      m.rotation.y = sim.clock * 3;
    }
  });
  return (
    <mesh ref={ref} visible={false}>
      <octahedronGeometry args={[0.045, 0]} />
      <meshLambertMaterial color="#fde047" emissive="#f59e0b" emissiveIntensity={0.8} />
    </mesh>
  );
}

function GripGlove({ side }: { side: "left" | "right" }) {
  const s = side === "left" ? -1 : 1;
  const pg = useMemo(() => getPropGeos(), []);
  return (
    <group position={[s * 0.024, -0.058, 0.072]} rotation={[0.22, -s * 0.14, 0]}>
      <mesh geometry={pg.sleeveGeo}>
        <meshLambertMaterial color="#1e3a44" />
      </mesh>
      <mesh geometry={side === "left" ? pg.leftGloveGeo : pg.rightGloveGeo}>
        <meshLambertMaterial color="#24272d" />
      </mesh>
    </group>
  );
}

export function Hands() {
  const ref = useRef<Group>(null);
  const posterRef = useRef<Group>(null);
  const toolRef = useRef<Group>(null);
  const nozzleRef = useRef<Group>(null);
  const spongeRef = useRef<Group>(null);
  const burgerRef = useRef<Group>(null);
  const capRef = useRef<Group>(null);
  const taserRef = useRef<Group>(null);
  const cashRef = useRef<Group>(null);
  const mirrorRef = useRef<Group>(null);
  const chargerRef = useRef<Group>(null);
  const hatRef = useRef<Group>(null);
  const hatMat1 = useRef<MeshLambertMaterial>(null);
  const hatMat2 = useRef<MeshLambertMaterial>(null);
  const cheeseRef = useRef<Mesh>(null);
  const hornsRef = useRef<Group>(null);
  const tipMatRef = useRef<MeshLambertMaterial>(null);
  const lastState = useRef("");

  const pg = useMemo(() => getPropGeos(), []);
  const billTex = useMemo(() => createBillTexture(), []);
  const spongeTex = useMemo(() => createSpongeTexture(), []);
  const bunTex = useMemo(() => createBunTexture(), []);
  const poster = useMemo(() => getSharedPosterArt(), []);
  const trailingHoseGeo = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(0, -0.08, 0.055),
      new Vector3(0.03, -0.22, 0.16),
      new Vector3(0.08, -0.42, 0.28),
    ]);
    return new TubeGeometry(curve, 10, 0.017, 7, false);
  }, []);

  useFrame((state) => {
    const g = ref.current;
    if (!g || sim.phase === "title") {
      if (g) g.visible = false;
      return;
    }
    g.visible = true;
    const cam = state.camera;
    g.position.copy(cam.position);
    g.rotation.copy(cam.rotation);
    g.position.y += Math.sin(sim.clock * 2.2) * 0.004;

    const h = sim.hold;
    if (h !== "none" && toolRef.current) {
      const jiggle = sim.usePulse > 0 ? Math.sin(sim.clock * 26) * 0.022 * sim.usePulse : 0;
      toolRef.current.position.set(0.25 + jiggle, -0.2 + Math.abs(jiggle), -0.52);
      toolRef.current.rotation.set(0.08, 0.32, -0.06);
    }

    const stKey = `${h}|${sim.posterUp}|${sim.wornHorns}|${sim.grade}|${sim.hatColor}`;
    if (lastState.current !== stKey) {
      lastState.current = stKey;
      if (posterRef.current) posterRef.current.visible = sim.posterUp;
      if (toolRef.current) toolRef.current.visible = h !== "none";
      if (nozzleRef.current) nozzleRef.current.visible = h === "nozzle";
      if (spongeRef.current) spongeRef.current.visible = h === "sponge";
      if (burgerRef.current) burgerRef.current.visible = h === "burger";
      if (capRef.current) capRef.current.visible = h === "cap";
      if (taserRef.current) taserRef.current.visible = h === "taser";
      if (cashRef.current) cashRef.current.visible = h === "cash";
      if (mirrorRef.current) mirrorRef.current.visible = h === "mirror";
      if (chargerRef.current) chargerRef.current.visible = h === "charger";
      if (cheeseRef.current) cheeseRef.current.visible = h === "cheese";
      if (hornsRef.current) hornsRef.current.visible = sim.wornHorns;
      if (hatRef.current) {
        const on = h === "hat";
        hatRef.current.visible = on;
        if (on) {
          if (hatMat1.current) hatMat1.current.color.set(sim.hatColor);
          if (hatMat2.current) hatMat2.current.color.set(sim.hatColor);
        }
      }
      if (h === "nozzle" && tipMatRef.current) {
        const gc = GRADES.find((x) => x.id === sim.grade)?.color ?? "#f59e0b";
        tipMatRef.current.color.set(gc);
      }
    }

    if (sim.posterUp) {
      const key = String(sim.warrant);
      if (poster.key !== key) {
        poster.key = key;
        drawPoster(poster.ctx, poster.canvas.width, poster.canvas.height);
        poster.tex.needsUpdate = true;
      }
    }
  });

  return (
    <group ref={ref}>
      {/* Left Hand + Wanted Warrant Clipboard */}
      <group ref={posterRef} position={[-0.22, -0.04, -0.58]} rotation={[0.04, 0.18, 0]} visible={false}>
        <mesh position={[0, 0, -0.008]}>
          <boxGeometry args={[0.36, 0.48, 0.012]} />
          <meshLambertMaterial color="#44403c" />
        </mesh>
        <mesh>
          <planeGeometry args={[0.34, 0.46]} />
          <meshBasicMaterial map={poster.tex} toneMapped={false} />
        </mesh>
        <GripGlove side="left" />
      </group>

      {/* Right Hand + Sculpted High-Craft Tool */}
      <group ref={toolRef} position={[0.25, -0.2, -0.52]} visible={false}>
        <GripGlove side="right" />

        {/* OPW Automatic Fuel Nozzle */}
        <group ref={nozzleRef}>
          <mesh geometry={trailingHoseGeo}>
            <meshLambertMaterial color="#141417" />
          </mesh>
          <mesh geometry={pg.nozzleMetalGeo}>
            <meshPhongMaterial color="#d8e0ea" specular="#ffffff" shininess={80} />
          </mesh>
          <mesh geometry={pg.nozzleBootGeo}>
            <meshLambertMaterial ref={tipMatRef} color="#f59e0b" />
          </mesh>
          <mesh geometry={pg.nozzleSplashGeo}>
            <meshLambertMaterial color="#18181b" />
          </mesh>
        </group>

        {/* Figure-8 Bone Car Wash Sponge */}
        <group ref={spongeRef} visible={false} rotation={[0.22, 0.4, 0]} position={[0, 0.02, -0.03]}>
          <mesh geometry={pg.spongeYellowGeo}>
            <meshLambertMaterial map={spongeTex} />
          </mesh>
          <mesh geometry={pg.spongeGreenGeo}>
            <meshLambertMaterial color="#15803d" />
          </mesh>
        </group>

        {/* Diner Cheeseburger + Crispy Fries Basket (2 draw calls instead of 6!) */}
        <group ref={burgerRef} visible={false} position={[0, 0.025, -0.04]} scale={0.82}>
          <mesh geometry={pg.burgerSolidGeo}>
            <meshLambertMaterial vertexColors />
          </mesh>
          <mesh geometry={pg.burgerBunAndFriesGeo}>
            <meshLambertMaterial map={bunTex} />
          </mesh>
        </group>

        {/* OEM Click-Torque Threaded Red Fuel Cap */}
        <group ref={capRef} visible={false} rotation={[0.42, 0.2, 0]} position={[0, 0.022, -0.03]} scale={0.84}>
          <mesh geometry={pg.capDarkGeo}>
            <meshLambertMaterial color="#18181b" />
          </mesh>
          <mesh geometry={pg.capRedGeo}>
            <meshPhongMaterial color="#dc2626" specular="#fca5a5" shininess={65} />
          </mesh>
        </group>

        {/* Tactical Pistol-Grip X26 Stun Gun */}
        <group ref={taserRef} visible={false}>
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

        {/* Crisp Banded USD Banknote Stack */}
        <group ref={cashRef} visible={false} rotation={[0.25, 0.3, 0]} position={[0, 0.015, -0.025]}>
          <mesh>
            <boxGeometry args={[0.18, 0.035, 0.095]} />
            <meshLambertMaterial map={billTex} color="#dcfce7" />
          </mesh>
          <mesh>
            <boxGeometry args={[0.04, 0.038, 0.1]} />
            <meshLambertMaterial color="#f59e0b" />
          </mesh>
        </group>

        {/* Detached Aerodynamic Side Mirror */}
        <group ref={mirrorRef} visible={false} position={[0, 0.02, -0.02]}>
          <mesh position={[0, -0.04, 0.02]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[0.032, 0.07, 0.04]} />
            <meshLambertMaterial color="#18181b" />
          </mesh>
          <mesh scale={[1.18, 0.76, 0.68]}>
            <sphereGeometry args={[0.062, 12, 8]} />
            <meshPhongMaterial color="#94a3b8" specular="#ffffff" shininess={75} />
          </mesh>
          <mesh position={[0, 0, -0.04]} scale={[1.12, 0.72, 1]} rotation={[0, Math.PI, 0]}>
            <circleGeometry args={[0.046, 14]} />
            <meshPhongMaterial color="#f8fafc" specular="#ffffff" shininess={95} />
          </mesh>
        </group>

        {/* Ergonomic CCS2 EV Fast-Charger Gun */}
        <group ref={chargerRef} visible={false}>
          <mesh geometry={trailingHoseGeo}>
            <meshLambertMaterial color="#141417" />
          </mesh>
          <mesh geometry={pg.chargerDarkGeo}>
            <meshLambertMaterial color="#1e293b" />
          </mesh>
          <mesh geometry={pg.chargerCyanGeo}>
            <meshLambertMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={1.1} />
          </mesh>
        </group>

        {/* Held Driver Cap */}
        <group ref={hatRef} visible={false} rotation={[0.25, 0.4, 0]}>
          <mesh scale={[1, 0.65, 1]}>
            <sphereGeometry args={[0.1, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <meshLambertMaterial ref={hatMat1} color="#eab308" />
          </mesh>
          <mesh position={[0, 0, 0.08]} scale={[1.1, 0.25, 0.9]}>
            <cylinderGeometry args={[0.08, 0.09, 0.03, 12, 1, false, -Math.PI * 0.45, Math.PI * 0.9]} />
            <meshLambertMaterial ref={hatMat2} color="#eab308" />
          </mesh>
        </group>

        {/* Contraband Cheese Wedge */}
        <mesh ref={cheeseRef} visible={false} rotation={[0.25, 0.5, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.055, 3]} />
          <meshLambertMaterial color="#facc15" />
        </mesh>
      </group>

      {/* Worn Devil Horns */}
      <group ref={hornsRef} position={[0, 0.16, -0.42]} visible={false}>
        <mesh position={[-0.08, 0, 0]} rotation={[0.2, 0, 0.5]}>
          <coneGeometry args={[0.035, 0.16, 8]} />
          <meshLambertMaterial color="#dc2626" />
        </mesh>
        <mesh position={[0.08, 0, 0]} rotation={[0.2, 0, -0.5]}>
          <coneGeometry args={[0.035, 0.16, 8]} />
          <meshLambertMaterial color="#dc2626" />
        </mesh>
      </group>
    </group>
  );
}
