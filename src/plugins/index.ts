// @ts-ignore:
import CodeBlockPlugin from "./code-block/index";
// @ts-ignore:
import DownloadFile from "./download-file/index";
// @ts-ignore:
import Geogebra from "./geogebra/index";
// @ts-ignore:
import Headlines from "./headlines/index";
// @ts-ignore:
import Iframe from "./iframe/index";
// import AutoURL from './auto-url'
// @ts-ignore:
import Image from "./image/index";
// @ts-ignore:
import MarkdownShortcuts from "./markdown-shortcuts/index";
// @ts-ignore:
import PlusMenuPlugin from "./plus-menu/index";
// @ts-ignore:
import Section from "./section/index";
// @ts-ignore:
import TextMenu from "./text-menu/index";
// @ts-ignore:
import Title from "./title/index";
// @ts-ignore:
import URLHandler from "./url-handler/index";

export const plugins = [
  ...Title().plugins,
  ...Section().plugins,
  ...TextMenu().plugins,
  ...Headlines().plugins,
  ...MarkdownShortcuts().plugins,
  ...Iframe().plugins,
  ...DownloadFile().plugins,
  ...URLHandler().plugins,
  ...CodeBlockPlugin().plugins,
  ...Image().plugins,
  ...Geogebra().plugins,
  // ...AutoURL().plugins
];
