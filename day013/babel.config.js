module.exports = {
  // 智能预设
  presets: [
    [
      "@babel/preset-env",
      {
        // 按需加载自动引入
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
  ],
};
