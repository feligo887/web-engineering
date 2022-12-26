### webpack性能分析工具

1. 打包体积分析：[webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer '点击跳转')

2. 速度分析：[speed-measure-webpack-plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin '点击跳转')

### webpack 性能优化

1. js压缩：[uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin '点击跳转')
或者[terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin '点击跳转')

2. 去掉没有的css：[purgecss-webpack-plugin](https://www.npmjs.com/package/purgecss-webpack-plugin '点击跳转')

3. css压缩：[optimize-css-assets-webpack-plugin](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin '点击跳转')和[CssMinimizerWebpackPlugin](https://www.webpackjs.com/plugins/css-minimizer-webpack-plugin/#root '点击跳转')


4. 图片压缩：[image-webpack-loader](https://github.com/tcoopman/image-webpack-loader#readme '点击跳转')

5. 分割图片：webapck5 [webapck.asset](https://webpack.docschina.org/guides/asset-modules/#root '点击跳转') webpack4 [url-loader](https://www.npmjs.com/package/url-loader '点击跳转')

6. 代码分割：[split-chunks-plugin](https://www.webpackjs.com/plugins/split-chunks-plugin#root '点击跳转')

7. 多入口配置：[html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin '点击跳转')

8. 打包缓存：webpack5 [webapck.cache](https://www.webpackjs.com/configuration/cache/#cacheallowcollectingmemory '点击跳转')、webpack4 [hard-source-webpack-plugin](https://www.npmjs.com/package/hard-source-webpack-plugin?activeTab=readme "点击跳转")代替

9. js分包：[webpack.DllPlugin](https://www.webpackjs.com/plugins/dll-plugin#dllplugin '点击跳转')

10. 多进程/多实例: [thread-loader](https://www.npmjs.com/package/thread-loader?activeTab=readme '点击跳转')或者[webpack.parallel](https://cli.vuejs.org/zh/config/#parallel '点击跳转')


## Tree-Shaking触发

1. 使用 ESM 规范编写模块代码，并且用命名倒出，按需加载
2. 配置 optimization.usedExports 为 true，启动标记功能
3. 启动代码优化功能，可以通过如下方式实现：
    - 配置 mode = production
    - 配置 optimization.minimize = true
    - 提供 optimization.minimizer 数组