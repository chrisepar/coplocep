import appDetails from '_appDetails.js';
import { postData, deleteData, putData, getData } from 'app/core/helpers/fetch.js';

const getUserRoles = () => {
    return getData('security/list')
        .then(data => data.json())
};

export {
    getUserRoles
};