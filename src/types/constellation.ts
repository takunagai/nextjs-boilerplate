/**
 * Constellation 3D アニメーション関連の型定義
 */
import type * as THREE from "three";

export interface NodeData {
	position: THREE.Vector3;
	velocity: THREE.Vector3;
	connections: number[];
	energy: number;
	targetEnergy: number;
	pulsePhase: number;
	explosionTime?: number;
}

export interface ParticleData {
	position: THREE.Vector3;
	velocity: THREE.Vector3;
	life: number;
	maxLife: number;
	color: THREE.Color;
}

export interface RippleData {
	position: THREE.Vector3;
	radius: number;
	maxRadius: number;
	life: number;
	maxLife: number;
}

export interface ConstellationProps {
	nodeCount?: number;
	connectionDistance?: number;
	mouseInfluence?: boolean;
}

export interface GeometryRefs {
	pointsGeometry: THREE.BufferGeometry;
	lineGeometry: THREE.BufferGeometry;
	particleGeometry: THREE.BufferGeometry;
	rippleGeometry: THREE.BufferGeometry;
}

export interface MeshRefs {
	mesh: React.RefObject<THREE.Points | null>;
	lineMesh: React.RefObject<THREE.LineSegments | null>;
	particleMesh: React.RefObject<THREE.Points | null>;
	rippleMesh: React.RefObject<THREE.LineSegments | null>;
}

export interface MouseState {
	x: number;
	y: number;
}
