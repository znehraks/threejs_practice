/* eslint-disable react/no-unknown-property */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { Euler } from 'three';

export const Floor = () => {
	const [floorTexture, setFloorTexture] = useState<THREE.Texture | undefined>();
	useEffect(() => {
		const textureLoader = new THREE.TextureLoader();
		const _floorTexture = textureLoader.load('/images/grid.png');
		_floorTexture.wrapS = THREE.RepeatWrapping;
		_floorTexture.wrapT = THREE.RepeatWrapping;
		_floorTexture.repeat.x = 8;
		_floorTexture.repeat.y = 8;
		setFloorTexture(_floorTexture);
	}, []);
	if (!floorTexture) return null;
	return (
		<mesh rotation={new Euler(-Math.PI / 2)}>
			<planeGeometry args={[100, 100]} name='floor' />
			<meshStandardMaterial map={floorTexture} />
		</mesh>
	);
};
