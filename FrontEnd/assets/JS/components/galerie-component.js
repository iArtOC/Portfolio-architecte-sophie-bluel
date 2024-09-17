import { findAllWork } from "../services/galerie-service.js";

var galleryGrid = document.getElementById("gallery")
if (galleryGrid){
	var works = await findAllWork();
	if (works){
		var html = ""
		for (var work of works) {
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
