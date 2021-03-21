# Git

![Git 常用命令](/img/computer-base/git命令速查.png)

## Git 常用命令

- `git status` 查看状态
- `git add` 添加变动至暂存区
- `git commit -m 'xxx'` 提交暂存区至工作区
- `git push` 拉取代码
- `cat xx.js` 查看文件
- `git log` 打印 git 日志
- `git reset` 回退版本
- `git checkout -- xx.js` 把工作区的修改全部撤回
- `git diff HEAD -- xx.js` 查看当前的变动
- `git pull` 推送代码

## 分支

- 查看分支 `git branch`
- 创建分支 `git branch xx`(分支名称)
- 切换分支 `git checkout xx`(分支名称)
- 创建并切换分支`git checkout -b xx`(分支名称)
- 合并分支 `git merge dev`(分支名称) 把当前分支合并到主分支
- 删除分支 `git branch -d dev`(分支名称)
- 查看远程分支详情 `git remote -v`
- 推送指定分支 `git push origin dev`(分支名称)
- 切换分支：`git checkout <name>`或者`git switch <name>`
- 创建+切换分支：`git checkout -b <name>`或者`git switch -c <name>`
- 合并某分支到当前分支：`git merge <name>`
- 删除分支：`git branch -d <name>`
- 下载指定分支
  - `git clone -b dev2 http://git-test.etledu.com/ETLBOAO/BIM1xTrain.git`
  - `git clone -b` 指定从分支下载 dev2 指定从哪个分支下载 http git 链接

## 标签

- 命令`git tag <tagname>`用于新建一个标签，默认为 HEAD，也可以指定一个 commit id；
- 命令`git tag -a <tagname> -m "blablabla..."`可以指定标签信息；
- 命令`git tag`可以查看所有标签。
- 命令`git push origin <tagname>`可以推送一个本地标签；
- 命令`git push origin --tags`可以推送全部未推送过的本地标签；
- 命令`git tag -d <tagname>`可以删除一个本地标签；
- 命令`git push origin :refs/tags/<tagname>`可以删除一个远程标签。

## SSH

最近的 http 链接总是出问题，还是 ssh 比较稳。

- [Github 生成 SSH 秘钥（详细教程）](https://blog.csdn.net/qq_35495339/article/details/92847819)

## user

切换帐号其实很简单，
如果你不知道现在本地 Git 用的帐号是什么，你可以输入

- `git config user.name`查看用户名
- `git config user.email`查看用户邮箱

修改用户名和邮箱的命令

- `git config --global user.name "Your_username"`
- `git config --global user.email "Your_email"`

## 问题场景

- 技术主管让你去再某个 git 分支上新建一个分支去做你的项目，那么如何在原远程分支的基础上新建自己的分支呢？
  解决方法
- 按照以下命令敲即可
- `git branch newBranch` -- 新建本地分支
- `git checkout newBranch` -- 本地切换到自己的分支
- `git pull origin xxxxBranch` -- 从远程目标分支 copy 代码
- `git push origin newBranch` -- 将本地新建的分支同步到服务器
- `git branch --set-upstream-to=origin/newbranch newbranch` -- 本地分支和远程分支建立追踪
  到此为止，就完成了需求

## 注意

- `push` 之前先 `pull` 代码

## GitHub

- [github 上 fork 原项目，如何将本地仓库代码更新到最新版本？](https://blog.csdn.net/u014028063/article/details/81559573)

如出现 Please enter a commit message to explain why this merge is necessary.（请输入提交消息来解释为什么这种合并是必要的）

git 在 pull 或者合并分支的时候有时会遇到这个界面。可以不管(直接下面 3,4 步)，如果要输入解释的话就需要:

1.按键盘字母 i 进入 insert 模式

2.修改最上面那行黄色合并信息,可以不修改

3.按键盘左上角"Esc"

4.输入":wq",注意是冒号+wq,按回车键即可

## 参考

- [廖雪峰 Git 教程](https://www.liaoxuefeng.com/wiki/896043488029600/897889638509536)
- [Pro Git 中文版阅读（第二版）](https://www.progit.cn/)
