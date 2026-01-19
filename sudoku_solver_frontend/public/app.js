/*
  Shared JS for generated Figma screens.

  The provided YAML does not define explicit interactions (interactions: []).
  However, we add basic, accessible interactivity affordances:
  - Hover/press effects for CTA-like elements
  - Hover/focus-visible styles for navbar items and icon-like controls
  - Keyboard focusability (tabindex) for non-semantic clickable divs

  This is intentionally lightweight and defensive: it should not break
  pixel-fidelity layouts.
*/

(function () {
  const screens = document.querySelectorAll('.figma-screen');
  screens.forEach((s) => {
    s.dataset.jsReady = 'true';
  });

  /**
   * Adds hover/focus/press state classes to a list of elements.
   * Keeps styling in CSS via .is-hovered / .is-pressed / .is-focusable.
   */
  function enhanceInteractiveNodes(nodes) {
    nodes.forEach((el) => {
      if (!el) return;

      // Make divs keyboard-focusable when they are meant to behave like controls.
      if (!el.hasAttribute('tabindex')) {
        el.setAttribute('tabindex', '0');
      }
      el.classList.add('is-focusable');

      // Pointer interactions
      el.addEventListener('pointerenter', () => el.classList.add('is-hovered'));
      el.addEventListener('pointerleave', () => {
        el.classList.remove('is-hovered');
        el.classList.remove('is-pressed');
      });
      el.addEventListener('pointerdown', () => el.classList.add('is-pressed'));
      el.addEventListener('pointerup', () => el.classList.remove('is-pressed'));

      // Keyboard interactions
      el.addEventListener('keydown', (e) => {
        // Space/Enter should "press" the control.
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          el.classList.add('is-pressed');
        }
      });
      el.addEventListener('keyup', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          el.classList.remove('is-pressed');
        }
      });
    });
  }

  // Screen-specific enhancements (MacBook Pro 16" - 1 export: screen-60-194).
  const screen60194 = document.querySelector('.figma-screen.screen-60-194');
  if (screen60194) {
    // Navbar items (text) + icon-ish rectangles.
    const navNodes = [
      screen60194.querySelector('.node-60-240'), // Home
      screen60194.querySelector('.node-60-242'), // Menu group
      screen60194.querySelector('.node-60-245'), // Order Type group
      screen60194.querySelector('.node-60-241'), // Contact
      screen60194.querySelector('.node-60-248'), // search icon
      screen60194.querySelector('.node-60-249'), // hamburger menu icon
      screen60194.querySelector('.node-60-238'), // logo/icon background
    ].filter(Boolean);

    enhanceInteractiveNodes(navNodes);

    // CTA: Order Now pill + arrow circle.
    // We attach hover to a "logical region" by enhancing the text and main pill.
    const ctaNodes = [
      screen60194.querySelector('.node-60-255'),
      screen60194.querySelector('.node-60-258'),
      screen60194.querySelector('.node-60-259'),
      screen60194.querySelector('.node-60-262'),
    ].filter(Boolean);

    enhanceInteractiveNodes(ctaNodes);

    // Provide a nicer grouped hover: hovering on any CTA node highlights all CTA pieces.
    const ctaGroupAll = [
      '.node-60-255', '.node-60-256', '.node-60-257', '.node-60-258',
      '.node-60-259', '.node-60-260', '.node-60-261', '.node-60-262'
    ].map((sel) => screen60194.querySelector(sel)).filter(Boolean);

    function setCtaGroupClass(className, enabled) {
      ctaGroupAll.forEach((el) => {
        el.classList.toggle(className, enabled);
      });
    }

    ctaNodes.forEach((el) => {
      el.addEventListener('pointerenter', () => setCtaGroupClass('is-hovered', true));
      el.addEventListener('pointerleave', () => setCtaGroupClass('is-hovered', false));
      el.addEventListener('pointerdown', () => setCtaGroupClass('is-pressed', true));
      el.addEventListener('pointerup', () => setCtaGroupClass('is-pressed', false));
    });
  }
})();
