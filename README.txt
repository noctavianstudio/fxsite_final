═══════════════════════════════════════════════════════════════════
  FX TEXTILE WEBSITE — IMAGE REPLACEMENT GUIDE
  v2.0 — June 2025
═══════════════════════════════════════════════════════════════════

STRUCTURE
---------
  index.html            → Ana sayfa / Home
  products.html         → Ürünler / Products
  sustainability.html   → Sürdürülebilirlik / Sustainability
  global.html           → Global Varlık / Global Presence
  certifications.html   → Sertifikalar / Certifications
  contact.html          → İletişim / Contact
  images/               → Tüm görseller buraya / All images here

HOW TO REPLACE IMAGES
----------------------
Simply drop your image file into the images/ folder with the EXACT
same filename. The HTML references will work automatically.

LOGOS (SVG or PNG — both work)
  images/logo-fx-textile.svg    ← FX Textile logo (white/light bg recommended)
  images/logo-harput.svg        ← Harput Holding logo

  The logos are used in:
  • Nav bar (filtered dark on light background)
  • Footer (filtered white on dark background)
  To use a PNG instead: rename your file and update the src in HTML.

HERO IMAGES (1600×900px minimum recommended)
  images/hero-index.jpg         ← Ana sayfa hero
  images/hero-products.jpg      ← Ürünler sayfası hero
  images/hero-sustainability.jpg ← Sürdürülebilirlik hero
  images/hero-global.jpg        ← Global sayfası hero
  images/hero-certifications.jpg ← Sertifikalar hero
  images/hero-contact.jpg       ← İletişim hero

WORLD MAP — global.html
  images/world-map.jpg          ← Dünya haritası
  Recommended: 1400×600px
  Active export regions to highlight:
    EU, Non-EU Europe, North America, Mid/South America,
    Africa, Middle East, Turkic Republics, CIS, Asia (Far East)

INDEX PAGE
  images/index-intro-weaving.jpg         (900×700)
  images/index-pillar-recycled.jpg       (600×280)
  images/index-pillar-dyehouse.jpg       (600×280)
  images/index-pillar-solar.jpg          (600×280)
  images/index-facility-kemalpaşa.jpg    (700×540) ← tall image
  images/index-facility-kinteks.jpg      (700×260)
  images/index-facility-weaving.jpg      (700×260)
  images/index-sector-clothing.jpg       (400×520)
  images/index-sector-sportswear.jpg     (400×520)
  images/index-sector-home.jpg           (400×520)
  images/index-sector-automotive.jpg     (400×520)
  images/index-sector-furnishing.jpg     (400×520)

PRODUCTS PAGE
  images/product-recycled-polyester.jpg  (600×380)
  images/product-organic-cotton.jpg      (600×380)
  images/product-rpet-viscose.jpg        (600×380)
  images/product-rpet-modal.jpg          (600×380)
  images/product-organic-viscose.jpg     (600×380)
  images/product-rpet-pes.jpg            (600×380)
  images/products-cert-docs.jpg          (800×540)
  images/products-material-detail.jpg    (800×540)

SUSTAINABILITY PAGE
  images/sustain-intro.jpg               (800×560)
  images/sustain-solar.jpg               (500×300)
  images/sustain-water.jpg               (500×300)
  images/sustain-recycled.jpg            (500×300)
  images/sustain-organic.jpg             (500×300)
  images/sustain-chemical.jpg            (500×300)
  images/sustain-energy.jpg              (500×300)
  images/sustain-circular.jpg            (800×660)
  images/sustain-esg-env.jpg             (500×220)
  images/sustain-esg-social.jpg          (500×220)
  images/sustain-esg-gov.jpg             (500×220)
  images/sustain-bsci.jpg                (350×140)
  images/sustain-higg.jpg                (350×140)
  images/sustain-inditex.jpg             (350×140)
  images/sustain-textile-exchange.jpg    (350×140)

CERTIFICATIONS PAGE
  images/cert-gots.jpg                   (700×240)
  images/cert-grs-ocs-rcs.jpg            (700×240)
  images/cert-trust.jpg                  (800×500)

CONTACT PAGE
  images/contact-facility-kemalpaşa.jpg  (500×220)
  images/contact-facility-kinteks.jpg    (500×220)
  images/contact-facility-weaving.jpg    (500×220)

NOTES
-----
• All images use object-fit:cover so they fill their container.
  Any aspect ratio will work — just be aware of what gets cropped.
• JPG, PNG and WebP are all fine — just keep the .jpg extension
  in the filename OR update the src in the HTML.
• The placeholder SVGs are dark-toned with dashed borders and
  labels so you can see exactly which image goes where.

LANGUAGE SWITCHING
------------------
EN / TR / ES toggle in the top bar.
The selected language is saved in localStorage and remembered
across page navigations.

═══════════════════════════════════════════════════════════════════
