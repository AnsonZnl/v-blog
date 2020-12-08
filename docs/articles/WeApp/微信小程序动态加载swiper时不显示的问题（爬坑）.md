# 微信小程序 动态加载swiper时不显示的问题（爬坑）

## 问题一
报错信息
```
TypeError: Cannot read property '$$' of undefined
    at HTMLElement._attached.wx.getPlatform._touchstartHandlerForDevtools
```
解决方法：因为小程序会保留上一次滑动swiper时候的current，所以会出现上次滑动到的current在这次的数据中不存在问题，所以，每次动态加载swiper-item前，需要设置swiper的current属性为0
## 问题二
swiper 的current每次设置了0，但是还是不显示 swiper，检查元素是存在的，并且current = -1
```html
<swiper current='-1'><swiper>
```
解决方法，动态设置swiper-item的数据时，还需设置current = 0，
并且current和swiperList不能在一个this.setData中设置，
要先setData swiperList 然后在setData current 
我是这样写的：
```js
this.setData({
  swiperItem: list
},()=>{
  this.setData({
    current: 0
  })
})
//在每次给swiper赋值之后在它的回调中在赋值current
```
之后没有问题成功解决，希望对你有所帮助。

## 参考：
1. [https://blog.csdn.net/m0_37270964/article/details/103719778](https://blog.csdn.net/m0_37270964/article/details/103719778)

2. [https://www.aiyingli.com/50779.html](https://www.aiyingli.com/50779.html)

3. [https://developers.weixin.qq.com/community/develop/doc/000cae89c0cc485873a77891056400](https://developers.weixin.qq.com/community/develop/doc/000cae89c0cc485873a77891056400)

4. [http://html52.com/archives/11174.html](http://html52.com/archives/11174.html)
