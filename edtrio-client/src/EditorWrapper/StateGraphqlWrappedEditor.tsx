import React from "react";

import { EditorStateContext } from "../context/EditorStateContext";
import { LastSavedContext } from "../context/lastSavedContext";
import GraphqlWrappedEditor from "./GraphqlWrappedEditor";

interface IStateGraphqlWrappedEditorProps {
  documentId: string;
}

export default function StateGraphqlWrappedEditor(
  props: IStateGraphqlWrappedEditorProps,
) {
  return (
    // TODO: get users from backend
    <EditorStateContext.Consumer>
      {({
        updateIsEditable,
        isEditable,
        updateCurrentUser,
        updateUserList,
        currentUser,
        users,
      }) => (
        <LastSavedContext.Consumer>
          {({ updateLastSaved }) => (
            <GraphqlWrappedEditor
              documentId={props.documentId}
              updateLastSaved={updateLastSaved}
              isEditable={isEditable}
              updateIsEditable={updateIsEditable}
              users={users}
              currentUser={currentUser}
              updateCurrentUser={updateCurrentUser}
              updateUserList={updateUserList}
            />
          )}
        </LastSavedContext.Consumer>
      )}
    </EditorStateContext.Consumer>
  );
}
