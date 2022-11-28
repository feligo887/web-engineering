### webpack核心概念
- entry：入口模块文件路径
- output：输出bundle文件路径
- module：模块，webpack构建对象
- bundle：输出文件，webpack构建产物
- chunk：中间文件，webpack构建的中间产物
- loader：文件转换器
- plugin：插件，执行特定任务


### devtool
> https://webpack.docschina.org/configuration/devtool/#root
- source-map 对应打包文件、和打包内容的映射关系

### webpack-loader 解决的问题
- 文件转换让系统（浏览器）识别

### webpack-loader规则
- css打包是用 import 引入到css，由js打包成模块(css-in-js)
- loader执行顺序是从下往上、从右至左


### css-loader源码执行解析
1. 生成 webpack 模块
2. 解析传入的css文件路径，如果有缓存就执行，没有缓存就立即存储在执行
3. 找到相对应的 css 文件路径的解析，相应的source-map代码。
4. 解析source-map代码，生成___CSS_LOADER_EXPORT___ 模块
 
```
//  包含所有的 module 模块
var __webpack_modules__  = ({
 "./src/index.css": ((module, __webpack_exports__, __webpack_require__) => {

        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".app {\\n    width: 100vw;\\n    height: 100vh;\\n    background-color: black;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://webpack-demo/./src/index.css?");
}),

})

//  对已经加载的module 进行缓存
var __webpack_module_cache__ = {}

/**
 * 模块加载方法
 * @param {*} moduleId __webpack_modules__下的css引用路径
**/ 

function __webpack_require__(moduleId) {
    // 先查询是否有缓存
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
        return cachedModule.exports;
    }
    // 在缓存中没有找到，那就在缓存中创建
    var module = __webpack_module_cache__[moduleId] = {
        id: moduleId,
        // no module.loaded needed
        exports: {}
    };

    // 调用函数 找到相应的模块
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    // Return the exports of the module
    return module.exports;
}

//
(()=> {
    // getDefaultExport function for compatibility with non-harmony modules
 		__webpack_require__.n = (module) => {
 			var getter = module && module.__esModule ?
 				() => (module['default']) :
 				() => (module);
 			__webpack_require__.d(getter, { a: getter });
 			return getter;
})()

//
(() => {
    // define getter functions for harmony exports
    __webpack_require__.d = (exports, definition) => {
        for (var key in definition) {
            if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
}

//
(()=> {
    __webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
})()

// webpack运行时生成命名空间对象
(() => {
    // 导出 __esModule
    __webpack_require__.r = (exports) => {
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        }
        Object.defineProperty(exports, '__esModule', { value: true });
};
    
})();

// 模块输出
var __webpack_exports__ = __webpack_require__("./src/index.js");
```

### style-loader源码执行解析
- 调用style-loader里 DomApi获取 DOM信息 （domAPI、insert、insertStyleElement、setAttributes、styleTagTransform）
- 调用 style-loader 内置方法传入(list,options),其中list是cscs文件路径和引用的模块索引；options 是 DomApi获取的Dom信息
- 调用 modulesToDom(list,options），循环参数，把数据装成一个obj
- 调用 addElementStyle (obj,options），调用 insertStyleElement(options)生成style标签到head，
- insertStyleElement 生成style标签，是使用domAPI函数里面的方法，updata和remove的 updata方法拼接css和source-map的信息，调用styleTaqTransform(css,styleElement) 创建style 节点，把css代码插入到style标签，浏览器开始重绘和重排

### loader的内联调用
```
import 'style-loader!css-loader!./index. css";
```

### webpack plugin解决的问题
- webpack构建生命周期动能定制问题。webpack本身就是一个构建过程的状态机，其自身的核心功能也是构建在loader和plugin的机制上。

### webpack hooks
- compiler钩子：https://webpack.docschina.org/api/compiler-hooks/
- compilation钩子：https://webpack.docschina.org/api/compilation-hooks/