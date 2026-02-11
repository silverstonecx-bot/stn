// js/balady-top-header.js
(() => {
  async function mount({
    target = "#baladyTopHeaderMount",
    url = "https://services.balady.govsa.app/system/js/top-header.html",
    mode = "replace", // "replace" | "append"
  } = {}) {
    const host = typeof target === "string" ? document.querySelector(target) : target;
    if (!host) {
      console.warn("[BaladyTopHeader] Target not found:", target);
      return;
    }

    try {
      const res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) throw new Error(`Failed to load ${url} (${res.status})`);

      const html = (await res.text()).trim();

      const tpl = document.createElement("template");
      tpl.innerHTML = html;

      if (mode === "append") host.appendChild(tpl.content);
      else host.replaceChildren(tpl.content);

      // Optional: if you're using Bootstrap 5 but your markup uses data-toggle/data-target,
      // uncomment the next line to auto-add the bs5 attributes too.
      // patchBootstrap5Attrs(host);

    } catch (err) {
      console.error("[BaladyTopHeader] Load error:", err);
    }
  }

  // Optional helper for Bootstrap 5 compatibility (keeps original attrs too)
  function patchBootstrap5Attrs(root) {
    root.querySelectorAll("[data-toggle]").forEach((el) => {
      if (!el.hasAttribute("data-bs-toggle")) el.setAttribute("data-bs-toggle", el.getAttribute("data-toggle"));
    });
    root.querySelectorAll("[data-target]").forEach((el) => {
      if (!el.hasAttribute("data-bs-target")) el.setAttribute("data-bs-target", el.getAttribute("data-target"));
    });
    root.querySelectorAll("[data-dismiss]").forEach((el) => {
      if (!el.hasAttribute("data-bs-dismiss")) el.setAttribute("data-bs-dismiss", el.getAttribute("data-dismiss"));
    });
  }

  window.BaladyTopHeader = { mount };
})();
