/* SortShot — main.js */

/* ── Navbar scroll effect ───────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const updateNavbar = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar(); // run on load
})();

/* ── Intersection Observer (reveal on scroll) ───────── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  els.forEach(el => observer.observe(el));
})();

/* ── Smooth anchor scrolling for nav links ──────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();

/* ── Hero badge typing effect ───────────────────────── */
(function initBadgePulse() {
  // Subtle pulsing glow on the primary CTA
  const btn = document.querySelector('.btn-primary');
  if (!btn) return;

  let direction = 1;
  let opacity = 0.25;
  let raf;

  function animate() {
    opacity += direction * 0.004;
    if (opacity >= 0.4) direction = -1;
    if (opacity <= 0.15) direction = 1;
    btn.style.setProperty('--glow-opacity', opacity);
    raf = requestAnimationFrame(animate);
  }

  animate();
  // Stop if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cancelAnimationFrame(raf);
  }
})();




/* ── Mac drag-and-drop chaos files random positions ─── */
(function initChaosAnimation() {
  const files = document.querySelectorAll('.chaos-file');
  files.forEach(file => {
    file.addEventListener('mouseenter', () => {
      file.style.transform = file.style.transform.replace('rotate', 'scale(1.05) rotate');
      file.style.borderColor = 'rgba(139,92,246,0.4)';
    });
    file.addEventListener('mouseleave', () => {
      file.style.borderColor = '';
    });
  });
})();

/* ── Pricing card shimmer on hover ──────────────────── */
(function initPricingShimmer() {
  const card = document.querySelector('.pricing-card');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.background = `
      radial-gradient(circle at ${x}% ${y}%, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.05) 40%, rgba(96,165,250,0.03) 100%)
    `;
  });

  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
})();
