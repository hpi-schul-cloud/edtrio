import axios from "axios";

import allowedVerbs from "./allowedVerbs"; // Copied from https://github.com/adlnet-archive/xAPIVerbs/blob/master/verbs.js


class LRSConnector {
    static hello() {
        this.saveProgress();
    }

    static saveProgress() {
        axios.post('https://bp.schul-cloud.org:3031/lrs', 
            {
                "actorId": "45236905-a4bc-46f9-b11b-3b354fdebea9",
                "objectId": "https://bp.schul-cloud.org/courses/5a79c9fa3c50db0010e0fcd4/topics/5b0d6fd1ad6a0800100c6c19/",
                "objectName": "Winkel",
                "courseId": "https://bp.schul-cloud.org/courses/5a79c9fa3c50db0010e0fcd4",
                "lessonId": "https://bp.schul-cloud.org/courses/5a79c9fa3c50db0010e0fcd4/topics/5b0d6fd1ad6a0800100c6c19/",
                "verb": "completed"
            },
            {
                headers: {
                    'Authorization': 'XXX TOKEN HERE XXX'
                },
            }
        ).then((response) => {
            console.log('Okay.');
            console.log(response);
        }).catch((error) => {
            console.log('Not okay.');
            console.log(error);
        });
    }
}

export default LRSConnector;
