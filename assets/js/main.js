(function () {
  var root = document.documentElement;
  var script = document.currentScript;

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

  // ---------------------------------------------------------------
  // Search: loads /index.json on first use, matches every keyword
  // against title, tags, summary and body text.
  // ---------------------------------------------------------------
  var indexUrl = script && script.dataset.index;
  var indexPromise = null;
  var loadIndex = function () {
    if (!indexPromise) {
      indexPromise = fetch(indexUrl).then(function (r) { return r.json(); }).then(function (docs) {
        docs.forEach(function (d) {
          d._t = d.t.toLowerCase();
          d._g = d.g.join(" ").toLowerCase();
          d._s = d.s.toLowerCase();
          d._c = d.c.toLowerCase();
        });
        return docs;
      });
    }
    return indexPromise;
  };

  var esc = function (s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var reEsc = function (s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); };
  var mark = function (text, terms) {
    var html = esc(text);
    if (!terms.length) return html;
    var re = new RegExp("(" + terms.map(function (t) { return reEsc(esc(t)); }).join("|") + ")", "gi");
    return html.replace(re, "<mark>$1</mark>");
  };
  var count = function (hay, term) {
    var n = 0, i = hay.indexOf(term);
    while (i !== -1 && n < 5) { n++; i = hay.indexOf(term, i + term.length); }
    return n;
  };

  var search = function (docs, query) {
    var terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return { terms: terms, hits: [] };
    var hits = [];
    docs.forEach(function (d) {
      var score = 0;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i], s = 0;
        if (d._t.indexOf(t) !== -1) s += 12;
        if (d._g.indexOf(t) !== -1) s += 8;
        if (d._s.indexOf(t) !== -1) s += 4;
        s += count(d._c, t);
        if (!s) return; // every keyword must match somewhere
        score += s;
      }
      hits.push({ doc: d, score: score });
    });
    hits.sort(function (a, b) { return b.score - a.score || (a.doc.d < b.doc.d ? 1 : -1); });
    return { terms: terms, hits: hits.slice(0, 20) };
  };

  var snippet = function (d, terms) {
    var pos = -1;
    for (var i = 0; i < terms.length && pos === -1; i++) pos = d._c.indexOf(terms[i]);
    if (pos === -1) return d.s || d.c.slice(0, 90);
    var start = Math.max(0, pos - 30);
    return (start > 0 ? "…" : "") + d.c.slice(start, pos + 90) + "…";
  };

  var mountSearch = function (box) {
    var input = box.querySelector("input");
    var list = box.querySelector(".search-results");
    var status = box.querySelector(".search-status");
    var items = [], active = -1;

    var setActive = function (i) {
      if (!items.length) return;
      if (active >= 0 && items[active]) items[active].classList.remove("is-active");
      active = (i + items.length) % items.length;
      items[active].classList.add("is-active");
      items[active].scrollIntoView({ block: "nearest" });
    };

    var render = function () {
      var q = input.value.trim();
      loadIndex().then(function (docs) {
        if (q !== input.value.trim()) return;
        var res, html = "";
        if (!q) {
          res = { terms: [], hits: docs.slice(0, 6).map(function (d) { return { doc: d }; }) };
          status.textContent = "最近文章";
        } else {
          res = search(docs, q);
          status.textContent = res.hits.length ? "找到 " + res.hits.length + " 篇" : "没有找到相关文章";
        }
        res.hits.forEach(function (h) {
          var d = h.doc;
          html += '<li><a href="' + esc(d.u) + '">' +
            '<span class="sr-title">' + mark(d.t, res.terms) + "</span>" +
            (q ? '<span class="sr-snippet">' + mark(snippet(d, res.terms), res.terms) + "</span>" : "") +
            '<span class="sr-meta">' + d.d + (d.g.length ? " · " + esc(d.g.slice(0, 3).map(function (g) { return "#" + g; }).join(" ")) : "") + "</span>" +
            "</a></li>";
        });
        list.innerHTML = html;
        items = Array.prototype.slice.call(list.querySelectorAll("a"));
        active = -1;
        if (q && items.length) setActive(0);
      }).catch(function () { status.textContent = "搜索索引加载失败"; });
    };

    var timer;
    input.addEventListener("input", function () { clearTimeout(timer); timer = setTimeout(render, 80); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
      else if (e.key === "Enter" && items[active]) { e.preventDefault(); location.href = items[active].href; }
    });
    return { input: input, render: render };
  };

  var inlineBox = document.querySelector(".search-inline[data-search]");
  var inline = inlineBox && mountSearch(inlineBox);
  if (inline) {
    var q0 = new URLSearchParams(location.search).get("q");
    if (q0) inline.input.value = q0;
    inline.render();
    inline.input.focus();
  }

  var modal = document.querySelector(".search-modal");
  var modalSearch = modal && mountSearch(modal);
  var lastFocus = null;
  var openSearch = function () {
    if (inline) { inline.input.focus(); inline.input.select(); return; }
    if (!modal || !modal.hidden) return;
    lastFocus = document.activeElement;
    modal.hidden = false;
    root.classList.add("search-open");
    modalSearch.input.value = "";
    modalSearch.render();
    modalSearch.input.focus();
  };
  var closeSearch = function () {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    root.classList.remove("search-open");
    if (lastFocus) lastFocus.focus();
  };

  document.querySelectorAll("[data-search-open]").forEach(function (el) {
    el.addEventListener("click", function (e) { e.preventDefault(); openSearch(); });
  });
  if (modal) {
    modal.querySelector("[data-search-close]").addEventListener("click", closeSearch);
  }
  document.addEventListener("keydown", function (e) {
    var t = e.target;
    var typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(); }
    else if (e.key === "/" && !typing) { e.preventDefault(); openSearch(); }
    else if (e.key === "Escape") closeSearch();
  });
})();
