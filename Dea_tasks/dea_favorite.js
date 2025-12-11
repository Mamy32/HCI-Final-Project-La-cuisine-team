// ======================================
// FAVORITE PAGE – Dynamic Rendering
// ======================================

const FAV_KEY = "favorites";

// If the key does not exist yet, initialize it as an empty array
if (!localStorage.getItem(FAV_KEY)) {
    localStorage.setItem(FAV_KEY, JSON.stringify([]));
}

// Load the list of favorite IDs from localStorage
let favorites = JSON.parse(localStorage.getItem(FAV_KEY)) || [];

// Local food database (must match the items displayed in foodlist.html)
const allFoods = [
  {
    id: "food_1",
    name: "Fried Chicken",
    img: "../images/foodlist/image 17.png",
    rating: "4.6 (500+)",
    price: "IDR 60,000",
    tags: ["Halal", "Chicken"],
  },
  {
    id: "food_2",
    name: "Soto Ayam",
    img: "../images/foodlist/Frame 35-1.png",
    rating: "4.6 (500+)",
    price: "IDR 80,000",
    tags: ["Halal", "Chicken"],
  },
  {
    id: "food_3",
    name: "Beef Rendang",
    img: "../images/foodlist/image 20.png",
    rating: "4.8 (900+)",
    price: "IDR 160,000",
    tags: ["Halal", "Beef"],
  },
  {
    id: "food_4",
    name: "Ayam Gulai",
    img: "../images/foodlist/Frame 35.png",
    rating: "4.6 (500+)",
    price: "IDR 80,000",
    tags: ["Halal", "Chicken", "Spicy"],
  },
  {
    id: "food_5",
    name: "Laksa",
    img: "../images/foodlist/Frame 4.png",
    rating: "4.6 (500+)",
    price: "IDR 75,000",
    tags: ["Halal", "Seafood", "Spicy"],
  },
  {
    id: "food_6",
    name: "Lamb Satay",
    img: "../images/foodlist/Frame 36.png",
    rating: "4.6 (500+)",
    price: "IDR 50,000",
    tags: ["Halal", "Lamb"],
  },
  {
    id: "food_7",
    name: "Chicken Satay",
    img: "../images/foodlist/Frame 37.png",
    rating: "4.6 (500+)",
    price: "IDR 60,000",
    tags: ["Halal", "Chicken"],
  },
  {
    id: "food_8",
    name: "Siomay",
    img: "../images/foodlist/Frame 38.png",
    rating: "4.6 (500+)",
    price: "IDR 50,000",
    tags: ["Halal", "Fish"],
  },
  {
    id: "food_9",
    name: "Nasi Kuning",
    img: "../images/foodlist/Frame 39.png",
    rating: "4.6 (500+)",
    price: "IDR 100,000",
    tags: ["Halal", "Chicken", "Spicy"],
  }
];

// Select the container where favorite items will be displayed
const cardsContainer = document.querySelector(".cards");

// Find all food objects whose IDs exist in the favorites array
const favoriteFoods = allFoods.filter(food => favorites.includes(food.id));

if (!cardsContainer) {
    console.error("Favorite page: .cards container not found.");
} else if (favoriteFoods.length === 0) {
    // If there are no favorites, display a simple message
    cardsContainer.innerHTML =
      '<p style="color:white; font-size:18px; text-align:center;">No favorites yet.</p>';
} else {
    // Clear any static content from the HTML
    cardsContainer.innerHTML = "";

    // Render each favorite item dynamically
    favoriteFoods.forEach((food) => {
        const card = document.createElement("div");
        card.className = "card";

        const tagsText = food.tags && food.tags.length ? food.tags.join(" • ") : "";

        card.innerHTML = `
            <img class="cardimg" src="${food.img}" alt="${food.name}">
            <div class="cardcontent">
                <h2 class="cardtitle">${food.name}</h2>
                ${tagsText ? `<p class="cardcategory">${tagsText}</p>` : ""}
                <div class="rating">
                    <i class="fa-solid fa-star"></i>
                    <span class="ratingtext">${food.rating || ""}</span>
                </div>
                <p class="pricetext">${food.price || ""}</p>
                <button class="removebtn" data-id="${food.id}">❤ Remove Favorite</button>
            </div>
        `;

        cardsContainer.appendChild(card);
    });

    // "Remove Favorite" button handler
    document.querySelectorAll(".removebtn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;

            // Remove this ID from the favorites list
            favorites = favorites.filter(favId => favId !== id);
            localStorage.setItem(FAV_KEY, JSON.stringify(favorites));

            // Remove the card from the page
            const card = btn.closest(".card");
            if (card) card.remove();

            // If no favorites remain, display message
            if (favorites.length === 0) {
                cardsContainer.innerHTML =
                  '<p style="color:white; font-size:18px; text-align:center;">No favorites yet.</p>';
            }
        });
    });
}
