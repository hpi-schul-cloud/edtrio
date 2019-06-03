import test from "ava"

import { buildDiff, mergeDiff, diffToPathNotation } from "./index"
import { connectDatabase } from "~/utils/test"
const fs = require("fs")
const path = require("path")

test.before(async t => {
    const { db, client } = await connectDatabase()
    t.context.db = db.collection("diff-integration")
    t.context.dbClient = client
    try {
        await t.context.db.drop()
    } catch (err) {}

    t.context.base = JSON.parse(
        fs.readFileSync(path.join(__dirname, "integration.test.base.json")),
    )
    t.context.updated = JSON.parse(
        fs.readFileSync(path.join(__dirname, "integration.test.updated.json")),
    )
    t.context.savedDiff = JSON.parse(
        fs.readFileSync(path.join(__dirname, "integration.test.diff.json")),
    )
    t.context.savedPathDiff = JSON.parse(
        fs.readFileSync(path.join(__dirname, "integration.test.path.json")),
    )
})

test.after.always("close db connection", async t => {
    await t.context.dbClient.close()
})

test("(fairly) simple object", async t => {
    const base = {
        a: 1,
        b: 2,
        c: true,
        d: [1, 2, 3],
        e: [{ f: 1, g: 2 }],
    }

    const updated = {
        a: -1,
        b: 2,
        c: "hello",
        d: [1, 2, 4],
        e: [{ f: 1, g: -2 }],
    }

    const diff = buildDiff(base, updated)
    t.deepEqual(diff, {
        a: -1,
        c: "hello",
        d: {
            "2": 4,
        },
        e: { "0": { g: -2 } },
    })

    const merged = mergeDiff(base, diff)

    t.deepEqual(updated, merged)
})

test("extended object", async t => {
    const diff = buildDiff(t.context.base, t.context.updated)

    t.deepEqual(t.context.savedDiff, diff)

    const merged = mergeDiff(t.context.base, diff)
    t.deepEqual(t.context.updated, merged)

    const pathDiff = diffToPathNotation(diff)
    t.deepEqual(pathDiff, t.context.savedPathDiff)
})

test.skip("mongo integration test", async t => {
    await t.context.db.insertOne({
        ...t.context.base,
        _id: 1,
    })

    const { value: updatedDoc } = await t.context.db.findOneAndUpdate(
        {
            _id: 1,
        },
        t.context.savedPathDiff,
        { returnOriginal: false },
    )
    delete updatedDoc._id
    // TODO mongo document replaces $unset values with null
    // https://stackoverflow.com/questions/4588303/in-mongodb-how-do-you-remove-an-array-element-by-its-index
    // https://www.tutorialspoint.com/how-do-you-remove-an-array-element-by-its-index-in-mongodb
    t.deepEqual(updatedDoc, t.context.updated)
})
