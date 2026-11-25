import { createFileRoute } from "@tanstack/react-router";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { ACESFilmicToneMapping } from "three";
import { Hud } from "@/game/Hud";
import { bindInput } from "@/game/input";
import { attachProbe, bootAudioOnGesture, onLockChange, requestLock, sim } from "@/game/sim";
import { Scene } from "@/game/World";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    setOn(true);
    attachProbe();
    const off = bindInput();
    const lock = () => onLockChange(document.pointerLockElement != null);
    document.addEventListener("pointerlockchange", lock);
    const gesture = () => bootAudioOnGesture();
    window.addEventListener("pointerdown", gesture);
    return () => {
      off();
      document.removeEventListener("pointerlockchange", lock);
      window.removeEventListener("pointerdown", gesture);
    };
  }, []);
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-ink text-cream">
      {on ? (
        <Canvas
          className="absolute inset-0 touch-none"
          shadows
          dpr={[1, 1.25]}
          camera={{ fov: 64, near: 0.08, far: 175, position: [8, 5, 12] }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            stencil: false,
            toneMapping: ACESFilmicToneMapping,
            toneMappingExposure: 1.0,
          }}
          onPointerDown={() => {
            if (sim.phase === "play") requestLock();
          }}
        >
          <Scene />
        </Canvas>
      ) : null}
      <Hud />
    </main>
  );
}
