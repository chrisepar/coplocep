
import appDetails from '_appDetails.js';
import MemberDetailView from "app/membership/member_detail_view.js";
import Membership from "app/membership/members_list.js";
import Transaction from "app/transaction/transaction_list.js";
import TransactionDetailView from "app/transaction/transaction_detail_view.js";
import Settings from "app/settings/settings_view.js";
import Reports from "app/reports/reports_view.js";

export default [
    {
        "id": "Reports",
        "name": "Reports",
        "navLabel": "Reports",
        "component": Reports,
        "hasDetail": true,
        "path": appDetails.baseRoute + "/Reports"
    },
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
        "id": "addTransaction",
        "name": "Transaction Details",
        "component": TransactionDetailView,
        "hasDetail": true,
        "path": appDetails.baseRoute + "/transaction/:detailID"
    },
    {
        "id": "transaction",
        "name": "Transaction",
        "navLabel": "Transaction",
        "component": Transaction,
        "hasDetail": true,
        "path": appDetails.baseRoute + "/transaction"
    },
    {
        "id": "settings",
        "name": "Settings",
        "navLabel": "Settings",
        "component": Settings,
        "hasDetail": true,
        "path": appDetails.baseRoute + "/settings"
    }
];