
import appDetails from '_appDetails.js';
import MemberDetailView from "app/membership/member_detail_view.js";
import Membership from "app/membership/members_list.js";
import Loans from "app/loans/loans_list.js";

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
        "navLabel": "Add New Loan",
        "component": Loans,
        "hasDetail": true,
        "path": appDetails.baseRoute + "/loans/:detailID",
        "navPath": appDetails.baseRoute + "/loans/~"
    },
    {
        "id": "loans",
        "name": "Loans",
        "navLabel": "Loans",
        "component": Loans,
        "hasDetail": true,
        "path": appDetails.baseRoute + "/loans"
    }
];