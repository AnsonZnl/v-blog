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

配合阮老师的 [ES6 入门教程]( https://es6.ruanyifeng.com/#README ) 一起食用效果更佳！

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

变量声明：变量使用`let`，常量使用`const`

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
  say: (words: string) => string
  [propName: string]: any
}
```

- 可选属性加 `?`
- 只读属性加 `readonly`
- 函数`(value: type) => returType`
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

### 继承

和 ES6 基本一致

```ts

class Animal {
    move(distanceInMeters = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}
class Dog extends Animal {
    constructor(name) {
        super();
        this.name = name;
    }
    bark() {
        console.log('Woof! Woof!');
    }
}
const dog = new Dog('dog');
dog.bark();
dog.move(10);
dog.bark();

```

### 抽象类

- 在 `class`前加` abstract  ` 关键字，表示这是一个抽象类
- 抽象类不能直接实例化，通常我们使用子类继承它，然后实例化子类

### 访问限定符

- `public`：成员默认的都是公共的，可以被外部访问（可以继承）
- `private`： 只能类的内部访问 (不可以继承)
- `protected`：只能被类的内部和类的子类访问，受保护的(可以继承)

### 属性修饰符

- `readonly`： 只读属性必须在声明时或构造函数里被初始化。
- `static`：静态属性，只能类调用的属性

### 类与接口

接口（interface）可以用于对【对象的形状（Shape）】进行描述，当然也可以使用`interface` 描述 `class`

- 接口声明使用
``` ts
interface interfaceName { ... }
```
- 类使用某个接口
``` ts
class className implements InterfaceName{ ... }
```

- 案例

```ts
interface Person { 
    name: string
}
class Tom implements Person {
    public name: string;
    constructor(name: string) {
        this.name = name
    }
    say() {
        console.log(`my name is ${this.name}`)
    }
}
let tom = new Tom('Tom');
tom.say(); //my name is Tom
```





## 函数

### 函数的定义

```typescript
function add(x: number, y: number=10, z?: number, ...rest: number[]): number {
    return [x, y, z, ...rest].reduce((a: number, b: number)=>a + b)
}
let result = add(1, 2, 3, 5, 6, 7)
console.log(result); // 24
```

上面函数接受参数` x`、`y` 和一个可选参数 `z`，和一个`number`类型的集合，返回一个 `number` 类型的值。

- `x: number` ：定义参数类型
- `y = 10`：定义参数默认值
- `z?: string`：定义可选参数
- `...rest: number[]`： 接受剩余参数



### 函数表达式

```ts
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
let result = mySum(1, 2)
console.log(result); //3
```

不要把 TS 的箭头和 ES6 的箭头函数混淆。

上面代码可以`=`号为分界点来理解

- `=`左部分：定义了一个`mySum`变量，它表示一个函数，接受`number`类型的 x 、y，最后返回值也是`number`
- `=`右部分：一个函数，接受 `number` 类型的 `x` 和 `y` ，返回值是`number`类型

上面的代码也可以写成箭头函数的形式：

```ts{1}
let mySum: (x: number, y: number) => number = (x: number, y: number): number => {
    return x + y;
};
let result = mySum(1, 2)
console.log(result); //3
```


### 重载

>  重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。 

 比如，我们需要实现一个函数 `reverse`，输入数字 `123` 的时候，输出反转的数字 `321`，输入字符串 `'hello'` 的时候，输出反转的字符串 `'olleh'`。 

 利用联合类型，我们可以这么实现： 

```ts
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

**然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。** 

 这时，我们可以使用重载定义多个 `reverse` 的函数类型： 

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

上例中，我们重复定义了多次函数 `reverse`，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。



## 类型断言
> 类型断言（Type Assertion）可以用来手动指定一个值的类型。

### 什么是断言
有些情况下 TS 并不能正确或者准确得推断类型，这个时候可能产生不必要的警告或者报错。
当你比 TS 的更清楚某些值的类型时：
``` ts
let Cat = {}
Cat.name = 'Kiti'; // Error Property 'name' does not exist on type '{}'
Cat.age = 6; // Error Property 'name' does not exist on type '{}'
```
当你知道这个 `Cat` 对象有 `name` 和 `age` 时，但是 TS 编译就是不通过， 怎么办？
这个时候就需要用到 **类型断言**
我们可以这写
``` ts
interface ICat {
    name: string,
    age: number
}
let Cat = {} as ICat
Cat.name = 'Kiti';
Cat.age = 6;
```

### 断言类型两种写法
**尖括号**
``` ts
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length; // 临时把 someValue 断言为一个string 类型的值
```
**as**
``` ts
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;//  临时把 someValue 断言为一个string 类型的值

```

### 将任何一个类型断言成 any
但有的时候，我们非常确定这段代码不会出错，比如下面这个例子：
``` ts
window.foo = 'foo'; // index.ts:1:8 - error TS2339: Property 'foo' does not exist on type 'Window & typeof globalThis'.
```
当我们向 `window` 添加一个 `foo` 时，会报错示我们 `window` 上不存在 `foo` 属性。

此时我们可以使用 as any 临时将 `window` 断言为 `any` 类型：
``` ts
(window as any).foo = 'foo'
```
临时将 `window` 断言为一个 `any` 类型，因为 `any` 可以添加任何的属性。
虽然这种方法可以解决诸如此类的问题，但是也可能会养成滥用 `any` 的习惯，所以慎用！

### 类型断言的限制
-  联合类型可以被断言为其中一个类型
-  父类可以被断言为子类
-  任何类型都可以被断言为 `any`
-  `any` 可以被断言为任何类型
-  要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可


## 泛型

> 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

### 类型断言 VS 泛型

举个例子：
``` ts
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```
还可以使用另外一种方法来解决这个问题
``` ts
function getCacheData<T>(key: string): T {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData<Cat>('tom');
tom.run();
```
通过给 `getCacheData` 函数添加了一个泛型 `<T>`，我们可以更加规范的实现对 `getCacheData` 返回值的约束，这也同时去除掉了代码中的 `any`，是最优的一个解决方案。

### 使用
``` ts
function identity <T>(value: T) : T {
  return value;
}

console.log(identity<Number>(1)) // 1
```
其中`<T>`就是传递的类型参数，用于特性函数调用的类型，

![](https://user-gold-cdn.xitu.io/2020/6/10/1729b3d9774a21ac?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

类型也可以传递多个,使用`<T, U>`
``` ts
function identity <T, U>(value: T, message: U) : T {
  console.log(message);
  return value;
}
console.log(identity<Number, string>(68, "Semlinker"));
```
![](https://user-gold-cdn.xitu.io/2020/6/10/1729b3dbccc38ea7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

当然，现在的编译器足够聪明，调用的时候可以不传递类型，编译器可以自己识别的

传递类型时，这个类型在函数中使用时的方法/属性，必须是存在的，或者继承自某个接口。

比如不能使用number类型的数据获取length，但是 array 却可以。

### 泛型带来的便利
``` ts
function identity<T>(value: T): T{
  retrun value.toString()
}
cosole.log(identity<number>(42))// 42
cosole.log(identity("Hello！")) // Hello!
cosole.log(identity<number>([1,2,3]))// 1,2,3
```
![](https://user-gold-cdn.xitu.io/2020/6/10/1729b3d9773f34ad?imageslim)


### 泛型接口
可以为泛型提供一个用于约束参数/属性的类型的接口

``` ts

interface Identities<V, M> {
  value: V,
  message: M
}

function identity<T, U> (value:T,message: U): Identities<T, U>{
  console.log(value + ": " + typeof (value));
  console.log(message + ": " + typeof (message));
  let identities: Identities<T, U> = {
    value,
    message
  };
  return identities;
}
console.log(identity(68, 'Semlinker'))

/*
* output
* 68: number
* Semlinker: string
* {value: 68, message: "Semlinker"}
*/

```

### 泛型类
在类里使用泛型，只需要在类的后面，使用`<T, ...>`的语法定义任意多个类型变量，具体如下。
``` ts
interface GenericInterface<U> {
  value: U
  getIdentity: () => U
}

class IdentityClass<T> implements GenericInterface<T> {
  value: T
  constructor(value: T) {
    this.value = value
  }
  getIdentity(): T {
    return this.value
  }

}

const myNumberClass = new IdentityClass<Number>(68);
console.log(myNumberClass.getIdentity()); // 68

const myStringClass = new IdentityClass<string>("Semlinker!");
console.log(myStringClass.getIdentity()); // Semlinker!

```
接下来我们以实例化 myNumberClass 为例，来分析一下其调用过程：

- 在实例化 `IdentityClass` 对象时，我们传入 Number 类型和构造函数参数值 68；
- 之后在 `IdentityClass` 类中，类型变量 T 的值变成 Number 类型；
- `IdentityClass` 类实现了 `GenericInterface<T>`，而此时 T 表示 `Number` 类型，因此等价于该类实现了 `GenericInterface<Number>` 接口；
- 而对于 `GenericInterface <U>` 接口来说，类型变量 U 也变成了 `Number`。这里我有意使用不同的变量名，以表明类型值沿链向上传播，且与变量名无关。



### 泛型约束
**确保属性存在**

当我们在函数中获取length属性，在类型为number时，是没有length的，所以会报错。
``` ts
function identity<T>(arg: T): T {
  console.log(arg.length);
  return arg;
}
identity<number>(1); //error
identity<number>([1,2,3]); //success

```

解决：使用接口约束属性

``` ts
interface Length {
  length: number;
}

function identity<T extends Length>(arg: T): T {
  console.log(arg.length); // 可以获取length属性
  return arg;
}

```

**检查对象上的键是否存在**
先认识 keyof 操作符

### 泛型参考文章
- [掘金-一文读懂 TypeScript 泛型及应用（ 7.8K字）](https://juejin.im/post/5ee00fca51882536846781ee)

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

