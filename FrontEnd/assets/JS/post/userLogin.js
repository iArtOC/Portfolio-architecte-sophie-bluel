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
            //alert("une erreur est survenu")
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        alert("une erreur est survenu")
    }
});
