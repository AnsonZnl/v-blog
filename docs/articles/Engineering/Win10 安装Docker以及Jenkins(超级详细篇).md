

## 安装Docker
下载地址：https://docs.docker.com/desktop/install/windows-install/ ，
按照它的指引教程，无脑下一步即可。

安装成功后电脑会重启。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab7f79d5412e49238163d5e3b4012338~tplv-k3u1fbpfcp-watermark.image?)

打开docker桌面端，会显示

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fae04b60dc447449813bec8d5741993~tplv-k3u1fbpfcp-watermark.image?)

进入链接，下载WSL 安装包进行无脑安装即可。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10e989bea2aa492e9546298fbc5b55fa~tplv-k3u1fbpfcp-watermark.image?)

安装 Linux 内核更新包 （重启电脑）

重启 Docker Desktop 成功进入


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae3722296dbc4f95b102d84a387bc2f0~tplv-k3u1fbpfcp-watermark.image?)



此时可以打开命令行工具通过**查看版本号**的方式查看docker的相关信息

```
docker -v
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54a20012a4e742e08a4840cdcc99bd27~tplv-k3u1fbpfcp-watermark.image?)

后续就可以在命令行工具中使用docker的命令来操作docker。

## 配置
首先先切换源，

![1678531881427.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0605248cbed4786ba1ae01ea912f654~tplv-k3u1fbpfcp-watermark.image?)

打开docker Desktop 右上角设置=》Docker Engine然后下列源复制进去，注意逗号。
```
"registry-mirrors": [
        "https://docker.mirrors.ustc.edu.cn",
        "https://registry.docker-cn.com",
        "http://hub-mirror.c.163.com",
        "https://mirror.ccs.tencentyun.com"
    ]

```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1df72e3f9ea4f228d1ee0e0b79b4cc1~tplv-k3u1fbpfcp-watermark.image?)

然后重启


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc6d04596f114665a95ac9ce9ab9f13d~tplv-k3u1fbpfcp-watermark.image?)

点击start进入网页: http://localhost/tutorial/

## 安装Jenkins


启动Docker桌面端，拉取Jenkins镜像。
```
# 拉取jenkins镜像（国内源版本） 
docker pull jenkinszh/jenkins-zh
```
或者可以再桌面端搜索下载

![cec03d533f46885b6389c992ea8ba2a.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2defe74eb74e4d3583f42c487eb40854~tplv-k3u1fbpfcp-watermark.image?)

使用文档可以看[Jenkins文档](https://hub.docker.com/r/jenkinszh/jenkins-zh)

下载完成之后进行镜像配置

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6dec920e0a0e441faa55190da3b52bed~tplv-k3u1fbpfcp-watermark.image?)

然后运行好了就可以在本地打开了：http://localhost:8080



然后发现Jenkins一直在启动中没有进入

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9412cd1da6f4008b3b279bda3db30ea~tplv-k3u1fbpfcp-watermark.image?)

原因：jenkins里面文件指向国外的官网，因为防火墙的原因连不上

解决方法：将配置文件里面的url换成国内的即可

```
# 将红线部分修改为下面的url
http://mirror.xmission.com/jenkins/updates/update-center.json
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/855900bd3c4645e58f6d8ff4c5fa5a4a~tplv-k3u1fbpfcp-watermark.image?)
修改完成后保存重启，如果重启依然没用，然后配置文件的url已经改了，两个方法解决一下：

- 清一下浏览器缓存
- 手动访问一下刚刚修改的那个url



正常进入后页面张这个样子

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d0ec273adb0457bb2318f8f9cf2a85a~tplv-k3u1fbpfcp-watermark.image?)

需要输入密码才可正常进入，密码在命令行中可以看到

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dd593b51d3c249a9afd359e6d85942c5~tplv-k3u1fbpfcp-watermark.image?)

又或者可以去：目录`/var/jenkins_home/secrets/initialAdminPassword` 里查看。

然后 看到这页面你就大功告成了，除特殊需求外建议安装推荐的插件即可。
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a584af36dc84334bc286fafa36f9213~tplv-k3u1fbpfcp-watermark.image?)

插件安装失败也不要紧，先点进入系统然后我们在安装。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da212e1620094f8f97c9574edc90dd8a~tplv-k3u1fbpfcp-watermark.image?)


 创建管理员用户，点击完成并保存，然后一路下一步。


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77347c8c97f34e18bb020340cbdc0e27~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84fb8b2cc05e4f34bff47d6b94417fe2~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da2af2a4ee5d4967accd3771f9e07f0a~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c0aea1a5099428abb9cc3bb8358d3a9~tplv-k3u1fbpfcp-watermark.image?)


配置完成后自动进入首页，这时点击 `系统管理` -> `插件管理` -> `高级` 最底下更新源替换为国内链接，此方法无需重启jenkins；

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34583f8bfc0d4a318a7bd0d6c3d522f3~tplv-k3u1fbpfcp-watermark.image?)

把url改成一下几种之一：  
```
https://mirror.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json

https://updates.jenkins-zh.cn/update-center.json
```
然后在更新一下插件即可。

![cf8c6efe654eb31c5b256a0438b2d79.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/771a9368ac304f1f96a76c44071b2378~tplv-k3u1fbpfcp-watermark.image?)

更新完后重启Jenkins即可。


## 参考
- [win10安装docker（适用于windows家庭版）](https://blog.csdn.net/muxiaoshan/article/details/123217699)
- [Docker DeskTop安装Jenkins教程 for Windows](https://blog.csdn.net/qq_41113081/article/details/116055547)
- [Jenkins修改国内源](https://blog.csdn.net/weixin_48319100/article/details/129023582)
- [首次启动Jenkins加载很慢的解决办法](https://www.likecs.com/show-307257842.html)

