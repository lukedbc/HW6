class Storage {
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

    getName() {
        return this.m_firstName + " " + this.m_lastName;
    }
    
    assignTeam(team, memberOrder) {
        this.m_team = team;
        this.m_member = memberOrder;
        assignMatrixSlot(this.m_firstName + " " + this.m_lastName, team, memberOrder);
    }

    getTeam() {
        return this.m_team;
    }

    getMember() {
        return this.m_member;
    }
    
    publishSignatureDish() {
        
    }
}

// function Storage(_name, _data) {
//     this.m_name = _name;
//     if (!_data) {
//         this.m_data = [];
//     } else {
//         this.m_data = _data;
//     }
// }

// Storage.prototype.getAll = function() {
//     return this.m_data;
// }

// Storage.prototype.getName = function() {
//     return this.m_name;
// }

// Storage.prototype.add = function(value) {
//     this.m_data.push(value);
// }

// Storage.prototype.saveToCache = function() {
//     putValueToCache(this.m_name, JSON.stringify(this.m_data));
// }

// Storage.prototype.syncWithCache = function() {
//     let cache = getValueFromCache(this.m_name);
//     if (cache) {
//         this.m_data = JSON.parse(cache);
//     } else {
//         this.m_data = [];
//     }
// }

// Storage.prototype.clearAll = function() {
//     m_data = [];
// }
