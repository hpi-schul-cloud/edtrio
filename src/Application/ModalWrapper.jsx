import React, { useEffect , useContext, useState } from 'react'
import LessonContext from '~/Contexts/Lesson.context'
import DocumentConflict from '~/components/Modals/DocumentConflict'
import { sectionDocConflictResolved } from '~/Contexts/notifications.actions';


const types = {
	SECTION_CONFLICTS: 'SECTION_CONFLICTS'
}


export const ModalWrapper = () => {

	const {store, dispatch} = useContext(LessonContext);

	const modals = {}

	useEffect(() => {
		if(store.notifications.sectionStateConflicts.lenght === 0 && modals[types.SECTION_CONFLICTS]){
			delete modals[types.SECTION_CONFLICTS]
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
			modals[types.SECTION_CONFLICTS] = {
				open: true,
				serverTimestamp,
				localTimestamp,
				keepOld: () => {dispatch(sectionDocConflictResolved(localTimestamp > serverTimestamp))},
				keepNew: () => {dispatch(sectionDocConflictResolved(localTimestamp < serverTimestamp))}
			} 
		}
	}, [store.notifications.sectionStateConflicts])


	if ( modals[types.SECTION_CONFLICTS] ){
		return DocumentConflict(modals[types.SECTION_CONFLICTS])
	}

	return null
}

export default ModalWrapper