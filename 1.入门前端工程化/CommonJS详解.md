### CommonJS规范介绍
- Nodejs默认模块化规范，每个文件就是一个模块，有自己的作用域
- Node中CJS模块加载采用同步加载方式
- 通过require 加载模块，通过 exports 或 module.exports 输出模块
```
const sum = require(' . / sum');

module.exports = sum
```
### CommonJS规范特点
- 所有代码都运行在模块作用域，不会污染全局作用域。
- 模块可以多次加载，第一次加载时会运行模块，模块输出结果会被缓存，再次加载时，会从缓存结果中直接读取模块输出结果。
- 模块加载的顺序，按照其在代码中出现的顺序（同步加载）。
- 模块输出的值是值的拷贝，类似IFE方案中的内部变量（引用对象的bug）

### CommonJS缺点
- module.exports会覆盖module.exports.xx
- 模块输出的值是值的拷贝，所以输出前的值不等于输出后的值
- 浏览器不支持CommonJS，需要对每个cjs文件用 browserify 插件打包

### browserify打包原理
> https://www.npmjs.com/package/browserify

- browserify原理，本质还是通过自执行函数实现模块化
- 将每个模块编号，存入一个对象，每个模块标记依赖模块
- 实现了require方法，核心是通过call方法调用模块，并传入require、module、exports方法或对象，通过module存储模块信息，通过exports存
储模块输出信息

#### 为什么能使用require 关键字方法
1. 把需要加载的对象或者模块使用Nodejs，变成一个module对象
2. module对象中有 load方法，进行模块加载，并在最外层包裹一个自适应函数（IIFE）
3. 这个自适应函数里有下列方法：IIFE ( require, module, exports, _filename,_dirname)

**简单总结：是Node把对象或者模块变成自适应函数并传入 (require, module, exports, _filename,_dirname)，我们才能使用**