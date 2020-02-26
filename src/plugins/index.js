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
import homework from "./homework"


import etherpadPluginPreview from "./etherpad/Preview"
// import nexboardPluginPreview from "./nexboard/Preview"
import homeworkPreview from "./homework/Preview"

const createPluginAdder = (list = []) => ({ name, title, icon, plugin, preview }) => {
	if (!name || !title || !icon || !plugin) {
		// eslint-disable-next-line no-console
		console.error('plugin metadata missing', { name, title, icon, plugin });
	}
	list.push({ name, title, icon, plugin, preview });
	return list;
};

const extractMenü = list => list.map(({title, icon, name}) => ({ title, icon, name }));

const extractPlugins = (list, forPreview = false) => {
	const meta = {};
	list.forEach(({ name, plugin, preview}) => {
		meta[name] = forPreview ? (preview || plugin) : plugin;
	});
	return meta;
};

const pluginList = [];
const addPlugin = createPluginAdder(pluginList);


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

addPlugin({
	name: 'filesPlugin',
	title: 'Files',
	icon: createIcon(faFileAlt),
	plugin: createFilesPlugin({
		upload: mockUploadFileHandler,
		i18n: {
			label: "Datei hinzufügen",
			failedUploadMessage: "Die ausgewählte Datei konnte nicht hinzugefügt werden."
		}
	})
});

addPlugin({
	name: 'image',
	title: 'Image',
	icon: createIcon(faImages),
	plugin: createImagePlugin({
		upload: mockUploadImageHandler,
		validate: validateFile,
		secondInput: "description",
		i18n: {
			label: 'Bild hinzufügen',
			failedUploadMessage: "Die ausgewählte Bild konnte nicht hinzugefügt werden.",
			src: {
				label: 'Bild Quelle',
				placeholder: {
					empty: 'https://beispiel.de/bild.png',
					uploading: 'Bild wird hinzugefügt',
					failed: 'Bild konnte nicht hinzugefügt werden',
				},
				retryLabel: 'Erneut versuchen',
			},
			link: {
				href: {
					label: 'Link',
					placeholder: 'Link zum Bild',
				},
				openInNewTab: {
					label: 'In neuem Fenster öffnen',
				},
			},
			alt: {
				label: 'Bildbeschreibung',
				placeholder: 'Füge eine Beschreinung hinzu',
			},
			maxWidth: {
				label: 'Maximale breite',
				placeholder: '300px',
			},
		}
	})
});

/* addPlugin({
	name: 'anchor',
	title: 'Anchor',
	icon: createIcon(faAnchor),
	plugin: createAnchorPlugin({}),
}); */

addPlugin({
	name: 'blockquote',
	title: 'Blockquote',
	icon: createIcon(faQuoteRight),
	plugin: createBlockquotePlugin({
		content: { plugin: "text" }
	})
});

addPlugin({
	name: 'geogebra',
	title: 'GeoGebra',
	icon: createIcon(faCubes),
	plugin: createGeogebraPlugin({
		content: { plugin: "text" }
	})
});

addPlugin({
	name: 'inputExercise',
	title: 'Input Exercise',
	icon: createIcon(faKeyboard),
	plugin: createInputExercisePlugin({
		content: { plugin: "text" },
		feedback: { plugin: "text" },
		i18n: {
			// types: Record<InputExerciseType, string>,
			type: {
				label: 'Typ',
			},
			unit: {
				label: 'Einheit',
			},
			answer: {
				addLabel: 'Anwort hinzufügen',
				value: {
					placeholder: 'Füge ein Antwort hinzu',
				},
			},
			inputPlaceholder: 'Antwort',
			fallbackFeedback: {
				correct: 'Richtig',
				wrong: 'Falsch',
			},
		},
	})
});

/*
addPlugin({
	name: 'multimediaExplanation',
	title: 'Multimedia Explanation',
	icon: createIcon(faPhotoVideo),
	plugin: createInputExercisePlugin({ // todo
		content: { plugin: "text" },
		feedback: { plugin: "text" }
	})
});
*/

addPlugin({
	name: 'scMcExercise',
	title: 'Choice Exercise',
	icon: createIcon(faDotCircle),
	plugin: createScMcExercisePlugin({
		content: { plugin: "text", config: { placeholder: "Lösungshinweis" }},
		feedback: { plugin: "text", config: { placeholder: "Antwort" }},
		i18n: {
			answer: { addLabel: 'Antwort hinzufügen' }
		}
	})
});

addPlugin({
	name: 'spoiler',
	title: 'Spoiler',
	icon: createIcon(faCaretSquareDown),
	plugin: createSpoilerPlugin({
		content: { plugin: "text" }
	})
});

addPlugin({
	name: 'text',
	title: 'Text',
	icon: createIcon(faParagraph),
	plugin: createTextPlugin({
		placeholder: 'Schreibe etwas oder füge ein neues Element hinzu ⊕'
	})
});

addPlugin({
	name: 'video',
	title: 'Video',
	icon: createIcon(faFilm),
	plugin: createVideoPlugin({
		i18n: {
			src: {
				label: 'Quelle',
			},
			alt: {
				label: 'Beschreibung',
			},
		},
	})
});

const pList = extractPlugins(pluginList);
pList.rows = createRowsPlugin({
	content: { plugin: "text" },
	plugins: extractMenü(pluginList)
});

const previewList = extractPlugins(pluginList, true);
previewList.rows = createRowsPlugin({
	content: { plugin: "text" }
	// without plugins menü
});

console.log(pList);
console.log(previewList);
export const plugins = pList;
// TODOs etherpadPlugin, 
// etherpad: etherpadPlugin, highlightPlugin, h5pPlugin,nexboardPlugin, createEquationsPlugin, serloInjectionPlugin, Markdown Table

export const previewPlugins = previewList;
