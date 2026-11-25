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
import { createAoShadowTexture, createMudTexture, createPlateTexture, createTireTreadTexture } from "@/game/textures";

type CarStyle = "sedan" | "ev" | "devil";

function buildLowerBodyGeo(style: CarStyle) {
  const s = new Shape();
  // True automotive 3.72m profile (X: rear -1.84 -> front +1.86, Y: rocker 0.24 -> beltline 0.84)
  s.moveTo(-1.82, 0.3);
  s.lineTo(-1.44, 0.28);
  // Rear wheel arch (center -1.10, radius 0.33)
  s.absarc(-1.1, 0.3, 0.33, Math.PI, 0, true);
  // Side rocker sill
  s.lineTo(0.81, 0.25);
  // Front wheel arch (center +1.14, radius 0.33)
  s.absarc(1.14, 0.3, 0.33, Math.PI, 0, true);
  // Front chin & bumper
  s.lineTo(1.78, 0.27);
  s.quadraticCurveTo(1.9, 0.42, 1.84, 0.64);

  if (style === "ev") {
    // Sleek aero nose & rising beltline
    s.quadraticCurveTo(1.42, 0.78, 0.76, 0.85);
    s.lineTo(-1.25, 0.88);
    s.quadraticCurveTo(-1.68, 0.88, -1.82, 0.72);
  } else if (style === "devil") {
    // Long muscular hood & kick-up rear haunch
    s.lineTo(0.72, 0.84);
    s.lineTo(-0.85, 0.83);
    s.quadraticCurveTo(-1.25, 0.9, -1.84, 0.82);
  } else {
    // Classic 4-door sedan proportion
    s.quadraticCurveTo(1.38, 0.76, 0.75, 0.82);
    s.lineTo(-1.22, 0.84);
    s.quadraticCurveTo(-1.65, 0.82, -1.82, 0.68);
  }
  s.closePath();

  const geo = new ExtrudeGeometry(s, {
    depth: 1.48,
    bevelEnabled: true,
    bevelThickness: 0.065,
    bevelSize: 0.048,
    bevelSegments: 4,
    curveSegments: 16,
  });
  geo.translate(0, 0, -0.74);
  geo.rotateY(-Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

function buildRoofGeo(style: CarStyle) {
  const s = new Shape();
  const frontX = style === "ev" ? 0.34 : 0.31;
  const backX = style === "ev" ? -1.14 : -0.98;
  s.moveTo(backX, 1.38);
  s.lineTo(frontX, 1.38);
  s.quadraticCurveTo((frontX + backX) / 2, 1.46, backX, 1.38);
  s.closePath();

  const geo = new ExtrudeGeometry(s, {
    depth: 1.28,
    bevelEnabled: true,
    bevelThickness: 0.042,
    bevelSize: 0.032,
    bevelSegments: 3,
    curveSegments: 14,
  });
  geo.translate(0, 0, -0.64);
  geo.rotateY(-Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

function buildTireGeo() {
  // Real 0.30m radius automotive tire with rounded shoulder
  const pts = [
    new Vector2(0.185, -0.095),
    new Vector2(0.278, -0.102),
    new Vector2(0.3, -0.078),
    new Vector2(0.3, 0.078),
    new Vector2(0.278, 0.102),
    new Vector2(0.185, 0.095),
    new Vector2(0.185, -0.095),
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

  const aoTex = useMemo(() => createAoShadowTexture(), []);
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
    const idleVib = c.phase === "wait" && !c.asleep && c.job !== "charge" ? Math.sin(sim.clock * 44) * 0.002 : 0;
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
      const targetTurn = c.phase === "wait" && !c.asleep && !c.caught ? 1.18 : 0;
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
  const headlightEmissive = 0.55 + sim.night * 1.4;

  return (
    <group ref={ref} visible={false}>
      {/* Ground Contact Ambient Occlusion Shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.028, 0]}>
        <planeGeometry args={[2.35, 4.45]} />
        <meshBasicMaterial map={aoTex} transparent depthWrite={false} />
      </mesh>

      {/* Scanner Outline */}
      <mesh name="outline" position={[0, 0.85, 0]} rotation={[Math.PI / 2, 0, 0]} visible={false}>
        <torusGeometry args={[2.1, 0.035, 8, 36]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>

      {/* Metallic Clearcoat Car Body */}
      <mesh geometry={lowerGeo} castShadow receiveShadow>
        <meshStandardMaterial color={look.color} roughness={0.18} metalness={0.58} />
      </mesh>

      {/* Dark Wheelhouse Inner Liners (Blocks background light through wheel wells!) */}
      {[
        [-0.58, 0.32, 1.14],
        [0.58, 0.32, 1.14],
        [-0.58, 0.32, -1.1],
        [0.58, 0.32, -1.1],
      ].map(([wx, wy, wz], i) => (
        <mesh key={`well-${i}`} position={[wx!, wy!, wz!]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.325, 0.325, 0.42, 18, 1, false, 0, Math.PI]} />
          <meshStandardMaterial color="#09090b" roughness={0.95} />
        </mesh>
      ))}

      {/* Black Fender Arch Trim */}
      {[
        [-0.785, 0.3, 1.14],
        [0.785, 0.3, 1.14],
        [-0.785, 0.3, -1.1],
        [0.785, 0.3, -1.1],
      ].map(([fx, fy, fz], i) => (
        <mesh key={`trim-${i}`} position={[fx!, fy!, fz!]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.335, 0.022, 8, 20, Math.PI]} />
          <meshStandardMaterial color="#18181b" roughness={0.7} />
        </mesh>
      ))}

      {/* Side Skirts, Door Shut-Lines & Chrome Door Handles */}
      {[-0.805, 0.805].map((sx) => (
        <group key={`side-${sx}`}>
          {/* Lower Side Skirt */}
          <mesh position={[sx * 0.98, 0.27, 0.02]}>
            <boxGeometry args={[0.04, 0.06, 1.56]} />
            <meshStandardMaterial color="#18181b" roughness={0.65} />
          </mesh>
          {/* Side Molding Strip */}
          <mesh position={[sx, 0.5, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.012, 1.48, 4, 8]} />
            <meshStandardMaterial color="#18181b" roughness={0.6} />
          </mesh>
          {/* Front & Rear Chrome Door Handles */}
          <mesh position={[sx * 1.005, 0.74, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.014, 0.11, 4, 8]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.18} metalness={0.88} />
          </mesh>
          <mesh position={[sx * 1.005, 0.75, -0.46]} rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.014, 0.11, 4, 8]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.18} metalness={0.88} />
          </mesh>
        </group>
      ))}

      {/* ============================================================
          COMPLETE ENCLOSED INTERIOR CABIN (Floor, Dash, Seats, Pillars)
         ============================================================ */}
      <group>
        {/* Dark Interior Cabin Tub / Floor */}
        <mesh position={[0, 0.52, -0.18]}>
          <boxGeometry args={[1.38, 0.42, 1.88]} />
          <meshStandardMaterial color="#14161a" roughness={0.9} />
        </mesh>
        {/* Padded Dashboard + Glowing Instrument Cluster (Tucked cleanly inside A-pillars) */}
        <mesh position={[0, 0.76, 0.54]}>
          <boxGeometry args={[1.2, 0.18, 0.32]} />
          <meshStandardMaterial color="#1e2229" roughness={0.75} />
        </mesh>
        <mesh position={[0.34, 0.84, 0.37]} rotation={[-0.25, 0, 0]}>
          <planeGeometry args={[0.24, 0.085]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0, 0.83, 0.37]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[0.18, 0.09]} />
          <meshBasicMaterial color="#34d399" />
        </mesh>

        {/* Driver & Passenger Bucket Seats + Rear Bench */}
        {[-0.34, 0.34].map((sx) => (
          <group key={`seat-${sx}`} position={[sx, 0.68, -0.04]}>
            <mesh position={[0, 0.14, -0.14]} rotation={[-0.18, 0, 0]}>
              <boxGeometry args={[0.42, 0.44, 0.12]} />
              <meshStandardMaterial color="#27272a" roughness={0.85} />
            </mesh>
            <mesh position={[0, 0.42, -0.18]} rotation={[0, 0, Math.PI / 2]}>
              <capsuleGeometry args={[0.065, 0.12, 6, 8]} />
              <meshStandardMaterial color="#27272a" roughness={0.85} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.86, -0.78]} rotation={[-0.15, 0, 0]}>
          <boxGeometry args={[1.28, 0.42, 0.14]} />
          <meshStandardMaterial color="#1f232a" roughness={0.88} />
        </mesh>
      </group>

      {/* Cabin Roof + Flush Automotive A/B/C Pillars & Roof Rails */}
      <mesh geometry={roofGeo} castShadow>
        <meshStandardMaterial color={look.color} roughness={0.18} metalness={0.58} />
      </mesh>
      {/* Side Roof Drip Rails */}
      {[-0.655, 0.655].map((x) => (
        <mesh key={`rail-${x}`} position={[x, 1.375, -0.33]} castShadow>
          <boxGeometry args={[0.052, 0.048, 1.3]} />
          <meshStandardMaterial color={look.color} roughness={0.2} metalness={0.55} />
        </mesh>
      ))}
      {/* Front A-Pillars (Flush from cowl z=0.75,y=0.82 to roof z=0.31,y=1.38) */}
      {[-0.655, 0.655].map((x) => (
        <group key={`a-${x}`} position={[x, 1.095, 0.53]} rotation={[-0.68, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.052, 0.71, 0.064]} />
            <meshStandardMaterial color={look.color} roughness={0.2} metalness={0.55} />
          </mesh>
          <mesh position={[x > 0 ? 0.005 : -0.005, 0, -0.018]}>
            <boxGeometry args={[0.046, 0.69, 0.036]} />
            <meshStandardMaterial color="#18181b" roughness={0.5} />
          </mesh>
        </group>
      ))}
      {/* Middle Gloss-Black B-Pillars */}
      {[-0.68, 0.68].map((x) => (
        <mesh key={`b-${x}`} position={[x, 1.1, -0.22]}>
          <boxGeometry args={[0.045, 0.56, 0.095]} />
          <meshStandardMaterial color="#141619" roughness={0.25} metalness={0.5} />
        </mesh>
      ))}
      {/* Rear C-Pillars (Cleanly tucked under rear roof edge) */}
      {[-0.655, 0.655].map((x) => (
        <group key={`c-${x}`} position={[x, 1.095, -1.16]} rotation={[0.64, 0, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.056, 0.69, 0.088]} />
            <meshStandardMaterial color={look.color} roughness={0.2} metalness={0.55} />
          </mesh>
          <mesh position={[x > 0 ? 0.005 : -0.005, 0, 0.02]}>
            <boxGeometry args={[0.048, 0.67, 0.04]} />
            <meshStandardMaterial color="#18181b" roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Tinted Front & Rear Windshields + Wiper Blades */}
      <mesh position={[0, 1.095, 0.53]} rotation={[-0.68, 0, 0]}>
        <planeGeometry args={[1.28, 0.71]} />
        <meshStandardMaterial color="#1e3a4c" roughness={0.05} metalness={0.72} transparent opacity={0.38} />
      </mesh>
      {/* Windshield Wipers */}
      {[-0.25, 0.25].map((wx) => (
        <mesh key={`wiper-${wx}`} position={[wx, 0.84, 0.74]} rotation={[0, 0.15, Math.PI / 2 - 0.1]}>
          <cylinderGeometry args={[0.008, 0.008, 0.42, 6]} />
          <meshStandardMaterial color="#09090b" roughness={0.6} />
        </mesh>
      ))}
      <mesh position={[0, 1.095, -1.16]} rotation={[-0.64, Math.PI, 0]}>
        <planeGeometry args={[1.26, 0.7]} />
        <meshStandardMaterial color="#0f172a" roughness={0.06} metalness={0.72} transparent opacity={0.68} />
      </mesh>
      {/* Rear Side Passenger Door Tinted Glass */}
      {[-0.685, 0.685].map((sx) => (
        <mesh key={`rglass-${sx}`} position={[sx, 1.1, -0.64]} rotation={[0, sx > 0 ? Math.PI / 2 : -Math.PI / 2, 0]}>
          <planeGeometry args={[0.74, 0.5]} />
          <meshStandardMaterial color="#0f172a" roughness={0.06} metalness={0.68} transparent opacity={0.72} />
        </mesh>
      ))}
      {/* Passenger Front Window Tinted Glass */}
      <mesh position={[-0.685, 1.1, 0.14]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.72, 0.5]} />
        <meshStandardMaterial color="#1e3a4c" roughness={0.06} metalness={0.68} transparent opacity={0.52} />
      </mesh>

      {/* Front Bumper Air Dam, Mesh Grille & Projector Headlights */}
      <mesh position={[0, 0.27, 1.88]} castShadow>
        <boxGeometry args={[1.56, 0.12, 0.09]} />
        <meshStandardMaterial color="#18181b" roughness={0.55} />
      </mesh>
      {style !== "ev" ? (
        <group position={[0, 0.48, 1.86]}>
          <mesh>
            <boxGeometry args={[0.82, 0.2, 0.04]} />
            <meshStandardMaterial color="#09090b" roughness={0.7} />
          </mesh>
          {[-0.06, 0, 0.06].map((yy) => (
            <mesh key={yy} position={[0, yy, 0.022]}>
              <boxGeometry args={[0.78, 0.016, 0.02]} />
              <meshStandardMaterial color="#cbd5e1" roughness={0.18} metalness={0.9} />
            </mesh>
          ))}
        </group>
      ) : (
        <mesh position={[0, 0.54, 1.86]}>
          <boxGeometry args={[1.38, 0.045, 0.04]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.95} />
        </mesh>
      )}
      {/* Front License Plate */}
      <mesh position={[0, 0.34, 1.91]}>
        <planeGeometry args={[0.38, 0.15]} />
        <meshBasicMaterial map={plateTex} />
      </mesh>

      {/* Projector Headlights + Amber Corner Indicators */}
      {[-0.56, 0.56].map((x) => (
        <group key={`hl-${x}`} position={[x, 0.54, 1.84]}>
          <mesh>
            <boxGeometry args={[0.28, 0.13, 0.06]} />
            <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.032]}>
            <planeGeometry args={[0.22, 0.1]} />
            <meshStandardMaterial color="#fef3c7" emissive="#fde047" emissiveIntensity={headlightEmissive} roughness={0.1} />
          </mesh>
          <mesh position={[x > 0 ? 0.12 : -0.12, 0, 0.033]}>
            <planeGeometry args={[0.05, 0.1]} />
            <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.6} />
          </mesh>
        </group>
      ))}

      {/* Rear Bumper, Diffuser, Wrap-Around LED Taillights, Plate & Chrome Exhausts */}
      <mesh position={[0, 0.28, -1.85]} castShadow>
        <boxGeometry args={[1.56, 0.14, 0.1]} />
        <meshStandardMaterial color="#18181b" roughness={0.6} />
      </mesh>
      {[-0.54, 0.54].map((x) => (
        <mesh key={`tl-${x}`} position={[x, 0.58, -1.84]}>
          <boxGeometry args={[0.34, 0.12, 0.05]} />
          <meshStandardMaterial color="#dc2626" emissive="#ef4444" emissiveIntensity={0.85} roughness={0.18} />
        </mesh>
      ))}
      <mesh position={[0, 0.54, -1.85]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.38, 0.16]} />
        <meshBasicMaterial map={plateTex} />
      </mesh>
      {style !== "ev"
        ? [-0.52, 0.52].map((ex) => (
            <mesh key={`ex-${ex}`} position={[ex, 0.22, -1.9]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.036, 0.04, 0.18, 14]} />
              <meshStandardMaterial color="#e2e8f0" roughness={0.18} metalness={0.9} />
            </mesh>
          ))
        : null}

      {/* Steering Wheel & Column */}
      <group position={[0.34, 0.8, 0.3]} rotation={[0.42, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.135, 0.017, 8, 20]} />
          <meshStandardMaterial color="#18181b" roughness={0.45} />
        </mesh>
        <mesh>
          <boxGeometry args={[0.24, 0.026, 0.02]} />
          <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, -0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.024, 0.03, 0.18, 10]} />
          <meshStandardMaterial color="#27272a" roughness={0.5} />
        </mesh>
      </group>

      {/* Devil Muscle Supercharger */}
      <group name="flames" visible={false}>
        <group position={[0, 0.88, 1.05]}>
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
      </group>

      <group name="poop" position={[0.12, 0.84, 1.15]} visible={false}>
        <mesh>
          <torusGeometry args={[0.08, 0.035, 8, 14]} />
          <meshStandardMaterial color="#5c361e" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <torusGeometry args={[0.05, 0.03, 8, 12]} />
          <meshStandardMaterial color="#6b3e26" roughness={0.95} />
        </mesh>
      </group>

      {/* Mud Splatter Decals */}
      <group name="mud">
        <mesh position={[0.81, 0.54, 0.0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[2.1, 0.56]} />
          <meshStandardMaterial map={mudTex} transparent depthWrite={false} roughness={0.95} />
        </mesh>
        <mesh position={[-0.81, 0.54, 0.0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[2.1, 0.56]} />
          <meshStandardMaterial map={mudTex} transparent depthWrite={false} roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.85, 1.18]} rotation={[-Math.PI / 2 + 0.06, 0, 0]}>
          <planeGeometry args={[1.1, 0.72]} />
          <meshStandardMaterial map={mudTex} transparent depthWrite={false} roughness={0.95} />
        </mesh>
      </group>

      {/* 4 True-Scale 17" Automotive Wheels */}
      <Wheel refObj={w1} at={[-0.76, 0.3, 1.14]} tireGeo={tireGeo} treadTex={treadTex} />
      <Wheel refObj={w2} at={[0.76, 0.3, 1.14]} tireGeo={tireGeo} treadTex={treadTex} flip />
      <Wheel refObj={w3} at={[-0.76, 0.3, -1.1]} tireGeo={tireGeo} treadTex={treadTex} />
      <Wheel refObj={w4} at={[0.76, 0.3, -1.1]} tireGeo={tireGeo} treadTex={treadTex} flip />

      {/* Realistic Aerodynamic Side Mirror (Removable!) */}
      <group name="mirror" position={[0.75, 0.86, 0.56]}>
        <mesh position={[0.03, -0.01, 0.02]} rotation={[0, 0, -0.45]}>
          <boxGeometry args={[0.08, 0.035, 0.06]} />
          <meshStandardMaterial color="#18181b" roughness={0.6} />
        </mesh>
        <mesh position={[0.11, 0.015, 0]} scale={[1.25, 0.78, 0.72]}>
          <sphereGeometry args={[0.068, 14, 10]} />
          <meshStandardMaterial color={look.color} roughness={0.2} metalness={0.55} />
        </mesh>
        <mesh position={[0.11, 0.015, -0.048]} scale={[1.18, 0.74, 1]} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.052, 16]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.04} metalness={0.96} />
        </mesh>
      </group>
      {/* Passenger Side Mirror */}
      <group position={[-0.75, 0.86, 0.56]}>
        <mesh position={[-0.03, -0.01, 0.02]} rotation={[0, 0, 0.45]}>
          <boxGeometry args={[0.08, 0.035, 0.06]} />
          <meshStandardMaterial color="#18181b" roughness={0.6} />
        </mesh>
        <mesh position={[-0.11, 0.015, 0]} scale={[1.25, 0.78, 0.72]}>
          <sphereGeometry args={[0.068, 14, 10]} />
          <meshStandardMaterial color={look.color} roughness={0.2} metalness={0.55} />
        </mesh>
      </group>

      {/* Recessed Rear-Quarter Fuel Port & Cap (Reachable right beside car!) */}
      <group position={[0.798, 0.7, -0.92]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <torusGeometry args={[0.075, 0.014, 8, 18]} />
          <meshStandardMaterial color="#18181b" roughness={0.5} metalness={0.5} />
        </mesh>
        <mesh name="gascap" position={[0, 0, 0.016]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.068, 0.068, 0.032, 16]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>

      {/* Loose Contraband Cheese on Passenger Seat */}
      <group name="cheese" position={[-0.32, 0.76, 0.08]} visible={false}>
        <mesh rotation={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.075, 3]} />
          <meshStandardMaterial color="#eab308" roughness={0.65} />
        </mesh>
      </group>

      {/* Sleek Side Fuel Progress Bar */}
      <mesh name="fuelbar-bg" position={[0.8, 0.7, -1.42]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.022, 0.42, 6, 8]} />
        <meshBasicMaterial color="#09090b" />
      </mesh>
      <mesh name="fuelbar" position={[0.81, 0.7, -1.42]} rotation={[Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.016, 0.38, 6, 8]} />
        <meshBasicMaterial color="#eab308" />
      </mesh>

      {/* ============================================================
          DETAILED JOINTED DRIVER (Proper Seated Headroom + Arms on Wheel)
         ============================================================ */}
      <group position={[0.34, 0.73, -0.02]}>
        {/* Jacket Torso & Collar */}
        <mesh position={[0, 0.02, -0.02]} scale={[1.15, 1.0, 0.78]}>
          <capsuleGeometry args={[0.145, 0.18, 8, 12]} />
          <meshStandardMaterial color={look.shirt} roughness={0.82} />
        </mesh>
        {/* Inner T-Shirt V-Neck */}
        <mesh position={[0, 0.12, 0.08]}>
          <boxGeometry args={[0.09, 0.08, 0.04]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.85} />
        </mesh>
        {/* Left & Right Jointed Arms Reaching Steering Wheel */}
        {[-0.15, 0.15].map((ax) => (
          <group key={`arm-${ax}`} position={[ax, 0.08, 0.04]}>
            <mesh position={[ax > 0 ? -0.02 : 0.02, -0.02, 0.15]} rotation={[1.25, ax > 0 ? 0.18 : -0.18, 0]}>
              <capsuleGeometry args={[0.042, 0.24, 6, 8]} />
              <meshStandardMaterial color={look.shirt} roughness={0.82} />
            </mesh>
            <mesh position={[ax > 0 ? -0.04 : 0.04, -0.02, 0.3]}>
              <sphereGeometry args={[0.036, 8, 8]} />
              <meshStandardMaterial color={look.skin} roughness={0.72} />
            </mesh>
          </group>
        ))}

        {/* Articulated Neck & Head */}
        <group name="head" position={[0, 0.16, 0]}>
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.048, 0.058, 0.1, 10]} />
            <meshStandardMaterial color={look.skin} roughness={0.72} />
          </mesh>
          {/* Sculpted Adult Head */}
          <mesh position={[0, 0.19, 0]} scale={[0.84, 1.04, 0.92]}>
            <sphereGeometry args={[0.142, 16, 14]} />
            <meshStandardMaterial color={look.skin} roughness={0.68} />
          </mesh>
          {/* Ears */}
          <mesh position={[-0.12, 0.19, 0]} scale={[0.42, 0.9, 0.68]}>
            <sphereGeometry args={[0.038, 8, 8]} />
            <meshStandardMaterial color={look.skin} roughness={0.7} />
          </mesh>
          <mesh position={[0.12, 0.19, 0]} scale={[0.42, 0.9, 0.68]}>
            <sphereGeometry args={[0.038, 8, 8]} />
            <meshStandardMaterial color={look.skin} roughness={0.7} />
          </mesh>
          {/* Hair with Sideburns */}
          <group name="hair" position={[0, 0.24, -0.01]}>
            <mesh scale={[0.88, 0.74, 0.96]}>
              <sphereGeometry args={[0.145, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
              <meshStandardMaterial color="#1f1c1a" roughness={0.9} />
            </mesh>
          </group>
          {/* Nose Bridge */}
          <mesh position={[0, 0.18, 0.128]} rotation={[-0.22, 0, 0]}>
            <capsuleGeometry args={[0.015, 0.032, 4, 6]} />
            <meshStandardMaterial color={look.skin} roughness={0.66} />
          </mesh>
          {/* Eyes */}
          <mesh position={[-0.046, 0.21, 0.112]} scale={wideEyes ? 1.35 : [1.05, 0.82, 0.6]}>
            <sphereGeometry args={[0.02, 10, 10]} />
            <meshBasicMaterial color="#f8fafc" />
          </mesh>
          <mesh position={[0.046, 0.21, 0.112]} scale={wideEyes ? 1.35 : [1.05, 0.82, 0.6]}>
            <sphereGeometry args={[0.02, 10, 10]} />
            <meshBasicMaterial color="#f8fafc" />
          </mesh>
          <mesh position={[-0.046, 0.21, 0.124]}>
            <sphereGeometry args={[0.0095, 8, 8]} />
            <meshBasicMaterial color="#09090b" />
          </mesh>
          <mesh position={[0.046, 0.21, 0.124]}>
            <sphereGeometry args={[0.0095, 8, 8]} />
            <meshBasicMaterial color="#09090b" />
          </mesh>
          {/* Eyebrows */}
          <mesh position={[-0.046, 0.242, 0.12]} rotation={[0, 0, Math.PI / 2 + (angryBrows ? -0.32 : 0)]}>
            <capsuleGeometry args={[0.0075, 0.036, 4, 6]} />
            <meshBasicMaterial color="#1c1917" />
          </mesh>
          <mesh position={[0.046, 0.242, 0.12]} rotation={[0, 0, Math.PI / 2 + (angryBrows ? 0.32 : 0)]}>
            <capsuleGeometry args={[0.0075, 0.036, 4, 6]} />
            <meshBasicMaterial color="#1c1917" />
          </mesh>
          {/* Mouth / Grin */}
          {bigGrin ? (
            <mesh position={[0, 0.13, 0.12]} rotation={[0.1, 0, Math.PI / 2]}>
              <capsuleGeometry args={[0.015, 0.058, 4, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          ) : (
            <mesh position={[0, 0.132, 0.12]} rotation={[0, 0, Math.PI / 2]}>
              <capsuleGeometry args={[0.005, 0.032, 4, 6]} />
              <meshBasicMaterial color="#7c3f28" />
            </mesh>
          )}
          {/* Baseball Cap */}
          <group name="hat" position={[0, 0.28, 0]} visible={Boolean(look.hat)}>
            <mesh scale={[0.9, 0.64, 0.96]}>
              <sphereGeometry args={[0.146, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
              <meshStandardMaterial color={look.hat ?? "#2d9d5c"} roughness={0.78} />
            </mesh>
            <mesh position={[0, 0.005, 0.11]} rotation={[0.12, 0, 0]} scale={[1.1, 0.2, 0.9]}>
              <cylinderGeometry args={[0.12, 0.13, 0.045, 14, 1, false, -Math.PI * 0.45, Math.PI * 0.9]} />
              <meshStandardMaterial color={look.hat ?? "#2d9d5c"} roughness={0.78} />
            </mesh>
          </group>
          {/* Devil Horns */}
          <group name="horns" visible={look.devil}>
            <mesh position={[-0.065, 0.33, 0]} rotation={[0, 0, 0.42]}>
              <coneGeometry args={[0.028, 0.16, 10]} />
              <meshStandardMaterial color="#dc2626" roughness={0.35} />
            </mesh>
            <mesh position={[0.065, 0.33, 0]} rotation={[0, 0, -0.42]}>
              <coneGeometry args={[0.028, 0.16, 10]} />
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
      <mesh geometry={tireGeo} castShadow>
        <meshStandardMaterial map={treadTex} bumpMap={treadTex} bumpScale={0.018} roughness={0.84} metalness={0.06} />
      </mesh>
      <mesh position={[dir * 0.02, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.155, 0.155, 0.022, 18]} />
        <meshStandardMaterial color="#64748b" roughness={0.32} metalness={0.82} />
      </mesh>
      <mesh position={[dir * 0.028, 0.095, 0.06]}>
        <boxGeometry args={[0.036, 0.075, 0.05]} />
        <meshStandardMaterial color="#dc2626" roughness={0.38} metalness={0.35} />
      </mesh>
      <mesh position={[dir * 0.048, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.178, 0.02, 8, 24]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.16} metalness={0.9} />
      </mesh>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[dir * 0.056, 0, 0]} rotation={[(i * Math.PI * 2) / 5, 0, 0]}>
          <boxGeometry args={[0.018, 0.32, 0.032]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.18} metalness={0.88} />
        </mesh>
      ))}
      <mesh position={[dir * 0.065, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.052, 0.052, 0.03, 14]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.18} metalness={0.92} />
      </mesh>
    </group>
  );
}
