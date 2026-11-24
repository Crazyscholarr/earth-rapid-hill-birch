import { unlockAudio, resumeAudio, setVolume, sfx } from "@/game/audio";
import { CAR_COLORS, GRADES, NAMES, SHOP, TIPS, WARRANTS, type FaceId, type Grade, type Job } from "@/game/content";
import { input, isCoarse, pollPad } from "@/game/input";

export type Phase = "title" | "play" | "pause" | "shop";
export type Hold = "none" | "nozzle" | "sponge" | "burger" | "cap" | "taser" | "cash" | "mirror" | "charger" | "hat" | "cheese";

export type Car = {
  id: number;
  x: number;
  z: number;
  yaw: number;
  phase: "arrive" | "wait" | "leave";
  color: string;
  name: string;
  shirt: string;
  hat: string | null;
  skin: string;
  devil: boolean;
  horns: boolean;
  loose: boolean;
  wanted: boolean;
  face: FaceId | null;
  job: Job;
  grade: Grade;
  fuel: number;
  wash: number;
  fed: boolean;
  capped: boolean;
  asleep: boolean;
  dirty: number;
  hp: number;
  caught: boolean;
  served: boolean;
  paidSpawn: boolean;
  gradeOk: boolean;
  warnedWrong: boolean;
  mad: boolean;
  mirror: boolean;
  patience: number;
  honked: boolean;
};

export type Bill = { id: number; x: number; y: number; z: number; amount: number; life: number; vy: number };
export type Bit = { x: number; y: number; z: number; vx: number; vy: number; vz: number; life: number; color: string };

type Up = { pump: boolean; scrub: boolean; scanner: boolean; recycle: boolean };

export const sim = {
  phase: "title" as Phase,
  player: { x: 0.8, y: 0, z: 3.4, yaw: 0.42, pitch: -0.2, vx: 0, vz: 0 },
  speed: 0,
  locked: false,
  qaOverride: false,
  qaKeys: [] as string[],
  noclip: false,
  orbit: 0.4,
  clock: 20,
  night: 0,
  day: 1,
  money: 0,
  stars: 3,
  volume: 0.75,
  hold: "none" as Hold,
  hatColor: "#facc15",
  wornHorns: false,
  cashAmt: 0,
  grade: "95" as Grade,
  posterUp: false,
  skull: false,
  barrier: 0,
  burgers: 3,
  caps: 2,
  up: { pump: false, scrub: false, scanner: false, recycle: false } as Up,
  car: null as Car | null,
  bills: [] as Bill[],
  bits: [] as Bit[],
  mirrorDrop: null as { x: number; y: number; z: number } | null,
  spawnIn: 0,
  servedCount: 0,
  warrant: 0,
  prompt: "",
  objective: "Vào ca để mở trạm",
  toast: "",
  toastT: 0,
  review: "Ca mới. Đừng để tiền rơi sàn.",
  tipI: 0,
  tipT: 0,
  spark: 0,
  steal: 0,
  zapCd: 0,
  sfxCd: 0,
  customer: "",
  aimKind: "" as string,
  aimPos: { x: 0, y: 0, z: 0 },
};

const BOXES = [
  { x0: -0.5, x1: 2.45, z0: 2.28, z1: 3.05 },
  { x0: -11.2, x1: -1.3, z0: -8.3, z1: -3.45 },
  { x0: -0.7, x1: 0.05, z0: 1.15, z1: 1.85 },
  { x0: -4.7, x1: -3.3, z0: 2.7, z1: 4.5 },
];

let billId = 1;
let carId = 1;
let prevMouse = false;
let prevE = false;
let prevR = false;
let prevG = false;
let prevQ = false;
let prevEsc = false;
let prevB = false;
const prevKeys = new Set<string>();

const subs = new Set<() => void>();
let snap = buildSnap();

export function subscribe(fn: () => void) {
  subs.add(fn);
  return () => subs.delete(fn);
}
export function getSnap() {
  return snap;
}
function emit() {
  snap = buildSnap();
  subs.forEach((fn) => fn());
}

function toast(msg: string) {
  sim.toast = msg;
  sim.toastT = 3.1;
}

function addStars(n: number) {
  sim.stars = Math.max(1, Math.min(5, Math.round((sim.stars + n) * 100) / 100));
}

function nightAmount(t: number) {
  const u = (t % 150) / 150;
  if (u < 0.58) return 0;
  if (u < 0.7) return (u - 0.58) / 0.12;
  if (u < 0.88) return 1;
  return Math.max(0, 1 - (u - 0.88) / 0.12);
}

export function carPoint(c: Car, lx: number, ly: number, lz: number) {
  const th = c.yaw + Math.PI;
  const co = Math.cos(th);
  const si = Math.sin(th);
  return { x: c.x + lx * co + lz * si, y: ly, z: c.z - lx * si + lz * co };
}

function down(code: string) {
  if (sim.qaOverride) return sim.qaKeys.includes(code);
  return input.keys.has(code);
}

function eye() {
  return { x: sim.player.x, y: 1.56, z: sim.player.z };
}
function forward() {
  const cy = Math.cos(sim.player.pitch);
  const sy = Math.sin(sim.player.pitch);
  return { x: -Math.sin(sim.player.yaw) * cy, y: sy, z: -Math.cos(sim.player.yaw) * cy };
}

type Kind =
  | "nozzle"
  | "charger"
  | "sponge"
  | "burger"
  | "cap"
  | "taser"
  | "gold"
  | "skull"
  | "go"
  | "shred"
  | "window"
  | "fuel"
  | "body"
  | "mirror"
  | "bill"
  | "mdrop"
  | "loot";

const SPOT: Record<string, { x: number; y: number; z: number; max: number }> = {
  nozzle: { x: -0.28, y: 1.2, z: 1.45, max: 2.8 },
  sponge: { x: 1.62, y: 1.18, z: 2.42, max: 2.3 },
  burger: { x: -1.15, y: 1.15, z: 3.15, max: 2.3 },
  cap: { x: 2.05, y: 1.16, z: 2.42, max: 2.3 },
  taser: { x: 1.82, y: 1.16, z: 2.62, max: 2.3 },
  gold: { x: 1.02, y: 1.16, z: 2.46, max: 2.2 },
  skull: { x: 2.15, y: 2.42, z: 1.85, max: 3.4 },
  go: { x: 2.15, y: 1.92, z: 1.85, max: 3.4 },
  shred: { x: -4.05, y: 1.15, z: 3.55, max: 2.4 },
  charger: { x: -0.95, y: 1.18, z: 1.55, max: 2.5 },
};

let aim: { kind: Kind; id?: number } | null = null;

function consider(list: { kind: Kind; p: { x: number; y: number; z: number }; max: number; id?: number }[]) {
  const e = eye();
  const f = forward();
  let best: { kind: Kind; id?: number; score: number; p: { x: number; y: number; z: number } } | null = null;
  for (const t of list) {
    const dx = t.p.x - e.x;
    const dy = t.p.y - e.y;
    const dz = t.p.z - e.z;
    const dist = Math.hypot(dx, dy, dz);
    if (dist > t.max || dist < 0.001) continue;
    const dot = (dx * f.x + dy * f.y + dz * f.z) / dist;
    if (dot < 0.78) continue;
    const score = dist + (1 - dot) * 1.4;
    if (!best || score < best.score) best = { kind: t.kind, id: t.id, score, p: t.p };
  }
  aim = best ? { kind: best.kind, id: best.id } : null;
  sim.aimKind = best ? best.kind : "";
  if (best) sim.aimPos = { x: best.p.x, y: best.p.y, z: best.p.z };
}

function refreshAim() {
  const list: { kind: Kind; p: { x: number; y: number; z: number }; max: number; id?: number }[] = [];
  if (sim.hold !== "nozzle") list.push({ kind: "nozzle", p: SPOT.nozzle, max: SPOT.nozzle.max });
  if (sim.hold !== "charger") list.push({ kind: "charger", p: SPOT.charger, max: SPOT.charger.max });
  if (sim.hold !== "sponge") list.push({ kind: "sponge", p: SPOT.sponge, max: SPOT.sponge.max });
  if (sim.burgers > 0 && sim.hold !== "burger") list.push({ kind: "burger", p: SPOT.burger, max: SPOT.burger.max });
  if (sim.caps > 0 && sim.hold !== "cap") list.push({ kind: "cap", p: SPOT.cap, max: SPOT.cap.max });
  if (sim.hold !== "taser") list.push({ kind: "taser", p: SPOT.taser, max: SPOT.taser.max });
  list.push({ kind: "gold", p: SPOT.gold, max: SPOT.gold.max });
  list.push({ kind: "skull", p: SPOT.skull, max: SPOT.skull.max });
  list.push({ kind: "go", p: SPOT.go, max: SPOT.go.max });
  list.push({ kind: "shred", p: SPOT.shred, max: SPOT.shred.max });
  if (sim.mirrorDrop) list.push({ kind: "mdrop", p: { x: sim.mirrorDrop.x, y: 0.4, z: sim.mirrorDrop.z }, max: 2 });
  for (const b of sim.bills) list.push({ kind: "bill", id: b.id, p: { x: b.x, y: b.y + 0.1, z: b.z }, max: 2.1 });
  const c = sim.car;
  if (c && c.phase === "wait") {
    list.push({ kind: "window", p: carPoint(c, 0.62, 1.15, 0.15), max: 2.35 });
    list.push({ kind: "fuel", p: carPoint(c, 0.52, 0.72, -0.9), max: 2.35 });
    list.push({ kind: "body", p: carPoint(c, 0.72, 0.85, 0.15), max: 2.4 });
    if (c.mirror && sim.hold === "none") list.push({ kind: "mirror", p: carPoint(c, 0.78, 1.2, 0.72), max: 2.1 });
    if (c.loose && sim.hold === "none") list.push({ kind: "loot", p: carPoint(c, -0.15, 1.02, -0.45), max: 2.15 });
  }
  consider(list);
  sim.prompt = promptFor(aim);
}

function promptFor(t: { kind: Kind } | null) {
  if (!t) return sim.hold === "none" ? "Nhìn vào thứ muốn cầm" : holdName();
  switch (t.kind) {
    case "nozzle":
      return "E — Cầm vòi bơm";
    case "charger":
      return "E — Cầm sạc (xe điện)";
    case "sponge":
      return "E — Cầm miếng rửa";
    case "burger":
      return `E — Lấy bánh (còn ${sim.burgers})`;
    case "cap":
      return `E — Lấy nắp đỏ (còn ${sim.caps})`;
    case "taser":
      return "E — Cầm súng điện";
    case "gold":
      return sim.hold === "cash" ? `E — Nạp $${sim.cashAmt}` : "Nút $ — đập tiền vào đây";
    case "skull":
      return "E — Nút đầu lâu (khóa làn)";
    case "go":
      return "E — GO, cho xe đi";
    case "shred":
      return "E — Bỏ đồ vào máy thu hồi";
    case "bill":
      return "E — Nhặt tiền";
    case "mdrop":
      return "E — Nhặt gương";
    case "window":
      if (sim.car?.asleep) return "E — Tát cửa, đánh thức";
      if (sim.hold === "burger") return "E — Đưa bánh";
      if (sim.hold === "cap") return "E — Lắp nắp bình";
      if (sim.hold === "taser") return "E — Giật điện";
      if (sim.hold === "hat") return "E — Đội mũ cho tài xế";
      if (sim.wornHorns && sim.car?.devil && !sim.car.horns) return "E — Trả sừng";
      if (sim.hold === "none" && sim.car?.horns) return "E — Giật sừng (băng đô)";
      if (sim.hold === "none" && sim.car?.hat) return "E — Giật mũ";
      return "Cửa kính tài xế";
    case "fuel":
      if (sim.car?.job === "charge") return sim.hold === "charger" ? "Giữ chuột — sạc 18 kWh" : "Cửa sạc — cần đầu cắm";
      return sim.hold === "nozzle" ? `Giữ chuột — đổ ${gradeName(sim.grade)}` : "Cửa bình xăng";
    case "body":
      return sim.hold === "sponge" ? "Giữ chuột — kỳ cho sạch" : "Thân xe";
    case "mirror":
      return "Giữ E — tháo gương";
    case "loot":
      return "E — Tịch thu phô mai";
    default:
      return "";
  }
}

function holdName() {
  switch (sim.hold) {
    case "nozzle":
      return `Đang cầm vòi · ${gradeName(sim.grade)} · phím 1-4`;
    case "charger":
      return "Đang cầm sạc. Cắm vào cửa xe điện.";
    case "hat":
      return "Đang cầm mũ. Đội lên đầu tài xế.";
    case "cheese":
      return "Phô mai tịch thu — bỏ vào máy thu hồi";
    case "sponge":
      return "Đang cầm miếng rửa";
    case "burger":
      return "Đang cầm bánh";
    case "cap":
      return "Đang cầm nắp đỏ";
    case "taser":
      return "Đang cầm súng điện";
    case "cash":
      return `Đang cầm $${sim.cashAmt} — đập vào nút vàng`;
    case "mirror":
      return "Đang cầm gương — mang đi thu hồi";
    default:
      return "";
  }
}

function gradeName(id: Grade) {
  return GRADES.find((g) => g.id === id)?.name ?? id;
}

function stow() {
  if (sim.hold === "burger") sim.burgers += 1;
  if (sim.hold === "cap") sim.caps += 1;
  if (sim.hold === "mirror") sim.mirrorDrop = { x: sim.player.x, y: 0.3, z: sim.player.z - 0.4 };
  if (sim.hold === "cheese") spawnBill(12, sim.player.x, 1.1, sim.player.z - 0.35);
  if (sim.hold === "hat") toast("Mũ rơi xuống cát.");
  sim.hold = "none";
  sim.cashAmt = 0;
}

function take(next: Hold) {
  if (sim.hold === "cash") {
    toast("Đang ôm tiền. Nạp vào nút $ đã.");
    return false;
  }
  if (sim.hold !== "none" && sim.hold !== next) stow();
  sim.hold = next;
  return true;
}

function spawnBill(amount: number, x: number, y: number, z: number) {
  sim.bills.push({ id: billId++, x, y, z, amount, life: 22, vy: 1.2 });
}

function burst(x: number, y: number, z: number) {
  const colors = ["#22c55e", "#ef4444", "#3b82f6", "#eab308", "#f97316"];
  for (let i = 0; i < 14; i++) {
    sim.bits.push({
      x,
      y,
      z,
      vx: (Math.random() - 0.5) * 3.2,
      vy: 1.6 + Math.random() * 2.4,
      vz: (Math.random() - 0.5) * 3.2,
      life: 0.7 + Math.random() * 0.4,
      color: colors[i % colors.length]!,
    });
  }
}

function recycleValue() {
  const luck = Math.random();
  let n = 17;
  if (luck > 0.97) n = 400;
  else if (luck > 0.86) n = 150;
  else if (luck > 0.62) n = 50;
  else if (luck > 0.35) n = 25;
  n = Math.round(n * (sim.up.recycle ? 1.65 : 1));
  return n;
}

function coverDone(c: Car) {
  if (c.asleep) return false;
  if (c.job === "fuel") return c.fuel >= 1 && c.gradeOk;
  if (c.job === "wash") return c.wash >= 1;
  if (c.job === "food") return c.fed;
  if (c.job === "cap") return c.capped;
  if (c.job === "charge") return c.fuel >= 1;
  return false;
}

function payAmount(c: Car) {
  if (c.caught && c.face) return WARRANTS.find((w) => w.id === c.face)?.bounty ?? 180;
  if (c.job === "fuel" && !c.gradeOk) return 0;
  let n = 30;
  if (c.job === "fuel") n = GRADES.find((g) => g.id === c.grade)?.pay ?? 40;
  if (c.job === "wash") n = 42;
  if (c.job === "food") n = 34;
  if (c.job === "cap") n = 96;
  if (c.job === "charge") n = 64;
  if (c.dirty > 0.4 && c.wash >= 1 && c.job !== "wash") n += 22;
  if (c.mad) n = Math.round(n * 0.45);
  n = Math.round(n * (0.65 + sim.stars * 0.12));
  return n;
}

function tryFinish(c: Car) {
  if (c.paidSpawn || c.phase !== "wait" || c.caught) return;
  if (!coverDone(c)) return;
  c.paidSpawn = true;
  c.served = true;
  const n = payAmount(c);
  const p = carPoint(c, 0.7, 1.25, 0.2);
  if (n > 0) {
    spawnBill(n, p.x, 1.35, p.z);
    toast(`${c.name} trả $${n}. Nhặt rồi đập nút $.`);
    addStars(0.05);
    sfx.cash();
  } else {
    toast("Sai xăng. Khách không trả.");
    addStars(-0.18);
    sfx.error();
  }
  sim.review = quoteFor(c, n > 0);
}

function quoteFor(c: Car, ok: boolean) {
  if (c.wanted && !c.caught) return "Mặt này quen đến khó chịu.";
  if (!ok) return "Đổ sai. Muốn khóc giữa sa mạc.";
  if (c.job === "charge") return "18 kWh. Coi tôi như cục pin chết.";
  if (c.job === "wash") return c.devil ? "Hết mùi phân. Sừng không phải chân tôi." : "Sạch. Tạm thời thôi.";
  if (c.job === "food") return "Bánh tới. Không hỏi thịt gì.";
  if (c.job === "cap") return "Nắp đỏ đẹp, hơi vô duyên.";
  if (c.devil) return "Lâu rồi không gặp. Đừng đội đồ lên đầu tôi.";
  return "Ổn. Lần sau ghé, nhớ đừng giật mũ.";
}

function spawnCar() {
  const wanted = sim.servedCount > 0 && Math.random() < (sim.night > 0.55 ? 0.4 : 0.22);
  const face = WARRANTS[sim.warrant % WARRANTS.length]!;
  const jobs: Job[] = ["fuel", "wash", "food", "cap", "charge", "fuel"];
  const job: Job = sim.servedCount === 0 ? "fuel" : jobs[Math.floor(Math.random() * jobs.length)]!;
  const grades: Grade[] = ["92", "95", "98", "diesel"];
  const devil = !wanted && sim.servedCount > 0 && Math.random() < (sim.night > 0.5 ? 0.48 : 0.18);
  let shirt = "#38bdf8";
  let hat: string | null = null;
  if (wanted) {
    shirt = face.shirt;
    hat = face.hat;
  } else if (devil) {
    shirt = "#111827";
    hat = null;
  } else {
    shirt = ["#38bdf8", "#f472b6", "#facc15", "#a3e635", "#c084fc"][Math.floor(Math.random() * 5)]!;
    hat = Math.random() < 0.55 ? (["#facc15", "#fb7185", "#a78bfa", "#22c55e"][Math.floor(Math.random() * 4)] ?? null) : null;
    if (hat === face.hat && shirt === face.shirt) shirt = "#38bdf8";
  }
  const asleep = sim.servedCount > 0 && job === "fuel" && !devil && Math.random() < 0.24;
  const color = devil ? "#1e293b" : job === "charge" ? "#22c55e" : sim.servedCount === 0 ? "#f59e0b" : CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)]!;
  sim.car = {
    id: carId++,
    x: 12.5,
    z: 0.55,
    yaw: Math.PI / 2,
    phase: "arrive",
    color,
    name: devil ? "Quỷ" : sim.servedCount === 0 ? "Bình" : NAMES[Math.floor(Math.random() * NAMES.length)]!,
    shirt,
    hat,
    skin: devil ? "#ef4444" : "#ffbea0",
    devil,
    horns: devil,
    loose: devil && Math.random() < 0.75,
    wanted,
    face: wanted ? face.id : null,
    job: devil && Math.random() < 0.55 ? "wash" : job,
    grade: sim.servedCount === 0 ? "95" : grades[Math.floor(Math.random() * grades.length)]!,
    fuel: 0,
    wash: 0,
    fed: false,
    capped: false,
    asleep,
    dirty: devil || job === "wash" ? 1 : Math.random() < 0.28 ? 0.85 : 0,
    hp: 2,
    caught: false,
    served: false,
    paidSpawn: false,
    gradeOk: true,
    warnedWrong: false,
    mad: false,
    mirror: true,
    patience: 34,
    honked: false,
  };
  if (sim.servedCount === 0) {
    sim.car.x = -1.85;
    sim.car.phase = "wait";
    sim.car.dirty = 0;
    sim.car.asleep = false;
    sim.car.loose = false;
    sim.car.horns = false;
    toast("Bình cần Ron 95. Cầm vòi, đổ đúng, nhặt tiền, bấm GO.");
  } else if (devil) toast("Ác quỷ ghé. Rửa xe, giật sừng nếu thích, đừng nghiền người.");
  else if (sim.car.job === "charge") toast(`${sim.car.name} cần sạc 18 kWh. Cầm đầu cắm xanh.`);
  else if (wanted) toast("Khách lạ. Giơ tờ truy nã (Q) lên so mặt.");
  sim.customer = sim.car.name;
  sim.skull = false;
}

function refreshObjective() {
  const c = sim.car;
  if (sim.phase === "title") {
    sim.objective = "Vào ca để mở trạm";
    return;
  }
  if (sim.hold === "cash") {
    sim.objective = `Đập $${sim.cashAmt} vào nút $ vàng`;
    return;
  }
  if (!c) {
    sim.objective = "Đợi xe kế. Quay trái có máy thu hồi.";
    return;
  }
  if (c.phase === "arrive") {
    sim.objective = "Có xe đang vào làn";
    return;
  }
  if (c.phase === "leave") {
    sim.objective = "Xe đang đi";
    return;
  }
  if (c.caught) {
    sim.objective = "Đã bắt. Nhặt tiền thưởng rồi bấm GO.";
    return;
  }
  if (c.asleep) {
    sim.objective = `${c.name} ngủ gật. Tát cửa kính.`;
    return;
  }
  if (c.wanted && sim.posterUp) {
    sim.objective = "Khớp mặt. Bấm đầu lâu, rồi giật điện.";
    return;
  }
  if (!coverDone(c)) {
    if (c.job === "fuel") sim.objective = `${c.name} cần ${gradeName(c.grade)}`;
    else if (c.job === "wash") sim.objective = `${c.name}: rửa xe cho sạch`;
    else if (c.job === "food") sim.objective = `${c.name} đòi bánh hamburger`;
    else if (c.job === "charge") sim.objective = `${c.name} cần sạc 18 kWh`;
    else sim.objective = `${c.name} cần lắp nắp bình đỏ`;
    return;
  }
  if (sim.bills.length) {
    sim.objective = "Nhặt tiền dưới cửa xe";
    return;
  }
  sim.objective = "Bấm nút GO xanh cho xe đi";
}

function pressSkull() {
  const c = sim.car;
  if (!c || c.phase !== "wait") {
    toast("Chưa có xe trong làn.");
    return;
  }
  if (!c.wanted || c.caught) {
    c.mad = true;
    c.phase = "leave";
    sim.skull = false;
    addStars(-0.22);
    toast("Nhầm người! Khách sợ, phóng mất.");
    sfx.error();
    sim.review = "Bị dọa giữa ban ngày.";
    return;
  }
  sim.skull = true;
  sfx.alarm();
  toast("Làn khóa. Giật điện đúng mặt trên tờ.");
}

function pressGo() {
  const c = sim.car;
  if (!c || c.phase !== "wait") {
    toast("Không có xe để thả.");
    return;
  }
  if (!(c.served || c.caught)) {
    toast("Chưa xong việc.");
    sfx.error();
    return;
  }
  if (c.wanted && !c.caught) {
    addStars(-0.16);
    toast("Tội phạm phóng thoát!");
    sfx.alarm();
  } else toast(c.caught ? "Xe bị kéo đi." : "Đi thong thả.");
  c.phase = "leave";
  sim.skull = false;
  sfx.barrier();
  sim.servedCount += 1;
}

function pressShred() {
  const ok = sim.hold === "mirror" || sim.hold === "cap" || sim.hold === "cheese" || sim.hold === "hat";
  if (!ok) {
    toast("Bỏ gương, nắp, mũ hoặc phô mai. Người thì không.");
    sfx.error();
    return;
  }
  const n = recycleValue();
  sim.hold = "none";
  burst(SPOT.shred.x, 1.4, SPOT.shred.z);
  spawnBill(n, SPOT.shred.x + 0.8, 1.3, SPOT.shred.z);
  sfx.crunch();
  toast(n >= 150 ? `Thu hồi đậm: $${n}!` : `Thu hồi được $${n}.`);
}

function zap() {
  const c = sim.car;
  if (!c || c.phase !== "wait" || sim.zapCd > 0) return;
  sim.zapCd = 0.4;
  if (!c.wanted) {
    c.mad = true;
    c.phase = "leave";
    addStars(-0.35);
    toast("Người vô tội! Họ bỏ chạy.");
    sfx.error();
    sim.review = "Giật điện oan. Muốn kiện.";
    return;
  }
  if (!sim.skull) {
    toast("Bấm nút đầu lâu trước đã.");
    sfx.error();
    return;
  }
  c.hp -= 1;
  sfx.zap();
  if (c.hp > 0) {
    toast("Hắn giật mình. Thêm một phát.");
    return;
  }
  c.caught = true;
  c.paidSpawn = true;
  c.served = true;
  const n = payAmount(c);
  const p = carPoint(c, 0.75, 1.3, 0.1);
  spawnBill(n, p.x, 1.4, p.z);
  addStars(0.14);
  sim.warrant = (sim.warrant + 1) % WARRANTS.length;
  toast(`ĐÃ BẮT ${c.name}. Thưởng $${n}.`);
  sim.review = "Đã bắt. Đừng để lần sau đội nhầm mũ.";
  sfx.cash();
  sim.spark = 0.8;
}

function interact() {
  const t = aim;
  if (!t) return;
  if (t.kind === "nozzle") {
    if (sim.hold === "nozzle") sim.hold = "none";
    else if (take("nozzle")) sfx.ui();
    return;
  }
  if (t.kind === "sponge") {
    if (take("sponge")) sfx.ui();
    return;
  }
  if (t.kind === "burger") {
    if (sim.burgers <= 0) return;
    if (take("burger")) {
      sim.burgers -= 1;
      sfx.ui();
    }
    return;
  }
  if (t.kind === "cap") {
    if (sim.caps <= 0) return;
    if (take("cap")) {
      sim.caps -= 1;
      sfx.ui();
    }
    return;
  }
  if (t.kind === "taser") {
    if (take("taser")) sfx.ui();
    return;
  }
  if (t.kind === "gold") {
    if (sim.hold !== "cash") {
      toast("Tay không có tiền.");
      return;
    }
    sim.money += sim.cashAmt;
    toast(`Đã nạp $${sim.cashAmt}. Quỹ $${sim.money}.`);
    sfx.cash();
    sim.hold = "none";
    sim.cashAmt = 0;
    save();
    return;
  }
  if (t.kind === "skull") {
    pressSkull();
    return;
  }
  if (t.kind === "go") {
    pressGo();
    return;
  }
  if (t.kind === "shred") {
    pressShred();
    return;
  }
  if (t.kind === "bill" && t.id) {
    const b = sim.bills.find((x) => x.id === t.id);
    if (!b) return;
    if (sim.hold !== "none" && sim.hold !== "cash") stow();
    if (sim.hold === "cash") {
      b.amount += sim.cashAmt;
    }
    sim.hold = "cash";
    sim.cashAmt = b.amount;
    sim.bills = sim.bills.filter((x) => x.id !== b.id);
    sfx.cash();
    return;
  }
  if (t.kind === "mdrop" && sim.mirrorDrop) {
    if (take("mirror")) sim.mirrorDrop = null;
    return;
  }
  if (t.kind === "loot") {
    const car = sim.car;
    if (!car || !car.loose) return;
    if (take("cheese")) {
      car.loose = false;
      sfx.ui();
      toast("Tịch thu phô mai. Máy thu hồi sẽ trả tiền.");
    }
    return;
  }
  if (t.kind === "charger") {
    if (take("charger")) sfx.ui();
    return;
  }
  const c = sim.car;
  if (!c || c.phase !== "wait") return;
  if (t.kind === "window") {
    if (c.asleep) {
      c.asleep = false;
      sfx.slap();
      toast(`${c.name} tỉnh. Làm tiếp đơn của họ.`);
      sim.spark = 0.45;
      return;
    }
    if (sim.hold === "burger") {
      c.fed = true;
      sim.hold = "none";
      sfx.munch();
      if (c.job !== "food") {
        toast("Không gọi bánh, nhưng vẫn ăn.");
        if (c.served) {
          const bill = sim.bills[0];
          if (bill) bill.amount += 12;
        }
      } else toast("Bánh tới nơi.");
      sim.spark = 0.4;
      tryFinish(c);
      return;
    }
    if (sim.hold === "cap") {
      if (c.job !== "cap" || c.capped) {
        toast("Xe này không xin nắp.");
        return;
      }
      c.capped = true;
      sim.hold = "none";
      sfx.ui();
      sim.spark = 0.7;
      toast("Nắp đỏ lắp xong, lấp lánh.");
      tryFinish(c);
      return;
    }
    if (sim.hold === "taser") {
      zap();
      return;
    }
    if (sim.hold === "hat") {
      c.hat = sim.hatColor;
      sim.hold = "none";
      sfx.ui();
      toast("Đội mũ vào. Nhìn lại vẫn bực.");
      sim.spark = 0.35;
      return;
    }
    if (sim.hold === "none" && sim.wornHorns && c.devil && !c.horns) {
      c.horns = true;
      sim.wornHorns = false;
      sfx.ui();
      toast("Trả sừng. Nó vẫn không phải chân anh ấy.");
      return;
    }
    if (sim.hold === "none" && c.horns) {
      c.horns = false;
      sim.wornHorns = true;
      sfx.slap();
      toast("Chỉ là băng đô. Đội lên ngầu hơn hắn.");
      sim.review = "Sừng không phải chân tôi.";
      return;
    }
    if (sim.hold === "none" && c.hat) {
      sim.hatColor = c.hat;
      c.hat = null;
      c.mad = true;
      if (take("hat")) {
        sfx.slap();
        toast("Giật mũ. Đội lại cho người khác nếu thích.");
      }
      return;
    }
    return;
  }
}

function heldUse(dt: number) {
  const c = sim.car;
  if (!c || c.phase !== "wait" || !aim) {
    sim.steal = 0;
    return;
  }
  if (aim.kind === "fuel" && (sim.hold === "nozzle" || sim.hold === "charger")) {
    if (c.asleep) {
      if (sim.sfxCd <= 0) {
        toast("Tài xế đang ngủ.");
        sim.sfxCd = 1.4;
      }
      return;
    }
    if (c.job === "charge") {
      if (sim.hold !== "charger") {
        if (sim.sfxCd <= 0) {
          toast("Xe điện. Cầm sạc, đừng đổ xăng.");
          sim.sfxCd = 1.5;
        }
        return;
      }
      c.fuel = Math.min(1, c.fuel + dt * (sim.up.pump ? 0.42 : 0.24));
      if (sim.sfxCd <= 0) {
        sfx.pump();
        sim.sfxCd = 0.28;
      }
      tryFinish(c);
      return;
    }
    if (sim.hold === "charger") {
      if (sim.sfxCd <= 0) {
        toast("Xe xăng. Trả sạc, cầm vòi.");
        sim.sfxCd = 1.5;
      }
      return;
    }
    if (c.job !== "fuel" && c.fuel <= 0 && sim.sfxCd <= 0) {
      toast("Họ không xin đổ xăng.");
      sim.sfxCd = 1.5;
      return;
    }
    if (sim.grade !== c.grade) c.gradeOk = false;
    c.fuel = Math.min(1, c.fuel + dt * (sim.up.pump ? 0.48 : 0.26));
    if (sim.sfxCd <= 0) {
      sfx.pump();
      sim.sfxCd = 0.28;
    }
    if (c.fuel >= 1 && !c.gradeOk && !c.warnedWrong) {
      c.warnedWrong = true;
      toast("Sai loại. Khách sẽ không trả.");
      sfx.error();
    }
    tryFinish(c);
    return;
  }
  if (aim.kind === "body" && sim.hold === "sponge") {
    c.wash = Math.min(1, c.wash + dt * (sim.up.scrub ? 0.7 : 0.38));
    if (c.wash >= 1) c.dirty = 0;
    if (sim.sfxCd <= 0) {
      sfx.scrub();
      sim.sfxCd = 0.22;
    }
    tryFinish(c);
    return;
  }
  if (aim.kind === "mirror" && sim.hold === "none" && c.mirror) {
    sim.steal += dt;
    if (sim.steal >= 0.55) {
      sim.steal = 0;
      c.mirror = false;
      sim.hold = "mirror";
      c.mad = true;
      addStars(-0.05);
      sfx.slap();
      toast("Gỡ gương. Mang sang máy thu hồi.");
    }
    return;
  }
  sim.steal = 0;
}

function blocked(x: number, z: number) {
  if (sim.noclip) return false;
  const r = 0.28;
  if (x < -10.5 || x > 9.5 || z < -2.4 || z > 7.6) return true;
  for (const b of BOXES) {
    if (x > b.x0 - r && x < b.x1 + r && z > b.z0 - r && z < b.z1 + r) return true;
  }
  return false;
}

function tickPlayer(dt: number) {
  if (!sim.qaOverride) {
    sim.player.yaw -= input.lookX * 0.00215;
    sim.player.pitch -= input.lookY * 0.00215;
    sim.player.yaw -= input.padLookX * 0.00215;
    sim.player.pitch -= input.padLookY * 0.00215;
    sim.player.pitch = Math.max(-1.15, Math.min(1.2, sim.player.pitch));
  }
  input.lookX = 0;
  input.lookY = 0;
  let ax = input.touchX + input.padX;
  let ay = input.touchY + input.padY;
  if (down("KeyW") || down("ArrowUp")) ay -= 1;
  if (down("KeyS") || down("ArrowDown")) ay += 1;
  if (down("KeyA") || down("ArrowLeft")) ax -= 1;
  if (down("KeyD") || down("ArrowRight")) ax += 1;
  const mag = Math.hypot(ax, ay);
  if (mag > 1) {
    ax /= mag;
    ay /= mag;
  }
  const yaw = sim.player.yaw;
  const fx = -Math.sin(yaw);
  const fz = -Math.cos(yaw);
  const rx = Math.cos(yaw);
  const rz = -Math.sin(yaw);
  const wishx = rx * ax + fx * -ay;
  const wishz = rz * ax + fz * -ay;
  const k = Math.min(1, dt * 16);
  sim.player.vx += (wishx * 4.7 - sim.player.vx) * k;
  sim.player.vz += (wishz * 4.7 - sim.player.vz) * k;
  const nx = sim.player.x + sim.player.vx * dt;
  if (!blocked(nx, sim.player.z)) sim.player.x = nx;
  else sim.player.vx = 0;
  const nz = sim.player.z + sim.player.vz * dt;
  if (!blocked(sim.player.x, nz)) sim.player.z = nz;
  else sim.player.vz = 0;
  sim.speed = Math.hypot(sim.player.vx, sim.player.vz);
}

function tickCar(dt: number) {
  const c = sim.car;
  if (!c) {
    sim.spawnIn -= dt;
    if (sim.spawnIn <= 0) spawnCar();
    return;
  }
  if (c.phase === "arrive") {
    c.x -= dt * 7.2;
    if (c.x <= -1.85) {
      c.x = -1.85;
      c.phase = "wait";
      sfx.honk();
    }
    return;
  }
  if (c.phase === "leave") {
    c.x -= dt * 8.2;
    if (c.x < -16) {
      if (!c.served && !c.caught && c.wanted) addStars(-0.08);
      sim.car = null;
      sim.spawnIn = 2.2;
      sim.skull = false;
      sim.customer = "";
    }
    return;
  }
  if (!sim.skull && !c.caught) {
    c.patience -= dt;
    if (c.patience < 8 && !c.honked) {
      c.honked = true;
      sfx.honk();
      toast(`${c.name} bấm còi. Làm lẹ.`);
    }
    if (c.patience <= 0) {
      c.phase = "leave";
      c.mad = true;
      if (c.wanted && !c.caught) {
        addStars(-0.12);
        toast("Hắn chờ quá lâu và chuồn.");
      } else {
        addStars(-0.08);
        toast("Khách hết kiên nhẫn, bỏ đi.");
      }
      sim.review = "Chờ mỏi. Một sao.";
    }
  }
  tryFinish(c);
}

function tickWorld(dt: number) {
  const target = sim.car && (sim.car.phase === "leave" || !sim.skull) && sim.car.phase !== "wait" ? 1 : sim.skull ? 0 : sim.car?.phase === "wait" ? 0 : 1;
  const open = !sim.car || sim.car.phase === "leave" || (sim.car.phase === "arrive" && !sim.skull) ? 1 : 0;
  const want = sim.car?.phase === "wait" ? (sim.skull ? 0 : 0) : open;
  sim.barrier += ((want ? 1 : 0) - sim.barrier) * Math.min(1, dt * 4);
  void target;
  sim.toastT -= dt;
  if (sim.toastT <= 0) sim.toast = "";
  sim.spark = Math.max(0, sim.spark - dt);
  sim.zapCd = Math.max(0, sim.zapCd - dt);
  sim.sfxCd = Math.max(0, sim.sfxCd - dt);
  sim.tipT += dt;
  if (sim.tipT > 7) {
    sim.tipT = 0;
    sim.tipI = (sim.tipI + 1) % TIPS.length;
  }
  for (const b of sim.bills) {
    b.life -= dt;
    b.vy -= dt * 9;
    b.y += b.vy * dt;
    if (b.y < 0.28) {
      b.y = 0.28;
      b.vy = 0;
    }
  }
  if (sim.bills.some((b) => b.life <= 0)) {
    toast("Tiền nằm sàn đã biến mất.");
    sim.bills = sim.bills.filter((b) => b.life > 0);
  }
  for (const bit of sim.bits) {
    bit.life -= dt;
    bit.vy -= dt * 10;
    bit.x += bit.vx * dt;
    bit.y += bit.vy * dt;
    bit.z += bit.vz * dt;
    if (bit.y < 0.08) {
      bit.y = 0.08;
      bit.vy *= -0.25;
    }
  }
  if (sim.bits.length) sim.bits = sim.bits.filter((b) => b.life > 0);
}

function readGrades() {
  if (sim.qaOverride) return;
  if (pressedFresh("Digit1")) sim.grade = "92";
  if (pressedFresh("Digit2")) sim.grade = "95";
  if (pressedFresh("Digit3")) sim.grade = "98";
  if (pressedFresh("Digit4")) sim.grade = "diesel";
}

function pressedFresh(code: string) {
  const on = input.keys.has(code);
  const was = prevKeys.has(code);
  return on && !was;
}

function endKeys() {
  prevKeys.clear();
  for (const k of input.keys) prevKeys.add(k);
}

export function tick(dt: number) {
  pollPad();
  const prevNight = sim.night;
  sim.clock += dt;
  sim.night = nightAmount(sim.clock);
  if (prevNight > 0.75 && sim.night < 0.2) {
    sim.day += 1;
    toast(`Ngày ${sim.day}. Đêm qua nhiều khách lạ.`);
  }
  if (sim.phase === "title") {
    sim.orbit += dt * 0.12;
    input.lookX = 0;
    input.lookY = 0;
    endKeys();
    emit();
    return;
  }
  if (sim.phase !== "play") {
    sim.player.vx = 0;
    sim.player.vz = 0;
    sim.speed = 0;
    input.lookX = 0;
    input.lookY = 0;
    if (pressedFresh("Escape") || pressedFresh("KeyB")) {
      if (sim.phase === "shop" || sim.phase === "pause") sim.phase = "play";
    }
    endKeys();
    emit();
    return;
  }
  if (!sim.qaOverride && pressedFresh("Escape")) {
    sim.phase = "pause";
    endKeys();
    emit();
    return;
  }
  if (!sim.qaOverride && pressedFresh("KeyB")) {
    sim.phase = "shop";
    endKeys();
    emit();
    return;
  }
  tickPlayer(dt);
  tickCar(dt);
  tickWorld(dt);
  refreshAim();
  refreshObjective();
  readGrades();
  const mouse = input.shootHeld || input.padShoot;
  const eDown = down("KeyE") || input.padInteract;
  const pulse = (mouse && !prevMouse) || (eDown && !prevE) || input.interactPulse;
  input.interactPulse = false;
  if (pulse) interact();
  if (mouse || eDown || input.interactHeld || input.padShoot) heldUse(dt);
  else sim.steal = 0;
  if (!sim.qaOverride && (pressedFresh("KeyR") || (input.padRed && !prevR))) pressSkull();
  if (!sim.qaOverride && (pressedFresh("KeyG") || (input.padBarrier && !prevG))) pressGo();
  if (!sim.qaOverride && (pressedFresh("KeyQ") || (input.padWeapon && !prevQ))) sim.posterUp = !sim.posterUp;
  prevMouse = mouse;
  prevE = eDown;
  prevR = input.padRed;
  prevG = input.padBarrier;
  prevQ = input.padWeapon;
  prevEsc = input.keys.has("Escape");
  prevB = input.keys.has("KeyB");
  void prevEsc;
  void prevB;
  endKeys();
  emit();
}

export function startGame() {
  sim.phase = "play";
  sim.spawnIn = sim.car ? 0 : 0.8;
  if (!sim.car && sim.servedCount === 0) toast("Ca bắt đầu. Xe vàng của Bình sắp vào.");
  save();
  emit();
}

export function resumeGame() {
  sim.phase = "play";
  emit();
}

export function openShop() {
  if (sim.phase === "shop") sim.phase = "play";
  else if (sim.phase === "play" || sim.phase === "pause") sim.phase = "shop";
  emit();
}

export function setGrade(g: Grade) {
  sim.grade = g;
  emit();
}

export function togglePoster() {
  sim.posterUp = !sim.posterUp;
  emit();
}

export function uiSkull() {
  if (sim.phase !== "play") return;
  pressSkull();
  emit();
}
export function uiGo() {
  if (sim.phase !== "play") return;
  pressGo();
  emit();
}
export function uiUse(down: boolean) {
  if (down) input.interactPulse = true;
  input.interactHeld = down;
}

export function buy(id: string) {
  const item = SHOP.find((s) => s.id === id);
  if (!item) return;
  if (sim.money < item.cost) {
    toast("Chưa đủ tiền.");
    sfx.error();
    emit();
    return;
  }
  if (!item.repeat && sim.up[id as keyof Up]) return;
  sim.money -= item.cost;
  if (id === "snack") sim.burgers += 3;
  else if (id === "caps") sim.caps += 2;
  else sim.up[id as keyof Up] = true;
  sfx.cash();
  toast(`Mua ${item.name}.`);
  save();
  emit();
}

export function wipeSave() {
  sim.money = 0;
  sim.stars = 3;
  sim.up = { pump: false, scrub: false, scanner: false, recycle: false };
  sim.burgers = 3;
  sim.caps = 2;
  sim.day = 1;
  sim.servedCount = 0;
  sim.warrant = 0;
  sim.car = null;
  sim.bills = [];
  sim.hold = "none";
  sim.wornHorns = false;
  try {
    localStorage.removeItem("wanted-fuel-v2");
  } catch {
    /* ignore */
  }
  toast("Đã xóa hồ sơ ca.");
  emit();
}

function save() {
  if (typeof localStorage === "undefined") return;
  const data = {
    v: 2,
    money: sim.money,
    stars: sim.stars,
    up: sim.up,
    burgers: sim.burgers,
    caps: sim.caps,
    day: sim.day,
    warrant: sim.warrant,
    servedCount: sim.servedCount,
  };
  try {
    localStorage.setItem("wanted-fuel-v2", JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

function load() {
  if (typeof localStorage === "undefined") return;
  try {
    const raw = localStorage.getItem("wanted-fuel-v2");
    if (!raw) return;
    const s = JSON.parse(raw) as Partial<{
      money: number;
      stars: number;
      up: Up;
      burgers: number;
      caps: number;
      day: number;
      warrant: number;
      servedCount: number;
    }>;
    if (typeof s.money === "number") sim.money = s.money;
    if (typeof s.stars === "number") sim.stars = s.stars;
    if (s.up) sim.up = { ...sim.up, ...s.up };
    if (typeof s.burgers === "number") sim.burgers = s.burgers;
    if (typeof s.caps === "number") sim.caps = s.caps;
    if (typeof s.day === "number") sim.day = s.day;
    if (typeof s.warrant === "number") sim.warrant = s.warrant;
    if (typeof s.servedCount === "number") sim.servedCount = s.servedCount;
  } catch {
    /* ignore */
  }
}

export type Snap = ReturnType<typeof buildSnap>;

function buildSnap() {
  const w = WARRANTS[sim.warrant % WARRANTS.length]!;
  return {
    phase: sim.phase,
    money: sim.money,
    stars: sim.stars.toFixed(1),
    day: sim.day,
    night: sim.night > 0.55,
    objective: sim.objective,
    prompt: sim.prompt,
    toast: sim.toastT > 0 ? sim.toast : "",
    hold: sim.hold,
    grade: sim.grade,
    poster: sim.posterUp,
    skull: sim.skull,
    review: sim.review,
    tip: TIPS[sim.tipI] ?? TIPS[0],
    customer: sim.customer,
    burgers: sim.burgers,
    caps: sim.caps,
    warrantName: w.name,
    warrantLine: w.line,
    warrantBounty: w.bounty,
    warrantHat: w.hat,
    warrantShirt: w.shirt,
    shop: SHOP.map((s) => ({
      ...s,
      owned: s.repeat ? false : Boolean(sim.up[s.id as keyof Up]),
    })),
    showGrades: sim.hold === "nozzle",
    wornHorns: sim.wornHorns,
  };
}

load();
if (!sim.car) spawnCar();
snap = buildSnap();

export function attachProbe() {
  window.__controlsTest = {
    getYaw: () => sim.player.yaw,
    getSpeed: () => Math.hypot(sim.player.vx, sim.player.vz),
    getPos: () => ({ x: sim.player.x, z: sim.player.z }),
    setYaw: (y: number) => {
      sim.player.yaw = y;
    },
    setPos: (x: number, z: number) => {
      sim.player.x = x;
      sim.player.z = z;
      sim.player.vx = 0;
      sim.player.vz = 0;
    },
    setKeys: (codes: string[]) => {
      sim.qaOverride = true;
      sim.qaKeys = [...codes];
      sim.noclip = true;
      sim.phase = "play";
    },
  };
}

declare global {
  interface Window {
    __controlsTest?: {
      getYaw: () => number;
      getSpeed: () => number;
      getPos: () => { x: number; z: number };
      setYaw: (y: number) => void;
      setPos: (x: number, z: number) => void;
      setKeys: (codes: string[]) => void;
    };
  }
}

export function requestLock() {
  if (typeof document === "undefined" || isCoarse()) return;
  if (!document.pointerLockElement) void document.body.requestPointerLock();
}

export function onLockChange(locked: boolean) {
  sim.locked = locked;
  if (!locked && sim.phase === "play" && !sim.qaOverride && !isCoarse()) {
    sim.phase = "pause";
    emit();
  }
}

export function bootAudioOnGesture() {
  unlockAudio();
  resumeAudio();
  setVolume(sim.volume);
}
