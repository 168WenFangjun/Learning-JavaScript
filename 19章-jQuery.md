# 19章　jQuery

DOMのAPIを使えばjQueryでできることはすべて可能である。 
しかし、jQueryには以下のような利点がある。

- jQueryはブラウザによる差異を解消する
- AjaxのAPIに関してjQueryは簡潔に書ける(ただしフレームワークは存在する)
- DOMの拡張機能が使える

jQueryは不必要との意見もあるが、まだ広く使われているため避けることはできない。

## 19.1　jQueryと「$」

jQueryの識別子は「$」である。使わずに済むこともできる。

## 19.2　jQueryの利用

一般的にjQueryはCDNを使って利用する。

```js
<script src="https://code.jquery.com/jquery-3.1.0.min.js" integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s="
crossorigin="anonymous"></script>
```

## 19.3　DOMのロードを待つ

DOMの構築が完了するまで待って処理を始める

```js
$(document).ready(function() {
  // HTMLのロードとDOMの構築完了後の処理をここに書く
});

// 簡単にも書ける
$(function() {
  // HTMLのロードとDOMの構築完了後の処理をここに書く
});
```

## 19.4　jQueryにラップされたDOM要素

jQueryでは最初に「jQueryでラップされたDOM要素の集合(jQueryオブジェクトと仮に呼ぶ)」を生成する。 
以下は、``<p>``タグにマッチするすべてのjQueryオブジェクトの取得である。

```js
$(function() {
  const $paras = $('p'); // <p>タグにマッチするものを取得
  console.log($paras.length); // 5
  console.log(typeof $paras); // object
  console.log(typeof instanceof $); // true
  console.log(typeof instanceof jQuery); // true
})
```

HTMLコードを指定して呼び出すことでDOM要素を生成できる

```js
const $newPara = $('<p>新しく生成した段落...</p>');
```

## 19.5　要素の操作

jQueryオブジェクトのtext/htmlメソッドを使えば、コンテンツの追加や削除ができる。 
これらのメソッドはtextContentおよびinnnerHTMLにほぼ対応している。

```js
// textメソッド
$('p').text('すべての段落が、この文字列に置換されました');
// htmlメソッド
$('p').html('<span style="color: red">すべての</span>段落が置換されました')
```

要素の指定や削除

```js
// 3番目の段落だけを変更する
$('p') // すべての段落にマッチ
  .eq(2) // 3番目の段落(0から数えて3つめ)
  .html('<b>3番目</b>の段落が置換されました');

// 全段落を削除する
$('p').remove();
```

appendメソッドを使えば、すべての要素にコードを付加できる 
after/berforメソッドを使えば、指定した要素の前後に追加できる

```js
// すべてのp要素に追加する
$('p')
  .append('<sup>*</sup>');

// <hr>を段落の前後に追加する
$('p')
  .after('<hr>')
  /berfore('<hr>');
```

作用関係を逆に記述することもできる

```js
$('<sup>*</sup>.appendTo('p')');
$('<hr>.insertBefore('p')');
$('<hr>.insertAfter('p')');
```

- addClass/removeClass  : クラスの追加や削除ができる。
- toggleClass : 既にクラスが指定されている場合は削除、指定されていない場合は追加できる。
- メソッドcss : 直接CSSを指定できる
  - : even : 奇数の要素を選択する
  - : odd  : 偶数の要素を選択する

```js
// 偶数の段落を赤字にする
$('p:odd').css('color', 'red');
```

filter、not、findといったメソッドを使って対象を絞ることができる。

```js
// 段落の後に水平線を入れ、すべてのp要素に*をつけ加えた後、偶数の段落の文字列を赤にする
$('p')
  .after('<hr>')
  .append('<sup>*</sup>')
  .filter(':odd')
  .css('color', 'red')
```

not

```js
// 各段落に水平線を追加、クラスhighlightが指定されていない段落を、5cm字下げする
$('p')
  .after('<hr>')
  .not('.highlight')
  .css('margin-left', '5cm')
```

find

```js
// 各段落に水平線を追加、クラスcodeが指定されているものの、フォントサイズを30pxにする
$('p')
  .before('<hr>')
  .find('.code)
  .css('font-size', '30px')
```

## 19.6　jQueryオブジェクトのアンラップ

メソッドgetを使えば、jQueryオブジェクトをアンラップ(元のDOM要素にする)ことができる。

```js
const para2 = $('p').get(1); // 2番目の<p>
console.log('2番目の段落=${para2.innerHTML}');
```

DOMのすべての段落要素からなる配列を作る。

```js
const paras = $('p').get(); // すべての<p>要素からなる配列
  for(let i=0; i<paras.length; i++) {
    console.log(`${i+1}番目の段落=${paras[i].innnerHTML}`);
  }
```

## 19.7　Ajax

```js
// "node ajaxServer.js" でサーバーを起動してから実行

$(function() {
  let TimerID = setInterval(refleshServerInfo, 200); // 自動更新

  function refreshServerInfo() {
    const $serverInfo = $('.serverInfo'); // htmlファイルのserverInfoの<div>を取得
    $.get('http://localhost:7070').then(
      function(data) {  // 第1引数の関数　成功の時
        Object.keys(data).forEach(p => {
          $(`[data-replace="${p}"]`).text(data[p]);
        });
      },
      function(jqXHR, textStatus, err) {
        const $errorInfo = $('.error');
        console.error("エラーが起こりました:" + err);
        $errorInfo.text("エラー:サーバーに接続できません。");
        clearInterval(TimerID);
      }
    );
  }
})
```

## 19.8　まとめ

jQueryの将来は不透明なものがある。 
しかし、非常に多くのサイトで使われているため、開発者は少なくとも基本的なことを身につけておくほうがよい。