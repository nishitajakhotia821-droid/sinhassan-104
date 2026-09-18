const beds = {
  upper: { label: "Upper Bed", price: 299, numbers: [4, 7, 10, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 44] },
  middle: { label: "Middle Bed", price: 399, numbers: [2, 6, 9, 12, 16, 19, 22, 25, 28, 31, 34, 37, 40, 43] },
  lower: { label: "Lower Bed", price: 499, numbers: [1, 5, 8, 11, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42] }
};

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  window.addEventListener("scroll", () => header?.classList.toggle("scrolled", window.scrollY > 25), { passive: true });
  menuButton?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "×" : "☰";
  });
  document.querySelectorAll(".fade-up").forEach((item) => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { item.classList.add("visible"); observer.disconnect(); } }, { threshold: .1 });
    observer.observe(item);
  });
});

function populateBedNumbers(typeSelect, numberSelect) {
  if (!typeSelect || !numberSelect) return;
  const update = () => {
    const selected = beds[typeSelect.value];
    numberSelect.innerHTML = '<option value="">Choose a bed number</option>';
    selected?.numbers.forEach((number) => { numberSelect.insertAdjacentHTML("beforeend", `<option value="${number}">Bed ${String(number).padStart(2, "0")}</option>`); });
    numberSelect.disabled = !selected;
  };
  typeSelect.addEventListener("change", update);
  update();
}