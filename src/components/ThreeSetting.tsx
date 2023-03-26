import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import * as THREE from 'three';

export const ThreeSetting = () => {
	const three = useThree();
	useEffect(() => {
		three.gl.setSize(window.innerWidth, window.innerHeight);
		three.gl.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
		three.gl.shadowMap.enabled = true;
		three.gl.shadowMap.type = THREE.PCFSoftShadowMap;

		// Light
		const ambientLight = new THREE.AmbientLight('white', 0.7);
		three.scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight('white', 0.5);
		const directionalLightOriginPosition = new THREE.Vector3(1, 1, 1);
		directionalLight.position.x = directionalLightOriginPosition.x;
		directionalLight.position.y = directionalLightOriginPosition.y;
		directionalLight.position.z = directionalLightOriginPosition.z;
		directionalLight.castShadow = true;

		// mapSize 세팅으로 그림자 퀄리티 설정
		directionalLight.shadow.mapSize.width = 2048;
		directionalLight.shadow.mapSize.height = 2048;
		// 그림자 범위
		directionalLight.shadow.camera.left = -100;
		directionalLight.shadow.camera.right = 100;
		directionalLight.shadow.camera.top = 100;
		directionalLight.shadow.camera.bottom = -100;
		directionalLight.shadow.camera.near = -100;
		directionalLight.shadow.camera.far = 100;
		three.scene.add(directionalLight);
	}, [three.gl, three.scene]);
	return null;
};
