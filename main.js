const signUpStorage = new Storage("sign-up-data", JSON.parse(getValueFromCache("sign-up-data")));
const contactStorage = new Storage("contact-data", JSON.parse(getValueFromCache("contact-data")));
let signUpEntity;
let currentSignUpEntity;

function handleSignUp(e) {
    handleInputTemplate(e, function(_) {
         signUpEntity = new Contestant({
            _studentId: getValueFromInputElement("sID"),
            _firstName: getValueFromInputElement("firstName"),
            _lastName: getValueFromInputElement("lastName"),
            _gender: getValueFromInputElement("gender"),
            _dob: getValueFromInputElement("birthday"),
            _experience: getValueFromInputElement("background"),
            _reason: getValueFromInputElement("reason"),
            _other: getValueFromInputElement("extra"),
            _team: null,
            _member: null,
        });

        if (signUpEntity.isValid()) {
            signUpStorage.add(signUpEntity);
            currentSignUpEntity = signUpEntity;
            alert("Sign up sucessful!");
            signUpStorage.saveToCache();
        }
    })
}

function handleContact(e) {
    handleInputTemplate(e, function(_) {
        let contact = new ContactEntity({
            _name: getValueFromInputElement("name"),
            _email: getValueFromInputElement("email"),
            _message: getValueFromInputElement("message")
        });

        if (contact.isValid()) {
            contactStorage.add(contact);
            alert("Received your message!")
            contactStorage.saveToCache();
        }
    })
}

function handleSignUpListBtn(_) {
    show("sign-up-list", signUpStorage, function(model) {
        return `${model.m_createdDate}: Name - ${model.m_firstName} ${model.m_lastName}, DOB: ${model.m_dob}`;
    });
}

function handleContactListBtn(_) {
    show("contact-list", contactStorage, function(model) {
        return `${model.m_createdDate} - From ${model.m_name} - ${model.m_email}: ${model.m_message}`;
    });
}

function show(elementId, storage, toStringFunction) {
    storage.syncWithCache();
    let rootElement = getElement(elementId);
    rootElement.innerHTML = "";

    const data = storage.getAll();
    data.forEach(function(dataAsString, index) {
        let liElement = document.createElement("li");
        liElement.setAttribute("id", elementId + "-" + index);
        liElement.innerText = toStringFunction(dataAsString);

        rootElement.appendChild(liElement);
    });
}

function handleInputTemplate(e, handleFunction) {
    e.preventDefault();
    try {
        handleFunction(e);
    } catch (e) {
        console.log(e);
        alert(e.message);
    }
}

function initMatrix() {
    drawMatrixTo("join-a-team-content");
    for (let memberOrder = 1; memberOrder <= NUMBER_MEMEBER_EACH_TEAM; memberOrder++) {
        for (let team = 1; team <= NUMBER_OF_TEAM; team++) {
            addEventToSlot({
                _team: team,
                _memberOrder: memberOrder,
                _handleFunction:
                    function() {
                        alert(`click on slot: team-${team}-member-${memberOrder}`);

                        if (currentSignUpEntity.getId != null && getMatrixSlot(team, memberOrder) == "Available to join") {
                            // Enter names onto team page
                            currentSignUpEntity.assignTeam(team, memberOrder);
                            getElement("team-"+team+"-member-"+memberOrder).innerText = 
                                currentSignUpEntity.m_name;
                            
                        }
                    }
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", function(_) {
    initMatrix();
    getElement("sign-up-btn").addEventListener("click", handleSignUp);
    getElement("contact-us-btn").addEventListener("click", handleContact);

    getElement("sign-up-list-btn").addEventListener("click", handleSignUpListBtn);
    getElement("contact-list-btn").addEventListener("click", handleContactListBtn);
});
