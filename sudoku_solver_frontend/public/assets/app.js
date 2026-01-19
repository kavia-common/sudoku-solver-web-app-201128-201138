(function () {
  /**
   * Shared tiny interactivity layer used by exported static pages in /public.
   * - Adds hover/focus/pressed classes for elements marked with `.figma-btn` or `.is-focusable`
   * - Provides click stubs for elements carrying `data-action="..."`
   */

  function onClick(action, handler) {
    document.querySelectorAll(`[data-action="${action}"]`).forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        handler(el);
      });

      // Keyboard accessibility for non-button elements
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handler(el);
        }
      });
    });
  }

  // Generic hover/focus/pressed affordances
  const interactiveSelector = ".figma-btn, .is-focusable, [data-action]";
  document.querySelectorAll(interactiveSelector).forEach((el) => {
    // Ensure keyboard focusability if the page forgot tabindex
    if (!el.hasAttribute("tabindex")) {
      el.setAttribute("tabindex", "0");
    }
    el.classList.add("is-focusable");

    el.addEventListener("mouseenter", () => el.classList.add("is-hovered"));
    el.addEventListener("mouseleave", () => {
      el.classList.remove("is-hovered");
      el.classList.remove("is-pressed");
    });

    el.addEventListener("focus", () => el.classList.add("is-hovered"));
    el.addEventListener("blur", () => {
      el.classList.remove("is-hovered");
      el.classList.remove("is-pressed");
    });

    el.addEventListener("mousedown", () => el.classList.add("is-pressed"));
    el.addEventListener("mouseup", () => el.classList.remove("is-pressed"));
  });

  // Existing click stubs (kept for backward compatibility)
  onClick("order-type", () => {
    // Minimal stub to simulate dropdown
    window.alert("Order Type dropdown (stub)");
  });

  onClick("order-now", () => {
    window.alert("Order Now (stub)");
  });

  onClick("play", () => {
    window.alert("Play video (stub)");
  });

  onClick("explore-enjoy", () => {
    window.scrollTo({ top: 2200, behavior: "smooth" });
  });

  onClick("explore-popular", () => {
    window.scrollTo({ top: 3076, behavior: "smooth" });
  });

  onClick("get-now", () => {
    window.alert("Get now (stub)");
  });

  onClick("know-more", () => {
    window.scrollTo({ top: 4655, behavior: "smooth" });
  });

  onClick("subscribe", () => {
    window.alert("Subscribe (stub)");
  });
})();
