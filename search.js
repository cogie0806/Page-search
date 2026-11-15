// ==========================================
// cogie0806 サイト内検索データ
// ==========================================
const allSitePages = [
  {
    title: "🏠 cogie0806のホームページ",
    description: "時計、背景変更、鏡、おみくじ、音楽プレイヤー、タイマー、ToDoリスト、電卓が使えます。",
    url: "https://cogie0806.github.io/home/",
    keywords: "ホーム メイン 時計 鏡 カメラ おみくじ 音楽 タイマー 電卓 todo"
  },
  {
    title: "🏠 軽量化したcogie0806のホームページ",
    description: "動作を軽くしたバージョンのホームページです。スマホや低スペック端末向け。",
    url: "https://cogie0806.github.io/lilt/",
    keywords: "軽量 軽い ホーム メイン lilt"
  },
  {
    title: "⛅ cogie0806天気",
    description: "気象庁の予報データをもとに、全国の都道府県の天気予報を確認できます。",
    url: "https://cogie0806.github.io/weather/",
    keywords: "天気 予報 気象庁 都道府県 晴れ 雨"
  },
  {
    title: "📰 cogie0806ニュース",
    description: "今月のメインニュースや、ゲーム・エンタメなどの最新情報をチェックできます。",
    url: "https://cogie0806.github.io/news/",
    keywords: "ニュース 記事 ゲーム エンタメ 最新"
  },
  {
    title: "🎄 cogie0806のシーズンイベント",
    description: "クリスマス特設ページやハロウィン特設ページなどの季節イベント特設サイトです。",
    url: "https://cogie0806.github.io/season/",
    keywords: "季節 シーズン イベント クリスマス ハロウィン 冬 秋"
  },
  {
    title: "⛏ cogie0806マイクラwiki",
    description: "マイクラの解説やアップデート情報、オリジナルリソースパックの配布ページです。",
    url: "https://cogie0806.github.io/minecraft-wiki/",
    keywords: "マイクラ minecraft wiki リソースパック アップデート"
  },
  {
    title: "⌨ cogie0806 typing",
    description: "3つの難易度（かんたん・ふつう・むずかしい）から選べるタイピング練習ゲームです。",
    url: "https://cogie0806.github.io/typing/",
    keywords: "タイピング 練習 キーボード ゲーム 速度"
  },
  {
    title: "🎨 cogie0806ペイントエディタ",
    description: "ブラシ、図形、文字入れ、画像保存ができる本格的なお絵かきツールです。",
    url: "https://cogie0806.github.io/Drawing/",
    keywords: "お絵かき ペイント イラスト 絵 画像 編集"
  },
  {
    title: "🍎 りんごキャッチゲーム",
    description: "落ちてくるリンゴをキャッチして遊ぶミニゲームです。",
    url: "https://cogie0806.github.io/Apple_Catch_Game/",
    keywords: "りんご リンゴ ゲーム ミニゲーム アクション"
  },
  {
    title: "🛠 AI/cogie0806（整備中）",
    description: "現在準備・整備中のAI関連ページです。",
    url: "https://cogie0806.github.io/AI/",
    keywords: "ai 人工知能 整備中"
  }
];

// ==========================================
// 今開いている親ページ（ホームなど）を自動除外する対策
// ==========================================
let currentParentUrl = "";
try {
  currentParentUrl = window.top.location.href;
} catch (e) {
  currentParentUrl = document.referrer;
}

const sitePages = allSitePages.filter(page => {
  const normalizedCurrent = currentParentUrl.replace(/\/$/, "");
  const normalizedTarget = page.url.replace(/\/$/, "");
  return normalizedCurrent !== normalizedTarget;
});

// ==========================================
// 検索の仕組み
// ==========================================
const searchInput = document.getElementById('searchInput');
const resultArea = document.getElementById('resultArea');
const hitCount = document.getElementById('hitCount');

function renderResults(list) {
  resultArea.innerHTML = "";
  hitCount.textContent = `${list.length} 件ヒット（全 ${sitePages.length} ページ）`;

  if (list.length === 0) {
    resultArea.innerHTML = `<div class="no-result">一致するページが見つかりませんでした。<br><small>※現在開いているページは検索結果から除外されています。</small></div>`;
    return;
  }

  list.forEach(page => {
    const card = document.createElement('a');
    card.href = page.url;
    card.target = "_top"; // 1. HTML属性で親ページ移動を指定
    card.className = 'result-card';
    card.innerHTML = `
      <div class="card-title">${page.title}</div>
      <div class="card-desc">${page.description}</div>
    `;

    // 2. クリック時にJavaScriptでも確実に親ページごと移動させる
    card.addEventListener('click', function(e) {
      e.preventDefault(); // 通常のリンク動作を一旦止める
      try {
        window.top.location.href = page.url; // 一番上の親画面を移動
      } catch (err) {
        window.open(page.url, '_top'); // 制限がある場合の予備処理
      }
    });

    resultArea.appendChild(card);
  });
}

searchInput.addEventListener('input', () => {
  const rawInput = searchInput.value.toLowerCase().trim();
  
  if (rawInput === "") {
    renderResults(sitePages);
    return;
  }

  const keywords = rawInput.split(/\s+/);

  const filtered = sitePages.filter(page => {
    const searchTarget = (page.title + " " + page.description + " " + page.keywords).toLowerCase();
    return keywords.every(word => searchTarget.includes(word));
  });

  renderResults(filtered);
});

// 初期表示
renderResults(sitePages);
