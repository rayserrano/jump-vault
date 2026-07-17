/* Jump Vault - diagram lightbox
   Tap/click any .diagram-wrap marked with data-zoom to open it enlarged
   over a dimmed backdrop. Tap backdrop, press Esc, or tap the close control
   to dismiss. Progressive enhancement: if JS fails, diagrams still render inline. */
(function () {
  "use strict";

  function buildOverlay() {
    var overlay = document.createElement("div");
    overlay.className = "lb-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Enlarged diagram");
    overlay.innerHTML =
      '<button class="lb-close" aria-label="Close">&times;</button>' +
      '<div class="lb-stage"></div>' +
      '<div class="lb-hint">tap to close</div>';
    document.body.appendChild(overlay);
    return overlay;
  }

  function init() {
    var wraps = document.querySelectorAll(".diagram-wrap[data-zoom] svg");
    if (!wraps.length) return;

    var overlay = buildOverlay();
    var stage = overlay.querySelector(".lb-stage");
    var closeBtn = overlay.querySelector(".lb-close");

    function open(svg) {
      stage.innerHTML = "";
      var clone = svg.cloneNode(true);
      clone.removeAttribute("style");
      clone.setAttribute("width", "100%");
      clone.setAttribute("height", "100%");
      stage.appendChild(clone);
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
    function close() {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      stage.innerHTML = "";
    }

    wraps.forEach(function (svg) {
      var wrap = svg.closest(".diagram-wrap");
      wrap.classList.add("is-zoomable");
      wrap.setAttribute("tabindex", "0");
      wrap.setAttribute("role", "button");
      wrap.setAttribute("aria-label", "Tap to enlarge diagram");
      wrap.addEventListener("click", function () { open(svg); });
      wrap.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(svg); }
      });
    });

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target === closeBtn || e.target.className === "lb-hint") close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();