let arr = [1, 2, 3, 4, 5];
let arr2 = arr.reverse();
console.log(arr); // [ 5, 4, 3, 2, 1 ]
console.log(arr2); // [ 5, 4, 3, 2, 1 ]  ← reverseはオブジェクト自身を返す
arr.reverse();
console.log(arr); // [ 1, 2, 3, 4, 5 ]
console.log(arr2); // [ 1, 2, 3, 4, 5 ]


// ### 8.2.7　逆転とソート
// reversは配列の要素を逆順に並び替える。
// ```js
// let arr = [1, 2, 3, 4, 5];
// let arr2 = arr.reverse();
// console.log(arr); // [5, 4, 3, 2, 1];
// arr.reverse();
// console.log(arr); // [1, 2, 3, 4, 5];
// ```
// sortは配列の要素のソートをする。
// ```js
// let arr = [5, 3, 2, 4, 1];
// let arr2 = arr.sort();
// console.log(arr); // [1, 2, 3, 4, 5]
// ```
// sortでは、ソートの条件を関数によって決めることができる。
// ```js
// let arr = [{ name: "たなか"}, { name: "やまだ"}, { name: "さとう"}, { name: "こんどう" }];
// arr.sort((a, b) => a.name > b.name); // 名前順にソート
// console.log("-----");
// arr.sort((a, b) => a.name[1] < b.name[1]); //添字1(名前の二文字目)を逆順にソート
// console.log("-----");
// ```

