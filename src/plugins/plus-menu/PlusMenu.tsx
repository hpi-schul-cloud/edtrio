import React, { PureComponent } from "react";
import { Editor, Node } from "slate";
import { findDOMNode } from "slate-react";
import styled from "styled-components";

import Uppy from "@uppy/core";
// @ts-ignore
import { DashboardModal } from "@uppy/react";

import {
  faCode,
  faExternalLinkSquareAlt,
  faImage,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  onClickCodeButton,
  onClickIframeButton,
  onClickImageButton,
  onClickSortingTaskButton,
} from "./actions";

interface IPlusMenuProps {
  className?: string;
  editor: Editor;
  startBlock: Node;
}
interface IPlusMenuState {
  uppyOpen: boolean;
}

const StyledPlusMenu = styled.div`
  padding: 0 10px 15px 15px;
  position: absolute;
  top: -10000px;
  opacity: 1;
  border-radius: 4px;
  z-index: 1000;

  &:hover .icon * {
    color: hsl(0, 0%, 48%);
  }

  .icon:hover * {
    color: hsl(0, 0%, 4%);
  }
`;

class PlusMenu extends PureComponent<IPlusMenuProps, IPlusMenuState> {
  private uppy: any = null;

  constructor(props: IPlusMenuProps) {
    super(props);

    this.state = {
      uppyOpen: false,
    };

    this.uppy = Uppy({
      restrictions: {
        maxFileSize: 1000000, // 1MB
        allowedFileTypes: ["image/*"],
        maxNumberOfFiles: 100,
        minNumberOfFiles: 1,
      },
      autoProceed: true,
    });
  }

  public handleCloseUppyModal = () => {
    this.setState({ uppyOpen: false });
  };

  public render() {
    const { className, startBlock } = this.props;
    /*
    resetMenu:
          value.selection.isBlurred ||
          !value.blocks.some((node: any) => node.type === "p"),
    */
    let style = {};

    try {
      const nodeEl = findDOMNode(startBlock);
      const nodeElBBox = nodeEl.getBoundingClientRect();
      const top = nodeElBBox.top + window.pageYOffset;
      const right = window.innerWidth - (nodeElBBox.width + nodeElBBox.left);

      style = {
        top: `${top}px`,
        right: `${right}px`,
      };
    } catch (error) {
      // this can happen when a new block is created that does not yet have a representation in the dom
    }
    return (
      <StyledPlusMenu className={className} style={style}>
        {this.renderBlockButton(faImage, "Bild einfügen", (event: any) => {
          this.setState({ uppyOpen: true });
          onClickImageButton(
            event,
            this.uppy,
            this.handleCloseUppyModal,
            this.props.editor,
          );
        })}
        {this.renderBlockButton(
          faCode,
          "Code Block einfügen",
          onClickCodeButton,
        )}
        {this.renderBlockButton(
          faExternalLinkSquareAlt,
          "Iframe einfügen",
          onClickIframeButton,
        )}
        {this.renderBlockButton(
          faSort,
          "Sortieraufgabe einfügen",
          onClickSortingTaskButton,
        )}
        <DashboardModal
          uppy={this.uppy}
          locale={{
            strings: {
              addMoreFiles: "Weitere Dateien hinzufügen",
              closeModal: "Fenster schließen",
              importFrom: "Von %{name} importieren",
              dashboardWindowTitle:
                "Uppy Dashboard Fenster (ESC zum schließen)",
              dashboardTitle: "Uppy Dashboard",
              copyLinkToClipboardSuccess: "Link in Zwischenablage kopiert.",
              copyLinkToClipboardFallback: "Kopiere den Link unten",
              copyLink: "Link kopieren",
              fileSource: "Quelle: %{name}",
              done: "Fertig",
              removeFile: "Datei entfernen",
              editFile: "Datei bearbeiten",
              editing: "%{file} wird bearbeitet",
              edit: "Bearbeiten",
              finishEditingFile: "Bearbeiten abschließen",
              myDevice: "Mein Gerät",
              dropPasteImport:
                "Ziehe Dateien hierhin, füge sie ein, %{browse} oder importiere sie von",
              dropPaste: "%{browse} deine Bilder oder lege sie hier ab",
              browse: "Durchsuche",
              uploadComplete: "Hochladen fertig",
              xFilesSelected: {
                0: "%{smart_count} Datei ausgewählt",
                1: "%{smart_count} Dateien ausgewählt",
              },

              // @uppy/status-bar strings:
              uploading: "Lädt hoch",
              complete: "Fertig",
              uploadFailed: "Hochladen fehlgeschlagen",
              pleasePressRetry:
                "Bitte klicke Erneut versuchen um es noch einmal zu versuchen",
              paused: "Pausiert",
              error: "Fehler",
              retry: "Erneut versuchen",
              cancel: "Abbrechen",
              retryUpload: "Hochladen erneut versuchen",
              pauseUpload: "Hochladen pausieren",
              resumeUpload: "Hochladen fortsetzen",
              cancelUpload: "Hochladen abbrechen",
              filesUploadedOfTotal: {
                0: "%{complete} von %{smart_count} Datei hochgeladen",
                1: "%{complete} von %{smart_count} Dateien hochgeladen",
              },
              dataUploadedOfTotal: "%{complete} von %{total}",
              xTimeLeft: "%{time} verbleibend",
              uploadXFiles: {
                0: "%{smart_count} Datei hochladen",
                1: "%{smart_count} Dateien hochladen",
              },
              uploadXNewFiles: {
                0: "+%{smart_count} Datei hochladen",
                1: "+%{smart_count} Dateien hochladen",
              },
            },
          }}
          closeModalOnClickOutside={true}
          note="Bilder, maximal 1 MB"
          open={this.state.uppyOpen}
          onRequestClose={this.handleCloseUppyModal}
          disableThumbnailGenerator={true}
        />
      </StyledPlusMenu>
    );
  }

  public renderBlockButton = (
    icon: any,
    tooltip: string = "",
    onClickBlock: (event: any, editor: Editor) => void,
  ) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      title={tooltip}
      onMouseDown={event => onClickBlock(event, this.props.editor)}
    >
      <span
        className="icon is-medium has-text-grey-lighter tooltip"
        data-tooltip={tooltip}
      >
        <FontAwesomeIcon icon={icon} size="lg" />
      </span>
    </a>
  );
}

export default PlusMenu;
