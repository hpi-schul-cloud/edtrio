import React, { useContext, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Portal } from "react-portal"
import Container from "~/components/Container"
import Button from "~/components/Button"
import Flex from "~/components/Flex"

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




ModalActions.propTypes = {
  action: ({ action }) => {
    if (action && action.type !== Button) {
      return new Error('Modal expects action to be a Button instance.')
    }
  }
}



function ModalActions({ children, actions, cancelButton = true, isOpen, closeModal }) {
  return (
    isOpen && <Portal>
      <Wrapper onClick={closeModal}>
        <Content onClick={(e) => e.stopPropagation()} small>
          {children}
          <br />
          <Flex justifyBetween>
            {cancelButton === true ?
              <Button noMargin
                secondary
                onClick={closeModal}
              >Abbrechen</Button> : null
            }
            {actions.map((action, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => {
                    closeModal()
                    action.onClick()
                  }}
                >
                  {action.name}
                </Button>
              )
            })}

          </Flex>
        </Content>
      </Wrapper>
    </Portal >

  )
}

export default ModalActions