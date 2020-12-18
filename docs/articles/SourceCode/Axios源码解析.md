## 使用方法

axios 中文文档：http://www.axios-js.com/zh-cn/docs/index.html#axios-config

使用方法一：

```js
// 为给定 ID 的 user 创建请求
axios
  .get("/user?ID=12345")
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
```

使用方法二：

```js
// 发送 POST 请求
axios({
  method: "post",
  url: "/user/12345",
  data: {
    firstName: "Fred",
    lastName: "Flintstone",
  },
});
```

可以新建实例，实例还可以使用 axios.get()等方法

也就是说 Axios 函数，同时支持：

1. 直接调用`Axios({url:'xxx',method: 'get'})` or `Axios('/user/123')`
2. 使用方法`Axios.get('/user?id=123')`
3. 可以使用 `create` 创建，实例方法，然后实例`axios.get('/user/123')`
