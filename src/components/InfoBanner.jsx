import React, { useContext, useRef, useState } from "react";
import styled, { css } from "styled-components";

import LessonContext from "~/Contexts/Lesson.context";
import Icon from "~/assets/chat-bubble.svg";
import config from "~/config";

const Banner = styled.div`
	 padding-box;
			overflow: hidden;
			background-color: #f5f5f5;
			width: 100vw;
			transition: 250ms all ease-in-out;
			& span {
				display: block;
				margin: -10px 0 0 20px;
				color: #666;
			}
	${(props) =>
		props.expanded
			? css`
					padding: 0 240px 0 40px;
					margin: -13px -38px 15px;
					overflow: hidden;
					width: 100vw;
					margin-left: 220px;
			  `
			: css`
					padding: 0px 18px 0 92px;
					margin: -13px 1px 15px;
					overflow: hidden;
					width: 100vw;
			  `}
`;

const ContainerFeedback = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-item: center;
	padding-bottom: 10px;
`;
const Ribbon = styled.div`
	transform: rotate(-26deg);
	display: block;
	position: relative;
	top: 3px;
	left: -118px;
	width: 200px;
	height: 20px;
	padding-top: 3px;
	text-align: center;
	font-size: 12px;
	font-weight: bold;
	color: #fff;
	background-color: #455b6a;
`;

const Feedback = styled.text`
	color: #b1063a;
	align-text: top;
	float: right;
	margin-top: -10px;
	padding: 0 0 10px 20px;
`;
const StyledLink = styled.a`
	&::after {
		display: none;
	}
`;
const ChatIcon = styled(Icon)`
	color: grey;
	height: 1rem;
`;

const InfoBanner = ({ editing, expanded }) => {
	if (editing) {
		return (
			<Banner expanded={expanded}>
				<Ribbon>BETA</Ribbon>
				<ContainerFeedback>
					<span>
						Erstellte Inhalte werden gespeichert und können
						Schüler:innen bereitgestellt werden.
						<br />
						Teilen und Kopieren der Inhalte ist noch nicht möglich.
					</span>
					<StyledLink href="mailto:feedback@schul-cloud.org?subject=Mein%20Feedback%20zum%20neuen%20Themen-Werkzeug&amp;body=Liebes%20Schul-Cloud-Team%2C%0A%0AHier%20kommt%20mein%20Feedback%20zum%20neuen%20Editor.%0A%0ADas%20hat%20gut%20funktioniert%3A%0A%0A%0AHier%20hatte%20ich%20Probleme%3A%0A%0A%0ADiese%20Funktion%20w%C3%BCnsche%20ich%20mir%20am%20meisten%3A%0A%0A%0A">
						<Feedback>Wir freuen uns über Feedback</Feedback>
					</StyledLink>
				</ContainerFeedback>
			</Banner>
		);
	} else return <Banner></Banner>;
};

export default InfoBanner;
