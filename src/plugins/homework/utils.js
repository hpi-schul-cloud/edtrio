export const setHomeworkState = (state, homework) => {
	state.color.set(homework.color);
	state.name.set(homework.name);
	state._id.set(homework._id);
	state.link.set(homework.link);
}