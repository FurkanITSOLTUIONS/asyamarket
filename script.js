document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const lang = html.lang || 'tr';
    const isCartPage = window.location.pathname.includes('/cart/');
    const assetBase = isCartPage ? '../../images/' : '../images/';
    const homeBase = isCartPage ? '../../' : '../';

    const i18n = {
        tr: { add: 'Sepete Ekle', remove: 'Sil', all: 'Tümü', emptyCart: 'Sepetiniz şu anda boş.', emptyText: 'Kataloğa dönüp ürün ekleyerek alışverişe başlayabilirsiniz.', backHome: 'Ana Sayfaya Dön', toastAdded: 'Ürün sepete eklendi.', toastRemoved: 'Ürün kaldırıldı.', toastUpdated: 'Katalog güncellendi.', categories: { meat: 'Et Ürünleri', dairy: 'Süt ve Peynir', oil: 'Yağ ve Sos', vegetable: 'Sebze', rice: 'Bakliyat ve Pirinç' }, unitKg: 'kg', unitPack: 'paket', unitBottle: 'şişe', unitPiece: 'adet' },
        en: { add: 'Add to Cart', remove: 'Remove', all: 'All', emptyCart: 'Your cart is currently empty.', emptyText: 'Go back to the catalog and add products to start shopping.', backHome: 'Back to Home', toastAdded: 'Product added to cart.', toastRemoved: 'Product removed.', toastUpdated: 'Catalog updated.', categories: { meat: 'Meat Products', dairy: 'Dairy and Cheese', oil: 'Oil and Sauce', vegetable: 'Vegetables', rice: 'Rice and Grains' }, unitKg: 'kg', unitPack: 'pack', unitBottle: 'bottle', unitPiece: 'piece' },
        nl: { add: 'In Winkelwagen', remove: 'Verwijderen', all: 'Alles', emptyCart: 'Je winkelwagen is momenteel leeg.', emptyText: 'Ga terug naar de catalogus en voeg producten toe.', backHome: 'Terug naar Startpagina', toastAdded: 'Product toegevoegd aan winkelwagen.', toastRemoved: 'Product verwijderd.', toastUpdated: 'Catalogus bijgewerkt.', categories: { meat: 'Vleesproducten', dairy: 'Zuivel en Kaas', oil: 'Olie en Saus', vegetable: 'Groenten', rice: 'Rijst en Granen' }, unitKg: 'kg', unitPack: 'pak', unitBottle: 'fles', unitPiece: 'stuk' },
        fr: { add: 'Ajouter au Panier', remove: 'Supprimer', all: 'Tous', emptyCart: 'Votre panier est vide pour le moment.', emptyText: 'Retournez au catalogue et ajoutez des produits.', backHome: 'Retour à l’accueil', toastAdded: 'Produit ajouté au panier.', toastRemoved: 'Produit supprimé.', toastUpdated: 'Catalogue mis à jour.', categories: { meat: 'Produits Carnés', dairy: 'Produits Laitiers', oil: 'Huile et Sauce', vegetable: 'Légumes', rice: 'Riz et Céréales' }, unitKg: 'kg', unitPack: 'paquet', unitBottle: 'bouteille', unitPiece: 'pièce' },
        ar: { add: 'أضف إلى السلة', remove: 'إزالة', all: 'الكل', emptyCart: 'السلة فارغة حالياً.', emptyText: 'ارجع إلى الكتالوج وأضف بعض المنتجات للبدء.', backHome: 'العودة إلى الرئيسية', toastAdded: 'تمت إضافة المنتج إلى السلة.', toastRemoved: 'تم حذف المنتج.', toastUpdated: 'تم تحديث الكتالوج.', categories: { meat: 'منتجات اللحوم', dairy: 'الألبان والأجبان', oil: 'الزيت والصلصات', vegetable: 'الخضروات', rice: 'الأرز والحبوب' }, unitKg: 'كغ', unitPack: 'عبوة', unitBottle: 'زجاجة', unitPiece: 'قطعة' }
    };

    const t = i18n[lang] || i18n.en;
    const initialProducts = {
        tr: [
            { id: 'kiyma', name: 'Asya Taze Dana Kıyma', price: 12.5, category: 'meat', unit: 'unitKg', image: 'dana-kiyma.jpg', desc: 'Günlük hazırlanmış, taze ve yüksek kaliteli dana kıyma.' },
            { id: 'peynir', name: 'Asya Beyaz Peynir 500g', price: 8.99, category: 'dairy', unit: 'unitPack', image: 'beyaz-peynir.jpg', desc: 'Kahvaltılık yumuşak dokulu beyaz peynir.' },
            { id: 'zeytinyagi', name: 'Asya Zeytinyağı 1L', price: 9.45, category: 'oil', unit: 'unitBottle', image: 'zeytinyagi.jpg', desc: 'Soğuk sıkım karakterli dengeli lezzet.' },
            { id: 'salatalik', name: 'Asya Taze Salatalık', price: 2.2, category: 'vegetable', unit: 'unitKg', image: 'salatalik.jpg', desc: 'Günlük sevkiyatla gelen çıtır salatalık.' },
            { id: 'basmati', name: 'Asya Özel Basmati Pirinç 5kg', price: 14.5, category: 'rice', unit: 'unitPack', image: 'promo-urun.jpg', desc: 'Uzun taneli premium basmati pirinci.' }
        ],
        en: [
            { id: 'kiyma', name: 'Asya Fresh Minced Beef', price: 12.5, category: 'meat', unit: 'unitKg', image: 'dana-kiyma.jpg', desc: 'Fresh daily prepared minced beef with premium quality.' },
            { id: 'peynir', name: 'Asya White Cheese 500g', price: 8.99, category: 'dairy', unit: 'unitPack', image: 'beyaz-peynir.jpg', desc: 'Soft white cheese ideal for breakfast and daily meals.' },
            { id: 'zeytinyagi', name: 'Asya Olive Oil 1L', price: 9.45, category: 'oil', unit: 'unitBottle', image: 'zeytinyagi.jpg', desc: 'Balanced olive oil with a smooth premium profile.' },
            { id: 'salatalik', name: 'Asya Fresh Cucumber', price: 2.2, category: 'vegetable', unit: 'unitKg', image: 'salatalik.jpg', desc: 'Crisp fresh cucumber delivered daily.' },
            { id: 'basmati', name: 'Asya Premium Basmati Rice 5kg', price: 14.5, category: 'rice', unit: 'unitPack', image: 'promo-urun.jpg', desc: 'Premium long grain basmati rice for family meals.' }
        ],
        nl: [
            { id: 'kiyma', name: 'Asya Vers Rundergehakt', price: 12.5, category: 'meat', unit: 'unitKg', image: 'dana-kiyma.jpg', desc: 'Dagvers bereid rundergehakt van premium kwaliteit.' },
            { id: 'peynir', name: 'Asya Witte Kaas 500g', price: 8.99, category: 'dairy', unit: 'unitPack', image: 'beyaz-peynir.jpg', desc: 'Zachte witte kaas voor ontbijt en dagelijks gebruik.' },
            { id: 'zeytinyagi', name: 'Asya Olijfolie 1L', price: 9.45, category: 'oil', unit: 'unitBottle', image: 'zeytinyagi.jpg', desc: 'Evenwichtige olijfolie met zachte premium smaak.' },
            { id: 'salatalik', name: 'Asya Verse Komkommer', price: 2.2, category: 'vegetable', unit: 'unitKg', image: 'salatalik.jpg', desc: 'Knapperige verse komkommer uit dagelijkse levering.' },
            { id: 'basmati', name: 'Asya Premium Basmati Rijst 5kg', price: 14.5, category: 'rice', unit: 'unitPack', image: 'promo-urun.jpg', desc: 'Premium langkorrelige basmatirijst voor gezinnen.' }
        ],
        fr: [
            { id: 'kiyma', name: 'Asya Bœuf Haché Frais', price: 12.5, category: 'meat', unit: 'unitKg', image: 'dana-kiyma.jpg', desc: 'Bœuf haché frais préparé quotidiennement.' },
            { id: 'peynir', name: 'Asya Fromage Blanc 500g', price: 8.99, category: 'dairy', unit: 'unitPack', image: 'beyaz-peynir.jpg', desc: 'Fromage blanc doux idéal pour le petit-déjeuner.' },
            { id: 'zeytinyagi', name: 'Asya Huile d’Olive 1L', price: 9.45, category: 'oil', unit: 'unitBottle', image: 'zeytinyagi.jpg', desc: 'Huile d’olive équilibrée au profil premium.' },
            { id: 'salatalik', name: 'Asya Concombre Frais', price: 2.2, category: 'vegetable', unit: 'unitKg', image: 'salatalik.jpg', desc: 'Concombre croquant reçu en livraison quotidienne.' },
            { id: 'basmati', name: 'Asya Riz Basmati Premium 5kg', price: 14.5, category: 'rice', unit: 'unitPack', image: 'promo-urun.jpg', desc: 'Riz basmati long grain premium pour la famille.' }
        ],
        ar: [
            { id: 'kiyma', name: 'آسيا لحم بقر مفروم طازج', price: 12.5, category: 'meat', unit: 'unitKg', image: 'dana-kiyma.jpg', desc: 'لحم بقر مفروم طازج يُحضّر يومياً بجودة ممتازة.' },
            { id: 'peynir', name: 'آسيا جبنة بيضاء 500غ', price: 8.99, category: 'dairy', unit: 'unitPack', image: 'beyaz-peynir.jpg', desc: 'جبنة بيضاء ناعمة مثالية للفطور.' },
            { id: 'zeytinyagi', name: 'آسيا زيت زيتون 1 لتر', price: 9.45, category: 'oil', unit: 'unitBottle', image: 'zeytinyagi.jpg', desc: 'زيت زيتون متوازن بنكهة ممتازة.' },
            { id: 'salatalik', name: 'آسيا خيار طازج', price: 2.2, category: 'vegetable', unit: 'unitKg', image: 'salatalik.jpg', desc: 'خيار طازج ومقرمش يصل يومياً.' },
            { id: 'basmati', name: 'آسيا أرز بسمتي ممتاز 5كغ', price: 14.5, category: 'rice', unit: 'unitPack', image: 'promo-urun.jpg', desc: 'أرز بسمتي طويل الحبة بجودة ممتازة.' }
        ]
    };
    let products = [...(initialProducts[lang] || initialProducts.en)];
    let cart = [{ id: products[0].id, qty: 1 }, { id: products[products.length - 1].id, qty: 1 }];
    let currentCategory = 'all';
    let searchValue = '';
    const toastContainer = document.getElementById('toast-container');
    const cartBadge = document.getElementById('cart-badge');
    const productGrid = document.getElementById('product-grid');
    const priceTableBody = document.getElementById('price-table-body');
    const categoryFilters = document.getElementById('category-filters');
    const searchInput = document.getElementById('catalog-search');
    const adminForm = document.getElementById('admin-form');
    const previewName = document.getElementById('preview-name');
    const previewCategory = document.getElementById('preview-category');
    const previewPrice = document.getElementById('preview-price');
    const previewDesc = document.getElementById('preview-desc');
    const previewImage = document.getElementById('preview-image');
    const controlList = document.getElementById('admin-product-list');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const subTotalEl = document.getElementById('sub-total');
    const taxEl = document.getElementById('tax-amount');
    const totalEl = document.getElementById('grand-total');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.querySelector('.main-nav');
    const headerTools = document.querySelector('.header-tools');
    const formatPrice = (value) => `€${value.toFixed(2)}`;
    const categoryLabel = (key) => t.categories[key] || key;
    const unitLabel = (key) => t[key] || key;
    const resolveImage = (imageName) => `${assetBase}${imageName}`;
    const createId = () => `id-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const showToast = (message) => { if (!toastContainer) return; const toast = document.createElement('div'); toast.className = 'toast'; toast.textContent = message; toastContainer.appendChild(toast); window.setTimeout(() => toast.remove(), 2800); };
    const updateCartBadge = () => { if (!cartBadge) return; cartBadge.textContent = String(cart.reduce((sum, item) => sum + item.qty, 0)); };
    const getFilteredProducts = () => products.filter((product) => (currentCategory === 'all' || product.category === currentCategory) && product.name.toLowerCase().includes(searchValue.toLowerCase()));
    const addToCart = (productId) => { const existingItem = cart.find((item) => item.id === productId); if (existingItem) existingItem.qty += 1; else cart.push({ id: productId, qty: 1 }); updateCartBadge(); renderCart(); showToast(t.toastAdded); };
    const removeProductFromCatalog = (productId) => { products = products.filter((product) => product.id !== productId); cart = cart.filter((item) => item.id !== productId); renderCatalog(); renderPriceTable(); renderAdminList(); renderCart(); updateCartBadge(); showToast(t.toastUpdated); };
    const renderCategoryFilters = () => { if (!categoryFilters) return; const categories = ['all', ...new Set(products.map((product) => product.category))]; categoryFilters.innerHTML = ''; categories.forEach((category) => { const button = document.createElement('button'); button.type = 'button'; button.className = `btn-filter${currentCategory === category ? ' is-active' : ''}`; button.textContent = category === 'all' ? t.all : categoryLabel(category); button.addEventListener('click', () => { currentCategory = category; renderCategoryFilters(); renderCatalog(); }); categoryFilters.appendChild(button); }); };
    const renderCatalog = () => { if (!productGrid) return; const filteredProducts = getFilteredProducts(); productGrid.innerHTML = ''; filteredProducts.forEach((product) => { const card = document.createElement('article'); card.className = 'product-card'; card.innerHTML = `<div class="product-media"><img src="${resolveImage(product.image)}" alt="${product.name}" width="400" height="300"><span class="product-badge">${categoryLabel(product.category)}</span></div><div class="product-content"><h3 class="product-title">${product.name}</h3><p class="product-desc">${product.desc}</p><div class="price-row"><div><div class="price-main">${formatPrice(product.price)}</div><div class="price-unit">/ ${unitLabel(product.unit)}</div></div></div><div class="product-actions"><button type="button" class="btn-primary" data-add-id="${product.id}">${t.add}</button><button type="button" class="btn-danger" data-remove-id="${product.id}">${t.remove}</button></div></div>`; productGrid.appendChild(card); }); productGrid.querySelectorAll('[data-add-id]').forEach((button) => button.addEventListener('click', () => addToCart(button.dataset.addId))); productGrid.querySelectorAll('[data-remove-id]').forEach((button) => button.addEventListener('click', () => removeProductFromCatalog(button.dataset.removeId))); };
    const renderPriceTable = () => { if (!priceTableBody) return; priceTableBody.innerHTML = products.map((product) => `<tr><td><strong>${product.name}</strong></td><td>${categoryLabel(product.category)}</td><td>${unitLabel(product.unit)}</td><td>${formatPrice(product.price)}</td></tr>`).join(''); };
    const renderAdminList = () => { if (!controlList) return; controlList.innerHTML = products.map((product) => `<article class="control-item"><div class="control-item-main"><img src="${resolveImage(product.image)}" alt="${product.name}" width="64" height="64"><div><strong>${product.name}</strong><p>${categoryLabel(product.category)} · ${formatPrice(product.price)}</p></div></div><button type="button" class="btn-danger" data-admin-remove="${product.id}">${t.remove}</button></article>`).join(''); controlList.querySelectorAll('[data-admin-remove]').forEach((button) => button.addEventListener('click', () => removeProductFromCatalog(button.dataset.adminRemove))); };
    const updatePreview = () => { if (!previewName || !adminForm) return; const formData = new FormData(adminForm); const name = String(formData.get('name') || '').trim() || 'Preview'; const category = String(formData.get('category') || 'meat'); const price = Number(formData.get('price') || 0); const image = String(formData.get('image') || 'placeholder.jpg').trim(); const desc = String(formData.get('desc') || '').trim() || 'Description'; previewName.textContent = name; previewCategory.textContent = categoryLabel(category); previewPrice.textContent = `${formatPrice(price || 0)} / ${unitLabel(String(formData.get('unit') || 'unitKg'))}`; previewDesc.textContent = desc; previewImage.src = resolveImage(image); previewImage.alt = name; };
    const renderCart = () => { if (!cartItemsContainer) return; const detailedItems = cart.map((item) => { const product = products.find((entry) => entry.id === item.id) || (initialProducts[lang] || initialProducts.en).find((entry) => entry.id === item.id); return product ? { ...product, qty: item.qty } : null; }).filter(Boolean); if (detailedItems.length === 0) { cartItemsContainer.innerHTML = `<div class="empty-state"><h2>${t.emptyCart}</h2><p>${t.emptyText}</p><a class="btn-primary" href="${homeBase}${lang}/">${t.backHome}</a></div>`; } else { cartItemsContainer.innerHTML = detailedItems.map((item) => `<article class="cart-item"><img src="${resolveImage(item.image)}" alt="${item.name}" width="120" height="96"><div class="item-details"><h3>${item.name}</h3><p>${categoryLabel(item.category)} · / ${unitLabel(item.unit)}</p><div class="item-price">${formatPrice(item.price)}</div></div><div class="item-controls"><div class="item-quantity-wrapper"><button type="button" class="qty-btn" data-minus="${item.id}">-</button><input class="qty-input" type="number" value="${item.qty}" min="1" max="10" readonly><button type="button" class="qty-btn" data-plus="${item.id}">+</button></div><button type="button" class="btn-danger" data-delete-cart="${item.id}">${t.remove}</button></div></article>`).join(''); }
        cartItemsContainer.querySelectorAll('[data-plus]').forEach((button) => button.addEventListener('click', () => { const item = cart.find((entry) => entry.id === button.dataset.plus); if (item && item.qty < 10) item.qty += 1; updateCartBadge(); renderCart(); }));
        cartItemsContainer.querySelectorAll('[data-minus]').forEach((button) => button.addEventListener('click', () => { const item = cart.find((entry) => entry.id === button.dataset.minus); if (!item) return; if (item.qty > 1) item.qty -= 1; else { cart = cart.filter((entry) => entry.id !== button.dataset.minus); showToast(t.toastRemoved); } updateCartBadge(); renderCart(); }));
        cartItemsContainer.querySelectorAll('[data-delete-cart]').forEach((button) => button.addEventListener('click', () => { cart = cart.filter((entry) => entry.id !== button.dataset.deleteCart); updateCartBadge(); renderCart(); showToast(t.toastRemoved); }));
        const subtotal = detailedItems.reduce((sum, item) => sum + item.price * item.qty, 0); const vat = subtotal * 0.06; const total = subtotal + vat; if (subTotalEl) subTotalEl.textContent = formatPrice(subtotal); if (taxEl) taxEl.textContent = formatPrice(vat); if (totalEl) totalEl.textContent = formatPrice(total); };
    if (searchInput) searchInput.addEventListener('input', (event) => { searchValue = event.target.value.trim(); renderCatalog(); });
    if (adminForm) { adminForm.addEventListener('input', updatePreview); adminForm.addEventListener('submit', (event) => { event.preventDefault(); const formData = new FormData(adminForm); const product = { id: createId(), name: String(formData.get('name') || '').trim(), price: Number(formData.get('price') || 0), category: String(formData.get('category') || 'meat'), unit: String(formData.get('unit') || 'unitKg'), image: String(formData.get('image') || 'placeholder.jpg').trim(), desc: String(formData.get('desc') || '').trim() }; if (!product.name || !product.price || !product.image) return; products = [product, ...products]; adminForm.reset(); renderCategoryFilters(); renderCatalog(); renderPriceTable(); renderAdminList(); updatePreview(); showToast(t.toastUpdated); }); const resetButton = document.getElementById('reset-form-btn'); if (resetButton) resetButton.addEventListener('click', () => { adminForm.reset(); updatePreview(); }); updatePreview(); }
    if (hamburgerBtn && mainNav && headerTools) hamburgerBtn.addEventListener('click', () => { mainNav.classList.toggle('active-mobile'); headerTools.classList.toggle('active-mobile'); });
    renderCategoryFilters(); renderCatalog(); renderPriceTable(); renderAdminList(); renderCart(); updateCartBadge();
});