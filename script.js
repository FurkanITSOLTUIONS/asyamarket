document.addEventListener("DOMContentLoaded", () => {
    let cartCount = 0;
    const cartBadge = document.getElementById("cart-badge");
    const toastContainer = document.getElementById("toast-container");
    const htmlLang = document.documentElement.lang || "tr";

    const translations = {
        "tr": { add: "Sepete Ekle", del: "Sil", toast: "Ürün sepete eklendi!" },
        "nl": { add: "In Winkelwagen", del: "Verwijderen", toast: "Product toegevoegd aan winkelwagen!" },
        "en": { add: "Add to Cart", del: "Remove", toast: "Product added to cart!" },
        "fr": { add: "Ajouter au Panier", del: "Supprimer", toast: "Produit ajouté au panier!" },
        "ar": { add: "أضف إلى السلة", del: "إزالة", toast: "تمت إضافة المنتج إلى السلة!" }
    };

    const productData = {
        "tr": [
            { id: 1, name: "Asya Taze Dana Kıyma", price: 12.50, img: "../../images/dana-kiyma.jpg" },
            { id: 2, name: "Asya Beyaz Peynir 500g", price: 8.99, img: "../../images/beyaz-peynir.jpg" },
            { id: 3, name: "Asya Zeytinyağı 1L", price: 9.45, img: "../../images/zeytinyagi.jpg" },
            { id: 4, name: "Asya Taze Salatalık", price: 2.20, img: "../../images/salatalik.jpg" }
        ],
        "nl": [
            { id: 1, name: "Asya Vers Rundergehakt", price: 12.50, img: "../../images/dana-kiyma.jpg" },
            { id: 2, name: "Asya Witte Kaas 500g", price: 8.99, img: "../../images/beyaz-peynir.jpg" },
            { id: 3, name: "Asya Olijfolie 1L", price: 9.45, img: "../../images/zeytinyagi.jpg" },
            { id: 4, name: "Asya Verse Komkommer", price: 2.20, img: "../../images/salatalik.jpg" }
        ],
        "en": [
            { id: 1, name: "Asya Fresh Minced Beef", price: 12.50, img: "../../images/dana-kiyma.jpg" },
            { id: 2, name: "Asya White Cheese 500g", price: 8.99, img: "../../images/beyaz-peynir.jpg" },
            { id: 3, name: "Asya Olive Oil 1L", price: 9.45, img: "../../images/zeytinyagi.jpg" },
            { id: 4, name: "Asya Fresh Cucumber", price: 2.20, img: "../../images/salatalik.jpg" }
        ],
        "fr": [
            { id: 1, name: "Asya Bœuf Haché Frais", price: 12.50, img: "../../images/dana-kiyma.jpg" },
            { id: 2, name: "Asya Fromage Blanc 500g", price: 8.99, img: "../../images/beyaz-peynir.jpg" },
            { id: 3, name: "Asya Huile d'Olive 1L", price: 9.45, img: "../../images/zeytinyagi.jpg" },
            { id: 4, name: "Asya Concombre Frais", price: 2.20, img: "../../images/salatalik.jpg" }
        ],
        "ar": [
            { id: 1, name: "آسيا لحم بقر مفروم", price: 12.50, img: "../../images/dana-kiyma.jpg" },
            { id: 2, name: "آسيا جبنة بيضاء 500 غرام", price: 8.99, img: "../../images/beyaz-peynir.jpg" },
            { id: 3, name: "آسيا زيت زيتون 1 لتر", price: 9.45, img: "../../images/zeytinyagi.jpg" },
            { id: 4, name: "آسيا خيار طازج", price: 2.20, img: "../../images/salatalik.jpg" }
        ]
    };

    const t = translations[htmlLang] || translations["en"];
    let products = productData[htmlLang] || productData["en"];

    const productGrid = document.getElementById("product-grid");
    const addProductForm = document.getElementById("add-product-form");

    const showToast = () => {
        if (!toastContainer) return;
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = t.toast;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    const renderProducts = () => {
        if (!productGrid) return;
        productGrid.innerHTML = "";
        
        products.forEach(product => {
            const card = document.createElement("section");
            card.className = "product-card";
            card.innerHTML = `
                <img src="${product.img}" alt="${product.name}" class="product-img" onerror="this.src='../../images/placeholder.jpg'">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">€${product.price.toFixed(2)}</p>
                    <div class="action-buttons">
                        <button class="add-to-cart-btn">${t.add}</button>
                        <button class="delete-btn" data-id="${product.id}">${t.del}</button>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });

        attachProductEvents();
    };

    const attachProductEvents = () => {
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idToRemove = parseInt(e.target.getAttribute("data-id"));
                products = products.filter(p => p.id !== idToRemove);
                renderProducts();
            });
        });

        document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                cartCount++;
                if (cartBadge) cartBadge.textContent = cartCount;
                showToast();
            });
        });
    };

    if (addProductForm) {
        addProductForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("prod-name").value;
            const price = parseFloat(document.getElementById("prod-price").value);
            const img = document.getElementById("prod-img").value;

            products.push({ id: Date.now(), name: name, price: price, img: img });
            renderProducts();
            addProductForm.reset();
        });
    }

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

    document.querySelectorAll(".cart-item").forEach(item => {
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
                setTimeout(() => { item.remove(); updateCartTotal(); }, 300);
            });
        }
    });

    const hamburgerBtn = document.getElementById("hamburger-btn");
    const mainNav = document.querySelector(".main-nav");
    const headerActions = document.querySelector(".header-actions");
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener("click", () => {
            mainNav.classList.toggle("active-mobile");
            headerActions.classList.toggle("active-mobile");
        });
    }

    renderProducts();
});
