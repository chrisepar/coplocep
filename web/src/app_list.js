
import appDetails from '_appDetails.js';
import MemberDetailView from "app/membership/member_detail_view.js";
import Membership from "app/membership/members_list.js";
import Transaction from "app/transaction/transaction_list.js";
import TransactionDetailView from "app/transaction/transaction_detail_view.js";

export default [
    {
        "id": "addMembership",
        "name": "Member Details",
        "navLabel": "Add New Member",
        "component": MemberDetailView,
        "hasDetail": true,
        "path": appDetails.baseRoute + "/membership/:detailID",
        "navPath": appDetails.baseRoute + "/membership/~"
    },
    {
        "id": "membership",
        "name": "Membership",
        "navLabel": "Membership",
        "component": Membership,
        "hasDetail": true,
        "path": appDetails.baseRoute + "/membership"
    },
    {
        "id": "addLoan",
        "name": "Loan Details",
        "component": TransactionDetailView,
        "hasDetail": true,
        "path": appDetails.baseRoute + "/loans/:detailID"
    },
    {
        "id": "loans",
        "name": "Loans",
        "navLabel": "Loans",
        "component": Transaction,
        "hasDetail": true,
        "path": appDetails.baseRoute + "/loans"
    }
];