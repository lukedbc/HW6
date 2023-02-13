const NUMBER_OF_TEAM = 3;
const NUMBER_MEMEBER_EACH_TEAM = 5;
let memberSlot = [
    ["Available to join", "Available to join", "Available to join", "Available to join", "Available to join"],
    ["Available to join", "Available to join", "Available to join", "Available to join", "Available to join"],
    ["Available to join", "Available to join", "Available to join", "Available to join", "Available to join"]
];

function drawMatrixTo(elementId) {
    let element = getElement(elementId);
    let table = document.createElement("table");
    table.setAttribute("id", "spreadsheet");

    // draw team row
    let teamRow = document.createElement("tr");
    teamRow.setAttribute("id", "row-team");
    for (let i = 1; i <= NUMBER_OF_TEAM; i++) {
        let th = document.createElement("th");
        th.setAttribute("id", "team-" + i);
        th.innerText = "Team " + i;

        teamRow.appendChild(th);
    }
    table.appendChild(teamRow);

    for (let i = 1; i <= NUMBER_MEMEBER_EACH_TEAM; i++) {
        let row = document.createElement("tr");
        for (let j = 1; j <= NUMBER_OF_TEAM; j++) {
            let td = document.createElement("td");
            td.setAttribute("id", "team-" + j + "-member-" + i);

            
            td.innerText = memberSlot[j - 1][i - 1];
            
            row.appendChild(td);
        }


        table.appendChild(row);
    }

    element.appendChild(table);
}

function assignMatrixSlot(name, team, memberOrder) {
    memberSlot[team][memberOrder] = name;
}

function getMatrixSlot(team, memberOrder) {
    return memberSlot[team][memberOrder];
}

function addEventToSlot({
    _team,
    _memberOrder,
    _handleFunction
}) {
    let slot = getElement("team-" + _team + "-member-" + _memberOrder);

    if (!slot) {
        throw new Error("Slot not found");
    }

    slot.addEventListener("click", _handleFunction);
}
