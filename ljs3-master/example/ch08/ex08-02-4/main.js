let arr = [1, 5, 7];
let arr2 = arr.splice(1, 0, 2, 3, 4); // arr[1]から2, 3, 4が追加される
console.log(arr); // [ 1, 2, 3, 4, 5, 7 ]
console.log(arr2); // [] ←何も削除されていない
arr2 = arr.splice(5, 0, 6); // arr[5]に6が追加されて、以降ひとつずつ後ろへ
console.log(arr); // [ 1, 2, 3, 4, 5, 6, 7 ]
console.log(arr2); // [] ←何も削除されていない
arr2 = arr.splice(1, 2) // arr[1]から2個削除
console.log(arr); // [ 1, 4, 5, 6, 7 ]
console.log(arr2); // [ 2, 3 ] ←削除された要素
arr2 = arr.splice(2, 1, 'a', 'b'); // arr[2]から1個削除して'a'と'b'をそこに追加
console.log(arr); // [ 1, 4, 'a', 'b', 6, 7 ]
console.log(arr2); // [ 5 ] ←削除された要素

// ### 8.2.4　途中の要素の削除や途中への要素の追加
// メソッドsplice(接合)は破壊的メソッドであり、配列の任意の場所を指定して変更することができる。 
// ``arr.splice(変更を開始する添字, 削除する要素の数, 追加する要素)``
// 戻り値は取り除かれた要素からなる配列を返す。 

let arr = [1, 5, 7, 5, 2, 1, 7, 9];
let arr2 = arr.splice(3, 2, 'a', 'b')
console.log(arr)