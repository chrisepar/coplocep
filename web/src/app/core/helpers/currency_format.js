function GetCurrency(culture, currency, value) {
    return new Intl.NumberFormat(culture, { style: 'currency', currency: currency }).format(value);
};

function Peso(value) {
    return GetCurrency("en-US", "PHP", value);
};

export {
    GetCurrency,
    Peso
};