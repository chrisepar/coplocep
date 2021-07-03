import appDetails from '_appDetails.js';
import { postData, deleteData, putData, getData } from 'app/core/helpers/fetch.js';
import { FormatDateToISO } from 'app/core/helpers/date_format.js';
import { getUserCode } from "app/core/authentication/authentication.js"

const model = {
    MemberKey: 0,
    FirstName: "",
    MiddleName: "",
    LastName: "",
    TinNumber: "",
    BODResolutionNumber: null,
    TypeOfMembership: "",
    SharesSubscribed: 0.0,
    AmountSubscribed: 0.00,
    InitialPaidUp: 0.00,
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
    ModifiedDate: null,
    ApprovalID: 0,
    RecordID: 0,
    Category: "Membership",
    ApprovedDate: null,
    ApprovedBy: "",
    IsApproved: "",
    Comment: "",
    Name: ""
};

const prepData = (detail) => {
    const formattedDate = FormatDateToISO(detail.Birthdate);
    detail.Birthdate = formattedDate;
    detail.CreatedBy = getUserCode();
    detail.CreatedDate = new Date();
    detail.ModifiedBy = getUserCode();
    detail.ModifiedDate = new Date();
    return detail;
};

const saveMember = (isCreateMode, memberKey, detail) => {
    detail = prepData(detail);
    if (isCreateMode) {
        return postData('membership/create', detail).then((data) => {
            if (data && data.ok) {
                return data.json();
            } else {
                return false;
            }
        });
    } else {
        return putData("membership/edit", detail).then((data) => {
            if (data && data.ok) {
                return data.json();
            } else {
                return false;
            }
        });

    }
};

const getMember = (memberKey) => {
    return getData('membership/list?memberKey=' + memberKey)
        .then(data => data.json());
};

const getMemberList = () => {
    return getData('membership/list')
        .then(data => data.json())
};

export {
    model, saveMember, getMember, getMemberList
};