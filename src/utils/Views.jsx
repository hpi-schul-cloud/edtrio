import React from "react"

class renderModus {
	constructor() {
		this.views = ['error', 'practice', 'show', 'edit'];
	}

	error(pluginname = '', err = '') {
		return <div>  
			Error, can not load {pluginname} {err}
		</div>
	}

	show (element) {
		return <div>
			{JSON.stringify(element)}
		</div>
	}

	edit (element) {
		return <div>
			{JSON.stringify(element)}
		</div>
	}

	practice (element) {
		return <div>
			{JSON.stringify(element)}
		</div>
	}

	// todo is only fake must rewrite later
	selectView(lessonStore, permissions, loading = true) {
		if (!loading) {
			return 'error'
		} else {
			if (lessonStore.studentView === true) {
				return 'practice'
			}
			if (lessonStore.editing === true) {
				return 'edit'
			}
			return 'show'
		}
	}

	getView(lessonStore, permissions, loading = true) {
		return this[this.selectView(lessonStore, permissions, loading)]
	}
}

export default renderModus;