const os = require("os");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
// cpu核数
const threads = os.cpus().length;
const assetPath = "../";
module.exports = {
  // 入口相对路由
  entry: "./src/main.js",
  // 输出
  output: {
    // 文件的输出路径，绝对路由
    // __dirname nodejs的变量，代表当前文件的文件夹目录（day002文件夹）
    path: undefined,
    // 入口打包输出的文件名
    filename: "static/js/[name].js",
    // 图片，字体，通过type：asset处理的资源全名方式
    assetModuleFilename: "static/media/[hash:6][ext][query]",
    // 打包前将path的整个目录内容清空，在进行打包
    clean: true,
  },
  // 加载器
  module: {
    rules: [
      {
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
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb转成base64
              },
            },
          },
          {
            test: /\.(ttf|woff2?)$/,
            type: "asset/resource",
          },
          {
            test: /\.(mp3|mp4|avi)$/,
            type: "asset/resource",
          },
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
          },
        ],
      },
    ],
  },
  // 插件
  plugins: [
    new ESLintPlugin({
      exclude: "node_modules",
      context: path.resolve(__dirname, assetPath + "src"),
      threads, // 开启多进程
    }),
    new HtmlWebpackPlugin({
      // 模板：以public/index.html文件创建新的html文件
      // 新的文件特点：结构和原来一致，自动引入打包出的资源
      template: path.resolve(__dirname, assetPath + "public/index.html"),
    }),
  ],
  // 模式
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    host: "localhost", // 启动服务域名
    open: true, // 启动服务端口
    port: 9000, // 是否自动打开浏览器
    hot: true,
  },
};
