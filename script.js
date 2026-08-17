if (document.body.classList.contains('home')) {
  const stage = document.querySelector('.cursor-stage');
  const trailImages = ['images/trail-01.jpg','images/trail-02.png','images/trail-03.jpg','images/trail-04.jpg','images/trail-05.jpg','images/trail-06.jpg'];
  let lastTrail = 0, trailIndex = 0;
  const trail = document.createElement('div'); trail.className = 'cursor-trail'; document.body.appendChild(trail);
  const hero = document.querySelector('.hero');
  function isHeroVisible() { const rect = hero.getBoundingClientRect(); return rect.top <= 0 && rect.bottom > 0; }
  function clearTrail() { trail.replaceChildren(); stage.classList.remove('active'); }
  function addTrailImage(event) { const now = performance.now(); if (now - lastTrail < 120) return; lastTrail = now; const image = document.createElement('img'); image.src = trailImages[trailIndex++ % trailImages.length]; image.alt = ''; image.className = 'cursor-trail-image'; image.style.left = `${event.clientX}px`; image.style.top = `${event.clientY}px`; image.style.setProperty('--rotation', `${-5 + Math.random() * 10}deg`); trail.appendChild(image); while (trail.children.length > 6) trail.firstElementChild.remove(); window.setTimeout(() => image.remove(), 560); }
  window.addEventListener('pointermove', (event) => { if (!isHeroVisible()) { clearTrail(); return; } if (event.pointerType !== 'touch') addTrailImage(event); stage.classList.add('active'); window.clearTimeout(stage._timer); stage._timer = window.setTimeout(() => stage.classList.remove('active'), 560); });
  const cards = [...document.querySelectorAll('.project')]; let scrollDirection = 1, lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => { scrollDirection = window.scrollY >= lastScrollY ? 1 : -1; lastScrollY = window.scrollY; if (!isHeroVisible()) clearTrail(); }, { passive: true });
  const revealObserver = new IntersectionObserver((entries) => { const entering = entries.filter((entry) => entry.isIntersecting); entering.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top); entering.forEach((entry, index) => { const card = entry.target; const visualOrder = scrollDirection > 0 ? entering.length - index - 1 : index; card.style.setProperty('--reveal-delay', `${visualOrder * 95}ms`); card.classList.add('is-visible'); }); entries.filter((entry) => !entry.isIntersecting).forEach((entry) => { entry.target.classList.remove('is-visible'); entry.target.style.removeProperty('--reveal-delay'); }); }, { threshold: 0.12 });
  cards.forEach((card) => revealObserver.observe(card));
}
