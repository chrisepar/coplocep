import appDetails from '_appDetails.js';
import { postData, deleteData, getData } from 'app/core/helpers/fetch.js';
import { getUserCode } from "app/core/authentication/authentication.js"

const model = {
    ApprovalID: 0,
    RecordID: 0,
    Category: "",
    ApprovedDate: null,
    ApprovedBy: "",
    IsApproved: "",
    Comment: ""
};

const prepData = (recordID, category, comment, isApproved) => {
    var detail = _.clone(model);
    detail.RecordID = recordID;
    detail.Category = category;
    detail.Comment = comment;
    detail.IsApproved = isApproved;
    detail.ApprovedBy = getUserCode();
    detail.ApprovedDate = new Date();
    return detail;
};

const approveRecord = (recordID, category, comment) => {
    var detail = prepData(recordID, category, comment, "Y");
    const url = (category === "Membership") ? "approvalworkflow/approve/membership" : "approvalworkflow/approve/transaction"
    return postData(url, detail).then((data) => {
        if (data && data.ok) {
            return data.json();
        } else {
            return false;
        }
    });
};

const rejectRecord = (recordID, category, comment) => {
    var detail = prepData(recordID, category, comment, "N");
    const url = (category === "Membership") ? "approvalworkflow/reject/membership" : "approvalworkflow/reject/transaction";
    return postData(url, detail).then((data) => {
        if (data && data.ok) {
            return data.json();
        } else {
            return false;
        }
    });
};

const getURL = (category, recordID) => {
    const membership = "approvalworkflow/timeline/membership/" + recordID;
    const transaction = "approvalworkflow/timeline/transaction/" + category + "/" + recordID;
    return (category === "Membership") ? membership : transaction;
};

const getApprovalTimeline = (category, recordID) => {
    return getData(getURL(category, recordID))
        .then(data => data.json());
};

export {
    model,
    approveRecord,
    rejectRecord,
    getApprovalTimeline
}