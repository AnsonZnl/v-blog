# React中实现简单的Toast组件

实现：（这里使用的是tsx，如果是jsx，需要把类型删除）

1. 生成一个新的div，添加（append）到document下，然后使用ReactDOM渲染该元素
2. 创建一个Toast的类，因为需要类直接使用方法，所以创建相应的静态方法，直接调用
3. 在方法调用前，清除定时器（如同节流），防止前面的定时器影响到后面弹出的toast的持续时间

## 使用:
``` ts
function handleClick1() {
    Toast.success("发送成功")
}
function handleClick2() {
    Toast.success("请求成功")
}
function handleClick3() {
    Toast.info("登录成功")
}
function handleClick4() {
    Toast.fail("请求失败")
}
function handleClick5() {
    Toast.warning("请求失败")
}
function handleClick6() {
    Toast.loading("加载中", true)
    setTimeout(() => {
        Toast.loading("加载中", false)
    }, 3000)
}

```

Toast组件 :success,info,fail,warning几种形式，可以自定义

``` ts

import * as React from 'react'
import './index.scss'
import './iconfont.less'
import * as ReactDOM from 'react-dom'
import {Fragment} from "react"
let timer: any = null
class Toast extends React.Component {
    static info(msg:string | "info", timeout: number = 2000) {
        init()
        setTime(timeout)
        ReactDOM.render(<Fragment>
            <span>{msg}</span>
        </Fragment>, document.getElementById('dark-toast'));
    }
    static success(msg:string | "success", timeout: number = 2000) {
        init()
        setTime(timeout)
        ReactDOM.render(<Fragment>
            <i className="iconfont icon-check-circle-fill"></i>
            <span>{msg}</span>
        </Fragment>, document.getElementById('dark-toast'));
    }
    static fail(msg:string | "fail", timeout: number = 2000) {
        init()
        setTime(timeout)
        ReactDOM.render(<Fragment>
            <i className="iconfont icon-close-circle-fill"></i>
            <span>{msg}</span>
        </Fragment>, document.getElementById('dark-toast'));
    }
    static warning(msg:string | "warning", timeout: number = 2000) {
        init()
        setTime(timeout)
        ReactDOM.render(<Fragment>
            <i className="iconfont icon-warning-circle-fill"></i>
            <span>{msg}</span>
        </Fragment>, document.getElementById('dark-toast'));
    }
    static loading(msg:string | "loading", status: boolean) {
        init()
        setLoading(status)
        ReactDOM.render(<Fragment>
            <i className="iconfont icon-reload rotate-loop"></i>
            <span>{msg}</span>
        </Fragment>, document.getElementById('dark-toast'));
    }
}
function setLoading(status: boolean) {
    let dark_toast:any = document.getElementById('dark-toast')
    if (status)
        dark_toast.style.display = "block"
    else
        dark_toast.style.display = "none"
}
function init () {
    clearTimeout(timer)
    let dark_toast = document.getElementById('dark-toast')
    if (dark_toast) {
        dark_toast.style.display = "block"
    } else {
        let div = document.createElement("div")
        div.setAttribute("id", "dark-toast")
        document.body.appendChild(div);
    }
}
function setTime (timeout:number) {
    timer = setTimeout (() => {
        let dark_toast = document.getElementById('dark-toast')
        if (dark_toast) {
            dark_toast.style.display = "none"
        }
    }, timeout)
}
export default Toast

```

pointer-events: none;  使该元素能够点击穿透，不挡住下面的元素 

``` less
#dark-toast {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  max-width: 40%;
  background: #333;
  z-index: 1000;
  padding: 5px 10px;
  background: rgba(29, 29, 29, 0.73);
  border-radius: 5px;
  color: #fff;
  text-align: center;
  min-width: 100px;
  pointer-events: none; // 点击穿透
  i {
    font-size: 40px;
    display: block;
    &.rotate-loop {
      animation: rotate-loop 1s infinite;
    }
  }
}
@keyframes rotate-loop {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}
```

iconfont.less 的 iconfont引入
``` less
@font-face {
  font-family: "iconfont"; /* Project id  */
  src: url('./iconfont.ttf?t=1671589144239') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 26px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-reload:before {
  content: "\e895";
}

.icon-close-circle-fill:before {
  content: "\e6d4";
}

.icon-check-circle-fill:before {
  content: "\e6d5";
}

.icon-warning-circle-fill:before {
  content: "\e6d7";
}

```