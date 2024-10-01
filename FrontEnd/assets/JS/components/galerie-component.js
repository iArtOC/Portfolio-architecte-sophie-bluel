import { findAllWork } from "../services/galerie-service.js";

export async function lookGallery(categorieId = null) {
    const galleryGrid = document.getElementById("gallery");
    if (galleryGrid) {
        let works;
        try {
            works = await findAllWork();
        } catch (error) {
            console.error("Erreur lors de la récupération des travaux :", error);
            return;
        }
        if (categorieId) {
            works = works.filter(work => work.categoryId === categorieId);
        }
        let html = "";
        if (works) {
            for (const work of works) {
                html += `
                <figure>
                    <img src="${work.imageUrl}" alt="${work.title}">
                    <figcaption>${work.title}</figcaption>
                </figure>
                `;
            }    
        } 
        galleryGrid.innerHTML = html;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    lookGallery();
});
