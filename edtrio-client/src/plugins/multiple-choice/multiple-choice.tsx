import { List } from "immutable";
import React, { PureComponent } from "react";
import { Block, Editor, Node, Text } from "slate";
import styled from "styled-components";

import { faInfo, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IMultipleChoiceNodeProps {
  node: Node;
  attributes: object;
  isFocused: boolean;
  children: any;
  editor: Editor;
  readOnly: boolean;
}

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  margin-right: 6px;
`;

const StyledInfoBanner = styled.div`
  background-color: #007a9e;
  border-color: #007a9e;
  padding: 5px;
  padding-left: 17px;
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  color: #fff;
`;

const StyledInfoBannerText = styled.div`
  margin-left: 17px;
  line-height: 22px;
`;

const StyledInfoBannerHeading = styled.p`
  font-weight: 700;
  margin-bottom: 0px !important;
`;

const StyledOrderBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledBackground = styled.div`
  background-color: #007a9e3f;
  border-radius: 0.25rem;

  padding-left: 8px;
  padding-top: 4px;
`;

const StyledButton = styled.button`
  right: 0;
  display: inline-block;
  font-weight: 500;
  line-height: 1;
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
  padding: 4px 20px;
  font-size: 1rem;
  border-radius: 0.25rem;
  flex: 0;
  margin-top: 6px;
  color: #fff;
  background-color: #f6a800;
  border-color: #f6a800;
  margin-right: 12px;
  margin-bottom: 12px;
`;

const StyledButtonAlignment = styled.span`
  display: flex;
  margin-left: 18px;
`;

function addAnswer(event: any, editor: Editor, node: Node, index: number) {
  editor.insertNodeByPath(
    editor.value.document.getPath(node.key),
    index,
    Block.create({
      type: "multiple-choice-answer",
      nodes: List([Text.create({})]),
    }),
  );
}

export class MultipleChoiceNode extends PureComponent<
  IMultipleChoiceNodeProps
> {
  public render() {
    const { node, attributes, children, editor, readOnly } = this.props;
    return (
      <div {...attributes}>
        {readOnly && (
          <StyledInfoBanner>
            <StyledFontAwesomeIcon icon={faInfo} size="sm" />
            <StyledInfoBannerText>
              <StyledInfoBannerHeading>Multiple Choice</StyledInfoBannerHeading>
              Bitte wähle die korrekten Antworten aus - sie werden automatisch
              gespeichert.
            </StyledInfoBannerText>
          </StyledInfoBanner>
        )}

        {!readOnly && (
          <StyledInfoBanner contentEditable={false}>
            <StyledFontAwesomeIcon icon={faInfo} size="sm" />
            <StyledInfoBannerText>
              <StyledInfoBannerHeading>Multiple Choice</StyledInfoBannerHeading>
              Bitte markiere die richtigen Antworten durch eine Auswahl. <br />
              Dies wird für die automatische Auswertung benötigt.
            </StyledInfoBannerText>
          </StyledInfoBanner>
        )}
        <StyledBackground>
          <StyledOrderBox>{children}</StyledOrderBox>

          {!readOnly && (
            <StyledButtonAlignment contentEditable={false}>
              <StyledButton
                onMouseDown={event => {
                  addAnswer(event, editor, node, children.length);
                }}
              >
                <StyledFontAwesomeIcon icon={faPlus} size="sm" />
                Antwort
              </StyledButton>
            </StyledButtonAlignment>
          )}
        </StyledBackground>
      </div>
    );
  }
}
