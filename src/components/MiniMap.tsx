import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	width: 200px;
	height: 120px;
	background-color: yellow;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
`;

const CurrentPositionDot = styled.div`
	position: absolute;
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: red;
`;

export const MiniMap = () => {
	return (
		<Wrapper>
			<CurrentPositionDot className='minimap-position-dot' />
		</Wrapper>
	);
};
