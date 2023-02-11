function ContactEntity({
    _name,
    _email,
    _message
}) {
    this.m_name = _name;
    this.m_email = _email;
    this.m_message = _message;
    this.m_createdDate = new Date();
}


ContactEntity.prototype.isValid = function() {
    if (isEmpty(this.m_name)) {
        throw new Error("Missing name");
    }

    if (isEmpty(this.m_email)) {
        throw new Error("Missing email");
    }

    if (isEmpty(this.m_message)) {
        throw new Error("Missing message");
    }

    if (!isEmail(this.m_email)) {
        throw new Error("Invalid email");
    }
    return true;
}

ContactEntity.prototype.toString = function() {
    return `${this.m_createdDate} - From: ${this.m_name}: ${this.m_message}`;
}
