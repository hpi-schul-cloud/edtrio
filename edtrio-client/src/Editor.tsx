import ApolloClient from "apollo-client";
import moment from "moment";
import "moment/locale/de";
import React, { PureComponent } from "react";
import { Value } from "slate";
import { Editor as SlateEditor } from "slate-react";
import styled from "styled-components";

import schema from "./schema";

// @ts-ignore:
import DocumentViewer from "./dev-helpers/DocumentViewer";
import { StateController } from "./dev-helpers/StateController";

import { plugins } from "./plugins";
// @ts-ignore:
import AddSection from "./plugins/add-section";
// @ts-ignore:
import PlusMenuPlugin from "./plugins/plus-menu/index";

import { IUserType } from "./types";
import importedValue from "./value.json";

import {
  updateDocument,
  updateDocumentVariables,
} from "./graphqlOperations/generated-types/updateDocument";
import { UPDATE_DOCUMENT } from "./graphqlOperations/operations";

moment.locale("de");

const StyledDocumentViewer = styled(DocumentViewer)`
  margin-top: 500px;
`;

const AppWrapper = styled.div`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
`;

interface IEditorState {
  value: Value;
  updateDebounce: number; // just so we can delay updating the document viewer, so it makes dev experience a lot smoother
  docValue: Value;
}

export interface IEditorUserProps {
  updateLastSaved: (newTimestamp: moment.Moment) => void;
  isEditable: boolean;
  updateIsEditable: (isEditable: boolean) => void;
  users: IUserType[];
  currentUser: IUserType;
  updateCurrentUser: (newUser: IUserType) => void;
}

interface IEditorProps extends IEditorUserProps {
  apolloClient?: ApolloClient<{}>;
  initialValue?: Value;
  value?: Value;
}

class Editor extends PureComponent<IEditorProps, IEditorState> {
  constructor(props: IEditorProps) {
    super(props);
    // if an initialValue is provided by the graphql server, use that
    // if not, read a value from Local Storage
    const value = props.initialValue || this.handleLoad();
    this.state = {
      value,
      updateDebounce: 0,
      docValue: value,
    };
    if (!this.props.currentUser.isTeacher && this.props.isEditable) {
      this.props.updateIsEditable(false);
    }
  }

  public componentDidMount = () => {
    // load last updated from document
    this.props.updateLastSaved(this.state.value.document.data.toJS().lastSaved);
  };

  public render() {
    // TODO: it is highly unlikely we actually need 5 separate divs here...
    return (
      <AppWrapper>
        <div className="App">
          <div className="columns">
            <div className="column" />
            <div className="column is-three-quarters">
              <div style={{ marginTop: "2rem" }}>
                {process.env.NODE_ENV === "development" ? (
                  <StateController
                    isEditable={this.props.isEditable}
                    updateIsEditable={this.props.updateIsEditable}
                    users={this.props.users}
                    currentUser={this.props.currentUser}
                    updateCurrentUser={this.props.updateCurrentUser}
                  />
                ) : null}
                <SlateEditor
                  autoFocus={true}
                  spellCheck={true}
                  plugins={plugins}
                  // if value is handled by the backend (and passed as props), it has priority over our state
                  value={this.props.value || this.state.value}
                  onChange={this.onChange}
                  className="slate-editor"
                  // @ts-ignore: slate/types 43 is not current... - this works perfectly fine
                  schema={schema}
                  readOnly={!this.props.isEditable}
                />
              </div>
              {process.env.NODE_ENV === "development" ? (
                <StyledDocumentViewer doc={this.state.docValue} />
              ) : null}
            </div>
            <div className="column" />
          </div>
        </div>
      </AppWrapper>
    );
  }

  /**
   * handles persisting the document (e.g. in localStorage or
   * backend)
   */
  private handleSave = (value: Value) => {
    // Save the value to Local Storage.
    if (!this.props.currentUser.isTeacher) {
      return;
    }
    const timestamp = moment(new Date());
    const document = this._addHeaderInformationToDocument(value, timestamp);

    localStorage.setItem("document", JSON.stringify(document));

    // If a graphql server is available, update the document there
    if (this.props.apolloClient) {
      this.props.apolloClient.mutate<updateDocument, updateDocumentVariables>({
        mutation: UPDATE_DOCUMENT,
        variables: {
          value: document,
          // @ts-ignore
          documentId: this.props.documentId,
        },
      });
    }

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
