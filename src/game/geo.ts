import { BufferAttribute, Euler, Matrix4, Quaternion, Vector3, type BufferGeometry } from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const _m = new Matrix4();
const _p = new Vector3();
const _q = new Quaternion();
const _e = new Euler();
const _s = new Vector3();

export function placeGeo(
  geo: BufferGeometry,
  pos?: [number, number, number],
  rot?: [number, number, number],
  scale?: [number, number, number] | number,
): BufferGeometry {
  const g = geo.index ? geo.toNonIndexed() : geo.clone();
  // Ensure consistent attributes (position, normal, uv) across all primitives
  if (!g.attributes.normal) g.computeVertexNormals();
  const count = g.attributes.position!.count;
  if (!g.attributes.uv) {
    g.setAttribute("uv", new BufferAttribute(new Float32Array(count * 2), 2));
  }
  for (const key of Object.keys(g.attributes)) {
    if (key !== "position" && key !== "normal" && key !== "uv") {
      g.deleteAttribute(key);
    }
  }
  _p.set(pos?.[0] ?? 0, pos?.[1] ?? 0, pos?.[2] ?? 0);
  _e.set(rot?.[0] ?? 0, rot?.[1] ?? 0, rot?.[2] ?? 0);
  _q.setFromEuler(_e);
  if (typeof scale === "number") _s.set(scale, scale, scale);
  else _s.set(scale?.[0] ?? 1, scale?.[1] ?? 1, scale?.[2] ?? 1);
  _m.compose(_p, _q, _s);
  g.applyMatrix4(_m);
  return g;
}

export function mergeParts(parts: BufferGeometry[]): BufferGeometry {
  const normalized = parts.map((p) => (p.index || !p.attributes.uv ? placeGeo(p) : p));
  const merged = mergeGeometries(normalized, false);
  if (!merged) throw new Error("Failed to merge geometries");
  return merged;
}
