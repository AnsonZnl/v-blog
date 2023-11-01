先了解下常用的三种部署方式的简单介绍以及它们的优缺点：

1.  **Vercel 部署**:

    - **优点**:

      - 极其简单：Vercel 提供了与 Next.js 集成良好的部署平台，使得部署变得非常容易。
      - 自动化：Vercel 提供自动部署、CI/CD 和部署预览等功能，大大简化了部署流程。
      - 高性能：Vercel 的服务器分布在全球多个地点，确保站点的高性能和快速加载速度。

    - **缺点**:

      - 有费用：尽管有免费套餐，但高级功能可能需要付费。
      - 有一定学习曲线：对于初学者来说，可能需要一些时间来适应 Vercel 平台。

1.  **服务器部署**:

    - **优点**:

      - 灵活性：你可以选择任何云提供商或自己的服务器来托管 Next.js 应用，从而具有更大的自定义和控制权。
      - 适用于大型应用：适用于需要大规模处理的应用，可以根据需求调整服务器资源。

    - **缺点**:

      - 更复杂：需要自行设置服务器环境、Nginx 或其他反向代理，以及部署流程，这可能相对复杂，特别是对新手来说。
      - 成本：取决于所选的云提供商，成本可能会较高，尤其是在流量大或需要高性能服务器时。

1.  **静态部署**:

    - **GitHub Pages 部署**:

      - **优点**:

        - 免费：GitHub Pages 是免费托管静态文件的好选择。
        - 集成：与 GitHub 仓库集成，使得发布变得非常简单。
        - 适用于文档和演示：适用于文档站点、演示和小型项目。

      - **缺点**:

        - 有限制：GitHub Pages 有一些限制，如每月带宽限制，不适合大规模应用。
        - 静态：GitHub Pages 仅支持静态文件托管，对于需要服务器端渲染的应用不适用。

由于 GitHub Pages 是静态网站托管服务，因此它不支持在服务端渲染应用程序。

因此，您需要使用 Next.js 的静态导出功能来生成静态文件并将其部署到 GitHub Pages 上。

## Vercel 部署

这个最简单了，直接在 GitHub 新建 Next.js 项目之后在 Vercel 导入即可，不仅支持自动部署，还可以提供免费的服务运行环境。

可以参考官方文档：[vercel next depoly](https://vercel.com/docs/frameworks/nextjs)

当然，Vercel 部署的网站是会自动分配一个可访问的 `vercel.app` 后缀的域名的，但是国内因为某些原因访问不了，这里告诉大家一个方法，可以在国内购买一个域名，然后绑定一下就可以了。

## 部署到 Node 服务器

Next.js 可以部署到任何支持 Node.js 的托管提供商。例如，阿里云服务器或腾讯云服务器。

如果是我们自己购买的云服务，可以使用这种方式，首先先在服务里安装 Node 环境，然后执行 `build` 命令以后,生成的内容默认在`.next`文件夹里

```package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}

```

然后，运行  `npm run build`  以生成应用程序。最后，运行  `npm run start`  以启动 Node.js 服务器。此服务器支持 Next.js 的所有功能。

也可以用 docker 部署。

Next.js 可以部署到任何支持[Docker 的托管提供商](https://www.docker.com/)容器。[部署到 Kubernetes](https://kubernetes.io/)等容器编排器时，您可以使用此方法或[HashiCorp Nomad](https://www.nomadproject.io/)，或者在任何云提供商的单个节点内运行时。

1.  [安装 Docker](https://docs.docker.com/get-docker/)在你的机器上
1.  克隆[with-docker](https://github.com/vercel/next.js/tree/canary/examples/with-docker)例子
1.  构建你的容器：`docker build -t nextjs-docker .`
1.  运行你的容器：`docker run -p 3000:3000 nextjs-docker`

如果您需要在多个环境中使用不同的环境变量，请查看官方的[with-docker-multi-env](https://github.com/vercel/next.js/tree/canary/examples/with-docker-multi-env)例子。

## 静态部署（Github Page）

当我们的应用没有服务相关的功能时，可以选择静态部署，静态部署和正常使用 React 部署是一样的，只不过我们是部署在 GitHub 上。

首先在`next.config.js`中配置：

```js
const nextConfig = {
  output: "export",
};
```

将打包命令加入到`package.json`里，然后执行`npm run build`。

```js
"scripts": {
  "build": "next build && next export"
}

```

默认生成的静态页面在`out`文件夹里

## Github 配置

设置 pages 页面的分支为 gh-pages 分支。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18b5eef20e2d4c6480a92b10af109e59~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1640&h=751&s=151451&e=png&b=ffffff)

在`next.config.js`中设置打包后静态资源的路径，也就是仓库名字。

```js
/** @type {import('next').NextConfig} */
const repo = "dir-tree";
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

const nextConfig = {
  basePath,
  assetPrefix,
  output: "export",
};

module.exports = nextConfig;
```

我们本地开发不需要带有 repo 的前缀，所以为了不影响本地开发，所以我们需要加个判断，只有在 GitHub 构建时才加前缀。

```js
/** @type {import('next').NextConfig} */

const isGithubActions = process.env.GITHUB_ACTIONS || false;
let assetPrefix = "";
let basePath = "";

if (isGithubActions) {
  // 去掉 `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");

  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

const nextConfig = {
  basePath,
  assetPrefix,
  output: "export",
};

module.exports = nextConfig;
```

改完之后，直接推送到仓库，即可成功！

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/364325aaca6b4a40a0996f91c9b92a6c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1168&h=776&s=97580&e=png&b=25292f)

如果你想看完整代码可以去 [我的仓库](https://github.com/AnsonZnl/dir-tree) 查阅

## 常见问题

如果在构建过程中遇到这个问题，请按照第二图解决即可。
![问题截图](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbf3ff36248546c59af83335cd2165d7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1386&h=687&s=406614&e=png&b=262a30)

![解决方法](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f8c6fc0604744d08a6d8c904d7f0cdd~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1448&h=760&s=419791&e=png&b=ffffff)

## 参考

- [Github Pages Action](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fmarketplace%2Factions%2Fgithub-pages-action)
- [自动令牌身份验证](https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.github.com%2Fcn%2Factions%2Fsecurity-guides%2Fautomatic-token-authentication)
- [(主要借鉴) 阮一峰 - GitHub Actions 入门教程](https://link.juejin.cn?target=https%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2019%2F09%2Fgetting-started-with-github-actions.html "https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html")

- [(主要借鉴) Using GitHub Pages to Build, Deploy, and Host Next.js](https://link.juejin.cn?target=https%3A%2F%2Fwww.viget.com%2Farticles%2Fhost-build-and-deploy-next-js-projects-on-github-pages%2F "https://www.viget.com/articles/host-build-and-deploy-next-js-projects-on-github-pages/")

- [Using Composite GitHub Actions to make your Workflows smaller and more reusable](https://link.juejin.cn?target=https%3A%2F%2Fwallis.dev%2Fblog%2Fcomposite-github-actions "https://wallis.dev/blog/composite-github-actions")

- [GitHub Actions - Announcing the GitHub Actions extension for VS Code](https://link.juejin.cn?target=https%3A%2F%2Fgithub.blog%2F2023-03-28-announcing-the-github-actions-extension-for-vs-code%2F "https://github.blog/2023-03-28-announcing-the-github-actions-extension-for-vs-code/")

- [Deploying to Github Pages? Don't Forget to Fix Your Links](https://link.juejin.cn?target=https%3A%2F%2Fmaximorlov.com%2Fdeploying-to-github-pages-dont-forget-to-fix-your-links%2F "https://maximorlov.com/deploying-to-github-pages-dont-forget-to-fix-your-links/")

- [Automating build/deploy CI/CD with GitHub Actions](https://link.juejin.cn?target=https%3A%2F%2Fwww.viget.com%2Farticles%2Fautomating-build-deploy-ci-cd-with-github-actions%2F "https://www.viget.com/articles/automating-build-deploy-ci-cd-with-github-actions/")

- [如何使用 GitHub Actions 实现开源项目的自动化](https://link.juejin.cn?target=https%3A%2F%2Fwww.freecodecamp.org%2Fchinese%2Fnews%2Fautomate-open-source-projects-with-github-actions%2F "https://www.freecodecamp.org/chinese/news/automate-open-source-projects-with-github-actions/")

- [使用 GitHub Actions 构建、部署 Next.js 并将其托管到 GitHub Pages](https://juejin.cn/post/7220410343649624121#heading-0)
- [Vercel static exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
