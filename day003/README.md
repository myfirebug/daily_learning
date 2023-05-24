# 处理样式资源

webpack 本身是不能识别样式资源的，所以我们需要借助 loader 来帮助 webpack 解析样式资源

[webpack 官方 loader 文档](https://webpack.docschina.org/loaders/)

## 处理 css

[css-loader 官方文档](https://webpack.docschina.org/loaders/css-loader/)

### 1. 下载包

```
npm i --save-dev css-loader style-loader -D
```

### 2. 功能介绍

- css-loader: 负责将 css 文件编译成 webpack 能识别的模块；
- style-loader: 会动态创建一个 style 标签，里面放置 webpack 中 css 模块内容；

此时样式会以 style 标签形式在页面上生效；

### 3. 配置

```
...
module: {
    rules: [
      // 处理css
      {
        test: /\.css$/i,
        // use 执行顺序：从右到左，从下到上
        use: ["style-loader", "css-loader"],
      },
    ],
  },
...
```

## 处理 less

[less-loader 官方文档](https://webpack.docschina.org/loaders/less-loader/)

### 1. 下载包

```
npm i less less-loader -D
```

### 2. 功能介绍

- less-loader: 负责将 less 文件编译成 css 文件；

### 3. 配置

```
...
module: {
    rules: [
      // 处理less
      {
        test: /\.less$/i,
        // use 执行顺序：从右到左，从下到上
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
...
```
