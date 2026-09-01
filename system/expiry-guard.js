/* expiry-guard.js */
(() => {
  // ====== CONFIG (edit these) ======
  const CONFIG = {
    // Array of field IDs to check (checks both fields if present)
    expiryFieldIds: ["fldGregExpiry", "b_fldGregExpiry"],

    // Optional: if your expiry is stored elsewhere, you can set a fallback here (leave "" to disable)
    expiryOverride: "",

    // Where to go when expired (can be: "expired.html" OR a full URL)
    expiredRedirectUrl: "https://services.balady.gov.sa/health/issue/printedlicenses?uuid=C8E80A1679D84DE",

    // Optional: pass a reference number to expired page
    referenceFieldId: "", // e.g. "fldRefNo"

    // If referenceFieldId is empty, you can hardcode one here (or leave "")
    referenceOverride: "",

    // Query param name used in expired page
    refParamName: "ref",
  };

  function parseYMD(str) {
    const s = String(str || "").trim();
    const m = s.match(/^(\d{4})[\/-](\d{2})[\/-](\d{2})$/);
    if (!m) return null;

    const y = +m[1], mo = +m[2], d = +m[3];
    const dt = new Date(y, mo - 1, d);

    // validate real date (prevents 2026/02/31 etc.)
    if (dt.getFullYear() !== y || dt.getMonth() !== (mo - 1) || dt.getDate() !== d) return null;
    return dt;
  }

  function isExpired(expiryStr) {
    const exp = parseYMD(expiryStr);
    if (!exp) return false;

    // date-only compare; valid THROUGH the expiry date (inclusive)
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const expiry = new Date(exp.getFullYear(), exp.getMonth(), exp.getDate());
    return today > expiry;
  }

  function getExpiryValues() {
    if (CONFIG.expiryOverride) return [CONFIG.expiryOverride.trim()];

    const values = [];
    for (const id of CONFIG.expiryFieldIds) {
      const fld = document.getElementById(id);
      if (fld) {
        const val = String(fld.value || fld.getAttribute("value") || "").trim();
        if (val) values.push(val);
      }
    }
    return values;
  }

  function getReferenceValue() {
    if (CONFIG.referenceFieldId) {
      const el = document.getElementById(CONFIG.referenceFieldId);
      const v = el ? (el.value || el.textContent || el.getAttribute("value") || "") : "";
      if (String(v).trim()) return String(v).trim();
    }
    return String(CONFIG.referenceOverride || "").trim();
  }

  function redirectExpired() {
    const target = new URL(CONFIG.expiredRedirectUrl, window.location.href);

    const ref = getReferenceValue();
    if (ref) target.searchParams.set(CONFIG.refParamName, ref);

    // Replace (no back-button loop)
    window.location.replace(target.toString());
  }

  document.addEventListener("DOMContentLoaded", () => {
    const expiryValues = getExpiryValues();
    
    // Triggers redirect if ANY of the populated fields are expired
    const hasExpired = expiryValues.some((val) => isExpired(val));
    if (hasExpired) redirectExpired();
  });
})();
