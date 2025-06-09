document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('fade-in');
  const emailForm = document.querySelector('.email-entry-section');
  const emailInput = document.getElementById('user-email');
  const emailSuccess = document.querySelector('.email-success');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-menu nav ul li a');
  const ctaButton = document.querySelector('.cta-btn');

  // Mobile menu toggle
  function toggleMenu() {
    const isOpen = hamburger.classList.contains('open');
    hamburger.classList.toggle('open');
    
    if (!isOpen) {
      mobileMenu.style.display = 'flex';
      setTimeout(() => {
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
      }, 10);
    } else {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => {
        mobileMenu.style.display = 'none';
      }, 300);
    }
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close menu when clicking links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu();
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggleMenu();
    }
  });

  // Show email section on CTA click only
  if (ctaButton) {
    ctaButton.addEventListener('click', function() {
      emailForm.classList.add('active');
      emailInput.focus();
    });
  }

  // Handle email submission
  if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (emailInput.value.trim() !== '') {
        emailSuccess.textContent = 'Thanks! We\'ll be in touch soon.';
        emailSuccess.style.display = 'block';
        emailInput.value = '';
        setTimeout(() => {
          emailSuccess.style.display = 'none';
          emailForm.classList.remove('active');
        }, 3000);
      }
    });
  }

  // Theme Switcher
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = document.getElementById('theme-icon');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current === 'light' ? 'dark' : 'light');
  }

  // Theme init
  const saved = localStorage.getItem('theme');
  setTheme(saved || 'light');
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.addEventListener('click', toggleTheme);

  // Premium fade-in animations
  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = 0;
    setTimeout(() => {
      el.style.opacity = 1;
      el.style.transform = 'none';
    }, 100);
  });
});