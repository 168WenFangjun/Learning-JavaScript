const arr = [{ id: 5, name: "太郎" }, { id: 7, name: "花子" }];
console.log(arr.findIndex(o => o.id === 5)); // 0  ←idが5ならば条件にマッチ
console.log(arr.findIndex(o => o.name === "花子")); // 1
console.log(arr.findIndex(o => o === 3)); // -1
console.log(arr.findIndex(o => o.id === 17)); // -1
console.log(arr.findIndex(o => o.id === 7)); // 1

const arr = [{ id: 5, name: "太郎" }, { id: 7, name: "花子" }, { id: 5, name: "田中" }, {id: 15, name: "後藤" }];
console.log(arr.find(o => o.id === 5));