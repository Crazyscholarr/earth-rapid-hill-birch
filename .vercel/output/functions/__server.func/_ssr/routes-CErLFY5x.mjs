import { i as __toESM } from "../_runtime.mjs";
import { C as ShaderMaterial, D as TubeGeometry, E as TorusGeometry, M as require_react, O as Vector2, S as SRGBColorSpace, T as SphereGeometry, _ as LinearFilter, a as BufferAttribute, b as Quaternion, c as CapsuleGeometry, d as CylinderGeometry, f as DodecahedronGeometry, g as LatheGeometry, h as Fog, i as BoxGeometry, j as require_jsx_runtime, k as Vector3, l as CatmullRomCurve3, m as ExtrudeGeometry, n as useFrame, p as Euler, r as useThree, s as CanvasTexture, t as Canvas, u as Color, v as Matrix4, w as Shape, x as RepeatWrapping, y as PlaneGeometry } from "../_libs/@react-three/fiber+[...].mjs";
import { t as mergeGeometries } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CErLFY5x.js
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
	"#2c4a6e",
	"#355e4b",
	"#7f2929",
	"#b07d32",
	"#4b5563",
	"#5b3b5c",
	"#2d6473",
	"#8c4a27"
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
	return window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0 && window.innerWidth < 900;
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
		if (lookId !== null) return;
		lookId = e.pointerId;
		lastX = e.clientX;
		lastY = e.clientY;
	};
	const pmove = (e) => {
		if (e.pointerId === lookId) {
			input.lookX += (e.clientX - lastX) * 1.6;
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
	return typeof window !== "undefined" && (window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0 && window.innerWidth < 900);
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
		x0: -3.05,
		x1: -1.72,
		z0: 2.92,
		z1: 4.02
	},
	{
		x0: -3.18,
		x1: -2.74,
		z0: 4.06,
		z1: 4.5
	},
	{
		x0: -4.52,
		x1: -3.14,
		z0: 4.44,
		z1: 5.52
	},
	{
		x0: -6.05,
		x1: -4.75,
		z0: 3,
		z1: 4.2
	},
	{
		x0: 1.85,
		x1: 4.55,
		z0: 2.3,
		z1: 3.35
	},
	{
		x0: -8.2,
		x1: 5.8,
		z0: -8.6,
		z1: -2.9
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
	const pBucket = c && c.phase === "wait" ? Math.round(c.patience / c.maxPatience * 20) : -1;
	const progBucket = Math.round(sim.aimProgress * 40);
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
		x: 2.15,
		y: 1.22,
		z: 2.8,
		max: 3.4
	},
	charger: {
		x: 3.62,
		y: 1.22,
		z: 2.8,
		max: 3.4
	},
	gold: {
		x: -1.98,
		y: 1.05,
		z: 3.42,
		max: 3.2
	},
	skull: {
		x: -2.22,
		y: 1.08,
		z: 3.12,
		max: 3.3
	},
	go: {
		x: -2.56,
		y: 1.08,
		z: 3.32,
		max: 3.3
	},
	burger: {
		x: -3.49,
		y: 1.39,
		z: 5.06,
		max: 3.4
	},
	cap: {
		x: -4.02,
		y: 1.39,
		z: 4.71,
		max: 3.4
	},
	sponge: {
		x: -3.49,
		y: 1.11,
		z: 5.06,
		max: 3.4
	},
	taser: {
		x: -4.02,
		y: .96,
		z: 4.71,
		max: 3.4
	},
	shred: {
		x: -5.3,
		y: 1.15,
		z: 3.6,
		max: 3.4
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
			p: carPoint(c, .78, 1, .14),
			max: 3.4
		});
		list.push({
			kind: "fuel",
			p: carPoint(c, .82, .68, -1),
			max: 3.7
		});
		list.push({
			kind: "body",
			p: carPoint(c, .82, .78, 0),
			max: 3.5
		});
		if (c.mirror && sim.hold === "none") list.push({
			kind: "mirror",
			p: carPoint(c, .86, .84, .52),
			max: 3.1
		});
		if (c.loose && sim.hold === "none") list.push({
			kind: "loot",
			p: carPoint(c, -.33, .52, .04),
			max: 3.1
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
			if (sim.car?.job === "charge") return sim.hold === "charger" ? "Nhấn giữ — sạc 18 kWh" : "Cửa sạc — cần đầu cắm";
			return sim.hold === "nozzle" ? `Nhấn giữ — đổ ${gradeName(sim.grade)}` : "Cửa bình xăng";
		case "body": return sim.hold === "sponge" ? "Nhấn giữ — kỳ cho sạch" : "Thân xe";
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
	const p = carPoint(c, 1.02, 1.25, .18);
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
			"#334e68",
			"#7b3434",
			"#3b4d3b",
			"#4a4e69",
			"#8c5a32"
		][Math.floor(Math.random() * 5)];
		hat = Math.random() < .5 ? [
			"#854d0e",
			"#374151",
			"#1e3a5f",
			"#365314"
		][Math.floor(Math.random() * 4)] ?? null : null;
		if (hat === face.hat && shirt === face.shirt) shirt = "#334e68";
	}
	const asleep = sim.servedCount > 0 && job === "fuel" && !devil && Math.random() < .24;
	const color = devil ? "#1e293b" : job === "charge" ? "#2b6b58" : sim.servedCount === 0 ? "#b8732a" : CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)];
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
	const p = carPoint(c, 1.04, 1.3, .14);
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
		if (x > c.x - 1.88 - r && x < c.x + 1.88 + r && z > c.z - .82 - r && z < c.z + .82 + r) return true;
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
function pauseGame() {
	if (sim.phase === "play") {
		sim.phase = "pause";
		emit();
	}
}
function openShop() {
	if (sim.phase === "shop") sim.phase = "play";
	else if (sim.phase === "play" || sim.phase === "pause") sim.phase = "shop";
	emit();
}
function setGrade(g) {
	sim.grade = g;
	sfx.ui();
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
		setPitch: (p) => {
			sim.player.pitch = p;
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
		case "nozzle": return `Vòi · ${GRADES.find((g) => g.id === grade)?.name ?? grade}`;
		case "charger": return "Sạc EV";
		case "sponge": return "Miếng rửa";
		case "burger": return "Hamburger";
		case "cap": return "Nắp đỏ";
		case "taser": return "Súng điện";
		case "cash": return `$${cashAmt}`;
		case "mirror": return "Gương xe";
		case "hat": return "Mũ khách";
		case "cheese": return "Phô mai";
		default: return "";
	}
}
function jobLabel(job, grade) {
	switch (job) {
		case "fuel": return `Đổ ${GRADES.find((g) => g.id === grade)?.name ?? grade}`;
		case "wash": return "Rửa xe";
		case "food": return "Hamburger";
		case "cap": return "Nắp đỏ";
		case "charge": return "Sạc 18 kWh";
	}
}
function smartTouchAction(aimKind, hold) {
	if (aimKind === "fuel" && (hold === "nozzle" || hold === "charger")) return {
		label: hold === "charger" ? "Giữ sạc" : "Giữ bơm",
		tone: "gold"
	};
	if (aimKind === "body" && hold === "sponge") return {
		label: "Giữ rửa",
		tone: "gold"
	};
	if (aimKind === "mirror" && hold === "none") return {
		label: "Giữ tháo",
		tone: "gold"
	};
	if (aimKind === "bill") return {
		label: "Nhặt $",
		tone: "go"
	};
	if (aimKind === "gold" && hold === "cash") return {
		label: "Nạp $",
		tone: "gold"
	};
	if (aimKind === "go") return {
		label: "Cho đi",
		tone: "go"
	};
	if (aimKind === "skull") return {
		label: "Khóa làn",
		tone: "gold"
	};
	if (aimKind === "shred" && hold !== "none") return {
		label: "Thu hồi",
		tone: "gold"
	};
	if (aimKind === "window") {
		if (hold === "taser") return {
			label: "Giật điện",
			tone: "gold"
		};
		if (hold === "burger" || hold === "cap" || hold === "hat") return {
			label: "Đưa đồ",
			tone: "go"
		};
		return {
			label: "Tương tác",
			tone: "fuel"
		};
	}
	if (aimKind === "nozzle" || aimKind === "charger" || aimKind === "sponge" || aimKind === "burger" || aimKind === "cap" || aimKind === "taser" || aimKind === "mdrop" || aimKind === "loot") return {
		label: "Cầm",
		tone: "gold"
	};
	return {
		label: "Dùng",
		tone: "fuel"
	};
}
function Hud() {
	const snap = (0, import_react.useSyncExternalStore)(subscribe, getSnap, getSnap);
	const [coarse, setCoarse] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const sync = () => setCoarse(isCoarse() || window.innerWidth < 740);
		sync();
		window.addEventListener("resize", sync);
		return () => window.removeEventListener("resize", sync);
	}, []);
	const holdText = holdLabel(snap.hold, snap.grade, snap.cashAmt);
	const car = snap.carInfo;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 text-cream select-none",
		children: [
			snap.phase === "play" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-2.5 left-2.5 flex flex-col gap-1.5 sm:top-3 sm:left-3 sm:gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel max-w-[14.5rem] px-3 py-2 text-xs leading-snug sm:max-w-[18rem] sm:px-3.5 sm:py-2.5 sm:text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-gold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Ngày ", snap.day] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "opacity-50",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: snap.night ? "Đêm" : "Ngày" }),
									snap.skull ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-auto rounded bg-danger px-1.5 py-0.5 text-[9px] text-white",
										children: "KHÓA"
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 truncate font-semibold text-cream",
								children: snap.objective
							}),
							coarse && car && !car.caught && !car.served ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `h-full w-full origin-left transition-transform duration-150 will-change-transform ${car.patience > .45 ? "bg-go" : car.patience > .22 ? "bg-gold" : "bg-danger"}`,
									style: { transform: `scaleX(${Math.max(0, Math.min(1, car.patience)).toFixed(3)})` }
								})
							}) : null
						]
					}), !coarse && car ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
									className: `h-full w-full origin-left transition-transform duration-150 will-change-transform ${car.patience > .45 ? "bg-go" : car.patience > .22 ? "bg-gold" : "bg-danger"}`,
									style: { transform: `scaleX(${Math.max(0, Math.min(1, car.patience)).toFixed(3)})` }
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
					className: "absolute top-2.5 right-2.5 flex flex-col items-end gap-1.5 sm:top-3 sm:right-3 sm:gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [coarse ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pointer-events-auto flex items-center gap-1.5",
							"data-ui": true,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: `rounded-xl border px-2.5 py-1.5 text-xs font-semibold ${snap.poster ? "border-gold bg-canopy text-white" : "border-white/15 bg-panel/95 text-cream"}`,
									onClick: togglePoster,
									children: "Tờ nã"
								}),
								car && !car.caught && !car.served ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: `rounded-xl border px-2.5 py-1.5 text-xs font-semibold ${snap.skull ? "border-danger bg-danger text-white" : "border-white/15 bg-panel/95 text-cream"}`,
									onClick: uiSkull,
									children: "Khóa"
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded-xl border border-white/15 bg-panel/95 px-2.5 py-1.5 text-xs font-semibold text-cream",
									onClick: openShop,
									children: "Nâng cấp"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded-xl border border-white/15 bg-panel/95 px-2.5 py-1.5 text-xs font-semibold text-cream-dim",
									onClick: pauseGame,
									"aria-label": "Tạm dừng",
									children: "⏸"
								})
							]
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel flex items-baseline gap-2 px-3 py-1.5 sm:block sm:px-3.5 sm:py-2 sm:text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-xl leading-none tracking-wide text-gold sm:text-2xl",
								children: ["$", snap.money]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-cream-dim sm:mt-0.5 sm:text-xs",
								children: ["★ ", snap.stars]
							})]
						})]
					}), holdText ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						"data-ui": true,
						onClick: () => {
							if (coarse && snap.hold !== "cash") dropHeld();
						},
						className: `panel flex items-center gap-1.5 px-2.5 py-1 text-xs ${coarse && snap.hold !== "cash" ? "pointer-events-auto active:scale-95" : ""}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-cream-dim",
								children: "Cầm:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-gold",
								children: holdText
							}),
							coarse && snap.hold !== "cash" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-0.5 text-cream-dim",
								children: "✕"
							}) : null
						]
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
					className: "absolute top-14 left-1/2 w-[min(86vw,26rem)] -translate-x-1/2 rounded-xl border border-gold/45 bg-panel/96 px-3.5 py-1.5 text-center text-xs font-semibold text-cream shadow-md sm:top-20 sm:py-2 sm:text-sm",
					children: snap.toast
				}) : null,
				snap.showGrades ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `pointer-events-auto absolute left-1/2 flex -translate-x-1/2 gap-1.5 ${coarse ? "bottom-16" : "bottom-36 gap-2"}`,
					"data-ui": true,
					children: GRADES.map((g, i) => {
						const active = snap.grade === g.id;
						const wanted = car?.job === "fuel" && car.grade === g.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: `flex items-center gap-1 rounded-xl font-semibold transition-transform active:scale-95 ${coarse ? "min-h-9 px-2.5 py-1.5 text-xs" : "btn btn-fuel text-xs sm:text-sm"} ${active ? "bg-canopy text-white ring-2 ring-gold" : "bg-ink-soft/95 text-cream"}`,
							onClick: () => setGrade(g.id),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block h-2 w-2 rounded-full",
									style: { background: g.color }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: coarse ? g.name.replace("Ron ", "") : `${i + 1} · ${g.name}` }),
								wanted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-gold px-1 text-[9px] font-bold text-ink",
									children: "Cần"
								}) : null
							]
						}, g.id);
					})
				}) : null,
				snap.prompt && (!coarse || snap.aimKind) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `absolute left-1/2 max-w-[62vw] -translate-x-1/2 truncate rounded-full border border-white/18 bg-panel/95 px-3.5 py-1.5 text-center font-semibold shadow-md ${coarse ? "bottom-4 text-xs" : "bottom-20 max-w-[90vw] px-4 py-2 text-sm"}`,
					children: snap.prompt
				}) : null,
				coarse ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Touch, {
					hold: snap.hold,
					aimKind: snap.aimKind,
					canDispatch: Boolean(car && (car.served || car.caught))
				}) : null,
				!coarse ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-3 left-1/2 hidden -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-panel/92 px-4 py-1.5 text-[11px] text-cream-dim md:flex",
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
				}) : null
			] }) : null,
			snap.phase === "title" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {}) : null,
			snap.phase === "pause" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {}) : null,
			snap.phase === "shop" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shop, { snap }) : null
		]
	});
}
function Title() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-auto absolute inset-0 flex items-end justify-center bg-gradient-to-t from-ink/85 via-ink/25 to-transparent p-4 sm:items-end sm:justify-start sm:p-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel w-full max-w-md p-4 text-center sm:p-5 sm:text-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-semibold uppercase tracking-[0.3em] text-gold sm:text-xs",
					children: "Sa mạc · Ca đêm · Tiền mặt"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-1 text-4xl leading-none tracking-wide text-canopy sm:text-6xl",
					children: "WANTED FUEL"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2.5 text-xs leading-relaxed text-cream-dim sm:mt-3 sm:text-sm",
					children: "Đổ đúng xăng bên hông xe, rửa bùn, đưa bánh, lắp nắp đỏ. So tờ truy nã, khóa làn rồi giật điện đúng mặt tội phạm. Nhặt tiền xong nạp vào nút $ vàng!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-go mt-4 w-full text-base shadow-lg sm:mt-5 sm:text-lg",
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
		className: "pointer-events-auto absolute inset-0 grid place-items-center bg-ink/75 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel w-full max-w-sm p-5 text-center sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-3xl tracking-wide sm:text-4xl",
					children: "Tạm dừng"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-cream-dim sm:text-sm",
					children: "Bấm Tiếp tục để quay lại ca trực."
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
		className: "pointer-events-auto absolute inset-0 grid place-items-center bg-ink/78 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel max-h-[88dvh] w-full max-w-md overflow-auto p-4 sm:p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl tracking-wide sm:text-3xl",
						children: "Nâng trạm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-xl text-gold sm:text-2xl",
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
					children: "Đóng"
				})
			]
		})
	});
}
function Touch({ hold, aimKind, canDispatch }) {
	const act = smartTouchAction(aimKind, hold);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stick, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto absolute right-4 bottom-4 flex flex-col items-end gap-2.5",
			"data-ui": true,
			children: [canDispatch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "rounded-full border border-white/20 bg-go px-4 py-2 text-xs font-bold text-white shadow-md active:scale-95",
				"data-ui": true,
				onClick: uiGo,
				children: "GO · Cho xe đi ▸"
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoldButton, {
				label: act.label,
				tone: act.tone
			})]
		})]
	});
}
function HoldButton({ label, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: `flex h-16 min-w-[5.25rem] items-center justify-center rounded-2xl border-2 px-4 text-sm font-bold shadow-lg transition-transform active:scale-95 ${tone === "gold" ? "border-gold bg-gold text-ink ring-2 ring-gold/40" : tone === "go" ? "border-white/25 bg-go text-white" : "border-white/25 bg-ink-soft/95 text-cream"}`,
		"data-ui": true,
		onPointerDown: (e) => {
			e.preventDefault();
			e.currentTarget.setPointerCapture(e.pointerId);
			uiUse(true);
		},
		onPointerUp: () => uiUse(false),
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
		const max = 34;
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
		className: "pointer-events-auto absolute bottom-4 left-4 h-24 w-24 rounded-full border-2 border-white/25 bg-ink/45",
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
		onPointerCancel: (e) => {
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
			className: "absolute top-1/2 left-1/2 h-10 w-10 rounded-full bg-cream/90 shadow-md",
			style: { transform: `translate(calc(-50% + ${knob.x}px), calc(-50% + ${knob.y}px))` }
		})
	});
}
var _m = new Matrix4();
var _p = new Vector3();
var _q = new Quaternion();
var _e = new Euler();
var _s = new Vector3();
function placeGeo(geo, pos, rot, scale) {
	const g = geo.index ? geo.toNonIndexed() : geo.clone();
	if (!g.attributes.normal) g.computeVertexNormals();
	const count = g.attributes.position.count;
	if (!g.attributes.uv) g.setAttribute("uv", new BufferAttribute(new Float32Array(count * 2), 2));
	for (const key of Object.keys(g.attributes)) if (key !== "position" && key !== "normal" && key !== "uv") g.deleteAttribute(key);
	_p.set(pos?.[0] ?? 0, pos?.[1] ?? 0, pos?.[2] ?? 0);
	_e.set(rot?.[0] ?? 0, rot?.[1] ?? 0, rot?.[2] ?? 0);
	_q.setFromEuler(_e);
	if (typeof scale === "number") _s.set(scale, scale, scale);
	else _s.set(scale?.[0] ?? 1, scale?.[1] ?? 1, scale?.[2] ?? 1);
	_m.compose(_p, _q, _s);
	g.applyMatrix4(_m);
	return g;
}
function mergeParts(parts) {
	const normalized = parts.map((p) => p.index || !p.attributes.uv ? placeGeo(p) : p);
	const merged = mergeGeometries(normalized, false);
	if (!merged) throw new Error("Failed to merge geometries");
	return merged;
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
	tex.anisotropy = 2;
	return {
		canvas,
		ctx,
		tex,
		key: ""
	};
}
function createAoShadowTexture() {
	return paint((ctx, w, h) => {
		ctx.clearRect(0, 0, w, h);
		const g = ctx.createRadialGradient(w / 2, h / 2, w * .08, w / 2, h / 2, w * .48);
		g.addColorStop(0, "rgba(10, 12, 16, 0.62)");
		g.addColorStop(.55, "rgba(10, 12, 16, 0.34)");
		g.addColorStop(1, "rgba(10, 12, 16, 0)");
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, w, h);
	}, 256, 256).tex;
}
function createSandTexture() {
	const p = paint((ctx, w, h) => {
		ctx.fillStyle = "#b58d5e";
		ctx.fillRect(0, 0, w, h);
		for (let i = 0; i < 48; i++) {
			const gx = Math.random() * w;
			const gy = Math.random() * h;
			const gr = 30 + Math.random() * 80;
			const g = ctx.createRadialGradient(gx, gy, 4, gx, gy, gr);
			g.addColorStop(0, i % 2 === 0 ? "rgba(138,96,54,0.22)" : "rgba(214,180,134,0.18)");
			g.addColorStop(1, "rgba(0,0,0,0)");
			ctx.fillStyle = g;
			ctx.beginPath();
			ctx.arc(gx, gy, gr, 0, Math.PI * 2);
			ctx.fill();
		}
		for (let y = 0; y < h; y += 16) {
			ctx.strokeStyle = y % 32 === 0 ? "rgba(120,82,45,0.16)" : "rgba(232,202,158,0.14)";
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.moveTo(0, y);
			for (let x = 0; x <= w; x += 32) ctx.quadraticCurveTo(x + 16, y + Math.sin(x * .05 + y) * 3, x + 32, y);
			ctx.stroke();
		}
		for (let i = 0; i < 6e3; i++) {
			const x = Math.random() * w;
			const y = Math.random() * h;
			const r = .5 + Math.random() * 2.1;
			ctx.fillStyle = i % 4 === 0 ? "rgba(78,54,32,0.34)" : i % 3 === 0 ? "rgba(142,102,62,0.28)" : "rgba(236,212,175,0.22)";
			ctx.beginPath();
			ctx.arc(x, y, r, 0, Math.PI * 2);
			ctx.fill();
		}
	}, 512, 512);
	p.tex.wrapS = RepeatWrapping;
	p.tex.wrapT = RepeatWrapping;
	p.tex.repeat.set(18, 18);
	return p.tex;
}
function createCanyonRockTexture() {
	const p = paint((ctx, w, h) => {
		const g = ctx.createLinearGradient(0, 0, 0, h);
		g.addColorStop(0, "#b56e45");
		g.addColorStop(.25, "#9c5835");
		g.addColorStop(.45, "#c27d52");
		g.addColorStop(.68, "#874a2c");
		g.addColorStop(.85, "#a8643e");
		g.addColorStop(1, "#7a4429");
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, w, h);
		for (let y = 8; y < h; y += 10) {
			ctx.strokeStyle = y % 20 === 0 ? "rgba(58,30,16,0.28)" : "rgba(235,180,135,0.16)";
			ctx.lineWidth = 2 + y % 3;
			ctx.beginPath();
			ctx.moveTo(0, y);
			for (let x = 0; x <= w; x += 32) ctx.lineTo(x, y + Math.sin(x * .04 + y * .2) * 3);
			ctx.stroke();
		}
		ctx.strokeStyle = "rgba(45,22,12,0.22)";
		ctx.lineWidth = 2;
		for (let x = 16; x < w; x += 28) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x + (Math.random() - .5) * 14, h);
			ctx.stroke();
		}
	}, 512, 512);
	p.tex.wrapS = RepeatWrapping;
	p.tex.wrapT = RepeatWrapping;
	p.tex.repeat.set(2, 1);
	return p.tex;
}
function createSurfaceBumpTexture() {
	const p = paint((ctx, w, h) => {
		ctx.fillStyle = "#808080";
		ctx.fillRect(0, 0, w, h);
		for (let i = 0; i < 7500; i++) {
			const v = 85 + Math.floor(Math.random() * 85);
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
		ctx.fillStyle = "#aba498";
		ctx.fillRect(0, 0, w, h);
		for (let i = 0; i < 4500; i++) {
			ctx.fillStyle = i % 2 === 0 ? "rgba(60,56,50,0.12)" : "rgba(240,236,228,0.1)";
			ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
		}
		for (let i = 0; i < 8; i++) {
			const gx = Math.random() * w;
			const gy = Math.random() * h;
			const gr = 28 + Math.random() * 52;
			const g = ctx.createRadialGradient(gx, gy, 2, gx, gy, gr);
			g.addColorStop(0, "rgba(52,48,42,0.22)");
			g.addColorStop(1, "rgba(52,48,42,0)");
			ctx.fillStyle = g;
			ctx.beginPath();
			ctx.arc(gx, gy, gr, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.strokeStyle = "rgba(58,52,46,0.45)";
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
	p.tex.repeat.set(4, 2);
	return p.tex;
}
function createAsphaltTexture() {
	const p = paint((ctx, w, h) => {
		ctx.fillStyle = "#23262d";
		ctx.fillRect(0, 0, w, h);
		for (let i = 0; i < 8e3; i++) {
			ctx.fillStyle = i % 3 === 0 ? "rgba(200,206,218,0.065)" : "rgba(10,12,15,0.32)";
			ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
		}
		ctx.fillStyle = "rgba(12,13,16,0.34)";
		ctx.fillRect(0, h * .22, w, h * .16);
		ctx.fillRect(0, h * .62, w, h * .16);
		ctx.strokeStyle = "rgba(10,11,14,0.5)";
		ctx.lineWidth = 2;
		for (let i = 0; i < 7; i++) {
			ctx.beginPath();
			let cx = Math.random() * w;
			let cy = Math.random() * h;
			ctx.moveTo(cx, cy);
			for (let s = 0; s < 6; s++) {
				cx += 18 + Math.random() * 28;
				cy += (Math.random() - .5) * 20;
				ctx.lineTo(cx, cy);
			}
			ctx.stroke();
		}
	}, 512, 512);
	p.tex.wrapS = RepeatWrapping;
	p.tex.wrapT = RepeatWrapping;
	p.tex.repeat.set(14, 1);
	return p.tex;
}
function createSkyPanoramaTexture() {
	const p = paint((ctx, w, h) => {
		const g = ctx.createLinearGradient(0, 0, 0, h);
		g.addColorStop(0, "#1d5696");
		g.addColorStop(.26, "#4984bd");
		g.addColorStop(.44, "#92bad8");
		g.addColorStop(.5, "#ead6ba");
		g.addColorStop(.54, "#c99d6c");
		g.addColorStop(1, "#6e4e32");
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, w, h);
		for (let i = 0; i < 32; i++) {
			const cx = i * 53 % w;
			const cy = h * (.14 + i * 37 % 100 * .0024);
			const cw = 48 + i * 29 % 78;
			const ch = 3 + i % 5 * 1.4;
			const cg = ctx.createRadialGradient(cx, cy, 1, cx, cy, cw * .55);
			cg.addColorStop(0, "rgba(255, 250, 242, 0.24)");
			cg.addColorStop(1, "rgba(255, 250, 242, 0)");
			ctx.fillStyle = cg;
			ctx.save();
			ctx.translate(cx, cy);
			ctx.scale(1, ch / (cw * .55));
			ctx.beginPath();
			ctx.arc(0, 0, cw * .55, 0, Math.PI * 2);
			ctx.fill();
			ctx.restore();
		}
		const banks = [
			[
				w * .14,
				h * .36,
				.62
			],
			[
				w * .38,
				h * .33,
				.72
			],
			[
				w * .65,
				h * .37,
				.58
			],
			[
				w * .88,
				h * .34,
				.68
			]
		];
		for (const [bx, by, bs] of banks) {
			for (let k = -2; k <= 2; k++) {
				const px = bx + k * 28 * bs;
				const py = by + 8 * bs + Math.abs(k) * 2;
				const pr = (34 - Math.abs(k) * 5) * bs;
				const sg = ctx.createRadialGradient(px, py, 2, px, py, pr);
				sg.addColorStop(0, "rgba(168, 152, 142, 0.38)");
				sg.addColorStop(1, "rgba(168, 152, 142, 0)");
				ctx.fillStyle = sg;
				ctx.beginPath();
				ctx.arc(px, py, pr, 0, Math.PI * 2);
				ctx.fill();
			}
			for (let k = -2; k <= 2; k++) {
				const px = bx + k * 25 * bs;
				const py = by - (2 - Math.abs(k)) * 6 * bs;
				const pr = (36 - Math.abs(k) * 6) * bs;
				const lg = ctx.createRadialGradient(px - 3, py - 4, 2, px, py, pr);
				lg.addColorStop(0, "rgba(255, 251, 244, 0.72)");
				lg.addColorStop(.55, "rgba(252, 242, 228, 0.36)");
				lg.addColorStop(1, "rgba(252, 242, 228, 0)");
				ctx.fillStyle = lg;
				ctx.beginPath();
				ctx.arc(px, py, pr, 0, Math.PI * 2);
				ctx.fill();
			}
		}
	}, 512, 256);
	p.tex.wrapS = RepeatWrapping;
	p.tex.generateMipmaps = false;
	p.tex.minFilter = LinearFilter;
	return p.tex;
}
function createDashboardTexture() {
	return paint((ctx, w, h) => {
		ctx.fillStyle = "#11141a";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#272d38";
		ctx.lineWidth = 4;
		ctx.strokeRect(4, 4, w - 8, h - 8);
		for (const vx of [
			16,
			206,
			444
		]) {
			ctx.fillStyle = "#090b0f";
			ctx.fillRect(vx, 22, 52, 34);
			ctx.strokeStyle = "#3f4756";
			ctx.lineWidth = 2;
			ctx.strokeRect(vx, 22, 52, 34);
			for (let ly = 28; ly <= 50; ly += 6) {
				ctx.beginPath();
				ctx.moveTo(vx + 4, ly);
				ctx.lineTo(vx + 48, ly);
				ctx.stroke();
			}
		}
		ctx.fillStyle = "#0b1726";
		ctx.fillRect(198, 66, 128, 78);
		ctx.strokeStyle = "#475569";
		ctx.lineWidth = 3;
		ctx.strokeRect(198, 66, 128, 78);
		ctx.strokeStyle = "#38bdf8";
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.moveTo(210, 132);
		ctx.quadraticCurveTo(255, 102, 312, 78);
		ctx.stroke();
		ctx.fillStyle = "#f59e0b";
		ctx.beginPath();
		ctx.arc(258, 106, 5, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#94a3b8";
		ctx.font = "700 11px monospace";
		ctx.fillText("ROUTE 66 · 98°F", 206, 82);
		for (const [gx, label, needleAng] of [[
			352,
			"RPMx1000",
			-.8
		], [
			412,
			"KM/H",
			-2.1
		]]) {
			ctx.fillStyle = "#070a10";
			ctx.beginPath();
			ctx.arc(gx, 96, 26, 0, Math.PI * 2);
			ctx.fill();
			ctx.strokeStyle = "#38bdf8";
			ctx.lineWidth = 2.5;
			ctx.beginPath();
			ctx.arc(gx, 96, 24, Math.PI * .75, Math.PI * 2.25);
			ctx.stroke();
			ctx.strokeStyle = "#ef4444";
			ctx.lineWidth = 2.5;
			ctx.beginPath();
			ctx.moveTo(gx, 96);
			ctx.lineTo(gx + Math.cos(needleAng) * 18, 96 + Math.sin(needleAng) * 18);
			ctx.stroke();
			ctx.fillStyle = "#cbd5e1";
			ctx.font = "700 8px sans-serif";
			ctx.textAlign = "center";
			ctx.fillText(label, gx, 114);
		}
		ctx.strokeStyle = "#232934";
		ctx.lineWidth = 2;
		ctx.strokeRect(22, 74, 152, 76);
		ctx.fillStyle = "#475569";
		ctx.fillRect(86, 82, 24, 6);
		ctx.textAlign = "left";
	}, 512, 168).tex;
}
function createStoreBackWallTexture() {
	return paint((ctx, w, h) => {
		const bg = ctx.createLinearGradient(0, 0, 0, h);
		bg.addColorStop(0, "#382f27");
		bg.addColorStop(.18, "#4d4035");
		bg.addColorStop(.78, "#2b231d");
		bg.addColorStop(1, "#1c1713");
		ctx.fillStyle = bg;
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#fffbeb";
		for (const lx of [
			90,
			310,
			620,
			840
		]) {
			ctx.fillRect(lx, 10, 110, 8);
			const glow = ctx.createRadialGradient(lx + 55, 18, 8, lx + 55, 60, 120);
			glow.addColorStop(0, "rgba(254, 243, 199, 0.22)");
			glow.addColorStop(1, "rgba(254, 243, 199, 0)");
			ctx.fillStyle = glow;
			ctx.fillRect(lx - 60, 10, 230, 140);
			ctx.fillStyle = "#fffbeb";
		}
		ctx.fillStyle = "#334155";
		ctx.fillRect(36, 44, 420, 260);
		const bottlePalette = [
			"#7f1d1d",
			"#14532d",
			"#78350f",
			"#1e3a5f",
			"#d6d3d1",
			"#0f766e"
		];
		for (let d = 0; d < 4; d++) {
			const dx = 44 + d * 102;
			const fg = ctx.createLinearGradient(dx, 52, dx, 286);
			fg.addColorStop(0, "#dbeafe");
			fg.addColorStop(.5, "#bfdbfe");
			fg.addColorStop(1, "#93c5fd");
			ctx.fillStyle = fg;
			ctx.fillRect(dx, 52, 94, 236);
			for (let s = 0; s < 5; s++) {
				const sy = 88 + s * 42;
				ctx.fillStyle = "#475569";
				ctx.fillRect(dx, sy + 22, 94, 4);
				for (let b = 0; b < 6; b++) {
					const bx = dx + 6 + b * 14.5;
					ctx.fillStyle = bottlePalette[(b + s * 2 + d) % bottlePalette.length];
					ctx.fillRect(bx, sy + 4, 10, 18);
					ctx.fillRect(bx + 2.5, sy, 5, 5);
					ctx.fillStyle = "rgba(248, 250, 252, 0.78)";
					ctx.fillRect(bx + 1, sy + 9, 8, 6);
				}
			}
			ctx.strokeStyle = "#94a3b8";
			ctx.lineWidth = 4;
			ctx.strokeRect(dx, 52, 94, 236);
			ctx.fillStyle = "#cbd5e1";
			ctx.fillRect(dx + 84, 146, 4, 42);
		}
		ctx.fillStyle = "#29221c";
		ctx.fillRect(474, 52, 136, 175);
		ctx.strokeStyle = "#78716c";
		ctx.lineWidth = 2;
		ctx.strokeRect(474, 52, 136, 175);
		ctx.fillStyle = "#fbbf24";
		ctx.font = "800 14px Arial";
		ctx.textAlign = "center";
		ctx.fillText("HOT COFFEE", 542, 76);
		ctx.fillStyle = "#a8a29e";
		for (let r = 0; r < 4; r++) ctx.fillRect(486, 92 + r * 28, 112, 16);
		ctx.fillStyle = "#44372b";
		ctx.fillRect(628, 62, 356, 230);
		ctx.fillStyle = "#94a3b8";
		ctx.fillRect(646, 110, 68, 66);
		ctx.fillStyle = "#18181b";
		ctx.fillRect(654, 126, 22, 34);
		ctx.fillRect(684, 126, 22, 34);
		ctx.fillStyle = "#dc2626";
		ctx.fillRect(658, 115, 14, 6);
		const packCols = [
			"#9a3412",
			"#854d0e",
			"#1e3a5f",
			"#3f6212",
			"#57534e",
			"#7f1d1d"
		];
		for (let s = 0; s < 4; s++) {
			const sy = 88 + s * 44;
			ctx.fillStyle = "#292524";
			ctx.fillRect(732, sy + 24, 236, 5);
			for (let p = 0; p < 9; p++) {
				const px = 738 + p * 25;
				ctx.fillStyle = packCols[(p + s * 3) % packCols.length];
				ctx.fillRect(px, sy + 2, 19, 22);
				ctx.fillStyle = "rgba(255,255,255,0.65)";
				ctx.fillRect(px + 3, sy + 7, 13, 6);
			}
		}
		ctx.textAlign = "left";
	}, 1024, 320).tex;
}
function createIceChestTexture() {
	return paint((ctx, w, h) => {
		ctx.fillStyle = "#f1f5f9";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#cbd5e1";
		ctx.lineWidth = 6;
		ctx.strokeRect(4, 4, w - 8, h - 8);
		ctx.fillStyle = "#0284c7";
		ctx.fillRect(16, 18, w - 32, 32);
		ctx.fillStyle = "#ffffff";
		ctx.font = "900 20px Arial";
		ctx.textAlign = "center";
		ctx.fillText("PACKAGED CUBED", w / 2, 41);
		ctx.fillStyle = "#0369a1";
		ctx.font = "900 68px Impact, Arial Black, sans-serif";
		ctx.fillText("ICE", w / 2, 118);
		ctx.textAlign = "left";
	}, 256, 144).tex;
}
function createPriceTotemTexture() {
	return paint((ctx, w, h) => {
		ctx.fillStyle = "#18181b";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#d4d4d8";
		ctx.lineWidth = 8;
		ctx.strokeRect(8, 8, w - 16, h - 16);
		ctx.fillStyle = "#b94827";
		ctx.fillRect(14, 14, w - 28, 92);
		ctx.fillStyle = "#f8fafc";
		ctx.font = "900 38px Impact, Arial Black, sans-serif";
		ctx.textAlign = "center";
		ctx.fillText("WANTED", w / 2, 56);
		ctx.font = "800 24px Arial";
		ctx.fillText("FUEL & MART", w / 2, 90);
		[
			[
				"RON 92",
				"36.0",
				"#10b981"
			],
			[
				"RON 95",
				"48.0",
				"#f59e0b"
			],
			[
				"RON 98",
				"72.0",
				"#ef4444"
			],
			[
				"DIESEL",
				"54.0",
				"#38bdf8"
			]
		].forEach(([label, price, col], i) => {
			const ry = 124 + i * 88;
			ctx.fillStyle = "#27272a";
			ctx.fillRect(18, ry, w - 36, 74);
			ctx.fillStyle = col;
			ctx.fillRect(18, ry, 12, 74);
			ctx.fillStyle = "#e4e4e7";
			ctx.font = "800 22px Arial";
			ctx.textAlign = "left";
			ctx.fillText(label, 40, ry + 45);
			ctx.fillStyle = "#09090b";
			ctx.fillRect(138, ry + 12, 108, 50);
			ctx.fillStyle = col;
			ctx.font = "900 32px monospace";
			ctx.textAlign = "right";
			ctx.fillText(price, 238, ry + 48);
		});
	}, 264, 496).tex;
}
function createPumpTopperTexture() {
	return paint((ctx, w, h) => {
		ctx.fillStyle = "#18181b";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#b9381e";
		ctx.fillRect(8, 8, w - 16, h - 16);
		ctx.strokeStyle = "#fbbf24";
		ctx.lineWidth = 4;
		ctx.strokeRect(12, 12, w - 24, h - 24);
		ctx.fillStyle = "#fef3c7";
		ctx.font = "900 34px Impact, Arial Black, sans-serif";
		ctx.textAlign = "center";
		ctx.fillText("PUMP 01  ·  SELF / FULL", w / 2, 54);
		ctx.fillStyle = "#fde68a";
		ctx.font = "800 18px Arial";
		ctx.fillText("92   ·   95   ·   98   ·   DIESEL", w / 2, 82);
	}, 384, 104).tex;
}
function createVendingFrontTexture() {
	return paint((ctx, w, h) => {
		ctx.fillStyle = "#7f1d1d";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#450a0a";
		ctx.lineWidth = 6;
		ctx.strokeRect(4, 4, w - 8, h - 8);
		ctx.fillStyle = "#991b1b";
		ctx.fillRect(12, 12, w - 24, 68);
		ctx.fillStyle = "#fef2f2";
		ctx.font = "900 28px Impact, Arial Black, sans-serif";
		ctx.textAlign = "center";
		ctx.fillText("COLD DRINKS", w / 2, 56);
		ctx.fillStyle = "#0b111d";
		ctx.fillRect(16, 92, w - 82, 198);
		const cols = [
			"#7f1d1d",
			"#14532d",
			"#78350f",
			"#1e3a5f"
		];
		for (let r = 0; r < 4; r++) {
			const sy = 110 + r * 45;
			ctx.fillStyle = "#334155";
			ctx.fillRect(22, sy + 24, w - 94, 4);
			for (let c = 0; c < 5; c++) {
				const bx = 28 + c * 26;
				ctx.fillStyle = cols[(r + c) % cols.length];
				ctx.fillRect(bx, sy + 4, 15, 20);
				ctx.fillStyle = "rgba(255,255,255,0.75)";
				ctx.fillRect(bx + 2, sy + 10, 11, 5);
			}
		}
		ctx.fillStyle = "#14161b";
		ctx.fillRect(w - 58, 92, 42, 198);
		ctx.fillStyle = "#052e16";
		ctx.fillRect(w - 52, 102, 30, 18);
		ctx.fillStyle = "#4ade80";
		ctx.font = "700 11px monospace";
		ctx.fillText("1.50", w - 37, 115);
		for (let b = 0; b < 5; b++) {
			ctx.fillStyle = "#475569";
			ctx.fillRect(w - 48, 132 + b * 24, 22, 12);
		}
		ctx.fillStyle = "#09090b";
		ctx.fillRect(24, 308, w - 48, 52);
		ctx.strokeStyle = "#334155";
		ctx.lineWidth = 3;
		ctx.strokeRect(24, 308, w - 48, 52);
		ctx.fillStyle = "#64748b";
		ctx.font = "700 12px Arial";
		ctx.fillText("PUSH", w / 2, 338);
	}, 240, 384).tex;
}
function createTireTreadTexture() {
	const p = paint((ctx, w, h) => {
		ctx.fillStyle = "#181a1f";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#0d0e12";
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
	p.tex.repeat.set(4, 1);
	return p.tex;
}
function createBrickTexture() {
	const p = paint((ctx, w, h) => {
		ctx.fillStyle = "#6e5f52";
		ctx.fillRect(0, 0, w, h);
		const rows = 8;
		const cols = 4;
		const bh = h / rows;
		const bw = w / cols;
		for (let r = 0; r < rows; r++) {
			const off = r % 2 * (bw / 2);
			for (let c = -1; c <= cols; c++) {
				const shade = 165 + Math.floor(Math.random() * 32);
				ctx.fillStyle = `rgb(${shade}, ${shade - 22}, ${shade - 40})`;
				ctx.fillRect(c * bw + off + 3, r * bh + 3, bw - 6, bh - 6);
			}
		}
	}, 512, 512);
	p.tex.wrapS = RepeatWrapping;
	p.tex.wrapT = RepeatWrapping;
	p.tex.repeat.set(4, 1);
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
		g.addColorStop(1, "#9a3412");
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
		ctx.fillStyle = "#18181b";
		ctx.fillRect(0, 0, w, h);
		ctx.fillStyle = "#b94827";
		ctx.fillRect(12, 12, w - 24, h - 24);
		ctx.strokeStyle = "#f59e0b";
		ctx.lineWidth = 6;
		ctx.strokeRect(24, 24, w - 48, h - 48);
		ctx.fillStyle = "#18181b";
		ctx.font = "900 98px Impact, Arial Black, sans-serif";
		ctx.textAlign = "center";
		ctx.fillText("WANTED FUEL", w / 2 + 5, h * .66 + 5);
		ctx.fillStyle = "#fef3c7";
		ctx.fillText("WANTED FUEL", w / 2, h * .66);
		ctx.fillStyle = "#fde68a";
		ctx.font = "700 26px Arial, sans-serif";
		ctx.fillText("SERVICE STATION  ·  DIESEL  ·  DINER  ·  EV", w / 2, h * .86);
	}, 1024, 280).tex;
}
function createPumpFaceTexture() {
	return paint((ctx, w, h) => {
		ctx.fillStyle = "#18181b";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#52525b";
		ctx.lineWidth = 6;
		ctx.strokeRect(6, 6, w - 12, h - 12);
		ctx.fillStyle = "#090d16";
		ctx.fillRect(18, 18, w - 36, 118);
		ctx.strokeStyle = "#334155";
		ctx.lineWidth = 2;
		ctx.strokeRect(18, 18, w - 36, 118);
		ctx.fillStyle = "#94a3b8";
		ctx.font = "700 14px sans-serif";
		ctx.textAlign = "left";
		ctx.fillText("SALE $", 28, 40);
		ctx.fillText("LITERS", 28, 96);
		ctx.fillStyle = "#34d399";
		ctx.font = "900 38px monospace";
		ctx.textAlign = "right";
		ctx.fillText("048.00", w - 28, 72);
		ctx.fillStyle = "#fbbf24";
		ctx.font = "800 28px monospace";
		ctx.fillText("12.50", w - 28, 122);
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
			"DẦU"
		];
		for (let i = 0; i < 4; i++) {
			const bx = 18 + i * 56;
			ctx.fillStyle = cols[i];
			ctx.fillRect(bx, 152, 48, 78);
			ctx.fillStyle = "#09090b";
			ctx.fillRect(bx + 4, 156, 40, 24);
			ctx.fillStyle = "#fff";
			ctx.font = "900 16px Arial";
			ctx.textAlign = "center";
			ctx.fillText(names[i], bx + 24, 174);
			ctx.fillStyle = "#18181b";
			ctx.font = "800 14px monospace";
			ctx.fillText("PUSH", bx + 24, 214);
		}
		ctx.fillStyle = "#27272a";
		ctx.fillRect(18, 244, w - 36, 56);
		ctx.fillStyle = "#38bdf8";
		ctx.fillRect(30, 256, 56, 32);
		ctx.fillStyle = "#cbd5e1";
		for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) ctx.fillRect(116 + c * 26, 252 + r * 14, 18, 9);
	}, 256, 320).tex;
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
		ctx.fillStyle = "#b94827";
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
			ctx.fillStyle = "rgba(76, 44, 22, 0.9)";
			ctx.beginPath();
			ctx.ellipse(bx, by, br, br * .72, .25, 0, Math.PI * 2);
			ctx.fill();
		}
		for (let i = 0; i < 55; i++) {
			ctx.fillStyle = "rgba(98, 58, 28, 0.85)";
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
	ctx.fillStyle = "#0b1120";
	ctx.fillRect(0, 0, w, h);
	ctx.fillStyle = "#162033";
	ctx.fillRect(16, 16, w - 32, 196);
	ctx.strokeStyle = "#334155";
	ctx.lineWidth = 2;
	ctx.strokeRect(16, 16, w - 32, 196);
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
	ctx.fillStyle = "#131c2e";
	ctx.fillRect(16, 226, w - 32, h - 242);
	ctx.strokeRect(16, 226, w - 32, h - 242);
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
function drawDriverFace(ctx, w, h, opts) {
	ctx.fillStyle = opts.skin;
	ctx.fillRect(0, 0, w, h);
	for (const cx of [w * .24, w * .76]) {
		const cg = ctx.createRadialGradient(cx, h * .58, 2, cx, h * .58, w * .18);
		cg.addColorStop(0, opts.devil ? "rgba(127,29,29,0.35)" : "rgba(194,106,82,0.24)");
		cg.addColorStop(1, "rgba(0,0,0,0)");
		ctx.fillStyle = cg;
		ctx.fillRect(0, 0, w, h);
	}
	const jawG = ctx.createLinearGradient(0, h * .76, 0, h);
	jawG.addColorStop(0, "rgba(0,0,0,0)");
	jawG.addColorStop(1, "rgba(40,20,12,0.22)");
	ctx.fillStyle = jawG;
	ctx.fillRect(0, h * .76, w, h * .24);
	const lx = w * .33;
	const rx = w * .67;
	const ey = h * .43;
	ctx.strokeStyle = opts.devil ? "#18181b" : "#29201b";
	ctx.lineWidth = 5.5;
	ctx.lineCap = "round";
	const angry = opts.face === "bully" || opts.mad || opts.devil;
	const browTilt = angry ? 7 : opts.face === "thief" ? -3 : 0;
	ctx.beginPath();
	ctx.moveTo(lx - 15, ey - 16 - browTilt * .4);
	ctx.quadraticCurveTo(lx, ey - 20, lx + 14, ey - 15 + browTilt);
	ctx.moveTo(rx + 15, ey - 16 - browTilt * .4);
	ctx.quadraticCurveTo(rx, ey - 20, rx - 14, ey - 15 + browTilt);
	ctx.stroke();
	if (opts.asleep) {
		ctx.strokeStyle = "#29201b";
		ctx.lineWidth = 4;
		for (const ex of [lx, rx]) {
			ctx.beginPath();
			ctx.arc(ex, ey, 11, .15 * Math.PI, .85 * Math.PI);
			ctx.stroke();
		}
	} else if (opts.caught) {
		ctx.strokeStyle = "#18181b";
		ctx.lineWidth = 4;
		for (const ex of [lx, rx]) {
			ctx.beginPath();
			ctx.moveTo(ex - 9, ey - 8);
			ctx.lineTo(ex + 9, ey + 8);
			ctx.moveTo(ex + 9, ey - 8);
			ctx.lineTo(ex - 9, ey + 8);
			ctx.stroke();
		}
	} else {
		const erx = opts.face === "thief" ? 13.5 : 11.5;
		const ery = opts.face === "thief" ? 11.5 : 8.5;
		for (const ex of [lx, rx]) {
			ctx.fillStyle = "#f8fafc";
			ctx.beginPath();
			ctx.ellipse(ex, ey, erx, ery, 0, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = opts.devil ? "#facc15" : "#452715";
			ctx.beginPath();
			ctx.arc(ex, ey + .5, ery * .68, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#09090b";
			ctx.beginPath();
			ctx.arc(ex, ey + .5, ery * .36, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = "#ffffff";
			ctx.beginPath();
			ctx.arc(ex - 2.5, ey - 2, 2.1, 0, Math.PI * 2);
			ctx.fill();
			ctx.strokeStyle = "#1c1512";
			ctx.lineWidth = 3;
			ctx.beginPath();
			ctx.ellipse(ex, ey, erx + .5, ery, 0, Math.PI * 1.08, Math.PI * 1.92);
			ctx.stroke();
		}
	}
	ctx.fillStyle = "rgba(85, 42, 24, 0.38)";
	ctx.beginPath();
	ctx.arc(w * .46, h * .63, 2.4, 0, Math.PI * 2);
	ctx.arc(w * .54, h * .63, 2.4, 0, Math.PI * 2);
	ctx.fill();
	const my = h * .77;
	if (opts.face === "worst") {
		ctx.fillStyle = "#ffffff";
		ctx.beginPath();
		ctx.roundRect(w / 2 - 20, my - 7, 40, 14, 5);
		ctx.fill();
		ctx.strokeStyle = "#18181b";
		ctx.lineWidth = 2.5;
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(w / 2 - 18, my);
		ctx.lineTo(w / 2 + 18, my);
		ctx.stroke();
	} else if (opts.asleep) {
		ctx.fillStyle = "#451a14";
		ctx.beginPath();
		ctx.ellipse(w / 2, my + 2, 7, 9, 0, 0, Math.PI * 2);
		ctx.fill();
	} else if (angry || opts.caught) {
		ctx.strokeStyle = "#4c1d16";
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.moveTo(w / 2 - 14, my + 4);
		ctx.quadraticCurveTo(w / 2, my - 4, w / 2 + 14, my + 4);
		ctx.stroke();
	} else {
		ctx.fillStyle = "rgba(124, 58, 42, 0.65)";
		ctx.beginPath();
		ctx.ellipse(w / 2, my + 1, 13, 4.2, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.strokeStyle = "#5c281b";
		ctx.lineWidth = 2.6;
		ctx.beginPath();
		ctx.moveTo(w / 2 - 13, my + 1);
		ctx.quadraticCurveTo(w / 2, my + 3.5, w / 2 + 13, my + 1);
		ctx.stroke();
	}
}
function drawPoster(ctx, w, h) {
	const face = WARRANTS[sim.warrant % WARRANTS.length];
	ctx.fillStyle = "#efe6d1";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "#a89674";
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
	ctx.moveTo(w / 2 - 118, 426);
	ctx.quadraticCurveTo(w / 2 - 112, 338, w / 2 - 36, 328);
	ctx.lineTo(w / 2 + 36, 328);
	ctx.quadraticCurveTo(w / 2 + 112, 338, w / 2 + 118, 426);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#f1f5f9";
	ctx.beginPath();
	ctx.moveTo(w / 2 - 24, 330);
	ctx.lineTo(w / 2 + 24, 330);
	ctx.lineTo(w / 2, 368);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#d19373";
	ctx.fillRect(w / 2 - 22, 298, 44, 38);
	ctx.fillStyle = "#d99e7e";
	ctx.beginPath();
	ctx.ellipse(w / 2 - 58, 248, 10, 18, -.1, 0, Math.PI * 2);
	ctx.ellipse(w / 2 + 58, 248, 10, 18, .1, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#e8b393";
	ctx.beginPath();
	ctx.moveTo(w / 2 - 56, 224);
	ctx.quadraticCurveTo(w / 2 - 58, 178, w / 2, 178);
	ctx.quadraticCurveTo(w / 2 + 58, 178, w / 2 + 56, 224);
	ctx.quadraticCurveTo(w / 2 + 54, 278, w / 2 + 28, 304);
	ctx.quadraticCurveTo(w / 2, 318, w / 2 - 28, 304);
	ctx.quadraticCurveTo(w / 2 - 54, 278, w / 2 - 56, 224);
	ctx.closePath();
	ctx.fill();
	if (!face.hat) {
		ctx.fillStyle = "#221e1d";
		ctx.beginPath();
		ctx.moveTo(w / 2 - 58, 232);
		ctx.quadraticCurveTo(w / 2 - 62, 168, w / 2, 168);
		ctx.quadraticCurveTo(w / 2 + 62, 168, w / 2 + 58, 232);
		ctx.quadraticCurveTo(w / 2 + 48, 198, w / 2, 196);
		ctx.quadraticCurveTo(w / 2 - 48, 198, w / 2 - 58, 232);
		ctx.fill();
	}
	const er = face.id === "thief" ? 13.5 : 10.5;
	for (const ex of [w / 2 - 22, w / 2 + 22]) {
		ctx.fillStyle = "#fff";
		ctx.beginPath();
		ctx.ellipse(ex, 240, er, er * .76, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#452715";
		ctx.beginPath();
		ctx.arc(ex, 240, 5.5, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#09090b";
		ctx.beginPath();
		ctx.arc(ex, 240, 2.8, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#fff";
		ctx.beginPath();
		ctx.arc(ex - 2, 238, 1.6, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.strokeStyle = "#27272a";
	ctx.lineWidth = 6;
	ctx.lineCap = "round";
	ctx.beginPath();
	if (face.id === "bully") {
		ctx.moveTo(w / 2 - 38, 218);
		ctx.lineTo(w / 2 - 10, 228);
		ctx.moveTo(w / 2 + 38, 218);
		ctx.lineTo(w / 2 + 10, 228);
	} else {
		ctx.moveTo(w / 2 - 36, 223);
		ctx.lineTo(w / 2 - 10, 222);
		ctx.moveTo(w / 2 + 36, 223);
		ctx.lineTo(w / 2 + 10, 222);
	}
	ctx.stroke();
	ctx.fillStyle = "rgba(166, 102, 72, 0.38)";
	ctx.beginPath();
	ctx.moveTo(w / 2, 238);
	ctx.lineTo(w / 2 - 9, 268);
	ctx.lineTo(w / 2 + 6, 270);
	ctx.closePath();
	ctx.fill();
	if (face.id === "worst") {
		ctx.fillStyle = "#ffffff";
		ctx.beginPath();
		ctx.roundRect(w / 2 - 26, 280, 52, 16, 5);
		ctx.fill();
		ctx.strokeStyle = "#18181b";
		ctx.lineWidth = 2.5;
		ctx.stroke();
	} else {
		ctx.strokeStyle = "#6e3420";
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.moveTo(w / 2 - 16, 289);
		ctx.quadraticCurveTo(w / 2, 292, w / 2 + 16, 289);
		ctx.stroke();
	}
	if (face.hat) {
		ctx.fillStyle = face.hat;
		ctx.beginPath();
		ctx.arc(w / 2, 206, 58, Math.PI, 0);
		ctx.fill();
		ctx.beginPath();
		ctx.ellipse(w / 2 + 4, 205, 68, 10, 0, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.fillStyle = "#18181b";
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
	ctx.fillStyle = "rgba(24, 24, 27, 0.92)";
	ctx.strokeStyle = "#f59e0b";
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.roundRect(24, 34, 208, 138, 28);
	ctx.fill();
	ctx.stroke();
	ctx.fillStyle = "rgba(24, 24, 27, 0.92)";
	ctx.beginPath();
	ctx.moveTo(106, 170);
	ctx.lineTo(88, 214);
	ctx.lineTo(142, 170);
	ctx.closePath();
	ctx.fill();
	ctx.textAlign = "center";
	if (c.caught) {
		ctx.fillStyle = "#ef4444";
		ctx.font = "900 38px Arial";
		ctx.fillText("ĐÃ BẮT", 128, 116);
		return;
	}
	if (c.asleep) {
		ctx.fillStyle = "#fde68a";
		ctx.font = "900 56px Arial";
		ctx.fillText("Zzz...", 128, 122);
		return;
	}
	if (c.job === "fuel") {
		ctx.fillStyle = GRADES.find((g) => g.id === c.grade)?.color ?? "#f59e0b";
		ctx.beginPath();
		ctx.roundRect(48, 66, 48, 72, 8);
		ctx.fill();
		ctx.fillStyle = "#fff";
		ctx.font = "900 20px Arial";
		ctx.fillText("FUEL", 72, 108);
		ctx.fillStyle = "#f8fafc";
		ctx.font = "900 44px Arial";
		ctx.fillText(c.grade === "diesel" ? "DẦU" : c.grade, 158, 118);
	} else if (c.job === "wash") {
		ctx.fillStyle = "#eab308";
		ctx.fillRect(68, 66, 120, 40);
		ctx.fillStyle = "#22c55e";
		ctx.fillRect(68, 106, 120, 26);
		ctx.fillStyle = "#f8fafc";
		ctx.font = "800 20px Arial";
		ctx.fillText("RỬA XE", 128, 156);
	} else if (c.job === "food") {
		ctx.fillStyle = "#d97706";
		ctx.beginPath();
		ctx.ellipse(128, 86, 52, 22, 0, Math.PI, 0);
		ctx.fill();
		ctx.fillStyle = "#65a30d";
		ctx.fillRect(76, 88, 104, 10);
		ctx.fillStyle = "#78350f";
		ctx.fillRect(76, 98, 104, 14);
		ctx.fillStyle = "#d97706";
		ctx.fillRect(78, 112, 100, 12);
		ctx.fillStyle = "#f8fafc";
		ctx.font = "800 20px Arial";
		ctx.fillText("BÁNH", 128, 154);
	} else if (c.job === "charge") {
		ctx.fillStyle = "#38bdf8";
		ctx.font = "900 36px Arial";
		ctx.fillText("⚡ 18 kWh", 128, 114);
		ctx.fillStyle = "#94a3b8";
		ctx.font = "700 18px Arial";
		ctx.fillText("SẠC ĐIỆN", 128, 148);
	} else {
		ctx.fillStyle = "#dc2626";
		ctx.beginPath();
		ctx.arc(128, 94, 32, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = "#fff";
		ctx.font = "900 22px Arial";
		ctx.fillText("NẮP ĐỎ", 128, 156);
	}
	if (c.wanted && sim.posterUp) {
		ctx.fillStyle = "#ef4444";
		ctx.font = "900 20px Arial";
		ctx.fillText("⚠ KHỚP MẶT", 128, 56);
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
function buildFrontClipGeo(style) {
	const s = new Shape();
	s.moveTo(.54, .25);
	s.lineTo(.8, .25);
	s.absarc(1.14, .3, .335, Math.PI, 0, true);
	s.lineTo(1.78, .27);
	s.quadraticCurveTo(1.9, .42, 1.84, .62);
	if (style === "ev") s.quadraticCurveTo(1.42, .76, .54, .79);
	else if (style === "devil") s.lineTo(.54, .8);
	else s.quadraticCurveTo(1.38, .74, .54, .78);
	s.closePath();
	const geo = new ExtrudeGeometry(s, {
		depth: 1.48,
		bevelEnabled: true,
		bevelThickness: .045,
		bevelSize: .038,
		bevelSegments: 2,
		curveSegments: 12
	});
	geo.translate(0, 0, -.74);
	geo.rotateY(-Math.PI / 2);
	return geo;
}
function buildRearClipGeo(style) {
	const s = new Shape();
	s.moveTo(-1.82, .29);
	s.lineTo(-1.44, .28);
	s.absarc(-1.1, .3, .335, Math.PI, 0, true);
	s.lineTo(-.84, .25);
	s.lineTo(-.84, .8);
	if (style === "ev") {
		s.lineTo(-1.3, .85);
		s.quadraticCurveTo(-1.68, .84, -1.82, .7);
	} else if (style === "devil") s.quadraticCurveTo(-1.28, .88, -1.84, .8);
	else {
		s.lineTo(-1.26, .81);
		s.quadraticCurveTo(-1.66, .79, -1.82, .67);
	}
	s.closePath();
	const geo = new ExtrudeGeometry(s, {
		depth: 1.48,
		bevelEnabled: true,
		bevelThickness: .045,
		bevelSize: .038,
		bevelSegments: 2,
		curveSegments: 12
	});
	geo.translate(0, 0, -.74);
	geo.rotateY(-Math.PI / 2);
	return geo;
}
function buildRoofCapGeo(style) {
	const s = new Shape();
	const frontX = style === "ev" ? .34 : .31;
	const backX = style === "ev" ? -1.14 : -.98;
	s.moveTo(backX, 1.38);
	s.lineTo(frontX, 1.38);
	s.quadraticCurveTo((frontX + backX) / 2, 1.45, backX, 1.38);
	s.closePath();
	const geo = new ExtrudeGeometry(s, {
		depth: 1.28,
		bevelEnabled: true,
		bevelThickness: .035,
		bevelSize: .028,
		bevelSegments: 2,
		curveSegments: 10
	});
	geo.translate(0, 0, -.64);
	geo.rotateY(-Math.PI / 2);
	return geo;
}
function buildPaintedBodyGeo(style) {
	const parts = [
		placeGeo(buildFrontClipGeo(style)),
		placeGeo(buildRearClipGeo(style)),
		placeGeo(buildRoofCapGeo(style))
	];
	for (const sx of [-.745, .745]) {
		parts.push(placeGeo(new BoxGeometry(.072, .52, 1.42), [
			sx,
			.51,
			-.15
		]));
		parts.push(placeGeo(new BoxGeometry(.055, .05, 1.42), [
			sx * .985,
			.755,
			-.15
		], [
			0,
			0,
			sx > 0 ? .22 : -.22
		]));
	}
	for (const hx of [-.32, .32]) parts.push(placeGeo(new BoxGeometry(.04, .018, 1.02), [
		hx,
		.74,
		1.18
	], [
		.12,
		0,
		0
	]));
	parts.push(placeGeo(new BoxGeometry(1.42, .035, .08), [
		0,
		.76,
		-1.78
	], [
		-.2,
		0,
		0
	]));
	for (const sx of [-.655, .655]) {
		parts.push(placeGeo(new BoxGeometry(.052, .048, 1.3), [
			sx,
			1.375,
			-.33
		]));
		parts.push(placeGeo(new BoxGeometry(.052, .72, .064), [
			sx,
			1.085,
			.52
		], [
			-.66,
			0,
			0
		]));
		parts.push(placeGeo(new BoxGeometry(.056, .7, .088), [
			sx,
			1.09,
			-1.15
		], [
			.64,
			0,
			0
		]));
	}
	parts.push(placeGeo(new SphereGeometry(.066, 12, 8), [
		-.86,
		.85,
		.52
	], [
		0,
		0,
		0
	], [
		1.22,
		.76,
		.7
	]));
	return mergeParts(parts);
}
function buildDarkChassisAndCabinGeo() {
	const parts = [];
	parts.push(placeGeo(new BoxGeometry(1.42, .06, 1.48), [
		0,
		.28,
		-.15
	]));
	parts.push(placeGeo(new BoxGeometry(.56, .015, .52), [
		.34,
		.315,
		.22
	]));
	parts.push(placeGeo(new BoxGeometry(1.24, .025, 1.26), [
		0,
		1.355,
		-.33
	]));
	parts.push(placeGeo(new BoxGeometry(.36, .015, .11), [
		.32,
		1.335,
		.22
	], [
		.1,
		0,
		0
	]));
	parts.push(placeGeo(new BoxGeometry(.36, .015, .11), [
		-.32,
		1.335,
		.22
	], [
		.1,
		0,
		0
	]));
	parts.push(placeGeo(new CylinderGeometry(.008, .008, .07, 6), [
		0,
		1.32,
		.26
	], [
		.25,
		0,
		0
	]));
	parts.push(placeGeo(new BoxGeometry(.18, .048, .024), [
		0,
		1.28,
		.25
	], [
		0,
		.18,
		0
	]));
	for (const sx of [-1, 1]) {
		const ix = sx * .698;
		parts.push(placeGeo(new BoxGeometry(.024, .46, 1.38), [
			ix,
			.52,
			-.15
		]));
		parts.push(placeGeo(new BoxGeometry(.058, .045, .52), [
			ix - sx * .024,
			.56,
			.12
		]));
		parts.push(placeGeo(new BoxGeometry(.052, .042, .44), [
			ix - sx * .022,
			.56,
			-.52
		]));
		parts.push(placeGeo(new CylinderGeometry(.068, .068, .018, 12), [
			ix - sx * .014,
			.41,
			.36
		], [
			0,
			0,
			Math.PI / 2
		]));
		parts.push(placeGeo(new BoxGeometry(.076, .022, 1.42), [
			sx * .745,
			.778,
			-.15
		]));
	}
	parts.push(placeGeo(new BoxGeometry(.22, .18, .88), [
		0,
		.38,
		.12
	]));
	parts.push(placeGeo(new BoxGeometry(.2, .08, .32), [
		0,
		.5,
		-.16
	]));
	parts.push(placeGeo(new CylinderGeometry(.045, .062, .06, 10), [
		0,
		.49,
		.26
	]));
	parts.push(placeGeo(new CylinderGeometry(.036, .028, .09, 10), [
		.03,
		.51,
		.08
	]));
	parts.push(placeGeo(new BoxGeometry(.026, .028, .16), [
		.06,
		.5,
		-.02
	], [
		-.28,
		0,
		0
	]));
	parts.push(placeGeo(new BoxGeometry(.045, .09, .015), [
		.26,
		.39,
		.48
	], [
		-.45,
		0,
		0
	]));
	parts.push(placeGeo(new BoxGeometry(.075, .065, .015), [
		.37,
		.39,
		.46
	], [
		-.45,
		0,
		0
	]));
	parts.push(placeGeo(new BoxGeometry(1.34, .26, .28), [
		0,
		.65,
		.46
	]));
	parts.push(placeGeo(new CylinderGeometry(.16, .16, .28, 12, 1, false, 0, Math.PI), [
		.33,
		.77,
		.44
	], [
		0,
		0,
		Math.PI / 2
	]));
	parts.push(placeGeo(new CylinderGeometry(.028, .036, .24, 10), [
		.33,
		.71,
		.34
	], [
		1.15,
		0,
		0
	]));
	parts.push(placeGeo(new CylinderGeometry(.007, .007, .18, 6), [
		.33,
		.72,
		.3
	], [
		0,
		0,
		Math.PI / 2
	]));
	parts.push(placeGeo(new TorusGeometry(.142, .018, 8, 20), [
		.33,
		.75,
		.24
	], [
		.42,
		0,
		0
	]));
	parts.push(placeGeo(new CylinderGeometry(.046, .046, .028, 12), [
		.33,
		.75,
		.24
	], [
		Math.PI / 2 + .42,
		0,
		0
	]));
	parts.push(placeGeo(new BoxGeometry(.26, .024, .018), [
		.33,
		.75,
		.24
	], [
		.42,
		0,
		0
	]));
	parts.push(placeGeo(new BoxGeometry(.026, .13, .018), [
		.33,
		.69,
		.265
	], [
		.42,
		0,
		0
	]));
	for (const sx of [-.68, .68]) parts.push(placeGeo(new BoxGeometry(.044, .58, .092), [
		sx,
		1.08,
		-.18
	]));
	for (const [wx, wz] of [
		[-.58, 1.14],
		[.58, 1.14],
		[-.58, -1.1],
		[.58, -1.1]
	]) parts.push(placeGeo(new CylinderGeometry(.328, .328, .42, 16, 1, false, 0, Math.PI), [
		wx,
		.31,
		wz
	], [
		0,
		0,
		Math.PI / 2
	]));
	for (const [fx, fz] of [
		[-.782, 1.14],
		[.782, 1.14],
		[-.782, -1.1],
		[.782, -1.1]
	]) {
		parts.push(placeGeo(new TorusGeometry(.335, .02, 6, 18, Math.PI), [
			fx,
			.3,
			fz
		], [
			0,
			Math.PI / 2,
			0
		]));
		parts.push(placeGeo(new BoxGeometry(.14, .14, .018), [
			fx > 0 ? .7 : -.7,
			.2,
			fz - .33
		]));
	}
	for (const sx of [-1, 1]) {
		const ox = sx * .783;
		parts.push(placeGeo(new BoxGeometry(.045, .055, 1.56), [
			sx * .76,
			.26,
			.02
		]));
		parts.push(placeGeo(new BoxGeometry(.016, .024, 1.44), [
			ox,
			.45,
			-.14
		]));
		parts.push(placeGeo(new BoxGeometry(.008, .5, .012), [
			ox,
			.52,
			.54
		]));
		parts.push(placeGeo(new BoxGeometry(.008, .5, .012), [
			ox,
			.52,
			-.18
		]));
		parts.push(placeGeo(new BoxGeometry(.008, .4, .012), [
			ox,
			.57,
			-.82
		]));
		parts.push(placeGeo(new BoxGeometry(.01, .042, .13), [
			ox,
			.69,
			-.04
		]));
		parts.push(placeGeo(new BoxGeometry(.01, .042, .13), [
			ox,
			.7,
			-.54
		]));
	}
	parts.push(placeGeo(new BoxGeometry(1.56, .12, .09), [
		0,
		.26,
		1.88
	]));
	parts.push(placeGeo(new BoxGeometry(.84, .2, .04), [
		0,
		.47,
		1.86
	]));
	parts.push(placeGeo(new BoxGeometry(1.56, .14, .1), [
		0,
		.28,
		-1.85
	]));
	parts.push(placeGeo(new CylinderGeometry(.008, .008, .44, 6), [
		-.24,
		.82,
		.68
	], [
		0,
		.15,
		Math.PI / 2 - .1
	]));
	parts.push(placeGeo(new CylinderGeometry(.008, .008, .44, 6), [
		.24,
		.82,
		.68
	], [
		0,
		.15,
		Math.PI / 2 - .1
	]));
	parts.push(placeGeo(new BoxGeometry(.08, .032, .055), [
		-.78,
		.83,
		.54
	], [
		0,
		0,
		.42
	]));
	return mergeParts(parts);
}
function buildInteriorSeatsGeo() {
	const parts = [];
	for (const sx of [-.33, .33]) {
		parts.push(placeGeo(new BoxGeometry(.38, .09, .42), [
			sx,
			.36,
			0
		]));
		parts.push(placeGeo(new CapsuleGeometry(.038, .34, 4, 8), [
			sx - .18,
			.4,
			0
		], [
			Math.PI / 2,
			0,
			0
		]));
		parts.push(placeGeo(new CapsuleGeometry(.038, .34, 4, 8), [
			sx + .18,
			.4,
			0
		], [
			Math.PI / 2,
			0,
			0
		]));
		parts.push(placeGeo(new BoxGeometry(.38, .48, .1), [
			sx,
			.64,
			-.22
		], [
			-.2,
			0,
			0
		]));
		parts.push(placeGeo(new CapsuleGeometry(.04, .4, 4, 8), [
			sx - .18,
			.64,
			-.2
		], [
			-.2,
			0,
			0
		]));
		parts.push(placeGeo(new CapsuleGeometry(.04, .4, 4, 8), [
			sx + .18,
			.64,
			-.2
		], [
			-.2,
			0,
			0
		]));
		parts.push(placeGeo(new CapsuleGeometry(.062, .13, 6, 8), [
			sx,
			.99,
			-.29
		], [
			0,
			0,
			Math.PI / 2
		]));
	}
	parts.push(placeGeo(new BoxGeometry(1.32, .11, .4), [
		0,
		.38,
		-.6
	]));
	parts.push(placeGeo(new BoxGeometry(1.32, .46, .12), [
		0,
		.64,
		-.8
	], [
		-.16,
		0,
		0
	]));
	parts.push(placeGeo(new CapsuleGeometry(.052, .12, 4, 8), [
		-.36,
		.94,
		-.85
	], [
		0,
		0,
		Math.PI / 2
	]));
	parts.push(placeGeo(new CapsuleGeometry(.052, .12, 4, 8), [
		.36,
		.94,
		-.85
	], [
		0,
		0,
		Math.PI / 2
	]));
	parts.push(placeGeo(new BoxGeometry(1.3, .03, .34), [
		0,
		.79,
		-.98
	]));
	return mergeParts(parts);
}
function buildChromeDetailsGeo(isEv) {
	const parts = [];
	for (const sx of [-1, 1]) {
		parts.push(placeGeo(new CapsuleGeometry(.012, .1, 4, 8), [
			sx * .795,
			.69,
			-.04
		], [
			Math.PI / 2,
			0,
			0
		]));
		parts.push(placeGeo(new CapsuleGeometry(.012, .1, 4, 8), [
			sx * .795,
			.7,
			-.54
		], [
			Math.PI / 2,
			0,
			0
		]));
		parts.push(placeGeo(new BoxGeometry(.015, .022, .065), [
			sx * .675,
			.63,
			.24
		]));
		parts.push(placeGeo(new CylinderGeometry(.008, .008, .1, 6), [
			sx * .33 - .055,
			.91,
			-.27
		]));
		parts.push(placeGeo(new CylinderGeometry(.008, .008, .1, 6), [
			sx * .33 + .055,
			.91,
			-.27
		]));
	}
	parts.push(placeGeo(new CylinderGeometry(.008, .01, .11, 8), [
		0,
		.56,
		.25
	], [
		.22,
		0,
		0
	]));
	parts.push(placeGeo(new SphereGeometry(.024, 10, 8), [
		0,
		.62,
		.265
	]));
	parts.push(placeGeo(new BoxGeometry(.168, .038, .006), [
		0,
		1.28,
		.238
	], [
		0,
		.18,
		0
	]));
	if (!isEv) {
		for (const yy of [
			.41,
			.47,
			.53
		]) parts.push(placeGeo(new BoxGeometry(.78, .016, .02), [
			0,
			yy,
			1.882
		]));
		for (const ex of [-.52, .52]) parts.push(placeGeo(new CylinderGeometry(.036, .04, .18, 12), [
			ex,
			.22,
			-1.9
		], [
			Math.PI / 2,
			0,
			0
		]));
	}
	return mergeParts(parts);
}
function buildTireGeo() {
	const pts = [
		new Vector2(.185, -.095),
		new Vector2(.278, -.102),
		new Vector2(.3, -.078),
		new Vector2(.3, .078),
		new Vector2(.278, .102),
		new Vector2(.185, .095),
		new Vector2(.185, -.095)
	];
	const geo = new LatheGeometry(pts, 24);
	geo.rotateZ(Math.PI / 2);
	geo.computeVertexNormals();
	return geo;
}
function buildWheelAlloyRimGeo() {
	const parts = [
		placeGeo(new TorusGeometry(.182, .02, 8, 22), [
			.062,
			0,
			0
		], [
			0,
			Math.PI / 2,
			0
		]),
		placeGeo(new CylinderGeometry(.048, .048, .028, 12), [
			.068,
			0,
			0
		], [
			0,
			0,
			Math.PI / 2
		]),
		placeGeo(new CylinderGeometry(.006, .006, .026, 6), [
			.062,
			-.155,
			.03
		], [
			0,
			0,
			-.4
		])
	];
	for (let i = 0; i < 5; i++) {
		const a = i * Math.PI * 2 / 5;
		parts.push(placeGeo(new BoxGeometry(.018, .155, .02), [
			.066,
			Math.cos(a + .11) * .102,
			Math.sin(a + .11) * .102
		], [
			a,
			0,
			0
		]));
		parts.push(placeGeo(new BoxGeometry(.018, .155, .02), [
			.066,
			Math.cos(a - .11) * .102,
			Math.sin(a - .11) * .102
		], [
			a,
			0,
			0
		]));
		parts.push(placeGeo(new CylinderGeometry(.008, .008, .016, 6), [
			.078,
			Math.cos(a) * .03,
			Math.sin(a) * .03
		], [
			0,
			0,
			Math.PI / 2
		]));
	}
	return mergeParts(parts);
}
function buildDriverGeometries() {
	const legsParts = [];
	for (const lx of [-.076, .076]) {
		legsParts.push(placeGeo(new CapsuleGeometry(.056, .22, 5, 8), [
			lx,
			.02,
			.14
		], [
			Math.PI / 2 - .12,
			0,
			0
		]));
		legsParts.push(placeGeo(new SphereGeometry(.052, 8, 6), [
			lx,
			.005,
			.26
		]));
		legsParts.push(placeGeo(new CapsuleGeometry(.045, .18, 5, 8), [
			lx,
			-.065,
			.34
		], [
			.58,
			0,
			0
		]));
	}
	const jacketParts = [
		placeGeo(new CylinderGeometry(.162, .128, .3, 12), [
			0,
			.2,
			-.045
		], [
			-.14,
			0,
			0
		], [
			1.08,
			1,
			.72
		]),
		placeGeo(new CapsuleGeometry(.068, .23, 5, 10), [
			0,
			.315,
			-.062
		], [
			0,
			0,
			Math.PI / 2
		], [
			1,
			.85,
			.88
		]),
		placeGeo(new BoxGeometry(.042, .12, .022), [
			-.052,
			.3,
			.032
		], [
			-.14,
			.22,
			-.28
		]),
		placeGeo(new BoxGeometry(.042, .12, .022), [
			.052,
			.3,
			.032
		], [
			-.14,
			-.22,
			.28
		])
	];
	for (const s of [-1, 1]) {
		jacketParts.push(placeGeo(new SphereGeometry(.052, 8, 8), [
			s * .168,
			.305,
			-.035
		]));
		jacketParts.push(placeGeo(new CapsuleGeometry(.044, .135, 5, 8), [
			s * .166,
			.265,
			.048
		], [
			1.05,
			s * .08,
			0
		]));
		jacketParts.push(placeGeo(new SphereGeometry(.041, 8, 6), [
			s * .16,
			.23,
			.125
		]));
		jacketParts.push(placeGeo(new CapsuleGeometry(.037, .13, 5, 8), [
			s * .142,
			.255,
			.205
		], [
			1.38,
			-s * .22,
			0
		]));
	}
	const handParts = [];
	for (const s of [-1, 1]) {
		const hx = s * .125;
		handParts.push(placeGeo(new BoxGeometry(.038, .046, .048), [
			hx,
			.275,
			.278
		], [
			.35,
			-s * .2,
			0
		]));
		handParts.push(placeGeo(new CapsuleGeometry(.011, .024, 4, 6), [
			hx - s * .018,
			.295,
			.272
		], [
			.2,
			0,
			s * .5
		]));
		handParts.push(placeGeo(new CapsuleGeometry(.014, .03, 4, 6), [
			hx + s * .006,
			.275,
			.298
		], [
			.4,
			0,
			0
		]));
	}
	const headPts = [
		new Vector2(0, .068),
		new Vector2(.062, .074),
		new Vector2(.106, .108),
		new Vector2(.124, .168),
		new Vector2(.122, .228),
		new Vector2(.102, .276),
		new Vector2(.055, .304),
		new Vector2(0, .312)
	];
	const headLathe = new LatheGeometry(headPts, 18);
	const headParts = [
		placeGeo(new CylinderGeometry(.046, .056, .11, 10), [
			0,
			.048,
			-.008
		]),
		placeGeo(headLathe, [
			0,
			0,
			0
		], [
			0,
			0,
			0
		], [
			.88,
			1,
			.96
		]),
		placeGeo(new CapsuleGeometry(.013, .028, 4, 6), [
			0,
			.175,
			.116
		], [
			-.26,
			0,
			0
		]),
		placeGeo(new SphereGeometry(.032, 8, 8), [
			-.11,
			.182,
			-.005
		], [
			0,
			0,
			.12
		], [
			.44,
			.92,
			.68
		]),
		placeGeo(new SphereGeometry(.032, 8, 8), [
			.11,
			.182,
			-.005
		], [
			0,
			0,
			-.12
		], [
			.44,
			.92,
			.68
		])
	];
	const hairParts = [
		placeGeo(new SphereGeometry(.128, 14, 10, 0, Math.PI * 2, 0, Math.PI * .56), [
			0,
			.205,
			-.008
		], [
			-.08,
			0,
			0
		], [
			.91,
			.92,
			.99
		]),
		placeGeo(new CapsuleGeometry(.032, .095, 4, 8), [
			.01,
			.278,
			.082
		], [
			.15,
			0,
			1.48
		]),
		placeGeo(new BoxGeometry(.022, .075, .048), [
			-.104,
			.205,
			.012
		], [
			.1,
			0,
			.08
		]),
		placeGeo(new BoxGeometry(.022, .075, .048), [
			.104,
			.205,
			.012
		], [
			.1,
			0,
			-.08
		]),
		placeGeo(new CylinderGeometry(.098, .078, .09, 10, 1, false, Math.PI * .6, Math.PI * .8), [
			0,
			.16,
			-.018
		])
	];
	const capParts = [
		placeGeo(new SphereGeometry(.136, 14, 8, 0, Math.PI * 2, 0, Math.PI * .5), [
			0,
			.228,
			-.004
		], [
			-.1,
			0,
			0
		], [
			.93,
			.92,
			1.02
		]),
		placeGeo(new SphereGeometry(.014, 6, 6), [
			0,
			.352,
			-.016
		]),
		placeGeo(new CylinderGeometry(.118, .128, .02, 12, 1, false, -Math.PI * .42, Math.PI * .84), [
			0,
			.258,
			.072
		], [
			-.05,
			0,
			0
		], [
			.94,
			1,
			1.15
		])
	];
	return {
		legsGeo: mergeParts(legsParts),
		jacketGeo: mergeParts(jacketParts),
		handsGeo: mergeParts(handParts),
		headGeo: mergeParts(headParts),
		hairGeo: mergeParts(hairParts),
		capGeo: mergeParts(capParts)
	};
}
function LiveCar() {
	const ref = (0, import_react.useRef)(null);
	const w1 = (0, import_react.useRef)(null);
	const w2 = (0, import_react.useRef)(null);
	const w3 = (0, import_react.useRef)(null);
	const w4 = (0, import_react.useRef)(null);
	const blower = (0, import_react.useRef)(null);
	const headRef = (0, import_react.useRef)(null);
	const hatRef = (0, import_react.useRef)(null);
	const hairRef = (0, import_react.useRef)(null);
	const hornsRef = (0, import_react.useRef)(null);
	const flamesRef = (0, import_react.useRef)(null);
	const poopRef = (0, import_react.useRef)(null);
	const cheeseRef = (0, import_react.useRef)(null);
	const mirrorRef = (0, import_react.useRef)(null);
	const outlineRef = (0, import_react.useRef)(null);
	const barRef = (0, import_react.useRef)(null);
	const barBgRef = (0, import_react.useRef)(null);
	const capRef = (0, import_react.useRef)(null);
	const mudGroupRef = (0, import_react.useRef)(null);
	const mudMat1 = (0, import_react.useRef)(null);
	const mudMat2 = (0, import_react.useRef)(null);
	const mudMat3 = (0, import_react.useRef)(null);
	const aoTex = (0, import_react.useMemo)(() => createAoShadowTexture(), []);
	const dashTex = (0, import_react.useMemo)(() => createDashboardTexture(), []);
	const plateTex = (0, import_react.useMemo)(() => createPlateTexture(), []);
	const mudTex = (0, import_react.useMemo)(() => createMudTexture(), []);
	const treadTex = (0, import_react.useMemo)(() => createTireTreadTexture(), []);
	const tireGeo = (0, import_react.useMemo)(() => buildTireGeo(), []);
	const rimGeo = (0, import_react.useMemo)(() => buildWheelAlloyRimGeo(), []);
	const sedanBody = (0, import_react.useMemo)(() => buildPaintedBodyGeo("sedan"), []);
	const evBody = (0, import_react.useMemo)(() => buildPaintedBodyGeo("ev"), []);
	const devilBody = (0, import_react.useMemo)(() => buildPaintedBodyGeo("devil"), []);
	const darkGeo = (0, import_react.useMemo)(() => buildDarkChassisAndCabinGeo(), []);
	const seatsGeo = (0, import_react.useMemo)(() => buildInteriorSeatsGeo(), []);
	const chromeGasGeo = (0, import_react.useMemo)(() => buildChromeDetailsGeo(false), []);
	const chromeEvGeo = (0, import_react.useMemo)(() => buildChromeDetailsGeo(true), []);
	const drvGeo = (0, import_react.useMemo)(() => buildDriverGeometries(), []);
	const faceArt = (0, import_react.useMemo)(() => paint(() => void 0, 128, 128), []);
	const [look, setLook] = (0, import_react.useState)({
		id: -1,
		color: "#b8732a",
		shirt: "#334e68",
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
		const idleVib = c.phase === "wait" && !c.asleep && c.job !== "charge" ? Math.sin(sim.clock * 44) * .0018 : 0;
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
			const spin = dt * 10;
			if (w1.current) w1.current.rotation.x += spin;
			if (w2.current) w2.current.rotation.x += spin;
			if (w3.current) w3.current.rotation.x += spin;
			if (w4.current) w4.current.rotation.x += spin;
		}
		if (blower.current && c.devil) blower.current.rotation.z = sim.clock * 6;
		if (mudGroupRef.current) {
			const vis = c.dirty > .2 && c.wash < .96;
			mudGroupRef.current.visible = vis;
			if (vis) {
				const op = Math.max(.08, 1 - c.wash);
				if (mudMat1.current) mudMat1.current.opacity = op;
				if (mudMat2.current) mudMat2.current.opacity = op;
				if (mudMat3.current) mudMat3.current.opacity = op;
			}
		}
		if (hatRef.current) hatRef.current.visible = Boolean(c.hat);
		if (hairRef.current) hairRef.current.visible = !c.hat && !c.devil;
		if (hornsRef.current) hornsRef.current.visible = c.horns;
		if (flamesRef.current) flamesRef.current.visible = c.devil;
		if (poopRef.current) poopRef.current.visible = c.devil && c.dirty > .25 && c.wash < .9;
		if (cheeseRef.current) cheeseRef.current.visible = c.loose;
		if (mirrorRef.current) mirrorRef.current.visible = c.mirror;
		if (outlineRef.current) outlineRef.current.visible = Boolean(sim.up.scanner && c.wanted && !c.caught);
		const head = headRef.current;
		if (head) {
			const targetTurn = c.phase === "wait" && !c.asleep && !c.caught ? 1.15 : 0;
			head.rotation.y += (targetTurn - head.rotation.y) * Math.min(1, dt * 6);
			if (c.caught) {
				head.rotation.z = .62;
				head.rotation.x = Math.sin(sim.clock * 28) * .1;
			} else if (c.asleep) {
				head.rotation.z = .24 + Math.sin(sim.clock * 2.5) * .04;
				head.rotation.x = .24;
			} else {
				head.rotation.z = 0;
				head.rotation.x = Math.sin(sim.clock * 2.2) * .02;
			}
		}
		const bar = barRef.current;
		const showBar = (c.job === "fuel" || c.job === "charge") && c.phase === "wait";
		if (barBgRef.current) barBgRef.current.visible = showBar;
		if (bar) {
			bar.visible = showBar;
			if (showBar) {
				bar.scale.y = Math.max(.05, c.fuel);
				bar.material.color.set(c.job === "charge" ? "#38bdf8" : "#eab308");
			}
		}
		const cap = capRef.current;
		if (cap) {
			cap.visible = c.capped || c.job !== "cap";
			cap.material.color.set(c.capped ? "#dc2626" : "#94a3b8");
		}
		const fk = `${c.skin}|${c.face}|${c.mad}|${c.asleep}|${c.caught}|${c.devil}`;
		if (faceArt.key !== fk) {
			faceArt.key = fk;
			drawDriverFace(faceArt.ctx, 128, 128, {
				skin: c.skin,
				face: c.face,
				mad: c.mad,
				asleep: c.asleep,
				caught: c.caught,
				devil: c.devil
			});
			faceArt.tex.needsUpdate = true;
		}
	});
	const style = look.devil ? "devil" : look.job === "charge" ? "ev" : "sedan";
	const bodyGeo = style === "devil" ? devilBody : style === "ev" ? evBody : sedanBody;
	const chromeGeo = style === "ev" ? chromeEvGeo : chromeGasGeo;
	const headlightEmissive = .6 + sim.night * 1.4;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		visible: false,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				position: [
					0,
					.028,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.35, 4.45] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: aoTex,
					transparent: true,
					depthWrite: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: outlineRef,
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
					2.1,
					.035,
					8,
					32
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#ef4444" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: bodyGeo,
				castShadow: true,
				receiveShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: look.color,
					roughness: .28,
					metalness: .16
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: darkGeo,
				receiveShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#161920",
					roughness: .72,
					metalness: .12
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: seatsGeo,
				receiveShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#272c36",
					roughness: .84,
					metalness: .05
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: chromeGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#eef2f6",
					roughness: .18,
					metalness: .38
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.67,
					.318
				],
				rotation: [
					-.12,
					Math.PI,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.24, .24] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: dashTex,
					toneMapped: false
				})]
			}),
			style === "ev" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.54,
					1.87
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					1.38,
					.042,
					.03
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#38bdf8",
					emissive: "#0ea5e9",
					emissiveIntensity: .95
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.34,
					1.928
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.38, .15] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { map: plateTex })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.54,
					-1.875
				],
				rotation: [
					0,
					Math.PI,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.38, .16] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { map: plateTex })]
			}),
			[-.56, .56].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					x,
					.53,
					1.86
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.24, .11] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#fef3c7",
					emissive: "#fde047",
					emissiveIntensity: headlightEmissive,
					roughness: .1
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						x > 0 ? .13 : -.13,
						0,
						.002
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.055, .11] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#f59e0b",
						emissive: "#d97706",
						emissiveIntensity: .7
					})]
				})]
			}, `hl-${x}`)),
			[-.54, .54].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					x,
					.56,
					-1.875
				],
				rotation: [
					0,
					Math.PI,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.34, .12] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#dc2626",
						emissive: "#ef4444",
						emissiveIntensity: .9,
						roughness: .18
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							-.042,
							.003
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.32, .028] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f59e0b",
							emissive: "#f59e0b",
							emissiveIntensity: .6
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							x > 0 ? .11 : -.11,
							.02,
							.004
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.09, .04] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#f8fafc" })]
					})
				]
			}, `tl-${x}`)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.085,
					.52
				],
				rotation: [
					-.66,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.28, .72] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#132938",
					roughness: .06,
					metalness: .65,
					transparent: true,
					opacity: .34,
					side: 2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.09,
					-1.15
				],
				rotation: [
					.64,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.26, .7] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0b1320",
					roughness: .08,
					metalness: .6,
					transparent: true,
					opacity: .72,
					side: 2
				})]
			}),
			[-.695, .695].map((sx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					sx,
					1.08,
					-.58
				],
				rotation: [
					0,
					Math.PI / 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.78, .58] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0b111c",
					roughness: .08,
					metalness: .55,
					transparent: true,
					opacity: .74,
					side: 2
				})]
			}, `rglass-${sx}`)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-.695,
					1.08,
					.18
				],
				rotation: [
					0,
					Math.PI / 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.72, .58] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#0f1d2b",
					roughness: .08,
					metalness: .55,
					transparent: true,
					opacity: .68,
					side: 2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: flamesRef,
				visible: false,
				position: [
					0,
					.85,
					1.08
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.34,
						.16,
						.42
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#cbd5e1",
						roughness: .18,
						metalness: .9
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
					ref: blower,
					position: [
						0,
						.08,
						.22
					],
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						rotation: [
							Math.PI / 2,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.075,
							.075,
							.06,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#dc2626",
							roughness: .3
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: poopRef,
				position: [
					.12,
					.81,
					1.15
				],
				visible: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.08,
					.035,
					8,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#5c361e",
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
						10
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#6b3e26",
						roughness: .95
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: mudGroupRef,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.798,
							.52,
							0
						],
						rotation: [
							0,
							Math.PI / 2,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.1, .52] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							ref: mudMat1,
							map: mudTex,
							transparent: true,
							depthWrite: false,
							roughness: .95
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.798,
							.52,
							0
						],
						rotation: [
							0,
							-Math.PI / 2,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.1, .52] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							ref: mudMat2,
							map: mudTex,
							transparent: true,
							depthWrite: false,
							roughness: .95
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.82,
							1.18
						],
						rotation: [
							-Math.PI / 2 + .08,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.1, .68] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							ref: mudMat3,
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
					-.76,
					.3,
					1.14
				],
				tireGeo,
				rimGeo,
				treadTex
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
				refObj: w2,
				at: [
					.76,
					.3,
					1.14
				],
				tireGeo,
				rimGeo,
				treadTex,
				flip: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
				refObj: w3,
				at: [
					-.76,
					.3,
					-1.1
				],
				tireGeo,
				rimGeo,
				treadTex
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheel, {
				refObj: w4,
				at: [
					.76,
					.3,
					-1.1
				],
				tireGeo,
				rimGeo,
				treadTex,
				flip: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: mirrorRef,
				position: [
					.75,
					.82,
					.52
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.03,
							-.01,
							.02
						],
						rotation: [
							0,
							0,
							-.45
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.08,
							.032,
							.055
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#18181b",
							roughness: .6
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.11,
							.015,
							0
						],
						scale: [
							1.25,
							.78,
							.72
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
							.068,
							12,
							10
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: look.color,
							roughness: .2,
							metalness: .55
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.11,
							.015,
							-.048
						],
						scale: [
							1.18,
							.74,
							1
						],
						rotation: [
							0,
							Math.PI,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.052, 14] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e2e8f0",
							roughness: .04,
							metalness: .96
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.798,
					.68,
					-1
				],
				rotation: [
					0,
					Math.PI / 2,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
					.074,
					.014,
					8,
					16
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#18181b",
					roughness: .5,
					metalness: .5
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					ref: capRef,
					position: [
						0,
						0,
						.015
					],
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.066,
						.066,
						.03,
						16
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#94a3b8",
						roughness: .3,
						metalness: .5
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				ref: cheeseRef,
				position: [
					-.33,
					.46,
					.04
				],
				visible: false,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						0,
						.45,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.105,
						.105,
						.075,
						3
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#eab308",
						roughness: .62
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: barBgRef,
				position: [
					.8,
					.68,
					-1.44
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.022,
					.4,
					6,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#09090b" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: barRef,
				position: [
					.81,
					.68,
					-1.44
				],
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.016,
					.36,
					6,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#eab308" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					.33,
					.44,
					-.04
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: drvGeo.legsGeo,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#1e293b",
							roughness: .88
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: drvGeo.jacketGeo,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: look.shirt,
							roughness: .8
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.33,
							-.015
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.056,
							.068,
							.05,
							10
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f1f5f9",
							roughness: .85
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							.01,
							.235,
							.048
						],
						rotation: [
							-.14,
							0,
							.58
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.038,
							.32,
							.01
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#111827",
							roughness: .6
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: drvGeo.handsGeo,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: look.skin,
							roughness: .68
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						ref: headRef,
						position: [
							0,
							.385,
							-.04
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: drvGeo.headGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: look.skin,
									roughness: .66
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.182,
									.012
								],
								scale: [
									.91,
									1,
									1.02
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.126,
									.112,
									.155,
									14,
									1,
									true,
									-.68,
									1.36
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									map: faceArt.tex,
									roughness: .66
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								ref: hairRef,
								geometry: drvGeo.hairGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#1f1b18",
									roughness: .88
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								ref: hatRef,
								geometry: drvGeo.capGeo,
								visible: Boolean(look.hat),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: look.hat ?? "#2d9d5c",
									roughness: .76
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
								ref: hornsRef,
								visible: look.devil,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										-.062,
										.31,
										0
									],
									rotation: [
										0,
										0,
										.42
									],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
										.026,
										.15,
										8
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#dc2626",
										roughness: .35
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
									position: [
										.062,
										.31,
										0
									],
									rotation: [
										0,
										0,
										-.42
									],
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("coneGeometry", { args: [
										.026,
										.15,
										8
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
										color: "#dc2626",
										roughness: .35
									})]
								})]
							})
						]
					})
				]
			})
		]
	});
}
function Wheel({ at, refObj, flip, tireGeo, rimGeo, treadTex }) {
	const dir = flip ? 1 : -1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: refObj,
		position: at,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: tireGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: treadTex,
					roughness: .86,
					metalness: .05
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					dir * .018,
					0,
					0
				],
				rotation: [
					0,
					0,
					Math.PI / 2
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.182,
					.182,
					.04,
					14
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#14171f",
					roughness: .75,
					metalness: .35
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: rimGeo,
				scale: [
					dir,
					1,
					1
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#edf2f7",
					roughness: .18,
					metalness: .36
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					dir * .044,
					.095,
					.065
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.032,
					.075,
					.05
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#dc2626",
					roughness: .35,
					metalness: .25
				})]
			})
		]
	});
}
var _props = null;
function getPropGeos() {
	if (!_props) _props = createAllPropGeos();
	return _props;
}
function createAllPropGeos() {
	const sleeveGeo = mergeParts([placeGeo(new CylinderGeometry(.04, .052, .24, 12), [
		0,
		-.055,
		.17
	], [
		Math.PI / 2 - .22,
		0,
		0
	]), placeGeo(new TorusGeometry(.04, .008, 6, 12), [
		0,
		-.025,
		.06
	], [
		-.22,
		0,
		0
	])]);
	const buildGlovePalm = (side) => {
		const parts = [
			placeGeo(new BoxGeometry(.072, .042, .082), [
				0,
				0,
				.008
			], [
				.08,
				0,
				0
			]),
			placeGeo(new CapsuleGeometry(.013, .052, 4, 8), [
				0,
				.022,
				-.02
			], [
				0,
				0,
				Math.PI / 2
			]),
			placeGeo(new CapsuleGeometry(.014, .032, 4, 8), [
				-side * .036,
				.012,
				.008
			], [
				.3,
				side * .45,
				.25
			]),
			placeGeo(new CapsuleGeometry(.012, .026, 4, 8), [
				-side * .026,
				.026,
				-.022
			], [
				.1,
				side * .85,
				.4
			])
		];
		for (let i = 0; i < 4; i++) {
			const fz = -.028 + i * .019;
			const lenScale = i === 1 || i === 2 ? 1.06 : .94;
			parts.push(placeGeo(new CapsuleGeometry(.0105, .034 * lenScale, 4, 8), [
				side * .024,
				.008 - i * .002,
				fz
			], [
				0,
				0,
				Math.PI / 2 - side * .25
			]));
			parts.push(placeGeo(new CapsuleGeometry(.0095, .026 * lenScale, 4, 8), [
				side * .008,
				-.012 - i * .002,
				fz
			], [
				0,
				0,
				side * .35
			]));
		}
		return mergeParts(parts);
	};
	const spoutCurve = new CatmullRomCurve3([
		new Vector3(0, .044, -.09),
		new Vector3(0, .046, -.155),
		new Vector3(0, .022, -.235)
	]);
	const nozzleMetalGeo = mergeParts([
		placeGeo(new CapsuleGeometry(.016, .088, 4, 8), [
			0,
			-.018,
			.022
		], [
			.42,
			0,
			0
		]),
		placeGeo(new BoxGeometry(.014, .008, .095), [
			0,
			-.048,
			-.018
		], [
			.18,
			0,
			0
		]),
		placeGeo(new BoxGeometry(.014, .058, .008), [
			0,
			-.015,
			-.062
		], [
			-.15,
			0,
			0
		]),
		placeGeo(new BoxGeometry(.01, .012, .065), [
			0,
			-.014,
			-.018
		], [
			.28,
			0,
			0
		]),
		placeGeo(new CylinderGeometry(.02, .02, .032, 10), [
			0,
			-.068,
			.048
		], [
			.45,
			0,
			0
		]),
		new TubeGeometry(spoutCurve, 10, .0115, 8, false)
	]);
	const nozzleBootGeo = mergeParts([placeGeo(new CapsuleGeometry(.029, .085, 6, 10), [
		0,
		.04,
		-.032
	], [
		Math.PI / 2 - .16,
		0,
		0
	]), placeGeo(new BoxGeometry(.062, .036, .08), [
		0,
		.038,
		-.028
	], [
		-.16,
		0,
		0
	])]);
	const nozzleSplashGeo = mergeParts([placeGeo(new CylinderGeometry(.026, .032, .034, 12), [
		0,
		.043,
		-.115
	], [
		Math.PI / 2 - .05,
		0,
		0
	]), placeGeo(new TorusGeometry(.028, .005, 6, 12), [
		0,
		.044,
		-.128
	])]);
	const burgerBasketGeo = mergeParts([placeGeo(new CylinderGeometry(.145, .115, .036, 14), [
		0,
		-.024,
		0
	], [
		0,
		0,
		0
	], [
		1.15,
		1,
		.95
	])]);
	const burgerBunAndFriesGeo = mergeParts([
		placeGeo(new CylinderGeometry(.095, .088, .024, 14), [
			-.015,
			-.002,
			.005
		]),
		placeGeo(new SphereGeometry(.098, 14, 8, 0, Math.PI * 2, 0, Math.PI * .54), [
			-.015,
			.058,
			.005
		]),
		placeGeo(new BoxGeometry(.014, .065, .014), [
			.095,
			.018,
			-.025
		], [
			.2,
			.1,
			-.45
		]),
		placeGeo(new BoxGeometry(.014, .072, .014), [
			.102,
			.022,
			-.005
		], [
			.05,
			0,
			-.52
		]),
		placeGeo(new BoxGeometry(.014, .068, .014), [
			.098,
			.02,
			.016
		], [
			-.15,
			-.1,
			-.48
		]),
		placeGeo(new BoxGeometry(.014, .06, .014), [
			.086,
			.016,
			.032
		], [
			-.25,
			.15,
			-.4
		])
	]);
	const burgerPattyGeo = placeGeo(new CylinderGeometry(.102, .102, .028, 14), [
		-.015,
		.02,
		.005
	]);
	const burgerCheeseGeo = mergeParts([placeGeo(new BoxGeometry(.158, .007, .158), [
		-.015,
		.036,
		.005
	], [
		0,
		.45,
		0
	]), placeGeo(new BoxGeometry(.152, .006, .152), [
		-.015,
		.038,
		.005
	], [
		0,
		1.15,
		0
	])]);
	const burgerLettuceGeo = mergeParts([placeGeo(new CylinderGeometry(.108, .104, .012, 12), [
		-.015,
		.046,
		.005
	]), placeGeo(new TorusGeometry(.096, .009, 5, 12), [
		-.015,
		.046,
		.005
	], [
		Math.PI / 2,
		0,
		0
	])]);
	const burgerTomatoGeo = mergeParts([placeGeo(new CylinderGeometry(.052, .052, .01, 10), [
		-.042,
		.053,
		.028
	]), placeGeo(new CylinderGeometry(.052, .052, .01, 10), [
		.018,
		.053,
		-.022
	])]);
	const spongeYellowGeo = mergeParts([
		placeGeo(new CapsuleGeometry(.046, .045, 5, 10), [
			-.042,
			0,
			0
		], [
			Math.PI / 2,
			0,
			0
		]),
		placeGeo(new CapsuleGeometry(.036, .035, 4, 8), [
			0,
			0,
			0
		], [
			Math.PI / 2,
			0,
			0
		]),
		placeGeo(new CapsuleGeometry(.046, .045, 5, 10), [
			.042,
			0,
			0
		], [
			Math.PI / 2,
			0,
			0
		])
	]);
	const spongeGreenGeo = mergeParts([
		placeGeo(new CapsuleGeometry(.042, .042, 4, 10), [
			-.042,
			.032,
			0
		], [
			Math.PI / 2,
			0,
			0
		]),
		placeGeo(new CapsuleGeometry(.033, .032, 4, 8), [
			0,
			.03,
			0
		], [
			Math.PI / 2,
			0,
			0
		]),
		placeGeo(new CapsuleGeometry(.042, .042, 4, 10), [
			.042,
			.032,
			0
		], [
			Math.PI / 2,
			0,
			0
		])
	]);
	const capPts = [
		new Vector2(0, -.042),
		new Vector2(.058, -.042),
		new Vector2(.062, -.012),
		new Vector2(.078, -.008),
		new Vector2(.078, 0),
		new Vector2(0, 0)
	];
	const capDarkGeo = mergeParts([
		new LatheGeometry(capPts, 16),
		placeGeo(new TorusGeometry(.068, .008, 6, 16), [
			0,
			-.006,
			0
		], [
			Math.PI / 2,
			0,
			0
		]),
		placeGeo(new TorusGeometry(.055, .005, 5, 12, Math.PI * 1.3), [
			.055,
			-.025,
			0
		], [
			.4,
			0,
			0
		])
	]);
	const capRedGeo = mergeParts([
		placeGeo(new CylinderGeometry(.098, .104, .036, 16), [
			0,
			.018,
			0
		]),
		placeGeo(new BoxGeometry(.175, .034, .032), [
			0,
			.046,
			0
		]),
		placeGeo(new CylinderGeometry(.02, .02, .034, 8), [
			-.082,
			.046,
			0
		]),
		placeGeo(new CylinderGeometry(.02, .02, .034, 8), [
			.082,
			.046,
			0
		])
	]);
	const taserYellowGeo = mergeParts([placeGeo(new BoxGeometry(.052, .066, .165), [
		0,
		.032,
		-.035
	]), placeGeo(new BoxGeometry(.056, .032, .11), [
		0,
		.048,
		-.015
	])]);
	const taserDarkGeo = mergeParts([
		placeGeo(new CapsuleGeometry(.02, .082, 4, 8), [
			0,
			-.028,
			.026
		], [
			.34,
			0,
			0
		]),
		placeGeo(new BoxGeometry(.014, .008, .052), [
			0,
			-.018,
			-.012
		]),
		placeGeo(new BoxGeometry(.014, .038, .008), [
			0,
			0,
			-.035
		]),
		placeGeo(new BoxGeometry(.048, .052, .036), [
			0,
			.032,
			-.125
		]),
		placeGeo(new BoxGeometry(.012, .012, .02), [
			0,
			.07,
			-.095
		]),
		placeGeo(new BoxGeometry(.022, .01, .015), [
			0,
			.07,
			.035
		])
	]);
	const taserArcGeo = mergeParts([
		placeGeo(new CylinderGeometry(.007, .007, .038, 6), [
			-.015,
			.034,
			-.152
		], [
			Math.PI / 2,
			0,
			0
		]),
		placeGeo(new CylinderGeometry(.007, .007, .038, 6), [
			.015,
			.034,
			-.152
		], [
			Math.PI / 2,
			0,
			0
		]),
		placeGeo(new CylinderGeometry(.0035, .0035, .03, 5), [
			0,
			.034,
			-.166
		], [
			0,
			0,
			Math.PI / 2
		])
	]);
	const chargerDarkGeo = mergeParts([
		placeGeo(new CapsuleGeometry(.02, .095, 4, 8), [
			0,
			-.015,
			.025
		], [
			.42,
			0,
			0
		]),
		placeGeo(new CapsuleGeometry(.03, .12, 6, 10), [
			0,
			.036,
			-.035
		], [
			Math.PI / 2 - .16,
			0,
			0
		]),
		placeGeo(new CylinderGeometry(.016, .016, .05, 8), [
			0,
			-.042,
			-.015
		], [
			Math.PI / 2 - .16,
			0,
			0
		]),
		placeGeo(new CylinderGeometry(.036, .038, .05, 12), [
			0,
			.044,
			-.12
		], [
			Math.PI / 2 - .1,
			0,
			0
		]),
		placeGeo(new CapsuleGeometry(.016, .028, 4, 8), [
			0,
			.02,
			-.12
		], [
			0,
			0,
			Math.PI / 2
		])
	]);
	const chargerCyanGeo = mergeParts([placeGeo(new BoxGeometry(.018, .01, .105), [
		0,
		.068,
		-.03
	], [
		-.16,
		0,
		0
	]), placeGeo(new TorusGeometry(.034, .006, 6, 12), [
		0,
		.045,
		-.144
	], [
		-.1,
		0,
		0
	])]);
	return {
		sleeveGeo,
		leftGloveGeo: buildGlovePalm(-1),
		rightGloveGeo: buildGlovePalm(1),
		nozzleMetalGeo,
		nozzleBootGeo,
		nozzleSplashGeo,
		burgerBasketGeo,
		burgerBunAndFriesGeo,
		burgerPattyGeo,
		burgerCheeseGeo,
		burgerLettuceGeo,
		burgerTomatoGeo,
		spongeYellowGeo,
		spongeGreenGeo,
		capDarkGeo,
		capRedGeo,
		taserYellowGeo,
		taserDarkGeo,
		taserArcGeo,
		chargerDarkGeo,
		chargerCyanGeo
	};
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
		const p = carPoint(c, .18, 1.76, .08);
		mesh.position.set(p.x, p.y + Math.sin(sim.clock * 3) * .025, p.z);
		mesh.lookAt(sim.player.x, 1.54, sim.player.z);
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
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.52, .52] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
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
			const s = .9 + Math.min(.65, b.amount / 180);
			m.scale.setScalar(s);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
		ref,
		children: Array.from({ length: 6 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			visible: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.26,
				.038,
				.13
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: billTex,
				color: "#dcfce7",
				emissive: "#16a34a",
				emissiveIntensity: .18,
				roughness: .55
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.052,
				.042,
				.136
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#f59e0b",
				roughness: .48
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
		children: Array.from({ length: 14 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			visible: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dodecahedronGeometry", { args: [.052, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
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
	const pg = (0, import_react.useMemo)(() => getPropGeos(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			s * .024,
			-.058,
			.072
		],
		rotation: [
			.22,
			-s * .14,
			0
		],
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: pg.sleeveGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#1e3a44",
				roughness: .85
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: side === "left" ? pg.leftGloveGeo : pg.rightGloveGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#24272d",
				roughness: .64
			})
		})]
	});
}
function Hands() {
	const ref = (0, import_react.useRef)(null);
	const posterRef = (0, import_react.useRef)(null);
	const toolRef = (0, import_react.useRef)(null);
	const nozzleRef = (0, import_react.useRef)(null);
	const spongeRef = (0, import_react.useRef)(null);
	const burgerRef = (0, import_react.useRef)(null);
	const capRef = (0, import_react.useRef)(null);
	const taserRef = (0, import_react.useRef)(null);
	const cashRef = (0, import_react.useRef)(null);
	const mirrorRef = (0, import_react.useRef)(null);
	const chargerRef = (0, import_react.useRef)(null);
	const hatRef = (0, import_react.useRef)(null);
	const hatMat1 = (0, import_react.useRef)(null);
	const hatMat2 = (0, import_react.useRef)(null);
	const cheeseRef = (0, import_react.useRef)(null);
	const hornsRef = (0, import_react.useRef)(null);
	const tipMatRef = (0, import_react.useRef)(null);
	const pg = (0, import_react.useMemo)(() => getPropGeos(), []);
	const billTex = (0, import_react.useMemo)(() => createBillTexture(), []);
	const spongeTex = (0, import_react.useMemo)(() => createSpongeTexture(), []);
	const bunTex = (0, import_react.useMemo)(() => createBunTexture(), []);
	const poster = (0, import_react.useMemo)(() => paint((ctx, w, h) => drawPoster(ctx, w, h), 384, 512), []);
	const trailingHoseGeo = (0, import_react.useMemo)(() => {
		const curve = new CatmullRomCurve3([
			new Vector3(0, -.08, .055),
			new Vector3(.03, -.22, .16),
			new Vector3(.08, -.42, .28)
		]);
		return new TubeGeometry(curve, 10, .017, 7, false);
	}, []);
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
		g.position.y += Math.sin(sim.clock * 2.2) * .004;
		if (posterRef.current) posterRef.current.visible = sim.posterUp;
		const h = sim.hold;
		if (toolRef.current) {
			toolRef.current.visible = h !== "none";
			if (h !== "none") {
				const jiggle = sim.usePulse > 0 ? Math.sin(sim.clock * 26) * .022 * sim.usePulse : 0;
				toolRef.current.position.set(.25 + jiggle, -.2 + Math.abs(jiggle), -.52);
				toolRef.current.rotation.set(.08, .32, -.06);
			}
		}
		if (nozzleRef.current) nozzleRef.current.visible = h === "nozzle";
		if (spongeRef.current) spongeRef.current.visible = h === "sponge";
		if (burgerRef.current) burgerRef.current.visible = h === "burger";
		if (capRef.current) capRef.current.visible = h === "cap";
		if (taserRef.current) taserRef.current.visible = h === "taser";
		if (cashRef.current) cashRef.current.visible = h === "cash";
		if (mirrorRef.current) mirrorRef.current.visible = h === "mirror";
		if (chargerRef.current) chargerRef.current.visible = h === "charger";
		if (cheeseRef.current) cheeseRef.current.visible = h === "cheese";
		if (hornsRef.current) hornsRef.current.visible = sim.wornHorns;
		if (hatRef.current) {
			const on = h === "hat";
			hatRef.current.visible = on;
			if (on) {
				if (hatMat1.current) hatMat1.current.color.set(sim.hatColor);
				if (hatMat2.current) hatMat2.current.color.set(sim.hatColor);
			}
		}
		if (h === "nozzle" && tipMatRef.current) {
			const gc = GRADES.find((x) => x.id === sim.grade)?.color ?? "#f59e0b";
			tipMatRef.current.color.set(gc);
		}
		if (sim.posterUp) {
			const key = String(sim.warrant);
			if (poster.key !== key) {
				poster.key = key;
				drawPoster(poster.ctx, 384, 512);
				poster.tex.needsUpdate = true;
			}
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: posterRef,
				position: [
					-.22,
					-.04,
					-.58
				],
				rotation: [
					.04,
					.18,
					0
				],
				visible: false,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							0,
							-.008
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.36,
							.48,
							.012
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#44403c",
							roughness: .7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.34, .46] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						map: poster.tex,
						toneMapped: false
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripGlove, { side: "left" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: toolRef,
				position: [
					.25,
					-.2,
					-.52
				],
				visible: false,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripGlove, { side: "right" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						ref: nozzleRef,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: trailingHoseGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#141417",
									roughness: .75
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.nozzleMetalGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#d8e0ea",
									roughness: .22,
									metalness: .85
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.nozzleBootGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									ref: tipMatRef,
									color: "#f59e0b",
									roughness: .35
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.nozzleSplashGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#18181b",
									roughness: .7
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						ref: spongeRef,
						visible: false,
						rotation: [
							.22,
							.4,
							0
						],
						position: [
							0,
							.02,
							-.03
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: pg.spongeYellowGeo,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								map: spongeTex,
								roughness: .92
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: pg.spongeGreenGeo,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#15803d",
								roughness: .95
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						ref: burgerRef,
						visible: false,
						position: [
							0,
							.025,
							-.04
						],
						scale: .82,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.burgerBasketGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#dc2626",
									roughness: .48
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.burgerBunAndFriesGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									map: bunTex,
									roughness: .68
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.burgerPattyGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#5c2810",
									roughness: .88
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.burgerCheeseGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#f59e0b",
									roughness: .42
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.burgerLettuceGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#65a30d",
									roughness: .78
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.burgerTomatoGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#dc2626",
									roughness: .35
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						ref: capRef,
						visible: false,
						rotation: [
							.42,
							.2,
							0
						],
						position: [
							0,
							.022,
							-.03
						],
						scale: .84,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: pg.capDarkGeo,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#18181b",
								roughness: .68
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: pg.capRedGeo,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#dc2626",
								roughness: .3,
								metalness: .2
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						ref: taserRef,
						visible: false,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.taserDarkGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#18181b",
									roughness: .68
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.taserYellowGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#eab308",
									roughness: .36
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.taserArcGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#38bdf8",
									emissive: "#0ea5e9",
									emissiveIntensity: 1.2
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						ref: cashRef,
						visible: false,
						rotation: [
							.25,
							.3,
							0
						],
						position: [
							0,
							.015,
							-.025
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
						ref: mirrorRef,
						visible: false,
						position: [
							0,
							.02,
							-.02
						],
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
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.032,
									.07,
									.04
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#18181b",
									roughness: .6
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								scale: [
									1.18,
									.76,
									.68
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
									.062,
									12,
									8
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#94a3b8",
									roughness: .22,
									metalness: .55
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									0,
									-.04
								],
								scale: [
									1.12,
									.72,
									1
								],
								rotation: [
									0,
									Math.PI,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.046, 14] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#f8fafc",
									roughness: .06,
									metalness: .85
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						ref: chargerRef,
						visible: false,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: trailingHoseGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#141417",
									roughness: .75
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.chargerDarkGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#1e293b",
									roughness: .36,
									metalness: .35
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.chargerCyanGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#38bdf8",
									emissive: "#0ea5e9",
									emissiveIntensity: 1.1
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						ref: hatRef,
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
								12,
								8,
								0,
								Math.PI * 2,
								0,
								Math.PI * .55
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								ref: hatMat1,
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
								ref: hatMat2,
								color: "#eab308",
								roughness: .75
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						ref: cheeseRef,
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
				ref: hornsRef,
				position: [
					0,
					.16,
					-.42
				],
				visible: false,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
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
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						position: [
							0,
							.08,
							0
						],
						visible: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
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
					})
				]
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
function buildRoundedSlab(w, d, h, r, bevel = .025) {
	const geo = new ExtrudeGeometry(roundedRectShape(w, d, r), {
		depth: h,
		bevelEnabled: bevel > 0,
		bevelThickness: bevel,
		bevelSize: bevel,
		bevelSegments: 2,
		curveSegments: 8
	});
	geo.rotateX(-Math.PI / 2);
	geo.computeVertexNormals();
	return geo;
}
function buildDesertTerrainGeo() {
	const geo = new PlaneGeometry(176, 176, 42, 42);
	geo.rotateX(-Math.PI / 2);
	const pos = geo.attributes.position;
	for (let i = 0; i < pos.count; i++) {
		const x = pos.getX(i);
		const z = pos.getZ(i);
		if (Math.abs(z - .5) < 3.2 || x > -11.5 && x < 9 && z > -9.8 && z < 8.2) {
			pos.setY(i, 0);
			continue;
		}
		const distRoad = Math.max(0, Math.abs(z - .5) - 3.2);
		const distPad = Math.max(0, Math.max(-11.5 - x, x - 9, -9.8 - z, z - 8.2));
		const blend = Math.min(1, Math.min(distRoad, distPad) / 8);
		const ridge = Math.max(0, (-z - 22) * .14);
		const dune = (Math.sin(x * .1 + z * .07) * .58 + Math.cos(x * .055 - z * .09) * .85 + Math.sin(x * .22 + z * .18) * .18) * blend;
		pos.setY(i, Math.max(0, dune + .18 * blend + ridge * blend));
	}
	geo.computeVertexNormals();
	return geo;
}
function buildButteLayerGeo(rTop, rBot, height, seed) {
	const pts = [
		new Vector2(rBot, 0),
		new Vector2(rBot * .88, height * .28),
		new Vector2(rTop * 1.12, height * .68),
		new Vector2(rTop, height),
		new Vector2(0, height)
	];
	const lathe = new LatheGeometry(pts, 20);
	const pos = lathe.attributes.position;
	for (let i = 0; i < pos.count; i++) {
		const vx = pos.getX(i);
		const vy = pos.getY(i);
		const vz = pos.getZ(i);
		if (Math.hypot(vx, vz) > .01) {
			const ang = Math.atan2(vz, vx);
			const flute = 1 + .1 * Math.sin(ang * 5 + seed) + .06 * Math.cos(ang * 9 - seed * 1.7) + .03 * Math.sin(vy * 1.5 + ang * 3);
			pos.setXYZ(i, vx * flute, vy, vz * flute);
		}
	}
	lathe.computeVertexNormals();
	return lathe;
}
function buildHopperGeo() {
	const pts = [
		new Vector2(.42, 0),
		new Vector2(.42, .15),
		new Vector2(.68, .42),
		new Vector2(.62, .42),
		new Vector2(.38, .16)
	];
	return new LatheGeometry(pts, 20);
}
function buildMergedRoadStripesGeo() {
	return mergeParts([
		-28,
		-24,
		-20,
		-16,
		-12,
		-8,
		-4.2,
		4.2,
		8,
		12,
		16,
		20,
		24,
		28
	].map((x) => placeGeo(new PlaneGeometry(1.65, .13), [
		x,
		.027,
		.5
	], [
		-Math.PI / 2,
		0,
		0
	])));
}
function buildMergedGuardrailsGeo() {
	const rails = [];
	const posts = [];
	for (const cx of [-16.5, 16.5]) {
		rails.push(placeGeo(new BoxGeometry(15, .24, .06), [
			cx,
			.56,
			-1.82
		]));
		rails.push(placeGeo(new BoxGeometry(15, .05, .08), [
			cx,
			.62,
			-1.8
		]));
		rails.push(placeGeo(new BoxGeometry(15, .05, .08), [
			cx,
			.5,
			-1.8
		]));
		for (const px of [
			-6,
			-3,
			0,
			3,
			6
		]) posts.push(placeGeo(new BoxGeometry(.1, .7, .1), [
			cx + px,
			.35,
			-1.87
		]));
	}
	return {
		railGeo: mergeParts(rails),
		postGeo: mergeParts(posts)
	};
}
function buildMergedEnvironmentGeo() {
	const cactusParts = [];
	for (const [x, z, s] of [
		[
			10.2,
			-3.4,
			1.05
		],
		[
			14.8,
			-5.8,
			1.3
		],
		[
			8.4,
			-8.2,
			.9
		],
		[
			15.5,
			4.8,
			1.15
		],
		[
			-13.5,
			-2.8,
			1.22
		],
		[
			-12.5,
			4.8,
			.95
		],
		[
			7.2,
			7.2,
			1.08
		],
		[
			-8.8,
			6.6,
			.98
		]
	]) {
		cactusParts.push(placeGeo(new CylinderGeometry(.13 * s, .155 * s, 1.48 * s, 10), [
			x,
			.78 * s,
			z
		]));
		cactusParts.push(placeGeo(new SphereGeometry(.13 * s, 10, 6), [
			x,
			1.52 * s,
			z
		]));
		cactusParts.push(placeGeo(new CapsuleGeometry(.075 * s, .38 * s, 4, 8), [
			x + .24 * s,
			.82 * s,
			z
		], [
			0,
			0,
			-.68
		]));
		cactusParts.push(placeGeo(new CapsuleGeometry(.07 * s, .34 * s, 4, 8), [
			x - .24 * s,
			.96 * s,
			z
		], [
			0,
			0,
			.68
		]));
	}
	const shrubParts = [];
	for (const [x, z, s] of [
		[
			8.2,
			-2.2,
			.36
		],
		[
			11.8,
			3.6,
			.44
		],
		[
			-10.8,
			3.2,
			.4
		],
		[
			-8.2,
			-2.4,
			.34
		],
		[
			13.4,
			-2.6,
			.38
		]
	]) shrubParts.push(placeGeo(new DodecahedronGeometry(s, 1), [
		x,
		s * .45,
		z
	], [
		0,
		x,
		0
	], [
		1.35,
		.72,
		1.2
	]));
	const mesaParts = [];
	for (const [x, z, rt, rb, h1, crt, ch, seed] of [
		[
			-28,
			-34,
			5.2,
			9.8,
			4.6,
			3.4,
			3.2,
			1.1
		],
		[
			-9,
			-38,
			6.8,
			12.6,
			5.8,
			4.5,
			4.1,
			3.2
		],
		[
			13,
			-35,
			5.8,
			10.8,
			5,
			3.8,
			3.6,
			5.3
		],
		[
			31,
			-29,
			4.8,
			8.9,
			4.2,
			2.9,
			2.8,
			7.4
		],
		[
			-34,
			28,
			5.4,
			10.2,
			4.4,
			3.2,
			2.9,
			2.9
		],
		[
			28,
			32,
			5,
			9.4,
			4.1,
			3.1,
			2.7,
			6.5
		]
	]) {
		mesaParts.push(placeGeo(buildButteLayerGeo(rt, rb, h1, seed), [
			x,
			-.1,
			z
		]));
		mesaParts.push(placeGeo(buildButteLayerGeo(crt, rt * .92, ch, seed + 1.4), [
			x + .4,
			h1 - .4,
			z - .3
		]));
	}
	for (const [x, z, s, idx] of [
		[
			9.2,
			-2.6,
			.58,
			0
		],
		[
			-11.8,
			-2.1,
			.72,
			1
		],
		[
			7.8,
			6.2,
			.48,
			2
		],
		[
			-9.6,
			6.1,
			.66,
			3
		]
	]) mesaParts.push(placeGeo(new DodecahedronGeometry(s, 1), [
		x,
		s * .42,
		z
	], [
		idx,
		idx * .7,
		0
	], [
		1.25,
		.82,
		1.1
	]));
	return {
		cactusGeo: mergeParts(cactusParts),
		shrubGeo: mergeParts(shrubParts),
		mesaRockGeo: mergeParts(mesaParts)
	};
}
function Station() {
	const aoTex = (0, import_react.useMemo)(() => createAoShadowTexture(), []);
	const sandTex = (0, import_react.useMemo)(() => createSandTexture(), []);
	const bumpTex = (0, import_react.useMemo)(() => createSurfaceBumpTexture(), []);
	const concreteTex = (0, import_react.useMemo)(() => createConcreteTexture(), []);
	const asphaltTex = (0, import_react.useMemo)(() => createAsphaltTexture(), []);
	const signTex = (0, import_react.useMemo)(() => createSignTexture(), []);
	const totemTex = (0, import_react.useMemo)(() => createPriceTotemTexture(), []);
	const rockTex = (0, import_react.useMemo)(() => createCanyonRockTexture(), []);
	const terrainGeo = (0, import_react.useMemo)(() => buildDesertTerrainGeo(), []);
	const padGeo = (0, import_react.useMemo)(() => buildRoundedSlab(15.2, 5.4, .055, .32, .02), []);
	const stripesGeo = (0, import_react.useMemo)(() => buildMergedRoadStripesGeo(), []);
	const { railGeo, postGeo } = (0, import_react.useMemo)(() => buildMergedGuardrailsGeo(), []);
	const { cactusGeo, shrubGeo, mesaRockGeo } = (0, import_react.useMemo)(() => buildMergedEnvironmentGeo(), []);
	const monitor = (0, import_react.useMemo)(() => paint((ctx, w, h) => {
		drawMonitor(ctx, w, h);
	}, 640, 400), []);
	const poster = (0, import_react.useMemo)(() => paint((ctx, w, h) => {
		drawPoster(ctx, w, h);
	}, 512, 680), []);
	const prop = (0, import_react.useRef)(null);
	const bar = (0, import_react.useRef)(null);
	const blades = (0, import_react.useRef)(null);
	const gateBeaconMat = (0, import_react.useRef)(null);
	const skullBtnMat = (0, import_react.useRef)(null);
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
			vis("prop-burger-extra", sim.burgers > 1);
			vis("prop-cap", sim.hold !== "cap" && sim.caps > 0);
			vis("prop-cap-extra", sim.caps > 1);
			vis("prop-taser", sim.hold !== "taser");
		}
		if (bar.current) bar.current.rotation.x = -1.25 * sim.barrier;
		if (blades.current) blades.current.rotation.x += dt * 4.2;
		if (gateBeaconMat.current) {
			const col = sim.skull ? "#ef4444" : "#22c55e";
			gateBeaconMat.current.color.set(col);
			gateBeaconMat.current.emissive.set(col);
		}
		if (skullBtnMat.current) skullBtnMat.current.emissiveIntensity = sim.skull ? 1.35 : .42;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: terrainGeo,
			receiveShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: sandTex,
				roughness: .95,
				metalness: 0
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: padGeo,
			position: [
				-.7,
				-.018,
				4.8
			],
			receiveShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: concreteTex,
				roughness: .85,
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [104, 4.1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: asphaltTex,
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
				.1,
				.024,
				.55
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [3.2, 1.5] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				map: aoTex,
				transparent: true,
				opacity: .42,
				depthWrite: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.045,
				-1.52
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				104,
				.07,
				.18
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#cbd5e1",
				roughness: .82
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				.045,
				2.52
			],
			receiveShadow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				104,
				.07,
				.18
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#cbd5e1",
				roughness: .82
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				-2.25,
				.027,
				.55
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.22, 3.4] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#e2e8f0" })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: stripesGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#eab308" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, {
			sign: signTex,
			totem: totemTex,
			bump: bumpTex,
			concrete: concreteTex,
			ao: aoTex
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canopy, { ao: aoTex }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Props, {
			root: prop,
			monitor: monitor.tex,
			poster: poster.tex,
			ao: aoTex,
			concrete: concreteTex,
			skullMatRef: skullBtnMat
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shredder, {
			blades,
			ao: aoTex
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoadsideDecor, { ao: aoTex }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				-5.4,
				0,
				-1.42
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						-Math.PI / 2,
						0,
						0
					],
					position: [
						0,
						.028,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.1, 1.1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						map: aoTex,
						transparent: true,
						depthWrite: false
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.62,
						0
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.36,
						1.24,
						.36
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#eab308",
						roughness: .42,
						metalness: .35
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.66,
						0
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.38,
						.92,
						.38
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e293b",
						roughness: .45,
						metalness: .55
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
						.028,
						3.84
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.95, .95] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						map: aoTex,
						transparent: true,
						depthWrite: false
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.56,
						3.84
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.13,
						.16,
						1.12,
						14
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e293b",
						roughness: .45,
						metalness: .55
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.94,
						3.84
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.26,
						.22,
						.22
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#eab308",
						roughness: .4
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						1.36,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.11,
						.11,
						.18,
						14
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						ref: gateBeaconMat,
						color: "#22c55e",
						emissive: "#22c55e",
						emissiveIntensity: 1.1
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
								-.34
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.24,
								.22,
								.42
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#0f172a",
								roughness: .5,
								metalness: .5
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								0,
								1.9
							],
							rotation: [
								Math.PI / 2,
								0,
								0
							],
							castShadow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.048,
								.056,
								3.82,
								10
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#dc2626",
								roughness: .35
							})]
						}),
						[
							.45,
							1.18,
							1.9,
							2.62,
							3.35
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
								.053,
								.053,
								.34,
								10
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#f8fafc",
								roughness: .3
							})]
						}, zz))
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: railGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#cbd5e1",
				roughness: .36,
				metalness: .78
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: postGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#64748b",
				roughness: .5,
				metalness: .65
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UtilityPoles, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: cactusGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#365931",
				roughness: .88
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: shrubGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#676e49",
				roughness: .95,
				flatShading: true
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: mesaRockGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: rockTex,
				roughness: .94
			})
		})
	] });
}
function Building({ sign, totem, bump, concrete, ao }) {
	const backGlowRef = (0, import_react.useRef)(null);
	const brickTex = (0, import_react.useMemo)(() => createBrickTexture(), []);
	const backWallTex = (0, import_react.useMemo)(() => createStoreBackWallTexture(), []);
	const iceTex = (0, import_react.useMemo)(() => createIceChestTexture(), []);
	const vendingTex = (0, import_react.useMemo)(() => createVendingFrontTexture(), []);
	const openNeonTex = (0, import_react.useMemo)(() => createConsoleLabelTexture("OPEN", "#0f172a", "#f87171"), []);
	const parapetGeo = (0, import_react.useMemo)(() => buildRoundedSlab(12.6, 5, .32, .26, .03), []);
	const awningGeo = (0, import_react.useMemo)(() => buildRoundedSlab(9.8, 1.18, .09, .12, .02), []);
	const stuccoShellGeo = (0, import_react.useMemo)(() => {
		return mergeParts([
			placeGeo(new BoxGeometry(12.1, 3.65, 3.15), [
				0,
				1.825,
				-.72
			]),
			placeGeo(new BoxGeometry(1.15, 3.65, 1.52), [
				-5.48,
				1.825,
				1.6
			]),
			placeGeo(new BoxGeometry(1.15, 3.65, 1.52), [
				5.48,
				1.825,
				1.6
			]),
			placeGeo(new BoxGeometry(9.8, 1.13, 1.52), [
				0,
				3.085,
				1.6
			]),
			placeGeo(new BoxGeometry(4, .84, .3), [
				-2.9,
				.42,
				2.22
			]),
			placeGeo(new BoxGeometry(4, .84, .3), [
				2.9,
				.42,
				2.22
			]),
			placeGeo(new BoxGeometry(.28, 2.52, .32), [
				-.96,
				1.26,
				2.22
			]),
			placeGeo(new BoxGeometry(.28, 2.52, .32), [
				.96,
				1.26,
				2.22
			])
		]);
	}, []);
	const storeMetalGeo = (0, import_react.useMemo)(() => {
		return mergeParts([
			placeGeo(new BoxGeometry(12.68, .07, .12), [
				0,
				4.02,
				2.52
			]),
			placeGeo(new BoxGeometry(1.65, .72, 1.25), [
				-3.4,
				4.38,
				-.4
			]),
			placeGeo(new BoxGeometry(1.2, .28, .38), [
				-2,
				4.18,
				-.4
			]),
			placeGeo(new CylinderGeometry(.06, .06, .65, 8), [
				2.8,
				4.3,
				-.6
			]),
			placeGeo(new CylinderGeometry(.14, .06, .12, 8), [
				2.8,
				4.65,
				-.6
			]),
			...[
				-4.35,
				-2.95,
				2.95,
				4.35
			].map((rx) => placeGeo(new CylinderGeometry(.015, .015, 1.05, 6), [
				rx,
				2.95,
				2.68
			], [
				-.65,
				0,
				0
			])),
			...[
				-3.1,
				0,
				3.1
			].map((lx) => placeGeo(new CylinderGeometry(.05, .16, .12, 10), [
				lx,
				2.86,
				2.55
			])),
			placeGeo(new CylinderGeometry(.24, .22, .74, 12), [
				-1.38,
				.45,
				2.75
			])
		]);
	}, []);
	const darkFramesGeo = (0, import_react.useMemo)(() => {
		const parts = [];
		for (const wx of [-2.95, 2.95]) {
			parts.push(placeGeo(new BoxGeometry(3.72, .06, .09), [
				wx,
				2.5,
				2.34
			]));
			parts.push(placeGeo(new BoxGeometry(3.72, .06, .09), [
				wx,
				.84,
				2.34
			]));
			for (const mx of [
				-1.84,
				-.62,
				.62,
				1.84
			]) parts.push(placeGeo(new BoxGeometry(.045, 1.68, .08), [
				wx + mx,
				1.67,
				2.34
			]));
		}
		parts.push(placeGeo(new BoxGeometry(1.68, .06, .09), [
			0,
			2.49,
			2.34
		]));
		parts.push(placeGeo(new BoxGeometry(.05, 2.42, .08), [
			-.82,
			1.26,
			2.34
		]));
		parts.push(placeGeo(new BoxGeometry(.05, 2.42, .08), [
			0,
			1.26,
			2.34
		]));
		parts.push(placeGeo(new BoxGeometry(.05, 2.42, .08), [
			.82,
			1.26,
			2.34
		]));
		parts.push(placeGeo(new BoxGeometry(1.64, .22, .05), [
			0,
			.19,
			2.34
		]));
		parts.push(placeGeo(new BoxGeometry(1.45, .015, .72), [
			0,
			.088,
			2.82
		]));
		parts.push(placeGeo(new BoxGeometry(5.4, 1.34, .14), [
			0,
			3.36,
			2.37
		]));
		return mergeParts(parts);
	}, []);
	useFrame(() => {
		if (backGlowRef.current) backGlowRef.current.emissiveIntensity = .58 + sim.night * .55;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			-1.4,
			0,
			-5.8
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.04,
					2.85
				],
				receiveShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					13.2,
					.08,
					1.5
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: concrete,
					roughness: .84
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
					.085,
					2.2
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [13.2, 1.2] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: ao,
					transparent: true,
					depthWrite: false
				})]
			}),
			[
				-4.2,
				-1.85,
				1.85,
				4.2
			].map((bx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					bx,
					.46,
					3.45
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.072,
					.082,
					.84,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#eab308",
					roughness: .4,
					metalness: .3
				})]
			}, bx)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						-Math.PI / 2,
						0,
						0
					],
					position: [
						0,
						.1,
						1.62
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [9.8, 1.5] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#8c7e6d",
						roughness: .55
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					rotation: [
						Math.PI / 2,
						0,
						0
					],
					position: [
						0,
						2.5,
						1.62
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [9.8, 1.5] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#fef3c7" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						1.42,
						.9
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [9.7, 2.38] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						ref: backGlowRef,
						map: backWallTex,
						emissiveMap: backWallTex,
						emissive: "#ffffff",
						emissiveIntensity: .58,
						roughness: .5
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.45,
						.52,
						1.68
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						2.1,
						.88,
						.54
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#3e3126",
						roughness: .72
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.45,
						.98,
						1.68
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						2.18,
						.05,
						.6
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#d6d3d1",
						roughness: .35
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.05,
						1.16,
						1.68
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.36,
						.3,
						.28
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e293b",
						roughness: .4
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						.95,
						1.18,
						1.68
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.62,
						.36,
						.38
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#fde68a",
						emissive: "#f59e0b",
						emissiveIntensity: .35,
						transparent: true,
						opacity: .75
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						3.1,
						.72,
						1.74
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						1.85,
						1.18,
						.42
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#292524",
						roughness: .75
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-3.85,
						2.15,
						2.22
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.92,
						.34,
						.04
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#0f172a",
						roughness: .4
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-3.85,
						2.15,
						2.245
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.84, .28] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
						map: openNeonTex,
						toneMapped: false
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: stuccoShellGeo,
				receiveShadow: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#dfd3be",
					bumpMap: bump,
					bumpScale: .015,
					roughness: .88
				})
			}),
			[-2.95, 2.95].map((wx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					wx,
					.42,
					2.375
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [3.9, .84] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: brickTex,
					roughness: .9
				})]
			}, wx)),
			[-5.95, 5.95].map((px) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					px,
					1.82,
					2.26
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.42,
					3.64,
					.32
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: brickTex,
					roughness: .88
				})]
			}, px)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: parapetGeo,
				position: [
					0,
					3.66,
					0
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#a63e22",
					roughness: .54
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: awningGeo,
				position: [
					0,
					2.58,
					2.78
				],
				rotation: [
					.16,
					0,
					0
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#1f4246",
					roughness: .42,
					metalness: .45
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: storeMetalGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#94a3b8",
					roughness: .36,
					metalness: .72
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: darkFramesGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#18181b",
					roughness: .38,
					metalness: .6
				})
			}),
			[-2.95, 2.95].map((wx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					wx,
					1.67,
					2.34
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [3.68, 1.62] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#bae6fd",
					roughness: .06,
					metalness: .75,
					transparent: true,
					opacity: .22
				})]
			}, `glass-${wx}`)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.38,
					2.34
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.6, 2.18] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#93c5fd",
					roughness: .06,
					metalness: .78,
					transparent: true,
					opacity: .28
				})]
			}),
			[-.12, .12].map((hx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					hx,
					1.12,
					2.39
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
					.015,
					.34,
					4,
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#f8fafc",
					metalness: .92,
					roughness: .14
				})]
			}, hx)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-5.12,
					.08,
					2.74
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.46,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.28,
							.92,
							.68
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#f1f5f9",
							roughness: .38
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.46,
							.344
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.2, .82] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { map: iceTex })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.96,
							-.03
						],
						rotation: [
							.26,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.26,
							.07,
							.68
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#94a3b8",
							roughness: .3,
							metalness: .75
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					5.25,
					.08,
					2.72
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.95,
						0
					],
					castShadow: true,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.92,
						1.9,
						.66
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#7f1d1d",
						roughness: .34,
						metalness: .35
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.98,
						.334
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.82, 1.72] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { map: vendingTex })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					3.36,
					2.445
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [5.2, 1.22] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: sign,
					toneMapped: false
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					7.6,
					0,
					2.2
				],
				rotation: [
					0,
					-.22,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						rotation: [
							-Math.PI / 2,
							0,
							0
						],
						position: [
							0,
							.03,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.2, 1.6] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							map: ao,
							transparent: true,
							depthWrite: false
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.18,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.7,
							.36,
							.72
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							map: concrete,
							roughness: .85
						})]
					}),
					[-.64, .64].map((px) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							px,
							2.65,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.09,
							.1,
							5.1,
							12
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#27272a",
							roughness: .38,
							metalness: .68
						})]
					}, px)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							3.35,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.38,
							2.55,
							.24
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#18181b",
							roughness: .4,
							metalness: .5
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							3.35,
							.125
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.28, 2.42] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							map: totem,
							toneMapped: false
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							3.35,
							-.125
						],
						rotation: [
							0,
							Math.PI,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.28, 2.42] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							map: totem,
							toneMapped: false
						})]
					})
				]
			})
		]
	});
}
function Canopy({ ao }) {
	const fasciaGeo = (0, import_react.useMemo)(() => buildRoundedSlab(11.6, 7.2, .34, .32, .03), []);
	const soffitGeo = (0, import_react.useMemo)(() => buildRoundedSlab(11.1, 6.7, .08, .24, .02), []);
	const { steelGeo, pierGeo, lightPanelGeo } = (0, import_react.useMemo)(() => {
		const steel = [];
		const piers = [];
		const lights = [];
		for (const bx of [
			-3.6,
			-1.2,
			1.2,
			3.6
		]) steel.push(placeGeo(new BoxGeometry(.14, .1, 6.55), [
			bx,
			3.9,
			1.32
		]));
		for (const bz of [
			-.6,
			1.32,
			3.25
		]) steel.push(placeGeo(new BoxGeometry(10.9, .08, .14), [
			0,
			3.91,
			bz
		]));
		for (const [x, z] of [
			[-5, -1.6],
			[5, -1.6],
			[-5, 4.25],
			[5, 4.25]
		]) {
			steel.push(placeGeo(new BoxGeometry(.26, 3.96, .26), [
				x,
				1.98,
				z
			]));
			steel.push(placeGeo(new BoxGeometry(.46, .18, .46), [
				x,
				3.84,
				z
			]));
			steel.push(placeGeo(new CylinderGeometry(.32, .34, .16, 14), [
				x,
				.08,
				z
			]));
			steel.push(placeGeo(new CylinderGeometry(.036, .036, 3.85, 8), [
				x + (x > 0 ? .18 : -.18),
				1.95,
				z
			]));
			piers.push(placeGeo(new CylinderGeometry(.26, .3, .72, 14), [
				x,
				.36,
				z
			]));
		}
		steel.push(placeGeo(new CylinderGeometry(.008, .008, .38, 6), [
			2.6,
			3.74,
			.5
		]));
		steel.push(placeGeo(new CylinderGeometry(.008, .008, .38, 6), [
			4.2,
			3.74,
			.5
		]));
		piers.push(placeGeo(new CylinderGeometry(.045, .045, 1.85, 10), [
			3.4,
			3.54,
			.5
		], [
			0,
			0,
			Math.PI / 2
		]));
		for (const [lx, ly, lz] of [
			[
				-2.4,
				3.88,
				.36
			],
			[
				2.4,
				3.88,
				.36
			],
			[
				-2.4,
				3.88,
				2.3
			],
			[
				2.4,
				3.88,
				2.3
			]
		]) {
			steel.push(placeGeo(new BoxGeometry(1.15, .04, .46), [
				lx,
				ly,
				lz
			]));
			lights.push(placeGeo(new PlaneGeometry(1.04, .36), [
				lx,
				ly - .023,
				lz
			], [
				Math.PI / 2,
				0,
				0
			]));
		}
		return {
			steelGeo: mergeParts(steel),
			pierGeo: mergeParts(piers),
			lightPanelGeo: mergeParts(lights)
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: fasciaGeo,
			position: [
				0,
				4.02,
				1.32
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#a83d20",
				roughness: .46,
				metalness: .25
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				0,
				4.16,
				4.95
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				11.1,
				.055,
				.04
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#fef3c7",
				emissive: "#f59e0b",
				emissiveIntensity: 1.15
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: soffitGeo,
			position: [
				0,
				3.94,
				1.32
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#e2dad0",
				roughness: .72,
				metalness: .12
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: steelGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#272c35",
				roughness: .4,
				metalness: .68
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: pierGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#eab308",
				roughness: .5
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: lightPanelGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#fffbeb",
				emissive: "#fde68a",
				emissiveIntensity: 1.25
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				4.82,
				1.25,
				4.25
			],
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.075,
					.075,
					.42,
					12
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#dc2626",
					roughness: .3,
					metalness: .35
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.22,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
						.075,
						10,
						8
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#dc2626",
						roughness: .3,
						metalness: .35
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						0,
						.29,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.06,
						.06,
						.08
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#18181b",
						roughness: .5
					})]
				})
			]
		}),
		[
			[-5, -1.6],
			[5, -1.6],
			[-5, 4.25],
			[5, 4.25]
		].map(([x, z]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				x,
				.028,
				z
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.35, 1.35] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				map: ao,
				transparent: true,
				depthWrite: false
			})]
		}, `${x}-${z}`))
	] });
}
function Props({ root, monitor, poster, ao, concrete, skullMatRef }) {
	const pg = (0, import_react.useMemo)(() => getPropGeos(), []);
	const consoleBaseGeo = (0, import_react.useMemo)(() => buildRoundedSlab(1.22, 1.04, .92, .14, .025), []);
	const consoleTopGeo = (0, import_react.useMemo)(() => buildRoundedSlab(1.3, 1.12, .065, .16, .02), []);
	const monitorCaseGeo = (0, import_react.useMemo)(() => buildRoundedSlab(1.02, .68, .045, .05, .015), []);
	const pumpFaceTex = (0, import_react.useMemo)(() => createPumpFaceTexture(), []);
	const pumpTopperTex = (0, import_react.useMemo)(() => createPumpTopperTexture(), []);
	const spongeTex = (0, import_react.useMemo)(() => createSpongeTexture(), []);
	const bunTex = (0, import_react.useMemo)(() => createBunTexture(), []);
	const skullTex = (0, import_react.useMemo)(() => createConsoleLabelTexture("!", "#dc2626"), []);
	const goTex = (0, import_react.useMemo)(() => createConsoleLabelTexture("GO", "#16a34a"), []);
	const goldBtnTex = (0, import_react.useMemo)(() => createConsoleLabelTexture("$", "#15803d", "#fef08a"), []);
	const hoseGeo = (0, import_react.useMemo)(() => {
		const curve = new CatmullRomCurve3([
			new Vector3(-.36, 1.62, .06),
			new Vector3(-.52, 1.12, .16),
			new Vector3(-.46, .56, .1),
			new Vector3(-.33, 1.12, -.02)
		]);
		return new TubeGeometry(curve, 18, .024, 8, false);
	}, []);
	const evCableGeo = (0, import_react.useMemo)(() => {
		const curve = new CatmullRomCurve3([
			new Vector3(-.28, 1.48, .06),
			new Vector3(-.44, .95, .14),
			new Vector3(-.38, .48, .06),
			new Vector3(-.26, 1.1, -.02)
		]);
		return new TubeGeometry(curve, 18, .026, 8, false);
	}, []);
	const islandGeo = (0, import_react.useMemo)(() => buildRoundedSlab(2.85, 1.06, .13, .28, .02), []);
	const uBollardGeo = (0, import_react.useMemo)(() => {
		const parts = [placeGeo(new BoxGeometry(2.35, .1, .05), [
			0,
			.05,
			.52
		]), placeGeo(new BoxGeometry(2.35, .1, .05), [
			0,
			.05,
			-.52
		])];
		for (const bx of [-1.26, 1.26]) {
			parts.push(placeGeo(new CylinderGeometry(.042, .042, .84, 10), [
				bx,
				.54,
				-.24
			]));
			parts.push(placeGeo(new CylinderGeometry(.042, .042, .84, 10), [
				bx,
				.54,
				.24
			]));
			parts.push(placeGeo(new TorusGeometry(.24, .042, 8, 14, Math.PI), [
				bx,
				.96,
				0
			], [
				0,
				Math.PI / 2,
				0
			]));
		}
		return mergeParts(parts);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: root,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-2.32,
					0,
					3.46
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						rotation: [
							-Math.PI / 2,
							0,
							0
						],
						position: [
							0,
							.026,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.95, 1.8] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							map: ao,
							transparent: true,
							depthWrite: false
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: consoleBaseGeo,
						castShadow: true,
						receiveShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#27303f",
							roughness: .48,
							metalness: .45
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
							color: "#141b26",
							roughness: .32,
							metalness: .55
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							-.08,
							1,
							.24
						],
						rotation: [
							0,
							.95,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								0,
								.15,
								-.1
							],
							rotation: [
								.18,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
								.04,
								.068,
								.32,
								12
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#475569",
								metalness: .72,
								roughness: .28
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
							position: [
								0,
								.38,
								0
							],
							rotation: [
								-.2,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: monitorCaseGeo,
								position: [
									0,
									0,
									-.065
								],
								rotation: [
									Math.PI / 2,
									0,
									0
								],
								castShadow: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#0f172a",
									roughness: .3,
									metalness: .6
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									0,
									.018
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.94, .6] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
									map: monitor,
									toneMapped: false
								})]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-2.96,
					0,
					4.28
				],
				rotation: [
					0,
					.88,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						rotation: [
							-Math.PI / 2,
							0,
							0
						],
						position: [
							0,
							.026,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.85, .85] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							map: ao,
							transparent: true,
							depthWrite: false
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.62,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.032,
							.042,
							1.24,
							10
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#334155",
							roughness: .38,
							metalness: .7
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.04,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.2,
							.22,
							.06,
							14
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#1e293b",
							roughness: .45,
							metalness: .6
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							0,
							1.32,
							.04
						],
						rotation: [
							-.28,
							0,
							0
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									0,
									-.018
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.48,
									.62,
									.028
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#44403c",
									roughness: .65,
									metalness: .3
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.29,
									.01
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.16,
									.045,
									.035
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#e2e8f0",
									roughness: .2,
									metalness: .9
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									-.01,
									.002
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.42, .56] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
									map: poster,
									toneMapped: false
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "prop-gold",
				position: [
					-1.98,
					1.02,
					3.42
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.34,
						.065,
						.34
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e293b",
						roughness: .35,
						metalness: .65
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.038,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.135,
							.15,
							.045,
							18
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#eab308",
							emissive: "#d97706",
							emissiveIntensity: .35,
							roughness: .22,
							metalness: .72
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.063,
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
					-2.22,
					1.02,
					3.12
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.145,
						.165,
						.06,
						18
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#eab308",
						roughness: .38,
						metalness: .35
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.045,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.108,
							.118,
							.055,
							18
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							ref: skullMatRef,
							color: "#dc2626",
							emissive: "#ef4444",
							emissiveIntensity: .42
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.075,
							0
						],
						rotation: [
							-Math.PI / 2,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.095, 18] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { map: skullTex })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-2.56,
					1.02,
					3.32
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
						.145,
						.165,
						.06,
						18
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#334155",
						roughness: .38,
						metalness: .55
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.045,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.108,
							.118,
							.055,
							18
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#16a34a",
							emissive: "#22c55e",
							emissiveIntensity: .5
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.075,
							0
						],
						rotation: [
							-Math.PI / 2,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.095, 18] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { map: goTex })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-3.82,
					0,
					4.96
				],
				rotation: [
					0,
					2.52,
					0
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						rotation: [
							-Math.PI / 2,
							0,
							0
						],
						position: [
							0,
							.026,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.1, 1.4] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							map: ao,
							transparent: true,
							depthWrite: false
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.08,
							-.34
						],
						castShadow: true,
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.44,
							2.16,
							.1
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#1f242d",
							roughness: .48,
							metalness: .48
						})]
					}),
					[-.68, .68].map((sx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							sx,
							1.08,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.08,
							2.16,
							.76
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#2e3543",
							roughness: .42,
							metalness: .52
						})]
					}, sx)),
					[
						.08,
						.88,
						1.34,
						2.08
					].map((sy) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							sy,
							0
						],
						castShadow: true,
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							1.38,
							.055,
							.76
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#475569",
							roughness: .36,
							metalness: .58
						})]
					}, sy)),
					[1.3, 2.02].map((ly) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							ly,
							.12
						],
						rotation: [
							0,
							0,
							Math.PI / 2
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.018,
							.018,
							1.22,
							8
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#fef3c7",
							emissive: "#fde68a",
							emissiveIntensity: 1.1
						})]
					}, ly)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							.68,
							1.08,
							.38
						],
						rotation: [
							0,
							1.18,
							0
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									-.34,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.68,
									1.96,
									.032
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#bae6fd",
									roughness: .08,
									metalness: .35,
									transparent: true,
									opacity: .3
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									-.66,
									0,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.04,
									1.98,
									.045
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#334155",
									roughness: .35,
									metalness: .7
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									-.6,
									0,
									.036
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("capsuleGeometry", { args: [
									.015,
									.22,
									4,
									8
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#f1f5f9",
									metalness: .9,
									roughness: .18
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				name: "prop-burger",
				position: [
					-3.49,
					1.39,
					5.06
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BurgerProp, { bunTex })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				name: "prop-burger-extra",
				position: [
					-3.72,
					1.39,
					4.92
				],
				scale: .9,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BurgerProp, { bunTex })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				name: "prop-cap",
				position: [
					-4.02,
					1.39,
					4.71
				],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GasCapProp, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
				name: "prop-cap-extra",
				position: [
					-4.19,
					1.39,
					4.58
				],
				scale: .92,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GasCapProp, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					-3.49,
					.91,
					5.06
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.1,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
							.155,
							.12,
							.2,
							14
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#1d4ed8",
							roughness: .38
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.19,
							0
						],
						rotation: [
							.45,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("torusGeometry", { args: [
							.16,
							.007,
							6,
							14,
							Math.PI
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e2e8f0",
							metalness: .85,
							roughness: .2
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.18,
							0
						],
						rotation: [
							-Math.PI / 2,
							0,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.142, 14] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e0f2fe",
							roughness: .18
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "prop-sponge",
				position: [
					-3.49,
					1.11,
					5.06
				],
				rotation: [
					0,
					.35,
					0
				],
				scale: 1.12,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: pg.spongeYellowGeo,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						map: spongeTex,
						roughness: .92
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: pg.spongeGreenGeo,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#15803d",
						roughness: .95
					})
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
					-1.15,
					Math.PI / 2
				],
				scale: 1.15,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: pg.taserDarkGeo,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#18181b",
							roughness: .68
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: pg.taserYellowGeo,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#eab308",
							roughness: .36
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: pg.taserArcGeo,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#38bdf8",
							emissive: "#0ea5e9",
							emissiveIntensity: 1.1
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					3.2,
					0,
					2.82
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						rotation: [
							-Math.PI / 2,
							0,
							0
						],
						position: [
							0,
							.026,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [3.5, 1.75] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							map: ao,
							transparent: true,
							depthWrite: false
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: islandGeo,
						position: [
							0,
							-.01,
							0
						],
						receiveShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							map: concrete,
							roughness: .78
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: uBollardGeo,
						castShadow: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#eab308",
							roughness: .38,
							metalness: .4
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							.05,
							.12,
							-.22
						],
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.36,
									0
								],
								castShadow: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.28,
									.72,
									.24
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#1e3a8a",
									roughness: .5
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.82,
									0
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.3,
									.22,
									.22
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#1e293b",
									roughness: .45
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.74,
									.115
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.18, .06] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#f8fafc" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									.16,
									.58,
									0
								],
								rotation: [
									0,
									0,
									-.18
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
									.01,
									.01,
									.44,
									6
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#a16207",
									roughness: .8
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									.2,
									.78,
									0
								],
								rotation: [
									0,
									0,
									-.18
								],
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
									.03,
									.03,
									.18
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
									color: "#09090b",
									roughness: .6
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					2.48,
					.12,
					2.82
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.38,
							0
						],
						castShadow: true,
						receiveShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.76,
							.76,
							.48
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#1f242d",
							roughness: .42,
							metalness: .48
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.38,
							.245
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.66, .64] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#b9381e",
							roughness: .34,
							metalness: .35
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.38,
							-.245
						],
						rotation: [
							0,
							Math.PI,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.66, .64] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#b9381e",
							roughness: .34,
							metalness: .35
						})]
					}),
					[-.35, .35].map((cx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							cx,
							1.04,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.09,
							2.08,
							.44
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#cbd5e1",
							roughness: .24,
							metalness: .82
						})]
					}, cx)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.24,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.62,
							.78,
							.4
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#18181b",
							roughness: .38,
							metalness: .5
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.24,
							.205
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.54, .68] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							map: pumpFaceTex,
							toneMapped: false
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.24,
							-.205
						],
						rotation: [
							0,
							Math.PI,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.54, .68] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							map: pumpFaceTex,
							toneMapped: false
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.94,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.88,
							.32,
							.52
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#b9381e",
							roughness: .32,
							metalness: .3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.94,
							.265
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.8, .22] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							map: pumpTopperTex,
							toneMapped: false
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.94,
							-.265
						],
						rotation: [
							0,
							Math.PI,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.8, .22] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
							map: pumpTopperTex,
							toneMapped: false
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.4,
							1.22,
							0
						],
						rotation: [
							0,
							-Math.PI / 2,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.3, .85] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#18181b",
							roughness: .55
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							-.41,
							1.12,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.08,
							.28,
							.18
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#09090b",
							roughness: .6
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: hoseGeo,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#141417",
							roughness: .72
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "prop-nozzle",
				position: [
					2.08,
					1.24,
					2.8
				],
				rotation: [
					.95,
					1.57,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: pg.nozzleMetalGeo,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#d8e0ea",
						roughness: .22,
						metalness: .85
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: pg.nozzleBootGeo,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: GRADES.find((g) => g.id === sim.grade)?.color ?? "#f59e0b",
						roughness: .34
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				position: [
					3.92,
					.12,
					2.82
				],
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							.36,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.68,
							.72,
							.42
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#18181b",
							roughness: .38,
							metalness: .55
						})]
					}),
					[-.27, .27].map((ax) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						position: [
							ax,
							1.28,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							castShadow: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.12,
								1.4,
								.38
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#e2e8f0",
								roughness: .24,
								metalness: .68
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
							position: [
								ax > 0 ? -.062 : .062,
								0,
								0
							],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
								.015,
								1.28,
								.18
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
								color: "#38bdf8",
								emissive: "#0ea5e9",
								emissiveIntensity: 1.25
							})]
						})]
					}, ax)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.98,
							0
						],
						castShadow: true,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.68,
							.16,
							.4
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#e2e8f0",
							roughness: .24,
							metalness: .68
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.18,
							0
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.44,
							.36,
							.32
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0f172a",
							roughness: .3,
							metalness: .5
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
						position: [
							0,
							1.18,
							.165
						],
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.34, .24] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#0284c7",
							emissive: "#38bdf8",
							emissiveIntensity: .75
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: evCableGeo,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
							color: "#141417",
							roughness: .72
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				name: "prop-charger",
				position: [
					3.6,
					1.22,
					2.8
				],
				rotation: [
					.95,
					1.57,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: pg.chargerDarkGeo,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#1e293b",
						roughness: .36,
						metalness: .35
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: pg.chargerCyanGeo,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
						color: "#38bdf8",
						emissive: "#0ea5e9",
						emissiveIntensity: 1.1
					})
				})]
			})
		]
	});
}
function BurgerProp({ bunTex }) {
	const pg = (0, import_react.useMemo)(() => getPropGeos(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: pg.burgerBasketGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#dc2626",
				roughness: .48
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: pg.burgerBunAndFriesGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				map: bunTex,
				roughness: .68
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: pg.burgerPattyGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#5c2810",
				roughness: .88
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: pg.burgerCheeseGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#f59e0b",
				roughness: .42
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: pg.burgerLettuceGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#65a30d",
				roughness: .78
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: pg.burgerTomatoGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#dc2626",
				roughness: .35
			})
		})
	] });
}
function GasCapProp() {
	const pg = (0, import_react.useMemo)(() => getPropGeos(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: pg.capDarkGeo,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#18181b",
			roughness: .68
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: pg.capRedGeo,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
			color: "#dc2626",
			roughness: .3,
			metalness: .2
		})
	})] });
}
function Shredder({ blades, ao }) {
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
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				position: [
					0,
					.026,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.95, 1.95] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: ao,
					transparent: true,
					depthWrite: false
				})]
			}),
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
					18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: "#374440",
					roughness: .5,
					metalness: .48
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.34,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.625,
					.635,
					.22,
					18
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					map: hazardTex,
					roughness: .48
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
					roughness: .36,
					metalness: .65
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
					roughness: .38,
					metalness: .6
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
						metalness: .7,
						roughness: .28
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
						roughness: .22,
						metalness: .85
					})]
				}, x))]
			})
		]
	});
}
function RoadsideDecor({ ao }) {
	const { tiresGeo, ringsGeo } = (0, import_react.useMemo)(() => {
		const tires = [
			.1,
			.28,
			.46
		].map((yy, i) => placeGeo(new TorusGeometry(.24, .09, 8, 16), [
			5.75 + i * .03,
			yy,
			2.25
		], [
			Math.PI / 2,
			0,
			0
		]));
		const rings = [];
		for (const [x, z] of [[5.55, 3.65], [6.08, 4.15]]) {
			rings.push(placeGeo(new TorusGeometry(.255, .015, 6, 14), [
				x,
				.28,
				z
			], [
				Math.PI / 2,
				0,
				0
			]));
			rings.push(placeGeo(new TorusGeometry(.255, .015, 6, 14), [
				x,
				.6,
				z
			], [
				Math.PI / 2,
				0,
				0
			]));
		}
		return {
			tiresGeo: mergeParts(tires),
			ringsGeo: mergeParts(rings)
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		[[
			5.55,
			3.65,
			"#b94827"
		], [
			6.08,
			4.15,
			"#1f4246"
		]].map(([x, z, col], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				Number(x),
				0,
				Number(z)
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				rotation: [
					-Math.PI / 2,
					0,
					0
				],
				position: [
					0,
					.025,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.95, .95] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: ao,
					transparent: true,
					depthWrite: false
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					.44,
					0
				],
				castShadow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.25,
					.25,
					.88,
					14
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
					color: String(col),
					roughness: .44,
					metalness: .45
				})]
			})]
		}, i)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: ringsGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#18181b",
				roughness: .55
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			position: [
				5.75,
				.025,
				2.25
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.05, 1.05] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				map: ao,
				transparent: true,
				depthWrite: false
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: tiresGeo,
			castShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#18181b",
				roughness: .86
			})
		})
	] });
}
function UtilityPoles() {
	const { woodGeo, insulatorGeo, wireGeo } = (0, import_react.useMemo)(() => {
		const wood = [];
		const ins = [];
		for (const [idx, x] of [
			-20,
			-7.5,
			8.5,
			21
		].entries()) {
			wood.push(placeGeo(new CylinderGeometry(.09, .135, 5.8, 10), [
				x,
				2.9,
				-2.55
			]));
			wood.push(placeGeo(new BoxGeometry(.09, 1.5, .09), [
				x,
				5.38,
				-2.55
			], [
				Math.PI / 2,
				0,
				0
			]));
			for (const iz of [
				-.55,
				0,
				.55
			]) ins.push(placeGeo(new CylinderGeometry(.03, .04, .11, 6), [
				x,
				5.48,
				-2.55 + iz
			]));
			if (idx === 2) ins.push(placeGeo(new CylinderGeometry(.16, .16, .58, 12), [
				x + .24,
				4.45,
				-2.55
			]));
		}
		const w1 = new TubeGeometry(new CatmullRomCurve3([
			new Vector3(-20, 5.45, -2.85),
			new Vector3(-13.75, 4.95, -2.85),
			new Vector3(-7.5, 5.45, -2.85),
			new Vector3(.5, 4.92, -2.85),
			new Vector3(8.5, 5.45, -2.85),
			new Vector3(14.75, 4.95, -2.85),
			new Vector3(21, 5.45, -2.85)
		]), 32, .015, 5, false);
		const w2 = new TubeGeometry(new CatmullRomCurve3([
			new Vector3(-20, 5.45, -2.25),
			new Vector3(-13.75, 4.95, -2.25),
			new Vector3(-7.5, 5.45, -2.25),
			new Vector3(.5, 4.92, -2.25),
			new Vector3(8.5, 5.45, -2.25),
			new Vector3(14.75, 4.95, -2.25),
			new Vector3(21, 5.45, -2.25)
		]), 32, .015, 5, false);
		return {
			woodGeo: mergeParts(wood),
			insulatorGeo: mergeParts(ins),
			wireGeo: mergeParts([w1, w2])
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: woodGeo,
			castShadow: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#543d2d",
				roughness: .92
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: insulatorGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshStandardMaterial", {
				color: "#94a3b8",
				roughness: .35,
				metalness: .5
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: wireGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#18181b" })
		})
	] });
}
var SKY_VERT = `
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
var SKY_FRAG = `
  varying vec3 vDir;
  uniform sampler2D uSkyTex;
  uniform float uNight;
  uniform float uTime;
  uniform vec3 uSunDir;

  void main() {
    vec3 d = normalize(vDir);
    float u = atan(d.z, d.x) * 0.15915494 + 0.5 + uTime * 0.0018;
    float v = clamp(0.5 + d.y * 0.5, 0.01, 0.99);
    vec3 col = texture2D(uSkyTex, vec2(u, v)).rgb;

    float duskAmt = smoothstep(0.0, 0.45, uNight) * (1.0 - smoothstep(0.45, 0.95, uNight));
    float darkAmt = smoothstep(0.35, 1.0, uNight);

    vec3 duskTint = mix(vec3(1.15, 0.62, 0.36), vec3(0.55, 0.42, 0.68), clamp(d.y * 1.8, 0.0, 1.0));
    col = mix(col, col * duskTint * 1.18, duskAmt);
    col = mix(col, col * vec3(0.05, 0.08, 0.17), darkAmt);

    float sunDot = max(dot(d, uSunDir), 0.0);
    float sunVis = 1.0 - darkAmt;
    col += vec3(1.0, 0.8, 0.5) * (sunDot * sunDot * sunDot * sunDot) * 0.22 * sunVis;
    col += vec3(1.0, 0.96, 0.84) * smoothstep(0.998, 0.9995, sunDot) * 1.35 * sunVis;

    gl_FragColor = vec4(col, 1.0);
  }
`;
function Scene() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rig, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lights, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkyDome, {}),
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
	const fogCol = (0, import_react.useMemo)(() => new Color("#dfc9ae"), []);
	const dayFog = (0, import_react.useMemo)(() => new Color("#dfc9ae"), []);
	const duskFog = (0, import_react.useMemo)(() => new Color("#dc8b5e"), []);
	const nightFog = (0, import_react.useMemo)(() => new Color("#151b2e"), []);
	(0, import_react.useEffect)(() => {
		scene.fog = new Fog("#dfc9ae", 34, 114);
		scene.environment = null;
	}, [scene]);
	useFrame((_, dt) => {
		tick(Math.min(.05, dt));
		const n = sim.night;
		if (n < .45) fogCol.copy(dayFog).lerp(duskFog, n / .45);
		else fogCol.copy(duskFog).lerp(nightFog, (n - .45) / .55);
		const fog = scene.fog;
		if (fog && "color" in fog) {
			fog.color.copy(fogCol);
			if ("far" in fog) fog.far = 114 - n * 38;
		}
		window.__perfStats = {
			calls: gl.info.render.calls,
			triangles: gl.info.render.triangles,
			geometries: gl.info.memory.geometries,
			textures: gl.info.memory.textures
		};
		if (sim.phase === "title") {
			const a = sim.orbit;
			camera.position.set(Math.sin(a) * 1.6 - .6, 2.45, 7.8 + Math.cos(a) * .65);
			camera.lookAt(-.3, 1.15, 1.1);
			return;
		}
		const bob = Math.sin(sim.clock * 9) * Math.min(.028, sim.speed * .0065);
		camera.position.set(sim.player.x, 1.58 + bob, sim.player.z);
		camera.rotation.order = "YXZ";
		camera.rotation.y = sim.player.yaw;
		camera.rotation.x = sim.player.pitch;
		camera.rotation.z = 0;
	});
	return null;
}
function SkyDome() {
	const meshRef = (0, import_react.useRef)(null);
	const skyTex = (0, import_react.useMemo)(() => createSkyPanoramaTexture(), []);
	const mat = (0, import_react.useMemo)(() => new ShaderMaterial({
		vertexShader: SKY_VERT,
		fragmentShader: SKY_FRAG,
		side: 1,
		depthWrite: false,
		uniforms: {
			uSkyTex: { value: skyTex },
			uNight: { value: 0 },
			uTime: { value: 0 },
			uSunDir: { value: new Vector3(.55, .42, .45).normalize() }
		}
	}), [skyTex]);
	useFrame((state) => {
		mat.uniforms.uNight.value = sim.night;
		mat.uniforms.uTime.value = sim.clock;
		if (meshRef.current) meshRef.current.position.copy(state.camera.position);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		ref: meshRef,
		material: mat,
		frustumCulled: false,
		renderOrder: -10,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			142,
			20,
			14
		] })
	});
}
function Lights() {
	const sun = (0, import_react.useRef)(null);
	const amb = (0, import_react.useRef)(null);
	const lamp = (0, import_react.useRef)(null);
	useFrame(() => {
		const n = sim.night;
		if (sun.current) {
			sun.current.intensity = 2.25 * (1 - n * .82);
			sun.current.color.set(n > .2 ? "#ffbe7b" : "#fff4e2");
		}
		if (amb.current) amb.current.intensity = .52 - n * .24;
		if (lamp.current) {
			lamp.current.visible = n > .04;
			if (n > .04) lamp.current.intensity = n * 5.2;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#d8ecff",
			"#b5895a",
			.94
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
			ref: amb,
			intensity: .52
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			ref: sun,
			position: [
				16,
				21,
				14
			],
			intensity: 2.25,
			color: "#fff4e2",
			castShadow: true,
			"shadow-mapSize-width": 512,
			"shadow-mapSize-height": 512,
			"shadow-camera-far": 44,
			"shadow-camera-left": -9.5,
			"shadow-camera-right": 9.5,
			"shadow-camera-top": 9.5,
			"shadow-camera-bottom": -9.5,
			"shadow-bias": -8e-4
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pointLight", {
			ref: lamp,
			visible: false,
			position: [
				0,
				3.7,
				1.8
			],
			distance: 20,
			decay: 2,
			intensity: 0,
			color: "#ffdfa8"
		})
	] });
}
function Home() {
	const [on, setOn] = (0, import_react.useState)(false);
	const [mobile, setMobile] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMobile(isCoarse());
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
			dpr: mobile ? [1, 1.35] : [1, 1.2],
			camera: {
				fov: 64,
				near: .08,
				far: 170,
				position: [
					8,
					5,
					12
				]
			},
			gl: {
				antialias: !mobile,
				powerPreference: "high-performance",
				stencil: false,
				toneMapping: 4,
				toneMappingExposure: 1.02
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
