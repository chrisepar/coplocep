import moment from 'moment';

function FormatDateTime(date) {
    if (date === "" || date === null || date === undefined) {
        return null;
    } else {
        return moment(date).format('MM/DD/YYYY hh:mm:ss A');
    }
};
function FormatDate(date) {
    if (date === "" || date === null || date === undefined) {
        return null;
    } else {
        return moment(date, "DD/MM/YYYY").format('MM/DD/YYYY');
    }
};

function FormatDateToISO(date) {
    if (date === "" || date === null || date === undefined) {
        return null;
    } else {
        return moment(date, "DD/MM/YYYY");
    }
};

function FormatDateFromISO(date) {    
    if (date === "" || date === null || date === undefined) {
        return null;
    } else {
        return moment(date).format('MM/DD/YYYY');
    }
};

export {
    FormatDateTime,
    FormatDate,
    FormatDateToISO,
    FormatDateFromISO
};