const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/app.js",
    main: "./src/main.js",
  },
  output: {
    // 文件的输出路径，绝对路由
    // __dirname nodejs的变量，代表当前文件的文件夹目录（day002文件夹）
    path: path.resolve(__dirname, "dist"),
    // 入口打包输出的文件名
    filename: "[name].js",
    clean: true,
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      // 模板：以public/index.html文件创建新的html文件
      // 新的文件特点：结构和原来一致，自动引入打包出的资源
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 以下默认值
      minSize: 20000, // 分割代码最小的大小
      minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      minChunks: 1, // 至于被引用的次数，满足条件都会代码分割
      maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      maxInitialRequests: 30, // 入口js文件最大并行请求数量
      enforceSizeThreshold: 50000, // 超过50KB一定会单独打包（此时会忽略minRemainingSize，maxAsyncRequests， maxInitialRequests）
      cacheGroups: {
        // 组，哪些模块要打包到一个组
        defaultVendors: {
          // 组名
          test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
          priority: -10, // 权重（越大越高）
          reuseExistingChunk: true, // 如果当前chunk包含已从主bundle中拆分出的模块，则它将被重用，而浊 生成新的模块
        },
        default: {
          // 其他没有写的配置会使用上面的默认值
          minSize: 0,
          minChunks: 2, // 这里的minChunks权重更大
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  mode: "production",
};
