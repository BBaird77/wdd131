import { recipes } from "./recipes.mjs";

// Function to generate a random number >= 0 and < num
function getRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

// Function to get a random recipe
function getRandomRecipe() {
    return recipes[getRandomNumber(recipes.length)];
}

// Function to generate recipe HTML
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

// Function to generate rating stars HTML
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

// Function to initialize the page with a random recipe
function init() {
    const recipeContainer = document.querySelector("main");
    const randomRecipe = getRandomRecipe();
    recipeContainer.innerHTML = generateRecipeHTML(randomRecipe);
}

// Function to filter recipes based on the search query
function filterRecipes(query) {
    const lowerCaseQuery = query.toLowerCase();

    const filteredRecipes = recipes.filter(recipe => {
        // Ensure tags and ingredients are arrays
        const tags = Array.isArray(recipe.tags) ? recipe.tags : [];
        const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];

        // Check if query is in name, description, tags, or ingredients
        const nameMatch = recipe.name.toLowerCase().includes(lowerCaseQuery);
        const descriptionMatch = recipe.description.toLowerCase().includes(lowerCaseQuery);
        const tagsMatch = tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
        const ingredientsMatch = ingredients.some(ingredient => ingredient.toLowerCase().includes(lowerCaseQuery));

        return nameMatch || descriptionMatch || tagsMatch || ingredientsMatch;
    });

    return filteredRecipes.sort((a, b) => a.name.localeCompare(b.name));  // Sort by name alphabetically
}

// Function to handle the search form submission
function searchHandler(event) {
    event.preventDefault();  // Prevent the form from submitting (page reload)

    const searchInput = document.querySelector(".search-form input");  // Get search input
    const query = searchInput.value.trim();  // Get the value typed into the search input

    const filteredRecipes = filterRecipes(query);  // Filter recipes based on query

    // Render filtered recipes or a message if none found
    const recipeContainer = document.querySelector("main");
    if (filteredRecipes.length > 0) {
        recipeContainer.innerHTML = filteredRecipes.map(generateRecipeHTML).join('');
    } else {
        recipeContainer.innerHTML = "<p>No recipes found matching your search.</p>";
    }
}

// Attach event listener to the search form
document.querySelector(".search-form").addEventListener("submit", searchHandler);

// Run init function when the page loads
document.addEventListener("DOMContentLoaded", init);
