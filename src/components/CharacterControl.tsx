import { useThree } from '@react-three/fiber';
import React, { SetStateAction, useEffect } from 'react';
import { Raycaster } from 'three';

import { toThreePosition } from '../utils';

interface ICharacterControlProps {
	setCharacterState: React.Dispatch<SetStateAction<'stop' | 'moving'>>;
	setDestinationPoint: React.Dispatch<SetStateAction<THREE.Vector3 | undefined>>;
}
export const CharacterControl = ({ setCharacterState, setDestinationPoint }: ICharacterControlProps) => {
	const three = useThree();
	useEffect(() => {
		if (!three) return () => {};
		const handlePointerDown = (e: PointerEvent) => {
			const { clientX, clientY } = e;
			const threePosition = toThreePosition({ clientX, clientY });
			console.log('threePosition', threePosition);
			const characterGroup = three.scene.getObjectByName('character');

			const raycaster = new Raycaster();
			raycaster.setFromCamera(threePosition, three.camera);

			const intersects = raycaster.intersectObjects(three.scene.children);
			console.log('intersects', intersects);
			const destinationPoint = intersects[0]?.point.clone();

			if (destinationPoint && characterGroup) {
				// eslint-disable-next-line @typescript-eslint/consistent-type-assertions

				characterGroup.lookAt(destinationPoint.clone());

				setCharacterState((prev) => {
					if (prev === 'moving') return 'stop';
					return 'moving';
				});
				setDestinationPoint(destinationPoint.clone());
			}
		};

		three.gl.domElement.addEventListener('pointerdown', handlePointerDown);
		return () => {
			three.gl.domElement.removeEventListener('pointerdown', handlePointerDown);
		};
	}, [setCharacterState, setDestinationPoint, three]);
	return null;
};
