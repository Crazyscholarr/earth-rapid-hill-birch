import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { type Group, type Mesh, type MeshStandardMaterial } from "three";
import { GRADES } from "@/game/content";
import { carPoint, sim } from "@/game/sim";
import { createBillTexture, createBunTexture, createSpongeTexture, drawBubble, drawPoster, paint } from "@/game/textures";

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
    const p = carPoint(c, 0.15, 2.08, 0.1);
    mesh.position.set(p.x, p.y + Math.sin(sim.clock * 3) * 0.03, p.z);
    mesh.lookAt(sim.player.x, 1.5, sim.player.z);
    const key = `${c.id}:${c.job}:${c.asleep}:${c.caught}:${Math.floor(c.fuel * 5)}:${c.wash > 0.95}:${sim.posterUp}:${c.grade}`;
    if (art.key !== key) {
      art.key = key;
      drawBubble(art.ctx, c);
      art.tex.needsUpdate = true;
    }
  });
  return (
    <mesh ref={ref} visible={false}>
      <planeGeometry args={[0.74, 0.74]} />
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
      const s = 0.9 + Math.min(0.7, b.amount / 180);
      m.scale.setScalar(s);
    }
  });
  return (
    <group ref={ref}>
      {Array.from({ length: 6 }, (_, i) => (
        <group key={i} visible={false}>
          <mesh castShadow>
            <boxGeometry args={[0.26, 0.04, 0.13]} />
            <meshStandardMaterial map={billTex} color="#dcfce7" emissive="#16a34a" emissiveIntensity={0.2} roughness={0.55} />
          </mesh>
          {/* Currency Wrapper Band */}
          <mesh>
            <boxGeometry args={[0.055, 0.044, 0.136]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.5} />
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
    <group ref={ref}>
      {Array.from({ length: 16 }, (_, i) => (
        <mesh key={i} visible={false}>
          <dodecahedronGeometry args={[0.055, 0]} />
          <meshStandardMaterial color={i % 2 ? "#22c55e" : "#eab308"} roughness={0.4} />
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
    m.visible = sim.phase === "play" && groundPick;
    m.position.set(sim.aimPos.x, sim.aimPos.y + 0.24 + Math.sin(sim.clock * 6) * 0.035, sim.aimPos.z);
    m.rotation.y = sim.clock * 3;
  });
  return (
    <mesh ref={ref} visible={false}>
      <octahedronGeometry args={[0.045, 0]} />
      <meshStandardMaterial color="#fde047" emissive="#f59e0b" emissiveIntensity={0.8} />
    </mesh>
  );
}

function GripGlove({ side }: { side: "left" | "right" }) {
  const s = side === "left" ? -1 : 1;
  return (
    <group position={[s * 0.03, -0.055, 0.06]} rotation={[0.25, -s * 0.15, 0]}>
      <mesh position={[0, -0.04, 0.14]} rotation={[Math.PI / 2 - 0.15, 0, 0]}>
        <cylinderGeometry args={[0.038, 0.045, 0.18, 12]} />
        <meshStandardMaterial color="#264e52" roughness={0.82} />
      </mesh>
      <mesh position={[0, -0.01, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.032, 0.06, 6, 10]} />
        <meshStandardMaterial color="#e8b393" roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.015, -0.01]} scale={[0.95, 0.65, 1.1]}>
        <sphereGeometry args={[0.044, 10, 10]} />
        <meshStandardMaterial color="#27272a" roughness={0.78} />
      </mesh>
    </group>
  );
}

export function Hands() {
  const ref = useRef<Group>(null);
  const billTex = useMemo(() => createBillTexture(), []);
  const spongeTex = useMemo(() => createSpongeTexture(), []);
  const bunTex = useMemo(() => createBunTexture(), []);
  const poster = useMemo(() => paint((ctx, w, h) => drawPoster(ctx, w, h), 512, 680), []);

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

    const posterMesh = g.getObjectByName("poster");
    if (posterMesh) posterMesh.visible = sim.posterUp;

    const tool = g.getObjectByName("tool");
    if (tool) {
      tool.visible = sim.hold !== "none";
      const jiggle = sim.usePulse > 0 ? Math.sin(sim.clock * 26) * 0.025 * sim.usePulse : 0;
      tool.position.set(0.28 + jiggle, -0.17 + Math.abs(jiggle), -0.58);
    }

    const show = (name: string, on: boolean) => {
      const o = g.getObjectByName(name);
      if (o) o.visible = on;
    };
    show("h-nozzle", sim.hold === "nozzle");
    show("h-sponge", sim.hold === "sponge");
    show("h-burger", sim.hold === "burger");
    show("h-cap", sim.hold === "cap");
    show("h-taser", sim.hold === "taser");
    show("h-cash", sim.hold === "cash");
    show("h-mirror", sim.hold === "mirror");
    show("h-charger", sim.hold === "charger");
    show("h-cheese", sim.hold === "cheese");
    show("h-horns", sim.wornHorns);

    const hat = g.getObjectByName("h-hat") as Group | null;
    if (hat) {
      hat.visible = sim.hold === "hat";
      hat.traverse((c) => {
        const mat = (c as Mesh).material as MeshStandardMaterial | undefined;
        if (mat && "color" in mat) mat.color.set(sim.hatColor);
      });
    }
    const tip = g.getObjectByName("h-nozzle-tip") as Mesh | null;
    if (tip) {
      const mat = tip.material;
      const gc = GRADES.find((x) => x.id === sim.grade)?.color ?? "#22c55e";
      if (!Array.isArray(mat)) (mat as MeshStandardMaterial).color.set(gc);
    }
    g.position.y += Math.sin(sim.clock * 2.2) * 0.005;

    const key = String(sim.warrant);
    if (poster.key !== key) {
      poster.key = key;
      drawPoster(poster.ctx, 512, 680);
      poster.tex.needsUpdate = true;
    }
  });

  return (
    <group ref={ref}>
      {/* Left Hand + Wanted Poster */}
      <group name="poster" position={[-0.2, -0.04, -0.58]} rotation={[0.04, 0.16, 0]} visible={false}>
        <mesh>
          <planeGeometry args={[0.34, 0.46]} />
          <meshBasicMaterial map={poster.tex} toneMapped={false} />
        </mesh>
        <GripGlove side="left" />
      </group>

      {/* Right Hand + Detailed Tool */}
      <group name="tool" position={[0.28, -0.17, -0.58]} visible={false}>
        <GripGlove side="right" />

        {/* Realistic Fuel Nozzle */}
        <group name="h-nozzle">
          <mesh rotation={[0.4, 0, 0.25]} position={[0, -0.02, 0.04]}>
            <capsuleGeometry args={[0.024, 0.12, 6, 10]} />
            <meshStandardMaterial color="#18181b" roughness={0.5} metalness={0.4} />
          </mesh>
          <mesh name="h-nozzle-tip" position={[0.02, 0.045, -0.04]} rotation={[Math.PI / 2 - 0.2, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.04, 0.15, 14]} />
            <meshStandardMaterial color="#22c55e" roughness={0.35} />
          </mesh>
          {/* Steel Spout + Drip Collar */}
          <mesh position={[0.02, 0.045, -0.17]} rotation={[Math.PI / 2 + 0.28, 0, 0]}>
            <cylinderGeometry args={[0.013, 0.016, 0.16, 12]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.88} />
          </mesh>
          <mesh position={[0.02, 0.03, -0.14]} rotation={[0.28, 0, 0]}>
            <torusGeometry args={[0.022, 0.005, 6, 12]} />
            <meshStandardMaterial color="#18181b" roughness={0.7} />
          </mesh>
        </group>

        {/* Porous Wash Sponge */}
        <group name="h-sponge" visible={false} rotation={[0.2, 0.3, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.042, 0.11, 6, 12]} />
            <meshStandardMaterial map={spongeTex} roughness={0.92} />
          </mesh>
          <mesh position={[0, 0.032, 0]} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.038, 0.11, 6, 12]} />
            <meshStandardMaterial color="#15803d" roughness={0.95} />
          </mesh>
        </group>

        {/* Detailed Sesame Burger on Tray */}
        <group name="h-burger" visible={false}>
          <mesh position={[0, -0.045, 0]}>
            <cylinderGeometry args={[0.1, 0.085, 0.015, 16]} />
            <meshStandardMaterial color="#dc2626" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.032, 0]}>
            <sphereGeometry args={[0.085, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <meshStandardMaterial map={bunTex} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.012, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.015, 14]} />
            <meshStandardMaterial color="#65a30d" roughness={0.75} />
          </mesh>
          <mesh position={[0, -0.005, 0]}>
            <cylinderGeometry args={[0.085, 0.085, 0.025, 14]} />
            <meshStandardMaterial color="#78350f" roughness={0.85} />
          </mesh>
          <mesh position={[0, -0.028, 0]}>
            <cylinderGeometry args={[0.08, 0.075, 0.025, 14]} />
            <meshStandardMaterial color="#d97706" roughness={0.7} />
          </mesh>
        </group>

        {/* Threaded Red Gas Cap */}
        <group name="h-cap" visible={false} rotation={[0.35, 0, 0]}>
          <mesh position={[0, -0.025, 0]}>
            <cylinderGeometry args={[0.058, 0.058, 0.035, 14]} />
            <meshStandardMaterial color="#18181b" roughness={0.7} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.078, 0.082, 0.042, 16]} />
            <meshStandardMaterial color="#dc2626" roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.028, 0]} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.014, 0.11, 4, 8]} />
            <meshStandardMaterial color="#ef4444" roughness={0.35} />
          </mesh>
        </group>

        {/* Tactical Stun Gun / Taser */}
        <group name="h-taser" visible={false}>
          <mesh rotation={[0.3, 0, 0]} position={[0, -0.03, 0.03]}>
            <capsuleGeometry args={[0.024, 0.1, 6, 10]} />
            <meshStandardMaterial color="#18181b" roughness={0.65} />
          </mesh>
          <mesh position={[0, 0.025, -0.04]} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.034, 0.14, 6, 10]} />
            <meshStandardMaterial color="#eab308" roughness={0.4} />
          </mesh>
          <mesh position={[-0.018, 0.025, -0.14]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.05, 8]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.9} />
          </mesh>
          <mesh position={[0.018, 0.025, -0.14]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.05, 8]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.9} />
          </mesh>
        </group>

        {/* Rectangular Banded Cash Stack */}
        <group name="h-cash" visible={false} rotation={[0.25, 0.3, 0]}>
          <mesh>
            <boxGeometry args={[0.18, 0.035, 0.095]} />
            <meshStandardMaterial map={billTex} color="#dcfce7" roughness={0.55} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.04, 0.038, 0.1]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.5} />
          </mesh>
        </group>

        {/* Detailed Side Mirror with Glass */}
        <group name="h-mirror" visible={false}>
          <mesh position={[0, -0.04, 0.02]} rotation={[0.2, 0, 0]}>
            <cylinderGeometry args={[0.014, 0.02, 0.08, 8]} />
            <meshStandardMaterial color="#18181b" roughness={0.6} />
          </mesh>
          <mesh scale={[1.15, 0.75, 0.65]}>
            <sphereGeometry args={[0.06, 12, 10]} />
            <meshStandardMaterial color="#94a3b8" roughness={0.25} metalness={0.65} />
          </mesh>
          <mesh position={[0, 0, -0.038]} scale={[1.1, 0.7, 1]} rotation={[0, Math.PI, 0]}>
            <circleGeometry args={[0.045, 14]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.05} metalness={0.95} />
          </mesh>
        </group>

        {/* EV Charger Plug */}
        <group name="h-charger" visible={false}>
          <mesh rotation={[Math.PI / 2 - 0.15, 0, 0]}>
            <capsuleGeometry args={[0.035, 0.15, 6, 12]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.015, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.042, 0.042, 0.06, 12]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.65} />
          </mesh>
        </group>

        {/* Held Driver Cap */}
        <group name="h-hat" visible={false} rotation={[0.25, 0.4, 0]}>
          <mesh scale={[1, 0.65, 1]}>
            <sphereGeometry args={[0.1, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <meshStandardMaterial color="#eab308" roughness={0.75} />
          </mesh>
          <mesh position={[0, 0, 0.08]} scale={[1.1, 0.25, 0.9]}>
            <cylinderGeometry args={[0.08, 0.09, 0.03, 12, 1, false, -Math.PI * 0.45, Math.PI * 0.9]} />
            <meshStandardMaterial color="#eab308" roughness={0.75} />
          </mesh>
        </group>

        {/* Cheese Wedge */}
        <mesh name="h-cheese" visible={false} rotation={[0.25, 0.5, 0]}>
          <cylinderGeometry args={[0.075, 0.075, 0.055, 3]} />
          <meshStandardMaterial color="#facc15" roughness={0.65} />
        </mesh>
      </group>

      {/* Worn Devil Horns */}
      <group name="h-horns" position={[0, 0.16, -0.42]} visible={false}>
        <mesh position={[-0.08, 0, 0]} rotation={[0.2, 0, 0.5]}>
          <coneGeometry args={[0.035, 0.16, 8]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>
        <mesh position={[0.08, 0, 0]} rotation={[0.2, 0, -0.5]}>
          <coneGeometry args={[0.035, 0.16, 8]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}
