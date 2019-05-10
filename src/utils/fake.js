export const lessonFakeData = {
    _id: "TEST",
    title: "vhkodft",
    note: "",
    sections: [
        {
            _id: "5cd1528f7acaa04a5a7f9386",
            visible: true,
            note: "",
            parent: null,
            title: "",
            flag: "isTemplate",
            lesson: "5cd15282f1fe5772f05ef43c",
            owner: {
                _id: "5cd152827acaa04a5a7f9383",
                users: ["0000d231816abba584714c9e"],
                lesson: "5cd15282f1fe5772f05ef43c",
                owner: "0000d231816abba584714c9e",
                type: "group",
            },
            permissions: [],
            state: {
                plugin: "rows",
                state: [
                    {
                        plugin: "text",
                        state: {
                            object: "value",
                            document: {
                                object: "document",
                                data: {},
                                nodes: [
                                    {
                                        object: "block",
                                        type: "paragraph",
                                        data: {},
                                        nodes: [
                                            {
                                                object: "text",
                                                leaves: [
                                                    {
                                                        object: "leaf",
                                                        text:
                                                            "Hallo liebe Schul-Cloud Nutzer! Viel Spaß beim Ausprobieren des neuen Editors :)",
                                                        marks: [],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    },
                ],
            },
            type: "section",
        },
    ],
    type: "lesson",
    users: {
        _id: "5cd152827acaa04a5a7f9384",
        users: [],
        lesson: "5cd15282f1fe5772f05ef43c",
        owner: "0000d231816abba584714c9e",
        type: "group",
    },
    owner: {
        _id: "5cd152827acaa04a5a7f9383",
        users: [
            {
                userId: "0000d231816abba584714c9e",
                name: "Cord Carl",
                roles: ["teacher"],
            },
        ],
        lesson: "5cd15282f1fe5772f05ef43c",
        owner: "0000d231816abba584714c9e",
        type: "group",
    },
}
