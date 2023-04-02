/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { useLoader, useFrame, useThree } from '@react-three/fiber';
import { SetStateAction, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { cameraInitialPosition } from '@/src/constants';
import { getYOffset } from '@/src/utils';

interface ICharacterProps {
	destinationPoint: THREE.Vector3 | undefined;
	position: {
		x: number;
		y: number;
		z: number;
	};
	characterState: 'stop' | 'moving';
	setCharacterState: React.Dispatch<SetStateAction<'stop' | 'moving'>>;
	setDestinationPoint: React.Dispatch<SetStateAction<THREE.Vector3 | undefined>>;
}

/* eslint-disable react/no-unknown-property */
export const Character = ({
	destinationPoint,
	position,
	characterState,
	setCharacterState,
	setDestinationPoint,
}: ICharacterProps) => {
	const three = useThree();
	const { scene, animations } = useLoader(GLTFLoader, '/ilbuni.glb');
	const mixer = new THREE.AnimationMixer(scene);
	useEffect(() => {
		console.log(scene, animations);
		const object3D = scene.children[0] as THREE.Object3D;

		const mesh = object3D.children[0] as THREE.Mesh;

		const yOffset = getYOffset(mesh);
		scene.position.set(position.x, position.y + yOffset, position.z);
	}, [animations, position.x, position.y, position.z, scene, three.camera]);
	console.log('characterState', characterState);
	useFrame((state, delta) => {
		mixer.update(delta);
		if (characterState === 'moving') {
			console.log('이동중');
			mixer.clipAction(animations[0]).stop();
			mixer.clipAction(animations[1]).play();
			if (destinationPoint) {
				const angle = Math.atan2(destinationPoint.z - scene.position.z, destinationPoint.x - scene.position.x);
				scene.position.x += Math.cos(angle) * 0.04;
				scene.position.z += Math.sin(angle) * 0.04;

				three.camera.position.x = cameraInitialPosition[0] + scene.position.x;
				three.camera.position.z = cameraInitialPosition[2] + scene.position.z;
				if (
					Math.abs(destinationPoint.x - scene.position.x) < 0.1 &&
					Math.abs(destinationPoint.z - scene.position.z) < 0.1
				) {
					setCharacterState('stop');
					setDestinationPoint(undefined);
				}
			}
		} else if (characterState === 'stop') {
			console.log('멈춤');
			mixer.clipAction(animations[0]).play();
			mixer.clipAction(animations[1]).stop();
		}
	});
	return <primitive name='character' object={scene} />;
};
