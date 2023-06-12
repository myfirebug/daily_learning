# 提升打包构建速度

## HotModuleReplacement

开发时，我们修改了其中一个模块代码，webpack 默认会将所有模块全部重新打包编译，速度慢；
所以我们需要做到修改某个模块代码，就只有这个模块代码需要重新打包编译，其他模块不变，这样打包速度就能提升；

### 介绍

HotModuleReplacement（HMR/热模块替换）：在程序运行中，替换、增加或者删除模块，而无需重新加载整个页面；

### 配置

```
...
devServer: {
    host: 'localhost',  // 启动服务器域名
    port: 9000, // 启动服务器端口
    open: true, // 是否自动打开浏览器
    hot: true // 开启HMR功能（只能用于开发环境，生产环境不需要）
}
...
// 此时css样式经过style-loader处理，已经具备HMR功能了，但js还不行。
// vue-loader, react-hot-loader已经做了热更新处理了
```

## oneOf

打包时，每个文件都会经过所有 loader 处理，虽然因为 test 正则原因实际没有处理上，但是都要过一遍，比较慢；

### 介绍

oneOf 只能匹配上一个 loader，剩下的就不匹配了

### 配置

```
...
module: {
    rules: [
      {
        // 每个文件只能被其中一个loader配置处理
        oneOf: [
          {
            test: /\.css$/i,
            // use 执行顺序：从右到左，从下到上
            use: ["style-loader", "css-loader"],
          },
          // 加载less
          {
            test: /\.less$/i,
            use: ["style-loader", "css-loader", "less-loader"],
          },
          {
            test: /\.(png|jpe?g|gif|webp|svg)$/,
            type: "asset",
            generator: {
              filename: "static/images/[hash:6][ext][query]",
            },
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb转成base64
              },
            },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
            generator: {
              filename: "static/fonts/[hash:6][ext][query]",
            },
          },
          {
            test: /\.(mp3|mp4|avi)$/,
            type: "asset/resource",
            generator: {
              filename: "static/media/[hash:6][ext][query]",
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/, // 排除node_modules中的js文件
            // use: {
            //   loader: "babel-loader",
            //   options: {
            //     presets: ["@babel/preset-env"],
            //   },
            // },
          },
        ],
      },
    ],
  }
...
```

## include/exclude

开发时，我们需要使用第三方库或者插件，所有文件都下载到 node_modules 中，而这些文件不需要编译可以直接使用；

所以我们在对 js 文件处理时，要排队 node_modules 下面的文件；

- include: 包含，只处理 XXX 文件；

- exclude: 包含，除了 XXX 文件以外其他文件都处理；

## cache

每次打包 js 文件都要经验丰富 eslint 检查和 babel 编译，速度慢；
我们可以缓存之前的 eslint（默认有缓存） 检查和 babel 编译结果，这样第二次打包时速度就会更快；；

```
...
{
  test: /\.js$/,
  exclude: /node_modules/, // 排除node_modules中的js文件
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true, // 开启babel缓存
      cacheCompression: false, // 关闭缓存文件压缩
    },
  },
}
...
// 默认打包到 node_modules/.cache 文件夹中
```
