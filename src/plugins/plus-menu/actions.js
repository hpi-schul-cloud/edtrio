import Image from '../image'
import { Text, Block } from 'slate'

/**
 * handles clicks on the imageblock button and
 * forwards them accordingly to plugins/image
 */
export const onClickImageButton = (
  event,
  change,
  onChange,
  uppy,
  closeUppyWindow,
) => {
  const { insertImage } = Image().changes;

  event.preventDefault();

  uppy.on("complete", result => {
    closeUppyWindow();

    result.successful.forEach(image => {
      uppy.reset();

      // TODO: replace with proper file upload (e.g. to S3)
      const fr = new FileReader();
      fr.onload = () => {
        change.call(insertImage, fr.result);
        onChange(change);
      };

      fr.readAsDataURL(image.data);
    });
  });
};

/**
 * handles clicks on the codeblock button and
 * forwards them accordingly to plugins/code-block
 */
export const onClickCodeButton = (event, change, onChange) => {
  event.preventDefault();

  change.call(_insertCodeBlock);

  onChange(change);
};

export const onClickIframeButton = (event, change, onChange) => {
  event.preventDefault()

  change.call(_insertEmbedBlock)

  onChange(change);
};

function _insertCodeBlock(change, target) {
  if (target) {
    change.select(target);
  }

  change.insertBlock(
    Block.create({
      type: "code",
      nodes: [Text.create()],
    }),
  );
}

function _insertEmbedBlock(change, target) {
  if (target) {
    change.select(target)
  }

  change.insertBlock(
    Block.create({
      type: 'embed',
      nodes: [Text.create()]
    })
  )
}
