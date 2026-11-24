import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from "three";
import { GRADES, TIPS, WARRANTS } from "@/game/content";
import { sim, type Car } from "@/game/sim";

export function paint(draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void, w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  draw(ctx, w, h);
  const tex = new CanvasTexture(canvas);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return { canvas, ctx, tex, key: "" };
}

export function createSandTexture() {
  const p = paint((ctx, w, h) => {
    ctx.fillStyle = "#d4aa74";
    ctx.fillRect(0, 0, w, h);
    // Subtle wind ripples
    for (let y = 0; y < h; y += 16) {
      ctx.fillStyle = y % 32 === 0 ? "rgba(186,136,78,0.12)" : "rgba(244,219,179,0.1)";
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= w; x += 32) {
        ctx.quadraticCurveTo(x + 16, y + Math.sin(x * 0.05) * 4, x + 32, y);
      }
      ctx.lineTo(w, y + 8);
      ctx.lineTo(0, y + 8);
      ctx.closePath();
      ctx.fill();
    }
    // Desert pebbles & grain
    for (let i = 0; i < 2400; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 0.8 + Math.random() * 2.2;
      ctx.fillStyle = i % 3 === 0 ? "rgba(155,105,58,0.22)" : "rgba(248,228,194,0.18)";
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }, 512, 512);
  p.tex.wrapS = RepeatWrapping;
  p.tex.wrapT = RepeatWrapping;
  p.tex.repeat.set(14, 14);
  return p.tex;
}

export function createConcreteTexture() {
  const p = paint((ctx, w, h) => {
    ctx.fillStyle = "#c9c1b5";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 1600; i++) {
      ctx.fillStyle = i % 2 === 0 ? "rgba(85,78,68,0.08)" : "rgba(255,250,242,0.08)";
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }
    ctx.strokeStyle = "rgba(92,84,74,0.28)";
    ctx.lineWidth = 4;
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

export function createAsphaltTexture() {
  const p = paint((ctx, w, h) => {
    ctx.fillStyle = "#32363f";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 3500; i++) {
      ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.045)" : "rgba(15,17,22,0.18)";
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }
    // Subtle tire wear tracks
    ctx.fillStyle = "rgba(20,22,26,0.22)";
    ctx.fillRect(0, h * 0.25, w, h * 0.14);
    ctx.fillRect(0, h * 0.62, w, h * 0.14);
  }, 512, 512);
  p.tex.wrapS = RepeatWrapping;
  p.tex.wrapT = RepeatWrapping;
  p.tex.repeat.set(12, 1);
  return p.tex;
}

export function createHazardTexture() {
  const p = paint((ctx, w, h) => {
    ctx.fillStyle = "#eab308";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#1f2937";
    for (let i = -h; i < w + h; i += 48) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 24, 0);
      ctx.lineTo(i + 24 - h, h);
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

export function createSignTexture() {
  return paint((ctx, w, h) => {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#f7eedb");
    grad.addColorStop(1, "#e8d7ba");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#2b5c61";
    ctx.fillRect(0, 0, w, 24);
    ctx.fillRect(0, h - 24, w, 24);
    ctx.strokeStyle = "#d95d39";
    ctx.lineWidth = 8;
    ctx.strokeRect(18, 34, w - 36, h - 68);
    // Corner rivets
    ctx.fillStyle = "#8d7b68";
    for (const [rx, ry] of [
      [36, 52],
      [w - 36, 52],
      [36, h - 52],
      [w - 36, h - 52],
    ]) {
      ctx.beginPath();
      ctx.arc(rx, ry, 7, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "#1f2937";
    ctx.font = "900 96px Impact, Arial Black, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("WANTED FUEL", w / 2 + 4, h * 0.68 + 4);
    ctx.fillStyle = "#d95d39";
    ctx.fillText("WANTED FUEL", w / 2, h * 0.68);
  }, 1024, 280).tex;
}

export function createPumpFaceTexture() {
  return paint((ctx, w, h) => {
    ctx.fillStyle = "#efe4d2";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(24, 24, w - 48, 120);
    ctx.fillStyle = "#34d399";
    ctx.font = "800 44px monospace";
    ctx.textAlign = "right";
    ctx.fillText("088.50 $", w - 44, 86);
    ctx.fillStyle = "#fbbf24";
    ctx.font = "700 28px monospace";
    ctx.fillText("14.20 L", w - 44, 126);
    // Grade labels
    const cols = ["#10b981", "#f59e0b", "#ef4444", "#3b82f6"];
    const names = ["92", "95", "98", "D"];
    for (let i = 0; i < 4; i++) {
      const bx = 28 + i * 52;
      ctx.fillStyle = cols[i]!;
      ctx.fillRect(bx, 168, 42, 64);
      ctx.fillStyle = "#fff";
      ctx.font = "800 22px Arial";
      ctx.textAlign = "center";
      ctx.fillText(names[i]!, bx + 21, 208);
    }
  }, 256, 256).tex;
}

export function createBillTexture() {
  return paint((ctx, w, h) => {
    ctx.fillStyle = "#86efac";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#166534";
    ctx.lineWidth = 10;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.fillStyle = "#15803d";
    ctx.beginPath();
    ctx.ellipse(w / 2, h / 2, 42, 34, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#dcfce7";
    ctx.font = "900 44px Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("$", w / 2, h / 2 + 15);
    ctx.fillStyle = "#14532d";
    ctx.font = "800 22px Arial";
    ctx.fillText("100", 34, 38);
    ctx.fillText("100", w - 34, h - 22);
  }, 256, 128).tex;
}

export function createPlateTexture() {
  return paint((ctx, w, h) => {
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#1e293b";
    ctx.lineWidth = 8;
    ctx.strokeRect(6, 6, w - 12, h - 12);
    ctx.fillStyle = "#d95d39";
    ctx.fillRect(10, 10, w - 20, 22);
    ctx.fillStyle = "#0f172a";
    ctx.font = "900 46px monospace";
    ctx.textAlign = "center";
    ctx.fillText("77-SA-MAC", w / 2, 86);
  }, 256, 112).tex;
}

export function createMudTexture() {
  return paint((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const blobs = [
      [80, 90, 44],
      [135, 115, 36],
      [195, 85, 32],
      [110, 145, 28],
      [170, 140, 26],
      [60, 130, 22],
      [210, 125, 18],
    ];
    for (const [bx, by, br] of blobs) {
      ctx.fillStyle = "rgba(92, 54, 28, 0.85)";
      ctx.beginPath();
      ctx.ellipse(bx!, by!, br!, br! * 0.72, 0.25, 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = "rgba(118, 70, 36, 0.78)";
      ctx.beginPath();
      ctx.arc(30 + Math.random() * (w - 60), 40 + Math.random() * (h - 80), 3 + Math.random() * 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }, 256, 200).tex;
}

export function drawMonitor(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.fillStyle = "#111827";
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
  const tip = TIPS[sim.tipI] ?? "";
  wrap(ctx, tip, 32, 304, w - 64, 27);
  ctx.fillStyle = "#fbbf24";
  ctx.font = "600 21px Arial, sans-serif";
  ctx.fillText(`"${sim.review}"`, 32, 368);
}

export function drawPoster(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const face = WARRANTS[sim.warrant % WARRANTS.length]!;
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

export function drawBubble(ctx: CanvasRenderingContext2D, c: Car) {
  const w = 256;
  const h = 256;
  ctx.clearRect(0, 0, w, h);
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
    const gc = GRADES.find((g) => g.id === c.grade)?.color ?? "#1d4ed8";
    ctx.fillStyle = gc;
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

function wrap(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, max: number, lh: number) {
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
