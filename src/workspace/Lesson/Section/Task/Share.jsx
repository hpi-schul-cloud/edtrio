import React, { useState } from "react"
import styled from "styled-components"
import moment from "moment"

import Heading from "~/components/Heading"
import Radio from "~/components/Input/Radio"
import Datepicker from "~/components/Input/Datepicker"
import Button from "~/components/Button"
import Modal from "~/components/Modal"

const StyledRadio = styled(Radio)`
    margin-bottom: 15px;
`

const Share = ({ task, change }) => {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <React.Fragment>
            <Button
                small
                noMargin
                primary
                onClick={() => setModalOpen(!modalOpen)}>
                Bereitstellen
            </Button>
            <Modal
                isOpen={modalOpen}
                setOpen={setModalOpen}
                style={{ width: 500 }}>
                <Heading h4>Abgabetermin</Heading>
                <StyledRadio
                    selected={
                        task.share &&
                        moment(task.share).valueOf() < moment().valueOf()
                    }
                    onSelect={() => change({ share: new Date() })}>
                    Ab jetzt
                </StyledRadio>
                <StyledRadio
                    selected={
                        task.share &&
                        moment(task.share).valueOf() > moment().valueOf()
                    }>
                    <Datepicker
                        showTimeSelect
                        onChange={newDate => change({ share: newDate })}
                        selected={
                            moment(task.share).isValid() &&
                            moment(task.share).valueOf() > moment().valueOf()
                                ? task.share
                                : null
                        }
                    />
                </StyledRadio>
                <StyledRadio
                    selected={!task.share}
                    onSelect={() => change({ share: null })}>
                    Als Entwurf speichern
                </StyledRadio>
            </Modal>
        </React.Fragment>
    )
}

export default Share
