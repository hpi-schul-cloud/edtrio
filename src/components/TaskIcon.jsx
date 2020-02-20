import React, { useState } from "react";
import styled from "styled-components";
import config from "~/config";

import Icon from "~/assets/task-icon.svg";
import WindowWidth from "./WindowWidth";

const TaskBackground = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	background-color: ${(props) => props.BackgroundColor};
	margin-right: 0.694rem;
	flex-shrink: 0;
`;

const IconWhite = styled(Icon)`
	color: white;
`;
const IconColor = styled(Icon)`
	color: ${(props) => props.Color};
	margin-right: 0.694rem;
	flex-shrink: 0;
	margin-top: 0.2rem;
`;

const TaskIcon = ({ color = "#FFF", windowWidth }) => {
	if (windowWidth > config.breakpoints.tablet) {
		return (
			<TaskBackground BackgroundColor={color}>
				<IconWhite height="1rem" />
			</TaskBackground>
		);
	} else {
		return <IconColor height="0.8rem" Color={color} />;
	}
};

const ResponsivTaskIcon = ({ color = "#FFF" }) => {
	return (
		<WindowWidth>
			<TaskIcon color={color} />
		</WindowWidth>
	);
};

export default ResponsivTaskIcon;
