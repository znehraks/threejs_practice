/* eslint-disable react/no-unknown-property */
/* eslint-disable no-underscore-dangle */
import { useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Euler, TextureLoader } from 'three';

export const Floor = () => {
	const three = useThree();
	const floorTexture = useLoader(TextureLoader, '/images/grid.png');
	floorTexture.wrapS = THREE.RepeatWrapping;
	floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.x = 8;
	floorTexture.repeat.y = 8;

	console.log(three.scene);
	return (
		<mesh
			onPointerDown={(e) => {
				console.log(e.clientX);
				console.log(e.clientY);
			}}
			name='floor'
			rotation={new Euler(-Math.PI / 2)}>
			<planeGeometry args={[100, 100]} />
			<meshStandardMaterial map={floorTexture} />
		</mesh>
	);
};
