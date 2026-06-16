// ==========================================
// JavaScriptワークショップ テンプレートコード
// 🚀 HTML/CSSの次にやる！JavaScriptワークショップ
// ==========================================

// ==========================================
// 【ステップ1】JSの超基本：要素を掴んで動かす（15分）
// ==========================================
// ゴール：JSでHTMLの要素（タグ）を取得し、イベント（クリックなど）を検知して操作する感覚を掴む！

// TODO: 1. HTMLのタイトル要素（class="title"）を取得して、変数に代入してみましょう。
// ヒント: document.querySelector('.クラス名') を使います。
// const titleElement = ...

// TODO: 2. 取得した要素がクリックされたときに、文字の色を「赤」や「青」に変える処理を書いてみましょう。
// ヒント: 
// 要素.addEventListener('click', function() {
//   要素.style.color = '好きな色';
// });

/* === 【ステップ1の解答例・ヒント】(詰まったらここを参考にしてください) ===
const titleElement = document.querySelector('.title');
titleElement.addEventListener('click', function() {
  titleElement.style.color = '#b31b20'; // 文字の色を未来大カラーに変える例
  console.log('タイトルがクリックされました！'); // デバッグ用のログ出力
});
========================================= */


// ==========================================
// 【ステップ2】メイン機能①：スライドショーの実装（40分）
// ==========================================
// ゴール：「前へ」「次へ」ボタンでスライド画像を切り替え、最後の画像の次は最初に戻るループ処理を作る！

// 1. 必要なHTML要素を取得して変数に代入しましょう。
// TODO: スライド画像（id="slide-img"）、前へボタン（id="prev-btn"）、次へボタン（id="next-btn"）を取得します。
// ヒント: idで取得する場合は document.querySelector('#ID名') を使います。
// const slideImg = ...
// const prevBtn = ...
// const nextBtn = ...

// 2. データの準備（スライド用画像のファイルパスが入った配列です）
const images = [
  'assets/p2hacks2025_slide01.webp',
  'assets/p2hacks2025_slide02.webp',
  'assets/p2hacks2025_slide03.webp',
  'assets/p2hacks2025_slide04.webp',
  'assets/p2hacks2025_slide05.webp',
  'assets/p2hacks2025_slide06.webp'
];

// 3. 「いま何枚目の画像を表示しているか」を管理する変数を作りましょう。
// TODO: 最初の画像はインデックス 0 番目です。値が変化するため let で宣言します。
// let currentIndex = 0;

// 4. 「次へ」ボタンがクリックされたときの処理を書きましょう。
// TODO: nextBtn にクリックイベントを追加します。
// 処理の流れ:
//   ① currentIndex を 1 増やす (currentIndex++)
//   ② もし最後の画像（配列の長さ images.length）に達したら、最初の画像（0）に戻る if 文を書く
//   ③ スライド画像の src 属性を更新する (slideImg.src = images[currentIndex])
// nextBtn.addEventListener('click', function() {
//   
// });

// 5. 「前へ」ボタンがクリックされたときの処理を書きましょう。
// TODO: prevBtn にクリックイベントを追加します。
// 処理の流れ:
//   ① currentIndex を 1 減らす (currentIndex--)
//   ② もし 0 より小さくなったら（最初の画像より前に行こうとしたら）、最後の画像（images.length - 1）に戻る if 文を書く
//   ③ スライド画像の src 属性を更新する
// prevBtn.addEventListener('click', function() {
//   
// });

/* === 【ステップ2の解答例・ヒント】(詰まったらここを参考にしてください) ===
const slideImg = document.querySelector('#slide-img');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');

let currentIndex = 0;

// 初期表示時に1枚目の画像を反映（必要に応じて）
// slideImg.src = images[currentIndex];

nextBtn.addEventListener('click', function() {
  currentIndex++; // インデックスを1増やす
  
  // ループ処理：最後の枚数に達したら0に戻る
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  
  slideImg.src = images[currentIndex]; // 画像の切り替え
});

prevBtn.addEventListener('click', function() {
  currentIndex--; // インデックスを1減らす
  
  // ループ処理：0より小さくなったら最後の画像に戻る
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  
  slideImg.src = images[currentIndex]; // 画像の切り替え
});
========================================= */


// ==========================================
// 【ステップ3】メイン機能②：画像のズーム（モーダル）の実装（45分）
// ==========================================
// ゴール：受賞写真をクリックしたときに、画面全体に拡大画像（モーダル）を表示し、閉じるボタンや背景クリックで閉じられるようにする！

// 1. 必要なHTML要素を取得して変数に代入しましょう。
// TODO: クリックされる画像（id="zoom-trigger"）、モーダル全体（id="modal"）、モーダル内の画像（id="modal-img"）、閉じるボタン（id="modal-close"）を取得します。
// const zoomTrigger = ...
// const modal = ...
// const modalImg = ...
// const modalClose = ...

// 2. 写真がクリックされたらモーダルを開く処理を書きましょう。
// TODO: zoomTrigger にクリックイベントを追加します。
// 処理の流れ:
//   ① クリックされた画像の src 属性を取得して、モーダル内の画像の src 属性に代入する (modalImg.src = zoomTrigger.src)
//   ② モーダルを表示するために、モーダル要素に CSS クラス「is-open」を追加する (modal.classList.add('is-open'))
// zoomTrigger.addEventListener('click', function() {
//   
// });

// 3. 閉じるボタン（×）がクリックされたらモーダルを閉じる処理を書きましょう。
// TODO: modalClose にクリックイベントを追加します。
// 処理の流れ:
//   ① モーダル要素から CSS クラス「is-open」を削除する (modal.classList.remove('is-open'))
// modalClose.addEventListener('click', function() {
//   
// });

// 4. 【応用・ブラッシュアップ】黒い背景部分をクリックしても閉じられるようにしてみましょう。
// TODO: モーダル背景（modal）をクリックしたときに閉じる処理を追加します。
// ヒント: クリックされた要素そのもの（event.target）が背景（modal）である場合のみ閉じます。（中の画像 modalImg をクリックしたときは閉じないようにするため）
// modal.addEventListener('click', function(event) {
//   
// });

/* === 【ステップ3の解答例・ヒント】(詰まったらここを参考にしてください) ===
const zoomTrigger = document.querySelector('#zoom-trigger');
const modal = document.querySelector('#modal');
const modalImg = document.querySelector('#modal-img');
const modalClose = document.querySelector('#modal-close');

// 写真をクリックしたときにモーダルを開く
zoomTrigger.addEventListener('click', function() {
  modalImg.src = zoomTrigger.src; // 画像srcのコピー
  modal.classList.add('is-open');  // CSSクラスの追加
});

// ×ボタンをクリックしたときにモーダルを閉じる
modalClose.addEventListener('click', function() {
  modal.classList.remove('is-open'); // CSSクラスの削除
});

// モーダルの背景（黒部分）をクリックしたときにもモーダルを閉じる
modal.addEventListener('click', function(event) {
  // クリックされたターゲットが modal（背景）そのものであるかチェック
  if (event.target === modal) {
    modal.classList.remove('is-open');
  }
});
========================================= */