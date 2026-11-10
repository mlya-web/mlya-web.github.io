// 今日のひとこと。日付に応じて同じ日は同じ文になります。
const sayings = [
  { text: "本日は定休日です。", credit: "" },
  { text: "人間は自由の刑に処されている。", credit: "ジャン＝ポール・サルトル" },
  { text: "人生は後ろ向きにしか理解できないが、前向きにしか生きられない。", credit: "セーレン・キェルケゴール" },
  { text: "人間は自分の時代の子である。", credit: "ヘーゲル" },
  { text: "想像力は知識より重要である。", credit: "アルベルト・アインシュタイン" },
  { text: "世界は私の表象である。", credit: "アルトゥル・ショーペンハウアー" },
  { text: "数学は科学の女王である。", credit: "カール・フリードリヒ・ガウス" },
  { text: "私は矛盾を含んでいる。だから私は広大なのだ。", credit: "ウォルト・ホイットマン" },
  { text: "自然は飛躍しない。", credit: "ライプニッツの原理を表す言葉" },
  { text: "人間とは、習慣の束である。", credit: "デイヴィッド・ヒュームに関連する表現" },
  { text: "汝自身を知れ。", credit: "古代ギリシャの格言" },
  { text: "人生は近くで見ると悲劇だが、遠くから見れば喜劇である。", credit: "チャップリンに帰される言葉" },
  { text: "本日の営業は終了しました。", credit: "" },
  { text: "何も知らないということを知っている。", credit: "ソクラテスに関連する表現" },
  { text: "人間は考える葦である。", credit: "ブレーズ・パスカル" },
  { text: "知識は力なり。", credit: "フランシス・ベーコン" }
];

function tokyoDateKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit"
  }).format(new Date());
}
function hashDate(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  return hash;
}
const selected = sayings[hashDate(tokyoDateKey()) % sayings.length];
document.getElementById("daily-line").textContent = selected.text;
document.getElementById("daily-credit").textContent = selected.credit;

// 今日の運勢。日付で固定され、日が変わると変化します。
const fortunes = [
  "小さな発見がありそう。気になったものを覗いてみて。",
  "焦らず自分のペースで。ゆっくり進むのが吉。",
  "懐かしいものに触れると、いい気分転換になりそう。",
  "今日は整理整頓にツキあり。頭の中もすっきり。",
  "思いがけないところにヒントが隠れているかも。",
  "好きなことに時間を使うとよい日。",
  "いつもと違う道を選ぶと、新しい景色に出会えそう。"
];
document.getElementById("fortune-text").textContent =
  fortunes[hashDate(tokyoDateKey() + "-fortune") % fortunes.length];

// 泡をランダムな位置・大きさ・速さで発生させ、上昇後に消します。
const bubbleHost = document.getElementById("bubbles");
function makeBubble() {
  if (!bubbleHost || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const bubble = document.createElement("span");
  bubble.className = "bubble";
  const size = 4 + Math.random() * 15;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.setProperty("--duration", `${8 + Math.random() * 13}s`);
  bubble.style.setProperty("--drift", `${-35 + Math.random() * 70}px`);
  bubbleHost.appendChild(bubble);
  bubble.addEventListener("animationend", () => bubble.remove(), { once: true });
}
for (let i = 0; i < 12; i++) {
  setTimeout(makeBubble, i * 500);
}
setInterval(makeBubble, 850);
