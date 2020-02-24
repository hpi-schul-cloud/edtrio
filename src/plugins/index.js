
import {
	EditorPlugin, 
	EditorPluginProps, 
	ListStateType, 
	UploadHandler,
	UploadStateType,
} from '@edtr-io/plugin';

import { createRowsPlugin } from "@edtr-io/plugin-rows"
// import { anchorPlugin } from "@edtr-io/plugin-anchor"
import { createBlockquotePlugin } from "@edtr-io/plugin-blockquote"
import { createSpoilerPlugin } from "@edtr-io/plugin-spoiler"
import { createTextPlugin } from "@edtr-io/plugin-text"
// import { scMcExercisePlugin } from "@edtr-io/plugin-sc-mc-exercise"
// import { equationsPlugin } from "@edtr-io/plugin-equations"
import { createGeogebraPlugin } from "@edtr-io/plugin-geogebra"
import { createVideoPlugin } from "@edtr-io/plugin-video"
// import { inputExercisePlugin } from "@edtr-io/plugin-input-exercise"
import { createFilesPlugin, parseFileType } from "@edtr-io/plugin-files"
import { createImagePlugin } from "@edtr-io/plugin-image"
// import { highlightPlugin } from "@edtr-io/plugin-highlight"
// import { h5pPlugin } from "@edtr-io/plugin-h5p"

// import nexboardPlugin from "./nexboard"
import etherpadPlugin from "./etherpad"
// import notesPlugin from "./notes"

import etherpadPluginPreview from "./etherpad/Preview"
// import nexboardPluginPreview from "./nexboard/Preview"



function readFile(file) {
	return new Promise(resolve => {
		const reader = new FileReader()
		reader.onload = function(e) {
			const dataUrl = e.target.result
			// simulate uploadtime
			setTimeout(() => resolve({ file, dataUrl }), 1000)
		}

		reader.readAsDataURL(file)
	})
}

const mockUploadFileHandler = file => {
	return readFile(file).then(loaded => {
		return {
			location: loaded.dataUrl,
			name: loaded.file.name,
			type: parseFileType(loaded.file.name),
		}
	})
}

const ALLOWED_EXTENSIONS = ["gif", "jpg", "jpeg", "png", "svg"]

function matchesAllowedExtensions(fileName) {
	const extension = fileName
		.toLowerCase()
		.slice(fileName.lastIndexOf(".") + 1)
	return ALLOWED_EXTENSIONS.indexOf(extension) >= 0
}

function validateFile(file) {
	if (matchesAllowedExtensions(file.name)) {
		return { valid: true }
	} else {
		return {
			valid: false,
			errors:
				"Die ausgewählte Datei konnte nicht als Bild erkannt werden.",
		}
	}
}
export function mockUploadImageHandler(file) {
	const validation = validateFile(file)
	if (!validation.valid) {
		alert(validation.errors)
		return Promise.reject(validation.errors)
	}

	return readFile(file).then(loaded => {
		return loaded.dataUrl
	})
}

const filesPlugin = createFilesPlugin({ upload: mockUploadFileHandler })
const imagePlugin = createImagePlugin({
	upload: mockUploadImageHandler,
	validate: validateFile,
	secondInput: "description",
})

export const plugins = {
	text: createTextPlugin,
	// notes: notesPlugin,
	rows: createRowsPlugin,
	blockquote: createBlockquotePlugin,
	etherpad: etherpadPlugin,
	image: imagePlugin, // has to be implemented before files
	files: filesPlugin,
	spoiler: createSpoilerPlugin,
	geogebra: createGeogebraPlugin,
	// inputExercise: inputExercisePlugin,
	video: createVideoPlugin,
	// equations: equationsPlugin,
	// anchor: anchorPlugin,
	// nexboard: nexboardPlugin,
	// singleMultipleChoice: scMcExercisePlugin,
	// highlight: highlightPlugin,
	// h5p: h5pPlugin,
}

export const previewPlugins = {
	...plugins,
	etherpad: etherpadPluginPreview,
	// nexboard: nexboardPluginPreview
}


