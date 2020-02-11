export const createTheme = (theme) => ({
	editor: {
		primary: {
			background: theme.colors.primary,
		},
	},
	plugins: {
		rows: {
			menu: {
				highlightColor: theme.colors.primary,
				dropzone: {
					highlightColor: theme.colors.primary,
				},
			},
		},
		text: {
			hoverColor: "#B6B6B6",
		},
	},
});