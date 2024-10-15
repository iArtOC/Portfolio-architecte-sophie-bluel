import { connectLogin } from "../services/login-service.js";
import { userIsConnected } from "../services/login-service.js";

const form = document.querySelector('form');

form.addEventListener("submit", async function (event) {
    // On empêche le comportement par défaut
    event.preventDefault();
    console.log("Il n’y a pas eu de rechargement de page");

    // On récupère les deux champs
    const inputEmail = document.getElementById("email");
    const email = inputEmail.value; // On récupère la valeur ici
    console.log(email); // Affiche l'email
    //exemple de réasignation
    //let html = ""
    //html = "div"

    const inputPassword = document.getElementById("password"); // Corrigez le nom de l'élément
    const password = inputPassword.value; // On récupère la valeur ici
    console.log(password); // Affiche le mot de passe

    try {
        const response = await connectLogin(email, password); // Passez les valeurs au login
        console.log(response); // Gérer la réponse ici
        if (response.token) { // Supposons que la réponse contient un champ 'token'
            localStorage.setItem('token', response.token); // Stocke le token
            window.location.href = "./index.html";
        } else {
            alert("une erreur est survenu")
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        alert("une erreur est survenu")
    }
});

var buttonLogin = document.getElementById("btnLogin");
if (userIsConnected() === true) {
    // Changer le texte en "logout" si le token est présent
    buttonLogin.textContent = 'logout';
    buttonLogin.style.fontWeight = 'bold'
} else {
    console.log ("déconnecté")
}


buttonLogin.addEventListener('click', function() {
    disconnected ();
});

function disconnected() {
    if (userIsConnected === null) {
        window.location.replace('./login.html');
    } else {
        localStorage.removeItem('token');
        buttonLogin.textContent = 'login';
    }
}