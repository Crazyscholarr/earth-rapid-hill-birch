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

export function createAoShadowTexture() {
  return paint((ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createRadialGradient(w / 2, h / 2, w * 0.08, w / 2, h / 2, w * 0.48);
    g.addColorStop(0, "rgba(10, 12, 16, 0.62)");
    g.addColorStop(0.55, "rgba(10, 12, 16, 0.34)");
    g.addColorStop(1, "rgba(10, 12, 16, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }, 256, 256).tex;
}

export function createSandTexture() {
  const p = paint((ctx, w, h) => {
    ctx.fillStyle = "#b58d5e";
    ctx.fillRect(0, 0, w, h);
    // Natural desert soil mottling
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
    // Wind-blown sand ripples
    for (let y = 0; y < h; y += 16) {
      ctx.strokeStyle = y % 32 === 0 ? "rgba(120,82,45,0.16)" : "rgba(232,202,158,0.14)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= w; x += 32) {
        ctx.quadraticCurveTo(x + 16, y + Math.sin(x * 0.05 + y) * 3, x + 32, y);
      }
      ctx.stroke();
    }
    // Fine desert gravel & stones
    for (let i = 0; i < 6000; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 0.5 + Math.random() * 2.1;
      ctx.fillStyle =
        i % 4 === 0 ? "rgba(78,54,32,0.34)" : i % 3 === 0 ? "rgba(142,102,62,0.28)" : "rgba(236,212,175,0.22)";
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

export function createCanyonRockTexture() {
  const p = paint((ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#b56e45");
    g.addColorStop(0.25, "#9c5835");
    g.addColorStop(0.45, "#c27d52");
    g.addColorStop(0.68, "#874a2c");
    g.addColorStop(0.85, "#a8643e");
    g.addColorStop(1, "#7a4429");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // Geological sedimentary rock strata lines
    for (let y = 8; y < h; y += 10) {
      ctx.strokeStyle = y % 20 === 0 ? "rgba(58,30,16,0.28)" : "rgba(235,180,135,0.16)";
      ctx.lineWidth = 2 + (y % 3);
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= w; x += 32) {
        ctx.lineTo(x, y + Math.sin(x * 0.04 + y * 0.2) * 3);
      }
      ctx.stroke();
    }
    // Vertical erosion fissures
    ctx.strokeStyle = "rgba(45,22,12,0.22)";
    ctx.lineWidth = 2;
    for (let x = 16; x < w; x += 28) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + (Math.random() - 0.5) * 14, h);
      ctx.stroke();
    }
  }, 512, 512);
  p.tex.wrapS = RepeatWrapping;
  p.tex.wrapT = RepeatWrapping;
  p.tex.repeat.set(2, 1);
  return p.tex;
}

export function createSurfaceBumpTexture() {
  const p = paint(
    (ctx, w, h) => {
      ctx.fillStyle = "#808080";
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 7500; i++) {
        const v = 85 + Math.floor(Math.random() * 85);
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

export function createAsphaltTexture() {
  const p = paint((ctx, w, h) => {
    ctx.fillStyle = "#23262d";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 8000; i++) {
      ctx.fillStyle = i % 3 === 0 ? "rgba(200,206,218,0.065)" : "rgba(10,12,15,0.32)";
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }
    // Worn tire tracks
    ctx.fillStyle = "rgba(12,13,16,0.34)";
    ctx.fillRect(0, h * 0.22, w, h * 0.16);
    ctx.fillRect(0, h * 0.62, w, h * 0.16);
    // Tar sealed cracks
    ctx.strokeStyle = "rgba(10,11,14,0.5)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      let cx = Math.random() * w;
      let cy = Math.random() * h;
      ctx.moveTo(cx, cy);
      for (let s = 0; s < 6; s++) {
        cx += 18 + Math.random() * 28;
        cy += (Math.random() - 0.5) * 20;
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

export function createStoreWindowTexture(variant: "left" | "right") {
  return paint((ctx, w, h) => {
    // Warm convenience store interior background
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "#3a2e22");
    bg.addColorStop(0.25, "#5c4732");
    bg.addColorStop(1, "#241c14");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Ceiling fluorescent light strips inside store
    ctx.fillStyle = "#fef3c7";
    ctx.fillRect(40, 18, 160, 10);
    ctx.fillRect(280, 18, 160, 10);

    if (variant === "left") {
      // Glowing Beverage Fridges on back wall
      for (let f = 0; f < 3; f++) {
        const fx = 36 + f * 145;
        ctx.fillStyle = "#1e293b";
        ctx.fillRect(fx, 52, 130, 185);
        ctx.fillStyle = "#bae6fd";
        ctx.fillRect(fx + 8, 60, 114, 168);
        // Shelves with colorful drink cans
        const drinkCols = ["#ef4444", "#22c55e", "#f59e0b", "#3b82f6", "#a855f7"];
        for (let s = 0; s < 4; s++) {
          const sy = 88 + s * 36;
          ctx.fillStyle = "#334155";
          ctx.fillRect(fx + 8, sy + 18, 114, 4);
          for (let c = 0; c < 7; c++) {
            ctx.fillStyle = drinkCols[(c + s + f) % drinkCols.length]!;
            ctx.fillRect(fx + 14 + c * 15, sy, 11, 18);
          }
        }
      }
      // Neon "OPEN 24H" sign in corner of window
      ctx.fillStyle = "rgba(15,23,42,0.82)";
      ctx.fillRect(26, 26, 136, 46);
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 3;
      ctx.strokeRect(28, 28, 132, 42);
      ctx.fillStyle = "#fca5a5";
      ctx.font = "900 24px Arial";
      ctx.textAlign = "center";
      ctx.fillText("OPEN 24H", 94, 58);
    } else {
      // Snack aisles & hot coffee counter
      for (let s = 0; s < 3; s++) {
        const sy = 90 + s * 46;
        ctx.fillStyle = "#44403c";
        ctx.fillRect(36, sy + 24, w - 72, 7);
        const snackCols = ["#eab308", "#dc2626", "#2563eb", "#16a34a", "#f97316"];
        for (let b = 0; b < 14; b++) {
          ctx.fillStyle = snackCols[(b + s) % snackCols.length]!;
          ctx.fillRect(46 + b * 29, sy, 22, 24);
        }
      }
      // Neon "COFFEE & SNACKS" sign
      ctx.fillStyle = "rgba(15,23,42,0.82)";
      ctx.fillRect(w - 210, 26, 184, 46);
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 3;
      ctx.strokeRect(w - 208, 28, 180, 42);
      ctx.fillStyle = "#fde68a";
      ctx.font = "900 20px Arial";
      ctx.textAlign = "center";
      ctx.fillText("COFFEE · MART", w - 118, 56);
    }

    // Diagonal glass reflection sheen
    const sheen = ctx.createLinearGradient(0, 0, w, h);
    sheen.addColorStop(0, "rgba(255,255,255,0.12)");
    sheen.addColorStop(0.35, "rgba(255,255,255,0.02)");
    sheen.addColorStop(0.5, "rgba(255,255,255,0.14)");
    sheen.addColorStop(0.65, "rgba(255,255,255,0.0)");
    sheen.addColorStop(1, "rgba(255,255,255,0.08)");
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, w, h);
  }, 512, 280).tex;
}

export function createPriceTotemTexture() {
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

    const rows: [string, string, string][] = [
      ["RON 92", "36.0", "#10b981"],
      ["RON 95", "48.0", "#f59e0b"],
      ["RON 98", "72.0", "#ef4444"],
      ["DIESEL", "54.0", "#38bdf8"],
    ];
    rows.forEach(([label, price, col], i) => {
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

export function createPumpTopperTexture() {
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

export function createVendingFrontTexture() {
  return paint((ctx, w, h) => {
    ctx.fillStyle = "#991b1b";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#dc2626";
    ctx.fillRect(12, 12, w - 24, 72);
    ctx.fillStyle = "#fef2f2";
    ctx.font = "900 30px Impact, Arial Black, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ICE COLD SODA", w / 2, 58);

    // Lit bottle display window
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(16, 96, w - 82, 196);
    const cols = ["#ef4444", "#22c55e", "#f59e0b", "#38bdf8"];
    for (let r = 0; r < 4; r++) {
      const sy = 114 + r * 45;
      ctx.fillStyle = "#475569";
      ctx.fillRect(22, sy + 24, w - 94, 4);
      for (let c = 0; c < 5; c++) {
        ctx.fillStyle = cols[(r + c) % cols.length]!;
        ctx.fillRect(28 + c * 26, sy, 18, 24);
      }
    }
    // Coin & selection button strip on right
    ctx.fillStyle = "#18181b";
    ctx.fillRect(w - 58, 96, 42, 196);
    for (let b = 0; b < 6; b++) {
      ctx.fillStyle = cols[b % cols.length]!;
      ctx.fillRect(w - 48, 120 + b * 24, 22, 14);
    }
    // Pickup bin at bottom
    ctx.fillStyle = "#09090b";
    ctx.fillRect(24, 312, w - 48, 48);
    ctx.strokeStyle = "#475569";
    ctx.lineWidth = 3;
    ctx.strokeRect(24, 312, w - 48, 48);
  }, 240, 384).tex;
}

export function createTireTreadTexture() {
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

export function createBrickTexture() {
  const p = paint((ctx, w, h) => {
    ctx.fillStyle = "#6e5f52";
    ctx.fillRect(0, 0, w, h);
    const rows = 8;
    const cols = 4;
    const bh = h / rows;
    const bw = w / cols;
    for (let r = 0; r < rows; r++) {
      const off = (r % 2) * (bw / 2);
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

export function createBunTexture() {
  return paint((ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 8, w / 2, h / 2, w / 2);
    g.addColorStop(0, "#d97706");
    g.addColorStop(1, "#9a3412");
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
  }, 128, 128).tex;
}

export function createSignTexture() {
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
    ctx.fillText("WANTED FUEL", w / 2 + 5, h * 0.66 + 5);
    ctx.fillStyle = "#fef3c7";
    ctx.fillText("WANTED FUEL", w / 2, h * 0.66);
    ctx.fillStyle = "#fde68a";
    ctx.font = "700 26px Arial, sans-serif";
    ctx.fillText("SERVICE STATION  ·  DIESEL  ·  DINER  ·  EV", w / 2, h * 0.86);
  }, 1024, 280).tex;
}

export function createPumpFaceTexture() {
  return paint((ctx, w, h) => {
    ctx.fillStyle = "#18181b";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#52525b";
    ctx.lineWidth = 6;
    ctx.strokeRect(6, 6, w - 12, h - 12);

    // Backlit Digital LCD
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

    // 4 Octane Selector Pads
    const cols = ["#10b981", "#f59e0b", "#ef4444", "#3b82f6"];
    const names = ["92", "95", "98", "DẦU"];
    for (let i = 0; i < 4; i++) {
      const bx = 18 + i * 56;
      ctx.fillStyle = cols[i]!;
      ctx.fillRect(bx, 152, 48, 78);
      ctx.fillStyle = "#09090b";
      ctx.fillRect(bx + 4, 156, 40, 24);
      ctx.fillStyle = "#fff";
      ctx.font = "900 16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(names[i]!, bx + 24, 174);
      ctx.fillStyle = "#18181b";
      ctx.font = "800 14px monospace";
      ctx.fillText("PUSH", bx + 24, 214);
    }

    // Card Reader & Keypad Row
    ctx.fillStyle = "#27272a";
    ctx.fillRect(18, 244, w - 36, 56);
    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(30, 256, 56, 32);
    ctx.fillStyle = "#cbd5e1";
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 4; c++) {
        ctx.fillRect(116 + c * 26, 252 + r * 14, 18, 9);
      }
    }
  }, 256, 320).tex;
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
    ctx.fillStyle = "#b94827";
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
      ctx.fillStyle = "rgba(76, 44, 22, 0.9)";
      ctx.beginPath();
      ctx.ellipse(bx!, by!, br!, br! * 0.72, 0.25, 0, Math.PI * 2);
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
  ctx.strokeStyle = "#a89674";
  ctx.lineWidth = 6;
  ctx.strokeRect(16, 16, w - 32, h - 32);

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

  ctx.fillStyle = face.shirt;
  ctx.beginPath();
  ctx.moveTo(w / 2 - 110, 426);
  ctx.quadraticCurveTo(w / 2 - 105, 342, w / 2 - 32, 332);
  ctx.lineTo(w / 2 + 32, 332);
  ctx.quadraticCurveTo(w / 2 + 105, 342, w / 2 + 110, 426);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#d99e7e";
  ctx.fillRect(w / 2 - 22, 304, 44, 38);
  ctx.fillStyle = "#e8b393";
  ctx.beginPath();
  ctx.ellipse(w / 2, 250, 56, 68, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#d99e7e";
  ctx.beginPath();
  ctx.ellipse(w / 2 - 58, 252, 9, 18, 0, 0, Math.PI * 2);
  ctx.ellipse(w / 2 + 58, 252, 9, 18, 0, 0, Math.PI * 2);
  ctx.fill();

  if (!face.hat) {
    ctx.fillStyle = "#27272a";
    ctx.beginPath();
    ctx.ellipse(w / 2, 198, 57, 28, 0, Math.PI, 0);
    ctx.fill();
  }

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

  ctx.strokeStyle = "#27272a";
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

  ctx.strokeStyle = "#b07252";
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

export function drawBubble(ctx: CanvasRenderingContext2D, c: Car) {
  const w = 256;
  const h = 256;
  ctx.clearRect(0, 0, w, h);
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
    const gc = GRADES.find((g) => g.id === c.grade)?.color ?? "#f59e0b";
    ctx.fillStyle = gc;
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
