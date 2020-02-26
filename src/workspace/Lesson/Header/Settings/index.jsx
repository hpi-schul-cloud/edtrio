import React, { useState, useEffect } from "react"
import styled from "styled-components"

import Flex from "~/components/Flex"
import BaseButton from "~/components/Button/BaseButton"
import SettingsIcon from "~/assets/header-settings.svg"

import Content from "./Content"

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

const Settings = ({ store, theme }) => {
	const [expanded, setExpanded] = useState(false)
	useResizeListener(expanded, setExpanded, store)
	return (
		<BaseButton
			theme={theme}
			onClick={() => {
				setExpanded(!expanded)
			}}
		>
			<SettingsIcon />
			<Content store={store} visible={expanded} />
		</BaseButton>
	)
}

export default Settings
