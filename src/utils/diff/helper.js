export function arrayToObject(arr) {
    const o = {}

    for (let i in arr) {
        o[i] = arr[i]
    }

    return o
}

export function isArrayLike(obj) {
    return !Object.keys(obj).find((el, i) => isNaN(parseInt(el)))
}

export function isObject(o) {
    return typeof o === "object" && !Array.isArray(o) && o !== null
}

export function isArray(a) {
    return typeof a === "object" && Array.isArray(a)
}
