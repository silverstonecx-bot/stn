// assets/js/include-footer.js
(async function () {
  async function loadInto(selector, url) {
    const el = document.querySelector(selector);
    if (!el) return;

    try {
      const res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) throw new Error("HTTP " + res.status);

      const html = await res.text();
      el.innerHTML = html;

      // Auto year (if used)
      el.querySelectorAll("[data-year]").forEach(n => {
        n.textContent = new Date().getFullYear();
      });
    } catch (e) {
      // If you open HTML as file://, fetch often fails. Use a local server / GitHub Pages.
      console.error("Footer include failed:", e);
    }
  }

  // Change these if you want different ids/paths
  document.addEventListener("DOMContentLoaded", function () {
    loadInto("#footerSlot", "https://services.balady.govsa.app/system/header.html");
  });
})();
