import appDetails from '_appDetails.js';
import { postData, deleteData, putData } from 'app/core/helpers/fetch.js';
import { FormatDateToISO } from 'app/core/helpers/date_format.js';

const model = {
    MemberKey: 0,
    FirstName: "",
    MiddleName: "",
    LastName: "",
    TinNumber: "",
    DateAccepted: null,
    IsAccepted: "",
    BODResolutionNumber: "",
    TypeOfMembership: "",
    SharesSubscribed: 0,
    AmountSubscribed: 0,
    InitialPaidUp: 0,
    Address: "",
    CivilStatus: "Single",
    Birthdate: null,
    Birthplace: "",
    Occupation: "",
    Salary: 0,
    OtherIncome: "",
    EducationalAttainment: "NA",
    SpouseName: "",
    Dependencies: 0,
    OtherCooperative: "",
    Trainings: "",
    CreditReferences: "",
    CreatedBy: "",
    CreatedDate: null,
    ModifiedBy: "",
    ModifiedDate: null
};

const prepData = (detail) => {
    detail.Birthdate = FormatDateToISO(detail.Birthdate);
    detail.CreatedBy = appDetails.user();
    detail.CreatedDate = new Date();
    detail.ModifiedBy = appDetails.user();
    detail.ModifiedDate = new Date();
    return detail;
};

const saveMember = (isCreateMode, memberKey, detail) => {
    detail = prepData(detail);
    if (isCreateMode) {
        var url = appDetails.apiRoute + 'membership/create';
        return postData(url, detail).then((data) => {
            if (data && data.ok) {
                return data.json();
            } else {
                return false;
            }
        });
    } else {
        var url = appDetails.apiRoute + 'membership/edit/' + memberKey;
        return putData(url, detail).then((data) => {
            if (data && data.ok) {
                return data.json();
            } else {
                return false;
            }
        });

    }
};

const getMember = (memberKey) => {
    return fetch(appDetails.apiRoute + 'membership/list?memberKey=' + memberKey)
        .then(data => data.json());
};

export {
    model, saveMember, getMember
};