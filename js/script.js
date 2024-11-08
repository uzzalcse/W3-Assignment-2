
// header scripts starts here
const regionSelector = document.getElementById('region-selector');
const regionModal = document.getElementById('regionModal');
const regionSelect = document.getElementById('regionSelect');
const currencySelect = document.getElementById('currencySelect');
const dismissButton = document.getElementById('dismissButton');

const regionCurrencyMap = {
    'us': 'USD',
    'pt': 'EUR',
    'fr': 'EUR',
    'de': 'EUR',
    'uk': 'GBP'
};

function updateCurrency() {
    const selectedRegion = regionSelect.value;
    const currency = regionCurrencyMap[selectedRegion];
    
    // Find and select the corresponding currency option
    for(let i = 0; i < currencySelect.options.length; i++) {
        if(currencySelect.options[i].value === currency) {
            currencySelect.selectedIndex = i;
            break;
        }
    }
}

regionSelector.addEventListener('click', function(e) {
    e.preventDefault();
    regionModal.style.display = 'block';
    updateCurrency(); // Update currency when dialog opens
});

function saveRegion() {
    const selectedRegion = regionSelect.options[regionSelect.selectedIndex].text;
    regionSelector.textContent = selectedRegion;
    regionModal.style.display = 'none';
}

// Close modal when clicking outside the dialog
regionModal.addEventListener('click', function(e) {
    if (e.target === regionModal) {
        regionModal.style.display = 'none';
    }
});

// Close modal when dismiss button is clicked
dismissButton.addEventListener('click', function() {
    regionModal.style.display = 'none';
});

// Initial currency update
updateCurrency();

//header scripts ends here


// share and save button scripts start here

    // Wait for the page to load and check the saved state of the button
    window.onload = function() {
        const saveButton = document.getElementById("saveButton");
        
        // Check if the "liked" state is stored in localStorage
        if (localStorage.getItem("isLiked") === "true") {
            saveButton.classList.add("liked"); // Apply the liked class if true
        }
        
        // Event listener for the Save button
        saveButton.addEventListener("click", function() {
            // Toggle the "liked" state on the button
            saveButton.classList.toggle("liked");
            
            // Save the state to localStorage (true if liked, false if not)
            if (saveButton.classList.contains("liked")) {
                localStorage.setItem("isLiked", "true");
            } else {
                localStorage.setItem("isLiked", "false");
            }
        });

        // Get the share popup and the share button
        const sharePopup = document.getElementById("sharePopup");
        const shareButton = document.getElementById("shareButton");
        const dismissPopupButton = document.getElementById("dismissPopup");
        const copyLinkButton = document.getElementById("copyLinkButton");

        // Show the share popup when the share button is clicked
        shareButton.addEventListener("click", function() {
            sharePopup.style.display = "flex"; // Show the popup
        });

        // Close the popup when the dismiss button is clicked
        dismissPopupButton.addEventListener("click", function() {
            sharePopup.style.display = "none"; // Hide the popup
        });

        // Close the popup when clicking outside the modal content
        sharePopup.addEventListener("click", function(e) {
            if (e.target === sharePopup) {
                sharePopup.style.display = "none";
            }
        });

        // Copy current URL to clipboard when Copy Link is clicked
        copyLinkButton.addEventListener("click", function() {
            const currentUrl = window.location.href; // Get the current page URL
            navigator.clipboard.writeText(currentUrl).then(function() {
                alert("Link copied to clipboard!"); // Notify user
            }, function(err) {
                alert("Failed to copy link: " + err);
            });
        });
    };

//share and save buttons script ends here

//modal image scripts starts here

    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const currentImageSpan = document.getElementById('currentImage');
    const totalImagesSpan = document.getElementById('totalImages');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    let currentIndex = 0;

    // Sample array of image sources (replace with your actual images)
    const images = [
        'images/image-2.jpg',
        'images/image-3.jpg',
        'images/image-4.jpg',
        'images/image-5.jpg',
        'images/image-3.jpg',
        // Add more images as needed
    ];

    // Update total image count dynamically
    totalImagesSpan.textContent = images.length;

    // Function to open the modal for a specific index
    function openModal(index) {
        currentIndex = index;
        modal.style.display = 'flex';
        updateImage();
    }

    // Function to open the modal when the "30+" button is clicked
    document.getElementById('showGallery').addEventListener('click', function() {
        currentIndex = 0; // Or you can set it to the first additional image index
        modal.style.display = 'flex';
        updateImage();
    });

    function closeModal() {
        modal.style.display = 'none';
    }

    function changeImage(direction) {
        currentIndex += direction;
        updateImage();
    }

    function updateImage() {
        modalImage.src = images[currentIndex];
        currentImageSpan.textContent = currentIndex + 1;

        // Disable previous button if on the first image
        if (currentIndex === 0) {
            prevButton.disabled = true;
            prevButton.style.opacity = 0.5;
        } else {
            prevButton.disabled = false;
            prevButton.style.opacity = 1;
        }

        // Disable next button if on the last image
        if (currentIndex === images.length - 1) {
            nextButton.disabled = true;
            nextButton.style.opacity = 0.5;
        } else {
            nextButton.disabled = false;
            nextButton.style.opacity = 1;
        }
    }

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                changeImage(-1);
            } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
                changeImage(1);
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }
    });
//modal image gallery ends here

//travellers count scripts starts here//

const travelersInput = document.getElementById('travelersInput');
const travelersPopup = document.getElementById('travelersPopup');
const travelersDisplay = document.getElementById('travelersDisplay');

let counts = {
    adults: 2,
    children: 0
};

travelersInput.addEventListener('click', (event) => {
    event.stopPropagation();
    travelersPopup.classList.toggle('active');
});

function updateCount(type, change) {
    const newCount = counts[type] + change;
    
    if (type === 'adults') {
        if (newCount >= 1 && newCount <= 10) {
            counts.adults = newCount;
            document.getElementById('adultsCount').textContent = newCount;
            document.getElementById('adultsDecrement').disabled = newCount <= 1;
            document.getElementById('adultsIncrement').disabled = newCount >= 10;
        }
    } else {
        if (newCount >= 0 && newCount <= 10) {
            counts.children = newCount;
            document.getElementById('childrenCount').textContent = newCount;
            document.getElementById('childrenDecrement').disabled = newCount <= 0;
            document.getElementById('childrenIncrement').disabled = newCount >= 10;
        }
    }
    
    updateTravelersDisplay();
}

function updateTravelersDisplay() {
    const total = counts.adults + counts.children;
    travelersDisplay.textContent = `${total} traveler${total !== 1 ? 's' : ''}`;
}

function closeTravelersPopup() {
    travelersPopup.classList.remove('active');
}

document.addEventListener('click', (event) => {
    if (!travelersPopup.contains(event.target) && !travelersInput.contains(event.target)) {
        closeTravelersPopup();
    }
});

travelersPopup.addEventListener('click', (event) => {
    event.stopPropagation();
});

document.getElementById('adultsDecrement').disabled = counts.adults <= 1;
document.getElementById('childrenDecrement').disabled = counts.children <= 0;

//travellers counts scripts ends here//