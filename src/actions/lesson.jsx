import { timeout } from "q"

export const onTitleChange = (store, dispatch) => message => {
	dispatch()
}

const editingTimeout
export const isEditing = (store, dispatch) => () => {
	if(store.edtiting === true){
		editingTimeout = timeout(() => {

		}, 2000)
	}
	dispatch({
		type: 'SET_EDITING',
		payload: true,
	})
}