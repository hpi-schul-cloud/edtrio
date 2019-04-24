import React, { useContext, useRef } from "react"
import styled, { css } from "styled-components"

import api from "~/utils/api"

import previewIcon from "~/assets/preview.svg"
import noPreviewIcon from "~/assets/no-preview.svg"
import arrowDownIcon from "~/assets/arrow-down.svg"
import arrowUpIcon from "~/assets/arrow-up.svg"
import trashIcon from "~/assets/trash.svg"

import Flex from "~/components/Flex"

import DeleteModal from "./DeleteModal"

const StyledControls = styled(Flex)`
    width: 850px;
    padding: 5px 0;
    overflow: hidden;
    flex-shrink: 0;

    transition: 250ms all ease-in-out;
    ${props =>
        props.hide &&
        css`
            opacity: 0;
            pointer-events: none;
        `}
`

const Icon = styled.img`
    cursor: pointer;
    margin: 5px;
    width: 20px;

    ${props =>
        !props.visible &&
        css`
            display: none;
        `}
`

const Controls = ({
    sectionId,
    store,
    index,
    dispatch,
    isLast,
    sectionRef,
    visible,
    sectionTitle,
}) => {
    function handleOrderChange(down) {
        dispatch({
            type: "SWAP_SECTIONS",
            payload: [index, down === true ? index + 1 : index - 1],
        })
        setTimeout(() => {
            sectionRef.current.scrollIntoView({
                behavior: "smooth",
            })
        }, 25)
    }

    async function confirmDelete() {
        dispatch({
            type: "PREPARE_DELETE_SECTION",
            payload: sectionId,
        })

        setTimeout(() => {
            dispatch({
                type: "DELETE_SECTION",
                payload: sectionId,
            })
        }, 250)

        await api.delete(`/editor/sections/${sectionId}`)
    }

    const isOnly = isLast && index === 0

    return (
        <StyledControls
            showNotes={store.showNotes}
            alignCenter
            justifyEnd
            hide={!store.editing}>
            <Icon
                src={arrowUpIcon}
                alt=""
                visible={index !== 0}
                onClick={() => handleOrderChange(false)}
            />
            <Icon
                src={arrowDownIcon}
                alt=""
                onClick={() => handleOrderChange(true)}
                visible={!isLast}
            />
            <Icon
                src={visible ? previewIcon : noPreviewIcon}
                visible
                onClick={() => {
                    dispatch({ type: "SECTION_VISIBILITY", payload: sectionId })
                }}
            />
            {!isOnly && (
                <DeleteModal
                    sectionTitle={sectionTitle}
                    confirmDelete={confirmDelete}
                    renderIcon={openModal => {
                        return (
                            <Icon src={trashIcon} visible onClick={openModal} />
                        )
                    }}
                />
            )}
        </StyledControls>
    )
}

export default Controls
