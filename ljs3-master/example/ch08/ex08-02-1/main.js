let arr = ["b", "c", "d"];
console.log(arr.push("e")); // 4  ←現在の長さ（要素数）
console.log(arr); // [ 'b', 'c', 'd', 'e' ]
console.log(arr.pop()); // e
console.log(arr); // [ 'b', 'c', 'd' ]
console.log(arr.unshift("a")); // 4  ←現在の長さ
console.log(arr); // [ 'a', 'b', 'c', 'd' ]
console.log(arr.shift()); // a
console.log(arr); // [ 'b', 'c', 'd' ]


// ### 8.2.1　先頭あるいは最後の要素に対する操作
// - 配列の先頭arr[0]
//   - unshift :先頭に要素を追加する
//   - shift   :先頭の要素を削除する(シフトする)

// - 配列の最後arr[arr.length-1]
//   - push    :最後に要素を追加する
//   - pop     :最後の要素を削除する

// 配列["b", "a", "c", "b", "d"]を作る

let arr = ["b", "c", "d"];
arr.shift();
arr.pop();
arr.unshift("a");
arr.push("b");
arr.unshift("b");
arr.push("d");
console.log(arr);