import appDetails from '_appDetails.js';
import { postData, deleteData } from 'app/core/helpers/fetch.js';

const model = {
    TransactionKey: 0,
    MemberKey: 0,
    Amount: 0,
    Category: "",
    IsApproved: "",
    ApprovedDate: "",
    CreatedBy: "",
    CreatedDate: null,
    ModifiedBy: "",
    ModifiedDate: null
};

const prepData = (detailID, amount, category) => {
    var detail = _.clone(model);
    detail.MemberKey = detailID;
    detail.Amount = amount;
    detail.Category = category;
    detail.CreatedBy = appDetails.user();
    detail.CreatedDate = new Date();
    detail.ModifiedBy = appDetails.user();
    detail.ModifiedDate = new Date();
    return detail;
};

const addTransaction = (detailID, amount, category) => {
    var detail = prepData(detailID, amount, category);
    var url = appDetails.apiRoute + 'transaction/add';
    return postData(url, detail).then((data) => {
        if (data && data.ok) {
            return data.json();
        } else {
            return false;
        }
    });
};

const deleteTransaction = (transactionKey) => {
    var url = appDetails.apiRoute + 'transaction/delete/' + transactionKey;
    return deleteData(url).then((data) => {
        if (data && data.ok) {
            return data.json();
        } else {
            return false;
        }
    });
};

const getMemberTransactionList = (memberKey, type) => {
    return fetch(appDetails.apiRoute + 'transaction/' + type + '/' + memberKey)
        .then(data => data.json())
};

export {
    model,
    getMemberTransactionList,
    addTransaction,
    deleteTransaction
};