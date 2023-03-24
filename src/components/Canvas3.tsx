/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';

import { ThreeSetting } from './ThreeSetting';
import { Character } from './models/Character';
import { Floor } from './models/Floor';
import { House2 } from './models/House2';

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

	// Camera
	useEffect(() => {
		setCameraOption({
			left: -(window.innerWidth / window.innerHeight),
			right: window.innerWidth / window.innerHeight,
			top: 1,
			bottom: -1,
			near: -1000,
			far: 1000,
			position: [1, 5, 5],
			zoom: 50,
		});
	}, []);
	if (!cameraOption) return null;
	console.log('cameraOption', cameraOption);
	return (
		<Canvas orthographic camera={cameraOption}>
			<ThreeSetting />
			<OrbitControls />
			<Floor />
			{/* <House position={{ x: 5, y: 0, z: 2 }} /> */}
			<House2 position={{ x: 10, y: 0, z: 2 }} />
			<Character position={{ x: 0, y: 0, z: 0 }} />
		</Canvas>
	);
};

export default Canvas3;
