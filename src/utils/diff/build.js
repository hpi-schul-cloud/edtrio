import { arrayToObject } from "./helper"

export function buildDiff(base, update) {
    // returns a partial tree that includes all the changes (in mongo notation)

    if (!base) return update

    const diff = {}

    const baseKeys = Object.keys(base)
    for (let key of baseKeys) {
        if (!update.hasOwnProperty(key)) {
            // set to undefined if the new doc Value no longer has that key
            diff[key] = undefined // TODO maybe null instead?
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
            } else if (!Array.isArray(baseValue) && !Array.isArray(newValue)) {
                diff[key] = buildDiff(baseValue, newValue)
                if (!Object.keys(diff[key]).length) delete diff[key]
            } else if (Array.isArray(baseValue) && Array.isArray(newValue)) {
                diff[key] = buildDiff(
                    arrayToObject(baseValue),
                    arrayToObject(newValue),
                )
                if (!Object.keys(diff[key]).length) delete diff[key]
            }
        } else if (baseValue !== newValue) {
            diff[key] = newValue
        }
    }

    return diff
}
