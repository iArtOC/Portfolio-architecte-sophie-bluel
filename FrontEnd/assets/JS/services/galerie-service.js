export async function findAllWork (){
    return new Promise((resolve,reject)=>{
        fetch("http://localhost:5678/api/works")
        .then(response => response.json())
        .then(response => resolve(response))
        .catch(error => reject(error))  
    })
}
