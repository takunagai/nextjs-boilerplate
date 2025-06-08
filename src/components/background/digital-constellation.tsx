"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface NodeData {
	position: THREE.Vector3;
	velocity: THREE.Vector3;
	connections: number[];
	energy: number;
	targetEnergy: number;
	pulsePhase: number;
	explosionTime?: number;
}

interface ParticleData {
	position: THREE.Vector3;
	velocity: THREE.Vector3;
	life: number;
	maxLife: number;
	color: THREE.Color;
}

interface RippleData {
	position: THREE.Vector3;
	radius: number;
	maxRadius: number;
	life: number;
	maxLife: number;
}

interface ConstellationProps {
	nodeCount?: number;
	connectionDistance?: number;
	mouseInfluence?: boolean;
}

function Constellation({
	nodeCount = 150,
	connectionDistance = 2,
	mouseInfluence = true,
}: ConstellationProps) {
	const mesh = useRef<THREE.Points>(null);
	const lineMesh = useRef<THREE.LineSegments>(null);
	const particleMesh = useRef<THREE.Points>(null);
	const rippleMesh = useRef<THREE.LineSegments>(null);
	const { camera, size, raycaster, gl } = useThree();
	const mouse = useRef({ x: 0, y: 0 });
	const [nodes, setNodes] = useState<NodeData[]>([]);
	const [particles, setParticles] = useState<ParticleData[]>([]);
	const [ripples, setRipples] = useState<RippleData[]>([]);
	const lastClick = useRef<number>(0);

	// ノードの初期化
	useEffect(() => {
		const newNodes: NodeData[] = [];
		for (let i = 0; i < nodeCount; i++) {
			newNodes.push({
				position: new THREE.Vector3(
					(Math.random() - 0.5) * 20,
					(Math.random() - 0.5) * 20,
					(Math.random() - 0.5) * 20,
				),
				velocity: new THREE.Vector3(
					(Math.random() - 0.5) * 0.02,
					(Math.random() - 0.5) * 0.02,
					(Math.random() - 0.5) * 0.02,
				),
				connections: [],
				energy: 0.5 + Math.random() * 0.5,
				targetEnergy: 0.5 + Math.random() * 0.5,
				pulsePhase: Math.random() * Math.PI * 2,
			});
		}
		setNodes(newNodes);
	}, [nodeCount]);

	// クリックイベントとマウス位置の追跡
	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			mouse.current.x = (event.clientX / size.width) * 2 - 1;
			mouse.current.y = -(event.clientY / size.height) * 2 + 1;
		};

		const handleClick = (event: MouseEvent) => {
			const now = Date.now();
			if (now - lastClick.current < 300) return; // デバウンス
			lastClick.current = now;

			const mousePos = new THREE.Vector2(
				(event.clientX / size.width) * 2 - 1,
				-(event.clientY / size.height) * 2 + 1
			);

			// レイキャスティングでクリック位置を3D空間に変換
			raycaster.setFromCamera(mousePos, camera);
			const intersectPoint = new THREE.Vector3();
			raycaster.ray.at(15, intersectPoint); // カメラからz=15の位置

			// 波紋エフェクトを生成
			const newRipple: RippleData = {
				position: intersectPoint.clone(),
				radius: 0,
				maxRadius: 5 + Math.random() * 3,
				life: 1,
				maxLife: 1,
			};

			setRipples(prev => [...prev, newRipple]);

			// 近くのノードを爆発させる
			setNodes(prevNodes => {
				return prevNodes.map(node => {
					const dist = node.position.distanceTo(intersectPoint);
					if (dist < 3) {
						return {
							...node,
							explosionTime: now,
							targetEnergy: 2 + Math.random(),
						};
					}
					return node;
				});
			});

			// パーティクル爆発を生成
			const newParticles: ParticleData[] = [];
			for (let i = 0; i < 20; i++) {
				newParticles.push({
					position: intersectPoint.clone(),
					velocity: new THREE.Vector3(
						(Math.random() - 0.5) * 0.1,
						(Math.random() - 0.5) * 0.1,
						(Math.random() - 0.5) * 0.1,
					),
					life: 1,
					maxLife: 1 + Math.random() * 0.5,
					color: new THREE.Color().setHSL(
						0.6 + Math.random() * 0.3,
						0.8,
						0.5 + Math.random() * 0.3
					),
				});
			}
			setParticles(prev => [...prev, ...newParticles]);
		};

		if (mouseInfluence) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("click", handleClick);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("click", handleClick);
		};
	}, [size, mouseInfluence, camera, raycaster]);

	// ジオメトリとマテリアルのメモ化
	const [pointsGeometry, lineGeometry, particleGeometry, rippleGeometry] = useMemo(() => {
		const pointsGeo = new THREE.BufferGeometry();
		const lineGeo = new THREE.BufferGeometry();
		const particleGeo = new THREE.BufferGeometry();
		const rippleGeo = new THREE.BufferGeometry();

		// メインノード用
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

		// ラインジオメトリは動的に更新
		lineGeo.setAttribute(
			"position",
			new THREE.BufferAttribute(new Float32Array(nodeCount * nodeCount * 6), 3),
		);
		lineGeo.setAttribute(
			"color",
			new THREE.BufferAttribute(new Float32Array(nodeCount * nodeCount * 6), 3),
		);

		// パーティクル用
		particleGeo.setAttribute(
			"position",
			new THREE.BufferAttribute(new Float32Array(1000 * 3), 3),
		);
		particleGeo.setAttribute(
			"color",
			new THREE.BufferAttribute(new Float32Array(1000 * 3), 3),
		);
		particleGeo.setAttribute(
			"size",
			new THREE.BufferAttribute(new Float32Array(1000), 1),
		);

		// 波紋用
		rippleGeo.setAttribute(
			"position",
			new THREE.BufferAttribute(new Float32Array(100 * 64 * 2 * 3), 3),
		);
		rippleGeo.setAttribute(
			"color",
			new THREE.BufferAttribute(new Float32Array(100 * 64 * 2 * 3), 3),
		);

		return [pointsGeo, lineGeo, particleGeo, rippleGeo];
	}, [nodeCount]);

	// アニメーションループ
	useFrame((state) => {
		if (!mesh.current || !lineMesh.current || nodes.length === 0) return;

		const positions = mesh.current.geometry.attributes.position
			.array as Float32Array;
		const sizes = mesh.current.geometry.attributes.size.array as Float32Array;
		const colors = mesh.current.geometry.attributes.color.array as Float32Array;
		const linePositions = lineMesh.current.geometry.attributes.position
			.array as Float32Array;
		const lineColors = lineMesh.current.geometry.attributes.color
			.array as Float32Array;

		// マウス位置を3D空間に変換
		const mouseVector = new THREE.Vector3(mouse.current.x, mouse.current.y, 0);
		mouseVector.unproject(camera);
		const cameraPosition = camera.position.clone();
		const direction = mouseVector.sub(cameraPosition).normalize();
		const distance = -cameraPosition.z / direction.z;
		const mousePos3D = cameraPosition
			.clone()
			.add(direction.multiplyScalar(distance));

		let lineIndex = 0;
		const time = state.clock.elapsedTime;

		// ノードの更新
		nodes.forEach((node, i) => {
			// エネルギーレベルの更新
			node.energy += (node.targetEnergy - node.energy) * 0.05;
			node.pulsePhase += 0.05;

			// 爆発効果の減衰
			if (node.explosionTime && time - node.explosionTime / 1000 > 2) {
				node.targetEnergy = 0.5 + Math.random() * 0.5;
				delete node.explosionTime;
			}

			// 速度に基づいて位置を更新（エネルギーで変動）
			const energyMultiplier = 0.5 + node.energy;
			node.position.add(node.velocity.clone().multiplyScalar(energyMultiplier));

			// 境界でバウンス
			if (Math.abs(node.position.x) > 10) {
				node.velocity.x *= -1;
			}
			if (Math.abs(node.position.y) > 10) {
				node.velocity.y *= -1;
			}
			if (Math.abs(node.position.z) > 10) {
				node.velocity.z *= -1;
			}

			// マウスの影響
			if (mouseInfluence) {
				const distToMouse = node.position.distanceTo(mousePos3D);
				if (distToMouse < 4) {
					const force = mousePos3D.clone().sub(node.position).normalize();
					force.multiplyScalar(0.02 * (1 - distToMouse / 4));
					node.position.sub(force);
					node.targetEnergy = Math.max(node.targetEnergy, 1.5);
				}
			}

			// サイズとカラーパルス効果
			const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;
			const energyPulse = node.energy * pulse;
			sizes[i] = (0.08 + energyPulse * 0.15) * (0.8 + Math.sin(time * 2 + i) * 0.2);

			// 動的カラーエフェクト
			const hue = 0.6 + node.energy * 0.3; // 青から紫へ
			const saturation = 0.8 + energyPulse * 0.2;
			const lightness = 0.5 + energyPulse * 0.4;
			const color = new THREE.Color().setHSL(hue, saturation, lightness);

			colors[i * 3] = color.r;
			colors[i * 3 + 1] = color.g;
			colors[i * 3 + 2] = color.b;

			// 位置を更新
			positions[i * 3] = node.position.x;
			positions[i * 3 + 1] = node.position.y;
			positions[i * 3 + 2] = node.position.z;

			// 接続をチェック
			node.connections = [];
			for (let j = i + 1; j < nodes.length; j++) {
				const dist = node.position.distanceTo(nodes[j].position);
				if (dist < connectionDistance) {
					node.connections.push(j);

					// エネルギー伝播
					const avgEnergy = (node.energy + nodes[j].energy) / 2;
					const energyFlow = Math.sin(time * 3 + dist) * 0.5 + 0.5;

					// ラインを追加
					const opacity = (1 - dist / connectionDistance) * (0.3 + avgEnergy * 0.7);

					// 開始点
					linePositions[lineIndex * 6] = node.position.x;
					linePositions[lineIndex * 6 + 1] = node.position.y;
					linePositions[lineIndex * 6 + 2] = node.position.z;

					// 終了点
					linePositions[lineIndex * 6 + 3] = nodes[j].position.x;
					linePositions[lineIndex * 6 + 4] = nodes[j].position.y;
					linePositions[lineIndex * 6 + 5] = nodes[j].position.z;

					// 動的ラインカラー
					const lineHue = 0.6 + avgEnergy * 0.3 + energyFlow * 0.2;
					const lineColor = new THREE.Color().setHSL(lineHue, 0.8, 0.5 + avgEnergy * 0.3);

					for (let k = 0; k < 2; k++) {
						lineColors[lineIndex * 6 + k * 3] = lineColor.r * opacity;
						lineColors[lineIndex * 6 + k * 3 + 1] = lineColor.g * opacity;
						lineColors[lineIndex * 6 + k * 3 + 2] = lineColor.b * opacity;
					}

					lineIndex++;
				}
			}
		});

		// パーティクルの更新
		if (particleMesh.current && particles.length > 0) {
			const particlePositions = particleMesh.current.geometry.attributes.position.array as Float32Array;
			const particleColors = particleMesh.current.geometry.attributes.color.array as Float32Array;
			const particleSizes = particleMesh.current.geometry.attributes.size.array as Float32Array;

			particles.forEach((particle, i) => {
				particle.life -= 0.02;
				particle.position.add(particle.velocity);
				particle.velocity.multiplyScalar(0.98); // 減速

				if (particle.life > 0) {
					const lifeRatio = particle.life / particle.maxLife;
					particlePositions[i * 3] = particle.position.x;
					particlePositions[i * 3 + 1] = particle.position.y;
					particlePositions[i * 3 + 2] = particle.position.z;

					particleColors[i * 3] = particle.color.r * lifeRatio;
					particleColors[i * 3 + 1] = particle.color.g * lifeRatio;
					particleColors[i * 3 + 2] = particle.color.b * lifeRatio;

					particleSizes[i] = 0.05 * lifeRatio;
				} else {
					// 非表示
					particlePositions[i * 3] = 0;
					particlePositions[i * 3 + 1] = 0;
					particlePositions[i * 3 + 2] = 0;
					particleSizes[i] = 0;
				}
			});

			// 死んだパーティクルを削除
			setParticles(prev => prev.filter(p => p.life > 0));

			particleMesh.current.geometry.attributes.position.needsUpdate = true;
			particleMesh.current.geometry.attributes.color.needsUpdate = true;
			particleMesh.current.geometry.attributes.size.needsUpdate = true;
		}

		// 波紋の更新
		if (rippleMesh.current && ripples.length > 0) {
			const ripplePositions = rippleMesh.current.geometry.attributes.position.array as Float32Array;
			const rippleColors = rippleMesh.current.geometry.attributes.color.array as Float32Array;
			let rippleIndex = 0;

			ripples.forEach((ripple) => {
				ripple.life -= 0.03;
				ripple.radius = ripple.maxRadius * (1 - ripple.life);

				if (ripple.life > 0) {
					const segments = 32;
					const opacity = ripple.life * 0.5;

					for (let i = 0; i < segments; i++) {
						const angle1 = (i / segments) * Math.PI * 2;
						const angle2 = ((i + 1) / segments) * Math.PI * 2;

						const x1 = ripple.position.x + Math.cos(angle1) * ripple.radius;
						const y1 = ripple.position.y + Math.sin(angle1) * ripple.radius;
						const x2 = ripple.position.x + Math.cos(angle2) * ripple.radius;
						const y2 = ripple.position.y + Math.sin(angle2) * ripple.radius;

						// ライン描画
						ripplePositions[rippleIndex * 6] = x1;
						ripplePositions[rippleIndex * 6 + 1] = y1;
						ripplePositions[rippleIndex * 6 + 2] = ripple.position.z;
						ripplePositions[rippleIndex * 6 + 3] = x2;
						ripplePositions[rippleIndex * 6 + 4] = y2;
						ripplePositions[rippleIndex * 6 + 5] = ripple.position.z;

						// カラー
						for (let k = 0; k < 2; k++) {
							rippleColors[rippleIndex * 6 + k * 3] = 0.8 * opacity;
							rippleColors[rippleIndex * 6 + k * 3 + 1] = 0.9 * opacity;
							rippleColors[rippleIndex * 6 + k * 3 + 2] = 1.0 * opacity;
						}

						rippleIndex++;
					}
				}
			});

			// 死んだ波紋を削除
			setRipples(prev => prev.filter(r => r.life > 0));

			rippleMesh.current.geometry.attributes.position.needsUpdate = true;
			rippleMesh.current.geometry.attributes.color.needsUpdate = true;
			rippleMesh.current.geometry.setDrawRange(0, rippleIndex * 2);
		}

		// 使用されていないラインを非表示に
		for (let i = lineIndex; i < nodeCount * nodeCount; i++) {
			for (let j = 0; j < 6; j++) {
				linePositions[i * 6 + j] = 0;
			}
		}

		mesh.current.geometry.attributes.position.needsUpdate = true;
		mesh.current.geometry.attributes.size.needsUpdate = true;
		mesh.current.geometry.attributes.color.needsUpdate = true;
		lineMesh.current.geometry.attributes.position.needsUpdate = true;
		lineMesh.current.geometry.attributes.color.needsUpdate = true;
		lineMesh.current.geometry.setDrawRange(0, lineIndex * 2);
	});

	return (
		<>
			{/* メインノード */}
			<points ref={mesh} geometry={pointsGeometry}>
				<shaderMaterial
					vertexShader={`
						attribute float size;
						varying vec3 vColor;
						varying float vSize;
						void main() {
							vColor = color;
							vSize = size;
							vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
							gl_PointSize = size * (400.0 / -mvPosition.z);
							gl_Position = projectionMatrix * mvPosition;
						}
					`}
					fragmentShader={`
						varying vec3 vColor;
						varying float vSize;
						void main() {
							float r = distance(gl_PointCoord, vec2(0.5, 0.5));
							if (r > 0.5) discard;
							// グロー効果
							float glow = 1.0 - smoothstep(0.0, 0.5, r);
							float core = 1.0 - smoothstep(0.0, 0.2, r);
							float intensity = core + glow * 0.3;
							gl_FragColor = vec4(vColor * intensity, glow);
						}
					`}
					transparent
					vertexColors
					blending={THREE.AdditiveBlending}
				/>
			</points>

			{/* 接続線 */}
			<lineSegments ref={lineMesh} geometry={lineGeometry}>
				<lineBasicMaterial
					vertexColors
					transparent
					opacity={0.8}
					blending={THREE.AdditiveBlending}
				/>
			</lineSegments>

			{/* パーティクル */}
			<points ref={particleMesh} geometry={particleGeometry}>
				<shaderMaterial
					vertexShader={`
						attribute float size;
						varying vec3 vColor;
						void main() {
							vColor = color;
							vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
							gl_PointSize = size * (200.0 / -mvPosition.z);
							gl_Position = projectionMatrix * mvPosition;
						}
					`}
					fragmentShader={`
						varying vec3 vColor;
						void main() {
							float r = distance(gl_PointCoord, vec2(0.5, 0.5));
							if (r > 0.5) discard;
							float opacity = 1.0 - r * 2.0;
							gl_FragColor = vec4(vColor, opacity);
						}
					`}
					transparent
					vertexColors
					blending={THREE.AdditiveBlending}
				/>
			</points>

			{/* 波紋 */}
			<lineSegments ref={rippleMesh} geometry={rippleGeometry}>
				<lineBasicMaterial
					vertexColors
					transparent
					blending={THREE.AdditiveBlending}
				/>
			</lineSegments>
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

	return (
		<div className={`absolute inset-0 ${className}`}>
			<Canvas
				camera={{ position: [0, 0, 15], fov: 60 }}
				style={{ background: "transparent" }}
				dpr={[1, isMobile ? 1 : 2]}
			>
				<ambientLight intensity={0.5} />
				<Constellation
					nodeCount={isMobile ? 50 : 150}
					connectionDistance={isMobile ? 1.5 : 2}
					mouseInfluence={!isMobile}
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
