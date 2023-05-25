const addContactButton = document.getElementById("addContactButton");
const closeAddContactButton = document.getElementById("addContactCloseButton");

const searchButton = document.getElementById('searchButton');

// searching a contact functions


// adding a contact functions
addContactButton.addEventListener("click", function() {
    document.querySelector(".addContactForm").style.display = "block";
})

closeAddContactButton.addEventListener("click", function() {
    document.querySelector(".addContactForm").style.display = "none";

})

// editing a contact functions
function editContact()
{
    alert("edit");
}

// removing a contact functions
function removeContact()
{
    alert("remove");
}

// logging out functions
function logout()
{
    alert("logout");
}

