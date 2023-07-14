# 优化代码运行性能

# Preload / Prefetch

Preload: 告诉浏览器立即加载资源；
Prefetch：告诉浏览器空闲时才开始加载资源；

共同点：

- 都只会加载资源，并不执行；
- 都有缓存；

区别：

- Preload 加载优先级高，Prefetch 加载优先级低；
- Preload 只能加载当前页面需要使用的资源，Prefetch 可以加载当前页面资源，也可以加载下一个页面需要使用的资源；

总结：

- 当前页面优先级高的资源用 Preload；
- 下一个页面需要使用的资源用 Prefetch；

它们的问题：兼容性较差；可以去 Can I Use 去查看 css,js 兼容性;

### 下载

```
npm i @vue/preload-webpack-plugin -D
```

# netWork Cache

[runtimechunk](https://webpack.docschina.org/configuration/optimization/#optimizationruntimechunk)

在二次打包的过程的，不是所有文件都重新打包一次，只打包修改过的文件；

## 代码

```
...
optimization: {
    ...
    runtimeChunk: {
      runtimeChunk: {
        name: (entrypoint) => `runtime~${entrypoint.name}`,
      },
    }
    ...
  }
...
```

## 解决 JS 兼容问题 CoreJs

[CoreJs 配置](https://www.babeljs.cn/docs/babel-preset-env#corejs)
过去我们使用 babel 对 js 代码进入了兼容处理，其中使用@babel/preset-env 智能预设来处理兼容性问题；
它能将 es6 的屯些语法进行编译转换，比如箭头函数，...扩展运算符等，但是是如果是 async 函数，promise 对象，数组的一些方法（include）等，它没办法处理；
所以此时我们 js 代码仍然存在兼容性问题，一旦遇到底版本浏览器会直接报错，所以我们想要将 js 兼容性问题彻底解决

### 说明

core-js 是专门用来做 es6 以级以上 API 的 polyfill；
polyfill 同意吗分配非常可能做垫片/补丁，就 用社区上提供的一段代码，让我们在不兼容某些新特性的浏览器上，使用该新特性；

### 下载

```
npm i core-js
```

### 配置

```
module.exports = {
  // 智能预设
  presets: [
    [
      "@babel/preset-env",
      {
        // 按需加载自动引入
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
  ],
};

```

# PWA

开发 WEB App 项目，项目一旦处于网络离线情况，就没办法访问了。我们希望给项目提供离线体验；

## 简介

渐进式网络应用程度：是一种可以提供类似于 native app（原生应用程序）体验的 Web App 的技术。其中最重要的是，在离线时应用程序能够继续运行功能；

## 下载

[workbox-webpack-plugin](https://webpack.docschina.org/guides/progressive-web-application/#adding-workbox)

```
npm i workbox-webpack-plugin -D
```
