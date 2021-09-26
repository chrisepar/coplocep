
import appDetails from '_appDetails.js';
import MemberDetailView from "app/membership/member_detail_view.js";
import Membership from "app/membership/members_list.js";
import Transaction from "app/transaction/transaction_list.js";
import TransactionDetailView from "app/transaction/transaction_detail_view.js";
import Settings from "app/settings/settings_view.js";
import Reports from "app/reports/reports_view.js";

// icons
import AssessmentIcon from '@material-ui/icons/Assessment';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ReceiptIcon from '@material-ui/icons/Receipt';
import SettingsIcon from '@material-ui/icons/Settings';

export default [
    {
        "id": "Reports",
        "name": "Reports",
        "navigation": {
            "label": "Reports",
            "icon": AssessmentIcon
        },
        "component": Reports,
        "hasDetail": true,
        "path": appDetails.baseRoute + "/Reports"
    },
    {
        "id": "addMembership",
        "name": "Member",
        "navigation": {
            "label": "New Member",
            "icon": PersonAddIcon,
            "path": appDetails.baseRoute + "/membership/~"
        },
        "component": MemberDetailView,
        "hasDetail": true,
        "path": appDetails.baseRoute + "/membership/:detailID"
    },
    {
        "id": "membership",
        "name": "Membership",
        "navigation": {
            "label": "Membership",
            "icon": PeopleAltIcon
        },
        "component": Membership,
        "hasDetail": true,
        "path": appDetails.baseRoute + "/membership"
    },
    {
        "id": "addTransaction",
        "name": "Transaction",
        "component": TransactionDetailView,
        "hasDetail": true,
        "path": appDetails.baseRoute + "/transaction/:detailID"
    },
    {
        "id": "transaction",
        "name": "Transaction",
        "navigation": {
            "label": "Transaction",
            "icon": ReceiptIcon
        },
        "component": Transaction,
        "hasDetail": true,
        "path": appDetails.baseRoute + "/transaction"
    },
    {
        "id": "settings",
        "name": "Settings",
        "navigation": {
            "label": "Settings",
            "icon": SettingsIcon
        },
        "component": Settings,
        "hasDetail": true,
        "path": appDetails.baseRoute + "/settings"
    }
];