import {
    mandatory,
} from './../utils';

class Plugin {
    constructor({ id = mandatory('id'), name = mandatory('name'), type = madatory('type') }, { size } = { size : 0 }) {
        this.id       = id;
        this.name     = name;
        this.content  = null;
        this.childs   = new Array(size);
        this.parent   = null;
        this.type     = type;
        this.slot     = id; //incrementing slot
    }

    static TYPES = {
        GRID   : Symbol('Grid'),
        CONTENT: Symbol('Content'),
        LAYOUT : Symbol('Layout'),
    }
}

export default Plugin;