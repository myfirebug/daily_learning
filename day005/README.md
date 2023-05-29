# 处理 js 资源

webpack 对 js 处理是有限的，只能编译 js 中 ES 模块语法，不能编译其他语法，导致 js 不能在 IE 等浏览器运行，所以希望做一些兼容性处理；

其次开发中，团队代码格式是有严格要求的，我们不能由肉眼去检测代码格式，需要使用专业的工具来检测；

- 针对 js 兼容性处理，使用 babel 来完成
- 针对代码格式，使用 Eslint 来完成

# Eslint

[Eslint 官网](https://zh-hans.eslint.org/):可组装的 javascript 和 JSX 检查工具。
[Eslint 配置](https://www.tkcnn.com/eslint/getting-started.html)

## 安装

[EslintWebpackPlugin](https://webpack.docschina.org/plugins/eslint-webpack-plugin/)

```
npm i eslint-webpack-plugin eslint -D
```

## 配置文件

配置文件有很多种写法：

- .eslintrc.\* 新建文件，位于项目根目录（区别在于配置格式不一样）
  - .eslintrc
  - .eslintrc.js
  - .eslintrc.json
- package.json 中 eslintConfig:不需要创建文件，在原有文件基础上写 Eslint 会查找和自动读取；

## 具体配置

我们以.eslintrc.js 配置文件为例

```
module.exports = {
  // 解析选项
  parserOptions: {},
  // 具体检查规则
  rules: {},
  // 继承其他规则
  extends: []
}
```

1. parserOptions 解析选项

```
parserOptions: {
  ecmaVersion: 6, // es语法版本
  sourceType: 'module', // es 模块化
  ecmaFeatures: { // es 其他特性
    jsx: true // 如果是react项目，就需要开启jsx语法
  }
}
```

2. rules 具体检查规则

[rules 规则文档](https://www.tkcnn.com/eslint/rules.html)

- off 或者 0 关闭规则
- wran 或者 1 开启规则，使用警告级别的错误，wran 不会导致程序退出
- error 或者 2 开发规则，使用错误级别的错误，error 当被触发的时候，程序会退出

```
rules: {
  "semi": "error", // 禁止使用分号
  "array-callback-return": "warn", // 强制数组的回调函数中有return语句
  "default-case": [
    "warn", // 要求 switch 语句中有default分支
    {commentPattern: '^no default$'} // 允许在最后注释no default，就不会有警告
  ],
  eqeqeq: {
    "warn", // 强制使用 === 和 !==
    "smart" // 除了少数情况下不会有警告
  }
}
```

3. extends 继承

继承现有的规则；

现在有以下较为有名的规则：

- [eslint 官方的规则](https://github.com/eslint/eslint/blob/v6.0.1/conf/eslint-recommended.js)： eslint:recommended
- [Vue cli 官方的规则](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint)： plugin:vue/essential
- React cli 官方的规则： react-app

# Babel

[Babel 官网](https://www.babeljs.cn/)javascript 编译器

主要用于将 es6 语法编写的代码转化为向后兼容的 javascript 语法，运行在当前和旧版本的浏览器或其他环境中；

## 安装

[babel-loader](https://webpack.docschina.org/loaders/babel-loader/)

```
npm i babel-loader @babel/core @babel/preset-env -D
```

## 配置文件

配置文件有很多种写法：

- .babel.config.\* 新建文件，位于项目根目录（区别在于配置格式不一样）
  - .babel.config.js
  - .babel.config.json
- .babelrc\* 新建文件，位于项目根目录（区别在于配置格式不一样）
  - .babelrc
  - .babelrc.js
  - .babelrc.json
- package.json 中 eslintConfig:不需要创建文件

## 具体配置

我们以.babel.config.js 配置文件为例

```
module.exports = {
  // 预设
  presets: []
}
```

1. presets 预设

简单理解：就是一组 Babel 插件，扩展 Babel 功能

- @babel/preset-env: 一个智能预设，允许你使用最新的 javascript；
- @babel/preset-react: 一个用来编译 React.jsx 语法的预设；
- @babel/preset-typescript: 一个用来编译 Typescript 语法的预设；
