import uuidv4 from 'uuid/v4'

class Plugin {
    constructor(name, type) {
        this.id       = uuidv4();
        this.name     = name;
        this.content  = null;
        this.childs   = [{}, {}];
        this.type     = type;
    }

    //refactor
    static get_plugin(plugins, id) {
        let i,j;

        plugins.forEach((plugin, i_index) => {
            plugin.childs.forEach((child, j_index) => {
                if(child.id === id) {
                    j = j_index;
                    i = i_index;
                }
            });

            if(plugin.id === id) i = i_index;
        });

        return {
            parent: i,
            child : j,
        };
    }
}

export default Plugin;