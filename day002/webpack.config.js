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
    rules: [],
  },
  // 插件
  plugins: [],
  // 模式
  mode: "development",
};
