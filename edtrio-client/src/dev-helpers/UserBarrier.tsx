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

    const emailInput =
      this.getQueryVariable("email") ||
      prompt(
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
        // CodeOcean login start
        // Now login to CodeOcean prior to redirecting ...

        // the consumer key and secret is exposed by intent and will be invalidated soon!
        // const key = "0d8047781a214f55eb607d26d37d99ca";
        // const secret = "4f04aff776c0ef97756d2a7941ff6280";
        // const resource_link_id = "5bc48a31db4df00011083c83"; // existing course in SC
        // const role = userResponse.data.userByOpenHpiEmail.isTeacher
        //   ? "Instructor"
        //   : "Learner";
        // const name = userResponse.data.userByOpenHpiEmail.name;
        // const id = userResponse.data.userByOpenHpiEmail.id;
        // const email = emailInput;
        // const payload = {
        //   lti_version: "LTI-1p0",
        //   lti_message_type: "basic-lti-launch-request",
        //   resource_link_id,
        //   roles: role,
        //   launch_presentation_document_target: "window",
        //   launch_presentation_locale: "de",
        //   lis_person_name_full: name,
        //   lis_person_contact_email_primary: email,
        //   user_id: id,
        //   custom_locale: "de",
        //   custom_token: "2744195b",
        //   custom_embed_options_hide_navbar: true,
        // };

        // const consumer = OAuth({
        //   consumer: { key, secret },
        //   signature_method: "HMAC-SHA1",
        //   hash_function(base_string: any, input_key: any) {
        //     return crypto
        //       .createHmac("sha1", input_key)
        //       .update(base_string)
        //       .digest("base64");
        //   },
        // });

        // const request_data = {
        //   url: "https://codeocean.openhpi.de/lti/launch",
        //   method: "POST",
        //   data: payload,
        // };

        // const formData = consumer.authorize(request_data);

        // const resp = await fetch("https://codeocean.openhpi.de/lti/launch", {
        //   mode: "cors",
        //   credentials: "include",
        //   method: "POST",
        //   body: formData,
        //   redirect: "follow",
        // });

        // Use it :)
        // tslint:disable-next-line
        //console.log(resp);

        // const serialize = (obj: any) => {
        //   const str = [];
        //   for (const p in obj) {
        //     if (obj.hasOwnProperty(p)) {
        //       str.push(
        //         encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]),
        //       );
        //     }
        //   }
        //   return str.join("&");
        // };

        // const http = new XMLHttpRequest();

        // http.withCredentials = true; // pass along cookies

        // const url = "https://codeocean.openhpi.de/lti/launch";
        // const params = serialize(formData);
        // http.open("POST", url, false);
        // http.setRequestHeader(
        //   "Content-Type",
        //   "application/x-www-form-urlencoded",
        // );
        // try {
        //   http.send(params);
        // } catch (error) {
        //   // tslint:disable-next-line
        //   console.log("XHTTP", error);
        // }

        // if successful, CoceOcean will login the user and set a cookie. This is required in the next step.
        // CodeOcean login done

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
      }
    }
  }

  public componentDidMount() {
    const { currentUser } = this.props;
    if (this.getQueryVariable("login") === "true" && !currentUser) {
      // @ts-ignore:
      document.getElementById("launch_form").submit();
    }

    if (this.getQueryVariable("email")) {
      this.getUser();
    }
  }

  public render() {
    const { currentUser } = this.props;

    if (this.getQueryVariable("login") === "true" && !currentUser) {
      return this.redirectToCodeOcean();
    }

    if (this.getQueryVariable("skipPrompt") === "true" && !currentUser) {
      this.signInAsStudent();
    }
    // continue as normal
    if (currentUser) {
      return this.props.children;
    } else {
      return (
        <StyledPageWrapper>
          <StyledPageContent>
            Hallo!
            <br />
            Um deinen Fortschritt auch in diesem Blatt speichern zu können,
            brauchen wir deine E-Mail-Adresse erneut, mit der du dich bei{" "}
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

  // the hacky way
  private getQueryVariable = (variable: string) => {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (const value of vars) {
      const pair = value.split("=");
      if (decodeURIComponent(pair[0]) === variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    return "";
  };

  private signInAsStudent = () => {
    const { updateCurrentUser, updateUserList } = this.props;

    updateCurrentUser({
      id: "cjqme9meo010e07400rxnzor6",
      name: "Student",
      isTeacher: false,
    });
    updateUserList([
      {
        id: "cjqme9meo010e07400rxnzor6",
        name: "Student",
        isTeacher: false,
      },
    ]);
  };

  private async redirectToCodeOcean() {
    let emailInput = prompt(
      "Bitte nenne uns deine E-Mail-Adresse, die du beim Login auf open.hpi.de verwendest:",
      "",
    );

    if (emailInput == null || emailInput === "") {
      emailInput = "student@example.com";
    }

    let userName = "Student";
    let userId = "cjqme9meo010e07400rxnzor6";

    const userResponse = await apolloClient.query<
      userByOpenHpiEmail,
      userByOpenHpiEmailVariables
    >({
      query: USER_BY_OPENHPIEMAIL,
      variables: { openHpiEmail: emailInput },
    });
    if (userResponse.data.userByOpenHpiEmail) {
      userName = "" + userResponse.data.userByOpenHpiEmail.name;
      userId = "" + userResponse.data.userByOpenHpiEmail.id;
    }

    let recognize = "";
    // if (userId !== "cjqme9meo010e07400rxnzor6") {
    //  recognize = "&token=" + userId;
    // } else {
    recognize = "&email=" + emailInput;
    // }

    // the consumer key and secret is exposed by intent and will be invalidated soon!
    const key = "0d8047781a214f55eb607d26d37d99ca";
    const secret = "4f04aff776c0ef97756d2a7941ff6280";
    const resource_link_id = "5bc48a31db4df00011083c83"; // existing course in SC
    const role = "Learner";
    const name = userName;
    const id = userId;
    const email = emailInput || "anonym@example.org";
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
      redirect_target:
        window.location.protocol +
        "//" +
        window.location.host +
        "/" +
        window.location.pathname +
        "?skipPrompt=" +
        this.getQueryVariable("skipPrompt") +
        "&documentId=" +
        this.getQueryVariable("documentId") +
        recognize,
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

    return (
      <React.Fragment>
        <StyledPageWrapper>
          <StyledPageContent>
            <h1>Bitte warten</h1>
            <form
              id="launch_form"
              action="https://codeocean.openhpi.de/lti/launch"
              encType="application/x-www-form-urlencoded"
              method="POST"
              target="_self"
            >
              <input
                type="hidden"
                name="lti_version"
                value={formData.lti_version}
              />
              <input
                type="hidden"
                name="lti_message_type"
                value={formData.lti_message_type}
              />
              <input
                type="hidden"
                name="resource_link_id"
                value={formData.resource_link_id}
              />
              <input type="hidden" name="roles" value={formData.roles} />
              <input
                type="hidden"
                name="launch_presentation_document_target"
                value={formData.launch_presentation_document_target}
              />
              <input
                type="hidden"
                name="launch_presentation_locale"
                value={formData.launch_presentation_locale}
              />
              <input
                type="hidden"
                name="lis_person_name_full"
                value={formData.lis_person_name_full}
              />
              <input
                type="hidden"
                name="lis_person_contact_email_primary"
                value={formData.lis_person_contact_email_primary}
              />
              <input type="hidden" name="user_id" value={formData.user_id} />
              <input
                type="hidden"
                name="custom_token"
                value={formData.custom_token}
              />
              <input
                type="hidden"
                name="custom_embed_options_hide_navbar"
                value={formData.custom_embed_options_hide_navbar}
              />
              <input
                type="hidden"
                name="custom_locale"
                value={formData.custom_locale}
              />
              <input
                type="hidden"
                name="oauth_consumer_key"
                value={formData.oauth_consumer_key}
              />
              <input
                type="hidden"
                name="oauth_nonce"
                value={formData.oauth_nonce}
              />
              <input
                type="hidden"
                name="oauth_signature"
                value={formData.oauth_signature}
              />
              <input
                type="hidden"
                name="oauth_signature_method"
                value={formData.oauth_signature_method}
              />
              <input
                type="hidden"
                name="oauth_timestamp"
                value={formData.oauth_timestamp}
              />
              <input
                type="hidden"
                name="oauth_version"
                value={formData.oauth_version}
              />
              <input
                type="hidden"
                name="redirect_target"
                value={formData.redirect_target}
              />
            </form>
          </StyledPageContent>
        </StyledPageWrapper>
      </React.Fragment>
    );

    // h2 = @item.title
    // p = t(:"items.lti.wait_message_#{@lti_provider.presentation_mode}")
    // - form_target = {'pop-up' => '_blank', 'window' => '_self'}[@lti_provider.presentation_mode]
    // form#launch_form action=@tool_consumer.launch_url encType='application/x-www-form-urlencoded' method='POST' target=form_target
    //   - @launch_data.each_pair do |key, value|
    //     input type='hidden' name=key value=value

    // css:
    //   body {
    //     text-align: center;
    //     font-family: sans-serif;
    //     color: darkgrey;
    //   }

    // javascript:
    //   document.getElementById('launch_form').submit();
  }
}
