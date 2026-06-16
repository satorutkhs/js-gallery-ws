// ==========================================
// 【ステップ1】JSの超基本：要素を掴んで動かす
// ==========================================

const titleElement = document.querySelector('.title');

titleElement.addEventListener('click', function() {
  titleElement.style.color = '#AF1F24';
});


// ==========================================
// 【ステップ2】メイン機能①：スライドショーの実装
// ==========================================

const slideImg = document.querySelector('#slide-img');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

const images = [
  'assets/p2hacks2025_slide01.webp',
  'assets/p2hacks2025_slide02.webp',
  'assets/p2hacks2025_slide03.webp',
  'assets/p2hacks2025_slide04.webp',
  'assets/p2hacks2025_slide05.webp',
  'assets/p2hacks2025_slide06.webp'
];

let currentIndex = 0;

nextBtn.addEventListener('click', function() {
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  slideImg.src = images[currentIndex];
});

prevBtn.addEventListener('click', function() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  slideImg.src = images[currentIndex];
});


// ==========================================
// 【ステップ3】メイン機能②：画像のズーム（モーダル）の実装
// ==========================================

const zoomTrigger = document.querySelector('#zoom-trigger');
const modal = document.querySelector('#modal');
const modalImg = document.querySelector('#modal-img');
const modalClose = document.querySelector('#modal-close');

zoomTrigger.addEventListener('click', function() {
  modalImg.src = zoomTrigger.src;
  modal.classList.add('is-open');
});

modalClose.addEventListener('click', function() {
  modal.classList.remove('is-open');
});

modal.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.classList.remove('is-open');
  }
});