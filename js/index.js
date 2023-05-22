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
    signup.username = document.getElementById('username').value;
    signup.password = document.getElementById('password').value;
    signup.firstname = document.getElementById('firstname').value;
    signup.lastname = document.getElementById('lastname').value;

});

loginBtn.addEventListener('click', ()=>{
    let login = {};
    login.username = document.getElementById('username').value;
    login.password = document.getElementById('password').value;
});



