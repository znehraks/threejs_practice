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
export const Paper = ({ position }: IProps) => {
	const { scene: paperMesh1 } = useLoader(GLTFLoader, '/paper_stack1.glb');

	const { scene: paperMesh2 } = useLoader(GLTFLoader, '/paper_stack2.glb');

	const { scene: paperMesh3 } = useLoader(GLTFLoader, '/paper_stack3.glb');
	console.log('paperMesh1', paperMesh1);
	console.log('paperMesh2', paperMesh2);
	console.log('paperMesh3', paperMesh3);
	useEffect(() => {
		const mesh = paperMesh1.children[0] as THREE.Mesh;
		paperMesh1.castShadow = true;
		paperMesh1.receiveShadow = true;
		const yOffset = getYOffset(mesh);
		paperMesh1.position.set(position.x, position.y + yOffset, position.z);
		paperMesh3.scale.set(10, 10, 10);
	}, [paperMesh1, paperMesh2.scale, paperMesh3.scale, position.x, position.y, position.z]);
	return (
		<group>
			<primitive name='paper' object={paperMesh3} />
		</group>
	);
};
