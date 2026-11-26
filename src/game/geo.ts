import { BufferAttribute, Color, Euler, Matrix4, Quaternion, Vector3, type BufferGeometry } from "three";
import { mergeGeometries, mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const _m = new Matrix4();
const _p = new Vector3();
const _q = new Quaternion();
const _e = new Euler();
const _s = new Vector3();
const _c = new Color();

function normalizeIndexed(
  geo: BufferGeometry,
  pos?: [number, number, number],
  rot?: [number, number, number],
  scale?: [number, number, number] | number,
): BufferGeometry {
  const g = geo.index ? geo.clone() : mergeVertices(geo, 1e-4);
  if (!g.attributes.normal) g.computeVertexNormals();
  const count = g.attributes.position!.count;
  if (!g.attributes.uv) {
    g.setAttribute("uv", new BufferAttribute(new Float32Array(count * 2), 2));
  }
  for (const key of Object.keys(g.attributes)) {
    if (key !== "position" && key !== "normal" && key !== "uv" && key !== "color") {
      g.deleteAttribute(key);
    }
  }
  if (pos || rot || scale !== undefined) {
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

export function placeGeo(
  geo: BufferGeometry,
  pos?: [number, number, number],
  rot?: [number, number, number],
  scale?: [number, number, number] | number,
): BufferGeometry {
  const g = normalizeIndexed(geo, pos, rot, scale);
  if (g.attributes.color) g.deleteAttribute("color");
  return g;
}

export function colorGeo(
  geo: BufferGeometry,
  hex: string,
  pos?: [number, number, number],
  rot?: [number, number, number],
  scale?: [number, number, number] | number,
): BufferGeometry {
  const g = normalizeIndexed(geo, pos, rot, scale);
  const count = g.attributes.position!.count;
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

export function mergeParts(parts: BufferGeometry[]): BufferGeometry {
  const normalized = parts.map((p) => (!p.index || !p.attributes.uv ? placeGeo(p) : p));
  const merged = mergeGeometries(normalized, false);
  for (const n of normalized) n.dispose();
  if (!merged) throw new Error("Failed to merge geometries");
  return merged;
}

export function mergeColoredParts(parts: BufferGeometry[]): BufferGeometry {
  const merged = mergeGeometries(parts, false);
  for (const p of parts) p.dispose();
  if (!merged) throw new Error("Failed to merge colored geometries");
  return merged;
}
