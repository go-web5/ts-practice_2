// number型（数字）
let age: number = 50; // 型注釈によって number 型とする
let height = 200.4; // 型推論により number 型となる


// string型（文字）
let firstName: string = "Michel"; // 型注釈によって string 型とする
let Message = `Hello, my name is ${firstName}`; // 型推論により string 型となる


// boolean型（真偽値）
let isCompleted: boolean = false; // 型注釈によって boolean 型とする
let isValid = true; // 型推論により boolean 型となる

// リテラル型
// 変数が取りうる値を特定の具体的な値に限定した方をリテラル型という
const adultAge = 30; // リテラル型（30）

// ユニオン型
// 異なる型を組み合わせて新しい型を形成する (A または B)
let id: number | string;
let role: number | string | boolean;

// リテラル型のユニオン型
let eventType : "click" | "hover" | "keydown";
const themeColor: "light" | "dark" | "solarized" = "dark";

// 型エイリアス
type Role = number | string;
// ↓ 使い回す
let firstRole: Role;

// 型エイリアスのユニオン型
type Animal = Cat | Dog;
type Cat = "mike" | "dora" | "persian";
type Dog = "shiba" | "poodle" | "pug";
// ↓ 使い回す
let pet: Animal = "shiba";

// オブジェクト型

// 型エイリアスを用いたオブジェクト型の定義
type Book = {
  title: string;
  author: string;
  publishedIn: number;
};
// ↓ 使い回す
const book:Book = {
  title: "こころ",
  author: "夏目漱石",
  publishedIn: 1914,
};

// オプショナルプロパティ
// ?をつけるとオプショナルプロパティになり、存在しなくても型チェックを通過する
type Person = {
  name: string;
  age?: number;
  // age? はオプショナルプロパティになり、number | undifined のユニオン型を意味する
}

const alice: Person = {
  name: "Alice",
  age: 30,
}

const bob: Person = {
  name: "Bob",
}

// 型注釈による　Array型の指定
let fruits: string[];
fruits = ["Apple", "Grape", "Banana", "Peach", "Pear"];

// Tuple 型
const person: [string, number] = ["Alice", 30];

// ラベル付き型 Tuple 型
type RGB = [red: number, green: number, blue: number];

// Tupleの要素のオプション化
// any型は型の制約なし、型チェックが行われない
type Foo = [first: number, second?: string, ...rest: any[]];

let a: Foo = [1];
let b: Foo = [1, "hello"];
let c: Foo = [1, "hello", true, 10, "world"];

// インターセクション型
// A かつ B
type Engine = {
  engineType: string;
  volume: number;
}

type Wheels = {
  wheelCount: number;
}

type Car = Engine & Wheels;

const myCar: Car = {
  engineType: "V8",
  volume: 3000,
  wheelCount: 4,
}

// any型
// 型の制約なし、型チェックが行われない
let valueAny: any = 1;
valueAny = "noTypeCheck";

// unknown型
// any型とは異なり、型安全性を損なうことなく未知の型を扱える
let valueUnknown: unknown = 1;

// let valueNumber: number = valueUnknown;
// 型チェックが行われ、以下のエラーが出る
// 型 'unknown' を型 'number' に割り当てることはできません。


// パラメータと戻り値の型
// パラメータに型注釈を付ける、戻り値は型推論されるので型注釈する必要はない
function addNumbers1(a: number, b: number) {
  return a + b;
}

// 関数の戻り値の型注釈
// パラメータに型注釈を付ける、戻り値は型推論されるので型注釈する必要はない
// 戻り値の型を型注釈で指定するには、パラメータリスト(): 型名 を記述する
function addNumbers2(a: number, b: number): number {
  return a + b;
}

// void型
// 関数内で特定の処理だけ行い、戻り値を返さないものに対して void を指定する
function greet(): void {
  console.log("Hello!");
}

// 戻り値の型が void の関数型
type ReturnVoid = () => void;

// void　を返すべき関数型の変数に、実際に値を返す関数を代入しても構わない
const greetWorld: ReturnVoid = () => {
  return "Hello, World!";
}

// result は void 型として扱われ、関数の戻り値の型情報は無視される
const result1 = greetWorld();

// never型
// 関数が戻り値を返さず、かつ呼び出し元に制御を戻すことが決してない状況を表す
type Shape = "circle" | "square" | "triangle";

function handleShapes(shape: Shape) {
  switch (shape) {
    case "circle":
      // 円の処理する
      break;
    case "square":
      // 正方形を処理する
      break;
    case "triangle":
      // 三角形を処理する
      break;
    default:
      const exhaustiveCheck: never = shape;
      throw new Error(`未処理の形状: ${exhaustiveCheck}`);
  }
}

handleShapes("circle"); // OK
// handleShapes("hexagon"); // NG


// 関数オーバーロード
// 同じ名前の関数に対して、複数の呼び出しシグネチャを定義できる

// オーバーロードのシグネチャ
function addNumbers(a: number, b: number): number;
function addNumbers(a: string, b: string): string;
function addNumbers(a: number, b: string): string;
function addNumbers(a: string, b: number): string;

// 関数本体
function addNumbers(a: number | string, b: number | string): number | string {
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  } else {
    return a.toString() + b.toString();
  }
}

// result は string 型として推論される
let result2 = addNumbers("1", "2");
result2.includes("1"); // true
