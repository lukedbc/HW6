// import java.awt.Color;
const NUMBER_OF_TEAM = 3;
const NUMBER_MEMBER_EACH_TEAM = 5;

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
        th.style.backgroundColor = "#93278f";

        teamRow.appendChild(th);
    }
    table.appendChild(teamRow);

    for (let i = 1; i <= NUMBER_MEMBER_EACH_TEAM; i++) {
        let row = document.createElement("tr");
        for (let j = 1; j <= NUMBER_OF_TEAM; j++) {
            let td = document.createElement("td");
            td.setAttribute("id", "team-" + j + "-member-" + i);
            td.innerText = "Available to join";
            td.style.backgroundColor = "#1e2224";

            row.appendChild(td);
        }

        table.appendChild(row);
    }
    
    element.appendChild(table);
}

function updateWithMemberSlot(memberSlot) {
    const data = memberSlot.m_data;
    for (let i = 0, numberOfTeam = data.length; i < numberOfTeam; i++) {
        for (let j = 0, numberOfMemberEachTeam = data[i].length; j < numberOfMemberEachTeam; j++) {
            getElement("team-" + (i + 1) + "-member-" + (j + 1)).innerText = data[i][j].m_text;
        }
    }
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
