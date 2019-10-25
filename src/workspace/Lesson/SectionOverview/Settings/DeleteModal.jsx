import React from "react"
import styled from "styled-components"

import { PortalWithState } from "react-portal"
import Heading from "~/components/Heading"
import Text from "~/components/Text"
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
    z-index: 9999;
`

const Content = styled(Container)`
    background-color: #fff;
    max-width: 500px;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`

function DeleteModal({ confirmDelete, renderIcon, sectionTitle }) {
    return (
        <PortalWithState closeOnOutsideClick closeOnEsc>
            {({ openPortal, closePortal, isOpen, portal }) => (
                // <React.Fragment>
                <div>
                    {renderIcon(openPortal)}
                    {portal(
                        <Wrapper>
                            <Content small>
                                <Heading h3>"{sectionTitle}" löschen</Heading>
                                <Text size={20}>
                                    Bist du dir sicher, dass du diesen Abschnitt
                                    löschen möchtest? Du kannst dies nicht
                                    rückgängig machen.
                                </Text>
                                <br />
                                <Flex justifyBetween>
                                    <Button
                                        noMargin
                                        secondary
                                        onClick={closePortal}>
                                        Abbrechen
                                    </Button>
                                    <Button
                                        noMargin
                                        onClick={() => {
                                            confirmDelete()
                                            closePortal()
                                        }}>
                                        Löschen
                                    </Button>
                                </Flex>
                            </Content>
                        </Wrapper>,
                    )}
                </div>
                // </React.Fragment>
            )}
        </PortalWithState>
    )
}

export default DeleteModal
