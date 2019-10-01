const MongoClient = require("mongodb").MongoClient

export function connectDatabase() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(
            "mongodb://localhost:27017",
            { useNewUrlParser: true },
            function(err, client) {
                if (err) reject(err)
                const db = client.db("edtr-test")

                resolve({ db, client })
            },
        )
    })
}
