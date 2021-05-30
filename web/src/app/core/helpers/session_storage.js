const sessionStorage = window.sessionStorage;

const setSession = (id, value) => {
    sessionStorage.setItem(id, value);
};

const isSessionExisting = (id) => {
    return sessionStorage.getItem(id) !== null;
};

const getSession = (id) => {
    return sessionStorage.getItem(id);
};

const getUser = () => {
    const user = getSession("user");
    if (user !== null) {
        return JSON.parse(user);
    } else {
        return null;
    }
};

const removeUser = () => {
    var isRemoved = false;
    if (getUser() !== null) {
        sessionStorage.removeItem("user");
        isRemoved = true;
    }
    return isRemoved;
};

export {
    setSession, isSessionExisting, getSession, getUser, removeUser
};