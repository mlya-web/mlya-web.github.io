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

// 星がゆっくり漂います。装飾レイヤーはクリックを妨げません。
const starField = document.getElementById('star-field');
const shootingField = document.getElementById('shooting-field');
const rocket = document.getElementById('rocket');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const random = (min, max) => min + Math.random() * (max - min);
const randomInt = (min, max) => Math.floor(random(min, max + 1));

if (starField) {
  const starCount = 34;
  const placed = [];
  const fieldWidth = Math.max(starField.clientWidth, window.innerWidth);
  const fieldHeight = Math.max(starField.clientHeight, window.innerHeight);

  // 近くに星が集まりすぎないよう、サイズに応じて間隔を空けて配置します。
  function findStarPosition(size) {
    const minGap = Math.max(24, size * 1.35);
    for (let attempt = 0; attempt < 180; attempt++) {
      const x = random(size, Math.max(size, fieldWidth - size));
      const y = random(size, Math.max(size, fieldHeight - size));
      const separated = placed.every((point) => {
        const gap = Math.max(minGap, point.size * 1.2);
        return Math.hypot(x - point.x, y - point.y) >= gap;
      });
      if (separated) {
        placed.push({ x, y, size });
        return { x, y };
      }
    }
    const x = random(size, Math.max(size, fieldWidth - size));
    const y = random(size, Math.max(size, fieldHeight - size));
    placed.push({ x, y, size });
    return { x, y };
  }

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('img');
    const size = random(9, 31);
    const point = findStarPosition(size);
    star.className = 'pixel-star';
    star.alt = '';
    star.src = `star-${String(randomInt(0, 43)).padStart(2, '0')}.png`;
    star.style.left = `${point.x}px`;
    star.style.top = `${point.y}px`;
    star.style.setProperty('--size', `${size.toFixed(1)}px`);
    star.style.setProperty('--opacity', random(.42, .82).toFixed(2));
    star.style.setProperty('--duration', `${random(42, 78).toFixed(1)}s`);
    star.style.setProperty('--twinkle', `${random(4.5, 9).toFixed(1)}s`);
    star.style.setProperty('--fade', `${random(11, 19).toFixed(1)}s`);
    star.style.setProperty('--delay', `${-random(0, 24).toFixed(1)}s`);
    star.style.setProperty('--fade-delay', `${-random(0, 18).toFixed(1)}s`);
    star.style.setProperty('--dx', `${random(-22, 22).toFixed(1)}px`);
    star.style.setProperty('--dy', `${random(-16, 16).toFixed(1)}px`);
    star.style.setProperty('--rotate', `${random(-12, 12).toFixed(1)}deg`);
    starField.appendChild(star);
  }
}

function launchShootingStar() {
  if (!shootingField || reducedMotion || document.hidden) return;
  const star = document.createElement('img');
  star.className = 'shooting-star';
  star.alt = '';
  star.src = `shoot-${String(randomInt(0, 15)).padStart(2, '0')}.png`;
  star.style.left = `${random(62, 105)}%`;
  star.style.top = `${random(4, 58)}%`;
  shootingField.appendChild(star);
  star.addEventListener('animationend', () => star.remove(), { once: true });
}
if (!reducedMotion) {
  window.setTimeout(launchShootingStar, 4500);
  window.setInterval(launchShootingStar, 15000);
}

// ロケットは1機だけ。画面を横切った後、しばらくして再登場します。
function launchRocket() {
  if (!rocket || reducedMotion) return;
  if (document.hidden) {
    window.setTimeout(launchRocket, 12000);
    return;
  }
  rocket.style.top = `${random(18, 82)}%`;
  rocket.classList.remove('fly');
  void rocket.offsetWidth;
  rocket.classList.add('fly');
  const duration = 17000;
  window.setTimeout(() => {
    rocket.classList.remove('fly');
    window.setTimeout(launchRocket, randomInt(12000, 22000));
  }, duration);
}
if (rocket && !reducedMotion) window.setTimeout(launchRocket, 9000);
