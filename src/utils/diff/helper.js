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
