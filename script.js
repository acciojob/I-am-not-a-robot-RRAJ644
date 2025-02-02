const imageContainer = document.getElementById("image-container");
const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const para = document.getElementById("para");

const images = [
    { class: "img1" },
    { class: "img2" },
    { class: "img3" },
    { class: "img4" },
    { class: "img5" }
];

let selectedImages = [];

// Function to shuffle array
function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

// Function to reset the game state
function resetGame() {
    selectedImages = [];
    para.innerText = "";
    verifyButton.style.display = "none";
    resetButton.style.display = "none";
    loadImages();
}

// Function to load images dynamically
function loadImages() {
    imageContainer.innerHTML = "";
    
    // Choose a random image to duplicate
    const duplicateIndex = Math.floor(Math.random() * images.length);
    const duplicatedImage = images[duplicateIndex];

    // Create an array with 5 unique and 1 duplicate image
    const imageList = [...images, duplicatedImage];

    // Shuffle the array so that duplicate image is placed randomly
    shuffleArray(imageList);

    imageList.forEach((image, index) => {
        const img = document.createElement("img");
        img.classList.add(image.class);
        img.setAttribute("data-class", image.class);
        img.addEventListener("click", handleImageClick);
        imageContainer.appendChild(img);
    });
}

// Function to handle image clicks
function handleImageClick(event) {
    const clickedImage = event.target;
    const clickedClass = clickedImage.getAttribute("data-class");

    if (selectedImages.length === 2) return; // Prevent selecting more than 2

    if (!selectedImages.includes(clickedImage)) {
        selectedImages.push(clickedImage);
        clickedImage.classList.add("selected");

        if (selectedImages.length === 1) {
            resetButton.style.display = "block"; // Show Reset button on first click
        } else if (selectedImages.length === 2) {
            verifyButton.style.display = "block"; // Show Verify button on second click
        }
    }
}

// Function to verify selection
function verifySelection() {
    verifyButton.style.display = "none"; // Hide Verify button after click

    if (selectedImages.length === 2) {
        const [first, second] = selectedImages;
        if (first.getAttribute("data-class") === second.getAttribute("data-class")) {
            para.innerText = "You are a human. Congratulations!";
        } else {
            para.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
        }
    }
}

// Event Listeners
resetButton.addEventListener("click", resetGame);
verifyButton.addEventListener("click", verifySelection);

// Load images on page load
loadImages();
