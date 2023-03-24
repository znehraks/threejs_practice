import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { BoxGeometry, Mesh, MeshStandardMaterial } from 'three';

export const TestMesh = () => {
	const three = useThree();
	useEffect(() => {
		const testMesh = new Mesh(new BoxGeometry(10, 10, 10), new MeshStandardMaterial({ color: 'yellow' }));
		console.log(three.scene);
		testMesh.position.set(5, 5, 5);
		testMesh.name = 'hihi';
		three.scene.add(testMesh);
	}, [three.scene]);

	return null;
};
