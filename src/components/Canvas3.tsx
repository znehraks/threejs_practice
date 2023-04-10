/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

import { housePositionInfo } from '../constants';

import { CharacterControl } from './CharacterControl';
import { ThreeSetting } from './ThreeSetting';
import { Character } from './models/Character';
import { Floor } from './models/Floor';
import { House } from './models/House';
import { Maze } from './models/Maze';
import { Pointer } from './models/Pointer';

const Canvas3 = () => {
	const [characterState, setCharacterState] = useState<'stop' | 'moving'>('stop');
	const [destinationPoint, setDestinationPoint] = useState<THREE.Vector3 | undefined>();
	const [orthographicCamera, setOrthographicCamera] = useState<THREE.OrthographicCamera | undefined>(undefined);

	// Camera
	useEffect(() => {
		const _orthographicCamera = new THREE.OrthographicCamera(
			-(window.innerWidth / window.innerHeight), // left
			window.innerWidth / window.innerHeight, // right,
			1, // top
			-1, // bottom
			-1000,
			1000
		);
		_orthographicCamera.position.set(1, 5, 5);
		_orthographicCamera.lookAt(0, 0, 0);
		_orthographicCamera.zoom = 100;
		setOrthographicCamera(_orthographicCamera);
		_orthographicCamera.updateProjectionMatrix();
	}, []);
	if (!orthographicCamera) return null;
	return (
		<Canvas shadows='basic' id='canvas' camera={orthographicCamera}>
			<CharacterControl setCharacterState={setCharacterState} setDestinationPoint={setDestinationPoint} />
			<ThreeSetting />
			<OrbitControls />
			<Floor />
			<House position={housePositionInfo.position} />
			<Character
				position={{ x: 0, y: 0, z: 0 }}
				characterState={characterState}
				destinationPoint={destinationPoint}
				setCharacterState={setCharacterState}
				setDestinationPoint={setDestinationPoint}
			/>
			<Maze />
			<Pointer />
		</Canvas>
	);
};

export default Canvas3;
