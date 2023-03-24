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
export const Character = ({ position }: IProps) => {
	// const groupRef = useRef<THREE.Group>(null);
	// const [yOffset, setYOffset] = useState<number | undefined>();
	// useEffect(() => {
	// 	const gltfLoader = new GLTFLoader();

	// 	gltfLoader.load('/ilbuni.glb', (glb) => {
	// 		const object3D = glb.scene.children[0];
	// 		console.log('object3D', object3D);
	// 		const mesh = object3D.children[0] as THREE.Mesh;
	// 		if (mesh.geometry.boundingBox) {
	// 			setYOffset((mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y) / 2);
	// 		}
	// 		groupRef.current?.add(object3D);
	// 	});
	// }, []);
	// if (!yOffset) return null;
	// return <group name='character' position={[position.x, position.y + yOffset, position.z]} ref={groupRef} />;

	const gltf = useLoader(GLTFLoader, '/ilbuni.glb');
	useEffect(() => {
		console.log(gltf);
		const object3D = gltf.scene.children[0] as THREE.Object3D;

		const mesh = object3D.children[0] as THREE.Mesh;
		const { boundingBox } = mesh.geometry;

		if (boundingBox) {
			const yOffset = (boundingBox.max.y - boundingBox.min.y) / 2;
			gltf.scene.position.set(position.x, position.y + yOffset, position.z);
		}
	}, [gltf, position.x, position.y, position.z]);
	return <primitive object={gltf.scene} />;
};
