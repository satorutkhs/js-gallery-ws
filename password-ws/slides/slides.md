---
marp: true
theme: default
paginate: true
size: 16:9
style: |
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@700&display=swap');
  section {
    font-family: 'Inter', 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
    padding: 40px 60px;
    font-size: 23px;
    color: #eee;
    background-color: #0f0f1a;
  }
  h1 {
    color: #e84040;
    font-size: 1.9em;
    border-bottom: 4px solid #e84040;
    padding-bottom: 8px;
    margin-top: 0;
  }
  h2 {
    color: #e84040;
    font-size: 1.3em;
    border-left: 8px solid #e84040;
    padding-left: 15px;
    margin-top: 15px;
    margin-bottom: 12px;
  }
  h3 {
    color: #ff8888;
    font-size: 1.05em;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  a {
    color: #ff8888;
  }
  strong {
    color: #ff8888;
  }
  pre {
    background-color: #1a1a2e !important;
    border: 1px solid #333;
    border-radius: 8px;
    padding: 14px 16px;
  }
  code {
    background-color: #1a1a2e;
    color: #00ff88;
    font-family: 'JetBrains Mono', 'Courier New', Courier, monospace;
    font-size: 0.9em;
  }
  pre code {
    background-color: transparent;
    color: #c8f7c5;
    font-weight: normal;
    font-size: 0.88em;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    font-size: 0.88em;
  }
  th {
    background-color: #e84040;
    color: #fff;
    padding: 10px 14px;
    text-align: left;
  }
  td {
    padding: 9px 14px;
    border: 1px solid #2a2a3e;
    color: #ccc;
  }
  tr:nth-child(even) {
    background-color: #14142a;
  }
  ul {
    color: #ccc;
    line-height: 1.9;
  }
  li {
    margin-bottom: 4px;
  }
  .title-slide {
    text-align: center;
    background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px;
  }
  .title-slide h1 {
    color: #ff4444;
    border-bottom: none;
    font-size: 2.6em;
    margin-bottom: 16px;
    text-shadow: 0 0 30px #ff444466;
  }
  .title-slide h2 {
    color: #aaa;
    border-left: none;
    font-size: 1.2em;
    padding-left: 0;
    margin-top: 0;
    font-weight: 400;
  }
  .title-slide p {
    font-size: 0.95em;
    color: #666;
    margin-top: 30px;
  }
  .cols-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    margin-top: 10px;
  }
  .box {
    background: #14142a;
    border: 1px solid #2a2a3e;
    border-radius: 10px;
    padding: 16px 18px;
  }
  .green { color: #00ff88; }
  .red   { color: #e84040; }
  .yellow { color: #ffff00; }
---


<!-- _class: title-slide -->
<!-- _paginate: false -->

# ⏱ パスワードチャレンジ WS
## JS で動きのあるゲームを作ろう！

前回の p2hacks 実績ページ WS の続き

---

# 今日作るもの

ストップウォッチで測りながら、**7つの条件**を全部クリアするパスワードを作るゲーム

<div class="cols-2">
<div>

### ゲームの流れ
1. **スタートボタン** を押す → タイマー開始
2. パスワード入力欄に入力する
3. **1文字入力するたびに**条件を判定
4. 条件クリアで <span class="red">✗</span> → <span class="green">✓</span> に変化
5. **全条件クリア** → 🎰 パチンコ演出！

</div>
<div>

### 使うJSの技術（今日学ぶこと）
- `input` イベント（リアルタイム判定）
- 正規表現（`/[A-Z]/.test()`）
- `setInterval` / `clearInterval`
- `classList.add()` / `remove()`
- `createElement()` でDOM操作

</div>
</div>

---

# 7つの条件リスト

| # | 条件 | 判定の仕組み |
|---|------|-------------|
| 1 | 8文字以上 | `value.length >= 8` |
| 2 | 大文字（A〜Z）を含む | `/[A-Z]/.test(val)` |
| 3 | 数字（0〜9）を含む | `/[0-9]/.test(val)` |
| 4 | 記号（!@#$等）を含む | `/[!@#$%...]/.test(val)` |
| 5 | ¥（円記号）を含む | `val.includes('¥')` |
| 6 | 全角「Ａ」と半角「l」が連続 | `/Ａl/.test(val)` |
| 7 | 🍣（寿司絵文字）を含む | `val.includes('🍣')` |

* 条件は **1文字入力するたびにリアルタイムで判定** される！

---

# 【ステップ1】要素を取得する

今日も `document.querySelector()` で始まる。  
取得する要素が**前回より多い**ので、まとめて確認しよう。

```javascript
const passwordInput = document.querySelector('#password-input'); // 入力欄
const startBtn      = document.querySelector('#start-btn');      // スタートボタン
const timerDisplay  = document.querySelector('#timer');          // タイマー表示
const celebration   = document.querySelector('#celebration');    // クリア演出の枠
const finalTimeEl   = document.querySelector('#final-time');     // 最終タイム表示
const retryBtn      = document.querySelector('#retry-btn');      // もう一度ボタン
const confettiBox   = document.querySelector('#confetti-container'); // 紙吹雪の入れ物
```

* 前回と同じ書き方！**`#`をつけてIDで指定**する

---

# 【ステップ2】`input` イベントとは？

前回学んだのは **`click`** イベント（クリックで発火）。  
今回は **`input`** イベント（入力欄の文字が変わるたびに発火）を使う。

```javascript
// 入力欄の文字が変わるたびに実行される
passwordInput.addEventListener('input', function() {

  const value = passwordInput.value; // 今の入力内容を取得
  console.log(value);                // 入力のたびにコンソールに表示される！

});
```

### イベントの種類まとめ
| イベント名 | 発火するタイミング |
|------------|------------------|
| `click`    | クリックしたとき |
| `input`    | テキストが変わるたびに（キー入力ごと） |
| `keydown`  | キーボードのキーを押した瞬間 |

---

# 【ステップ2】条件の定義（配列＋オブジェクト）

各条件を**オブジェクト**でまとめ、それを**配列**に入れて管理する。

```javascript
const conditions = [
  {
    id: 'cond-length',
    // val.length = 入力文字数
    check: function(val) { return val.length >= 8; }
  },
  {
    id: 'cond-uppercase',
    // /[A-Z]/ = 「A〜Zのどれか」という正規表現パターン
    // .test(val) = val にそのパターンがあるか（true/false）
    check: function(val) { return /[A-Z]/.test(val); }
  },
  // ... 残りの条件も同じ形で続く
];
```

* **オブジェクト** = `{}` で囲んだデータの集まり（`id` と `check` をセットで持つ）
* **配列** = `[]` で囲んだリスト（conditions[0] で最初の条件にアクセスできる）

---

# 【ステップ2】正規表現とは？

**正規表現**（Regular Expression）= 文字列のパターンを表す記法。  
`/.../` のスラッシュで囲んで書く。

```javascript
/[A-Z]/.test("Hello")  // → true  （H が大文字）
/[A-Z]/.test("hello")  // → false （大文字なし）

/[0-9]/.test("abc123") // → true  （1 が含まれる）
/[0-9]/.test("abcdef") // → false （数字なし）

// includes() は正規表現なしで「そのまま」含まれるか確認できる
"hello🍣world".includes('🍣') // → true
"hello world".includes('¥')   // → false
```

### パターンの読み方
| 書き方 | 意味 |
|--------|------|
| `[A-Z]` | A〜Z の大文字 1文字 |
| `[0-9]` | 0〜9 の数字 1文字 |
| `[!@#]` | !、@、# のどれか |

---

# 【ステップ2】全条件を forEach でチェック

```javascript
passwordInput.addEventListener('input', function() {
  if (!isRunning) return; // タイマーが動いていなければスキップ

  const value = passwordInput.value;
  let allClear = true; // 全条件クリアフラグ

  // conditions 配列をひとつずつ処理
  conditions.forEach(function(condition) {
    const element = document.querySelector('#' + condition.id);
    const iconEl  = element.querySelector('.cond-icon'); // ✗ や ✓ の要素

    if (condition.check(value)) {
      element.classList.add('clear');   // → 緑クラスを追加
      iconEl.textContent = '✓';        // → アイコンを変更
    } else {
      element.classList.remove('clear'); // → 緑クラスを削除（赤に戻る）
      iconEl.textContent = '✗';
      allClear = false; // 1つでも未達成ならフラグをfalseに
    }
  });

  if (allClear) { celebrate(); } // 全クリアでパチンコ演出へ！
});
```

---

# 【ステップ3】ストップウォッチの実装

**`setInterval()`** = 一定時間ごとに処理を繰り返す関数

```javascript
let startTime    = null;  // 開始時刻（ミリ秒）
let timerInterval = null; // setInterval の返り値（止めるために保存）
let isRunning    = false; // 「今動いているか？」のフラグ

startBtn.addEventListener('click', function() {
  startTime = Date.now(); // 現在時刻を取得（1970年1月1日からのミリ秒）
  isRunning = true;
  startBtn.disabled = true;
  passwordInput.disabled = false;

  // 10ミリ秒ごとに表示を更新
  timerInterval = setInterval(function() {
    const elapsed = Date.now() - startTime; // 経過時間
    timerDisplay.textContent = formatTime(elapsed);
  }, 10);
});
```

---

# 【ステップ3】時間のフォーマット変換

ミリ秒の数字を `"01:23.45"` のような表示に変換する関数

```javascript
function formatTime(ms) {
  const minutes      = Math.floor(ms / 60000);          // 分
  const seconds      = Math.floor((ms % 60000) / 1000); // 秒
  const centiseconds = Math.floor((ms % 1000) / 10);    // 1/100秒

  // padStart(2, '0') = 1桁のとき先頭に '0' を補って2桁にする
  // 例: 5 → "05"、12 → "12"
  return (
    String(minutes).padStart(2, '0')      + ':' +
    String(seconds).padStart(2, '0')      + '.' +
    String(centiseconds).padStart(2, '0')
  );
}
```

* **`Math.floor()`** = 小数点以下を切り捨て（例: 3.7 → 3）
* **`%`（剰余演算子）** = 割った余り（例: 75 % 60 = 15）

---

# 【ステップ4】クリア演出（パチンコ風🎰）

```javascript
function celebrate() {
  clearInterval(timerInterval); // タイマーを止める
  isRunning = false;

  finalTimeEl.textContent = timerDisplay.textContent; // タイムをセット

  // 演出オーバーレイを表示
  // CSS で .is-active クラスがついたとき display: flex になるよう設定済み
  celebration.classList.add('is-active');

  createConfetti(); // 紙吹雪を生成！
}
```

* **`clearInterval(timerInterval)`** で `setInterval` を止める  
  ※止めるには `setInterval()` の返り値（ID）を保存しておく必要がある！

---

# 【ステップ4】紙吹雪を動的に生成する

**`document.createElement()`** = JSでHTMLの要素を新しく作る関数

```javascript
function createConfetti() {
  const colors = ['#ff0000', '#ff9900', '#ffff00', '#00ff66', '#0066ff'];

  for (let i = 0; i < 150; i++) {
    const piece = document.createElement('div'); // <div>を新しく作成
    piece.classList.add('confetti-piece');        // クラスを付ける

    // ランダムなスタイルを設定
    piece.style.left = Math.random() * 100 + '%'; // 横位置
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (Math.random() * 2 + 1.8) + 's'; // 落下速度

    confettiBox.appendChild(piece); // 画面に追加！
  }
}
```

* **`Math.random()`** = 0 以上 1 未満のランダムな小数を返す
* **`.appendChild()`** = 親要素の末尾に子要素を追加する

---

# 【難しめ】条件6：全角と半角の混在

> 全角「**Ａ**」（U+FF21）と半角「**l**」（U+006C）が連続する

<div class="cols-2">
<div>

### なぜ難しいの？
- 見た目は似ているが、**コンピュータ上では別の文字**
- 通常の「A」（U+0041）とは異なる
- **全角文字** = 日本語入力で大文字Aを押すと入力できる
- **半角文字** = 英語の普通の l（エル）

</div>
<div>

### 判定コード

```javascript
// /Ａl/ の Ａ は全角（コピペ注意！）
check: function(val) {
  return /Ａl/.test(val);
}
```

```
"PassＡlword" → ✓（含まれる）
"Password"   → ✗（ない）
"PAl..."     → ✗（Pは半角A）
```

</div>
</div>

---

# まとめ：今日学んだこと

| 技術 | 使い方 | 用途 |
|------|--------|------|
| `input` イベント | `addEventListener('input', ...)` | 文字入力ごとに判定 |
| 正規表現 | `/[A-Z]/.test(val)` | パターンマッチング |
| `includes()` | `val.includes('🍣')` | 特定の文字が含まれるか |
| `setInterval()` | `setInterval(fn, 10)` | 一定間隔で繰り返す |
| `clearInterval()` | `clearInterval(id)` | 繰り返しを止める |
| `classList` | `.add()` / `.remove()` | クラスの付け外し |
| `createElement()` | `document.createElement('div')` | 要素を動的に作る |
| `appendChild()` | `parent.appendChild(child)` | 要素を画面に追加 |

### 次のステップ（チャレンジ）
* タイムのランキングを `localStorage` で保存してみよう！
* 条件をランダムに増やしてみよう！

---

<!-- _class: title-slide -->
<!-- _paginate: false -->

# 🎰 挑戦してみよう！

## 全条件クリアを目指せ！

**パスワード例のヒント:**  
`¥Ａl!S🍣ushi9` ← これで全条件クリアできる？確認してみて！
