import { i as __toESM } from "../_runtime.mjs";
import { A as Vector3, C as RepeatWrapping, D as TorusGeometry, E as SphereGeometry, M as require_jsx_runtime, N as require_react, O as TubeGeometry, S as Quaternion, T as Shape, _ as Fog, a as BufferAttribute, b as Matrix4, c as CapsuleGeometry, d as Color, f as ConeGeometry, g as ExtrudeGeometry, h as Euler, i as BoxGeometry, k as Vector2, l as CatmullRomCurve3, m as DodecahedronGeometry, n as useFrame, p as CylinderGeometry, r as useThree, s as CanvasTexture, t as Canvas, u as CircleGeometry, v as LatheGeometry, w as SRGBColorSpace, x as PlaneGeometry, y as LinearFilter } from "../_libs/@react-three/fiber+[...].mjs";
import { n as mergeVertices, t as mergeGeometries } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BWRqQlXg.js
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
var hasGamepad = false;
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
	if (!hasGamepad) return;
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
	const onPadConnect = () => {
		hasGamepad = true;
	};
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
		lookId = null;
	};
	const move = (e) => {
		if (document.pointerLockElement) {
			if (Math.abs(e.movementX) > 280 || Math.abs(e.movementY) > 280) return;
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
	window.addEventListener("gamepadconnected", onPadConnect);
	window.addEventListener("keydown", down);
	window.addEventListener("keyup", up);
	window.addEventListener("blur", blur);
	window.addEventListener("mousemove", move, { passive: true });
	window.addEventListener("mousedown", mouseDown, { passive: true });
	window.addEventListener("mouseup", mouseUp, { passive: true });
	window.addEventListener("contextmenu", ctxMenu);
	window.addEventListener("wheel", wheel, { passive: false });
	window.addEventListener("visibilitychange", vis);
	window.addEventListener("pointerdown", pdown, { passive: true });
	window.addEventListener("pointermove", pmove, { passive: true });
	window.addEventListener("pointerup", pup, { passive: true });
	window.addEventListener("pointercancel", pup, { passive: true });
	return () => {
		window.removeEventListener("gamepadconnected", onPadConnect);
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
var noiseBuf = null;
var volume = .7;
function ensure() {
	if (ctx) return;
	ctx = new (window.AudioContext || window.webkitAudioContext)({ latencyHint: "interactive" });
	master = ctx.createGain();
	sfxBus = ctx.createGain();
	master.gain.value = volume * volume;
	sfxBus.connect(master);
	master.connect(ctx.destination);
	const len = Math.max(1, Math.floor(ctx.sampleRate * .32));
	noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
	const data = noiseBuf.getChannelData(0);
	for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
}
function isAudioRunning() {
	return Boolean(ctx && ctx.state === "running");
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
	if (!ctx || !sfxBus || !noiseBuf) return;
	const t = ctx.currentTime;
	const playDur = Math.min(dur, noiseBuf.duration - .01);
	const src = ctx.createBufferSource();
	src.buffer = noiseBuf;
	const filter = ctx.createBiquadFilter();
	filter.type = "lowpass";
	filter.frequency.value = freq;
	const g = ctx.createGain();
	g.gain.setValueAtTime(Math.max(2e-4, vol), t);
	g.gain.exponentialRampToValueAtTime(1e-4, t + playDur);
	src.connect(filter);
	filter.connect(g);
	g.connect(sfxBus);
	src.start(t, 0, playDur + .01);
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
	usePulse: 0,
	quality: "fast",
	fps: 60,
	softwareGpu: false
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
	const dirtyFlag = Boolean(c && c.dirty > .2 && c.wash < .95);
	return `${sim.phase}|${sim.money}|${sim.stars.toFixed(1)}|${sim.day}|${sim.night > .55}|${sim.objective}|${sim.prompt}|${sim.aimKind}|${sim.cashAmt}|${sim.toastT > 0 ? sim.toast : ""}|${sim.hold}|${sim.grade}|${sim.posterUp}|${sim.skull}|${sim.burgers}|${sim.caps}|${sim.quality}|${c?.id ?? -1}|${c?.phase ?? ""}|${c?.caught}|${c?.asleep}|${c?.served}|${dirtyFlag}`;
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
var eyeX = 0;
var eyeY = 1.56;
var eyeZ = 0;
var fwdX = 0;
var fwdY = 0;
var fwdZ = -1;
var bestKind = null;
var bestId;
var bestScore = Infinity;
var bestX = 0;
var bestY = 0;
var bestZ = 0;
var aimHolder = { kind: "nozzle" };
function testSpot(kind, px, py, pz, max, id) {
	const dx = px - eyeX;
	const dy = py - eyeY;
	const dz = pz - eyeZ;
	const dist = Math.hypot(dx, dy, dz);
	if (dist > max || dist < .001) return;
	const dot = (dx * fwdX + dy * fwdY + dz * fwdZ) / dist;
	if (dot < .68) return;
	const score = dist + (1 - dot) * 1.5 + aimBias(kind);
	if (score < bestScore) {
		bestScore = score;
		bestKind = kind;
		bestId = id;
		bestX = px;
		bestY = py;
		bestZ = pz;
	}
}
function testCarSpot(c, co, si, kind, lx, ly, lz, max) {
	testSpot(kind, c.x + lx * co + lz * si, ly, c.z - lx * si + lz * co, max);
}
function refreshAim() {
	eyeX = sim.player.x;
	eyeY = 1.56;
	eyeZ = sim.player.z;
	const cy = Math.cos(sim.player.pitch);
	fwdX = -Math.sin(sim.player.yaw) * cy;
	fwdY = Math.sin(sim.player.pitch);
	fwdZ = -Math.cos(sim.player.yaw) * cy;
	bestKind = null;
	bestId = void 0;
	bestScore = Infinity;
	if (sim.hold !== "nozzle") testSpot("nozzle", SPOT.nozzle.x, SPOT.nozzle.y, SPOT.nozzle.z, SPOT.nozzle.max);
	if (sim.hold !== "charger") testSpot("charger", SPOT.charger.x, SPOT.charger.y, SPOT.charger.z, SPOT.charger.max);
	if (sim.hold !== "sponge") testSpot("sponge", SPOT.sponge.x, SPOT.sponge.y, SPOT.sponge.z, SPOT.sponge.max);
	if (sim.burgers > 0 && sim.hold !== "burger") testSpot("burger", SPOT.burger.x, SPOT.burger.y, SPOT.burger.z, SPOT.burger.max);
	if (sim.caps > 0 && sim.hold !== "cap") testSpot("cap", SPOT.cap.x, SPOT.cap.y, SPOT.cap.z, SPOT.cap.max);
	if (sim.hold !== "taser") testSpot("taser", SPOT.taser.x, SPOT.taser.y, SPOT.taser.z, SPOT.taser.max);
	testSpot("gold", SPOT.gold.x, SPOT.gold.y, SPOT.gold.z, SPOT.gold.max);
	testSpot("skull", SPOT.skull.x, SPOT.skull.y, SPOT.skull.z, SPOT.skull.max);
	testSpot("go", SPOT.go.x, SPOT.go.y, SPOT.go.z, SPOT.go.max);
	testSpot("shred", SPOT.shred.x, SPOT.shred.y, SPOT.shred.z, SPOT.shred.max);
	if (sim.mirrorDrop) testSpot("mdrop", sim.mirrorDrop.x, .4, sim.mirrorDrop.z, 2.6);
	for (let i = 0; i < sim.bills.length; i++) {
		const b = sim.bills[i];
		testSpot("bill", b.x, b.y + .1, b.z, 2.8, b.id);
	}
	const c = sim.car;
	if (c && c.phase === "wait") {
		const th = c.yaw + Math.PI;
		const co = Math.cos(th);
		const si = Math.sin(th);
		testCarSpot(c, co, si, "window", .78, 1, .14, 3.4);
		testCarSpot(c, co, si, "fuel", .82, .68, -1, 3.7);
		testCarSpot(c, co, si, "body", .82, .78, 0, 3.5);
		if (c.mirror && sim.hold === "none") testCarSpot(c, co, si, "mirror", .86, .84, .52, 3.1);
		if (c.loose && sim.hold === "none") testCarSpot(c, co, si, "loot", -.33, .52, .04, 3.1);
	}
	if (bestKind) {
		aimHolder.kind = bestKind;
		aimHolder.id = bestId;
		aim = aimHolder;
		sim.aimKind = bestKind;
		sim.aimPos.x = bestX;
		sim.aimPos.y = bestY;
		sim.aimPos.z = bestZ;
	} else {
		aim = null;
		sim.aimKind = "";
	}
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
function toggleQuality() {
	sim.quality = sim.quality === "fast" ? "high" : "fast";
	sfx.ui();
	save();
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
		servedCount: sim.servedCount,
		quality: sim.quality
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
		if (s.quality === "fast" || s.quality === "high") sim.quality = s.quality;
	} catch {}
}
function buildSnap() {
	const w = WARRANTS[sim.warrant % WARRANTS.length];
	const c = sim.car;
	return {
		phase: sim.phase,
		quality: sim.quality,
		money: sim.money,
		stars: sim.stars.toFixed(1),
		day: sim.day,
		night: sim.night > .55,
		objective: sim.objective,
		prompt: sim.prompt,
		aimKind: sim.aimKind,
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
	if (!document.pointerLockElement) try {
		(document.body.requestPointerLock?.())?.catch?.(() => void 0);
	} catch {}
}
function onLockChange(locked) {
	sim.locked = locked;
}
function bootAudioOnGesture() {
	if (isAudioRunning()) return;
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
var RING_CIRC = 2 * Math.PI * 18;
/** Direct-DOM crosshair progress ring: 0 React re-renders while pumping fuel or washing! */
function CrosshairProgressRing() {
	const svgRef = (0, import_react.useRef)(null);
	const circleRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		let lastProg = -1;
		const loop = () => {
			const p = sim.aimProgress;
			if (Math.abs(p - lastProg) > .002) {
				lastProg = p;
				const svg = svgRef.current;
				const cir = circleRef.current;
				if (svg && cir) {
					if (p > .002) {
						svg.style.display = "block";
						cir.style.strokeDashoffset = String(RING_CIRC * (1 - p));
					} else svg.style.display = "none";
				}
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		ref: svgRef,
		style: { display: "none" },
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
			ref: circleRef,
			cx: "22",
			cy: "22",
			r: "18",
			fill: "none",
			stroke: "#f0b429",
			strokeWidth: "3.5",
			strokeLinecap: "round",
			strokeDasharray: RING_CIRC,
			strokeDashoffset: RING_CIRC
		})]
	});
}
/** Direct-DOM patience bar: updates scaleX smoothly with 0 React re-renders! */
function LivePatienceBar() {
	const barRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		let tickCount = 0;
		const loop = () => {
			tickCount = tickCount + 1 & 3;
			if (tickCount === 0 && barRef.current) {
				const c = sim.car;
				const p = c && c.phase === "wait" ? Math.max(0, Math.min(1, c.patience / c.maxPatience)) : 0;
				barRef.current.style.transform = `scaleX(${p.toFixed(3)})`;
				barRef.current.style.backgroundColor = p > .45 ? "#1f8a4c" : p > .22 ? "#f0b429" : "#d7263d";
			}
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: barRef,
			className: "h-full w-full origin-left",
			style: {
				transform: "scaleX(1)",
				backgroundColor: "#1f8a4c"
			}
		})
	});
}
/** Lightweight FPS readout updated via setInterval every 700ms without re-rendering HUD! */
function LiveFpsText({ quality }) {
	const spanRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const update = () => {
			if (spanRef.current) spanRef.current.textContent = `${sim.fps} FPS · ${quality === "fast" ? "Mượt" : "Cao"}`;
		};
		update();
		const id = window.setInterval(update, 700);
		return () => window.clearInterval(id);
	}, [quality]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref: spanRef,
		children: `${sim.fps} FPS · ${quality === "fast" ? "Mượt" : "Cao"}`
	});
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
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										"data-ui": true,
										onClick: toggleQuality,
										title: "Đổi chế độ đồ họa Mượt / Cao",
										className: "pointer-events-auto ml-auto rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-bold tracking-normal text-cream-dim hover:bg-white/20",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveFpsText, { quality: snap.quality })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 truncate font-semibold text-cream",
								children: snap.objective
							}),
							coarse && car && !car.caught && !car.served ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LivePatienceBar, {}) : null
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
							!car.caught && !car.served ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LivePatienceBar, {}) : null,
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrosshairProgressRing, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `crosshair absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${snap.aimKind ? "hot" : ""}` })]
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
							className: `flex items-center gap-1 rounded-xl font-semibold active:scale-95 ${coarse ? "min-h-9 px-2.5 py-1.5 text-xs" : "btn btn-fuel text-xs sm:text-sm"} ${active ? "bg-canopy text-white ring-2 ring-gold" : "bg-ink-soft/95 text-cream"}`,
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
			snap.phase === "pause" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { quality: snap.quality }) : null,
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
function Pause({ quality }) {
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "btn btn-fuel mt-2 w-full",
					onClick: toggleQuality,
					children: ["Đồ họa: ", quality === "fast" ? "Siêu Mượt (Tối ưu FPS)" : "Độ phân giải Cao"]
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
		className: `flex h-16 min-w-[5.25rem] items-center justify-center rounded-2xl border-2 px-4 text-sm font-bold shadow-lg active:scale-95 ${tone === "gold" ? "border-gold bg-gold text-ink ring-2 ring-gold/40" : tone === "go" ? "border-white/25 bg-go text-white" : "border-white/25 bg-ink-soft/95 text-cream"}`,
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
	const knobRef = (0, import_react.useRef)(null);
	const setAxis = (x, y) => {
		const max = 34;
		const m = Math.hypot(x, y) || 1;
		const k = Math.min(max, m);
		const nx = x / m * k;
		const ny = y / m * k;
		if (knobRef.current) knobRef.current.style.transform = `translate(calc(-50% + ${nx.toFixed(1)}px), calc(-50% + ${ny.toFixed(1)}px))`;
		input.touchX = nx / max;
		input.touchY = ny / max;
	};
	const resetKnob = () => {
		if (knobRef.current) knobRef.current.style.transform = "translate(-50%, -50%)";
		input.touchX = 0;
		input.touchY = 0;
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
			resetKnob();
		},
		onPointerCancel: (e) => {
			if (e.pointerId !== id.current) return;
			id.current = null;
			resetKnob();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: knobRef,
			className: "absolute top-1/2 left-1/2 h-10 w-10 rounded-full bg-cream/90 shadow-md",
			style: { transform: "translate(-50%, -50%)" }
		})
	});
}
var _m = new Matrix4();
var _p = new Vector3();
var _q = new Quaternion();
var _e = new Euler();
var _s = new Vector3();
var _c = new Color();
function normalizeIndexed(geo, pos, rot, scale) {
	const g = geo.index ? geo.clone() : mergeVertices(geo, 1e-4);
	if (!g.attributes.normal) g.computeVertexNormals();
	const count = g.attributes.position.count;
	if (!g.attributes.uv) g.setAttribute("uv", new BufferAttribute(new Float32Array(count * 2), 2));
	for (const key of Object.keys(g.attributes)) if (key !== "position" && key !== "normal" && key !== "uv" && key !== "color") g.deleteAttribute(key);
	if (pos || rot || scale !== void 0) {
		_p.set(pos?.[0] ?? 0, pos?.[1] ?? 0, pos?.[2] ?? 0);
		_e.set(rot?.[0] ?? 0, rot?.[1] ?? 0, rot?.[2] ?? 0);
		_q.setFromEuler(_e);
		if (typeof scale === "number") _s.set(scale, scale, scale);
		else _s.set(scale?.[0] ?? 1, scale?.[1] ?? 1, scale?.[2] ?? 1);
		_m.compose(_p, _q, _s);
		g.applyMatrix4(_m);
	}
	if (!geo.index) geo.dispose();
	else geo.dispose();
	return g;
}
function placeGeo(geo, pos, rot, scale) {
	const g = normalizeIndexed(geo, pos, rot, scale);
	if (g.attributes.color) g.deleteAttribute("color");
	return g;
}
function colorGeo(geo, hex, pos, rot, scale) {
	const g = normalizeIndexed(geo, pos, rot, scale);
	const count = g.attributes.position.count;
	_c.set(hex);
	const cols = new Float32Array(count * 3);
	const r = _c.r;
	const gr = _c.g;
	const b = _c.b;
	for (let i = 0; i < count; i++) {
		const o = i * 3;
		cols[o] = r;
		cols[o + 1] = gr;
		cols[o + 2] = b;
	}
	g.setAttribute("color", new BufferAttribute(cols, 3));
	return g;
}
function mergeParts(parts) {
	const normalized = parts.map((p) => !p.index || !p.attributes.uv ? placeGeo(p) : p);
	const merged = mergeGeometries(normalized, false);
	for (const n of normalized) n.dispose();
	if (!merged) throw new Error("Failed to merge geometries");
	return merged;
}
function mergeColoredParts(parts) {
	const merged = mergeGeometries(parts, false);
	for (const p of parts) p.dispose();
	if (!merged) throw new Error("Failed to merge colored geometries");
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
	tex.anisotropy = 1;
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
	}, 128, 128).tex;
}
function createSandTexture() {
	const p = paint((ctx, w, h) => {
		ctx.fillStyle = "#b58d5e";
		ctx.fillRect(0, 0, w, h);
		for (let i = 0; i < 32; i++) {
			const gx = Math.random() * w;
			const gy = Math.random() * h;
			const gr = 16 + Math.random() * 42;
			const g = ctx.createRadialGradient(gx, gy, 2, gx, gy, gr);
			g.addColorStop(0, i % 2 === 0 ? "rgba(138,96,54,0.22)" : "rgba(214,180,134,0.18)");
			g.addColorStop(1, "rgba(0,0,0,0)");
			ctx.fillStyle = g;
			ctx.beginPath();
			ctx.arc(gx, gy, gr, 0, Math.PI * 2);
			ctx.fill();
		}
		for (let y = 0; y < h; y += 8) {
			ctx.strokeStyle = y % 16 === 0 ? "rgba(120,82,45,0.16)" : "rgba(232,202,158,0.14)";
			ctx.lineWidth = 1.5;
			ctx.beginPath();
			ctx.moveTo(0, y);
			for (let x = 0; x <= w; x += 16) ctx.quadraticCurveTo(x + 8, y + Math.sin(x * .1 + y) * 1.6, x + 16, y);
			ctx.stroke();
		}
		for (let i = 0; i < 1800; i++) {
			ctx.fillStyle = i % 4 === 0 ? "rgba(78,54,32,0.34)" : i % 3 === 0 ? "rgba(142,102,62,0.28)" : "rgba(236,212,175,0.22)";
			ctx.fillRect(Math.random() * w, Math.random() * h, 1.8, 1.8);
		}
	}, 256, 256);
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
		for (let y = 4; y < h; y += 6) {
			ctx.strokeStyle = y % 12 === 0 ? "rgba(58,30,16,0.28)" : "rgba(235,180,135,0.16)";
			ctx.lineWidth = 1.5 + y % 2;
			ctx.beginPath();
			ctx.moveTo(0, y);
			for (let x = 0; x <= w; x += 16) ctx.lineTo(x, y + Math.sin(x * .08 + y * .3) * 1.8);
			ctx.stroke();
		}
		ctx.strokeStyle = "rgba(45,22,12,0.22)";
		ctx.lineWidth = 1.5;
		for (let x = 8; x < w; x += 16) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x + (Math.random() - .5) * 8, h);
			ctx.stroke();
		}
	}, 256, 256);
	p.tex.wrapS = RepeatWrapping;
	p.tex.wrapT = RepeatWrapping;
	p.tex.repeat.set(2, 1);
	return p.tex;
}
function createConcreteTexture() {
	const p = paint((ctx, w, h) => {
		ctx.fillStyle = "#aba498";
		ctx.fillRect(0, 0, w, h);
		for (let i = 0; i < 1400; i++) {
			ctx.fillStyle = i % 2 === 0 ? "rgba(60,56,50,0.12)" : "rgba(240,236,228,0.1)";
			ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
		}
		for (let i = 0; i < 6; i++) {
			const gx = Math.random() * w;
			const gy = Math.random() * h;
			const gr = 16 + Math.random() * 28;
			const g = ctx.createRadialGradient(gx, gy, 2, gx, gy, gr);
			g.addColorStop(0, "rgba(52,48,42,0.22)");
			g.addColorStop(1, "rgba(52,48,42,0)");
			ctx.fillStyle = g;
			ctx.beginPath();
			ctx.arc(gx, gy, gr, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.strokeStyle = "rgba(58,52,46,0.45)";
		ctx.lineWidth = 2;
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
	p.tex.repeat.set(4, 2);
	return p.tex;
}
function createAsphaltTexture() {
	const p = paint((ctx, w, h) => {
		ctx.fillStyle = "#23262d";
		ctx.fillRect(0, 0, w, h);
		for (let i = 0; i < 2200; i++) {
			ctx.fillStyle = i % 3 === 0 ? "rgba(200,206,218,0.065)" : "rgba(10,12,15,0.32)";
			ctx.fillRect(Math.random() * w, Math.random() * h, 1.5, 1.5);
		}
		ctx.fillStyle = "rgba(12,13,16,0.34)";
		ctx.fillRect(0, h * .22, w, h * .16);
		ctx.fillRect(0, h * .62, w, h * .16);
		ctx.strokeStyle = "rgba(10,11,14,0.5)";
		ctx.lineWidth = 1.5;
		for (let i = 0; i < 5; i++) {
			ctx.beginPath();
			let cx = Math.random() * w;
			let cy = Math.random() * h;
			ctx.moveTo(cx, cy);
			for (let s = 0; s < 5; s++) {
				cx += 12 + Math.random() * 16;
				cy += (Math.random() - .5) * 12;
				ctx.lineTo(cx, cy);
			}
			ctx.stroke();
		}
	}, 256, 256);
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
				ctx.fillRect(c * bw + off + 2, r * bh + 2, bw - 4, bh - 4);
			}
		}
	}, 256, 256);
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
function createOpenSignTexture() {
	return paint((ctx, w, h) => {
		ctx.fillStyle = "#090d16";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "#38bdf8";
		ctx.lineWidth = 4;
		ctx.strokeRect(4, 4, w - 8, h - 8);
		ctx.fillStyle = "#fb7185";
		ctx.font = "900 34px Impact, Arial Black, sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText("OPEN 24H", w / 2, h / 2 + 2);
	}, 192, 64).tex;
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
	ctx.save();
	ctx.scale(w / 640, h / 400);
	const vw = 640;
	const vh = 400;
	ctx.fillStyle = "#0b1120";
	ctx.fillRect(0, 0, vw, vh);
	ctx.fillStyle = "#162033";
	ctx.fillRect(16, 16, 608, 196);
	ctx.strokeStyle = "#334155";
	ctx.lineWidth = 2;
	ctx.strokeRect(16, 16, 608, 196);
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
	ctx.fillRect(16, 226, 608, 158);
	ctx.strokeRect(16, 226, 608, 158);
	ctx.fillStyle = "#f8fafc";
	ctx.font = "700 26px Arial, sans-serif";
	ctx.fillText(sim.customer ? `Khách: ${sim.customer}` : "Làn xe đang trống", 32, 266);
	ctx.fillStyle = "#94a3b8";
	ctx.font = "600 21px Arial, sans-serif";
	wrap(ctx, TIPS[sim.tipI] ?? "", 32, 304, 576, 27);
	ctx.fillStyle = "#fbbf24";
	ctx.font = "600 21px Arial, sans-serif";
	ctx.fillText(`"${sim.review}"`, 32, 368);
	ctx.restore();
}
function drawDriverFace(ctx, w, h, opts) {
	ctx.clearRect(0, 0, w, h);
	for (const cx of [w * .26, w * .74]) {
		const cg = ctx.createRadialGradient(cx, h * .58, 2, cx, h * .58, w * .16);
		cg.addColorStop(0, opts.devil ? "rgba(127,29,29,0.35)" : "rgba(194,106,82,0.26)");
		cg.addColorStop(1, "rgba(0,0,0,0)");
		ctx.fillStyle = cg;
		ctx.fillRect(0, 0, w, h);
	}
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
var sharedPosterArt = null;
function getSharedPosterArt() {
	if (!sharedPosterArt) sharedPosterArt = paint((ctx, w, h) => drawPoster(ctx, w, h), 320, 425);
	return sharedPosterArt;
}
function drawPoster(ctx, w, h) {
	ctx.save();
	ctx.scale(w / 512, h / 680);
	const vw = 512;
	const vh = 680;
	const face = WARRANTS[sim.warrant % WARRANTS.length];
	ctx.fillStyle = "#efe6d1";
	ctx.fillRect(0, 0, vw, vh);
	ctx.strokeStyle = "#a89674";
	ctx.lineWidth = 6;
	ctx.strokeRect(16, 16, 480, 648);
	ctx.fillStyle = "#e5dbc4";
	ctx.fillRect(46, 136, 420, 290);
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
		ctx.lineTo(456, yy);
		ctx.stroke();
		ctx.fillStyle = "#78716c";
		ctx.fillText(marks[i], 58, yy - 5);
	}
	ctx.fillStyle = "#991b1b";
	ctx.font = "900 72px Impact, Arial Black, sans-serif";
	ctx.textAlign = "center";
	ctx.fillText("WANTED", vw / 2, 102);
	ctx.fillStyle = face.shirt;
	ctx.beginPath();
	ctx.moveTo(vw / 2 - 118, 426);
	ctx.quadraticCurveTo(vw / 2 - 112, 338, vw / 2 - 36, 328);
	ctx.lineTo(292, 328);
	ctx.quadraticCurveTo(368, 338, 374, 426);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#f1f5f9";
	ctx.beginPath();
	ctx.moveTo(vw / 2 - 24, 330);
	ctx.lineTo(280, 330);
	ctx.lineTo(vw / 2, 368);
	ctx.closePath();
	ctx.fill();
	ctx.fillStyle = "#d19373";
	ctx.fillRect(vw / 2 - 22, 298, 44, 38);
	ctx.fillStyle = "#d99e7e";
	ctx.beginPath();
	ctx.ellipse(vw / 2 - 58, 248, 10, 18, -.1, 0, Math.PI * 2);
	ctx.ellipse(314, 248, 10, 18, .1, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#e8b393";
	ctx.beginPath();
	ctx.moveTo(vw / 2 - 56, 224);
	ctx.quadraticCurveTo(vw / 2 - 58, 178, vw / 2, 178);
	ctx.quadraticCurveTo(314, 178, 312, 224);
	ctx.quadraticCurveTo(310, 278, 284, 304);
	ctx.quadraticCurveTo(vw / 2, 318, vw / 2 - 28, 304);
	ctx.quadraticCurveTo(vw / 2 - 54, 278, vw / 2 - 56, 224);
	ctx.closePath();
	ctx.fill();
	if (!face.hat) {
		ctx.fillStyle = "#221e1d";
		ctx.beginPath();
		ctx.moveTo(vw / 2 - 58, 232);
		ctx.quadraticCurveTo(vw / 2 - 62, 168, vw / 2, 168);
		ctx.quadraticCurveTo(318, 168, 314, 232);
		ctx.quadraticCurveTo(304, 198, vw / 2, 196);
		ctx.quadraticCurveTo(vw / 2 - 48, 198, vw / 2 - 58, 232);
		ctx.fill();
	}
	const er = face.id === "thief" ? 13.5 : 10.5;
	for (const ex of [vw / 2 - 22, 278]) {
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
		ctx.moveTo(vw / 2 - 38, 218);
		ctx.lineTo(vw / 2 - 10, 228);
		ctx.moveTo(294, 218);
		ctx.lineTo(266, 228);
	} else {
		ctx.moveTo(vw / 2 - 36, 223);
		ctx.lineTo(vw / 2 - 10, 222);
		ctx.moveTo(292, 223);
		ctx.lineTo(266, 222);
	}
	ctx.stroke();
	ctx.fillStyle = "rgba(166, 102, 72, 0.38)";
	ctx.beginPath();
	ctx.moveTo(vw / 2, 238);
	ctx.lineTo(vw / 2 - 9, 268);
	ctx.lineTo(262, 270);
	ctx.closePath();
	ctx.fill();
	if (face.id === "worst") {
		ctx.fillStyle = "#ffffff";
		ctx.beginPath();
		ctx.roundRect(vw / 2 - 26, 280, 52, 16, 5);
		ctx.fill();
		ctx.strokeStyle = "#18181b";
		ctx.lineWidth = 2.5;
		ctx.stroke();
	} else {
		ctx.strokeStyle = "#6e3420";
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.moveTo(vw / 2 - 16, 289);
		ctx.quadraticCurveTo(vw / 2, 292, 272, 289);
		ctx.stroke();
	}
	if (face.hat) {
		ctx.fillStyle = face.hat;
		ctx.beginPath();
		ctx.arc(vw / 2, 206, 58, Math.PI, 0);
		ctx.fill();
		ctx.beginPath();
		ctx.ellipse(260, 205, 68, 10, 0, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.fillStyle = "#18181b";
	ctx.fillRect(vw / 2 - 90, 384, 180, 40);
	ctx.fillStyle = "#f8fafc";
	ctx.font = "700 20px monospace";
	ctx.fillText(`ID: ${face.id.toUpperCase()}`, vw / 2, 411);
	ctx.fillStyle = "#1c1917";
	ctx.font = "800 34px Arial, sans-serif";
	ctx.fillText(face.name, vw / 2, 492);
	ctx.fillStyle = "#991b1b";
	ctx.font = "800 40px Arial, sans-serif";
	ctx.fillText(`THƯỞNG $${face.bounty}`, vw / 2, 548);
	ctx.fillStyle = "#44403c";
	ctx.font = "600 22px Arial, sans-serif";
	wrap(ctx, face.line, 36, 598, 440, 28);
	ctx.textAlign = "left";
	ctx.restore();
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
		curveSegments: 10
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
		curveSegments: 10
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
		curveSegments: 8
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
	]) parts.push(placeGeo(new CylinderGeometry(.328, .328, .42, 14, 1, false, 0, Math.PI), [
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
		const dir = fx > 0 ? 1 : -1;
		parts.push(placeGeo(new CylinderGeometry(.182, .182, .04, 12), [
			dir * .778,
			.3,
			fz
		], [
			0,
			0,
			Math.PI / 2
		]));
		parts.push(placeGeo(new TorusGeometry(.335, .02, 6, 16, Math.PI), [
			fx,
			.3,
			fz
		], [
			0,
			Math.PI / 2,
			0
		]));
		parts.push(placeGeo(new BoxGeometry(.14, .14, .018), [
			dir * .7,
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
	parts.push(placeGeo(new TorusGeometry(.074, .014, 8, 16), [
		.798,
		.68,
		-1
	], [
		0,
		Math.PI / 2,
		0
	]));
	return mergeParts(parts);
}
function buildStaticCarAccentsGeo() {
	const redParts = [];
	for (const [wx, wz] of [
		[-.76, 1.14],
		[.76, 1.14],
		[-.76, -1.1],
		[.76, -1.1]
	]) {
		const dir = wx > 0 ? 1 : -1;
		redParts.push(placeGeo(new BoxGeometry(.032, .075, .05), [
			wx + dir * .044,
			.395,
			wz + .065
		]));
	}
	for (const x of [-.54, .54]) redParts.push(placeGeo(new PlaneGeometry(.34, .12), [
		x,
		.56,
		-1.875
	], [
		0,
		Math.PI,
		0
	]));
	const headParts = [-.56, .56].map((x) => placeGeo(new PlaneGeometry(.24, .11), [
		x,
		.53,
		1.86
	]));
	const amberParts = [];
	for (const x of [-.56, .56]) amberParts.push(placeGeo(new PlaneGeometry(.055, .11), [
		x + (x > 0 ? .13 : -.13),
		.53,
		1.862
	]));
	for (const x of [-.54, .54]) amberParts.push(placeGeo(new PlaneGeometry(.32, .028), [
		x,
		.518,
		-1.878
	], [
		0,
		Math.PI,
		0
	]));
	const revParts = [-.54, .54].map((x) => placeGeo(new PlaneGeometry(.09, .04), [
		x + (x > 0 ? -.11 : .11),
		.58,
		-1.879
	], [
		0,
		Math.PI,
		0
	]));
	const glassParts = [
		placeGeo(new PlaneGeometry(1.26, .7), [
			0,
			1.09,
			-1.15
		], [
			.64,
			0,
			0
		]),
		placeGeo(new PlaneGeometry(.78, .58), [
			-.695,
			1.08,
			-.58
		], [
			0,
			Math.PI / 2,
			0
		]),
		placeGeo(new PlaneGeometry(.78, .58), [
			.695,
			1.08,
			-.58
		], [
			0,
			Math.PI / 2,
			0
		]),
		placeGeo(new PlaneGeometry(.72, .58), [
			-.695,
			1.08,
			.18
		], [
			0,
			Math.PI / 2,
			0
		])
	];
	return {
		caliperTailGeo: mergeParts(redParts),
		headlightGeo: mergeParts(headParts),
		amberLightGeo: mergeParts(amberParts),
		reverseLightGeo: mergeParts(revParts),
		sideRearGlassGeo: mergeParts(glassParts)
	};
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
		for (const ex of [-.52, .52]) parts.push(placeGeo(new CylinderGeometry(.036, .04, .18, 10), [
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
	const geo = new LatheGeometry(pts, 20);
	geo.rotateZ(Math.PI / 2);
	geo.computeVertexNormals();
	return geo;
}
function buildWheelAlloyRimGeo() {
	const parts = [
		placeGeo(new TorusGeometry(.182, .02, 6, 18), [
			.062,
			0,
			0
		], [
			0,
			Math.PI / 2,
			0
		]),
		placeGeo(new CylinderGeometry(.048, .048, .028, 10), [
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
	const headLathe = new LatheGeometry(headPts, 16);
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
		placeGeo(new SphereGeometry(.128, 12, 8, 0, Math.PI * 2, 0, Math.PI * .56), [
			0,
			.214,
			-.016
		], [
			-.14,
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
		placeGeo(new SphereGeometry(.136, 12, 8, 0, Math.PI * 2, 0, Math.PI * .5), [
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
	const prevCapped = (0, import_react.useRef)(null);
	const prevBarCharge = (0, import_react.useRef)(null);
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
	const accents = (0, import_react.useMemo)(() => buildStaticCarAccentsGeo(), []);
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
				const isChg = c.job === "charge";
				if (prevBarCharge.current !== isChg) {
					prevBarCharge.current = isChg;
					bar.material.color.set(isChg ? "#38bdf8" : "#eab308");
				}
			}
		}
		const cap = capRef.current;
		if (cap) {
			cap.visible = c.capped || c.job !== "cap";
			if (prevCapped.current !== c.capped) {
				prevCapped.current = c.capped;
				cap.material.color.set(c.capped ? "#dc2626" : "#94a3b8");
			}
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
					color: look.color,
					specular: "#64748b",
					shininess: 72
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: darkGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#161920" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: seatsGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#272c36" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: chromeGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
					color: "#eef2f6",
					specular: "#ffffff",
					shininess: 92
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: accents.caliperTailGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
					color: "#dc2626",
					emissive: "#ef4444",
					emissiveIntensity: .65
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: accents.headlightGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
					color: "#fef3c7",
					emissive: "#fde047",
					emissiveIntensity: .85
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: accents.amberLightGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
					color: "#f59e0b",
					emissive: "#d97706",
					emissiveIntensity: .65
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: accents.reverseLightGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#f8fafc" })
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
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.28, .72] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
					color: "#132938",
					specular: "#94a3b8",
					shininess: 85,
					transparent: true,
					opacity: .34,
					side: 2
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: accents.sideRearGlassGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
					color: "#0c1522",
					specular: "#64748b",
					shininess: 80,
					transparent: true,
					opacity: .72,
					side: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
				ref: flamesRef,
				visible: false,
				position: [
					0,
					.85,
					1.08
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
					.34,
					.16,
					.42
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
					color: "#cbd5e1",
					specular: "#ffffff",
					shininess: 90
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
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
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#dc2626" })]
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
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#5c361e" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
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
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#6b3e26" })]
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.1, .52] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
							ref: mudMat1,
							map: mudTex,
							transparent: true,
							depthWrite: false
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [2.1, .52] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
							ref: mudMat2,
							map: mudTex,
							transparent: true,
							depthWrite: false
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.1, .68] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
							ref: mudMat3,
							map: mudTex,
							transparent: true,
							depthWrite: false
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
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#18181b" })]
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
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
							color: look.color,
							specular: "#64748b",
							shininess: 72
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.052, 14] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
							color: "#e2e8f0",
							specular: "#ffffff",
							shininess: 95
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				ref: capRef,
				position: [
					.813,
					.68,
					-1
				],
				rotation: [
					0,
					0,
					Math.PI / 2
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
					.066,
					.066,
					.03,
					14
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#94a3b8" })]
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
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#eab308" })]
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
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#1e293b" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: drvGeo.jacketGeo,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: look.shirt })
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
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#f1f5f9" })]
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
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#111827" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: drvGeo.handsGeo,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: look.skin })
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
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: look.skin })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
								position: [
									0,
									.182,
									.014
								],
								scale: [
									.92,
									1,
									1.03
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
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
									map: faceArt.tex,
									transparent: true,
									depthWrite: false
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								ref: hairRef,
								geometry: drvGeo.hairGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#1f1b18" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								ref: hatRef,
								geometry: drvGeo.capGeo,
								visible: Boolean(look.hat),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: look.hat ?? "#2d9d5c" })
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
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#dc2626" })]
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
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#dc2626" })]
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		ref: refObj,
		position: at,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: tireGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { map: treadTex })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: rimGeo,
			scale: [
				flip ? 1 : -1,
				1,
				1
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
				color: "#edf2f7",
				specular: "#ffffff",
				shininess: 88
			})
		})]
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
	const burgerBunAndFriesGeo = mergeParts([
		placeGeo(new CylinderGeometry(.095, .088, .024, 12), [
			-.015,
			-.002,
			.005
		]),
		placeGeo(new SphereGeometry(.098, 12, 7, 0, Math.PI * 2, 0, Math.PI * .54), [
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
	const burgerSolidGeo = mergeColoredParts([
		colorGeo(new CylinderGeometry(.145, .115, .036, 12), "#dc2626", [
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
		]),
		colorGeo(new CylinderGeometry(.102, .102, .028, 12), "#5c2810", [
			-.015,
			.02,
			.005
		]),
		colorGeo(new BoxGeometry(.158, .007, .158), "#f59e0b", [
			-.015,
			.036,
			.005
		], [
			0,
			.45,
			0
		]),
		colorGeo(new BoxGeometry(.152, .006, .152), "#f59e0b", [
			-.015,
			.038,
			.005
		], [
			0,
			1.15,
			0
		]),
		colorGeo(new CylinderGeometry(.108, .104, .012, 10), "#65a30d", [
			-.015,
			.046,
			.005
		]),
		colorGeo(new TorusGeometry(.096, .009, 4, 10), "#65a30d", [
			-.015,
			.046,
			.005
		], [
			Math.PI / 2,
			0,
			0
		]),
		colorGeo(new CylinderGeometry(.052, .052, .01, 8), "#dc2626", [
			-.042,
			.053,
			.028
		]),
		colorGeo(new CylinderGeometry(.052, .052, .01, 8), "#dc2626", [
			.018,
			.053,
			-.022
		])
	]);
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
		burgerSolidGeo,
		burgerBunAndFriesGeo,
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
		const th = c.yaw + Math.PI;
		const co = Math.cos(th);
		const si = Math.sin(th);
		mesh.position.set(c.x + .18 * co + .08 * si, 1.76 + Math.sin(sim.clock * 3) * .025, c.z - .18 * si + .08 * co);
		mesh.lookAt(sim.player.x, 1.54, sim.player.z);
		const key = `${c.id}:${c.job}:${c.asleep}:${c.caught}:${c.wanted && sim.posterUp}:${c.grade}`;
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
		if (sim.bills.length === 0) {
			if (g.visible) g.visible = false;
			return;
		}
		g.visible = true;
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
		visible: false,
		children: Array.from({ length: 6 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			visible: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.26,
				.038,
				.13
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
				map: billTex,
				color: "#dcfce7",
				emissive: "#16a34a",
				emissiveIntensity: .18
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
				.052,
				.042,
				.136
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#f59e0b" })] })]
		}, i))
	});
}
function Bits() {
	const ref = (0, import_react.useRef)(null);
	useFrame(() => {
		const g = ref.current;
		if (!g) return;
		if (sim.bits.length === 0) {
			if (g.visible) g.visible = false;
			return;
		}
		g.visible = true;
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
		visible: false,
		children: Array.from({ length: 14 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			visible: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dodecahedronGeometry", { args: [.052, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: i % 2 ? "#22c55e" : "#eab308" })]
		}, i))
	});
}
function Marker() {
	const ref = (0, import_react.useRef)(null);
	useFrame(() => {
		const m = ref.current;
		if (!m) return;
		const groundPick = sim.aimKind === "bill" || sim.aimKind === "mdrop" || sim.aimKind === "loot";
		const vis = sim.phase === "play" && groundPick;
		m.visible = vis;
		if (vis) {
			m.position.set(sim.aimPos.x, sim.aimPos.y + .24 + Math.sin(sim.clock * 6) * .035, sim.aimPos.z);
			m.rotation.y = sim.clock * 3;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref,
		visible: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("octahedronGeometry", { args: [.045, 0] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
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
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#1e3a44" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: side === "left" ? pg.leftGloveGeo : pg.rightGloveGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#24272d" })
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
	const lastState = (0, import_react.useRef)("");
	const pg = (0, import_react.useMemo)(() => getPropGeos(), []);
	const billTex = (0, import_react.useMemo)(() => createBillTexture(), []);
	const spongeTex = (0, import_react.useMemo)(() => createSpongeTexture(), []);
	const bunTex = (0, import_react.useMemo)(() => createBunTexture(), []);
	const poster = (0, import_react.useMemo)(() => getSharedPosterArt(), []);
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
		const h = sim.hold;
		if (h !== "none" && toolRef.current) {
			const jiggle = sim.usePulse > 0 ? Math.sin(sim.clock * 26) * .022 * sim.usePulse : 0;
			toolRef.current.position.set(.25 + jiggle, -.2 + Math.abs(jiggle), -.52);
			toolRef.current.rotation.set(.08, .32, -.06);
		}
		const stKey = `${h}|${sim.posterUp}|${sim.wornHorns}|${sim.grade}|${sim.hatColor}`;
		if (lastState.current !== stKey) {
			lastState.current = stKey;
			if (posterRef.current) posterRef.current.visible = sim.posterUp;
			if (toolRef.current) toolRef.current.visible = h !== "none";
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
		}
		if (sim.posterUp) {
			const key = String(sim.warrant);
			if (poster.key !== key) {
				poster.key = key;
				drawPoster(poster.ctx, poster.canvas.width, poster.canvas.height);
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
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#44403c" })]
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
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#141417" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.nozzleMetalGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
									color: "#d8e0ea",
									specular: "#ffffff",
									shininess: 80
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.nozzleBootGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
									ref: tipMatRef,
									color: "#f59e0b"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.nozzleSplashGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#18181b" })
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { map: spongeTex })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: pg.spongeGreenGeo,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#15803d" })
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
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: pg.burgerSolidGeo,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { vertexColors: true })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: pg.burgerBunAndFriesGeo,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { map: bunTex })
						})]
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#18181b" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
							geometry: pg.capRedGeo,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
								color: "#dc2626",
								specular: "#fca5a5",
								shininess: 65
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
						ref: taserRef,
						visible: false,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.taserDarkGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#18181b" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.taserYellowGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#eab308" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.taserArcGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
									color: "#38bdf8",
									emissive: "#0ea5e9",
									emissiveIntensity: 1.1
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
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
							map: billTex,
							color: "#dcfce7"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
							.04,
							.038,
							.1
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#f59e0b" })] })]
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
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#18181b" })]
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
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
									color: "#94a3b8",
									specular: "#ffffff",
									shininess: 75
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
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.046, 14] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
									color: "#f8fafc",
									specular: "#ffffff",
									shininess: 95
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
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#141417" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.chargerDarkGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#1e293b" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
								geometry: pg.chargerCyanGeo,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
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
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
								ref: hatMat1,
								color: "#eab308"
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
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
								ref: hatMat2,
								color: "#eab308"
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
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#facc15" })]
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
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#dc2626" })]
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
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#dc2626" })]
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
function buildRoundedSlab(w, d, h, r, bevel = .025) {
	const geo = new ExtrudeGeometry(roundedRectShape(w, d, r), {
		depth: h,
		bevelEnabled: bevel > 0,
		bevelThickness: bevel,
		bevelSize: bevel,
		bevelSegments: 1,
		curveSegments: 5
	});
	geo.rotateX(-Math.PI / 2);
	geo.computeVertexNormals();
	return geo;
}
function buildDesertTerrainGeo() {
	const geo = new PlaneGeometry(176, 176, 36, 36);
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
	const lathe = new LatheGeometry(pts, 14);
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
	return new LatheGeometry(pts, 14);
}
function buildWorldStaticGeos() {
	const solid = [];
	for (const cx of [-16.5, 16.5]) {
		solid.push(colorGeo(new BoxGeometry(15, .24, .06), "#cbd5e1", [
			cx,
			.56,
			-1.82
		]));
		solid.push(colorGeo(new BoxGeometry(15, .05, .08), "#cbd5e1", [
			cx,
			.62,
			-1.8
		]));
		solid.push(colorGeo(new BoxGeometry(15, .05, .08), "#cbd5e1", [
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
		]) solid.push(colorGeo(new BoxGeometry(.1, .7, .1), "#64748b", [
			cx + px,
			.35,
			-1.87
		]));
	}
	solid.push(colorGeo(new BoxGeometry(104, .07, .18), "#cbd5e1", [
		0,
		.045,
		-1.52
	]));
	solid.push(colorGeo(new BoxGeometry(104, .07, .18), "#cbd5e1", [
		0,
		.045,
		2.52
	]));
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
		solid.push(colorGeo(new CylinderGeometry(.13 * s, .155 * s, 1.48 * s, 8), "#365931", [
			x,
			.78 * s,
			z
		]));
		solid.push(colorGeo(new SphereGeometry(.13 * s, 8, 5), "#365931", [
			x,
			1.52 * s,
			z
		]));
		solid.push(colorGeo(new CapsuleGeometry(.075 * s, .38 * s, 3, 6), "#365931", [
			x + .24 * s,
			.82 * s,
			z
		], [
			0,
			0,
			-.68
		]));
		solid.push(colorGeo(new CapsuleGeometry(.07 * s, .34 * s, 3, 6), "#365931", [
			x - .24 * s,
			.96 * s,
			z
		], [
			0,
			0,
			.68
		]));
	}
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
	]) solid.push(colorGeo(new DodecahedronGeometry(s, 0), "#676e49", [
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
	solid.push(colorGeo(new CylinderGeometry(.25, .25, .88, 12), "#b94827", [
		5.55,
		.44,
		3.65
	]));
	solid.push(colorGeo(new CylinderGeometry(.25, .25, .88, 12), "#1f4246", [
		6.08,
		.44,
		4.15
	]));
	for (const [x, z] of [[5.55, 3.65], [6.08, 4.15]]) {
		solid.push(colorGeo(new TorusGeometry(.255, .015, 5, 12), "#18181b", [
			x,
			.28,
			z
		], [
			Math.PI / 2,
			0,
			0
		]));
		solid.push(colorGeo(new TorusGeometry(.255, .015, 5, 12), "#18181b", [
			x,
			.6,
			z
		], [
			Math.PI / 2,
			0,
			0
		]));
	}
	for (const [i, yy] of [
		.1,
		.28,
		.46
	].entries()) solid.push(colorGeo(new TorusGeometry(.24, .09, 6, 12), "#18181b", [
		5.75 + i * .03,
		yy,
		2.25
	], [
		Math.PI / 2,
		0,
		0
	]));
	for (const [idx, x] of [
		-20,
		-7.5,
		8.5,
		21
	].entries()) {
		solid.push(colorGeo(new CylinderGeometry(.09, .135, 5.8, 8), "#543d2d", [
			x,
			2.9,
			-2.55
		]));
		solid.push(colorGeo(new BoxGeometry(.09, 1.5, .09), "#543d2d", [
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
		]) solid.push(colorGeo(new CylinderGeometry(.03, .04, .11, 6), "#94a3b8", [
			x,
			5.48,
			-2.55 + iz
		]));
		if (idx === 2) solid.push(colorGeo(new CylinderGeometry(.16, .16, .58, 10), "#94a3b8", [
			x + .24,
			4.45,
			-2.55
		]));
	}
	solid.push(colorGeo(new BoxGeometry(.36, 1.24, .36), "#eab308", [
		-5.4,
		.62,
		-1.42
	]));
	solid.push(colorGeo(new BoxGeometry(.38, .92, .38), "#1e293b", [
		-5.4,
		.66,
		-1.42
	]));
	solid.push(colorGeo(new CylinderGeometry(.13, .16, 1.12, 10), "#1e293b", [
		-5.4,
		.56,
		2.42
	]));
	solid.push(colorGeo(new BoxGeometry(.26, .22, .22), "#eab308", [
		-5.4,
		.94,
		2.42
	]));
	solid.push(colorGeo(buildRoundedSlab(11.6, 7.2, .34, .32, .03), "#a83d20", [
		0,
		4.02,
		1.32
	]));
	solid.push(colorGeo(buildRoundedSlab(11.1, 6.7, .08, .24, .02), "#e2dad0", [
		0,
		3.94,
		1.32
	]));
	for (const bx of [
		-3.6,
		-1.2,
		1.2,
		3.6
	]) solid.push(colorGeo(new BoxGeometry(.14, .1, 6.55), "#272c35", [
		bx,
		3.9,
		1.32
	]));
	for (const bz of [
		-.6,
		1.32,
		3.25
	]) solid.push(colorGeo(new BoxGeometry(10.9, .08, .14), "#272c35", [
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
		solid.push(colorGeo(new BoxGeometry(.26, 3.96, .26), "#272c35", [
			x,
			1.98,
			z
		]));
		solid.push(colorGeo(new BoxGeometry(.46, .18, .46), "#272c35", [
			x,
			3.84,
			z
		]));
		solid.push(colorGeo(new CylinderGeometry(.32, .34, .16, 10), "#272c35", [
			x,
			.08,
			z
		]));
		solid.push(colorGeo(new CylinderGeometry(.036, .036, 3.85, 6), "#272c35", [
			x + (x > 0 ? .18 : -.18),
			1.95,
			z
		]));
		solid.push(colorGeo(new CylinderGeometry(.26, .3, .72, 10), "#eab308", [
			x,
			.36,
			z
		]));
	}
	solid.push(colorGeo(new CylinderGeometry(.008, .008, .38, 5), "#272c35", [
		2.6,
		3.74,
		.5
	]));
	solid.push(colorGeo(new CylinderGeometry(.008, .008, .38, 5), "#272c35", [
		4.2,
		3.74,
		.5
	]));
	solid.push(colorGeo(new CylinderGeometry(.045, .045, 1.85, 8), "#eab308", [
		3.4,
		3.54,
		.5
	], [
		0,
		0,
		Math.PI / 2
	]));
	solid.push(colorGeo(new CylinderGeometry(.075, .075, .42, 10), "#dc2626", [
		4.82,
		1.25,
		4.25
	]));
	solid.push(colorGeo(new SphereGeometry(.075, 8, 6), "#dc2626", [
		4.82,
		1.47,
		4.25
	]));
	solid.push(colorGeo(new BoxGeometry(.06, .06, .08), "#272c35", [
		4.82,
		1.54,
		4.25
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
	]) solid.push(colorGeo(new BoxGeometry(1.15, .04, .46), "#272c35", [
		lx,
		ly,
		lz
	]));
	solid.push(colorGeo(new CylinderGeometry(.58, .64, 1.24, 14), "#374440", [
		-5.4,
		.74,
		3.6
	]));
	solid.push(colorGeo(buildHopperGeo(), "#64748b", [
		-5.4,
		1.32,
		3.6
	]));
	solid.push(colorGeo(new CylinderGeometry(.09, .11, .9, 8), "#334155", [
		-6.02,
		1.15,
		3.6
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
	]) mesaParts.push(placeGeo(new DodecahedronGeometry(s, 0), [
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
	const aos = [
		placeGeo(new PlaneGeometry(13.2, 1.2), [
			-1.4,
			.085,
			-3.6
		], [
			-Math.PI / 2,
			0,
			0
		]),
		placeGeo(new PlaneGeometry(1.95, 1.8), [
			-2.32,
			.026,
			3.46
		], [
			-Math.PI / 2,
			0,
			0
		]),
		placeGeo(new PlaneGeometry(.85, .85), [
			-2.96,
			.026,
			4.28
		], [
			-Math.PI / 2,
			0,
			0
		]),
		placeGeo(new PlaneGeometry(2.1, 1.4), [
			-3.82,
			.026,
			4.96
		], [
			-Math.PI / 2,
			0,
			2.52
		]),
		placeGeo(new PlaneGeometry(3.5, 1.75), [
			3.2,
			.026,
			2.82
		], [
			-Math.PI / 2,
			0,
			0
		]),
		placeGeo(new PlaneGeometry(1.95, 1.95), [
			-5.4,
			.026,
			3.6
		], [
			-Math.PI / 2,
			0,
			0
		]),
		placeGeo(new PlaneGeometry(1.1, 1.1), [
			-5.4,
			.028,
			-1.42
		], [
			-Math.PI / 2,
			0,
			0
		]),
		placeGeo(new PlaneGeometry(.95, .95), [
			-5.4,
			.028,
			2.42
		], [
			-Math.PI / 2,
			0,
			0
		]),
		placeGeo(new PlaneGeometry(.95, .95), [
			5.55,
			.025,
			3.65
		], [
			-Math.PI / 2,
			0,
			0
		]),
		placeGeo(new PlaneGeometry(.95, .95), [
			6.08,
			.025,
			4.15
		], [
			-Math.PI / 2,
			0,
			0
		]),
		placeGeo(new PlaneGeometry(1.05, 1.05), [
			5.75,
			.025,
			2.25
		], [
			-Math.PI / 2,
			0,
			0
		]),
		...[
			[-5, -1.6],
			[5, -1.6],
			[-5, 4.25],
			[5, 4.25]
		].map(([x, z]) => placeGeo(new PlaneGeometry(1.35, 1.35), [
			x,
			.028,
			z
		], [
			-Math.PI / 2,
			0,
			0
		]))
	];
	const w1 = new TubeGeometry(new CatmullRomCurve3([
		new Vector3(-20, 5.45, -2.85),
		new Vector3(-13.75, 4.95, -2.85),
		new Vector3(-7.5, 5.45, -2.85),
		new Vector3(.5, 4.92, -2.85),
		new Vector3(8.5, 5.45, -2.85),
		new Vector3(14.75, 4.95, -2.85),
		new Vector3(21, 5.45, -2.85)
	]), 20, .015, 4, false);
	const w2 = new TubeGeometry(new CatmullRomCurve3([
		new Vector3(-20, 5.45, -2.25),
		new Vector3(-13.75, 4.95, -2.25),
		new Vector3(-7.5, 5.45, -2.25),
		new Vector3(.5, 4.92, -2.25),
		new Vector3(8.5, 5.45, -2.25),
		new Vector3(14.75, 4.95, -2.25),
		new Vector3(21, 5.45, -2.25)
	]), 20, .015, 4, false);
	const stripesGeo = mergeParts([
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
	const concreteGeo = mergeParts([
		placeGeo(buildRoundedSlab(15.2, 5.4, .055, .32, .02), [
			-.7,
			-.018,
			4.8
		]),
		placeGeo(new BoxGeometry(13.2, .08, 1.5), [
			-1.4,
			.04,
			-2.95
		]),
		placeGeo(buildRoundedSlab(2.85, 1.06, .13, .28, .02), [
			3.2,
			-.01,
			2.82
		])
	]);
	const boomArmGeo = mergeColoredParts([
		colorGeo(new BoxGeometry(.24, .22, .42), "#0f172a", [
			0,
			0,
			-.34
		]),
		colorGeo(new CylinderGeometry(.048, .056, 3.82, 8), "#dc2626", [
			0,
			0,
			1.9
		], [
			Math.PI / 2,
			0,
			0
		]),
		...[
			.45,
			1.18,
			1.9,
			2.62,
			3.35
		].map((zz) => colorGeo(new CylinderGeometry(.053, .053, .34, 8), "#f8fafc", [
			0,
			0,
			zz
		], [
			Math.PI / 2,
			0,
			0
		]))
	]);
	const shredderBladesGeo = mergeColoredParts([colorGeo(new CylinderGeometry(.1, .1, .72, 10), "#475569", [
		0,
		0,
		0
	], [
		0,
		0,
		Math.PI / 2
	]), ...[
		-.25,
		-.08,
		.08,
		.25
	].map((x) => colorGeo(new ConeGeometry(.06, .18, 6), "#e2e8f0", [
		x,
		.08,
		0
	], [
		.4,
		0,
		0
	]))]);
	const unlitBrightGeo = mergeColoredParts([
		colorGeo(new PlaneGeometry(.22, 3.4), "#e2e8f0", [
			-2.25,
			.027,
			.55
		], [
			-Math.PI / 2,
			0,
			0
		]),
		colorGeo(new PlaneGeometry(9.8, 1.5), "#fef3c7", [
			-1.4,
			2.5,
			-4.18
		], [
			Math.PI / 2,
			0,
			0
		]),
		colorGeo(new PlaneGeometry(.18, .06), "#f8fafc", [
			3.25,
			.86,
			2.715
		]),
		...[
			[
				-2.4,
				3.857,
				.36
			],
			[
				2.4,
				3.857,
				.36
			],
			[
				-2.4,
				3.857,
				2.3
			],
			[
				2.4,
				3.857,
				2.3
			]
		].map(([lx, ly, lz]) => colorGeo(new PlaneGeometry(1.04, .36), "#fffbeb", [
			lx,
			ly,
			lz
		], [
			Math.PI / 2,
			0,
			0
		]))
	]);
	return {
		worldSolidGeo: mergeColoredParts(solid),
		mesaRockGeo: mergeParts(mesaParts),
		allAoGeo: mergeParts(aos),
		wireGeo: mergeParts([w1, w2]),
		stripesGeo,
		concreteGeo,
		boomArmGeo,
		shredderBladesGeo,
		unlitBrightGeo
	};
}
function Station() {
	const aoTex = (0, import_react.useMemo)(() => createAoShadowTexture(), []);
	const sandTex = (0, import_react.useMemo)(() => createSandTexture(), []);
	const concreteTex = (0, import_react.useMemo)(() => createConcreteTexture(), []);
	const asphaltTex = (0, import_react.useMemo)(() => createAsphaltTexture(), []);
	const signTex = (0, import_react.useMemo)(() => createSignTexture(), []);
	const totemTex = (0, import_react.useMemo)(() => createPriceTotemTexture(), []);
	const rockTex = (0, import_react.useMemo)(() => createCanyonRockTexture(), []);
	const hazardTex = (0, import_react.useMemo)(() => createHazardTexture(), []);
	const terrainGeo = (0, import_react.useMemo)(() => buildDesertTerrainGeo(), []);
	const wg = (0, import_react.useMemo)(() => buildWorldStaticGeos(), []);
	const monitor = (0, import_react.useMemo)(() => paint((ctx, w, h) => drawMonitor(ctx, w, h), 384, 240), []);
	const poster = (0, import_react.useMemo)(() => getSharedPosterArt(), []);
	const nozzleRef = (0, import_react.useRef)(null);
	const nozzleBootMat = (0, import_react.useRef)(null);
	const chargerRef = (0, import_react.useRef)(null);
	const spongeRef = (0, import_react.useRef)(null);
	const burgerRef = (0, import_react.useRef)(null);
	const burgerExtraRef = (0, import_react.useRef)(null);
	const capRef = (0, import_react.useRef)(null);
	const capExtraRef = (0, import_react.useRef)(null);
	const taserRef = (0, import_react.useRef)(null);
	const propRefs = (0, import_react.useMemo)(() => ({
		nozzle: nozzleRef,
		nozzleBootMat,
		charger: chargerRef,
		sponge: spongeRef,
		burger: burgerRef,
		burgerExtra: burgerExtraRef,
		cap: capRef,
		capExtra: capExtraRef,
		taser: taserRef
	}), []);
	const bar = (0, import_react.useRef)(null);
	const blades = (0, import_react.useRef)(null);
	const gateBeaconMat = (0, import_react.useRef)(null);
	const skullBtnMat = (0, import_react.useRef)(null);
	const lastPropKey = (0, import_react.useRef)("");
	const lastSkull = (0, import_react.useRef)(null);
	useFrame((_, dt) => {
		const mk = `${sim.money}|${sim.stars.toFixed(1)}|${sim.review}|${sim.customer}|${sim.day}`;
		if (monitor.key !== mk) {
			monitor.key = mk;
			drawMonitor(monitor.ctx, monitor.canvas.width, monitor.canvas.height);
			monitor.tex.needsUpdate = true;
		}
		const wk = String(sim.warrant);
		if (poster.key !== wk) {
			poster.key = wk;
			drawPoster(poster.ctx, poster.canvas.width, poster.canvas.height);
			poster.tex.needsUpdate = true;
		}
		const pk = `${sim.hold}|${sim.burgers}|${sim.caps}|${sim.grade}`;
		if (lastPropKey.current !== pk) {
			lastPropKey.current = pk;
			if (nozzleRef.current) nozzleRef.current.visible = sim.hold !== "nozzle";
			if (nozzleBootMat.current) nozzleBootMat.current.color.set(GRADES.find((g) => g.id === sim.grade)?.color ?? "#f59e0b");
			if (chargerRef.current) chargerRef.current.visible = sim.hold !== "charger";
			if (spongeRef.current) spongeRef.current.visible = sim.hold !== "sponge";
			if (burgerRef.current) burgerRef.current.visible = sim.hold !== "burger" && sim.burgers > 0;
			if (burgerExtraRef.current) burgerExtraRef.current.visible = sim.burgers > 1;
			if (capRef.current) capRef.current.visible = sim.hold !== "cap" && sim.caps > 0;
			if (capExtraRef.current) capExtraRef.current.visible = sim.caps > 1;
			if (taserRef.current) taserRef.current.visible = sim.hold !== "taser";
		}
		if (bar.current) bar.current.rotation.x = -1.25 * sim.barrier;
		if (blades.current) blades.current.rotation.x += dt * 4.2;
		if (lastSkull.current !== sim.skull) {
			lastSkull.current = sim.skull;
			if (gateBeaconMat.current) {
				const col = sim.skull ? "#ef4444" : "#22c55e";
				gateBeaconMat.current.color.set(col);
				gateBeaconMat.current.emissive.set(col);
			}
			if (skullBtnMat.current) skullBtnMat.current.emissiveIntensity = sim.skull ? 1.25 : .42;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: terrainGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { map: sandTex })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: wg.concreteGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { map: concreteTex })
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [104, 4.1] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { map: asphaltTex })]
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
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: wg.allAoGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				map: aoTex,
				transparent: true,
				depthWrite: false
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: wg.unlitBrightGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { vertexColors: true })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: wg.stripesGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#eab308" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: wg.wireGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { color: "#18181b" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: wg.worldSolidGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { vertexColors: true })
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
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
				color: "#fef3c7",
				emissive: "#f59e0b",
				emissiveIntensity: 1
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: wg.mesaRockGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { map: rockTex })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-5.4,
				.34,
				3.6
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.625,
				.635,
				.22,
				14
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { map: hazardTex })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			ref: blades,
			position: [
				-5.4,
				1.28,
				3.85
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: wg.shredderBladesGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { vertexColors: true })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-5.4,
				1.36,
				-1.42
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.11,
				.11,
				.18,
				10
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
				ref: gateBeaconMat,
				color: "#22c55e",
				emissive: "#22c55e",
				emissiveIntensity: 1
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			ref: bar,
			position: [
				-5.4,
				1.02,
				-1.42
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: wg.boomArmGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { vertexColors: true })
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building, {
			sign: signTex,
			totem: totemTex,
			concrete: concreteTex,
			ao: aoTex
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Props, {
			refs: propRefs,
			monitor: monitor.tex,
			poster: poster.tex,
			skullMatRef: skullBtnMat
		})
	] });
}
function Building({ sign, totem, concrete, ao }) {
	const backGlowRef = (0, import_react.useRef)(null);
	const lastNight = (0, import_react.useRef)(-1);
	const brickTex = (0, import_react.useMemo)(() => createBrickTexture(), []);
	const backWallTex = (0, import_react.useMemo)(() => createStoreBackWallTexture(), []);
	const iceTex = (0, import_react.useMemo)(() => createIceChestTexture(), []);
	const vendingTex = (0, import_react.useMemo)(() => createVendingFrontTexture(), []);
	const openNeonTex = (0, import_react.useMemo)(() => createOpenSignTexture(), []);
	const bldgSolidGeo = (0, import_react.useMemo)(() => {
		const p = [
			colorGeo(new PlaneGeometry(9.8, 1.5), "#8c7e6d", [
				0,
				.1,
				1.62
			], [
				-Math.PI / 2,
				0,
				0
			]),
			colorGeo(new BoxGeometry(2.1, .88, .54), "#3e3126", [
				.45,
				.52,
				1.68
			]),
			colorGeo(new BoxGeometry(2.18, .05, .6), "#d6d3d1", [
				.45,
				.98,
				1.68
			]),
			colorGeo(new BoxGeometry(.36, .3, .28), "#1e293b", [
				.05,
				1.16,
				1.68
			]),
			colorGeo(new BoxGeometry(1.85, 1.18, .42), "#292524", [
				3.1,
				.72,
				1.74
			]),
			colorGeo(new BoxGeometry(.92, .32, .04), "#0f172a", [
				-3.85,
				2.15,
				2.22
			]),
			colorGeo(new BoxGeometry(12.1, 3.65, 3.15), "#dfd3be", [
				0,
				1.825,
				-.72
			]),
			colorGeo(new BoxGeometry(1.15, 3.65, 1.52), "#dfd3be", [
				-5.48,
				1.825,
				1.6
			]),
			colorGeo(new BoxGeometry(1.15, 3.65, 1.52), "#dfd3be", [
				5.48,
				1.825,
				1.6
			]),
			colorGeo(new BoxGeometry(9.8, 1.13, 1.52), "#dfd3be", [
				0,
				3.085,
				1.6
			]),
			colorGeo(new BoxGeometry(4, .84, .3), "#dfd3be", [
				-2.9,
				.42,
				2.22
			]),
			colorGeo(new BoxGeometry(4, .84, .3), "#dfd3be", [
				2.9,
				.42,
				2.22
			]),
			colorGeo(new BoxGeometry(.28, 2.52, .32), "#dfd3be", [
				-.96,
				1.26,
				2.22
			]),
			colorGeo(new BoxGeometry(.28, 2.52, .32), "#dfd3be", [
				.96,
				1.26,
				2.22
			]),
			colorGeo(buildRoundedSlab(12.6, 5, .32, .26, .03), "#a63e22", [
				0,
				3.66,
				0
			]),
			colorGeo(buildRoundedSlab(9.8, 1.18, .09, .12, .02), "#1f4246", [
				0,
				2.58,
				2.78
			], [
				.16,
				0,
				0
			]),
			colorGeo(new BoxGeometry(12.68, .07, .12), "#94a3b8", [
				0,
				4.02,
				2.52
			]),
			colorGeo(new BoxGeometry(1.65, .72, 1.25), "#94a3b8", [
				-3.4,
				4.38,
				-.4
			]),
			colorGeo(new BoxGeometry(1.2, .28, .38), "#94a3b8", [
				-2,
				4.18,
				-.4
			]),
			colorGeo(new CylinderGeometry(.06, .06, .65, 8), "#94a3b8", [
				2.8,
				4.3,
				-.6
			]),
			colorGeo(new CylinderGeometry(.14, .06, .12, 8), "#94a3b8", [
				2.8,
				4.65,
				-.6
			]),
			...[
				-4.35,
				-2.95,
				2.95,
				4.35
			].map((rx) => colorGeo(new CylinderGeometry(.015, .015, 1.05, 5), "#94a3b8", [
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
			].map((lx) => colorGeo(new CylinderGeometry(.05, .16, .12, 8), "#94a3b8", [
				lx,
				2.86,
				2.55
			])),
			colorGeo(new CylinderGeometry(.24, .22, .74, 10), "#94a3b8", [
				-1.38,
				.45,
				2.75
			]),
			colorGeo(new CapsuleGeometry(.015, .34, 3, 6), "#f8fafc", [
				-.12,
				1.12,
				2.39
			]),
			colorGeo(new CapsuleGeometry(.015, .34, 3, 6), "#f8fafc", [
				.12,
				1.12,
				2.39
			]),
			...[
				-4.2,
				-1.85,
				1.85,
				4.2
			].map((bx) => colorGeo(new CylinderGeometry(.072, .082, .84, 8), "#eab308", [
				bx,
				.46,
				3.45
			])),
			colorGeo(new BoxGeometry(1.28, .92, .68), "#f1f5f9", [
				-5.12,
				.54,
				2.74
			]),
			colorGeo(new BoxGeometry(1.26, .07, .68), "#94a3b8", [
				-5.12,
				1.04,
				2.71
			], [
				.26,
				0,
				0
			]),
			colorGeo(new BoxGeometry(.92, 1.9, .66), "#7f1d1d", [
				5.25,
				1.03,
				2.72
			])
		];
		for (const wx of [-2.95, 2.95]) {
			p.push(colorGeo(new BoxGeometry(3.72, .06, .09), "#18181b", [
				wx,
				2.5,
				2.34
			]));
			p.push(colorGeo(new BoxGeometry(3.72, .06, .09), "#18181b", [
				wx,
				.84,
				2.34
			]));
			for (const mx of [
				-1.84,
				-.62,
				.62,
				1.84
			]) p.push(colorGeo(new BoxGeometry(.045, 1.68, .08), "#18181b", [
				wx + mx,
				1.67,
				2.34
			]));
		}
		p.push(colorGeo(new BoxGeometry(1.68, .06, .09), "#18181b", [
			0,
			2.49,
			2.34
		]));
		p.push(colorGeo(new BoxGeometry(.05, 2.42, .08), "#18181b", [
			-.82,
			1.26,
			2.34
		]));
		p.push(colorGeo(new BoxGeometry(.05, 2.42, .08), "#18181b", [
			0,
			1.26,
			2.34
		]));
		p.push(colorGeo(new BoxGeometry(.05, 2.42, .08), "#18181b", [
			.82,
			1.26,
			2.34
		]));
		p.push(colorGeo(new BoxGeometry(1.64, .22, .05), "#18181b", [
			0,
			.19,
			2.34
		]));
		p.push(colorGeo(new BoxGeometry(1.45, .015, .72), "#18181b", [
			0,
			.088,
			2.82
		]));
		p.push(colorGeo(new BoxGeometry(5.4, 1.34, .14), "#18181b", [
			0,
			3.36,
			2.37
		]));
		return mergeColoredParts(p);
	}, []);
	const brickGeo = (0, import_react.useMemo)(() => mergeParts([
		placeGeo(new PlaneGeometry(3.9, .84), [
			-2.95,
			.42,
			2.375
		]),
		placeGeo(new PlaneGeometry(3.9, .84), [
			2.95,
			.42,
			2.375
		]),
		placeGeo(new BoxGeometry(.42, 3.64, .32), [
			-5.95,
			1.82,
			2.26
		]),
		placeGeo(new BoxGeometry(.42, 3.64, .32), [
			5.95,
			1.82,
			2.26
		])
	]), []);
	const storeGlassGeo = (0, import_react.useMemo)(() => mergeParts([
		placeGeo(new PlaneGeometry(3.68, 1.62), [
			-2.95,
			1.67,
			2.34
		]),
		placeGeo(new PlaneGeometry(3.68, 1.62), [
			2.95,
			1.67,
			2.34
		]),
		placeGeo(new PlaneGeometry(1.6, 2.18), [
			0,
			1.38,
			2.34
		])
	]), []);
	const totemSolidGeo = (0, import_react.useMemo)(() => mergeColoredParts([
		colorGeo(new CylinderGeometry(.09, .1, 5.1, 8), "#27272a", [
			-.64,
			2.65,
			0
		]),
		colorGeo(new CylinderGeometry(.09, .1, 5.1, 8), "#27272a", [
			.64,
			2.65,
			0
		]),
		colorGeo(new BoxGeometry(1.38, 2.55, .24), "#18181b", [
			0,
			3.35,
			0
		])
	]), []);
	useFrame(() => {
		if (backGlowRef.current && Math.abs(sim.night - lastNight.current) > .01) {
			lastNight.current = sim.night;
			backGlowRef.current.emissiveIntensity = .52 + sim.night * .48;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
		position: [
			-1.4,
			0,
			-5.8
		],
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: bldgSolidGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { vertexColors: true })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: brickGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { map: brickTex })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.42,
					.9
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [9.7, 2.38] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
					ref: backGlowRef,
					map: backWallTex,
					emissiveMap: backWallTex,
					emissive: "#ffffff",
					emissiveIntensity: .52
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
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
					color: "#fde68a",
					emissive: "#f59e0b",
					emissiveIntensity: .35,
					transparent: true,
					opacity: .75
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: storeGlassGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
					color: "#bae6fd",
					specular: "#ffffff",
					shininess: 90,
					transparent: true,
					opacity: .22
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					-5.12,
					.54,
					3.084
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [1.2, .82] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { map: iceTex })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					5.25,
					1.06,
					3.054
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.82, 1.72] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { map: vendingTex })]
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
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { map: concrete })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
						geometry: totemSolidGeo,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { vertexColors: true })
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
function Props({ refs, monitor, poster, skullMatRef }) {
	const pg = (0, import_react.useMemo)(() => getPropGeos(), []);
	const pumpFaceTex = (0, import_react.useMemo)(() => createPumpFaceTexture(), []);
	const pumpTopperTex = (0, import_react.useMemo)(() => createPumpTopperTexture(), []);
	const spongeTex = (0, import_react.useMemo)(() => createSpongeTexture(), []);
	const bunTex = (0, import_react.useMemo)(() => createBunTexture(), []);
	const skullTex = (0, import_react.useMemo)(() => createConsoleLabelTexture("!", "#dc2626"), []);
	const goTex = (0, import_react.useMemo)(() => createConsoleLabelTexture("GO", "#16a34a"), []);
	const goldBtnTex = (0, import_react.useMemo)(() => createConsoleLabelTexture("$", "#15803d", "#fef08a"), []);
	const forecourtSolidGeo = (0, import_react.useMemo)(() => {
		const hoseCurve = new CatmullRomCurve3([
			new Vector3(2.12, 1.74, 2.88),
			new Vector3(1.96, 1.24, 2.98),
			new Vector3(2.02, .68, 2.92),
			new Vector3(2.15, 1.24, 2.8)
		]);
		const evCurve = new CatmullRomCurve3([
			new Vector3(3.64, 1.6, 2.88),
			new Vector3(3.48, 1.07, 2.96),
			new Vector3(3.54, .6, 2.88),
			new Vector3(3.66, 1.22, 2.8)
		]);
		return mergeColoredParts([
			colorGeo(buildRoundedSlab(1.22, 1.04, .92, .14, .025), "#27303f", [
				-2.32,
				0,
				3.46
			]),
			colorGeo(buildRoundedSlab(1.3, 1.12, .065, .16, .02), "#141b26", [
				-2.32,
				.93,
				3.46
			]),
			colorGeo(new BoxGeometry(.34, .065, .34), "#1e293b", [
				-1.98,
				1.02,
				3.42
			]),
			colorGeo(new CylinderGeometry(.145, .165, .06, 14), "#eab308", [
				-2.22,
				1.02,
				3.12
			]),
			colorGeo(new CylinderGeometry(.145, .165, .06, 14), "#334155", [
				-2.56,
				1.02,
				3.32
			]),
			colorGeo(new CylinderGeometry(.155, .12, .2, 10), "#1d4ed8", [
				-3.49,
				1.01,
				5.06
			]),
			colorGeo(new TorusGeometry(.16, .007, 5, 10, Math.PI), "#e2e8f0", [
				-3.49,
				1.1,
				5.06
			], [
				.45,
				0,
				0
			]),
			colorGeo(new CircleGeometry(.142, 10), "#e0f2fe", [
				-3.49,
				1.09,
				5.06
			], [
				-Math.PI / 2,
				0,
				0
			]),
			colorGeo(new BoxGeometry(2.35, .1, .05), "#eab308", [
				3.2,
				.05,
				3.34
			]),
			colorGeo(new BoxGeometry(2.35, .1, .05), "#eab308", [
				3.2,
				.05,
				2.3
			]),
			...[-1.26, 1.26].flatMap((bx) => [
				colorGeo(new CylinderGeometry(.042, .042, .84, 8), "#eab308", [
					3.2 + bx,
					.54,
					2.58
				]),
				colorGeo(new CylinderGeometry(.042, .042, .84, 8), "#eab308", [
					3.2 + bx,
					.54,
					3.06
				]),
				colorGeo(new TorusGeometry(.24, .042, 6, 10, Math.PI), "#eab308", [
					3.2 + bx,
					.96,
					2.82
				], [
					0,
					Math.PI / 2,
					0
				])
			]),
			colorGeo(new BoxGeometry(.28, .72, .24), "#1e3a8a", [
				3.25,
				.48,
				2.6
			]),
			colorGeo(new BoxGeometry(.3, .22, .22), "#1e293b", [
				3.25,
				.94,
				2.6
			]),
			colorGeo(new CylinderGeometry(.01, .01, .44, 6), "#a16207", [
				3.41,
				.7,
				2.6
			], [
				0,
				0,
				-.18
			]),
			colorGeo(new BoxGeometry(.03, .03, .18), "#09090b", [
				3.45,
				.9,
				2.6
			], [
				0,
				0,
				-.18
			]),
			colorGeo(new BoxGeometry(.76, .76, .48), "#1f242d", [
				2.48,
				.5,
				2.82
			]),
			colorGeo(new PlaneGeometry(.66, .64), "#b9381e", [
				2.48,
				.5,
				3.065
			]),
			colorGeo(new PlaneGeometry(.66, .64), "#b9381e", [
				2.48,
				.5,
				2.575
			], [
				0,
				Math.PI,
				0
			]),
			colorGeo(new BoxGeometry(.09, 2.08, .44), "#cbd5e1", [
				2.13,
				1.16,
				2.82
			]),
			colorGeo(new BoxGeometry(.09, 2.08, .44), "#cbd5e1", [
				2.83,
				1.16,
				2.82
			]),
			colorGeo(new BoxGeometry(.62, .78, .4), "#18181b", [
				2.48,
				1.36,
				2.82
			]),
			colorGeo(new BoxGeometry(.88, .32, .52), "#b9381e", [
				2.48,
				2.06,
				2.82
			]),
			colorGeo(new PlaneGeometry(.3, .85), "#18181b", [
				2.08,
				1.34,
				2.82
			], [
				0,
				-Math.PI / 2,
				0
			]),
			colorGeo(new BoxGeometry(.08, .28, .18), "#09090b", [
				2.07,
				1.24,
				2.82
			]),
			colorGeo(new TubeGeometry(hoseCurve, 12, .024, 6, false), "#141417"),
			colorGeo(new BoxGeometry(.68, .72, .42), "#18181b", [
				3.92,
				.48,
				2.82
			]),
			colorGeo(new BoxGeometry(.12, 1.4, .38), "#e2e8f0", [
				3.65,
				1.4,
				2.82
			]),
			colorGeo(new BoxGeometry(.12, 1.4, .38), "#e2e8f0", [
				4.19,
				1.4,
				2.82
			]),
			colorGeo(new BoxGeometry(.68, .16, .4), "#e2e8f0", [
				3.92,
				2.1,
				2.82
			]),
			colorGeo(new BoxGeometry(.44, .36, .32), "#0f172a", [
				3.92,
				1.3,
				2.82
			]),
			colorGeo(new TubeGeometry(evCurve, 12, .026, 6, false), "#141417")
		]);
	}, []);
	const evGlowGeo = (0, import_react.useMemo)(() => mergeParts([
		placeGeo(new BoxGeometry(.015, 1.28, .18), [
			3.712,
			1.4,
			2.82
		]),
		placeGeo(new BoxGeometry(.015, 1.28, .18), [
			4.128,
			1.4,
			2.82
		]),
		placeGeo(new PlaneGeometry(.34, .24), [
			3.92,
			1.3,
			2.985
		])
	]), []);
	const monitorCaseGeo = (0, import_react.useMemo)(() => buildRoundedSlab(1.02, .68, .045, .05, .015), []);
	const lecternGeo = (0, import_react.useMemo)(() => mergeColoredParts([
		colorGeo(new CylinderGeometry(.032, .042, 1.24, 8), "#334155", [
			0,
			.62,
			0
		]),
		colorGeo(new CylinderGeometry(.2, .22, .06, 10), "#1e293b", [
			0,
			.04,
			0
		]),
		colorGeo(new BoxGeometry(.48, .62, .028), "#44403c", [
			0,
			1.315,
			.022
		], [
			-.28,
			0,
			0
		]),
		colorGeo(new BoxGeometry(.16, .045, .035), "#e2e8f0", [
			0,
			1.6,
			.128
		], [
			-.28,
			0,
			0
		])
	]), []);
	const lockerShellGeo = (0, import_react.useMemo)(() => mergeColoredParts([
		colorGeo(new BoxGeometry(1.44, 2.16, .1), "#2c3340", [
			0,
			1.08,
			-.34
		]),
		colorGeo(new BoxGeometry(.08, 2.16, .76), "#2c3340", [
			-.68,
			1.08,
			0
		]),
		colorGeo(new BoxGeometry(.08, 2.16, .76), "#2c3340", [
			.68,
			1.08,
			0
		]),
		...[
			.08,
			.88,
			1.34,
			2.08
		].map((sy) => colorGeo(new BoxGeometry(1.38, .055, .76), "#475569", [
			0,
			sy,
			0
		]))
	]), []);
	const pumpFacesGeo = (0, import_react.useMemo)(() => mergeParts([placeGeo(new PlaneGeometry(.54, .68), [
		2.48,
		1.36,
		3.025
	]), placeGeo(new PlaneGeometry(.54, .68), [
		2.48,
		1.36,
		2.615
	], [
		0,
		Math.PI,
		0
	])]), []);
	const pumpToppersGeo = (0, import_react.useMemo)(() => mergeParts([placeGeo(new PlaneGeometry(.8, .22), [
		2.48,
		2.06,
		3.085
	]), placeGeo(new PlaneGeometry(.8, .22), [
		2.48,
		2.06,
		2.555
	], [
		0,
		Math.PI,
		0
	])]), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: forecourtSolidGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { vertexColors: true })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: evGlowGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
				color: "#0ea5e9",
				emissive: "#38bdf8",
				emissiveIntensity: .95
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: pumpFacesGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				map: pumpFaceTex,
				toneMapped: false
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
			geometry: pumpToppersGeo,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
				map: pumpTopperTex,
				toneMapped: false
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			position: [
				-2.4,
				1,
				3.7
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
					8
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#475569" })]
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#0f172a" })
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: lecternGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { vertexColors: true })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
				position: [
					0,
					1.31,
					.042
				],
				rotation: [
					-.28,
					0,
					0
				],
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("planeGeometry", { args: [.42, .56] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
					map: poster,
					toneMapped: false
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-1.98,
				1.058,
				3.42
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.135,
				.15,
				.045,
				14
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
				color: "#eab308",
				emissive: "#d97706",
				emissiveIntensity: .35
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-1.98,
				1.083,
				3.42
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.115, 14] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { map: goldBtnTex })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-2.22,
				1.065,
				3.12
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.108,
				.118,
				.055,
				14
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
				ref: skullMatRef,
				color: "#dc2626",
				emissive: "#ef4444",
				emissiveIntensity: .42
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-2.22,
				1.095,
				3.12
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.095, 14] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { map: skullTex })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-2.56,
				1.065,
				3.32
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("cylinderGeometry", { args: [
				.108,
				.118,
				.055,
				14
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
				color: "#16a34a",
				emissive: "#22c55e",
				emissiveIntensity: .5
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
			position: [
				-2.56,
				1.095,
				3.32
			],
			rotation: [
				-Math.PI / 2,
				0,
				0
			],
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circleGeometry", { args: [.095, 14] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", { map: goTex })]
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: lockerShellGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { vertexColors: true })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.34,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.68,
						1.96,
						.032
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
						color: "#bae6fd",
						specular: "#ffffff",
						shininess: 85,
						transparent: true,
						opacity: .3
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
					position: [
						-.66,
						0,
						0
					],
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("boxGeometry", { args: [
						.04,
						1.98,
						.045
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#334155" })]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			ref: refs.burger,
			position: [
				-3.49,
				1.39,
				5.06
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BurgerProp, { bunTex })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			ref: refs.burgerExtra,
			position: [
				-3.72,
				1.39,
				4.92
			],
			scale: .9,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BurgerProp, { bunTex })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			ref: refs.cap,
			position: [
				-4.02,
				1.39,
				4.71
			],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GasCapProp, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("group", {
			ref: refs.capExtra,
			position: [
				-4.19,
				1.39,
				4.58
			],
			scale: .92,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GasCapProp, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: refs.sponge,
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { map: spongeTex })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: pg.spongeGreenGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#15803d" })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: refs.taser,
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
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#18181b" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: pg.taserYellowGeo,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#eab308" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
					geometry: pg.taserArcGeo,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
						color: "#38bdf8",
						emissive: "#0ea5e9",
						emissiveIntensity: 1.1
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: refs.nozzle,
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
					color: "#d8e0ea",
					specular: "#ffffff",
					shininess: 80
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: pg.nozzleBootGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
					ref: refs.nozzleBootMat,
					color: "#f59e0b"
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", {
			ref: refs.charger,
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#1e293b" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
				geometry: pg.chargerCyanGeo,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", {
					color: "#38bdf8",
					emissive: "#0ea5e9",
					emissiveIntensity: 1.1
				})
			})]
		})
	] });
}
function BurgerProp({ bunTex }) {
	const pg = (0, import_react.useMemo)(() => getPropGeos(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: pg.burgerSolidGeo,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { vertexColors: true })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: pg.burgerBunAndFriesGeo,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { map: bunTex })
	})] });
}
function GasCapProp() {
	const pg = (0, import_react.useMemo)(() => getPropGeos(), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("group", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: pg.capDarkGeo,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshLambertMaterial", { color: "#18181b" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mesh", {
		geometry: pg.capRedGeo,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshPhongMaterial", {
			color: "#dc2626",
			specular: "#fca5a5",
			shininess: 65
		})
	})] });
}
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
function detectSoftwareRenderer(glContext) {
	try {
		const ext = glContext.getExtension("WEBGL_debug_renderer_info");
		const raw = ext ? String(glContext.getParameter(ext.UNMASKED_RENDERER_WEBGL) ?? "") : String(glContext.getParameter(glContext.RENDERER) ?? "");
		return {
			renderer: raw,
			software: /SwiftShader|Basic Render|WARP|llvmpipe|Software|Lavapipe/i.test(raw)
		};
	} catch {
		return {
			renderer: "unknown",
			software: false
		};
	}
}
function Rig() {
	const { camera, scene, gl, setEvents } = useThree();
	const fogCol = (0, import_react.useMemo)(() => new Color("#dfc9ae"), []);
	const dayFog = (0, import_react.useMemo)(() => new Color("#dfc9ae"), []);
	const duskFog = (0, import_react.useMemo)(() => new Color("#dc8b5e"), []);
	const nightFog = (0, import_react.useMemo)(() => new Color("#151b2e"), []);
	const prevNightRef = (0, import_react.useRef)(-1);
	const fpsAcc = (0, import_react.useRef)({
		frames: 0,
		elapsed: 0,
		dpr: 1,
		renderer: "",
		software: false,
		warmed: false
	});
	(0, import_react.useEffect)(() => {
		setEvents({ enabled: false });
		scene.fog = new Fog("#dfc9ae", 34, 114);
		scene.environment = null;
		const info = detectSoftwareRenderer(gl.getContext());
		fpsAcc.current.renderer = info.renderer;
		fpsAcc.current.software = info.software;
		sim.softwareGpu = info.software;
		const baseDpr = sim.quality === "high" ? Math.min(window.devicePixelRatio || 1, 1.25) : info.software ? .85 : Math.min(window.devicePixelRatio || 1, 1);
		gl.setPixelRatio(baseDpr);
		fpsAcc.current.dpr = baseDpr;
	}, [
		gl,
		scene,
		setEvents
	]);
	useFrame((_, rawDt) => {
		if (!fpsAcc.current.warmed) {
			fpsAcc.current.warmed = true;
			const hidden = [];
			scene.traverse((obj) => {
				if (!obj.visible) {
					hidden.push(obj);
					obj.visible = true;
				}
			});
			gl.compile(scene, camera);
			for (let i = 0; i < hidden.length; i++) hidden[i].visible = false;
		}
		tick(Math.min(.05, rawDt));
		const n = sim.night;
		if (Math.abs(n - prevNightRef.current) > .004) {
			prevNightRef.current = n;
			if (n < .45) fogCol.copy(dayFog).lerp(duskFog, n / .45);
			else fogCol.copy(duskFog).lerp(nightFog, (n - .45) / .55);
			const fog = scene.fog;
			if (fog && "color" in fog) {
				fog.color.copy(fogCol);
				if ("far" in fog) fog.far = 114 - n * 38;
			}
		}
		const st = fpsAcc.current;
		st.frames += 1;
		st.elapsed += rawDt;
		if (st.elapsed >= .55) {
			const fps = Math.round(st.frames / st.elapsed);
			const frameMs = Math.round(st.elapsed / st.frames * 1e4) / 10;
			sim.fps = fps;
			if (sim.quality === "fast") {
				const minDpr = st.software ? .78 : .8;
				if (fps < 42 && st.dpr > minDpr) {
					st.dpr = Math.max(minDpr, Math.round((st.dpr - .08) * 100) / 100);
					gl.setPixelRatio(st.dpr);
				} else if (!st.software && fps >= 57 && st.dpr < 1) {
					st.dpr = Math.min(1, Math.round((st.dpr + .05) * 100) / 100);
					gl.setPixelRatio(st.dpr);
				}
			} else {
				const target = Math.min(window.devicePixelRatio || 1, 1.2);
				if (Math.abs(st.dpr - target) > .04) {
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
				software: st.software
			};
			st.frames = 0;
			st.elapsed = 0;
		} else if (!window.__perfStats) window.__perfStats = {
			calls: gl.info.render.calls,
			triangles: gl.info.render.triangles,
			geometries: gl.info.memory.geometries,
			textures: gl.info.memory.textures,
			fps: sim.fps,
			frameMs: Math.round(rawDt * 1e4) / 10,
			dpr: st.dpr,
			renderer: st.renderer,
			software: st.software
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
	const matRef = (0, import_react.useRef)(null);
	const skyTex = (0, import_react.useMemo)(() => createSkyPanoramaTexture(), []);
	const dayTint = (0, import_react.useMemo)(() => new Color("#ffffff"), []);
	const duskTint = (0, import_react.useMemo)(() => new Color("#eb9f78"), []);
	const nightTint = (0, import_react.useMemo)(() => new Color("#121a30"), []);
	const curTint = (0, import_react.useMemo)(() => new Color("#ffffff"), []);
	const lastNight = (0, import_react.useRef)(-1);
	useFrame((state) => {
		const m = meshRef.current;
		if (m) {
			m.position.copy(state.camera.position);
			m.rotation.y = sim.clock * .011;
		}
		const n = sim.night;
		if (matRef.current && Math.abs(n - lastNight.current) > .005) {
			lastNight.current = n;
			if (n < .45) curTint.copy(dayTint).lerp(duskTint, n / .45);
			else curTint.copy(duskTint).lerp(nightTint, (n - .45) / .55);
			matRef.current.color.copy(curTint);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("mesh", {
		ref: meshRef,
		frustumCulled: false,
		renderOrder: -10,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sphereGeometry", { args: [
			142,
			16,
			10
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meshBasicMaterial", {
			ref: matRef,
			map: skyTex,
			side: 1,
			depthWrite: false,
			fog: false
		})]
	});
}
function Lights() {
	const sun = (0, import_react.useRef)(null);
	const amb = (0, import_react.useRef)(null);
	const lamp = (0, import_react.useRef)(null);
	const lastNight = (0, import_react.useRef)(-1);
	useFrame(() => {
		const n = sim.night;
		if (Math.abs(n - lastNight.current) < .005) return;
		lastNight.current = n;
		if (sun.current) {
			sun.current.intensity = 1.95 * (1 - n * .82);
			sun.current.color.set(n > .2 ? "#ffbe7b" : "#fff5e6");
		}
		if (amb.current) amb.current.intensity = .54 - n * .24;
		if (lamp.current) {
			lamp.current.visible = n > .04;
			if (n > .04) lamp.current.intensity = n * 4.8;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hemisphereLight", { args: [
			"#dceeff",
			"#b5895a",
			1.02
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ambientLight", {
			ref: amb,
			intensity: .54
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("directionalLight", {
			ref: sun,
			position: [
				16,
				21,
				14
			],
			intensity: 1.95,
			color: "#fff5e6"
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
	const snap = (0, import_react.useSyncExternalStore)(subscribe, getSnap, getSnap);
	(0, import_react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative h-dvh w-full overflow-hidden bg-ink text-cream",
		onPointerDown: (e) => {
			if (sim.phase !== "play") return;
			if (e.target?.closest("[data-ui]")) return;
			requestLock();
		},
		children: [on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Canvas, {
			className: "absolute inset-0 touch-none",
			shadows: false,
			dpr: high ? mobile ? [1, 1.25] : [1, 1.2] : mobile ? [.75, .95] : [.8, 1],
			camera: {
				fov: 64,
				near: .1,
				far: 165,
				position: [
					8,
					5,
					12
				]
			},
			gl: {
				antialias: high && !mobile,
				powerPreference: "high-performance",
				stencil: false,
				depth: true,
				alpha: false,
				toneMapping: 0
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {})
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {})]
	});
}
//#endregion
export { Home as component };
