export default (value) => {
    var isTruthy = false;
    if (value === undefined || value === null) {
        isTruthy = null; 
    } else if (value === "Y" || value === true || value === "true") {
        isTruthy = true;
    }
    return isTruthy;
};