# Git

![Git 常用命令](./img/computer-base/git命令速查.png)

[Pro Git 中文版阅读（第二版）](https://www.progit.cn/)

## Git常用命令
- `git status` 查看状态
- `git add` 添加变动至暂存区
- `git commit -m 'xxx'` 提交暂存区至工作区
- `git push` 拉取代码
- `cat xx.js` 查看文件
- `git log` 打印git 日志
- `git reset` 回退版本
- `git checkout -- xx.js` 把工作区的修改全部撤回
- `git diff HEAD -- xx.js` 查看当前的变动
- `git pull` 推送代码
  

## 分支
- 查看分支 `git branch`
- 创建分支 `git branch xx`(分支名称)
- 切换分支 `git checkout xx`(分支名称)
- 创建并切换分支` git checkout -b xx`(分支名称)
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
  - `git clone -b` 指定从分支下载 dev2指定从哪个分支下载 http git 链接

## 标签
- 命令`git tag <tagname>`用于新建一个标签，默认为HEAD，也可以指定一个commit id；
- 命令`git tag -a <tagname> -m "blablabla..."`可以指定标签信息；
- 命令`git tag`可以查看所有标签。
- 命令`git push origin <tagname>`可以推送一个本地标签；
- 命令`git push origin --tags`可以推送全部未推送过的本地标签；
- 命令`git tag -d <tagname>`可以删除一个本地标签；
- 命令`git push origin :refs/tags/<tagname>`可以删除一个远程标签。

## user
切换帐号其实很简单，
如果你不知道现在本地Git用的帐号是什么，你可以输入
- `git config user.name`查看用户名
- `git config user.email`查看用户邮箱

修改用户名和邮箱的命令
- `git config --global user.name "Your_username"`
- `git config --global user.email "Your_email"`

## 问题场景
- 技术主管让你去再某个git分支上新建一个分支去做你的项目，那么如何在原远程分支的基础上新建自己的分支呢？
解决方法
- 按照以下命令敲即可
- `git branch newBranch`   -- 新建本地分支
- `git checkout newBranch ` -- 本地切换到自己的分支
- `git pull origin xxxxBranch` -- 从远程目标分支copy代码
- `git push origin newBranch` -- 将本地新建的分支同步到服务器
- `git branch --set-upstream-to=origin/newbranch newbranch` -- 本地分支和远程分支建立追踪
到此为止，就完成了需求

## 注意
- `push` 之前先 `pull` 代码

## 参考
- [廖雪峰 Git 教程](https://www.liaoxuefeng.com/wiki/896043488029600/897889638509536)
