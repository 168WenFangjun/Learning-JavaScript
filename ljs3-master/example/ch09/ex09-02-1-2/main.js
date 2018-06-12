class 自動車 {
  constructor() {
  }
}

const 自動車1 = new 自動車();
const 自動車2 = new 自動車();

console.log(自動車1 instanceof 自動車) // true
console.log(自動車2 instanceof 自動車) // true
console.log(自動車1 instanceof Array) // false


// オブジェクト指向プログラミングをしてみよう

// ピアノ

class piano {
  constructor(make, model, numKeyboard) {
    this.make = make;
    this.model = model;
    this.numKeyboard = numKeyboard;
    this._userCodes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    this._userCode = this._userCodes[0];
  }

  get userCode() { return this._userCode; }
  set userCode(value) {
    if(this._userCodes.indexOf(value) < 0)
      throw new Error(`初期コードが正しくない: ${value}`);
    this._userCode = value;
  }
  shift(code) { this.userCode = code; }
}

const piano1 = new piano("YAMAHA", "P30-21", "88");
const piano2 = new piano("ROLAND", "S00001", "32");
console.log(piano1.userCode);
piano1.shift('D');
console.log(piano1.userCode);
piano1._userCode = 'X';
console.log(piano1.userCode);

