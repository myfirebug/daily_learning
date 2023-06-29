# 减少代码体积

## Tree Shaking

开发时我们定义了一些工具函数库，或者引用第三方工具函数库或组件库；
如果没有扯裂处理我们打包时会引入整个库，但是实际上我闪可能只用上极小部分的功能；
这样将整个库都打包进来体积就太大了；

### 介绍

Tree Shaking: 是一个术语，通常用于描述移除 javascript 中没有使用上的代码；
注意：它依赖 ES Module

### 配置

webpack 已经默认开启了这个功能，无需其他配置。

## Babel

babel 为编译的每个文件都插入辅助代码，使代码体积过大；
babel 对一些公共方法使用了非常小的辅助代码，比如\_extend.默认情况下会被添加到每一个需要它的文件中；
你可以将这些辅助代码作为一个独立模块，来避免重复引入；

### 下载

@babel/plugin-transform-runtime: 禁用了 babel 自动对每个文件的 runtime 注入，而是引入
@babel/plugin-transform-runtime 并且使用所有辅助代码从这里引用；

```
npm i @babel/plugin-transform-runtime -D
```

### 配置

```
...
{
  test: /\.js$/,
  exclude: /node_modules/, // 排除node_modules中的js文件
  use: [
    {
      loader: "thread-loader",
      options: {
        works: threads, // 进程数据
      },
    },
    {
      loader: "babel-loader",
      options: {
        cacheDirectory: true, // 开启babel缓存
        cacheCompression: false, // 关闭缓存文件压缩
        plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
      },
    },
  ],
}
...
```

## Image Minimizer

开发如果项目中引入了较多的图片，那么图片体积会比较大，请求速度比较慢；
我们可以对图片进行压缩，减少图片体积；
注意：如果项目中图片都是在线连接，那么就不需要了，本地项目静态图片才需要进行压缩；

### 下载

image-minimizer-webpack-plugin: 用来压缩图片的插件

```
npm i image-minimizer-webpack-plugin -D
// 无损压缩
npm i imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
// 有损压缩
npm i imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D
```

### 配置

```
const ImageMinimizerWebpackPlugin = require("image-minimizer-webpack-plugin");
...
new ImageMinimizerWebpackPlugin({
      minimizer: {
        implementation: ImageMinimizerWebpackPlugin.imageminGenerate,
        options: {
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            [
              "svgo",
              {
                plugins: [
                  "preset-default",
                  "prefixIds",
                  {
                    name: "sortAttrs",
                    params: {
                      xmlnsOrder: "alphabetical",
                    },
                  },
                ],
              },
            ],
          ],
        },
      },
    }),
    ...
```
