document.addEventListener("DOMContentLoaded", () => {
    const totalPriceEl = document.querySelector(".total"); // Total price element
    const productCards = document.querySelectorAll(".card-body"); // All product cards

    //Function to calculate and update total price
    function updateTotal() {
        let total = 0;

        productCards.forEach(cardBody => {
            // Skip if the element has been removed from DOM (deleted)
            if (!document.body.contains(cardBody)) return;

            const priceText = cardBody.querySelector(".unit-price").textContent;
            const price = parseFloat(priceText); // Get unit price
            const quantity = parseInt(cardBody.querySelector(".quantity").textContent); // Get quantity

            total += price * quantity; // Add to total
        });

        totalPriceEl.textContent = `${total} $`; // Update total in UI
    }

    // Loop through each product card to attach event listeners
    productCards.forEach(cardBody => {
        const plusBtn = cardBody.querySelector(".fa-plus-circle");
        const minusBtn = cardBody.querySelector(".fa-minus-circle");
        const quantityEl = cardBody.querySelector(".quantity");
        const trashBtn = cardBody.querySelector(".fa-trash-alt");
        const heartBtn = cardBody.querySelector(".fa-heart");

        //1. Adjust the quantity of each item through “+” and “-” buttons

        // When "+" is clicked
        plusBtn.addEventListener("click", () => {
            let qty = parseInt(quantityEl.textContent);
            qty++; // Increase quantity
            quantityEl.textContent = qty; // Update UI
            updateTotal(); // Recalculate total price
        });

        // When "−" is clicked
        minusBtn.addEventListener("click", () => {
            let qty = parseInt(quantityEl.textContent);
            if (qty > 0) {
                qty--; // Decrease quantity
                quantityEl.textContent = qty; // Update UI
                updateTotal(); // Recalculate total price
            }
        });

        //2. Delete items from the cart

        trashBtn.addEventListener("click", () => {
            cardBody.remove(); // Remove the entire product card
            updateTotal(); // Recalculate total price
        });

        //3. Like items through heart-shaped button

        heartBtn.addEventListener("click", () => {
            heartBtn.classList.toggle("liked"); // Toggle "liked" class (CSS handles color)
        });
    });

    //4. See the total price adjusted according to quantity and deletions

    updateTotal(); // Initial calculation when page loads
});
