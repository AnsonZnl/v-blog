# React基础知识

## 官方教程
- [React-官方教程](https://zh-hans.reactjs.org/)


## React API

### React.Component
定义组件的Class基类，返回一个render()，其中是JSX描述的DOM结构，会通过React.CreateElement()创建为真是的DOM

### React.mome
通过对比上一次和下一次的props，提示渲染组件组件的性能，接受第二个参数为函数，可以控制对比过程

### React.Fragment
可以使得组件在不创建额外DOM元素的情况下，让 `render()` 方法中返回多个元素，可以使用`<>..</>`代替。

### React.forwardRef
React.forwardRed 会创建一个React组件，这个组件可以接受 ref 属性转发到其组件树下的另一个组件中，在以下两个场景时比较有用
- 转发 refs 到 DOM 组件中
- 在高阶组件中转发 refs

### React.Refs

可以使用这个API访问DOM节点或者在render方法中创建React元素

在不同的组件中使用不同的Ref方法

- 在Class组件中使用React.createRef
- 在函数组件中使用React.forwardRef（或则useRef）
- 

编写一个自动聚焦的输入框

- Class Component

``` js

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.inpRef = React.createRef()
    }
    componentDidMount() {
        this.inpRef.current.focus();
    }
    render() {
        return (
            <div>
                <input ref={this.inpRef}></input>
            </div>
        )
    }
}
ReactDOM.render(
    <NameForm />,
    document.getElementById('app')
);
```

- Function Component（Hook）

``` js

function NameForm() {
    const inpRef = React.useRef(null)
    React.useEffect(()=>{
        inpRef.current.focus()
    },[])
    return <input ref={inpRef}></input>
}

ReactDOM.render(
    <NameForm />,
    document.getElementById('app')
);
```






## JSX
JSX是通过JS编写HTML结构的语法。

```js
function App() {
  return (
      <p className="title">hello world</p>
  );
}

ReactDOM.render(<APP />, document.getElementById("root"));
```

通过React.render(`<App/>`, root) 将虚拟DOM转化为真实的DOM节点，并挂载到指定的节点上

而第一个参数必须有一个子节点，如果不提供可以使用React.Fragments或者`<>...</>`替代。

而在这一步中，经过Babel转换后的代码如下：
``` js
function App() {
  return React.createElement(
    "p",
    { className: "title" },
    "hello world"
  );
}

ReactDOM.render(React.createElement(APP, null), document.getElementById("root"));
```

 - React.createElement是JSX的语法糖，会把JSX语法转换为虚拟DOM
 - React.render会将虚拟DOM转化为真实的DOM，并挂在指定的元素上


## 事件处理

- 事件命名采用小驼峰式（onClick）
- 使用JSX语法时应该传入一个函数（箭头函数，确保this正确），而不是一个字符串
  
```js
// 创建是秃头
class MessageBox extends React.Component {
    alertMe() {
        alert('你刚才点了我一下。。。。');
    }

    render() {
        return (
            <div>
                <h2 onClick={this.alertMe}>我会弹窗</h2>
                <h2 onClick={(e) => { e.preventDefault() }}>禁止弹窗</h2>
            </div>
        )
    }
}
// 渲染
ReactDOM.render(<MessageBox />, document.getElementById('app'), function () {
    console.log('渲染完成啦！！');
});

```


## 条件处理

- 通过if-else去判断

``` js
function Demo(props)  {
    let dom;
    if(props.isShow){
        return <h1>Message!</h1>
    }else{
        return <h1></h1>
    }
    
}

ReactDOM.render(<Demo isShow={true}/>, document.getElementById('app'));
```

- 元素变量

``` js
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isShow: true };
    }

    render() {
        let isShow = this.state.isShow;
        let button;
        if (isShow) {
            button = <div>你好</div>
        } else {
            button = <div>世界</div>
        }

        return (
            <div>
                {button}
                <button onClick={() => this.setState({ isShow: !this.state.isShow })}  >Change</button>
            </div>
        );
    }
}

ReactDOM.render(
    <Demo />,
    document.getElementById('app')
);
```

- 与运算符 && 

**条件一 && 条件二：条件一为真就展示条件二，条件一位假，就不展示。**

编写一个展示水果数据，没有的时候就不显示。

``` js
function List(props){
    let {list} = props
    return (
        <div>
        {list.length !== 0 && <p>{list.toString()}</p>}
        </div>
    )
}

function Demo(props){
    return (
        <div>
          <List list={['苹果','香蕉']}/>
          <List list={[]}/>
          <List list={['橘子','凤梨']}/>
        </div>
    )
}

ReactDOM.render(
    <Demo/>,
    document.getElementById('app')
);
```

- 三目运算符

还用水果列表

``` js
function List(props){
    let {list} = props
    return (
        <div>
        {list.length === 0 ? <p>--无数据--</p> : <p>{list.toString()}</p>}
        </div>
    )
}

function Demo(props){
    return (
        <div>
          <List list={['苹果','香蕉']}/>
          <List list={[]}/>
          <List list={['橘子','凤梨']}/>
        </div>
    )
}

ReactDOM.render(
    <Demo/>,
    document.getElementById('app')
);
```

- 阻止组件渲染
  

判断条件，适当的返回null即可
``` js
function List(props){
    let {list} = props
    if(list.length === 0){
        return null
    }
    return (
        <div>
           <p>{list.toString()}</p>
        </div>
    )
}

function Demo(props){
    return (
        <div>
          <List list={['苹果','香蕉']}/>
          <List list={[]}/>
          <List list={['橘子','凤梨']}/>
        </div>
    )
}

ReactDOM.render(
    <Demo/>,
    document.getElementById('app')
);
```

## 列表 && Key

可以使用 map 渲染多个列表

key可以帮助React识别哪些元素改变了，比如删除或者添加，给每个元素唯一的标示，一般使用id或者index。

``` js
function List(props){
    let {list} = props;
    return (
        <div>
           <h3>水果列表</h3>
           <ul>{list.map((e,i)=><li key={i}>{e}</li>)}</ul>
        </div>
    )
}

function Demo(props){
    return (
        <div>
          <List list={['苹果','香蕉']}/>
          <List list={['橘子','凤梨']}/>
        </div>
    )
}

ReactDOM.render(
    <Demo/>,
    document.getElementById('app')
);
```



## 表单

受控组件：如input、textarea、select通常维护自己的state，并且根据用户输入进行更新，通过setState更新。

> 在HTML中，标签`<input>、<textarea>、<select>`的值的改变通常是根据用户输入进行更新。在React中，可变状态通常保存在组件的状态属性中，并且只能使用 setState() 更新，而呈现表单的React组件也控制着在后续用户输入时该表单中发生的情况，以这种由React控制的输入表单元素而改变其值的方式，称为：“受控组件”。    
————————————————    
原文链接：https://blog.csdn.net/qq_41846861/article/details/86598797



使用表单和列表编写一个可以添加的表单列表

``` js
class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: '', list: [1,2] };
    }

    handleChange = (event)=> {
        this.setState({ value: event.target.value });
    }

    handleSubmit = (event) => {
        this.setState({ list: [...this.state.list, this.state.value]})
        console.log(this.state.list,this.state.value)
        event.preventDefault();
    }

    render() {
        let {list} = this.state
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <List list={list} />
            </div>
        )
    }
}

function List(props) {
    let list = props.list;
    // return <p>{list.toString()}</p>
    return <ul>{list.map((e, i) => { return <li key={i}>{e}</li> })}</ul>
}

ReactDOM.render(
    <NameForm />,
    document.getElementById('app')
);
```



## 组件

组件的使用直接嵌入组件即可：
- `props<object>`：组件内接受到的值，可以使用 `componentName.defaultProps = {value: 0}`，设置默认值，需规范props的类型和是否必要时，请使用`prop-type`
- `state<object>`：组件内的状态，可以使用`this.setState({value:0})`,改变（覆盖）state，并更新到DOM

PS：组件的props不可更改！

### class组件
需要从React.Component上继承，有state，和props，有生命周期。

``` js
class List extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
       const {list} = this.props;
        return 
        <div>
            {list.map((item,index)=>{
               return 
               <li key={item.id}>
                  <span>{item.title}</span>
               </li>
             })}
        <div>
    }
}
```

**特点**
- 有组件实例
- 有生命周期
- 有state 和 setState

### 函数组件
直接写一个函数，接收props（相当于函数参数），

``` js

function List(props){
    const list = props;
    reutrn <ul>
           {list.map((item,index)=>{
            return <li key={item.id}>
               {item.title}
            </li>
           })}
     </ul>
}
```

**特点**
- 没有组件实例
- 没有生命周期
- 没有state和setState，只有props

## State和生命周期

### state
类似Vue中的data，数据改变会同步更新到DOM，任何组件的state都是私有的（可以使用props传递），state只存在Class组件中。

更改state时，不可以直接`this.state.value = newValue`，而需要使用`this.setState({value: newValue})`，去替换原值。

异步的state，出于对性能的考虑，React会合并个多this.setState操作一起调用， 

数据向下的，state是局部的私有的，出了拥有并且使用props传递的组件，其他组件都无法访问

``` js
// 创建时钟
class Clock extends React.Component {
    constructor(props) {
        super(props)
        this.state = { date: new Date() }
    }
    // 组件挂载
    componentDidMount() {
        this.timer = setInterval(this.tick.bind(this), 1000)
    }
    // 组件卸载
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    // 时间更新
    tick() {
        this.setState({ date: new Date() })
    }
    render() {
        return (<h2>{`${this.state.date.toLocaleDateString()} ${this.state.date.toLocaleTimeString()}`}</h2>)
    }
}
// 渲染
ReactDOM.render(<Clock />, document.getElementById('app'), function () {
    console.log('渲染完成啦！！');
});
```

### 生命周期
和Vue一样，在不同阶段触发不同的钩子，但是生命周期仅在 Class 组件中存在。

![react-life-cileclr.png](https://i.loli.net/2021/11/06/aP6kgryX5w2c4nM.png)

参考：[React-生命周期](https://www.jianshu.com/p/b331d0e4b398)


## Hook

React V16.8新增的特性。

提供了如何在不使用 Class 组件的情况下使用 state 特性
### useState

替代之前的this.setState，每次都有通过前面的setValue方法去设置值

``` js
function Example(){
    // 声明一个“count”的state变量
    const [count, setCount] = useState(0);// count 的默认值是 0 

    return (
        <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
            Click me
        </button>
        </div>
    )
}
// 每次点击时 count + 1
```


### useEffect

替代之前的生命周期，默认每次在视图更新时执行。

``` js
useEffect(()=>{
    document.title = `You clicked ${count} times`;
})
// 相当于 组件挂载和组件更新(任何组件)时的生命周期都会触发它的更新


useEffect(()=>{
    document.title = `You clicked ${count} times`;
}, [])
// 只会在第一次加载时候触发一次

useEffect(()=>{
    document.title = `You clicked ${count} times`;
}, [count])
// 仅在 count 更新时，触发一次。
```
具体参考：[React函数式组件值之useEffect()](https://www.cnblogs.com/guanghe/p/14178482.html)

### useContext



### useRef


