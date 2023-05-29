# 开发服务器&自动化

## 下载包

[webpack-dev-server](https://webpack.docschina.org/configuration/dev-server/)

```
npm i webpack-dev-server -D
```

## 配置

```
...
devServer: {
    host: "localhost", // 启动服务域名
    open: true, // 启动服务端口
    port: 9000, // 是否自动打开浏览器
  }
...
```
