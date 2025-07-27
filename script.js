const products = [
  {
    id: 1,
    name: 'حقيبة يد',
    image: '1.avif',
    company: 'الخوارزمي',
    description: 'أنيقة وجميل',
    price: '$20',
    coupon: '10% off - SUMMER10',
    rating: 1
  },
  {
    id: 2,
    name: 'شوت نسائي',
    image: '2.avif',
    company: 'الخوارزمي',
    description: 'لون مناسب للحلات الراقية',
    price: '$30',
    coupon: '15% off - FIT15',
    rating: 2
  },
  {
    id: 3,
    name: 'معطر جو',
    image: '3.avif',
    company: 'الخوارزمي',
    description: 'ماركة عالمية تعطي المكان رونقاً وجمالاً',
    price: '30',
    coupon: '15% off - FIT15',
    rating: 3
  },
  {
    id: 4,
    name: 'سماعة الاذن',
    image: '4.avif',
    company: 'الخوارزمي',
    description: 'أضف لأفلامك وموسيقاك اللمسة التي تحتاجها',
    price: '$20',
    coupon: '15%',
    rating: 4
  },
  {
    id: 5,
    name: 'عطر اتشانيل',
    image: '5.avif',
    company: 'الخوارزمي',
    description: 'من ماركة العطور العالمين اتشانيل',
    price: '$45',
    coupon: '15%',
    rating: 5
  },
 
  // Add more products as needed
];

const slider = document.getElementById('product-slider');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
let sliderIndex = 0;

// Populate product cards
function renderProducts() {
  slider.innerHTML = '';
  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded shadow min-w-[250px] cursor-pointer';
    card.innerHTML = `
      <img src="${product.image}" class="w-full h-40 object-cover mb-2 rounded" />
      <h4 class="text-lg font-bold">${product.name}</h4>
      <p class="text-blue-600 font-semibold">${product.price}</p>
      <div class="stars mt-1" data-id="${product.id}">
        ${generateStars(product.rating)}
      </div>
    `;
    card.onclick = () => openModal(product, index);
    slider.appendChild(card);
  });
}

// Generate star HTML
function generateStars(rating) {
  let starsHTML = '';
  for (let i = 1; i <= 5; i++) {
    starsHTML += `<span class="${i <= rating ? 'text-yellow-400' : 'text-gray-300'}">&#9733;</span>`;
  }
  return starsHTML;
}

// Modal Logic
function openModal(product, index) {
  modal.classList.remove('hidden');
  document.getElementById('modal-image').src = product.image;
  document.getElementById('modal-name').textContent = product.name;
  document.getElementById('modal-company').textContent = product.company;
  document.getElementById('modal-description').textContent = product.description;
  document.getElementById('modal-price').textContent = product.price;
  document.getElementById('modal-coupon').textContent = product.coupon;

  const starsContainer = document.getElementById('modal-stars');
  starsContainer.innerHTML = generateStars(product.rating);
  const stars = starsContainer.querySelectorAll('span');
  stars.forEach((star, i) => {
    star.onclick = () => {
      products[index].rating = i + 1;
      renderProducts(); // update card rating
      openModal(products[index], index); // re-render modal
    };
  });
}

closeModal.onclick = () => modal.classList.add('hidden');

// Slider functionality
let autoSlide = setInterval(() => moveSlide(1), 4000);

function moveSlide(direction) {
  const itemWidth = slider.firstChild.offsetWidth + 16; // card width + margin
  const maxScroll = slider.scrollWidth - slider.clientWidth;
  slider.scrollLeft += itemWidth * direction;

  if (slider.scrollLeft >= maxScroll || slider.scrollLeft <= 0) {
    slider.scrollLeft = direction > 0 ? 0 : maxScroll;
  }
}

document.getElementById('nextBtn').onclick = () => moveSlide(1);
document.getElementById('prevBtn').onclick = () => moveSlide(-1);

// Initial Render
renderProducts();
