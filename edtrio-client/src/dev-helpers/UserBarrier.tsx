import React, { PureComponent } from "react";

import { apolloClient } from "../EditorWrapper/apolloClient";
import {
  createUser,
  createUserVariables,
} from "../graphqlOperations/generated-types/createUser";
import {
  userBySchulCloudId,
  userBySchulCloudIdVariables,
} from "../graphqlOperations/generated-types/userBySchulCloudId";

import {
  CREATE_USER,
  USER_BY_SCHULCLOUDID,
} from "../graphqlOperations/operations";
import { IUserType } from "../types";
interface IUserBarrierProps {
  children: any;
  updateCurrentUser: (newUser: IUserType) => void;
  currentUser: IUserType | null;
  updateUserList: (users: IUserType[]) => void;
}

export class UserBarrier extends PureComponent<IUserBarrierProps> {
  public componentDidMount() {
    if (!this.props.currentUser) {
      const { updateCurrentUser, updateUserList } = this.props;
      // start Ajax
      const xhttp = new XMLHttpRequest();
      xhttp.withCredentials = true;
      xhttp.onreadystatechange = async function() {
        if (this.readyState === 4 && this.status === 200) {
          const response = JSON.parse(this.responseText);
          const isStudent = response.roles.some((role: { name: string }) =>
            role.name.match(/(s|S)tudent/),
          );
          const schulCloudUser = {
            id: response._id,
            name: response.displayName,
            isTeacher: !isStudent,
          };
          const potentialUserResponse = await apolloClient.query<
            userBySchulCloudId,
            userBySchulCloudIdVariables
          >({
            query: USER_BY_SCHULCLOUDID,
            variables: {
              schulCloudId: schulCloudUser.id,
            },
          });

          if (
            potentialUserResponse &&
            potentialUserResponse.data &&
            potentialUserResponse.data.userBySchulCloudId
          ) {
            updateCurrentUser({
              id: potentialUserResponse.data.userBySchulCloudId.id,
              name: potentialUserResponse.data.userBySchulCloudId.name,
              isTeacher:
                potentialUserResponse.data.userBySchulCloudId.isTeacher,
            });
            updateUserList([
              {
                id: potentialUserResponse.data.userBySchulCloudId.id,
                name: potentialUserResponse.data.userBySchulCloudId.name,
                isTeacher:
                  potentialUserResponse.data.userBySchulCloudId.isTeacher,
              },
            ]);
            return;
          }
          const createUserResponse = await apolloClient.mutate<
            createUser,
            createUserVariables
          >({
            mutation: CREATE_USER,
            variables: {
              name: schulCloudUser.name,
              isTeacher: schulCloudUser.isTeacher,
              schulCloudId: schulCloudUser.id,
            },
          });
          if (
            createUserResponse &&
            createUserResponse.data &&
            createUserResponse.data.createUser
          ) {
            updateCurrentUser({
              id: createUserResponse.data.createUser.id,
              name: createUserResponse.data.createUser.name,
              isTeacher: createUserResponse.data.createUser.isTeacher,
            });
            updateUserList([
              {
                id: createUserResponse.data.createUser.id,
                name: createUserResponse.data.createUser.name,
                isTeacher: createUserResponse.data.createUser.isTeacher,
              },
            ]);
          }
        }
      };
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJhY2NvdW50SWQiOiIwMDAwZDIxMzgxNmFiYmE1ODQ3MTRjYWEiLCJ1c2VySWQiOiIwMDAwZDIxMzgxNmFiYmE1ODQ3MTRjMGEiLCJpYXQiOjE1NDcwNDczMTAsImV4cCI6MTU0OTYzOTMxMCwiYXVkIjoiaHR0cHM6Ly9zY2h1bC1jbG91ZC5vcmciLCJpc3MiOiJmZWF0aGVycyIsInN1YiI6ImFub255bW91cyIsImp0aSI6IjU4OTM4YWI1LTY0YmItNDgxYS05NjZkLTQ2OTAzNDBiZTE1YyJ9.QUsgxsawJurLPYaXQwFngE7BOXNBtGhthjoq_MAdObM";
      xhttp.open("GET", "http://localhost:3030/me", true);
      xhttp.setRequestHeader("Authorization", "Bearer " + token);
      xhttp.send();
    }
  }
  public render() {
    const { currentUser } = this.props;
    if (currentUser) {
      return this.props.children;
    } else {
      return (
        <p>
          <a href="https://schul-cloud.org">Please Login</a> and{" "}
          <a href=".">reload this page</a> afterwards.
        </p>
      );
    }
  }
}
