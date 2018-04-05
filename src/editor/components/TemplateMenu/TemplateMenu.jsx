import React, { Component } from 'react';

import TemplatePreview from './../TemplatePreview/TemplatePreview';

import styles from './styles.scss'

import blank_img from 'x-editor/images/blank.png';;

const templates = [
    {
        title: 'Leeres Blatt',
        image: blank_img
    }
];

export default class TemplateMenu extends Component {
    render() {

        return (
            <section className={styles.menu}>
                {templates.map(tpl => {
                    return <TemplatePreview {...tpl} key={tpl.title}/>;
                })}
            </section>
        );
    }
}
