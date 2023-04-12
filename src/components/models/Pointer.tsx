/* eslint-disable import/extensions */
/* eslint-disable react/no-unknown-property */
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

import { toThreePosition } from '@/src/utils';

export const Pointer = () => {
	const three = useThree();
	const pointerRef = useRef<THREE.Mesh>(null);
	useEffect(() => {
		// ! CharacterControl.tsx 의 raycaster 로직이랑 중복이므로 리펙토링 필요
		const handlePointerDown = (e: PointerEvent) => {
			console.log('포인터 이동중');
			if (!pointerRef.current) return;
			const { clientX, clientY } = e;
			const threePosition = toThreePosition({ clientX, clientY });
			three.raycaster.setFromCamera(threePosition, three.camera);

			const intersects = three.raycaster.intersectObjects(three.scene.children);
			console.log('intersects', intersects);
			const destinationPoint = intersects[0]?.point.clone();
			console.log('destinationPoint', destinationPoint);
			if (destinationPoint) {
				pointerRef.current.position.set(destinationPoint.x, destinationPoint.y + 0.1, destinationPoint.z);
			}
		};
		three.gl.domElement.addEventListener('pointerdown', handlePointerDown);
	}, [three.camera, three.gl.domElement, three.raycaster, three.scene.children]);
	return (
		<mesh ref={pointerRef} name='pointer' rotation={new THREE.Euler(-Math.PI / 2)} receiveShadow castShadow>
			<meshBasicMaterial transparent opacity={0.7} side={THREE.DoubleSide} color={new THREE.Color(0xf0ff0f)} />
			<planeGeometry args={[1, 1]} />
		</mesh>
	);
};
