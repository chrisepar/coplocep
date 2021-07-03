
import { getUserCode } from "app/core/authentication/authentication.js"

import { postData, deleteData, putData, getData } from 'app/core/helpers/fetch.js';

const model = {
    Interest: 1,
    Term: 12
};

const prepData = (detail) => {
    detail.ModifiedBy = getUserCode();
    detail.ModifiedDate = new Date();
    return detail;
};

const saveSettings = (detail) => {
    detail = prepData(detail)
    return putData("settings/save", detail).then((data) => {
        if (data && data.ok) {
            return data.json();
        } else {
            return false;
        }
    });
};

const getSettings = () => {
    return getData("settings")
        .then(data => data.json());
};

export {
    model, saveSettings, getSettings
}