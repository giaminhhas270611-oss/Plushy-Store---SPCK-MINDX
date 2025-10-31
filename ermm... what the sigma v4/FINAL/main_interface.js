const cartCounter = document.getElementById('cart-counter');
const addItemBtns = document.querySelectorAll('[id^="add-item-btn-"]');
const resetCartBtn = document.getElementById('reset-cart-btn');

let itemCount = 0;

function updateCartDisplay() {
    cartCounter.textContent = itemCount;
}

// Loop through all "Add to cart" buttons and add a click listener to each one.
addItemBtns.forEach(button => {
    button.addEventListener('click', () => {
        itemCount++;
        updateCartDisplay();
    });
});

resetCartBtn.addEventListener('click', () => {
    itemCount = 0;
    updateCartDisplay();
});

updateCartDisplay();