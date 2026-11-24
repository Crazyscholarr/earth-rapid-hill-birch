import { i as __toESM } from "../_runtime.mjs";
import { a as Color, i as CanvasTexture, l as require_jsx_runtime, n as useFrame, o as Fog, r as useThree, s as SRGBColorSpace, t as Canvas, u as require_react } from "../_libs/@react-three/fiber+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B__C9G52.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GRADES = [
	{
		id: "92",
		name: "Ron 92",
		pay: 36
	},
	{
		id: "95",
		name: "Ron 95",
		pay: 48
	},
	{
		id: "98",
		name: "Ron 98",
		pay: 72
	},
	{
		id: "diesel",
		name: "Dầu",
		pay: 54
	}
];
var WARRANTS = [
	{
		id: "worst",
		name: "Nhân viên tệ nhất",
		hat: "#22c55e",
		shirt: "#86efac",
		bounty: 180,
		line: "Mũ xanh lá, áo xanh, cười hở răng"
	},
	{
		id: "thief",
		name: "Kẻ trộm nắp",
		hat: null,
		shirt: "#1f2937",
		bounty: 240,
		line: "Áo đen, không mũ, mắt trợn"
	},
	{
		id: "bully",
		name: "Kẻ bắt nạt",
		hat: "#2563eb",
		shirt: "#fb923c",
		bounty: 210,
		line: "Mũ xanh dương, áo cam"
	}
];
var TIPS = [
	"Khách thích được đội mũ và được cho ăn.",
	"Đổ đúng loại trên bong bóng thì họ mới trả.",
	"Giơ tờ truy nã lên so với mặt tài xế.",
	"Nút đầu lâu khóa làn. Rồi mới giật điện.",
	"Đồ rơi sàn sẽ biến mất. Đập tiền vào nút $.",
	"Tháo gương, bỏ vào máy thu hồi. Người thì không.",
	"Xe bẩn thì rửa. Khách vui trả nhiều hơn.",
	"Xe điện thì cắm sạc, không đổ xăng.",
	"Sừng quỷ chỉ là băng đô. Giật được thì đội.",
	"Phô mai trong xe là hàng tịch thu, bỏ vào máy nghiền."
];
var SHOP = [
	{
		id: "pump",
		name: "Bơm nhanh",
		desc: "Đầy bình nhanh gấp đôi",
		cost: 180
	},
	{
		id: "scrub",
		name: "Bọt đặc",
		desc: "Rửa xe mau hơn",
		cost: 150
	},
	{
		id: "scanner",
		name: "Kính soi",
		desc: "Tội phạm có viền đỏ",
		cost: 240
	},
	{
		id: "recycle",
		name: "Lưỡi thu hồi",
		desc: "Máy nghiền trả đậm hơn",
		cost: 280
	},
	{
		id: "snack",
		name: "Thùng bánh",
		desc: "+3 hamburger",
		cost: 40,
		repeat: true
	},
	{
		id: "caps",
		name: "Nắp đỏ",
		desc: "+2 nắp bình xăng",
		cost: 60,
		repeat: true
	}
];
var NAMES = [
	"An",
	"Bình",
	"Chi",
	"Dũng",
	"Hà",
	"Khoa",
	"Linh",
	"Minh",
	"Ngọc",
	"Phát",
	"Quân",
	"Trang",
	"Vy",
	"Anna",
	"Bo"
];
var CAR_COLORS = [
	"#3b82f6",
	"#22c55e",
	"#ef4444",
	"#f59e0b",
	"#a855f7",
	"#fb7185",
	"#38bdf8",
	"#f97316"
];
var input = {
	keys: /* @__PURE__ */ new Set(),
	lookX: 0,
	lookY: 0,
	shootHeld: false,
	interactHeld: false,
	interactPulse: false,
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
	wheel: 0
};
var BLOCK = /* @__PURE__ */ new Set([
	"Space",
	"ArrowUp",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"Tab",
	"KeyW",
	"KeyA",
	"KeyS",
	"KeyD"
]);
var lookId = null;
var lastX = 0;
var lastY = 0;
function coarse() {
	return window.matchMedia("(pointer: coarse)").matches;
}
function dead(x, y, dz = .18) {
	const m = Math.hypot(x, y);
	if (m < dz) return [0, 0];
	const s = (m - dz) / ((1 - dz) * m);
	return [x * s, y * s];
}
function pollPad() {
	const p = (navigator.getGamepads?.())?.[0];
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
	const hit = (i) => Boolean(p.buttons[i]?.pressed);
	input.padInteract = hit(0);
	input.padRed = hit(1);
	input.padBarrier = hit(2);
	input.padWeapon = hit(3);
	input.padPart = hit(4);
	input.padShoot = (p.buttons[7]?.value ?? 0) > .4 || hit(7);
}
function bindInput() {
	const down = (e) => {
		input.keys.add(e.code);
		if (BLOCK.has(e.code)) e.preventDefault();
	};
	const up = (e) => {
		input.keys.delete(e.code);
	};
	const blur = () => {
		input.keys.clear();
		input.shootHeld = false;
		input.interactHeld = false;
	};
	const move = (e) => {
		if (document.pointerLockElement) {
			input.lookX += e.movementX;
			input.lookY += e.movementY;
		}
	};
	const mouseDown = (e) => {
		if (e.button === 0 && document.pointerLockElement) input.shootHeld = true;
	};
	const mouseUp = (e) => {
		if (e.button === 0) input.shootHeld = false;
	};
	const wheel = (e) => {
		if (document.pointerLockElement) {
			input.wheel += Math.sign(e.deltaY);
			e.preventDefault();
		}
	};
	const vis = () => {
		if (document.hidden) blur();
	};
	const pdown = (e) => {
		if (!coarse()) return;
		if (e.target?.closest("[data-ui]")) return;
		if (e.clientX < window.innerWidth * .42) return;
		lookId = e.pointerId;
		lastX = e.clientX;
		lastY = e.clientY;
	};
	const pmove = (e) => {
		if (e.pointerId !== lookId) return;
		input.lookX += (e.clientX - lastX) * 1.35;
		input.lookY += (e.clientY - lastY) * 1.35;
		lastX = e.clientX;
		lastY = e.clientY;
	};
	const pup = (e) => {
		if (e.pointerId === lookId) lookId = null;
	};
	window.addEventListener("keydown", down);
	window.addEventListener("keyup", up);
	window.addEventListener("blur", blur);
	window.addEventListener("mousemove", move);
	window.addEventListener("mousedown", mouseDown);
	window.addEventListener("mouseup", mouseUp);
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
		window.removeEventListener("wheel", wheel);
		window.removeEventListener("visibilitychange", vis);
		window.removeEventListener("pointerdown", pdown);
		window.removeEventListener("pointermove", pmove);
		window.removeEventListener("pointerup", pup);
		window.removeEventListener("pointercancel", pup);
	};
}
function isCoarse() {
	return typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
}
var ctx = null;
var master = null;
var sfxBus = null;
var volume = .7;
function ensure() {
	if (ctx) return;
	ctx = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive" });
	master = ctx.createGain();
	sfxBus = ctx.createGain();
	master.gain.value = volume * volume;
	sfxBus.connect(master);
	master.connect(ctx.destination);
}
function unlockAudio() {
	ensure();
	if (ctx && ctx.state === "suspended") ctx.resume();
}
function resumeAudio() {
	if (ctx && ctx.state === "suspended") ctx.resume();
}
function setVolume(v) {
	volume = Math.min(1, Math.max(0, v));
	if (master && ctx) master.gain.setTargetAtTime(volume * volume, ctx.currentTime, .03);
}
function tone(freq, dur, type, vol, slide) {
	if (!ctx || !sfxBus) return;
	const t = ctx.currentTime;
	const o = ctx.createOscillator();
	const g = ctx.createGain();
	o.type = type;
	o.frequency.setValueAtTime(freq, t);
	if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(40, slide), t + dur);
	g.gain.setValueAtTime(1e-4, t);
	g.gain.exponentialRampToValueAtTime(vol, t + .012);
	g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
	o.connect(g);
	g.connect(sfxBus);
	o.start(t);
	o.stop(t + dur + .02);
	o.onended = () => {
		o.disconnect();
		g.disconnect();
	};
}
function noise(dur, vol, freq = 800) {
	if (!ctx || !sfxBus) return;
	const n = Math.max(1, Math.floor(ctx.sampleRate * dur));
	const buf = ctx.createBuffer(1, n, ctx.sampleRate);
	const data = buf.getChannelData(0);
	for (let i = 0; i < n; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / n);
	const src = ctx.createBufferSource();
	src.buffer = buf;
	const filter = ctx.createBiquadFilter();
	filter.type = "lowpass";
	filter.frequency.value = freq;
	const g = ctx.createGain();
	g.gain.value = vol;
	src.connect(filter);
	filter.connect(g);
	g.connect(sfxBus);
	src.start();
	src.onended = () => {
		src.disconnect();
		filter.disconnect();
		g.disconnect();
	};
}
var sfx = {
	ui() {
		tone(520, .07, "square", .05);
	},
	pump() {
		noise(.12, .08, 420);
	},
	cash() {
		tone(660, .08, "square", .06);
		tone(880, .12, "square", .05, 990);
	},
	barrier() {
		tone(180, .14, "sawtooth", .05, 90);
	},
	alarm() {
		tone(740, .16, "square", .05, 420);
	},
	error() {
		tone(180, .16, "square", .06, 90);
	},
	hurt() {
		noise(.12, .12, 300);
		tone(120, .18, "sawtooth", .05);
	},
	empty() {
		tone(140, .05, "square", .04);
	},
	stun() {
		tone(240, .12, "sawtooth", .06, 80);
		noise(.08, .06, 600);
	},
	shot(kind) {
		if (kind === "stun") {
			this.stun();
			return;
		}
		if (kind === "shotgun") noise(.18, .2, 500);
		else if (kind === "smg") noise(.06, .1, 1400);
		else noise(.09, .14, 1100);
		tone(kind === "shotgun" ? 90 : 160, .08, "square", .04);
	},
	hit() {
		tone(320, .06, "square", .05, 180);
	},
	slap() {
		noise(.07, .1, 280);
		tone(160, .06, "square", .05);
	},
	crunch() {
		noise(.28, .18, 160);
		tone(70, .22, "sawtooth", .05, 40);
	},
	zap() {
		tone(720, .09, "square", .05, 180);
		noise(.1, .07, 1800);
	},
	munch() {
		noise(.1, .06, 420);
		tone(200, .08, "triangle", .04);
	},
	scrub() {
		noise(.07, .04, 900);
	},
	honk() {
		tone(220, .12, "square", .05);
		tone(180, .14, "square", .04, 140);
	}
};
var sim = {
	phase: "title",
	player: {
		x: .8,
		y: 0,
		z: 3.4,
		yaw: .42,
		pitch: -.2,
		vx: 0,
		vz: 0
	},
	speed: 0,
	locked: false,
	qaOverride: false,
	qaKeys: [],
	noclip: false,
	orbit: .4,
	clock: 20,
	night: 0,
	day: 1,
	money: 0,
	stars: 3,
	volume: .75,
	hold: "none",
	hatColor: "#facc15",
	wornHorns: false,
	cashAmt: 0,
	grade: "95",
	posterUp: false,
	skull: false,
	barrier: 0,
	burgers: 3,
	caps: 2,
	up: {
		pump: false,
		scrub: false,
		scanner: false,
		recycle: false
	},
	car: null,
	bills: [],
	bits: [],
	mirrorDrop: null,
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
	aimKind: "",
	aimPos: {
		x: 0,
		y: 0,
		z: 0
	}
};
var BOXES = [
	{
		x0: -.5,
		x1: 2.45,
		z0: 2.28,
		z1: 3.05
	},
	{
		x0: -11.2,
		x1: -1.3,
		z0: -8.3,
		z1: -3.45
	},
	{
		x0: -.7,
		x1: .05,
		z0: 1.15,
		z1: 1.85
	},
	{
		x0: -4.7,
		x1: -3.3,
		z0: 2.7,
		z1: 4.5
	}
];
var billId = 1;
var carId = 1;
var prevMouse = false;
var prevE = false;
var prevR = false;
var prevG = false;
var prevQ = false;
var prevKeys = /* @__PURE__ */ new Set();
var subs = /* @__PURE__ */ new Set();
var snap = buildSnap();
function subscribe(fn) {
	subs.add(fn);
	return () => subs.delete(fn);
}
function getSnap() {
	return snap;
}
function emit() {
	snap = buildSnap();
	subs.forEach((fn) => fn());
}
function toast(msg) {
	sim.toast = msg;
	sim.toastT = 3.1;
}
function addStars(n) {
	sim.stars = Math.max(1, Math.min(5, Math.round((sim.stars + n) * 100) / 100));
}
function nightAmount(t) {
	const u = t % 150 / 150;
	if (u < .58) return 0;
	if (u < .7) return (u - .58) / .12;
	if (u < .88) return 1;
	return Math.max(0, 1 - (u - .88) / .12);
}
function carPoint(c, lx, ly, lz) {
	const th = c.yaw + Math.PI;
	const co = Math.cos(th);
	const si = Math.sin(th);
	return {
		x: c.x + lx * co + lz * si,
		y: ly,
		z: c.z - lx * si + lz * co
	};
}
function down(code) {
	if (sim.qaOverride) return sim.qaKeys.includes(code);
	return input.keys.has(code);
}
function eye() {
	return {
		x: sim.player.x,
		y: 1.56,
		z: sim.player.z
	};
}
function forward() {
	const cy = Math.cos(sim.player.pitch);
	const sy = Math.sin(sim.player.pitch);
	return {
		x: -Math.sin(sim.player.yaw) * cy,
		y: sy,
		z: -Math.cos(sim.player.yaw) * cy
	};
}
var SPOT = {
	nozzle: {
		x: -.28,
		y: 1.2,
		z: 1.45,
		max: 2.8
	},
	sponge: {
		x: 1.62,
		y: 1.18,
		z: 2.42,
		max: 2.3
	},
	burger: {
		x: -1.15,
		y: 1.15,
		z: 3.15,
		max: 2.3
	},
	cap: {
		x: 2.05,
		y: 1.16,
		z: 2.42,
		max: 2.3
	},
	taser: {
		x: 1.82,
		y: 1.16,
		z: 2.62,
		max: 2.3
	},
	gold: {
		x: 1.02,
		y: 1.16,
		z: 2.46,
		max: 2.2
	},
	skull: {
		x: 2.15,
		y: 2.42,
		z: 1.85,
		max: 3.4
	},
	go: {
		x: 2.15,
		y: 1.92,
		z: 1.85,
		max: 3.4
	},
	shred: {
		x: -4.05,
		y: 1.15,
		z: 3.55,
		max: 2.4
	},
	charger: {
		x: -.95,
		y: 1.18,
		z: 1.55,
		max: 2.5
	}
};
var aim = null;
function consider(list) {
	const e = eye();
	const f = forward();
	let best = null;
	for (const t of list) {
		const dx = t.p.x - e.x;
		const dy = t.p.y - e.y;
		const dz = t.p.z - e.z;
		const dist = Math.hypot(dx, dy, dz);
		if (dist > t.max || dist < .001) continue;
		const dot = (dx * f.x + dy * f.y + dz * f.z) / dist;
		if (dot < .78) continue;
		const score = dist + (1 - dot) * 1.4;
		if (!best || score < best.score) best = {
			kind: t.kind,
			id: t.id,
			score,
			p: t.p
		};
	}
	aim = best ? {
		kind: best.kind,
		id: best.id
	} : null;
	sim.aimKind = best ? best.kind : "";
	if (best) sim.aimPos = {
		x: best.p.x,
		y: best.p.y,
		z: best.p.z
	};
}
function refreshAim() {
	const list = [];
	if (sim.hold !== "nozzle") list.push({
		kind: "nozzle",
		p: SPOT.nozzle,
		max: SPOT.nozzle.max
	});
	if (sim.hold !== "charger") list.push({
		kind: "charger",
		p: SPOT.charger,
		max: SPOT.charger.max
	});
	if (sim.hold !== "sponge") list.push({
		kind: "sponge",
		p: SPOT.sponge,
		max: SPOT.sponge.max
	});
	if (sim.burgers > 0 && sim.hold !== "burger") list.push({
		kind: "burger",
		p: SPOT.burger,
		max: SPOT.burger.max
	});
	if (sim.caps > 0 && sim.hold !== "cap") list.push({
		kind: "cap",
		p: SPOT.cap,
		max: SPOT.cap.max
	});
	if (sim.hold !== "taser") list.push({
		kind: "taser",
		p: SPOT.taser,
		max: SPOT.taser.max
	});
	list.push({
		kind: "gold",
		p: SPOT.gold,
		max: SPOT.gold.max
	});
	list.push({
		kind: "skull",
		p: SPOT.skull,
		max: SPOT.skull.max
	});
	list.push({
		kind: "go",
		p: SPOT.go,
		max: SPOT.go.max
	});
	list.push({
		kind: "shred",
		p: SPOT.shred,
		max: SPOT.shred.max
	});
	if (sim.mirrorDrop) list.push({
		kind: "mdrop",
		p: {
			x: sim.mirrorDrop.x,
			y: .4,
			z: sim.mirrorDrop.z
		},
		max: 2
	});
	for (const b of sim.bills) list.push({
		kind: "bill",
		id: b.id,
		p: {
			x: b.x,
			y: b.y + .1,
			z: b.z
		},
		max: 2.1
	});
	const c = sim.car;
	if (c && c.phase === "wait") {
		list.push({
			kind: "window",
			p: carPoint(c, .62, 1.15, .15),
			max: 2.35
		});
		list.push({
			kind: "fuel",
			p: carPoint(c, .52, .72, -.9),
			max: 2.35
		});
		list.push({
			kind: "body",
			p: carPoint(c, .72, .85, .15),
			max: 2.4
		});
		if (c.mirror && sim.hold === "none") list.push({
			kind: "mirror",
			p: carPoint(c, .78, 1.2, .72),
			max: 2.1
		});
		if (c.loose && sim.hold === "none") list.push({
			kind: "loot",
			p: carPoint(c, -.15, 1.02, -.45),
			max: 2.15
		});
	}
	consider(list);
	sim.prompt = promptFor(aim);
}
function promptFor(t) {
	if (!t) return sim.hold === "none" ? "Nhìn vào thứ muốn cầm" : holdName();
	switch (t.kind) {
		case "nozzle": return "E — Cầm vòi bơm";
		case "charger": return "E — Cầm sạc (xe điện)";
		case "sponge": return "E — Cầm miếng rửa";
		case "burger": return `E — Lấy bánh (còn ${sim.burgers})`;
		case "cap": return `E — Lấy nắp đỏ (còn ${sim.caps})`;
		case "taser": return "E — Cầm súng điện";
		case "gold": return sim.hold === "cash" ? `E — Nạp $${sim.cashAmt}` : "Nút $ — đập tiền vào đây";
		case "skull": return "E — Nút đầu lâu (khóa làn)";
		case "go": return "E — GO, cho xe đi";
		case "shred": return "E — Bỏ đồ vào máy thu hồi";
		case "bill": return "E — Nhặt tiền";
		case "mdrop": return "E — Nhặt gương";
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
		case "body": return sim.hold === "sponge" ? "Giữ chuột — kỳ cho sạch" : "Thân xe";
		case "mirror": return "Giữ E — tháo gương";
		case "loot": return "E — Tịch thu phô mai";
		default: return "";
	}
}
function holdName() {
	switch (sim.hold) {
		case "nozzle": return `Đang cầm vòi · ${gradeName(sim.grade)} · phím 1-4`;
		case "charger": return "Đang cầm sạc. Cắm vào cửa xe điện.";
		case "hat": return "Đang cầm mũ. Đội lên đầu tài xế.";
		case "cheese": return "Phô mai tịch thu — bỏ vào máy thu hồi";
		case "sponge": return "Đang cầm miếng rửa";
		case "burger": return "Đang cầm bánh";
		case "cap": return "Đang cầm nắp đỏ";
		case "taser": return "Đang cầm súng điện";
		case "cash": return `Đang cầm $${sim.cashAmt} — đập vào nút vàng`;
		case "mirror": return "Đang cầm gương — mang đi thu hồi";
		default: return "";
	}
}
function gradeName(id) {
	return GRADES.find((g) => g.id === id)?.name ?? id;
}
function stow() {
	if (sim.hold === "burger") sim.burgers += 1;
	if (sim.hold === "cap") sim.caps += 1;
	if (sim.hold === "mirror") sim.mirrorDrop = {
		x: sim.player.x,
		y: .3,
		z: sim.player.z - .4
	};
	if (sim.hold === "cheese") spawnBill(12, sim.player.x, 1.1, sim.player.z - .35);
	if (sim.hold === "hat") toast("Mũ rơi xuống cát.");
	sim.hold = "none";
	sim.cashAmt = 0;
}
function take(next) {
	if (sim.hold === "cash") {
		toast("Đang ôm tiền. Nạp vào nút $ đã.");
		return false;
	}
	if (sim.hold !== "none" && sim.hold !== next) stow();
	sim.hold = next;
	return true;
}
function spawnBill(amount, x, y, z) {
	sim.bills.push({
		id: billId++,
		x,
		y,
		z,
		amount,
		life: 22,
		vy: 1.2
	});
}
function burst(x, y, z) {
	const colors = [
		"#22c55e",
		"#ef4444",
		"#3b82f6",
		"#eab308",
		"#f97316"
	];
	for (let i = 0; i < 14; i++) sim.bits.push({
		x,
		y,
		z,
		vx: (Math.random() - .5) * 3.2,
		vy: 1.6 + Math.random() * 2.4,
		vz: (Math.random() - .5) * 3.2,
		life: .7 + Math.random() * .4,
		color: colors[i % colors.length]
	});
}
function recycleValue() {
	const luck = Math.random();
	let n = 17;
	if (luck > .97) n = 400;
	else if (luck > .86) n = 150;
	else if (luck > .62) n = 50;
	else if (luck > .35) n = 25;
	n = Math.round(n * (sim.up.recycle ? 1.65 : 1));
	return n;
}
function coverDone(c) {
	if (c.asleep) return false;
	if (c.job === "fuel") return c.fuel >= 1 && c.gradeOk;
	if (c.job === "wash") return c.wash >= 1;
	if (c.job === "food") return c.fed;
	if (c.job === "cap") return c.capped;
	if (c.job === "charge") return c.fuel >= 1;
	return false;
}
function payAmount(c) {
	if (c.caught && c.face) return WARRANTS.find((w) => w.id === c.face)?.bounty ?? 180;
	if (c.job === "fuel" && !c.gradeOk) return 0;
	let n = 30;
	if (c.job === "fuel") n = GRADES.find((g) => g.id === c.grade)?.pay ?? 40;
	if (c.job === "wash") n = 42;
	if (c.job === "food") n = 34;
	if (c.job === "cap") n = 96;
	if (c.job === "charge") n = 64;
	if (c.dirty > .4 && c.wash >= 1 && c.job !== "wash") n += 22;
	if (c.mad) n = Math.round(n * .45);
	n = Math.round(n * (.65 + sim.stars * .12));
	return n;
}
function tryFinish(c) {
	if (c.paidSpawn || c.phase !== "wait" || c.caught) return;
	if (!coverDone(c)) return;
	c.paidSpawn = true;
	c.served = true;
	const n = payAmount(c);
	const p = carPoint(c, .7, 1.25, .2);
	if (n > 0) {
		spawnBill(n, p.x, 1.35, p.z);
		toast(`${c.name} trả $${n}. Nhặt rồi đập nút $.`);
		addStars(.05);
		sfx.cash();
	} else {
		toast("Sai xăng. Khách không trả.");
		addStars(-.18);
		sfx.error();
	}
	sim.review = quoteFor(c, n > 0);
}
function quoteFor(c, ok) {
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
	const wanted = sim.servedCount > 0 && Math.random() < (sim.night > .55 ? .4 : .22);
	const face = WARRANTS[sim.warrant % WARRANTS.length];
	const jobs = [
		"fuel",
		"wash",
		"food",
		"cap",
		"charge",
		"fuel"
	];
	const job = sim.servedCount === 0 ? "fuel" : jobs[Math.floor(Math.random() * jobs.length)];
	const grades = [
		"92",
		"95",
		"98",
		"diesel"
	];
	const devil = !wanted && sim.servedCount > 0 && Math.random() < (sim.night > .5 ? .48 : .18);
	let shirt = "#38bdf8";
	let hat = null;
	if (wanted) {
		shirt = face.shirt;
		hat = face.hat;
	} else if (devil) {
		shirt = "#111827";
		hat = null;
	} else {
		shirt = [
			"#38bdf8",
			"#f472b6",
			"#facc15",
			"#a3e635",
			"#c084fc"
		][Math.floor(Math.random() * 5)];
		hat = Math.random() < .55 ? [
			"#facc15",
			"#fb7185",
			"#a78bfa",
			"#22c55e"
		][Math.floor(Math.random() * 4)] ?? null : null;
		if (hat === face.hat && shirt === face.shirt) shirt = "#38bdf8";
	}
	const asleep = sim.servedCount > 0 && job === "fuel" && !devil && Math.random() < .24;
	const color = devil ? "#1e293b" : job === "charge" ? "#22c55e" : sim.servedCount === 0 ? "#f59e0b" : CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)];
	sim.car = {
		id: carId++,
		x: 12.5,
		z: .55,
		yaw: Math.PI / 2,
		phase: "arrive",
		color,
		name: devil ? "Quỷ" : sim.servedCount === 0 ? "Bình" : NAMES[Math.floor(Math.random() * NAMES.length)],
		shirt,
		hat,
		skin: devil ? "#ef4444" : "#ffbea0",
		devil,
		horns: devil,
		loose: devil && Math.random() < .75,
		wanted,
		face: wanted ? face.id : null,
		job: devil && Math.random() < .55 ? "wash" : job,
		grade: sim.servedCount === 0 ? "95" : grades[Math.floor(Math.random() * grades.length)],
		fuel: 0,
		wash: 0,
		fed: false,
		capped: false,
		asleep,
		dirty: devil || job === "wash" ? 1 : Math.random() < .28 ? .85 : 0,
		hp: 2,
		caught: false,
		served: false,
		paidSpawn: false,
		gradeOk: true,
		warnedWrong: false,
		mad: false,
		mirror: true,
		patience: 34,
		honked: false
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
		addStars(-.22);
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
		addStars(-.16);
		toast("Tội phạm phóng thoát!");
		sfx.alarm();
	} else toast(c.caught ? "Xe bị kéo đi." : "Đi thong thả.");
	c.phase = "leave";
	sim.skull = false;
	sfx.barrier();
	sim.servedCount += 1;
}
function pressShred() {
	if (!(sim.hold === "mirror" || sim.hold === "cap" || sim.hold === "cheese" || sim.hold === "hat")) {
		toast("Bỏ gương, nắp, mũ hoặc phô mai. Người thì không.");
		sfx.error();
		return;
	}
	const n = recycleValue();
	sim.hold = "none";
	burst(SPOT.shred.x, 1.4, SPOT.shred.z);
	spawnBill(n, SPOT.shred.x + .8, 1.3, SPOT.shred.z);
	sfx.crunch();
	toast(n >= 150 ? `Thu hồi đậm: $${n}!` : `Thu hồi được $${n}.`);
}
function zap() {
	const c = sim.car;
	if (!c || c.phase !== "wait" || sim.zapCd > 0) return;
	sim.zapCd = .4;
	if (!c.wanted) {
		c.mad = true;
		c.phase = "leave";
		addStars(-.35);
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
	const p = carPoint(c, .75, 1.3, .1);
	spawnBill(n, p.x, 1.4, p.z);
	addStars(.14);
	sim.warrant = (sim.warrant + 1) % WARRANTS.length;
	toast(`ĐÃ BẮT ${c.name}. Thưởng $${n}.`);
	sim.review = "Đã bắt. Đừng để lần sau đội nhầm mũ.";
	sfx.cash();
	sim.spark = .8;
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
		if (sim.hold === "cash") b.amount += sim.cashAmt;
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
			sim.spark = .45;
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
			sim.spark = .4;
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
			sim.spark = .7;
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
			sim.spark = .35;
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
function heldUse(dt) {
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
			c.fuel = Math.min(1, c.fuel + dt * (sim.up.pump ? .42 : .24));
			if (sim.sfxCd <= 0) {
				sfx.pump();
				sim.sfxCd = .28;
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
		c.fuel = Math.min(1, c.fuel + dt * (sim.up.pump ? .48 : .26));
		if (sim.sfxCd <= 0) {
			sfx.pump();
			sim.sfxCd = .28;
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
		c.wash = Math.min(1, c.wash + dt * (sim.up.scrub ? .7 : .38));
		if (c.wash >= 1) c.dirty = 0;
		if (sim.sfxCd <= 0) {
			sfx.scrub();
			sim.sfxCd = .22;
		}
		tryFinish(c);
		return;
	}
	if (aim.kind === "mirror" && sim.hold === "none" && c.mirror) {
		sim.steal += dt;
		if (sim.steal >= .55) {
			sim.steal = 0;
			c.mirror = false;
			sim.hold = "mirror";
			c.mad = true;
			addStars(-.05);
			sfx.slap();
			toast("Gỡ gương. Mang sang máy thu hồi.");
		}
		return;
	}
	sim.steal = 0;
}
function blocked(x, z) {
	if (sim.noclip) return false;
	const r = .28;
	if (x < -10.5 || x > 9.5 || z < -2.4 || z > 7.6) return true;
	for (const b of BOXES) if (x > b.x0 - r && x < b.x1 + r && z > b.z0 - r && z < b.z1 + r) return true;
	return false;
}
function tickPlayer(dt) {
	if (!sim.qaOverride) {
		sim.player.yaw -= input.lookX * .00215;
		sim.player.pitch -= input.lookY * .00215;
		sim.player.yaw -= input.padLookX * .00215;
		sim.player.pitch -= input.padLookY * .00215;
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
function tickCar(dt) {
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
			if (!c.served && !c.caught && c.wanted) addStars(-.08);
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
				addStars(-.12);
				toast("Hắn chờ quá lâu và chuồn.");
			} else {
				addStars(-.08);
				toast("Khách hết kiên nhẫn, bỏ đi.");
			}
			sim.review = "Chờ mỏi. Một sao.";
		}
	}
	tryFinish(c);
}
function tickWorld(dt) {
	sim.car && (sim.car.phase === "leave" || !sim.skull) && sim.car.phase !== "wait" || sim.skull || sim.car?.phase;
	const open = !sim.car || sim.car.phase === "leave" || sim.car.phase === "arrive" && !sim.skull ? 1 : 0;
	const want = sim.car?.phase === "wait" ? sim.skull ? 0 : 0 : open;
	sim.barrier += ((want ? 1 : 0) - sim.barrier) * Math.min(1, dt * 4);
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
		if (b.y < .28) {
			b.y = .28;
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
		if (bit.y < .08) {
			bit.y = .08;
			bit.vy *= -.25;
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
function pressedFresh(code) {
	const on = input.keys.has(code);
	const was = prevKeys.has(code);
	return on && !was;
}
function endKeys() {
	prevKeys.clear();
	for (const k of input.keys) prevKeys.add(k);
}
function tick(dt) {
	pollPad();
	const prevNight = sim.night;
	sim.clock += dt;
	sim.night = nightAmount(sim.clock);
	if (prevNight > .75 && sim.night < .2) {
		sim.day += 1;
		toast(`Ngày ${sim.day}. Đêm qua nhiều khách lạ.`);
	}
	if (sim.phase === "title") {
		sim.orbit += dt * .12;
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
	const pulse = mouse && !prevMouse || eDown && !prevE || input.interactPulse;
	input.interactPulse = false;
	if (pulse) interact();
	if (mouse || eDown || input.interactHeld || input.padShoot) heldUse(dt);
	else sim.steal = 0;
	if (!sim.qaOverride && (pressedFresh("KeyR") || input.padRed && !prevR)) pressSkull();
	if (!sim.qaOverride && (pressedFresh("KeyG") || input.padBarrier && !prevG)) pressGo();
	if (!sim.qaOverride && (pressedFresh("KeyQ") || input.padWeapon && !prevQ)) sim.posterUp = !sim.posterUp;
	prevMouse = mouse;
	prevE = eDown;
	prevR = input.padRed;
	prevG = input.padBarrier;
	prevQ = input.padWeapon;
	input.keys.has("Escape");
	input.keys.has("KeyB");
	endKeys();
	emit();
}
function startGame() {
	sim.phase = "play";
	sim.spawnIn = sim.car ? 0 : .8;
	if (!sim.car && sim.servedCount === 0) toast("Ca bắt đầu. Xe vàng của Bình sắp vào.");
	save();
	emit();
}
function resumeGame() {
	sim.phase = "play";
	emit();
}
function openShop() {
	if (sim.phase === "shop") sim.phase = "play";
	else if (sim.phase === "play" || sim.phase === "pause") sim.phase = "shop";
	emit();
}
function setGrade(g) {
	sim.grade = g;
	emit();
}
function togglePoster() {
	sim.posterUp = !sim.posterUp;
	emit();
}
function uiSkull() {
	if (sim.phase !== "play") return;
	pressSkull();
	emit();
}
function uiGo() {
	if (sim.phase !== "play") return;
	pressGo();
	emit();
}
function uiUse(down) {
	if (down) input.interactPulse = true;
	input.interactHeld = down;
}
function buy(id) {
	const item = SHOP.find((s) => s.id === id);
	if (!item) return;
	if (sim.money < item.cost) {
		toast("Chưa đủ tiền.");
		sfx.error();
		emit();
		return;
	}
	if (!item.repeat && sim.up[id]) return;
	sim.money -= item.cost;
	if (id === "snack") sim.burgers += 3;
	else if (id === "caps") sim.caps += 2;
	else sim.up[id] = true;
	sfx.cash();
	toast(`Mua ${item.name}.`);
	save();
	emit();
}
function wipeSave() {
	sim.money = 0;
	sim.stars = 3;
	sim.up = {
		pump: false,
		scrub: false,
		scanner: false,
		recycle: false
	};
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
	} catch {}
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
		servedCount: sim.servedCount
	};
	try {
		localStorage.setItem("wanted-fuel-v2", JSON.stringify(data));
	} catch {}
}
function load() {
	if (typeof localStorage === "undefined") return;
	try {
		const raw = localStorage.getItem("wanted-fuel-v2");
		if (!raw) return;
		const s = JSON.parse(raw);
		if (typeof s.money === "number") sim.money = s.money;
		if (typeof s.stars === "number") sim.stars = s.stars;
		if (s.up) sim.up = {
			...sim.up,
			...s.up
		};
		if (typeof s.burgers === "number") sim.burgers = s.burgers;
		if (typeof s.caps === "number") sim.caps = s.caps;
		if (typeof s.day === "number") sim.day = s.day;
		if (typeof s.warrant === "number") sim.warrant = s.warrant;
		if (typeof s.servedCount === "number") sim.servedCount = s.servedCount;
	} catch {}
}
function buildSnap() {
	const w = WARRANTS[sim.warrant % WARRANTS.length];
	return {
		phase: sim.phase,
		money: sim.money,
		stars: sim.stars.toFixed(1),
		day: sim.day,
		night: sim.night > .55,
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
			owned: s.repeat ? false : Boolean(sim.up[s.id])
		})),
		showGrades: sim.hold === "nozzle",
		wornHorns: sim.wornHorns
	};
}
load();
if (!sim.car) spawnCar();
snap = buildSnap();
function attachProbe() {
	window.__controlsTest = {
		getYaw: () => sim.player.yaw,
		getSpeed: () => Math.hypot(sim.player.vx, sim.player.vz),
		getPos: () => ({
			x: sim.player.x,
			z: sim.player.z
		}),
		setYaw: (y) => {
			sim.player.yaw = y;
		},
		setPos: (x, z) => {
			sim.player.x = x;
			sim.player.z = z;
			sim.player.vx = 0;
			sim.player.vz = 0;
		},
		setKeys: (codes) => {
			sim.qaOverride = true;
			sim.qaKeys = [...codes];
			sim.noclip = true;
			sim.phase = "play";
		}
	};
}
function requestLock() {
	if (typeof document === "undefined" || isCoarse()) return;
	if (!document.pointerLockElement) document.body.requestPointerLock();
}
function onLockChange(locked) {
	sim.locked = locked;
	if (!locked && sim.phase === "play" && !sim.qaOverride && !isCoarse()) {
		sim.phase = "pause";
		emit();
	}
}
function bootAudioOnGesture() {
	unlockAudio();
	resumeAudio();
	setVolume(sim.volume);
}
function Hud() {
	const snap = (0, import_react.useSyncExternalStore)(subscribe, getSnap, getSnap);
	const [coarse, setCoarse] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setCoarse(isCoarse()), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 text-cream",
		children: [
			snap.phase === "play" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-3 left-3 max-w-[16rem] rounded-xl bg-ink/75 px-3 py-2 text-sm leading-snug shadow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] uppercase tracking-widest text-gold",
						children: ["Ngày ", snap.day]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: snap.objective
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-3 right-3 rounded-xl bg-ink/75 px-3 py-2 text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-2xl leading-none text-gold",
						children: ["$", snap.money]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-cream-dim",
						children: ["★ ", snap.stars]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/90 shadow" }),
				snap.prompt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-28 left-1/2 max-w-[90vw] -translate-x-1/2 rounded-full bg-ink/80 px-4 py-2 text-center text-sm font-semibold",
					children: snap.prompt
				}) : null,
				snap.toast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-20 left-1/2 w-[min(92vw,28rem)] -translate-x-1/2 rounded-xl bg-cream px-4 py-2 text-center text-sm font-semibold text-ink",
					children: snap.toast
				}) : null,
				snap.showGrades ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-auto absolute bottom-40 left-1/2 flex -translate-x-1/2 gap-2",
					"data-ui": true,
					children: GRADES.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: `btn btn-fuel ${snap.grade === g.id ? "on" : ""}`,
						onClick: () => setGrade(g.id),
						children: [
							i + 1,
							" ",
							g.name
						]
					}, g.id))
				}) : null,
				coarse ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Touch, {}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "absolute bottom-3 left-1/2 hidden -translate-x-1/2 text-[11px] text-white/80 sm:block",
					children: "WASD · chuột nhìn · E dùng · giữ để đổ/rửa · Q tờ · R đầu lâu · G đi · 1-4 xăng · B cửa hàng"
				})
			] }) : null,
			snap.phase === "title" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {}) : null,
			snap.phase === "pause" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {}) : null,
			snap.phase === "shop" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shop, { snap }) : null
		]
	});
}
function Title() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-auto absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink via-ink/55 to-transparent p-6 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel w-full max-w-md p-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.35em] text-gold",
					children: "sa mạc · ca đêm · tiền mặt"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-5xl leading-none text-canopy sm:text-6xl",
					children: "WANTED FUEL"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-cream-dim",
					children: "Đổ đúng xăng, rửa xe bẩn, đưa bánh, lắp nắp đỏ. Giơ tờ truy nã lên so mặt. Khóa làn bằng nút đầu lâu, giật điện đúng người. Tiền nhặt bằng tay, đập vào nút vàng. Đồ thừa bỏ vào máy thu hồi."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-go mt-5 w-full text-lg",
					onClick: () => {
						startGame();
						requestLock();
					},
					children: "Vào ca"
				})
			]
		})
	});
}
function Pause() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-auto absolute inset-0 grid place-items-center bg-ink/55 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel w-full max-w-sm p-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-4xl",
					children: "Tạm dừng"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-cream-dim",
					children: "Chuột đang thả. Bấm tiếp tục để khóa nhìn lại."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-go mt-4 w-full",
					onClick: () => {
						resumeGame();
						requestLock();
					},
					children: "Tiếp tục"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-fuel mt-2 w-full",
					onClick: openShop,
					children: "Cửa hàng"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-stop mt-2 w-full",
					onClick: wipeSave,
					children: "Xóa hồ sơ"
				})
			]
		})
	});
}
function Shop({ snap }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-auto absolute inset-0 grid place-items-center bg-ink/60 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel max-h-[88dvh] w-full max-w-md overflow-auto p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl",
						children: "Nâng trạm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-gold",
						children: ["$", snap.money]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-cream-dim",
					children: snap.tip
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: snap.shop.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 rounded-xl bg-white/5 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-cream-dim",
							children: item.desc
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-go shrink-0",
							disabled: item.owned || snap.money < item.cost,
							onClick: () => buy(item.id),
							children: item.owned ? "Có rồi" : `$${item.cost}`
						})]
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-fuel mt-4 w-full",
					onClick: () => {
						resumeGame();
						requestLock();
					},
					children: "Đóng"
				})
			]
		})
	});
}
function Touch() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stick, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto absolute right-3 bottom-6 grid grid-cols-2 gap-2",
			"data-ui": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldButton, { label: "Dùng" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-go",
					"data-ui": true,
					onClick: uiGo,
					children: "GO"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-stop",
					"data-ui": true,
					onClick: uiSkull,
					children: "Đầu lâu"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-fuel",
					"data-ui": true,
					onClick: togglePoster,
					children: "Tờ"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-fuel col-span-2",
					"data-ui": true,
					onClick: openShop,
					children: "Cửa hàng"
				})
			]
		})]
	});
}
function HoldButton({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: "btn btn-fuel",
		"data-ui": true,
		onPointerDown: (e) => {
			e.preventDefault();
			uiUse(true);
		},
		onPointerUp: () => uiUse(false),
		onPointerLeave: () => uiUse(false),
		onPointerCancel: () => uiUse(false),
		children: label
	});
}
function Stick() {
	const id = (0, import_react.useRef)(null);
	const origin = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const [knob, setKnob] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const setAxis = (x, y) => {
		const max = 46;
		const m = Math.hypot(x, y) || 1;
		const k = Math.min(max, m);
		const nx = x / m * k;
		const ny = y / m * k;
		setKnob({
			x: nx,
			y: ny
		});
		input.touchX = nx / max;
		input.touchY = ny / max;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"data-ui": true,
		className: "pointer-events-auto absolute bottom-6 left-4 h-32 w-32 rounded-full border border-white/30 bg-ink/35",
		onPointerDown: (e) => {
			id.current = e.pointerId;
			origin.current = {
				x: e.clientX,
				y: e.clientY
			};
			e.currentTarget.setPointerCapture(e.pointerId);
		},
		onPointerMove: (e) => {
			if (e.pointerId !== id.current) return;
			setAxis(e.clientX - origin.current.x, e.clientY - origin.current.y);
		},
		onPointerUp: (e) => {
			if (e.pointerId !== id.current) return;
			id.current = null;
			setKnob({
				x: 0,
				y: 0
			});
			input.touchX = 0;
			input.touchY = 0;
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute top-1/2 left-1/2 h-14 w-14 rounded-full bg-cream/90",
			style: { transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))` }
		})
	});
}
function paint(draw, w, h) {
	const canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("canvas");
	draw(ctx, w, h);
	const tex = new CanvasTexture(canvas);
	tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 4;
	return {
		canvas,
		ctx,
		tex,
		key: ""
	};
}
function Scene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("color", {
			attach: "background",
			args: ["#8fd0ff"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rig, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lights, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Station, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveCar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bubble, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bills, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bits, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marker, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hands, {})
	] });
}
function Rig() {
	const { camera, scene } = useThree();
	const bg = (0, import_react.useMemo)(() => new Color("#8fd0ff"), []);
	const day = (0, import_react.useMemo)(() => new Color("#8fd0ff"), []);
	const night = (0, import_react.useMemo)(() => new Color("#12162b"), []);
	(0, import_react.useEffect)(() => {
		scene.fog = new Fog("#8fd0ff", 16, 70);
	}, [scene]);
	useFrame((_, dt) => {
		tick(Math.min(.05, dt));
		const n = sim.night;
		bg.copy(day).lerp(night, n);
		scene.background = bg;
		const fog = scene.fog;
		if (fog && "color" in fog) {
			fog.color.copy(bg);
			if ("far" in fog) fog.far = 70 - n * 28;
		}
		if (sim.phase === "title") {
			const a = sim.orbit;
			camera.position.set(Math.sin(a) * 7.4 + .2, 2.7, Math.cos(a) * 5.6 + 1.4);
			camera.lookAt(-1.4, 1.05, .5);
			return;
		}
		const bob = Math.sin(sim.clock * 9) * Math.min(.045, sim.speed * .012);
		camera.position.set(sim.player.x, 1.56 + bob, sim.player.z);
		camera.rotation.order = "YXZ";
		camera.rotation.y = sim.player.yaw;
		camera.rotation.x = sim.player.pitch;
		camera.rotation.z = 0;
	});
	return null;
}
function Lights() {
	const sun = (0, import_react.useRef)(null);
	const amb = (0, import_react.useRef)(null);
	const lamp = (0, import_react.useRef)(null);
	useFrame(() => {
		const n = sim.night;
		if (sun.current) sun.current.intensity = 1.45 * (1 - n * .78);
		if (amb.current) amb.current.intensity = .62 - n * .34;
		if (lamp.current) lamp.current.intensity = .25 + n * 3.1;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#d7f0ff",
			"#e8c27a",
			.85
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
			ref: amb,
			intensity: .55
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			ref: sun,
			position: [
				14,
				20,
				8
			],
			intensity: 1.4,
			castShadow: true,
			"shadow-mapSize-width": 1024,
			"shadow-mapSize-height": 1024,
			"shadow-camera-far": 48,
			"shadow-camera-left": -16,
			"shadow-camera-right": 16,
			"shadow-camera-top": 16,
			"shadow-camera-bottom": -16
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			ref: lamp,
			position: [
				.4,
				2.8,
				2.4
			],
			distance: 14,
			decay: 2,
			intensity: .4,
			color: "#fff4d2"
		})
	] });
}
function Station() {
	const sign = (0, import_react.useMemo)(() => paint((ctx, w, h) => {
		ctx.fillStyle = "#f8fafc";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#2563eb";
		ctx.fillRect(0, 0, w, 18);
		ctx.fillRect(0, h - 18, w, 18);
		ctx.fillStyle = "#f97316";
		ctx.font = "800 92px Impact, Arial Black, sans-serif";
		ctx.textAlign = "center";
		ctx.fillText("WANTED FUEL", w / 2, h * .68);
	}, 1024, 280), []);
	const monitor = (0, import_react.useMemo)(() => paint((ctx, w, h) => {
		drawMonitor(ctx, w, h);
	}, 640, 400), []);
	const poster = (0, import_react.useMemo)(() => paint((ctx, w, h) => {
		drawPoster(ctx, w, h);
	}, 512, 680), []);
	const prop = (0, import_react.useRef)(null);
	const bar = (0, import_react.useRef)(null);
	useFrame(() => {
		monitor.key = `${sim.money}|${sim.stars.toFixed(1)}|${sim.tipI}|${sim.review}|${sim.customer}|${sim.day}`;
		drawMonitor(monitor.ctx, 640, 400);
		monitor.tex.needsUpdate = true;
		const wk = `${sim.warrant}|${sim.posterUp}`;
		if (poster.key !== wk) {
			poster.key = wk;
			drawPoster(poster.ctx, 512, 680);
			poster.tex.needsUpdate = true;
		}
		const root = prop.current;
		if (root) {
			const vis = (name, on) => {
				const o = root.getObjectByName(name);
				if (o) o.visible = on;
			};
			vis("prop-nozzle", sim.hold !== "nozzle");
			vis("prop-charger", sim.hold !== "charger");
			vis("prop-sponge", sim.hold !== "sponge");
			vis("prop-burger", sim.hold !== "burger" && sim.burgers > 0);
			vis("prop-cap", sim.hold !== "cap" && sim.caps > 0);
			vis("prop-taser", sim.hold !== "taser");
		}
		if (bar.current) bar.current.rotation.x = -1.25 * sim.barrier;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				0,
				0
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [90, 90] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#f0c56b" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.02,
				.55
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [46, 3.5] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#2c313a" })]
		}),
		[
			-8,
			-4,
			0,
			4,
			8,
			12
		].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				x,
				.03,
				.55
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.1, .12] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#f8fafc" })]
		}, x)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { sign: sign.tex }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canopy, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Props, {
			root: prop,
			monitor: monitor.tex,
			poster: poster.tex
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shredder, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: bar,
			position: [
				-4.55,
				1.05,
				-.15
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.35,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.18,
					.7,
					.18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#e5e7eb" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.05,
					1
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.12,
					.1,
					2
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#ef4444" })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cacti, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mountains, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pumpkins, {})
	] });
}
function Building({ sign }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-6.2,
				1.7,
				-5.9
			],
			castShadow: true,
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				9.6,
				3.4,
				4.4
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#f8fafc" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-6.2,
				3.55,
				-5.9
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				10,
				.28,
				4.8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#fb923c" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-4.2,
				1.35,
				-3.65
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				3.4,
				2.3,
				.12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#3b82f6" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-8.3,
				1.35,
				-3.65
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				2.6,
				2.3,
				.12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#60a5fa" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-6.2,
				2.55,
				-3.62
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [4.6, 1.15] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				map: sign,
				toneMapped: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-2.2,
				1.7,
				-4.2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.7,
				2.2,
				.7
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#7c6bf2" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-2.2,
				2.5,
				-4.2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.74,
				.35,
				.74
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#ffffff" })]
		})
	] });
}
function Canopy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.4,
				3.25,
				2.55
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				7.2,
				.16,
				4.5
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#fb923c" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.4,
				3.05,
				2.55
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				6.8,
				.08,
				4.2
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#fff7ed" })]
		}),
		[
			[-2.5, 1.15],
			[3.35, 1.15],
			[-2.5, 4.35],
			[3.35, 4.35]
		].map(([x, z]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				x,
				0,
				z
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.55,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.28,
					3.1,
					.28
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#7c6bf2" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					2.15,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.32,
					.38,
					.32
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#ffffff" })]
			})]
		}, `${x}-${z}`)),
		[
			[
				-1.2,
				2.95,
				1.4
			],
			[
				1.5,
				2.95,
				1.4
			],
			[
				-1.2,
				2.95,
				3.5
			],
			[
				1.5,
				2.95,
				3.5
			]
		].map(([x, y, z]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				x,
				y,
				z
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				1.5,
				.08,
				.18
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#f8fafc",
				emissive: "#ffffff",
				emissiveIntensity: .7
			})]
		}, `${x}-${z}`))
	] });
}
function Props({ root, monitor, poster }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: root,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.95,
					.52,
					2.66
				],
				castShadow: true,
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					3.05,
					1.04,
					.78
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#4f7cff" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.95,
					1.08,
					2.66
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					3.15,
					.1,
					.9
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#3b5bdb" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.15,
					1.55,
					2.28
				],
				rotation: [
					-.35,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.15,
					.78,
					.06
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: monitor,
					toneMapped: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "prop-gold",
				position: [
					1.02,
					1.2,
					2.46
				],
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.2,
					.2,
					.08,
					20
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#f5c542",
					emissive: "#f59e0b",
					emissiveIntensity: .35
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					1.02,
					1.26,
					2.46
				],
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.1, 16] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#166534" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "prop-sponge",
				position: [
					1.62,
					1.18,
					2.42
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.28,
					.12,
					.18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#facc15" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					1.62,
					1.22,
					2.42
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.28,
					.06,
					.18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#22c55e" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "prop-taser",
				position: [
					1.82,
					1.18,
					2.62
				],
				rotation: [
					0,
					.4,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.28,
					.12,
					.1
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#334155" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.18,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.12,
						.08,
						.08
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#3b82f6" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				name: "prop-cap",
				position: [
					2.05,
					1.18,
					2.4
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.2,
					.08,
					.16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#ef4444" })] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "prop-nozzle",
				position: [
					-.28,
					1.25,
					1.45
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						.4,
						0,
						.6
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.28,
						.1,
						.1
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#111827" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.12,
						.04,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.1,
						.1,
						.1
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#22c55e" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "prop-charger",
				position: [
					-.95,
					1.22,
					1.55
				],
				rotation: [
					.6,
					.2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.22,
					.1,
					.1
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#1d4ed8" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.12,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.08,
						.12,
						.12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#38bdf8" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.32,
					.7,
					1.5
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.55,
					1.35,
					.5
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#2563eb" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.32,
					1.42,
					1.5
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.62,
					.12,
					.58
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#1d4ed8" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-1.2,
					0,
					3.25
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.7,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.7,
							1.4,
							.55
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#60a5fa" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.85,
							.28
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.5,
							.7,
							.05
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#bfdbfe" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						name: "prop-burger",
						position: [
							.15,
							1.05,
							.32
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.22,
							.12,
							.16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#d97706" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.35,
					1.2,
					2.95
				],
				rotation: [
					-.15,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.42, .56] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: poster,
					toneMapped: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					2.15,
					0,
					1.85
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							2.7,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.08,
							1.5,
							.08
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#facc15" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							2.15,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.42,
							1.15,
							.18
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#1f2937" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							2.42,
							.12
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.2, 20] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#ef4444",
							emissive: "#ef4444",
							emissiveIntensity: .55
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							2.42,
							.16
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.06,
							8,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#f8fafc" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.92,
							.12
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.2, 20] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#22c55e",
							emissive: "#22c55e",
							emissiveIntensity: .45
						})]
					})
				]
			})
		]
	});
}
function Shredder() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			-4.05,
			0,
			3.55
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.85,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.3,
					1.7,
					1.15
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#1d4ed8" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.15,
					.5
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.7,
					.45,
					.2
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#111827" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.85,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.35,
					.35,
					1.2
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#93c5fd" })]
			}),
			[
				-.3,
				-.1,
				.1,
				.3
			].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x,
					.55,
					.35
				],
				rotation: [
					.4,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
					.08,
					.22,
					5
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#9ca3af" })]
			}, x))
		]
	});
}
function Cacti() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: [
		[8.5, -3.2],
		[12, -5],
		[6.2, -6.5],
		[14, 3.5],
		[-13, -2],
		[-12, 4],
		[4.5, 6.2],
		[-8, 5.5]
	].map(([x, z]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			x,
			0,
			z
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.7,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
				.16,
				.9,
				4,
				6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#22c55e" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.28,
				.7,
				0
			],
			rotation: [
				0,
				0,
				-.9
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
				.08,
				.35,
				3,
				5
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#16a34a" })]
		})]
	}, `${x}-${z}`)) });
}
function Mountains() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [[
		[
			-16,
			-18,
			7,
			"#c2885a"
		],
		[
			-6,
			-20,
			9,
			"#a8744a"
		],
		[
			6,
			-19,
			8,
			"#b skip"
		]
	].filter((m) => m[3] !== "#b skip").map(([x, z, s, color]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			Number(x),
			Number(s) * .25,
			Number(z)
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
			Number(s) * .7,
			Number(s),
			5
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: String(color) })]
	}, `${x}`)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			10,
			2.2,
			-18
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
			6,
			7,
			5
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#b87a4e" })]
	})] });
}
function Pumpkins() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: [[-3.2, 4.8], [4.2, 4.6]].map(([x, z]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			x,
			.22,
			z
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			.22,
			10,
			8
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#f97316" })]
	}, x)) });
}
function LiveCar() {
	const ref = (0, import_react.useRef)(null);
	const [look, setLook] = (0, import_react.useState)({
		id: -1,
		color: "#f59e0b",
		shirt: "#fff",
		hat: null,
		skin: "#ffbea0",
		devil: false
	});
	useFrame(() => {
		const g = ref.current;
		const c = sim.car;
		if (!g) return;
		if (!c) {
			g.visible = false;
			return;
		}
		g.visible = true;
		g.position.set(c.x, 0, c.z);
		g.rotation.y = c.yaw + Math.PI;
		if (c.id !== look.id || c.hat !== look.hat || c.color !== look.color) setLook({
			id: c.id,
			color: c.color,
			shirt: c.shirt,
			hat: c.hat,
			skin: c.skin,
			devil: c.devil
		});
		const mud = g.getObjectByName("mud");
		if (mud) mud.visible = c.dirty > .2 && c.wash < .95;
		const hat = g.getObjectByName("hat");
		if (hat) hat.visible = Boolean(c.hat);
		const horns = g.getObjectByName("horns");
		if (horns) horns.visible = c.horns;
		const flames = g.getObjectByName("flames");
		if (flames) flames.visible = c.devil;
		const poop = g.getObjectByName("poop");
		if (poop) poop.visible = c.devil && c.dirty > .25 && c.wash < .9;
		const cheese = g.getObjectByName("cheese");
		if (cheese) cheese.visible = c.loose;
		const mirror = g.getObjectByName("mirror");
		if (mirror) mirror.visible = c.mirror;
		const outline = g.getObjectByName("outline");
		if (outline) outline.visible = Boolean(sim.up.scanner && c.wanted && !c.caught);
		const head = g.getObjectByName("head");
		if (head) head.rotation.z = c.caught ? .9 : c.asleep ? .35 : 0;
		const bar = g.getObjectByName("fuelbar");
		if (bar) {
			bar.scale.z = Math.max(.05, c.fuel);
			bar.visible = (c.job === "fuel" || c.job === "charge") && c.phase === "wait";
			const mat = bar.material;
			if (!Array.isArray(mat)) mat.color.set(c.job === "charge" ? "#38bdf8" : "#facc15");
		}
		const cap = g.getObjectByName("gascap");
		if (cap) {
			cap.visible = c.capped || c.job !== "cap";
			const mat = cap.material;
			if (!Array.isArray(mat)) mat.color.set(c.capped ? "#ef4444" : "#94a3b8");
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		visible: false,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "outline",
				position: [
					0,
					.8,
					0
				],
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.45,
					1.7,
					2.55
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					color: "#ef4444",
					wireframe: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.5,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.15,
					.48,
					2.25
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: look.color })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.05,
					.05
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.05,
					.5,
					1.15
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: look.color })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "flames",
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.02,
						.78,
						.95
					],
					rotation: [
						.4,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.7,
						.06,
						.18
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#f97316" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.02,
						.74,
						.72
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.45,
						.05,
						.12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#ef4444" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "poop",
				position: [
					.05,
					.86,
					.55
				],
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.12,
					8,
					6
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#7c4a2d" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.54,
					1.08,
					.1
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.04,
					.32,
					.7
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#0f172a" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "mud",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.58,
							.55,
							.3
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.16,
							8,
							6
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#b45309" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.55,
							.62,
							-.35
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.18,
							8,
							6
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#c2410c" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.5,
							.7,
							.7
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.12,
							8,
							6
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#9a3412" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, { at: [
				-.48,
				.28,
				.75
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, { at: [
				.48,
				.28,
				.75
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, { at: [
				-.48,
				.28,
				-.75
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, { at: [
				.48,
				.28,
				-.75
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "mirror",
				position: [
					.62,
					1.15,
					.72
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.12,
					.1,
					.16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#e5e7eb" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "gascap",
				position: [
					.6,
					.7,
					-.85
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.16,
					.12,
					.18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#94a3b8" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "cheese",
				position: [
					-.15,
					.95,
					-.35
				],
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.14,
					.08,
					.12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#facc15" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "fuelbar",
				position: [
					.66,
					.95,
					-.55
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.06,
					.06,
					.7
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#facc15" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "head",
				position: [
					.22,
					1.15,
					.12
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.22,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.2,
							14,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: look.skin })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.08,
							.26,
							.12
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.045,
							8,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#fff" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.08,
							.26,
							.12
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.045,
							8,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#fff" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.08,
							.26,
							.155
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.02,
							6,
							6
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#111" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.08,
							.26,
							.155
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.02,
							6,
							6
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#111" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							-.05,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.32,
							.28,
							.22
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: look.shirt })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						name: "hat",
						position: [
							0,
							.4,
							0
						],
						visible: Boolean(look.hat),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.16,
							.18,
							.12,
							10
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: look.hat ?? "#22c55e" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "horns",
						visible: look.devil,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								-.08,
								.4,
								0
							],
							rotation: [
								0,
								0,
								.4
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
								.05,
								.22,
								6
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#ef4444" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								.08,
								.4,
								0
							],
							rotation: [
								0,
								0,
								-.4
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
								.05,
								.22,
								6
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#ef4444" })]
						})]
					})
				]
			})
		]
	});
}
function Wheel({ at }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: at,
		rotation: [
			0,
			0,
			Math.PI / 2
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.22,
				.22,
				.16,
				12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#1f2937" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.09,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.1,
				.1,
				.04,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#dbe4ee" })]
		})]
	});
}
function Bubble() {
	const ref = (0, import_react.useRef)(null);
	const art = (0, import_react.useMemo)(() => paint(() => void 0, 256, 256), []);
	useFrame(() => {
		const mesh = ref.current;
		const c = sim.car;
		if (!mesh) return;
		if (!c || c.phase === "leave") {
			mesh.visible = false;
			return;
		}
		mesh.visible = true;
		const p = carPoint(c, .15, 2.05, .1);
		mesh.position.set(p.x, p.y, p.z);
		mesh.lookAt(sim.player.x, 1.5, sim.player.z);
		const key = `${c.id}:${c.job}:${c.asleep}:${c.caught}:${Math.floor(c.fuel * 5)}:${c.wash > .95}:${sim.posterUp}:${c.grade}`;
		if (art.key !== key) {
			art.key = key;
			drawBubble(art.ctx, c);
			art.tex.needsUpdate = true;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref,
		visible: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.7, .7] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			map: art.tex,
			transparent: true,
			toneMapped: false
		})]
	});
}
function Bills() {
	const ref = (0, import_react.useRef)(null);
	useFrame(() => {
		const g = ref.current;
		if (!g) return;
		for (let i = 0; i < g.children.length; i++) {
			const m = g.children[i];
			const b = sim.bills[i];
			if (!b) {
				m.visible = false;
				continue;
			}
			m.visible = true;
			m.position.set(b.x, b.y, b.z);
			const s = .7 + Math.min(.8, b.amount / 180);
			m.scale.setScalar(s);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref,
		children: Array.from({ length: 6 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			visible: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.28,
				.08,
				.16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#4ade80" })]
		}, i))
	});
}
function Bits() {
	const ref = (0, import_react.useRef)(null);
	useFrame(() => {
		const g = ref.current;
		if (!g) return;
		for (let i = 0; i < g.children.length; i++) {
			const m = g.children[i];
			const b = sim.bits[i];
			if (!b) {
				m.visible = false;
				continue;
			}
			m.visible = true;
			m.position.set(b.x, b.y, b.z);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref,
		children: Array.from({ length: 16 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			visible: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.1,
				.1,
				.1
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: i % 2 ? "#22c55e" : "#facc15" })]
		}, i))
	});
}
function Marker() {
	const ref = (0, import_react.useRef)(null);
	useFrame(() => {
		const m = ref.current;
		if (!m) return;
		m.visible = sim.phase === "play" && sim.aimKind !== "";
		m.position.set(sim.aimPos.x, sim.aimPos.y, sim.aimPos.z);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref,
		visible: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			.07,
			8,
			8
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#facc15" })]
	});
}
function Hands() {
	const ref = (0, import_react.useRef)(null);
	useFrame((state) => {
		const g = ref.current;
		if (!g || sim.phase === "title") {
			if (g) g.visible = false;
			return;
		}
		g.visible = true;
		const cam = state.camera;
		g.position.copy(cam.position);
		g.rotation.copy(cam.rotation);
		const poster = g.getObjectByName("poster");
		if (poster) poster.visible = sim.posterUp;
		const tool = g.getObjectByName("tool");
		if (tool) tool.visible = sim.hold !== "none";
		const nozzle = g.getObjectByName("h-nozzle");
		const sponge = g.getObjectByName("h-sponge");
		const burger = g.getObjectByName("h-burger");
		const cap = g.getObjectByName("h-cap");
		const taser = g.getObjectByName("h-taser");
		const cash = g.getObjectByName("h-cash");
		const mirror = g.getObjectByName("h-mirror");
		if (nozzle) nozzle.visible = sim.hold === "nozzle";
		if (sponge) sponge.visible = sim.hold === "sponge";
		if (burger) burger.visible = sim.hold === "burger";
		if (cap) cap.visible = sim.hold === "cap";
		if (taser) taser.visible = sim.hold === "taser";
		if (cash) cash.visible = sim.hold === "cash";
		if (mirror) mirror.visible = sim.hold === "mirror";
		const charger = g.getObjectByName("h-charger");
		const hat = g.getObjectByName("h-hat");
		const cheese = g.getObjectByName("h-cheese");
		const horns = g.getObjectByName("h-horns");
		if (charger) charger.visible = sim.hold === "charger";
		if (hat) {
			hat.visible = sim.hold === "hat";
			const mat = hat.material;
			if (!Array.isArray(mat)) mat.color.set(sim.hatColor);
		}
		if (cheese) cheese.visible = sim.hold === "cheese";
		if (horns) horns.visible = sim.wornHorns;
		const bob = Math.sin(sim.clock * 2) * .01;
		g.position.y += bob;
	});
	const poster = (0, import_react.useMemo)(() => paint((ctx, w, h) => drawPoster(ctx, w, h), 512, 680), []);
	useFrame(() => {
		const key = String(sim.warrant);
		if (poster.key !== key) {
			poster.key = key;
			drawPoster(poster.ctx, 512, 680);
			poster.tex.needsUpdate = true;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.32,
					-.28,
					-.55
				],
				rotation: [
					.2,
					.2,
					.4
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.16,
					.08,
					.2
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#ffc2a8" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.34,
					-.26,
					-.52
				],
				rotation: [
					.3,
					-.3,
					-.2
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.18,
					.09,
					.22
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#ffc2a8" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "poster",
				position: [
					-.16,
					-.02,
					-.62
				],
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.34, .46] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: poster.tex,
					toneMapped: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "tool",
				position: [
					.28,
					-.18,
					-.62
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "h-nozzle",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							rotation: [
								0,
								0,
								.5
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.32,
								.08,
								.08
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#111827" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								.16,
								.02,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.1,
								.1,
								.1
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#22c55e" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						name: "h-sponge",
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.2,
							.08,
							.14
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#facc15" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						name: "h-burger",
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.16,
							.1,
							.14
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#d97706" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						name: "h-cap",
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.14,
							.06,
							.12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#ef4444" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						name: "h-taser",
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.26,
							.1,
							.08
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#2563eb" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						name: "h-cash",
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.2,
							.06,
							.12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#4ade80" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						name: "h-mirror",
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.14,
							.1,
							.08
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#e5e7eb" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "h-charger",
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							rotation: [
								0,
								0,
								.4
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.26,
								.08,
								.08
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#1d4ed8" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								.14,
								.02,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.08,
								.1,
								.1
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#38bdf8" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						name: "h-hat",
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.1,
							.12,
							.08,
							10
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#facc15" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						name: "h-cheese",
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.12,
							.06,
							.1
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#fde047" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "h-horns",
				position: [
					0,
					.16,
					-.42
				],
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.08,
						0,
						0
					],
					rotation: [
						.2,
						0,
						.5
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
						.035,
						.16,
						6
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#ef4444" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.08,
						0,
						0
					],
					rotation: [
						.2,
						0,
						-.5
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
						.035,
						.16,
						6
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#ef4444" })]
				})]
			})
		]
	});
}
function drawMonitor(ctx, w, h) {
	ctx.fillStyle = "#5eead4";
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = "#134e4a";
	ctx.font = "800 40px Arial, sans-serif";
	ctx.textAlign = "left";
	ctx.fillText("WANTED FUEL", 28, 52);
	ctx.font = "700 28px Arial, sans-serif";
	ctx.fillText(`★ ${sim.stars.toFixed(1)}    ngày ${sim.day}`, 28, 96);
	ctx.font = "800 84px Arial, sans-serif";
	ctx.fillText(`$${sim.money}`, 28, 196);
	ctx.fillStyle = "#fbcfe8";
	ctx.fillRect(0, 230, w, h - 230);
	ctx.fillStyle = "#831843";
	ctx.font = "700 30px Arial, sans-serif";
	ctx.fillText(sim.customer ? `- ${sim.customer}` : "- quầy trống", 28, 278);
	ctx.font = "600 24px Arial, sans-serif";
	wrap(ctx, TIPS[sim.tipI] ?? "", 28, 322, w - 56, 30);
	ctx.fillText(sim.review, 28, 382);
}
function drawPoster(ctx, w, h) {
	const face = WARRANTS[sim.warrant % WARRANTS.length];
	ctx.fillStyle = "#f8f1dc";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "#d6c7a1";
	ctx.lineWidth = 8;
	for (let y = 150; y < 460; y += 28) {
		ctx.beginPath();
		ctx.moveTo(40, y);
		ctx.lineTo(w - 40, y);
		ctx.stroke();
	}
	ctx.fillStyle = "#dc2626";
	ctx.font = "800 78px Impact, Arial Black, sans-serif";
	ctx.textAlign = "center";
	ctx.fillText("WANTED", w / 2, 100);
	ctx.fillStyle = "#ffbea0";
	ctx.beginPath();
	ctx.arc(w / 2, 250, 78, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#fff";
	ctx.beginPath();
	ctx.arc(w / 2 - 28, 246, 16, 0, Math.PI * 2);
	ctx.arc(w / 2 + 28, 246, 16, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#111";
	ctx.beginPath();
	ctx.arc(w / 2 - 28, 248, 7, 0, Math.PI * 2);
	ctx.arc(w / 2 + 28, 248, 7, 0, Math.PI * 2);
	ctx.fill();
	if (face.hat) {
		ctx.fillStyle = face.hat;
		ctx.fillRect(w / 2 - 80, 175, 160, 36);
	}
	ctx.fillStyle = face.shirt;
	ctx.fillRect(w / 2 - 70, 330, 140, 90);
	ctx.fillStyle = "#111827";
	ctx.font = "800 36px Arial, sans-serif";
	ctx.fillText(face.name, w / 2, 500);
	ctx.fillStyle = "#b91c1c";
	ctx.font = "800 40px Arial, sans-serif";
	ctx.fillText(`$${face.bounty}`, w / 2, 560);
	ctx.fillStyle = "#44403c";
	ctx.font = "600 24px Arial, sans-serif";
	wrap(ctx, face.line, 36, 610, w - 72, 28);
	ctx.textAlign = "left";
}
function drawBubble(ctx, c) {
	ctx.clearRect(0, 0, 256, 256);
	ctx.fillStyle = "#ffffff";
	ctx.beginPath();
	ctx.ellipse(128, 112, 104, 78, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.beginPath();
	ctx.moveTo(100, 175);
	ctx.lineTo(80, 220);
	ctx.lineTo(140, 180);
	ctx.fill();
	ctx.fillStyle = "#111827";
	ctx.textAlign = "center";
	if (c.caught) {
		ctx.fillStyle = "#dc2626";
		ctx.font = "800 42px Arial";
		ctx.fillText("ĐÃ BẮT", 128, 124);
		return;
	}
	if (c.asleep) {
		ctx.font = "800 64px Arial";
		ctx.fillText("Zzz", 128, 130);
		return;
	}
	if (c.job === "fuel") {
		ctx.fillStyle = "#1d4ed8";
		ctx.fillRect(78, 78, 36, 54);
		ctx.fillStyle = "#111827";
		ctx.font = "800 42px Arial";
		ctx.fillText(c.grade === "diesel" ? "DẦU" : c.grade, 150, 122);
	} else if (c.job === "wash") {
		ctx.fillStyle = "#facc15";
		ctx.fillRect(78, 70, 100, 46);
		ctx.fillStyle = "#22c55e";
		ctx.fillRect(78, 108, 100, 36);
	} else if (c.job === "food") {
		ctx.fillStyle = "#f59e0b";
		ctx.beginPath();
		ctx.ellipse(128, 118, 58, 28, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#65a30d";
		ctx.fillRect(80, 108, 96, 12);
		ctx.fillStyle = "#b45309";
		ctx.fillRect(80, 120, 96, 14);
	} else if (c.job === "charge") {
		ctx.fillStyle = "#2563eb";
		ctx.fillRect(96, 78, 34, 48);
		ctx.fillRect(104, 124, 18, 14);
		ctx.fillStyle = "#111827";
		ctx.font = "800 28px Arial";
		ctx.fillText("18 kWh", 128, 168);
	} else {
		ctx.fillStyle = "#ef4444";
		ctx.fillRect(86, 78, 84, 58);
		ctx.fillStyle = "#fff";
		ctx.font = "800 28px Arial";
		ctx.fillText("NẮP", 128, 114);
	}
	if (c.wanted && sim.posterUp) {
		ctx.fillStyle = "#dc2626";
		ctx.font = "800 22px Arial";
		ctx.fillText("KHỚP", 128, 64);
	}
	ctx.textAlign = "left";
}
function wrap(ctx, text, x, y, max, lh) {
	const words = text.split(" ");
	let line = "";
	let yy = y;
	const align = ctx.textAlign;
	for (const word of words) {
		const test = line ? `${line} ${word}` : word;
		if (ctx.measureText(test).width > max) {
			ctx.fillText(line, align === "center" ? x + max / 2 : x, yy);
			line = word;
			yy += lh;
		} else line = test;
	}
	if (line) ctx.fillText(line, align === "center" ? x + max / 2 : x, yy);
}
function Home() {
	const [on, setOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-dvh w-full overflow-hidden bg-ink text-cream",
		children: [on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
			className: "absolute inset-0 touch-none",
			shadows: true,
			dpr: [1, 1.75],
			camera: {
				fov: 72,
				near: .08,
				far: 140,
				position: [
					8,
					5,
					12
				]
			},
			gl: { antialias: true },
			onPointerDown: () => {
				if (sim.phase === "play") requestLock();
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {})
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {})]
	});
}
//#endregion
export { Home as component };
