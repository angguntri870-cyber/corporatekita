document.addEventListener("DOMContentLoaded", function() {
  
  if (typeof PRODUCTS === 'undefined' || !PRODUCTS.length) return;

  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";
  
  // ============================================
  // Halaman: index.html
  // ============================================
  if (page === 'index.html' || page === '') {
    // 1. Best Sellers (4 produk acak/unggulan)
    const bestSellersRow = document.querySelector('.best-sellers .row');
    if (bestSellersRow) {
      bestSellersRow.classList.add('produk-grid');
      const items = PRODUCTS.slice(0, 4);
      bestSellersRow.innerHTML = items.map(p => `
        <div class="col-lg-3 col-md-6">${renderProductTile(p)}</div>
      `).join('');
    }
    
    // 2. Tab Cards (masing-masing 8 produk)
    const tab1 = document.querySelector('#cards-tab-1 .row');
    if (tab1) {
      tab1.classList.add('produk-grid');
      tab1.innerHTML = PRODUCTS.slice(4, 12).map(p => `
        <div class="col-xl-3 col-lg-4 col-md-6">${renderProductTile(p)}</div>
      `).join('');
    }
    const tab2 = document.querySelector('#cards-tab-2 .row');
    if (tab2) {
      tab2.classList.add('produk-grid');
      tab2.innerHTML = [...PRODUCTS].sort((a,b)=>b.rating-a.rating).slice(0, 8).map(p => `
        <div class="col-xl-3 col-lg-4 col-md-6">${renderProductTile(p)}</div>
      `).join('');
    }
    const tab3 = document.querySelector('#cards-tab-3 .row');
    if (tab3) {
      tab3.classList.add('produk-grid');
      tab3.innerHTML = PRODUCTS.slice(12, 20).map(p => `
        <div class="col-xl-3 col-lg-4 col-md-6">${renderProductTile(p)}</div>
      `).join('');
    }
    
    // 3. CTA Grid (4 produk)
    const ctaSection = document.querySelector('#call-to-action');
    if (ctaSection) {
      const rows = ctaSection.querySelectorAll('.row');
      const ctaRow = rows.length > 1 ? rows[1] : null; 
      if (ctaRow) {
        ctaRow.classList.add('produk-grid');
        ctaRow.innerHTML = PRODUCTS.filter(p => p.hargaCoret).slice(0, 4).map(p => `
          <div class="col-lg-3 col-md-6">${renderProductTile(p)}</div>
        `).join('');
      }
    }
  }

  // ============================================
  // Halaman: category.html / search-results.html
  // ============================================
  if (page === 'category.html' || page === 'search-results.html') {
    const gridRow = document.querySelector('.category-product-list .row');
    if (!gridRow) return;
    
    gridRow.classList.add('produk-grid');
    
    // Elements
    const searchInput = document.getElementById('productSearch');
    const searchBtn = document.querySelector('.search-submit');
    const priceSelect = document.getElementById('priceRange');
    const sortSelect = document.getElementById('sortBy');
    const categoryCheckboxes = document.querySelectorAll('.brand-list input[type="checkbox"]');
    
    // Helper URL Param
    const urlParams = new URLSearchParams(window.location.search);
    const urlKategori = urlParams.get('kategori');
    
    // Check checklist yang sesuai URL
    if (urlKategori) {
      const cb = document.getElementById('kat-' + urlKategori);
      if (cb) cb.checked = true;
    }
    
    function renderCategoryGrid() {
      let filtered = [...PRODUCTS];
      
      // 1. Filter Kategori (Checkboxes)
      const checkedCats = Array.from(categoryCheckboxes).filter(cb => cb.checked).map(cb => cb.getAttribute('data-kategori'));
      if (checkedCats.length > 0) {
        filtered = filtered.filter(p => checkedCats.includes(p.kategori));
      }
      
      // 2. Filter Search Text
      if (searchInput && searchInput.value.trim() !== '') {
        const q = searchInput.value.trim().toLowerCase();
        filtered = filtered.filter(p => p.nama.toLowerCase().includes(q) || p.deskripsi.toLowerCase().includes(q));
      }
      
      // 3. Filter Price Range
      if (priceSelect && priceSelect.value !== '0-999999999') {
        const [min, max] = priceSelect.value.split('-').map(Number);
        filtered = filtered.filter(p => p.harga >= min && p.harga <= max);
      }
      
      // 4. Sorting
      if (sortSelect) {
        const val = sortSelect.value;
        if (val === 'price-asc') filtered.sort((a,b) => a.harga - b.harga);
        if (val === 'price-desc') filtered.sort((a,b) => b.harga - a.harga);
        if (val === 'rating-desc') filtered.sort((a,b) => b.rating - a.rating);
        if (val === 'best-selling') filtered.sort((a,b) => b.terjual - a.terjual);
        if (val === 'newest') filtered.reverse(); // Simplified
      }
      
      // Render
      if (filtered.length === 0) {
        gridRow.innerHTML = '<div class="col-12 text-center py-5"><h4>Produk tidak ditemukan.</h4></div>';
      } else {
        gridRow.innerHTML = filtered.map(p => `
          <div class="col-md-6 col-lg-4 mb-4">${renderProductTile(p)}</div>
        `).join('');
      }
    }
    
    // Listeners
    if(searchBtn) searchBtn.addEventListener('click', renderCategoryGrid);
    if(searchInput) searchInput.addEventListener('keyup', (e) => { if(e.key === 'Enter') renderCategoryGrid(); });
    if(priceSelect) priceSelect.addEventListener('change', renderCategoryGrid);
    if(sortSelect) sortSelect.addEventListener('change', renderCategoryGrid);
    categoryCheckboxes.forEach(cb => cb.addEventListener('change', renderCategoryGrid));
    
    // First render
    renderCategoryGrid();
  }

  // ============================================
  // Halaman: product-details.html
  // ============================================
  if (page === 'product-details.html') {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    let product = PRODUCTS.find(p => p.slug === slug);
    
    // Default fallback to first product if no slug
    if (!product) product = PRODUCTS[0];
    
    if (typeof renderProductDetail === 'function') {
      renderProductDetail(product);
    }
    
    // Related products (jika ada blocknya)
    const relatedRow = document.querySelector('.related-products .row, .best-sellers .row'); // fallback ke grid best sellers
    if (relatedRow) {
      relatedRow.classList.add('produk-grid');
      const related = PRODUCTS.filter(p => p.kategori === product.kategori && p.id !== product.id).slice(0, 4);
      relatedRow.innerHTML = (related.length ? related : PRODUCTS.slice(0,4)).map(p => `
        <div class="col-lg-3 col-md-6 mb-4">${renderProductTile(p)}</div>
      `).join('');
    }
  }

});
