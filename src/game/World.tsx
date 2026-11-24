import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  BackSide,
  Color,
  Fog,
  Mesh,
  MeshBasicMaterial,
  PMREMGenerator,
  Scene as ThreeScene,
  SphereGeometry,
  type AmbientLight,
  type DirectionalLight,
  type Group,
  type PointLight,
} from "three";
import { LiveCar } from "@/game/models/CarModel";
import { Bills, Bits, Bubble, Hands, Marker } from "@/game/models/HandModels";
import { Station } from "@/game/models/StationModels";
import { sim, tick } from "@/game/sim";
import { paint } from "@/game/textures";

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
  const { camera, scene, gl } = useThree();
  const bg = useMemo(() => new Color("#b8d4e3"), []);
  const day = useMemo(() => new Color("#b8d4e3"), []);
  const dusk = useMemo(() => new Color("#e29d76"), []);
  const night = useMemo(() => new Color("#14192d"), []);

  useEffect(() => {
    scene.fog = new Fog("#b8d4e3", 24, 90);
    // Lightweight sky-to-desert environment map for realistic car clearcoat, chrome & glass reflections
    const pmrem = new PMREMGenerator(gl);
    const envScene = new ThreeScene();
    const envTex = paint((ctx, w, h) => {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#7ab4d6");
      g.addColorStop(0.48, "#e6edf2");
      g.addColorStop(0.52, "#d1a878");
      g.addColorStop(1, "#7c5838");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }, 128, 64).tex;
    const dome = new Mesh(new SphereGeometry(10, 16, 12), new MeshBasicMaterial({ map: envTex, side: BackSide }));
    envScene.add(dome);
    const rt = pmrem.fromScene(envScene);
    scene.environment = rt.texture;
    return () => {
      rt.dispose();
      envTex.dispose();
      pmrem.dispose();
    };
  }, [scene, gl]);

  useFrame((_, dt) => {
    tick(Math.min(0.05, dt));
    const n = sim.night;
    if (n < 0.4) bg.copy(day).lerp(dusk, n / 0.4);
    else bg.copy(dusk).lerp(night, (n - 0.4) / 0.6);
    scene.background = bg;
    const fog = scene.fog;
    if (fog && "color" in fog) {
      fog.color.copy(bg);
      if ("far" in fog) fog.far = 90 - n * 34;
    }
    if (sim.phase === "title") {
      const a = sim.orbit;
      camera.position.set(Math.sin(a) * 1.4 - 0.8, 2.55, 7.6 + Math.cos(a) * 0.6);
      camera.lookAt(-0.4, 1.05, 1.4);
      return;
    }
    const bob = Math.sin(sim.clock * 9) * Math.min(0.03, sim.speed * 0.007);
    camera.position.set(sim.player.x, 1.58 + bob, sim.player.z);
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
      sun.current.intensity = 1.4 * (1 - n * 0.8);
      sun.current.color.set(n > 0.2 ? "#ffcf99" : "#fff5e4");
    }
    if (amb.current) amb.current.intensity = 0.5 - n * 0.28;
    if (lamp.current) lamp.current.intensity = 0.45 + n * 4.4;
    if (pumpLamp.current) pumpLamp.current.intensity = 0.25 + n * 2.5;
  });

  return (
    <>
      <hemisphereLight args={["#dcebf7", "#b88c5c", 0.68]} />
      <ambientLight ref={amb} intensity={0.5} />
      <directionalLight
        ref={sun}
        position={[18, 24, 12]}
        intensity={1.4}
        color="#fff5e4"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={56}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
        shadow-bias={-0.0005}
      />
      <pointLight ref={lamp} position={[0, 3.6, 2.2]} distance={18} decay={2} intensity={0.45} color="#ffdfa8" />
      <pointLight ref={pumpLamp} position={[-1.8, 2.8, -3.2]} distance={14} decay={2} intensity={0.25} color="#ffd089" />
    </>
  );
}

function SkyDecor() {
  const clouds = useRef<Group>(null);
  useFrame(() => {
    if (clouds.current) {
      clouds.current.position.x = ((sim.clock * 0.35) % 44) - 22;
    }
  });
  return (
    <group>
      <mesh position={[28, 24, -44]}>
        <sphereGeometry args={[3.2, 16, 16]} />
        <meshBasicMaterial color="#fde6b8" />
      </mesh>
      <group ref={clouds}>
        {[
          [-16, 16, -26, 1.4],
          [4, 18, -30, 1.7],
          [22, 15, -24, 1.2],
        ].map(([x, y, z, s], i) => (
          <group key={i} position={[x!, y!, z!]} scale={s}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[1.4, 10, 8]} />
              <meshBasicMaterial color="#f5efe6" transparent opacity={0.8} />
            </mesh>
            <mesh position={[1.2, -0.2, 0.2]}>
              <sphereGeometry args={[1.05, 10, 8]} />
              <meshBasicMaterial color="#f5efe6" transparent opacity={0.8} />
            </mesh>
            <mesh position={[-1.1, -0.25, -0.1]}>
              <sphereGeometry args={[0.95, 10, 8]} />
              <meshBasicMaterial color="#f5efe6" transparent opacity={0.8} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
