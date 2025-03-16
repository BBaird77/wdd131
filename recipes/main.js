import { recipes } from "./recipes.mjs";

function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

function getRandomRecipe() {
    return recipes[getRandomNumber(recipes.length)];
}

function generateRecipeHTML(recipe) {
    const formattedTags = Array.isArray(recipe.tags) ? recipe.tags
        .map(tag => tag.trim())
        .map(tag => tag.charAt(0).toUpperCase() + tag.slice(1)) 
        .join(', ')
        : '';

    return `
        <section class="recipe">
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="recipe-content">
                <div class="recipe-category">
                    <h2>${formattedTags}</h2>
                </div>
                <div class="recipe-title">
                    <h1>${recipe.name}</h1>
                </div>
                <div class="recipe-rating">
                    ${generateRatingHTML(recipe.rating)}
                </div>
                <div class="recipe-description">
                    <p>${recipe.description}</p>
                </div>
            </div>
        </section>
    `;
}

function generateRatingHTML(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="icon-star" aria-hidden="true">⭐</span>';
        } else {
            stars += '<span class="icon-star-empty" aria-hidden="true">☆</span>';
        }
    }
    return `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">${stars}</span>`;
}

function init() {
    const recipeContainer = document.querySelector("main");
    const randomRecipe = getRandomRecipe();
    recipeContainer.innerHTML = generateRecipeHTML(randomRecipe);
}

function filterRecipes(query) {
    const lowerCaseQuery = query.toLowerCase();

    const filteredRecipes = recipes.filter(recipe => {
        const tags = Array.isArray(recipe.tags) ? recipe.tags : [];
        const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];

        const nameMatch = recipe.name.toLowerCase().includes(lowerCaseQuery);
        const descriptionMatch = recipe.description.toLowerCase().includes(lowerCaseQuery);
        const tagsMatch = tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
        const ingredientsMatch = ingredients.some(ingredient => ingredient.toLowerCase().includes(lowerCaseQuery));

        return nameMatch || descriptionMatch || tagsMatch || ingredientsMatch;
    });

    return filteredRecipes.sort((a, b) => a.name.localeCompare(b.name)); 
}

function searchHandler(event) {
    event.preventDefault();

    const searchInput = document.querySelector(".search-form input"); 
    const query = searchInput.value.trim(); 

    const filteredRecipes = filterRecipes(query); 

    const recipeContainer = document.querySelector("main");
    if (filteredRecipes.length > 0) {
        recipeContainer.innerHTML = filteredRecipes.map(generateRecipeHTML).join('');
    } else {
        recipeContainer.innerHTML = "<p>No recipes found matching your search.</p>";
    }
}

document.querySelector(".search-form").addEventListener("submit", searchHandler);

document.addEventListener("DOMContentLoaded", init);
