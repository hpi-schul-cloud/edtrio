import test from "ava"

import { buildDiff, arrayToObject, mergeDiff } from "./index"
import { connectDatabase } from "~/utils/test"

test.before(async t => {
    const { db, client } = await connectDatabase()
    t.context.db = db.collection("diff-merge")
    t.context.dbClient = client
    try {
        await t.context.db.drop()
    } catch (err) {}
})

test.after.always("close db connection", async t => {
    await t.context.dbClient.close()
})

test("correctly update primitive value", t => {
    const base = { a: 1 }
    const diff = { a: 2 }

    const updated = mergeDiff(base, diff)

    t.deepEqual(updated, { a: 2 })
})

test("correctly unset values", t => {
    const base = { a: 1, b: 2 }
    const diff = { a: null }
    const updated = mergeDiff(base, diff)

    t.deepEqual(updated, { b: 2 })
})

test("correctly change values with different primitive data type", t => {
    const base = { a: 1 }
    const diff = { a: "hello" }

    const updated = mergeDiff(base, diff)

    t.deepEqual(updated, { a: "hello" })
})

test("leave unchanged values untouched", t => {
    const base = { a: 1, b: 2 }
    const diff = { a: "hello" }

    const updated = mergeDiff(base, diff)

    t.deepEqual(updated, { a: "hello", b: 2 })
})

test("change primitive value to object", t => {
    const base = { a: 1, b: 2 }
    const diff = { a: { c: 3, "x-new": true } }

    const updated = mergeDiff(base, diff)

    t.deepEqual(updated, { a: { c: 3 }, b: 2 })
})

test("change primitive data type to array", t => {
    const base = { a: 1, b: 2 }
    const diff = { a: [3, 4, 5] }

    const updated = mergeDiff(base, diff)

    t.deepEqual(updated, { a: [3, 4, 5], b: 2 })
})

test("update nested object", t => {
    const base = { a: { b: { c: 1, d: 2 }, e: 3 } }
    const diff = { a: { b: { c: 4 } } }

    const updated = mergeDiff(base, diff)

    t.deepEqual(updated, { a: { b: { c: 4, d: 2 }, e: 3 } })
})

test("update array", t => {
    const base = { a: [1, 2, 3] }
    const diff = { a: { "2": 4 } }

    const updated = mergeDiff(base, diff)

    t.deepEqual(updated, { a: [1, 2, 4] })
})

test("remove array elements", t => {
    const base = { a: [1, 2, 3] }
    const diff = { a: { "x-pull": ["2"] } }

    const updated = mergeDiff(base, diff)

    t.deepEqual(updated, { a: [1, 2] })
})

test("remove array elements that are not at the end", t => {
    const base = { a: [1, 2, 3, 4, 5] }
    const diff = { a: { "x-pull": ["0", "3"], "1": -1 } }

    const updated = mergeDiff(base, diff)

    t.deepEqual(updated, { a: [-1, 3, 5] })
})

test("change array to object", t => {
    const base = { a: [1, 2, 3] }
    const diff = { a: { b: 1, c: 2, "x-new": true } }

    const updated = mergeDiff(base, diff)

    t.deepEqual(updated, { a: { b: 1, c: 2 } })
})

test("change object to array", t => {
    const base = { a: { b: 1, c: 2 } }
    const diff = { a: [1, 2, 3] }

    const updated = mergeDiff(base, diff)

    t.deepEqual(updated, { a: [1, 2, 3] })
})

test("change nested values", t => {
    const base = { a: [{ a: 1, b: 2 }, { c: 3, d: 4 }] }
    const diff = { a: { "0": { a: 5 } } }

    const updated = mergeDiff(base, diff)

    t.deepEqual(updated, { a: [{ a: 5, b: 2 }, { c: 3, d: 4 }] })
})

test("remove nested values", t => {
    const base = { a: [{ a: 1, b: 2 }, { c: 3, d: 4 }] }
    const diff = { a: { "0": { a: 5, b: null }, "1": null } }

    const updated = mergeDiff(base, diff)

    t.deepEqual(updated, { a: [{ a: 5 }] })
})
