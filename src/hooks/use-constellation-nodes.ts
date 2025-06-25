/**
 * Constellation のノード管理フック
 */
import { useEffect, useState } from "react";
import * as THREE from "three";

import type { NodeData } from "@/types/constellation";

export function useConstellationNodes(nodeCount: number) {
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

	const explodeNearbyNodes = (point: THREE.Vector3, radius: number = 3) => {
		const now = Date.now();
		setNodes((prevNodes) => {
			return prevNodes.map((node) => {
				const dist = node.position.distanceTo(point);
				if (dist < radius) {
					return {
						...node,
						explosionTime: now,
						targetEnergy: 2 + Math.random(),
					};
				}
				return node;
			});
		});
	};

	return {
		nodes,
		setNodes,
		explodeNearbyNodes,
	};
}