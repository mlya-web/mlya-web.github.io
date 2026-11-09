// 今日のひとこと：日本時間の日付で選ぶため、同じ日は同じ文章になります。
const sayings = [
  { text: "本日は定休日です。", credit: "" },
  { text: "人間は自由の刑に処されている。", credit: "ジャン＝ポール・サルトル" },
  { text: "人生は後ろ向きにしか理解できないが、前向きにしか生きられない。", credit: "セーレン・キェルケゴール" },
  { text: "人間は自分の時代の子である。", credit: "ヘーゲルの思想をもとにした表現" },
  { text: "想像力は知識より重要である。", credit: "アルベルト・アインシュタイン" },
  { text: "世界は私の表象である。", credit: "アルトゥル・ショーペンハウアー" },
  { text: "数学は科学の女王である。", credit: "カール・フリードリヒ・ガウス" },
  { text: "私は矛盾を含んでいる。だから私は広大なのだ。", credit: "ウォルト・ホイットマン" },
  { text: "自然は飛躍しない。", credit: "ライプニッツの原理を表す訳語" },
  { text: "人間とは、習慣の束である。", credit: "ウィリアム・ジェームズの思想をもとにした表現" },
  { text: "賽は投げられた。", credit: "ユリウス・カエサルに伝わる言葉" },
  { text: "汝自身を知れ。", credit: "古代ギリシャの格言" },
  { text: "人生は近くで見ると悲劇だが、遠くから見れば喜劇である。", credit: "チャールズ・チャップリンに帰される言葉" },
  { text: "本日の営業は終了しました。", credit: "" },
  { text: "何も知らないということを知っている。", credit: "ソクラテスに関連づけられる思想" },
  { text: "人間は考える葦である。", credit: "ブレーズ・パスカル" },
  { text: "知識は力なり。", credit: "フランシス・ベーコン" }
];

function dateKeyJST() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Tokyo",
    year: "numeric", month: "2-digit", day: "2-digit"
  }).format(new Date());
}
function hashDate(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  return hash;
}
const selected = sayings[hashDate(dateKeyJST()) % sayings.length];
document.getElementById("daily-line").textContent = selected.text;
document.getElementById("daily-credit").textContent = selected.credit ? "― " + selected.credit : "";

// GIFはページを開くたびに順番をシャッフルします。
const shelf = document.getElementById("gif-shelf");
const gifs = Array.from(shelf.querySelectorAll("img"));
for (let i = gifs.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [gifs[i], gifs[j]] = [gifs[j], gifs[i]];
}
gifs.forEach(img => shelf.appendChild(img));
