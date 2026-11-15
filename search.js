// ==========================================
// cogie0806 サイト内検索データ
// 新しいページを作ったら、このリストに追加するだけでOK！
// ==========================================
const sitePages = [
  {
    title: "🏠 cogie0806のホームページ",
    description: "時計、背景変更、かんたん鏡、おみくじ、音楽プレイヤー、タイマー、ToDoリスト、電卓が使えるメインページです。",
    url: "https://cogie0806.github.io/home/",
    keywords: "ホーム メイン 時計 鏡 カメラ おみくじ 音楽 タイマー 電卓 todo"
  },
  {
    title: "🏠 軽量化したcogie0806のホームページ",
    description: "動作を軽くしたバージョンのホームページです。スマホやスペックが低い端末でも快適に使えます。",
    url: "https://cogie0806.github.io/lilt/",
    keywords: "軽量 軽い ホーム メイン lilt"
  },
  {
    title: "⛅ cogie0806天気",
    description: "国土交通省気象庁の予報データをもとに、全国の都道府県の天気予報を確認できます。",
    url: "https://cogie0806.github.io/weather/",
    keywords: "天気 予報 気象庁 都道府県 晴れ 雨"
  },
  {
    title: "📰 cogie0806ニュース",
    description: "今月のメインニュースや、ゲーム・エンタメなどの最新情報をチェックできるニュースページです。",
    url: "https://cogie0806.github.io/news/",
    keywords: "ニュース 記事 ゲーム エンタメ 最新"
  },
  {
    title: "🎄 cogie0806のシーズンイベント",
    description: "クリスマス特設ページやハロウィン特設ページなど、季節のイベントを楽しめる特設サイトです。",
    url: "https://cogie0806.github.io/season/",
    keywords: "季節 シーズン イベント クリスマス ハロウィン 冬 秋"
  },
  {
    title: "⛏ cogie0806マイクラwiki",
    description: "マインクラフトの解説やアップデート情報、オリジナルリソースパックのダウンロードができるWikiです。",
    url: "https://cogie0806.github.io/minecraft-wiki/",
    keywords: "マイクラ minecraft wiki リソースパック アップデート"
  },
  {
    title: "⌨ cogie0806 typing",
    description: "「かんたん」「ふつう」「むずかしい」の3つの難易度から選んで遊べるタイピング練習ゲームです。",
    url: "https://cogie0806.github.io/typing/",
    keywords: "タイピング 練習 キーボード ゲーム 速度"
  },
  {
    title: "🎨 cogie0806ペイントエディタ",
    description: "ブラシ、消しゴム、塗りつぶし、図形、文字入れ、画像読み込み・保存ができる本格的なお絵かきツールです。",
    url: "https://cogie0806.github.io/Drawing/",
    keywords: "お絵かき ペイント イラスト 絵 画像 編集"
  },
  {
    title: "🍎 りんごキャッチゲーム",
    description: "落ちてくるリンゴをキャッチして遊ぶ楽しいミニゲームです。",
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
// 検索の仕組み（ここから下は変更不要です）
// ==========================================
const searchInput = document.getElementById('searchInput');
const resultArea = document.getElementById('resultArea');
const hitCount = document.getElementById('hitCount');

// 検索結果を画面に表示する関数
function renderResults(list) {
  resultArea.innerHTML = "";
  hitCount.textContent = `全 ${sitePages.length} ページ中 ${list.length} 件表示`;

  if (list.length === 0) {
    resultArea.innerHTML = `
      <div class="no-result">
        一致するページが見つかりませんでした。<br>
        別のキーワード（例：ゲーム、ツール、マイクラ、天気 など）で試してみてください。
      </div>
    `;
    return;
  }

  list.forEach(page => {
    const card = document.createElement('a');
    card.href = page.url;
    card.className = 'result-card';
    card.innerHTML = `
      <div class="card-title">${page.title}</div>
      <div class="card-desc">${page.description}</div>
      <div class="card-url">${page.url}</div>
    `;
    resultArea.appendChild(card);
  });
}

// 入力に合わせてリアルタイム検索（スペース区切りのAND検索に対応！）
searchInput.addEventListener('input', () => {
  const rawInput = searchInput.value.toLowerCase().trim();
  
  if (rawInput === "") {
    renderResults(sitePages);
    return;
  }

  // スペースで区切って複数キーワードに対応（例：「マイクラ リソースパック」）
  const keywords = rawInput.split(/\s+/);

  const filtered = sitePages.filter(page => {
    const searchTarget = (page.title + " " + page.description + " " + page.keywords).toLowerCase();
    return keywords.every(word => searchTarget.includes(word));
  });

  renderResults(filtered);
});

// 初期表示（最初は全ページを一覧表示）
renderResults(sitePages);
