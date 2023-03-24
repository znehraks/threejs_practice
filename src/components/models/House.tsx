/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { getYOffset } from '@/src/utils';

interface IProps {
	position: {
		x: number;
		y: number;
		z: number;
	};
}

/* eslint-disable react/no-unknown-property */
export const House = ({ position }: IProps) => {
	const gltf = useLoader(GLTFLoader, '/house.glb');
	useEffect(() => {
		console.log(gltf);
		const mesh = gltf.scene.children[0] as THREE.Mesh;
		const yOffset = getYOffset(mesh);
		gltf.scene.position.set(position.x, position.y + yOffset, position.z);
	}, [gltf, position.x, position.y, position.z]);
	return <primitive name='house' object={gltf.scene} />;
};
