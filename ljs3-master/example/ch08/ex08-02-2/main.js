let arr = [1, 2, 3];
let arr2 = arr.concat(4, 5, 6);
console.log(arr); // [ 1, 2, 3 ]  （← 変更なし。以降も同じ）
console.log(arr2); // [ 1, 2, 3, 4, 5, 6 ]
arr2 = arr.concat([4, 5, 6]); //   （配列を渡す）
console.log(arr2); // [ 1, 2, 3, 4, 5, 6 ]
arr2 = arr.concat([4, 5], 6);
console.log(arr2); // [ 1, 2, 3, 4, 5, 6 ]
arr2 = arr.concat([4, 5], [6, 7]); // 引数は2つでいずれも配列
console.log(arr2); // [ 1, 2, 3, 4, 5, 6, 7 ]
arr2 = arr.concat([4, [5, 6]]); // 引数は配列ひとつでその2番目の要素が配列
console.log(arr2); // [ 1, 2, 3, 4, [ 5, 6 ] ]


// ### 8.2.2　複数要素の追加
// メソッドconcatは非破壊的メソッドであり、複数の要素を配列に追加し、配列のコピーを戻す。  
// 既存の配列に幾つかの要素を追加して、新しく配列を得たいときに使える。  
// 引数として配列を渡すと解体してくれるが、入れ子の配列の場合は内側の配列までは解体してくれない。  
// ```js
// let arr = [1, 2, 3];
// let arr2 = arr.concat(4, 5, 6);
// console.log(arr2); // [1, 2, 3, 4, 5, 6]  arrに複数の要素を追加したものをコピーしたarr2
// arr2 = arr.concat([4, 5], [6, 7]);
// console.log(arr2); // [1, 2, 3, 4, 5, 6, 7]  引数に配列を渡すと解体された上で要素が追加される
// arr2 = arr.concat([4, [5, 6]]);
// console.log(arr2); // [1, 2, 3, 4, [5, 6]] // 入れ子の配列を引数に渡すと、内側の配列までは解体してくれない
// ```

let arr = [1, 2, 3];
let arr2 = arr.concat(4, 5, 6);
console.log(arr2);
arr3 = arr.concat(10, 11, 12);
console.log(arr3);
