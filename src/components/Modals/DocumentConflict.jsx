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
			isOpen={open}
			disableClose
			actions={[
				Button({
					onClick: keepOld,
					children: "Alt"
				}),
				Button({
					onClick: keepNew,
					children: "Neu"
				})
			]}
			closeModal={() => setOpen(false)}
		>
			<Heading h3>Konflikt in Dokument(en)</Heading>
			<Text>
				Aufgrund eines Konflikts können die lokale Version nicht mit dem Server abgeglichen werden.
				Server: {props.serverTimestamp}
				Lokal: {props.localTimestamp}
			</Text>
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