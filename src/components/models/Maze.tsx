/* eslint-disable react/no-unknown-property */
import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import { Euler, ExtrudeGeometry, RepeatWrapping, Shape, TextureLoader, Vector2 } from 'three';

export const Maze = () => {
	const brickTexture = useLoader(TextureLoader, '/images/brick.jpg');
	brickTexture.wrapS = RepeatWrapping;
	brickTexture.wrapT = RepeatWrapping;
	brickTexture.repeat.x = 1;
	brickTexture.repeat.y = 1;
	const mazeGeometries = useMemo(() => {
		const shapes: Shape[] = [];
		shapes.push(
			new Shape([new Vector2(-12.5, -12.5), new Vector2(-12.5, 12.5), new Vector2(-12, 12.5), new Vector2(-12, -12.5)])
		);

		shapes.push(
			new Shape([new Vector2(-12.5, 12.5), new Vector2(12.5, 12.5), new Vector2(12.5, 12), new Vector2(-12.5, 12)])
		);

		shapes.push(
			new Shape([new Vector2(12.5, 12.5), new Vector2(12.5, -12.5), new Vector2(12, -12.5), new Vector2(12, 12.5)])
		);

		shapes.push(
			new Shape([new Vector2(12.5, 12.5), new Vector2(12.5, -12.5), new Vector2(12, -12.5), new Vector2(12, 12.5)])
		);

		shapes.push(
			new Shape([new Vector2(12.5, -12.5), new Vector2(-12.5, -12.5), new Vector2(-12.5, -12), new Vector2(12.5, -12)])
		);

		const geometries = shapes.map((shape) => {
			return new ExtrudeGeometry(shape, { depth: 1 });
		});
		return geometries;
	}, []);

	return (
		<>
			{mazeGeometries.map((mazeGeometry) => {
				return (
					<mesh
						name='maze'
						castShadow
						receiveShadow
						rotation={new Euler(-Math.PI / 2, 0, 0)}
						geometry={mazeGeometry}
						position={[0, 0, 0]}>
						<meshStandardMaterial map={brickTexture} />
					</mesh>
				);
			})}
		</>
	);
};
