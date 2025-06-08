"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface NodeData {
	position: THREE.Vector3;
	velocity: THREE.Vector3;
	connections: number[];
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
	const { camera, size } = useThree();
	const mouse = useRef({ x: 0, y: 0 });
	const [nodes, setNodes] = useState<NodeData[]>([]);

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
					(Math.random() - 0.5) * 0.01,
					(Math.random() - 0.5) * 0.01,
					(Math.random() - 0.5) * 0.01,
				),
				connections: [],
			});
		}
		setNodes(newNodes);
	}, [nodeCount]);

	// マウス位置の追跡
	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			mouse.current.x = (event.clientX / size.width) * 2 - 1;
			mouse.current.y = -(event.clientY / size.height) * 2 + 1;
		};

		if (mouseInfluence) {
			window.addEventListener("mousemove", handleMouseMove);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [size, mouseInfluence]);

	// ジオメトリとマテリアルのメモ化
	const [pointsGeometry, lineGeometry] = useMemo(() => {
		const pointsGeo = new THREE.BufferGeometry();
		const lineGeo = new THREE.BufferGeometry();

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

		return [pointsGeo, lineGeo];
	}, [nodeCount]);

	// アニメーションループ
	useFrame((state) => {
		if (!mesh.current || !lineMesh.current || nodes.length === 0) return;

		const positions = mesh.current.geometry.attributes.position
			.array as Float32Array;
		const sizes = mesh.current.geometry.attributes.size.array as Float32Array;
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

		// ノードの更新
		nodes.forEach((node, i) => {
			// 速度に基づいて位置を更新
			node.position.add(node.velocity);

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
				if (distToMouse < 3) {
					const force = mousePos3D.clone().sub(node.position).normalize();
					force.multiplyScalar(0.02 * (1 - distToMouse / 3));
					node.position.sub(force);
					sizes[i] = 0.1 + (1 - distToMouse / 3) * 0.1;
				} else {
					sizes[i] = 0.05 + Math.sin(state.clock.elapsedTime + i) * 0.02;
				}
			}

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

					// ラインを追加
					const opacity = 1 - dist / connectionDistance;

					// 開始点
					linePositions[lineIndex * 6] = node.position.x;
					linePositions[lineIndex * 6 + 1] = node.position.y;
					linePositions[lineIndex * 6 + 2] = node.position.z;

					// 終了点
					linePositions[lineIndex * 6 + 3] = nodes[j].position.x;
					linePositions[lineIndex * 6 + 4] = nodes[j].position.y;
					linePositions[lineIndex * 6 + 5] = nodes[j].position.z;

					// ラインの色（青〜紫のグラデーション）
					for (let k = 0; k < 2; k++) {
						lineColors[lineIndex * 6 + k * 3] = 0.4 * opacity;
						lineColors[lineIndex * 6 + k * 3 + 1] = 0.6 * opacity;
						lineColors[lineIndex * 6 + k * 3 + 2] = 0.9 * opacity;
					}

					lineIndex++;
				}
			}
		});

		// 使用されていないラインを非表示に
		for (let i = lineIndex; i < nodeCount * nodeCount; i++) {
			for (let j = 0; j < 6; j++) {
				linePositions[i * 6 + j] = 0;
			}
		}

		mesh.current.geometry.attributes.position.needsUpdate = true;
		mesh.current.geometry.attributes.size.needsUpdate = true;
		lineMesh.current.geometry.attributes.position.needsUpdate = true;
		lineMesh.current.geometry.attributes.color.needsUpdate = true;
		lineMesh.current.geometry.setDrawRange(0, lineIndex * 2);
	});

	return (
		<>
			<points ref={mesh} geometry={pointsGeometry}>
				<shaderMaterial
					vertexShader={`
						attribute float size;
						varying vec3 vColor;
						void main() {
							vColor = color;
							vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
							gl_PointSize = size * (300.0 / -mvPosition.z);
							gl_Position = projectionMatrix * mvPosition;
						}
					`}
					fragmentShader={`
						varying vec3 vColor;
						void main() {
							float r = distance(gl_PointCoord, vec2(0.5, 0.5));
							if (r > 0.5) discard;
							float opacity = 1.0 - smoothstep(0.0, 0.5, r);
							gl_FragColor = vec4(vColor, opacity);
						}
					`}
					transparent
					vertexColors
				/>
			</points>
			<lineSegments ref={lineMesh} geometry={lineGeometry}>
				<lineBasicMaterial
					vertexColors
					transparent
					opacity={0.6}
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
