document.addEventListener("DOMContentLoaded", () => {
  const items = [...document.querySelectorAll(".gallery-item")]; const lightbox = document.querySelector("#lightbox"); const image = lightbox.querySelector("img"); const caption = lightbox.querySelector(".lightbox-caption"); let current = 0;
  const visible = () => items.filter((item) => !item.hidden);
  const show = (index) => { const item = visible()[index]; if (!item) return; current = index; image.src = item.dataset.src; image.alt = item.querySelector("img").alt; caption.textContent = item.dataset.caption; lightbox.classList.add("open"); };
  items.forEach((item) => item.addEventListener("click", () => show(visible().indexOf(item))));
  document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.classList.remove("open"));
  document.querySelector(".lightbox-prev").addEventListener("click", () => show((current - 1 + visible().length) % visible().length));
  document.querySelector(".lightbox-next").addEventListener("click", () => show((current + 1) % visible().length));
  document.addEventListener("keydown", (event) => { if (!lightbox.classList.contains("open")) return; if (event.key === "Escape") lightbox.classList.remove("open"); if (event.key === "ArrowLeft") document.querySelector(".lightbox-prev").click(); if (event.key === "ArrowRight") document.querySelector(".lightbox-next").click(); });
  document.querySelectorAll("[data-gallery-filter]").forEach((button) => button.addEventListener("click", () => { document.querySelectorAll("[data-gallery-filter]").forEach((item) => item.classList.remove("active")); button.classList.add("active"); items.forEach((item) => { item.hidden = button.dataset.galleryFilter !== "all" && item.dataset.category !== button.dataset.galleryFilter; }); }));
});