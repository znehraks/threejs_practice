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
	const { scene: houseMesh } = useLoader(GLTFLoader, '/house.glb');
	useEffect(() => {
		const mesh = houseMesh.children[0] as THREE.Mesh;
		houseMesh.castShadow = true;
		const yOffset = getYOffset(mesh);
		houseMesh.position.set(position.x, position.y + yOffset, position.z);

		houseMesh.visible = false;
	}, [houseMesh, position.x, position.y, position.z]);
	return <primitive name='house' object={houseMesh} />;
};
