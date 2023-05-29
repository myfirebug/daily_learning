const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  // 入口相对路由
  entry: "./src/main.js",
  // 输出
  output: {
    // 文件的输出路径，绝对路由
    // __dirname nodejs的变量，代表当前文件的文件夹目录（day002文件夹）
    path: path.resolve(__dirname, "dist"),
    // 入口打包输出的文件名
    filename: "main.js",
    // 打包前将path的整个目录内容清空，在进行打包
    clean: true,
  },
  // 加载器
  module: {
    rules: [
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
  // 插件
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, "src"),
    }),
    new HtmlWebpackPlugin({
      // 模板：以public/index.html文件创建新的html文件
      // 新的文件特点：结构和原来一致，自动引入打包出的资源
      template: path.resolve(__dirname, "public/index.html"),
    }),
  ],
  // 模式
  mode: "development",
  devServer: {
    host: "localhost", // 启动服务域名
    open: true, // 启动服务端口
    port: 9000, // 是否自动打开浏览器
  },
};
