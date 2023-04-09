/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { useLoader, useFrame, useThree } from '@react-three/fiber';
import { SetStateAction, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { cameraInitialPosition } from '@/src/constants';
import { getYOffset, toMinimapPosition } from '@/src/utils';

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
	const { scene: characterMesh, animations } = useLoader(GLTFLoader, '/ilbuni.glb');
	const mixer = new THREE.AnimationMixer(characterMesh);
	useEffect(() => {
		// console.log(scene, animations);
		const object3D = characterMesh.children[0] as THREE.Object3D;

		const mesh = object3D.children[0] as THREE.Mesh;
		console.log('characterMesh', characterMesh);

		const yOffset = getYOffset(mesh);
		characterMesh.position.set(position.x, position.y + yOffset, position.z);
	}, [animations, position.x, position.y, position.z, characterMesh, three.camera]);
	useFrame((state, delta) => {
		mixer.update(delta);
		if (characterState === 'moving') {
			// console.log('이동중');
			mixer.clipAction(animations[0]).stop();
			mixer.clipAction(animations[1]).play();
			if (destinationPoint) {
				const angle = Math.atan2(
					destinationPoint.z - characterMesh.position.z,
					destinationPoint.x - characterMesh.position.x
				);
				characterMesh.position.x += Math.cos(angle) * 0.04;
				characterMesh.position.z += Math.sin(angle) * 0.04;

				three.camera.position.x = cameraInitialPosition[0] + characterMesh.position.x;
				three.camera.position.z = cameraInitialPosition[2] + characterMesh.position.z;

				// * 미니맵에 현재 위치를 보여주는 로직
				const minimapPositionDot = document.querySelector('.minimap-position-dot') as HTMLDivElement;
				if (minimapPositionDot) {
					const minimapPosition = toMinimapPosition(characterMesh.position);
					minimapPositionDot.style.left = `${minimapPosition.x}px`; // 50이면 200 -50이면 0
					minimapPositionDot.style.top = `${minimapPosition.y}px`; // 50이면 120, 0,이면 60, -50이면 0
				}
				if (
					Math.abs(destinationPoint.x - characterMesh.position.x) < 0.1 &&
					Math.abs(destinationPoint.z - characterMesh.position.z) < 0.1
				) {
					setCharacterState('stop');
					setDestinationPoint(undefined);
				}
			}
		} else if (characterState === 'stop') {
			// console.log('멈춤');
			mixer.clipAction(animations[0]).play();
			mixer.clipAction(animations[1]).stop();
		}
	});
	return <primitive name='character' object={characterMesh} />;
};
