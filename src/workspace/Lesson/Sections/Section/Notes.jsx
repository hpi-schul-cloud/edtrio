import React, { useContext } from "react"
import styled from "styled-components"

import { LessonContext } from "~/contexts/Lesson"

import Heading from "~/components/Heading"
import Flex from "~/components/Flex"

const Wrapper = styled(Flex)`
    padding: 15px;
    width: 250px;
    background-color: ${props =>
        props.editing ? "rgb(250, 250, 250)" : "#fff"};

    transition: 250ms background-color ease-in-out;
    height: 100%;
`

const StyledNotes = styled.textarea`
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    background-color: ${props =>
        props.editing ? "rgb(250, 250, 250)" : "#fff"};
    border: none;
    font-size: 16px;
    max-height: 100%;
    flex-grow: 1;
    line-height: 1.5;
    transition: 250ms background-color ease-in-out;
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
        <div style={{ paddingTop: 50 }}>
            <Wrapper column editing={store.editing}>
                <Heading
                    h5
                    style={{
                        opacity: notes.length || store.editing ? 1 : 0,
                        transition: "250ms opacity ease-in-out",
                    }}>
                    Notizen
                </Heading>
                <StyledNotes
                    readOnly={!store.editing}
                    editing={store.editing}
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
        </div>
    )
}

export default Notes
