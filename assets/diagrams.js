/* Diagram popups - click any element carrying class "dg" and a data-k key.
   Reuses the cake popup overlay classes so every diagram speaks one language.
   Dictionary grows one block per diagram. */
(function () {
  "use strict";
  var D = {
    "loop-consumer": { t: "Consumer", s: "asks, refines, approves", b: "<p>The consumer never learns a query language, a tool, or a schema. They ask in plain words, push back, and approve when the analysis is right.</p><p>The conversation is the interface. The training course is gone.</p>" },
    "loop-agent": { t: "Agent", s: "discovers, explains, answers", b: "<p>The agent opens with the menu: it reads the semantic manifest, so it can say what the platform knows before anyone asks. It explains each metric from the definition it was served, reasoning included. And it answers only from governed metrics, never from raw tables.</p><p>The agent is exactly as good as the layer it reads. That cap is the feature.</p>" },
    "loop-semantic": { t: "Governed Semantic Layer", s: "one definition for every consumer", b: "<p>Every metric is defined once, in code, with its reasoning inside the definition. The agent&rsquo;s answer and the company dashboard compile from the same text, so they cannot disagree.</p><p>When a question has no metric, that is the intake: the unanswerable question becomes the next governed definition.</p>" },
    "loop-bi": { t: "BI Surface", s: "shipped to the club portal", b: "<p>When the consumer is satisfied, the agent drives the BI tool over MCP, materializes the conversation as a dashboard, and ships it into the club&rsquo;s portal, where it lives as part of the product the club sees every day.</p><p>Durable, and still regenerable: when a definition evolves, the portal&rsquo;s dashboards reprint from the same governed text that built them.</p>" },
    "loop-center": { t: "One Open Standard", s: "MCP at every hop", b: "<p>The Model Context Protocol carries both hops: the agent reading the governed layer, and the agent driving the BI surface. One standard in, one standard out.</p><p>Rinse, repeat. Every pass through the loop either answers from the library or grows it.</p>" }
  };

  function init() {
    var hots = document.querySelectorAll(".dg[data-k]");
    if (!hots.length) return;
    var ov = document.createElement("div");
    ov.className = "cake-pop-overlay";
    ov.innerHTML = '<div class="cake-pop"><button class="close" aria-label="Close">&times;</button><h3></h3><div class="sub"></div><div class="body"></div></div>';
    document.body.appendChild(ov);
    var h3 = ov.querySelector("h3"), sub = ov.querySelector(".sub"), body = ov.querySelector(".body"), closeBtn = ov.querySelector(".close");

    function open(k) {
      var d = D[k]; if (!d) return;
      h3.textContent = d.t; sub.textContent = d.s; body.innerHTML = d.b;
      ov.classList.add("is-open"); document.body.style.overflow = "hidden";
    }
    function close() { ov.classList.remove("is-open"); document.body.style.overflow = ""; }

    hots.forEach(function (el) {
      el.addEventListener("click", function () { open(el.getAttribute("data-k")); });
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "button");
      el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(el.getAttribute("data-k")); } });
    });
    ov.addEventListener("click", function (e) { if (e.target === ov || e.target === closeBtn) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && ov.classList.contains("is-open")) close(); });
  }
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", init); } else { init(); }
})();