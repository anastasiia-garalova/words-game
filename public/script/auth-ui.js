const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const registerLink = document.getElementById("register-link");
const anmeldungLink = document.getElementById("anmeldung-link");

const errorBox = document.createElement("div");
errorBox.className = "form-error";

function showError(message, formType = "login") {

    if (formType === "login") {
        loginForm.prepend(errorBox);
    }  
    else if (formType === "register") {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        registerForm.prepend(errorBox);
    }

    errorBox.textContent = message;
    errorBox.classList.add("show");
}

function hideError() {
    errorBox.textContent = "";
    errorBox.classList.remove("show");
}

registerLink.addEventListener("click", () => {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    hideError(); 
});

anmeldungLink.addEventListener("click", () => {
    registerForm.style.display = "none";
    loginForm.style.display = "block";
    hideError(); 
});

const params = new URLSearchParams(window.location.search);

if (params.get("error") === "1") {
    showError("Benutzername oder Passwort ist falsch.");
}
if (params.get("error") === "2") {
    showError("Diese E-Mail ist bereits registriert", "register");
}
if (params.get("error") === "500") {
    showError("Es ist ein Fehler aufgetreten, Fehler 500", "login");
}
if (params.get("error") === "501") {
    showError("Es ist ein Fehler aufgetreten, Fehler 500", "register");
}