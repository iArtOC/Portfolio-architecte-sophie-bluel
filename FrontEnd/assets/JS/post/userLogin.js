// export async function connectLogin (){
//     return new Promise((resolve,reject)=>{
//         fetch("http://localhost:5678/api/users/login")
//         .then(response => response.json())
//         .then(response => resolve(response))
//         .catch(error => reject(error))  
//     })
// }

// import { connectLogin } ;

// let inputEmail = document.getElementById("email")
// let email = inputEmail.value
// console.log(email); // affiche ce qui est contenu dans la balise name

// let inputPassword = document.getElementById("nom")
// let password = inputPassword.value
// console.log(password); // affiche ce qui est contenu dans la balise name

// const form = document.querySelector('form');

// // Quand on submit
// form.addEventListener("submit", (event) => {
//     // On empêche le comportement par défaut
//     event.preventDefault();
//     console.log("Il n’y a pas eu de rechargement de page");

//     // On récupère les deux champs et on affiche leur valeur
//     email.value;
//     password.value;
//     console.log(email);
//     console.log(password);
// });

export async function connectLogin(email, password) {
    return new Promise(function (resolve, reject) {
        fetch("http://localhost:5678/api/users/login", {
            method: 'POST', // Assurez-vous que c'est la méthode appropriée
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password }) // Ajoutez les données
        })
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

// Assurez-vous que l'importation est correcte
// import { connectLogin } from './path/to/your/module';

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
        if (response.ok){
            console.log("connecte")
        } else {
            //alert("une erreur est survenu")
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        alert("une erreur est survenu")
    }
});

let validationCreation = "cachalot"; // Testez avec des chiffres pour voir la différence
// email = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+$");
// let resultat = email.test(validationCreation);
// console.log(resultat); // Affiche true.
// password = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+$");
// resultat = password.test(validationCreation);
// console.log(resultat); // Affiche true.