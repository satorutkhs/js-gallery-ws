// ==========================================
// 【ステップ1】HTML要素を取得する
// ==========================================
// document.querySelector('#ID名') でHTMLの要素を変数に代入する
// CSS と同じセレクタ記法（# = ID、. = クラス）を使う

const passwordInput = document.querySelector('#password-input'); // パスワード入力欄
const startBtn      = document.querySelector('#start-btn');      // スタートボタン
const timerDisplay  = document.querySelector('#timer');          // タイマー表示エリア
const celebration   = document.querySelector('#celebration');    // クリア演出の枠
const finalTimeEl   = document.querySelector('#final-time');     // クリア画面に出す最終タイム
const retryBtn      = document.querySelector('#retry-btn');      // もう一度ボタン
const confettiBox   = document.querySelector('#confetti-container'); // 紙吹雪の入れ物


// ==========================================
// 【ステップ2】ストップウォッチの実装
// ==========================================
// setInterval(関数, ミリ秒) = 指定したミリ秒ごとに関数を繰り返す
// clearInterval(ID)         = setIntervalを止める（IDが必要）

let startTime    = null;  // 計測開始時刻（Date.now()で取得するミリ秒）
let timerInterval = null; // setIntervalの返り値（止めるために保存しておく）
let isRunning    = false; // 「今タイマーが動いているか？」のフラグ（旗）


// ── スタートボタンを押したとき ──
startBtn.addEventListener('click', function() {
  startTime = Date.now(); // 現在時刻を「開始時刻」として記録
  isRunning = true;

  startBtn.disabled = true;       // ボタンをグレーアウト（二度押し防止）
  passwordInput.disabled = false; // 入力欄を有効化
  passwordInput.focus();          // カーソルを入力欄に移動
  timerDisplay.classList.add('running'); // 光るクラスを追加

  // 10ミリ秒ごとにタイマーの数字を更新する
  timerInterval = setInterval(function() {
    // 【TODO 1】経過時間（ミリ秒）を計算しよう！
    // ヒント: 現在時刻（Date.now()）から startTime を引くと計算できます
    // const elapsed = ...;

    // 【TODO 2】タイマー表示（timerDisplay）の文字（textContent）を更新しよう！
    // ヒント: formatTime(elapsed) を使うと "00:00.00" 形式の文字列が得られます
    
  }, 10);
});


// ── 時間をMM:SS.cc形式の文字列に変換する関数 ──
// 例: 75430 ミリ秒 → "01:15.43"
function formatTime(ms) {
  const minutes      = Math.floor(ms / 60000);            // 分 (60000ms = 1分)
  const seconds      = Math.floor((ms % 60000) / 1000);   // 秒 (残りをさらに1000で割る)
  const centiseconds = Math.floor((ms % 1000) / 10);      // 1/100秒

  // padStart(2, '0') = 1桁のとき先頭に'0'を付けて2桁にする（例: 5 → "05"）
  return (
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0') + '.' +
    String(centiseconds).padStart(2, '0')
  );
}


// ==========================================
// 【ステップ3】パスワード条件の定義と判定
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
    check: function(val) {
      return val.length >= 8;
    }
  },
  {
    id: 'cond-uppercase',
    // /[A-Z]/ = 「A〜Zのどれか」にマッチする正規表現
    // .test(val) = val にマッチする文字があるか（true/false）
    check: function(val) {
      return /[A-Z]/.test(val);
    }
  },
  {
    id: 'cond-number',
    // /[0-9]/ = 数字1文字にマッチ
    check: function(val) {
      return /[0-9]/.test(val);
    }
  },
  {
    id: 'cond-symbol',
    // /[!@#$%^&*()\-_+=<>?]/ = よく使う記号のどれかにマッチ
    check: function(val) {
      return /[!@#$%^&*()\-_+=<>?]/.test(val);
    }
  },
  {
    id: 'cond-yen',
    // ¥ = 円記号（U+00A5）
    // includes() = 文字列の中に含まれているか確認する（true/false）
    check: function(val) {
      return val.includes('¥');
    }
  },
  {
    id: 'cond-zenkaku',
    // 【ポイント！】全角「Ａ」（U+FF21）と半角「l」（U+006C）は見た目が似ているが別の文字！
    // 全角の「Ａ」= 幅が広い大文字A（日本語フォントで使われる）→ キーボードの「A」を全角入力
    // 半角の「l」 = 普通の小文字エル（英語のL）
    // /Ａl/ という正規表現で「Ａ」のあとに「l」が連続する箇所を探す
    check: function(val) {
      return /Ａl/.test(val);
    }
  },
  {
    id: 'cond-sushi',
    // 🍣 = 寿司の絵文字（そのまま includes で判定できる！）
    check: function(val) {
      return val.includes('🍣');
    }
  }
];


// ── パスワードが入力・変更されるたびに実行される ──
// 'input' イベント = テキストが変わるたびに発火する（キーを押すたびに動く）
passwordInput.addEventListener('input', function() {

  // スタートしていない場合は何もしない
  if (!isRunning) return;

  const value = passwordInput.value; // 今の入力値を取得
  let allClear = true;               // 全条件クリアフラグ（最初はtrueで始める）

  // conditions 配列をひとつずつ処理（forEach = 繰り返し）
  conditions.forEach(function(condition) {
    // IDを使って条件の<li>要素を取得
    const element = document.querySelector('#' + condition.id);
    // アイコン（✗ や ✓）が入っている<span>を取得
    const iconEl  = element.querySelector('.cond-icon');

    // 【TODO 3】各条件をクリアしているかどうかを判定しよう！
    // ヒント: condition.check(value) の結果が true かどうかを if 文でチェックします
    if (/* ここに条件式を書く */) {
      // ── 条件クリア！ ──
      // 【TODO 4】element の classList に 'clear' を追加し、iconEl のテキスト(textContent)を '✓' にしよう！

    } else {
      // ── 未達成 ──
      // 【TODO 5】element の classList から 'clear' を取り除き、iconEl のテキスト(textContent)を '✗' に戻そう！
      // さらに、allClear フラグを false に設定しよう！

    }
  });

  // 【TODO 6】もし allClear が true だったらクリア演出を開始しよう！
  // ヒント: celebrate() という関数を呼び出します
  
});


// ==========================================
// 【ステップ4】クリア演出（パチンコ風！🎰）
// ==========================================

function celebrate() {
  // 【TODO 7】タイマーを止めよう！
  // ヒント: clearInterval(timerInterval) を使います
  

  isRunning = false;

  // クリア時のタイムを演出画面にセット
  finalTimeEl.textContent = timerDisplay.textContent;

  // 【TODO 8】演出オーバーレイ（celebration）を表示しよう！
  // ヒント: classList に 'is-active' を追加します
  

  // 紙吹雪を生成して画面に降らせる！
  createConfetti();
}


// ── 紙吹雪（コンフェッティ）を生成する関数 ──
function createConfetti() {
  const colors = [
    '#ff0000', '#ff9900', '#ffff00',
    '#00ff66', '#0066ff', '#cc00ff', '#ff0099'
  ];

  // 150個の紙吹雪を作る
  for (let i = 0; i < 150; i++) {

    // 【TODO 9】新しい <div> 要素を作成しよう！
    // ヒント: document.createElement('div') を使います
    const piece = /* ここに書く */;
    piece.classList.add('confetti-piece');

    // ランダムな値を計算
    const randomLeft     = Math.random() * 100;             // 0〜100% の横位置
    const randomColor    = colors[Math.floor(Math.random() * colors.length)]; // ランダム色
    const randomWidth    = Math.random() * 10 + 6;          // 幅: 6〜16px
    const randomHeight   = Math.random() * 8  + 8;          // 高さ: 8〜16px
    const randomDuration = Math.random() * 2  + 1.8;        // 落下時間: 1.8〜3.8秒
    const randomDelay    = Math.random() * 2;               // 開始遅延: 0〜2秒

    // 各スタイルを設定
    piece.style.left            = randomLeft + '%';
    piece.style.backgroundColor = randomColor;
    piece.style.width           = randomWidth + 'px';
    piece.style.height          = randomHeight + 'px';
    piece.style.animationDuration = randomDuration + 's';
    piece.style.animationDelay    = randomDelay + 's';

    // 【TODO 10】作成した piece を confettiBox の中に追加しよう！
    // ヒント: appendChild() を使います
    
  }
}


// ── もう一度ボタンを押したとき ──
retryBtn.addEventListener('click', function() {

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

  // 【TODO 11】全条件のリセット（クリアクラスを外し、✗に戻す）を繰り返そう！
  conditions.forEach(function(condition) {
    // ヒント: 各条件の element を取得し、classList から 'clear' を外し、iconEl のテキストを '✗' にします
    
  });

  // 演出を隠す
  celebration.classList.remove('is-active');

  // 紙吹雪を全部削除
  confettiBox.innerHTML = '';
});
