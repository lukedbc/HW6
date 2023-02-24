const authorizeUrl = ["#join-a-team", "#signature-dishes", "#dashboard"]
const signUpStorage = new Storage("sign-up-data", JSON.parse(getValueFromCache("sign-up-data")));
const contactStorage = new Storage("contact-data", JSON.parse(getValueFromCache("contact-data")));
const dishStorage = new Storage("dish-data", JSON.parse(getValueFromCache("dish-data")));

const memberSlotStorage = new Storage("member-slot-data", new MemberSlot({
    _numberOfTeam: NUMBER_OF_TEAM,
    _numberOfMemberEachTeam: NUMBER_MEMBER_EACH_TEAM
}));

let currentSignUpEntity;
let signInFlag = false;

function toggleContent({ show }) {
    if (show === true) {
        getElement("join-a-team-content").style = "display: block;";
        getElement("signature-dishes-content").style = "display: block;";
        getElement("dashboard-content").style = "display: block;";
    } else {
        getElement("join-a-team-content").style = "display: none;";
        getElement("signature-dishes-content").style = "display: none;";
        getElement("dashboard-content").style = "display: none;";
    }
}

function displayUserInfo() {
    let divs = document.querySelectorAll(".signInInfo");
    divs.forEach(function(element) {
        if (currentSignUpEntity) {
            element.innerHTML = "Your name: " + currentSignUpEntity.getName();
        }
    })
}

function handleSignUp(e) {
    handleInputTemplate(e, function(_) {
        let signUpEntity = new Contestant({
            _studentId: getValueFromInputElement("sID"),
            _firstName: getValueFromInputElement("firstName"),
            _lastName: getValueFromInputElement("lastName"),
            _gender: getValueFromInputElement("gender"),
            _dob: getValueFromInputElement("birthday"),
            _experience: getValueFromInputElement("background"),
            _reason: getValueFromInputElement("reason"),
            _other: getValueFromInputElement("extra"),
        });

        if (signUpEntity.isValid()) {
            signUpStorage.add(signUpEntity);
            currentSignUpEntity = signUpEntity;
            signInFlag = true;
            alert("Sign up sucessful!");
            signUpStorage.saveToCache();
            toggleContent({ show: true });
            getElement("dish-display").innerHTML = "";

            window.location = "#join-a-team";
        }
    })
}

function handleAddDish(e) {
    handleInputTemplate(e, function(_) {
        let dish = new ContactDish({
            _contestantId: currentSignUpEntity.getId(),
            _title: getValueFromInputElement("title"),
            _picture: getValueFromInputElement("picture"),
            _difficulty: getValueFromInputElement("dishes-difficulty"),
            _description: getValueFromInputElement("description"),
            _recipe: getValueFromInputElement("recipe")
        });

        if (dish.isValid()) {
            dishStorage.add(dish);
            dishStorage.saveToCache();
            alert("Your signature dish has been published!");

            getElement("title").value = "";
            getElement("picture").value = "";
            getElement("dishes-difficulty").value = "";
            getElement("description").value = "";
            getElement("recipe").value = "";
        }
    })
}

function handleShowDish(_) {
    dishStorage.syncWithCache();
    let dishesByUser = dishStorage.filter(function(dish) {
        return dish.m_contestantId === currentSignUpEntity.m_id;
    });

    let gallery = getElement("dish-display");
    gallery.innerHTML = "";
    dishesByUser.forEach(function(dish) {
        let div = document.createElement("div");
        div.setAttribute("id", "dish-" + dish.m_id);
        div.setAttribute("data-rel", "popup");
        div.setAttribute("data-transition", "pop");
        div.innerHTML = `
            <a href="#image-pop-up" data-rel="popup" 
                class="ui-btn ui-corner-all ui-shadow ui-btn-inline" 
                data-position-to="window"
                data-transition="pop">
                <img src=${dish.m_picture} id="img-dish-${dish.m_id} width='400' height='300'"/>
            </a>
        `
        div.addEventListener("click", function(e) {
            getElement("one_dish_title").value = dish.m_title;
            getElement("one_dish_difficulty").value = dish.m_difficulty;
            getElement("one_dish_description").value = dish.m_description;
            getElement("one_dish_recipe").value = dish.m_recipe;
        });
        gallery.appendChild(div);
    });
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
            alert("Received your message!");
            contactStorage.saveToCache();
        }
    })
}

function handleSignIn(e) {
    handleInputTemplate(e, function(_) {

        let signIn = {
            _studentId: getValueFromInputElement("si_sID"),
            _firstName: getValueFromInputElement("si_firstName"),
            _lastName: getValueFromInputElement("si_lastName")
        };

        let signInFromCache = signUpStorage.find(function(signUp) {
            return signUp.m_studentId === signIn._studentId;
        });

        if (signInFromCache
            && signInFromCache.m_firstName === signIn._firstName
            && signInFromCache.m_lastName === signIn._lastName) {
            currentSignUpEntity = makeContestantFromCache(signInFromCache);

            signInFlag = true;
            window.location = "#join-a-team";
            return;
        }
        alert("No Registration Record Found");
    });
}

function fillSignInInfoToPopup(model) {
    getElement("one_sID").value = model.m_studentId;
    getElement("one_firstName").value = model.m_firstName;
    getElement("one_lastName").value = model.m_lastName;
    getElement("one_major").value = model.m_major; getElement("one_gender").value = model.m_gender;
    getElement("one_birthday").value = model.m_dob;
    getElement("one_background").value = model.m_experience;
    getElement("one_reason").value = model.m_reason;
    getElement("one_extra").value = model.m_other;
}

function fillContactToPopup(model) {
    getElement("one_name").value = model.m_name;
    getElement("one_email").value = model.m_email;
    getElement("one_message").value = model.m_message;
}

function handleSignUpListBtn(_) {
    show("sign-up-list", signUpStorage, "popup-sign-in-info", function(model) {
        return `${model.m_createdDate}: Name - ${model.m_firstName} ${model.m_lastName}, DOB: ${model.m_dob}`;
    }, function(model) {
        fillSignInInfoToPopup(model);
    });
}

function handleContactListBtn(_) {
    show("contact-list", contactStorage, "popup-contact-info", function(model) {
        return `${model.m_createdDate} - From ${model.m_name} - ${model.m_email}: ${model.m_message}`;
    }, function(model) {
        fillContactToPopup(model);
    });
}

function show(elementId, storage, popupId, toStringFunction, clickHandleFunction) {
    storage.syncWithCache();
    let rootElement = getElement(elementId);
    rootElement.innerHTML = "";

    const data = storage.getAll();
    data.forEach(function(dataAsString, index) {
        let liElement = document.createElement("li");
        liElement.setAttribute("id", elementId + "-" + index);
        liElement.setAttribute("data-rel", "popup");
        liElement.setAttribute("data-transition", "pop");
        liElement.innerHTML = `
            <a href="#${popupId}" data-rel="popup" 
                class="ui-btn ui-corner-all ui-shadow ui-btn-inline" 
                data-position-to="window"
                data-transition="pop">
            ${toStringFunction(dataAsString)}
            </a>
        `
        liElement.addEventListener("click", function(_) {
            clickHandleFunction(dataAsString);
        });

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

    drawMatrixTo("join-a-team-content-matrix");
    // sync cache 
    memberSlotStorage.syncWithCacheByConverter(function(rawStorage) {
        let data = createMemberSlotFromCache(rawStorage.m_data);
        let memberSlot = new MemberSlot({});
        memberSlot.m_data = data;
        return memberSlot;
    });

    if (memberSlotStorage.getAll().length === 0) {
        memberSlotStorage.assignData(new MemberSlot({
            _numberOfTeam: NUMBER_OF_TEAM,
            _numberOfMemberEachTeam: NUMBER_MEMBER_EACH_TEAM
        }));
    }

    // update matrix with new data
    updateWithMemberSlot(memberSlotStorage.getAll());

    for (let memberOrder = 1; memberOrder <= NUMBER_MEMBER_EACH_TEAM; memberOrder++) {
        for (let team = 1; team <= NUMBER_OF_TEAM; team++) {
            addEventToSlot({
                _team: team,
                _memberOrder: memberOrder,
                _handleFunction:
                    function() {
                        let memberSlot = memberSlotStorage.getAll();

                        if (memberSlot.assignWithSignUpInfo(team, memberOrder, currentSignUpEntity)) {
                            getElement("team-" + team + "-member-" + memberOrder).innerText =
                                currentSignUpEntity.m_name;
                            alert("Sign up successful!");
                            // save to cache
                            memberSlotStorage.assignData(memberSlot); // override all old data;
                            memberSlotStorage.saveToCache();
                        }
                    }
            });
        }
    }
}


function checkSignInStatus() {
    let url = window.location.href;
    if (signInFlag === true) {
        displayUserInfo();
    }
    let match = authorizeUrl.find(_url => url.endsWith(_url));
    if (match && signInFlag === false) {
        alert("You must sign in first");
        toggleContent({ show: false });
        return;
    }
    if (match && signInFlag === true) {
        toggleContent({ show: true });
        if (match !== "#signature-dishes") {
            getElement("dish-display").innerHTML = "";
        }
        return;
    }
}

document.addEventListener("DOMContentLoaded", function(_) {
    checkSignInStatus();
    initMatrix();
    getElement("sign-up-btn").addEventListener("click", handleSignUp);
    getElement("sign-in-btn").addEventListener("click", handleSignIn);
    getElement("contact-us-btn").addEventListener("click", handleContact);

    getElement("sign-up-list-btn").addEventListener("click", handleSignUpListBtn);
    getElement("contact-list-btn").addEventListener("click", handleContactListBtn);

    getElement("add-recipe-btn").addEventListener("click", handleAddDish);
    getElement("your-dishes-btn").addEventListener("click", handleShowDish);
});

window.addEventListener("hashchange", function(_) {
    checkSignInStatus();
})
