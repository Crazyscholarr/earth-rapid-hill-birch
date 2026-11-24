export const input = {
  keys: new Set<string>(),
  lookX: 0,
  lookY: 0,
  shootHeld: false,
  interactHeld: false,
  interactPulse: false,
  dropPulse: false,
  touchX: 0,
  touchY: 0,
  padX: 0,
  padY: 0,
  padLookX: 0,
  padLookY: 0,
  padShoot: false,
  padInteract: false,
  padBarrier: false,
  padRed: false,
  padWeapon: false,
  padPart: false,
  wheel: 0,
};

const BLOCK = new Set([
  "Space",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Tab",
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
]);

let lookId: number | null = null;
let lastX = 0;
let lastY = 0;

function coarse() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function dead(x: number, y: number, dz = 0.18) {
  const m = Math.hypot(x, y);
  if (m < dz) return [0, 0] as const;
  const s = (m - dz) / ((1 - dz) * m);
  return [x * s, y * s] as const;
}

export function pollPad() {
  const pads = navigator.getGamepads?.();
  const p = pads?.[0];
  if (!p) {
    input.padX = 0;
    input.padY = 0;
    input.padLookX = 0;
    input.padLookY = 0;
    input.padShoot = false;
    input.padInteract = false;
    input.padBarrier = false;
    input.padRed = false;
    input.padWeapon = false;
    input.padPart = false;
    return;
  }
  const [mx, my] = dead(p.axes[0] ?? 0, p.axes[1] ?? 0);
  const [lx, ly] = dead(p.axes[2] ?? 0, p.axes[3] ?? 0);
  input.padX = mx;
  input.padY = my;
  input.padLookX = lx * 22;
  input.padLookY = ly * 14;
  const hit = (i: number) => Boolean(p.buttons[i]?.pressed);
  input.padInteract = hit(0);
  input.padRed = hit(1);
  input.padBarrier = hit(2);
  input.padWeapon = hit(3);
  input.padPart = hit(4);
  input.padShoot = (p.buttons[7]?.value ?? 0) > 0.4 || hit(7);
}

export function bindInput() {
  const down = (e: KeyboardEvent) => {
    input.keys.add(e.code);
    if (BLOCK.has(e.code)) e.preventDefault();
  };
  const up = (e: KeyboardEvent) => {
    input.keys.delete(e.code);
  };
  const blur = () => {
    input.keys.clear();
    input.shootHeld = false;
    input.interactHeld = false;
  };
  const move = (e: MouseEvent) => {
    if (document.pointerLockElement) {
      input.lookX += e.movementX;
      input.lookY += e.movementY;
    }
  };
  const mouseDown = (e: MouseEvent) => {
    if (e.button === 0 && document.pointerLockElement) input.shootHeld = true;
    if (e.button === 2 && document.pointerLockElement) input.dropPulse = true;
  };
  const mouseUp = (e: MouseEvent) => {
    if (e.button === 0) input.shootHeld = false;
  };
  const ctxMenu = (e: MouseEvent) => {
    if (document.pointerLockElement) e.preventDefault();
  };
  const wheel = (e: WheelEvent) => {
    if (document.pointerLockElement) {
      input.wheel += Math.sign(e.deltaY);
      e.preventDefault();
    }
  };
  const vis = () => {
    if (document.hidden) blur();
  };
  const pdown = (e: PointerEvent) => {
    if (!coarse()) return;
    const t = e.target as HTMLElement | null;
    if (t?.closest("[data-ui]")) return;
    if (e.clientX < window.innerWidth * 0.42) return;
    lookId = e.pointerId;
    lastX = e.clientX;
    lastY = e.clientY;
  };
  const pmove = (e: PointerEvent) => {
    if (e.pointerId !== lookId) return;
    input.lookX += (e.clientX - lastX) * 1.35;
    input.lookY += (e.clientY - lastY) * 1.35;
    lastX = e.clientX;
    lastY = e.clientY;
  };
  const pup = (e: PointerEvent) => {
    if (e.pointerId === lookId) lookId = null;
  };

  window.addEventListener("keydown", down);
  window.addEventListener("keyup", up);
  window.addEventListener("blur", blur);
  window.addEventListener("mousemove", move);
  window.addEventListener("mousedown", mouseDown);
  window.addEventListener("mouseup", mouseUp);
  window.addEventListener("contextmenu", ctxMenu);
  window.addEventListener("wheel", wheel, { passive: false });
  window.addEventListener("visibilitychange", vis);
  window.addEventListener("pointerdown", pdown);
  window.addEventListener("pointermove", pmove);
  window.addEventListener("pointerup", pup);
  window.addEventListener("pointercancel", pup);
  return () => {
    window.removeEventListener("keydown", down);
    window.removeEventListener("keyup", up);
    window.removeEventListener("blur", blur);
    window.removeEventListener("mousemove", move);
    window.removeEventListener("mousedown", mouseDown);
    window.removeEventListener("mouseup", mouseUp);
    window.removeEventListener("contextmenu", ctxMenu);
    window.removeEventListener("wheel", wheel);
    window.removeEventListener("visibilitychange", vis);
    window.removeEventListener("pointerdown", pdown);
    window.removeEventListener("pointermove", pmove);
    window.removeEventListener("pointerup", pup);
    window.removeEventListener("pointercancel", pup);
  };
}

export function isCoarse() {
  return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}
