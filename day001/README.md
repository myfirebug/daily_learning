# 基本使用

[webpack](https://www.webpackjs.com/) 是一个静态资源打包工具；
它会以一个或多个文件作为打包入口，将我们整个项目所有文件编译合成一个或多个文件；
输出的文件就是编译好的文件，就可以在浏览器中运行了；
我们将 [webpack](https://www.webpackjs.com/) 输出的文件叫做 bundle；

## 功能介绍：

- 开发模式：仅能编译 JS 中的 ES Module 语法；
- 生产模式：能编译 JS 中的 ES Module 语法，还能压缩 JS 代码；

## 下载依赖

```
npm i webpack webpack-cli -D
```

## 打包

development: 开发环境
production: 生产环境

```
npx webpack ./src/main.js --mode=development
```
