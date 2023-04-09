import { atom } from 'recoil';

// export default {};
// export interface IThree {
// 	gl: WebGLRenderer;
// 	scene: Scene;
// 	camera: Camera;
// 	raycaster: Raycaster;
// }
// export const threeAtom = atom<IThree | IThree>({
// 	key: 'THREE',
// 	default: undefined,
// });

export const minimapInfoAtom = atom<{ x: number; y: number } | undefined>({
	key: 'MINI_MAP_ATOM',
	default: undefined,
});
