# webpack 大核心概念

- entry(入口)：指 webpack 从哪个文件开始打包；
- output(输出)：指 webpack 打包完的文件输出到哪里去，如何命令等；
- loader(加载器)：webpack 本身只能处理 js、json 等资源，其他资源需要借助 loader，webpack 才能解析；
- plugin(插件)：扩展 webpack 的功能；
- mode(模式)：开发环境：development，生产模式：production；

# 准备 webpack 配置文件

在项目根目录新建文件：webpack.config.js

```
module.exports = {
  // 入口
  entry: "",
  // 输出
  output: {},
  // 加载器
  module: {
    rules: [],
  },
  // 插件
  plugins: [],
  // 模式
  mode: '',
};
```

# 开发模式

- 编译代码，使浏览器能识别运行

开发时我们有样式资源、字体图标、图片资源等，webpack 默认都不能处理这些资源，所以我们要加载配置来编译这些资源；

- 代码质量检查，树立代码规范

提前检查代码的一些隐患，让代码运行时能更加健壮；

提前检查代码规范和格式，统一团队编码风格，让代码更优雅美观；
