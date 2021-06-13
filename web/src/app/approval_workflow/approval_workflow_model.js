import appDetails from '_appDetails.js';
import { postData, deleteData } from 'app/core/helpers/fetch.js';

const model = {
    ApprovalID: 0,
    RecordID: 0,
    Category: "",
    ApprovedDate: null,
    ApprovedBy: "",
    IsApproved: "",
    Comment: ""
};

const prepData = (recordID, category, comment) => {
    var detail = _.clone(model);
    detail.RecordID = recordID;
    detail.Category = category;
    detail.Comment = comment;
    detail.ApprovedBy = appDetails.user();
    detail.ApprovedDate = new Date();
    return detail;
};

const approveRecord = (recordID, category, comment) => {
    var detail = prepData(recordID, category, comment);
    var url = appDetails.apiRoute + 'approvalworkflow/approve';
    return postData(url, detail).then((data) => {
        if (data && data.ok) {
            return data.json();
        } else {
            return false;
        }
    });
};

const rejectRecord = (recordID, category, comment) => {
    var detail = prepData(recordID, category, comment);
    var url = appDetails.apiRoute + 'approvalworkflow/reject';
    return postData(url, detail).then((data) => {
        if (data && data.ok) {
            return data.json();
        } else {
            return false;
        }
    });
};

export {
    model,
    approveRecord,
    rejectRecord
}