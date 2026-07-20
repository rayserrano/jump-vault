/* The Layer Cake - click a layer to reveal what happens inside it */
(function () {
  "use strict";
  var L = {
    source: { t: "Source Layer", s: "the nine applications", b: "<p>Every application emits events as fans act: tickets bought, merch ordered, emails opened, app sessions. These are the raw signals, in each system's own shape.</p><p>Nothing is joined yet. This layer only captures that something happened.</p>" },
    ingest: { t: "Ingestion Layer", s: "transient raw capture", b: "<p>Events land here first, exactly as sent, before any transformation. Transient by design: it holds the raw truth just long enough to move it safely downstream.</p><p>If anything is ever in question, the unaltered original is here.</p>" },
    storage: { t: "Storage Layer", s: "persistent history, full audit trail", b: "<p>The permanent, append-only history. Every version of every record, kept. This is what lets the platform answer questions about the past, not just the present.</p><p>Nothing is overwritten. History is an asset, not a cost.</p>" },
    ods: { t: "Operational Layer", s: "real-time operational reporting", b: "<p>The fast lane. For questions that need an answer now rather than tomorrow: live operations, current-state reporting, the near-real-time view.</p><p>Same source, different temperature.</p>" },
    udm: { t: "Integration Layer", s: "Universal Data Model", b: "<p class='lead'>The translator. Different sources speaking the same language.</p><p>What happens here:</p><ul><li><b>Standardization</b> &mdash; \"fan\" means the same thing everywhere</li><li><b>Resolution</b> &mdash; the same person across four systems becomes one record</li><li><b>Enrichment</b> &mdash; scattered data points combine into one complete picture</li></ul><p>The Universal Data Model is the Rosetta Stone. Every layer above it inherits one governed truth, which is why they all agree with each other.</p>" },
    ml: { t: "ML Layer", s: "propensity, lifetime value, next best action", b: "<p>Models read from the one resolved record, so their predictions rest on complete history rather than a fragment. Propensity to churn, lifetime value, next best action.</p><p>Better input, not just a better algorithm.</p>" },
    marts: { t: "Club Marts", s: "each club's own governed copy", b: "<p>Every club gets its own mart, stamped from the integration layer. Their data, their metrics, wholly owned, never forked from the shared truth.</p><p>Ownership without divergence.</p>" },
    semantic: { t: "Semantic Layer", s: "one metric definition", b: "<p>One definition per metric, defined once and served everywhere. \"Active fan\" means the same thing in a dashboard, an API, and an agent's answer.</p><p>Governed in dbt MetricFlow, so nobody redefines the number in a spreadsheet.</p>" },
    bi: { t: "BI Layer", s: "dashboards, reports, APIs", b: "<p>The classic consumption surface: dashboards, scheduled reports, APIs. All reading the same governed metrics, so the numbers reconcile no matter who pulls them.</p>" },
    analysts: { t: "Analysts & Execs", s: "ad-hoc questions, strategic KPIs", b: "<p>People asking questions. Analysts run ad-hoc queries; executives watch the KPIs that matter. Both reach the same governed source, so the answer is the same wherever it is asked.</p>" },
    agents: { t: "Agentic Layer", s: "autonomous action", b: "<p>The agents act on the platform directly: Pricing Manager and Inventory Manager today, with Campaign Generator on the way. Because they read the one resolved truth, autonomous action rests on the same ground as human decisions.</p><p>Every path in this cake ends in a decision. This is the one that acts on its own.</p>" }
  };

  function init() {
    var layers = document.querySelectorAll(".cake-layer[data-k]");
    if (!layers.length) return;
    var ov = document.createElement("div");
    ov.className = "cake-pop-overlay";
    ov.innerHTML = '<div class="cake-pop"><button class="close" aria-label="Close">&times;</button><h3></h3><div class="sub"></div><div class="body"></div></div>';
    document.body.appendChild(ov);
    var pop = ov.querySelector(".cake-pop");
    var h3 = ov.querySelector("h3"), sub = ov.querySelector(".sub"), body = ov.querySelector(".body"), closeBtn = ov.querySelector(".close");

    function open(k) {
      var d = L[k]; if (!d) return;
      h3.textContent = d.t; sub.textContent = d.s; body.innerHTML = d.b;
      ov.classList.add("is-open"); document.body.style.overflow = "hidden";
    }
    function close() { ov.classList.remove("is-open"); document.body.style.overflow = ""; }

    layers.forEach(function (el) { el.addEventListener("click", function (e) { e.stopPropagation(); open(el.getAttribute("data-k")); }); });
    ov.addEventListener("click", function (e) { if (e.target === ov || e.target === closeBtn) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && ov.classList.contains("is-open")) close(); });
  }
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", init); } else { init(); }
})();