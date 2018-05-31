import axios from "axios";

import allowedVerbs from "./allowedVerbs"; // Copied from https://github.com/adlnet-archive/xAPIVerbs/blob/master/verbs.js


class LRSConnector {
    static hello() {
        this.saveProgress();
    }

    static saveProgress(verb) {
        if(this._validateVerb(verb)) {
            this._makeRequest(verb);
        }
    }

    static _makeRequest(verb) {
        axios.post('https://bp.schul-cloud.org:3031/lrs', {
            actorId: "45236905-a4bc-46f9-b11b-3b354fdebea9",
            objectId: "https://bp.schul-cloud.org/courses/5a79c9fa3c50db0010e0fcd4/topics/5b0d6fd1ad6a0800100c6c19/",
            objectName: "Winkel",
            courseId: "https://bp.schul-cloud.org/courses/5a79c9fa3c50db0010e0fcd4",
            lessonId: "https://bp.schul-cloud.org/courses/5a79c9fa3c50db0010e0fcd4/topics/5b0d6fd1ad6a0800100c6c19/",
            verb
        }, {
            headers: {
                'Authorization': 'XXX TOKEN HERE XXX'
            },
        }).then((response) => {
            console.log('Statement stored in LRS.');
            console.log(response);
        }).catch((error) => {
            console.error('Error while saving statement in LRS.');
            console.error(error);
        });
    }

    /**
     * Checks if a given verb is valid
     * @param {string} verb 
     */
    static _validateVerb(verb) {
        if(allowedVerbs.indexOf(verb) > -1) {
            return true;
        }
        console.error(`The verb ${verb} is not allowed. Please refer to https://github.com/adlnet-archive/xAPIVerbs/blob/master/verbs.js for a full list of allowed verbs.`)
        return false;
    }
}

export default LRSConnector;
