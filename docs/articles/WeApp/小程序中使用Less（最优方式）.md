写惯了 `less/sass`，但是现在开发小程序缺还是 `css`，很不习惯。
在网上搜的教程，要么是 gulp，要么就是 vscode 的 `Easy-less` 的插件。

## 传统方式
我们来对比，这两种方式的优劣。

**Gulp**    
前者要对于 `gulp` 有简单的了解，但是现在大道其行的 `webpack` 来说，`gulp` 用的人也越来越少，而且具有一定的学习成本，但好在自定义程度较高，自己可以随便添加take。

**VScodd的Esay-less插件**    
啥都不说，挺香的，直接在 `vscode` 安装 `easy-less` 插件，然后 `seting.json`，就可以愉快的使用`less`了    

保存一下就可以在同目录生成 `.wxss` 文件，缺点是必须在vscode中使用，也就是说你在开发中要打开俩个编辑器，一遍使用`vscode`写`less`，一边使用微信开发者工具看预览.....emmmmm，画面太美不敢想象

## 新的方式
偶然，在网上看到 [你想在小程序里使用less嘛? （VScode版）](https://developers.weixin.qq.com/community/develop/article/doc/000e427c49c218e6b9781bfdf5b013) 里有人放出一张截图
![](/img/articles/xcx-weixinjeitu.png)

直接在微信开发者工具里使用的 `Easy-less` ，功能和在`vscode`里使用的一样，

惊为天人的我感觉跑去官方文档去看，原来微信开发者工具早在 1.03.2004271 版本之后就开始支持扩展工具了。

并且直接使用 `vscode` 的扩展就可以，很方便
![image.png](/img/articles/xcx-weixinjeitu2.png)

经过自己一连串的操作，证明是可以的。

## 步骤

1. Vscode 安装 Easy-less
![image.png](img/articles/xcx-weixinjeitu3.png)

2. 扩展文件夹
其解包后的文件夹可以在 ~/.vscode/extensions (macOS 系统) 或 C:\Users\用户名\.vscode\extensions (Microsoft Windows 系统) 下找到
![image.png](img/articles/xcx-weixinjeitu4.png)
复制`mrcrowl.easy-less-1.6.3`文件到微信开发者工具当中

3. 粘贴扩展文件夹
打开微信开发者工具，top 栏，设置>扩展设置>扩展>自定义扩展
点击，“打开扩展文件夹”，然后会打开一个文件夹，粘贴到这里就行了。

![](img/articles/xcx-weixinjeitu8.png)


4. 设置输出.wxss
到这里还差最后一步，因为Easy-less，默认输出的css，但是小程序中要使用.wxss的文件，所以设置一下输出的文件后缀即可。

![](img/articles/xcx-weixinjeitu5.png)

![](img/articles/xcx-weixinjeitu6.png)    
<br>
5. 重启微信开发者工具
设置成功后，关闭小程序在打开，然后在pages下随便找个页面新建一个，`index.less`，写一点保存看看index.wxss，有没有发生变化
 ## 最终效果
![image.png](img/articles/xcx-weixinjeitu7.png)


## 参考：
- [官方文档-编辑器扩展](https://developers.weixin.qq.com/miniprogram/dev/devtools/editorextensions.html)
- [vscode-easy-less](https://github.com/mrcrowl/vscode-easy-less)
- [你想在小程序里使用less嘛? （VScode版）](https://developers.weixin.qq.com/community/develop/article/doc/000e427c49c218e6b9781bfdf5b013)
- [Less 中文网](http://lesscss.cn/)