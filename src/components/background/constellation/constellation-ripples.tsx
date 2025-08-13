/**
 * Constellation の波紋描画コンポーネント
 */
import { forwardRef } from "react";
import * as THREE from "three";

interface ConstellationRipplesProps {
	geometry: THREE.BufferGeometry;
}

export const ConstellationRipples = forwardRef<
	THREE.LineSegments,
	ConstellationRipplesProps
>(({ geometry }, ref) => {
	return (
		<lineSegments ref={ref} geometry={geometry}>
			<lineBasicMaterial
				vertexColors
				transparent
				blending={THREE.AdditiveBlending}
			/>
		</lineSegments>
	);
});

ConstellationRipples.displayName = "ConstellationRipples";
