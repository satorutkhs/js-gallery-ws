// ==========================================
// 【ステップ1】JSの超基本：要素を掴んで動かす
// ==========================================
// まずは動くかテスト（ここを最初にやると盛り上がります）
// const titleElement = document.querySelector('.title');
// titleElement.addEventListener('click', function() {
//   titleElement.style.color = 'blue';
// });


// ==========================================
// 【ステップ2】メイン機能①：スライドショーの実装
// ==========================================

// 1. 必要なHTML要素をつかむ
const slideImg = document.querySelector('#slide-img');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

// 2. データの準備（あやねさんのサイトから想定したスライド画像配列）
const images = [
  'assets/p2hacks2025_slide01.webp',
  'assets/p2hacks2025_slide02.webp',
  'assets/p2hacks2025_slide03.webp',
  'assets/p2hacks2025_slide04.webp',
  'assets/p2hacks2025_slide05.webp',
  'assets/p2hacks2025_slide06.webp'
];

// 3. 「いま何枚目？」を管理する変数
let currentIndex = 0;

// 4. 次へボタンの処理
nextBtn.addEventListener('click', function() {
  currentIndex++; // インデックスを1増やす
  
  // 【ループ処理の条件分岐】最後の枚数を超えたら0（最初）に戻る
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  
  // 画像のsrcを書き換える
  slideImg.src = images[currentIndex];
});

// 5. 前へボタンの処理
prevBtn.addEventListener('click', function() {
  currentIndex--; // インデックスを1減らす
  
  // 【条件分岐】0より小さくなったら最後の画像に戻る
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  
  slideImg.src = images[currentIndex];
});


// ==========================================
// 【ステップ3】メイン機能②：画像のズーム（モーダル）の実装
// ==========================================

// 1. 必要なHTML要素をつかむ
const zoomTrigger = document.querySelector('#zoom-trigger');
const modal = document.querySelector('#modal');
const modalImg = document.querySelector('#modal-img');
const modalClose = document.querySelector('#modal-close');

// 2. 写真がクリックされたらモーダルを開く
zoomTrigger.addEventListener('click', function() {
  // クリックされた画像のsrcを取得して、モーダル内の画像にコピー
  modalImg.src = zoomTrigger.src;
  
  // モーダルを表示（CSSの .is-open クラスを追加）
  modal.classList.add('is-open');
});

// 3. 閉じるボタン（×）がクリックされたらモーダルを閉じる
modalClose.addEventListener('click', function() {
  modal.classList.remove('is-open');
});

// 4. 【応用・ブラッシュアップ】黒い背景部分をクリックしても閉じられるようにする
modal.addEventListener('click', function(event) {
  // クリックされたのが画像そのものではなく、背景（modal）だったら閉じる
  if (event.target === modal) {
    modal.classList.remove('is-open');
  }
});