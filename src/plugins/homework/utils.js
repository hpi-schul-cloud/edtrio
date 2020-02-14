export const setHomeworkState = (state, homework) => {
	state.name.set(homework.name);
	state._id.set(homework._id);
	state.link.set(homework.link);
}