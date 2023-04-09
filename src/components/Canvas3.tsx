/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

import { cameraInitialPosition, housePositionInfo } from '../constants';

import { CharacterControl } from './CharacterControl';
import { ThreeSetting } from './ThreeSetting';
import { Character } from './models/Character';
import { Floor } from './models/Floor';
import { House } from './models/House';
import { Pointer } from './models/Pointer';

interface ICameraOption {
	left: number;
	right: number;
	top: number;
	bottom: number;
	near: number;
	far: number;
	position: [number, number, number];
	zoom: number;
}
const Canvas3 = () => {
	const [cameraOption, setCameraOption] = useState<ICameraOption | undefined>();
	const [characterState, setCharacterState] = useState<'stop' | 'moving'>('stop');
	const [destinationPoint, setDestinationPoint] = useState<THREE.Vector3 | undefined>();

	// Camera
	useEffect(() => {
		setCameraOption({
			left: -(window.innerWidth / window.innerHeight),
			right: window.innerWidth / window.innerHeight,
			top: 1,
			bottom: -1,
			near: 0.1,
			far: 1000,
			position: cameraInitialPosition,
			zoom: 100,
		});
	}, []);
	if (!cameraOption) return null;
	return (
		<Canvas id='canvas' orthographic camera={cameraOption}>
			<CharacterControl setCharacterState={setCharacterState} setDestinationPoint={setDestinationPoint} />
			<ThreeSetting />
			<Floor />
			<House position={housePositionInfo.position} />
			<Character
				position={{ x: 0, y: 0, z: 0 }}
				characterState={characterState}
				destinationPoint={destinationPoint}
				setCharacterState={setCharacterState}
				setDestinationPoint={setDestinationPoint}
			/>
			<Pointer />
		</Canvas>
	);
};

export default Canvas3;
