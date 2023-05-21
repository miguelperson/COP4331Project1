const loginForm = document.getElementById('login-block');
const signupForm = document.getElementById('signup-block');
const switchLoginBtn = document.getElementById('loginSlider');
const switchSignupBtn = document.getElementById('registerSlider');

signupForm.style.display = "none";

switchLoginBtn.addEventListener('click', () => {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
});

switchSignupBtn.addEventListener('click', ()=>{
    loginForm.style.display = "none";
    signupForm.style.display = "block";
});
