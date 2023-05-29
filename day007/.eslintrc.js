module.exports = {
  // 解析选项
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
  env: {
    es6: true,
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  // 具体检查规则
  rules: {
    "no-var": 2, // 不能使用var变量
  },
  // 继承其他规则
  extends: ["eslint:recommended"],
};
