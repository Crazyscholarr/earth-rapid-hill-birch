import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from "three";
import { GRADES, TIPS, WARRANTS } from "@/game/content";
import { sim, type Car } from "@/game/sim";

export function paint(draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void, w: number, h: number, srgb = true) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  draw(ctx, w, h);
  const tex = new CanvasTexture(canvas);
  if (srgb) tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return { canvas, ctx, tex, key: "" };
}

export function createSandTexture() {
  const p = paint((ctx, w, h) => {
    ctx.fillStyle = "#c49c6c";
    ctx.fillRect(0, 0, w, h);
    // Subtle stratified desert wind ripples
    for (let y = 0; y < h; y += 18) {
      ctx.fillStyle = y % 36 === 0 ? "rgba(148,106,62,0.13)" : "rgba(222,190,145,0.11)";
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= w; x += 32) {
        ctx.quadraticCurveTo(x + 16, y + Math.sin(x * 0.04) * 3.5, x + 32, y);
      }
      ctx.lineTo(w, y + 9);
      ctx.lineTo(0, y + 9);
      ctx.closePath();
      ctx.fill();
    }
    // Gravel, grit & desert pebbles
    for (let i = 0; i < 4500; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 0.6 + Math.random() * 2.0;
      ctx.fillStyle =
        i % 4 === 0 ? "rgba(96,68,42,0.28)" : i % 3 === 0 ? "rgba(155,112,68,0.25)" : "rgba(235,212,175,0.2)";
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

export function createSurfaceBumpTexture() {
  const p = paint(
    (ctx, w, h) => {
      ctx.fillStyle = "#808080";
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 6000; i++) {
        const v = 90 + Math.floor(Math.random() * 75);
        ctx.fillStyle = `rgb(${v},${v},${v})`;
        ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
      }
    },
    256,
    256,
    false,
  );
  p.tex.wrapS = RepeatWrapping;
  p.tex.wrapT = RepeatWrapping;
  p.tex.repeat.set(8, 8);
  return p.tex;
}

export function createConcreteTexture() {
  const p = paint((ctx, w, h) => {
    ctx.fillStyle = "#bdb6aa";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 3500; i++) {
      ctx.fillStyle = i % 2 === 0 ? "rgba(75,70,64,0.1)" : "rgba(245,242,235,0.09)";
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }
    // Subtle oil/water weathering patches
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

export function createAsphaltTexture() {
  const p = paint((ctx, w, h) => {
    ctx.fillStyle = "#2b2e35";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 6500; i++) {
      ctx.fillStyle = i % 3 === 0 ? "rgba(210,215,225,0.05)" : "rgba(12,14,18,0.25)";
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }
    // Worn tire tracks
    ctx.fillStyle = "rgba(15,17,20,0.28)";
    ctx.fillRect(0, h * 0.24, w, h * 0.14);
    ctx.fillRect(0, h * 0.62, w, h * 0.14);
    // Fine tar crack lines
    ctx.strokeStyle = "rgba(14,15,18,0.35)";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      let cx = Math.random() * w;
      let cy = Math.random() * h;
      ctx.moveTo(cx, cy);
      for (let s = 0; s < 5; s++) {
        cx += 18 + Math.random() * 24;
        cy += (Math.random() - 0.5) * 18;
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

export function createTireTreadTexture() {
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

export function createBrickTexture() {
  const p = paint((ctx, w, h) => {
    ctx.fillStyle = "#8a7868";
    ctx.fillRect(0, 0, w, h);
    const rows = 8;
    const cols = 4;
    const bh = h / rows;
    const bw = w / cols;
    for (let r = 0; r < rows; r++) {
      const off = (r % 2) * (bw / 2);
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

export function createHazardTexture() {
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

export function createSpongeTexture() {
  const p = paint((ctx, w, h) => {
    ctx.fillStyle = "#eab308";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 500; i++) {
      ctx.fillStyle = i % 2 === 0 ? "rgba(161,98,7,0.35)" : "rgba(254,240,138,0.4)";
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, 1 + Math.random() * 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, 128, 128);
  return p.tex;
}

export function createBunTexture() {
  const p = paint((ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 8, w / 2, h / 2, w / 2);
    g.addColorStop(0, "#d97706");
    g.addColorStop(1, "#b45309");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#fef3c7";
    for (let i = 0; i < 65; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * (w * 0.38);
      ctx.save();
      ctx.translate(w / 2 + Math.cos(a) * r, h / 2 + Math.sin(a) * r);
      ctx.rotate(Math.random() * Math.PI);
      ctx.beginPath();
      ctx.ellipse(0, 0, 3.2, 1.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }, 128, 128);
  return p.tex;
}

export function createSignTexture() {
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
    ctx.fillText("WANTED FUEL", w / 2 + 4, h * 0.68 + 4);
    ctx.fillStyle = "#c84b26";
    ctx.fillText("WANTED FUEL", w / 2, h * 0.68);
  }, 1024, 280).tex;
}

export function createPumpFaceTexture() {
  return paint((ctx, w, h) => {
    ctx.fillStyle = "#e7decb";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 8;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    // Backlit Digital LCD
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
    // Grade Buttons
    const cols = ["#10b981", "#f59e0b", "#ef4444", "#3b82f6"];
    const names = ["92", "95", "98", "D"];
    for (let i = 0; i < 4; i++) {
      const bx = 26 + i * 53;
      ctx.fillStyle = cols[i]!;
      ctx.fillRect(bx, 156, 44, 72);
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 3;
      ctx.strokeRect(bx, 156, 44, 72);
      ctx.fillStyle = "#fff";
      ctx.font = "800 22px Arial";
      ctx.textAlign = "center";
      ctx.fillText(names[i]!, bx + 22, 200);
    }
  }, 256, 256).tex;
}

export function createBillTexture() {
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

export function createPlateTexture() {
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
      ctx.fillStyle = "rgba(82, 48, 24, 0.88)";
      ctx.beginPath();
      ctx.ellipse(bx!, by!, br!, br! * 0.72, 0.25, 0, Math.PI * 2);
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

export function createConsoleLabelTexture(label: string, bg: string, fg = "#f8fafc") {
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

export function drawMonitor(ctx: CanvasRenderingContext2D, w: number, h: number) {
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
  const tip = TIPS[sim.tipI] ?? "";
  wrap(ctx, tip, 32, 304, w - 64, 27);
  ctx.fillStyle = "#fbbf24";
  ctx.font = "600 21px Arial, sans-serif";
  ctx.fillText(`"${sim.review}"`, 32, 368);
}

export function drawPoster(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const face = WARRANTS[sim.warrant % WARRANTS.length]!;
  ctx.fillStyle = "#efe6d1";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#b8a684";
  ctx.lineWidth = 6;
  ctx.strokeRect(16, 16, w - 32, h - 32);

  // Mugshot Height Measurement Lines
  ctx.fillStyle = "#e5dbc4";
  ctx.fillRect(46, 136, w - 92, 290);
  ctx.strokeStyle = "#a89878";
  ctx.lineWidth = 2;
  ctx.font = "700 18px monospace";
  ctx.textAlign = "left";
  const marks = ["6'2\"", "6'0\"", "5'10\"", "5'8\"", "5'6\"", "5'4\""];
  for (let i = 0; i < marks.length; i++) {
    const yy = 165 + i * 44;
    ctx.beginPath();
    ctx.moveTo(56, yy);
    ctx.lineTo(w - 56, yy);
    ctx.stroke();
    ctx.fillStyle = "#78716c";
    ctx.fillText(marks[i]!, 58, yy - 5);
  }

  ctx.fillStyle = "#991b1b";
  ctx.font = "900 72px Impact, Arial Black, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("WANTED", w / 2, 102);

  // Adult Shoulders & Collared Shirt
  ctx.fillStyle = face.shirt;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 110, 426);
  ctx.quadraticCurveTo(w / 2 - 105, 342, w / 2 - 32, 332);
  ctx.lineTo(w / 2 + 32, 332);
  ctx.quadraticCurveTo(w / 2 + 105, 342, w / 2 + 110, 426);
  ctx.closePath();
  ctx.fill();

  // Neck & Jawed Adult Face
  ctx.fillStyle = "#eab08e";
  ctx.fillRect(w / 2 - 22, 304, 44, 38);
  ctx.fillStyle = "#f2be9f";
  ctx.beginPath();
  ctx.ellipse(w / 2, 250, 56, 68, 0, 0, Math.PI * 2);
  ctx.fill();

  // Ears
  ctx.fillStyle = "#e6ad8b";
  ctx.beginPath();
  ctx.ellipse(w / 2 - 58, 252, 9, 18, 0, 0, Math.PI * 2);
  ctx.ellipse(w / 2 + 58, 252, 9, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hair (if no hat) or Cap
  if (!face.hat) {
    ctx.fillStyle = "#292524";
    ctx.beginPath();
    ctx.ellipse(w / 2, 198, 57, 28, 0, Math.PI, 0);
    ctx.fill();
  }

  // Realistic Eyes + Brows
  const er = face.id === "thief" ? 13 : 9;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.ellipse(w / 2 - 22, 240, er, er * 0.78, 0, 0, Math.PI * 2);
  ctx.ellipse(w / 2 + 22, 240, er, er * 0.78, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#18181b";
  ctx.beginPath();
  ctx.arc(w / 2 - 22, 240, 4.5, 0, Math.PI * 2);
  ctx.arc(w / 2 + 22, 240, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Eyebrows
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

  // Nose & Mouth
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

  // Mugshot Placard
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
