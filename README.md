# 現場で使えるTypeScript 詳解実践ガイド MEMO

## TypeScriptをグローバルインストール
```
npm i -g typescript
```

## ts-nodeをグローバルインストール
```
npm i -g ts-node
```

## tscコマンドでJSファイルへ変換する
```
tsc sample.js
```

## .jsファイルの実行
```
node sample.js
```

## tsconfig.jsonファイルの生成
```
tsc --init
```

## tsconfig.jsonファイルの編集
```json
{
  "compilerOptions": {
    // 〜省略〜
    "target": "ES2022",
    "outDir": "./dist", // コンパイルされたJavaScriptファイルが出力されるディレクトリを指定する
    // 〜省略〜
  }
}
```
