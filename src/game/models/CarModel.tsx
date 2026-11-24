import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState, type RefObject } from "react";
import {
  ExtrudeGeometry,
  LatheGeometry,
  Shape,
  Vector2,
  type CanvasTexture,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  type MeshStandardMaterial,
} from "three";
import { sim } from "@/game/sim";
import { createMudTexture, createPlateTexture, createTireTreadTexture } from "@/game/textures";

type CarStyle = "sedan" | "ev" | "devil";

function buildLowerBodyGeo(style: CarStyle) {
  const s = new Shape();
  s.moveTo(-1.14, 0.28);
  s.lineTo(-0.99, 0.28);
  s.absarc(-0.74, 0.28, 0.26, Math.PI, 0, true);
  s.lineTo(0.48, 0.26);
  s.absarc(0.74, 0.28, 0.26, Math.PI, 0, true);
  s.lineTo(1.12, 0.28);
  s.quadraticCurveTo(1.23, 0.44, 1.16, 0.64);
  if (style === "ev") {
    s.quadraticCurveTo(0.84, 0.76, 0.44, 0.8);
  } else if (style === "devil") {
    s.lineTo(0.42, 0.79);
  } else {
    s.quadraticCurveTo(0.82, 0.74, 0.44, 0.78);
  }
  s.lineTo(-0.88, 0.78);
  s.quadraticCurveTo(-1.08, 0.77, -1.14, 0.68);
  s.closePath();

  const geo = new ExtrudeGeometry(s, {
    depth: 1.04,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.045,
    bevelSegments: 4,
    curveSegments: 14,
  });
  geo.translate(0, 0, -0.52);
  geo.rotateY(-Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

function buildRoofGeo(style: CarStyle) {
  const s = new Shape();
  const frontX = style === "ev" ? 0.14 : 0.16;
  const backX = style === "ev" ? -0.72 : -0.58;
  s.moveTo(backX, 1.38);
  s.lineTo(frontX, 1.38);
  s.quadraticCurveTo((frontX + backX) / 2, 1.46, backX, 1.38);
  s.closePath();

  const geo = new ExtrudeGeometry(s, {
    depth: 0.88,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.03,
    bevelSegments: 3,
    curveSegments: 12,
  });
  geo.translate(0, 0, -0.44);
  geo.rotateY(-Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

function buildTireGeo() {
  // Automotive cross-section: flat tread, chamfered shoulder, recessed inner sidewall
  const pts = [
    new Vector2(0.145, -0.078),
    new Vector2(0.225, -0.082),
    new Vector2(0.245, -0.064),
    new Vector2(0.245, 0.064),
    new Vector2(0.225, 0.082),
    new Vector2(0.145, 0.078),
    new Vector2(0.145, -0.078),
  ];
  const geo = new LatheGeometry(pts, 28);
  geo.rotateZ(Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

export function LiveCar() {
  const ref = useRef<Group>(null);
  const w1 = useRef<Group>(null);
  const w2 = useRef<Group>(null);
  const w3 = useRef<Group>(null);
  const w4 = useRef<Group>(null);
  const blower = useRef<Group>(null);

  const plateTex = useMemo(() => createPlateTexture(), []);
  const mudTex = useMemo(() => createMudTexture(), []);
  const treadTex = useMemo(() => createTireTreadTexture(), []);
  const tireGeo = useMemo(() => buildTireGeo(), []);
  const sedanLower = useMemo(() => buildLowerBodyGeo("sedan"), []);
  const evLower = useMemo(() => buildLowerBodyGeo("ev"), []);
  const devilLower = useMemo(() => buildLowerBodyGeo("devil"), []);
  const sedanRoof = useMemo(() => buildRoofGeo("sedan"), []);
  const evRoof = useMemo(() => buildRoofGeo("ev"), []);

  const [look, setLook] = useState({
    id: -1,
    color: "#e09f3e",
    shirt: "#fff",
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
    const idleVib = c.phase === "wait" && !c.asleep && c.job !== "charge" ? Math.sin(sim.clock * 42) * 0.0025 : 0;
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
      const spin = dt * 11;
      for (const w of [w1.current, w2.current, w3.current, w4.current]) {
        if (w) w.rotation.x += spin;
      }
    }
    if (blower.current) blower.current.rotation.z = sim.clock * 6;

    const mud = g.getObjectByName("mud");
    if (mud) {
      const vis = c.dirty > 0.2 && c.wash < 0.96;
      mud.visible = vis;
      if (vis) {
        const op = Math.max(0.08, 1 - c.wash);
        mud.traverse((child) => {
          const mat = (child as Mesh).material as MeshStandardMaterial | MeshBasicMaterial | undefined;
          if (mat && "opacity" in mat) mat.opacity = op;
        });
      }
    }

    const hat = g.getObjectByName("hat");
    if (hat) hat.visible = Boolean(c.hat);
    const hair = g.getObjectByName("hair");
    if (hair) hair.visible = !c.hat && !c.devil;
    const horns = g.getObjectByName("horns");
    if (horns) horns.visible = c.horns;
    const flames = g.getObjectByName("flames");
    if (flames) flames.visible = c.devil;
    const poop = g.getObjectByName("poop");
    if (poop) poop.visible = c.devil && c.dirty > 0.25 && c.wash < 0.9;
    const cheese = g.getObjectByName("cheese");
    if (cheese) cheese.visible = c.loose;
    const mirror = g.getObjectByName("mirror");
    if (mirror) mirror.visible = c.mirror;
    const outline = g.getObjectByName("outline");
    if (outline) outline.visible = Boolean(sim.up.scanner && c.wanted && !c.caught);

    const head = g.getObjectByName("head");
    if (head) {
      const targetTurn = c.phase === "wait" && !c.asleep && !c.caught ? 1.15 : 0;
      head.rotation.y += (targetTurn - head.rotation.y) * Math.min(1, dt * 6);
      if (c.caught) {
        head.rotation.z = 0.65;
        head.rotation.x = Math.sin(sim.clock * 28) * 0.1;
      } else if (c.asleep) {
        head.rotation.z = 0.25 + Math.sin(sim.clock * 2.5) * 0.04;
        head.rotation.x = 0.24;
      } else {
        head.rotation.z = 0;
        head.rotation.x = Math.sin(sim.clock * 2.2) * 0.02;
      }
    }

    const bar = g.getObjectByName("fuelbar") as Mesh | null;
    if (bar) {
      bar.scale.y = Math.max(0.05, c.fuel);
      bar.visible = (c.job === "fuel" || c.job === "charge") && c.phase === "wait";
      const mat = bar.material;
      if (!Array.isArray(mat)) (mat as MeshBasicMaterial).color.set(c.job === "charge" ? "#38bdf8" : "#eab308");
    }
    const barBg = g.getObjectByName("fuelbar-bg");
    if (barBg) barBg.visible = (c.job === "fuel" || c.job === "charge") && c.phase === "wait";

    const cap = g.getObjectByName("gascap") as Mesh | null;
    if (cap) {
      cap.visible = c.capped || c.job !== "cap";
      const mat = cap.material;
      if (!Array.isArray(mat)) (mat as MeshStandardMaterial).color.set(c.capped ? "#dc2626" : "#94a3b8");
    }
  });

  const wideEyes = look.face === "thief";
  const angryBrows = look.face === "bully" || look.mad || look.devil;
  const bigGrin = look.face === "worst";
  const style: CarStyle = look.devil ? "devil" : look.job === "charge" ? "ev" : "sedan";
  const lowerGeo = style === "devil" ? devilLower : style === "ev" ? evLower : sedanLower;
  const roofGeo = style === "ev" ? evRoof : sedanRoof;
  const headlightEmissive = 0.45 + sim.night * 1.25;

  return (
    <group ref={ref} visible={false}>
      {/* Scanner Outline */}
      <mesh name="outline" position={[0, 0.85, 0]} rotation={[Math.PI / 2, 0, 0]} visible={false}>
        <torusGeometry args={[1.4, 0.035, 8, 32]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* Metallic Clearcoat Car Body */}
      <mesh geometry={lowerGeo} castShadow receiveShadow>
        <meshStandardMaterial color={look.color} roughness={0.22} metalness={0.48} />
      </mesh>

      {/* Black Rubber Side Rub Strips & Door Handles */}
      {[-0.565, 0.565].map((sx) => (
        <group key={sx}>
          <mesh position={[sx, 0.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.014, 0.96, 4, 8]} />
            <meshStandardMaterial color="#1f2937" roughness={0.75} />
          </mesh>
          <mesh position={[sx * 1.01, 0.69, -0.18]} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.015, 0.1, 4, 8]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.85} />
          </mesh>
        </group>
      ))}

      {/* Wheel Fender Flares */}
      {[
        [-0.55, 0.28, 0.74],
        [0.55, 0.28, 0.74],
        [-0.55, 0.28, -0.74],
        [0.55, 0.28, -0.74],
      ].map(([fx, fy, fz], i) => (
        <mesh key={i} position={[fx!, fy!, fz!]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.265, 0.025, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#1f2937" roughness={0.75} />
        </mesh>
      ))}

      {/* Open Hollow Cabin: Curved Roof + Sloped Pillars */}
      <mesh geometry={roofGeo} castShadow>
        <meshStandardMaterial color={look.color} roughness={0.22} metalness={0.48} />
      </mesh>
      {[-0.46, 0.46].map((x) => (
        <mesh key={`a-${x}`} position={[x, 1.09, 0.31]} rotation={[-0.45, 0, 0]} castShadow>
          <capsuleGeometry args={[0.028, 0.62, 6, 8]} />
          <meshStandardMaterial color={look.color} roughness={0.24} metalness={0.45} />
        </mesh>
      ))}
      {[-0.46, 0.46].map((x) => (
        <mesh key={`c-${x}`} position={[x, 1.09, -0.71]} rotation={[0.45, 0, 0]} castShadow>
          <capsuleGeometry args={[0.034, 0.62, 6, 8]} />
          <meshStandardMaterial color={look.color} roughness={0.24} metalness={0.45} />
        </mesh>
      ))}
      {[-0.47, 0.47].map((x) => (
        <mesh key={`b-${x}`} position={[x, 1.09, -0.28]}>
          <capsuleGeometry args={[0.024, 0.56, 6, 8]} />
          <meshStandardMaterial color="#1e293b" roughness={0.45} metalness={0.3} />
        </mesh>
      ))}

      {/* Tinted Sloped Windshields */}
      <mesh position={[0, 1.09, 0.31]} rotation={[-0.45, 0, 0]}>
        <planeGeometry args={[0.88, 0.58]} />
        <meshStandardMaterial color="#1e3a4c" roughness={0.08} metalness={0.55} transparent opacity={0.28} />
      </mesh>
      <mesh position={[0, 1.09, -0.71]} rotation={[0.45, Math.PI, 0]}>
        <planeGeometry args={[0.88, 0.56]} />
        <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.55} transparent opacity={0.58} />
      </mesh>

      {/* Interior Car Seat & Headrest */}
      <group position={[0.22, 0.8, -0.08]}>
        <mesh position={[0, 0.14, -0.14]} rotation={[-0.15, 0, 0]}>
          <capsuleGeometry args={[0.14, 0.22, 6, 10]} />
          <meshStandardMaterial color="#1f2937" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.38, -0.17]}>
          <capsuleGeometry args={[0.072, 0.08, 6, 8]} />
          <meshStandardMaterial color="#1f2937" roughness={0.85} />
        </mesh>
      </group>

      {/* Chrome Bumpers */}
      <mesh position={[0, 0.29, 1.2]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <capsuleGeometry args={[0.06, 1.08, 6, 12]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.16} metalness={0.88} />
      </mesh>
      <mesh position={[0, 0.29, -1.18]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <capsuleGeometry args={[0.06, 1.08, 6, 12]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.16} metalness={0.88} />
      </mesh>

      {/* Front Grille */}
      {style !== "ev" ? (
        <group position={[0, 0.48, 1.19]}>
          <mesh>
            <cylinderGeometry args={[0.22, 0.22, 0.05, 16]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
          </mesh>
          {[-0.05, 0, 0.05].map((yy) => (
            <mesh key={yy} position={[0, yy, 0.02]} rotation={[0, 0, Math.PI / 2]}>
              <capsuleGeometry args={[0.011, 0.44, 4, 8]} />
              <meshStandardMaterial color="#f1f5f9" roughness={0.15} metalness={0.9} />
            </mesh>
          ))}
        </group>
      ) : (
        <mesh position={[0, 0.52, 1.18]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.032, 0.62, 6, 10]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.75} />
        </mesh>
      )}

      {/* Round Headlights with Chrome Bezels */}
      {[-0.4, 0.4].map((x) => (
        <group key={x} position={[x, 0.52, 1.17]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.095, 0.02, 8, 18]} />
            <meshStandardMaterial color="#f1f5f9" roughness={0.15} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.01, 0]}>
            <cylinderGeometry args={[0.088, 0.088, 0.03, 16]} />
            <meshStandardMaterial color="#fef3c7" emissive="#fde047" emissiveIntensity={headlightEmissive} roughness={0.12} />
          </mesh>
        </group>
      ))}

      {/* Taillights, License Plate & Dual Exhaust */}
      {[-0.41, 0.41].map((x) => (
        <mesh key={x} position={[x, 0.52, -1.16]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.052, 0.14, 6, 10]} />
          <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.65} roughness={0.2} />
        </mesh>
      ))}
      <mesh position={[0, 0.47, -1.17]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.38, 0.16]} />
        <meshBasicMaterial map={plateTex} />
      </mesh>
      {[-0.36, -0.26].map((ex) => (
        <mesh key={ex} position={[ex, 0.22, -1.22]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.032, 0.036, 0.18, 12]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.22} metalness={0.85} />
        </mesh>
      ))}

      {/* Steering Wheel */}
      <group position={[0.22, 0.88, 0.28]} rotation={[0.45, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.12, 0.016, 8, 18]} />
          <meshStandardMaterial color="#18181b" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.026, 0.14, 8]} />
          <meshStandardMaterial color="#334155" roughness={0.5} />
        </mesh>
      </group>

      {/* Devil Supercharger */}
      <group name="flames" visible={false}>
        <group position={[0, 0.84, 0.72]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.11, 0.13, 0.18, 12]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.88} />
          </mesh>
          <group ref={blower} position={[0, 0.09, 0.08]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.07, 0.07, 0.06, 10]} />
              <meshStandardMaterial color="#dc2626" roughness={0.3} />
            </mesh>
          </group>
        </group>
      </group>

      <group name="poop" position={[0.08, 0.8, 0.78]} visible={false}>
        <mesh>
          <torusGeometry args={[0.08, 0.035, 8, 14]} />
          <meshStandardMaterial color="#6b3e26" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <torusGeometry args={[0.05, 0.03, 8, 12]} />
          <meshStandardMaterial color="#7c4a2d" roughness={0.95} />
        </mesh>
      </group>

      {/* Mud Splatter Decals */}
      <group name="mud">
        <mesh position={[0.58, 0.56, 0.05]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.25, 0.52]} />
          <meshStandardMaterial map={mudTex} transparent depthWrite={false} roughness={0.95} />
        </mesh>
        <mesh position={[-0.58, 0.56, 0.05]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[1.25, 0.52]} />
          <meshStandardMaterial map={mudTex} transparent depthWrite={false} roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.81, 0.74]} rotation={[-Math.PI / 2 + 0.05, 0, 0]}>
          <planeGeometry args={[0.72, 0.52]} />
          <meshStandardMaterial map={mudTex} transparent depthWrite={false} roughness={0.95} />
        </mesh>
      </group>

      {/* 4 Realistic Automotive Wheels */}
      <Wheel refObj={w1} at={[-0.54, 0.25, 0.74]} tireGeo={tireGeo} treadTex={treadTex} />
      <Wheel refObj={w2} at={[0.54, 0.25, 0.74]} tireGeo={tireGeo} treadTex={treadTex} flip />
      <Wheel refObj={w3} at={[-0.54, 0.25, -0.74]} tireGeo={tireGeo} treadTex={treadTex} />
      <Wheel refObj={w4} at={[0.54, 0.25, -0.74]} tireGeo={tireGeo} treadTex={treadTex} flip />

      {/* Realistic Driver Side Mirror (Removable!) */}
      <group name="mirror" position={[0.55, 0.84, 0.42]}>
        {/* Door Mount Bracket */}
        <mesh position={[0.02, -0.01, 0.03]} rotation={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.016, 0.024, 0.08, 8]} />
          <meshStandardMaterial color="#18181b" roughness={0.6} />
        </mesh>
        {/* Sculpted Aerodynamic Mirror Housing */}
        <mesh position={[0.095, 0.02, 0]} scale={[1.2, 0.78, 0.75]}>
          <sphereGeometry args={[0.062, 12, 10]} />
          <meshStandardMaterial color={look.color} roughness={0.22} metalness={0.48} />
        </mesh>
        {/* Black Mirror Bezel + Reflective Chrome Glass */}
        <mesh position={[0.095, 0.02, -0.044]} scale={[1.25, 0.82, 1]}>
          <circleGeometry args={[0.048, 14]} />
          <meshStandardMaterial color="#18181b" roughness={0.5} />
        </mesh>
        <mesh position={[0.095, 0.02, -0.047]} scale={[1.15, 0.74, 1]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.044, 14]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.05} metalness={0.95} />
        </mesh>
      </group>
      {/* Passenger Side Mirror */}
      <group position={[-0.55, 0.84, 0.42]}>
        <mesh position={[-0.02, -0.01, 0.03]} rotation={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.016, 0.024, 0.08, 8]} />
          <meshStandardMaterial color="#18181b" roughness={0.6} />
        </mesh>
        <mesh position={[-0.095, 0.02, 0]} scale={[1.2, 0.78, 0.75]}>
          <sphereGeometry args={[0.062, 12, 10]} />
          <meshStandardMaterial color={look.color} roughness={0.22} metalness={0.48} />
        </mesh>
      </group>

      {/* Fuel Port & Cap (Side Quarter Panel, reachable beside car) */}
      <group position={[0.58, 0.64, -0.48]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh>
          <torusGeometry args={[0.075, 0.015, 8, 16]} />
          <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh name="gascap" position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.068, 0.068, 0.04, 16]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.35} metalness={0.4} />
        </mesh>
      </group>

      {/* Loose Cheese */}
      <group name="cheese" position={[-0.18, 0.86, -0.32]} visible={false}>
        <mesh rotation={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.07, 3]} />
          <meshStandardMaterial color="#facc15" roughness={0.65} />
        </mesh>
      </group>

      {/* Horizontal Fuel Gauge above Rear Fender */}
      <mesh name="fuelbar-bg" position={[0.58, 0.62, -0.78]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.024, 0.44, 6, 8]} />
        <meshBasicMaterial color="#18181b" />
      </mesh>
      <mesh name="fuelbar" position={[0.59, 0.62, -0.78]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.018, 0.4, 6, 8]} />
        <meshBasicMaterial color="#eab308" />
      </mesh>

      {/* Adult-Proportioned Expressive Driver */}
      <group name="head" position={[0.22, 0.94, 0.02]}>
        {/* Collared Torso / Jacket */}
        <mesh position={[0, -0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.125, 0.16, 8, 12]} />
          <meshStandardMaterial color={look.shirt} roughness={0.82} />
        </mesh>
        {/* Neck */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.048, 0.062, 0.1, 10]} />
          <meshStandardMaterial color={look.skin} roughness={0.72} />
        </mesh>
        {/* Oval Adult Head */}
        <mesh position={[0, 0.21, 0]} scale={[0.84, 1.04, 0.92]}>
          <sphereGeometry args={[0.145, 16, 14]} />
          <meshStandardMaterial color={look.skin} roughness={0.7} />
        </mesh>
        {/* Ears */}
        <mesh position={[-0.125, 0.21, 0]} scale={[0.45, 0.95, 0.7]}>
          <sphereGeometry args={[0.038, 8, 8]} />
          <meshStandardMaterial color={look.skin} roughness={0.7} />
        </mesh>
        <mesh position={[0.125, 0.21, 0]} scale={[0.45, 0.95, 0.7]}>
          <sphereGeometry args={[0.038, 8, 8]} />
          <meshStandardMaterial color={look.skin} roughness={0.7} />
        </mesh>
        {/* Hair (when no hat) */}
        <group name="hair" position={[0, 0.27, -0.01]}>
          <mesh scale={[0.88, 0.72, 0.96]}>
            <sphereGeometry args={[0.146, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.56]} />
            <meshStandardMaterial color="#27272a" roughness={0.9} />
          </mesh>
        </group>
        {/* Realistic Nose Bridge */}
        <mesh position={[0, 0.2, 0.132]} rotation={[-0.2, 0, 0]}>
          <capsuleGeometry args={[0.015, 0.03, 4, 6]} />
          <meshStandardMaterial color={look.skin} roughness={0.68} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.048, 0.23, 0.114]} scale={wideEyes ? 1.35 : [1.05, 0.85, 0.6]}>
          <sphereGeometry args={[0.021, 10, 10]} />
          <meshBasicMaterial color="#fff" />
        </mesh>
        <mesh position={[0.048, 0.23, 0.114]} scale={wideEyes ? 1.35 : [1.05, 0.85, 0.6]}>
          <sphereGeometry args={[0.021, 10, 10]} />
          <meshBasicMaterial color="#fff" />
        </mesh>
        <mesh position={[-0.048, 0.23, 0.126]}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshBasicMaterial color="#111" />
        </mesh>
        <mesh position={[0.048, 0.23, 0.126]}>
          <sphereGeometry args={[0.01, 8, 8]} />
          <meshBasicMaterial color="#111" />
        </mesh>
        {/* Eyebrows */}
        <mesh position={[-0.048, 0.262, 0.122]} rotation={[0, 0, Math.PI / 2 + (angryBrows ? -0.32 : 0)]}>
          <capsuleGeometry args={[0.008, 0.038, 4, 6]} />
          <meshBasicMaterial color="#1e1b18" />
        </mesh>
        <mesh position={[0.048, 0.262, 0.122]} rotation={[0, 0, Math.PI / 2 + (angryBrows ? 0.32 : 0)]}>
          <capsuleGeometry args={[0.008, 0.038, 4, 6]} />
          <meshBasicMaterial color="#1e1b18" />
        </mesh>
        {/* Toothy Grin */}
        {bigGrin ? (
          <mesh position={[0, 0.145, 0.122]} rotation={[0.1, 0, 0]}>
            <capsuleGeometry args={[0.016, 0.065, 4, 8]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ) : null}
        {/* Curved Baseball Cap */}
        <group name="hat" position={[0, 0.3, 0]} visible={Boolean(look.hat)}>
          <mesh scale={[0.92, 0.65, 0.96]}>
            <sphereGeometry args={[0.148, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <meshStandardMaterial color={look.hat ?? "#2d9d5c"} roughness={0.78} />
          </mesh>
          <mesh position={[0, 0.005, 0.11]} rotation={[0.12, 0, 0]} scale={[1.1, 0.2, 0.9]}>
            <cylinderGeometry args={[0.12, 0.13, 0.045, 14, 1, false, -Math.PI * 0.45, Math.PI * 0.9]} />
            <meshStandardMaterial color={look.hat ?? "#2d9d5c"} roughness={0.78} />
          </mesh>
        </group>
        {/* Devil Horns */}
        <group name="horns" visible={look.devil}>
          <mesh position={[-0.065, 0.35, 0]} rotation={[0, 0, 0.42]}>
            <coneGeometry args={[0.03, 0.17, 10]} />
            <meshStandardMaterial color="#dc2626" roughness={0.35} />
          </mesh>
          <mesh position={[0.065, 0.35, 0]} rotation={[0, 0, -0.42]}>
            <coneGeometry args={[0.03, 0.17, 10]} />
            <meshStandardMaterial color="#dc2626" roughness={0.35} />
          </mesh>
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
  treadTex,
}: {
  at: [number, number, number];
  refObj: RefObject<Group | null>;
  flip?: boolean;
  tireGeo: LatheGeometry;
  treadTex: CanvasTexture;
}) {
  const dir = flip ? 1 : -1;
  return (
    <group ref={refObj} position={at}>
      {/* Realistic Lathe Rubber Tire with Tread Texture */}
      <mesh geometry={tireGeo} castShadow>
        <meshStandardMaterial map={treadTex} bumpMap={treadTex} bumpScale={0.015} roughness={0.85} metalness={0.05} />
      </mesh>
      {/* Ventilated Brake Rotor + Red Caliper */}
      <mesh position={[dir * 0.02, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.125, 0.125, 0.02, 18]} />
        <meshStandardMaterial color="#64748b" roughness={0.35} metalness={0.8} />
      </mesh>
      <mesh position={[dir * 0.025, 0.075, 0.05]}>
        <cylinderGeometry args={[0.035, 0.035, 0.04, 8]} />
        <meshStandardMaterial color="#dc2626" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Outer Alloy Rim Barrel */}
      <mesh position={[dir * 0.04, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.142, 0.018, 8, 22]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.18} metalness={0.88} />
      </mesh>
      {/* 5 Machined Alloy Spokes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[dir * 0.05, 0, 0]} rotation={[(i * Math.PI * 2) / 5, 0, 0]}>
          <capsuleGeometry args={[0.016, 0.23, 4, 8]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.2} metalness={0.85} />
        </mesh>
      ))}
      {/* Center Hub & Lug Nuts */}
      <mesh position={[dir * 0.058, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 0.028, 14]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}
