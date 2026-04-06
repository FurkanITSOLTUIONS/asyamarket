document.addEventListener("DOMContentLoaded", () => {
    let cartCount = 0;
    const cartBadge = document.getElementById("cart-badge");
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    const toastContainer = document.getElementById("toast-container");
    const htmlLang = document.documentElement.lang;

    // Toast Mesajları
    const toastMessages = {
        "tr": "Ürün sepete eklendi!",
        "nl": "Product toegevoegd aan winkelwagen!",
        "en": "Product added to cart!",
        "fr": "Produit ajouté au panier!",
        "ar": "تمت إضافة المنتج إلى السلة!"
    };
// Hamburger Menü İşlemleri
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const mainNav = document.querySelector(".main-nav");
    const headerActions = document.querySelector(".header-actions");

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener("click", () => {
            mainNav.classList.toggle("active-mobile");
            headerActions.classList.toggle("active-mobile");
        });
    }
    const showToast = (msgKey = null) => {
        if (!toastContainer) return;
        const message = msgKey || toastMessages[htmlLang] || toastMessages["en"];
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = message;
        
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    // Ana Sayfa Sepete Ekleme
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            cartCount++;
            if (cartBadge) cartBadge.textContent = cartCount;
            
            button.style.backgroundColor = "var(--primary-blue)";
            button.style.color = "var(--white)";
            setTimeout(() => {
                button.style.backgroundColor = "";
                button.style.color = "";
            }, 200);

            showToast();
        });
    });

    // Göstermelik Sepet Sayfası Mantığı (+ / - / Sil)
    const cartItems = document.querySelectorAll(".cart-item");
    
    const updateCartTotal = () => {
        let total = 0;
        document.querySelectorAll(".cart-item").forEach(item => {
            const price = parseFloat(item.querySelector(".item-price").getAttribute("data-price"));
            const qty = parseInt(item.querySelector(".qty-input").value);
            total += price * qty;
        });

        const tax = total * 0.06;
        const grandTotal = total + tax;

        const subTotalEl = document.getElementById("sub-total");
        const taxEl = document.getElementById("tax-amount");
        const grandTotalEl = document.getElementById("grand-total");

        if(subTotalEl) subTotalEl.innerText = '€' + total.toFixed(2);
        if(taxEl) taxEl.innerText = '€' + tax.toFixed(2);
        if(grandTotalEl) grandTotalEl.innerText = '€' + grandTotal.toFixed(2);
    };

    cartItems.forEach(item => {
        const minusBtn = item.querySelector(".minus-btn");
        const plusBtn = item.querySelector(".plus-btn");
        const qtyInput = item.querySelector(".qty-input");
        const removeBtn = item.querySelector(".remove-btn");

        if(minusBtn && plusBtn && qtyInput && removeBtn) {
            plusBtn.addEventListener("click", () => {
                let val = parseInt(qtyInput.value);
                if(val < 10) qtyInput.value = val + 1;
                updateCartTotal();
            });

            minusBtn.addEventListener("click", () => {
                let val = parseInt(qtyInput.value);
                if(val > 1) qtyInput.value = val - 1;
                updateCartTotal();
            });

            removeBtn.addEventListener("click", () => {
                item.style.transform = "scale(0.9)";
                item.style.opacity = "0";
                setTimeout(() => {
                    item.remove();
                    updateCartTotal();
                }, 300);
            });
        }
    });
});
