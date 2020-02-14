import config from "~/config"

export const setHomeworkState = (state, homework) => {
	state.name.set(homework.name);
	state._id.set(homework._id);
	state.link.set(`${config.HOMEWORK_URI}/${homework._id}`);
	console.log(typeof homework.dueDate)
	state.dueDate.set(homework.dueDate)
}