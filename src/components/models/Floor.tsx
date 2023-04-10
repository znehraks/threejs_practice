/* eslint-disable react/no-unknown-property */
/* eslint-disable no-underscore-dangle */
import { useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Euler, TextureLoader } from 'three';

export const Floor = () => {
	const three = useThree();
	const floorTexture = useLoader(TextureLoader, '/images/floor.jpg');
	floorTexture.wrapS = THREE.RepeatWrapping;
	floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.x = 20;
	floorTexture.repeat.y = 20;

	console.log(three.scene);
	return (
		<mesh name='floor' rotation={new Euler(-Math.PI / 2)} receiveShadow castShadow>
			<planeGeometry args={[100, 100]} />
			<meshStandardMaterial map={floorTexture} />
		</mesh>
	);
};
