import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Color, Fog, type AmbientLight, type DirectionalLight, type Group, type PointLight } from "three";
import { LiveCar } from "@/game/models/CarModel";
import { Bills, Bits, Bubble, Hands, Marker } from "@/game/models/HandModels";
import { Station } from "@/game/models/StationModels";
import { sim, tick } from "@/game/sim";

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
      camera.position.set(-5.2 + Math.sin(a) * 2.6, 2.65, 5.4 + Math.cos(a) * 1.4);
      camera.lookAt(-1.8, 1.15, 0.55);
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
      clouds.current.position.x = ((sim.clock * 0.35) % 40) - 20;
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
