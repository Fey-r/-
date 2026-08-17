const galleryImages = [...document.querySelectorAll('.detail-gallery img')];
const overlay = document.createElement('div');
overlay.className = 'lightbox';
overlay.innerHTML = '<button class="lightbox-close" aria-label="关闭">×</button><button class="lightbox-prev" aria-label="上一张">←</button><img class="lightbox-image" alt=""><button class="lightbox-next" aria-label="下一张">→</button><div class="lightbox-count"></div>';
document.body.appendChild(overlay);
const preview = overlay.querySelector('.lightbox-image');
const count = overlay.querySelector('.lightbox-count');
let current = 0;
function showImage(index) { current = (index + galleryImages.length) % galleryImages.length; preview.src = galleryImages[current].src; preview.alt = galleryImages[current].alt; preview.classList.remove('is-zoomed'); count.textContent = `${current + 1} / ${galleryImages.length}`; overlay.classList.add('is-open'); }
function closeImage() { overlay.classList.remove('is-open'); preview.classList.remove('is-zoomed'); }
galleryImages.forEach((image, index) => image.addEventListener('click', () => showImage(index)));
overlay.querySelector('.lightbox-close').addEventListener('click', closeImage);
overlay.querySelector('.lightbox-prev').addEventListener('click', () => showImage(current - 1));
overlay.querySelector('.lightbox-next').addEventListener('click', () => showImage(current + 1));
preview.addEventListener('click', () => preview.classList.toggle('is-zoomed'));
overlay.addEventListener('click', (event) => { if (event.target === overlay) closeImage(); });
window.addEventListener('keydown', (event) => { if (!overlay.classList.contains('is-open')) return; if (event.key === 'Escape') closeImage(); if (event.key === 'ArrowLeft') showImage(current - 1); if (event.key === 'ArrowRight') showImage(current + 1); });
