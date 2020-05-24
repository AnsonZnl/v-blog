---
title: flex布局 平均分布，最后一行左对其
date: 2020-01-11 11:09:03
tags: ["布局"]
---
html
```
<view class="box container">
  <view class="user-item" wx:for="{{userList}}" wx:key="index">
    <image class="user-avatar" src="{{item.avatarUrl}}"></image>
    <view class="user-name">{{item.nickName}}</view>
  </view>
</view>
```
css
```
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.box:after {
    content: "";
    flex: auto;
 }

.user-item {
  display: inline-block;
  margin: 10rpx;
}

.user-item .user-avatar {
  width: 74rpx;
  height: 74rpx;
  border-radius: 50%;
}

.user-item .user-name {
  color: #333;
  font-size: 24rpx;
  text-align: center;
  width: 74rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

```
js
```
 userList: [{
        avatarUrl: 'https://images.unsplash.com/photo-1578513492798-0f8a1ac3e1f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        nickName: '二狗'
      }]
```
参考：
- [flex 最后一行左对齐](https://blog.csdn.net/erciyuan_nuonuo/article/details/71773557)
- [flex 语法教程]([https://www.runoob.com/w3cnote/flex-grammar.html](https://www.runoob.com/w3cnote/flex-grammar.html)
)

