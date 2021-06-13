export default (value) => {
    var isEmpty = false;
    if (value === undefined) {
        isEmpty = true;
    } else if (value === null || value === "") {
        isEmpty = true;
    } else if (typeof value === "object" && Array.isArray(value) && value.length === 0) {
        isEmpty = true;
    }
    return isEmpty;
}