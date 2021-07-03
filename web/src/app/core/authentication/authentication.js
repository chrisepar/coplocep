
import { setSession, removeSession, getSession } from "app/core/helpers/session_storage.js";

const getUserSession = () => {
    const user = getSession("user");
    if (user !== null) {
        return JSON.parse(user);
    } else {
        return null;
    }
};

const getUserName = () => {
    const user = getUserSession();
    if (user !== null) {
        return user.Name;
    } else {
        return null
    }
};

const getUserCode = () => {
    const user = getUserSession();
    if (user !== null) {
        return user.Code;
    } else {
        return null
    }
};

const removeUserSession = () => {
    var isRemoved = false;
    if (getUserSession() !== null) {
        removeSession("user");
        isRemoved = true;
    }
    return isRemoved;
};

const setUserSession = (user) => {
    setSession("user", user);
};

export {
    getUserSession, removeUserSession, setUserSession, getUserCode, getUserName
};