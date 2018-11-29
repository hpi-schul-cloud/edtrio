import moment from "moment";
import "moment/locale/de";
import React, { PureComponent } from "react";
import { Value } from "slate";
import { Editor as SlateEditor } from "slate-react";
import styled from "styled-components";

import schema from "./schema";

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
  updateDebounce: number;
  // just so we can delay updating the document viewer, so it makes dev experience a lot smoother
  docValue: Value;
}

interface IEditorProps {
  updateLastSaved: (newTimestamp: moment.Moment) => void;
}

class Editor extends PureComponent<IEditorProps, IEditorState> {
  constructor(props: IEditorProps) {
    super(props);
    this.state = {
      value: this.handleLoad(),
      updateDebounce: 0,
      docValue: this.handleLoad(),
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
              schema={schema}
            />
          </div>
          {process.env.NODE_ENV === "development" ? (
            <StyledDocumentViewer doc={this.state.docValue} />
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
  private onChange = (change: any) => {
    this.setState({ value: change.value });

    // Especially if images are in the document, saving takes ages. Delay this until there is no user
    // interaction for one second
    if (this.state.updateDebounce) {
      clearTimeout(this.state.updateDebounce);
    }
    this.setState({
      updateDebounce: window.setTimeout(() => {
        this.handleSave(change.value);
        this.setState({ docValue: change.value });
      }, 1000),
    });
  };
}

export default Editor;
