import moment from 'moment';

function FormatDateTime(date) {
    if (date === "" || date === null || date === undefined) {
        return "";
    } else {
        return moment(date).format('MM/DD/YYYY hh:mm:ss A');
    }
};
function FormatDate(date) {
    if (date === "" || date === null || date === undefined) {
        return "";
    } else {
        return moment(date, "DD/MM/YYYY").format('MM/DD/YYYY');
    }
};

export {
    FormatDateTime,
    FormatDate
};