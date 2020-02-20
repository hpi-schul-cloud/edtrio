import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Flex from "~/components/Flex"
import SettingsSVG from "~/assets/header-settings.svg"

import Content from "./Content"

const StyledSettings = styled(Flex)`
    background-color: #af0437;
    padding: 10px 0;
    height: 100%;
    margin-left: 15px;
    cursor: pointer;
`

function useResizeListener(visible, setVisible, store) {
	function resizeListener() {
		if (visible && window.innerWidth < 1250) {
			setVisible(false)
		}

		if (!visible && window.innerWidth > 1250) {
			setVisible(true)
		}
	}

	useEffect(() => {
		if (window.innerWidth > 1250 && !store.view.bootstrapFinished) {
			setVisible(true)
		}

		// window.addEventListener("resize", resizeListener)
		// return () => window.removeEventListener("resize", resizeListener)
	}, [visible])
}

const Settings = ({ store, dispatch }) => {
	const [expanded, setExpanded] = useState(false)
	useResizeListener(expanded, setExpanded, store)
	return (
		<StyledSettings alignCenter justifyCenter
			onClick={() => {
				setExpanded(!expanded)
			}}
		>
			<SettingsSVG height="42px"/>
			<Content store={store} visible={expanded} />
		</StyledSettings>
	)
}

export default Settings
