import { settings } from "./settings.mjs";

function generateSettingsHTML(setting) {
    const formattedTags = Array.isArray(setting.tags)
        ? setting.tags
            .map(tag => tag.trim())
            .map(tag => tag.charAt(0).toUpperCase() + tag.slice(1))
            .join(', ')
        : '';

    return `
        <section class="setting">
            <img class="zoomable" src="${setting.image}" alt="${setting.name}">
            <div class="setting-content">
                <div class="setting-title">
                    <h1>${setting.name}</h1>
                </div>
                <div class="setting-category">
                    <h2>${formattedTags}</h2>
                </div>
                <div class="setting-description">
                    <p>${setting.description}</p>
                </div>
            </div>
        </section>
    `;
}

function renderSettings(settingsArray) {
    const settingsContainer = document.querySelector("main");
    settingsContainer.innerHTML = settingsArray.map(generateSettingsHTML).join('');
}

function filterSettings(query) {
    const lowerCaseQuery = query.toLowerCase();

    const result = settings.filter(setting => {
        const nameMatch = setting.name.toLowerCase().includes(lowerCaseQuery);
        const descriptionMatch = setting.description.toLowerCase().includes(lowerCaseQuery);
        const tagsMatch = setting.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery));
        return nameMatch || descriptionMatch || tagsMatch;
    });

    console.log("Filtered settings:", result);
    return result;
}

function searchHandler(event) {
    event.preventDefault();
    const searchInput = document.querySelector(".search-form input");
    const query = searchInput.value.trim();
    console.log("Searching for:", query);

    const filtered = filterSettings(query);
    if (filtered.length > 0) {
        renderSettings(filtered);
    } else {
        document.querySelector("main").innerHTML = "<p>No settings found matching your search.</p>";
    }
}

function setupImageModal() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const captionText = document.getElementById("caption");

    // When an image is clicked, open the modal
    document.querySelectorAll("img.zoomable").forEach(img => {
        img.addEventListener("click", function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt; // Set the caption to the alt text of the image
        });
    });

    // Close the modal when the 'x' is clicked
    document.querySelector(".close").addEventListener("click", function() {
        modal.style.display = "none";
    });
}

function init() {
    renderSettings(settings); // Show all on page load
    setupImageModal(); // Set up the image modal functionality
    document.querySelector(".search-form").addEventListener("submit", searchHandler);
}

document.addEventListener("DOMContentLoaded", init);
