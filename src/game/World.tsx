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
  ShaderMaterial,
  SphereGeometry,
  Vector3,
  type AmbientLight,
  type DirectionalLight,
  type PointLight,
} from "three";
import { LiveCar } from "@/game/models/CarModel";
import { Bills, Bits, Bubble, Hands, Marker } from "@/game/models/HandModels";
import { Station } from "@/game/models/StationModels";
import { sim, tick } from "@/game/sim";
import { createSkyPanoramaTexture, paint } from "@/game/textures";

const SKY_VERT = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SKY_FRAG = /* glsl */ `
  varying vec3 vDir;
  uniform sampler2D uSkyTex;
  uniform float uNight;
  uniform float uTime;
  uniform vec3 uSunDir;

  void main() {
    vec3 d = normalize(vDir);
    // Equirectangular UV lookup into pre-baked painterly sky & cloud panorama (1 single texture read!)
    float u = atan(d.z, d.x) * 0.15915494 + 0.5 + uTime * 0.0018;
    float v = clamp(0.5 + d.y * 0.5, 0.01, 0.99);
    vec3 col = texture2D(uSkyTex, vec2(u, v)).rgb;

    float duskAmt = smoothstep(0.0, 0.45, uNight) * (1.0 - smoothstep(0.45, 0.95, uNight));
    float darkAmt = smoothstep(0.35, 1.0, uNight);

    // Warm sunset tint & crisp night darkening
    vec3 duskTint = mix(vec3(1.15, 0.62, 0.36), vec3(0.55, 0.42, 0.68), clamp(d.y * 1.8, 0.0, 1.0));
    col = mix(col, col * duskTint * 1.18, duskAmt);
    col = mix(col, col * vec3(0.05, 0.08, 0.17), darkAmt);

    // Solar halo & crisp sun disc
    float sunDot = max(dot(d, uSunDir), 0.0);
    float sunVis = 1.0 - darkAmt;
    col += vec3(1.0, 0.8, 0.5) * (sunDot * sunDot * sunDot * sunDot) * 0.22 * sunVis;
    col += vec3(1.0, 0.96, 0.84) * smoothstep(0.998, 0.9995, sunDot) * 1.35 * sunVis;

    gl_FragColor = vec4(col, 1.0);
  }
`;

declare global {
  interface Window {
    __perfStats?: { calls: number; triangles: number; geometries: number; textures: number };
  }
}

export function Scene() {
  return (
    <>
      <Rig />
      <Lights />
      <SkyDome />
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
  const fogCol = useMemo(() => new Color("#dfc9ae"), []);
  const dayFog = useMemo(() => new Color("#dfc9ae"), []);
  const duskFog = useMemo(() => new Color("#dc8b5e"), []);
  const nightFog = useMemo(() => new Color("#151b2e"), []);

  useEffect(() => {
    scene.fog = new Fog("#dfc9ae", 34, 116);
    const pmrem = new PMREMGenerator(gl);
    const envScene = new ThreeScene();
    const envTex = paint((ctx, w, h) => {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#2968ad");
      g.addColorStop(0.36, "#7ab2de");
      g.addColorStop(0.49, "#f5e3c8");
      g.addColorStop(0.53, "#c79663");
      g.addColorStop(1, "#69492c");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(w * 0.72, h * 0.26, 6, 0, Math.PI * 2);
      ctx.fill();
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
    if (n < 0.45) fogCol.copy(dayFog).lerp(duskFog, n / 0.45);
    else fogCol.copy(duskFog).lerp(nightFog, (n - 0.45) / 0.55);
    const fog = scene.fog;
    if (fog && "color" in fog) {
      fog.color.copy(fogCol);
      if ("far" in fog) fog.far = 116 - n * 40;
    }
    window.__perfStats = {
      calls: gl.info.render.calls,
      triangles: gl.info.render.triangles,
      geometries: gl.info.memory.geometries,
      textures: gl.info.memory.textures,
    };
    if (sim.phase === "title") {
      const a = sim.orbit;
      camera.position.set(Math.sin(a) * 1.6 - 0.6, 2.45, 7.8 + Math.cos(a) * 0.65);
      camera.lookAt(-0.3, 1.15, 1.1);
      return;
    }
    const bob = Math.sin(sim.clock * 9) * Math.min(0.028, sim.speed * 0.0065);
    camera.position.set(sim.player.x, 1.58 + bob, sim.player.z);
    camera.rotation.order = "YXZ";
    camera.rotation.y = sim.player.yaw;
    camera.rotation.x = sim.player.pitch;
    camera.rotation.z = 0;
  });

  return null;
}

function SkyDome() {
  const meshRef = useRef<Mesh>(null);
  const skyTex = useMemo(() => createSkyPanoramaTexture(), []);
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: SKY_VERT,
        fragmentShader: SKY_FRAG,
        side: BackSide,
        depthWrite: false,
        uniforms: {
          uSkyTex: { value: skyTex },
          uNight: { value: 0 },
          uTime: { value: 0 },
          uSunDir: { value: new Vector3(0.55, 0.42, 0.45).normalize() },
        },
      }),
    [skyTex],
  );

  useFrame((state) => {
    mat.uniforms.uNight!.value = sim.night;
    mat.uniforms.uTime!.value = sim.clock;
    if (meshRef.current) meshRef.current.position.copy(state.camera.position);
  });

  return (
    <mesh ref={meshRef} material={mat} frustumCulled={false} renderOrder={-10}>
      <sphereGeometry args={[142, 24, 16]} />
    </mesh>
  );
}

function Lights() {
  const sun = useRef<DirectionalLight>(null);
  const amb = useRef<AmbientLight>(null);
  const lamp = useRef<PointLight>(null);

  useFrame(() => {
    const n = sim.night;
    if (sun.current) {
      sun.current.intensity = 2.05 * (1 - n * 0.84);
      sun.current.color.set(n > 0.2 ? "#ffbe7b" : "#fff2dc");
    }
    if (amb.current) amb.current.intensity = 0.4 - n * 0.2;
    if (lamp.current) {
      // Disable point light completely during daytime so fragment shaders evaluate 0 point lights!
      lamp.current.visible = n > 0.04;
      if (n > 0.04) lamp.current.intensity = n * 5.2;
    }
  });

  return (
    <>
      <hemisphereLight args={["#cfe5f7", "#a8794d", 0.65]} />
      <ambientLight ref={amb} intensity={0.4} />
      <directionalLight
        ref={sun}
        position={[18, 22, 15]}
        intensity={2.05}
        color="#fff2dc"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={52}
        shadow-camera-left={-11.5}
        shadow-camera-right={11.5}
        shadow-camera-top={11.5}
        shadow-camera-bottom={-11.5}
        shadow-bias={-0.0005}
      />
      <pointLight ref={lamp} visible={false} position={[0, 3.7, 1.8]} distance={20} decay={2} intensity={0} color="#ffdfa8" />
    </>
  );
}
