## Vue2.x

Vue.js 2.x 是采用数据劫持结合发布者-订阅者模式的方式，通过**Object.defineProperty()**方法来劫持各个属性的 setter、getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 Object.defineProperty 都加上 setter 和 getter 。

这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化 compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图 Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是:

1.在自身实例化时往属性订阅器(dep)里面添加自己

2.自身必须有一个 update()方法

3.待属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定的回调，则功成身退。 MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果 著作权归「程序员成长指北-koala」所有。

```html
//vue实现数据双向绑定的原理就是用Object.defineproperty()重新定义（set方法）对象设置属性值和（get方法）获取属性值的操纵来实现的。
//Object.property()方法的解释：Object.property(参数1，参数2，参数3)
返回值为该对象obj
//其中参数1为该对象（obj），参数2为要定义或修改的对象的属性名，参数3为属性描述符，属性描述符是一个对象，主要有两种形式：数据描述符和存取描述符。这两种对象只能选择一种使用，不能混合使用。而get和set属于存取描述符对象的属性。
//这个方法会直接在一个对象上定义一个新属性或者修改对象上的现有属性，并返回该对象。

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <div id="myapp">
      <input v-model="message" /><br />
      <span v-bind="message"></span>
    </div>
    <script type="text/javascript">
      var model = {
        message: "",
      };
      var models = myapp.querySelectorAll("[v-model=message]");
      for (var i = 0; i < models.length; i++) {
        models[i].onkeyup = function() {
          model[this.getAttribute("v-model")] = this.value;
        };
      }
      // 观察者模式 / 钩子函数
      // defineProperty 来定义一个对象的某个属性
      Object.defineProperty(model, "message", {
        set: function(newValue) {
          var binds = myapp.querySelectorAll("[v-bind=message]");
          for (var i = 0; i < binds.length; i++) {
            binds[i].innerHTML = newValue;
          }
          var models = myapp.querySelectorAll("[v-model=message]");
          for (var i = 0; i < models.length; i++) {
            models[i].value = newValue;
          }
          this.value = newValue;
        },
        get: function() {
          return this.value;
        },
      });
    </script>
  </body>
</html>
```

## Vue3

## Proxy 相比于 defineProperty 的优势

Object.defineProperty() 的问题主要有三个：

- 不能监听数组的变化
- 必须遍历对象的每个属性
- 必须深层遍历嵌套的对象

Proxy 在 ES2015 规范中被正式加入，它有以下几个特点：

- 针对对象：针对整个对象，而不是对象的某个属性，所以也就不需要对 keys 进行遍历。这解决了上述 Object.defineProperty() 第二个问题
- 支持数组：Proxy 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了维护成本，而且标准的就是最好的。

除了上述两点之外，Proxy 还拥有以下优势： Proxy 的第二个参数可以有 13 种拦截方法，这比起 Object.defineProperty() 要更加丰富 Proxy 作为新标准受到浏览器厂商的重点关注和性能优化，相比之下 Object.defineProperty() 是一个已有的老方法。 

