import uuidv4 from 'uuid/v4'

export const setVideo = (state, video) => {
	state.videoTitle.set(video.title);
	state.videoUuid.set(uuidv4());
	state.videoUri.set(video.uri);
}
