import Audio from "./audio/index";
import CodeBlockPlugin from "./code-block/index";
import Embed from "./embed/index";
import Geogebra from "./geogebra/index";
import Headlines from "./headlines/index";
import Image from "./image/index";
import MarkdownShortcuts from "./markdown-shortcuts/index";
import PasteURLHandler from "./paste-url-handler/index";
import PlusMenu from "./plus-menu/index";
import Poll from "./poll/index";
import Section from "./section/index";

import TextMenu from "./text-menu/index";
import Title from "./title/index";
import Video from "./video/index";

import AddSection from "./add-section";

export const plugins: object[] = [
  ...Title().plugins,
  ...Section().plugins,
  ...AddSection().plugins,
  ...TextMenu().plugins,
  ...PlusMenu().plugins,
  ...Headlines().plugins,
  ...MarkdownShortcuts().plugins,
  ...Embed().plugins,
  ...Video().plugins,
  ...Audio().plugins,
  ...PasteURLHandler().plugins,
  ...CodeBlockPlugin().plugins,
  ...Image().plugins,
  ...Geogebra().plugins,
  ...Poll().plugins,
];
