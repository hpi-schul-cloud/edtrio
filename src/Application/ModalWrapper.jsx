import React, { useEffect , useContext, useState } from 'react'
import LessonContext from '~/Contexts/Lesson.context'
import DocumentConflict from '~/components/Modals/DocumentConflict'
import { sectionStateConflictResolved } from '~/Contexts/notifications.actions';


const types = {
	SECTION_CONFLICTS: 'SECTION_CONFLICTS'
}

export const ModalWrapper = () => {

	const {store, dispatch} = useContext(LessonContext);

	const [modals, setModals] = useState({})

	useEffect(() => {
		if(store.notifications.sectionStateConflicts.length === 0){
			setModals({
				...modals,
				[types.SECTION_CONFLICTS]: undefined
			})
		} else {
			const {serverTimestamp, localTimestamp} =
				store.notifications.sectionStateConflicts.reduce((acc, {local, server}) => {
					if(acc.localTimestamp < local.timestamp)
						acc.localTimestamp = local.timestamp;

					if(acc.serverTimestamp < server.timestamp)
						acc.serverTimestamp = server.timestamp;

					return acc;
				}, {
					localTimestamp: 0,
					serverTimestamp: 0
				})
			setModals({
				...modals,
				[types.SECTION_CONFLICTS]:{
					open: true,
					serverTimestamp: new Date(serverTimestamp),
					localTimestamp: new Date(localTimestamp),
					keepOld: () => {dispatch(sectionStateConflictResolved(localTimestamp > serverTimestamp))},
					keepNew: () => {dispatch(sectionStateConflictResolved(localTimestamp < serverTimestamp))}
				}
			})
		}
	}, [store.notifications.sectionStateConflicts])

	if ( modals[types.SECTION_CONFLICTS] ){
		return <DocumentConflict {...modals[types.SECTION_CONFLICTS]}/>
	}

	return null
}

export default ModalWrapper