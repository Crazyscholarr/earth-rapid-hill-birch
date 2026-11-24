import { i as __toESM } from "../_runtime.mjs";
import { a as Color, c as SRGBColorSpace, d as require_react, i as CanvasTexture, n as useFrame, o as Fog, r as useThree, s as RepeatWrapping, t as Canvas, u as require_jsx_runtime } from "../_libs/@react-three/fiber+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-B1x3nzjl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GRADES = [
	{
		id: "92",
		name: "Ron 92",
		pay: 36,
		color: "#10b981"
	},
	{
		id: "95",
		name: "Ron 95",
		pay: 48,
		color: "#f59e0b"
	},
	{
		id: "98",
		name: "Ron 98",
		pay: 72,
		color: "#ef4444"
	},
	{
		id: "diesel",
		name: "Dầu",
		pay: 54,
		color: "#3b82f6"
	}
];
var WARRANTS = [
	{
		id: "worst",
		name: "Nhân viên tệ nhất",
		hat: "#2d9d5c",
		shirt: "#6ee7b7",
		bounty: 180,
		line: "Mũ xanh lá, áo bạc hà, cười nhe nguyên hàm răng"
	},
	{
		id: "thief",
		name: "Kẻ trộm nắp bình",
		hat: null,
		shirt: "#1f2937",
		bounty: 240,
		line: "Không mũ, áo đen, mắt trợn tròn như sắp rớt"
	},
	{
		id: "bully",
		name: "Kẻ bắt nạt",
		hat: "#2563eb",
		shirt: "#ea580c",
		bounty: 210,
		line: "Mũ xanh dương, áo cam, lông mày cau có"
	}
];
var TIPS = [
	"Mẹo: Bấm X hoặc Chuột phải để cất nhanh đồ đang cầm.",
	"Đổ đúng loại xăng trên bong bóng thì khách mới chịu trả tiền.",
	"Bấm Q để giơ tờ truy nã, so kỹ mặt, mũ và áo tài xế!",
	"Thấy tội phạm? Bấm R (đầu lâu) khóa làn, rồi giật điện 2 phát.",
	"Tiền nhặt xong nhớ đập vào nút $ vàng trên quầy.",
	"Tháo gương chiếu hậu bỏ máy nghiền kiếm thêm... miễn đừng nghiền người.",
	"Xe lấm lem bùn đất? Rửa sạch luôn được khách boa thêm $22!",
	"Xe điện màu xanh lá chỉ cắm sạc 18 kWh, đừng dí vòi xăng vào.",
	"Sừng quỷ thực ra là băng đô Shopee. Giật về đội cho oách!",
	"Thấy miếng phô mai thiu trong xe quỷ? Tịch thu bỏ máy thu hồi ngay."
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
	"#3b78b8",
	"#3a9d6e",
	"#d64545",
	"#e09f3e",
	"#8b5cf6",
	"#e06d83",
	"#2b9eb3",
	"#d96b34"
];
var input = {
	keys: /* @__PURE__ */ new Set(),
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
		if (e.button === 2 && document.pointerLockElement) input.dropPulse = true;
	};
	const mouseUp = (e) => {
		if (e.button === 0) input.shootHeld = false;
	};
	const ctxMenu = (e) => {
		if (document.pointerLockElement) e.preventDefault();
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
	},
	aimProgress: 0,
	usePulse: 0
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
		max: 3.1
	},
	sponge: {
		x: 1.62,
		y: 1.18,
		z: 2.42,
		max: 2.8
	},
	burger: {
		x: -1.15,
		y: 1.15,
		z: 3.15,
		max: 2.8
	},
	cap: {
		x: 2.05,
		y: 1.16,
		z: 2.42,
		max: 2.8
	},
	taser: {
		x: 1.82,
		y: 1.16,
		z: 2.62,
		max: 2.8
	},
	gold: {
		x: 1.02,
		y: 1.16,
		z: 2.46,
		max: 2.8
	},
	skull: {
		x: 2.15,
		y: 2.42,
		z: 1.85,
		max: 3.8
	},
	go: {
		x: 2.15,
		y: 1.92,
		z: 1.85,
		max: 3.8
	},
	shred: {
		x: -4.05,
		y: 1.15,
		z: 3.55,
		max: 3
	},
	charger: {
		x: -.95,
		y: 1.18,
		z: 1.55,
		max: 3
	}
};
var aim = null;
function aimBias(kind) {
	const h = sim.hold;
	if ((h === "nozzle" || h === "charger") && kind === "fuel") return -.45;
	if (h === "sponge" && kind === "body") return -.45;
	if ((h === "burger" || h === "cap" || h === "taser" || h === "hat") && kind === "window") return -.45;
	if (h === "cash" && (kind === "gold" || kind === "bill")) return -.5;
	if ((h === "mirror" || h === "cheese" || h === "hat") && kind === "shred") return -.45;
	if (kind === "bill") return -.25;
	return 0;
}
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
		if (dot < .68) continue;
		const score = dist + (1 - dot) * 1.5 + aimBias(t.kind);
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
		max: 2.6
	});
	for (const b of sim.bills) list.push({
		kind: "bill",
		id: b.id,
		p: {
			x: b.x,
			y: b.y + .1,
			z: b.z
		},
		max: 2.8
	});
	const c = sim.car;
	if (c && c.phase === "wait") {
		list.push({
			kind: "window",
			p: carPoint(c, .62, 1.15, .15),
			max: 2.8
		});
		list.push({
			kind: "fuel",
			p: carPoint(c, .52, .72, -.9),
			max: 2.8
		});
		list.push({
			kind: "body",
			p: carPoint(c, .72, .85, .15),
			max: 2.9
		});
		if (c.mirror && sim.hold === "none") list.push({
			kind: "mirror",
			p: carPoint(c, .78, 1.2, .72),
			max: 2.5
		});
		if (c.loose && sim.hold === "none") list.push({
			kind: "loot",
			p: carPoint(c, -.15, 1.02, -.45),
			max: 2.6
		});
	}
	consider(list);
	sim.prompt = promptFor(aim);
	sim.aimProgress = 0;
	if (c && c.phase === "wait" && aim) {
		if (aim.kind === "fuel" && (sim.hold === "nozzle" || sim.hold === "charger")) sim.aimProgress = c.fuel;
		else if (aim.kind === "body" && sim.hold === "sponge") sim.aimProgress = c.wash;
		else if (aim.kind === "mirror" && sim.hold === "none") sim.aimProgress = Math.min(1, sim.steal / .55);
	}
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
		life: 55,
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
	if (c.wanted && !c.caught) return "Mặt này quen đến mức hơi rợn người.";
	if (!ok) return "Đổ nhầm xăng rồi. Xe ho khù khụ giữa sa mạc!";
	if (c.job === "charge") return "18 kWh. Đầy pin rồi, cảm ơn trạm nhé!";
	if (c.job === "wash") return c.devil ? "Sạch bóng! Mà sừng là hàng Shopee, đừng giật." : "Bóng loáng như mới xuất xưởng!";
	if (c.job === "food") return "Bánh ngon bá cháy, không hỏi nhân thịt gì.";
	if (c.job === "cap") return "Nắp đỏ chót, đúng gu thẩm mỹ của tui.";
	if (c.devil) return "Lâu rồi mới ghé. Nhìn tui hiền vậy thôi!";
	return "Dịch vụ 10 điểm! Lần sau ghé tiếp.";
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
		wrongFuel: 0,
		warnedWrong: false,
		mad: false,
		mirror: true,
		patience: 40,
		maxPatience: 40,
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
		if (sim.grade !== c.grade) {
			c.wrongFuel += dt * (sim.up.pump ? .48 : .26);
			if (c.wrongFuel > .22) c.gradeOk = false;
			if (!c.warnedWrong) {
				c.warnedWrong = true;
				toast(`Nhầm loại! Đổi phím 1-4 sang ${gradeName(c.grade)} ngay.`);
				sfx.error();
			}
		}
		c.fuel = Math.min(1, c.fuel + dt * (sim.up.pump ? .48 : .26));
		sim.usePulse = 1;
		if (sim.sfxCd <= 0) {
			sfx.pump();
			sim.sfxCd = .28;
		}
		tryFinish(c);
		return;
	}
	if (aim.kind === "body" && sim.hold === "sponge") {
		c.wash = Math.min(1, c.wash + dt * (sim.up.scrub ? .7 : .38));
		sim.usePulse = 1;
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
	const wantOpen = !sim.car || sim.car.phase === "leave" || sim.car.phase === "arrive" && !sim.skull;
	sim.barrier += ((wantOpen ? 1 : 0) - sim.barrier) * Math.min(1, dt * 5);
	sim.usePulse = Math.max(0, sim.usePulse - dt * 6);
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
	if (input.wheel !== 0 && sim.hold === "nozzle") {
		const order = [
			"92",
			"95",
			"98",
			"diesel"
		];
		sim.grade = order[(order.indexOf(sim.grade) + (input.wheel > 0 ? 1 : -1) + order.length) % order.length];
		sfx.ui();
	}
	input.wheel = 0;
}
function dropHeld() {
	if (sim.hold === "none") return;
	if (sim.hold === "cash") {
		toast("Đang ôm tiền — nạp vào nút $ vàng trên quầy!");
		return;
	}
	stow();
	sfx.ui();
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
	if (sim.phase === "title") {
		sim.orbit += dt * .12;
		input.lookX = 0;
		input.lookY = 0;
		input.dropPulse = false;
		input.wheel = 0;
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
		input.dropPulse = false;
		input.wheel = 0;
		if (pressedFresh("Escape") || pressedFresh("KeyB")) {
			if (sim.phase === "shop" || sim.phase === "pause") sim.phase = "play";
		}
		endKeys();
		emit();
		return;
	}
	const prevNight = sim.night;
	sim.clock += dt;
	sim.night = nightAmount(sim.clock);
	if (prevNight > .75 && sim.night < .2) {
		sim.day += 1;
		toast(`Ngày ${sim.day}. Đêm qua nhiều khách lạ.`);
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
	if (!sim.qaOverride && (pressedFresh("KeyX") || input.dropPulse)) dropHeld();
	input.dropPulse = false;
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
	const c = sim.car;
	return {
		phase: sim.phase,
		money: sim.money,
		stars: sim.stars.toFixed(1),
		day: sim.day,
		night: sim.night > .55,
		objective: sim.objective,
		prompt: sim.prompt,
		aimKind: sim.aimKind,
		aimProgress: sim.aimProgress,
		cashAmt: sim.cashAmt,
		toast: sim.toastT > 0 ? sim.toast : "",
		hold: sim.hold,
		grade: sim.grade,
		poster: sim.posterUp,
		skull: sim.skull,
		review: sim.review,
		tip: TIPS[sim.tipI] ?? TIPS[0],
		customer: sim.customer,
		carInfo: c && c.phase === "wait" ? {
			name: c.name,
			job: c.job,
			grade: c.grade,
			patience: Math.max(0, Math.min(1, c.patience / c.maxPatience)),
			asleep: c.asleep,
			caught: c.caught,
			served: c.served,
			dirty: c.dirty > .2 && c.wash < .95
		} : null,
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
function holdLabel(hold, grade, cashAmt) {
	switch (hold) {
		case "nozzle": return `Vòi xăng · ${GRADES.find((g) => g.id === grade)?.name ?? grade}`;
		case "charger": return "Đầu sạc EV";
		case "sponge": return "Miếng rửa xe";
		case "burger": return "Bánh hamburger";
		case "cap": return "Nắp bình đỏ";
		case "taser": return "Súng điện";
		case "cash": return `Tiền mặt $${cashAmt}`;
		case "mirror": return "Gương chiếu hậu";
		case "hat": return "Mũ tài xế";
		case "cheese": return "Phô mai tịch thu";
		default: return "";
	}
}
function jobLabel(job, grade) {
	switch (job) {
		case "fuel": return `Đổ ${GRADES.find((g) => g.id === grade)?.name ?? grade}`;
		case "wash": return "Rửa xe";
		case "food": return "Ăn hamburger";
		case "cap": return "Lắp nắp đỏ";
		case "charge": return "Sạc 18 kWh";
	}
}
function Hud() {
	const snap = (0, import_react.useSyncExternalStore)(subscribe, getSnap, getSnap);
	const [coarse, setCoarse] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setCoarse(isCoarse()), []);
	const holdText = holdLabel(snap.hold, snap.grade, snap.cashAmt);
	const car = snap.carInfo;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 text-cream select-none",
		children: [
			snap.phase === "play" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-3 left-3 flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel max-w-[18rem] px-3.5 py-2.5 text-sm leading-snug",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-gold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Ngày ", snap.day] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "opacity-50",
									children: "·"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: snap.night ? "Ca đêm" : "Ban ngày" }),
								snap.skull ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-auto rounded bg-danger/90 px-1.5 py-0.5 text-[9px] text-white",
									children: "KHÓA LÀN"
								}) : null
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 font-semibold text-cream",
							children: snap.objective
						})]
					}), car ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel max-w-[18rem] px-3.5 py-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-cream",
									children: car.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-md bg-white/10 px-1.5 py-0.5 font-medium text-gold",
									children: car.caught ? "Đã bắt" : car.asleep ? "Đang ngủ Zzz" : car.served ? "Đã xong" : jobLabel(car.job, car.grade)
								})]
							}),
							!car.caught && !car.served ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `h-full transition-all duration-150 ${car.patience > .45 ? "bg-go" : car.patience > .22 ? "bg-gold" : "bg-danger"}`,
									style: { width: `${Math.round(car.patience * 100)}%` }
								})
							}) : null,
							car.dirty && car.job !== "wash" && !car.caught ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-cream-dim/90",
								children: "Mẹo: Xe bẩn — rửa thêm để được boa +$22"
							}) : null
						]
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-3 right-3 flex flex-col items-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel px-3.5 py-2 text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-2xl leading-none tracking-wide text-gold",
							children: ["$", snap.money]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-xs text-cream-dim",
							children: ["★ ", snap.stars]
						})]
					}), holdText ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel flex items-center gap-2 px-3 py-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-cream-dim",
							children: "Đang cầm:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-gold",
							children: holdText
						})]
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
					children: [snap.aimProgress > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						className: "h-11 w-11 -rotate-90",
						viewBox: "0 0 44 44",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "22",
							cy: "22",
							r: "18",
							fill: "none",
							stroke: "rgba(255,255,255,0.2)",
							strokeWidth: "3.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "22",
							cy: "22",
							r: "18",
							fill: "none",
							stroke: "#f0b429",
							strokeWidth: "3.5",
							strokeLinecap: "round",
							strokeDasharray: 2 * Math.PI * 18,
							strokeDashoffset: 2 * Math.PI * 18 * (1 - snap.aimProgress)
						})]
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `crosshair absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ${snap.aimKind ? "hot" : ""}` })]
				}),
				snap.toast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-20 left-1/2 w-[min(92vw,28rem)] -translate-x-1/2 rounded-xl border border-gold/40 bg-panel/95 px-4 py-2 text-center text-sm font-semibold text-cream shadow-lg backdrop-blur-md",
					children: snap.toast
				}) : null,
				snap.showGrades ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-auto absolute bottom-36 left-1/2 flex -translate-x-1/2 gap-2",
					"data-ui": true,
					children: GRADES.map((g, i) => {
						const active = snap.grade === g.id;
						const wanted = car?.job === "fuel" && car.grade === g.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: `btn btn-fuel flex items-center gap-1.5 text-xs sm:text-sm ${active ? "on ring-2 ring-gold" : ""}`,
							onClick: () => setGrade(g.id),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block h-2.5 w-2.5 rounded-full",
									style: { background: g.color }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									i + 1,
									" · ",
									g.name
								] }),
								wanted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-gold px-1 text-[10px] font-bold text-ink",
									children: "Cần"
								}) : null
							]
						}, g.id);
					})
				}) : null,
				snap.prompt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-20 left-1/2 max-w-[90vw] -translate-x-1/2 rounded-full border border-white/15 bg-panel/90 px-4 py-2 text-center text-sm font-semibold shadow-lg backdrop-blur-md",
					children: snap.prompt
				}) : null,
				coarse ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Touch, { hold: snap.hold }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-full bg-ink/70 px-4 py-1 text-[11px] text-cream-dim backdrop-blur-sm sm:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "WASD di chuyển" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "E / Chuột trái dùng" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "X / Chuột phải cất đồ" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Q truy nã" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "R đầu lâu" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "G cho đi" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "B cửa hàng" })
					]
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
		className: "pointer-events-auto absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink/90 via-ink/45 to-transparent p-6 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel w-full max-w-md p-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.35em] text-gold",
					children: "Sa mạc · Ca đêm · Tiền mặt"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-1 text-5xl leading-none tracking-wide text-canopy sm:text-6xl",
					children: "WANTED FUEL"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm leading-relaxed text-cream-dim",
					children: [
						"Đổ đúng xăng, rửa xe lấm bùn, đưa bánh, lắp nắp đỏ. So tờ truy nã (",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "rounded bg-white/10 px-1",
							children: "Q"
						}),
						"), khóa làn đầu lâu (",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "rounded bg-white/10 px-1",
							children: "R"
						}),
						") rồi giật điện đúng mặt. Tiền nhặt xong đập vào nút $ vàng!"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-go mt-5 w-full text-lg shadow-lg",
					onClick: () => {
						startGame();
						requestLock();
					},
					children: "Vào ca ngay"
				})
			]
		})
	});
}
function Pause() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-auto absolute inset-0 grid place-items-center bg-ink/60 p-4 backdrop-blur-xs",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel w-full max-w-sm p-6 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-4xl tracking-wide",
					children: "Tạm dừng"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-cream-dim",
					children: "Chuột đang thả. Bấm Tiếp tục để khóa góc nhìn lại."
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
					children: "Cửa hàng nâng cấp"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-stop mt-2 w-full",
					onClick: wipeSave,
					children: "Xóa hồ sơ chơi lại"
				})
			]
		})
	});
}
function Shop({ snap }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-auto absolute inset-0 grid place-items-center bg-ink/65 p-4 backdrop-blur-xs",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel max-h-[88dvh] w-full max-w-md overflow-auto p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl tracking-wide",
						children: "Nâng trạm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-2xl text-gold",
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
						className: "flex items-center justify-between gap-3 rounded-xl bg-white/5 px-3 py-2.5",
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
							children: item.owned ? "Đã mua" : `$${item.cost}`
						})]
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-fuel mt-4 w-full",
					onClick: () => {
						resumeGame();
						requestLock();
					},
					children: "Đóng (B / Esc)"
				})
			]
		})
	});
}
function Touch({ hold }) {
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
				hold !== "none" && hold !== "cash" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-gold col-span-2",
					"data-ui": true,
					onClick: dropHeld,
					children: "Cất đồ"
				}) : null,
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
			args: ["#b8d4e3"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rig, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lights, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkyDecor, {}),
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
	const bg = (0, import_react.useMemo)(() => new Color("#b8d4e3"), []);
	const day = (0, import_react.useMemo)(() => new Color("#b8d4e3"), []);
	const dusk = (0, import_react.useMemo)(() => new Color("#e29d76"), []);
	const night = (0, import_react.useMemo)(() => new Color("#14192d"), []);
	(0, import_react.useEffect)(() => {
		scene.fog = new Fog("#b8d4e3", 22, 85);
	}, [scene]);
	useFrame((_, dt) => {
		tick(Math.min(.05, dt));
		const n = sim.night;
		if (n < .4) bg.copy(day).lerp(dusk, n / .4);
		else bg.copy(dusk).lerp(night, (n - .4) / .6);
		scene.background = bg;
		const fog = scene.fog;
		if (fog && "color" in fog) {
			fog.color.copy(bg);
			if ("far" in fog) fog.far = 85 - n * 34;
		}
		if (sim.phase === "title") {
			const a = sim.orbit;
			camera.position.set(Math.sin(a) * 7.8 + .2, 2.8, Math.cos(a) * 5.8 + 1.5);
			camera.lookAt(-1.4, 1.15, .5);
			return;
		}
		const bob = Math.sin(sim.clock * 9) * Math.min(.035, sim.speed * .009);
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
	const pumpLamp = (0, import_react.useRef)(null);
	useFrame(() => {
		const n = sim.night;
		if (sun.current) {
			sun.current.intensity = 1.35 * (1 - n * .8);
			sun.current.color.set(n > .2 ? "#ffcf99" : "#fff5e4");
		}
		if (amb.current) amb.current.intensity = .55 - n * .3;
		if (lamp.current) lamp.current.intensity = .4 + n * 4.2;
		if (pumpLamp.current) pumpLamp.current.intensity = .2 + n * 2.5;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#dcebf7",
			"#c49a6c",
			.72
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
			ref: amb,
			intensity: .55
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			ref: sun,
			position: [
				16,
				22,
				10
			],
			intensity: 1.35,
			color: "#fff5e4",
			castShadow: true,
			"shadow-mapSize-width": 1024,
			"shadow-mapSize-height": 1024,
			"shadow-camera-far": 52,
			"shadow-camera-left": -18,
			"shadow-camera-right": 18,
			"shadow-camera-top": 18,
			"shadow-camera-bottom": -18,
			"shadow-bias": -5e-4
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			ref: lamp,
			position: [
				.4,
				2.85,
				2.4
			],
			distance: 15,
			decay: 2,
			intensity: .4,
			color: "#ffdfa8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			ref: pumpLamp,
			position: [
				-6.2,
				2.6,
				-3.2
			],
			distance: 12,
			decay: 2,
			intensity: .2,
			color: "#ffd089"
		})
	] });
}
function SkyDecor() {
	const clouds = (0, import_react.useRef)(null);
	useFrame(() => {
		if (clouds.current) clouds.current.position.x = sim.clock * .4 % 40 - 20;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			26,
			24,
			-42
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			3.2,
			16,
			16
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#fde6b8" })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref: clouds,
		children: [
			[
				-14,
				15,
				-24,
				1.3
			],
			[
				4,
				17,
				-28,
				1.6
			],
			[
				20,
				14,
				-22,
				1.1
			]
		].map(([x, y, z, s], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				x,
				y,
				z
			],
			scale: s,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						1.4,
						10,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						color: "#f5efe6",
						transparent: true,
						opacity: .85
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						1.2,
						-.2,
						.2
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						1.05,
						10,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						color: "#f5efe6",
						transparent: true,
						opacity: .85
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-1.1,
						-.25,
						-.1
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.95,
						10,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						color: "#f5efe6",
						transparent: true,
						opacity: .85
					})]
				})
			]
		}, i))
	})] });
}
function Station() {
	const sandTex = (0, import_react.useMemo)(() => {
		const p = paint((ctx, w, h) => {
			ctx.fillStyle = "#d5ad78";
			ctx.fillRect(0, 0, w, h);
			for (let i = 0; i < 1800; i++) {
				const x = Math.random() * w;
				const y = Math.random() * h;
				const r = 1 + Math.random() * 2.5;
				ctx.fillStyle = i % 3 === 0 ? "rgba(176,126,72,0.22)" : "rgba(242,216,174,0.2)";
				ctx.beginPath();
				ctx.arc(x, y, r, 0, Math.PI * 2);
				ctx.fill();
			}
		}, 256, 256);
		p.tex.wrapS = RepeatWrapping;
		p.tex.wrapT = RepeatWrapping;
		p.tex.repeat.set(18, 18);
		return p.tex;
	}, []);
	const concreteTex = (0, import_react.useMemo)(() => {
		const p = paint((ctx, w, h) => {
			ctx.fillStyle = "#c8c0b4";
			ctx.fillRect(0, 0, w, h);
			ctx.strokeStyle = "rgba(95,88,78,0.22)";
			ctx.lineWidth = 3;
			for (let x = 0; x <= w; x += 64) {
				ctx.beginPath();
				ctx.moveTo(x, 0);
				ctx.lineTo(x, h);
				ctx.stroke();
			}
			for (let y = 0; y <= h; y += 64) {
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(w, y);
				ctx.stroke();
			}
		}, 256, 256);
		p.tex.wrapS = RepeatWrapping;
		p.tex.wrapT = RepeatWrapping;
		p.tex.repeat.set(4, 3);
		return p.tex;
	}, []);
	const sign = (0, import_react.useMemo)(() => paint((ctx, w, h) => {
		ctx.fillStyle = "#efe4d2";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#2b5c61";
		ctx.fillRect(0, 0, w, 22);
		ctx.fillRect(0, h - 22, w, 22);
		ctx.strokeStyle = "#d95d39";
		ctx.lineWidth = 6;
		ctx.strokeRect(14, 30, w - 28, h - 60);
		ctx.fillStyle = "#d95d39";
		ctx.font = "900 94px Impact, Arial Black, sans-serif";
		ctx.textAlign = "center";
		ctx.fillText("WANTED FUEL", w / 2, h * .67);
	}, 1024, 280), []);
	const monitor = (0, import_react.useMemo)(() => paint((ctx, w, h) => {
		drawMonitor(ctx, w, h);
	}, 640, 400), []);
	const poster = (0, import_react.useMemo)(() => paint((ctx, w, h) => {
		drawPoster(ctx, w, h);
	}, 512, 680), []);
	const prop = (0, import_react.useRef)(null);
	const bar = (0, import_react.useRef)(null);
	const blades = (0, import_react.useRef)(null);
	useFrame((_, dt) => {
		const mk = `${sim.money}|${sim.stars.toFixed(1)}|${sim.tipI}|${sim.review}|${sim.customer}|${sim.day}`;
		if (monitor.key !== mk) {
			monitor.key = mk;
			drawMonitor(monitor.ctx, 640, 400);
			monitor.tex.needsUpdate = true;
		}
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
		if (blades.current) blades.current.rotation.x += dt * 3.5;
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [120, 120] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: sandTex,
				roughness: .95,
				metalness: 0
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				-1.5,
				.01,
				2.8
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [13.5, 6.2] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: concreteTex,
				roughness: .88,
				metalness: .05
			})]
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [64, 3.6] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#343840",
				roughness: .9,
				metalness: .05
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.025,
				-1.15
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [64, .1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#cbd5e1" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.025,
				2.25
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [64, .1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#cbd5e1" })]
		}),
		[
			-16,
			-12,
			-8,
			-4,
			0,
			4,
			8,
			12,
			16,
			20
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.4, .12] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#e5b84b" })]
		}, x)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { sign: sign.tex }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canopy, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Props, {
			root: prop,
			monitor: monitor.tex,
			poster: poster.tex
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shredder, { blades }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				-4.55,
				0,
				-.15
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.55,
						0
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.24,
						1.1,
						.24
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#3b3d42",
						roughness: .5,
						metalness: .4
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						1.15,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.09,
						10,
						10
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: sim.skull ? "#ef4444" : "#22c55e",
						emissive: sim.skull ? "#ef4444" : "#22c55e",
						emissiveIntensity: .8
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					ref: bar,
					position: [
						0,
						1,
						0
					],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								0,
								1
							],
							castShadow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.1,
								.1,
								2.05
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#d95d39",
								roughness: .4
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								0,
								.5
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.11,
								.11,
								.35
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#f5efe6",
								roughness: .4
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								0,
								1.4
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.11,
								.11,
								.35
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#f5efe6",
								roughness: .4
							})]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cacti, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mountains, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pumpkins, {})
	] });
}
function Building({ sign }) {
	const winGlow = (0, import_react.useRef)(null);
	const winGlow2 = (0, import_react.useRef)(null);
	useFrame(() => {
		const ei = .08 + sim.night * .65;
		if (winGlow.current) winGlow.current.emissiveIntensity = ei;
		if (winGlow2.current) winGlow2.current.emissiveIntensity = ei;
	});
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
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#efe4d2",
				roughness: .88
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-6.2,
				3.55,
				-5.9
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				10.1,
				.34,
				4.9
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#d95d39",
				roughness: .65
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-6.2,
				.35,
				-3.66
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				9.64,
				.7,
				.08
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#2b5c61",
				roughness: .75
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-4.2,
				1.55,
				-3.65
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				3.3,
				1.85,
				.12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				ref: winGlow,
				color: "#284b5c",
				emissive: "#f59e0b",
				emissiveIntensity: .1,
				roughness: .18,
				metalness: .25
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-8.3,
				1.55,
				-3.65
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				2.5,
				1.85,
				.12
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				ref: winGlow2,
				color: "#284b5c",
				emissive: "#f59e0b",
				emissiveIntensity: .1,
				roughness: .18,
				metalness: .25
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-6.2,
				2.75,
				-3.61
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
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.68,
				2.6,
				.68
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#3b3834",
				roughness: .7
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-2.2,
				2.4,
				-4.2
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.72,
				.32,
				.72
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#d95d39",
				roughness: .5
			})]
		})
	] });
}
function Canopy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.4,
				3.28,
				2.55
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				7.3,
				.24,
				4.6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#d95d39",
				roughness: .6
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				.4,
				3.08,
				2.55
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				6.9,
				.12,
				4.25
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#efe4d2",
				roughness: .8
			})]
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
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						1.55,
						0
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.26,
						3.1,
						.26
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#3b3834",
						roughness: .55,
						metalness: .3
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						2.15,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.3,
						.34,
						.3
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#d95d39",
						roughness: .5
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.14,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.36,
						.28,
						.36
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#6b655d",
						roughness: .8
					})]
				})
			]
		}, `${x}-${z}`)),
		[
			[
				-1.2,
				2.98,
				1.4
			],
			[
				1.5,
				2.98,
				1.4
			],
			[
				-1.2,
				2.98,
				3.5
			],
			[
				1.5,
				2.98,
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
				.07,
				.18
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#fff8eb",
				emissive: "#ffe2b0",
				emissiveIntensity: .85
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
					.5,
					2.66
				],
				castShadow: true,
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					3.05,
					1,
					.78
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#4a3b32",
					roughness: .8
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.95,
					1.05,
					2.66
				],
				castShadow: true,
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					3.18,
					.1,
					.9
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#2b2725",
					roughness: .45,
					metalness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.15,
					1.54,
					2.28
				],
				rotation: [
					-.32,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						-.02
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						1.22,
						.84,
						.05
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e293b",
						roughness: .4,
						metalness: .4
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						.015
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.14, .76] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						map: monitor,
						toneMapped: false
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "prop-gold",
				position: [
					1.02,
					1.15,
					2.46
				],
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.22,
					.24,
					.09,
					24
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#eab308",
					emissive: "#d97706",
					emissiveIntensity: .3,
					roughness: .3,
					metalness: .5
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.11, 18] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#166534" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "prop-sponge",
				position: [
					1.62,
					1.15,
					2.42
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.28,
					.09,
					.18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#eab308",
					roughness: .9
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.05,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.28,
						.03,
						.18
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#15803d",
						roughness: .95
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "prop-taser",
				position: [
					1.82,
					1.15,
					2.62
				],
				rotation: [
					0,
					.4,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.26,
					.11,
					.09
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#334155",
					roughness: .5,
					metalness: .3
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.16,
						.01,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.1,
						.07,
						.07
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#0ea5e9",
						emissive: "#38bdf8",
						emissiveIntensity: .5
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				name: "prop-cap",
				position: [
					2.05,
					1.15,
					2.4
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.11,
					.11,
					.07,
					14
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#dc2626",
					roughness: .4
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-.32,
					0,
					1.5
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.68,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.56,
							1.36,
							.48
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#d95d39",
							roughness: .45,
							metalness: .15
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.95,
							.01
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.42,
							.45,
							.5
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#efe4d2",
							roughness: .6
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.42,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.64,
							.14,
							.56
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#2b5c61",
							roughness: .4
						})]
					})
				]
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
						.09,
						.09
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e293b",
						roughness: .4,
						metalness: .5
					})]
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
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: GRADES.find((g) => g.id === sim.grade)?.color ?? "#22c55e",
						roughness: .35
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-.98,
					0,
					1.55
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.62,
						0
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.38,
						1.24,
						.34
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#2b5c61",
						roughness: .4,
						metalness: .25
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						1.05,
						.18
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.24,
						.24,
						.04
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#0f172a",
						emissive: "#38bdf8",
						emissiveIntensity: .45
					})]
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
					.09,
					.09
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1e293b",
					roughness: .4
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.12,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.08,
						.11,
						.11
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#38bdf8",
						emissive: "#0284c7",
						emissiveIntensity: .4
					})]
				})]
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
							.72,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.72,
							1.44,
							.56
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#2b5c61",
							roughness: .5,
							metalness: .2
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.85,
							.27
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.52,
							.78,
							.04
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#bae6fd",
							emissive: "#e0f2fe",
							emissiveIntensity: .2,
							roughness: .2
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "prop-burger",
						position: [
							.12,
							1.02,
							.31
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.03,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.1,
									.11,
									.04,
									12
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#d97706",
									roughness: .7
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.1,
									.1,
									.03,
									12
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#78350f",
									roughness: .8
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									-.03,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.1,
									.1,
									.03,
									12
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#d97706",
									roughness: .7
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.35,
					1.18,
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
							2.65,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.08,
							1.4,
							.08
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#eab308",
							roughness: .4,
							metalness: .3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							2.15,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.44,
							1.15,
							.2
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#1f2937",
							roughness: .5,
							metalness: .3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							2.42,
							.12
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.2, 20] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#dc2626",
							emissive: "#ef4444",
							emissiveIntensity: sim.skull ? 1.1 : .45
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
							color: "#16a34a",
							emissive: "#22c55e",
							emissiveIntensity: .45
						})]
					})
				]
			})
		]
	});
}
function Shredder({ blades }) {
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
					.82,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.32,
					1.64,
					1.15
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3f4d47",
					roughness: .65,
					metalness: .35
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.35,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.36,
					.18,
					1.19
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#eab308",
					roughness: .5
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.15,
					.5
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.76,
					.46,
					.22
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#111827",
					roughness: .8
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.78,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.38,
					.3,
					1.22
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#64748b",
					roughness: .5,
					metalness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				ref: blades,
				position: [
					0,
					1.15,
					.45
				],
				children: [
					-.28,
					-.1,
					.1,
					.28
				].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						x,
						0,
						.08
					],
					rotation: [
						.4,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
						.07,
						.2,
						5
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#cbd5e1",
						roughness: .3,
						metalness: .7
					})]
				}, x))
			})
		]
	});
}
function Cacti() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: [
		[
			8.5,
			-3.2,
			1
		],
		[
			12,
			-5,
			1.25
		],
		[
			6.2,
			-6.5,
			.85
		],
		[
			14,
			3.5,
			1.1
		],
		[
			-13,
			-2,
			1.2
		],
		[
			-12,
			4,
			.9
		],
		[
			4.5,
			6.2,
			1.05
		],
		[
			-8,
			5.5,
			.95
		]
	].map(([x, z, s]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			x,
			0,
			z
		],
		scale: s,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.7,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.16,
					.9,
					4,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#4d7c4a",
					roughness: .85
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.26,
					.72,
					0
				],
				rotation: [
					0,
					0,
					-.85
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.08,
					.35,
					3,
					6
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3f6a3c",
					roughness: .85
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.24,
					.88,
					0
				],
				rotation: [
					0,
					0,
					.85
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.075,
					.28,
					3,
					6
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3f6a3c",
					roughness: .85
				})]
			})
		]
	}, `${x}-${z}`)) });
}
function Mountains() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: [
		[
			-22,
			-24,
			9,
			"#b87b52"
		],
		[
			-9,
			-27,
			12,
			"#a66c46"
		],
		[
			8,
			-26,
			10,
			"#bd8259"
		],
		[
			22,
			-22,
			8.5,
			"#a96e48"
		]
	].map(([x, z, s, color]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			x,
			s * .3,
			z
		],
		rotation: [
			0,
			x * .2,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
			s * .75,
			s,
			6
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color,
			roughness: .95
		})]
	}, `${x}`)) });
}
function Pumpkins() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", { children: [[-3.2, 4.8], [4.2, 4.6]].map(([x, z]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			x,
			.2,
			z
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
				.21,
				10,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#d96b27",
				roughness: .75
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.2,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.03,
				.04,
				.08,
				6
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#4d7c4a",
				roughness: .8
			})]
		})]
	}, x)) });
}
function LiveCar() {
	const ref = (0, import_react.useRef)(null);
	const w1 = (0, import_react.useRef)(null);
	const w2 = (0, import_react.useRef)(null);
	const w3 = (0, import_react.useRef)(null);
	const w4 = (0, import_react.useRef)(null);
	const [look, setLook] = (0, import_react.useState)({
		id: -1,
		color: "#e09f3e",
		shirt: "#fff",
		hat: null,
		skin: "#ffbea0",
		devil: false,
		face: null,
		mad: false
	});
	useFrame((_, dt) => {
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
		if (c.id !== look.id || c.hat !== look.hat || c.color !== look.color || c.mad !== look.mad) setLook({
			id: c.id,
			color: c.color,
			shirt: c.shirt,
			hat: c.hat,
			skin: c.skin,
			devil: c.devil,
			face: c.face,
			mad: c.mad
		});
		if (c.phase !== "wait") {
			const spin = dt * 11;
			for (const w of [
				w1.current,
				w2.current,
				w3.current,
				w4.current
			]) if (w) w.rotation.x += spin;
		}
		const mud = g.getObjectByName("mud");
		if (mud) {
			const vis = c.dirty > .2 && c.wash < .96;
			mud.visible = vis;
			if (vis) mud.scale.setScalar(Math.max(.15, 1 - c.wash * .85));
		}
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
		if (head) {
			if (c.caught) {
				head.rotation.z = .85;
				head.rotation.x = Math.sin(sim.clock * 28) * .1;
			} else if (c.asleep) {
				head.rotation.z = .35 + Math.sin(sim.clock * 2.5) * .06;
				head.rotation.x = .25;
			} else {
				head.rotation.z = 0;
				head.rotation.x = 0;
			}
		}
		const bar = g.getObjectByName("fuelbar");
		if (bar) {
			bar.scale.z = Math.max(.05, c.fuel);
			bar.visible = (c.job === "fuel" || c.job === "charge") && c.phase === "wait";
			const mat = bar.material;
			if (!Array.isArray(mat)) mat.color.set(c.job === "charge" ? "#38bdf8" : "#eab308");
		}
		const cap = g.getObjectByName("gascap");
		if (cap) {
			cap.visible = c.capped || c.job !== "cap";
			const mat = cap.material;
			if (!Array.isArray(mat)) mat.color.set(c.capped ? "#dc2626" : "#94a3b8");
		}
	});
	const wideEyes = look.face === "thief";
	const angryBrows = look.face === "bully" || look.mad || look.devil;
	const bigGrin = look.face === "worst";
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
					.48,
					0
				],
				castShadow: true,
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.18,
					.46,
					2.3
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: look.color,
					roughness: .35,
					metalness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.32,
					1.17
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.22,
					.14,
					.08
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cbd5e1",
					roughness: .3,
					metalness: .6
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.32,
					-1.17
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.22,
					.14,
					.08
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cbd5e1",
					roughness: .3,
					metalness: .6
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.4,
					.5,
					1.16
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.2,
					.14,
					.04
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#fef08a",
					emissive: "#fde047",
					emissiveIntensity: .4 + sim.night * .9
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.4,
					.5,
					1.16
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.2,
					.14,
					.04
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#fef08a",
					emissive: "#fde047",
					emissiveIntensity: .4 + sim.night * .9
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.42,
					.5,
					-1.16
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.22,
					.12,
					.04
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#ef4444",
					emissive: "#dc2626",
					emissiveIntensity: .5
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.42,
					.5,
					-1.16
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.22,
					.12,
					.04
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#ef4444",
					emissive: "#dc2626",
					emissiveIntensity: .5
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.98,
					.02
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.04,
					.54,
					1.18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: look.color,
					roughness: .35,
					metalness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.98,
					.62
				],
				rotation: [
					-.18,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.92,
					.38,
					.05
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1e293b",
					roughness: .15,
					metalness: .3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.53,
					1,
					.06
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.04,
					.34,
					.72
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0f172a",
					roughness: .2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "flames",
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.02,
						.73,
						.95
					],
					rotation: [
						.1,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.7,
						.04,
						.22
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f97316",
						emissive: "#ea580c",
						emissiveIntensity: .3
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.02,
						.73,
						.72
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.45,
						.04,
						.14
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#ef4444",
						emissive: "#dc2626",
						emissiveIntensity: .3
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "poop",
				position: [
					.05,
					.82,
					.68
				],
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.11,
					8,
					6
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#7c4a2d",
					roughness: .9
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "mud",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.59,
							.52,
							.3
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.14,
							8,
							6
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#7c4a2d",
							roughness: .95
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.57,
							.58,
							-.35
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.16,
							8,
							6
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#6b3e26",
							roughness: .95
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.54,
							.65,
							.7
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.11,
							8,
							6
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#854d27",
							roughness: .95
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
				refObj: w1,
				at: [
					-.5,
					.26,
					.76
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
				refObj: w2,
				at: [
					.5,
					.26,
					.76
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
				refObj: w3,
				at: [
					-.5,
					.26,
					-.76
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
				refObj: w4,
				at: [
					.5,
					.26,
					-.76
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "mirror",
				position: [
					.63,
					1.08,
					.66
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.14,
					.1,
					.12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e2e8f0",
					roughness: .3,
					metalness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "gascap",
				position: [
					.6,
					.66,
					-.85
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.08,
					.08,
					.05,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#94a3b8",
					roughness: .4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "cheese",
				position: [
					-.15,
					.9,
					-.35
				],
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.14,
					.08,
					.12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#facc15",
					roughness: .7
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "fuelbar",
				position: [
					.67,
					.88,
					-.55
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.05,
					.06,
					.7
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#eab308" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "head",
				position: [
					.22,
					1.12,
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
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: look.skin,
							roughness: .7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.075,
							.25,
							.13
						],
						scale: wideEyes ? 1.45 : 1,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.042,
							8,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#fff" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.075,
							.25,
							.13
						],
						scale: wideEyes ? 1.45 : 1,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.042,
							8,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#fff" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.075,
							.25,
							.165
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.02,
							6,
							6
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#111" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.075,
							.25,
							.165
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.02,
							6,
							6
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#111" })]
					}),
					angryBrows ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.075,
							.31,
							.16
						],
						rotation: [
							0,
							0,
							-.35
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.08,
							.022,
							.02
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#1e1b18" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.075,
							.31,
							.16
						],
						rotation: [
							0,
							0,
							.35
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.08,
							.022,
							.02
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#1e1b18" })]
					})] }) : null,
					bigGrin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.15,
							.165
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.13,
							.045,
							.03
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#ffffff" })]
					}) : null,
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
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: look.shirt,
							roughness: .8
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "hat",
						position: [
							0,
							.39,
							0
						],
						visible: Boolean(look.hat),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.16,
							.18,
							.12,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: look.hat ?? "#2d9d5c",
							roughness: .75
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								-.05,
								.08
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.28,
								.03,
								.18
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: look.hat ?? "#2d9d5c",
								roughness: .75
							})]
						})]
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
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#dc2626",
								roughness: .4
							})]
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
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#dc2626",
								roughness: .4
							})]
						})]
					})
				]
			})
		]
	});
}
function Wheel({ at, refObj }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: refObj,
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
				14
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1f2937",
				roughness: .85
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.09,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.11,
				.11,
				.04,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#cbd5e1",
				roughness: .35,
				metalness: .5
			})]
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
		mesh.position.set(p.x, p.y + Math.sin(sim.clock * 3) * .03, p.z);
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.72, .72] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
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
			m.position.set(b.x, b.y + Math.sin(sim.clock * 4 + b.id) * .025, b.z);
			m.rotation.y = sim.clock * 1.4 + b.id;
			const s = .75 + Math.min(.8, b.amount / 180);
			m.scale.setScalar(s);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref,
		children: Array.from({ length: 6 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			visible: false,
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.3,
				.07,
				.17
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#22c55e",
				emissive: "#16a34a",
				emissiveIntensity: .25,
				roughness: .6
			})]
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
			m.rotation.x += .15;
			m.rotation.y += .12;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref,
		children: Array.from({ length: 16 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			visible: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.09,
				.09,
				.09
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: i % 2 ? "#22c55e" : "#eab308",
				roughness: .4
			})]
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
		m.lookAt(sim.player.x, 1.56, sim.player.z);
		const pulse = 1 + Math.sin(sim.clock * 7) * .12;
		m.scale.setScalar(pulse);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref,
		visible: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ringGeometry", { args: [
			.08,
			.12,
			20
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			color: "#fde047",
			transparent: true,
			opacity: .85
		})]
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
		if (tool) {
			tool.visible = sim.hold !== "none";
			const jiggle = sim.usePulse > 0 ? Math.sin(sim.clock * 26) * .025 * sim.usePulse : 0;
			tool.position.set(.28 + jiggle, -.18 + Math.abs(jiggle), -.62);
		}
		const show = (name, on) => {
			const o = g.getObjectByName(name);
			if (o) o.visible = on;
		};
		show("h-nozzle", sim.hold === "nozzle");
		show("h-sponge", sim.hold === "sponge");
		show("h-burger", sim.hold === "burger");
		show("h-cap", sim.hold === "cap");
		show("h-taser", sim.hold === "taser");
		show("h-cash", sim.hold === "cash");
		show("h-mirror", sim.hold === "mirror");
		show("h-charger", sim.hold === "charger");
		show("h-cheese", sim.hold === "cheese");
		show("h-horns", sim.wornHorns);
		const hat = g.getObjectByName("h-hat");
		if (hat) {
			hat.visible = sim.hold === "hat";
			const mat = hat.material;
			if (!Array.isArray(mat)) mat.color.set(sim.hatColor);
		}
		const tip = g.getObjectByName("h-nozzle-tip");
		if (tip) {
			const mat = tip.material;
			const gc = GRADES.find((x) => x.id === sim.grade)?.color ?? "#22c55e";
			if (!Array.isArray(mat)) mat.color.set(gc);
		}
		g.position.y += Math.sin(sim.clock * 2.2) * .008;
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
					.14,
					.08,
					.2
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#f5bfa0",
					roughness: .75
				})]
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
					.15,
					.08,
					.22
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#f5bfa0",
					roughness: .75
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "poster",
				position: [
					-.18,
					-.02,
					-.6
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
								.3,
								.075,
								.075
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#1e293b",
								roughness: .4,
								metalness: .4
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							name: "h-nozzle-tip",
							position: [
								.15,
								.02,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.1,
								.095,
								.095
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#22c55e",
								roughness: .35
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "h-sponge",
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.2,
							.06,
							.14
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#eab308",
							roughness: .9
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.035,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.2,
								.02,
								.14
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#15803d",
								roughness: .95
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "h-burger",
						visible: false,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.03,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.09,
									.1,
									.04,
									12
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#d97706",
									roughness: .7
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.09,
								.09,
								.025,
								12
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#78350f",
								roughness: .8
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									-.03,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.09,
									.09,
									.03,
									12
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#d97706",
									roughness: .7
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						name: "h-cap",
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.08,
							.08,
							.05,
							14
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#dc2626",
							roughness: .4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "h-taser",
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.24,
							.09,
							.07
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#334155",
							roughness: .45
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								.14,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.08,
								.06,
								.06
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#38bdf8",
								emissive: "#0284c7",
								emissiveIntensity: .6
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						name: "h-cash",
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.2,
							.05,
							.12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#22c55e",
							roughness: .6
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						name: "h-mirror",
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.14,
							.1,
							.06
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e2e8f0",
							roughness: .3,
							metalness: .5
						})]
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
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#1e293b",
								roughness: .4
							})]
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
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#38bdf8",
								emissive: "#0284c7",
								emissiveIntensity: .5
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						name: "h-hat",
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.1,
							.12,
							.08,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#eab308",
							roughness: .75
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						name: "h-cheese",
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.12,
							.06,
							.1
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#facc15",
							roughness: .7
						})]
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
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#dc2626",
						roughness: .4
					})]
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
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#dc2626",
						roughness: .4
					})]
				})]
			})
		]
	});
}
function drawMonitor(ctx, w, h) {
	ctx.fillStyle = "#121826";
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = "#1e293b";
	ctx.fillRect(16, 16, w - 32, 196);
	ctx.fillStyle = "#f59e0b";
	ctx.font = "800 32px Arial, sans-serif";
	ctx.textAlign = "left";
	ctx.fillText("WANTED FUEL POS", 32, 56);
	ctx.fillStyle = "#cbd5e1";
	ctx.font = "700 24px Arial, sans-serif";
	ctx.fillText(`★ ${sim.stars.toFixed(1)}   ·   Ngày ${sim.day}`, 32, 94);
	ctx.fillStyle = "#34d399";
	ctx.font = "800 76px Arial, sans-serif";
	ctx.fillText(`$${sim.money}`, 32, 182);
	ctx.fillStyle = "#172030";
	ctx.fillRect(16, 226, w - 32, h - 242);
	ctx.fillStyle = "#f8fafc";
	ctx.font = "700 26px Arial, sans-serif";
	ctx.fillText(sim.customer ? `Khách: ${sim.customer}` : "Làn xe đang trống", 32, 266);
	ctx.fillStyle = "#94a3b8";
	ctx.font = "600 21px Arial, sans-serif";
	wrap(ctx, TIPS[sim.tipI] ?? "", 32, 304, w - 64, 27);
	ctx.fillStyle = "#fbbf24";
	ctx.font = "600 21px Arial, sans-serif";
	ctx.fillText(`"${sim.review}"`, 32, 368);
}
function drawPoster(ctx, w, h) {
	const face = WARRANTS[sim.warrant % WARRANTS.length];
	ctx.fillStyle = "#f5ebd6";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "#d4c3a3";
	ctx.lineWidth = 6;
	ctx.strokeRect(16, 16, w - 32, h - 32);
	for (let y = 150; y < 440; y += 30) {
		ctx.beginPath();
		ctx.moveTo(44, y);
		ctx.lineTo(w - 44, y);
		ctx.stroke();
	}
	ctx.fillStyle = "#b91c1c";
	ctx.font = "900 76px Impact, Arial Black, sans-serif";
	ctx.textAlign = "center";
	ctx.fillText("WANTED", w / 2, 102);
	ctx.fillStyle = "#ffbea0";
	ctx.beginPath();
	ctx.arc(w / 2, 255, 76, 0, Math.PI * 2);
	ctx.fill();
	const er = face.id === "thief" ? 21 : 15;
	ctx.fillStyle = "#fff";
	ctx.beginPath();
	ctx.arc(w / 2 - 28, 246, er, 0, Math.PI * 2);
	ctx.arc(w / 2 + 28, 246, er, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#111";
	ctx.beginPath();
	ctx.arc(w / 2 - 28, 248, 7, 0, Math.PI * 2);
	ctx.arc(w / 2 + 28, 248, 7, 0, Math.PI * 2);
	ctx.fill();
	if (face.id === "bully") {
		ctx.strokeStyle = "#1e1b18";
		ctx.lineWidth = 10;
		ctx.beginPath();
		ctx.moveTo(w / 2 - 48, 218);
		ctx.lineTo(w / 2 - 12, 232);
		ctx.moveTo(w / 2 + 48, 218);
		ctx.lineTo(w / 2 + 12, 232);
		ctx.stroke();
	}
	if (face.id === "worst") {
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(w / 2 - 36, 286, 72, 24);
		ctx.strokeStyle = "#111827";
		ctx.lineWidth = 3;
		ctx.strokeRect(w / 2 - 36, 286, 72, 24);
	}
	if (face.hat) {
		ctx.fillStyle = face.hat;
		ctx.fillRect(w / 2 - 78, 175, 156, 36);
		ctx.fillRect(w / 2 - 58, 206, 150, 14);
	}
	ctx.fillStyle = face.shirt;
	ctx.fillRect(w / 2 - 72, 336, 144, 88);
	ctx.fillStyle = "#1c1917";
	ctx.font = "800 34px Arial, sans-serif";
	ctx.fillText(face.name, w / 2, 492);
	ctx.fillStyle = "#b91c1c";
	ctx.font = "800 40px Arial, sans-serif";
	ctx.fillText(`THƯỞNG $${face.bounty}`, w / 2, 548);
	ctx.fillStyle = "#44403c";
	ctx.font = "600 23px Arial, sans-serif";
	wrap(ctx, face.line, 36, 598, w - 72, 28);
	ctx.textAlign = "left";
}
function drawBubble(ctx, c) {
	ctx.clearRect(0, 0, 256, 256);
	ctx.fillStyle = "rgba(255, 250, 240, 0.96)";
	ctx.strokeStyle = "#2b2725";
	ctx.lineWidth = 6;
	ctx.beginPath();
	ctx.ellipse(128, 112, 102, 76, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(100, 178);
	ctx.lineTo(80, 222);
	ctx.lineTo(138, 182);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#111827";
	ctx.textAlign = "center";
	if (c.caught) {
		ctx.fillStyle = "#dc2626";
		ctx.font = "800 40px Arial";
		ctx.fillText("ĐÃ BẮT", 128, 124);
		return;
	}
	if (c.asleep) {
		ctx.fillStyle = "#1e293b";
		ctx.font = "800 62px Arial";
		ctx.fillText("Zzz...", 128, 130);
		return;
	}
	if (c.job === "fuel") {
		ctx.fillStyle = GRADES.find((g) => g.id === c.grade)?.color ?? "#1d4ed8";
		ctx.fillRect(74, 78, 36, 56);
		ctx.fillStyle = "#111827";
		ctx.font = "800 42px Arial";
		ctx.fillText(c.grade === "diesel" ? "DẦU" : c.grade, 152, 122);
	} else if (c.job === "wash") {
		ctx.fillStyle = "#eab308";
		ctx.fillRect(78, 72, 100, 44);
		ctx.fillStyle = "#16a34a";
		ctx.fillRect(78, 110, 100, 34);
	} else if (c.job === "food") {
		ctx.fillStyle = "#d97706";
		ctx.beginPath();
		ctx.ellipse(128, 118, 56, 26, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#65a30d";
		ctx.fillRect(80, 108, 96, 12);
		ctx.fillStyle = "#78350f";
		ctx.fillRect(80, 120, 96, 14);
	} else if (c.job === "charge") {
		ctx.fillStyle = "#0284c7";
		ctx.fillRect(108, 66, 40, 44);
		ctx.fillRect(116, 110, 24, 14);
		ctx.fillStyle = "#111827";
		ctx.font = "800 28px Arial";
		ctx.fillText("18 kWh", 128, 162);
	} else {
		ctx.fillStyle = "#dc2626";
		ctx.fillRect(86, 78, 84, 58);
		ctx.fillStyle = "#fff";
		ctx.font = "800 28px Arial";
		ctx.fillText("NẮP", 128, 116);
	}
	if (c.wanted && sim.posterUp) {
		ctx.fillStyle = "#dc2626";
		ctx.font = "800 22px Arial";
		ctx.fillText("KHỚP MẶT!", 128, 60);
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
				fov: 68,
				near: .08,
				far: 160,
				position: [
					8,
					5,
					12
				]
			},
			gl: {
				antialias: true,
				toneMapping: 4,
				toneMappingExposure: .92
			},
			onPointerDown: () => {
				if (sim.phase === "play") requestLock();
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {})
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {})]
	});
}
//#endregion
export { Home as component };
