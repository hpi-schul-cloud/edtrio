import test from "ava"

import { buildDiff, diffToPathNotation } from "./index"
import { connectDatabase } from "~/utils/test"

test.before(async t => {
    const { db, client } = await connectDatabase()
    t.context.db = db.collection("diff-build")
    t.context.dbClient = client
    try {
        await t.context.db.drop()
    } catch (err) {}
})

test.after.always("close db connection", async t => {
    await t.context.dbClient.close()
})

test("keep same values", async t => {
    const baseDocValue = {
        a: 1,
        b: { c: 2, d: ["a", 1] },
    }

    const newDocValue = {
        a: 1,
        b: { c: 2, d: ["a", 1] },
    }

    const diff = buildDiff(baseDocValue, newDocValue)

    t.deepEqual(diff, {})
})

test("return whole object if no base doc value is present", async t => {
    const newDocValue = {
        a: 1,
        b: 5,
        c: [{ d: 1 }],
    }

    const diff = buildDiff(null, newDocValue)

    t.deepEqual(diff, newDocValue)
})

test("add new primitive value", async t => {
    const baseDocValue = {
        a: 1,
    }

    const newDocValue = {
        a: 1,
        b: 1,
    }
    const diff = buildDiff(baseDocValue, newDocValue)
    t.deepEqual(diff, { b: 1 })

    await t.context.db.insertOne({
        _id: 1,
        ...baseDocValue,
    })

    const { value: updatedDoc } = await t.context.db.findOneAndUpdate(
        {
            _id: 1,
        },
        { $set: diff },
        { returnOriginal: false },
    )
    delete updatedDoc._id

    t.deepEqual(updatedDoc, newDocValue)
})

test("remove primitive values", async t => {
    const baseDocValue = {
        a: 1,
        b: 1,
    }

    const newDocValue = {
        a: 1,
    }

    const diff = buildDiff(baseDocValue, newDocValue)

    t.deepEqual(diff, { b: null }) // TODO maybe null instead?

    await t.context.db.insertOne({
        ...baseDocValue,
        _id: 2,
    })

    const { value: updatedDoc } = await t.context.db.findOneAndUpdate(
        {
            _id: 2,
        },
        { $set: diff },
        { returnOriginal: false },
    )

    delete updatedDoc._id
    t.deepEqual(updatedDoc, { ...newDocValue, b: null }) // TODO mongo turns null into null
})

test("remove object and array values", async t => {
    const baseDocValue = {
        a: 1,
        b: { c: "hello" },
        d: [1, 2, 3, 4],
    }

    const newDocValue = {
        a: 1,
    }

    const diff = buildDiff(baseDocValue, newDocValue)

    t.deepEqual(diff, { b: null, d: null }) // TODO maybe null instead?

    await t.context.db.insertOne({
        ...baseDocValue,
        _id: 3,
    })

    const { value: updatedDoc } = await t.context.db.findOneAndUpdate(
        {
            _id: 3,
        },
        { $set: diff },
        { returnOriginal: false },
    )

    delete updatedDoc._id
    t.deepEqual(updatedDoc, { ...newDocValue, b: null, d: null }) // TODO mongo turns null into null
})

test("replace primitive value with other primitive value", async t => {
    const baseDocValue = {
        a: "hello",
    }

    const newDocValue = {
        a: "bye",
    }

    const diff = buildDiff(baseDocValue, newDocValue)
    t.deepEqual(diff, { a: "bye" })

    await t.context.db.insertOne({
        ...baseDocValue,
        _id: 4,
    })

    const { value: updatedDoc } = await t.context.db.findOneAndUpdate(
        { _id: 4 },
        { $set: diff },
        { returnOriginal: false },
    )

    delete updatedDoc._id
    t.deepEqual(updatedDoc, newDocValue)
})

test("replace primitive value with object", async t => {
    const baseDocValue = {
        l: 1,
        a: "hello",
    }

    const newDocValue = {
        l: 1,
        a: { b: "bye" },
    }

    const diff = buildDiff(baseDocValue, newDocValue)
    t.deepEqual(diff, { a: { b: "bye", "x-new": true } })
})

test("replace object with primitive value", async t => {
    const baseDocValue = {
        l: 1,
        a: { b: "bye" },
    }

    const newDocValue = {
        l: 1,
        a: "hello",
    }

    const diff = buildDiff(baseDocValue, newDocValue)
    t.deepEqual(diff, { a: "hello" })

    await t.context.db.insertOne({
        ...baseDocValue,
        _id: 6,
    })

    const { value: updatedDoc } = await t.context.db.findOneAndUpdate(
        { _id: 6 },
        { $set: diff },
        { returnOriginal: false },
    )

    delete updatedDoc._id
    t.deepEqual(updatedDoc, newDocValue)
})

test("replace primitive value with array", async t => {
    const baseDocValue = {
        b: "hello",
    }

    const newDocValue = {
        b: [1, 2, 3],
    }

    const diff = buildDiff(baseDocValue, newDocValue)

    t.deepEqual(diff, { b: [1, 2, 3] })

    await t.context.db.insertOne({
        ...baseDocValue,
        _id: 7,
    })

    const { value: updatedDoc } = await t.context.db.findOneAndUpdate(
        { _id: 7 },
        { $set: diff },
        { returnOriginal: false },
    )

    delete updatedDoc._id
    t.deepEqual(updatedDoc, newDocValue)
})

test("replace object with array", async t => {
    const baseDocValue = {
        b: { c: "hello" },
    }

    const newDocValue = {
        b: [1, 2, 3],
    }

    const diff = buildDiff(baseDocValue, newDocValue)

    t.deepEqual(diff, { b: [1, 2, 3] })

    await t.context.db.insertOne({
        ...baseDocValue,
        _id: 8,
    })

    const { value: updatedDoc } = await t.context.db.findOneAndUpdate(
        { _id: 8 },
        { $set: diff },
        { returnOriginal: false },
    )

    delete updatedDoc._id
    t.deepEqual(updatedDoc, newDocValue)
})

test("replace array with object", async t => {
    const baseDocValue = {
        b: ["a", "b", "c"],
    }

    const newDocValue = {
        b: { a: 1, b: 2, c: 3 },
    }

    const diff = buildDiff(baseDocValue, newDocValue)

    t.deepEqual(diff, { b: { "x-new": true, a: 1, b: 2, c: 3 } })
})

test("handle nested objects correctly", async t => {
    const baseDocValue = {
        b: { c: "hello", a: 5 },
    }

    const newDocValue = {
        b: { c: 1, a: 5 },
    }

    const diff = buildDiff(baseDocValue, newDocValue)
    t.deepEqual(diff, { b: { c: 1 } })
})

test("change simple array value", t => {
    const baseDocValue = {
        arr: ["hello"],
    }

    const newDocValue = {
        arr: ["bye"],
    }

    const diff = buildDiff(baseDocValue, newDocValue)

    t.deepEqual(diff, {
        arr: {
            "0": "bye",
        },
    })
})

test("change simple array value #2", t => {
    const baseDocValue = {
        arr: ["hello", "bye", "ciao"],
    }

    const newDocValue = {
        arr: ["hello", "servus", "ciao"],
    }

    const diff = buildDiff(baseDocValue, newDocValue)

    t.deepEqual(diff, {
        arr: {
            "1": "servus",
        },
    })
})

test("change array values with different sizes", t => {
    const baseDocValue = {
        arr: ["hello", "bye", "ciao"],
    }

    const newDocValue = {
        arr: ["hello", "servus"],
    }

    const diff = buildDiff(baseDocValue, newDocValue)

    t.deepEqual(diff, {
        arr: {
            "1": "servus",
            "2": null,
        },
    })
})

test("change array values with nested objects", t => {
    const baseDocValue = {
        arr: [{ a: "hello", b: "bye", c: "ciao", d: "bonjour" }, 2],
    }

    const newDocValue = {
        arr: [{ a: "hello", b: "bye", d: "bona sera" }, { c: "ciao" }],
    }

    const diff = buildDiff(baseDocValue, newDocValue)

    t.deepEqual(diff, {
        arr: {
            "0": { c: null, d: "bona sera" },
            "1": { c: "ciao", "x-new": true },
        },
    })
})

test("mark newly created objects", t => {
    const baseDocValue = {
        a: {
            b: {
                c: 1,
                d: 2,
            },
        },
    }

    const newDocValue = {
        a: {
            b: {
                c: 1,
                d: 2,
                e: {
                    f: 1,
                    g: 2,
                },
            },
        },
    }

    const diff = buildDiff(baseDocValue, newDocValue)

    t.deepEqual(diff, {
        a: {
            b: {
                e: {
                    f: 1,
                    g: 2,
                    "x-new": true,
                },
            },
        },
    })
})

test("fully nested structures", t => {
    const baseDocValue = {
        city: {
            name: "Berlin",
            disctricts: ["Kreuzberg", "Neukölln", "more"],
        },
        country: {
            name: "Germany",
            year: 1918,
            states: {
                Pommern: {
                    borderState: true,
                    population: 6000000,
                    cities: ["Kolberg"],
                },
                Brandenburg: {
                    cities: ["Stettin", "Potsdam"],
                    population: 4000000,
                },
            },
        },
    }

    const newDocValue = {
        city: {
            name: "Berlin",
            disctricts: ["Friedrichshain", "Neukölln", "more"],
        },
        country: {
            name: "East Germany",
            year: 1949,
            states: {
                Brandenburg: {
                    cities: ["Potsdam"],
                    population: 2500000,
                },
                Saxony: {
                    cities: ["Dresden"],
                    population: 4500000,
                },
            },
        },
    }

    const diff = buildDiff(baseDocValue, newDocValue)

    t.deepEqual(diff, {
        city: {
            disctricts: { "0": "Friedrichshain" },
        },
        country: {
            name: "East Germany",
            year: 1949,
            states: {
                Brandenburg: {
                    cities: { "0": "Potsdam", "1": null },
                    population: 2500000,
                },
                Pommern: null,
                Saxony: {
                    "x-new": true,
                    cities: ["Dresden"],
                    population: 4500000,
                },
            },
        },
    })
})

test("path notation", t => {
    const diff = {
        city: {
            districts: { "0": "Friedrichshain" },
        },
        country: {
            name: "East Germany",
            year: 1949,
            states: {
                Brandenburg: {
                    cities: { "0": "Potsdam", "1": null },
                    population: 2500000,
                },
                Pommern: null,
                Saxony: {
                    "x-new": true,
                    cities: ["Dresden"],
                    population: 4500000,
                },
            },
        },
    }

    const pathDiff = diffToPathNotation(diff)
    t.deepEqual(pathDiff, {
        $set: {
            "city.districts.0": "Friedrichshain",
            "country.name": "East Germany",
            "country.year": 1949,
            "country.states.Brandenburg.cities.0": "Potsdam",
            "country.states.Brandenburg.population": 2500000,
            "country.states.Saxony": {
                cities: ["Dresden"],
                population: 4500000,
            },
        },
        $unset: {
            "country.states.Brandenburg.cities.1": 1,
            "country.states.Pommern": 1,
        },
    })
})
