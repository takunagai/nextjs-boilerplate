/**
 * リファクタリング済み Digital Constellation 3D アニメーションコンポーネント
 */
"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { ConstellationLines } from "./constellation/constellation-lines";
import { ConstellationNodes } from "./constellation/constellation-nodes";
import { ConstellationParticles } from "./constellation/constellation-particles";
import { ConstellationRipples } from "./constellation/constellation-ripples";
import { DEFAULT_SETTINGS } from "@/constants/constellation";
import { useConstellationAnimation } from "@/hooks/use-constellation-animation";
import { useConstellationGeometries } from "@/hooks/use-constellation-geometries";
import { useConstellationMouse } from "@/hooks/use-constellation-mouse";
import { useConstellationNodes } from "@/hooks/use-constellation-nodes";
import { useConstellationParticles } from "@/hooks/use-constellation-particles";
import { useConstellationRipples } from "@/hooks/use-constellation-ripples";
import type { ConstellationProps, MeshRefs } from "@/types/constellation";

function Constellation({
	nodeCount = 150,
	connectionDistance = 2,
	mouseInfluence = true,
}: ConstellationProps) {
	// Mesh参照の作成 - Hooksは関数のトップレベルで呼び出す
	const meshRef = useRef(null);
	const lineMeshRef = useRef(null);
	const particleMeshRef = useRef(null);
	const rippleMeshRef = useRef(null);

	// Mesh参照オブジェクトの構築
	const meshRefs: MeshRefs = {
		mesh: meshRef,
		lineMesh: lineMeshRef,
		particleMesh: particleMeshRef,
		rippleMesh: rippleMeshRef,
	};

	// ジオメトリの管理
	const geometries = useConstellationGeometries(nodeCount);

	// 状態管理フック
	const { nodes, explodeNearbyNodes } = useConstellationNodes(nodeCount);
	const { particles, createExplosion, updateParticles } = useConstellationParticles();
	const { ripples, createRipple, updateRipples } = useConstellationRipples();

	// マウスインタラクション
	const handleMouseClick = useCallback((position: THREE.Vector3) => {
		// 波紋エフェクトを生成
		createRipple(position);
		
		// 近くのノードを爆発させる
		explodeNearbyNodes(position);
		
		// パーティクル爆発を生成
		createExplosion(position);
	}, [createRipple, explodeNearbyNodes, createExplosion]);

	const { getMouse3DPosition } = useConstellationMouse({
		mouseInfluence,
		onMouseClick: handleMouseClick,
	});

	// メインアニメーションループ
	useConstellationAnimation({
		meshRefs,
		nodes,
		particles,
		ripples,
		connectionDistance,
		mouseInfluence,
		getMouse3DPosition,
		updateParticles,
		updateRipples,
	});

	return (
		<>
			{/* メインノード */}
			<ConstellationNodes ref={meshRefs.mesh} geometry={geometries.pointsGeometry} />

			{/* 接続線 */}
			<ConstellationLines ref={meshRefs.lineMesh} geometry={geometries.lineGeometry} />

			{/* パーティクル */}
			<ConstellationParticles ref={meshRefs.particleMesh} geometry={geometries.particleGeometry} />

			{/* 波紋 */}
			<ConstellationRipples ref={meshRefs.rippleMesh} geometry={geometries.rippleGeometry} />
		</>
	);
}

interface DigitalConstellationProps {
	className?: string;
}

export function DigitalConstellation({
	className = "",
}: DigitalConstellationProps) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const settings = isMobile ? DEFAULT_SETTINGS.MOBILE : DEFAULT_SETTINGS.DESKTOP;

	return (
		<div className={`absolute inset-0 ${className}`}>
			<Canvas
				camera={{ position: [0, 0, 15], fov: 60 }}
				style={{ background: "transparent" }}
				dpr={[1, settings.dpr]}
			>
				<ambientLight intensity={0.5} />
				<Constellation
					nodeCount={settings.nodeCount}
					connectionDistance={settings.connectionDistance}
					mouseInfluence={settings.mouseInfluence}
				/>
				<OrbitControls
					enableZoom={false}
					enablePan={false}
					autoRotate
					autoRotateSpeed={0.5}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
				/>
			</Canvas>
		</div>
	);
}