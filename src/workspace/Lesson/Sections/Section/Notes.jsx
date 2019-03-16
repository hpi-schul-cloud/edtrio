import React, { useContext, useEffect } from "react"
import styled from "styled-components"

import arrowLeft from "~/assets/arrow-left.svg"

import LessonContext from "~/Contexts/Lesson"

import Heading from "~/components/Heading"
import Flex from "~/components/Flex"
import Text from "~/components/Text"

const OuterWrapper = styled.div`
    position: relative;
    margin-left: 10px;
`

const Wrapper = styled(Flex)`
    padding: ${props => (props.visible ? 15 : 0)}px;
    width: ${props => (props.visible ? 250 : 0)}px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 5px;
    background-color: #fff;

    transition: 250ms all ease-in-out;
    height: 100%;
`

const StyledNotes = styled.textarea`
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    opacity: ${props => (props.visible ? 1 : 0)};
    pointer-events: ${props => !props.visible && "none"};
    border: none;
    font-size: 20px;
    max-height: 100%;
    flex-grow: 1;
    line-height: 1.5;
    transition: 250ms all ease-in-out;
    color: rgb(100, 100, 100);
    font-family: "PT Sans", sans-serif;
    resize: none;

    &:focus {
        outline: none;
    }
`

const Notes = ({ notes, sectionId }) => {
    const { store, dispatch } = useContext(LessonContext)

    return (
        <OuterWrapper>
            <Wrapper visible={store.showNotes} column editing={store.editing}>
                <Heading
                    h5
                    style={{
                        opacity: store.showNotes ? 1 : 0,
                        transition: "250ms opacity ease-in-out",
                    }}>
                    Notizen
                </Heading>
                <StyledNotes
                    autoCorrect="off"
                    spellCheck={store.editing}
                    readOnly={!store.editing}
                    visible={store.showNotes}
                    value={notes}
                    onChange={evt =>
                        dispatch({
                            type: "NOTES",
                            payload: {
                                sectionId,
                                newValue: evt.target.value,
                            },
                        })
                    }
                />
            </Wrapper>
        </OuterWrapper>
    )
}

export default Notes
