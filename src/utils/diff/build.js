import { arrayToObject, isObject } from "./helper"

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
            diff[key] = null // TODO maybe null instead?
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

export function diffToPathNotation(diff) {
    diff = JSON.parse(JSON.stringify(diff))
    function buildPaths(diff, paths = {}, path = "") {
        const keys = Object.keys(diff)
        for (let key of keys) {
            const diffValue = diff[key]
            const prefix = path.length ? "." : ""

            if (isObject(diffValue) && diffValue.hasOwnProperty("x-new")) {
                delete diffValue["x-new"]
                paths[`${path}${prefix}${key}`] = diffValue
            } else if (
                typeof diffValue !== "object" ||
                Array.isArray(diffValue) ||
                diffValue === null
            ) {
                paths[`${path}${prefix}${key}`] = diffValue
            } else {
                buildPaths(diffValue, paths, `${path}${prefix}${key}`)
            }
        }

        return paths
    }

    const paths = buildPaths(diff)

    const setObj = {}
    const unsetObj = {}

    Object.keys(paths).forEach(key => {
        const val = paths[key]

        if (val === null) {
            unsetObj[key] = 1
        } else {
            setObj[key] = val
        }
    })

    return {
        $set: setObj,
        $unset: unsetObj,
    }
}
