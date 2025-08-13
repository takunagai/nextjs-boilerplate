/**
 * Constellation の接続線描画コンポーネント
 */
import { forwardRef } from "react";
import * as THREE from "three";

interface ConstellationLinesProps {
	geometry: THREE.BufferGeometry;
}

export const ConstellationLines = forwardRef<
	THREE.LineSegments,
	ConstellationLinesProps
>(({ geometry }, ref) => {
	return (
		<lineSegments ref={ref} geometry={geometry}>
			<lineBasicMaterial
				vertexColors
				transparent
				opacity={0.8}
				blending={THREE.AdditiveBlending}
			/>
		</lineSegments>
	);
});

ConstellationLines.displayName = "ConstellationLines";
