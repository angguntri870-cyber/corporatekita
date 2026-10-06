// DATA PRODUK
const PRODUCTS = [
  // === SEMINAR KIT (4 terlaris) ===
  {
    "id": 6, "slug": "lanyard-id-card-printing",
    "nama": "Lanyard ID Card Printing",
    "kategori": "seminar-kit",
    "harga": 15000, "hargaCoret": 20000,
    "rating": 4.9, "terjual": 5000, "tanggal": "2023-06-22",
    "gambar": "assets/img/product/lanyard-id-card-printing-custom-mockup.webp",
    "deskripsi": "Tali lanyard ID card printing full color 2 sisi lebar 2cm dengan stopper. Cocok untuk acara seminar, pelatihan, dan workshop.",
    "spesifikasi": ["Bahan: Tisu / Nilon", "Lebar: 2 cm", "Cetak: Sublimasi Full Color", "Aksesoris: Stopper & Pengait Besi"],
    "minOrder": 1, "stok": true
  },
  {
    "id": 1, "slug": "tas-seminar-ransel-premium",
    "nama": "Tas Seminar Ransel Premium",
    "kategori": "seminar-kit",
    "harga": 125000, "hargaCoret": 150000,
    "rating": 4.8, "terjual": 450, "tanggal": "2023-01-15",
    "gambar": "assets/img/product/tas-seminar-ransel-eksekutif-premium.webp",
    "deskripsi": "Tas ransel premium untuk keperluan seminar dan pelatihan, terbuat dari bahan cordura awet dan tahan air.",
    "spesifikasi": ["Bahan: Cordura", "Ukuran: 30x40x15 cm", "Warna: Hitam, Navy", "Cetak: Sablon 1 Warna"],
    "minOrder": 1, "stok": true
  },
  {
    "id": 4, "slug": "blocknote-a5-custom",
    "nama": "Blocknote A5 Custom Spiral",
    "kategori": "seminar-kit",
    "harga": 12000, "hargaCoret": null,
    "rating": 4.7, "terjual": 2500, "tanggal": "2023-04-05",
    "gambar": "assets/img/product/blocknote-a5-custom-spiral-mockup.webp",
    "deskripsi": "Buku catatan jilid spiral ukuran A5, dengan cover custom full color. Ideal untuk peserta seminar.",
    "spesifikasi": ["Ukuran: A5 (14.8 x 21 cm)", "Isi: 50 Lembar HVS 70gr", "Cover: Art Carton 260gr", "Jilid: Spiral Kawat"],
    "minOrder": 1, "stok": true
  },
  

  // === SOUVENIR KANTOR (4 terlaris) ===
  {
    "id": 2, "slug": "pulpen-metal-eksklusif",
    "nama": "Pulpen Metal Eksklusif",
    "kategori": "souvenir-kantor",
    "harga": 25000, "hargaCoret": null,
    "rating": 4.5, "terjual": 1200, "tanggal": "2023-02-20",
    "gambar": "assets/img/product/pulpen-metal-eksklusif-custom-mockup.webp",
    "deskripsi": "Pulpen metal dengan ukiran laser logo perusahaan, cocok untuk souvenir promosi dan gift kantor.",
    "spesifikasi": ["Bahan: Metal", "Tinta: Hitam", "Finishing: Laser Engraving", "Packaging: Box Plastik"],
    "minOrder": 1, "stok": true
  },
  {
    "id": 9, "slug": "mug-keramik-custom",
    "nama": "Mug Keramik Custom Print",
    "kategori": "souvenir-kantor",
    "harga": 22000, "hargaCoret": null,
    "rating": 4.7, "terjual": 2100, "tanggal": "2023-08-11",
    "gambar": "assets/img/product/mug-keramik-custom-print-mockup.webp",
    "deskripsi": "Mug keramik standar SNI dengan cetakan full color tahan lama.",
    "spesifikasi": ["Bahan: Keramik SNI", "Kapasitas: 11 oz", "Cetak: Decal / Press Sublim", "Packaging: Box Putih Satuan"],
    "minOrder": 1, "stok": true
  },
  {
    "id": 19, "slug": "mousepad-custom-besar",
    "nama": "Mousepad Custom Deskmat",
    "kategori": "souvenir-kantor",
    "harga": 75000, "hargaCoret": 90000,
    "rating": 4.9, "terjual": 550, "tanggal": "2024-06-15",
    "gambar": "assets/img/product/mousepad-custom-deskmat-workspace.webp",
    "deskripsi": "Deskmat/mousepad ukuran besar yang nyaman dan melindungi meja kerja, print desain sesukamu.",
    "spesifikasi": ["Bahan: Rubber / Kain", "Ukuran: 80x30 cm", "Ketebalan: 3mm", "Cetak: Sublimasi Full Color"],
    "minOrder": 1, "stok": true
  },
  

  // === CORPORATE GIFT (4 terlaris) ===
  {
    "id": 15, "slug": "gift-set-kantor-premium",
    "nama": "Gift Set Eksekutif 3-in-1",
    "kategori": "corporate-gift",
    "harga": 250000, "hargaCoret": 280000,
    "rating": 5, "terjual": 120, "tanggal": "2024-02-14",
    "gambar": "assets/img/product/gift-set-eksekutif-3in1-premium.webp",
    "deskripsi": "Paket gift set mewah berisi agenda kulit, pulpen metal, dan tempat kartu nama.",
    "spesifikasi": ["Isi: Agenda A5 Kulit Sintetis, Pulpen Rollerball Metal, Card Holder", "Finishing: Emboss & Grafir Laser", "Packaging: Hardbox Eksklusif"],
    "minOrder": 1, "stok": true
  },
  {
    "id": 3, "slug": "tumbler-stainless-termos",
    "nama": "Tumbler Stainless Termos 500ml",
    "kategori": "corporate-gift",
    "harga": 45000, "hargaCoret": 55000,
    "rating": 4.9, "terjual": 800, "tanggal": "2023-03-10",
    "gambar": "assets/img/product/tumbler-stainless-termo-temp-500ml.webp",
    "deskripsi": "Tumbler stainless steel 500ml yang mampu menahan suhu panas/dingin hingga 8 jam.",
    "spesifikasi": ["Bahan: Stainless Steel 304", "Kapasitas: 500ml", "Tahan Panas/Dingin: 8 Jam", "Cetak: Laser / UV Print"],
    "minOrder": 1, "stok": true
  },
  {
    "id": 10, "slug": "powerbank-custom-10000mah",
    "nama": "Powerbank Custom 10000mAh",
    "kategori": "corporate-gift",
    "harga": 125000, "hargaCoret": 150000,
    "rating": 4.8, "terjual": 350, "tanggal": "2023-09-05",
    "gambar": "assets/img/product/powerbank-custom-10000mah-botani.webp",
    "deskripsi": "Powerbank kapasitas real 10000mAh dengan fitur fast charging dan UV print logo.",
    "spesifikasi": ["Kapasitas: 10000mAh Real Capacity", "Port: Dual USB, Type C Input", "Cetak: UV Print 1 Sisi", "Garansi: 6 Bulan"],
    "minOrder": 1, "stok": true
  },
  

  // === MERCHANDISE (4 terlaris) ===
  {
    "id": 24, "slug": "topi-baseball-bordir",
    "nama": "Topi Baseball Bordir",
    "kategori": "merchandise",
    "harga": 25000, "hargaCoret": 30000,
    "rating": 4.6, "terjual": 3200, "tanggal": "2024-10-01",
    "gambar": "assets/img/product/topi-baseball-bordir-custom-mockup.webp",
    "deskripsi": "Topi event bentuk baseball cap, serasi digunakan oleh panitia.",
    "spesifikasi": ["Bahan: Rapel / Drill", "Pengait Belakang: Cakop Besi / Velcro", "Cetak: Bordir", "Warna: Custom"],
    "minOrder": 1, "stok": true
  },
  {
    "id": 5, "slug": "kaos-polo-bordir",
    "nama": "Kaos Polo Bordir Perusahaan",
    "kategori": "merchandise",
    "harga": 85000, "hargaCoret": 95000,
    "rating": 4.6, "terjual": 600, "tanggal": "2023-05-12",
    "gambar": "assets/img/product/kaos-polo-bordir-perusahaan-globetech.webp",
    "deskripsi": "Kaos polo shirt bahan lacoste yang nyaman digunakan dengan bordir komputer rapi.",
    "spesifikasi": ["Bahan: Lacoste CVC", "Ukuran: S - XXL", "Cetak: Bordir Komputer", "Min. Warna Bordir: 3 Warna"],
    "minOrder": 1, "stok": true
  },
  {
    "id": 29, "slug": "jaket-hoodie-custom",
    "nama": "Jaket Hoodie Jumper Custom",
    "kategori": "merchandise",
    "harga": 145000, "hargaCoret": 160000,
    "rating": 4.8, "terjual": 620, "tanggal": "2025-01-12",
    "gambar": "assets/img/product/jaket-hoodie-jumper-custom-adventure.webp",
    "deskripsi": "Hoodie kekinian bahan katun fleece yang lembut dan tebal.",
    "spesifikasi": ["Bahan: Cotton Fleece", "Model: Jumper (tanpa resleting)", "Ukuran: M - XXL", "Cetak: Sablon Plastisol / Bordir"],
    "minOrder": 1, "stok": true
  },
  

  // === HAMPERS (4 terlaris) ===
  {
    "id": 30, "slug": "hampers-vvip-eksklusif",
    "nama": "Hampers VVIP Eksklusif",
    "kategori": "hampers",
    "harga": 1500000, "hargaCoret": 1750000,
    "rating": 5.0, "terjual": 12, "tanggal": "2023-12-10",
    "gambar": "assets/img/product/hampers-vvip-eksklusif-collection.webp",
    "deskripsi": "Hampers paling eksklusif untuk kolega VIP perusahaan dengan isi teh premium, keramik cantik, dan cemilan import.",
    "spesifikasi": ["Isi: Premium Tea, Keramik, Snack Import", "Packaging: Wooden Box 40x40cm", "Kartu Ucapan: Ya, Custom Grafir"],
    "minOrder": 1, "stok": true
  },
  {
    "id": 8, "slug": "hampers-lebaran-premium",
    "nama": "Paket Hampers Lebaran Premium",
    "kategori": "hampers",
    "harga": 350000, "hargaCoret": 400000,
    "rating": 5, "terjual": 150, "tanggal": "2023-03-01",
    "gambar": "assets/img/product/paket-hampers-lebaran-premium-raya.webp",
    "deskripsi": "Paket hampers elegan untuk hari raya, berisi aneka kue kering premium dan sajadah.",
    "spesifikasi": ["Isi: 3 Toples Kue, 1 Sajadah Travel", "Packaging: Hardbox Premium", "Kartu Ucapan: Custom", "Pita: Sesuai Tema"],
    "minOrder": 1, "stok": true
  },
  {
    "id": 21, "slug": "hampers-kopi-nusantara",
    "nama": "Gift Box Kopi Nusantara",
    "kategori": "hampers",
    "harga": 185000, "hargaCoret": 200000,
    "rating": 4.8, "terjual": 210, "tanggal": "2024-08-10",
    "gambar": "assets/img/product/gift-box-kopi-nusantara-selection.webp",
    "deskripsi": "Paket bingkisan untuk pecinta kopi, berisi dua jenis kopi single origin dan french press.",
    "spesifikasi": ["Isi: 2x 100gr Biji/Bubuk Kopi, 1 French Press 350ml", "Packaging: Kraft Box Rustic", "Aksesoris: Kartu Penjelasan Kopi"],
    "minOrder": 1, "stok": true
  },
  
];