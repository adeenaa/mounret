document.addEventListener("DOMContentLoaded", function () {

    const productData = {
        stock: 5,   // change to 0 to test
        minQty: 1
    };

    const qtyValue = document.querySelector(".qty-value");
    const minusBtn = document.querySelector(".qty-btn.minus");
    const plusBtn = document.querySelector(".qty-btn.plus");
    const stockStatus = document.querySelector(".stock-status");
    const priceBtn = document.querySelector(".price-btn");

    // SAFETY CHECK
    if (!qtyValue || !minusBtn || !plusBtn) return;

    let qty = productData.minQty;

    function updateStockUI() {
        if (productData.stock > 0) {
            stockStatus.textContent = "● IN STOCK";
            stockStatus.className = "stock-status in-stock";
            priceBtn.disabled = false;
        } else {
            stockStatus.textContent = "● OUT OF STOCK";
            stockStatus.className = "stock-status out-stock";
            priceBtn.disabled = true;
            priceBtn.style.opacity = "0.5";
        }
    }

    plusBtn.addEventListener("click", function () {
        if (qty < productData.stock) {
            qty++;
            qtyValue.textContent = qty;
        }
    });

    minusBtn.addEventListener("click", function () {
        if (qty > productData.minQty) {
            qty--;
            qtyValue.textContent = qty;
        }
    });

    updateStockUI();
});