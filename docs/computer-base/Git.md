# Git

关于 Git 学习的书籍[Git Pro](https://www.progit.cn/)

![Git 常用命令](/img/computer-base/git命令速查.png)

## Git 常用命令

-   `git status` 查看状态
-   `git add` 添加变动至暂存区
-   `git commit -m 'xxx'` 提交暂存区至工作区
-   `git push` 拉取代码
-   `cat xx.js` 查看文件
-   `git log` 打印 git 日志
-   `git reset` 回退版本
-   `git checkout -- xx.js` 把工作区的修改全部撤回
-   `git diff HEAD -- xx.js` 查看当前的变动
-   `git pull` 推送代码
-   `git commit -n -m 'xxx'` 忽略 husky 检测

## 分支

-   查看分支 `git branch`
-   创建分支 `git branch xx`(分支名称)
-   切换分支 `git checkout xx`(分支名称)
-   创建并切换分支`git checkout -b xx`(分支名称)
-   合并分支 `git merge dev`(分支名称) 把当前分支合并到主分支
-   删除分支 `git branch -d dev`(分支名称)
-   查看远程分支详情 `git remote -v`
-   推送指定分支 `git push origin dev`(分支名称)
-   切换分支：`git checkout <name>`或者`git switch <name>`
-   创建+切换分支：`git checkout -b <name>`或者`git switch -c <name>`
-   合并某分支到当前分支：`git merge <name>`
-   删除分支：`git branch -d <name>`
-   下载指定分支
    -   `git clone -b dev2 http://git-test.etledu.com/ETLBOAO/BIM1xTrain.git`
    -   `git clone -b` 指定从分支下载 dev2 指定从哪个分支下载 http git 链接

## 合并分支

比如将 dev 合并到 master 分支

-   先在 dev 分支上拉取 master 分支，保证是最新的代码(`git pull origin master`)
-   然后切换到 master 分支(`git checkout master`)
-   然后合并（`git merge dev`）

参考：[分支合并，一看就懂](https://www.jianshu.com/p/26d050497abb)

## 代码储存

-   `git stash` 将代码存储在储存区

参考：[Git Stash 使用方法](https://www.cnblogs.com/zndxall/archive/2018/09/04/9586088.html)

## 标签

-   命令`git tag <tagname>`用于新建一个标签，默认为 HEAD，也可以指定一个 commit id；
-   命令`git tag -a <tagname> -m "blablabla..."`可以指定标签信息；
-   命令`git tag`可以查看所有标签。
-   命令`git push origin <tagname>`可以推送一个本地标签；
-   命令`git push origin --tags`可以推送全部未推送过的本地标签；
-   命令`git tag -d <tagname>`可以删除一个本地标签；
-   命令`git push origin :refs/tags/<tagname>`可以删除一个远程标签。

## SSH

最近的 http 链接总是出问题，还是 ssh 比较稳。

-   [Github 生成 SSH 秘钥（详细教程）](https://blog.csdn.net/qq_35495339/article/details/92847819)

## user

切换帐号其实很简单，
如果你不知道现在本地 Git 用的帐号是什么，你可以输入

-   `git config user.name`查看用户名
-   `git config user.email`查看用户邮箱

修改用户名和邮箱的命令

-   `git config --global user.name "Your_username"`
-   `git config --global user.email "Your_email"`

查看是否配置成功

-   `git config --list`

## 问题场景

-   技术主管让你去再某个 git 分支上新建一个分支去做你的项目，那么如何在原远程分支的基础上新建自己的分支呢？
    解决方法
-   按照以下命令敲即可
-   `git branch newBranch` -- 新建本地分支
-   `git checkout newBranch` -- 本地切换到自己的分支
-   `git pull origin xxxxBranch` -- 从远程目标分支 copy 代码
-   `git push origin newBranch` -- 将本地新建的分支同步到服务器
-   `git branch --set-upstream-to=origin/newbranch newbranch` -- 本地分支和远程分支建立追踪
    到此为止，就完成了需求

## 只记得用户名和密码的情况下使用

![git-without.png](https://s2.loli.net/2022/06/22/CBgZWP5nLXGAaMH.png)

## 注意

-   `push` 之前先 `pull` 代码

## 问题

### git config proxy

前一段时间因为墙很厚，github 的代码老是拉取失败，后来就设置了下代理，然后这两天在使用的时候就老报错。

```报错提示
1. fatal: unable to access 'http://xxx': OpenSSL SSL_read: Connection was reset, errno 10054
2. fatal: unable to access 'http://xxx': Received HTTP code 400 from proxy after CONNECT
3. fatal: unable to access 'http://xxx': Failed to connect to github.com port 443: Timed out
4. fatal: unable to access 'http://xxx': Received HTTP code 400 from proxy after CONNECT
```

## commit message 规范

提交格式：

```
<type>(<scope>): <subject>
```

-   type（必须）：用于说明 commit 的类别，可以使用以下标示
    -   feat：新功能（feature）
    -   fix：修复 bug
    -   docs：文档（documentation）
    -   style： 格式（不影响代码运行的变动）
    -   refactor：重构（即不是新增功能，也不是修改 bug 的代码变动）
    -   test：增加测试
    -   chore：构建过程或辅助工具的变动
-   scope（选填）：描述影响范围
    -   数据层
    -   控制层
    -   视图层
-   subject（必填）：本次变动的简短描述
    -   五十字以内
    -   使用第一人称
    -   以动词开头

参考：[58-知识分享社区](https://ishare.58corp.com/articleDetail?id=37307)

**Commit example**

-   feat：新增功能
-   fix：bug 修复
-   docs：文档更新
-   style：不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)
-   refactor：重构代码(既没有新增功能，也没有修复 bug)
-   perf：性能, 体验优化
-   test：新增测试用例或是更新现有测试
-   build：主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
-   ci：主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle 等)的提交
-   chore：不属于以上类型的其他类型，比如构建流程, 依赖管理
-   revert：回滚某个更早之前的提交

## Git 将 master 最新代码拉取到当前开发分支

> 假设你正在开发一个新功能，还没开发完成。但是团队成员 A 最近开发了 B 功能，这个功能最近上线后合并到 master 了，此时你要拉取 master 最新代码到你的分支中。

1. 切换到 master 主分支上
   `git checkout master`

2. 将 master 更新的代码拉取到本地
   `git pull`

3. 再切换到自己的分支假设为： add_order 上
   `git checkout add_order`

4. 合并 master 到自己的分支 add_order 上
   `git merge master`

5、提交合并后的代码
`git add .`
`git commit -m "merge master"`

6、提交到远程仓库
`git push origin add_order`

## GitHub

-   [github 上 fork 原项目，如何将本地仓库代码更新到最新版本？](https://blog.csdn.net/u014028063/article/details/81559573)

如出现 Please enter a commit message to explain why this merge is necessary.（请输入提交消息来解释为什么这种合并是必要的）

git 在 pull 或者合并分支的时候有时会遇到这个界面。可以不管(直接下面 3,4 步)，如果要输入解释的话就需要:

1.按键盘字母 i 进入 insert 模式

2.修改最上面那行黄色合并信息,可以不修改

3.按键盘左上角"Esc"

4.输入":wq",注意是冒号+wq,按回车键即可

## git 提示错误 fatal: refusing to merge unrelated histories

新建了一个仓库之后，把本地仓库进行关联提交、拉取的时候，出现了如下错误`fatal: refusing to merge unrelated histories`

造成 fatal: refusing to merge unrelated histories 错误的原因有以下几点：

1. 有一个包含一些提交的新 Git 存储库。然后，您尝试从现有的远程仓库中提取。合并变得不兼容，因为分支和远程拉取的历史不同。当你试图合并两个完全不相关的分支时，Git 看到了这种情况，它不知道该怎么做。
2. 目录有问题.git。它可能在某些时候被意外删除或损坏。如果您克隆或清理了项目，则可能会发生这种情况。此处发生错误是因为 Git 没有有关本地项目历史的必要信息。
3. 当您尝试从远程仓库推送或拉取数据时，分支位于不同的 HEAD 位置，并且由于缺乏共性而无法匹配。

解决办法是：  
在 git pull 和 git push 命令中添加`–allow-unrelated-histories`
让 git 允许提交不关联的历史代码。

```
git merge master --allow-unrelated-histories
```

参考： https://blog.csdn.net/ZCaesarK/article/details/125316158

## git 如何关闭 commit 时的语法检测 —husky

1. 报错提示:

    ```
    git commit 提交时报错如下: `husky+>+pre-commit+(node+v14.18.2)`
    ```

2. 解决方案:
    1. 卸载 husky。只要把项目的`package.json`文件中`devDependencies`节点下的`husky`库删掉，然后重新`npm i`一次即可。或者直接在项目根目录下执行`npm uninstall husky --save`也可以，再次提交，自动化测试功能就屏蔽掉
    2. 进入项目的.git 文件夹(文件夹默认隐藏,可先设置显示或者命令 ls 查找),再进入 hooks 文件夹,删除 pre-commit 文件,重新`git commit -m 'xxx'` git push 即可
    3. 将 `git commit -m "XXX"` 改为 `git commit --no-verify -m "xxx"`

## 参考

-   [廖雪峰 Git 教程](https://www.liaoxuefeng.com/wiki/896043488029600/897889638509536)
-   [Pro Git 中文版阅读（第二版）](https://www.progit.cn/)

```

```
