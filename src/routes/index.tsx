import { createFileRoute } from "@tanstack/react-router";
import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
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
          dpr={[1, 1.75]}
          camera={{ fov: 72, near: 0.08, far: 140, position: [8, 5, 12] }}
          gl={{ antialias: true }}
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
