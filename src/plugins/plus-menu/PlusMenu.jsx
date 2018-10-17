import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { findDOMNode } from 'slate-react'
import './style.css'

import Uppy from '@uppy/core'
import { DashboardModal } from '@uppy/react'

import {
  onClickImageButton,
  onClickCodeButton,
  onClickIframeButton
} from './actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faImage,
  faCode,
  faExternalLinkSquareAlt
} from '@fortawesome/free-solid-svg-icons'

class PlusMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      style: {},
      uppyOpen: false
    }

    this.uppy = Uppy({
      restrictions: { allowedFileTypes: ['image/*'] },
      autoProceed: true
    })
  }

  handleCloseUppyModal = () => {
    this.setState({ uppyOpen: false })
  }

  render() {
    const { className } = this.props
    const root = window.document.getElementById('root')

    return ReactDOM.createPortal(
      <div
        className={`plus-menu ${className}`}
        style={this.state.style}
        ref={wrapper => (this.menuWrapper = wrapper)}
      >
        {this.renderBlockButton(faImage, 'Bild einfügen', (...props) => {
          this.setState({ uppyOpen: true })
          onClickImageButton(...props, this.uppy)
        })}
        {this.renderBlockButton(
          faCode,
          'Code Block einfügen',
          onClickCodeButton
        )}
        {this.renderBlockButton(
          faExternalLinkSquareAlt,
          'Iframe einfügen',
          onClickIframeButton
        )}
        <DashboardModal
          uppy={this.uppy}
          locale={{
            strings: {
              // When `inline: false`, used as the screen reader label for the button that closes the modal.
              closeModal: 'Fenster schließen',
              // Used as the header for import panels, e.g., "Import from Google Drive".
              importFrom: 'Von %{name} importieren',
              // When `inline: false`, used as the screen reader label for the dashboard modal.
              dashboardWindowTitle: 'Uppy Dashboard Window (ESC zum schließen)',
              // When `inline: true`, used as the screen reader label for the dashboard area.
              dashboardTitle: 'Uppy Dashboard',
              // Shown in the Informer when a link to a file was copied to the clipboard.
              copyLinkToClipboardSuccess: 'Link in Zwischenablage kopiert.',
              // Used when a link cannot be copied automatically — the user has to select the text from the
              // input element below this string.
              copyLinkToClipboardFallback: 'Kopiere den Link unten',
              // Used as the hover title and screen reader label for buttons that copy a file link.
              copyLink: 'Link kopieren',
              // Used as the hover title and screen reader label for file source icons, e.g., "File source: Dropbox".
              fileSource: 'Quelle: %{name}',
              // Used as the label for buttons that accept and close panels (remote providers or metadata editor)
              done: 'Fertig',
              // Used as the screen reader label for buttons that remove a file.
              removeFile: 'Datei entfernen',
              // Used as the screen reader label for buttons that open the metadata editor panel for a file.
              editFile: 'Datei bearbeiten',
              // Shown in the panel header for the metadata editor. Rendered as "Editing image.png".
              editing: '%{file} wird bearbeitet',
              // Text for a button shown on the file preview, used to edit file metadata
              edit: 'Bearbeiten',
              // Used as the screen reader label for the button that saves metadata edits and returns to the
              // file list view.
              finishEditingFile: 'Bearbeiten abschließen',
              // Used as the label for the tab button that opens the system file selection dialog.
              myDevice: 'Mein Gerät',
              // Shown in the main dashboard area when no files have been selected, and one or more
              // remote provider plugins are in use. %{browse} is replaced with a link that opens the system
              // file selection dialog.
              dropPasteImport:
                'Ziehe Dateien hierhin, füge sie ein, %{browse} oder importiere sie aus',
              // Shown in the main dashboard area when no files have been selected, and no provider
              // plugins are in use. %{browse} is replaced with a link that opens the system
              // file selection dialog.
              dropPaste: 'Ziehe Dateien hierhin, füge sie ein oder %{browse}',
              // This string is clickable and opens the system file selection dialog.
              browse: 'durchsuche',
              // Used as the hover text and screen reader label for file progress indicators when
              // they have been fully uploaded.
              uploadComplete: 'Hochladen fertig',
              // Used as the hover text and screen reader label for the buttons to resume paused uploads.
              resumeUpload: 'Hochladen fortsetzen',
              // Used as the hover text and screen reader label for the buttons to pause uploads.
              pauseUpload: 'Hochladen pausieren',
              // Used as the hover text and screen reader label for the buttons to retry failed uploads.
              retryUpload: 'Hochladen erneut versuchen',

              // Used in a title, how many files are currently selected
              xFilesSelected: {
                0: '%{smart_count} Datei ausgewählt',
                1: '%{smart_count} Dateien ausgewählt'
              },

              // @uppy/status-bar strings:
              uploading: 'Uploading',
              complete: 'Complete'
              // ...etc
            }
          }}
          closeModalOnClickOutside
          note="Bilder, maximal 1 MB"
          open={true || this.state.uppyOpen}
          onRequestClose={this.handleCloseUppyModal}
        />
      </div>,
      root
    )
  }

  renderBlockButton = (icon, tooltip = null, onClickBlock) => (
    <a
      title={tooltip}
      onMouseDown={event =>
        onClickBlock(event, this.props.value.change(), this.props.onChange)
      }
    >
      <span
        className="icon is-medium has-text-grey-lighter tooltip"
        data-tooltip={tooltip}
      >
        <FontAwesomeIcon icon={icon} size="lg" />
      </span>
    </a>
  )

  /**
   * Update the menu's absolute position
   */
  update = ({ resetMenu = false }) => {
    if (!this.menuWrapper) {
      return
    }

    if (resetMenu) {
      this.setState({
        style: {}
      })
      return
    }

    const nodeEl = findDOMNode(this.props.value.startBlock)
    const nodeElBBox = nodeEl.getBoundingClientRect()
    const top = nodeElBBox.top + window.pageYOffset

    const right = window.innerWidth - (nodeElBBox.width + nodeElBBox.x)

    this.setState({
      style: {
        top: `${top}px`,
        right: `${right}px`
      }
    })
  }
}

export default PlusMenu
