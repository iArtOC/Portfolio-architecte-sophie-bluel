import { findAllWork } from "../services/galerie-service.js";

export async function lookGallery (categorieId=null) {
	
const galleryGrid = document.getElementById("gallery")
if (galleryGrid){
	const works = await findAllWork();
	if(categorieId) {
		console.log(categorieId)
		works.map((work) => work.categoryId === categorieId)
	}
	console.log(works)
	if (works){
		let html = ""
		for (const work of works) {
			html +=`
			<figure>
				<img src="${work.imageUrl}" alt="${work.title}">
				<figcaption>${work.title}</figcaption>
			</figure>
			`
		}
		galleryGrid.innerHTML = html
	}
}

}
lookGallery ()