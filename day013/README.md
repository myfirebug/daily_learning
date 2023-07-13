# 优化代码运行性能

# Preload / Prefetch

Preload: 告诉浏览器立即加载资源；
Prefetch：告诉浏览器空闲时才开始加载资源；

共同点：

- 都只会加载资源，并不执行；
- 都有缓存；

区别：

- Preload 加载优先级高，Prefetch 加载优先级低；
- Preload 只能加载当前页面需要使用的资源，Prefetch 可以加载当前页面资源，也可以加载下一个页面需要使用的资源；

总结：

- 当前页面优先级高的资源用 Preload；
- 下一个页面需要使用的资源用 Prefetch；

它们的问题：兼容性较差；可以去 Can I Use 去查看 css,js 兼容性;

### 下载

```
npm i @vue/preload-webpack-plugin -D
```

# netWork Cache

[runtimechunk](https://webpack.docschina.org/configuration/optimization/#optimizationruntimechunk)

在二次打包的过程的，不是所有文件都重新打包一次，只打包修改过的文件；

## 代码

```
...
optimization: {
    ...
    runtimeChunk: {
      runtimeChunk: {
        name: (entrypoint) => `runtime~${entrypoint.name}`,
      },
    }
    ...
  }
...
```
