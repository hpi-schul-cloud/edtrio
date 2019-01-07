import { List } from "immutable";
import { Block, Editor, Text } from "slate";
// @ts-ignore
import Image from "../image";

/**
 * handles clicks on the imageblock button and
 * forwards them accordingly to plugins/image
 */
export const onClickImageButton = (
  event: any,
  uppy: any,
  closeUppyWindow: any,
  editor: Editor,
) => {
  const { insertImage } = Image().changes;

  event.preventDefault();

  uppy.on("complete", (result: any) => {
    closeUppyWindow();

    const image = result.successful.slice(-1)[0];
    uppy.reset();

    // TODO: replace with proper file upload (e.g. to S3)
    const fr = new FileReader();
    fr.onload = () => {
      if (fr.result) {
        insertImage(editor, fr.result, null);
      }
    };

    fr.readAsDataURL(image.data);
    uppy.cancelAll();
  });
};

/**
 * handles clicks on the codeblock button and
 * forwards them accordingly to plugins/code-block
 */
export const onClickCodeButton = (event: any, editor: Editor) => {
  event.preventDefault();

  editor.insertBlock(
    Block.create({
      type: "code",
      nodes: List([Text.create({})]),
    }),
  );
};

export const onClickIframeButton = (event: any, editor: Editor) => {
  event.preventDefault();

  editor.insertBlock(
    Block.create({
      type: "embed",
      nodes: List([Text.create({})]),
    }),
  );
};

export const onClickSortingTaskButton = (event: any, editor: Editor) => {
  event.preventDefault();

  editor.insertBlock(
    Block.create({
      type: "sortingTask",
    }),
  );
};
