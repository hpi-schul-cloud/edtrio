import React, { useState } from "react"
import styled from "styled-components"
import moment from "moment"

import Flex from "~/components/Flex"
import Action from "~/components/Action"
import Heading from "~/components/Heading"
import Radio from "~/components/Input/Radio"
import Datepicker from "~/components/Input/Datepicker"
import Text from "~/components/Text"
import Modal from "~/components/Modal"

const StyledRadio = styled(Radio)`
    margin-bottom: 15px;
`

const DueDate = ({ task, change }) => {
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <React.Fragment>
            <Action
                noStyling
                clickable
                noMargin
                onClick={() => setModalOpen(!modalOpen)}>
                <Flex noWrap alignCenter>
                    <img
                        src={require("~/assets/clock-blue.png")}
                        alt=""
                        height="20px"
                        style={{ marginRight: 6, marginBottom: 3 }}
                    />
                    <Text noMargin inline tertiary bold size={20}>
                        Abgabetermin:{" "}
                    </Text>
                    <Text
                        tertiary
                        noMargin
                        size={20}
                        style={{ whiteSpace: "nowrap" }}>
                        &nbsp;
                        {task.dueDate === "NEXT"
                            ? "Bis zur nächsten Unterrichtsstunde"
                            : task.dueDate
                            ? moment(task.dueDate).format("DD/MM/YYYY")
                            : "Kein Abgabetermin"}
                    </Text>
                </Flex>
            </Action>
            <Modal
                isOpen={modalOpen}
                setOpen={setModalOpen}
                style={{ width: 500 }}>
                <Heading h4>Abgabetermin</Heading>
                <StyledRadio
                    selected={!task.dueDate}
                    onSelect={() => change({ dueDate: null })}>
                    Kein Abgabetermin
                </StyledRadio>
                <StyledRadio
                    selected={task.dueDate === "NEXT"}
                    onSelect={() => change({ dueDate: "NEXT" })}>
                    Bis zur nächsten Unterrichtsstunde
                </StyledRadio>
                <StyledRadio
                    selected={
                        task.dueDate !== "NEXT" &&
                        moment(task.dueDate).isValid()
                    }>
                    <Datepicker
                        showTimeSelect
                        onChange={newDate => change({ dueDate: newDate })}
                        selected={
                            task.dueDate && task.dueDate !== "NEXT"
                                ? task.dueDate
                                : null
                        }
                    />
                </StyledRadio>
            </Modal>
        </React.Fragment>
    )
}

export default DueDate
