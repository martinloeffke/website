function matchTitleWidth() {
  const title = document.querySelector('.hero-title');
  const last = document.querySelector('.hero-title .name-last');
  if (!title || !last) return;

  const style = window.getComputedStyle(title);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const wMartin = ctx.measureText('Martin').width;
  const wLoeffke = ctx.measureText('Löffke').width;
  const diff = wMartin - wLoeffke;

  if (diff > 0 && wLoeffke > 0) {
    last.style.letterSpacing = `${diff / 5}px`;
  }
}

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(matchTitleWidth);
}
window.addEventListener('resize', matchTitleWidth);

const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach((item) => {
      item.style.display = filter === 'alle' || item.dataset.category === filter ? '' : 'none';
    });
  });
});

function openLightbox(item) {
  const img = item.querySelector('img');
  if (!img) return;

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  if (!lightbox || !lightboxImg) return;

  lightboxImg.src = img.src;
  lightbox.classList.add('open');
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) lightbox.classList.remove('open');
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});
