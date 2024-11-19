// Importation des services
import { findAllCategories } from "../services/categorie-service.js";
import { findAllWork } from "../services/galerie-service.js";
import { connectLogin } from "../services/login-service.js";
import { userIsConnected } from "../services/login-service.js";
import { createWork } from "../services/work-service.js";
import { deleteImage } from "../services/delete-service.js";
import { lookGallery } from "./galerie-component.js";

// Gestion de la soumission du formulaire de connexion
const form = document.querySelector('form');

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // On récupère les deux champs
    const inputEmail = document.getElementById("email");
    const email = inputEmail.value; // On récupère la valeur ici

    const inputPassword = document.getElementById("password"); 
    const password = inputPassword.value; // On récupère la valeur ici

    try {
        const response = await connectLogin(email, password); // Passez les valeurs au login
        if (response.token) { // Supposons que la réponse contient un champ 'token'
            localStorage.setItem('token', response.token); // Stocke le token
            window.location.href = "./index.html";
        } else {
            alert("une erreur est survenu");
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        alert("une erreur est survenu");
    }
});

// Modification du bouton de connexion si l'utilisateur est connecté
var buttonLogin = document.getElementById("btnLogin");
if (userIsConnected() === true) {
    // Changer le texte en "logout" si le token est présent
    buttonLogin.textContent = 'logout';
    buttonLogin.style.fontWeight = 'bold';
}

// Déconnexion de l'utilisateur
if (buttonLogin) {
    buttonLogin.addEventListener('click', function() {
        disconnected();
    });
}

function disconnected() {
    if (userIsConnected === false) {
        window.location.replace('./login.html');
    } else {
        localStorage.removeItem('token');
        buttonLogin.textContent = 'login';
    }
}

// Affichage d'une bannière "Mode édition" si l'utilisateur est connecté
if (userIsConnected() === true) {
    var body = document.querySelector("body");
    if (body) {
        var bannerEdit = document.createElement("div");
        if (bannerEdit) {
            bannerEdit.id = "banner-edit-mode";
            var editMode = document.createElement("p");
            if (editMode) {
                editMode.innerHTML = `
                <i class="fa-solid fa-pen-to-square"></i>
                Mode édition
                `;
                bannerEdit.append(editMode);
                body.prepend(bannerEdit);
            }
        }
    }

    // Modification de la section portfolio
    // Sélectionner la section portfolio
    var portfolioEdit = document.getElementById('portfolio');

    // Créer une nouvelle div
    var portfolioDivAdd = document.createElement('div');
    portfolioDivAdd.className = 'title-edition';

    // Sélectionner le h2 existant
    var titleH2 = portfolioEdit.querySelector('h2');

    // Créer un bouton
    var editBtn = document.createElement('span');
    editBtn.innerHTML = `
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
                        </div>`;
    var firstModalContent = `<h2 id="firstModal-title">Galerie photo</h2>

                            <div id="tinyGallery" class="tiny-gallery">
                            </div>

                            <div class="ajouter-supprimer">
                                <button id="btnAddWork" type="submit">Ajouter une photo</button>
                            </div>`;
    modal(firstModaleHead, firstModalContent, "firstModal");
    var btnAddWork = document.getElementById("btnAddWork");
    if (btnAddWork) {
        btnAddWork.addEventListener('click', function () {
            openExitModal("firstModal", "cacher");
            openExitModal("secondModal", "afficher");
        });
    }

    async function lookTinyGallery() {
        var tinyGallery = document.getElementById("tinyGallery");
        var tinyGalleryContent = "";
        var works = await findAllWork();
        if (works) {
            for (const work of works) {
                tinyGalleryContent += `
                <figure>
                    <img src="${work.imageUrl}">
                    <i class="fa-solid fa-trash-can" data-id="${work.id}"></i>
                </figure>
                `;
            }
        }
        tinyGallery.innerHTML = tinyGalleryContent;
        // Ajout du boutton pour supprimer et actualiser les galleries
        var deleteBtns = document.querySelectorAll(".fa-trash-can");
        if (deleteBtns) {
            for (const deleteBtn of deleteBtns) {
                deleteBtn.addEventListener('click', async function () {
                    var workId = deleteBtn.getAttribute("data-id");
                    deleteImage(workId);
                    await lookGallery();
                    await lookTinyGallery();
                });
            }
        }
    }
    await lookTinyGallery();



    // Deuxième modal
    var secondModaleHead = `
                        <div class="nav-modal">
                            <span id="previousBtn"><i class="fa-solid fa-arrow-left"></i></span>
                            <span id="closeSecondModal"><i class="fa-solid fa-xmark"></i></span>
                        </div>`;
    var secondModalContent = `<h2>Ajout photo</h2>

                            <form class="form-add" id="createWork">
                                <div class="content-modal2">
                                    <div class="add-img">
                                        <i class="fa-regular fa-image" id="icone-image"></i>
                                        <label for="inputFile" class="btn-add-img"> + Ajouter photo</label>
                                        <input type="file" id="inputFile" accept="image/jpg, image/png, image/jpeg">

                                        <span>jpg, png. 4mo max</span>

                                    </div>

                                    <div class="form-title">
                                        <label for="inputText">
                                            <p>Titre</p>
                                        </label>
                                        <input type="text" id="inputText">
                                    </div>
                                    <div class="form-category">
                                        <label for="inputCategorie">
                                            <p>Categorie</p>
                                        </label>
                                        <select id="inputCategorie">
                                                    <option></option>
                                                `;
                        var categories = await findAllCategories();
                        if (categories) {
                            for (const categorie of categories) {
                                secondModalContent += `<option value="${categorie.id}">${categorie.name}</option>`;
                            }
                        }
                        secondModalContent += `
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <button id="createWork" type="submit">Ajouter</button>
                                </div>
                            </form>`;
    modal(secondModaleHead, secondModalContent, "secondModal");
    var btnBackModal = document.getElementById("previousBtn");
    if (btnBackModal) {
        btnBackModal.addEventListener('click', function () {
            openExitModal("firstModal", "afficher");
            openExitModal("secondModal", "cacher");
        });
    }

    var formCreateWork = document.getElementById("createWork");
    formCreateWork.addEventListener('submit', async function (event) {
        event.preventDefault();

        var formInputFile = document.getElementById("inputFile");
        var formInputText = document.getElementById("inputText");
        var formInputCategorie = document.getElementById("inputCategorie");

        // Vérifier que les éléments existent
        if (!formInputFile.value || !formInputText.value || !formInputCategorie.value) {
            alert ("Un ou plusieurs éléments du formulaire sont manquants.");
            return;
        }

        var body = new FormData();
        // Utilise files[0] pour récupérer le fichier
        body.append("image", formInputFile.files[0]);
        body.append("title", formInputText.value);
        body.append("category", formInputCategorie.value);

        try {
            var newWork = await createWork(body);
            if (newWork) {
                openExitModal("firstModal", "afficher");
                openExitModal("secondModal", "cacher");
                await lookGallery();
                await lookTinyGallery();
            } else {
                alert("Une erreur est survenue.");
            }
        } catch (error) {
            alert("Une erreur est survenue.");
        }
    });

    // Ajout d'un gestionnaire d'événements
    editBtn.addEventListener('click', function () {
        openExitModal("firstModal", "afficher");
        openExitModal("secondModal", "cacher");
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
    function modal(head, content, id) {
        // Création de la modal
        if (body) {
            var globalModal = document.createElement("div");
            globalModal.id = id;
            if (globalModal) {
                globalModal.classList.add("modal");

                // Création du contenu de la modal
                var contentModal = document.createElement("div");
                if (contentModal) {
                    contentModal.classList.add("content-modal");
                    contentModal.innerHTML = `
                    <div class="content-modal">
                        ${head}
                        ${content}
                    </div>
                    `;
                    globalModal.append(contentModal);
                }

                body.append(globalModal);
            }
        }
    }

    // Gestion des modals (affichage/fermeture)
    function openExitModal(id, action) {
        var modal = document.getElementById(id);
        if (modal) {
            if (action === "afficher") {
                modal.classList.add("show");
                modal.classList.remove("hide");
            } else {
                modal.classList.add("hide");
                modal.classList.remove("show");
            }
        }
    }
}
