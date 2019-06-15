import { arrayToObject, isObject, isArrayLike } from "./helper"

export function buildDiff(base, update, depth = 0) {
    // returns a partial tree that includes all the changes (in mongo notation)
    if (!base) return update
    if (depth === 0) {
        base = JSON.parse(JSON.stringify(base))
        update = JSON.parse(JSON.stringify(update))
    }

    const diff = {}

    const baseKeys = Object.keys(base)
    for (let key of baseKeys) {
        if (!update.hasOwnProperty(key)) {
            // set to null if the new doc Value no longer has that key
            if (isArrayLike(base)) {
                if (Array.isArray(diff["x-pull"])) {
                    diff["x-pull"].push(key)
                } else {
                    diff["x-pull"] = [key]
                }
            } else diff[key] = null
        }
    }

    const newKeys = Object.keys(update)
    for (let key of newKeys) {
        const baseValue = base[key]
        const newValue = update[key]
        if (typeof baseValue === "object" && typeof newValue === "object") {
            if (Array.isArray(baseValue) !== Array.isArray(newValue)) {
                // either of them is array and the other an object
                diff[key] = newValue
                if (isObject(newValue) && !diff[key].hasOwnProperty("x-new"))
                    diff[key]["x-new"] = true
            } else if (!Array.isArray(baseValue) && !Array.isArray(newValue)) {
                diff[key] = buildDiff(baseValue, newValue, ++depth)
                if (!Object.keys(diff[key]).length) delete diff[key]
            } else if (Array.isArray(baseValue) && Array.isArray(newValue)) {
                diff[key] = buildDiff(
                    arrayToObject(baseValue),
                    arrayToObject(newValue),
                    ++depth,
                )
                if (!Object.keys(diff[key]).length) delete diff[key]
            }
        } else if (baseValue !== newValue) {
            diff[key] = newValue
            if (isObject(newValue) && !diff[key].hasOwnProperty("x-new"))
                diff[key]["x-new"] = true
        }
    }

    return diff
}

export function diffToMongo(diff, path = "") {
    diff = JSON.parse(JSON.stringify(diff))
    const setObj = {}
    const unsetObj = {}
    const pullObj = {}

    function buildPaths(diff, path) {
        const keys = Object.keys(diff)
        for (let key of keys) {
            const diffValue = diff[key]
            const prefix = path.length ? "." : ""
            if (key === "x-pull") {
                for (const pullIndex of diffValue) {
                    // e.g. diffValue would be ["1", "5"]
                    setObj[`${path}.${pullIndex}`] = null
                }

                pullObj[path] = null
            } else if (
                isObject(diffValue) &&
                diffValue.hasOwnProperty("x-new")
            ) {
                // new objects
                delete diffValue["x-new"]
                setObj[`${path}${prefix}${key}`] = diffValue
            } else if (Array.isArray(diffValue)) {
                // new array
                setObj[`${path}${prefix}${key}`] = diffValue
            } else if (
                typeof diffValue === "string" ||
                typeof diffValue === "boolean" ||
                typeof diffValue === "number"
            ) {
                // normal value
                setObj[`${path}${prefix}${key}`] = diffValue
            } else if (diffValue === null) {
                // null -> removed value
                unsetObj[`${path}${prefix}${key}`] = ""
            } else if (isObject(diffValue)) {
                buildPaths(diffValue, `${path}${prefix}${key}`)
            }
        }
    }

    buildPaths(diff, path)

    const mongoDiff = {}

    if (Object.keys(setObj).length) mongoDiff.$set = setObj
    if (Object.keys(pullObj).length) mongoDiff.$pull = pullObj
    if (Object.keys(unsetObj).length) mongoDiff.$unset = unsetObj

    return mongoDiff
}
