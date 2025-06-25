/**
 * Constellation のマウスインタラクション管理フック
 */
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { ANIMATION_CONSTANTS } from "@/constants/constellation";
import type { MouseState } from "@/types/constellation";

interface UseConstellationMouseProps {
	mouseInfluence: boolean;
	onMouseClick: (position: THREE.Vector3) => void;
}

export function useConstellationMouse({ mouseInfluence, onMouseClick }: UseConstellationMouseProps) {
	const { camera, size, raycaster } = useThree();
	const mouse = useRef<MouseState>({ x: 0, y: 0 });
	const lastClick = useRef<number>(0);

	// クリックイベントとマウス位置の追跡
	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			mouse.current.x = (event.clientX / size.width) * 2 - 1;
			mouse.current.y = -(event.clientY / size.height) * 2 + 1;
		};

		const handleClick = (event: MouseEvent) => {
			const now = Date.now();
			if (now - lastClick.current < ANIMATION_CONSTANTS.CLICK_DEBOUNCE_MS) return;
			lastClick.current = now;

			const mousePos = new THREE.Vector2(
				(event.clientX / size.width) * 2 - 1,
				-(event.clientY / size.height) * 2 + 1,
			);

			// レイキャスティングでクリック位置を3D空間に変換
			raycaster.setFromCamera(mousePos, camera);
			const intersectPoint = new THREE.Vector3();
			raycaster.ray.at(15, intersectPoint); // カメラからz=15の位置

			onMouseClick(intersectPoint);
		};

		if (mouseInfluence) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("click", handleClick);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("click", handleClick);
		};
	}, [size, mouseInfluence, camera, raycaster, onMouseClick]);

	// マウス位置を3D空間に変換
	const getMouse3DPosition = (): THREE.Vector3 => {
		const mouseVector = new THREE.Vector3(mouse.current.x, mouse.current.y, 0);
		mouseVector.unproject(camera);
		const cameraPosition = camera.position.clone();
		const direction = mouseVector.sub(cameraPosition).normalize();
		const distance = -cameraPosition.z / direction.z;
		return cameraPosition.clone().add(direction.multiplyScalar(distance));
	};

	return {
		mouse,
		getMouse3DPosition,
	};
}