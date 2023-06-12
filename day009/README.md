# 提升开发体验

## SourceMap

开发时我们运行的代码是经过 webpack 编译后的,如下：
![图片](https://myfirebug.github.io/example-images/webpack/1.png)

所有 css 和 js 合并成一个文件，并且多了其他代码。此时如果代码运行报错那么提示代码错误位置我们是看不懂的，一旦将来开发代码文件很多，很难发现错误出现的在哪里；
![图片](https://myfirebug.github.io/example-images/webpack/2.png)
![图片](https://myfirebug.github.io/example-images/webpack/3.png)

所以我们需要更加准确的的错误提示，来帮助我们更好的开发代码；

### 介绍

SourceMap(源代码映射) 是一个用来生成源代码与构建后代码一一映射的文件的方案；

### 配置

[webpack DevTool 文档] (https://webpack.docschina.org/configuration/devtool/#devtool)

1. 开发模式 （cheap-module-source-map）

- 优点：打包编码速度快，只包含行映射
- 缺点： 没有列映射

```
...
mode: 'development',
devtool: 'cheap-module-source-map'
...
```

2. 生产模式 （source-map）

- 优点：包含行、列映射
- 缺点：打包编译速度慢

```
...
mode: 'production',
devtool: 'source-map'
...
```

### 结果

![图片](https://myfirebug.github.io/example-images/webpack/4.png)
![图片](https://myfirebug.github.io/example-images/webpack/5.png)
