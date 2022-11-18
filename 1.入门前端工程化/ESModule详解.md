### CommonJS和ESModule规范对比
1. CommonJS模块输出的是值的拷贝，ES Module输出的是值的引用
2. CommonJS 模块是运行时加载，ES Module编译时输出接口
3. CommonJS 是单个值导出，ES Module可以导出多个
4. CommonJS 模块为同步加载，ES Module支持异步加载(支持Promise)
5. CommonJS 的this 是当前模块，ES Module的this 是
undefined
6. CommonJS 和ESe Module 的语法不同

### 脚本和模块对比
1. 模块具备更高的开发效率（可读性强、复用高效）
2. 脚本具有更高的页面性能（模块文件多，加载速度慢）
3. 模块在浏览器中运行会存在兼容性问题，要特别注意

### 浏览器模块化的局限
1. 缺乏模块管理能力，模块分散在各个项目中
2. 性能加载慢，无法大型项目中直接使用
**这两个问题是npm 和webpack 核心解决的问题**