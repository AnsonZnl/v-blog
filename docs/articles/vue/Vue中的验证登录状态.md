---
title: Vue中的验证登录状态
date: 2019-3-9 22:21:55
tags: ["Vue.js"]
---

## Vue项目中实现用户登录及token验证
先说一下我的实现步骤： 
1. 使用`easy-mock`新建登录接口，模拟用户数据
2. 使用`axios`请求登录接口，匹配账号和密码
3. 账号密码验证后， 拿到`token`，将token存储到`sessionStorage`中，并跳转到首页
4. 前端每次跳转时，就使用导航守卫(vue-router.beforeEach)判断 `sessionStorage` 中有无 `token `，没有就跳转到登录页面，有则跳转到对应路由页面。
5.  注销后，就清除`sessionStorage`里的`token`信息并跳转到登录页面

## 使用easy-mock模拟用户数据
我用的是[easy-mock](https://easy-mock.com/),新建了一个接口，用于模拟用户数据:
```javascript
{
  "error_code": 0,
  "data": [{
      "id": '1',
      "usertitle": "管理员",
      "username": "admin",
      "password": "123456",
      "token": "@date(T)",
    },
    {
      "id": '2',
      "usertitle": "超级管理员",
      "username": "root",
      "password": "root",
      "token": "@date(T)",
    }
  ]
}
```
login.vue中写好登陆框：
```
<template>
<div>
    <p>用户名：<input type='text' v-model="userName"></p>
    <p>密码：<input type='text' v-model="passWord"></p>
    <button @click="login()">登录</button>
</div>
</template>
<script>
 export default {
    data() {
        return {
          userName:'root',
          passWord:'root'
        }
    }
}
</script>
```
然后下载axios：`npm install axios --save`,用来请求刚刚定义好的easy-mock接口：
```javascript
 login(){
        const self = this;
        axios.get('https://easy-mock.com/mock/5c7cd0f89d0184e94358d/museum/login').then(response=>{
          var res =response.data.data,
              len = res.length,
              userNameArr= [],
              passWordArr= [],
              ses= window.sessionStorage; 
          // 拿到所有的username
          for(var i=0; i<len; i++){
            userNameArr.push(res[i].username);
            passWordArr.push(res[i].password);
          }
          console.log(userNameArr, passWordArr);
          if(userNameArr.indexOf(this.userName) === -1){
              alert('账号不存在！');
          }else{
            var index = userNameArr.indexOf(this.userName);
            if(passWordArr[index] === this.passWord){
              // 把token放在sessionStorage中
              ses.setItem('data', res[index].token);
              this.$parent.$data.userTitle = res[index].usertitle;
              //验证成功进入首页
              this.startHacking ('登录成功！');
              //跳转到首页
              this.$router.push('/index');
              // console.log(this.$router);
            }else{
              alert('密码错误！')
            }
          }
        }).catch(err=>{
          console.log('连接数据库失败！')
        })
      }
```
这一步最重要的是当账号密码正确时，把请求回来的`token`放在`sessionStorage`中，
## 配置路由
然后配置路由新加一个meta属性：
```javascript
    {
      path: '/',
      name: 'login',
      component: login,
      meta:{
        needLogin: false
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta:{
        needLogin: true
      }
    }
```

判断每次路由跳转的链接是否需要登录，

## 导航卫士
在`main.js`中配置一个全局前置钩子函数：`router.beforeEach（）`，他的作用就是在每次路由切换的时候调用
这个钩子方法会接收三个参数：to、from、next。
`to`：Route：即将要进入的目标的路由对象，
`from`：Route：当前导航正要离开的路由，
`next`：Function：个人理解这个方法就是函数结束后执行什么，先看官方解释
1.`next()`：进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是confirmed（确认的），
2.`next(false)`：中断当前的导航。如果浏览器的url改变了（可能是用户手动或浏览器后退按钮），那么url地址会重置到from路由对应的地址。
3.`next('/')`或`next({path:'/'})`：跳转到一个不同的地址。当前导航被中断，进入一个新的导航。

## 用sessionStorage存储用户token
``` JavaScript
//路由守卫
router.beforeEach((to, from, next)=>{
    //路由中设置的needLogin字段就在to当中 
    if(window.sessionStorage.data){
      console.log(window.sessionStorage);
      // console.log(to.path) //每次跳转的路径
      if(to.path === '/'){
        //登录状态下 访问login.vue页面 会跳到index.vue
        next({path: '/index'});
      }else{
        next();
      }
    }else{
      // 如果没有session ,访问任何页面。都会进入到 登录页
      if (to.path === '/') { // 如果是登录页面的话，直接next() -->解决注销后的循环执行bug
        next();
      } else { // 否则 跳转到登录页面
        next({ path: '/' });
      }
    }
})
```
这里用了`router.beforeEach` [vue-router导航守卫](https://router.vuejs.org/zh/guide/advanced/)
每次跳转时都会判断`sessionStorage`中是否有`token`值，如果有则能正常跳转，如果没有那么就返回登录页面。

## 注销

至此就完成了一个简单的登录状态了，浏览器关闭后`sessionStorage`会清空的，所以当用户关闭浏览器再打开是需要重新登录的

当然也可以手动清除`sessionStorage`，清除动作可以做成注销登录，这个就简单了。
```javascript
    loginOut(){
    // 注销后 清除session信息 ，并返回登录页
    window.sessionStorage.removeItem('data');
    this.common.startHacking(this, 'success', '注销成功！');
    this.$router.push('/index'); 
    }
```
写一个清除`sessionStorag`的方法。
一个简单的保存登录状态的小Demo。




----- 
参考：
[腾讯云社区-Vue+SessionStorage实现简单的登录](https://cloud.tencent.com/developer/article/1199255)
 [SF-从前后端分别学习——注册/登录流程2](https://segmentfault.com/a/1190000016084468)
[Vue-router实现单页面应用在没有登录情况下，自动跳转到登录页面](https://segmentfault.com/a/1190000009086403)
[vue+axios新手实践实现登陆](https://segmentfault.com/a/1190000015201803)
[Vue实战(四)登录/注册页的实现](https://segmentfault.com/a/1190000015637039)
[vue页面控制权限,vuex刷新保存状态、登录状态保存](https://segmentfault.com/a/1190000016047911)
[vue页面控制权限,vuex刷新保存状态、登录状态保存](https://segmentfault.com/a/1190000016047911)
[(vue.js)前后端分离的单页应用如何来判断当前用户的登录状态？](http://www.codes51.com/itwd/4114969.html)
[Vue登录注册，并保持登录状态](https://segmentfault.com/a/1190000016040068)
[vue登录注册及token验证](https://www.cnblogs.com/hcxy/p/7993724.html)
[Vue项目中实现用户登录及token验证](https://www.cnblogs.com/web-record/p/9876916.html)


vue-router守卫导航官方文档：[vue-router导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)
