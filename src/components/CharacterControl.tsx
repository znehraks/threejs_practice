import { useThree } from '@react-three/fiber';
import React, { SetStateAction, useEffect } from 'react';

import { toThreePosition } from '../utils';

interface ICharacterControlProps {
	setCharacterState: React.Dispatch<SetStateAction<'stop' | 'moving'>>;
	setDestinationPoint: React.Dispatch<SetStateAction<THREE.Vector3 | undefined>>;
	setIsPressed: React.Dispatch<SetStateAction<boolean>>;
}

// TODO touch도 추가해야함
// TODO isPressed 도 추가해서 눌린 상태에선 계속 이동하도록 해야함
// TODO 게시판
export const CharacterControl = ({ setCharacterState, setDestinationPoint, setIsPressed }: ICharacterControlProps) => {
	const three = useThree();

	useEffect(() => {
		if (!three) return () => {};
		const handlePointerDown = (e: PointerEvent) => {
			const { clientX, clientY } = e;
			const threePosition = toThreePosition({ clientX, clientY });
			console.log('threePosition', threePosition);
			const characterGroup = three.scene.getObjectByName('character');

			three.raycaster.setFromCamera(threePosition, three.camera);

			const intersects = three.raycaster.intersectObjects(three.scene.children);
			console.log('intersects', intersects);
			const destinationPoint = intersects[0]?.point.clone();

			if (destinationPoint && characterGroup) {
				// eslint-disable-next-line @typescript-eslint/consistent-type-assertions

				characterGroup.lookAt(destinationPoint.clone());

				setIsPressed(true);
				setCharacterState('moving');
				setDestinationPoint(destinationPoint.clone());
			}
		};

		const handlePointerUp = () => {
			setIsPressed(false);
		};

		three.gl.domElement.addEventListener('pointerdown', handlePointerDown);
		three.gl.domElement.addEventListener('pointerup', handlePointerUp);
		return () => {
			three.gl.domElement.removeEventListener('pointerdown', handlePointerDown);
			three.gl.domElement.removeEventListener('pointerup', handlePointerUp);
		};
	}, [setCharacterState, setDestinationPoint, setIsPressed, three]);

	return null;
};
