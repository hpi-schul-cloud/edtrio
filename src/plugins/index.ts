// @ts-ignore:
import Audio from "./audio/index";
// @ts-ignore:
import CodeBlockPlugin from "./code-block/index";
// @ts-ignore:
import Embed from "./embed/index";
// @ts-ignore:
import Geogebra from "./geogebra/index";
import Headlines from "./headlines/index";
// @ts-ignore:
import Image from "./image/index";
// @ts-ignore:
import MarkdownShortcuts from "./markdown-shortcuts/index";
// @ts-ignore:
import PasteURLHandler from "./paste-url-handler/index";
// @ts-ignore:
import PlusMenu from "./plus-menu/index";
// @ts-ignore:
import Section from "./section/index";

import TextMenu from "./text-menu/index";
import Title from "./title/index";
// @ts-ignore:
import Video from "./video/index";

import AddSection from "./add-section";

export const plugins = [
  ...Title().plugins,
  ...Section().plugins,
  ...AddSection().plugins,
  ...TextMenu().plugins,
  ...PlusMenu().plugins,
  ...Headlines().plugins,
  // ...MarkdownShortcuts().plugins,
  // ...Embed().plugins,
  // ...Video().plugins,
  // ...Audio().plugins,
  // ...PasteURLHandler().plugins,
  // ...CodeBlockPlugin().plugins,
  // ...Image().plugins,
  // ...Geogebra().plugins,
];
