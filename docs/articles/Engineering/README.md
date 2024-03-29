## 目录

- [Win10安装Docker以及Jenkins(超级详细篇)](./Win10安装Docker以及Jenkins(超级详细篇).md)
- [常用构建工具(Webpack、Vite、Rollup)详解](./常用构建工具(Webpack、Vite、Rollup)详解.md)
- Vite核心原理解析
## 前端工程化

前端工程**化**，关键在于**化**，也就是过程。前端工程化就是利用软件工程的思想方法进行前端项目的开发、维护、管理。

什么是软件工程？来看一下百度百科的定义：

> 软件工程是一门研究用工程化方法构建和维护有效的、实用的和高质量的软件的学科

换句话说，工程化的目的就是为了提升团队的开发效率。例如大家所熟悉的构建打包、性能优化、自动化部署等，都属于工程化的内容。

我们从开始写第一行代码开始，到项目上线后的全部过程，都可以理解是工程化的范畴，工程化的目的就是能高效的开发代码，只要是能提高开发效率和项目质量都是好兄弟，从分类上来说，工程体系分成这几个步骤

- 项目初始化
    - 技术选型
    - 团队规范
    - 脚手架
    - 模版生成
- 项目开发
  - 模块化、组件化
  - 数据mock、热更新
  - ts、less、sass等构建
  - 单元测试
  - 性能优化
- 部署上线
  - docker、k8、pm2
  - CI/CD(Jenkins、github action、Vercel)
  - 报警、日志、监控
  - 网络代理

工程化的目的，主要是提升**团队的开发效率和项目质量**。

目录的顺序是以一个项目的生命周期来分配的：

- 接到新需求，进行需求评审后根据具体情况做技术选型。
- 开发前需要统一规范。
- 学会模块化、组件化，对于写代码很有好处。
- 开发完，需要对代码进行测试。
- 构建打包。
- 部署上线。
- 对项目进行监控，随时发现问题。
- 根据项目运行情况决定是否要做性能优化。
- 项目越来越复杂，需要重构以提高可维护性。
- 项目越来越大，可以考虑是否用微服务对其进行拆分。
- 不想自己管理服务器或数据库，可以考虑使用 Serverless

![工程体系](https://s2.loli.net/2023/03/10/jU9JgQX427DfOpZ.png)
## 参考
- [带你入门前端工程](https://woai3c.gitee.io/introduction-to-front-end-engineering/#%E7%AE%80%E4%BB%8B)
- [大圣前端编程自学网-工程化](https://shengxinjing.cn/fe/fis.html#%E6%96%87%E6%A1%A3)