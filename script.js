// Website Pribadi - Interactive JavaScript
// Smooth scroll, mobile nav, theme toggle, form handling, projects load

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initTheme();
  initProjects();
  initForm();
  setYear();
});

// Navigation
function initNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  
  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
  
  // Close on link click (mobile)
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('active'));
  });
  
  // Smooth scroll
  document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.getElementById('mainNav').classList.remove('active');
      }
    });
  });
}

// Theme Toggle
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Load saved theme
  const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  html.setAttribute('data-theme', saved);
  
  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// Projects from JSON
function initProjects() {
  fetch('projects.json')
    .then(res => res.json())
    .then(data => {
      const grid = document.getElementById('projectsGrid');
      grid.innerHTML = '';
      data.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
          <img src="${project.image || 'https://via.placeholder.com/400x250/3b82f6/ffffff?text=Proyek'}" alt="${project.title}" loading="lazy">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div style="margin-top:1rem;">
            <a href="${project.link}" class="btn" target="_blank">Lihat Demo</a>
            <a href="${project.code}" class="btn-outline" target="_blank" style="margin-left:0.5rem;">Kode Sumber</a>
          </div>
        `;
        grid.appendChild(card);
      });
    })
    .catch(() => {
      // Fallback static projects
      document.getElementById('projectsGrid').innerHTML = `
        <div class="project-card">
          <img src="https://via.placeholder.com/400x250/10b981/ffffff?text=E-Commerce" alt="E-Commerce">
          <h3>Toko Online Responsif</h3>
          <p>Website belanja dengan cart & checkout mockup.</p>
          <a href="#" class="btn">Demo</a>
        </div>
        <div class="project-card">
          <img src="https://via.placeholder.com/400x250/059669/ffffff?text=Dashboard" alt="Dashboard">
          <h3>Sistem Absensi</h3>
          <p>Dashboard admin/siswa dengan QR code.</p>
          <a href="#" class="btn">Demo</a>
        </div>
        <div class="project-card">
          <img src="https://via.placeholder.com/400x250/f59e0b/ffffff?text=Portfolio" alt="Portfolio">
          <h3>Portfolio Fotografer</h3>
          <p>Gallery + booking form + WhatsApp integration.</p>
          <a href="#" class="btn">Demo</a>
        </div>
      `;
    });
}

// Contact Form
function initForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  const clearBtn = document.getElementById('clearBtn');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    
    // Simulate send (replace with EmailJS/Netlify for real)
    status.textContent = 'Mengirim...';
    status.className = 'status sending';
    
    setTimeout(() => {
      status.textContent = 'Pesan terkirim! Terima kasih. (Simulasi - ganti dengan EmailJS untuk email nyata)';
      status.className = 'status success';
      form.reset();
    }, 1500);
  });
  
  clearBtn.addEventListener('click', () => form.reset());
}

// Utils
function setYear() {
  document.getElementById('year').textContent = new Date().getFullYear();
}
