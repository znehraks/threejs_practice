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
export const Books = ({ position }: IProps) => {
	const { scene: bookMesh } = useLoader(GLTFLoader, '/book.glb');

	console.log('bookMesh', bookMesh);
	useEffect(() => {
		bookMesh.castShadow = true;
		bookMesh.receiveShadow = true;
		bookMesh.position.set(position.x, position.y, position.z);
		bookMesh.scale.set(3, 3, 3);
		bookMesh.rotation.set(0, -Math.PI / 4, 0);
	}, [bookMesh, position.x, position.y, position.z]);
	return (
		<group>
			<primitive name='book' object={bookMesh} />
		</group>
	);
};
