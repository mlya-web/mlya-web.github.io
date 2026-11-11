// アクセスカウンターの数字を7桁にそろえ、0に斜線を付けます。
const countNode = document.getElementById('count');
function styleCounter() {
  if (!countNode) return;
  const raw = (countNode.textContent || '').replace(/[^0-9]/g, '');
  if (!raw) return;
  const digits = raw.slice(-7).padStart(7, '0');
  const html = [...digits].map((digit) => `<span class="digit${digit === '0' ? ' zero' : ''}">${digit}</span>`).join('');
  if (countNode.innerHTML !== html) countNode.innerHTML = html;
}
if (countNode) {
  const counterObserver = new MutationObserver(styleCounter);
  counterObserver.observe(countNode, { childList: true, characterData: true, subtree: true });
  styleCounter();
  // 外部カウンターの初期化後にも表示を整えます。
  window.addEventListener('load', styleCounter, { once: true });
}

// 日付に応じて今日のひとことを表示します。
const sayings = [
  { text: '本日は定休日です。', credit: '' },
  { text: '人間は自由の刑に処されている。', credit: 'ジャン＝ポール・サルトル' },
  { text: '人生は後ろ向きにしか理解できないが、前向きにしか生きられない。', credit: 'セーレン・キェルケゴール' },
  { text: '人間は自分の時代の子である。', credit: 'ヘーゲル' },
  { text: '想像力は知識より重要である。', credit: 'アルベルト・アインシュタイン' },
  { text: '世界は私の表象である。', credit: 'アルトゥル・ショーペンハウアー' },
  { text: '数学は科学の女王である。', credit: 'カール・フリードリヒ・ガウス' },
  { text: '私は矛盾を含んでいる。だから私は広大なのだ。', credit: 'ウォルト・ホイットマン' },
  { text: '自然は飛躍しない。', credit: 'ライプニッツの原理を表す言葉' },
  { text: '汝自身を知れ。', credit: '古代ギリシャの格言' },
  { text: '人間は考える葦である。', credit: 'ブレーズ・パスカル' },
  { text: '知識は力なり。', credit: 'フランシス・ベーコン' }
];
function tokyoDateKey() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
}
function hashDate(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  return hash;
}
const dateKey = tokyoDateKey();
const selected = sayings[hashDate(dateKey) % sayings.length];
const dailyLine = document.getElementById('daily-line');
const dailyCredit = document.getElementById('daily-credit');
if (dailyLine) dailyLine.textContent = selected.text;
if (dailyCredit) dailyCredit.textContent = selected.credit;

// 今日の運勢
const fortunes = [
  '小さな発見がありそう。気になったものを覗いてみて。',
  '焦らず自分のペースで。ゆっくり進むのが吉。',
  '懐かしいものに触れると、いい気分転換になりそう。',
  '今日は整理整頓にツキあり。頭の中もすっきり。',
  '思いがけないところにヒントが隠れているかも。',
  '好きなことに時間を使うとよい日。',
  'いつもと違う道を選ぶと、新しい景色に出会えそう。'
];
const fortuneText = document.getElementById('fortune-text');
if (fortuneText) fortuneText.textContent = fortunes[hashDate(dateKey + '-fortune') % fortunes.length];

// 小さな泡が上昇して消え、また現れます。
const bubbleHost = document.getElementById('bubbles');
function makeBubble() {
  if (!bubbleHost || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const bubble = document.createElement('span');
  bubble.className = 'bubble';
  const size = 4 + Math.random() * 15;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.setProperty('--duration', `${8 + Math.random() * 13}s`);
  bubble.style.setProperty('--drift', `${-35 + Math.random() * 70}px`);
  bubbleHost.appendChild(bubble);
  bubble.addEventListener('animationend', () => bubble.remove(), { once: true });
}
if (bubbleHost) {
  for (let i = 0; i < 12; i++) window.setTimeout(makeBubble, i * 500);
  window.setInterval(makeBubble, 850);
}
