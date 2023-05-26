//login/signin forms
const loginForm = document.getElementById('login-block');
const signupForm = document.getElementById('signup-block');
//The buttons to switch between signin and login
const switchLoginBtn = document.getElementById('loginSlider');
const switchSignupBtn = document.getElementById('registerSlider');

//signin and login buttons
const signupBtn = document.getElementById('signup');
const loginBtn = document.getElementById('login');

signupForm.style.display = "none";

switchLoginBtn.addEventListener('click', ()=>{
    signupForm.style.display = "none";
    loginForm.style.display = "block";
});

switchSignupBtn.addEventListener('click', ()=>{
    loginForm.style.display = "none";
    signupForm.style.display = "block";
});

signupBtn.addEventListener('click', ()=>{
    let signup = {};
    signup.login = document.getElementById('username').value;
    signup.password = document.getElementById('password').value;
    signup.firstname = document.getElementById('firstname').value;
    signup.lastname = document.getElementById('lastname').value;

    fetch("LAMPAPI/Registration.php",{
        "method": "POST",
        "headers": {
            "Content-Type" : "application/json; charset=utf-8"
        },

        "body" : JSON.stringify(signup)
    }).then(function(response){
        return response.json();
    }).then(function(data){
        console.log(data);
    });



});

loginBtn.addEventListener('click', ()=>{
    let userLogin = {};
    userLogin.login = document.getElementById('username').value;
    userLogin.password = document.getElementById('password').value;

    fetch("LAMPAPI/Login.php", {
        "method": "POST",
        "headers" :{
            "Content-Type" : "application/json; charset=utf-8" 
        },

        "body": JSON.stringify(userLogin)

    }).then(function(response){

        return response.json();

    }).then(function(data){

        console.log(data);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    });

});



