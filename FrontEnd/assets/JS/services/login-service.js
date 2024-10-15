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

export function userIsConnected () {
    if (localStorage.getItem ("token")) {
        return true
    }
    else {
        return false
    }
}