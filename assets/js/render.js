const formatRp = (harga) => new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR', maximumFractionDigits: 0}).format(harga);

const formatKategori = (kategori) => {
  const map = {
    'seminar-kit': 'Seminar Kit',
    'souvenir-kantor': 'Souvenir Kantor',
    'corporate-gift': 'Corporate Gift',
    'merchandise': 'Merchandise',
    'hampers': 'Hampers'
  };
  return map[kategori] || kategori;
};

const renderStars = (rating) => {
  let html = '';
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  
  for(let i=0; i<fullStars; i++) html += '<i class="bi bi-star-fill"></i>';
  if(halfStar) html += '<i class="bi bi-star-half"></i>';
  for(let i=0; i<emptyStars; i++) html += '<i class="bi bi-star"></i>';
  return html;
};

// Render utama untuk semua grid (menggunakan product-tile karena desainnya paling rapi dan lengkap)
function renderProductTile(p) {
  return `
    <article class="product-tile">
      <div class="tile-visual">
        <a href="${p.slug}.html">
          <img src="${p.gambar}" class="img-fluid" alt="${p.nama}" loading="lazy">
        </a>
        ${p.hargaCoret ? '<span class="status-tag tag-discount">Promo</span>' : ''}
        <div class="tile-actions">
          <!-- Quick actions dihapus untuk fokus pada add to cart di footer -->
        </div>
      </div>
      <div class="tile-body">
        <span class="tile-badge">${formatKategori(p.kategori)}</span>
        <h4 class="tile-title"><a href="${p.slug}.html">${p.nama}</a></h4>
        <div class="tile-rating">
          <div class="stars">
            ${renderStars(p.rating)}
          </div>
          <span class="count">${p.terjual} terjual</span>
        </div>
      </div>
      <div class="tile-footer">
        <span class="tile-price">${formatRp(p.harga)} ${p.hargaCoret ? `<del class="original-price">${formatRp(p.hargaCoret)}</del>` : ''}</span>
        <button type="button" class="add-cart-btn" data-id="${p.id}">+ Keranjang</button>
      </div>
    </article>
  `;
}

// Render untuk hero produk di index.html
function renderHeroTile(p, type) {
  if (type === 'horizontal') {
    return `
      <div class="product-tile horizontal">
        <div class="row g-0 align-items-center">
          <div class="col-sm-4">
            <div class="tile-image">
              <a href="${p.slug}.html">
                <img src="${p.gambar}" class="img-fluid" alt="${p.nama}">
              </a>
              ${p.hargaCoret ? '<span class="tile-badge">Promo</span>' : ''}
            </div>
          </div>
          <div class="col-sm-8">
            <div class="tile-info">
              <h4><a href="${p.slug}.html">${p.nama}</a></h4>
              <p class="tile-desc">${p.deskripsi.substring(0, 80)}...</p>
              <div class="tile-price">
                <span class="current">${formatRp(p.harga)}</span>
                ${p.hargaCoret ? `<span class="original">${formatRp(p.hargaCoret)}</span>` : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  
  return `
    <div class="product-tile ${type === 'featured' ? 'featured' : ''}">
      <div class="tile-image">
        <a href="${p.slug}.html">
          <img src="${p.gambar}" class="img-fluid" alt="${p.nama}">
        </a>
        ${p.hargaCoret ? `<span class="tile-badge ${type === 'featured' ? 'accent' : ''}">Promo</span>` : ''}
      </div>
      <div class="tile-info">
        <h4><a href="${p.slug}.html">${p.nama}</a></h4>
        <div class="tile-price">
          <span class="current">${formatRp(p.harga)}</span>
          ${p.hargaCoret ? `<span class="original">${formatRp(p.hargaCoret)}</span>` : ''}
        </div>
      </div>
    </div>
  `;
}

// Render untuk halaman detail produk (product-details.html)
function renderProductDetail(p) {
  // Isi data ke elemen HTML
  const mainImg = document.getElementById('main-product-image');
  if(mainImg) {
    mainImg.src = p.gambar;
    mainImg.setAttribute('data-zoom', p.gambar);
  }
  
  // Kosongkan thumbnail, buat 1 thumb untuk gambar utama (atau lebih jika ada array gambar)
  const thumbStrip = document.querySelector('.thumb-strip');
  if(thumbStrip) {
    thumbStrip.innerHTML = `
      <div class="thumb-cell thumbnail-item active" data-image="${p.gambar}">
        <img src="${p.gambar}" alt="${p.nama}" class="img-fluid">
      </div>
    `;
  }
  
  const heading = document.querySelector('.product-heading');
  if(heading) heading.textContent = p.nama;
  
  const typeBadge = document.querySelector('.type-badge');
  if(typeBadge) typeBadge.textContent = formatKategori(p.kategori);
  
  const scoreText = document.querySelector('.score-text');
  if(scoreText) scoreText.textContent = p.rating;
  
  const reviewsAnchor = document.querySelector('.reviews-anchor');
  if(reviewsAnchor) reviewsAnchor.textContent = p.terjual + ' terjual';
  
  // Rating stars inline
  const starsInline = document.querySelector('.stars-inline');
  if(starsInline) starsInline.innerHTML = renderStars(p.rating);
  
  // Harga
  const priceNow = document.querySelector('.price-now');
  if(priceNow) priceNow.textContent = formatRp(p.harga);
  
  const priceWas = document.querySelector('.price-was');
  const saveTag = document.querySelector('.save-tag');
  
  if (p.hargaCoret && priceWas && saveTag) {
    priceWas.textContent = formatRp(p.hargaCoret);
    saveTag.textContent = 'Hemat ' + formatRp(p.hargaCoret - p.harga);
    priceWas.style.display = 'inline';
    saveTag.style.display = 'inline-block';
  } else if (priceWas && saveTag) {
    priceWas.style.display = 'none';
    saveTag.style.display = 'none';
  }
  
  const summaryText = document.querySelector('.summary-text');
  if(summaryText) summaryText.textContent = p.deskripsi;
  
  // Stok & Units left
  const stockIndicator = document.querySelector('.stock-indicator');
  if(stockIndicator) stockIndicator.innerHTML = '<i class="bi bi-circle-fill"></i> Tersedia';
  
  const unitsLeft = document.querySelector('.units-left');
  if(unitsLeft) unitsLeft.style.display = 'none';
  
  // Sembunyikan variant picker (Color dots) karena tidak relevan
  const variantPicker = document.querySelector('.variant-picker');
  if(variantPicker) variantPicker.style.display = 'none';
  
  // Input quantity
  const qtyInput = document.querySelector('.quantity-input');
  if (qtyInput) {
    qtyInput.setAttribute('max', '9999');
    qtyInput.setAttribute('min', '1');
    qtyInput.value = '1';
  }
  
  // Tombol keranjang dan WA
  const addCartBtn = document.querySelector('.primary-action-btn');
  if (addCartBtn) {
    addCartBtn.classList.add('add-cart-btn');
    addCartBtn.setAttribute('data-id', p.id);
  }
  
  // Hapus/sembunyikan wishlist toggle
  const wishlistToggle = document.querySelector('.wishlist-toggle');
  if(wishlistToggle) wishlistToggle.style.display = 'none';
  
  // Tombol checkout sekarang -> Pesan via WA (Tugas checkout tahap 4 nanti akan mengubah ini, sementara biarkan id-nya siap)
  const checkoutNowBtn = document.querySelector('.checkout-now-btn');
  if(checkoutNowBtn) {
    checkoutNowBtn.innerHTML = '<i class="bi bi-whatsapp"></i> Pesan via WhatsApp';
    checkoutNowBtn.id = 'btn-wa-single';
    checkoutNowBtn.setAttribute('data-id', p.id);
  }
  
  // Tab Deskripsi
  const tabDesc = document.querySelector('#product-details-tab-desc .desc-content h3');
  if(tabDesc) {
    // Reset isi tab
    const descRow = document.querySelector('#product-details-tab-desc .desc-content .row');
    if(descRow) {
      descRow.innerHTML = `
        <div class="col-lg-12">
          <h3>Tentang Produk Ini</h3>
          <p>${p.deskripsi}</p>
        </div>
      `;
    }
  }
  
  // Tab Spesifikasi
  const tabSpecs = document.querySelector('#product-details-tab-specs .specs-content .row');
  if(tabSpecs) {
    let specRows = '';
    if(p.spesifikasi && p.spesifikasi.length > 0) {
      p.spesifikasi.forEach(spec => {
        const parts = spec.split(':');
        if(parts.length >= 2) {
          specRows += `<tr><td>${parts[0].trim()}</td><td>${parts.slice(1).join(':').trim()}</td></tr>`;
        } else {
          specRows += `<tr><td colspan="2">${spec}</td></tr>`;
        }
      });
    }
    
    tabSpecs.innerHTML = `
      <div class="col-md-12">
        <div class="spec-block">
          <h4>Spesifikasi Detail</h4>
          <table class="data-table">
            <tbody>
              ${specRows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
  
  // Terjemahkan Guarantee Bar
  const guaranteeBar = document.querySelector('.guarantee-bar');
  if(guaranteeBar) {
    guaranteeBar.innerHTML = `
      <div class="guarantee-item">
        <i class="bi bi-truck"></i>
        <span>Pengiriman Aman</span>
      </div>
      <div class="guarantee-item">
        <i class="bi bi-shield-check"></i>
        <span>Kualitas Terjamin</span>
      </div>
      <div class="guarantee-item">
        <i class="bi bi-headset"></i>
        <span>Layanan CS Cepat</span>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var s = window.SITE; if (!s) return;
  document.querySelectorAll('.js-wa').forEach(function (a) { a.href = 'https://wa.me/' + s.waNumber + '?text=' + encodeURIComponent('Halo, saya ingin konsultasi/memesan produk '+s.nama+'. Mohon info lebih lanjut.'); });
  document.querySelectorAll('.js-wa-label').forEach(function (e) { e.textContent = s.waLabel; });
  if (typeof PRODUCTS === 'undefined') return;
  document.querySelectorAll('.hero .product-tile').forEach(function (t, i) {
    var type = t.classList.contains('horizontal') ? 'horizontal' : (t.classList.contains('featured') ? 'featured' : 'default');
    var d = document.createElement('div'); d.innerHTML = renderHeroTile(PRODUCTS[i], type).trim(); t.replaceWith(d.firstElementChild);
  });
  var w = document.querySelector('.product-carousel .swiper-wrapper');
  if (w && typeof renderSlideCard === 'function') w.innerHTML = PRODUCTS.slice(0, 6).map(renderSlideCard).join('');
});

function renderSlideCard(p) {
  var desk = p.deskripsi.length > 55 ? p.deskripsi.substring(0, 55) + '...' : p.deskripsi;
  return '<div class="swiper-slide"><div class="slide-card"><div class="slide-card-image"><a href="' + p.slug + '.html"><img src="' + p.gambar + '" class="img-fluid" loading="lazy" alt="' + p.nama + '"></a>' + (p.hargaCoret ? '<span class="slide-badge accent">Promo</span>' : '') + '</div><div class="slide-card-body"><h4><a href="' + p.slug + '.html">' + p.nama + '</a></h4><p>' + desk + '</p><div class="slide-card-price"><span class="price-now">' + formatRp(p.harga) + '</span>' + (p.hargaCoret ? '<span class="price-was">' + formatRp(p.hargaCoret) + '</span>' : '') + '</div></div></div></div>';
}

document.addEventListener('DOMContentLoaded', function () {
  var s = window.SITE, w = document.getElementById('wa-float');
  if (w) {
    if (s && s.waNumber) { w.href = 'https://wa.me/' + s.waNumber + '?text=' + encodeURIComponent('Halo, saya ingin konsultasi/memesan produk '+s.nama+'. Mohon info lebih lanjut.'); w.classList.remove('d-none'); }
    else { w.style.display = 'none'; }
  }
  document.querySelectorAll('form.search-bar, form.mobile-search').forEach(function (f) {
    var inp = f.querySelector('input'), q = new URLSearchParams(location.search).get('q');
    if (inp && q && /search-results/.test(location.pathname)) inp.value = q;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = (inp && inp.value || '').trim();
      location.href = 'search-results.html' + (v ? '?q=' + encodeURIComponent(v) : '');
    });
  });
  var sg = document.getElementById('search-grid');
  if (sg && typeof PRODUCTS !== 'undefined') {
    var q2 = (new URLSearchParams(location.search).get('q') || '').trim().toLowerCase();
    var res = PRODUCTS.filter(function (p) { return !q2 || (p.nama + ' ' + p.deskripsi + ' ' + formatKategori(p.kategori)).toLowerCase().indexOf(q2) > -1; });
    document.getElementById('search-title').textContent = q2 ? 'Hasil pencarian: "' + q2 + '"' : 'Semua Produk';
    document.getElementById('search-count').textContent = res.length + ' produk ditemukan';
    sg.innerHTML = res.length ? res.map(function (p) { return '<div class="col-6 col-md-4 col-lg-3">' + renderProductTile(p) + '</div>'; }).join('')
      : '<div class="col-12 text-center py-5"><h4>Produk tidak ditemukan.</h4><a href="category.html" class="btn btn-primary mt-3">Lihat Semua Produk</a></div>';
  }

  // Active state for navbar
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navmenu a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href === path) {
      link.classList.add('active');
      var parent = link.closest('.dropdown');
      if (parent) {
        var parentLink = parent.querySelector('a');
        if (parentLink) parentLink.classList.add('active');
      }
    }
  });
});
