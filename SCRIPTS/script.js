// ===== TEMA PERSISTENTE =====
// Se ejecuta ANTES de que el DOM pinte, evita el flash de tema incorrecto
(function() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
})();

// ===== TOGGLE TEMA =====
function toggleTheme() {
  const html = document.documentElement;
  const btn = document.getElementById('themeBtn');
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  btn.textContent = next === 'dark' ? '☀️ Light' : '🌙 Dark';
}

// ===== TYPEWRITER EFFECT =====
function typewriter(elementId, text, speed, onDone) {
  const el = document.getElementById(elementId);
  let i = 0;
  el.textContent = '';
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (onDone) onDone();
    }
  }, speed);
}

window.addEventListener('DOMContentLoaded', () => {
  // Sincronizar botón con el tema guardado
  const saved = localStorage.getItem('theme') || 'dark';
  const btn = document.getElementById('themeBtn');
  if (btn) btn.textContent = saved === 'dark' ? '☀️ Light' : '🌙 Dark';

  const cursor1 = document.getElementById('cursor1');
  const cursor2 = document.getElementById('cursor2');

  setTimeout(() => {
    typewriter('typewriter-name', 'Deivi Narváez', 110, () => {
      setTimeout(() => {
        cursor1.style.display = 'none';
        cursor2.style.display = 'inline-block';
        typewriter('typewriter-role', 'Systems Engineer & Developer', 60, () => {});
      }, 500);
    });
  }, 600);

  // ===== SCROLL ANIMATIONS =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // Stagger children in grids
  document.querySelectorAll('.skills-grid, .projects-grid, .stats-grid').forEach(grid => {
    grid.querySelectorAll('.fade-up').forEach((el, i) => {
      el.style.transitionDelay = (i * 0.06) + 's';
    });
  });
});