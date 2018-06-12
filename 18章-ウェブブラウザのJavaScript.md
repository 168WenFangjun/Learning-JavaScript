# 18章　ウェブブラウザのJavaScript

## 18.1 ES5かES2015か

ES15が完全に対応するまでは「トランスパイル」が必要になる

## 18.2 ドキュメントオブジェクトモデル（DOM）

DOMはHTMLのドキュメントの構造を記述する。ブラウザとのやりとりを行い、表示をコントロールできる。 
DOMのすべての構成要素は「Node」と呼ばれる。DOMのルートノードはdocumentであり、唯一の子ノードが``<html>``である。 
NodeオブジェクトはparentNodeやchildNode、nodeNameやnodeTypeといったプロパティをもっている。 
HTMLはNodeの部分集合である。 

関数を使って木構造を操作する。

```js
function printDOM(node, prefix) {
  console.log(prefix + node.nodeName);
  for(let i=0; i<node.childNodes.length; i++) {
    printDOM(node.childNodes[i], prefix + '    ');
  }
}
printDOM(document, '');
```

```js
/* ウェブブラウザで実行 */
console.log(document instanceof Node); // true
console.log(document.parentNode); // null 　　（親はいない）
console.log(document.childNodes); // NodeList [ DocumentType, <html> ]
console.log(document.nodeType); // 9
console.log(document.nodeName); // #document

const children = document.childNodes;
console.log("子どもの数:" + children.length); // 子どもの数:2
console.log(children[0]); // [object DocumentType]
console.log(children[0].nodeType); // 10
console.log(children[1]); // <html>
console.log(children[1].nodeType); // 1
console.log(children[2]); // undefined

console.log(Node.ELEMENT_NODE); // 1
console.log(children[1].nodeType === Node.ELEMENT_NODE); // true
console.log(Node.TEXT_NODE); // 3
```

## 18.3 DOMのgetメソッド

DOMのgetメソッドを使えば、HTML要素を素早く指定することができる。 
ブラウザはIDの重複をチェックしないため、注意しなければならない。 
DOMメソッドはHTMLCollectionのインスタンスを返す。配列ではなく、配列に変換するためには展開演算子を用いる。 

```js
// ID、クラス、タグを指定することができる
document.getElementById('content')
document.getElementByClassName('callout')
document.getElementByTagName('p')
```

## 18.4 DOM要素に関するクエリー

querySelectorやquerySelectorAllを使えば、CSSセレクタを使って、要素と要素の関係を指定できる。

```js
document.querySelectorAll('#content > div p');
# // IDを指定
> // ID直下の要素を指定
```

## 18.5 DOM要素の操作

各要素はtextContentとinnerHTMLという2つのプロパティをもつ。これによって各要素の中身の参照や変更ができる。 
変更によって上書きされる。(変更前の内容を使いたいときは保存しておかなければならない)

- textContent : HTMLのタグを取り除き、素のテキストデータを返す
- innerHTML   : HTMLコードの取得や指定ができる

## 18.6 DOM要素の生成

document.createElementを使えば、明示的に新しいノードを生成できる。(要素は生成するが付加はされない)
付加するためには、以下の2つのメソッドが使える。

- insertBefore : 第2引数に指定されたノードの前に挿入する
- appendChild  : 親ノードの最後の要素として追加する

```js
// Firefoxで実行すると、変化の様子が見られる
const p1 = document.createElement('p');
const p2 = document.createElement('p');
p1.textContent = "この段落は動的に生成されました。";
p2.textContent = "この段落は動的に生成された2つ目の段落です。";
const parent = document.getElementById('content');
const firstChild = parent.childNodes[0];
alert("変更します。第1段階");
parent.insertBefore(p1, firstChild);
alert("変更します。第2段階");
parent.appendChild(p2);
```

## 18.7 要素のスタイル

DOM APIを使えば、各要素のスタイルを細かく制御できる。JavaScriptは、既存のCSSクラスを特定の要素に適用することができる。 

```js
function highlightParas(containing) { // containingを引数に取る
  if(typeof containing === 'string')  // containingは、データ型がstringであること
    containing = new RegExp{`${containing}`}; // 受け取った文字列を格納する変数containingを設定
  const paras = document.getElementsByTagName('p'); // タグ名がpのものをすべて変数parasに格納
  for(let p of paras) { // parasのすべてのpに対して
    if(!containing.test(p.textContent)) continue; // もしp要素のテキストコンテンツに、'containing'が含まれていないなら
    p.classList.add('highlight'); // highlightクラスを追加
  }
}
highlightParas('ユニーク'); // ユニークという文字列を渡す
```

```js
function removeParaHighlights() {
  const paras = document.getElementsByTagName('p');
  for(let p of paras) {
    p.classList.remove('highlight');
  }
}
```

## 18.8 data属性

HTML5から導入されたdata属性を使えば、HTML要素に任意のデータを付加できる。 
data属性はブラウザによるレンダリングには影響しない。

```html
<button data-action="highlight" data-containing="ユニーク"></button>
<button data-action="removeHighlights"></button>
```

付加したデータはJavaScriptで参照できる。

```js
const highlightActions = document.querySelectorAll('[data-action="highlight"]')
```

## 18.9 イベント

DOMAPIには約200のイベントがリストされている。

addEventListnerを使えば、イベントが起こったときに呼ばれる関数を指定できる。 
呼ばれた関数はEventという型の引数を1つだけ受け取る。イベントモデルには、イベントタイプに応じたさまざまなプロパティが用意されている。

多くのイベントにはデフォルトのハンドラがある。 
evt.preventDefault()は、デフォルト設定を上書きできる。

```js
const highlightActions = document.querySelectorAll('[data-action="highlight"'); // highlightActionsを設定
for(let a of highlightActions) {
  a.addEventlistener('click', evt => {
    evt.preventDefault();
    highlightParas(a.dataset.containing);
  });
}
```

### 18.9.1　イベントのキャプチャリングとバブリング

キャプチャリングとハブリングは、イベントに応答する優先度を決めるオプションである。 
HTML5は、まずキャプチャリングから開始し、次にハブリングを開始する

- キャプチャリング : もっとも遠い祖先から取ってくる(トップダウン)
- ハブリング      : イベントの発生した要素から階層を登っていく(ボトムダウン)

以下は優先度を制御する3つの方法である。

- preventDefault          :プロパティdefaultPreventedはtrueになり、イベントハンドラはこれを尊重する
- stopPropagation         :現在の要素を超えたイベントの伝搬をしなくなる
- stopImmediatePropagation:すべてのハンドラが呼ばれなくなる

```js
// イベントハンドラを生成して、それを返す
function logEvent(handlerName, type, cancel, stop, stopImmediate) { // 5つの引数
  // ここが実際のイベントハンドラ
  return function(evt) {
    if(cancel) evt.preventDefault();
    if(stop) evt.stopPropagation();
    if(stopImmediate) evt.stopImmidatePropagation();
    console.log(`${type}: ${handlerName}` + (evt.defaultPrevented ? ' (キャンセルされた)' : ''));
  }
}

// 要素にイベントロガーを付加
function addEventLogger(element, type, action) {
  const capture = type === 'capture';
  element.addEventListener(
    'click',
    logEvent(element.tagName, type, action==='cancel',
         action==='stop', action==='stop!'), capture);
}

const body = document.querySeletor('body');
const div = document.querySeletor('div');
const button = document.querySeletor('button');

addEventLogger(body, 'capture')
addEventLogger(body, 'bubble')
addEventLogger(body, 'capture')
addEventLogger(body, 'bubble')
addEventLogger(body, 'capture')
addEventLogger(body, 'bubble')
```

まとめ

イベントが発生すると、まずキャプチャリングが開始される。 
キャプチャリングは、もっとも遠い「祖先」からターゲット要素まで行われる。 
キャプチャリングが終了すると、次はバブリングが開始される。 
バブリングはターゲット要素から順に階層を上がっていく。 

制御は3種類ある。

preventDefaultは、キャプチャリングとバブリングは両方実行されるが処理はキャンセルされる。 
stopPropagationは、キャプチャリングはされるがバブリングがされない。イベントはその要素を超えてでバブリングされない。 

### 18.9.2　イベントの種類

一般的なイベントとしては以下のようなカテゴリがある

- ドラッグ
  - dragstart、drag、dragend、dropなど
- フォーカス
  - フィールドに入ったとき、離れたとき(blur)、変更されたとき(change)
- 送信
  - 送信(submit)、Enter入力など
- 入力デバイスのイベント
  - click,mousedown,move,mouseup,mouseenter,mouseleave,mouseover,mousewheelや、keydowon,keypress,keypupなど
- メディア関連のイベント
  - HTML5のビデオプレイヤーおよびオーディオプレイヤーなど(pause、play)
- ブログレスイベント
  - ローディングの心境状況。ロードが完了したとき(load)。リンク先がないなどのエラー(error)
- タッチイベント
  - タッチ可能なデバイス。イベントのtouchesプロパティなど。ピンチやスワイプなどの処理が行える

## 18.10　Ajax(Asynchronous JavaScript and XML)

JavaScriptのAjax機能を使えば、ページ全体をロードすることなく一部要素を変更できる 
AjaxはXMLHttpRequestが導入されたことにより利用可能となった(いわゆるWeb2.0) 
Ajaxも非Ajax同様にHTTPに基づいて通信を行うが、レンダリングにかかる時間が圧縮されるため、アプリケーションのパフォーマンスが上がる(ように見える) 

```js
// AJAXサーバー
const http = require('http')

const server = http.createServer(function(req, res) {
  res.setHeader('Content-type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify({
    platform: process.platform,
    nodeVersion: process.version
    uptime: Math.round(process.uptime()),
  }));
});

const port = 7070;
server.listen(port, function() {
  console.log(`Ajax server started on port ${port}`);
});
```

```js
function refreshServerInfo() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', function() {
    // this.responseText がJSONデータを含む文字列
    // JSON.parseを使って、オブジェクトに置換する
    const data = JSON.parse(this.responseText);

    // <div>("serverInfo"のクラスをもつもの)のテキストを置換する
    const serverInfo = document.querySelector('.serverInfo');

    // サーバーから返されたオブジェクトのすべてのキーについて処理を行う
    // ("platform"、"nodeVersion"、"uptime")
    Object.keys(data).forEach(p => {
      // プロパティがマッチする要素を捜す
      const replacements = serverInfo.querySelectorAll(`[data-replace="${p}"]`);
      // 値を置換する
      for(let r of replacements) {
        r.textContent = data[p];
      }
    });
  });
  req.open('GET', 'http://localhost:7070', true);
  req.send();
}

refreshServerInfo();
// setInterval(refreshServerInfo, 200); // こちらにすると自動更新
```

## 18.11　まとめ

ウェブ開発においてはJavaScript以外にもさまざまな事柄を学ぶ必要がある
