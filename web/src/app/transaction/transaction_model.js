import appDetails from '_appDetails.js';
import { postData, deleteData, getData } from 'app/core/helpers/fetch.js';
import { getUserCode } from "app/core/authentication/authentication.js"
import { downloadFile } from "app/core/helpers/file_handler.js";

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

const prepData = (detailID, category, data) => {
    var detail = _.clone(model);
    detail.MemberKey = detailID;
    detail.Category = category;
    detail.Amount = data.amount;
    detail.Interest = data.interest;
    detail.Term = data.term;
    detail.CreatedBy = getUserCode();
    detail.CreatedDate = new Date();
    detail.ModifiedBy = getUserCode();
    detail.ModifiedDate = new Date();
    return detail;
};

const prepPayment = (detailID, data) => {
    var detail = _.clone(model);
    detail.MemberKey = detailID;
    detail.LoanKey = data.loanID;
    detail.Category = "Payment";
    detail.Amount = data.amount;
    detail.CreatedBy = getUserCode();
    detail.CreatedDate = new Date();
    detail.ModifiedBy = getUserCode();
    detail.ModifiedDate = new Date();
    return detail;
};

const addPayment = (detailID, data) => {
    var detail = prepPayment(detailID, data);
    return postData(`transaction/add/payment`, detail).then((data) => {
        if (data && data.ok) {
            return data.json();
        } else {
            return false;
        }
    });
};

const addTransaction = (detailID, category, data) => {
    var detail = prepData(detailID, category, data);
    return postData(`transaction/add/${category}`, detail).then((data) => {
        if (data && data.ok) {
            return data.json();
        } else {
            return false;
        }
    });
};

const deleteTransaction = (transactionKey, category) => {
    return deleteData(`transaction/delete/${category}/${transactionKey}`).then((data) => {
        if (data && data.ok) {
            return data.json();
        } else {
            return false;
        }
    });
};

const getMemberTransactionList = (memberKey, type, page = 1) => {
    return getData(`transaction/${type}/list/${memberKey}?page=${page}`)
        .then(data => data.json())
};

const getLoanTransactionList = (loadID, type, page = 1) => {
    return getData(`transaction/${type}/list/${loadID}?page=${page}`)
        .then(data => data.json())
};

const getMembersWithTransaction = (pageCount, page = 1) => {
    return getData(`transaction/list?page=${page}&pageCount=${pageCount}`)
        .then(data => data.json())
};

const downloadComputation = (amount, interest, term) => {
    const param = `?amount=${amount}&interest=${interest}&term=${term}`;
    return getData(`transaction/calculation${param}`)
        .then(data => data.blob())
        .then(blob => {
            downloadFile(blob, "Computation.xlsx");
        });
};

export {
    model,
    getMemberTransactionList,
    getLoanTransactionList,
    addTransaction,
    addPayment,
    deleteTransaction,
    getMembersWithTransaction,
    downloadComputation
};