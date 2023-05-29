# 处理 HTML 资源

[HtmlWebpackPlugin](https://webpack.docschina.org/plugins/html-webpack-plugin)

## 下载包

```
npm i --save-dev html-webpack-plugin -D
```

## 配置

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
...
plugins: [
  new HtmlWebpackPlugin({
    // 模板：以public/index.html文件创建新的html文件
    // 新的文件特点：结构和原来一致，自动引入打包出的资源
    template: path.resolve(__dirname, "public/index.html"),
  }),
]
...
```
