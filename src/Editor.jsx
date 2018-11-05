import React, { Component } from "react";
import { Editor as SlateEditor } from "slate-react";
import { Value } from "slate";
import moment from "moment";
import "moment/locale/de";

import TextMenu from "./plugins/text-menu";
import PlusMenuPlugin from "./plugins/plus-menu";
import CodeBlockPlugin from "./plugins/code-block";
// import AutoURL from './plugins/auto-url'
import Image from "./plugins/image";
import Geogebra from "./plugins/geogebra";
import URLHandler from "./plugins/url-handler";
import MarkdownShortcuts from "./plugins/markdown-shortcuts";
import Title from "./plugins/title";
import Section from "./plugins/section";
import Iframe from "./plugins/iframe";
import DownloadFile from "./plugins/download-file";

import DocumentViewer from "./dev-document-viewer/DocumentViewer";
import AddSection from "./plugins/add-section";
import schema from "./schema";

import importedValue from "./value";
import Headlines from "./plugins/headlines";

moment.locale("de");

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.handleLoad(),
    };

    this.plugins = [
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

    this.debounce = null;
  }

  componentDidMount = () => {
    this.updateMenu();
  };

  componentDidUpdate = () => {
    this.updateMenu();
  };

  /**
   * handles persisting the document (e.g. in localStorage or
   * backend)
   */
  handleSave = value => {
    // Save the value to Local Storage.

    const timestamp = moment(new Date());
    const document = JSON.stringify(
      this._addHeaderInformationToDocument(value, timestamp),
    );
    localStorage.setItem("document", document);

    // When succeeded, update the frontend UI as well
    // (yes, using window is SO against React principles,
    //  but I honestly have no idea rn how to do it in a
    //  better way... PLEASE HELP!)
    window.updateLastSaved(timestamp);
  };

  /**
   * adds some header information to the document pre-saving
   * e.g. authorid, lastSaved timestamp, ...
   */
  _addHeaderInformationToDocument = (value, newSavedTimestamp) => {
    let valueJSON = value.toJSON();
    valueJSON.document.data = {
      ...valueJSON.document.data,
      lastSaved: newSavedTimestamp,
    };

    return valueJSON;
  };

  /**
   * handles retrieving the current document or loads a default
   * document instead
   */
  handleLoad = () => {
    const existingValue = JSON.parse(localStorage.getItem("document"));
    return Value.fromJSON(existingValue || importedValue);
  };

  /**
   * deals with state changes of the slate document
   */
  onChange = ({ value }) => {
    // Check to see if the document has changed before saving.
    if (value.document !== this.state.value.document) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => this.handleSave(value), 750);
    }

    this.setState({ value });
  };

  /**
   * handles UI updates regarding the plugin/text-menu
   */
  updateMenu = () => {
    const { value } = this.state;
    this.hoverMenu.update({ resetMenu: value.isBlurred || value.isEmpty });
    this.plusMenu.update({
      resetMenu:
        value.isBlurred || !value.blocks.some(node => node.type === "p"),
    });
  };

  render() {
    const HoverMenu = TextMenu().components.HoverMenu;
    const PlusMenu = PlusMenuPlugin().components.PlusMenu;
    const AddSectionButton = AddSection().components.AddSectionButton;

    return (
      <div className="columns">
        <div className="column" />
        <div className="column is-three-quarters">
          <div style={{ marginTop: "2rem" }}>
            <HoverMenu
              ref={menu => (this.hoverMenu = menu)}
              value={this.state.value}
              onChange={this.onChange}
            />
            <PlusMenu
              ref={menu => (this.plusMenu = menu)}
              value={this.state.value}
              onChange={this.onChange}
            />
            <SlateEditor
              autoFocus
              spellCheck
              schema={schema}
              plugins={this.plugins}
              value={this.state.value}
              onChange={this.onChange}
              className="slate-editor"
            />
            <AddSectionButton
              value={this.state.value}
              onChange={this.onChange}
            />
          </div>
          {process.env.NODE_ENV === "development" ? (
            <React.Fragment>
              {/*TODO: remove ugly spacer <3*/}
              <div style={{ height: "500px" }} />
              <DocumentViewer doc={this.state.value} />
            </React.Fragment>
          ) : null}
        </div>
        <div className="column" />
      </div>
    );
  }
}

export default Editor;
