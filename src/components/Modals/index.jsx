import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Portal } from "react-portal"
import Container from "~/components/Container"
import Button from "~/components/Button"
import Flex from "~/components/Flex"
import PropTypes from 'prop-types'

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    z-index: 999;
`

const Content = styled(Container)`
    background-color: #fff;
    max-width: 500px;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    z-index: 1000;
`


function ModalBase({ children, actions, disableClose, open, onClose }) {

	const [isOpen, setOpen] = useState(open)

	useEffect(() => {
		setOpen(open)
	}, [open])

	const onCloseHandler = () => {
		setOpen(false)
		if( !disableClose ) onClose()
	}

	return (
		isOpen && <Portal>
			<Wrapper onClick={onCloseHandler}>
				<Content onClick={(e) => e.stopPropagation()} small>
					{children}
					<br />
					<Flex justifyBetween>
						{!disableClose &&
							<Button noMargin
								secondary
								onClick={onCloseHandler}
							>Abbrechen</Button>
						}
						{actions}
					</Flex>
				</Content>
			</Wrapper>
		</Portal >

	)
}
ModalBase.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element)
	]).isRequired,
	actions: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element)
	]),
	disableClose: PropTypes.bool,
	closeModal: PropTypes.func,
	open: PropTypes.bool.isRequired
}

export default ModalBase