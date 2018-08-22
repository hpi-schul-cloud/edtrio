import React from 'react'

import PlusMenu from './PlusMenu'


export default function PlusMenuPlugin(options) {
    return {
        changes: {},
        helpers: {},
        components: {
            PlusMenu,
        },
        plugins: [],
    }
}

/**
 * TODO:
 * - complete plusmenu (pbbly with positional rendering as well - see HoverMenu)
 * - add file to plusmenu:
 *      - select file from popup
 */
