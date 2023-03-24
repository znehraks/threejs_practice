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
	const [yOffset, setYOffset] = useState<number | undefined>(undefined);
	useEffect(() => {
		const gltfLoader = new GLTFLoader();

		gltfLoader.load('/house.glb', (glb) => {
			const mesh = glb.scene.children[0] as Mesh;
			console.log('mesh', mesh);
			if (mesh.geometry.boundingBox) {
				// * 초기 배치 시, 자신의 height의 절반만큼 땅에 박혀있는 것을 보정함
				setYOffset((mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y) / 2);
			}
			setHouseMesh(mesh);
		});
	}, [position.y]);
	if (!houseMesh || !yOffset) return null;
	return (
		<mesh
			name='house'
			position={[position.x, position.y + yOffset, position.z]}
			args={[houseMesh.geometry, houseMesh.material]}
		/>
	);
};
