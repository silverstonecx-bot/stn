// balady-header-loader.js

// balady-header-fix.js
(function () {
  function applyFix() {
    if (!window.jQuery) return; // requires jQuery ($)

    var $ = window.jQuery;

    $(".mainHeader .dropdown-toggle")
      .attr("data-toggle", "dropdown")
      .removeAttr("data-bs-toggle");

    $(".mainHeader .navbar-toggler")
      .attr("data-toggle", "collapse")
      .removeAttr("data-bs-toggle");

    $(".mainHeader .navbar-toggler")
      .attr("data-target", "#navbarSupportedContent")
      .removeAttr("data-bs-target");
  }

  // Same behavior as your original (3500ms)
  setTimeout(applyFix, 3500);

  // Also run once on DOM ready (helps if header loads faster)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyFix);
  } else {
    applyFix();
  }
})();

(function () {
  function hasBS5() {
    return !!(window.bootstrap && window.bootstrap.Dropdown);
  }
  function hasBS4() {
    return !!(window.jQuery && window.jQuery.fn && window.jQuery.fn.dropdown);
  }

  function toBS4(root) {
    root.querySelectorAll('[data-bs-toggle]').forEach(el => {
      el.setAttribute('data-toggle', el.getAttribute('data-bs-toggle'));
      el.removeAttribute('data-bs-toggle');
    });
    root.querySelectorAll('[data-bs-target]').forEach(el => {
      el.setAttribute('data-target', el.getAttribute('data-bs-target'));
      el.removeAttribute('data-bs-target');
    });
    root.querySelectorAll('[data-bs-dismiss="modal"]').forEach(el => {
      el.setAttribute('data-dismiss', 'modal');
      el.removeAttribute('data-bs-dismiss');
    });
  }

  function toBS5(root) {
    root.querySelectorAll('[data-toggle]').forEach(el => {
      el.setAttribute('data-bs-toggle', el.getAttribute('data-toggle'));
      el.removeAttribute('data-toggle');
    });
    root.querySelectorAll('[data-target]').forEach(el => {
      el.setAttribute('data-bs-target', el.getAttribute('data-target'));
      el.removeAttribute('data-target');
    });
    root.querySelectorAll('[data-dismiss="modal"]').forEach(el => {
      el.setAttribute('data-bs-dismiss', 'modal');
      el.removeAttribute('data-dismiss');
    });
  }

  async function loadHeader() {
    const host = document.querySelector('[data-balady-header]');
    if (!host) return;

    const url = host.getAttribute('data-src') || 'balady-header.html';

    const res = await fetch(url, { cache: 'no-cache' });
    if (!res.ok) throw new Error('Header load failed: ' + res.status);
    const html = await res.text();

    host.innerHTML = html;

    const root = host.querySelector('.site-header-cont') || host;

    // Make dropdown/collapse work for whichever Bootstrap exists
    if (hasBS5()) toBS5(root);
    else if (hasBS4()) toBS4(root);

    // optional: your original delayed attributes fix (safe)
    setTimeout(function () {
      if (window.jQuery) {
        window.jQuery(".mainHeader .dropdown-toggle").attr("data-toggle", "dropdown").removeAttr("data-bs-toggle");
        window.jQuery(".mainHeader .navbar-toggler").attr("data-toggle", "collapse").removeAttr("data-bs-toggle");
        window.jQuery(".mainHeader .navbar-toggler").attr("data-target", "#baladyNavbar").removeAttr("data-bs-target");
      }
    }, 500);
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadHeader().catch(err => console.error(err));
  });
})();
