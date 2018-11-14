import { faQuestion, faRedo, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import moment from "moment";
import React, { Component } from "react";
import { Editor } from "slate";

const StyledButton = styled.span`
  padding: 0.25rem 0.5rem;
  margin-right: 0.25rem;
  cursor: pointer;
  color: inherit;

  &:hover {
    background-color: #eee;
  }
`;

const StyledLink = styled.a`
  padding: 0.25rem 0.5rem;
  margin-right: 0.25rem;
  cursor: pointer;
  color: inherit;

  &:hover {
    background-color: #eee;
  }
`;

const StyledDiv = styled.div`
  margin-left: 0.5rem;
  user-select: none;
`;
interface ISaveBarProps {
  lastSaved: moment.Moment | null;
  editor: Editor;
}

interface ISaveBarState {
  interval: number;
}

class SaveBar extends Component<ISaveBarProps, ISaveBarState> {
  constructor(props: ISaveBarProps) {
    super(props);

    // just force a rerender every 10 seconds to update lastSaved display
    this.state = {
      interval: window.setInterval(() => this.setState({}), 10000),
    };
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  public handleUndo = (event: any) => {
    event.preventDefault();
    this.props.editor.undo();
  };

  public handleRedo = (event: any) => {
    event.preventDefault();
    this.props.editor.redo();
  };

  public render() {
    return (
      <nav className="level" contentEditable={false}>
        <div className="level-left">
          <div className="level-item">
            <StyledButton onMouseDown={this.handleUndo}>
              <FontAwesomeIcon icon={faUndo} />
            </StyledButton>
            <StyledButton onMouseDown={this.handleRedo}>
              <FontAwesomeIcon icon={faRedo} />
            </StyledButton>
            <StyledLink
              href="https://github.com/schul-cloud/edtrio/wiki/Edtr.io-Hilfe"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faQuestion} />
            </StyledLink>
            <StyledDiv>
              {this.props.lastSaved &&
                `${moment(this.props.lastSaved).fromNow()} aktualisiert`}
            </StyledDiv>
          </div>
        </div>
      </nav>
    );
  }
}

export default SaveBar;
