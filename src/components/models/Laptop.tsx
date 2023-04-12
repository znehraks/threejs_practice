/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface IProps {
	position: {
		x: number;
		y: number;
		z: number;
	};
}

/* eslint-disable react/no-unknown-property */
export const Laptop = ({ position }: IProps) => {
	const { scene: laptopMesh } = useLoader(GLTFLoader, '/laptop.glb');

	console.log(laptopMesh);
	useEffect(() => {
		laptopMesh.castShadow = true;
		laptopMesh.receiveShadow = true;
		laptopMesh.position.set(position.x, position.y, position.z);
		laptopMesh.scale.set(0.01, 0.01, 0.01);
	}, [laptopMesh, position.x, position.y, position.z]);
	return (
		<group>
			<primitive name='laptop' object={laptopMesh} />
		</group>
	);
};
