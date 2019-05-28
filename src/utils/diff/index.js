export function docValueDiff(baseDocValue, newDocValue) {
    // returns a partial tree that includes all the changes (in mongo notation)

    if (!baseDocValue) return newDocValue

    const diff = {}

    const baseKeys = Object.keys(baseDocValue)
    for (let key of baseKeys) {
        if (!newDocValue.hasOwnProperty(key)) {
            // set to undefined if the new doc Value no longer has that key
            diff[key] = undefined // TODO maybe null instead?
        }
    }

    const newKeys = Object.keys(newDocValue)
    for (let key of newKeys) {
        const baseValue = baseDocValue[key]
        const newValue = newDocValue[key]
        if (typeof baseValue === "object" && typeof newValue === "object") {
            if (Array.isArray(baseValue) !== Array.isArray(newValue)) {
                // either of them is array and the other an object
                diff[key] = newValue
            } else if (!Array.isArray(baseValue) && !Array.isArray(newValue)) {
                diff[key] = docValueDiff(baseValue, newValue)
                if (!Object.keys(diff[key]).length) delete diff[key]
            } else if (Array.isArray(baseValue) && Array.isArray(newValue)) {
                diff[key] = docValueDiff(
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

export function arrayToObject(arr) {
    const o = {}

    for (let i in arr) {
        o[i] = arr[i]
    }

    return o
}
