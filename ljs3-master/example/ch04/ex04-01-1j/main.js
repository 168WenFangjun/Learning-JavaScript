'use strict';
// m以上n以下のランダムな整数を返す
function ランダムに整数を返す(m, n) {
  return m + Math.floor((n - m + 1)*Math.random());
}

// 「サイコロ」の目のどれかひとつを表す文字列をランダムに返す
function ランダムにマス目を返す() {
  return ["王冠", "錨", "ハート", "スペード", "クラブ", "ダイヤ"]
            [ランダムに整数を返す(0, 5)];
}

let 残り資金 = 50;     // 開始時の条件
let ラウンド = 0;

while(残り資金 > 0 && 残り資金 < 100) {
  ラウンド++;
  console.log(`第${ラウンド}ラウンド:`);
  console.log(`  手持ち資金: ${残り資金}`);
  // 賭ける
  let 各マスの賭け金 = { 王冠: 0, 錨: 0, ハート: 0,
		     スペード: 0, クラブ: 0, ダイヤ: 0 };
  let 今回の賭け金の合計 = ランダムに整数を返す(1, 残り資金);
  if(今回の賭け金の合計 === 7) {
    今回の賭け金の合計 = 残り資金;
    各マスの賭け金.ハート = 今回の賭け金の合計;
  } else {
    // 賭け金を振り分ける
    let 残りの賭け金 = 今回の賭け金の合計;
    do {
      let このマスの賭け金 = ランダムに整数を返す(1, 残りの賭け金);
      let 出たマス目 = ランダムにマス目を返す();
      各マスの賭け金[出たマス目] = 各マスの賭け金[出たマス目] + このマスの賭け金;
      残りの賭け金 = 残りの賭け金 - このマスの賭け金;
    } while(残りの賭け金 > 0)
  }
  残り資金 = 残り資金 - 今回の賭け金の合計;
  console.log(`  賭け金: ${今回の賭け金の合計}（` +
              Object.keys(各マスの賭け金).map(出たマス目 => `${出たマス目}: ${各マスの賭け金[出たマス目]}`).join(', ') +
              "）");

  // サイコロを振る
  const 出目 = [];
  for(let 何回目か = 0; 何回目か < 3; 何回目か++) {
    出目.push(ランダムにマス目を返す());
  }
  console.log(`  出目: ${出目.join(', ')}`);

  // 払戻金をもらう
  let 払戻金 = 0;
  for(let die=0; die < 出目.length; die++) {
    let 出たマス目 = 出目[die];
    if(各マスの賭け金[出たマス目] > 0) 払戻金 = 払戻金 + 各マスの賭け金[出たマス目];
  }
  残り資金 = 残り資金 + 払戻金;
  console.log(`  払戻金: ${払戻金}`);
}
console.log(`  残金: ${残り資金}`);
if (100 < 残り資金) console.log("意気揚々と船に戻る。\n");
else console.log("トボトボと船に帰る。\n");