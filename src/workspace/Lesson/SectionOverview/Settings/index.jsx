import React, { useContext } from "react"
import { Portal } from "react-portal"
import styled, { css } from "styled-components"

import LessonContext from "~/Contexts/Lesson"
import api from "~/utils/api"

import Flex from "~/components/Flex"

import previewIcon from "~/assets/preview-white.svg"
import noPreviewIcon from "~/assets/no-preview-white.svg"
import trashIcon from "~/assets/trash-white.svg"
import duplicateIcon from "~/assets/duplicate-white.svg"
import shareIcon from "~/assets/share-white.svg"
import infoIcon from "~/assets/info-white.svg"
import closeIcon from "~/assets/close-white.svg"

import DeleteModal from "./DeleteModal"

const Wrapper = styled(Flex)`
    background-color: rgba(68, 68, 68, 1);
    width: 100vw;
    position: fixed;
    left: 0;
    top: 62px;
    padding: 10px 15px;
    z-index: 99999;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.18);
`

const Icon = styled.img`
    cursor: pointer;
    margin-right: 25px;
    width: 20px;

    &:last-child {
        margin-right: 0;
    }

    /* ${props =>
        !props.visible &&
        css`
            display: none;
        `} */

    ${props => {
        return (
            props.isOnly &&
            css`
                cursor: not-allowed;
                user-select: none;
                opacity: 0.5;
                &:active {
                    cursor: not-allowed;
                }
            `
        )
    }}
`

const Settings = () => {
    const { store, dispatch } = useContext(LessonContext)
    const activeSectionId = store.activeSectionId
    const activeSection = store.lesson.sections.find(
        el => el.id === activeSectionId,
    )
    const activeSectionIndex = store.lesson.sections.findIndex(
        el => el.id === activeSectionId,
    )

    const isOnly = store.lesson.sections.length === 1

    async function confirmDelete() {
        dispatch({
            type: "PREPARE_DELETE_SECTION",
            payload: activeSectionId,
        })

        setTimeout(() => {
            dispatch({
                type: "DELETE_SECTION",
                payload: activeSectionId,
            })
        }, 250)

        await api.delete(`/editor/sections/${activeSectionId}`)
    }

    if (!store.showSectionSettings) return null

    return (
        <Portal>
            <Wrapper justifyBetween>
                <Flex noWrap>
                    <Icon src={duplicateIcon} />
                    <Icon src={shareIcon} />
                    <Icon src={infoIcon} />
                    <DeleteModal
                        sectionTitle={
                            activeSection.title ||
                            `Abschnitt ${activeSectionIndex + 1}`
                        }
                        confirmDelete={confirmDelete}
                        renderIcon={openModal => {
                            return (
                                <Icon
                                    src={trashIcon}
                                    isOnly={isOnly}
                                    visible
                                    onClick={e => !isOnly && openModal(e)}
                                />
                            )
                        }}
                    />
                    <Icon
                        src={
                            activeSection.visible ? previewIcon : noPreviewIcon
                        }
                        onClick={() => {
                            dispatch({
                                type: "SECTION_VISIBILITY",
                                payload: activeSectionId,
                            })
                        }}
                        visible
                    />
                </Flex>
                <Flex noWrap>
                    <Icon
                        src={closeIcon}
                        onClick={() => {
                            dispatch({ type: "TOGGLE_SECTION_SETTINGS" })
                        }}
                    />
                </Flex>
            </Wrapper>
        </Portal>
    )
}

export default Settings
