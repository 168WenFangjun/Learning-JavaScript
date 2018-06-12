const items = ["iPhone", "Android"];
const prices = [54800, 49800];
const value = ["Good", "Bad"];
const cart = items.map((x, i) => ({ 名前: x, 価格: prices[i], 評価: value[i]}));
console.log(cart);
// [ { '名前': 'iPhone', '価格': 54800 }, { '名前': 'Android', '価格': 49800 } ]


const bridge = ["明石海峡大橋", "瀬戸大橋", "ゴールデンゲートブリッジ"];
const color = ["silver", "blue", "gold"];
const time = ["1990", "2000", "1700"];

const picture = bridge.map((x, i) => ({ 名前: x, 色彩: color[i], 年代: time[i] }));
console.log(picture);