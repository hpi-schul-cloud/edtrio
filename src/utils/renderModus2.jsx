import React from "react"

class renderModus {
	constructor({
		error,
		edit,
		show,
		practice,
	}) {
		this.set({
			error,
			edit,
			show,
			practice,
		});
	}

	default(value = 'default') {
		return <div> {value} </div>
	}

	typeof(input) {
		return typeof input === 'function'; // or react
	}

	setView(key, value)  {
		if (!value && typeof key === 'object') {
			Object.entries(value).forEach(([k, v]) => {
				this.set(k, v);
			});
		}

		if (this[key]) {
			this[key] = this.typeof(key) ? value : this.default(key);
		}	
	}

	get(key) {
		return this[key];
	}

	setStates(lessonStore, permissions, loading = true) {
		this.lessonStore = lessonStore;
		this.permissions = permissions;
		this.loading = loading;
	}

	// todo is only fake must rewrite later
	selectModus() {
		if (!this.loading) {
			return this.error
		} else {
			if (this.lessonStore.studentView === true) {
				return this.practice
			}
			if (this.lessonStore.editing === true) {
				return this.edit
			}
			return this.show
		}
	}

	render(data) {
		return (this.selectModus())(data);
	}
}

export default renderModus;