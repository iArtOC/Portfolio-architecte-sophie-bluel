import { findAllCategories } from "../services/categorie-service.js";
import { userIsConnected } from "../services/login-service.js";
import { lookGallery } from "./galerie-component.js";

if (userIsConnected() === false) {
	const filter = document.getElementById("filters")
	if (filter){
		const categories = await findAllCategories();
		if (categories){
			const buttonAll = document.createElement ("button")
			buttonAll.innerText="Tous"
			filter.append(buttonAll)
			buttonAll.addEventListener('click', function(){
				lookGallery ()
			})
			for (const categorie of categories) {
				const button = document.createElement ("button")
				button.innerText = categorie.name
				filter.append(button)
				button.addEventListener('click', function(){
					lookGallery (categorie.id)
				})
			}
		}
	}
}
