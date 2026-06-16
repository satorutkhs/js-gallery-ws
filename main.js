// ==========================================
// 【ステップ1】JSの超基本：要素を掴んで動かす
// ==========================================

// TODO: 1. タイトル要素 (class="title") を取得しましょう
// const titleElement = 

// TODO: 2. タイトルをクリックしたときに、文字の色を未来大カラー（#AF1F24）に変えてみましょう
// titleElement.addEventListener...


// ==========================================
// 【ステップ2】メイン機能①：スライドショーの実装
// ==========================================

// TODO: 1. 必要なHTML要素を取得しましょう (slide-img, prev-btn, next-btn)
// const slideImg = 
// const prevBtn = 
// const nextBtn = 

// 2. スライド画像のファイルパス配列
const images = [
  'assets/p2hacks2025_slide01.webp',
  'assets/p2hacks2025_slide02.webp',
  'assets/p2hacks2025_slide03.webp',
  'assets/p2hacks2025_slide04.webp',
  'assets/p2hacks2025_slide05.webp',
  'assets/p2hacks2025_slide06.webp'
];

// 3. 現在の画像インデックスを管理する変数
// let currentIndex = 0;

// TODO: 4. 「次へ」ボタンクリック時の画像切り替え（ループ処理を含む）
// nextBtn.addEventListener...

// TODO: 5. 「前へ」ボタンクリック時の画像切り替え（ループ処理を含む）
// prevBtn.addEventListener...


// ==========================================
// 【ステップ3】メイン機能②：画像のズーム（モーダル）の実装
// ==========================================

// TODO: 1. 必要なHTML要素を取得しましょう (zoom-trigger, modal, modal-img, modal-close)
// const zoomTrigger = 
// const modal = 
// const modalImg = 
// const modalClose = 

// TODO: 2. 写真クリック時にモーダルを開き、画像のsrcをコピーして表示しましょう
// zoomTrigger.addEventListener...

// TODO: 3. 閉じるボタン（×）クリック時にモーダルを閉じましょう
// modalClose.addEventListener...

// TODO: 4. 【応用】黒い背景部分をクリックしたときもモーダルを閉じるようにしましょう
// modal.addEventListener...