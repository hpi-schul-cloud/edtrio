import test from "ava"

import { buildDiff, mergeDiff } from "./index"
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
    const base = JSON.parse(
        fs.readFileSync(path.join(__dirname, "integration.test.base.json")),
    )
    const updated = JSON.parse(
        fs.readFileSync(path.join(__dirname, "integration.test.updated.json")),
    )

    const diff = buildDiff(base, updated)
    const savedDiff = JSON.parse(
        fs.readFileSync(path.join(__dirname, "integration.test.diff.json")),
    )

    t.deepEqual(savedDiff, diff)

    const merged = mergeDiff(base, diff)

    t.deepEqual(updated, merged)
})
