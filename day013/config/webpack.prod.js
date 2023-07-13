const os = require("os");
// 压缩js
const terserWebpackPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require("path");
const { tools } = require("./utils");
const assetPath = "../";
const { getStyleLoader } = tools;
// cpu核数
const threads = os.cpus().length;
console.log(threads, "threads");

module.exports = {
  // 入口相对路由
  entry: "./src/main.js",
  // 输出
  output: {
    // 文件的输出路径，绝对路由
    // __dirname nodejs的变量，代表当前文件的文件夹目录（day002文件夹）
    path: path.resolve(__dirname, assetPath + "dist"),
    // 入口打包输出的文件名
    filename: "static/js/[name].js",
    // chunk文件名称
    chunkFilename: "static/js/[name].chunk.js",
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
            use: getStyleLoader(),
          },
          // 加载less
          {
            test: /\.less$/i,
            use: getStyleLoader("less-loader"),
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
  optimization: {
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩js
      new terserWebpackPlugin({
        parallel: threads, // 开启多进程
      }),
    ],
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      runtimeChunk: {
        name: (entrypoint) => `runtime~${entrypoint.name}`,
      },
    },
  },
  // 插件
  plugins: [
    new ESLintPlugin({
      exclude: "node_modules",
      context: path.resolve(__dirname, assetPath + "src"),
      cache: true,
      threads, // 开启多进程
    }),
    new HtmlWebpackPlugin({
      // 模板：以public/index.html文件创建新的html文件
      // 新的文件特点：结构和原来一致，自动引入打包出的资源
      template: path.resolve(__dirname, assetPath + "public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[name].chunk.css",
    }),
  ],
  // 模式
  mode: "production",
  devtool: "source-map",
};
