document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector("#bed-sections");
  const panel = document.querySelector("#selection-panel");
  const types = ["upper", "middle", "lower"];
  const icons = { upper: "01 · Elevated", middle: "02 · Balanced", lower: "03 · Easy access" };
  container.innerHTML = types.map((type) => `<section class="bed-section" id="${type}" data-bed-section="${type}"><div class="eyebrow">${icons[type]}</div><h2>${beds[type].label}s</h2><p>₹${beds[type].price} per night · 14 assigned beds</p><div class="bed-list">${beds[type].numbers.map((number) => `<button class="bed-tile" data-type="${type}" data-number="${number}"><strong>${String(number).padStart(2, "0")}</strong><span>Select bed</span></button>`).join("")}</div></section>`).join("");
  document.querySelectorAll(".bed-tile").forEach((tile) => tile.addEventListener("click", () => {
    document.querySelectorAll(".bed-tile").forEach((item) => item.classList.remove("selected")); tile.classList.add("selected");
    const type = beds[tile.dataset.type]; const number = tile.dataset.number;
    document.querySelector("#selected-bed").textContent = `Bed ${String(number).padStart(2, "0")}`;
    document.querySelector("#selected-type").textContent = `${type.label} · Preferred selection`; document.querySelector("#selected-price").textContent = `₹${type.price}`;
    document.querySelector("#continue-booking").href = `booking.html?type=${tile.dataset.type}&bed=${number}`; panel.hidden = false;
  }));
  document.querySelectorAll(".filter-tab").forEach((button) => button.addEventListener("click", () => { document.querySelectorAll(".filter-tab").forEach((item) => item.classList.remove("active")); button.classList.add("active"); document.querySelectorAll("[data-bed-section]").forEach((section) => { section.hidden = button.dataset.filter !== "all" && section.dataset.bedSection !== button.dataset.filter; }); }));
});