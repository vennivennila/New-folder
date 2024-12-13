document.addEventListener("DOMContentLoaded", () => {
    const products = document.querySelectorAll(".price");
    const userAgent = navigator.userAgent.toLowerCase();
    const basePrices = []; // Array to store original prices

    // Save initial prices
    products.forEach((product) => {
        const basePrice = parseFloat(product.textContent.replace('₹', '').trim());
        basePrices.push(basePrice);
    });

    // Check for visit count in localStorage
    let visitCount = parseInt(localStorage.getItem('visitCount')) || 0;

    // Increase visit count and save it
    visitCount++;
    localStorage.setItem('visitCount', visitCount);

    // Price adjustment logic
    products.forEach((product, index) => {
        const basePrice = basePrices[index];
        let adjustedPrice = basePrice;

        if (visitCount === 1) {
            // First visit: Decrease price by 10%
            adjustedPrice = basePrice * 0.9;
        } else if (visitCount === 2) {
            // Second visit: Original price
            adjustedPrice = basePrice;
        } else if (visitCount >= 3) {
            // Subsequent visits: Increase price by 5% per visit (up to 20%)
            const increaseRate = Math.min(1 + 0.05 * (visitCount - 2), 1.2);
            adjustedPrice = basePrice * increaseRate;
        }

        product.textContent = `₹${adjustedPrice.toFixed(2)}`;
    });
});
