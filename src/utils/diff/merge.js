import { isArrayLike } from "./helper"

export function mergeDiff(base, diff) {
    if (!diff) return base
    const diffKeys = Object.keys(diff)

    for (let key of diffKeys) {
        const baseValue = base[key]
        const diffValue = diff[key]

        if (typeof baseValue === "object" && typeof diffValue === "object") {
            if (
                (!Array.isArray(baseValue) && Array.isArray(diffValue)) ||
                (Array.isArray(baseValue) && !isArrayLike(diffValue))
            ) {
                base[key] = diffValue
            } else {
                base[key] = mergeDiff(base[key], diff[key])
            }
        } else if (baseValue !== diffValue) {
            if (diffValue === undefined) {
                delete base[key]
            } else base[key] = diffValue
        }
    }
    return Array.isArray(base) ? base.filter(el => el !== undefined) : base
}
