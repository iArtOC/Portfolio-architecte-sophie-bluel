// Fonction pour se connecter en envoyant l'email et le mot de passe à l'API
export async function connectLogin(email, password) {
    return new Promise(function (resolve, reject) {
        fetch("http://localhost:5678/api/users/login", {
            method: 'POST', // Méthode HTTP utilisée pour envoyer la requête (POST pour envoyer des données)
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
}

// Fonction pour vérifier si l'utilisateur est connecté
export function userIsConnected () {
    if (localStorage.getItem ("token")) { // Vérifie si le token est présent dans le localStorage
        return true
    }
    else {
        return false
    }
}
