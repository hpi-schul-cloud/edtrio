import React, { PureComponent } from "react";
import styled from "styled-components";

import { apolloClient } from "../EditorWrapper/apolloClient";

import {
  userByOpenHpiEmail,
  userByOpenHpiEmailVariables,
} from "../graphqlOperations/generated-types/userByOpenHpiEmail";

import { USER_BY_OPENHPIEMAIL } from "../graphqlOperations/operations";
import { IUserType } from "../types";
interface IUserBarrierProps {
  children: any;
  updateCurrentUser: (newUser: IUserType) => void;
  currentUser: IUserType | null;
  updateUserList: (users: IUserType[]) => void;
}

// CodeOcean login start
// remember to remove oatuh-1.0a from package.json
import * as crypto from "crypto";
// tslint:disable-next-line
const OAuth = require("oauth-1.0a");
// CoceOcean login done

const StyledPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StyledPageContent = styled.div`
  text-align: center;
  display: block;
  flex-direction: column;
  justify-content: center;
  margin-top: 30%;
  padding: 0 20%;
`;

const StyledAgainButton = styled.button`
  display: inline-block;
  font-weight: 700;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  padding: 0.5rem 2rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  padding: 24px;
  flex: 0;
  margin-top: 16px;
  color: #fff;
  background-color: #b10438;
  border-color: #b10438;
`;

export class UserBarrier extends PureComponent<IUserBarrierProps> {
  public async getUser() {
    const { updateCurrentUser, updateUserList } = this.props;

    const emailInput = prompt(
      "Bitte nenne uns deine E-Mail-Adresse, die du beim Login auf open.hpi.de verwendest:",
      "",
    );
    if (emailInput != null && emailInput !== "") {
      // Wert vorhanden
      const userResponse = await apolloClient.query<
        userByOpenHpiEmail,
        userByOpenHpiEmailVariables
      >({
        query: USER_BY_OPENHPIEMAIL,
        variables: { openHpiEmail: emailInput },
      });
      if (userResponse.data.userByOpenHpiEmail) {
        updateCurrentUser({
          id: userResponse.data.userByOpenHpiEmail.id,
          name: userResponse.data.userByOpenHpiEmail.name,
          isTeacher: userResponse.data.userByOpenHpiEmail.isTeacher,
        });
        updateUserList([
          {
            id: userResponse.data.userByOpenHpiEmail.id,
            name: userResponse.data.userByOpenHpiEmail.name,
            isTeacher: userResponse.data.userByOpenHpiEmail.isTeacher,
          },
        ]);

        // CodeOcean login start
        // Now login to CodeOcean prior to redirecting ...

        // the consumer key and secret is exposed by intent and will be invalidated soon!
        const key = "0d8047781a214f55eb607d26d37d99ca";
        const secret = "4f04aff776c0ef97756d2a7941ff6280";
        const resource_link_id = "5bc48a31db4df00011083c83"; // existing course in SC
        const role = userResponse.data.userByOpenHpiEmail.isTeacher
          ? "Instructor"
          : "Learner";
        const name = userResponse.data.userByOpenHpiEmail.name;
        const id = userResponse.data.userByOpenHpiEmail.id;
        const email = emailInput;
        const payload = {
          lti_version: "LTI-1p0",
          lti_message_type: "basic-lti-launch-request",
          resource_link_id,
          roles: role,
          launch_presentation_document_target: "window",
          launch_presentation_locale: "de",
          lis_person_name_full: name,
          lis_person_contact_email_primary: email,
          user_id: id,
          custom_locale: "de",
          custom_token: "2744195b",
          custom_embed_options_hide_navbar: true,
        };

        const consumer = OAuth({
          consumer: { key, secret },
          signature_method: "HMAC-SHA1",
          hash_function(base_string: any, input_key: any) {
            return crypto
              .createHmac("sha1", input_key)
              .update(base_string)
              .digest("base64");
          },
        });

        const request_data = {
          url: "https://codeocean.openhpi.de/lti/launch",
          method: "POST",
          data: payload,
        };

        const formData = consumer.authorize(request_data);

        const serialize = (obj: any) => {
          const str = [];
          for (const p in obj) {
            if (obj.hasOwnProperty(p)) {
              str.push(
                encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]),
              );
            }
          }
          return str.join("&");
        };

        const http = new XMLHttpRequest();

        http.withCredentials = true; // pass along cookies

        const url = "https://codeocean.openhpi.de/lti/launch";
        const params = serialize(formData);
        http.open("POST", url, false);
        http.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded",
        );
        http.send(params);

        // if successful, CoceOcean will login the user and set a cookie. This is required in the next step.
        // CodeOcean login done
      }
    }
  }

  public render() {
    const { currentUser } = this.props;
    if (currentUser) {
      return this.props.children;
    } else {
      return (
        <StyledPageWrapper>
          <StyledPageContent>
            Hallo!
            <br />
            Um deinen Fortschritt speichern zu können, brauchen wir deine
            E-Mail-Adresse, mit der du dich bei{" "}
            <a href="https://open.hpi.de" target="_blank">
              openHPI
            </a>{" "}
            registriert hast. Bitte gib sie hier im Folgenden ein.
            <div>
              <StyledAgainButton onClick={() => this.getUser()}>
                E-Mail-Adresse eingeben
              </StyledAgainButton>
            </div>
          </StyledPageContent>
        </StyledPageWrapper>
      );
    }
  }
}
