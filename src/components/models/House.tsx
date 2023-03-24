/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { useEffect, useState } from 'react';
import { Mesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface IProps {
	position: {
		x: number;
		y: number;
		z: number;
	};
}

/* eslint-disable react/no-unknown-property */
export const House = ({ position }: IProps) => {
	const [houseMesh, setHouseMesh] = useState<Mesh | undefined>();
	useEffect(() => {
		const gltfLoader = new GLTFLoader();

		gltfLoader.load('/house.glb', (glb) => {
			const mesh = glb.scene.children[0] as Mesh;
			mesh.name = 'house';
			setHouseMesh(mesh);
		});
	}, []);
	if (!houseMesh) return null;
	return <mesh position={[position.x, position.y, position.z]} args={[houseMesh.geometry, houseMesh.material]} />;
};
