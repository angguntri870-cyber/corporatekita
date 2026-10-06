const CartLogic = (function() {
  let cart = [];
  const STORAGE_KEY = 'Corporatekita_cart';
  
  function formatUang(harga) {
    return new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR', maximumFractionDigits: 0}).format(harga);
  }
  
  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if(saved) {
      try { cart = JSON.parse(saved); } catch(e) { cart = []; }
    }
    renderUI();
    attachEvents();
  }
  
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    renderUI();
  }
  
  function add(id, qty = 1) {
    const existing = cart.find(item => item.id == id);
    if(existing) {
      existing.qty += qty;
    } else {
      cart.push({ id: parseInt(id), qty: parseInt(qty) });
    }
    save();
  }
  
  function remove(id) {
    cart = cart.filter(item => item.id != id);
    save();
  }
  
  function clear() {
    cart = [];
    save();
  }
  
  function getProduct(id) {
    if (typeof PRODUCTS !== 'undefined') {
      return PRODUCTS.find(p => p.id == id);
    }
    return null;
  }
  
  function renderUI() {
    renderCartPage();
    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const badgeCounters = document.querySelectorAll('.cart-count');
    badgeCounters.forEach(b => b.textContent = cartCount);
    
    const flyouts = document.querySelectorAll('.cart-flyout');
    flyouts.forEach(flyout => {
      const itemsLabel = flyout.querySelector('.items-label');
      if(itemsLabel) itemsLabel.textContent = `${cartCount} barang`;
      
      const flyoutItems = flyout.querySelector('.flyout-items');
      if(!flyoutItems) return;
      
      let subtotal = 0;
      if(cart.length === 0) {
        flyoutItems.innerHTML = '<div class="text-center p-3">Keranjang masih kosong</div>';
      } else {
        let html = '';
        cart.forEach(item => {
          const product = getProduct(item.id);
          if(!product) return;
          
          subtotal += (product.harga * item.qty);
          html += `
            <div class="flyout-item">
              <div class="flyout-item-thumb">
                <img src="${product.gambar}" alt="${product.nama}" class="img-fluid">
              </div>
              <div class="flyout-item-details">
                <h6>${product.nama}</h6>
                <div class="item-bottom">
                  <span class="item-price">${formatUang(product.harga)}</span>
                  <span class="item-qty">x${item.qty}</span>
                </div>
              </div>
              <button class="item-dismiss remove-cart-btn" aria-label="Remove item" data-id="${product.id}">
                <i class="bi bi-trash3"></i>
              </button>
            </div>
          `;
        });
        flyoutItems.innerHTML = html;
      }
      
      const subtotalValue = flyout.querySelector('.subtotal-value');
      if(subtotalValue) {
        subtotalValue.textContent = formatUang(subtotal);
      }
    });
  }
  
  function setQty(id, q) {
    q = parseInt(q) || 1; if (q < 1) q = 1;
    const it = cart.find(i => i.id == id);
    if (it) { it.qty = q; save(); }
  }
  function renderCartPage() {
    const box = document.getElementById('cart-items');
    if (!box) return;
    let total = 0, html = '';
    cart.forEach(item => {
      const p = getProduct(item.id); if (!p) return;
      const sub = p.harga * item.qty; total += sub;
      html += `<div class="cart-item"><div class="row align-items-center g-3"><div class="col-md-5"><div class="product-info d-flex align-items-center gap-3"><div class="product-img"><img src="${p.gambar}" alt="${p.nama}" class="img-fluid"></div><div class="product-meta"><h6 class="product-title"><a href="${p.slug}.html">${p.nama}</a></h6><div class="product-tags"><span class="tag-item">${typeof formatKategori === 'function' ? formatKategori(p.kategori) : ''}</span></div></div></div></div><div class="col-md-2 col-6"><div class="price-col text-md-center"><span class="current-price">${formatUang(p.harga)}</span></div></div><div class="col-md-3 col-6"><div class="qty-col d-flex justify-content-md-center"><div class="quantity-selector"><button class="quantity-btn" type="button" data-act="dec" data-id="${p.id}"><i class="bi bi-dash"></i></button><input type="number" class="quantity-input cart-qty" value="${item.qty}" min="1" data-id="${p.id}"><button class="quantity-btn" type="button" data-act="inc" data-id="${p.id}"><i class="bi bi-plus"></i></button></div></div></div><div class="col-md-2 col-6"><div class="total-col text-md-end"><span class="row-total">${formatUang(sub)}</span></div></div></div><button class="remove-btn remove-cart-btn" type="button" aria-label="Hapus item" data-id="${p.id}"><i class="bi bi-trash3"></i></button></div>`;
    });
    box.innerHTML = html || '<div class="text-center py-5"><p>Keranjang masih kosong.</p><a href="category.html" class="btn btn-primary">Lihat Produk</a></div>';
    ['cart-subtotal', 'cart-total'].forEach(i => { const e = document.getElementById(i); if (e) e.textContent = formatUang(total); });
  }
  function checkoutViaWA() {
    if (cart.length === 0) {
      alert("Keranjang Anda masih kosong!");
      return;
    }
    
    let text = `Halo admin ${(window.SITE&&window.SITE.nama)||""}, saya ingin memesan:\n\n`;
    let total = 0;
    
    cart.forEach(item => {
      const p = getProduct(item.id);
      if(p) {
        text += `- ${p.nama} (x${item.qty}) = ${formatUang(p.harga * item.qty)}\n`;
        total += p.harga * item.qty;
      }
    });
    
    text += `\n*Total: ${formatUang(total)}*\n\nMohon info untuk proses pembayaran dan pengiriman. Terima kasih.`;
    
    const waNumber = (window.SITE && window.SITE.waNumber) ? window.SITE.waNumber : "628898964355";
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    
    window.open(waUrl, "_blank");
  }

  function attachEvents() {
    document.body.addEventListener('change', e => { const i = e.target.closest('.cart-qty'); if (i) setQty(i.dataset.id, i.value); });
    document.body.addEventListener('click', function(e) {
      if(e.target.closest('a[href="checkout.html"]') || e.target.closest('.btn-proceed, .proceed-btn, #cart-wa-btn')) {
        e.preventDefault();
        checkoutViaWA();
      }
      
      if(e.target.closest('.add-cart-btn')) {
        e.preventDefault(); // Mencegah form submission jika dalam form
        const btn = e.target.closest('.add-cart-btn');
        const id = btn.getAttribute('data-id');
        
        // Ambil qty dari input jika ada (halaman detail)
        let qty = 1;
        const qtyContainer = btn.closest('.product-actions, .product-details-content');
        if (qtyContainer) {
          const qtyInput = qtyContainer.querySelector('.quantity-input');
          if (qtyInput) {
            qty = parseInt(qtyInput.value) || 1;
          }
        }
        
        if(id) {
          add(id, qty);
          // Tampilkan feedback visual (bisa animasi atau alert singkat)
          const originalText = btn.innerHTML;
          btn.innerHTML = '<i class="bi bi-check-lg"></i> Ditambahkan';
          setTimeout(() => btn.innerHTML = originalText, 1500);
        }
      }
      
      const stp = e.target.closest('.quantity-btn[data-act]');
      if (stp) { const it = cart.find(i => i.id == stp.dataset.id); if (it) setQty(it.id, it.qty + (stp.dataset.act === 'inc' ? 1 : -1)); return; }
      if(e.target.closest('.remove-cart-btn')) {
        e.preventDefault();
        e.stopPropagation(); // Cegah menu tertutup saat klik hapus
        const btn = e.target.closest('.remove-cart-btn');
        const id = btn.getAttribute('data-id');
        if(id) remove(id);
      }
      
      if(e.target.closest('.action-clear')) {
        e.preventDefault();
        clear();
      }
    });
  }
  
  return {
    init,
    add,
    remove,
    getCart: () => cart, setQty
  };
})();

document.addEventListener('DOMContentLoaded', function() {
  CartLogic.init();
});
