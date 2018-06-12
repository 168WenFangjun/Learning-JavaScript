# 20章　Node.js

Node.jsは2009年にJoyent社のRyanDahlによって開発された。
Node.jsはウェブアプリケーション、デスクトップアプリ、システム用のスクリプトの作成にも用いられるようになっていきている。

## 20.1　Nodeの基本

NodeにはNode専用のAPIがある。
JavaScriptの機能とAPIの機能とを区別して理解しておくことは重要である。

## 20.2　モジュール

モジュールを使えば、コードをまとめネームスペースを使うことができる。
ネームスペースを使うことで「名前の衝突」を防ぐことができる。

```js
// プロパティexportsに代入したものがモジュールからエクスポートされる

// amanda.js / geometic(幾何級数)
function calculate(a, x, n) {
  if(x === 1) return a*n;
  return a*(1 - Math.pow(x, n)/(1 - x));
}

module.exports = calculate;

// tyler.js / sphreVolume(半径rの級の体積)
function calculate(r) {
  return 4/3*Math.PI*Math.pow(r, 3);
}

module.exports = calculate;
```

モジュールのインポートはapp.jsというファイルを作る。

```js
// app.js
const geometricSum = require('./amanda.js'); 
const sphereVolume = require('./tyler.js');

console.log(geometricSum(1, 2, 5)); // 31
console.log(sphereVolume(2)); // 33.510321638291124
```

- エクスポートできる型は任意である
- 通常は複数の関数をエクスポートする

```js
// 複数の関数をプロパティとしてもつオブジェクトのエクスポート
// ES2015の省略記法を使用している
module.exports = {
  geometricSum(a, x, n) {
    if(x === 1) return a*n;
    return a*(1 - Math.pow(x, n))/(1 - x);
  },
  arithemeticSum(n) { // 1〜nまでの合計
    return (n + 1)*n/2;
  },
  quadraticFomula(a, b, d) {  // 二次方程式の解
    const D = Math.sqrt(b*b - 4*a*c)
    return [(-b + D)/(2*a), (-b - D)/(2*a)];
  },
};
```

以上は、以下のように利用する。

```js
// node app.jsで実行
const amanda = require('./amanda.js');
console.log(amanda.geometricSum(1, 2, 5)); // 31
console.log(amanda.quadraticFomula(1, 2, -15)); // [ 3, -5 ]
```

exportsを使えば、簡略できる。

```js
// amanda.js
exports.geometricSum = function(a, x, n) {
    if(x === 1) return a*n;
    return a*(1 - Math.pow(x, n))/(1 - x);
  };
exports.arithemeticSum = function(n) { // 1〜nまでの合計
    return (n + 1)*n/2;
  };
exports.quadraticFomula = function(a, b, d) {  // 二次方程式の解
    const D = Math.sqrt(b*b - 4*a*c)
    return [(-b + D)/(2*a), (-b - D)/(2*a)];
  };
```

ただし、簡略記法は**オブジェクトのエクスポートにしか使えない**。 
関数あるいはその他の値をエクスポートはmodule.exportsを使う。両方の記法は混在できない。

## 20.3　コアモジュール、ファイルモジュール、npmモジュール

Node.jsのモジュールは以下の3種類である。

- コアモジュール
  - 「/」「./」「../」のいずれでも始まらない。
  - Nodeが提供し、モジュール名はあらかじめ予約されている
  - いくつかのコアモジュールはグローバルで利用できる
- ファイルモジュール
  - 「/」「./」「../」のいずれかで始まる。
  - ファイルに作成し、module.exportsに代入し、requireで呼び出す。
- npmモジュール
  - コアモジュールではなく「/」「./」「../」のいずれでも始まらない。
  - node_modulesに置かれたファイルモジュール

npmモジュールのrequireは、以下の順序で捜す
nnode_modulesはnpmが管理する。手動でファイルやディレクトリの追加・削除は行ってはならない。

- カレントディレクトリの下位のnode_modules
  - カレントディレクトリ
    - 親ディレクトリ
      - rootディレクトリ

## 20.4　関数モジュールを使ったモジュールのカスタマイズ(?)

モジュールのカスタマイズやコンテキストに関する情報を受け取る場合がある。
この場合は、関数を使うのではなく、関数自体がモジュールに作用するパターンが多い。

```js
// debug-test.js
// [npm install debug]でインストール
// [DEBUG=main node debug-test.js]で実行

const debug = require('debug')('main'); // モジュールが戻す関数をすぐに呼び出す
debug("開始"); // デバッグがオンになっている場合、[main 開始 +0ms]とログが取られる

for (let i=0; i<10; i++) {
  console.log(i);
}

debug("終了"); // また呼び出している？

// debugモジュールは関数を値として返し、その関数を即座に呼び出している。
// 関数自身が最初の関数からの文字列を「記憶」する関数を戻す。
// モジュールに対して値を焼き付けている、と言える。
```

```js
// debug.js

let lastMessage;

module.exports = function(prefix) {
  return function(message) {
    const now = Data.now();
    const sinceLastMessage = now - (lastMessage || now);
    console.log(`${prefix} ${message} + ${sinceLastMessage}ms `);
    lastMessage = now;
  }
}
```

NodeはモジュールをNodeアプリが実行されたときに一度だけインポートする。
2度インポートした場合、2度目は無視される。

```js
const debug1 = require('./debug')('1:');
const debug2 = require('./debug')('2:');
```

## 20.5　ファイルシステムへのアクセス

ファイルシステムはプログラムの基本である。 
fs.writeFileを使えば、ファイルを新たに作成できる。 
Nodeでは、Nodeアプリケーションを起動したディレクトリがCWDとなる。

```js
// write-file1.js
// [node write-file1.js]を実行

const fs = require('fs');

fs.writeFile('hello.txt', 'Nodeからごあいさつです！ \n', function(err) {
  if(err) return console.log('エラー：ファイルに書き込めません。');
});
```

__dirnameはNodeの特別な変数であり、ソースファイルが存在するディレクトリを記憶できる。

```js
// write-file2.js
// [node write-file2.js] を実行

const fs = require('fs');
fs.writeFile(__dirname + '/hello.txt', 'Nodeからごあいさつです \n', function(err) {
  if(err) return console.log('エラー：ファイルに書き込めません。');
});
```

pathを使えば、プラットフォームに依存しないモジュールを書くことができる。 
path.joinは、第一引数と第二引数をそのままスラッシュで繋げる(/を書かずに済み、プラットフォームに依存しない)

```js
const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'hello.txt'), Nodeからごあいさつです \n', function(err) {
  if(err) return console.log('エラー：ファイルに書き込めません。');
});
```

fs.readFileを使えば、ファイルから読み込むことができる。

```js
// エンコーディング未指定。バイナリデータが入ったバッファがそのまま書き出される
const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'hello.txt'), function(err, data) {
  if(err) return console.error('エラー：ファイルから読み込めません。');
  console.log('読み込んだファイルの内容：');
  console.log(data);
});

// 読み込んだファイルの内容:
// <Buffer 4e 6f 64 65 e3 81 8b e3 82 89 e3 81 94 e3 81 82 e3 81 84 e3 81 95 e3 81 a4 e3 81 a7 e3 81 99 ef bc 81 0a>


// エンコーディングを指定して、期待した出力を得る
const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'hello.txt'),
  { encoding: 'utf-8'}, function(err, data) {
  if(err) return console.error('エラー：ファイルから読み込めません。');
  console.log('読み込んだファイルの内容：');
  console.log(data);
  })
```

関数の最後にSyncをつけることで、fsのすべての関数は同期的に処理できる。

```js
// 同期的な書き込み
const fs = require('fs');
const path = require('path');
fs.writeFileSync(path.join(__dirname, 'hello.txt'), 'Nodeからごあいさつです！\n');

// 同期的な読み込み
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync(path.join(__dirname, 'hello.txt'), { encoding: 'utf-8'});
console.log('読み込んだファイルの内容：');
console.log(data);
```

同期バージョンを使うと、エラー処理は例外を用いて行われる。 
次のようにtry...catchブロックで囲む。

```js
const fs = require('fs');
const path = require('path');
try {
  fs.writeFileSync(path.join(__dirname, 'hello.txt'), 'Nodeからごあいさつです！ \n');
  } catch(err) { console.error('エラー：ファイルに書き込めません。');
  }
}
```

fs.readdirを使えば、ディレクトリ内のファイルをリストすることができる。

```js
// カレントディレクトリのファイル一覧を作成する

const fs = reqiure('fs');

fs.readdir(__dirname, function(err, files) {
  if(err) return console.error('ディレクトリの内容を読み込めません。');
  console.log(`${__dirname}のファイル一覧：`);
  console.log(files.map(f => '\t' + f).join('\n'));
})
```

fsモジュールには多数の関数が用意されている。

- fs.unlink : ファイルの削除
- fs.rename : ファイルの名称変更
- fs.start : ファイルやディレクトリに関する情報の取得

## 20.6　プロセス(?)

プロセスを使えば、呼び出し側は実行が成功したかどうかを知ることができる。
process.exitは実行を即座いに停止し、数値を値に持つ終了コードを返す。

```js
// process1.js
const fs = require('fs');

fs.readdir('data', function(err, files) {
  if(err) {
    console.error("致命的なエラー:dataディレクトリを読めません。");
    process.exit(1);
  }
  const txtFiles = files.filter(f => /\.txt$/i.test(f));
  if(txtFiles.length === 0) {
    console.log("処理すべき.txtファイルがありません。");
    process.exit(0);
  }
  console.log(".txtファイルを処理します...");
  // .txtファイルの処理...
})

// $ node linecount.js file1.txt file2.txt file3.txt 
// file1.txt: 4
// file2.txt: 6
// file3.txt: 7
```

process.argvの内容を表示するプログラム

```js
// [node argv.js file1.txt file2.txt file3.txt]で実行
console.log(process.argv);
// [ '/Users/mock/.nodebrew/node/v8.9.4/bin/node',
//   '/Users/mock/Notes/はじめてのJavaScript/ljs3-master/example/ch20/ex20-06-1/argv.js',
//   'file1.txt',
//   'file2.txt',
//   'file3.txt' ]
```

Array.sliceを用いて最初の二行を削除し、残りのファイルについて行数を数える

```js
// linecount.js
'use strict'
const fs = require('fs');
const filenames = process.argv.slice(2);

let counts = filenames.map(f => {
  try {
    const data = fs.readFileSync(f, { encoding: 'utf-8' });
    return `${f}: ${data.split('\n').length}`;
  } catch(err) {
    return `${f}: ファイルを読み込めません`;
  }
});

console.log(counts.join('\n'));
```

## 20.7　OS

osモジュールを使えば、実行中のコンピュータに関する情報を得られる。

```js
const os = require('os');

const os = require('os');

console.log("ホスト名: " + os.hostname());
console.log("OSのタイプ: " + os.type());
console.log("OSのフラットフォーム: " + os.platform());
console.log("OSのリリース: " + os.release());
console.log("OSのuptime: " +
    (os.uptime()/60/60/24).toFixed(1) + " days");
console.log("CPUのアーキテクチャ: " + os.arch());
console.log("CPUの個数: " + os.cpus().length);
console.log("メモリ量: " +
    (os.totalmem()/1e6).toFixed(1) + " MB");
console.log("フリーメモリ: " +
    (os.freemem()/1e6).toFixed(1) + " MB");
```

## 20.8　子プロセス

child_processモジュールを使えば、ほかのプログラムを実行できる。(Nodeでも、ほかの言語で書かれたスクリプト、システムのコマンドでも構わない) 
execはオプションのオブジェクトoptionsを取ることで、環境変数、ワーキングディレクトリなどを指定できる。

- exec  : シェルを起動して指定した実行形式ファイルを実行する(一般的)
- execFile  : 実行形式ファイルを直接実行する
- fork  : ほかのNodeスクリプトを実行する

```js
const exec = require('child_process').exec;

const command = "ls" // win:dir linux:ls
exec(command, function(err, stdout, stderr) {
// stdout :標準出力　stderr :標準エラー stdin :標準入力
  if(err) return console.error(`実行エラー ${command}`);
  stdout = stdout.toString(); // バッファを文字列に変換
  console.log(stdout);
  stderr = stderr.toString();
  if(stderr !== '') {
    console.error('error:');
    console.error(stderr);
  }
});
```

## 20.9　ストリーム

ストリームとは連続するデータの処理をするためのオブジェクトである。

- read  :読み込み
- write :書き込み
- duplex:読み書き

デュプレックスストリームはあまり使われない。

```js
// 書き込み(write)ストリーム
const fs = require('fs');

const ws = fs.createWriteStream('steram.txt', { encoding: 'utf-8' });
ws.write('1行目\n');
ws.write('2行目\n');
ws.end();
```

読み込んだデータをコンソールに表示する

```js
// 読み込み(read)ストリーム
const fs = require('fs');
const rs = fs.createReadStream('stream.txt', { encoding: 'utf-8' });
rs.on('data', function(data) {
  console.log('>> データ：' + data.replace('\n', '\\n'));
});
rs.on('end', function(data) {
  console.log('>> 終わり');
});
```

パイピングを使えば、ReadStreamで読み込んだデータをWriteStreamに書き出むことできる。
パイピングの具体例

- ファイルの内容をウェブサーバーのレスポンスにパイプする
- 圧縮されたデータが解答エンジンにパイプされ展開する。さらに、その結果がパイプされてファイルに書き込まれる

```js
const fs = require('fs');

const rs = fs.createReadStream('stream.txt');
const ws = fs.createWriteStream('stream_copy.txt');
rs.pipe(ws) // wsにrsをパイプする

// この例では、rsは単純にバイト列をwsに流しているため、エンコーディングは問題にはならない。
```

## 20.10　ウェブサーバー

Nodeは最初はウェブサービスを提供する目的で作られた。
ApacheやIISよりも簡単にウェブサーバーを構築することができる。

httpモジュールのメソッドcreateServerを使えば、サーバーを動かすことができる。

```js
const http = require('http');

const server = http.createServer(function(req, res) {
  console.log(`${req.method} ${req.url}`);
  res.end('Hello world!');
});

const port = 8081;
server.listen(port, function() {
  // サーバーが開始されたことを知らせるコールバック関数を渡すことができる
  console.log(`サーバーをポート${port}で開始`);
});
```

Nodeのウェブサーバーの中核には、コールバック関数がある。
コールバック関数がすべてのレスポンスに応答する。2つの引数がある。

- IncomingMessageオブジェクト
  - HTTPリクエストに関するすべての情報を保持する
- ServerResponseオブジェクト
  - 書き込みストリームのインタフェースを実装している
  - クライアント側に送るレスポンスを制御する

ServerResponseを使って、ファイルfavicon.icoを直接送る

```js
const http = require('http');

const server = http.createServer(function(req, res) {
  if(req.method === 'GET' && req.url === '/favicon.ico') {
    const fs = require('fs');
    const rs = fs.createReadStream('favicon.ico');
    rs.pipe(res); // rsしたものをそのままresにパイピング
  } else {
    console.log(`${req.method} ${req.url}`);
    res.end(`urlは[${decodeURI(req.url)}]ですね。`);
  }
});

const port = 8000;
server.listen(port, function() {
  // サーバーが開始されたことを知らせるコールバック関数を渡すことができる
  console.log(`サーバーをポート${port}で開始`)
})
```

Nodeのウェブサイト構築には、ExpressやKoaなどのフレームワークがある。

## 20.11　まとめ

以上はNodeのAPIの重要と思われるものである。
公式サイトのドキュメントはわかりやすいが、初心者にはすこし手強いかもしれない。Nodeの初心者向け解説書から始めるとよいかもしれない。