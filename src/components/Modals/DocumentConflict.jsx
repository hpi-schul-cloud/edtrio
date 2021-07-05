import React, {useState} from 'react';
import ModalBase from '.';
import PropTypes from 'prop-types'
import Button from '../Button'
import Heading from '../Heading';
import Text from '../Text'


export const DocumentConflict = (props) => {
	const [open, setOpen] = useState(props.open)

	const keepOld = () => {
		setOpen(false)
		props.keepOld()
	}
	const keepNew = () => {
		setOpen(false)
		props.keepNew()
	}

	return (
		<ModalBase
			open={open}
			disableClose
			actions={[
				Button({
					key: 'old',
					onClick: keepOld,
					children: "Alter Stand"
				}),
				Button({
					key: 'new',
					onClick: keepNew,
					children: "Neuerer Stand"
				})
			]}
			closeModal={() => setOpen(false)}
		>
			<Heading h3>Konflikt in Dokument(en)</Heading>
			<Text size="18">Aufgrund eines Konflikts kann die Version auf diesem Gerät nicht mit dem anderer abgeglichen werden.</Text>
			<Text><b>Andere Geräte:</b> {props.localTimestamp.toLocalString()}</Text>
			<Text><b>Aktuelles Gerät:</b> {props.localTimestamp.toLocalString()}</Text>
		</ModalBase>
	)
}

DocumentConflict.propTypes = {
	open: PropTypes.bool.isRequired,
	keepOld: PropTypes.func.isRequired,
	keepNew: PropTypes.func.isRequired,
	serverTimestamp: PropTypes.objectOf(Date).isRequired,
	localTimestamp: PropTypes.objectOf(Date).isRequired
}

export default DocumentConflict