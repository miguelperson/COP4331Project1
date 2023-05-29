// table of contents:
// -form/option buttons / declarations
// -searching functions / event listeners
// -adding functions / event listeners
// -editing functions / event listeners
// -removing functions / event listeners
// -logging off functions / event listeners


// form/option buttons
const addContactButton = document.getElementById("addContactButton");
const addContactFormButton = document.getElementById("addContactFormButton");
const closeAddContactButton = document.getElementById("addContactCloseButton");

const editContactCloseButton = document.getElementById('editContactCloseButton');
const editContactFormButton = document.getElementById('editContactFormButton');

const cancelButton = document.getElementById('cancelButton');
const removeContactFormButton = document.getElementById('removeContactFormButton');

const logoutButton = document.getElementById('logoutButton');

// selected table row for edit/delete
var selectedRow = null;

// searching a contact functions -------------------------------------------------------------------------------------------------
function searchContact() {
    var table = document.getElementById("contactsList").getElementsByTagName('tbody')[0];
    
    // get the input from the search form
    var searchInput = document.getElementById("search1").value;

    // package it up into json and sent it to php

}

// adding a contact functions -------------------------------------------------------------------------------------------------
addContactButton.addEventListener("click", function() {
    document.querySelector(".addContactForm").style.display = "block";
    document.querySelector("#addContactButton").disabled = true;
    document.querySelector("#addContactButton").style.cursor = "default";
});

addContactFormButton.addEventListener("click", function() {
    // validate the input (non-empty/correct format)
    if (addValidate()) {
        // proceed with adding the contact record
        var formData = readAddContactFormData();
        if (selectedRow == null) {
            insertNewRecord(formData);
        } else {
            updateRecord(formData);
        }

        let addContactRecord = {};
        addContactRecord.name = formData.firstName + " " + formData.lastName;
        addContactRecord.phoneNumber = formData.phone;
        addContactRecord.email = formData.email;
        addContactRecord.dateCreated = new Date().toLocaleString().split(',')[0];
        addContactRecord.id = sessionStorage.getItem("id");

        console.log(addContactRecord);

        fetch("LAMPAPI/AddContact.php", {
            "method": "POST",

            "headers": {
                "Content-Type": "application/json; charset=utf-8"
            },

            "body": JSON.stringify(addContactRecord)
        }).then(function(response){
            return response.text();
        }).then(function(data){
            console.log(data);
        })

        resetAddContactForm();
    
        // close form
        document.querySelector(".addContactForm").style.display = "none";
        document.querySelector("#addContactButton").disabled = false;
        document.querySelector("#addContactButton").style.cursor = "pointer";
    }
});

function readAddContactFormData() {
    // get the input from the add contact form
    var formData = {};
    formData["firstName"] = document.getElementById("firstName").value;
    formData["lastName"] = document.getElementById("lastName").value;
    formData["phone"] = document.getElementById("phone").value;
    formData["email"] = document.getElementById("email").value;
    formData["dateCreated"] = new Date().toLocaleString().split(',')[0];
    return formData;
}

function addValidate() {
    // set to false if any condition is false
    isValid = true;

    // empty input for first name
    if (document.getElementById("firstName").value == "") {
        isValid = false;
        document.getElementById("firstNameValidationError").classList.remove("hide");
    } 
    else {
        if (!document.getElementById("firstNameValidationError").classList.contains("hide"))
            document.getElementById("firstNameValidationError").classList.add("hide");
    }

    // empty input for last name
    if (document.getElementById("lastName").value == "") {
        isValid = false;
        document.getElementById("lastNameValidationError").classList.remove("hide");
    } 
    else {
        if (!document.getElementById("lastNameValidationError").classList.contains("hide"))
            document.getElementById("lastNameValidationError").classList.add("hide");
    }

    // empty input for phone #
    if (document.getElementById("phone").value == "") {
        isValid = false;
        document.getElementById("phoneValidationError").classList.remove("hide");
    } 
    else {
        if (!document.getElementById("phoneValidationError").classList.contains("hide"))
            document.getElementById("phoneValidationError").classList.add("hide");

        // if there is input, validate the phone number format
        if (validatePhoneNumber(document.getElementById("phone").value)) {
            if (!document.getElementById("invalidPhoneNumber").classList.contains("hide"))
                document.getElementById("invalidPhoneNumber").classList.add("hide");
        }
        else {
            isValid = false;
            document.getElementById("invalidPhoneNumber").classList.remove("hide");
        }
    }

    // empty input for email
    if (document.getElementById("email").value == "") {
        isValid = false;
        document.getElementById("emailValidationError").classList.remove("hide");
    } 
    else {
        if (!document.getElementById("emailValidationError").classList.contains("hide"))
            document.getElementById("emailValidationError").classList.add("hide");

        // if there is input, validate the email format
        if (validateEmail(document.getElementById("email").value)) {
            if (!document.getElementById("invalidEmail").classList.contains("hide"))
                document.getElementById("invalidEmail").classList.add("hide");
        }
        else {
            isValid = false;
            document.getElementById("invalidEmail").classList.remove("hide");
        }
    }
    return isValid;
}

function insertNewRecord(data) {
    // create a row in the table and add data into the cells
    var table = document.getElementById("contactsList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);

    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.firstName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.lastName;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.phone;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.email;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.dateCreated;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<a onClick="edit(this)">Edit</a> <a onClick="removeContact(this)">Remove</a>`;
}

function resetAddContactForm() {
    // remove user input from the form fields
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";

    selectedRow = null;
}

closeAddContactButton.addEventListener("click", function() {
    // close the add contact form
    document.querySelector(".addContactForm").style.display = "none";
    document.querySelector("#addContactButton").disabled = false;
    document.querySelector("#addContactButton").style.cursor = "pointer";
});

// editing a contact functions -------------------------------------------------------------------------------------------------
editContactCloseButton.addEventListener("click", function() {
    // close the edit contact form
    document.querySelector(".editContactForm").style.display = "none";
    document.querySelector("#addContactButton").disabled = false;
    document.querySelector("#addContactButton").style.cursor = "pointer";
});

editContactFormButton.addEventListener("click", function() {
    // validate the input (non-empty/correct format)
    if (editValidate()) {
        var formData = readEditContactFormData();
        if (selectedRow == null) {
            insertNewRecord(formData);
        }
        else {
            updateRecord(formData);
        }
        resetAddContactForm();
    
        // close the edit contact form
        document.querySelector(".editContactForm").style.display = "none";
        document.querySelector("#addContactButton").disabled = false;
        document.querySelector("#addContactButton").style.cursor = "pointer";
    }
});

function readEditContactFormData() {
    // get the input from the edit contact form
    var formData = {};
    formData["firstName"] = document.getElementById("firstName2").value;
    formData["lastName"] = document.getElementById("lastName2").value;
    formData["phone"] = document.getElementById("phone2").value;
    formData["email"] = document.getElementById("email2").value;
    formData["dateCreated"] = new Date().toLocaleString().split(',')[0];
    return formData;
}

function editValidate() {
    // set the false if any of the conditions are false
    isValid = true;

    // empty first name input
    if (document.getElementById("firstName2").value == "") {
        isValid = false;
        document.getElementById("firstNameValidationError2").classList.remove("hide");
    } 
    else {
        if (!document.getElementById("firstNameValidationError2").classList.contains("hide"))
            document.getElementById("firstNameValidationError2").classList.add("hide");
    }

    // empty last name input
    if (document.getElementById("lastName2").value == "") {
        isValid = false;
        document.getElementById("lastNameValidationError2").classList.remove("hide");
    } 
    else {
        if (!document.getElementById("lastNameValidationError2").classList.contains("hide"))
            document.getElementById("lastNameValidationError2").classList.add("hide");
    }

    // empty phone # input
    if (document.getElementById("phone2").value == "") {
        isValid = false;
        document.getElementById("phoneValidationError2").classList.remove("hide");
    } 
    else {
        if (!document.getElementById("phoneValidationError2").classList.contains("hide"))
            document.getElementById("phoneValidationError2").classList.add("hide");

        // if there is input, validate the phone number format
        if (validatePhoneNumber(document.getElementById("phone2").value)) {
            if (!document.getElementById("invalidPhoneNumber2").classList.contains("hide"))
                document.getElementById("invalidPhoneNumber2").classList.add("hide");
        }
        else {
            isValid = false;
            document.getElementById("invalidPhoneNumber2").classList.remove("hide");
        }
    }

    // empty email input
    if (document.getElementById("email2").value == "") {
        isValid = false;
        document.getElementById("emailValidationError2").classList.remove("hide");
    } 
    else {
        if (!document.getElementById("emailValidationError2").classList.contains("hide"))
            document.getElementById("emailValidationError2").classList.add("hide");

        // if there is input, validate the email format
        if (validateEmail(document.getElementById("email2").value)) {
            if (!document.getElementById("invalidEmail2").classList.contains("hide"))
                document.getElementById("invalidEmail2").classList.add("hide");
        }
        else {
            isValid = false;
            document.getElementById("invalidEmail2").classList.remove("hide");
        }
    }
    return isValid;
}

function edit(td) {
    // disable add contact button to prevent menu overlapping
    document.querySelector("#addContactButton").disabled = true;
    document.querySelector("#addContactButton").style.cursor = "default";

    // get the data from the selected row
    selectedRow = td.parentElement.parentElement;
    document.getElementById("firstName2").value = selectedRow.cells[0].innerHTML;
    document.getElementById("lastName2").value = selectedRow.cells[1].innerHTML;
    document.getElementById("phone2").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email2").value = selectedRow.cells[3].innerHTML;

    // display the edit contact form
    document.querySelector(".editContactForm").style.display = "block";
}

function updateRecord(formData) {
    // replace the data in the selected row with the new edit contact form data
    selectedRow.cells[0].innerHTML = formData.firstName;
    selectedRow.cells[1].innerHTML = formData.lastName;
    selectedRow.cells[2].innerHTML = formData.phone;
    selectedRow.cells[3].innerHTML = formData.email;
}

function validatePhoneNumber(phoneNumber) {
    // validate format by using regex
    const phoneRegex = /^[2-9]\d{2}-\d{3}-\d{4}$/;
    return phoneRegex.test(phoneNumber);
}

function validateEmail(email) {
    // validate format by using regex
    const emailRegex = /^.+@[^\.].*\.[a-z]{2,}$/;
    return emailRegex.test(email);
}

// removing a contact functions -------------------------------------------------------------------------------------------------
function removeContact(td) {
    document.querySelector(".removeContactPopup").style.display = "block";
    document.querySelector("#addContactButton").disabled = true;
    document.querySelector("#addContactButton").style.cursor = "default";

    // ask if user is sure 
    removeContactFormButton.addEventListener("click", function(e) {
        // delete the row
        e.stopImmediatePropagation();
        row = td.parentElement.parentElement;
        document.getElementById("contactsList").deleteRow(row.rowIndex);
        selectedRow = null;

        // close the delete contact popup
        document.querySelector(".removeContactPopup").style.display = "none";
        document.querySelector("#addContactButton").disabled = false;
        document.querySelector("#addContactButton").style.cursor = "pointer";  
    });
}

cancelButton.addEventListener("click", function() {
    // close the delete contact popup
    document.querySelector(".removeContactPopup").style.display = "none";
    document.querySelector("#addContactButton").disabled = false;
    document.querySelector("#addContactButton").style.cursor = "pointer";
});

// logging out functions -------------------------------------------------------------------------------------------------
logoutButton.addEventListener("click", function() {
    // redirect the user to the login/register page
    window.location.href = "/index.html";
});
