class Contestant {
    constructor({
        _id = generateId(),
        _studentId,
        _firstName,
        _lastName,
        _gender,
        _dob,
        _experience,
        _reason,
        _other,
        _createdDate = new Date(),
        _team,
        _member
    }) {
        this.m_id = _id;
        this.m_studentId = _studentId;
        this.m_firstName = _firstName;
        this.m_lastName = _lastName;
        this.m_gender = _gender;
        this.m_dob = _dob;
        this.m_experience = _experience;
        this.m_reason = _reason;
        this.m_other = _other;
        this.m_createdDate = _createdDate;
        this.m_team = _team;
        this.m_member = _member;
    }
    
    getId() {
        return this.m_id;
    }
    
}


Contestant.prototype.isValid = function() {

    if (isEmpty(this.m_id)) {
        throw new Error("Missing ID");
    }

    if (isEmpty(this.m_studentId)) {
        throw new Error("Missing studentId");
    }

    if (isEmpty(this.m_firstName)) {
        throw new Error("Missing firstName");
    }

    if (isEmpty(this.m_lastName)) {
        throw new Error("Missing lastName");
    }

    if (isEmpty(this.m_gender)) {
        throw new Error("Missing gender");
    }

    if (isEmpty(this.m_dob)) {
        throw new Error("Missing DOB");
    }

    if (isEmpty(this.m_experience)) {
        throw new Error("Missing experience");
    }

    if (isEmpty(this.m_reason)) {
        throw new Error("Missing reason");
    }

    const dobAsDate = parseDate(this.m_dob);
    const today = new Date();

    if (dobAsDate > today) {
        throw new Error("DOB is greater than the current day");
    }

    let age = today.getFullYear() - dobAsDate.getFullYear();
    let m = today.getMonth() - dobAsDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobAsDate.getDate())) {
        age--;
    }

    if (age < 18) {
        throw new Error("At least 18 years old");
    }

    return true;
}

Contestant.prototype.toString = function() {
    return `${this.m_createdDate}: ${this.m_firstName}, ${this.m_lastName}`;
}

