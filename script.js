document.addEventListener('DOMContentLoaded', function() {

    // Supabase setup
    const SUPABASE_URL = 'https://oxchklbakygkkyjmehlb.supabase.co'
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94Y2hrbGJha3lna2t5am1laGxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NjgwOTksImV4cCI6MjA2NTE0NDA5OX0.c1lp5cki7F-Pf4ZCpnyi1Jg3kZCbf2B6IzySTVE9vKk'
  
    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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
  emailForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const email = emailInput.value.trim();
  if (email === '') return;

  // Send to Supabase
  const { data, error } = await supabase
    .from('subscribers')
    .insert([{ email }]);

  if (error) {
    emailSuccess.textContent = 'Something went wrong. Try again.';
    emailSuccess.style.color = 'red';
    emailSuccess.style.display = 'block';
  } else {
    emailSuccess.textContent = 'Thanks! We\'ll be in touch soon.';
    emailSuccess.style.color = '';
    emailSuccess.style.display = 'block';
    emailInput.value = '';
    setTimeout(() => {
      emailSuccess.style.display = 'none';
      emailForm.classList.remove('active');
    }, 3000);
  }
});

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
