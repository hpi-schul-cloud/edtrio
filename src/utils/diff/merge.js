import { isArrayLike, isObject } from "./helper"

export function mergeDiff(base, diff, depth = 0) {
    if (!diff) return base
    if (depth === 0) {
        base = JSON.parse(JSON.stringify(base))
        diff = JSON.parse(JSON.stringify(diff))
    }

    const diffKeys = Object.keys(diff)

    let xPull = []
    if (diff.hasOwnProperty("x-pull")) {
        xPull = diff["x-pull"]
        delete diff["x-pull"]
    }

    for (let key of diffKeys) {
        const baseValue = base[key]
        const diffValue = diff[key]

        if (isObject(diffValue) && diffValue.hasOwnProperty("x-new")) {
            delete diffValue["x-new"]
            base[key] = diffValue
        } else if (
            typeof baseValue === "object" &&
            typeof diffValue === "object" &&
            diffValue !== null
        ) {
            if (
                (!Array.isArray(baseValue) && Array.isArray(diffValue)) ||
                (Array.isArray(baseValue) && !isArrayLike(diffValue))
            ) {
                base[key] = diffValue
            } else {
                base[key] = mergeDiff(base[key], diff[key], ++depth)
            }
        } else if (baseValue !== diffValue) {
            if (diffValue === null) {
                delete base[key]
            } else base[key] = diffValue
        }
    }

    return Array.isArray(base)
        ? base.filter((el, index) => !xPull.includes(index.toString()))
        : base
}
