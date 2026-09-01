import type { ArtVariant } from '../../types';
import { mulberry32 } from '../../utils/format';

export interface DrawContext {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  /** Elapsed seconds. Frozen at 0 when motion is disabled. */
  t: number;
  accent: string;
  seed: number;
  /** 0.55 = thumbnail, 1 = card, 1.6 = hero. Scales line weight + detail. */
  scale: number;
}

const INK = '#0A0A0A';
const PAPER = '#F2F1ED';
const LINE = 'rgba(242,241,237,0.30)';
const LINE_SOFT = 'rgba(242,241,237,0.13)';

const bg = ({ ctx, w, h }: DrawContext) => {
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, w, h);
};

const noise2 = (x: number, y: number, seed: number) => {
  const n = Math.sin(x * 1.7 + seed) * Math.cos(y * 2.3 - seed * 0.7) + Math.sin((x + y) * 0.9 + seed * 1.3);
  return n / 2;
};

/* ---------------------------------------------------------------- lattice */
const lattice = (d: DrawContext) => {
  const { ctx, w, h, t, accent, seed, scale } = d;
  bg(d);
  const cols = Math.max(6, Math.round(11 * scale));
  const rows = Math.max(5, Math.round(8 * scale));
  const rand = mulberry32(seed);
  const bias = rand() * 3;
  const gx = w / (cols + 1);
  const gy = h / (rows + 1);
  ctx.lineWidth = Math.max(0.6, 0.9 * scale);

  const pt = (i: number, j: number) => {
    const nx = noise2(i * 0.42 + t * 0.16, j * 0.5, seed + bias);
    const ny = noise2(j * 0.38 - t * 0.12, i * 0.44, seed + 9);
    return [gx * (i + 1) + nx * gx * 0.72, gy * (j + 1) + ny * gy * 0.72] as const;
  };

  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      const [x, y] = pt(i, j);
      if (i < cols - 1) {
        const [x2, y2] = pt(i + 1, j);
        ctx.strokeStyle = (i + j) % 7 === 0 ? accent : LINE;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
      if (j < rows - 1) {
        const [x2, y2] = pt(i, j + 1);
        ctx.strokeStyle = LINE_SOFT;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }
  }
  // nodes
  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      const [x, y] = pt(i, j);
      const on = (i * 7 + j * 13 + Math.floor(t * 0.6)) % 11 === 0;
      ctx.fillStyle = on ? accent : PAPER;
      const r = on ? 2.1 * scale : 1.1 * scale;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
  }
};

/* ------------------------------------------------------------- atmosphere */
const atmosphere = (d: DrawContext) => {
  const { ctx, w, h, t, accent, seed, scale } = d;
  bg(d);
  const lines = Math.max(14, Math.round(34 * scale));
  ctx.lineWidth = Math.max(0.6, 0.85 * scale);
  for (let i = 0; i < lines; i += 1) {
    const p = i / (lines - 1);
    const amp = h * 0.09 * (0.4 + Math.sin(p * Math.PI) * 1.1);
    const isAccent = i % 9 === 3;
    ctx.strokeStyle = isAccent ? accent : `rgba(242,241,237,${0.08 + p * 0.2})`;
    ctx.beginPath();
    for (let x = 0; x <= w; x += Math.max(3, 6 / scale)) {
      const u = x / w;
      const y =
      h * p +
      Math.sin(u * 6.2 + p * 5 + t * 0.5 + seed) * amp * 0.5 +
      Math.sin(u * 13 - t * 0.28 + p * 9) * amp * 0.22;
      if (x === 0) ctx.moveTo(x, y);else
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  // station ticks
  ctx.fillStyle = accent;
  for (let i = 0; i < 5; i += 1) {
    const x = w * (0.12 + i * 0.19);
    const y = h * (0.2 + (Math.sin(seed + i * 2.1 + t * 0.3) + 1) / 2 * 0.6);
    ctx.fillRect(x - 1, y - 7 * scale, 2, 14 * scale);
  }
};

/* ---------------------------------------------------------------- channel */
const channel = (d: DrawContext) => {
  const { ctx, w, h, t, accent, seed, scale } = d;
  bg(d);
  const step = Math.max(3, 4 / scale);
  for (let y = 0; y < h; y += step) {
    const a = 0.03 + (Math.sin(y * 0.08 + t * 1.4 + seed) + 1) / 2 * 0.09;
    ctx.fillStyle = `rgba(242,241,237,${a})`;
    ctx.fillRect(0, y, w, 1);
  }
  const rand = mulberry32(seed + Math.floor(t * 1.4));
  for (let i = 0; i < 7; i += 1) {
    const y = rand() * h;
    const bh = 2 + rand() * 16 * scale;
    const bw = w * (0.15 + rand() * 0.7);
    ctx.fillStyle = i % 3 === 0 ? accent : 'rgba(242,241,237,0.12)';
    ctx.fillRect(rand() * (w - bw), y, bw, bh);
  }
  // frame
  ctx.strokeStyle = 'rgba(242,241,237,0.35)';
  ctx.lineWidth = Math.max(1, scale);
  ctx.strokeRect(w * 0.08, h * 0.14, w * 0.84, h * 0.72);
  ctx.fillStyle = accent;
  ctx.fillRect(w * 0.08, h * 0.14, 10 * scale, 3);
};

/* ----------------------------------------------------------------- garden */
const garden = (d: DrawContext) => {
  const { ctx, w, h, t, accent, seed, scale } = d;
  bg(d);
  const stems = Math.max(7, Math.round(19 * scale));
  const rand = mulberry32(seed);
  ctx.lineWidth = Math.max(0.7, 1 * scale);
  for (let i = 0; i < stems; i += 1) {
    const x = w / (stems + 1) * (i + 1);
    const life = 0.35 + rand() * 0.62;
    const sway = Math.sin(t * 0.4 + i) * 6 * scale;
    const top = h * (1 - life);
    ctx.strokeStyle = i % 6 === 2 ? accent : LINE;
    ctx.beginPath();
    ctx.moveTo(x, h);
    ctx.quadraticCurveTo(x + sway, h - (h - top) * 0.55, x + sway * 1.6, top);
    ctx.stroke();
    const buds = Math.round(life * 6);
    for (let b = 1; b <= buds; b += 1) {
      const p = b / (buds + 1);
      const bx = x + sway * 1.6 * p;
      const by = h - (h - top) * p;
      const len = 8 * scale * (1 - p) + 4;
      ctx.strokeStyle = LINE_SOFT;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + (b % 2 === 0 ? len : -len), by - len * 0.5);
      ctx.stroke();
      if (b === buds) {
        ctx.fillStyle = i % 6 === 2 ? accent : PAPER;
        ctx.fillRect(bx - 1.5 * scale, by - 1.5 * scale, 3 * scale, 3 * scale);
      }
    }
  }
  ctx.strokeStyle = 'rgba(242,241,237,0.28)';
  ctx.beginPath();
  ctx.moveTo(0, h - 0.5);
  ctx.lineTo(w, h - 0.5);
  ctx.stroke();
};

/* -------------------------------------------------------------- savepoint */
const savepoint = (d: DrawContext) => {
  const { ctx, w, h, t, accent, seed, scale } = d;
  bg(d);
  const cell = Math.max(6, Math.round(w / (26 * Math.max(0.7, scale))));
  const cols = Math.ceil(w / cell);
  const rows = Math.ceil(h / cell);
  const rand = mulberry32(seed);
  const heights = Array.from({ length: cols }, (_, i) =>
  Math.floor(rows * (0.42 + Math.sin(i * 0.35 + seed) * 0.16 + rand() * 0.16))
  );
  for (let i = 0; i < cols; i += 1) {
    for (let j = heights[i]; j < rows; j += 1) {
      const edge = j === heights[i];
      ctx.fillStyle = edge ? 'rgba(242,241,237,0.55)' : 'rgba(242,241,237,0.08)';
      ctx.fillRect(i * cell, j * cell, cell - 1, cell - 1);
    }
  }
  // player + save beacon
  const px = Math.floor((Math.sin(t * 0.45 + seed) + 1) / 2 * (cols - 4)) + 2;
  ctx.fillStyle = accent;
  ctx.fillRect(px * cell, (heights[px] - 2) * cell, cell - 1, cell * 2 - 1);
  const bx = Math.floor(cols * 0.78);
  ctx.fillStyle = 'rgba(242,241,237,0.9)';
  ctx.fillRect(bx * cell, (heights[bx] - 3) * cell, cell - 1, cell * 3 - 1);
  ctx.fillStyle = accent;
  ctx.fillRect(bx * cell, (heights[bx] - 4) * cell, cell - 1, cell - 1);
};

/* ----------------------------------------------------------------- signal */
const signal = (d: DrawContext) => {
  const { ctx, w, h, t, accent, seed, scale } = d;
  bg(d);
  const rows = Math.max(3, Math.round(6 * Math.min(1.4, scale)));
  for (let r = 0; r < rows; r += 1) {
    const cy = h / rows * (r + 0.5);
    const amp = h / rows * 0.42;
    ctx.lineWidth = Math.max(0.7, (r === 1 ? 1.5 : 0.8) * scale);
    ctx.strokeStyle = r === 1 ? accent : `rgba(242,241,237,${0.16 + r * 0.06})`;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 2) {
      const u = x / w;
      const env = Math.sin(u * Math.PI);
      const y =
      cy +
      Math.sin(u * (24 + r * 13) + t * (1.6 + r * 0.4) + seed) * amp * env * 0.6 +
      Math.sin(u * (73 + r * 31) - t * 2.1) * amp * env * 0.28;
      if (x === 0) ctx.moveTo(x, y);else
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.fillStyle = 'rgba(242,241,237,0.35)';
  for (let i = 0; i < 40; i += 1) ctx.fillRect(w / 40 * i, h - 2, 1, 2);
};

/* ------------------------------------------------------------------- null */
const nullObject = (d: DrawContext) => {
  const { ctx, w, h, t, seed, scale } = d;
  bg(d);
  const rand = mulberry32(seed);
  const bars = Math.max(4, Math.round(9 * scale));
  for (let i = 0; i < bars; i += 1) {
    const bw = w * (0.1 + rand() * 0.5);
    const x = rand() * (w - bw);
    const y = h * (i / bars) + rand() * 6;
    ctx.fillStyle = `rgba(242,241,237,${0.06 + rand() * 0.2})`;
    ctx.fillRect(x, y, bw, Math.max(2, 6 * scale));
  }
  const s = Math.min(w, h) * 0.34;
  ctx.fillStyle = INK;
  ctx.fillRect(w / 2 - s / 2, h / 2 - s / 2, s, s);
  ctx.strokeStyle = PAPER;
  ctx.lineWidth = Math.max(1, 1.2 * scale);
  ctx.strokeRect(w / 2 - s / 2, h / 2 - s / 2, s, s);
  const pulse = 0.35 + (Math.sin(t * 1.1) + 1) / 2 * 0.45;
  ctx.fillStyle = `rgba(242,241,237,${pulse})`;
  ctx.fillRect(w / 2 - 1, h / 2 - s * 0.28, 2, s * 0.56);
};

/* --------------------------------------------------------------- collapse */
const collapse = (d: DrawContext) => {
  const { ctx, w, h, t, accent, seed, scale } = d;
  bg(d);
  const cols = Math.max(8, Math.round(18 * scale));
  const cw = w / cols;
  const rows = Math.max(6, Math.round(12 * scale));
  const ch = h / rows;
  const rand = mulberry32(seed);
  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      const decay = j / rows;
      const n = (noise2(i * 0.5 + t * 0.08, j * 0.6, seed) + 1) / 2;
      const v = n * (1 - decay) + rand() * decay;
      ctx.fillStyle = `rgba(242,241,237,${(0.05 + v * 0.42).toFixed(3)})`;
      const inset = decay * cw * 0.3;
      ctx.fillRect(i * cw + inset * rand(), j * ch, cw - 1 - inset, ch - 1);
    }
  }
  ctx.fillStyle = accent;
  ctx.fillRect(0, h * 0.5 - 1, w, 2);
  ctx.fillRect(w * 0.5 - 1, 0, 2, h * 0.5);
};

/* ------------------------------------------------------------------- fork */
const fork = (d: DrawContext) => {
  const { ctx, w, h, t, accent, seed, scale } = d;
  bg(d);
  ctx.lineWidth = Math.max(0.8, 1.1 * scale);
  const branch = (x: number, y: number, dx: number, depth: number) => {
    if (depth === 0) return;
    const len = w * 0.13 * depth * 0.5;
    const spread = h * 0.09 * depth * 0.35;
    const wob = Math.sin(t * 0.5 + depth + seed) * 3;
    [-1, 1].forEach((dir) => {
      const nx = x + len;
      const ny = y + dir * spread + wob;
      ctx.strokeStyle = depth === 1 && dir === 1 ? accent : `rgba(242,241,237,${0.1 + depth * 0.1})`;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(nx, ny);
      ctx.stroke();
      ctx.fillStyle = dir === 1 && depth < 3 ? accent : PAPER;
      ctx.fillRect(nx - 1.5 * scale, ny - 1.5 * scale, 3 * scale, 3 * scale);
      branch(nx, ny, dx, depth - 1);
    });
  };
  ctx.strokeStyle = 'rgba(242,241,237,0.5)';
  ctx.beginPath();
  ctx.moveTo(0, h / 2);
  ctx.lineTo(w * 0.18, h / 2);
  ctx.stroke();
  branch(w * 0.18, h / 2, 1, Math.max(2, Math.round(3 * Math.min(1.2, scale))));
};

/* --------------------------------------------------------------- greyroom */
const greyroom = (d: DrawContext) => {
  const { ctx, w, h, t, accent, seed, scale } = d;
  bg(d);
  const vx = w * (0.5 + Math.sin(t * 0.2 + seed) * 0.06);
  const vy = h * 0.52;
  const inset = 0.16;
  const rx = w * inset;
  const ry = h * inset;
  ctx.strokeStyle = 'rgba(242,241,237,0.3)';
  ctx.lineWidth = Math.max(0.7, scale);
  ctx.strokeRect(rx, ry, w - rx * 2, h - ry * 2);
  const corners: [number, number][] = [
  [rx, ry],
  [w - rx, ry],
  [rx, h - ry],
  [w - rx, h - ry]];

  corners.forEach(([cx, cy]) => {
    ctx.strokeStyle = LINE_SOFT;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(vx, vy);
    ctx.stroke();
  });
  const steps = Math.max(4, Math.round(9 * scale));
  for (let i = 1; i <= steps; i += 1) {
    const k = i / (steps + 1);
    const x0 = rx + (vx - rx) * k;
    const y0 = ry + (vy - ry) * k;
    const x1 = w - rx + (vx - (w - rx)) * k;
    const y1 = h - ry + (vy - (h - ry)) * k;
    ctx.strokeStyle = `rgba(242,241,237,${0.16 * (1 - k)})`;
    ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
  }
  ctx.fillStyle = accent;
  ctx.fillRect(vx - 2 * scale, vy - 2 * scale, 4 * scale, 4 * scale);
};

export const renderers: Record<ArtVariant, (d: DrawContext) => void> = {
  lattice,
  atmosphere,
  channel,
  garden,
  savepoint,
  signal,
  null: nullObject,
  collapse,
  fork,
  greyroom
};