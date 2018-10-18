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
      restrictions: {
        maxFileSize: 1000000, // 1MB
        allowedFileTypes: ['image/*']
      },
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
          onClickImageButton(...props, this.uppy, this.handleCloseUppyModal)
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
              addMoreFiles: 'Weitere Dateien hinzufügen',
              closeModal: 'Fenster schließen',
              importFrom: 'Von %{name} importieren',
              dashboardWindowTitle:
                'Uppy Dashboard Fenster (ESC zum schließen)',
              dashboardTitle: 'Uppy Dashboard',
              copyLinkToClipboardSuccess: 'Link in Zwischenablage kopiert.',
              copyLinkToClipboardFallback: 'Kopiere den Link unten',
              copyLink: 'Link kopieren',
              fileSource: 'Quelle: %{name}',
              done: 'Fertig',
              removeFile: 'Datei entfernen',
              editFile: 'Datei bearbeiten',
              editing: '%{file} wird bearbeitet',
              edit: 'Bearbeiten',
              finishEditingFile: 'Bearbeiten abschließen',
              myDevice: 'Mein Gerät',
              dropPasteImport:
                'Ziehe Dateien hierhin, füge sie ein, %{browse} oder importiere sie von',
              dropPaste: '%{browse} deine Bilder oder lege sie hier ab',
              browse: 'Durchsuche',
              uploadComplete: 'Hochladen fertig',
              resumeUpload: 'Hochladen fortsetzen',
              pauseUpload: 'Hochladen pausieren',
              retryUpload: 'Hochladen erneut versuchen',
              xFilesSelected: {
                0: '%{smart_count} Datei ausgewählt',
                1: '%{smart_count} Dateien ausgewählt'
              },

              // @uppy/status-bar strings:
              uploading: 'Lädt hoch',
              complete: 'Fertig',
              uploadFailed: 'Hochladen fehlgeschlagen',
              pleasePressRetry:
                'Bitte klicke Erneut versuchen um es noch einmal zu versuchen',
              paused: 'Pausiert',
              error: 'Fehler',
              retry: 'Erneut versuchen',
              cancel: 'Abbrechen',
              retryUpload: 'Hochladen erneut versuchen',
              pauseUpload: 'Hochladen pausieren',
              resumeUpload: 'Hochladen fortsetzen',
              cancelUpload: 'Hochladen abbrechen',
              filesUploadedOfTotal: {
                0: '%{complete} von %{smart_count} Datei hochgeladen',
                1: '%{complete} von %{smart_count} Dateien hochgeladen'
              },
              dataUploadedOfTotal: '%{complete} von %{total}',
              xTimeLeft: '%{time} verbleibend',
              uploadXFiles: {
                0: '%{smart_count} Datei hochladen',
                1: '%{smart_count} Dateien hochladen'
              },
              uploadXNewFiles: {
                0: '+%{smart_count} Datei hochladen',
                1: '+%{smart_count} Dateien hochladen'
              }
            }
          }}
          closeModalOnClickOutside
          note="Bilder, maximal 1 MB"
          open={this.state.uppyOpen}
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
