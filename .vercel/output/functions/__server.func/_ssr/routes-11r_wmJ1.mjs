import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, _ as Shape, a as CanvasTexture, b as Vector2, c as ExtrudeGeometry, d as Mesh, f as MeshBasicMaterial, g as Scene, h as SRGBColorSpace, i as PMREMGenerator, l as Fog, m as RepeatWrapping, n as useFrame, o as CatmullRomCurve3, p as PlaneGeometry, r as useThree, s as Color, t as Canvas, u as LatheGeometry, v as SphereGeometry, w as require_react, x as Vector3, y as TubeGeometry } from "../_libs/@react-three/fiber+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-11r_wmJ1.js
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
	taps: /* @__PURE__ */ new Set(),
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
var dragId = null;
var lastX = 0;
var lastY = 0;
var dragDist = 0;
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
		if (!e.repeat) input.taps.add(e.code);
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
		dragId = null;
	};
	const move = (e) => {
		if (document.pointerLockElement) {
			input.lookX += e.movementX;
			input.lookY += e.movementY;
		}
	};
	const mouseDown = (e) => {
		if (e.target?.closest("[data-ui]")) return;
		if (document.pointerLockElement) {
			if (e.button === 0) input.shootHeld = true;
			if (e.button === 2) input.dropPulse = true;
		} else if (!coarse() && (e.button === 0 || e.button === 2)) {
			dragId = e.button;
			lastX = e.clientX;
			lastY = e.clientY;
			dragDist = 0;
			if (e.button === 0) input.shootHeld = true;
		}
	};
	const mouseUp = (e) => {
		if (e.button === 0) input.shootHeld = false;
		if (!document.pointerLockElement && dragId !== null) {
			if (e.button === 2 && dragDist < 6) input.dropPulse = true;
			dragId = null;
		}
	};
	const ctxMenu = (e) => {
		const t = e.target;
		if (document.pointerLockElement || !t?.closest("[data-ui]")) e.preventDefault();
	};
	const wheel = (e) => {
		input.wheel += Math.sign(e.deltaY);
		if (document.pointerLockElement) e.preventDefault();
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
		if (e.pointerId === lookId) {
			input.lookX += (e.clientX - lastX) * 1.45;
			input.lookY += (e.clientY - lastY) * 1.45;
			lastX = e.clientX;
			lastY = e.clientY;
			return;
		}
		if (!document.pointerLockElement && !coarse() && dragId !== null) {
			const dx = e.clientX - lastX;
			const dy = e.clientY - lastY;
			dragDist += Math.hypot(dx, dy);
			input.lookX += dx * 1.35;
			input.lookY += dy * 1.35;
			lastX = e.clientX;
			lastY = e.clientY;
		}
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
		x: 0,
		y: 0,
		z: 3.8,
		yaw: 0,
		pitch: -.08,
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
		x0: -2.85,
		x1: -1.85,
		z0: 2.95,
		z1: 4.05
	},
	{
		x0: -4.45,
		x1: -3.15,
		z0: 4.45,
		z1: 5.45
	},
	{
		x0: -6.05,
		x1: -4.75,
		z0: 3,
		z1: 4.2
	},
	{
		x0: 2.05,
		x1: 4.35,
		z0: 2.35,
		z1: 3.25
	},
	{
		x0: -9.5,
		x1: 5.5,
		z0: -8.5,
		z1: -3
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
var lastEmitKey = "";
function subscribe(fn) {
	subs.add(fn);
	return () => subs.delete(fn);
}
function getSnap() {
	return snap;
}
function emit() {
	snap = buildSnap();
	lastEmitKey = snapKey();
	subs.forEach((fn) => fn());
}
function snapKey() {
	const c = sim.car;
	const pBucket = c && c.phase === "wait" ? Math.round(c.patience / c.maxPatience * 40) : -1;
	const progBucket = Math.round(sim.aimProgress * 50);
	return `${sim.phase}|${sim.money}|${sim.stars.toFixed(1)}|${sim.day}|${sim.night > .55}|${sim.objective}|${sim.prompt}|${sim.aimKind}|${progBucket}|${sim.cashAmt}|${sim.toastT > 0 ? sim.toast : ""}|${sim.hold}|${sim.grade}|${sim.posterUp}|${sim.skull}|${sim.burgers}|${sim.caps}|${pBucket}|${c?.caught}|${c?.asleep}|${c?.served}|${c?.dirty}`;
}
function emitIfChanged() {
	if (snapKey() !== lastEmitKey) emit();
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
		x: 2.35,
		y: 1.18,
		z: 2.75,
		max: 3.3
	},
	charger: {
		x: 3.75,
		y: 1.18,
		z: 2.75,
		max: 3.3
	},
	gold: {
		x: -2.05,
		y: 1.05,
		z: 3.35,
		max: 3.1
	},
	skull: {
		x: -2.35,
		y: 1.08,
		z: 3.12,
		max: 3.3
	},
	go: {
		x: -2.55,
		y: 1.08,
		z: 3.4,
		max: 3.3
	},
	burger: {
		x: -3.49,
		y: 1.38,
		z: 5.06,
		max: 3.3
	},
	cap: {
		x: -4.02,
		y: 1.38,
		z: 4.71,
		max: 3.3
	},
	sponge: {
		x: -3.49,
		y: 1.09,
		z: 5.06,
		max: 3.3
	},
	taser: {
		x: -4.02,
		y: .96,
		z: 4.71,
		max: 3.3
	},
	shred: {
		x: -5.3,
		y: 1.15,
		z: 3.6,
		max: 3.3
	}
};
var aim = null;
function aimBias(kind) {
	const h = sim.hold;
	if ((h === "nozzle" || h === "charger") && kind === "fuel") return -.85;
	if (h === "sponge" && kind === "body") return -.65;
	if ((h === "burger" || h === "cap" || h === "taser" || h === "hat") && kind === "window") return -.55;
	if (h === "cash" && (kind === "gold" || kind === "bill")) return -.55;
	if ((h === "mirror" || h === "cheese" || h === "hat") && kind === "shred") return -.5;
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
			max: 3.1
		});
		list.push({
			kind: "fuel",
			p: carPoint(c, .62, .72, -.35),
			max: 3.5
		});
		list.push({
			kind: "body",
			p: carPoint(c, .72, .85, .1),
			max: 3.2
		});
		if (c.mirror && sim.hold === "none") list.push({
			kind: "mirror",
			p: carPoint(c, .72, .9, .44),
			max: 2.8
		});
		if (c.loose && sim.hold === "none") list.push({
			kind: "loot",
			p: carPoint(c, -.15, .96, -.35),
			max: 2.8
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
		sim.car.x = 0;
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
	const r = .3;
	if (x < -9 || x > 8.5 || z < -2.2 || z > 7.4) return true;
	for (const b of BOXES) if (x > b.x0 - r && x < b.x1 + r && z > b.z0 - r && z < b.z1 + r) return true;
	const c = sim.car;
	if (c && c.phase === "wait") {
		if (x > c.x - 1.3 - r && x < c.x + 1.3 + r && z > c.z - .7 - r && z < c.z + .7 + r) return true;
	}
	return false;
}
function tickPlayer(dt) {
	if (!sim.qaOverride) {
		sim.player.yaw -= input.lookX * .0023;
		sim.player.pitch -= input.lookY * .0023;
		sim.player.yaw -= input.padLookX * .0023;
		sim.player.pitch -= input.padLookY * .0023;
		if (down("ArrowLeft")) sim.player.yaw += dt * 2.1;
		if (down("ArrowRight")) sim.player.yaw -= dt * 2.1;
		if (down("ArrowUp")) sim.player.pitch += dt * 1.6;
		if (down("ArrowDown")) sim.player.pitch -= dt * 1.6;
		sim.player.pitch = Math.max(-1.15, Math.min(1.2, sim.player.pitch));
	}
	input.lookX = 0;
	input.lookY = 0;
	let ax = input.touchX + input.padX;
	let ay = input.touchY + input.padY;
	if (down("KeyW")) ay -= 1;
	if (down("KeyS")) ay += 1;
	if (down("KeyA")) ax -= 1;
	if (down("KeyD")) ax += 1;
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
	const k = Math.min(1, dt * 18);
	sim.player.vx += (wishx * 5.6 - sim.player.vx) * k;
	sim.player.vz += (wishz * 5.6 - sim.player.vz) * k;
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
		if (c.x <= 0) {
			c.x = 0;
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
	return on && !was || input.taps.has(code);
}
function endKeys() {
	prevKeys.clear();
	for (const k of input.keys) prevKeys.add(k);
	input.taps.clear();
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
		emitIfChanged();
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
		emitIfChanged();
		return;
	}
	const prevNight = sim.night;
	sim.clock += dt;
	sim.night = nightAmount(sim.clock);
	if (prevNight > .75 && sim.night < .2) {
		sim.day += 1;
		toast(`Ngày ${sim.day}. Đêm qua nhiều khách lạ.`);
	}
	if (!sim.qaOverride && (pressedFresh("Escape") || pressedFresh("KeyP"))) {
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
	const eTap = input.taps.has("KeyE");
	const pulse = mouse && !prevMouse || eDown && !prevE || eTap || input.interactPulse;
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
	emitIfChanged();
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
		showGrades: sim.hold === "nozzle" || sim.aimKind === "nozzle",
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
					className: "absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-ink/75 px-4 py-1.5 text-[11px] text-cream-dim backdrop-blur-sm sm:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "WASD đi" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Kéo chuột / Mũi tên xoay nhìn" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "E / Chuột trái dùng" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "X / Chuột phải cất" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Q tờ" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "R khóa làn" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "G đi" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "B cửa hàng" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "P tạm dừng" })
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
		className: "pointer-events-auto absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink/85 via-ink/25 to-transparent p-5 sm:items-end sm:justify-start sm:p-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel w-full max-w-md p-5 text-center sm:text-left",
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
function paint(draw, w, h, srgb = true) {
	const canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("canvas");
	draw(ctx, w, h);
	const tex = new CanvasTexture(canvas);
	if (srgb) tex.colorSpace = SRGBColorSpace;
	tex.anisotropy = 4;
	return {
		canvas,
		ctx,
		tex,
		key: ""
	};
}
function createSandTexture() {
	const p = paint((ctx, w, h) => {
		ctx.fillStyle = "#c49c6c";
		ctx.fillRect(0, 0, w, h);
		for (let y = 0; y < h; y += 18) {
			ctx.fillStyle = y % 36 === 0 ? "rgba(148,106,62,0.13)" : "rgba(222,190,145,0.11)";
			ctx.beginPath();
			ctx.moveTo(0, y);
			for (let x = 0; x <= w; x += 32) ctx.quadraticCurveTo(x + 16, y + Math.sin(x * .04) * 3.5, x + 32, y);
			ctx.lineTo(w, y + 9);
			ctx.lineTo(0, y + 9);
			ctx.closePath();
			ctx.fill();
		}
		for (let i = 0; i < 4500; i++) {
			const x = Math.random() * w;
			const y = Math.random() * h;
			const r = .6 + Math.random() * 2;
			ctx.fillStyle = i % 4 === 0 ? "rgba(96,68,42,0.28)" : i % 3 === 0 ? "rgba(155,112,68,0.25)" : "rgba(235,212,175,0.2)";
			ctx.beginPath();
			ctx.arc(x, y, r, 0, Math.PI * 2);
			ctx.fill();
		}
	}, 512, 512);
	p.tex.wrapS = RepeatWrapping;
	p.tex.wrapT = RepeatWrapping;
	p.tex.repeat.set(16, 16);
	return p.tex;
}
function createSurfaceBumpTexture() {
	const p = paint((ctx, w, h) => {
		ctx.fillStyle = "#808080";
		ctx.fillRect(0, 0, w, h);
		for (let i = 0; i < 6e3; i++) {
			const v = 90 + Math.floor(Math.random() * 75);
			ctx.fillStyle = `rgb(${v},${v},${v})`;
			ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
		}
	}, 256, 256, false);
	p.tex.wrapS = RepeatWrapping;
	p.tex.wrapT = RepeatWrapping;
	p.tex.repeat.set(8, 8);
	return p.tex;
}
function createConcreteTexture() {
	const p = paint((ctx, w, h) => {
		ctx.fillStyle = "#bdb6aa";
		ctx.fillRect(0, 0, w, h);
		for (let i = 0; i < 3500; i++) {
			ctx.fillStyle = i % 2 === 0 ? "rgba(75,70,64,0.1)" : "rgba(245,242,235,0.09)";
			ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
		}
		for (let i = 0; i < 6; i++) {
			const gx = Math.random() * w;
			const gy = Math.random() * h;
			const gr = 24 + Math.random() * 44;
			const g = ctx.createRadialGradient(gx, gy, 2, gx, gy, gr);
			g.addColorStop(0, "rgba(70,64,56,0.16)");
			g.addColorStop(1, "rgba(70,64,56,0)");
			ctx.fillStyle = g;
			ctx.beginPath();
			ctx.arc(gx, gy, gr, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.strokeStyle = "rgba(72,66,58,0.38)";
		ctx.lineWidth = 3;
		for (let x = 0; x <= w; x += 128) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, h);
			ctx.stroke();
		}
		for (let y = 0; y <= h; y += 128) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(w, y);
			ctx.stroke();
		}
	}, 512, 512);
	p.tex.wrapS = RepeatWrapping;
	p.tex.wrapT = RepeatWrapping;
	p.tex.repeat.set(3, 2);
	return p.tex;
}
function createAsphaltTexture() {
	const p = paint((ctx, w, h) => {
		ctx.fillStyle = "#2b2e35";
		ctx.fillRect(0, 0, w, h);
		for (let i = 0; i < 6500; i++) {
			ctx.fillStyle = i % 3 === 0 ? "rgba(210,215,225,0.05)" : "rgba(12,14,18,0.25)";
			ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
		}
		ctx.fillStyle = "rgba(15,17,20,0.28)";
		ctx.fillRect(0, h * .24, w, h * .14);
		ctx.fillRect(0, h * .62, w, h * .14);
		ctx.strokeStyle = "rgba(14,15,18,0.35)";
		ctx.lineWidth = 1.5;
		for (let i = 0; i < 5; i++) {
			ctx.beginPath();
			let cx = Math.random() * w;
			let cy = Math.random() * h;
			ctx.moveTo(cx, cy);
			for (let s = 0; s < 5; s++) {
				cx += 18 + Math.random() * 24;
				cy += (Math.random() - .5) * 18;
				ctx.lineTo(cx, cy);
			}
			ctx.stroke();
		}
	}, 512, 512);
	p.tex.wrapS = RepeatWrapping;
	p.tex.wrapT = RepeatWrapping;
	p.tex.repeat.set(12, 1);
	return p.tex;
}
function createTireTreadTexture() {
	const p = paint((ctx, w, h) => {
		ctx.fillStyle = "#181a1f";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#0e0f13";
		for (let x = 0; x < w; x += 24) {
			ctx.fillRect(x, 0, 8, h);
			ctx.beginPath();
			ctx.moveTo(x + 10, 0);
			ctx.lineTo(x + 22, h / 2);
			ctx.lineTo(x + 10, h);
			ctx.lineTo(x + 16, h);
			ctx.lineTo(x + 28, h / 2);
			ctx.lineTo(x + 16, 0);
			ctx.fill();
		}
	}, 256, 128);
	p.tex.wrapS = RepeatWrapping;
	p.tex.wrapT = RepeatWrapping;
	p.tex.repeat.set(3, 1);
	return p.tex;
}
function createBrickTexture() {
	const p = paint((ctx, w, h) => {
		ctx.fillStyle = "#8a7868";
		ctx.fillRect(0, 0, w, h);
		const rows = 8;
		const cols = 4;
		const bh = h / rows;
		const bw = w / cols;
		for (let r = 0; r < rows; r++) {
			const off = r % 2 * (bw / 2);
			for (let c = -1; c <= cols; c++) {
				const shade = 195 + Math.floor(Math.random() * 28);
				ctx.fillStyle = `rgb(${shade}, ${shade - 16}, ${shade - 34})`;
				ctx.fillRect(c * bw + off + 3, r * bh + 3, bw - 6, bh - 6);
			}
		}
	}, 512, 512);
	p.tex.wrapS = RepeatWrapping;
	p.tex.wrapT = RepeatWrapping;
	p.tex.repeat.set(3, 1);
	return p.tex;
}
function createHazardTexture() {
	const p = paint((ctx, w, h) => {
		ctx.fillStyle = "#eab308";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#18181b";
		for (let i = -h; i < w + h; i += 44) {
			ctx.beginPath();
			ctx.moveTo(i, 0);
			ctx.lineTo(i + 22, 0);
			ctx.lineTo(i + 22 - h, h);
			ctx.lineTo(i - h, h);
			ctx.closePath();
			ctx.fill();
		}
	}, 256, 128);
	p.tex.wrapS = RepeatWrapping;
	p.tex.wrapT = RepeatWrapping;
	p.tex.repeat.set(3, 1);
	return p.tex;
}
function createSpongeTexture() {
	return paint((ctx, w, h) => {
		ctx.fillStyle = "#eab308";
		ctx.fillRect(0, 0, w, h);
		for (let i = 0; i < 500; i++) {
			ctx.fillStyle = i % 2 === 0 ? "rgba(161,98,7,0.35)" : "rgba(254,240,138,0.4)";
			ctx.beginPath();
			ctx.arc(Math.random() * w, Math.random() * h, 1 + Math.random() * 3.5, 0, Math.PI * 2);
			ctx.fill();
		}
	}, 128, 128).tex;
}
function createBunTexture() {
	return paint((ctx, w, h) => {
		const g = ctx.createRadialGradient(w / 2, h / 2, 8, w / 2, h / 2, w / 2);
		g.addColorStop(0, "#d97706");
		g.addColorStop(1, "#b45309");
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#fef3c7";
		for (let i = 0; i < 65; i++) {
			const a = Math.random() * Math.PI * 2;
			const r = Math.random() * (w * .38);
			ctx.save();
			ctx.translate(w / 2 + Math.cos(a) * r, h / 2 + Math.sin(a) * r);
			ctx.rotate(Math.random() * Math.PI);
			ctx.beginPath();
			ctx.ellipse(0, 0, 3.2, 1.5, 0, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		}
	}, 128, 128).tex;
}
function createSignTexture() {
	return paint((ctx, w, h) => {
		const grad = ctx.createLinearGradient(0, 0, 0, h);
		grad.addColorStop(0, "#f3ead6");
		grad.addColorStop(1, "#dfd0b2");
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#264e52";
		ctx.fillRect(0, 0, w, 24);
		ctx.fillRect(0, h - 24, w, 24);
		ctx.strokeStyle = "#b94827";
		ctx.lineWidth = 8;
		ctx.strokeRect(18, 34, w - 36, h - 68);
		ctx.fillStyle = "#1c1917";
		ctx.font = "900 94px Impact, Arial Black, sans-serif";
		ctx.textAlign = "center";
		ctx.fillText("WANTED FUEL", w / 2 + 4, h * .68 + 4);
		ctx.fillStyle = "#c84b26";
		ctx.fillText("WANTED FUEL", w / 2, h * .68);
	}, 1024, 280).tex;
}
function createPumpFaceTexture() {
	return paint((ctx, w, h) => {
		ctx.fillStyle = "#e7decb";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#475569";
		ctx.lineWidth = 8;
		ctx.strokeRect(10, 10, w - 20, h - 20);
		ctx.fillStyle = "#0f172a";
		ctx.fillRect(24, 22, w - 48, 114);
		ctx.fillStyle = "#94a3b8";
		ctx.font = "700 16px sans-serif";
		ctx.textAlign = "left";
		ctx.fillText("TỔNG TIỀN", 34, 46);
		ctx.fillStyle = "#34d399";
		ctx.font = "800 40px monospace";
		ctx.textAlign = "right";
		ctx.fillText("088.50$", w - 36, 86);
		ctx.fillStyle = "#fbbf24";
		ctx.font = "700 24px monospace";
		ctx.fillText("14.20 L", w - 36, 122);
		const cols = [
			"#10b981",
			"#f59e0b",
			"#ef4444",
			"#3b82f6"
		];
		const names = [
			"92",
			"95",
			"98",
			"D"
		];
		for (let i = 0; i < 4; i++) {
			const bx = 26 + i * 53;
			ctx.fillStyle = cols[i];
			ctx.fillRect(bx, 156, 44, 72);
			ctx.strokeStyle = "#1e293b";
			ctx.lineWidth = 3;
			ctx.strokeRect(bx, 156, 44, 72);
			ctx.fillStyle = "#fff";
			ctx.font = "800 22px Arial";
			ctx.textAlign = "center";
			ctx.fillText(names[i], bx + 22, 200);
		}
	}, 256, 256).tex;
}
function createBillTexture() {
	return paint((ctx, w, h) => {
		ctx.fillStyle = "#bbf7d0";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#166534";
		ctx.lineWidth = 10;
		ctx.strokeRect(12, 12, w - 24, h - 24);
		ctx.strokeStyle = "#15803d";
		ctx.lineWidth = 3;
		ctx.strokeRect(24, 22, w - 48, h - 44);
		ctx.fillStyle = "#15803d";
		ctx.beginPath();
		ctx.ellipse(w / 2, h / 2, 46, 36, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#dcfce7";
		ctx.font = "900 48px Georgia, serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText("$", w / 2, h / 2 + 2);
		ctx.fillStyle = "#14532d";
		ctx.font = "800 24px Georgia, serif";
		ctx.fillText("100", 48, 42);
		ctx.fillText("100", w - 48, h - 38);
	}, 256, 128).tex;
}
function createPlateTexture() {
	return paint((ctx, w, h) => {
		ctx.fillStyle = "#f1f5f9";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#1e293b";
		ctx.lineWidth = 8;
		ctx.strokeRect(6, 6, w - 12, h - 12);
		ctx.fillStyle = "#c84b26";
		ctx.fillRect(10, 10, w - 20, 22);
		ctx.fillStyle = "#0f172a";
		ctx.font = "900 44px monospace";
		ctx.textAlign = "center";
		ctx.fillText("77-SA-MAC", w / 2, 84);
	}, 256, 112).tex;
}
function createMudTexture() {
	return paint((ctx, w, h) => {
		ctx.clearRect(0, 0, w, h);
		for (const [bx, by, br] of [
			[
				80,
				90,
				44
			],
			[
				135,
				115,
				36
			],
			[
				195,
				85,
				32
			],
			[
				110,
				145,
				28
			],
			[
				170,
				140,
				26
			],
			[
				60,
				130,
				22
			],
			[
				210,
				125,
				18
			]
		]) {
			ctx.fillStyle = "rgba(82, 48, 24, 0.88)";
			ctx.beginPath();
			ctx.ellipse(bx, by, br, br * .72, .25, 0, Math.PI * 2);
			ctx.fill();
		}
		for (let i = 0; i < 50; i++) {
			ctx.fillStyle = "rgba(105, 62, 30, 0.82)";
			ctx.beginPath();
			ctx.arc(24 + Math.random() * (w - 48), 32 + Math.random() * (h - 64), 2 + Math.random() * 7, 0, Math.PI * 2);
			ctx.fill();
		}
	}, 256, 200).tex;
}
function createConsoleLabelTexture(label, bg, fg = "#f8fafc") {
	return paint((ctx, w, h) => {
		ctx.fillStyle = bg;
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = fg;
		ctx.font = "900 54px Arial, sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(label, w / 2, h / 2 + 2);
	}, 128, 128).tex;
}
function drawMonitor(ctx, w, h) {
	ctx.fillStyle = "#0f172a";
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = "#1e293b";
	ctx.fillRect(16, 16, w - 32, 196);
	ctx.fillStyle = "#f59e0b";
	ctx.font = "800 30px Arial, sans-serif";
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
	ctx.fillStyle = "#efe6d1";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "#b8a684";
	ctx.lineWidth = 6;
	ctx.strokeRect(16, 16, w - 32, h - 32);
	ctx.fillStyle = "#e5dbc4";
	ctx.fillRect(46, 136, w - 92, 290);
	ctx.strokeStyle = "#a89878";
	ctx.lineWidth = 2;
	ctx.font = "700 18px monospace";
	ctx.textAlign = "left";
	const marks = [
		"6'2\"",
		"6'0\"",
		"5'10\"",
		"5'8\"",
		"5'6\"",
		"5'4\""
	];
	for (let i = 0; i < marks.length; i++) {
		const yy = 165 + i * 44;
		ctx.beginPath();
		ctx.moveTo(56, yy);
		ctx.lineTo(w - 56, yy);
		ctx.stroke();
		ctx.fillStyle = "#78716c";
		ctx.fillText(marks[i], 58, yy - 5);
	}
	ctx.fillStyle = "#991b1b";
	ctx.font = "900 72px Impact, Arial Black, sans-serif";
	ctx.textAlign = "center";
	ctx.fillText("WANTED", w / 2, 102);
	ctx.fillStyle = face.shirt;
	ctx.beginPath();
	ctx.moveTo(w / 2 - 110, 426);
	ctx.quadraticCurveTo(w / 2 - 105, 342, w / 2 - 32, 332);
	ctx.lineTo(w / 2 + 32, 332);
	ctx.quadraticCurveTo(w / 2 + 105, 342, w / 2 + 110, 426);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#eab08e";
	ctx.fillRect(w / 2 - 22, 304, 44, 38);
	ctx.fillStyle = "#f2be9f";
	ctx.beginPath();
	ctx.ellipse(w / 2, 250, 56, 68, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#e6ad8b";
	ctx.beginPath();
	ctx.ellipse(w / 2 - 58, 252, 9, 18, 0, 0, Math.PI * 2);
	ctx.ellipse(w / 2 + 58, 252, 9, 18, 0, 0, Math.PI * 2);
	ctx.fill();
	if (!face.hat) {
		ctx.fillStyle = "#292524";
		ctx.beginPath();
		ctx.ellipse(w / 2, 198, 57, 28, 0, Math.PI, 0);
		ctx.fill();
	}
	const er = face.id === "thief" ? 13 : 9;
	ctx.fillStyle = "#fff";
	ctx.beginPath();
	ctx.ellipse(w / 2 - 22, 240, er, er * .78, 0, 0, Math.PI * 2);
	ctx.ellipse(w / 2 + 22, 240, er, er * .78, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#18181b";
	ctx.beginPath();
	ctx.arc(w / 2 - 22, 240, 4.5, 0, Math.PI * 2);
	ctx.arc(w / 2 + 22, 240, 4.5, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = "#292524";
	ctx.lineWidth = 6;
	ctx.beginPath();
	if (face.id === "bully") {
		ctx.moveTo(w / 2 - 38, 220);
		ctx.lineTo(w / 2 - 10, 229);
		ctx.moveTo(w / 2 + 38, 220);
		ctx.lineTo(w / 2 + 10, 229);
	} else {
		ctx.moveTo(w / 2 - 36, 224);
		ctx.lineTo(w / 2 - 10, 223);
		ctx.moveTo(w / 2 + 36, 224);
		ctx.lineTo(w / 2 + 10, 223);
	}
	ctx.stroke();
	ctx.strokeStyle = "#b87a58";
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(w / 2, 244);
	ctx.lineTo(w / 2 - 5, 266);
	ctx.lineTo(w / 2 + 5, 268);
	ctx.stroke();
	if (face.id === "worst") {
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(w / 2 - 26, 282, 52, 16);
		ctx.strokeStyle = "#18181b";
		ctx.lineWidth = 2.5;
		ctx.strokeRect(w / 2 - 26, 282, 52, 16);
	} else {
		ctx.strokeStyle = "#7c3f28";
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.moveTo(w / 2 - 16, 290);
		ctx.lineTo(w / 2 + 16, 290);
		ctx.stroke();
	}
	if (face.hat) {
		ctx.fillStyle = face.hat;
		ctx.beginPath();
		ctx.arc(w / 2, 204, 58, Math.PI, 0);
		ctx.fill();
		ctx.fillRect(w / 2 - 64, 200, 140, 14);
	}
	ctx.fillStyle = "#1c1917";
	ctx.fillRect(w / 2 - 90, 384, 180, 40);
	ctx.fillStyle = "#f8fafc";
	ctx.font = "700 20px monospace";
	ctx.fillText(`ID: ${face.id.toUpperCase()}`, w / 2, 411);
	ctx.fillStyle = "#1c1917";
	ctx.font = "800 34px Arial, sans-serif";
	ctx.fillText(face.name, w / 2, 492);
	ctx.fillStyle = "#991b1b";
	ctx.font = "800 40px Arial, sans-serif";
	ctx.fillText(`THƯỞNG $${face.bounty}`, w / 2, 548);
	ctx.fillStyle = "#44403c";
	ctx.font = "600 22px Arial, sans-serif";
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
		ctx.fillRect(68, 76, 38, 60);
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
function buildLowerBodyGeo(style) {
	const s = new Shape();
	s.moveTo(-1.14, .28);
	s.lineTo(-.99, .28);
	s.absarc(-.74, .28, .26, Math.PI, 0, true);
	s.lineTo(.48, .26);
	s.absarc(.74, .28, .26, Math.PI, 0, true);
	s.lineTo(1.12, .28);
	s.quadraticCurveTo(1.23, .44, 1.16, .64);
	if (style === "ev") s.quadraticCurveTo(.84, .76, .44, .8);
	else if (style === "devil") s.lineTo(.42, .79);
	else s.quadraticCurveTo(.82, .74, .44, .78);
	s.lineTo(-.88, .78);
	s.quadraticCurveTo(-1.08, .77, -1.14, .68);
	s.closePath();
	const geo = new ExtrudeGeometry(s, {
		depth: 1.04,
		bevelEnabled: true,
		bevelThickness: .06,
		bevelSize: .045,
		bevelSegments: 4,
		curveSegments: 14
	});
	geo.translate(0, 0, -.52);
	geo.rotateY(-Math.PI / 2);
	geo.computeVertexNormals();
	return geo;
}
function buildRoofGeo(style) {
	const s = new Shape();
	const frontX = style === "ev" ? .14 : .16;
	const backX = style === "ev" ? -.72 : -.58;
	s.moveTo(backX, 1.38);
	s.lineTo(frontX, 1.38);
	s.quadraticCurveTo((frontX + backX) / 2, 1.46, backX, 1.38);
	s.closePath();
	const geo = new ExtrudeGeometry(s, {
		depth: .88,
		bevelEnabled: true,
		bevelThickness: .04,
		bevelSize: .03,
		bevelSegments: 3,
		curveSegments: 12
	});
	geo.translate(0, 0, -.44);
	geo.rotateY(-Math.PI / 2);
	geo.computeVertexNormals();
	return geo;
}
function buildTireGeo() {
	const pts = [
		new Vector2(.145, -.078),
		new Vector2(.225, -.082),
		new Vector2(.245, -.064),
		new Vector2(.245, .064),
		new Vector2(.225, .082),
		new Vector2(.145, .078),
		new Vector2(.145, -.078)
	];
	const geo = new LatheGeometry(pts, 28);
	geo.rotateZ(Math.PI / 2);
	geo.computeVertexNormals();
	return geo;
}
function LiveCar() {
	const ref = (0, import_react.useRef)(null);
	const w1 = (0, import_react.useRef)(null);
	const w2 = (0, import_react.useRef)(null);
	const w3 = (0, import_react.useRef)(null);
	const w4 = (0, import_react.useRef)(null);
	const blower = (0, import_react.useRef)(null);
	const plateTex = (0, import_react.useMemo)(() => createPlateTexture(), []);
	const mudTex = (0, import_react.useMemo)(() => createMudTexture(), []);
	const treadTex = (0, import_react.useMemo)(() => createTireTreadTexture(), []);
	const tireGeo = (0, import_react.useMemo)(() => buildTireGeo(), []);
	const sedanLower = (0, import_react.useMemo)(() => buildLowerBodyGeo("sedan"), []);
	const evLower = (0, import_react.useMemo)(() => buildLowerBodyGeo("ev"), []);
	const devilLower = (0, import_react.useMemo)(() => buildLowerBodyGeo("devil"), []);
	const sedanRoof = (0, import_react.useMemo)(() => buildRoofGeo("sedan"), []);
	const evRoof = (0, import_react.useMemo)(() => buildRoofGeo("ev"), []);
	const [look, setLook] = (0, import_react.useState)({
		id: -1,
		color: "#e09f3e",
		shirt: "#fff",
		hat: null,
		skin: "#e8b393",
		devil: false,
		face: null,
		mad: false,
		job: "fuel"
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
		const idleVib = c.phase === "wait" && !c.asleep && c.job !== "charge" ? Math.sin(sim.clock * 42) * .0025 : 0;
		g.position.set(c.x, idleVib, c.z);
		g.rotation.y = c.yaw + Math.PI;
		if (c.id !== look.id || c.hat !== look.hat || c.color !== look.color || c.mad !== look.mad || c.job !== look.job) setLook({
			id: c.id,
			color: c.color,
			shirt: c.shirt,
			hat: c.hat,
			skin: c.skin,
			devil: c.devil,
			face: c.face,
			mad: c.mad,
			job: c.job
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
		if (blower.current) blower.current.rotation.z = sim.clock * 6;
		const mud = g.getObjectByName("mud");
		if (mud) {
			const vis = c.dirty > .2 && c.wash < .96;
			mud.visible = vis;
			if (vis) {
				const op = Math.max(.08, 1 - c.wash);
				mud.traverse((child) => {
					const mat = child.material;
					if (mat && "opacity" in mat) mat.opacity = op;
				});
			}
		}
		const hat = g.getObjectByName("hat");
		if (hat) hat.visible = Boolean(c.hat);
		const hair = g.getObjectByName("hair");
		if (hair) hair.visible = !c.hat && !c.devil;
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
			const targetTurn = c.phase === "wait" && !c.asleep && !c.caught ? 1.15 : 0;
			head.rotation.y += (targetTurn - head.rotation.y) * Math.min(1, dt * 6);
			if (c.caught) {
				head.rotation.z = .65;
				head.rotation.x = Math.sin(sim.clock * 28) * .1;
			} else if (c.asleep) {
				head.rotation.z = .25 + Math.sin(sim.clock * 2.5) * .04;
				head.rotation.x = .24;
			} else {
				head.rotation.z = 0;
				head.rotation.x = Math.sin(sim.clock * 2.2) * .02;
			}
		}
		const bar = g.getObjectByName("fuelbar");
		if (bar) {
			bar.scale.y = Math.max(.05, c.fuel);
			bar.visible = (c.job === "fuel" || c.job === "charge") && c.phase === "wait";
			const mat = bar.material;
			if (!Array.isArray(mat)) mat.color.set(c.job === "charge" ? "#38bdf8" : "#eab308");
		}
		const barBg = g.getObjectByName("fuelbar-bg");
		if (barBg) barBg.visible = (c.job === "fuel" || c.job === "charge") && c.phase === "wait";
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
	const style = look.devil ? "devil" : look.job === "charge" ? "ev" : "sedan";
	const lowerGeo = style === "devil" ? devilLower : style === "ev" ? evLower : sedanLower;
	const roofGeo = style === "ev" ? evRoof : sedanRoof;
	const headlightEmissive = .45 + sim.night * 1.25;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		visible: false,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "outline",
				position: [
					0,
					.85,
					0
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					1.4,
					.035,
					8,
					32
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#ef4444" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: lowerGeo,
				castShadow: true,
				receiveShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: look.color,
					roughness: .22,
					metalness: .48
				})
			}),
			[-.565, .565].map((sx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					sx,
					.48,
					0
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.014,
					.96,
					4,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1f2937",
					roughness: .75
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					sx * 1.01,
					.69,
					-.18
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.015,
					.1,
					4,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e2e8f0",
					roughness: .2,
					metalness: .85
				})]
			})] }, sx)),
			[
				[
					-.55,
					.28,
					.74
				],
				[
					.55,
					.28,
					.74
				],
				[
					-.55,
					.28,
					-.74
				],
				[
					.55,
					.28,
					-.74
				]
			].map(([fx, fy, fz], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					fx,
					fy,
					fz
				],
				rotation: [
					0,
					Math.PI / 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.265,
					.025,
					8,
					16,
					Math.PI
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1f2937",
					roughness: .75
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: roofGeo,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: look.color,
					roughness: .22,
					metalness: .48
				})
			}),
			[-.46, .46].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x,
					1.09,
					.31
				],
				rotation: [
					-.45,
					0,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.028,
					.62,
					6,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: look.color,
					roughness: .24,
					metalness: .45
				})]
			}, `a-${x}`)),
			[-.46, .46].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x,
					1.09,
					-.71
				],
				rotation: [
					.45,
					0,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.034,
					.62,
					6,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: look.color,
					roughness: .24,
					metalness: .45
				})]
			}, `c-${x}`)),
			[-.47, .47].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x,
					1.09,
					-.28
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.024,
					.56,
					6,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1e293b",
					roughness: .45,
					metalness: .3
				})]
			}, `b-${x}`)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.09,
					.31
				],
				rotation: [
					-.45,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.88, .58] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1e3a4c",
					roughness: .08,
					metalness: .55,
					transparent: true,
					opacity: .28
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.09,
					-.71
				],
				rotation: [
					.45,
					Math.PI,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.88, .56] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0f172a",
					roughness: .1,
					metalness: .55,
					transparent: true,
					opacity: .58
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.22,
					.8,
					-.08
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.14,
						-.14
					],
					rotation: [
						-.15,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
						.14,
						.22,
						6,
						10
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1f2937",
						roughness: .85
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.38,
						-.17
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
						.072,
						.08,
						6,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1f2937",
						roughness: .85
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.29,
					1.2
				],
				rotation: [
					0,
					0,
					Math.PI / 2
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.06,
					1.08,
					6,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e2e8f0",
					roughness: .16,
					metalness: .88
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.29,
					-1.18
				],
				rotation: [
					0,
					0,
					Math.PI / 2
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.06,
					1.08,
					6,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e2e8f0",
					roughness: .16,
					metalness: .88
				})]
			}),
			style !== "ev" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					0,
					.48,
					1.19
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.22,
					.22,
					.05,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1e293b",
					roughness: .4,
					metalness: .6
				})] }), [
					-.05,
					0,
					.05
				].map((yy) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						yy,
						.02
					],
					rotation: [
						0,
						0,
						Math.PI / 2
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
						.011,
						.44,
						4,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f1f5f9",
						roughness: .15,
						metalness: .9
					})]
				}, yy))]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.52,
					1.18
				],
				rotation: [
					0,
					0,
					Math.PI / 2
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.032,
					.62,
					6,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#38bdf8",
					emissive: "#0284c7",
					emissiveIntensity: .75
				})]
			}),
			[-.4, .4].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					x,
					.52,
					1.17
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.095,
					.02,
					8,
					18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#f1f5f9",
					roughness: .15,
					metalness: .9
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.01,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.088,
						.088,
						.03,
						16
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#fef3c7",
						emissive: "#fde047",
						emissiveIntensity: headlightEmissive,
						roughness: .12
					})]
				})]
			}, x)),
			[-.41, .41].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					x,
					.52,
					-1.16
				],
				rotation: [
					0,
					0,
					Math.PI / 2
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.052,
					.14,
					6,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#ef4444",
					emissive: "#dc2626",
					emissiveIntensity: .65,
					roughness: .2
				})]
			}, x)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.47,
					-1.17
				],
				rotation: [
					0,
					Math.PI,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.38, .16] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { map: plateTex })]
			}),
			[-.36, -.26].map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					ex,
					.22,
					-1.22
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.032,
					.036,
					.18,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cbd5e1",
					roughness: .22,
					metalness: .85
				})]
			}, ex)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.22,
					.88,
					.28
				],
				rotation: [
					.45,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.12,
					.016,
					8,
					18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#18181b",
					roughness: .45
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						-.06
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.02,
						.026,
						.14,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#334155",
						roughness: .5
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				name: "flames",
				visible: false,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					position: [
						0,
						.84,
						.72
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.11,
							.13,
							.18,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#cbd5e1",
							roughness: .2,
							metalness: .88
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
						ref: blower,
						position: [
							0,
							.09,
							.08
						],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							rotation: [
								Math.PI / 2,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.07,
								.07,
								.06,
								10
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#dc2626",
								roughness: .3
							})]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "poop",
				position: [
					.08,
					.8,
					.78
				],
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.08,
					.035,
					8,
					14
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#6b3e26",
					roughness: .95
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.05,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
						.05,
						.03,
						8,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#7c4a2d",
						roughness: .95
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "mud",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.58,
							.56,
							.05
						],
						rotation: [
							0,
							Math.PI / 2,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.25, .52] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							map: mudTex,
							transparent: true,
							depthWrite: false,
							roughness: .95
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.58,
							.56,
							.05
						],
						rotation: [
							0,
							-Math.PI / 2,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.25, .52] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							map: mudTex,
							transparent: true,
							depthWrite: false,
							roughness: .95
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.81,
							.74
						],
						rotation: [
							-Math.PI / 2 + .05,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.72, .52] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							map: mudTex,
							transparent: true,
							depthWrite: false,
							roughness: .95
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
				refObj: w1,
				at: [
					-.54,
					.25,
					.74
				],
				tireGeo,
				treadTex
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
				refObj: w2,
				at: [
					.54,
					.25,
					.74
				],
				tireGeo,
				treadTex,
				flip: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
				refObj: w3,
				at: [
					-.54,
					.25,
					-.74
				],
				tireGeo,
				treadTex
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
				refObj: w4,
				at: [
					.54,
					.25,
					-.74
				],
				tireGeo,
				treadTex,
				flip: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "mirror",
				position: [
					.55,
					.84,
					.42
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.02,
							-.01,
							.03
						],
						rotation: [
							0,
							0,
							-.5
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.016,
							.024,
							.08,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#18181b",
							roughness: .6
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.095,
							.02,
							0
						],
						scale: [
							1.2,
							.78,
							.75
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.062,
							12,
							10
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: look.color,
							roughness: .22,
							metalness: .48
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.095,
							.02,
							-.044
						],
						scale: [
							1.25,
							.82,
							1
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.048, 14] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#18181b",
							roughness: .5
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.095,
							.02,
							-.047
						],
						scale: [
							1.15,
							.74,
							1
						],
						rotation: [
							0,
							Math.PI,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.044, 14] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e2e8f0",
							roughness: .05,
							metalness: .95
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-.55,
					.84,
					.42
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.02,
						-.01,
						.03
					],
					rotation: [
						0,
						0,
						.5
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.016,
						.024,
						.08,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#18181b",
						roughness: .6
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.095,
						.02,
						0
					],
					scale: [
						1.2,
						.78,
						.75
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.062,
						12,
						10
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: look.color,
						roughness: .22,
						metalness: .48
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.58,
					.64,
					-.48
				],
				rotation: [
					0,
					0,
					-Math.PI / 2
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.075,
					.015,
					8,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#334155",
					roughness: .4,
					metalness: .6
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					name: "gascap",
					position: [
						0,
						.02,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.068,
						.068,
						.04,
						16
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#94a3b8",
						roughness: .35,
						metalness: .4
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				name: "cheese",
				position: [
					-.18,
					.86,
					-.32
				],
				visible: false,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						0,
						.4,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.09,
						.09,
						.07,
						3
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#facc15",
						roughness: .65
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "fuelbar-bg",
				position: [
					.58,
					.62,
					-.78
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.024,
					.44,
					6,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#18181b" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				name: "fuelbar",
				position: [
					.59,
					.62,
					-.78
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.018,
					.4,
					6,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#eab308" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "head",
				position: [
					.22,
					.94,
					.02
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							-.08,
							0
						],
						rotation: [
							0,
							0,
							Math.PI / 2
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
							.125,
							.16,
							8,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: look.shirt,
							roughness: .82
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.05,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.048,
							.062,
							.1,
							10
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: look.skin,
							roughness: .72
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.21,
							0
						],
						scale: [
							.84,
							1.04,
							.92
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.145,
							16,
							14
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: look.skin,
							roughness: .7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.125,
							.21,
							0
						],
						scale: [
							.45,
							.95,
							.7
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.038,
							8,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: look.skin,
							roughness: .7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.125,
							.21,
							0
						],
						scale: [
							.45,
							.95,
							.7
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.038,
							8,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: look.skin,
							roughness: .7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
						name: "hair",
						position: [
							0,
							.27,
							-.01
						],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							scale: [
								.88,
								.72,
								.96
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.146,
								14,
								10,
								0,
								Math.PI * 2,
								0,
								Math.PI * .56
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#27272a",
								roughness: .9
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.2,
							.132
						],
						rotation: [
							-.2,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
							.015,
							.03,
							4,
							6
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: look.skin,
							roughness: .68
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.048,
							.23,
							.114
						],
						scale: wideEyes ? 1.35 : [
							1.05,
							.85,
							.6
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.021,
							10,
							10
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#fff" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.048,
							.23,
							.114
						],
						scale: wideEyes ? 1.35 : [
							1.05,
							.85,
							.6
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.021,
							10,
							10
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#fff" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.048,
							.23,
							.126
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.01,
							8,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#111" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.048,
							.23,
							.126
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.01,
							8,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#111" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.048,
							.262,
							.122
						],
						rotation: [
							0,
							0,
							Math.PI / 2 + (angryBrows ? -.32 : 0)
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
							.008,
							.038,
							4,
							6
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#1e1b18" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.048,
							.262,
							.122
						],
						rotation: [
							0,
							0,
							Math.PI / 2 + (angryBrows ? .32 : 0)
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
							.008,
							.038,
							4,
							6
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#1e1b18" })]
					}),
					bigGrin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.145,
							.122
						],
						rotation: [
							.1,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
							.016,
							.065,
							4,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#ffffff" })]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "hat",
						position: [
							0,
							.3,
							0
						],
						visible: Boolean(look.hat),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							scale: [
								.92,
								.65,
								.96
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.148,
								14,
								10,
								0,
								Math.PI * 2,
								0,
								Math.PI * .55
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: look.hat ?? "#2d9d5c",
								roughness: .78
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.005,
								.11
							],
							rotation: [
								.12,
								0,
								0
							],
							scale: [
								1.1,
								.2,
								.9
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.12,
								.13,
								.045,
								14,
								1,
								false,
								-Math.PI * .45,
								Math.PI * .9
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: look.hat ?? "#2d9d5c",
								roughness: .78
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "horns",
						visible: look.devil,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								-.065,
								.35,
								0
							],
							rotation: [
								0,
								0,
								.42
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
								.03,
								.17,
								10
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#dc2626",
								roughness: .35
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								.065,
								.35,
								0
							],
							rotation: [
								0,
								0,
								-.42
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
								.03,
								.17,
								10
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#dc2626",
								roughness: .35
							})]
						})]
					})
				]
			})
		]
	});
}
function Wheel({ at, refObj, flip, tireGeo, treadTex }) {
	const dir = flip ? 1 : -1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: refObj,
		position: at,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: tireGeo,
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: treadTex,
					bumpMap: treadTex,
					bumpScale: .015,
					roughness: .85,
					metalness: .05
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					dir * .02,
					0,
					0
				],
				rotation: [
					0,
					0,
					Math.PI / 2
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.125,
					.125,
					.02,
					18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#64748b",
					roughness: .35,
					metalness: .8
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					dir * .025,
					.075,
					.05
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.035,
					.035,
					.04,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#dc2626",
					roughness: .4,
					metalness: .3
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					dir * .04,
					0,
					0
				],
				rotation: [
					0,
					Math.PI / 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.142,
					.018,
					8,
					22
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e2e8f0",
					roughness: .18,
					metalness: .88
				})]
			}),
			[
				0,
				1,
				2,
				3,
				4
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					dir * .05,
					0,
					0
				],
				rotation: [
					i * Math.PI * 2 / 5,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.016,
					.23,
					4,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#cbd5e1",
					roughness: .2,
					metalness: .85
				})]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					dir * .058,
					0,
					0
				],
				rotation: [
					0,
					0,
					Math.PI / 2
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.045,
					.045,
					.028,
					14
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#94a3b8",
					roughness: .2,
					metalness: .9
				})]
			})
		]
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
		const p = carPoint(c, .15, 2.08, .1);
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.74, .74] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			map: art.tex,
			transparent: true,
			toneMapped: false
		})]
	});
}
function Bills() {
	const ref = (0, import_react.useRef)(null);
	const billTex = (0, import_react.useMemo)(() => createBillTexture(), []);
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
			m.rotation.y = sim.clock * 1.5 + b.id;
			const s = .9 + Math.min(.7, b.amount / 180);
			m.scale.setScalar(s);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref,
		children: Array.from({ length: 6 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			visible: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.26,
					.04,
					.13
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: billTex,
					color: "#dcfce7",
					emissive: "#16a34a",
					emissiveIntensity: .2,
					roughness: .55
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.055,
				.044,
				.136
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#f59e0b",
				roughness: .5
			})] })]
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dodecahedronGeometry", { args: [.055, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
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
		const groundPick = sim.aimKind === "bill" || sim.aimKind === "mdrop" || sim.aimKind === "loot";
		m.visible = sim.phase === "play" && groundPick;
		m.position.set(sim.aimPos.x, sim.aimPos.y + .24 + Math.sin(sim.clock * 6) * .035, sim.aimPos.z);
		m.rotation.y = sim.clock * 3;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref,
		visible: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("octahedronGeometry", { args: [.045, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#fde047",
			emissive: "#f59e0b",
			emissiveIntensity: .8
		})]
	});
}
function GripGlove({ side }) {
	const s = side === "left" ? -1 : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			s * .03,
			-.055,
			.06
		],
		rotation: [
			.25,
			-s * .15,
			0
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					-.04,
					.14
				],
				rotation: [
					Math.PI / 2 - .15,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.038,
					.045,
					.18,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#264e52",
					roughness: .82
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					-.01,
					.05
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.032,
					.06,
					6,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e8b393",
					roughness: .72
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.015,
					-.01
				],
				scale: [
					.95,
					.65,
					1.1
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
					.044,
					10,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#27272a",
					roughness: .78
				})]
			})
		]
	});
}
function Hands() {
	const ref = (0, import_react.useRef)(null);
	const billTex = (0, import_react.useMemo)(() => createBillTexture(), []);
	const spongeTex = (0, import_react.useMemo)(() => createSpongeTexture(), []);
	const bunTex = (0, import_react.useMemo)(() => createBunTexture(), []);
	const poster = (0, import_react.useMemo)(() => paint((ctx, w, h) => drawPoster(ctx, w, h), 512, 680), []);
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
		const posterMesh = g.getObjectByName("poster");
		if (posterMesh) posterMesh.visible = sim.posterUp;
		const tool = g.getObjectByName("tool");
		if (tool) {
			tool.visible = sim.hold !== "none";
			const jiggle = sim.usePulse > 0 ? Math.sin(sim.clock * 26) * .025 * sim.usePulse : 0;
			tool.position.set(.28 + jiggle, -.17 + Math.abs(jiggle), -.58);
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
			hat.traverse((c) => {
				const mat = c.material;
				if (mat && "color" in mat) mat.color.set(sim.hatColor);
			});
		}
		const tip = g.getObjectByName("h-nozzle-tip");
		if (tip) {
			const mat = tip.material;
			const gc = GRADES.find((x) => x.id === sim.grade)?.color ?? "#22c55e";
			if (!Array.isArray(mat)) mat.color.set(gc);
		}
		g.position.y += Math.sin(sim.clock * 2.2) * .005;
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "poster",
				position: [
					-.2,
					-.04,
					-.58
				],
				rotation: [
					.04,
					.16,
					0
				],
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.34, .46] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: poster.tex,
					toneMapped: false
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripGlove, { side: "left" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "tool",
				position: [
					.28,
					-.17,
					-.58
				],
				visible: false,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripGlove, { side: "right" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "h-nozzle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								rotation: [
									.4,
									0,
									.25
								],
								position: [
									0,
									-.02,
									.04
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
									.024,
									.12,
									6,
									10
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#18181b",
									roughness: .5,
									metalness: .4
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								name: "h-nozzle-tip",
								position: [
									.02,
									.045,
									-.04
								],
								rotation: [
									Math.PI / 2 - .2,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.035,
									.04,
									.15,
									14
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#22c55e",
									roughness: .35
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									.02,
									.045,
									-.17
								],
								rotation: [
									Math.PI / 2 + .28,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.013,
									.016,
									.16,
									12
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#e2e8f0",
									roughness: .2,
									metalness: .88
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									.02,
									.03,
									-.14
								],
								rotation: [
									.28,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
									.022,
									.005,
									6,
									12
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#18181b",
									roughness: .7
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "h-sponge",
						visible: false,
						rotation: [
							.2,
							.3,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							rotation: [
								0,
								0,
								Math.PI / 2
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
								.042,
								.11,
								6,
								12
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								map: spongeTex,
								roughness: .92
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.032,
								0
							],
							rotation: [
								0,
								0,
								Math.PI / 2
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
								.038,
								.11,
								6,
								12
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
									-.045,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.1,
									.085,
									.015,
									16
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#dc2626",
									roughness: .5
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.032,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
									.085,
									14,
									10,
									0,
									Math.PI * 2,
									0,
									Math.PI * .55
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									map: bunTex,
									roughness: .7
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.012,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.09,
									.09,
									.015,
									14
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#65a30d",
									roughness: .75
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									-.005,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.085,
									.085,
									.025,
									14
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#78350f",
									roughness: .85
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									-.028,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.08,
									.075,
									.025,
									14
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#d97706",
									roughness: .7
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "h-cap",
						visible: false,
						rotation: [
							.35,
							0,
							0
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									-.025,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.058,
									.058,
									.035,
									14
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#18181b",
									roughness: .7
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.078,
								.082,
								.042,
								16
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#dc2626",
								roughness: .35
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.028,
									0
								],
								rotation: [
									0,
									0,
									Math.PI / 2
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
									.014,
									.11,
									4,
									8
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#ef4444",
									roughness: .35
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "h-taser",
						visible: false,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								rotation: [
									.3,
									0,
									0
								],
								position: [
									0,
									-.03,
									.03
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
									.024,
									.1,
									6,
									10
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#18181b",
									roughness: .65
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.025,
									-.04
								],
								rotation: [
									Math.PI / 2,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
									.034,
									.14,
									6,
									10
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#eab308",
									roughness: .4
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									-.018,
									.025,
									-.14
								],
								rotation: [
									Math.PI / 2,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.008,
									.008,
									.05,
									8
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#38bdf8",
									emissive: "#0ea5e9",
									emissiveIntensity: .9
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									.018,
									.025,
									-.14
								],
								rotation: [
									Math.PI / 2,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.008,
									.008,
									.05,
									8
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#38bdf8",
									emissive: "#0ea5e9",
									emissiveIntensity: .9
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "h-cash",
						visible: false,
						rotation: [
							.25,
							.3,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.18,
							.035,
							.095
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							map: billTex,
							color: "#dcfce7",
							roughness: .55
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.04,
							.038,
							.1
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f59e0b",
							roughness: .5
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "h-mirror",
						visible: false,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									-.04,
									.02
								],
								rotation: [
									.2,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.014,
									.02,
									.08,
									8
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#18181b",
									roughness: .6
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								scale: [
									1.15,
									.75,
									.65
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
									.06,
									12,
									10
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#94a3b8",
									roughness: .25,
									metalness: .65
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									0,
									-.038
								],
								scale: [
									1.1,
									.7,
									1
								],
								rotation: [
									0,
									Math.PI,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.045, 14] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#f8fafc",
									roughness: .05,
									metalness: .95
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "h-charger",
						visible: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							rotation: [
								Math.PI / 2 - .15,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
								.035,
								.15,
								6,
								12
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#1e293b",
								roughness: .4
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.015,
								-.1
							],
							rotation: [
								Math.PI / 2,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.042,
								.042,
								.06,
								12
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#38bdf8",
								emissive: "#0284c7",
								emissiveIntensity: .65
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						name: "h-hat",
						visible: false,
						rotation: [
							.25,
							.4,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							scale: [
								1,
								.65,
								1
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
								.1,
								14,
								10,
								0,
								Math.PI * 2,
								0,
								Math.PI * .55
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#eab308",
								roughness: .75
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								0,
								.08
							],
							scale: [
								1.1,
								.25,
								.9
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.08,
								.09,
								.03,
								12,
								1,
								false,
								-Math.PI * .45,
								Math.PI * .9
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#eab308",
								roughness: .75
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						name: "h-cheese",
						visible: false,
						rotation: [
							.25,
							.5,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.075,
							.075,
							.055,
							3
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#facc15",
							roughness: .65
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
						8
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
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#dc2626",
						roughness: .4
					})]
				})]
			})
		]
	});
}
function roundedRectShape(w, h, r) {
	const s = new Shape();
	const x = -w / 2;
	const y = -h / 2;
	s.moveTo(x + r, y);
	s.lineTo(x + w - r, y);
	s.quadraticCurveTo(x + w, y, x + w, y + r);
	s.lineTo(x + w, y + h - r);
	s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
	s.lineTo(x + r, y + h);
	s.quadraticCurveTo(x, y + h, x, y + h - r);
	s.lineTo(x, y + r);
	s.quadraticCurveTo(x, y, x + r, y);
	return s;
}
function buildRoundedSlab(w, d, h, r, bevel = .03) {
	const geo = new ExtrudeGeometry(roundedRectShape(w, d, r), {
		depth: h,
		bevelEnabled: bevel > 0,
		bevelThickness: bevel,
		bevelSize: bevel,
		bevelSegments: 3,
		curveSegments: 12
	});
	geo.rotateX(-Math.PI / 2);
	geo.computeVertexNormals();
	return geo;
}
function buildRetroPumpGeo() {
	const s = new Shape();
	s.moveTo(-.3, 0);
	s.lineTo(.3, 0);
	s.lineTo(.3, 1.32);
	s.quadraticCurveTo(.3, 1.62, 0, 1.62);
	s.quadraticCurveTo(-.3, 1.62, -.3, 1.32);
	s.closePath();
	const geo = new ExtrudeGeometry(s, {
		depth: .44,
		bevelEnabled: true,
		bevelThickness: .035,
		bevelSize: .03,
		bevelSegments: 4,
		curveSegments: 14
	});
	geo.translate(0, 0, -.22);
	geo.computeVertexNormals();
	return geo;
}
function buildDesertTerrainGeo() {
	const geo = new PlaneGeometry(160, 160, 64, 64);
	geo.rotateX(-Math.PI / 2);
	const pos = geo.attributes.position;
	for (let i = 0; i < pos.count; i++) {
		const x = pos.getX(i);
		const z = pos.getZ(i);
		if (Math.abs(z - .5) < 2.8 || x > -10 && x < 7.5 && z > -9 && z < 7.5) {
			pos.setY(i, 0);
			continue;
		}
		const distRoad = Math.max(0, Math.abs(z - .5) - 2.8);
		const distPad = Math.max(0, Math.max(-10 - x, x - 7.5, -9 - z, z - 7.5));
		const blend = Math.min(1, Math.min(distRoad, distPad) / 7);
		const dune = (Math.sin(x * .12 + z * .08) * .5 + Math.cos(x * .06 - z * .11) * .72 + Math.sin(x * .24 + z * .2) * .16) * blend;
		pos.setY(i, Math.max(0, dune + .2 * blend));
	}
	geo.computeVertexNormals();
	return geo;
}
function buildHopperGeo() {
	const pts = [
		new Vector2(.42, 0),
		new Vector2(.42, .15),
		new Vector2(.68, .42),
		new Vector2(.62, .42),
		new Vector2(.38, .16)
	];
	return new LatheGeometry(pts, 22);
}
function Station() {
	const sandTex = (0, import_react.useMemo)(() => createSandTexture(), []);
	const bumpTex = (0, import_react.useMemo)(() => createSurfaceBumpTexture(), []);
	const concreteTex = (0, import_react.useMemo)(() => createConcreteTexture(), []);
	const asphaltTex = (0, import_react.useMemo)(() => createAsphaltTexture(), []);
	const signTex = (0, import_react.useMemo)(() => createSignTexture(), []);
	const terrainGeo = (0, import_react.useMemo)(() => buildDesertTerrainGeo(), []);
	const padGeo = (0, import_react.useMemo)(() => buildRoundedSlab(14.5, 5.2, .05, .35, .02), []);
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
		if (blades.current) blades.current.rotation.x += dt * 4.2;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: terrainGeo,
			receiveShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: sandTex,
				bumpMap: bumpTex,
				bumpScale: .035,
				roughness: .96,
				metalness: 0
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: padGeo,
			position: [
				-.8,
				-.02,
				4.7
			],
			receiveShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: concreteTex,
				bumpMap: bumpTex,
				bumpScale: .015,
				roughness: .86,
				metalness: .04
			})
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
				.5
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [84, 3.8] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: asphaltTex,
				bumpMap: bumpTex,
				bumpScale: .02,
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
				.026,
				-1.25
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [84, .12] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#cbd5e1" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				0,
				.026,
				2.25
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [84, .12] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#cbd5e1" })]
		}),
		[
			-24,
			-20,
			-16,
			-12,
			-8,
			-4,
			0,
			4,
			8,
			12,
			16,
			20,
			24
		].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				x,
				.03,
				.5
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.55, .13] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#eab308" })]
		}, x)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, { sign: signTex }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canopy, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Props, {
			root: prop,
			monitor: monitor.tex,
			poster: poster.tex
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shredder, { blades }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoadsideDecor, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				-4.6,
				0,
				-1.4
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.62,
						0
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.16,
						.2,
						1.24,
						16
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#334155",
						roughness: .45,
						metalness: .55
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.56,
						3.7
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.14,
						.18,
						1.12,
						16
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#334155",
						roughness: .45,
						metalness: .55
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.92,
						3.7
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.15,
						.15,
						.22,
						16
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#eab308",
						roughness: .4
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						1.3,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.11,
						12,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: sim.skull ? "#ef4444" : "#22c55e",
						emissive: sim.skull ? "#ef4444" : "#22c55e",
						emissiveIntensity: .9
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
					ref: bar,
					position: [
						0,
						1.02,
						0
					],
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								0,
								-.3
							],
							rotation: [
								Math.PI / 2,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.12,
								.12,
								.36,
								14
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#1e293b",
								roughness: .5
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								0,
								1.82
							],
							rotation: [
								Math.PI / 2,
								0,
								0
							],
							castShadow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.052,
								.06,
								3.65,
								12
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#dc2626",
								roughness: .38
							})]
						}),
						[
							.45,
							1.15,
							1.85,
							2.55,
							3.25
						].map((zz) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								0,
								zz
							],
							rotation: [
								Math.PI / 2,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.058,
								.058,
								.32,
								12
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#f8fafc",
								roughness: .35
							})]
						}, zz))
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtilityPoles, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cacti, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mesas, {})
	] });
}
function Building({ sign }) {
	const winGlow = (0, import_react.useRef)(null);
	const winGlow2 = (0, import_react.useRef)(null);
	const brickTex = (0, import_react.useMemo)(() => createBrickTexture(), []);
	const bodyGeo = (0, import_react.useMemo)(() => buildRoundedSlab(11.4, 4.4, 3.5, .28, .04), []);
	const roofGeo = (0, import_react.useMemo)(() => buildRoundedSlab(12, 5, .28, .35, .05), []);
	const awningGeo = (0, import_react.useMemo)(() => buildRoundedSlab(8.2, 1.05, .08, .15, .02), []);
	useFrame(() => {
		const ei = sim.night * .78;
		if (winGlow.current) winGlow.current.emissiveIntensity = ei;
		if (winGlow2.current) winGlow2.current.emissiveIntensity = ei;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			-1.8,
			0,
			-5.6
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: bodyGeo,
				position: [
					0,
					0,
					0
				],
				castShadow: true,
				receiveShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#e8decb",
					roughness: .88
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.45,
					2.26
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [11.2, .9] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: brickTex,
					roughness: .9
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: roofGeo,
				position: [
					0,
					3.52,
					0
				],
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#b94827",
					roughness: .58
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: awningGeo,
				position: [
					0,
					2.52,
					2.65
				],
				rotation: [
					.25,
					0,
					0
				],
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#264e52",
					roughness: .5
				})
			}),
			[[-2.8, 3.2], [2.6, 3.2]].map(([wx, ww], idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					wx,
					1.62,
					2.26
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						.01
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [ww, 1.65] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#27272a",
						roughness: .5
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						.03
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [ww - .16, 1.5] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						ref: idx === 0 ? winGlow : winGlow2,
						color: "#1e3a4c",
						emissive: "#fbbf24",
						emissiveIntensity: 0,
						roughness: .12,
						metalness: .45
					})]
				})]
			}, idx)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-.1,
					1.15,
					2.26
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						.01
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.25, 2.25] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#18181b",
						roughness: .4,
						metalness: .5
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						0,
						.03
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.08, 2.08] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e3a4c",
						roughness: .1,
						metalness: .5
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					3.18,
					2.3
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [5, 1.2] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: sign,
					toneMapped: false
				})]
			})
		]
	});
}
function Canopy() {
	const posts = [
		[-4.8, -1.6],
		[4.8, -1.6],
		[-4.8, 4.1],
		[4.8, 4.1]
	];
	const fasciaGeo = (0, import_react.useMemo)(() => buildRoundedSlab(10.8, 6.8, .28, .45, .05), []);
	const soffitGeo = (0, import_react.useMemo)(() => buildRoundedSlab(10.4, 6.4, .1, .35, .02), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: fasciaGeo,
			position: [
				0,
				3.95,
				1.25
			],
			castShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#b94827",
				roughness: .55
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: soffitGeo,
			position: [
				0,
				3.84,
				1.25
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#ebe2d2",
				roughness: .8
			})
		}),
		posts.map(([x, z]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				x,
				0,
				z
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.92,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.14,
					.16,
					3.84,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#27272a",
					roughness: .42,
					metalness: .55
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.14,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.24,
					.3,
					.28,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#52525b",
					roughness: .7
				})]
			})]
		}, `${x}-${z}`)),
		[
			[
				-2.2,
				3.8,
				.5
			],
			[
				2.2,
				3.8,
				.5
			],
			[
				-2.2,
				3.8,
				2.8
			],
			[
				2.2,
				3.8,
				2.8
			]
		].map(([x, y, z]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				x,
				y,
				z
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.26,
				.26,
				.04,
				16
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#fff8eb",
				emissive: "#ffe2b0",
				emissiveIntensity: .85
			})]
		}, `${x}-${z}`))
	] });
}
function Props({ root, monitor, poster }) {
	const consoleBaseGeo = (0, import_react.useMemo)(() => buildRoundedSlab(1.05, 1.05, .92, .16, .03), []);
	const consoleTopGeo = (0, import_react.useMemo)(() => buildRoundedSlab(1.12, 1.12, .07, .18, .025), []);
	const monitorCaseGeo = (0, import_react.useMemo)(() => buildRoundedSlab(1.06, .72, .04, .06, .018), []);
	const pumpGeo = (0, import_react.useMemo)(() => buildRetroPumpGeo(), []);
	const pumpFaceTex = (0, import_react.useMemo)(() => createPumpFaceTexture(), []);
	const spongeTex = (0, import_react.useMemo)(() => createSpongeTexture(), []);
	const bunTex = (0, import_react.useMemo)(() => createBunTexture(), []);
	const skullTex = (0, import_react.useMemo)(() => createConsoleLabelTexture("!", "#dc2626"), []);
	const goTex = (0, import_react.useMemo)(() => createConsoleLabelTexture("GO", "#16a34a"), []);
	const goldBtnTex = (0, import_react.useMemo)(() => createConsoleLabelTexture("$", "#15803d", "#fef08a"), []);
	const hoseGeo = (0, import_react.useMemo)(() => {
		const curve = new CatmullRomCurve3([
			new Vector3(-.28, 1.05, .1),
			new Vector3(-.42, .65, .18),
			new Vector3(-.34, .4, .04),
			new Vector3(-.14, 1.15, -.04)
		]);
		return new TubeGeometry(curve, 18, .025, 8, false);
	}, []);
	const evCableGeo = (0, import_react.useMemo)(() => {
		const curve = new CatmullRomCurve3([
			new Vector3(-.18, .9, .1),
			new Vector3(-.28, .55, .15),
			new Vector3(-.2, .38, .02),
			new Vector3(-.1, 1.15, -.02)
		]);
		return new TubeGeometry(curve, 18, .022, 8, false);
	}, []);
	const islandGeo = (0, import_react.useMemo)(() => buildRoundedSlab(2.35, .92, .12, .25, .02), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: root,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-2.35,
					0,
					3.48
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: consoleBaseGeo,
						castShadow: true,
						receiveShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#334155",
							roughness: .55,
							metalness: .35
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: consoleTopGeo,
						position: [
							0,
							.93,
							0
						],
						castShadow: true,
						receiveShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#1e293b",
							roughness: .35,
							metalness: .45
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							-.08,
							1,
							.26
						],
						rotation: [
							0,
							.55,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.16,
								-.14
							],
							rotation: [
								.2,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.038,
								.065,
								.34,
								12
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#475569",
								metalness: .6,
								roughness: .3
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
							position: [
								0,
								.4,
								-.02
							],
							rotation: [
								-.25,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: monitorCaseGeo,
								position: [
									0,
									0,
									-.05
								],
								rotation: [
									Math.PI / 2,
									0,
									0
								],
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#0f172a",
									roughness: .35,
									metalness: .5
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									0,
									.012
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.98, .64] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
									map: monitor,
									toneMapped: false
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.38,
							1.22,
							.32
						],
						rotation: [
							-.18,
							.55,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.34, .45] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							map: poster,
							toneMapped: false
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "prop-gold",
				position: [
					-2.05,
					1.02,
					3.35
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.16,
						.19,
						.06,
						20
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#eab308",
						emissive: "#d97706",
						emissiveIntensity: .3,
						roughness: .25,
						metalness: .65
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.034,
							0
						],
						rotation: [
							Math.PI / 2,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
							.13,
							.018,
							8,
							20
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#fef08a",
							roughness: .2,
							metalness: .7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.033,
							0
						],
						rotation: [
							-Math.PI / 2,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.115, 18] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { map: goldBtnTex })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-2.35,
					1.03,
					3.12
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.15,
						.17,
						.06,
						20
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#eab308",
						roughness: .4,
						metalness: .3
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.045,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.115,
							.125,
							.05,
							20
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#dc2626",
							emissive: "#ef4444",
							emissiveIntensity: sim.skull ? 1.15 : .4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.072,
							0
						],
						rotation: [
							-Math.PI / 2,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.1, 18] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { map: skullTex })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-2.55,
					1.03,
					3.4
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.15,
						.17,
						.06,
						20
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#334155",
						roughness: .4,
						metalness: .5
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.045,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.115,
							.125,
							.05,
							20
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#16a34a",
							emissive: "#22c55e",
							emissiveIntensity: .45
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.072,
							0
						],
						rotation: [
							-Math.PI / 2,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.1, 18] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { map: goTex })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-3.8,
					0,
					4.95
				],
				rotation: [
					0,
					2.55,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.05,
							-.32
						],
						castShadow: true,
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.36,
							2.1,
							.12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#27272a",
							roughness: .5,
							metalness: .4
						})]
					}),
					[-.64, .64].map((sx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							sx,
							1.05,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.08,
							2.1,
							.72
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#3f3f46",
							roughness: .45,
							metalness: .45
						})]
					}, sx)),
					[
						.08,
						.88,
						1.32,
						2.04
					].map((sy) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							sy,
							0
						],
						castShadow: true,
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.32,
							.06,
							.72
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#52525b",
							roughness: .4,
							metalness: .5
						})]
					}, sy)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.98,
							0
						],
						rotation: [
							0,
							0,
							Math.PI / 2
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.025,
							.025,
							1.15,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#fef3c7",
							emissive: "#fde68a",
							emissiveIntensity: .9
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							.64,
							1.05,
							.36
						],
						rotation: [
							0,
							1.15,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								-.32,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.64,
								1.92,
								.035
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#bae6fd",
								roughness: .1,
								metalness: .2,
								transparent: true,
								opacity: .32
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								-.58,
								0,
								.03
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
								.015,
								.18,
								4,
								8
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#e2e8f0",
								metalness: .85,
								roughness: .2
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "prop-burger",
				position: [
					-3.49,
					1.38,
					5.06
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							-.025,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.14,
							.12,
							.02,
							16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#dc2626",
							roughness: .5
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.045,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.105,
							14,
							10,
							0,
							Math.PI * 2,
							0,
							Math.PI * .55
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							map: bunTex,
							roughness: .7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.018,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.11,
							.11,
							.016,
							14
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#65a30d",
							roughness: .8
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.105,
							.105,
							.03,
							14
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#78350f",
							roughness: .85
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							-.018,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.1,
							.095,
							.025,
							14
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#d97706",
							roughness: .7
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "prop-cap",
				position: [
					-4.02,
					1.38,
					4.71
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							-.02,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.08,
							.08,
							.05,
							16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#18181b",
							roughness: .7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.02,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.105,
							.11,
							.05,
							18
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#dc2626",
							roughness: .35
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.052,
							0
						],
						rotation: [
							0,
							0,
							Math.PI / 2
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
							.016,
							.14,
							4,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#ef4444",
							roughness: .35
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-3.49,
					.91,
					5.06
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.09,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.15,
						.12,
						.18,
						16
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#2563eb",
						roughness: .45
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.16,
						0
					],
					rotation: [
						-Math.PI / 2,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.14, 16] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#bae6fd",
						roughness: .2
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "prop-sponge",
				position: [
					-3.49,
					1.09,
					5.06
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						0,
						.25,
						Math.PI / 2
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
						.055,
						.13,
						6,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						map: spongeTex,
						roughness: .92
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.042,
						0
					],
					rotation: [
						0,
						.25,
						Math.PI / 2
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
						.048,
						.13,
						6,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#15803d",
						roughness: .95
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "prop-taser",
				position: [
					-4.02,
					.96,
					4.71
				],
				rotation: [
					0,
					.4,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						rotation: [
							0,
							0,
							Math.PI / 2
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
							.045,
							.18,
							6,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#eab308",
							roughness: .4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.04,
							-.05,
							0
						],
						rotation: [
							0,
							0,
							.25
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
							.028,
							.09,
							6,
							10
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#18181b",
							roughness: .65
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.13,
							.01,
							.024
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.01,
							.01,
							.06,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#38bdf8",
							emissive: "#0ea5e9",
							emissiveIntensity: .8
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.13,
							.01,
							-.024
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.01,
							.01,
							.06,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#38bdf8",
							emissive: "#0ea5e9",
							emissiveIntensity: .8
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: islandGeo,
				position: [
					3.15,
					-.01,
					2.8
				],
				receiveShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#eab308",
					roughness: .75
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					2.45,
					.1,
					2.8
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: pumpGeo,
						castShadow: true,
						receiveShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#c84b26",
							roughness: .35,
							metalness: .28
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.05,
							.255
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.46, .46] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { map: pumpFaceTex })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.05,
							-.255
						],
						rotation: [
							0,
							Math.PI,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.46, .46] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { map: pumpFaceTex })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.66,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.2,
							.24,
							.14,
							18
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#efe4d2",
							emissive: "#fde68a",
							emissiveIntensity: .28,
							roughness: .4
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: hoseGeo,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#18181b",
							roughness: .75
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "prop-nozzle",
				position: [
					2.12,
					1.25,
					2.75
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						.4,
						0,
						-.5
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
						.04,
						.18,
						6,
						10
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e293b",
						roughness: .35,
						metalness: .6
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.12,
						.04,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.052,
						.052,
						.09,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: GRADES.find((g) => g.id === sim.grade)?.color ?? "#22c55e",
						roughness: .35
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					3.85,
					.1,
					2.8
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.72,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
							.21,
							1.05,
							8,
							16
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#264e52",
							roughness: .35,
							metalness: .35
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.08,
							.21
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
							.1,
							.015,
							8,
							18
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#38bdf8",
							emissive: "#0ea5e9",
							emissiveIntensity: .8
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.08,
							.212
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.09, 18] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#0f172a" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: evCableGeo,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#18181b",
							roughness: .75
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "prop-charger",
				position: [
					3.62,
					1.24,
					2.75
				],
				rotation: [
					.5,
					-.2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						0,
						0,
						Math.PI / 2
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
						.038,
						.15,
						6,
						10
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e293b",
						roughness: .4
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.11,
						0,
						0
					],
					rotation: [
						0,
						0,
						Math.PI / 2
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.05,
						.05,
						.08,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#38bdf8",
						emissive: "#0284c7",
						emissiveIntensity: .6
					})]
				})]
			})
		]
	});
}
function Shredder({ blades }) {
	const hazardTex = (0, import_react.useMemo)(() => createHazardTexture(), []);
	const hopperGeo = (0, import_react.useMemo)(() => buildHopperGeo(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			-5.4,
			0,
			3.6
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.74,
					0
				],
				castShadow: true,
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.58,
					.64,
					1.24,
					20
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#3f4d47",
					roughness: .55,
					metalness: .42
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.34,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.62,
					.63,
					.2,
					20
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: hazardTex,
					roughness: .5
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: hopperGeo,
				position: [
					0,
					1.32,
					0
				],
				castShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#64748b",
					roughness: .4,
					metalness: .55
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.62,
					1.15,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.09,
					.11,
					.9,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#334155",
					roughness: .4,
					metalness: .55
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: blades,
				position: [
					0,
					1.28,
					.25
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						0,
						0,
						Math.PI / 2
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.1,
						.1,
						.72,
						12
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#475569",
						metalness: .6,
						roughness: .3
					})]
				}), [
					-.25,
					-.08,
					.08,
					.25
				].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						x,
						.08,
						0
					],
					rotation: [
						.4,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
						.06,
						.18,
						6
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#e2e8f0",
						roughness: .25,
						metalness: .8
					})]
				}, x))]
			})
		]
	});
}
function RoadsideDecor() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [[[
		5.4,
		3.6,
		"#b94827"
	], [
		5.9,
		4.1,
		"#264e52"
	]].map(([x, z, col], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			Number(x),
			0,
			Number(z)
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.42,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.24,
					.24,
					.84,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: String(col),
					roughness: .5,
					metalness: .35
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.28,
					0
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.245,
					.015,
					6,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1f2937",
					roughness: .6
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.58,
					0
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.245,
					.015,
					6,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1f2937",
					roughness: .6
				})]
			})
		]
	}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		position: [
			5.6,
			0,
			2.2
		],
		children: [
			.1,
			.28,
			.46
		].map((yy, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				i * .03,
				yy,
				0
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
				.24,
				.09,
				10,
				18
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#18181b",
				roughness: .88
			})]
		}, i))
	})] });
}
function UtilityPoles() {
	const poles = [
		-18,
		-6,
		6,
		18
	];
	const wireGeo = (0, import_react.useMemo)(() => {
		const curve = new CatmullRomCurve3([
			new Vector3(-18, 5.2, -3.1),
			new Vector3(-12, 4.75, -3.1),
			new Vector3(-6, 5.2, -3.1),
			new Vector3(0, 4.75, -3.1),
			new Vector3(6, 5.2, -3.1),
			new Vector3(12, 4.75, -3.1),
			new Vector3(18, 5.2, -3.1)
		]);
		return new TubeGeometry(curve, 36, .018, 5, false);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [poles.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			x,
			0,
			-2.5
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				2.75,
				0
			],
			castShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.09,
				.13,
				5.5,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#5c4433",
				roughness: .92
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				5.15,
				0
			],
			rotation: [
				Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.05,
				.05,
				1.4,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#4a3728",
				roughness: .9
			})]
		})]
	}, x)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: wireGeo,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#1e293b" })
	})] });
}
function Cacti() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: [
		[
			9.5,
			-3.2,
			1
		],
		[
			14,
			-5.5,
			1.25
		],
		[
			7.2,
			-7.5,
			.85
		],
		[
			15,
			4.5,
			1.1
		],
		[
			-13,
			-2.5,
			1.2
		],
		[
			-12,
			4.5,
			.9
		],
		[
			6.5,
			6.8,
			1.05
		],
		[
			-8.5,
			6.2,
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
					.72,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.15,
					.95,
					6,
					10
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#416a3e",
					roughness: .88
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					.24,
					.72,
					0
				],
				rotation: [
					0,
					0,
					-.78
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.075,
					.36,
					5,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#365934",
					roughness: .88
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
					.78
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.07,
					.3,
					5,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#365934",
					roughness: .88
				})]
			})
		]
	}, `${x}-${z}`)) });
}
function Mesas() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [[
		[
			-25,
			-28,
			7,
			"#a8704a"
		],
		[
			-9,
			-31,
			9,
			"#97613e"
		],
		[
			11,
			-29,
			7.5,
			"#ad744e"
		],
		[
			27,
			-25,
			6.5,
			"#9c6542"
		]
	].map(([x, z, s, color]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			x,
			0,
			z
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				s * .25,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				s * .55,
				s * .98,
				s * .5,
				9
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color,
				roughness: .95
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				s * .15,
				s * .55,
				-s * .1
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				s * .32,
				s * .5,
				s * .35,
				8
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#b87e56",
				roughness: .95
			})]
		})]
	}, `${x}`)), [
		[
			8.5,
			-2.5,
			.55
		],
		[
			-11.5,
			-1.8,
			.7
		],
		[
			7.2,
			5.8,
			.45
		],
		[
			-9.2,
			5.8,
			.65
		]
	].map(([x, z, s], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			x,
			s * .45,
			z
		],
		rotation: [
			i,
			i * .7,
			0
		],
		castShadow: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dodecahedronGeometry", { args: [s, 1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#946e4c",
			roughness: .94
		})]
	}, i))] });
}
function Scene$1() {
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
	const { camera, scene, gl } = useThree();
	const bg = (0, import_react.useMemo)(() => new Color("#b8d4e3"), []);
	const day = (0, import_react.useMemo)(() => new Color("#b8d4e3"), []);
	const dusk = (0, import_react.useMemo)(() => new Color("#e29d76"), []);
	const night = (0, import_react.useMemo)(() => new Color("#14192d"), []);
	(0, import_react.useEffect)(() => {
		scene.fog = new Fog("#b8d4e3", 24, 90);
		const pmrem = new PMREMGenerator(gl);
		const envScene = new Scene();
		const envTex = paint((ctx, w, h) => {
			const g = ctx.createLinearGradient(0, 0, 0, h);
			g.addColorStop(0, "#7ab4d6");
			g.addColorStop(.48, "#e6edf2");
			g.addColorStop(.52, "#d1a878");
			g.addColorStop(1, "#7c5838");
			ctx.fillStyle = g;
			ctx.fillRect(0, 0, w, h);
		}, 128, 64).tex;
		const dome = new Mesh(new SphereGeometry(10, 16, 12), new MeshBasicMaterial({
			map: envTex,
			side: 1
		}));
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
		tick(Math.min(.05, dt));
		const n = sim.night;
		if (n < .4) bg.copy(day).lerp(dusk, n / .4);
		else bg.copy(dusk).lerp(night, (n - .4) / .6);
		scene.background = bg;
		const fog = scene.fog;
		if (fog && "color" in fog) {
			fog.color.copy(bg);
			if ("far" in fog) fog.far = 90 - n * 34;
		}
		if (sim.phase === "title") {
			const a = sim.orbit;
			camera.position.set(Math.sin(a) * 1.4 - .8, 2.55, 7.6 + Math.cos(a) * .6);
			camera.lookAt(-.4, 1.05, 1.4);
			return;
		}
		const bob = Math.sin(sim.clock * 9) * Math.min(.03, sim.speed * .007);
		camera.position.set(sim.player.x, 1.58 + bob, sim.player.z);
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
			sun.current.intensity = 1.4 * (1 - n * .8);
			sun.current.color.set(n > .2 ? "#ffcf99" : "#fff5e4");
		}
		if (amb.current) amb.current.intensity = .5 - n * .28;
		if (lamp.current) lamp.current.intensity = .45 + n * 4.4;
		if (pumpLamp.current) pumpLamp.current.intensity = .25 + n * 2.5;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#dcebf7",
			"#b88c5c",
			.68
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
			ref: amb,
			intensity: .5
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			ref: sun,
			position: [
				18,
				24,
				12
			],
			intensity: 1.4,
			color: "#fff5e4",
			castShadow: true,
			"shadow-mapSize-width": 1024,
			"shadow-mapSize-height": 1024,
			"shadow-camera-far": 56,
			"shadow-camera-left": -18,
			"shadow-camera-right": 18,
			"shadow-camera-top": 18,
			"shadow-camera-bottom": -18,
			"shadow-bias": -5e-4
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			ref: lamp,
			position: [
				0,
				3.6,
				2.2
			],
			distance: 18,
			decay: 2,
			intensity: .45,
			color: "#ffdfa8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			ref: pumpLamp,
			position: [
				-1.8,
				2.8,
				-3.2
			],
			distance: 14,
			decay: 2,
			intensity: .25,
			color: "#ffd089"
		})
	] });
}
function SkyDecor() {
	const clouds = (0, import_react.useRef)(null);
	useFrame(() => {
		if (clouds.current) clouds.current.position.x = sim.clock * .35 % 44 - 22;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		position: [
			28,
			24,
			-44
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
				-16,
				16,
				-26,
				1.4
			],
			[
				4,
				18,
				-30,
				1.7
			],
			[
				22,
				15,
				-24,
				1.2
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
						opacity: .8
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
						opacity: .8
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
						opacity: .8
					})]
				})
			]
		}, i))
	})] });
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
			dpr: [1, 1.5],
			camera: {
				fov: 66,
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
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene$1, {})
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {})]
	});
}
//#endregion
export { Home as component };
