[toc]
# TypeScript

## TypeScript 是什么

> TypeScript 是 JavaScript 的超集

![关系图](https://user-gold-cdn.xitu.io/2020/6/8/1729166d732c0165?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如何使用

```shell
npm install -g typescript # 下载
tsc xx.ts # 生成 xx.js 文件
```

太麻烦？线上直接上手 [TypeScript Play]( https://www.typescriptlang.org/play/ )

## 基础类型

- Number

  ```typescript
  let num: number = 10;
  ```

- Any

  ```typescript
  let notSure: any = 'xxx';
  ```

- Boolean

  ```typescript
  let isDone: boolean = false;
  ```

- String

  ```typescript
  let str: string = 'str..';
  ```

- Array

  ```ts
  let arr: number[] = [1,2,3]
  ```

- Enum

  ```ts
  enum Direction {NORTH,SOUTH, EAST,WEST,}
  let dir: Direction = Direction.NORTH;
  ```

- Tuple

  ```ts
  let tupleType: [string, boolean];
  tupleType = ["Semlinker", true];
  ```

- Void

  ```ts
  let unusable: void = undefined;
  ```

- UnKnown

  ```ts
  let value: unknown;
  value = true;
  valeu = 10;
  value = 'bobo'
  ```

- Null

  ```ts
  let n: null = null
  ```

- Undefined

  ```ts
  let u: undefined = undefined
  ```

- Never

  ```ts
  function infiniteLoop(): never {
    while (true) {}
  }
  ```

- Object

  ```ts
  interface Person {
      name: string;
      age: number;
  }
  let tom: Person={
      name:'Tom',
      age:25
  };
  ```

变量声明：

变量使用`let`，常量使用`const`

联合属性：

```ts
let value: string | number = 666
```


## 接口

> 接口是对值的名称和类型做检查

### 定义

```typescript
interface Person {
  name: string,
  readonly age: number,
  girlFirend?: string,
  [propName: string]: any
}
```

- 可选属性加 `?`
- 只读属性加 `onlyread`
- 会有额外的属性 `[propName: string]: any`

### 使用

```typescript

function getPerson(person: Person) {
  console.log(`我叫 ${person.name}, 今年 ${person.age}, 来自 ${person.from}`);
}

let Tom = {name: 'Tom', age: 23, from: 'China'};
getPerson(Tom);// 我叫 Tom, 今年23, 来自 China
```

函数接受的参数必须满足接口类型的要求。

## 类

### 定义

```typescript
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
```

### 修饰符

- `public`：属性默认的都是公共的
- `private`： 不能在声明它的类的外部访问 (不可以继承)
- `protected`：受保护的(可以继承)
- `readonly`： 只读属性必须在声明时或构造函数里被初始化。
- `static`：静态属性，只能类调用的属性

## 函数

```typescript
function add(x: number, y: number， z?: string): number {
    return x + y;
}
```

上面函数接受参数` x`、`y` 和一个可选参数 `z`，返回一个 `number` 类型的值。



## tsconfig.json

```json
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}

```





## 参考文档

- [TypeScript Doc（官方文档&英文版）](https://www.typescriptlang.org/docs/home.html)
- [TypeScript Handbook（中文版）]( https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tsconfig.json.html )
- [Typescript 入门教程](https://ts.xcatliu.com/basics/type-of-function)
- [1.2W字 | 了不起的 TypeScript 入门教程](https://juejin.im/post/5edd8ad8f265da76fc45362c)

