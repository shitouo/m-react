/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./project/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./project/index.js":
/*!**************************!*\
  !*** ./project/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_MReact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/MReact */ "./src/MReact.js");


_src_MReact__WEBPACK_IMPORTED_MODULE_0__["default"].render(_src_MReact__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(
  'div',
  null,
  '1111',
  _src_MReact__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(
    'h1',
    null,
    'hello world!'
  )
), document.getElementById('root'));

/***/ }),

/***/ "./src/Constance.js":
/*!**************************!*\
  !*** ./src/Constance.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * 常量
 */
class Constance {
  constructor() {
    this.effects = {
      NoEffect: 0
    };
    this.tags = {
      HostRoot: 3,
      ClassComponent: 2,
      FunctionalComponent: 1
    };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Constance);

/***/ }),

/***/ "./src/FiberNode.js":
/*!**************************!*\
  !*** ./src/FiberNode.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * fiber节点类
 */
const NoEffect = 0;

class FiberNode {
    constructor(tag, pendingProps) {
        this.tag = tag;
        this.type = null;
        this.stateNode = null;

        this.return = null;
        this.child = null;
        this.sibling = null;

        this.pendingProps = pendingProps;
        this.memorizedProps = null;
        this.memorizedState = null;

        this.effectTag = NoEffect;

        this.alternate = null;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (FiberNode);

/***/ }),

/***/ "./src/MReact.js":
/*!***********************!*\
  !*** ./src/MReact.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FiberNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FiberNode */ "./src/FiberNode.js");
/* harmony import */ var _Constance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constance */ "./src/Constance.js");
/**
 * MReact的主文件
 */



const constance = new _Constance__WEBPACK_IMPORTED_MODULE_1__["default"]();
const NoWork = 0;

class MReact {
  render(elements, container) {
    // 1、把elements生成Fiber tree
    // 2、解析
    // 3、commit
    // this.elements2FiberTree(elements)
    // 先实现将jsx转为reactElement，然后插入到页面中
    if (typeof elements === 'string') {
      console.log(elements);
      container.innerHTML = elements;
      return;
    }
    if (typeof elements === 'object') {
      const dom = document.createElement(elements.type);
      if (elements.props && elements.props.children) {
        const children = elements.props.children;
        children.forEach(item => {
          this.render(item, dom);
        });
      }
      container.appendChild(dom);
    }
  }

  createElement(type, config, ...children) {
    let props = {};
    if (config) {
      props.config = config;
    }
    if (children) {
      props.children = children;
    }
    return {
      type,
      props
    };
  }

  elements2FiberTree(elements) {}

  createFiberRoot(containerInfo) {
    // let uninitiallizedFiber = new FiberNode(constance.tags.HostRoot,constance.effects.NoEffect)
    // let root = {
    //   current: uninitiallizedFiber,
    //   containerInfo: containerInfo,
    //   finishedWork: null,
    //   remainingExpirationTime: NoWork,
    //   firstBatch: null
    // }
    // uninitiallizedFiber.stateNode = root
    // return root
  }

  Reconciler() {}

  commit() {}

}

/* harmony default export */ __webpack_exports__["default"] = (new MReact());

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map