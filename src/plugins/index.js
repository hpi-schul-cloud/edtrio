import {
	createIcon,
	faAnchor,
	faCaretSquareDown,
	faCode,
	faCubes,
	faDotCircle,
	faFileAlt,
	faFilm,
	faImages,
	faKeyboard,
	faNewspaper,
	faParagraph,
	faPhotoVideo,
	faQuoteRight
} from '@edtr-io/ui'
  

import { createRowsPlugin } from "@edtr-io/plugin-rows"

import { createAnchorPlugin } from "@edtr-io/plugin-anchor"
import { createBlockquotePlugin } from "@edtr-io/plugin-blockquote"
import { createSpoilerPlugin } from "@edtr-io/plugin-spoiler"
import { createTextPlugin } from "@edtr-io/plugin-text"
import { createScMcExercisePlugin } from "@edtr-io/plugin-sc-mc-exercise"
// import { createEquationsPlugin } from "@edtr-io/plugin-equations"
import { createGeogebraPlugin } from "@edtr-io/plugin-geogebra"
import { createVideoPlugin } from "@edtr-io/plugin-video"
import { createInputExercisePlugin } from "@edtr-io/plugin-input-exercise"
import { createFilesPlugin, parseFileType } from "@edtr-io/plugin-files"

import { createImagePlugin } from "@edtr-io/plugin-image"
// import { createHighlightPlugin } from "@edtr-io/plugin-highlight"
// import { h5pPlugin } from "@edtr-io/plugin-h5p"

// import nexboardPlugin from "./nexboard"
import etherpadPlugin from "./etherpad"

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

const filesPlugin = createFilesPlugin({
	upload: mockUploadFileHandler,
})

const imagePlugin = createImagePlugin({
	upload: mockUploadImageHandler,
	validate: validateFile,
	secondInput: "description",
})

export const plugins = {
	rows: createRowsPlugin({
		content: { plugin: "text" },
		plugins: [
			{
			  name: 'anchor',
			  title: 'Anchor',
			  icon: createIcon(faAnchor)
			},
			{
			  name: 'blockquote',
			  title: 'Blockquote',
			  icon: createIcon(faQuoteRight)
			},
 			{
			  name: 'files',
			  title: 'Files',
			  icon: createIcon(faFileAlt)
			},
			{
			  name: 'geogebra',
			  title: 'GeoGebra',
			  icon: createIcon(faCubes)
			},
/* 			{
			  name: 'highlight',
			  title: 'Code Highlight',
			  icon: createIcon(faCode)
			}, */
 			{
			  name: 'image',
			  title: 'Image',
			  icon: createIcon(faImages)
			},
			{
			  name: 'inputExercise',
			  title: 'Input Exercise',
			  icon: createIcon(faKeyboard)
			},
			{
			  name: 'multimediaExplanation',
			  title: 'Multimedia Explanation',
			  icon: createIcon(faPhotoVideo)
			},
			{
			  name: 'scMcExercise',
			  title: 'Choice Exercise',
			  icon: createIcon(faDotCircle)
			},
/* 			{
			  name: 'serloInjection',
			  title: 'Serlo Content',
			  icon: createIcon(faNewspaper)
			}, */
			{
			  name: 'spoiler',
			  title: 'Spoiler',
			  icon: createIcon(faCaretSquareDown)
			},
/* 			{
			  name: 'table',
			  title: 'Markdown Table'
			}, */
			{
			  name: 'text',
			  title: 'Text',
			  icon: createIcon(faParagraph)
			},
			{
			  name: 'video',
			  title: 'Video',
			  icon: createIcon(faFilm)
			}
		  ]
	}),
	text: createTextPlugin({}),
	blockquote: createBlockquotePlugin({
		content: { plugin: "text" }
	}),
	// etherpad: etherpadPlugin,
	image: imagePlugin,
	files: filesPlugin,
	spoiler: createSpoilerPlugin({
		content: { plugin: "text" }
	}),
	geogebra: createGeogebraPlugin({
		content: { plugin: "text" }
	}),
	inputExercise: createInputExercisePlugin({
		content: { plugin: "text" },
		feedback: { plugin: "text" }
	}),
	video: createVideoPlugin({
		content: { plugin: "video" }
	}),
	// equations: createEquationsPlugin({
	//
	// }),
	anchor: createAnchorPlugin({}),
	// nexboard: nexboardPlugin,
	singleMultipleChoice: createScMcExercisePlugin({
		content: { plugin: "text" },
		feedback: { plugin: "text" }
	}),
	// highlight: createHighlightPlugin({}),
	// h5p: h5pPlugin,
}

export const previewPlugins = {
	...plugins,
	// etherpad: etherpadPluginPreview,
	// nexboard: nexboardPluginPreview
}
