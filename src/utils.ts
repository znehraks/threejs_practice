interface IToThreePosition {
	clientX: number;
	clientY: number;
}
export const toThreePosition = ({ clientX, clientY }: IToThreePosition) => {
	const canvas = document.querySelector('#canvas');
	if (!canvas) return { x: 0, y: 0 };
	const x = (clientX / canvas.clientWidth) * 2 - 1;
	const y = -((clientY / canvas.clientHeight) * 2 - 1);
	return { x, y };
};

export const getYOffset = (mesh: THREE.Mesh) => {
	const { boundingBox } = mesh.geometry;
	if (boundingBox) {
		return (boundingBox.max.y - boundingBox.min.y) / 2;
	}
	return 0;
};
