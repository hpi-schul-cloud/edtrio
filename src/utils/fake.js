import uuid from "uuid/v4"

export const lessonFakeData = {
	_id: "5d6010ab2e10bd00131e2e71",
	title: "Nur ein Test",
	courseId: "5d513167807ca90013ebcd22",
	note: "",
	sections: [
		{
			_id: "5cd1528f7acaa04a5a7f9386",
			visible: true,
			note: "",
			parent: null,
			title: "",
			flag: "isTemplate",
			lesson: "5cd15282f1fe5772f05ef43c",
			owner: {
				_id: "5cd152827acaa04a5a7f9383",
				users: ["0000d231816abba584714c9e"],
				lesson: "5cd15282f1fe5772f05ef43c",
				owner: "0000d231816abba584714c9e",
				type: "group",
			},
			permissions: [],
			state: {
				plugin: "rows",
				state: [
					{
						plugin: "text",
						state: {
							object: "value",
							document: {
								object: "document",
								data: {},
								nodes: [
									{
										object: "block",
										type: "paragraph",
										data: {},
										nodes: [
											{
												object: "text",
												leaves: [
													{
														object: "leaf",
														text:
                                                            "Herzlich Willkommen in der Alpha-Version des neuen Themen-Werkzeugs!\n\nDas ist das Grundgerüst für den komplett überarbeiteten Themen-Editor. Schon in dieser frühen Entwicklungsphase freuen wir uns über Feedback zu den vorhandenen Funktionen, um diese zu verbessern und zu erweitern. Bitte beachte: Es wird nichts gespeichert, das ist eine reine Spielwiese.\n\nProbier es aus und gib uns formloses Feedback - jedes kleine bisschen hilft!",
														marks: [],
													},
												],
											},
										],
									},
								],
							},
						},
					},
				],
			},
			type: "section",
		},
	],
	type: "lesson",
	users: {
		_id: "5cd152827acaa04a5a7f9384",
		users: [],
		lesson: "5cd15282f1fe5772f05ef43c",
		owner: "0000d231816abba584714c9e",
		type: "group",
	},
	owner: {
		_id: "5cd152827acaa04a5a7f9383",
		users: [
			{
				userId: "0000d231816abba584714c9e",
				name: "Cord Carl",
				roles: ["teacher"],
			},
		],
		lesson: "5cd15282f1fe5772f05ef43c",
		owner: "0000d231816abba584714c9e",
		type: "group",
	},
}

export const getFakeSection = (lessonId = "5cd15282f1fe5772f05ef43c") => {
	return {
		_id: uuid(),
		visible: true,
		note: "",
		parent: null,
		title: "",
		flag: "isTemplate",
		lesson: lessonId,
		owner: {
			_id: "5cd152827acaa04a5a7f9383",
			users: ["0000d231816abba584714c9e"],
			lesson: "5cd15282f1fe5772f05ef43c",
			owner: "0000d231816abba584714c9e",
			type: "group",
		},
		permissions: [],
		state: {},
		type: "section",
	}
}
