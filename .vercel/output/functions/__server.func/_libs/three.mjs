import { a as BufferAttribute, o as BufferGeometry } from "./@react-three/fiber+[...].mjs";
//#region node_modules/three/examples/jsm/utils/BufferGeometryUtils.js
/**
* Merges a set of geometries into a single instance. All geometries must have compatible attributes.
*
* @param {Array<BufferGeometry>} geometries - The geometries to merge.
* @param {boolean} [useGroups=false] - Whether to use groups or not.
* @return {?BufferGeometry} The merged geometry. Returns `null` if the merge does not succeed.
*/
function mergeGeometries(geometries, useGroups = false) {
	const isIndexed = geometries[0].index !== null;
	const attributesUsed = new Set(Object.keys(geometries[0].attributes));
	const morphAttributesUsed = new Set(Object.keys(geometries[0].morphAttributes));
	const attributes = {};
	const morphAttributes = {};
	const morphTargetsRelative = geometries[0].morphTargetsRelative;
	const mergedGeometry = new BufferGeometry();
	mergedGeometry.morphTargetsRelative = morphTargetsRelative;
	let offset = 0;
	for (let i = 0; i < geometries.length; ++i) {
		const geometry = geometries[i];
		let attributesCount = 0;
		let morphAttributesCount = 0;
		if (isIndexed !== (geometry.index !== null)) {
			console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.");
			return null;
		}
		for (const name in geometry.attributes) {
			if (!attributesUsed.has(name)) {
				console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". All geometries must have compatible attributes; make sure \"" + name + "\" attribute exists among all geometries, or in none of them.");
				return null;
			}
			if (attributes[name] === void 0) attributes[name] = [];
			attributes[name].push(geometry.attributes[name]);
			attributesCount++;
		}
		if (attributesCount !== attributesUsed.size) {
			console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". Make sure all geometries have the same number of attributes.");
			return null;
		}
		if (morphTargetsRelative !== geometry.morphTargetsRelative) {
			console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". .morphTargetsRelative must be consistent throughout all geometries.");
			return null;
		}
		for (const name in geometry.morphAttributes) {
			if (!morphAttributesUsed.has(name)) {
				console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ".  .morphAttributes must be consistent throughout all geometries.");
				return null;
			}
			if (geometry.morphAttributes[name].length !== geometries[0].morphAttributes[name].length) {
				console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". All geometries must have the same number of morph targets for the \"" + name + "\" morph attribute.");
				return null;
			}
			if (morphAttributes[name] === void 0) morphAttributes[name] = [];
			morphAttributes[name].push(geometry.morphAttributes[name]);
			morphAttributesCount++;
		}
		if (morphAttributesCount !== morphAttributesUsed.size) {
			console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". Make sure all geometries have the same number of morph attributes.");
			return null;
		}
		if (useGroups) {
			let count;
			if (isIndexed) count = geometry.index.count;
			else if (geometry.attributes.position !== void 0) count = geometry.attributes.position.count;
			else {
				console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " + i + ". The geometry must have either an index or a position attribute");
				return null;
			}
			mergedGeometry.addGroup(offset, count, i);
			offset += count;
		}
	}
	if (isIndexed) {
		let indexOffset = 0;
		const mergedIndex = [];
		for (let i = 0; i < geometries.length; ++i) {
			const index = geometries[i].index;
			for (let j = 0; j < index.count; ++j) mergedIndex.push(index.getX(j) + indexOffset);
			indexOffset += geometries[i].attributes.position.count;
		}
		mergedGeometry.setIndex(mergedIndex);
	}
	for (const name in attributes) {
		const mergedAttribute = mergeAttributes(attributes[name]);
		if (!mergedAttribute) {
			console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + name + " attribute.");
			return null;
		}
		mergedGeometry.setAttribute(name, mergedAttribute);
	}
	for (const name in morphAttributes) {
		const numMorphTargets = morphAttributes[name][0].length;
		if (numMorphTargets === 0) continue;
		mergedGeometry.morphAttributes = mergedGeometry.morphAttributes || {};
		mergedGeometry.morphAttributes[name] = [];
		for (let i = 0; i < numMorphTargets; ++i) {
			const morphAttributesToMerge = [];
			for (let j = 0; j < morphAttributes[name].length; ++j) morphAttributesToMerge.push(morphAttributes[name][j][i]);
			const mergedMorphAttribute = mergeAttributes(morphAttributesToMerge);
			if (!mergedMorphAttribute) {
				console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " + name + " morphAttribute.");
				return null;
			}
			mergedGeometry.morphAttributes[name].push(mergedMorphAttribute);
		}
	}
	return mergedGeometry;
}
/**
* Merges a set of attributes into a single instance. All attributes must have compatible properties and types.
* Instances of {@link InterleavedBufferAttribute} are not supported.
*
* @param {Array<BufferAttribute>} attributes - The attributes to merge.
* @return {?BufferAttribute} The merged attribute. Returns `null` if the merge does not succeed.
*/
function mergeAttributes(attributes) {
	let TypedArray;
	let itemSize;
	let normalized;
	let gpuType = -1;
	let arrayLength = 0;
	for (let i = 0; i < attributes.length; ++i) {
		const attribute = attributes[i];
		if (TypedArray === void 0) TypedArray = attribute.array.constructor;
		if (TypedArray !== attribute.array.constructor) {
			console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.");
			return null;
		}
		if (itemSize === void 0) itemSize = attribute.itemSize;
		if (itemSize !== attribute.itemSize) {
			console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.");
			return null;
		}
		if (normalized === void 0) normalized = attribute.normalized;
		if (normalized !== attribute.normalized) {
			console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.");
			return null;
		}
		if (gpuType === -1) gpuType = attribute.gpuType;
		if (gpuType !== attribute.gpuType) {
			console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.");
			return null;
		}
		arrayLength += attribute.count * itemSize;
	}
	const array = new TypedArray(arrayLength);
	const result = new BufferAttribute(array, itemSize, normalized);
	let offset = 0;
	for (let i = 0; i < attributes.length; ++i) {
		const attribute = attributes[i];
		if (attribute.isInterleavedBufferAttribute) {
			const tupleOffset = offset / itemSize;
			for (let j = 0, l = attribute.count; j < l; j++) for (let c = 0; c < itemSize; c++) {
				const value = attribute.getComponent(j, c);
				result.setComponent(j + tupleOffset, c, value);
			}
		} else array.set(attribute.array, offset);
		offset += attribute.count * itemSize;
	}
	if (gpuType !== void 0) result.gpuType = gpuType;
	return result;
}
/**
* Returns a new geometry with vertices for which all similar vertex attributes (within tolerance) are merged.
*
* @param {BufferGeometry} geometry - The geometry to merge vertices for.
* @param {number} [tolerance=1e-4] - The tolerance value.
* @return {BufferGeometry} - The new geometry with merged vertices.
*/
function mergeVertices(geometry, tolerance = 1e-4) {
	tolerance = Math.max(tolerance, Number.EPSILON);
	const hashToIndex = {};
	const indices = geometry.getIndex();
	const positions = geometry.getAttribute("position");
	const vertexCount = indices ? indices.count : positions.count;
	let nextIndex = 0;
	const attributeNames = Object.keys(geometry.attributes);
	const sourceIndices = [];
	const buffers = /* @__PURE__ */ new Map();
	const newIndices = [];
	const getters = [
		"getX",
		"getY",
		"getZ",
		"getW"
	];
	const halfTolerance = tolerance * .5;
	const exponent = Math.log10(1 / tolerance);
	const hashMultiplier = Math.pow(10, exponent);
	const hashAdditive = halfTolerance * hashMultiplier;
	for (let i = 0; i < vertexCount; i++) {
		const index = indices ? indices.getX(i) : i;
		let hash = "";
		for (let j = 0, l = attributeNames.length; j < l; j++) {
			const name = attributeNames[j];
			const attribute = geometry.getAttribute(name);
			const itemSize = attribute.itemSize;
			for (let k = 0; k < itemSize; k++) hash += `${Math.trunc(attribute[getters[k]](index) * hashMultiplier + hashAdditive)},`;
		}
		if (hash in hashToIndex) newIndices.push(hashToIndex[hash]);
		else {
			sourceIndices.push(index);
			hashToIndex[hash] = nextIndex;
			newIndices.push(nextIndex);
			nextIndex++;
		}
	}
	const result = geometry.clone();
	for (const name in geometry.attributes) result.setAttribute(name, remapAttribute(geometry.attributes[name], sourceIndices, buffers));
	for (const name in geometry.morphAttributes) result.morphAttributes[name] = geometry.morphAttributes[name].map((attribute) => remapAttribute(attribute, sourceIndices, buffers));
	result.setIndex(newIndices);
	return result;
}
/**
* Copies attribute entries in the order specified by the source vertex indices.
* Preserves raw values, attribute type and metadata. Reuse the same buffer map
* across calls to preserve shared interleaved buffers for the same mapping.
*
* @param {BufferAttribute|InterleavedBufferAttribute} attribute - The source attribute.
* @param {Array<number>|TypedArray} sourceIndices - The source index for each output vertex.
* @param {Map<InterleavedBuffer, InterleavedBuffer>} [buffers] - Shared interleaved buffer copies.
* @return {BufferAttribute|InterleavedBufferAttribute} The remapped attribute.
*/
function remapAttribute(attribute, sourceIndices, buffers = /* @__PURE__ */ new Map()) {
	const interleaved = attribute.isInterleavedBufferAttribute;
	const source = interleaved ? attribute.data : attribute;
	const stride = interleaved ? source.stride : attribute.itemSize;
	let data = interleaved ? buffers.get(source) : void 0;
	if (data === void 0) {
		const array = new source.array.constructor(sourceIndices.length * stride);
		for (let i = 0; i < sourceIndices.length; i++) for (let j = 0; j < stride; j++) array[i * stride + j] = source.array[sourceIndices[i] * stride + j];
		data = interleaved ? new source.constructor(array, stride, source.meshPerAttribute) : new attribute.constructor(array, attribute.itemSize, attribute.normalized, attribute.meshPerAttribute);
		data.setUsage(source.usage);
		if (interleaved) buffers.set(source, data);
	}
	const result = interleaved ? new attribute.constructor(data, attribute.itemSize, attribute.offset, attribute.normalized) : data;
	result.name = attribute.name;
	if (!interleaved) result.gpuType = attribute.gpuType;
	return result;
}
//#endregion
export { mergeVertices as n, mergeGeometries as t };
