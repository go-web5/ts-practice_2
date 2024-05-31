//*------------------------------------
// 4-1 インターフェイス
//*------------------------------------
// オブジェクトの形状を明確に定義し、その形状に合致するオブジェクトのみを扱うことを強制できる

// 型エイリアスによるオブジェクト型の宣言
type PersonA = {
  name: string;
  age: number;
}

// インターフェイスの宣言
interface PersonB {
  name: string;
  age: number;
}

let john: PersonB = {
  name: "John",
  age: 30,
}

// インターフェイスとメソッド
interface PersonC {
  name: string;
  age: number;
  speak(word: string): void;
}

let beyonce: PersonC = {
  name: "beyonce",
  age: 30,
  speak(word) {
    console.log(word);
  },
};

beyonce.speak("Wonderful!!");

// 読み取り専用プロパティ
interface Point {
  readonly x: number;
  readonly y: number;
}

const point: Point = {
  x: 100,
  y: 200,
};

// NG 以下は読み取り専用のため、代入することができない
// point.x = 30;


// インデックスシグニチャ
// JavaScriptでよく見られるようなオブジェクトの柔軟な使用法を、TypeScriptでも型の安全性を維持しながら実現できる。オブジェクトを初期のコンテナとして設定し、その後で動的にプロパティを追加していく方法など。

// インデックスシグニチャの構文
// [キーの名前（任意）: キーの型]: 値の型;

// string型のキーのインデックスシグニチャ
interface FruitStockA {
  [i: string]: number;
}

const fruitA: FruitStockA = {};
fruitA.apple = 3;
fruitA.orange = 5;

// fruit.banana = "many" // エラー

// インデックスシグニチャと明示的なプロパティの混在
interface FruitStockB {
  peach: number;
  [i: string]: number;
}

const fruitB: FruitStockB = { peach : 1};
fruitB.apple = 3;
fruitB.orange = 3;

// キー名がテンプレートリテラルのインデックスシグニチャ
interface Product {
  [key: `product_${number}`]: string;
}

const product : Product = {
  product_1: "foo", // OK
  product_2: "bar", // OK
  // product_dx: "baz", // Error
}


// インターフェイスの拡張
// extends キーワードを使用する

// 拡張元となるインターフェイス
interface VehicleA {
  speed: number;
}

// Car は Vehicle は拡張したインターフェイス
interface CarTypeA extends VehicleA {
  engineType: string;
  volume: number;
}

// OK
const superCar: CarTypeA = {
  speed: 240,
  engineType: "V8",
  volume: 4000,
}

// NG speed プロパティが欠けているためエラー
// const sportsCar: CarType = {
//   engineType: "V4",
//   volume: 2000,
// }


// 元のベースインターフェイスに存在するプロパティを上書き（オーバーライド）することができる
// インターフェイスのプロパティをオーバーライドする際には、派生インターフェイスのプロパティ型がベースインターフェイスのプロパティ型と互換性を有する必要がある
// 派生プロパティの型をベースプロパティの型の代わりとして利用できなければならない
interface VehicleB {
  speed: number;
  model: string | null;
}

interface CarTypeB extends VehicleB {
  engineType: string;
  model: string; // model プロパティをオーバーライド
}

// 複数のインターフェイスの拡張
interface Born {
  birthYear: number;
  place: string;
}

interface Hobby {
  hobbies: string[];
}

// 複数のインターフェイスを拡張
interface PersonD extends Born, Hobby {
  name: string;
}

const mike: PersonD = {
  name: "Mike",
  birthYear: 1990,
  place: "New York",
  hobbies: ["tennis", "cooking", "chess"],
}


// インターフェイスのマージ
// インターフェイスの定義がプログラム全体に散らばってしまうと、個々の定義がどのように統合されて全体となるのかを理解するのが難しくなるので、必要な場合に限定して慎重に使用する。
// 外部ライブラリを拡張する際に有用
interface CarTypeC {
  engineType: string;
  volume: number;
}

// CarTypeC インターフェイスは自動的にマージされる
interface CarTypeC {
  color: string;
}

// OK 
const myCarA: CarTypeC = {
  engineType: "V6",
  volume: 3000,
  color: "red",
}
// プロパティが欠けるとエラーになる


// インターフェイスと型エイリアスの違い

// インターフェイス
// オブジェクトの構造を定義するのに特化した機能
// マージ機能
// クラスと連携することで、クラスが特定の構造を持つことを保証する

// 型エイリアス
// ユニオン型、インターセクション型など、任意の型を組み合わせることで、より複雑な型を表現できる
// 上記の点において、インターフェイスより汎用的


//*------------------------------------
// 4-2 クラス
//*------------------------------------
// クラスを使うことで、再利用可能なオブジェクトのテンプレートを作成し、一貫性のあるオブジェクト構想を容易に実現できるようになる

// クラスによるオブジェクトの作成
class PersonClassA {
  // プロパティをクラスのトップレベルで宣言する、しないとエラー出る
  name: string;
  age: number;
  hobbies?: string[]; // オプショナルプロパティ

  // コンストラクタのパラメータには型注釈が必要
  // コンストラクタの戻り値の方は指定しない
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
    
  }
  
  // greet メソッドを追加
  greet(greeting: string): void {
    console.log(
      `${greeting}, my name is ${this.name} and I'm ${this.age} years old.`
    );
  }
}

const takeshi = new PersonClassA("takeshi suzuki", 30);

// greet メソッドを呼び出し
takeshi.greet("Hello!!")

// 型としてクラスを使用
let taro: PersonClassA;
// クラスの左に new をつける 
taro = new PersonClassA("taro yamada", 50);
taro.greet("What's up!!")


// PersonClassB 型の変数 hiroshi にオブジェクトリテラルで生成したオブジェクトを代入する
// オブジェクトの構造的型付け
class PersonClassB {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

let hiroshi: PersonClassB;
// オブジェクトリテラルを使用してオブジェクトを生成する。new は必要ない
hiroshi = {
  name: "hiroshi suzuki",
  age: 100
}
// クラスから生成したオブジェクトを変数に代入した場合、その変数の型はそのクラスの型になる
