# webpack5 和 webpack4 的差异
### 1. webpack5 优化代码打包，会按需打入需要的代码

### 2. webpack5 升级了cache属性文件压缩策略更优，分割文件后的 vendor体积更小，缓存性能和功能都更优。

### 3. webpack5 自带资源模块处理(asset module)

### 4. webpack5 新引用方式(URIs) 可以在编译的时候静态编码、支持file协议、
- 支持data：支持 Base64 或原始编码。Mimetype 可以在module.rule中被映射到加载器和模块支持。

- 支持file协议：支持引用本地资源文件（需要绝对路径）

- 支持http(s)：需要通过new webpack.experiments.schemesHttp(s)UriPlugin()选择加入，**默认情况下，当目标为"web"时，这些 URI 会导致对外部资源的请求（它们是外部资源）**

##### 支持data: 静态编码
```
// webpack5 可以直接静态编码，减少浏览器处理
import data from 'data: text/javascript, export default "hello webpack"

import data1 from 'data: text/javascript, export default function (){ return { a: 1} }'
```

##### 支持 file协议（需要绝对路径）
```
import avatar from "file:///Users/sam/WebstormProjects?
s/fe_enge_source_code/chapter12/webpack-new-feature/img/avatar.jpg";

// https
// webpack.config.js
experimints: {
    buildHTTP: {
        allowedUris:[
        "https://tast-learn-oss.voubaobaoxvz/",
        "http://hp.hpbb.me//upload/20171108173745476048.jpeg?x-oss-proces"
        ]
        frozen: false, 
        cacheLocation: false,
        upgrade:true
    },
}

// a.js
import module from 'https://imooc-dev.youbaobao.xyz/test/moduleA.js' ;
console. log ('moduleA.js:', module.a + 2);
```

### 5. 需高效的Treeshaking：webapck5 对文件引入副作用的处理 [webpack.sideEffects](https://webpack.docschina.org/guides/tree-shaking/#mark-the-file-as-side-effect-free])


### 6. 模块联邦: [Module Federated](https://webpack.docschina.org/concepts/module-federation/ '点击跳转')

##### 子应用-外部模块
```
// 子应用-外部模块
//  webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: '/dist',
  },
    devServer: {
    port: 3000,
    host: '127.0.0.1',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
      filename: 'index.html',
      minify: {
        removeComments: true // 删除注释
      }
    }),
    new ModuleFederationPlugin({
        filaname:'module-child.js', //  要操作的目标文件(这里的文件是你自己打包后的文件名字)
        name: 'app-child',
        exposes: { // 对外暴漏的模块信息
            app-module-child: './module-child.js'
        },
    })
  ]
}
```

```
// 子应用-外部模块
//module-child.js
console.log(子应用运行中...);

export default {
    name: 'module-child'
}
```


##### 主应用
```
// 主应用
//  webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: '/dist',
  },
  devServer: {
    port: 3001,
    host: '127.0.0.1',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
      filename: 'index.html',
      minify: {
        removeComments: true // 删除注释
      }
    }),
    new ModuleFederationPlugin({
        filaname:'module-main.js',
        name: 'app-main',
        remotes: { // 这里的名字是在主应用里，调用时候用的名字
            app-main: 'app-main@http://127.0.0.1:3000/module-child.js'
        },
    })
  ]
}
```

```
// 主应用
// module-main.js
console.log(主应用运行中...);
import('app-main/app-module-child').then((res) => {
const MeduleChild = res.default;
console.log (MeduleChild);
})
```
### 7. 支持全新的node.js生态特性[Package exports](https://webpack.docschina.org/guides/package-exports/#root '点击跳转')
```
// webpack5
// package.json
"exports": {
    "require": "a.js"
    "import": "b.js"
}
// 一个代码库可以同时倒出几种不同模块规则的的包，例如： require=common.js import= ESmodule，
// 根据使用这的引用关键字会倒出不同规则模块的代码包
```