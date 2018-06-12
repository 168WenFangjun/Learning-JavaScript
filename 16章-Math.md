# 16章　Math
Numeral.jsなどのライブラリを使えば、数値の操作をより柔軟に行える。  

## 16.1　数値のフォーマット指定
### 16.1.1　固定小数点数
toFixed()  
小数点以下の桁数を指定できる。  
切り捨てではなく、四捨五入。  


### 16.1.2　指数表現
Number.protorype.toExponential  
数を指数表現で表示できる。  
切り捨てではなく、四捨五入。  

### 16.1.3　精度の指定
Number.prototype.toPrecision  
全体の桁数を指定できる。  

### 16.1.4　基数の指定
Number.prototype.toString()  
数値の基数(2進数、8進数、16進数など)を指定して表示できる。表示させたい基数を引数に指定する。  

### 16.1.5　より細かなフォーマット指定


## 16.2　定数
## 16.3　代数関連の関数
### - 16.3.1　累乗
### - 16.3.2　対数関連の関数
### - 16.3.3　その他の関数

絶対値 : Math.abs(x)  
符号を得る : Math.sign(x)
上限値 : Math.ceil(x)
下限値 : Math.floor(x)
すべて切り捨て : Math.trunc(x)
四捨五入: Math.round(x)
最小の引数 : Math.min(x, y, z)
最大の引数 : Math.max(x, y, z)


### - 16.3.4　擬似乱数発生
Math.random();  
seedrandom.jsライブラリ。  

## 16.4　三角関数
## 16.5　双曲線関数