import React, { Component } from 'react';

import styles from './styles.scss';

class StartMenu extends Component {

    render() {

        return (
            <section className={styles.menu}>
                <header>
                    <h1>NAME Editor</h1>
                </header>

                <div>
                    <h2 className={styles.sub_menu}>Zuletzt verwendet</h2>
                </div>
            </section>
        )
    }
}

export default StartMenu;