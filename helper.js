function getElement(elementId) {
    return document.getElementById(elementId);
}

function getValueFromInputElement(elementId) {
    return getElement(elementId).value;
}

function parseStringToFloat(stringValue) {
    if (isNaN(stringValue)) {
        throw new Error(stringValue + " is not a number");
    }
    return parseFloat(stringValue);
}

function generateId() {
    return "id_" + Math.random().toString(16).slice(2);
}

function isEmpty(value) {
    return !value || value.length === 0;
}

function parseDate(value) {
    return new Date(value);
}

function getValueFromCache(key) {
    return localStorage.getItem(key);
}

function putValueToCache(key, value) {
    localStorage.setItem(key, value);
}

function isEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

