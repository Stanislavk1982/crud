function showAllUser() {
    document.getElementById("container1").innerHTML = "";
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var tr = document.createElement('tr');
    var keys1 = Object.keys(users[0]);
    for (var j = 0; j < keys1.length + 1; j++) {
        var td = document.createElement('td');
        if (j == 5) {
            td.innerHTML = "";
        } else {
            td.innerHTML = keys1[j];
        }
        tr.appendChild(td);
    }
    thead.appendChild(tr);


    for (var i = 0; i < users.length; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 6; j++) {
            var keys1 = Object.keys(users[0]);
            var td = document.createElement('td');
            var value1 = keys1[j];
            if (j == 5) {
                showButtons(td, buttonsToShow, i);
            } else {
                td.innerHTML = users[i][value1];
            }
            if (j == 0) {
                td.onclick = editBtnHandler;
                td.setAttribute('index', i);
            }
            var buttonsToShow = {
                editBtn: true,
                removeBtn: true
            };
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }
    table.appendChild(thead);
    table.appendChild(tbody);
    table.setAttribute("class", "table table-bordered");
    document.getElementById("container1").appendChild(table);
    var buttonsToShow = {newBtn: true};
    showButtons(document.getElementById("container1"), buttonsToShow, -1);
    hideEditForm("none");
    hideNewUserForm("none");
}

function showButtons(parent, buttonsObj, index) {
    var buttons = document.createElement('div');

    for (var value in buttonsObj) {
        if (allButtons[value]) {
            var createdBtn = createButton(allButtons[value].classList,
                allButtons[value].value,
                index,
                allButtons[value].handler);

            buttons.appendChild(createdBtn);
        }
    }

    parent.appendChild(buttons);
}

function createButton(classList, value, index, handler) {
    var btn = document.createElement('input');
    btn.setAttribute('type', 'button');
    btn.className = classList;
    btn.setAttribute('value', value);
    btn.setAttribute('index', index);
    btn.onclick = handler;

    return btn;

}

function editBtnHandler(event) {
    hideEditForm("block");
    hideNewUserForm("none");
    var elem = event.target;
    var index = elem.getAttribute('index');
    var parent = document.getElementById('editForm');
    parent.setAttribute("class", "form-group")
    showInputs(parent, index, "edit");

}

function showInputs(parent, index, attr) {
    var userObj = users[index];
    if (attr == "edit") {
        for (var userKey in userObj) {
            createInput(parent, userObj[userKey], userKey, 'text');
        }
    }
    else {
        for (var userKey in users[0]) {
            createInput(parent, "", userKey, 'text');
        }
    }

    var div = document.createElement('div');
    var buttonsToShow = {
        saveBtn: true,
        backBtn: true
    };
    showButtons(div, buttonsToShow, index);
    parent.appendChild(div);
}

function createInput(parent, value, name, type) {
    var div = document.createElement('div');
    div.setAttribute("class", "form-group");
    //div.setAttribute('name', name);
    var input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute("class", "form-group");
    input.setAttribute('value', value);
    input.setAttribute('id', name);
    input.setAttribute('name', name);
    input.setAttribute("placeholder", name);

    var label = document.createElement('label');
    label.setAttribute("type", type);
    label.setAttribute("for", name);
    label.setAttribute("class", "form-group");
    label.innerHTML = name;

//    parent.appendChild(label);
//    parent.appendChild(input);
    div.appendChild(label);
    div.appendChild(input);
    parent.appendChild(div);


}

function saveUser(event) {

    var elem = event.target;
    var index = elem.getAttribute('index');
    var incorrectInput = 0;
    var newUser = new Object();
    var formElements;
    if (index != -1) {
        formElements = document.forms.editForm.elements;
        var currentUser = users[index];
        for (var i = 0; i < formElements.length; i++) {
            var name = formElements[i].name;
            if (!name || !currentUser[name]) {
                continue;
            } else {
                formElements[i].style.background = 'none';
            }
            console.log(" Start Save formElements[i].value:" + formElements[i].value)
            newUser[name] = formElements[i].value;
            if (!isValidData(name, formElements[i].value)) {
                incorrectInput++;
                formElements[i].style.background = 'red';
                console.log("incorrectData:" + formElements[i].name + ":" + formElements[i].value);
            }
        }

    } else {
        hideNewUserForm("block");
        var formElements = document.forms.newUserForm.elements;

        for (var i = 0; i < formElements.length; i++) {
            var name = formElements[i].name;
            console.log("name" + name);
            if (!name) {
                continue;
            }
            newUser[name] = formElements[i].value;
            console.log("formElements[i].name.value"+formElements[i].value)
            if (!isValidData(name, formElements[i].value)) {
                incorrectInput++;
                formElements[i].style.background = 'red';
                console.log("incorrectData:" + formElements[i].name + ":" + formElements[i].value);
            }
        }
        //users.splice(users.length, 0, newUser);
    }
    console.log("incorrectInput:" + incorrectInput);
    if (incorrectInput == 0) {
        if (index != -1) {
            users[index] = newUser;
        }
        else {
            users[users.length] = newUser;
        }

        console.log("index in the end" + index);
        hideEditForm("none");
        hideNewUserForm("none");
        showAllUser();
    }
}


function confirmDelete(event) {
    var viewUserDetails = event.target;
    var index = viewUserDetails.getAttribute("index");
    console.log("users[index][login].value:" + users[index].login + ":index:" + index);
    document.getElementById("delUserP1").innerHTML="Do you really want delete user: " + users[index].login;
    document.getElementById("btnConfirmDelete").setAttribute('index', index);
    document.getElementById("btnConfirmDelete").onclick=deleteUser;
    $(document).ready(function() {
        $("#confirmDelete").modal('show');
    });
}

function deleteUser(event) {
    var viewUserDetails = event.target;
    var index = viewUserDetails.getAttribute("index");
    users.splice(index, 1);
    showAllUser();
}

function hideEditForm(show) {
    if (show == "none") {
        document.getElementById('editForm').innerHTML = '';
    }
    document.getElementById('editState').style.display = show;
}

function hideNewUserForm(show) {
    if (show == "none") {
        document.getElementById('newUserForm').innerHTML = '';
    }
    document.getElementById('newUser').style.display = show;

}


function creatNewUser(event) {
    hideNewUserForm("block");
    hideEditForm("none")
    var elem = event.target;
    var index = elem.getAttribute('index');
    var parent = document.getElementById('newUserForm');
    showInputs(parent, index, "new");
}

function isValidData(name, value) {
    switch (name) {
        case "login":
            return /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/.test(value);
            break;
        case "name":
            return /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u.test(value);
            break;
        case "email":
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(value);
            break;
        case "dateOfBirth":
            return /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/.test(value);
            break;
        case "tel":
            return /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(value);
            break;
    }


}