export async function findAllCategories (){
    return new Promise((resolve,reject)=>{
        fetch("http://localhost:5678/api/categories")
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(error => reject(error))  
    })
}
