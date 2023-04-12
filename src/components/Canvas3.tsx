/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

import { housePositionInfo } from '../constants';

import { CharacterControl } from './CharacterControl';
import { Books } from './models/Books';
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
		<Canvas
			gl={{
				antialias: true,
				alpha: true,
				// logarithmicDepthBuffer: true,
			}}
			shadows={{ enabled: true, type: THREE.PCFSoftShadowMap }}
			id='canvas'
			camera={orthographicCamera}>
			<CharacterControl setCharacterState={setCharacterState} setDestinationPoint={setDestinationPoint} />
			{/* <ThreeSetting /> */}
			<directionalLight position={[2, 2, 2]} color={0xffffee} intensity={0.5} />
			<ambientLight color={0xffffff} intensity={0.2} />
			<Floor />
			<House position={housePositionInfo.position} />
			{/* //TODO 매번 새로운 모델링을 이렇게 추가하는 것이 아닌, 함수화하여 재활용하도록 리펙토링 필요함 */}
			{/* <Paper position={{ x: 0, y: 0, z: 0 }} /> */}
			<Books position={{ x: 0, y: 0, z: 0 }} />
			{/* <Laptop position={{ x: 0, y: 0, z: 0 }} /> */}
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
