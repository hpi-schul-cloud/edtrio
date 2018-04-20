import { mandatory } from "./../utils";

class Plugin {
    constructor(
        {
            id = mandatory("id"),
            name = mandatory("name"),
            type = madatory("type")
        },
        //options
        { size, allowChildRearrangement } = {
            size: 0,
            allowChildRearrangement: true
        }
    ) {
        this.id = id;
        this.name = name;
        this.content = null;
        this.childs = new Array(size);
        this.parent = null;
        this.type = type;
        this.slot = id; //incrementing slot
        this.options = {
            allowChildRearrangement
        };
    }

    static TYPES = {
        CONTENT: Symbol("Content"),
        LAYOUT: Symbol("Layout")
    };
}

export default Plugin;
