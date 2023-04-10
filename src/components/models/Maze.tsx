/* eslint-disable react/no-unknown-property */
import { useMemo } from 'react';
import { Color, Euler, ExtrudeGeometry, MeshBasicMaterial, Shape, Vector2 } from 'three';

const mazeMaterial = new MeshBasicMaterial({
	color: new Color(0x31aff2),
	depthTest: true,
	transparent: true,
	opacity: 0.7,
});
export const Maze = () => {
	const mazeGeometries = useMemo(() => {
		const shapes: Shape[] = [];
		shapes.push(new Shape([new Vector2(-50, -50), new Vector2(-48, -50), new Vector2(-48, 0), new Vector2(-50, 0)]));

		shapes.push(new Shape([new Vector2(-50, 0), new Vector2(-50, 2), new Vector2(0, 2), new Vector2(0, 0)]));

		const geometries = shapes.map((shape) => {
			return new ExtrudeGeometry(shape, { depth: 3 });
		});
		return geometries;
	}, []);

	return (
		<>
			{mazeGeometries.map((mazeGeometry) => {
				return (
					<mesh
						castShadow
						receiveShadow
						rotation={new Euler(-Math.PI / 2, 0, 0)}
						geometry={mazeGeometry}
						material={mazeMaterial}
					/>
				);
			})}
		</>
	);
};
