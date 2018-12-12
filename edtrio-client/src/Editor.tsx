import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
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
  isEditable: boolean;
  updateIsEditable: (isEditable: boolean) => void;
  users: IUserType[];
  currentUser: IUserType;
  updateCurrentUser: (newUser: IUserType) => void;
  apolloClient: ApolloClient<{}>;
  initialValue?: Value;
}

class Editor extends PureComponent<IEditorProps, IEditorState> {
  constructor(props: IEditorProps) {
    super(props);
    const value = props.initialValue || this.handleLoad();
    this.state = {
      value,
      updateDebounce: 0,
      docValue: value,
    };
    if (!this.props.currentUser.teacher && this.props.isEditable) {
      this.props.updateIsEditable(false);
    }
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
              value={this.state.value}
              onChange={this.onChange}
              className="slate-editor"
<<<<<<< HEAD
              // @ts-ignore: slate/types 43 is not current... - this works perfectly fine
=======
              // @ts-ignore: this works perfectly fine, thank you typescript
>>>>>>> WIP 2
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
    const mutation = gql`
      mutation updateDocument(
        $documentId: String!
        $value: String!
        $userIds: [String!]!
      ) {
        updateDocument(
          value: $value
          documentId: $documentId
          userIds: $userIds
        ) {
          id
          value
        }
      }
    `;
    this.props.apolloClient.mutate({
      mutation,
      variables: {
        userIds: ["cjpcyqzsr00230798e5nwrwy5"],
        value: document,
        documentId: "cjpcys08y002607989geb9ttk",
      },
    });

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
