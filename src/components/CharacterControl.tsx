import { useThree } from '@react-three/fiber';
import React, { SetStateAction, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Vector3 } from 'three';

import { minimapInfoAtom } from '../atom';
import { toThreePosition } from '../utils';

interface ICharacterControlProps {
	setCharacterState: React.Dispatch<SetStateAction<'stop' | 'moving'>>;
	setDestinationPoint: React.Dispatch<SetStateAction<THREE.Vector3 | undefined>>;
}

// TODO touch도 추가해야함
// TODO isPressed 도 추가해서 눌린 상태에선 계속 이동하도록 해야함
// TODO 게시판
export const CharacterControl = ({ setCharacterState, setDestinationPoint }: ICharacterControlProps) => {
	const three = useThree();
	const [, setMinimapInfo] = useRecoilState(minimapInfoAtom);

	useEffect(() => {
		if (!three) return () => {};
		const handlePointerDown = (e: PointerEvent) => {
			const { clientX, clientY } = e;
			const threePosition = toThreePosition({ clientX, clientY });
			// console.log('threePosition', threePosition);
			const characterGroup = three.scene.getObjectByName('character');

			three.raycaster.setFromCamera(threePosition, three.camera);

			const intersects = three.raycaster.intersectObjects(three.scene.children);
			// console.log('intersects', intersects);
			const destinationPoint = intersects[0]?.point.clone();

			const maze = three.scene.getObjectByName('maze');
			console.log('maze', maze);

			if (destinationPoint && characterGroup) {
				setMinimapInfo({ x: destinationPoint.x, y: destinationPoint.z });
				// eslint-disable-next-line @typescript-eslint/consistent-type-assertions

				characterGroup.lookAt(destinationPoint.x, 0.3, destinationPoint.z);

				setCharacterState('moving');
				setDestinationPoint(new Vector3(destinationPoint.x, 0.3, destinationPoint.z));
			}
		};

		three.gl.domElement.addEventListener('pointerdown', handlePointerDown);
		return () => {
			three.gl.domElement.removeEventListener('pointerdown', handlePointerDown);
		};
	}, [setCharacterState, setDestinationPoint, setMinimapInfo, three]);

	return null;
};
