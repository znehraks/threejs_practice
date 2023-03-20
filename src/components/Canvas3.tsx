/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const Canvas3 = () => {
	return (
		<Canvas orthographic camera={{ position: [10, 10, 10] }}>
			<OrbitControls />
			<directionalLight position={[10, 10, 10]} />
			<mesh>
				<boxGeometry args={[10, 10, 10]} />
				<meshBasicMaterial color='hotpink' />
			</mesh>
		</Canvas>
	);
};

export default Canvas3;
