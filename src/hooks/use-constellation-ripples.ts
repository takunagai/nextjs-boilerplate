/**
 * Constellation の波紋管理フック
 */
import { useState } from "react";
import type * as THREE from "three";

import type { RippleData } from "@/types/constellation";

export function useConstellationRipples() {
	const [ripples, setRipples] = useState<RippleData[]>([]);

	const createRipple = (position: THREE.Vector3) => {
		const newRipple: RippleData = {
			position: position.clone(),
			radius: 0,
			maxRadius: 5 + Math.random() * 3,
			life: 1,
			maxLife: 1,
		};
		setRipples((prev) => [...prev, newRipple]);
	};

	const updateRipples = () => {
		setRipples((prev) => prev.filter((r) => r.life > 0));
	};

	return {
		ripples,
		setRipples,
		createRipple,
		updateRipples,
	};
}
