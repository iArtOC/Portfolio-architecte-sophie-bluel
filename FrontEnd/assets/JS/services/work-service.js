export async function createWork (body) {
    return new Promise (function (resolve, reject) {
        fetch("http://localhost:5678/api/works",{
            method:"POST",
            body:body,
            headers:{
                "Authorization" : "Bearer "+localStorage.getItem("token")
            }
        })
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(error => reject(error));
    })
}