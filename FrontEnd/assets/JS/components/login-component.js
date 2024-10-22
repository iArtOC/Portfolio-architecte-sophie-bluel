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

// Récupérer le button login et le modifier si utilisateur connecté
var buttonLogin = document.getElementById("btnLogin");
if (userIsConnected() === true) {
    // Changer le texte en "logout" si le token est présent
    buttonLogin.textContent = 'logout';
    buttonLogin.style.fontWeight = 'bold'
} else {
    console.log ("déconnecté")
}

// Ajout d'une action au button 'login' pour déconnecté
buttonLogin.addEventListener('click', function() {
    disconnected ();
});

function disconnected() {
    if (userIsConnected === false) {
        window.location.replace('./login.html');
    } else {
        localStorage.removeItem('token');
        buttonLogin.textContent = 'login';
    }
}

// Affichage en-tête 'mode édition'
if (userIsConnected () === true) {
    var body = document.querySelector("body")
    if (body) {
        var bannerEdit = document.createElement("div")
        if (bannerEdit) {
            bannerEdit.id="banner-edit-mode"
            var editMode = document.createElement("p")
            if (editMode) {
                editMode.innerHTML=`
                <i class="fa-solid fa-pen-to-square"></i>
                Mode édition
                ` 
                bannerEdit.append(editMode)
                body.prepend(bannerEdit)
            }
        }
    }
    // Sélectionner l'élément h2
    var h2 = document.querySelector('#portfolio h2');

    // Créer un bouton
    var editBtn = document.createElement('span');
    editBtn.innerHTML=`
    <a><i class="fa-solid fa-pen-to-square">Modifier</i></a>
    `;

    // Ajouter le bouton après l'élément h2
    h2.insertAdjacentElement('beforeend', editBtn);

    // Ajouter un gestionnaire d'événements (facultatif)
    editBtn.addEventListener('click', function () {
       modal ();
       function modal (){
        // Création de la modal
        if (body) {
        var globalModal = document.createElement ("div");
            if (globalModal) {
            globalModal.classList.add ("modal");

                // Création du contenu de la modal
                var firstModal = document.createElement ("div");
                if (firstModal) {
                    firstModal.classList.add ("content-modal");
                    firstModal.innerHTML=`
                    <div class="content-modal">
                        <div class="exit-modal">
                            <span><i class="fa-solid fa-xmark"></i></span>
                        </div>

                        <h2>Galerie photo</h2>

                        <div id="tinyGalleryGrid" class="tinyGalleryGrid">
                        </div>

                        <div class="ajouter-supprimer">
                            <button id="addWorks" type="submit">Ajouter une photo</button>
                        </div>
                    </div>
                    `
                    globalModal.append(firstModal);
                }

            body.append(globalModal);
            }
        } 
       }
    });
}
