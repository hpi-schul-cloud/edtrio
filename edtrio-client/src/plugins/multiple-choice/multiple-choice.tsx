import { List } from "immutable";
import React, { Fragment, PureComponent } from "react";
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
  background-color: ${props => props.theme.colors.hpiBlue};
  border-color: ${props => props.theme.colors.hpiBlue};
  padding: 5px;
  padding-left: 17px;
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  color: ${props => props.theme.colors.white};
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
  background-color: ${props => props.theme.colors.hpiBlueLight};
  border-radius: 0.25rem;

  padding-left: 8px;
  padding-top: 4px;
`;

const StyledButton = styled.button`
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
  border: 1px solid ${props => props.theme.colors.hpiYellow};
  padding: 4px 20px;
  font-size: 1rem;
  border-radius: 0.25rem;
  flex: 0;
  margin-top: 6px;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.hpiYellow};
  margin-right: 12px;
  margin-bottom: 12px;
`;

const StyledButtonAlignment = styled.span`
  display: flex;
  margin-left: 18px;
`;

export class MultipleChoiceNode extends PureComponent<
  IMultipleChoiceNodeProps
> {
  public render() {
    const { node, attributes, children, editor, readOnly } = this.props;

    let infoBannerText;
    if (readOnly) {
      infoBannerText =
        "Bitte wähle die korrekten Antworten aus - sie werden automatisch gespeichert.";
    } else {
      infoBannerText =
        "Bitte markiere die richtigen Antworten durch eine Auswahl. Dies wird für die automatische Auswertung benötigt.";
    }

    return (
      <div {...attributes}>
        <StyledInfoBanner contentEditable={false}>
          <StyledFontAwesomeIcon icon={faInfo} size="sm" />
          <StyledInfoBannerText>
            <Fragment>
              <StyledInfoBannerHeading>Multiple Choice</StyledInfoBannerHeading>
              {infoBannerText}
            </Fragment>
          </StyledInfoBannerText>
        </StyledInfoBanner>

        <StyledBackground>
          <StyledOrderBox>{children}</StyledOrderBox>

          {!readOnly && (
            <StyledButtonAlignment contentEditable={false}>
              <StyledButton
                onMouseDown={event => {
                  this.addAnswer(event, editor, node, children.length);
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

  private addAnswer(event: any, editor: Editor, node: Node, index: number) {
    editor.insertNodeByPath(
      editor.value.document.getPath(node.key),
      index,
      Block.create({
        type: "multiple-choice-answer",
        nodes: List([Text.create({})]),
      }),
    );
  }
}
