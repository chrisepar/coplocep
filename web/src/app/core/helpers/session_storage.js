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

const removeSession = (id) => {
    sessionStorage.removeItem(id);
};

export {
    setSession, isSessionExisting, getSession, removeSession
};