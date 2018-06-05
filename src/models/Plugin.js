import { mandatory } from "./../utils";

class Plugin {
    constructor(
        {
            id = mandatory("id"),
            name = mandatory("name"),
            type = mandatory("type")
        },
        //options
        { size, allowChildRearrangement, initialState } = {
            size: 0,
            allowChildRearrangement: true,
            initialState: {}
        }
    ) {
        this.id = id;
        this.name = name;
        this.content = null;
        this.childs = new Array(size);
        this.parent = null;
        this.type = type;
        this.slot = id; //incrementing slot

        this.visible = true;

        this.options = {
            allowChildRearrangement,
            initialState
        };
    }

    static TYPES = {
        CONTENT: Symbol("Content"),
        LAYOUT: Symbol("Layout"),
        INPUT: Symbol("Input")
    };
}

export default Plugin;
