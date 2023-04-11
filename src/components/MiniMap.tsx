import React from 'react';
import styled from 'styled-components';

import { modelPositions } from '../constants';
import { toMinimapPosition } from '../utils';

const Wrapper = styled.div`
	width: 200px;
	height: 120px;
	background-color: yellow;
	position: absolute;

	z-index: 1;
`;

const CurrentPositionDot = styled.div`
	position: absolute;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	top: 60px;
	left: 100px;
	background-color: red;
	z-index: 1;
`;

const CurrentItemPositionDot = styled.div<{ top: number; left: number }>`
	position: absolute;
	width: 15px;
	height: 15px;
	top: ${(props) => `${props.top}px`};
	left: ${(props) => `${props.left}px`};
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 100%;
		height: 100%;
	}
`;

export const MiniMapItems = ({ url, position }: { url: string; position: { x: number; y: number; z: number } }) => {
	const minimapPosition = toMinimapPosition(position);
	return (
		<CurrentItemPositionDot top={minimapPosition.y} left={minimapPosition.x}>
			<img src={url} alt={url} />
		</CurrentItemPositionDot>
	);
};

export const MiniMap = () => {
	return (
		<Wrapper>
			<CurrentPositionDot className='minimap-position-dot' />
			{modelPositions.map((modelPosition) => (
				<MiniMapItems key={modelPosition.name} url='/images/floor.jpg' position={modelPosition.position} />
			))}
		</Wrapper>
	);
};
