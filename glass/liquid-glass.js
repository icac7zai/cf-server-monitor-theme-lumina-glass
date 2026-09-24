(() => {
  const CARD_SELECTOR = '.compact-node-card';
  const GLASS_CLASS = 'lg-glass';

  function enhanceCard(card) {
    if (!(card instanceof HTMLElement)) return;
    if (!card.matches(CARD_SELECTOR)) return;

    card.classList.add(GLASS_CLASS);

    if (card.dataset.lgReady === '1') return;
    card.dataset.lgReady = '1';

    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();

      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty('--lg-pointer-x', `${x}%`);
      card.style.setProperty('--lg-pointer-y', `${y}%`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--lg-pointer-x', '50%');
      card.style.setProperty('--lg-pointer-y', '0%');
    });
  }

  function scan() {
    document.querySelectorAll(CARD_SELECTOR).forEach(enhanceCard);
  }

  const observer = new MutationObserver(scan);

  function init() {
    scan();

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
