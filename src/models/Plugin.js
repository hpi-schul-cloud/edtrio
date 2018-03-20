import uuidv4 from 'uuid/v4';
import {
    mandatory,
} from "./../utils";

class Plugin {
    constructor({ id = mandatory("id"), name = mandatory("name"), type = madatory("type") }, { size } = { size : 0 }) {
        this.id       = id;
        this.name     = name;
        this.content  = null;
        this.childs   = new Array(size);
        this.parent   = null;
        this.type     = type;
        this.slot     = null;
    }
}

export default Plugin;