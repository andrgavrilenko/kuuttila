// Kuuttila landing — vanilla interactions. No dependencies.

// Loader: fade out after load
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 800);
  }, 900);
});

// Navbar solidifies on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth anchor scroll with nav offset
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    if (a.getAttribute('href').length < 2) return;
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: a.getAttribute('href') === '#home' ? 0 : target.offsetTop - 70, behavior: 'smooth' });
  });
});

// Gallery lightbox
const lightbox = document.getElementById('lightbox');
const lbInner = lightbox.querySelector('.lightbox-inner');
const lbCaption = lightbox.querySelector('.lightbox-caption');
document.querySelectorAll('.gallery-tile').forEach((tile) => {
  tile.addEventListener('click', () => {
    lbInner.style.backgroundImage = tile.style.backgroundImage;
    lbCaption.textContent = '@kuuttilabar · ' + (tile.dataset.caption || '');
    lightbox.hidden = false;
  });
});
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.hidden = true; });
lightbox.querySelector('.lightbox-close').addEventListener('click', () => { lightbox.hidden = true; });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox.hidden = true; });

// Google Map loads only after an explicit click (GDPR: no third-party
// requests before the visitor asks for the map)
const mapBox = document.getElementById('aboutMap');
const showMapLink = document.getElementById('showMapLink');
if (showMapLink) {
  showMapLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (!mapBox.querySelector('iframe')) {
      const iframe = document.createElement('iframe');
      iframe.title = 'Kuuttila map';
      iframe.loading = 'lazy';
      iframe.src = mapBox.dataset.mapSrc;
      mapBox.append(iframe);
    }
    mapBox.hidden = !mapBox.hidden;
    if (!mapBox.hidden) mapBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// Newsletter fake submit
const form = document.getElementById('newsletterForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button');
  const input = form.querySelector('input');
  if (!input.value) return;
  input.value = '';
  btn.textContent = 'Subscribed!';
  btn.classList.add('sent');
  setTimeout(() => { btn.textContent = 'Join the List'; btn.classList.remove('sent'); }, 3000);
});
