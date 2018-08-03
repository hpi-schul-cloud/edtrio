import { Inline } from "slate";

export const isPrintableChar = event => event.key.length === 1;

export const isCtrlOrCmd = event => event.ctrlKey || event.metaKey;

const isSpace = event => event.key === " ";

const getSelection = change => change.value.fragment.text;

const getLastWordRec = (change, maxIndex, counter = 0) => {
    // If first char of the input is found just select everything (single word)
    // console.log(`counter ${counter} and maxi ${maxIndex}`)
    console.log(`start: ${change.value.selection.startKey} and end ${change.value.selection.endKey}`)
    console.log(`counter is ${counter} and maxi ${maxIndex}`)
    // alert()
	if (counter === maxIndex) {
        console.log('I AM IN')
		const selectedWord = getSelection(change);
        change.extend(counter);
        console.log(`extended by ${counter}`)
		return selectedWord;
	}

	// Move selection
	const selectedWord = getSelection(change.extend(-1));

	// Exit condition
	if (selectedWord[0] === " ") {
		change.extend(counter + 1); // one more needed because space
		return selectedWord.substring(1);
	}

	return getLastWordRec(change, maxIndex, counter + 1);
};

export const getLastWord = change => {
	const offsetCurrentWord = change.value.focusOffset;
	return getLastWordRec(change, offsetCurrentWord);
};

const getPreviousNode = change => {
	const block = change.value.focusBlock;
	const activeKey = change.value.selection.focusKey;
	return block.getPreviousSibling(activeKey);
};

export const focusPreviousNode = change => {
	const offsetCurrentWord = change.value.focusOffset;
	// check if we just started a the node
	if (offsetCurrentWord === 0) {
		const previousNode = getPreviousNode(change);
		if (previousNode && Inline.isInline(previousNode)) {
			change.extendToEndOf(previousNode).focus();
		}
	}
};

const InstantReplace = transforms => ({
	onKeyDown(event, change) {
		if (!isPrintableChar(event)) return;

		// needed to handle space & control + key actions by default
		if (!isCtrlOrCmd(event)) {
			if (!isSpace(event)) focusPreviousNode(change);
			change.insertText(event.key);

			// Apply transforms
			if (Array.isArray(transforms)) {
				transforms.forEach(transform => {
					const lastWord = getLastWord(change);
					transform(change, lastWord);
				});
			} else if (transforms) {
				const lastWord = getLastWord(change);
				transforms(change, lastWord);
			}

			// Prevent insertion of the char
			event.preventDefault();
		}
	}
});

export default InstantReplace;