export async function deleteImage (workId) {
    return new Promise (function (resolve, reject) {
        fetch(`http://localhost:5678/api/works/${workId}`,{
            method:"DELETE",
            headers:{
                "Authorization" : "Bearer "+localStorage.getItem("token")
            }
        })
        .then(response => resolve(response))
        .catch(error => reject(error));
    })
}