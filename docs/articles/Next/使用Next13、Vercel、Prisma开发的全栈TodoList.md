## 前言

[Next.js](https://link.juejin.cn/?target=https%3A%2F%2Fnextjs.org%2F "https://nextjs.org/")是一个使用 React 作为前端框架底层的支持 SSR(请求时渲染)、SSG(构建时渲染)等技术的全栈框架，可用于构建各种各样的 Web 应用程序，从小型个人项目到大型企业应用程序。

搭配 Github & Vercel 使用可以支持整套构建部署流程。

同时在服务端也非常容易做缓存相关的处理，甚至是做一些中间件的开发，简直是前端开发的神兵利器。

本文将使用以下技术栈开发一个 todo list 应用。

- [React](https://reactjs.org/): 用于构建用户界面的流行 JavaScript 库。
- [Next.js](https://nextjs.org/): 用于构建服务器呈现的 React 应用程序的强大框架。
- [Next-Auth](https://next-auth.js.org/): 用于 Next.js 应用程序的简单且灵活的认证库。
- [Prisma](https://prisma.yoga/) 是一个现代化的数据库工具和 ORM（对象关系映射）库，
- [Vercel Postgres](https://vercel.com/postgres): Vercel 提供的可靠且可扩展的托管数据库解决方案。

## 开始

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46e784b22b464918ab7fdd8053d3057d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1274&h=664&s=103239&e=png&b=fcfcfc)
此项目使用的是 [prisma-postgres-auth-starter](https://vercel.com/new/znl-github/templates/next.js/prisma-postgres-auth-starter) 模版基础上开发的 ，进入项目后点击 Deplay，可以先把这个项目部署在自己的 Vercel 里，并且会自动同步到我们的 GitHub 仓库，下载仓库到本地即可运行项目。

```
pnpm
pnpm run dev
```

启动项目后浏览器打开即可进入首页，一般地址是：http://localhost:3000/

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fd8196b0e744136b84781daadca982b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1080&h=639&s=51849&e=png&b=000000)
点击 `Protected Page` 可进入登陆页，登录成功后可以进入内页，我们就是在这里开发的 todo list 功能。

## 目录结构

项目的启动后，稍微了解一下目录结构：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c87470f5d5b4b43a389632235feb573~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=367&h=785&s=54599&e=png&b=181818)

- `.next`目录：这是 Next.js 的缓存目录，在执行`dev`或`build`等命令时，会在项目的根目录下生成。它主要用于缓存已生成的内容，以提高编译速度，通常无需开发者干预。
- `.vercel`目录：Vercel 配置文件
- `.vscode`目录：这是 Visual Studio Code 编辑器的配置目录，包含与项目的编辑器设置相关的文件。
- `node_modules`目录：这是存放第三方依赖的目录，通常无需详细介绍，因为它由`npm`或`yarn`自动管理。
- `public`目录：主要用于存放静态资源文件，默认情况下没有二级目录，但您可以根据需要在其中创建子目录以组织相关资源。这些资源可以通过类似`/favicon.ico`的路径引用。
- `src`目录：这是项目的主要源代码目录，初始结构包括`app`目录，其中还包含一个默认的`api`子目录，用于存放 Next.js 提供的服务器端 API 路由。
- `prisma`目录：用于存放与数据库集合和类型相关的 Prisma 文件。
- `components`目录：包含项目中使用到的公共组件。
- `lib`目录：存放第三方库或模块。
- `utils`目录：包含项目中使用的工具库或辅助函数。
- `types`目录：用于存放 TypeScript 类型定义文件。
- `styles`目录：存放与样式相关的文件，可能包括 CSS、SCSS 或其他样式表。
- `.eslintrc.json`：包含 ESLint 的规则配置，用于项目的代码质量和风格检查。
- `.gitignore`：包含 Git 版本控制系统的忽略文件规则，用于排除不需要跟踪的文件或目录。
- `next-env.d.ts`：包含与 Next.js 相关的 TypeScript 类型定义，默认情况下只包含默认引用。
- `next.config.js`：包含 Next.js 的配置选项，可用于自定义应用程序行为。
- `package.json`：包含项目的 npm 相关配置，包括依赖项列表、脚本命令和其他项目信息。
- `README.md`：项目的文档说明文件，通常包含有关项目的描述、安装说明和用法示例。
- `tsconfig.json`：包含 TypeScript 相关配置，用于自定义项目中的 TypeScript 行为。

## 数据库设置

我们使用的数据库是 Vercel 的 PostgresSQL，它对每个用户都有一定的免费的额度，自己练习是足够的。

进入到我们初始化完成的项目，在右上角一个数据库选项卡，我们的项目会自动绑定一个数据库，具体的位置如图：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c882c43da414b35b486e787b5ec62f6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1568&h=523&s=69374&e=png&b=fefefe)

按照文档快速的步骤将本地项目和 Vercel PostgresSql 进行连接，在图中的 Data 选项里话可以查看数据和输入 SQL 命令操作数据，非常方便。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abe06792ee3b4f39b9bb508a45dccf06~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1476&h=750&s=113700&e=png&b=fefefe)

按照文档中的步骤一步步操作，即可连接数据库成功，具体怎么验证呢？我们在本地进入注册页面，注册一个账号然后在数据库里进行查看，如果能查看到就说明连接成功了（图片 Data 里），反之异常。

## 使用 Prisma

Prisma 是一种现代数据库工具和对象关系映射（ORM）框架，它用于简化数据库访问和数据操作的过程。Prisma 提供了强大的工具，使开发人员能够以类型安全、高效和可维护的方式与数据库进行交互。

**Prisma Schema 定义**：首先，您需要定义您的数据库模型和架构。这通常在 Prisma Schema 文件中进行。Prisma Schema 定义了数据库表、字段、关联关系以及数据模型的结构。这个定义是关于数据库的抽象，Prisma 使用它来生成实际的数据库表和与之相关的 Prisma Client 代码。

Schema 在项目的`prisma/schema.prisma`里，可以使用非常简洁的语法描述数据模型的结构和关系，我们在这里写了`User`、`TodoList`两个 model。

```js
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["jsonProtocol"]
}

datasource db {
  provider          = "postgresql"
  url               = env("POSTGRES_PRISMA_URL") // uses connection pooling
  directUrl         = env("POSTGRES_URL_NON_POOLING") // uses a direct connection
  shadowDatabaseUrl = env("POSTGRES_URL_NON_POOLING") // used for migrations
}

model User {
  id       Int        @id @default(autoincrement())
  email    String     @unique
  password String
  TodoList TodoList[]
}

model TodoList {
  id       Int     @id @default(autoincrement())
  userId   Int
  user     User    @relation(fields: [userId], references: [id])
  content  String
  complete Boolean @default(false)
}

```

如果你足够心细，就可以在`package.json`里的`dev`命令中有一个`prisma generate`，在项目启动时，会生成 Prisma Client 代码，

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfb6853ad8d348609d3f7dd1988fa741~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=617&h=265&s=46696&e=png&b=202020)

**自动生成 SQL 查询**：Prisma Client 会根据您的查询构建 SQL 查询语句，并将其发送到数据库服务器。这样，您可以使用高级查询功能而无需手动编写 SQL 查询。

使用的方法也很简单：

```tsx
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const todos = await prisma?.todoList.findMany({ where: { userId: 1, complete: true } });
  return Response.json(todos);
}
```

这段代码的主要作用是处理 GET 请求，然后查询数据库中`userId`为 `1` 的用户已完成的待办项目，并返回。

## 注册/登录

注册和登录页面都在`app`目录下，他们共同引用了一个`components/form`组件：

```tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Iuser } from "types";

export default function Form({ type }: { type: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // 登录逻辑
  const login = ({ email, password }: Iuser) => {
    signIn("credentials", {
      redirect: false,
      email,
      password,
      // @ts-ignore
    }).then(({ error }) => {
      if (error) {
        setLoading(false);
        toast.error(error);
      } else {
        router.refresh();
        router.push("/protected");
      }
    });
  };
  // 注册逻辑
  const register = ({ email, password }: Iuser) => {
    fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then(async (res) => {
      setLoading(false);
      if (res.status === 200) {
        toast.success("Account created! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        const { error } = await res.json();
        toast.error(error);
      }
    });
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        if (type === "login") {
          login({ email: e.currentTarget.email.value, password: e.currentTarget.password.value });
        } else {
          register({ email: e.currentTarget.email.value, password: e.currentTarget.password.value });
        }
      }}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      // 表单逻辑 省略
    </form>
  );
}
```

通过代码我们可以看到注册逻辑请求的接口是`/api/auth/register`，登录逻辑是调用的方法`signIn("credentials")`，我们一个个来看。

### 注册

注册接口的逻辑在`app/api/auth/register/route.ts`中：

```ts
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10),
      },
    });
    return NextResponse.json(user);
  }
}
```

在`app/api`下的文件夹就是请求路径，然后`route.ts`就是对应路径的处理方法，可以导出以请求方法名字为函数名的函数，如`export const POST = ()=>{...}`就是`api/auth/register`请求路径的 post 请求的处理逻辑。

在这个逻辑里，我们首先查询的了`email`字段是否存在，如果存在则响应 400。如果不存在则创建一个用户数据并返回当前用户信息。

这里的使用`prisma.user.create`方法可以非常方便的对数据库进行 CURD 操作。

### 登录

登录的逻辑比较复杂一点，他是使用的 NextAuth.js 这个库进行的校验，`signIn("credentials")` 是 NextAuth.js 提供的一个方法，用于实现基于用户名和密码的用户身份验证。

当调用 `signIn("credentials")` 时，它会验证用户提供的用户名和密码是否与存储在数据库或其他身份验证源中的凭证匹配。如果匹配成功，用户将被授权登录。

逻辑处理在`app/api/auth/[...nextauth]/route.ts`文件内, `...nextauth`是一个特殊的文件夹，他是 NextAuth 指定处理授权的地方。

```ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  //...
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }
        return user;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

具体的步骤是：

1. 用户在应用程序的登录页面输入其用户名和密码。
2. 应用程序将用户名和密码作为 `credentials` 对象传递给 `signIn("credentials")` 方法。
3. NextAuth.js 将这些凭据与数据库或其他身份验证源中的用户信息进行比对。
4. 如果凭据匹配成功，用户会被授权登录，并将得到一个身份验证的会话。
5. 用户会被重定向到登录后的页面。

这个方法的目的是实现基本的用户名和密码验证，但您也可以通过自定义身份验证提供程序来实现其他身份验证方式，比如社交媒体登录或其他身份验证流程。

## 中间件

因为 Todo list 功能需要登录之后才能使用，如果未登录的用户进入，则应该跳转至登录页。这块的处理逻辑应该是作用于全局的。所幸，Next.js 提供了`Middleware`，使用过 Express、Koa 的同学应该熟悉，它是用于处理请求和响应的中间层函数，它允许您在处理请求之前或之后执行额外的逻辑。

在项目中对应的文件是`middleware.ts`，可以在这里编写逻辑。

```ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === "/") {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && path === "/protected") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/protected", req.url));
  }
  return NextResponse.next();
}
```

首先通过`middleware`函数里拿到请求对象，然后判断请求路径是否是需要的登录的，如果是在验证登录状态（使用 next-auth），然后做出对应的处理逻辑。

- 登录
  - 进入首页正常
  - 进入 todo list 正常
  - 进入登陆、注册页跳转 todo list
- 未登录
  - 进入首页正常
  - 进入登录、注册正常
  - 进入 todo list 跳转登录页

## Todo list 功能开发

这个功能在`app/protected`里开发，页面的代码就不贴出来了，就是一个简单的表单和一列待办列表。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dff329188d3d49e8a135f13a7f980ea6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=444&h=326&s=15677&e=png&b=000000)

重点看一下这块的接口是如何实现的吧，我使用的是 REST API 的方式编写的，代码地址在`app/api/todo/route.ts`。

```ts
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ItodoItem } from "types";

// 查询todo
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const todos: ItodoItem[] = await prisma?.todoList.findMany({ where: { userId: Number(userId) } });
  return Response.json(todos);
}

// 添加todo
export async function POST(req: Request) {
  const { content, userId } = await req.json();
  const nums = await prisma.todoList.count({
    where: { userId },
  });
  if (nums > 4) {
    return NextResponse.json({ code: -100, msg: "The number of todos exceeds five" });
  }
  const todo = await prisma.todoList.create({
    data: { content, userId },
  });

  return NextResponse.json(todo);
}

// 删除todo
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  const todos = await prisma?.todoList.delete({ where: { id: Number(id) } });
  return NextResponse.json(todos);
}

// 修改todo
export async function PUT(req: Request) {
  const { id, complete } = await req.json();
  const todo = await prisma.todoList.update({
    where: { id },
    data: { complete },
  });

  return NextResponse.json(todo);
}
```

实现很简单，因为免费额度的原因，所以限制了每个用户只允许添加 5 条待办。

## 总结

通过这次使用 Next.js，非常方便的就能实现了一个登录、注册、CURD，配合 Vercel 还支持自动部署、日志查看、数据库存储.. 开发流程很舒服。

感觉以后通过这种方式写一个简单的全栈项目是很不错的～

最后附上 GitHub 地址：https://github.com/AnsonZnl/react-nextjs-todolist ，如果对您有帮助，欢迎 🌟Star🌟
