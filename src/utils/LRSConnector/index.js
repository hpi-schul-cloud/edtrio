import axios from "axios";

import allowedVerbs from "./allowedVerbs"; // Copied from https://github.com/adlnet-archive/xAPIVerbs/blob/master/verbs.js


class LRSConnector {
    static saveProgressCompleted(props) {
        this.saveProgress({verb: 'completed', ...props})
    }

    static saveProgressFailed(props) {
        this.saveProgress({verb: 'failed', ...props})
    }

    static saveProgress({
            actorId,
            objectId,
            objectName,
            courseId,
            parentId,
            verb
        }) {
        if(this._validateVerb(verb)) {
            this._makeRequest({verb, actorId, objectId, objectName, courseId, parentId});
        }
    }

    static _makeRequest({actorId, objectId, objectName, courseId, verb, parentId}) {
        axios.post('https://bp.schul-cloud.org:3031/lrs', {
            actorId,
            objectId,
            objectName,
            courseId,
            verb,
            parentId
        }, {
            headers: {
                'Authorization': 'XXX TOKEN HERE XXX',
                'Content-Type': 'application/json'
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
