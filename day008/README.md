# 生产模式

1. 优化代码运行性能
2. 优化代码打包速度

## css 处理

### 提取 css 成单独文件

[MiniCssExtractPlugin](https://webpack.docschina.org/plugins/mini-css-extract-plugin)

1. 下载包

```
npm i --save-dev mini-css-extract-plugin -D
```

2. 配置

```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  plugins: [new MiniCssExtractPlugin({
    filename: "static/css/main.css",
  })],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

### css 兼容性处理

[postcss-loader](https://webpack.docschina.org/loaders/postcss-loader/)

1. 下载

```
npm i  postcss-loader postcss postcss-preset-env -D
```

2. 配置

```
在webpack.prod.js
...
module: {
    rules: [
      {
        test: /\.css$/i,
        // use 执行顺序：从右到左，从下到上
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          // 注意该loader必须写在css-loader后面
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
        ],
      }
    ]
}
...
在package.json
...
"browserslist": [
    "last 2 versions",
    "> 1%",
    "not dead"
  ]
...
```

### css 压缩

[CssMinimizerWebpackPlugin](https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/)

1. 下载包

```
npm i css-minimizer-webpack-plugin -D
```

2. 配置

```
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
...
optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
...
```
