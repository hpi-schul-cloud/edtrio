import test from "ava"

import { arrayToObject, isArrayLike } from "./helper"

test("transform array to object", t => {
    const transformed = arrayToObject([1, { a: 1, b: 2 }, [1, 2, 3]])

    t.deepEqual(transformed, {
        "0": 1,
        "1": { a: 1, b: 2 },
        "2": [1, 2, 3],
    })
})

test("simple object", t => {
    const obj = { a: 1 }
    t.false(isArrayLike(obj))
})

test("simple array like object", t => {
    const obj = { "0": 1, "1": 3 }
    t.true(isArrayLike(obj))
})

test("array like, with skipping one index", t => {
    const obj = { "0": 1, "2": 3 }
    t.true(isArrayLike(obj))
})

test("bigger object", t => {
    const obj = { "0": 1, "1": { a: 1 }, "2": ["a", "b", "c"], "3": 5 }
    t.true(isArrayLike(obj))
})

test("appearingly array like, but has different keys as well", t => {
    const obj = { "0": 1, "1": 3, "2": 4, "3": 5, b: 6 }
    t.false(isArrayLike(obj))
})

test("array like that has values pulled", t => {
    const obj = { "1": -1, "x-pull": ["0", "3"] }
    t.true(isArrayLike(obj))
})
