import moment from "moment";
import "moment/locale/de";
import React, { Component } from "react";
import { Value } from "slate";
import { Editor as SlateEditor } from "slate-react";
import styled from "styled-components";

// import schema from "./schema";

// @ts-ignore:
import DocumentViewer from "./dev-document-viewer/DocumentViewer";

import { plugins } from "./plugins";
// @ts-ignore:
import AddSection from "./plugins/add-section";
// @ts-ignore:
import PlusMenuPlugin from "./plugins/plus-menu/index";

import importedValue from "./value.json";

moment.locale("de");

const StyledDocumentViewer = styled(DocumentViewer)`
  margin-top: 500px;
`;

interface IEditorState {
  value: Value;
}

interface IEditorProps {
  updateLastSaved: (newTimestamp: moment.Moment) => void;
}

class Editor extends Component<IEditorProps, IEditorState> {
  constructor(props: IEditorProps) {
    super(props);
    this.state = {
      value: this.handleLoad(),
    };
  }

  public componentDidMount = () => {
    // load last updated from document
    this.props.updateLastSaved(this.state.value.document.data.toJS().lastSaved);
  };

  public render() {
    return (
      <div className="columns">
        <div className="column" />
        <div className="column is-three-quarters">
          <div style={{ marginTop: "2rem" }}>
            <SlateEditor
              autoFocus={true}
              spellCheck={true}
              plugins={plugins}
              value={this.state.value}
              onChange={this.onChange}
              className="slate-editor"
            />
          </div>
          {process.env.NODE_ENV === "development" ? (
            <StyledDocumentViewer doc={this.state.value} />
          ) : null}
        </div>
        <div className="column" />
      </div>
    );
  }

  /**
   * handles persisting the document (e.g. in localStorage or
   * backend)
   */
  private handleSave = (value: Value) => {
    // Save the value to Local Storage.

    const timestamp = moment(new Date());
    const document = JSON.stringify(
      this._addHeaderInformationToDocument(value, timestamp),
    );
    localStorage.setItem("document", document);

    this.props.updateLastSaved(timestamp);
  };

  /**
   * adds some header information to the document pre-saving
   * e.g. authorid, lastSaved timestamp, ...
   */
  private _addHeaderInformationToDocument = (
    value: Value,
    newSavedTimestamp: moment.Moment,
  ) => {
    const valueJSON = value.toJSON();
    if (valueJSON.document) {
      valueJSON.document.data = {
        ...valueJSON.document.data,
        lastSaved: newSavedTimestamp,
      };
    }

    return valueJSON;
  };

  /**
   * handles retrieving the current document or loads a default
   * document instead
   */
  private handleLoad = () => {
    const document = localStorage.getItem("document");
    if (document) {
      const existingValue = JSON.parse(document);
      return Value.fromJSON(existingValue);
    }
    // TODO: no idea what is wrong here yet
    // @ts-ignore:
    return Value.fromJSON(importedValue);
  };

  /**
   * deals with state changes of the slate document
   */
  private onChange = ({ value }: { value: Value }) => {
    // Check to see if the document has changed before saving.
    if (value.document !== this.state.value.document) {
      this.handleSave(value);
    }

    this.setState({ value });
  };
}

export default Editor;
