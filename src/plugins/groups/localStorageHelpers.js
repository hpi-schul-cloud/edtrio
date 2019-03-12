export function loadWorkingPackages() {
    const localStorageItems = JSON.parse(
        localStorage.getItem("workingPackages"),
    )
    return localStorageItems ? localStorageItems : {}
}

export function saveWorkingPackages(key, workingPackages) {
    const items = JSON.parse(localStorage.getItem("workingPackages")) || {}
    items[key] = workingPackages
    localStorage.setItem("workingPackages", JSON.stringify(items))
}

export function clearWorkingPackages() {
    localStorage.remove("workingPackages")
}