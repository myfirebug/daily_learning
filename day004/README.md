# 处理图片资源

过去 webpack4 时，我们处理图片资源通过 file-loader 和 url-loader 进行处理；
现在 webapck5 已经将两个 loader 功能内置到 webpack 里，只需要简单配置即可处理图片资源；

[inlining-assets 官方文档](https://webpack.docschina.org/guides/asset-modules#inlining-assets)

# 配置

```
...
module: {
    rules: [
      // 转换图片
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        generator: {
          filename: "static/[hash:6][ext][query]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb
          }
        }
      },
      // 转换字体图标
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[hash:6][ext][query]",
        },
      },
      // 处理其他资源
      {
        test: /\.(mp3|mp4|avi)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash:6][ext][query]",
        },
      },
    ],
  }
...
```
