---
marp: true
theme: default
paginate: true
size: 16:9
style: |
  section {
    font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
    padding: 40px 60px;
    font-size: 24px;
    color: #333;
    background-color: #fff;
  }
  h1 {
    color: #AF1F24;
    font-size: 2em;
    border-bottom: 4px solid #AF1F24;
    padding-bottom: 8px;
    margin-top: 0;
  }
  h2 {
    color: #AF1F24;
    font-size: 1.4em;
    border-left: 8px solid #AF1F24;
    padding-left: 15px;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  h3 {
    color: #7F161A;
    font-size: 1.1em;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  a {
    color: #7F161A;
    text-decoration: underline;
  }
  strong {
    color: #7F161A;
    font-weight: bold;
  }
  pre {
    background-color: #F9EAEA !important;
    border: 1px solid #E5C3C4;
    border-radius: 6px;
    padding: 10px;
  }
  code {
    background-color: #F9EAEA;
    color: #7F161A;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
  }
  pre code {
    background-color: transparent;
    color: inherit;
    font-weight: normal;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    font-size: 0.9em;
  }
  th {
    background-color: #AF1F24;
    color: #fff;
    padding: 10px 15px;
    border: 1px solid #AF1F24;
    text-align: left;
  }
  td {
    padding: 10px 15px;
    border: 1px solid #E5C3C4;
  }
  tr:nth-child(even) {
    background-color: #F9EAEA;
  }
  .title-slide {
    text-align: center;
    background: linear-gradient(135deg, #AF1F24 0%, #7F161A 100%);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px;
  }
  .title-slide h1 {
    color: #fff;
    border-bottom: none;
    font-size: 2.6em;
    margin-bottom: 20px;
  }
  .title-slide h2 {
    color: #F9EAEA;
    border-left: none;
    font-size: 1.4em;
    padding-left: 0;
    margin-top: 0;
    opacity: 0.9;
  }
  .title-slide p {
    font-size: 1em;
    color: #F9EAEA;
    margin-top: 30px;
    opacity: 0.8;
  }
  .cols-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-top: 10px;
  }
---

<!-- _class: title-slide -->
<!-- _paginate: false -->
# JavaScript ワークショップ
## 🚀 HTML/CSSの次にやる！p2hacks実績ページの再現

公立はこだて未来大学 p2hacks実績ページ（2025年版）
主催: 運営チーム

---

# 1. Web開発における3つの技術の役割
Webサイトを構成する3つの要素の役割を理解しましょう。

| 技術 | 役割 | 例え話 | ギャラリーでの役割 |
| :--- | :--- | :--- | :--- |
| **HTML** | 骨組み・テキスト・構造 | 骨格や建物そのもの | 画像の配置、ボタンの設置 |
| **CSS** | 見た目・デザイン・レイアウト | 服装、壁紙、メイク | グリッド配置、モーダルの非表示化 |
| **JavaScript** | 動き・機能・インタラクション | 脳、神経、運動 | スライドの切り替え、モーダルの開閉 |

* **静的**なページ（HTML/CSS）から、ユーザーの操作に反応する**動的**なページ（JS）へ！

---

# 2. 【ステップ1】JSの基本：HTML要素を掴む
JavaScriptで画面の要素を動かすための2ステップ：
1. **要素を掴む（取得する）**
2. **イベントを検知して動かす（処理を実行する）**

### ① 要素を掴む: `document.querySelector()`
HTMLの特定のタグやクラス、IDをJS内に「変数」として取り込みます。
```javascript
// クラス名が title の要素を掴む（CSSのセレクタと同じ指定方法）
const titleElement = document.querySelector('.title');

// ID名が next-btn の要素を掴む
const nextBtn = document.querySelector('#next-btn');
```

---

# 2. 【ステップ1】JSの基本：イベントを検知して動かす
### ② イベントを検知して動かす: `addEventListener()`
「〜〜をクリックしたら、これを実行する」という命令を登録します。

```javascript
// 要素が「click」されたら、function() { ... } の中身を実行する
要素.addEventListener('click', function() {
  // ここに実行したい処理を書く
});
```

* **イベント名**には `'click'` の他に、`'mouseover'`（マウスを載せたとき）や `'keydown'`（キーボードを押したとき）などがあります。

---

# 2. 【ステップ1】解答コードと解説
タイトルをクリックしたときに、文字色を未来大カラーに変える実装です。

```javascript
// 1. タイトル要素（class="title"）を取得して変数に代入
const titleElement = document.querySelector('.title');

// 2. タイトルクリック時のイベントを登録
titleElement.addEventListener('click', function() {
  titleElement.style.color = '#AF1F24'; // CSSの color プロパティを書き換える
  console.log('タイトルがクリックされました！'); // デバッグログ
});
```

* **CSSプロパティの変更**: JSからは `要素.style.プロパティ名 = '値'` で直接CSSを変更できます。

---

# 3. 【ステップ2】スライドショーの仕組み
「次へ」や「前へ」ボタンでスライドの画像を切り替える機能です。

### データの準備（配列）と管理変数
複数枚の画像パスを**配列（Array）**に保存し、**インデックス（何枚目か）**を数値で管理します。

```javascript
// スライド画像のファイルパス配列
const images = [
  'assets/p2hacks2025_slide01.webp', // 0番目
  'assets/p2hacks2025_slide02.webp', // 1番目
  'assets/p2hacks2025_slide03.webp', // 2番目
  // ...
];

// 「いま何枚目？」を管理する変数（書き換えるため let で宣言）
let currentIndex = 0;
```

---

# 3. 【ステップ2】画像切り替えとループ処理のロジック
### 画像の切り替え
`<img>` タグの `src` 属性に、配列から取り出したファイルパスを代入します。
```javascript
slideImg.src = images[currentIndex];
```

### 最後の画像を超えたときのループ処理
インデックスを増やし続けた結果、配列の長さ（`images.length`）を超えたら `0`（最初）に戻します。

```javascript
currentIndex++; // インデックスを1増やす

if (currentIndex >= images.length) {
  currentIndex = 0; // 0に戻す
}
```

---

# 3. 【ステップ2】解答コード

```javascript
const slideImg = document.querySelector('#slide-img');
const prevBtn = document.querySelector('#prev-btn');
const nextBtn = document.querySelector('#next-btn');
let currentIndex = 0;

nextBtn.addEventListener('click', function() {
  currentIndex++;
  if (currentIndex >= images.length) { currentIndex = 0; }
  slideImg.src = images[currentIndex];
});

prevBtn.addEventListener('click', function() {
  currentIndex--;
  if (currentIndex < 0) { currentIndex = images.length - 1; }
  slideImg.src = images[currentIndex];
});
```

---

# 4. 【ステップ3】モーダル表示の仕組み
画像をクリックしたら拡大画面（モーダル）をかぶせて表示します。

<div class="cols-2">
<div>

### CSSでの表示制御 (`style.css`)
あらかじめ非表示にしておき、特定のクラス（`is-open`）がついたときだけ `display: flex` で表示させます。

```css
.modal {
  display: none; /* 初期状態は非表示 */
}
.modal.is-open {
  display: flex; /* クラス付与で表示 */
}
```
</div>
<div>

### JSでの表示切り替え
要素の `classList` プロパティを使って操作します。

```javascript
// クラス「is-open」を追加する
modal.classList.add('is-open');

// クラス「is-open」を削除する
modal.classList.remove('is-open');
```
</div>
</div>

---

# 4. 【ステップ3】拡大画像の動的反映
どの写真をクリックしたかによって、モーダル内に表示する画像も切り替える必要があります。

### 仕組み：`src` のコピー
クリックされたトリガーの画像の `src` 属性を取得し、モーダル内にある拡大用の `<img>` タグの `src` 属性にコピーして代入します。

```javascript
// トリガーの src を モーダル画像の src に代入
modalImg.src = zoomTrigger.src;
```

* これにより、HTMLで個別のモーダル画面を複数作らなくても、1つのモーダル用HTMLを使い回して異なる画像を拡大できます！

---

# 4. 【ステップ3】解答コード（開く・閉じる）

```javascript
const zoomTrigger = document.querySelector('#zoom-trigger');
const modal = document.querySelector('#modal');
const modalImg = document.querySelector('#modal-img');
const modalClose = document.querySelector('#modal-close');

// 1. 画像クリックで開く
zoomTrigger.addEventListener('click', function() {
  modalImg.src = zoomTrigger.src; // 画像srcのコピー
  modal.classList.add('is-open');  // モーダルの表示
});

// 2. 閉じるボタン（×）で閉じる
modalClose.addEventListener('click', function() {
  modal.classList.remove('is-open'); // モーダルを非表示
});
```

---

# 4. 【ステップ3】応用：背景クリックで閉じる
画像の外側の暗い背景部分をクリックした際にも、モーダルを閉じるようにします。

```javascript
modal.addEventListener('click', function(event) {
  // event.target には「実際にクリックされた要素」が入る
  if (event.target === modal) {
    modal.classList.remove('is-open');
  }
});
```

### 重要ポイント (`event.target`)
* モーダルの全体（背景部分）をクリックしたのか、それとも中央の画像（`modalImg`）をクリックしたのかを判別します。
* `event.target === modal` の条件判定がないと、拡大画像をクリックした際にも閉じてしまう不具合が起きます。

---

# 5. デバッグ方法＆まとめ
### エラーを見つける方法：`console.log()`
うまく動かない時は、ブラウザの「検証ツール（F12 / 右クリック -> 検証）」の「コンソール（Console）」タブを開きましょう。

* エラーメッセージ（赤い文字）が出ていれば、原因や該当する行数がわかります。
* `console.log(変数);` をコードの途中に挟み、変数の中に正しいデータが入っているか確かめましょう。

### まとめ
* **HTML/CSS (静的)**: 骨組みと見た目を作る
* **JavaScript (動的)**: ユーザーの操作に応じて属性（`src`）やクラス（`classList`）を書き換え、ページを動かす！
