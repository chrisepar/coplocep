import field_types from 'app/core/fields/field_types.js';
import isEmpty from "app/core/helpers/is_empty.js";
import { FormatDateTime } from 'app/core/helpers/date_format.js';

export default (fieldType, value) => {
    switch (fieldType) {
        case field_types.text_field:
            return isEmpty(value) ? "" : value;
        case field_types.number_field:
            return isEmpty(value) ? "" : value;
        case field_types.date_field:
            return isEmpty(value) ? null : FormatDateTime(value);
        default:
            return "";
    }
};