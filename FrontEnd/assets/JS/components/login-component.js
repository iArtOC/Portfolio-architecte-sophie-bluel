import { findAllCategories } from "../services/categorie-service.js";
import { findAllWork } from "../services/galerie-service.js";
import { connectLogin } from "../services/login-service.js";
import { userIsConnected } from "../services/login-service.js";
import { createWork } from "../services/work-service.js";
import { deleteImage } from "../services/delete-service.js";

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
    // Sélectionner la section portfolio
    var portfolioEdit = document.getElementById('portfolio');

    // Créer une nouvelle div
    var portfolioDivAdd = document.createElement('div');
    portfolioDivAdd.className = 'title-edition';

    // Sélectionner le h2 existant
    var titleH2 = portfolioEdit.querySelector('h2');

    // Créer un bouton
    var editBtn = document.createElement('span');
    editBtn.innerHTML=`
    <a><i class="fa-solid fa-pen-to-square"></i>modifier</a>
    `;

    // Ajouter le h2 existant et le span à la nouvelle div
    portfolioDivAdd.appendChild(titleH2);
    portfolioDivAdd.appendChild(editBtn);

    // Ajouter la nouvelle div à la section portfolio en début
    portfolioEdit.prepend(portfolioDivAdd);

    // Première modal
    var firstModaleHead = `
                        <div class="exit-modal">
                            <span id="closeFirstModal"><i class="fa-solid fa-xmark"></i></span>
                        </div>`
    var firstModalContent= `<h2 id="firstModal-title">Galerie photo</h2>

                            <div id="tinyGallery" class="tiny-gallery">
                            `
                            var works = await findAllWork();
                            if (works) {
                                for (const work of works) {
                                    firstModalContent+= `
                                    <figure>
                                        <img src="${work.imageUrl}">
                                        <i class="fa-solid fa-trash-can" id="deleteBtn"></i>
                                    </figure>
                                    `;
                                }
                            }
                            firstModalContent+=`
                            </div>

                            <div class="ajouter-supprimer">
                                <button id="btnAddWork" type="submit">Ajouter une photo</button>
                            </div>`
    modal (firstModaleHead, firstModalContent, "firstModal");
    var btnAddWork = document.getElementById ("btnAddWork");
    if (btnAddWork) {
        btnAddWork.addEventListener ('click', function () {
            openExitModal ("firstModal", "cacher");
            openExitModal ("secondModal", "afficher");
        })
    }


    // Deuxième modal
    var secondModaleHead = `
                        <div class="nav-modal">
                            <span id="previousBtn"><i class="fa-solid fa-arrow-left"></i></i></span>
                            <span id="closeSecondModal"><i class="fa-solid fa-xmark"></i></span>
                            </div>`
    var secondModalContent= `<h2>Ajouter une photo</h2>

                            <form id="createWork">

                            <input type="file" id="inputFile" required>
                            <input type="text" id="inputText" required>
                            <select id="inputCategorie" required>
                                <option></option>
                            `
                            var categories = await findAllCategories();
                            if (categories) {
                                for (const categorie of categories) {
                                    secondModalContent+=`<option value="${categorie.id}">${categorie.name}</option>`
                                }
                            }
                            secondModalContent+=`
                            </select>
                            <div class="ajouter-supprimer">
                                <button id="createWork" type="submit">Valider</button>
                            </div>
                            </form>`
    modal (secondModaleHead, secondModalContent, "secondModal");
    var btnBackModal = document.getElementById ("previousBtn");
    if (btnBackModal) {
        btnBackModal.addEventListener ('click', function () {
            openExitModal ("firstModal", "afficher");
            openExitModal ("secondModal", "cacher");
        })
    }

    var formCreateWork = document.getElementById("createWork");
    formCreateWork.addEventListener('submit', async function (event) {
        event.preventDefault();
    
        var formInputFile = document.getElementById("inputFile");
        var formInputText = document.getElementById("inputText");
        var formInputCategorie = document.getElementById("inputCategorie");
    
        // Vérifie que les éléments existent
        if (!formInputFile || !formInputText || !formInputCategorie) {
            console.error("Un ou plusieurs éléments du formulaire sont manquants.");
            return;
        }
    
        var body = new FormData();
        // Utilise files[0] pour récupérer le fichier
        body.append("image", formInputFile.files[0]);
        body.append("title", formInputText.value);
        body.append("category", formInputCategorie.value);
    
        try {
            var newWork = await createWork(body);
            console.log(newWork);
        } catch (error) {
            console.log(error.message);
        }
    });

    // Ajout d'un gestionnaire d'événements
    editBtn.addEventListener('click', function () {
        openExitModal ("firstModal", "afficher");
        openExitModal ("secondModal", "cacher");
    });

    // Gestion des fermetures de modals
    var closeFirstModal = document.getElementById("closeFirstModal");
    if (closeFirstModal) {
        closeFirstModal.addEventListener('click', function () {
            openExitModal("firstModal", "cacher");
        });
    }

    var closeSecondModal = document.getElementById("closeSecondModal");
    if (closeSecondModal) {
        closeSecondModal.addEventListener('click', function () {
            openExitModal("secondModal", "cacher");
        });
    }
    
    // Fabrique de modal
    function modal (head, content, id){
        // Création de la modal
        if (body) {
        var globalModal = document.createElement ("div");
        globalModal.id=id
            if (globalModal) {
            globalModal.classList.add ("modal");

                // Création du contenu de la modal
                var contentModal = document.createElement ("div");
                if (contentModal) {
                    contentModal.classList.add ("content-modal");
                    contentModal.innerHTML=`
                    <div class="content-modal">
                        ${head}
                        ${content}
                    </div>
                    `
                    globalModal.append(contentModal);
                }

            body.append(globalModal);
            }
        } 
    }
    // Affichage / désaffichage des modals
    function openExitModal (id, action) {
        var modal = document.getElementById (id);
        if (modal) {
            if (action === "afficher") {
                modal.classList.add ("show")
                modal.classList.remove ("hide")
            } else {
                modal.classList.add ("hide")
                modal.classList.remove ("show")
            }
        }
    }
}
