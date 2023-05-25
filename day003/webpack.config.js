const path = require("path");
module.exports = {
  // 入口相对路由
  entry: "./src/main.js",
  // 输出
  output: {
    // 文件的输出路径，绝对路由
    // __dirname nodejs的变量，代表当前文件的文件夹目录（day002文件夹）
    path: path.resolve(__dirname, "dist"),
    // 文件名
    filename: "main.js",
  },
  // 加载器
  module: {
    rules: [
      // 处理css
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
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
      {
        test: /\.styl$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 styl 编译成 CSS
          "stylus-loader",
        ],
      },
    ],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "development",
};
