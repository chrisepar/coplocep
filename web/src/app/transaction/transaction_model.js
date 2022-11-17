import appDetails from '_appDetails.js';
import { postData, deleteData, getData } from 'app/core/helpers/fetch.js';
import { getUserCode } from "app/core/authentication/authentication.js"
import { downloadFile } from "app/core/helpers/file_handler.js";
import isEmpty from "app/core/helpers/is_empty.js";

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

    // Use only for transactions
    if (category !== null) {
        detail.MemberKey = detailID;
        detail.Category = category;
        detail.TypeOfLoan = data.TypeOfLoan;
        detail.StartDueDate = data.StartDueDate;
        detail.CreatedBy = getUserCode();
        detail.CreatedDate = new Date();
        detail.ModifiedBy = getUserCode();
        detail.ModifiedDate = new Date();
    }

    // Shared for Download Computation and New Loan
    detail.Amount = data.Amount;
    detail.Interest = data.Interest;
    detail.Term = data.Term;
    detail.ServiceFee = data.ServiceFee;
    detail.InsuranceAmount = data.InsuranceAmount;
    detail.FixedDepositAmount = data.FixedDepositAmount;
    detail.DocumentationAmount = data.DocumentationAmount;
    detail.SavingsDepositAmount = data.SavingsDepositAmount;
    detail.BalancePreviousLoanAmount = data.BalancePreviousLoanAmount;
    detail.InterestPreviousLoanAmount = data.InterestPreviousLoanAmount;
    detail.DepositSavings = data.DepositSavings;
    detail.DepositShareCapitalAmount = data.DepositShareCapitalAmount;
    return detail;
};

const prepPayment = (detailID, data) => {
    var detail = _.clone(model);
    detail.MemberKey = detailID;
    detail.LoanKey = data.loanID;
    detail.Category = "Payment";
    detail.Amount = data.Amount;
    detail.Interest = data.Interest;
    detail.Principal = data.Principal;
    detail.Penalty = data.Penalty;
    detail.CreatedBy = getUserCode();
    detail.CreatedDate = new Date();
    detail.ModifiedBy = getUserCode();
    detail.ModifiedDate = new Date();
    return detail;
};

const addPayment = (detailID, dataDetail) => {
    var detail = prepPayment(detailID, dataDetail);
    return postData(`transaction/add/payment`, detail).then((data) => {
        if (data && data.ok) {
            return data.json();
        } else {
            return false;
        }
    });
};

const addTransaction = (detailID, category, dataDetail) => {
    var detail = prepData(detailID, category, dataDetail);
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

const getMemberTransactionList = (memberKey, type, filters) => {
    const pageCount = !isEmpty(filters.pageCount) && filters.pageCount;
    const page = isEmpty(filters.page) ? 1 : filters.page;
    const filterBy = isEmpty(filters.filterByValue) ? "" : filters.filterByValue;
    const searchBy = isEmpty(filters.searchValue) ? "" : filters.searchValue;
    return getData(`transaction/${type}/list/${memberKey}?page=${page}&pageCount=${pageCount}&filterBy=${filterBy}&searchBy=${searchBy}`)
        .then(data => data.json())
};

const getLoanTransactionList = (loanID, type, filters) => {
    const pageCount = !isEmpty(filters.pageCount) && filters.pageCount;
    const page = isEmpty(filters.page) ? 1 : filters.page;
    const filterBy = isEmpty(filters.filterByValue) ? "" : filters.filterByValue;
    const searchBy = isEmpty(filters.searchValue) ? "" : filters.searchValue;

    return getData(`transaction/${type}/list/${loanID}?page=${page}&pageCount=${pageCount}&filterBy=${filterBy}&searchBy=${searchBy}`)
        .then(data => data.json())
};

const getMembersWithTransaction = (filters) => {
    const pageCount = !isEmpty(filters.pageCount) && filters.pageCount;
    const page = isEmpty(filters.page) ? 1 : filters.page;
    const filterBy = isEmpty(filters.filterByValue) ? "" : filters.filterByValue;
    const searchBy = isEmpty(filters.searchValue) ? "" : filters.searchValue;
    return getData(`transaction/list?page=${page}&pageCount=${pageCount}&filterBy=${filterBy}&searchBy=${searchBy}`)
        .then(data => data.json())
};

const getLoanPaymentDetails = (loanID) => {
    return getData(`transaction/loan/details/${loanID}`)
        .then(data => data.json())
};

const getTypeOfLoans = () => {
    return getData('transaction/typeofloans/list')
        .then(data => data.json())
};

const downloadComputation = (memberKey, transactData) => {
    let fileName = "";
    var detail = prepData(memberKey, null, transactData);
    return postData(`transaction/calculation?memberKey=${memberKey}&amount=${transactData.Amount}`, detail)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            let contentDisposition = response.headers.get("Content-Disposition");
            fileName = contentDisposition.substring(
                contentDisposition.indexOf("filename=\"") + 10,
                contentDisposition.lastIndexOf(".xlsx\";")
            );;
            return response.blob();
        })
        .then(blob => {
            downloadFile(blob, `Computation - ${fileName}.xlsx`);
            return fileName;
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
    downloadComputation,
    getLoanPaymentDetails,
    getTypeOfLoans
};