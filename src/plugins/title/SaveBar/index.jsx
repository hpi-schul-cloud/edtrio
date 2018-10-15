import React, { Component } from 'react'
import styles from './SaveBar.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUndo,
  faRedo,
  faQuestion,
  faSave
} from '@fortawesome/free-solid-svg-icons'

class SaveBar extends Component {
  handleUndo = event => {
    event.preventDefault()
    this.props.editor.change(change => change.undo())
  }

  handleRedo = event => {
    event.preventDefault()
    this.props.editor.change(change => change.redo())
  }

  render() {
    return (
      <nav className="level" contentEditable={false}>
        <div className="level-left">
          <div className="level-item">
            <span className={styles.button} onMouseDown={this.handleUndo}>
              <FontAwesomeIcon icon={faUndo} />
            </span>
            <span className={styles.button} onMouseDown={this.handleRedo}>
              <FontAwesomeIcon icon={faRedo} />
            </span>
            <a
              href="https://github.com/schul-cloud/edtrio/wiki/Edtr.io-Hilfe"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
            >
              <FontAwesomeIcon icon={faQuestion} />
            </a>
            <span className={styles.button}>
              <FontAwesomeIcon icon={faSave} />
            </span>
            <div className={styles.saveText}>jetzt aktualisiert</div>
          </div>
        </div>
      </nav>
    )
  }
}

export default SaveBar
