function Slot({
    _text = "Available to join",
    _slotTaken = false,
    _contestantId = ""
}) {
    this.m_text = _text;
    this.m_slotTaken = _slotTaken;
    this.m_constestantId = _contestantId;
}

function MemberSlot({
    _numberOfTeam = NUMBER_OF_TEAM,
    _numberOfMemberEachTeam = NUMBER_MEMBER_EACH_TEAM
}) {
    this.m_data = generateDefaultMemeberSlot(_numberOfTeam, _numberOfMemberEachTeam);
}

function generateDefaultMemeberSlot(numberOfTeam, numberOfMemberEachTeam) {
    let result = [];
    for (let i = 0; i < numberOfTeam; i++) {
        result[i] = [];
        for (let j = 0; j < numberOfMemberEachTeam; j++) {
            result[i][j] = new Slot({});
        }
    }
    return result;
}

function createMemberSlotFromCache(data) {
    let result = [];
    for (let i = 0, numberOfTeam = data.length; i < numberOfTeam; i++) {
        result[i] = [];
        for (let j = 0, numberOfMemberEachTeam = data[i].length; j < numberOfMemberEachTeam; j++) {
            result[i][j] = new Slot({
                _text: data[i][j].m_text,
                _slotTaken: data[i][j].m_slotTaken,
                _contestantId: data[i][j].m_constestantId
            });
        }
    }
    return result;
}

MemberSlot.prototype.assignMatrixSlot = function({
    _team,
    _memberOrder,
    _newText,
    _contestantId
}) {
    let slot = this.m_data[_team - 1][_memberOrder - 1];

    if (!slot) {
        console.log(`Slot ${_team}-${_memberOrder} is not found`);
        return false;
    }

    if (slot.m_slotTaken) {
        alert("This spot is taken");
        return false;
    }

    let constestantJoinStatus = this.find(function(slot) {
        return slot.m_constestantId === _contestantId;
    });

    if (constestantJoinStatus) { // did join;
        alert("You've already signed up");
        return false;
    }

    slot.m_text = _newText;
    slot.m_slotTaken = true;
    slot.m_constestantId = _contestantId;

    this.m_data[_team - 1][_memberOrder - 1] = slot;
    return true;
}

MemberSlot.prototype.assignWithSignUpInfo = function(team, memberOrder, signUpInfo) {
    return this.assignMatrixSlot({
        _team: team,
        _memberOrder: memberOrder,
        _newText: signUpInfo.m_name,
        _contestantId: signUpInfo.m_id
    })
}

MemberSlot.prototype.getSlot = function(team, memberOrder) {
    return this.m_data[team - 1][memberOrder - 1];
}

MemberSlot.prototype.isTaken = function(team, memberOrder) {
    let slot = this.m_data[team - 1][memberOrder - 1];
    if (!slot) {
        console.log(`Slot ${team}-${memberOrder} is not found`);
        return false;
    }

    return slot.m_slotTaken;
}

MemberSlot.prototype.find = function(filterFunction) {
    for (let i = 0, numberOfTeam = this.m_data.length; i < numberOfTeam; i++) {
        for (let j = 0, numberOfMemberEachTeam = this.m_data[i].length; j < numberOfMemberEachTeam; j++) {
            if (filterFunction(this.m_data[i][j])) {
                return this.m_data[i][j];
            }
        }
    }
    return null;
}
