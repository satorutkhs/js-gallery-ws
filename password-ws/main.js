// ==========================================
// 【ステップ1】HTML要素を取得する
// ==========================================
// document.querySelector('#ID名') でHTMLの要素を変数に代入する
// CSS と同じセレクタ記法（# = ID、. = クラス）を使う

const passwordInput = document.querySelector('#password-input'); // パスワード入力欄
const startBtn = document.querySelector('#start-btn');      // スタートボタン
const timerDisplay = document.querySelector('#timer');          // タイマー表示エリア

// ──【ワーク】以下の3つのHTML要素も document.querySelector を使って取得してみよう！ ──
const celebration = null; // TODO: '#celebration' (クリア画面の枠) を取得する
const finalTimeEl = null; // TODO: '#final-time' (クリア画面に出す最終タイム) を取得する
const retryBtn = null; // TODO: '#retry-btn' (もう一度ボタン) を取得する

// 【今だけ表示される注意】
// このワークが終わるまで、ブラウザのコンソールに
// 「Cannot read properties of null (reading 'addEventListener')」というエラーが出ます。
// これは retryBtn がまだ null（何も取得できていない）状態で、
// ファイル下部の retryBtn.addEventListener(...) が実行されてしまうためです。
// 上の3つを正しく取得できると、このエラーは自然に消えます。
// → 「nullのプロパティは読めない」というエラーメッセージの読み方を覚える良い機会です！


// ==========================================
// 【ステップ2】パスワード条件の定義と判定
// ==========================================
// 各条件を「オブジェクト」として配列にまとめて管理する。
// check: (val) => ... は「val（入力値）を受け取ってtrueかfalseを返す関数」
//
// 【正規表現とは？】
//   /パターン/.test(文字列) で、文字列がパターンに一致するかを判定できる。
//   - [A-Z]  → A〜Z の大文字1文字
//   - [0-9]  → 0〜9 の数字1文字
//   - [!@#]  → !、@、# のどれか1文字

const conditions = [
  {
    id: 'cond-length',
    // .length で文字数を取得し、8文字以上かチェック
    check: function (val) {
      return val.length >= 8;
    }
  },
  {
    id: 'cond-uppercase',
    // /[A-Z]/ = 「A〜Zのどれか」にマッチする正規表現
    // .test(val) = val にマッチする文字があるか（true/false）
    check: function (val) {
      return /[A-Z]/.test(val);
    }
  },
  // ──【ワーク】ここから下の条件判定を自分で書いてみよう！ ──
  // （ヒント：スライドの正規表現や includes の説明を参考にしよう）
  {
    id: 'cond-number',
    // 3. 数字（0〜9）を含む
    check: function (val) {
      // TODO: ここに数字が含まれているか判定するコードを書く
      // return ...;
    }
  },
  {
    id: 'cond-symbol',
    // 4. 記号（! @ # $ % など）を含む
    check: function (val) {
      // TODO: ここに記号が含まれているか判定するコードを書く
      // return ...;
    }
  },
  {
    id: 'cond-yen',
    // 5. ¥（円記号）を含む
    check: function (val) {
      // TODO: ここに¥が含まれているか判定するコードを書く
      // return ...;
    }
  },
  // ──【ワーク】ここまで ──
  {
    id: 'cond-zenkaku',
    // 【ポイント！】全角「Ａ」（U+FF21）と半角「l」（U+006C）は見た目が似ているが別の文字！
    // 全角の「Ａ」= 幅が広い大文字A（日本語フォントで使われる）→ キーボードの「A」を全角入力
    // 半角の「l」 = 普通の小文字エル（英語のL）
    // /Ａl/ という正規表現で「Ａ」のあとに「l」が連続する箇所を探す
    check: function (val) {
      return /Ａl/.test(val);
    }
  },
  {
    id: 'cond-sushi',
    // 🍣 = 寿司の絵文字（そのまま includes で判定できる！）
    check: function (val) {
      return val.includes('🍣');
    }
  }
];


// ── パスワードが入力・変更されるたびに実行される ──
// 'input' イベント = テキストが変わるたびに発火する（キーを押すたびに動く）
passwordInput.addEventListener('input', function () {

  // スタートしていない場合は何もしない
  if (!isRunning) return;

  const value = passwordInput.value; // 今の入力値を取得
  let allClear = true;               // 全条件クリアフラグ（最初はtrueで始める）

  // conditions 配列をひとつずつ処理（forEach = 繰り返し）
  conditions.forEach(function (condition) {
    // IDを使って条件の<li>要素を取得
    const element = document.querySelector('#' + condition.id);
    // アイコン（✗ や ✓）が入っている<span>を取得
    const iconEl = element.querySelector('.cond-icon');

    if (condition.check(value)) {
      // ── 条件クリア！ ──
      element.classList.add('clear');    // 緑にするクラスを追加
      iconEl.textContent = '✓';         // ✗ → ✓ に文字を変える
    } else {
      // ── 未達成 ──
      element.classList.remove('clear'); // クリアクラスを外して赤に戻す
      iconEl.textContent = '✗';         // ✓ → ✗ に戻す
      allClear = false;                  // 1つでも未達成ならフラグをfalseに
    }
  });

  // 全条件クリアだったらクリア演出を開始！
  if (allClear) {
    celebrate();
  }
});


// ==========================================
// 【ステップ3】ストップウォッチの実装
// ==========================================
// setInterval(関数, ミリ秒) = 指定したミリ秒ごとに関数を繰り返す
// clearInterval(ID)         = setIntervalを止める（IDが必要）

let startTime = null;  // 計測開始時刻（Date.now()で取得するミリ秒）
let timerInterval = null; // setIntervalの返り値（止めるために保存しておく）
let isRunning = false; // 「今タイマーが動いているか？」のフラグ（旗）


// ── スタートボタンを押したとき ──
startBtn.addEventListener('click', function () {
  startTime = Date.now(); // 現在時刻を「開始時刻」として記録
  isRunning = true;

  startBtn.disabled = true;       // ボタンをグレーアウト（二度押し防止）
  passwordInput.disabled = false; // 入力欄を有効化
  passwordInput.focus();          // カーソルを入力欄に移動
  timerDisplay.classList.add('running'); // 光るクラスを追加

  // ──【ワーク】10ミリ秒ごとにタイマーの数字を更新しよう！ ──
  // TODO: setIntervalを使って、10ミリ秒経過するごとに elapsed を求め、タイマーの表示(timerDisplay.textContent)を formatTime(elapsed) で更新しよう
  // timerInterval = setInterval(function() {
  //   const elapsed = ...;
  //   timerDisplay.textContent = ...;
  // }, 10);
});


// ── 時間をMM:SS.cc形式の文字列に変換する関数 ──
// 例: 75430 ミリ秒 → "01:15.43"
function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);            // 分 (60000ms = 1分)
  const seconds = Math.floor((ms % 60000) / 1000);   // 秒 (残りをさらに1000で割る)
  const centiseconds = Math.floor((ms % 1000) / 10);      // 1/100秒

  // padStart(2, '0') = 1桁のとき先頭に'0'を付けて2桁にする（例: 5 → "05"）
  return (
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0') + '.' +
    String(centiseconds).padStart(2, '0')
  );
}


// ==========================================
// 【ステップ4】クリア演出（成功表示）
// ==========================================

function celebrate() {
  // ──【ワーク】タイマーを止め、最終タイムをセットして、クリア画面を表示しよう！ ──
  // TODO: 1. タイマー（timerInterval）を止める (clearInterval を使う)
  // isRunning = false;
  // TODO: 2. 最終タイムの表示要素(finalTimeEl)のテキストに、現在のタイマー表示の値をセットする
  // TODO: 3. クリア画面の要素(celebration)に、'is-active' クラスを追加する (classList.add を使う)
}


// ==========================================
// 【ステップ5】もう一度ボタン（リセット処理）
// ==========================================
// ここは既に完成しています。読んで理解しよう！
// クリアしたときに変化させたもの（タイマー・入力欄・条件リストのアイコン・演出画面）を
// スタート前の状態に、ひとつずつ戻していく処理。

// ── もう一度ボタンを押したとき ──
retryBtn.addEventListener('click', function () {

  // タイマー関連をリセット
  clearInterval(timerInterval);
  timerInterval = null;
  startTime = null;
  isRunning = false;

  // 表示のリセット
  timerDisplay.textContent = '00:00.00';
  timerDisplay.classList.remove('running');
  passwordInput.value = '';
  passwordInput.disabled = true;
  startBtn.disabled = false;

  // 全条件をリセット（クリアクラスを外し、✗に戻す）
  conditions.forEach(function (condition) {
    const element = document.querySelector('#' + condition.id);
    element.classList.remove('clear');
    element.querySelector('.cond-icon').textContent = '✗';
  });

  // 演出を隠す
  celebration.classList.remove('is-active');
});
