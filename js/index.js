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
    signup.firstName = document.getElementById('firstname').value;
    signup.lastName = document.getElementById('lastname').value;

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
        let info = JSON.parse(data);
        registerFunction(info);

    });



});

loginBtn.addEventListener('click', ()=>{
    let userLogin = {};
    userLogin.login = document.getElementById('username').value;
    userLogin.password = document.getElementById('password').value;

    if(userLogin.login == ""){
        if(userLogin.password == ""){
            let node = document.getElementById("error-message");
            node.innerHTML = "All Fields Empty";
        }
        else{
            let node = document.getElementById("error-message");
            node.innerHTML = "Username Field Empty.";
        }
    }
    else if(userLogin.password == ""){
        let node = document.getElementById("error-message");
        node.innerHTML = "Password Field Empty.";
    }
    else{

        fetch("LAMPAPI/Login.php", {
            "method": "POST",
            "headers" :{
                "Content-Type" : "application/json; charset=utf-8" 
            },

            "body": JSON.stringify(userLogin)

        }).then(function(response){

            return response.text();
            
        }).then(function(data){

            console.log(data);
            let info = JSON.parse(data);

            loginFunction(info);    
        });
    }
});


function loginFunction(info){
    console.log("hello");
    if (info.error == ""){
        localStorage.setItem("id", info.id);
        localStorage.setItem("firstName", info.firstName);
        localStorage.setItem("lastName", info.lastName);
        location.href = 'contacts.html';
    }else{
        console.log(info.error);
        let node = document.getElementById("error-message");
        node.innerHTML = "No Record Found."
    }
}