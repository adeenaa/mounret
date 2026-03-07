document.addEventListener("DOMContentLoaded", async () => {

  /* =========================
     LOAD PARTIALS FIRST
  ========================== */

  const includes = document.querySelectorAll("[data-include]");

  for (const el of includes) {
    const file = el.getAttribute("data-include");
    if (!file) continue;

    try {
      const res = await fetch(file);
      const html = await res.text();
      el.innerHTML = html;
    } catch (err) {
      console.error("Failed to load:", file);
    }
  }

  /* =========================
     PRODUCT QUANTITY
  ========================== */

  const productData = { stock: 5, minQty: 1 };

  const qtyValue = document.querySelector(".qty-value");
  const minusBtn = document.querySelector(".qty-btn.minus");
  const plusBtn = document.querySelector(".qty-btn.plus");
  const stockStatus = document.querySelector(".stock-status");
  const priceBtn = document.querySelector(".price-btn");

  if (qtyValue && minusBtn && plusBtn) {

    let qty = productData.minQty;

    function updateStockUI() {
      if (productData.stock > 0) {
        stockStatus.textContent = "● IN STOCK";
        stockStatus.className = "stock-status in-stock";
        if (priceBtn) priceBtn.disabled = false;
      } else {
        stockStatus.textContent = "● OUT OF STOCK";
        stockStatus.className = "stock-status out-stock";
        if (priceBtn) priceBtn.disabled = true;
      }
    }

    plusBtn.onclick = () => {
      if (qty < productData.stock) qtyValue.textContent = ++qty;
    };

    minusBtn.onclick = () => {
      if (qty > productData.minQty) qtyValue.textContent = --qty;
    };

    updateStockUI();
  }

  /* =========================
     VIEW MORE GRID
  ========================== */

  document.querySelectorAll(".samples-page").forEach(section => {

    const grid = section.querySelector(".samples-grid");
    const cards = Array.from(section.querySelectorAll(".sample-card"));
    const btn = section.querySelector(".view-more");

    if (!grid || !cards.length || !btn) return;

    let expanded = false;

    function getColumns() {
      return window.getComputedStyle(grid)
        .getPropertyValue("grid-template-columns")
        .split(" ").length;
    }

    function updateView() {
      const visible = getColumns() * 2;

      cards.forEach((card, i) =>
        card.classList.toggle("hidden", !expanded && i >= visible)
      );

      btn.textContent = expanded ? "VIEW LESS ↑" : "VIEW MORE ↓";
      btn.style.display = cards.length <= visible ? "none" : "block";
    }

    btn.onclick = () => {
      expanded = !expanded;
      updateView();
    };

    updateView();
    window.addEventListener("resize", updateView);
  });

  /* =========================
     THUMBNAIL GALLERY (COVET STYLE)
  ========================== */

  const container = document.getElementById("thumbsContainer");
  const mainImage = document.getElementById("currentImage");
  const counter = document.getElementById("currentIndex");

  if (container && mainImage && counter) {

    const thumbs = container.querySelectorAll("img");

    function setActive(index) {
      thumbs.forEach(t => t.classList.remove("active"));
      thumbs[index].classList.add("active");
      mainImage.src = thumbs[index].src;
      counter.textContent = index + 1;
    }

    // click thumb
    thumbs.forEach((thumb, i) => {
      thumb.addEventListener("click", () => setActive(i));
    });

    // scroll update
    function stepSize() {
      const gap = parseInt(getComputedStyle(container).gap) || 0;
      return thumbs[0].offsetHeight + gap;
    }

    container.addEventListener("scroll", () => {
      const index = Math.round(container.scrollTop / stepSize());
      const safe = Math.min(index, thumbs.length - 1);
      setActive(safe);
    });
  }

});
//pricemodal
document.addEventListener("click", e => {

  const modal = document.getElementById("priceModal");
  const modalTitle = document.getElementById("modalTitle");

  // PRICE BUTTON
  if (e.target.closest(".price-btn")) {
    modalTitle.textContent = "REQUEST PRICE";
    modal?.classList.add("active");
  }

  // INFO LINKS (PDF / 3D / SAMPLES)
  const trigger = e.target.closest(".modal-trigger");
  if (trigger) {
    modalTitle.textContent = trigger.dataset.title;
    modal?.classList.add("active");
  }

  // CLOSE MODAL
  if (e.target.classList.contains("modal-close") ||
      e.target.classList.contains("modal-overlay")) {
    modal?.classList.remove("active");
  }

});

  
/* =========================
   TABS (Covet Style)
========================== */


function switchTab(tabId){

  document.querySelectorAll(".tab-content")
    .forEach(tab => tab.classList.remove("active"));

  document.getElementById(tabId)
    .classList.add("active");

  document.querySelectorAll(".info-menu p")
    .forEach(p => p.classList.remove("active"));

  event.target.classList.add("active");
}

/* =========================
   IMAGE POPUP
========================== */
document.addEventListener("DOMContentLoaded", () => {

  const viewer = document.getElementById("imageViewer");
  const viewerImg = document.getElementById("viewerImg");

  document.querySelectorAll(".popup-img").forEach(img => {
    img.addEventListener("click", () => {
      viewer.style.display = "flex";
      viewerImg.src = img.src;
      document.body.style.overflow = "hidden";
    });
  });

  document.querySelector(".close-viewer").addEventListener("click", closeViewer);

  viewer.addEventListener("click", e => {
    if (e.target === viewer) closeViewer();
  });

  function closeViewer(){
    viewer.style.display = "none";
    document.body.style.overflow = "auto";
  }

});