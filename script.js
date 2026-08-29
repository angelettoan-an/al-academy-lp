/* ============================================================
   al academy LP — script.js
   目次:
   1. ヘッダー：スクロール時のスタイル切り替え
   2. モバイルナビゲーションの開閉
   3. スクロールリビール（IntersectionObserver）
   4. FAQ：開いた項目以外を閉じる
   5. フッター：年号の自動更新
   ============================================================ */
(() => {
  "use strict";

  /* ============================================================
     1. ヘッダー：スクロール時のスタイル切り替え
     ============================================================ */
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ============================================================
     2. モバイルナビゲーションの開閉
     ============================================================ */
  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");

  const closeNav = () => {
    if (!navToggle || !siteNav) return;
    navToggle.classList.remove("is-open");
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  };

  const openNav = () => {
    if (!navToggle || !siteNav) return;
    navToggle.classList.add("is-open");
    siteNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.contains("is-open");
      isOpen ? closeNav() : openNav();
    });

    // ナビ内のリンクをクリックしたら自動的に閉じる
    siteNav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    // Escキーで閉じる
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ============================================================
     3. スクロールリビール（IntersectionObserver）
     ============================================================ */
  const revealTargets = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealTargets.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));
  } else {
    // 非対応ブラウザでは即座に表示
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ============================================================
     4. FAQ：開いた項目以外を閉じる（アコーディオン挙動）
     ============================================================ */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ============================================================
     5. フッター：年号の自動更新
     ============================================================ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
