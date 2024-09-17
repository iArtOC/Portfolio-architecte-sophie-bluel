import { findAllCategories } from "../services/categorie-service.js";

var categories = await findAllCategories();
console.log(categories)