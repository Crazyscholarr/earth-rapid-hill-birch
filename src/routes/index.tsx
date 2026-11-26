import { createFileRoute } from "@tanstack/react-router";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState, useSyncExternalStore } from "react";
import { NoToneMapping } from "three";
import { Hud } from "@/game/Hud";
import { bindInput, isCoarse } from "@/game/input";
import { attachProbe, bootAudioOnGesture, getSnap, onLockChange, requestLock, sim, subscribe } from "@/game/sim";
import { Scene } from "@/game/World";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [on, setOn] = useState(false);
  const [mobile, setMobile] = useState(false);
  const snap = useSyncExternalStore(subscribe, getSnap, getSnap);
  useEffect(() => {
    setMobile(isCoarse());
    setOn(true);
    attachProbe();
    const off = bindInput();
    const lock = () => onLockChange(document.pointerLockElement != null);
    document.addEventListener("pointerlockchange", lock);
    const gesture = () => bootAudioOnGesture();
    window.addEventListener("pointerdown", gesture, { passive: true });
    return () => {
      off();
      document.removeEventListener("pointerlockchange", lock);
      window.removeEventListener("pointerdown", gesture);
    };
  }, []);
  const high = snap.quality === "high";
  return (
    <main
      className="relative h-dvh w-full overflow-hidden bg-ink text-cream"
      onPointerDown={(e) => {
        if (sim.phase !== "play") return;
        const t = e.target as HTMLElement | null;
        if (t?.closest("[data-ui]")) return;
        requestLock();
      }}
    >
      {on ? (
        <Canvas
          className="absolute inset-0 touch-none"
          shadows={false}
          dpr={high ? (mobile ? [1, 1.25] : [1, 1.2]) : mobile ? [0.75, 0.95] : [0.8, 1]}
          camera={{ fov: 64, near: 0.1, far: 165, position: [8, 5, 12] }}
          gl={{
            antialias: high && !mobile,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            alpha: false,
            toneMapping: NoToneMapping,
          }}
        >
          <Scene />
        </Canvas>
      ) : null}
      <Hud />
    </main>
  );
}
