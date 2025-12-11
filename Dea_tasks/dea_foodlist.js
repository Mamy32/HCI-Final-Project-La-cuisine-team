// ================================
// FOODLIST – FAVORITES HANDLING
// ================================

const FAV_KEY = "favorites";

// Load saved favorites from localStorage (array of IDs: ["food_1", "food_3", ...])
let favorites = JSON.parse(localStorage.getItem(FAV_KEY)) || [];

// Check if an item is already in favorites
function isFavorite(id) {
    return favorites.includes(id);
}

// Save updated favorites back to localStorage
function saveFavorites() {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
}

// Select all heart buttons inside food cards
const heartButtons = document.querySelectorAll(".heartbtn");

heartButtons.forEach((btn) => {
    // Get the parent card element
    const card = btn.closest(".card");
    if (!card) return;

    // Retrieve the unique ID from the card (data-id="food_1")
    const id = card.dataset.id;
    if (!id) return;

    const icon = btn.querySelector("img");
    if (!icon) return;

    // Set initial heart icon state based on stored favorites
    if (isFavorite(id)) {
        icon.src = "../images/tabler_heart.svg";  // filled heart
    } else {
        icon.src = "../images/Heart.png";         // empty heart
    }

    // Toggle favorite on click
    btn.addEventListener("click", () => {
        if (isFavorite(id)) {
            // Remove from favorites
            favorites = favorites.filter(favId => favId !== id);
            icon.src = "../images/Heart.png";
        } else {
            // Add to favorites
            favorites.push(id);
            icon.src = "../images/tabler_heart.svg";
        }

        // Save the updated list
        saveFavorites();
    });
});
