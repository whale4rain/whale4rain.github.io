(function () {
  var root = document.documentElement;

  // Theme toggle
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // Copy buttons on code blocks
  document.querySelectorAll("figure.code").forEach(function (fig) {
    var btn = fig.querySelector(".copy");
    var code = fig.querySelector("pre code");
    if (!btn || !code) return;
    btn.addEventListener("click", function () {
      var text = code.innerText.replace(/\n$/, "");
      var done = function () {
        btn.textContent = "已复制";
        btn.classList.add("is-done");
        setTimeout(function () { btn.textContent = "复制"; btn.classList.remove("is-done"); }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
    });
  });

  // Back to top
  var top = document.querySelector(".to-top");
  if (top) {
    var onScroll = function () { top.classList.toggle("is-visible", window.scrollY > 800); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  // Highlight the current section in the side table of contents
  var side = document.querySelector(".toc-side");
  if (side) {
    var links = {};
    side.querySelectorAll("a[href^='#']").forEach(function (a) {
      links[decodeURIComponent(a.getAttribute("href").slice(1))] = a;
    });
    var heads = Array.prototype.filter.call(
      document.querySelectorAll(".prose h1[id], .prose h2[id], .prose h3[id]"),
      function (h) { return links[h.id]; }
    );
    var current, ticking = false;
    var update = function () {
      ticking = false;
      var active = null;
      heads.forEach(function (h) { if (h.getBoundingClientRect().top < 120) active = h; });
      var link = active ? links[active.id] : null;
      if (link === current) return;
      if (current) current.classList.remove("is-active");
      current = link;
      if (current) current.classList.add("is-active");
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }
})();
