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
export const Character = ({ position }: IProps) => {
	const [characterMesh, setCharacterMesh] = useState<Mesh | undefined>();
	useEffect(() => {
		const gltfLoader = new GLTFLoader();

		gltfLoader.load('/ilbuni.glb', (glb) => {
			const mesh = glb.scene.children[0] as Mesh;
			mesh.name = 'character';
			setCharacterMesh(mesh);
		});
	}, []);
	if (!characterMesh) return null;
	return (
		<mesh position={[position.x, position.y, position.z]} args={[characterMesh.geometry, characterMesh.material]} />
	);
};
