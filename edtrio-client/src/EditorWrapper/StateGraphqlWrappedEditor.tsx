import React from "react";

import { EditorStateContext } from "../context/EditorStateContext";
import { LastSavedContext } from "../context/lastSavedContext";
import GraphqlWrappedEditor from "./GraphqlWrappedEditor";

import { UserBarrier } from "../dev-helpers/UserBarrier";

interface IStateGraphqlWrappedEditorProps {
  documentId: string;
}

export default function StateGraphqlWrappedEditor(
  props: IStateGraphqlWrappedEditorProps,
) {
  return (
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
            <UserBarrier
              updateCurrentUser={updateCurrentUser}
              currentUser={currentUser}
              updateUserList={updateUserList}
            >
              {currentUser && (
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
            </UserBarrier>
          )}
        </LastSavedContext.Consumer>
      )}
    </EditorStateContext.Consumer>
  );
}
