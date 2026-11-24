import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import {
  CanvasTexture,
  Color,
  Fog,
  RepeatWrapping,
  SRGBColorSpace,
  type AmbientLight,
  type DirectionalLight,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  type MeshStandardMaterial,
  type PointLight,
} from "three";
import { GRADES, TIPS, WARRANTS } from "@/game/content";
import { carPoint, sim, tick, type Car } from "@/game/sim";

function paint(draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void, w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  draw(ctx, w, h);
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return { canvas, ctx, tex, key: "" };
}

export function Scene() {
  return (
    <>
      <color attach="background" args={["#b8d4e3"]} />
      <Rig />
      <Lights />
      <SkyDecor />
      <Station />
      <LiveCar />
      <Bubble />
      <Bills />
      <Bits />
      <Marker />
      <Hands />
    </>
  );
}

function Rig() {
  const { camera, scene } = useThree();
  const bg = useMemo(() => new Color("#b8d4e3"), []);
  const day = useMemo(() => new Color("#b8d4e3"), []);
  const dusk = useMemo(() => new Color("#e29d76"), []);
  const night = useMemo(() => new Color("#14192d"), []);
  useEffect(() => {
    scene.fog = new Fog("#b8d4e3", 22, 85);
  }, [scene]);
  useFrame((_, dt) => {
    tick(Math.min(0.05, dt));
    const n = sim.night;
    if (n < 0.4) bg.copy(day).lerp(dusk, n / 0.4);
    else bg.copy(dusk).lerp(night, (n - 0.4) / 0.6);
    scene.background = bg;
    const fog = scene.fog;
    if (fog && "color" in fog) {
      fog.color.copy(bg);
      if ("far" in fog) fog.far = 85 - n * 34;
    }
    if (sim.phase === "title") {
      const a = sim.orbit;
      camera.position.set(Math.sin(a) * 7.8 + 0.2, 2.8, Math.cos(a) * 5.8 + 1.5);
      camera.lookAt(-1.4, 1.15, 0.5);
      return;
    }
    const bob = Math.sin(sim.clock * 9) * Math.min(0.035, sim.speed * 0.009);
    camera.position.set(sim.player.x, 1.56 + bob, sim.player.z);
    camera.rotation.order = "YXZ";
    camera.rotation.y = sim.player.yaw;
    camera.rotation.x = sim.player.pitch;
    camera.rotation.z = 0;
  });
  return null;
}

function Lights() {
  const sun = useRef<DirectionalLight>(null);
  const amb = useRef<AmbientLight>(null);
  const lamp = useRef<PointLight>(null);
  const pumpLamp = useRef<PointLight>(null);
  useFrame(() => {
    const n = sim.night;
    if (sun.current) {
      sun.current.intensity = 1.35 * (1 - n * 0.8);
      sun.current.color.set(n > 0.2 ? "#ffcf99" : "#fff5e4");
    }
    if (amb.current) amb.current.intensity = 0.55 - n * 0.3;
    if (lamp.current) lamp.current.intensity = 0.4 + n * 4.2;
    if (pumpLamp.current) pumpLamp.current.intensity = 0.2 + n * 2.5;
  });
  return (
    <>
      <hemisphereLight args={["#dcebf7", "#c49a6c", 0.72]} />
      <ambientLight ref={amb} intensity={0.55} />
      <directionalLight
        ref={sun}
        position={[16, 22, 10]}
        intensity={1.35}
        color="#fff5e4"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={52}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
        shadow-bias={-0.0005}
      />
      <pointLight ref={lamp} position={[0.4, 2.85, 2.4]} distance={15} decay={2} intensity={0.4} color="#ffdfa8" />
      <pointLight ref={pumpLamp} position={[-6.2, 2.6, -3.2]} distance={12} decay={2} intensity={0.2} color="#ffd089" />
    </>
  );
}

function SkyDecor() {
  const clouds = useRef<Group>(null);
  useFrame(() => {
    if (clouds.current) {
      clouds.current.position.x = ((sim.clock * 0.4) % 40) - 20;
    }
  });
  return (
    <group>
      <mesh position={[26, 24, -42]}>
        <sphereGeometry args={[3.2, 16, 16]} />
        <meshBasicMaterial color="#fde6b8" />
      </mesh>
      <group ref={clouds}>
        {[
          [-14, 15, -24, 1.3],
          [4, 17, -28, 1.6],
          [20, 14, -22, 1.1],
        ].map(([x, y, z, s], i) => (
          <group key={i} position={[x!, y!, z!]} scale={s}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[1.4, 10, 8]} />
              <meshBasicMaterial color="#f5efe6" transparent opacity={0.85} />
            </mesh>
            <mesh position={[1.2, -0.2, 0.2]}>
              <sphereGeometry args={[1.05, 10, 8]} />
              <meshBasicMaterial color="#f5efe6" transparent opacity={0.85} />
            </mesh>
            <mesh position={[-1.1, -0.25, -0.1]}>
              <sphereGeometry args={[0.95, 10, 8]} />
              <meshBasicMaterial color="#f5efe6" transparent opacity={0.85} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

function Station() {
  const sandTex = useMemo(() => {
    const p = paint((ctx, w, h) => {
      ctx.fillStyle = "#d5ad78";
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 1800; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = 1 + Math.random() * 2.5;
        ctx.fillStyle = i % 3 === 0 ? "rgba(176,126,72,0.22)" : "rgba(242,216,174,0.2)";
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }, 256, 256);
    p.tex.wrapS = RepeatWrapping;
    p.tex.wrapT = RepeatWrapping;
    p.tex.repeat.set(18, 18);
    return p.tex;
  }, []);

  const concreteTex = useMemo(() => {
    const p = paint((ctx, w, h) => {
      ctx.fillStyle = "#c8c0b4";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = "rgba(95,88,78,0.22)";
      ctx.lineWidth = 3;
      for (let x = 0; x <= w; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }, 256, 256);
    p.tex.wrapS = RepeatWrapping;
    p.tex.wrapT = RepeatWrapping;
    p.tex.repeat.set(4, 3);
    return p.tex;
  }, []);

  const sign = useMemo(
    () =>
      paint((ctx, w, h) => {
        ctx.fillStyle = "#efe4d2";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#2b5c61";
        ctx.fillRect(0, 0, w, 22);
        ctx.fillRect(0, h - 22, w, 22);
        ctx.strokeStyle = "#d95d39";
        ctx.lineWidth = 6;
        ctx.strokeRect(14, 30, w - 28, h - 60);
        ctx.fillStyle = "#d95d39";
        ctx.font = "900 94px Impact, Arial Black, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("WANTED FUEL", w / 2, h * 0.67);
      }, 1024, 280),
    [],
  );

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
    if (blades.current) blades.current.rotation.x += dt * 3.5;
  });

  return (
    <group>
      {/* Desert Sand */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial map={sandTex} roughness={0.95} metalness={0} />
      </mesh>
      {/* Station Concrete Pad */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-1.5, 0.01, 2.8]} receiveShadow>
        <planeGeometry args={[13.5, 6.2]} />
        <meshStandardMaterial map={concreteTex} roughness={0.88} metalness={0.05} />
      </mesh>
      {/* Asphalt Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.55]} receiveShadow>
        <planeGeometry args={[64, 3.6]} />
        <meshStandardMaterial color="#343840" roughness={0.9} metalness={0.05} />
      </mesh>
      {/* Road Edge Lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, -1.15]}>
        <planeGeometry args={[64, 0.1]} />
        <meshBasicMaterial color="#cbd5e1" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 2.25]}>
        <planeGeometry args={[64, 0.1]} />
        <meshBasicMaterial color="#cbd5e1" />
      </mesh>
      {/* Dashed Yellow Center Line */}
      {[-16, -12, -8, -4, 0, 4, 8, 12, 16, 20].map((x) => (
        <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.03, 0.55]}>
          <planeGeometry args={[1.4, 0.12]} />
          <meshBasicMaterial color="#e5b84b" />
        </mesh>
      ))}

      <Building sign={sign.tex} />
      <Canopy />
      <Props root={prop} monitor={monitor.tex} poster={poster.tex} />
      <Shredder blades={blades} />

      {/* Exit Barrier */}
      <group position={[-4.55, 0, -0.15]}>
        <mesh position={[0, 0.55, 0]} castShadow>
          <boxGeometry args={[0.24, 1.1, 0.24]} />
          <meshStandardMaterial color="#3b3d42" roughness={0.5} metalness={0.4} />
        </mesh>
        <mesh position={[0, 1.15, 0]}>
          <sphereGeometry args={[0.09, 10, 10]} />
          <meshStandardMaterial
            color={sim.skull ? "#ef4444" : "#22c55e"}
            emissive={sim.skull ? "#ef4444" : "#22c55e"}
            emissiveIntensity={0.8}
          />
        </mesh>
        <group ref={bar} position={[0, 1.0, 0]}>
          <mesh position={[0, 0, 1.0]} castShadow>
            <boxGeometry args={[0.1, 0.1, 2.05]} />
            <meshStandardMaterial color="#d95d39" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.5]}>
            <boxGeometry args={[0.11, 0.11, 0.35]} />
            <meshStandardMaterial color="#f5efe6" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 1.4]}>
            <boxGeometry args={[0.11, 0.11, 0.35]} />
            <meshStandardMaterial color="#f5efe6" roughness={0.4} />
          </mesh>
        </group>
      </group>

      <Cacti />
      <Mountains />
      <Pumpkins />
    </group>
  );
}

function Building({ sign }: { sign: CanvasTexture }) {
  const winGlow = useRef<MeshStandardMaterial>(null);
  const winGlow2 = useRef<MeshStandardMaterial>(null);
  useFrame(() => {
    const ei = 0.08 + sim.night * 0.65;
    if (winGlow.current) winGlow.current.emissiveIntensity = ei;
    if (winGlow2.current) winGlow2.current.emissiveIntensity = ei;
  });
  return (
    <group>
      {/* Main Stucco Body */}
      <mesh position={[-6.2, 1.7, -5.9]} castShadow receiveShadow>
        <boxGeometry args={[9.6, 3.4, 4.4]} />
        <meshStandardMaterial color="#efe4d2" roughness={0.88} />
      </mesh>
      {/* Terracotta Roof Trim */}
      <mesh position={[-6.2, 3.55, -5.9]} castShadow>
        <boxGeometry args={[10.1, 0.34, 4.9]} />
        <meshStandardMaterial color="#d95d39" roughness={0.65} />
      </mesh>
      {/* Teal Base Wainscoting */}
      <mesh position={[-6.2, 0.35, -3.66]}>
        <boxGeometry args={[9.64, 0.7, 0.08]} />
        <meshStandardMaterial color="#2b5c61" roughness={0.75} />
      </mesh>
      {/* Diner Windows */}
      <mesh position={[-4.2, 1.55, -3.65]}>
        <boxGeometry args={[3.3, 1.85, 0.12]} />
        <meshStandardMaterial ref={winGlow} color="#284b5c" emissive="#f59e0b" emissiveIntensity={0.1} roughness={0.18} metalness={0.25} />
      </mesh>
      <mesh position={[-8.3, 1.55, -3.65]}>
        <boxGeometry args={[2.5, 1.85, 0.12]} />
        <meshStandardMaterial ref={winGlow2} color="#284b5c" emissive="#f59e0b" emissiveIntensity={0.1} roughness={0.18} metalness={0.25} />
      </mesh>
      {/* Roof Sign */}
      <mesh position={[-6.2, 2.75, -3.61]}>
        <planeGeometry args={[4.6, 1.15]} />
        <meshBasicMaterial map={sign} toneMapped={false} />
      </mesh>
      {/* Side Pillar */}
      <mesh position={[-2.2, 1.7, -4.2]} castShadow>
        <boxGeometry args={[0.68, 2.6, 0.68]} />
        <meshStandardMaterial color="#3b3834" roughness={0.7} />
      </mesh>
      <mesh position={[-2.2, 2.4, -4.2]}>
        <boxGeometry args={[0.72, 0.32, 0.72]} />
        <meshStandardMaterial color="#d95d39" roughness={0.5} />
      </mesh>
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
  return (
    <group>
      {/* Canopy Fascia */}
      <mesh position={[0.4, 3.28, 2.55]} castShadow>
        <boxGeometry args={[7.3, 0.24, 4.6]} />
        <meshStandardMaterial color="#d95d39" roughness={0.6} />
      </mesh>
      <mesh position={[0.4, 3.08, 2.55]}>
        <boxGeometry args={[6.9, 0.12, 4.25]} />
        <meshStandardMaterial color="#efe4d2" roughness={0.8} />
      </mesh>
      {/* Dark Charcoal Steel Posts with Terracotta Accent */}
      {posts.map(([x, z]) => (
        <group key={`${x}-${z}`} position={[x!, 0, z!]}>
          <mesh position={[0, 1.55, 0]} castShadow>
            <boxGeometry args={[0.26, 3.1, 0.26]} />
            <meshStandardMaterial color="#3b3834" roughness={0.55} metalness={0.3} />
          </mesh>
          <mesh position={[0, 2.15, 0]}>
            <boxGeometry args={[0.3, 0.34, 0.3]} />
            <meshStandardMaterial color="#d95d39" roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.14, 0]}>
            <boxGeometry args={[0.36, 0.28, 0.36]} />
            <meshStandardMaterial color="#6b655d" roughness={0.8} />
          </mesh>
        </group>
      ))}
      {/* Warm Ceiling Tube Lights */}
      {[
        [-1.2, 2.98, 1.4],
        [1.5, 2.98, 1.4],
        [-1.2, 2.98, 3.5],
        [1.5, 2.98, 3.5],
      ].map(([x, y, z]) => (
        <mesh key={`${x}-${z}`} position={[x!, y!, z!]}>
          <boxGeometry args={[1.5, 0.07, 0.18]} />
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
  return (
    <group ref={root}>
      {/* Service Counter */}
      <mesh position={[0.95, 0.5, 2.66]} castShadow receiveShadow>
        <boxGeometry args={[3.05, 1.0, 0.78]} />
        <meshStandardMaterial color="#4a3b32" roughness={0.8} />
      </mesh>
      <mesh position={[0.95, 1.05, 2.66]} castShadow receiveShadow>
        <boxGeometry args={[3.18, 0.1, 0.9]} />
        <meshStandardMaterial color="#2b2725" roughness={0.45} metalness={0.2} />
      </mesh>

      {/* POS Monitor */}
      <group position={[0.15, 1.54, 2.28]} rotation={[-0.32, 0, 0]}>
        <mesh position={[0, 0, -0.02]}>
          <boxGeometry args={[1.22, 0.84, 0.05]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.015]}>
          <planeGeometry args={[1.14, 0.76]} />
          <meshBasicMaterial map={monitor} toneMapped={false} />
        </mesh>
      </group>

      {/* Gold Cash Deposit Pad ($) */}
      <mesh name="prop-gold" position={[1.02, 1.15, 2.46]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.22, 0.24, 0.09, 24]} />
        <meshStandardMaterial color="#eab308" emissive="#d97706" emissiveIntensity={0.3} roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[1.02, 1.2, 2.46]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.11, 18]} />
        <meshBasicMaterial color="#166534" />
      </mesh>

      {/* Sponge */}
      <group name="prop-sponge" position={[1.62, 1.15, 2.42]}>
        <mesh>
          <boxGeometry args={[0.28, 0.09, 0.18]} />
          <meshStandardMaterial color="#eab308" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[0.28, 0.03, 0.18]} />
          <meshStandardMaterial color="#15803d" roughness={0.95} />
        </mesh>
      </group>

      {/* Taser */}
      <group name="prop-taser" position={[1.82, 1.15, 2.62]} rotation={[0, 0.4, 0]}>
        <mesh>
          <boxGeometry args={[0.26, 0.11, 0.09]} />
          <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0.16, 0.01, 0]}>
          <boxGeometry args={[0.1, 0.07, 0.07]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#38bdf8" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Red Gas Cap */}
      <group name="prop-cap" position={[2.05, 1.15, 2.4]}>
        <mesh>
          <cylinderGeometry args={[0.11, 0.11, 0.07, 14]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>
      </group>

      {/* Retro Fuel Pump */}
      <group position={[-0.32, 0, 1.5]}>
        <mesh position={[0, 0.68, 0]} castShadow>
          <boxGeometry args={[0.56, 1.36, 0.48]} />
          <meshStandardMaterial color="#d95d39" roughness={0.45} metalness={0.15} />
        </mesh>
        <mesh position={[0, 0.95, 0.01]}>
          <boxGeometry args={[0.42, 0.45, 0.5]} />
          <meshStandardMaterial color="#efe4d2" roughness={0.6} />
        </mesh>
        <mesh position={[0, 1.42, 0]}>
          <boxGeometry args={[0.64, 0.14, 0.56]} />
          <meshStandardMaterial color="#2b5c61" roughness={0.4} />
        </mesh>
      </group>
      <group name="prop-nozzle" position={[-0.28, 1.25, 1.45]}>
        <mesh rotation={[0.4, 0, 0.6]}>
          <boxGeometry args={[0.28, 0.09, 0.09]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.5} />
        </mesh>
        <mesh position={[0.12, 0.04, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color={GRADES.find((g) => g.id === sim.grade)?.color ?? "#22c55e"} roughness={0.35} />
        </mesh>
      </group>

      {/* EV Charger */}
      <group position={[-0.98, 0, 1.55]}>
        <mesh position={[0, 0.62, 0]} castShadow>
          <boxGeometry args={[0.38, 1.24, 0.34]} />
          <meshStandardMaterial color="#2b5c61" roughness={0.4} metalness={0.25} />
        </mesh>
        <mesh position={[0, 1.05, 0.18]}>
          <boxGeometry args={[0.24, 0.24, 0.04]} />
          <meshStandardMaterial color="#0f172a" emissive="#38bdf8" emissiveIntensity={0.45} />
        </mesh>
      </group>
      <group name="prop-charger" position={[-0.95, 1.22, 1.55]} rotation={[0.6, 0.2, 0]}>
        <mesh>
          <boxGeometry args={[0.22, 0.09, 0.09]} />
          <meshStandardMaterial color="#1e293b" roughness={0.4} />
        </mesh>
        <mesh position={[0.12, 0, 0]}>
          <boxGeometry args={[0.08, 0.11, 0.11]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.4} />
        </mesh>
      </group>

      {/* Snack Fridge */}
      <group position={[-1.2, 0, 3.25]}>
        <mesh position={[0, 0.72, 0]} castShadow>
          <boxGeometry args={[0.72, 1.44, 0.56]} />
          <meshStandardMaterial color="#2b5c61" roughness={0.5} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0.85, 0.27]}>
          <boxGeometry args={[0.52, 0.78, 0.04]} />
          <meshStandardMaterial color="#bae6fd" emissive="#e0f2fe" emissiveIntensity={0.2} roughness={0.2} />
        </mesh>
        <group name="prop-burger" position={[0.12, 1.02, 0.31]}>
          <mesh position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.1, 0.11, 0.04, 12]} />
            <meshStandardMaterial color="#d97706" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.03, 12]} />
            <meshStandardMaterial color="#78350f" roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.03, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.03, 12]} />
            <meshStandardMaterial color="#d97706" roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* Wanted Poster on Counter */}
      <mesh position={[0.35, 1.18, 2.95]} rotation={[-0.15, 0, 0]}>
        <planeGeometry args={[0.42, 0.56]} />
        <meshBasicMaterial map={poster} toneMapped={false} />
      </mesh>

      {/* Skull / Go Control Post */}
      <group position={[2.15, 0, 1.85]}>
        <mesh position={[0, 2.65, 0]}>
          <boxGeometry args={[0.08, 1.4, 0.08]} />
          <meshStandardMaterial color="#eab308" roughness={0.4} metalness={0.3} />
        </mesh>
        <mesh position={[0, 2.15, 0]} castShadow>
          <boxGeometry args={[0.44, 1.15, 0.2]} />
          <meshStandardMaterial color="#1f2937" roughness={0.5} metalness={0.3} />
        </mesh>
        {/* Red Skull Button */}
        <mesh position={[0, 2.42, 0.12]}>
          <circleGeometry args={[0.2, 20]} />
          <meshStandardMaterial color="#dc2626" emissive="#ef4444" emissiveIntensity={sim.skull ? 1.1 : 0.45} />
        </mesh>
        <mesh position={[0, 2.42, 0.16]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
        {/* Green GO Button */}
        <mesh position={[0, 1.92, 0.12]}>
          <circleGeometry args={[0.2, 20]} />
          <meshStandardMaterial color="#16a34a" emissive="#22c55e" emissiveIntensity={0.45} />
        </mesh>
      </group>
    </group>
  );
}

function Shredder({ blades }: { blades: RefObject<Group | null> }) {
  return (
    <group position={[-4.05, 0, 3.55]}>
      <mesh position={[0, 0.82, 0]} castShadow>
        <boxGeometry args={[1.32, 1.64, 1.15]} />
        <meshStandardMaterial color="#3f4d47" roughness={0.65} metalness={0.35} />
      </mesh>
      {/* Hazard Accent Band */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.36, 0.18, 1.19]} />
        <meshStandardMaterial color="#eab308" roughness={0.5} />
      </mesh>
      {/* Hopper Opening */}
      <mesh position={[0, 1.15, 0.5]}>
        <boxGeometry args={[0.76, 0.46, 0.22]} />
        <meshStandardMaterial color="#111827" roughness={0.8} />
      </mesh>
      {/* Funnel Top */}
      <mesh position={[0, 1.78, 0]} castShadow>
        <boxGeometry args={[1.38, 0.3, 1.22]} />
        <meshStandardMaterial color="#64748b" roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Spinning Teeth */}
      <group ref={blades} position={[0, 1.15, 0.45]}>
        {[-0.28, -0.1, 0.1, 0.28].map((x) => (
          <mesh key={x} position={[x, 0, 0.08]} rotation={[0.4, 0, 0]}>
            <coneGeometry args={[0.07, 0.2, 5]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.7} />
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
          <mesh position={[0, 0.7, 0]} castShadow>
            <capsuleGeometry args={[0.16, 0.9, 4, 8]} />
            <meshStandardMaterial color="#4d7c4a" roughness={0.85} />
          </mesh>
          <mesh position={[0.26, 0.72, 0]} rotation={[0, 0, -0.85]} castShadow>
            <capsuleGeometry args={[0.08, 0.35, 3, 6]} />
            <meshStandardMaterial color="#3f6a3c" roughness={0.85} />
          </mesh>
          <mesh position={[-0.24, 0.88, 0]} rotation={[0, 0, 0.85]} castShadow>
            <capsuleGeometry args={[0.075, 0.28, 3, 6]} />
            <meshStandardMaterial color="#3f6a3c" roughness={0.85} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Mountains() {
  const mesas: [number, number, number, string][] = [
    [-22, -24, 9, "#b87b52"],
    [-9, -27, 12, "#a66c46"],
    [8, -26, 10, "#bd8259"],
    [22, -22, 8.5, "#a96e48"],
  ];
  return (
    <>
      {mesas.map(([x, z, s, color]) => (
        <mesh key={`${x}`} position={[x, s * 0.3, z]} rotation={[0, x * 0.2, 0]}>
          <coneGeometry args={[s * 0.75, s, 6]} />
          <meshStandardMaterial color={color} roughness={0.95} />
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
        <group key={x} position={[x!, 0.2, z!]}>
          <mesh castShadow>
            <sphereGeometry args={[0.21, 10, 8]} />
            <meshStandardMaterial color="#d96b27" roughness={0.75} />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.03, 0.04, 0.08, 6]} />
            <meshStandardMaterial color="#4d7c4a" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function LiveCar() {
  const ref = useRef<Group>(null);
  const w1 = useRef<Group>(null);
  const w2 = useRef<Group>(null);
  const w3 = useRef<Group>(null);
  const w4 = useRef<Group>(null);
  const [look, setLook] = useState({
    id: -1,
    color: "#e09f3e",
    shirt: "#fff",
    hat: null as string | null,
    skin: "#ffbea0",
    devil: false,
    face: null as string | null,
    mad: false,
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
    g.position.set(c.x, 0, c.z);
    g.rotation.y = c.yaw + Math.PI;
    if (c.id !== look.id || c.hat !== look.hat || c.color !== look.color || c.mad !== look.mad) {
      setLook({
        id: c.id,
        color: c.color,
        shirt: c.shirt,
        hat: c.hat,
        skin: c.skin,
        devil: c.devil,
        face: c.face,
        mad: c.mad,
      });
    }
    if (c.phase !== "wait") {
      const spin = dt * 11;
      for (const w of [w1.current, w2.current, w3.current, w4.current]) {
        if (w) w.rotation.x += spin;
      }
    }
    const mud = g.getObjectByName("mud");
    if (mud) {
      const vis = c.dirty > 0.2 && c.wash < 0.96;
      mud.visible = vis;
      if (vis) mud.scale.setScalar(Math.max(0.15, 1 - c.wash * 0.85));
    }
    const hat = g.getObjectByName("hat");
    if (hat) hat.visible = Boolean(c.hat);
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
      if (c.caught) {
        head.rotation.z = 0.85;
        head.rotation.x = Math.sin(sim.clock * 28) * 0.1;
      } else if (c.asleep) {
        head.rotation.z = 0.35 + Math.sin(sim.clock * 2.5) * 0.06;
        head.rotation.x = 0.25;
      } else {
        head.rotation.z = 0;
        head.rotation.x = 0;
      }
    }
    const bar = g.getObjectByName("fuelbar") as Mesh | null;
    if (bar) {
      bar.scale.z = Math.max(0.05, c.fuel);
      bar.visible = (c.job === "fuel" || c.job === "charge") && c.phase === "wait";
      const mat = bar.material;
      if (!Array.isArray(mat)) (mat as MeshBasicMaterial).color.set(c.job === "charge" ? "#38bdf8" : "#eab308");
    }
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

  return (
    <group ref={ref} visible={false}>
      <mesh name="outline" position={[0, 0.8, 0]} visible={false}>
        <boxGeometry args={[1.45, 1.7, 2.55]} />
        <meshBasicMaterial color="#ef4444" wireframe />
      </mesh>
      {/* Lower Chassis */}
      <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.18, 0.46, 2.3]} />
        <meshStandardMaterial color={look.color} roughness={0.35} metalness={0.2} />
      </mesh>
      {/* Bumpers */}
      <mesh position={[0, 0.32, 1.17]}>
        <boxGeometry args={[1.22, 0.14, 0.08]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.32, -1.17]}>
        <boxGeometry args={[1.22, 0.14, 0.08]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.6} />
      </mesh>
      {/* Headlights */}
      <mesh position={[-0.4, 0.5, 1.16]}>
        <boxGeometry args={[0.2, 0.14, 0.04]} />
        <meshStandardMaterial color="#fef08a" emissive="#fde047" emissiveIntensity={0.4 + sim.night * 0.9} />
      </mesh>
      <mesh position={[0.4, 0.5, 1.16]}>
        <boxGeometry args={[0.2, 0.14, 0.04]} />
        <meshStandardMaterial color="#fef08a" emissive="#fde047" emissiveIntensity={0.4 + sim.night * 0.9} />
      </mesh>
      {/* Taillights */}
      <mesh position={[-0.42, 0.5, -1.16]}>
        <boxGeometry args={[0.22, 0.12, 0.04]} />
        <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.42, 0.5, -1.16]}>
        <boxGeometry args={[0.22, 0.12, 0.04]} />
        <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.5} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0, 0.98, 0.02]} castShadow>
        <boxGeometry args={[1.04, 0.54, 1.18]} />
        <meshStandardMaterial color={look.color} roughness={0.35} metalness={0.2} />
      </mesh>
      {/* Front Windshield */}
      <mesh position={[0, 0.98, 0.62]} rotation={[-0.18, 0, 0]}>
        <boxGeometry args={[0.92, 0.38, 0.05]} />
        <meshStandardMaterial color="#1e293b" roughness={0.15} metalness={0.3} />
      </mesh>
      {/* Driver Side Open Window */}
      <mesh position={[0.53, 1.0, 0.06]}>
        <boxGeometry args={[0.04, 0.34, 0.72]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} />
      </mesh>

      {/* Devil Flame Decals */}
      <group name="flames" visible={false}>
        <mesh position={[0.02, 0.73, 0.95]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.7, 0.04, 0.22]} />
          <meshStandardMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0.02, 0.73, 0.72]}>
          <boxGeometry args={[0.45, 0.04, 0.14]} />
          <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.3} />
        </mesh>
      </group>
      <mesh name="poop" position={[0.05, 0.82, 0.68]} visible={false}>
        <sphereGeometry args={[0.11, 8, 6]} />
        <meshStandardMaterial color="#7c4a2d" roughness={0.9} />
      </mesh>

      {/* Mud Splatters */}
      <group name="mud">
        <mesh position={[0.59, 0.52, 0.3]}>
          <sphereGeometry args={[0.14, 8, 6]} />
          <meshStandardMaterial color="#7c4a2d" roughness={0.95} />
        </mesh>
        <mesh position={[0.57, 0.58, -0.35]}>
          <sphereGeometry args={[0.16, 8, 6]} />
          <meshStandardMaterial color="#6b3e26" roughness={0.95} />
        </mesh>
        <mesh position={[0.54, 0.65, 0.7]}>
          <sphereGeometry args={[0.11, 8, 6]} />
          <meshStandardMaterial color="#854d27" roughness={0.95} />
        </mesh>
      </group>

      {/* Wheels */}
      <Wheel refObj={w1} at={[-0.5, 0.26, 0.76]} />
      <Wheel refObj={w2} at={[0.5, 0.26, 0.76]} />
      <Wheel refObj={w3} at={[-0.5, 0.26, -0.76]} />
      <Wheel refObj={w4} at={[0.5, 0.26, -0.76]} />

      {/* Side Mirror */}
      <mesh name="mirror" position={[0.63, 1.08, 0.66]}>
        <boxGeometry args={[0.14, 0.1, 0.12]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Gas Cap */}
      <mesh name="gascap" position={[0.6, 0.66, -0.85]}>
        <cylinderGeometry args={[0.08, 0.08, 0.05, 12]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.4} />
      </mesh>
      {/* Loose Cheese */}
      <mesh name="cheese" position={[-0.15, 0.9, -0.35]} visible={false}>
        <boxGeometry args={[0.14, 0.08, 0.12]} />
        <meshStandardMaterial color="#facc15" roughness={0.7} />
      </mesh>
      {/* Fuel Progress Bar on Side */}
      <mesh name="fuelbar" position={[0.67, 0.88, -0.55]}>
        <boxGeometry args={[0.05, 0.06, 0.7]} />
        <meshBasicMaterial color="#eab308" />
      </mesh>

      {/* Driver */}
      <group name="head" position={[0.22, 1.12, 0.12]}>
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.2, 14, 12]} />
          <meshStandardMaterial color={look.skin} roughness={0.7} />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.075, 0.25, 0.13]} scale={wideEyes ? 1.45 : 1}>
          <sphereGeometry args={[0.042, 8, 8]} />
          <meshBasicMaterial color="#fff" />
        </mesh>
        <mesh position={[0.075, 0.25, 0.13]} scale={wideEyes ? 1.45 : 1}>
          <sphereGeometry args={[0.042, 8, 8]} />
          <meshBasicMaterial color="#fff" />
        </mesh>
        <mesh position={[-0.075, 0.25, 0.165]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial color="#111" />
        </mesh>
        <mesh position={[0.075, 0.25, 0.165]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial color="#111" />
        </mesh>
        {/* Angry Eyebrows */}
        {angryBrows ? (
          <>
            <mesh position={[-0.075, 0.31, 0.16]} rotation={[0, 0, -0.35]}>
              <boxGeometry args={[0.08, 0.022, 0.02]} />
              <meshBasicMaterial color="#1e1b18" />
            </mesh>
            <mesh position={[0.075, 0.31, 0.16]} rotation={[0, 0, 0.35]}>
              <boxGeometry args={[0.08, 0.022, 0.02]} />
              <meshBasicMaterial color="#1e1b18" />
            </mesh>
          </>
        ) : null}
        {/* Toothy Grin */}
        {bigGrin ? (
          <mesh position={[0, 0.15, 0.165]}>
            <boxGeometry args={[0.13, 0.045, 0.03]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ) : null}
        {/* Shirt / Torso */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[0.32, 0.28, 0.22]} />
          <meshStandardMaterial color={look.shirt} roughness={0.8} />
        </mesh>
        {/* Hat with Brim */}
        <group name="hat" position={[0, 0.39, 0]} visible={Boolean(look.hat)}>
          <mesh>
            <cylinderGeometry args={[0.16, 0.18, 0.12, 12]} />
            <meshStandardMaterial color={look.hat ?? "#2d9d5c"} roughness={0.75} />
          </mesh>
          <mesh position={[0, -0.05, 0.08]}>
            <boxGeometry args={[0.28, 0.03, 0.18]} />
            <meshStandardMaterial color={look.hat ?? "#2d9d5c"} roughness={0.75} />
          </mesh>
        </group>
        {/* Devil Horns */}
        <group name="horns" visible={look.devil}>
          <mesh position={[-0.08, 0.4, 0]} rotation={[0, 0, 0.4]}>
            <coneGeometry args={[0.05, 0.22, 6]} />
            <meshStandardMaterial color="#dc2626" roughness={0.4} />
          </mesh>
          <mesh position={[0.08, 0.4, 0]} rotation={[0, 0, -0.4]}>
            <coneGeometry args={[0.05, 0.22, 6]} />
            <meshStandardMaterial color="#dc2626" roughness={0.4} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function Wheel({ at, refObj }: { at: [number, number, number]; refObj: RefObject<Group | null> }) {
  return (
    <group ref={refObj} position={at} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.16, 14]} />
        <meshStandardMaterial color="#1f2937" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.04, 10]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.35} metalness={0.5} />
      </mesh>
    </group>
  );
}

function Bubble() {
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
    const p = carPoint(c, 0.15, 2.05, 0.1);
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
      <planeGeometry args={[0.72, 0.72]} />
      <meshBasicMaterial map={art.tex} transparent toneMapped={false} />
    </mesh>
  );
}

function Bills() {
  const ref = useRef<Group>(null);
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    for (let i = 0; i < g.children.length; i++) {
      const m = g.children[i] as Mesh;
      const b = sim.bills[i];
      if (!b) {
        m.visible = false;
        continue;
      }
      m.visible = true;
      m.position.set(b.x, b.y + Math.sin(sim.clock * 4 + b.id) * 0.025, b.z);
      m.rotation.y = sim.clock * 1.4 + b.id;
      const s = 0.75 + Math.min(0.8, b.amount / 180);
      m.scale.setScalar(s);
    }
  });
  return (
    <group ref={ref}>
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} visible={false} castShadow>
          <boxGeometry args={[0.3, 0.07, 0.17]} />
          <meshStandardMaterial color="#22c55e" emissive="#16a34a" emissiveIntensity={0.25} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function Bits() {
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
          <boxGeometry args={[0.09, 0.09, 0.09]} />
          <meshStandardMaterial color={i % 2 ? "#22c55e" : "#eab308"} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

function Marker() {
  const ref = useRef<Mesh>(null);
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    m.visible = sim.phase === "play" && sim.aimKind !== "";
    m.position.set(sim.aimPos.x, sim.aimPos.y, sim.aimPos.z);
    m.lookAt(sim.player.x, 1.56, sim.player.z);
    const pulse = 1 + Math.sin(sim.clock * 7) * 0.12;
    m.scale.setScalar(pulse);
  });
  return (
    <mesh ref={ref} visible={false}>
      <ringGeometry args={[0.08, 0.12, 20]} />
      <meshBasicMaterial color="#fde047" transparent opacity={0.85} />
    </mesh>
  );
}

function Hands() {
  const ref = useRef<Group>(null);
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
    const poster = g.getObjectByName("poster");
    if (poster) poster.visible = sim.posterUp;
    const tool = g.getObjectByName("tool");
    if (tool) {
      tool.visible = sim.hold !== "none";
      const jiggle = sim.usePulse > 0 ? Math.sin(sim.clock * 26) * 0.025 * sim.usePulse : 0;
      tool.position.set(0.28 + jiggle, -0.18 + Math.abs(jiggle), -0.62);
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
    const hat = g.getObjectByName("h-hat") as Mesh | null;
    if (hat) {
      hat.visible = sim.hold === "hat";
      const mat = hat.material;
      if (!Array.isArray(mat)) (mat as MeshStandardMaterial).color.set(sim.hatColor);
    }
    const tip = g.getObjectByName("h-nozzle-tip") as Mesh | null;
    if (tip) {
      const mat = tip.material;
      const gc = GRADES.find((x) => x.id === sim.grade)?.color ?? "#22c55e";
      if (!Array.isArray(mat)) (mat as MeshStandardMaterial).color.set(gc);
    }
    g.position.y += Math.sin(sim.clock * 2.2) * 0.008;
  });

  const poster = useMemo(() => paint((ctx, w, h) => drawPoster(ctx, w, h), 512, 680), []);
  useFrame(() => {
    const key = String(sim.warrant);
    if (poster.key !== key) {
      poster.key = key;
      drawPoster(poster.ctx, 512, 680);
      poster.tex.needsUpdate = true;
    }
  });

  return (
    <group ref={ref}>
      {/* Left & Right Stylized Hands */}
      <mesh position={[-0.32, -0.28, -0.55]} rotation={[0.2, 0.2, 0.4]}>
        <boxGeometry args={[0.14, 0.08, 0.2]} />
        <meshStandardMaterial color="#f5bfa0" roughness={0.75} />
      </mesh>
      <mesh position={[0.34, -0.26, -0.52]} rotation={[0.3, -0.3, -0.2]}>
        <boxGeometry args={[0.15, 0.08, 0.22]} />
        <meshStandardMaterial color="#f5bfa0" roughness={0.75} />
      </mesh>
      <mesh name="poster" position={[-0.18, -0.02, -0.6]} visible={false}>
        <planeGeometry args={[0.34, 0.46]} />
        <meshBasicMaterial map={poster.tex} toneMapped={false} />
      </mesh>
      <group name="tool" position={[0.28, -0.18, -0.62]}>
        <group name="h-nozzle">
          <mesh rotation={[0, 0, 0.5]}>
            <boxGeometry args={[0.3, 0.075, 0.075]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.4} />
          </mesh>
          <mesh name="h-nozzle-tip" position={[0.15, 0.02, 0]}>
            <boxGeometry args={[0.1, 0.095, 0.095]} />
            <meshStandardMaterial color="#22c55e" roughness={0.35} />
          </mesh>
        </group>
        <group name="h-sponge" visible={false}>
          <mesh>
            <boxGeometry args={[0.2, 0.06, 0.14]} />
            <meshStandardMaterial color="#eab308" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.035, 0]}>
            <boxGeometry args={[0.2, 0.02, 0.14]} />
            <meshStandardMaterial color="#15803d" roughness={0.95} />
          </mesh>
        </group>
        <group name="h-burger" visible={false}>
          <mesh position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.09, 0.1, 0.04, 12]} />
            <meshStandardMaterial color="#d97706" roughness={0.7} />
          </mesh>
          <mesh>
            <cylinderGeometry args={[0.09, 0.09, 0.025, 12]} />
            <meshStandardMaterial color="#78350f" roughness={0.8} />
          </mesh>
          <mesh position={[0, -0.03, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.03, 12]} />
            <meshStandardMaterial color="#d97706" roughness={0.7} />
          </mesh>
        </group>
        <mesh name="h-cap" visible={false}>
          <cylinderGeometry args={[0.08, 0.08, 0.05, 14]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>
        <group name="h-taser" visible={false}>
          <mesh>
            <boxGeometry args={[0.24, 0.09, 0.07]} />
            <meshStandardMaterial color="#334155" roughness={0.45} />
          </mesh>
          <mesh position={[0.14, 0, 0]}>
            <boxGeometry args={[0.08, 0.06, 0.06]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} />
          </mesh>
        </group>
        <mesh name="h-cash" visible={false}>
          <boxGeometry args={[0.2, 0.05, 0.12]} />
          <meshStandardMaterial color="#22c55e" roughness={0.6} />
        </mesh>
        <mesh name="h-mirror" visible={false}>
          <boxGeometry args={[0.14, 0.1, 0.06]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.5} />
        </mesh>
        <group name="h-charger" visible={false}>
          <mesh rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.26, 0.08, 0.08]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} />
          </mesh>
          <mesh position={[0.14, 0.02, 0]}>
            <boxGeometry args={[0.08, 0.1, 0.1]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.5} />
          </mesh>
        </group>
        <mesh name="h-hat" visible={false}>
          <cylinderGeometry args={[0.1, 0.12, 0.08, 12]} />
          <meshStandardMaterial color="#eab308" roughness={0.75} />
        </mesh>
        <mesh name="h-cheese" visible={false}>
          <boxGeometry args={[0.12, 0.06, 0.1]} />
          <meshStandardMaterial color="#facc15" roughness={0.7} />
        </mesh>
      </group>
      <group name="h-horns" position={[0, 0.16, -0.42]} visible={false}>
        <mesh position={[-0.08, 0, 0]} rotation={[0.2, 0, 0.5]}>
          <coneGeometry args={[0.035, 0.16, 6]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>
        <mesh position={[0.08, 0, 0]} rotation={[0.2, 0, -0.5]}>
          <coneGeometry args={[0.035, 0.16, 6]} />
          <meshStandardMaterial color="#dc2626" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

function drawMonitor(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#121826";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(16, 16, w - 32, 196);
  ctx.fillStyle = "#f59e0b";
  ctx.font = "800 32px Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("WANTED FUEL POS", 32, 56);
  ctx.fillStyle = "#cbd5e1";
  ctx.font = "700 24px Arial, sans-serif";
  ctx.fillText(`★ ${sim.stars.toFixed(1)}   ·   Ngày ${sim.day}`, 32, 94);
  ctx.fillStyle = "#34d399";
  ctx.font = "800 76px Arial, sans-serif";
  ctx.fillText(`$${sim.money}`, 32, 182);

  ctx.fillStyle = "#172030";
  ctx.fillRect(16, 226, w - 32, h - 242);
  ctx.fillStyle = "#f8fafc";
  ctx.font = "700 26px Arial, sans-serif";
  ctx.fillText(sim.customer ? `Khách: ${sim.customer}` : "Làn xe đang trống", 32, 266);
  ctx.fillStyle = "#94a3b8";
  ctx.font = "600 21px Arial, sans-serif";
  const tip = TIPS[sim.tipI] ?? "";
  wrap(ctx, tip, 32, 304, w - 64, 27);
  ctx.fillStyle = "#fbbf24";
  ctx.font = "600 21px Arial, sans-serif";
  ctx.fillText(`"${sim.review}"`, 32, 368);
}

function drawPoster(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const face = WARRANTS[sim.warrant % WARRANTS.length]!;
  ctx.fillStyle = "#f5ebd6";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#d4c3a3";
  ctx.lineWidth = 6;
  ctx.strokeRect(16, 16, w - 32, h - 32);
  for (let y = 150; y < 440; y += 30) {
    ctx.beginPath();
    ctx.moveTo(44, y);
    ctx.lineTo(w - 44, y);
    ctx.stroke();
  }
  ctx.fillStyle = "#b91c1c";
  ctx.font = "900 76px Impact, Arial Black, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("WANTED", w / 2, 102);

  // Face
  ctx.fillStyle = "#ffbea0";
  ctx.beginPath();
  ctx.arc(w / 2, 255, 76, 0, Math.PI * 2);
  ctx.fill();

  // Eyes
  const er = face.id === "thief" ? 21 : 15;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(w / 2 - 28, 246, er, 0, Math.PI * 2);
  ctx.arc(w / 2 + 28, 246, er, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.arc(w / 2 - 28, 248, 7, 0, Math.PI * 2);
  ctx.arc(w / 2 + 28, 248, 7, 0, Math.PI * 2);
  ctx.fill();

  // Brows or Grin
  if (face.id === "bully") {
    ctx.strokeStyle = "#1e1b18";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 48, 218);
    ctx.lineTo(w / 2 - 12, 232);
    ctx.moveTo(w / 2 + 48, 218);
    ctx.lineTo(w / 2 + 12, 232);
    ctx.stroke();
  }
  if (face.id === "worst") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(w / 2 - 36, 286, 72, 24);
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 3;
    ctx.strokeRect(w / 2 - 36, 286, 72, 24);
  }

  if (face.hat) {
    ctx.fillStyle = face.hat;
    ctx.fillRect(w / 2 - 78, 175, 156, 36);
    ctx.fillRect(w / 2 - 58, 206, 150, 14);
  }
  ctx.fillStyle = face.shirt;
  ctx.fillRect(w / 2 - 72, 336, 144, 88);

  ctx.fillStyle = "#1c1917";
  ctx.font = "800 34px Arial, sans-serif";
  ctx.fillText(face.name, w / 2, 492);
  ctx.fillStyle = "#b91c1c";
  ctx.font = "800 40px Arial, sans-serif";
  ctx.fillText(`THƯỞNG $${face.bounty}`, w / 2, 548);
  ctx.fillStyle = "#44403c";
  ctx.font = "600 23px Arial, sans-serif";
  wrap(ctx, face.line, 36, 598, w - 72, 28);
  ctx.textAlign = "left";
}

function drawBubble(ctx: CanvasRenderingContext2D, c: Car) {
  const w = 256;
  const h = 256;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255, 250, 240, 0.96)";
  ctx.strokeStyle = "#2b2725";
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.ellipse(128, 112, 102, 76, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(100, 178);
  ctx.lineTo(80, 222);
  ctx.lineTo(138, 182);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#111827";
  ctx.textAlign = "center";
  if (c.caught) {
    ctx.fillStyle = "#dc2626";
    ctx.font = "800 40px Arial";
    ctx.fillText("ĐÃ BẮT", 128, 124);
    return;
  }
  if (c.asleep) {
    ctx.fillStyle = "#1e293b";
    ctx.font = "800 62px Arial";
    ctx.fillText("Zzz...", 128, 130);
    return;
  }
  if (c.job === "fuel") {
    const gc = GRADES.find((g) => g.id === c.grade)?.color ?? "#1d4ed8";
    ctx.fillStyle = gc;
    ctx.fillRect(74, 78, 36, 56);
    ctx.fillStyle = "#111827";
    ctx.font = "800 42px Arial";
    ctx.fillText(c.grade === "diesel" ? "DẦU" : c.grade, 152, 122);
  } else if (c.job === "wash") {
    ctx.fillStyle = "#eab308";
    ctx.fillRect(78, 72, 100, 44);
    ctx.fillStyle = "#16a34a";
    ctx.fillRect(78, 110, 100, 34);
  } else if (c.job === "food") {
    ctx.fillStyle = "#d97706";
    ctx.beginPath();
    ctx.ellipse(128, 118, 56, 26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#65a30d";
    ctx.fillRect(80, 108, 96, 12);
    ctx.fillStyle = "#78350f";
    ctx.fillRect(80, 120, 96, 14);
  } else if (c.job === "charge") {
    ctx.fillStyle = "#0284c7";
    ctx.fillRect(108, 66, 40, 44);
    ctx.fillRect(116, 110, 24, 14);
    ctx.fillStyle = "#111827";
    ctx.font = "800 28px Arial";
    ctx.fillText("18 kWh", 128, 162);
  } else {
    ctx.fillStyle = "#dc2626";
    ctx.fillRect(86, 78, 84, 58);
    ctx.fillStyle = "#fff";
    ctx.font = "800 28px Arial";
    ctx.fillText("NẮP", 128, 116);
  }
  if (c.wanted && sim.posterUp) {
    ctx.fillStyle = "#dc2626";
    ctx.font = "800 22px Arial";
    ctx.fillText("KHỚP MẶT!", 128, 60);
  }
  ctx.textAlign = "left";
}

function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, max: number, lh: number) {
  const words = text.split(" ");
  let line = "";
  let yy = y;
  const align = ctx.textAlign;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > max) {
      ctx.fillText(line, align === "center" ? x + max / 2 : x, yy);
      line = word;
      yy += lh;
    } else line = test;
  }
  if (line) ctx.fillText(line, align === "center" ? x + max / 2 : x, yy);
}
