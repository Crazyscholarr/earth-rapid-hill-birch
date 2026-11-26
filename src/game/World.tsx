import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  BackSide,
  Color,
  Fog,
  type AmbientLight,
  type DirectionalLight,
  type Mesh,
  type MeshBasicMaterial,
  type Object3D,
  type PointLight,
} from "three";
import { LiveCar } from "@/game/models/CarModel";
import { Bills, Bits, Bubble, Hands, Marker } from "@/game/models/HandModels";
import { Station } from "@/game/models/StationModels";
import { sim, tick } from "@/game/sim";
import { createSkyPanoramaTexture } from "@/game/textures";

declare global {
  interface Window {
    __perfStats?: {
      calls: number;
      triangles: number;
      geometries: number;
      textures: number;
      fps: number;
      frameMs: number;
      dpr: number;
      renderer: string;
      software: boolean;
    };
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

function detectSoftwareRenderer(glContext: WebGLRenderingContext | WebGL2RenderingContext): {
  renderer: string;
  software: boolean;
} {
  try {
    const ext = glContext.getExtension("WEBGL_debug_renderer_info");
    const raw = ext ? String(glContext.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? "") : String(glContext.getParameter(glContext.RENDERER) ?? "");
    const software = /SwiftShader|Basic Render|WARP|llvmpipe|Software|Lavapipe/i.test(raw);
    return { renderer: raw, software };
  } catch {
    return { renderer: "unknown", software: false };
  }
}

function Rig() {
  const { camera, scene, gl, setEvents } = useThree();
  const fogCol = useMemo(() => new Color("#dfc9ae"), []);
  const dayFog = useMemo(() => new Color("#dfc9ae"), []);
  const duskFog = useMemo(() => new Color("#dc8b5e"), []);
  const nightFog = useMemo(() => new Color("#151b2e"), []);
  const prevNightRef = useRef(-1);
  const fpsAcc = useRef({ frames: 0, elapsed: 0, dpr: 1, renderer: "", software: false, warmed: false });

  useEffect(() => {
    // Disable R3F pointer raycasting across 3D scene meshes — aiming is 100% analytical in sim.ts!
    setEvents({ enabled: false });
    scene.fog = new Fog("#dfc9ae", 34, 114);
    scene.environment = null;

    const info = detectSoftwareRenderer(gl.getContext());
    fpsAcc.current.renderer = info.renderer;
    fpsAcc.current.software = info.software;
    sim.softwareGpu = info.software;

    const baseDpr =
      sim.quality === "high"
        ? Math.min(window.devicePixelRatio || 1, 1.25)
        : info.software
          ? 0.85
          : Math.min(window.devicePixelRatio || 1, 1.0);
    gl.setPixelRatio(baseDpr);
    fpsAcc.current.dpr = baseDpr;
  }, [gl, scene, setEvents]);

  useFrame((_, rawDt) => {
    // One-time pre-warm after all children mount: force-upload every hidden tool VBO/texture & pre-compile all shaders!
    if (!fpsAcc.current.warmed) {
      fpsAcc.current.warmed = true;
      const hidden: Object3D[] = [];
      scene.traverse((obj) => {
        if (!obj.visible) {
          hidden.push(obj);
          obj.visible = true;
        }
      });
      gl.compile(scene, camera);
      for (let i = 0; i < hidden.length; i++) hidden[i]!.visible = false;
    }

    const dt = Math.min(0.05, rawDt);
    tick(dt);

    // Update horizon fog only when night factor actually shifts
    const n = sim.night;
    if (Math.abs(n - prevNightRef.current) > 0.004) {
      prevNightRef.current = n;
      if (n < 0.45) fogCol.copy(dayFog).lerp(duskFog, n / 0.45);
      else fogCol.copy(duskFog).lerp(nightFog, (n - 0.45) / 0.55);
      const fog = scene.fog;
      if (fog && "color" in fog) {
        fog.color.copy(fogCol);
        if ("far" in fog) fog.far = 114 - n * 38;
      }
    }

    // Rolling FPS meter & automatic DPR governor so camera rotation stays silky smooth on any PC/phone
    const st = fpsAcc.current;
    st.frames += 1;
    st.elapsed += rawDt;
    if (st.elapsed >= 0.55) {
      const fps = Math.round(st.frames / st.elapsed);
      const frameMs = Math.round((st.elapsed / st.frames) * 10000) / 10;
      sim.fps = fps;
      if (sim.quality === "fast") {
        const minDpr = st.software ? 0.78 : 0.8;
        if (fps < 42 && st.dpr > minDpr) {
          st.dpr = Math.max(minDpr, Math.round((st.dpr - 0.08) * 100) / 100);
          gl.setPixelRatio(st.dpr);
        } else if (!st.software && fps >= 57 && st.dpr < 1.0) {
          st.dpr = Math.min(1.0, Math.round((st.dpr + 0.05) * 100) / 100);
          gl.setPixelRatio(st.dpr);
        }
      } else {
        const target = Math.min(window.devicePixelRatio || 1, 1.2);
        if (Math.abs(st.dpr - target) > 0.04) {
          st.dpr = target;
          gl.setPixelRatio(target);
        }
      }
      window.__perfStats = {
        calls: gl.info.render.calls,
        triangles: gl.info.render.triangles,
        geometries: gl.info.memory.geometries,
        textures: gl.info.memory.textures,
        fps,
        frameMs,
        dpr: st.dpr,
        renderer: st.renderer,
        software: st.software,
      };
      st.frames = 0;
      st.elapsed = 0;
    } else if (!window.__perfStats) {
      window.__perfStats = {
        calls: gl.info.render.calls,
        triangles: gl.info.render.triangles,
        geometries: gl.info.memory.geometries,
        textures: gl.info.memory.textures,
        fps: sim.fps,
        frameMs: Math.round(rawDt * 10000) / 10,
        dpr: st.dpr,
        renderer: st.renderer,
        software: st.software,
      };
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
  const meshRef = useRef<Mesh>(null);
  const matRef = useRef<MeshBasicMaterial>(null);
  const skyTex = useMemo(() => createSkyPanoramaTexture(), []);
  const dayTint = useMemo(() => new Color("#ffffff"), []);
  const duskTint = useMemo(() => new Color("#eb9f78"), []);
  const nightTint = useMemo(() => new Color("#121a30"), []);
  const curTint = useMemo(() => new Color("#ffffff"), []);
  const lastNight = useRef(-1);

  useFrame((state) => {
    const m = meshRef.current;
    if (m) {
      m.position.copy(state.camera.position);
      m.rotation.y = sim.clock * 0.011;
    }
    const n = sim.night;
    if (matRef.current && Math.abs(n - lastNight.current) > 0.005) {
      lastNight.current = n;
      if (n < 0.45) curTint.copy(dayTint).lerp(duskTint, n / 0.45);
      else curTint.copy(duskTint).lerp(nightTint, (n - 0.45) / 0.55);
      matRef.current.color.copy(curTint);
    }
  });

  return (
    <mesh ref={meshRef} frustumCulled={false} renderOrder={-10}>
      <sphereGeometry args={[142, 16, 10]} />
      <meshBasicMaterial ref={matRef} map={skyTex} side={BackSide} depthWrite={false} fog={false} />
    </mesh>
  );
}

function Lights() {
  const sun = useRef<DirectionalLight>(null);
  const amb = useRef<AmbientLight>(null);
  const lamp = useRef<PointLight>(null);
  const lastNight = useRef(-1);

  useFrame(() => {
    const n = sim.night;
    if (Math.abs(n - lastNight.current) < 0.005) return;
    lastNight.current = n;
    if (sun.current) {
      sun.current.intensity = 1.95 * (1 - n * 0.82);
      sun.current.color.set(n > 0.2 ? "#ffbe7b" : "#fff5e6");
    }
    if (amb.current) amb.current.intensity = 0.54 - n * 0.24;
    if (lamp.current) {
      lamp.current.visible = n > 0.04;
      if (n > 0.04) lamp.current.intensity = n * 4.8;
    }
  });

  return (
    <>
      <hemisphereLight args={["#dceeff", "#b5895a", 1.02]} />
      <ambientLight ref={amb} intensity={0.54} />
      <directionalLight ref={sun} position={[16, 21, 14]} intensity={1.95} color="#fff5e6" />
      <pointLight ref={lamp} visible={false} position={[0, 3.7, 1.8]} distance={20} decay={2} intensity={0} color="#ffdfa8" />
    </>
  );
}
