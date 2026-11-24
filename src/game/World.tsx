import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import {
  CanvasTexture,
  Color,
  Fog,
  SRGBColorSpace,
  type AmbientLight,
  type DirectionalLight,
  type Group,
  type Mesh,
  type PointLight,
  type MeshBasicMaterial,
} from "three";
import { TIPS, WARRANTS } from "@/game/content";
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
      <color attach="background" args={["#8fd0ff"]} />
      <Rig />
      <Lights />
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
  const bg = useMemo(() => new Color("#8fd0ff"), []);
  const day = useMemo(() => new Color("#8fd0ff"), []);
  const night = useMemo(() => new Color("#12162b"), []);
  useEffect(() => {
    scene.fog = new Fog("#8fd0ff", 16, 70);
  }, [scene]);
  useFrame((_, dt) => {
    tick(Math.min(0.05, dt));
    const n = sim.night;
    bg.copy(day).lerp(night, n);
    scene.background = bg;
    const fog = scene.fog;
    if (fog && "color" in fog) {
      fog.color.copy(bg);
      if ("far" in fog) fog.far = 70 - n * 28;
    }
    if (sim.phase === "title") {
      const a = sim.orbit;
      camera.position.set(Math.sin(a) * 7.4 + 0.2, 2.7, Math.cos(a) * 5.6 + 1.4);
      camera.lookAt(-1.4, 1.05, 0.5);
      return;
    }
    const bob = Math.sin(sim.clock * 9) * Math.min(0.045, sim.speed * 0.012);
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
  useFrame(() => {
    const n = sim.night;
    if (sun.current) sun.current.intensity = 1.45 * (1 - n * 0.78);
    if (amb.current) amb.current.intensity = 0.62 - n * 0.34;
    if (lamp.current) lamp.current.intensity = 0.25 + n * 3.1;
  });
  return (
    <>
      <hemisphereLight args={["#d7f0ff", "#e8c27a", 0.85]} />
      <ambientLight ref={amb} intensity={0.55} />
      <directionalLight
        ref={sun}
        position={[14, 20, 8]}
        intensity={1.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={48}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-camera-bottom={-16}
      />
      <pointLight ref={lamp} position={[0.4, 2.8, 2.4]} distance={14} decay={2} intensity={0.4} color="#fff4d2" />
    </>
  );
}

function Station() {
  const sign = useMemo(
    () =>
      paint((ctx, w, h) => {
        ctx.fillStyle = "#f8fafc";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#2563eb";
        ctx.fillRect(0, 0, w, 18);
        ctx.fillRect(0, h - 18, w, 18);
        ctx.fillStyle = "#f97316";
        ctx.font = "800 92px Impact, Arial Black, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("WANTED FUEL", w / 2, h * 0.68);
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
  useFrame(() => {
    monitor.key = `${sim.money}|${sim.stars.toFixed(1)}|${sim.tipI}|${sim.review}|${sim.customer}|${sim.day}`;
    drawMonitor(monitor.ctx, 640, 400);
    monitor.tex.needsUpdate = true;
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
  });
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[90, 90]} />
        <meshLambertMaterial color="#f0c56b" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.55]} receiveShadow>
        <planeGeometry args={[46, 3.5]} />
        <meshLambertMaterial color="#2c313a" />
      </mesh>
      {[-8, -4, 0, 4, 8, 12].map((x) => (
        <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.03, 0.55]}>
          <planeGeometry args={[1.1, 0.12]} />
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
      ))}

      <Building sign={sign.tex} />
      <Canopy />
      <Props root={prop} monitor={monitor.tex} poster={poster.tex} />
      <Shredder />
      <group ref={bar} position={[-4.55, 1.05, -0.15]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.18, 0.7, 0.18]} />
          <meshLambertMaterial color="#e5e7eb" />
        </mesh>
        <mesh position={[0, 0.05, 1]} castShadow>
          <boxGeometry args={[0.12, 0.1, 2]} />
          <meshLambertMaterial color="#ef4444" />
        </mesh>
      </group>
      <Cacti />
      <Mountains />
      <Pumpkins />
    </group>
  );
}

function Building({ sign }: { sign: CanvasTexture }) {
  return (
    <group>
      <mesh position={[-6.2, 1.7, -5.9]} castShadow receiveShadow>
        <boxGeometry args={[9.6, 3.4, 4.4]} />
        <meshLambertMaterial color="#f8fafc" />
      </mesh>
      <mesh position={[-6.2, 3.55, -5.9]}>
        <boxGeometry args={[10, 0.28, 4.8]} />
        <meshLambertMaterial color="#fb923c" />
      </mesh>
      <mesh position={[-4.2, 1.35, -3.65]}>
        <boxGeometry args={[3.4, 2.3, 0.12]} />
        <meshLambertMaterial color="#3b82f6" />
      </mesh>
      <mesh position={[-8.3, 1.35, -3.65]}>
        <boxGeometry args={[2.6, 2.3, 0.12]} />
        <meshLambertMaterial color="#60a5fa" />
      </mesh>
      <mesh position={[-6.2, 2.55, -3.62]}>
        <planeGeometry args={[4.6, 1.15]} />
        <meshBasicMaterial map={sign} toneMapped={false} />
      </mesh>
      <mesh position={[-2.2, 1.7, -4.2]}>
        <boxGeometry args={[0.7, 2.2, 0.7]} />
        <meshLambertMaterial color="#7c6bf2" />
      </mesh>
      <mesh position={[-2.2, 2.5, -4.2]}>
        <boxGeometry args={[0.74, 0.35, 0.74]} />
        <meshLambertMaterial color="#ffffff" />
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
      <mesh position={[0.4, 3.25, 2.55]} castShadow>
        <boxGeometry args={[7.2, 0.16, 4.5]} />
        <meshLambertMaterial color="#fb923c" />
      </mesh>
      <mesh position={[0.4, 3.05, 2.55]}>
        <boxGeometry args={[6.8, 0.08, 4.2]} />
        <meshLambertMaterial color="#fff7ed" />
      </mesh>
      {posts.map(([x, z]) => (
        <group key={`${x}-${z}`} position={[x!, 0, z!]}>
          <mesh position={[0, 1.55, 0]} castShadow>
            <boxGeometry args={[0.28, 3.1, 0.28]} />
            <meshLambertMaterial color="#7c6bf2" />
          </mesh>
          <mesh position={[0, 2.15, 0]}>
            <boxGeometry args={[0.32, 0.38, 0.32]} />
            <meshLambertMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}
      {[
        [-1.2, 2.95, 1.4],
        [1.5, 2.95, 1.4],
        [-1.2, 2.95, 3.5],
        [1.5, 2.95, 3.5],
      ].map(([x, y, z]) => (
        <mesh key={`${x}-${z}`} position={[x!, y!, z!]}>
          <boxGeometry args={[1.5, 0.08, 0.18]} />
          <meshStandardMaterial color="#f8fafc" emissive="#ffffff" emissiveIntensity={0.7} />
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
      <mesh position={[0.95, 0.52, 2.66]} castShadow receiveShadow>
        <boxGeometry args={[3.05, 1.04, 0.78]} />
        <meshLambertMaterial color="#4f7cff" />
      </mesh>
      <mesh position={[0.95, 1.08, 2.66]}>
        <boxGeometry args={[3.15, 0.1, 0.9]} />
        <meshLambertMaterial color="#3b5bdb" />
      </mesh>
      <mesh position={[0.15, 1.55, 2.28]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[1.15, 0.78, 0.06]} />
        <meshBasicMaterial map={monitor} toneMapped={false} />
      </mesh>
      <mesh name="prop-gold" position={[1.02, 1.2, 2.46]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.08, 20]} />
        <meshStandardMaterial color="#f5c542" emissive="#f59e0b" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[1.02, 1.26, 2.46]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.1, 16]} />
        <meshBasicMaterial color="#166534" />
      </mesh>
      <mesh name="prop-sponge" position={[1.62, 1.18, 2.42]}>
        <boxGeometry args={[0.28, 0.12, 0.18]} />
        <meshLambertMaterial color="#facc15" />
      </mesh>
      <mesh position={[1.62, 1.22, 2.42]}>
        <boxGeometry args={[0.28, 0.06, 0.18]} />
        <meshLambertMaterial color="#22c55e" />
      </mesh>
      <group name="prop-taser" position={[1.82, 1.18, 2.62]} rotation={[0, 0.4, 0]}>
        <mesh>
          <boxGeometry args={[0.28, 0.12, 0.1]} />
          <meshLambertMaterial color="#334155" />
        </mesh>
        <mesh position={[0.18, 0, 0]}>
          <boxGeometry args={[0.12, 0.08, 0.08]} />
          <meshLambertMaterial color="#3b82f6" />
        </mesh>
      </group>
      <group name="prop-cap" position={[2.05, 1.18, 2.4]}>
        <mesh>
          <boxGeometry args={[0.2, 0.08, 0.16]} />
          <meshLambertMaterial color="#ef4444" />
        </mesh>
      </group>
      <group name="prop-nozzle" position={[-0.28, 1.25, 1.45]}>
        <mesh rotation={[0.4, 0, 0.6]}>
          <boxGeometry args={[0.28, 0.1, 0.1]} />
          <meshLambertMaterial color="#111827" />
        </mesh>
        <mesh position={[0.12, 0.04, 0]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshLambertMaterial color="#22c55e" />
        </mesh>
      </group>
      <group name="prop-charger" position={[-0.95, 1.22, 1.55]} rotation={[0.6, 0.2, 0]}>
        <mesh>
          <boxGeometry args={[0.22, 0.1, 0.1]} />
          <meshLambertMaterial color="#1d4ed8" />
        </mesh>
        <mesh position={[0.12, 0, 0]}>
          <boxGeometry args={[0.08, 0.12, 0.12]} />
          <meshLambertMaterial color="#38bdf8" />
        </mesh>
      </group>
      <mesh position={[-0.32, 0.7, 1.5]} castShadow>
        <boxGeometry args={[0.55, 1.35, 0.5]} />
        <meshLambertMaterial color="#2563eb" />
      </mesh>
      <mesh position={[-0.32, 1.42, 1.5]}>
        <boxGeometry args={[0.62, 0.12, 0.58]} />
        <meshLambertMaterial color="#1d4ed8" />
      </mesh>
      <group position={[-1.2, 0, 3.25]}>
        <mesh position={[0, 0.7, 0]} castShadow>
          <boxGeometry args={[0.7, 1.4, 0.55]} />
          <meshLambertMaterial color="#60a5fa" />
        </mesh>
        <mesh position={[0, 0.85, 0.28]}>
          <boxGeometry args={[0.5, 0.7, 0.05]} />
          <meshLambertMaterial color="#bfdbfe" />
        </mesh>
        <mesh name="prop-burger" position={[0.15, 1.05, 0.32]}>
          <boxGeometry args={[0.22, 0.12, 0.16]} />
          <meshLambertMaterial color="#d97706" />
        </mesh>
      </group>
      <mesh position={[0.35, 1.2, 2.95]} rotation={[-0.15, 0, 0]}>
        <planeGeometry args={[0.42, 0.56]} />
        <meshBasicMaterial map={poster} toneMapped={false} />
      </mesh>
      <group position={[2.15, 0, 1.85]}>
        <mesh position={[0, 2.7, 0]}>
          <boxGeometry args={[0.08, 1.5, 0.08]} />
          <meshLambertMaterial color="#facc15" />
        </mesh>
        <mesh position={[0, 2.15, 0]}>
          <boxGeometry args={[0.42, 1.15, 0.18]} />
          <meshLambertMaterial color="#1f2937" />
        </mesh>
        <mesh position={[0, 2.42, 0.12]}>
          <circleGeometry args={[0.2, 20]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.55} />
        </mesh>
        <mesh position={[0, 2.42, 0.16]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#f8fafc" />
        </mesh>
        <mesh position={[0, 1.92, 0.12]}>
          <circleGeometry args={[0.2, 20]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.45} />
        </mesh>
      </group>
    </group>
  );
}

function Shredder() {
  return (
    <group position={[-4.05, 0, 3.55]}>
      <mesh position={[0, 0.85, 0]} castShadow>
        <boxGeometry args={[1.3, 1.7, 1.15]} />
        <meshLambertMaterial color="#1d4ed8" />
      </mesh>
      <mesh position={[0, 1.15, 0.5]}>
        <boxGeometry args={[0.7, 0.45, 0.2]} />
        <meshLambertMaterial color="#111827" />
      </mesh>
      <mesh position={[0, 1.85, 0]}>
        <boxGeometry args={[1.35, 0.35, 1.2]} />
        <meshLambertMaterial color="#93c5fd" />
      </mesh>
      {[-0.3, -0.1, 0.1, 0.3].map((x) => (
        <mesh key={x} position={[x, 0.55, 0.35]} rotation={[0.4, 0, 0]}>
          <coneGeometry args={[0.08, 0.22, 5]} />
          <meshLambertMaterial color="#9ca3af" />
        </mesh>
      ))}
    </group>
  );
}

function Cacti() {
  const spots = [
    [8.5, -3.2],
    [12, -5],
    [6.2, -6.5],
    [14, 3.5],
    [-13, -2],
    [-12, 4],
    [4.5, 6.2],
    [-8, 5.5],
  ];
  return (
    <>
      {spots.map(([x, z]) => (
        <group key={`${x}-${z}`} position={[x!, 0, z!]}>
          <mesh position={[0, 0.7, 0]}>
            <capsuleGeometry args={[0.16, 0.9, 4, 6]} />
            <meshLambertMaterial color="#22c55e" />
          </mesh>
          <mesh position={[0.28, 0.7, 0]} rotation={[0, 0, -0.9]}>
            <capsuleGeometry args={[0.08, 0.35, 3, 5]} />
            <meshLambertMaterial color="#16a34a" />
          </mesh>
        </group>
      ))}
    </>
  );
}

function Mountains() {
  return (
    <>
      {[
        [-16, -18, 7, "#c2885a"],
        [-6, -20, 9, "#a8744a"],
        [6, -19, 8, "#b skip"],
      ]
        .filter((m) => m[3] !== "#b skip")
        .map(([x, z, s, color]) => (
          <mesh key={`${x}`} position={[Number(x), Number(s) * 0.25, Number(z)]}>
            <coneGeometry args={[Number(s) * 0.7, Number(s), 5]} />
            <meshLambertMaterial color={String(color)} />
          </mesh>
        ))}
      <mesh position={[10, 2.2, -18]}>
        <coneGeometry args={[6, 7, 5]} />
        <meshLambertMaterial color="#b87a4e" />
      </mesh>
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
        <mesh key={x} position={[x!, 0.22, z!]}>
          <sphereGeometry args={[0.22, 10, 8]} />
          <meshLambertMaterial color="#f97316" />
        </mesh>
      ))}
    </group>
  );
}

function LiveCar() {
  const ref = useRef<Group>(null);
  const [look, setLook] = useState({
    id: -1,
    color: "#f59e0b",
    shirt: "#fff",
    hat: null as string | null,
    skin: "#ffbea0",
    devil: false,
  });
  useFrame(() => {
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
    if (c.id !== look.id || c.hat !== look.hat || c.color !== look.color) {
      setLook({ id: c.id, color: c.color, shirt: c.shirt, hat: c.hat, skin: c.skin, devil: c.devil });
    }
    const mud = g.getObjectByName("mud");
    if (mud) mud.visible = c.dirty > 0.2 && c.wash < 0.95;
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
    if (head) head.rotation.z = c.caught ? 0.9 : c.asleep ? 0.35 : 0;
    const bar = g.getObjectByName("fuelbar") as Mesh | null;
    if (bar) {
      bar.scale.z = Math.max(0.05, c.fuel);
      bar.visible = (c.job === "fuel" || c.job === "charge") && c.phase === "wait";
      const mat = bar.material;
      if (!Array.isArray(mat)) (mat as MeshBasicMaterial).color.set(c.job === "charge" ? "#38bdf8" : "#facc15");
    }
    const cap = g.getObjectByName("gascap") as Mesh | null;
    if (cap) {
      cap.visible = c.capped || c.job !== "cap";
      const mat = cap.material;
      if (!Array.isArray(mat)) (mat as MeshBasicMaterial).color.set(c.capped ? "#ef4444" : "#94a3b8");
    }
  });
  return (
    <group ref={ref} visible={false}>
      <mesh name="outline" position={[0, 0.8, 0]} visible={false}>
        <boxGeometry args={[1.45, 1.7, 2.55]} />
        <meshBasicMaterial color="#ef4444" wireframe />
      </mesh>
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.15, 0.48, 2.25]} />
        <meshLambertMaterial color={look.color} />
      </mesh>
      <mesh position={[0, 1.05, 0.05]} castShadow>
        <boxGeometry args={[1.05, 0.5, 1.15]} />
        <meshLambertMaterial color={look.color} />
      </mesh>
      <group name="flames" visible={false}>
        <mesh position={[0.02, 0.78, 0.95]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.7, 0.06, 0.18]} />
          <meshLambertMaterial color="#f97316" />
        </mesh>
        <mesh position={[0.02, 0.74, 0.72]}>
          <boxGeometry args={[0.45, 0.05, 0.12]} />
          <meshLambertMaterial color="#ef4444" />
        </mesh>
      </group>
      <mesh name="poop" position={[0.05, 0.86, 0.55]} visible={false}>
        <sphereGeometry args={[0.12, 8, 6]} />
        <meshLambertMaterial color="#7c4a2d" />
      </mesh>
      <mesh position={[0.54, 1.08, 0.1]}>
        <boxGeometry args={[0.04, 0.32, 0.7]} />
        <meshLambertMaterial color="#0f172a" />
      </mesh>
      <group name="mud">
        <mesh position={[0.58, 0.55, 0.3]}>
          <sphereGeometry args={[0.16, 8, 6]} />
          <meshLambertMaterial color="#b45309" />
        </mesh>
        <mesh position={[0.55, 0.62, -0.35]}>
          <sphereGeometry args={[0.18, 8, 6]} />
          <meshLambertMaterial color="#c2410c" />
        </mesh>
        <mesh position={[0.5, 0.7, 0.7]}>
          <sphereGeometry args={[0.12, 8, 6]} />
          <meshLambertMaterial color="#9a3412" />
        </mesh>
      </group>
      <Wheel at={[-0.48, 0.28, 0.75]} />
      <Wheel at={[0.48, 0.28, 0.75]} />
      <Wheel at={[-0.48, 0.28, -0.75]} />
      <Wheel at={[0.48, 0.28, -0.75]} />
      <mesh name="mirror" position={[0.62, 1.15, 0.72]}>
        <boxGeometry args={[0.12, 0.1, 0.16]} />
        <meshLambertMaterial color="#e5e7eb" />
      </mesh>
      <mesh name="gascap" position={[0.6, 0.7, -0.85]}>
        <boxGeometry args={[0.16, 0.12, 0.18]} />
        <meshLambertMaterial color="#94a3b8" />
      </mesh>
      <mesh name="cheese" position={[-0.15, 0.95, -0.35]} visible={false}>
        <boxGeometry args={[0.14, 0.08, 0.12]} />
        <meshLambertMaterial color="#facc15" />
      </mesh>
      <mesh name="fuelbar" position={[0.66, 0.95, -0.55]}>
        <boxGeometry args={[0.06, 0.06, 0.7]} />
        <meshBasicMaterial color="#facc15" />
      </mesh>
      <group name="head" position={[0.22, 1.15, 0.12]}>
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.2, 14, 12]} />
          <meshLambertMaterial color={look.skin} />
        </mesh>
        <mesh position={[-0.08, 0.26, 0.12]}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color="#fff" />
        </mesh>
        <mesh position={[0.08, 0.26, 0.12]}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial color="#fff" />
        </mesh>
        <mesh position={[-0.08, 0.26, 0.155]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial color="#111" />
        </mesh>
        <mesh position={[0.08, 0.26, 0.155]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial color="#111" />
        </mesh>
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[0.32, 0.28, 0.22]} />
          <meshLambertMaterial color={look.shirt} />
        </mesh>
        <mesh name="hat" position={[0, 0.4, 0]} visible={Boolean(look.hat)}>
          <cylinderGeometry args={[0.16, 0.18, 0.12, 10]} />
          <meshLambertMaterial color={look.hat ?? "#22c55e"} />
        </mesh>
        <group name="horns" visible={look.devil}>
          <mesh position={[-0.08, 0.4, 0]} rotation={[0, 0, 0.4]}>
            <coneGeometry args={[0.05, 0.22, 6]} />
            <meshLambertMaterial color="#ef4444" />
          </mesh>
          <mesh position={[0.08, 0.4, 0]} rotation={[0, 0, -0.4]}>
            <coneGeometry args={[0.05, 0.22, 6]} />
            <meshLambertMaterial color="#ef4444" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

function Wheel({ at }: { at: [number, number, number] }) {
  return (
    <group position={at} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.16, 12]} />
        <meshLambertMaterial color="#1f2937" />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.04, 10]} />
        <meshLambertMaterial color="#dbe4ee" />
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
    mesh.position.set(p.x, p.y, p.z);
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
      <planeGeometry args={[0.7, 0.7]} />
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
      m.position.set(b.x, b.y, b.z);
      const s = 0.7 + Math.min(0.8, b.amount / 180);
      m.scale.setScalar(s);
    }
  });
  return (
    <group ref={ref}>
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} visible={false}>
          <boxGeometry args={[0.28, 0.08, 0.16]} />
          <meshLambertMaterial color="#4ade80" />
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
    }
  });
  return (
    <group ref={ref}>
      {Array.from({ length: 16 }, (_, i) => (
        <mesh key={i} visible={false}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshLambertMaterial color={i % 2 ? "#22c55e" : "#facc15"} />
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
  });
  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[0.07, 8, 8]} />
      <meshBasicMaterial color="#facc15" />
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
    if (tool) tool.visible = sim.hold !== "none";
    const nozzle = g.getObjectByName("h-nozzle");
    const sponge = g.getObjectByName("h-sponge");
    const burger = g.getObjectByName("h-burger");
    const cap = g.getObjectByName("h-cap");
    const taser = g.getObjectByName("h-taser");
    const cash = g.getObjectByName("h-cash");
    const mirror = g.getObjectByName("h-mirror");
    if (nozzle) nozzle.visible = sim.hold === "nozzle";
    if (sponge) sponge.visible = sim.hold === "sponge";
    if (burger) burger.visible = sim.hold === "burger";
    if (cap) cap.visible = sim.hold === "cap";
    if (taser) taser.visible = sim.hold === "taser";
    if (cash) cash.visible = sim.hold === "cash";
    if (mirror) mirror.visible = sim.hold === "mirror";
    const charger = g.getObjectByName("h-charger");
    const hat = g.getObjectByName("h-hat") as Mesh | null;
    const cheese = g.getObjectByName("h-cheese");
    const horns = g.getObjectByName("h-horns");
    if (charger) charger.visible = sim.hold === "charger";
    if (hat) {
      hat.visible = sim.hold === "hat";
      const mat = hat.material;
      if (!Array.isArray(mat)) (mat as MeshBasicMaterial).color.set(sim.hatColor);
    }
    if (cheese) cheese.visible = sim.hold === "cheese";
    if (horns) horns.visible = sim.wornHorns;
    const bob = Math.sin(sim.clock * 2) * 0.01;
    g.position.y += bob;
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
      <mesh position={[-0.32, -0.28, -0.55]} rotation={[0.2, 0.2, 0.4]}>
        <boxGeometry args={[0.16, 0.08, 0.2]} />
        <meshLambertMaterial color="#ffc2a8" />
      </mesh>
      <mesh position={[0.34, -0.26, -0.52]} rotation={[0.3, -0.3, -0.2]}>
        <boxGeometry args={[0.18, 0.09, 0.22]} />
        <meshLambertMaterial color="#ffc2a8" />
      </mesh>
      <mesh name="poster" position={[-0.16, -0.02, -0.62]} visible={false}>
        <planeGeometry args={[0.34, 0.46]} />
        <meshBasicMaterial map={poster.tex} toneMapped={false} />
      </mesh>
      <group name="tool" position={[0.28, -0.18, -0.62]}>
        <group name="h-nozzle">
          <mesh rotation={[0, 0, 0.5]}>
            <boxGeometry args={[0.32, 0.08, 0.08]} />
            <meshLambertMaterial color="#111827" />
          </mesh>
          <mesh position={[0.16, 0.02, 0]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshLambertMaterial color="#22c55e" />
          </mesh>
        </group>
        <mesh name="h-sponge" visible={false}>
          <boxGeometry args={[0.2, 0.08, 0.14]} />
          <meshLambertMaterial color="#facc15" />
        </mesh>
        <mesh name="h-burger" visible={false}>
          <boxGeometry args={[0.16, 0.1, 0.14]} />
          <meshLambertMaterial color="#d97706" />
        </mesh>
        <mesh name="h-cap" visible={false}>
          <boxGeometry args={[0.14, 0.06, 0.12]} />
          <meshLambertMaterial color="#ef4444" />
        </mesh>
        <mesh name="h-taser" visible={false}>
          <boxGeometry args={[0.26, 0.1, 0.08]} />
          <meshLambertMaterial color="#2563eb" />
        </mesh>
        <mesh name="h-cash" visible={false}>
          <boxGeometry args={[0.2, 0.06, 0.12]} />
          <meshLambertMaterial color="#4ade80" />
        </mesh>
        <mesh name="h-mirror" visible={false}>
          <boxGeometry args={[0.14, 0.1, 0.08]} />
          <meshLambertMaterial color="#e5e7eb" />
        </mesh>
        <group name="h-charger" visible={false}>
          <mesh rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.26, 0.08, 0.08]} />
            <meshLambertMaterial color="#1d4ed8" />
          </mesh>
          <mesh position={[0.14, 0.02, 0]}>
            <boxGeometry args={[0.08, 0.1, 0.1]} />
            <meshLambertMaterial color="#38bdf8" />
          </mesh>
        </group>
        <mesh name="h-hat" visible={false}>
          <cylinderGeometry args={[0.1, 0.12, 0.08, 10]} />
          <meshLambertMaterial color="#facc15" />
        </mesh>
        <mesh name="h-cheese" visible={false}>
          <boxGeometry args={[0.12, 0.06, 0.1]} />
          <meshLambertMaterial color="#fde047" />
        </mesh>
      </group>
      <group name="h-horns" position={[0, 0.16, -0.42]} visible={false}>
        <mesh position={[-0.08, 0, 0]} rotation={[0.2, 0, 0.5]}>
          <coneGeometry args={[0.035, 0.16, 6]} />
          <meshLambertMaterial color="#ef4444" />
        </mesh>
        <mesh position={[0.08, 0, 0]} rotation={[0.2, 0, -0.5]}>
          <coneGeometry args={[0.035, 0.16, 6]} />
          <meshLambertMaterial color="#ef4444" />
        </mesh>
      </group>
    </group>
  );
}

function drawMonitor(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#5eead4";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#134e4a";
  ctx.font = "800 40px Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("WANTED FUEL", 28, 52);
  ctx.font = "700 28px Arial, sans-serif";
  ctx.fillText(`★ ${sim.stars.toFixed(1)}    ngày ${sim.day}`, 28, 96);
  ctx.font = "800 84px Arial, sans-serif";
  ctx.fillText(`$${sim.money}`, 28, 196);
  ctx.fillStyle = "#fbcfe8";
  ctx.fillRect(0, 230, w, h - 230);
  ctx.fillStyle = "#831843";
  ctx.font = "700 30px Arial, sans-serif";
  ctx.fillText(sim.customer ? `- ${sim.customer}` : "- quầy trống", 28, 278);
  ctx.font = "600 24px Arial, sans-serif";
  const tip = TIPS[sim.tipI] ?? "";
  wrap(ctx, tip, 28, 322, w - 56, 30);
  ctx.fillText(sim.review, 28, 382);
}

function drawPoster(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const face = WARRANTS[sim.warrant % WARRANTS.length]!;
  ctx.fillStyle = "#f8f1dc";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#d6c7a1";
  ctx.lineWidth = 8;
  for (let y = 150; y < 460; y += 28) {
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(w - 40, y);
    ctx.stroke();
  }
  ctx.fillStyle = "#dc2626";
  ctx.font = "800 78px Impact, Arial Black, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("WANTED", w / 2, 100);
  ctx.fillStyle = "#ffbea0";
  ctx.beginPath();
  ctx.arc(w / 2, 250, 78, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(w / 2 - 28, 246, 16, 0, Math.PI * 2);
  ctx.arc(w / 2 + 28, 246, 16, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.arc(w / 2 - 28, 248, 7, 0, Math.PI * 2);
  ctx.arc(w / 2 + 28, 248, 7, 0, Math.PI * 2);
  ctx.fill();
  if (face.hat) {
    ctx.fillStyle = face.hat;
    ctx.fillRect(w / 2 - 80, 175, 160, 36);
  }
  ctx.fillStyle = face.shirt;
  ctx.fillRect(w / 2 - 70, 330, 140, 90);
  ctx.fillStyle = "#111827";
  ctx.font = "800 36px Arial, sans-serif";
  ctx.fillText(face.name, w / 2, 500);
  ctx.fillStyle = "#b91c1c";
  ctx.font = "800 40px Arial, sans-serif";
  ctx.fillText(`$${face.bounty}`, w / 2, 560);
  ctx.fillStyle = "#44403c";
  ctx.font = "600 24px Arial, sans-serif";
  wrap(ctx, face.line, 36, 610, w - 72, 28);
  ctx.textAlign = "left";
}

function drawBubble(ctx: CanvasRenderingContext2D, c: Car) {
  const w = 256;
  const h = 256;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.ellipse(128, 112, 104, 78, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(100, 175);
  ctx.lineTo(80, 220);
  ctx.lineTo(140, 180);
  ctx.fill();
  ctx.fillStyle = "#111827";
  ctx.textAlign = "center";
  if (c.caught) {
    ctx.fillStyle = "#dc2626";
    ctx.font = "800 42px Arial";
    ctx.fillText("ĐÃ BẮT", 128, 124);
    return;
  }
  if (c.asleep) {
    ctx.font = "800 64px Arial";
    ctx.fillText("Zzz", 128, 130);
    return;
  }
  if (c.job === "fuel") {
    ctx.fillStyle = "#1d4ed8";
    ctx.fillRect(78, 78, 36, 54);
    ctx.fillStyle = "#111827";
    ctx.font = "800 42px Arial";
    ctx.fillText(c.grade === "diesel" ? "DẦU" : c.grade, 150, 122);
  } else if (c.job === "wash") {
    ctx.fillStyle = "#facc15";
    ctx.fillRect(78, 70, 100, 46);
    ctx.fillStyle = "#22c55e";
    ctx.fillRect(78, 108, 100, 36);
  } else if (c.job === "food") {
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.ellipse(128, 118, 58, 28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#65a30d";
    ctx.fillRect(80, 108, 96, 12);
    ctx.fillStyle = "#b45309";
    ctx.fillRect(80, 120, 96, 14);
  } else if (c.job === "charge") {
    ctx.fillStyle = "#2563eb";
    ctx.fillRect(96, 78, 34, 48);
    ctx.fillRect(104, 124, 18, 14);
    ctx.fillStyle = "#111827";
    ctx.font = "800 28px Arial";
    ctx.fillText("18 kWh", 128, 168);
  } else {
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(86, 78, 84, 58);
    ctx.fillStyle = "#fff";
    ctx.font = "800 28px Arial";
    ctx.fillText("NẮP", 128, 114);
  }
  if (c.wanted && sim.posterUp) {
    ctx.fillStyle = "#dc2626";
    ctx.font = "800 22px Arial";
    ctx.fillText("KHỚP", 128, 64);
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
