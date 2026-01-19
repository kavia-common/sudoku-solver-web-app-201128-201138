(function () {
  function onClick(action, handler) {
    document.querySelectorAll(`[data-action="${action}"]`).forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        handler(el);
      });
    });
  }

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
