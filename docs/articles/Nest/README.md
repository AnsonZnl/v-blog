# Nest 笔记

> Nest（NestJS）是一个用于构建高效、可扩展 Node.js 服务器端应用程序的框架。它使用渐进式的 JavaScript，完全支持并构建于 TypeScript 上（同时仍然允许开发者使用纯 JavaScript 进行编码），结合了面向对象编程（OOP）、函数式编程（FP）和函数响应式编程（FRP）的元素。
> 在内部，Nest 使用强大的 HTTP 服务器框架，如 Express（默认）并且可以选择配置为使用 Fastify！
> Nest 在这些常见的 Node.js 框架（Express/Fastify）之上提供了一层抽象，同时也直接向开发者暴露了它们的 API。这使得开发者可以自由使用众多为底层平台提供的第三方模块。

英文文档地址：https://nestjs.com/
中文文档地址：http://nestjs.inode.club/

## 1. 安装

```
$ npm i -g @nestjs/cli
$ nest new project-name
```

## 2. 创建项目

启动并监听文件变化

```

npm run start:dev

```

## 3. 创建控制器

为了快速创建一个带有内置验证的 CRUD 控制器，你可以使用 CLI 的 CRUD 生成器：

```
nest g resource [name]
```
