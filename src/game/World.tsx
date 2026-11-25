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
import { paint } from "@/game/textures";

const SKY_VERT = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SKY_FRAG = /* glsl */ `
  varying vec3 vDir;
  uniform float uNight;
  uniform float uTime;
  uniform vec3 uSunDir;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    v += 0.55 * noise(p);
    v += 0.30 * noise(p * 2.15 + vec2(3.7, 1.9));
    v += 0.15 * noise(p * 4.4 - vec2(1.2, 5.1));
    return v;
  }

  void main() {
    vec3 d = normalize(vDir);
    float h = clamp(d.y, 0.0, 1.0);

    // Day palette: rich desert azure zenith -> crisp sky -> warm sandy golden horizon haze
    vec3 dayZenith = vec3(0.16, 0.42, 0.72);
    vec3 dayMid = vec3(0.46, 0.68, 0.88);
    vec3 dayHorizon = vec3(0.91, 0.81, 0.68);

    // Dusk transition palette
    vec3 duskZenith = vec3(0.14, 0.20, 0.42);
    vec3 duskMid = vec3(0.68, 0.38, 0.32);
    vec3 duskHorizon = vec3(0.94, 0.56, 0.32);

    // Clear desert night palette
    vec3 nightZenith = vec3(0.02, 0.04, 0.10);
    vec3 nightMid = vec3(0.05, 0.08, 0.17);
    vec3 nightHorizon = vec3(0.10, 0.13, 0.24);

    float duskAmt = smoothstep(0.0, 0.45, uNight) * (1.0 - smoothstep(0.45, 0.95, uNight));
    float darkAmt = smoothstep(0.35, 1.0, uNight);

    vec3 zenith = mix(mix(dayZenith, duskZenith, duskAmt), nightZenith, darkAmt);
    vec3 mid = mix(mix(dayMid, duskMid, duskAmt), nightMid, darkAmt);
    vec3 horizon = mix(mix(dayHorizon, duskHorizon, duskAmt), nightHorizon, darkAmt);

    vec3 col = mix(horizon, mid, smoothstep(0.0, 0.26, h));
    col = mix(col, zenith, smoothstep(0.22, 0.82, h));

    // Solar Mie scattering & sun disc
    float sunDot = max(dot(d, normalize(uSunDir)), 0.0);
    float sunVis = 1.0 - darkAmt;
    col += vec3(1.0, 0.78, 0.48) * pow(sunDot, 7.0) * 0.28 * sunVis;
    col += vec3(1.0, 0.95, 0.82) * smoothstep(0.9982, 0.9996, sunDot) * 1.4 * sunVis;

    // Wispy high-altitude desert cirrus & cumulus clouds
    if (d.y > 0.03) {
      vec2 uv = d.xz / (d.y + 0.18) * 1.35 + vec2(uTime * 0.008, uTime * 0.003);
      float c = fbm(uv);
      float cloudMask = smoothstep(0.52, 0.82, c) * smoothstep(0.03, 0.22, d.y);
      vec3 cloudCol = mix(vec3(0.99, 0.96, 0.92), vec3(0.98, 0.68, 0.46), duskAmt);
      cloudCol = mix(cloudCol, vec3(0.14, 0.17, 0.28), darkAmt);
      col = mix(col, cloudCol, cloudMask * 0.58);
    }

    // Subtle stars at night
    if (darkAmt > 0.2 && d.y > 0.1) {
      float s = hash(floor(d.xz / (d.y + 0.4) * 240.0));
      float star = smoothstep(0.9965, 0.9995, s) * darkAmt * smoothstep(0.1, 0.4, d.y);
      col += vec3(0.85, 0.9, 1.0) * star * 0.85;
    }

    // Ground bounce below horizon
    if (d.y < 0.0) {
      col = mix(horizon, vec3(0.45, 0.34, 0.22) * (1.0 - darkAmt * 0.85), clamp(-d.y * 4.0, 0.0, 1.0));
    }

    gl_FragColor = vec4(col, 1.0);
  }
`;

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
    scene.fog = new Fog("#dfc9ae", 34, 118);
    // Crisp HDR-like desert reflection environment map for automotive clearcoat, chrome & glass
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
      // Bright sun specular highlight in env map so metallic car bodywork gleams naturally
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(w * 0.72, h * 0.26, 6, 0, Math.PI * 2);
      ctx.fill();
    }, 256, 128).tex;
    const dome = new Mesh(new SphereGeometry(10, 20, 14), new MeshBasicMaterial({ map: envTex, side: BackSide }));
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
      if ("far" in fog) fog.far = 118 - n * 42;
    }
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
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: SKY_VERT,
        fragmentShader: SKY_FRAG,
        side: BackSide,
        depthWrite: false,
        uniforms: {
          uNight: { value: 0 },
          uTime: { value: 0 },
          uSunDir: { value: new Vector3(0.55, 0.42, 0.45).normalize() },
        },
      }),
    [],
  );

  useFrame((state) => {
    mat.uniforms.uNight!.value = sim.night;
    mat.uniforms.uTime!.value = sim.clock;
    // Keep sky dome centered on camera
    state.scene.getObjectByName("sky-dome")?.position.copy(state.camera.position);
  });

  return (
    <mesh name="sky-dome" material={mat} frustumCulled={false} renderOrder={-10}>
      <sphereGeometry args={[142, 32, 24]} />
    </mesh>
  );
}

function Lights() {
  const sun = useRef<DirectionalLight>(null);
  const amb = useRef<AmbientLight>(null);
  const lamp = useRef<PointLight>(null);
  const pumpLamp = useRef<PointLight>(null);

  useFrame(() => {
    const n = sim.night;
    if (sun.current) {
      sun.current.intensity = 2.05 * (1 - n * 0.84);
      sun.current.color.set(n > 0.2 ? "#ffbe7b" : "#fff2dc");
    }
    if (amb.current) amb.current.intensity = 0.36 - n * 0.2;
    if (lamp.current) lamp.current.intensity = 0.65 + n * 4.8;
    if (pumpLamp.current) pumpLamp.current.intensity = 0.4 + n * 3.0;
  });

  return (
    <>
      <hemisphereLight args={["#cfe5f7", "#a8794d", 0.62]} />
      <ambientLight ref={amb} intensity={0.36} />
      <directionalLight
        ref={sun}
        position={[20, 24, 16]}
        intensity={2.05}
        color="#fff2dc"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={68}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.0004}
      />
      <pointLight ref={lamp} position={[0, 3.7, 1.8]} distance={20} decay={2} intensity={0.65} color="#ffdfa8" />
      <pointLight ref={pumpLamp} position={[-1.4, 2.8, -3.1]} distance={16} decay={2} intensity={0.4} color="#ffd089" />
    </>
  );
}
