
$(document).ready(function() {
  'use strict';
  console.log('main.js を読み込み中...')

  paper.install(window);
  paper.setup(document.getElementById('mainCanvas'));
  /* ここで描画する */

  let tool = new Tool

  // Hello, World!
  let c = Shape.Circle(200, 200, 80); //円
  c.fillColor = 'black';
  let text = new PointText(200, 200); //新しいテキストを領域中央に
  text.justification = 'center'; //センタリング
  text.fillColor = 'white'; //色
  text.fontSize = 20; //フォントサイズ
  text.content = 'hello world'; //文字列

  // イベントハンドラ
  tool.onMouseDown = function(event) {
    let c = Shape.Circle(event.point.x, event.point.y, 20);
    c.fillColor = 'green';
  };

  // paper.view.darw();
});