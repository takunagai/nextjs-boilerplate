/**
 * Constellation のジオメトリ管理フック
 */
import { useMemo } from "react";
import * as THREE from "three";

import { BUFFER_SIZES } from "@/constants/constellation";
import type { GeometryRefs } from "@/types/constellation";

export function useConstellationGeometries(nodeCount: number): GeometryRefs {
	const geometries = useMemo(() => {
		const pointsGeo = new THREE.BufferGeometry();
		const lineGeo = new THREE.BufferGeometry();
		const particleGeo = new THREE.BufferGeometry();
		const rippleGeo = new THREE.BufferGeometry();

		// メインノード用ジオメトリ
		const positions = new Float32Array(nodeCount * 3);
		const colors = new Float32Array(nodeCount * 3);
		const sizes = new Float32Array(nodeCount);

		for (let i = 0; i < nodeCount; i++) {
			positions[i * 3] = 0;
			positions[i * 3 + 1] = 0;
			positions[i * 3 + 2] = 0;

			// 青〜紫のグラデーション
			colors[i * 3] = 0.4 + Math.random() * 0.3; // R
			colors[i * 3 + 1] = 0.6 + Math.random() * 0.3; // G
			colors[i * 3 + 2] = 0.9 + Math.random() * 0.1; // B

			sizes[i] = 0.05 + Math.random() * 0.05;
		}

		pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
		pointsGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
		pointsGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

		// ライン用ジオメトリ（動的に更新）
		lineGeo.setAttribute(
			"position",
			new THREE.BufferAttribute(new Float32Array(nodeCount * nodeCount * 6), 3),
		);
		lineGeo.setAttribute(
			"color",
			new THREE.BufferAttribute(new Float32Array(nodeCount * nodeCount * 6), 3),
		);

		// パーティクル用ジオメトリ
		particleGeo.setAttribute(
			"position",
			new THREE.BufferAttribute(
				new Float32Array(BUFFER_SIZES.MAX_PARTICLES * 3),
				3,
			),
		);
		particleGeo.setAttribute(
			"color",
			new THREE.BufferAttribute(
				new Float32Array(BUFFER_SIZES.MAX_PARTICLES * 3),
				3,
			),
		);
		particleGeo.setAttribute(
			"size",
			new THREE.BufferAttribute(
				new Float32Array(BUFFER_SIZES.MAX_PARTICLES),
				1,
			),
		);

		// 波紋用ジオメトリ
		const rippleBufferSize =
			BUFFER_SIZES.MAX_RIPPLES * BUFFER_SIZES.RIPPLE_SEGMENTS * 2 * 3;
		rippleGeo.setAttribute(
			"position",
			new THREE.BufferAttribute(new Float32Array(rippleBufferSize), 3),
		);
		rippleGeo.setAttribute(
			"color",
			new THREE.BufferAttribute(new Float32Array(rippleBufferSize), 3),
		);

		return {
			pointsGeometry: pointsGeo,
			lineGeometry: lineGeo,
			particleGeometry: particleGeo,
			rippleGeometry: rippleGeo,
		};
	}, [nodeCount]);

	return geometries;
}
