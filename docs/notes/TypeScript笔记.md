[toc]

# TypeScript

## 基础类型

- any
- number
- boolean
- string
- array
- enum
- tuple
- void
- null
- undefined
- never
- object

### 变量声明

```typescript
let isDone: boolean = false;
```

### 函数声明

```typescript
function add(x: number, y: number): number {
    return x + y;
}
```

上面函数接受x、y，返回一个number类型的值。

- 可选参数加 `?` 号

  ```typescript
  function add(x?: number, y: number): number {
      return x + y;
  }
  ```

## 接口

> 接口是对值的类型做检查

### 定义

```typescript
interface LabelValue {
  label: string
}
```

### 使用

```typescript
function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

函数接受的参数必须满足接口类型的要求。

- 可选属性加`?`
- 只读属性加`onlyread`

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

- public：默认的都是public
- private： 不能在声明它的类的外部访问 (不可以继承)
- protected：受保护的(可以继承)
- readonly： 只读属性必须在声明时或构造函数里被初始化。 
- static：静态属性，只能类调用的属性

## 参考文档

- [TypeScript Handbook（中文版）]( https://zhongsp.gitbooks.io/typescript-handbook/ )