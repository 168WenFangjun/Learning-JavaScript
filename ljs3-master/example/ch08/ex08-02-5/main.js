let arr = [11, 12, 13, 14];
let arr2 = arr.copyWithin(1, 2); // arr[1]の位置から置き換える。arr[2]から最後までコピーする
console.log(arr); // [ 11, 13, 14, 14 ]
console.log(arr2); // [ 11, 13, 14, 14 ] ← copyWithinはオブジェクト自身を返す
console.log(arr.copyWithin(2, 0, 2)); // [ 11, 13, 11, 13 ]
// ↑ arr[2]の位置から置き換える。arr[0]からarr[2]の前までコピーする
console.log(arr.copyWithin(0, -3, -1)); // [ 13, 11, 11, 13 ]
// ↑ arr[0]の位置から置き換える。最後から3番目の要素から最後の要素のひとつ前まで
//    （つまりarr[1]からarr[2]まで）コピーする
console.log(arr2); // [ 13, 11, 11, 13 ]
// ↑ arrを変更すると同じ配列を指しているarr2も変わる


// ### 8.2.5　配列内の要素の削除や置換
// ES2015から導入されたメソッドcopyWithinは破壊的メソッドであり、配列からコピーしたものを上書きする。 
// ``arr.copyWithin(上書きする場所, どこからコピーするか, どこまでコピーするか)``
// 第三引数の指定は、指定した場所の**1つ前まで**になることに注意。 


let arr = [11, 12, 13, 14, 15, 16, 17, 18];
let arr2 = arr.copyWithin(0, 3, -2); // arr[1]の位置から置き換える。arr[2]から最後までコピーする
let arr3 = arr2.copyWithin(0)
console.log(arr3)
let arr4 = arr3.copyWithin(-2, 0, 2)
console.log(arr4)

let arr2 = arr.copyWithin(-2, 0, 1)
console.log(arr2);