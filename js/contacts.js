const addContactButton = document.getElementById("addContactButton");
const addContactFormButton = document.getElementById("addContactFormButton");
const closeAddContactButton = document.getElementById("addContactCloseButton");

const editContactCloseButton = document.getElementById('editContactCloseButton');
const editContactFormButton = document.getElementById('editContactFormButton');

const cancelButton = document.getElementById('cancelButton');
const removeContactFormButton = document.getElementById('removeContactFormButton');

const logoutButton = document.getElementById('logoutButton');

var selectedRow = null;

// searching a contact functions
function searchContact() {
    var table = document.getElementById("contactsList").getElementsByTagName('tbody')[0];

}

// adding a contact functions
addContactButton.addEventListener("click", function() {
    document.querySelector(".addContactForm").style.display = "block";
    document.querySelector("#addContactButton").disabled = true;
    document.querySelector("#addContactButton").style.cursor = "default";
})

addContactFormButton.addEventListener("click", function() {

    var formData = readFormData();
    if (selectedRow == null) {
        insertNewRecord(formData);
    }
    else {
        updateRecord(formData);
    }
    
    resetAddContactForm();

    document.querySelector(".addContactForm").style.display = "none";
    document.querySelector("#addContactButton").disabled = false;
    document.querySelector("#addContactButton").style.cursor = "pointer";
})


function readFormData() {
    var formData = {};
    formData["firstName"] = document.getElementById("firstName").value;
    formData["lastName"] = document.getElementById("lastName").value;
    formData["phone"] = document.getElementById("phone").value;
    formData["email"] = document.getElementById("email").value;
    formData["dateCreated"] = new Date().toLocaleString().split(',')[0];
    return formData;
}

function readFormData2() {
    var formData = {};
    formData["firstName"] = document.getElementById("firstName2").value;
    formData["lastName"] = document.getElementById("lastName2").value;
    formData["phone"] = document.getElementById("phone2").value;
    formData["email"] = document.getElementById("email2").value;
    formData["dateCreated"] = new Date().toLocaleString().split(',')[0];
    return formData;
}

function insertNewRecord(data) {
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
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    selectedRow = null;
}

closeAddContactButton.addEventListener("click", function() {
    document.querySelector(".addContactForm").style.display = "none";
    document.querySelector("#addContactButton").disabled = false;
    document.querySelector("#addContactButton").style.cursor = "pointer";

})

// editing a contact functions

editContactCloseButton.addEventListener("click", function() {
    document.querySelector(".editContactForm").style.display = "none";
    document.querySelector("#addContactButton").disabled = false;
    document.querySelector("#addContactButton").style.cursor = "pointer";
})

editContactFormButton.addEventListener("click", function() {

    var formData = readFormData2();
    if (selectedRow == null) {
        insertNewRecord(formData);
    }
    else {
        updateRecord(formData);
    }
    
    resetAddContactForm();

    document.querySelector(".editContactForm").style.display = "none";
    document.querySelector("#addContactButton").disabled = false;
    document.querySelector("#addContactButton").style.cursor = "pointer";
})

function edit(td) {
    document.querySelector("#addContactButton").disabled = true;
    document.querySelector("#addContactButton").style.cursor = "default";

    selectedRow = td.parentElement.parentElement;
    document.getElementById("firstName2").value = selectedRow.cells[0].innerHTML;
    document.getElementById("lastName2").value = selectedRow.cells[1].innerHTML;
    document.getElementById("phone2").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email2").value = selectedRow.cells[3].innerHTML;

    document.querySelector(".editContactForm").style.display = "block";
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.firstName;
    selectedRow.cells[1].innerHTML = formData.lastName;
    selectedRow.cells[2].innerHTML = formData.phone;
    selectedRow.cells[3].innerHTML = formData.email;
}

// removing a contact functions
function removeContact(td) {
    //document.querySelector(".removeContactPopup").style.display = "block";
    //document.querySelector("#addContactButton").disabled = true;
    //document.querySelector("#addContactButton").style.cursor = "default";

    if (confirm("asd")) {
        row = td.parentElement.parentElement;
        document.getElementById("contactsList").deleteRow(row.rowIndex);
        selectedRow = null;
    }
}

cancelButton.addEventListener("click", function() {
    document.querySelector(".removeContactPopup").style.display = "none";
    document.querySelector("#addContactButton").disabled = false;
    document.querySelector("#addContactButton").style.cursor = "pointer";
})

removeContactFormButton.addEventListener("click", function() {

    document.querySelector(".removeContactPopup").style.display = "none";
    document.querySelector("#addContactButton").disabled = false;
    document.querySelector("#addContactButton").style.cursor = "pointer";
    
})  




// logging out functions
logoutButton.addEventListener("click", function() {
    window.location.href = "/index.html";
})
