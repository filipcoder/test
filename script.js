const cars = [
  {
    name: 'Audi A4 S Line (2020)',
    miles: '28,400 miles',
    fuel: 'Diesel • Automatic',
    price: '£22,495',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1541348263662-e068662d82af?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    name: 'Mercedes A200 AMG Line (2021)',
    miles: '19,300 miles',
    fuel: 'Petrol • Automatic',
    price: '£24,995',
    images: [
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    name: 'Volkswagen Golf R-Line (2022)',
    miles: '13,100 miles',
    fuel: 'Petrol • Manual',
    price: '£23,750',
    images: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    name: 'Range Rover Evoque (2019)',
    miles: '31,800 miles',
    fuel: 'Diesel • Automatic',
    price: '£28,490',
    images: [
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    name: 'BMW 520d M Sport (2020)',
    miles: '25,900 miles',
    fuel: 'Diesel • Automatic',
    price: '£27,995',
    images: [
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1000&q=80'
    ]
  },
  {
    name: 'Tesla Model 3 Standard (2021)',
    miles: '22,700 miles',
    fuel: 'Electric • Automatic',
    price: '£30,995',
    images: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1621993202323-f438eec934ff?auto=format&fit=crop&w=1000&q=80'
    ]
  }
];

function buildCarousel(images, altText) {
  return `
    <div class="carousel">
      <button class="carousel-btn prev" aria-label="Previous image">‹</button>
      <div class="carousel-track">
        ${images
          .map((img, index) => `<img src="${img}" alt="${altText} image ${index + 1}" class="${index === 0 ? 'active' : ''}" loading="lazy" />`)
          .join('')}
      </div>
      <button class="carousel-btn next" aria-label="Next image">›</button>
    </div>
  `;
}

function renderCars(containerId, carList) {
  const carGrid = document.getElementById(containerId);
  if (!carGrid) return;

  carGrid.innerHTML = carList
    .map(
      (car) => `
        <article class="car-card">
          ${buildCarousel(car.images, car.name)}
          ${car.featured ? '<span class="badge">Featured</span>' : ''}
          <h3>${car.name}</h3>
          <p class="car-meta">${car.miles}<br />${car.fuel}</p>
          <p class="price">${car.price}</p>
        </article>
      `
    )
    .join('');
}

function enableCarousels() {
  document.querySelectorAll('.carousel').forEach((carousel) => {
    const images = carousel.querySelectorAll('img');
    let current = 0;

    if (!images.length) return;

    const update = (nextIndex) => {
      images[current].classList.remove('active');
      current = (nextIndex + images.length) % images.length;
      images[current].classList.add('active');
    };

    carousel.querySelector('.prev').addEventListener('click', () => update(current - 1));
    carousel.querySelector('.next').addEventListener('click', () => update(current + 1));
  });
}

function renderSpotlight() {
  const spotlight = document.querySelector('[data-carousel-id="spotlight"] .carousel-track');
  if (!spotlight) return;

  const images = cars[0].images;
  spotlight.innerHTML = images
    .map(
      (img, index) =>
        `<img src="${img}" alt="Spotlight car image ${index + 1}" class="${index === 0 ? 'active' : ''}" loading="lazy" />`
    )
    .join('');
}

renderCars('car-grid', cars.slice(0, 3));
renderCars('all-car-grid', cars);
renderSpotlight();
enableCarousels();

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });
}

const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
