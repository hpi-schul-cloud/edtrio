import React, { Component } from 'react';

import StartMenu from './../../components/StartMenu/StartMenu';
import TemplateMenu from './../../components/TemplateMenu/TemplateMenu';

import styles from './styles.scss';

export default class Start extends Component {

    render() {

        return (
            <section className={styles.start_screen}>
                <div className={styles.side_menu}>
                    <StartMenu />
                </div>
                <div className={styles.template_menu}>
                    <TemplateMenu />
                </div>
            </section>
        );
    }
}