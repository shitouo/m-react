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
/* harmony import */ var _src_MReactDom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/MReactDom */ "./src/MReactDom.js");
/* harmony import */ var _src_MReact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/MReact */ "./src/MReact.js");



_src_MReactDom__WEBPACK_IMPORTED_MODULE_0__["default"].render(111111, document.getElementById('root'));

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
      NoEffect: 0,
      Placement: 2,
      Incomplete: 512,
      PerformedWork: 1,
      Update: 4,
      Deletion: 8
    };
    this.tags = {
      HostRoot: 3,
      ClassComponent: 2,
      FunctionalComponent: 1,
      HostText: 6
    };
    this.works = {
      NoWork: 0
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
/* harmony import */ var _Constance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constance */ "./src/Constance.js");
/**
 * fiber节点类
 */


const constance = new _Constance__WEBPACK_IMPORTED_MODULE_0__["default"]();

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
        this.updateQuene = null;

        this.effectTag = constance.effects.NoEffect;
        this.nextEffect = null;
        this.firstEffect = null;
        this.lastEffect = null;

        this.expirationTime = constance.works.NoWork;

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
/**
 * MReact的主文件
 */
const REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for ? Symbol.for('react.element') : 0xeac7;

class MReact {
  createElement(type, config, ...children) {
    let props = {};
    if (config) {
      for (let propName in config) {
        if (config.hasOwnProperty(propName)) {
          props[propName] = config[propName];
        }
      }
    }
    if (children) {
      props.children = children;
    }
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      props
    };
  }
}

/* harmony default export */ __webpack_exports__["default"] = (new MReact());

/***/ }),

/***/ "./src/MReactDom.js":
/*!**************************!*\
  !*** ./src/MReactDom.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ReactRoot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ReactRoot */ "./src/ReactRoot.js");
/**
 * 自造的reactDom
 */


class MReactDom {
  render(elements, container) {
    // 1、把reactElement，转成Fiber tree
    // 2、解析
    // 3、commit

    // 先生成reactRoot，然后调用ReactRoot的render
    let reactRoot = new _ReactRoot__WEBPACK_IMPORTED_MODULE_0__["default"](container);
    reactRoot.render(elements); // 在调用到这的时候，elements已经通过babel和MReact.createElement生成reactElement了。
  }
}

/* harmony default export */ __webpack_exports__["default"] = (new MReactDom());

/***/ }),

/***/ "./src/ReactRoot.js":
/*!**************************!*\
  !*** ./src/ReactRoot.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FiberNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FiberNode */ "./src/FiberNode.js");
/* harmony import */ var _Constance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constance */ "./src/Constance.js");
/* harmony import */ var _ScheduleWork__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ScheduleWork */ "./src/ScheduleWork.js");
/**
 * react的root类
 */




const constance = new _Constance__WEBPACK_IMPORTED_MODULE_1__["default"]();
const scheduleWork = new _ScheduleWork__WEBPACK_IMPORTED_MODULE_2__["default"]();

let isWorking = false;
let isCommiting = false;

class ReactRoot {
  constructor(containerInfo) {
    this._internalRoot = this.createFiberRoot(containerInfo);
    this.nextUnitOfWork = null;
  }

  createFiberRoot(containerInfo) {
    // 创建带fiber的root对象
    const rootFiber = new _FiberNode__WEBPACK_IMPORTED_MODULE_0__["default"](constance.tags.HostRoot, null);
    const root = {
      current: rootFiber,
      containerInfo: containerInfo,
      pendingChildren: null,
      pendingCommitExpirationTime: constance.works.NoWork,
      finishedWork: null,
      remainingExpirationTime: constance.works.NoWork,
      firstBatch: null,
      nextScheduleRoot: null
    };
    rootFiber.stateNode = root;
    return root;
  }

  scheduleRootUpdate(current, element, expirationTime) {
    const update = {
      expirationTime: expirationTime,
      partialState: { element: element },
      callback: null,
      isReplace: false,
      isForced: false,
      capturedValue: null,
      next: null
    };
    const quene = {
      baseState: null,
      expirationTime: expirationTime,
      first: update,
      last: update,
      callbackList: null,
      hasForceUpdate: false,
      isInitialized: false,
      capturedValues: null
    };
    current.updateQuene = quene;
  }

  render(children) {
    this.scheduleRootUpdate(this._internalRoot.current, children, 1);
    this.nextUnitOfWork = this.createWorkInProgress(this._internalRoot.current, null, 1);
    scheduleWork.workLoop(this.nextUnitOfWork);
    this.commitRoot(this._internalRoot.current.alternate);
  }

  createWorkInProgress(current, pendingProps, expirationTime) {
    // 创建alternate的fiber
    let workInProgress = current.alternate;
    if (workInProgress === null) {
      workInProgress = new _FiberNode__WEBPACK_IMPORTED_MODULE_0__["default"](current.tag, pendingProps);
      workInProgress.type = current.type;
      workInProgress.stateNode = current.stateNode;
      workInProgress.alternate = current;
      current.alternate = workInProgress;
    } else {
      workInProgress.pendingProps = pendingProps;
      workInProgress.effectTag = constance.effects.NoEffect;
      workInProgress.nextEffect = null;
      workInProgress.firstEffect = null;
      workInProgress.lastEffect = null;
    }
    workInProgress.expirationTime = expirationTime;
    workInProgress.child = current.child;
    workInProgress.sibling = current.sibling;
    // workInProgress.return = current.return
    workInProgress.memorizedProps = current.memorizedProps;
    workInProgress.memorizedState = current.memorizedState;
    workInProgress.updateQuene = current.updateQuene;

    return workInProgress;
  }

  commitRoot(finishedWork) {
    isWorking = true;
    isCommiting = true;

    let root = finishedWork.stateNode;
    let committedExpirationTime = root.pendingCommitExpirationTime;
    root.pendingCommitExpirationTime = constance.works.NoWork;

    let firstEffect = null;
    if (finishedWork.effectTag > constance.effects.PerformedWork) {
      // 当前root也有修改
      if (finishedWork.lastEffect) {
        finishedWork.lastEffect.nextEffect = finishedWork;
        firstEffect = finishedWork.firstEffect;
      } else {
        firstEffect = finishedWork;
      }
    } else {
      // 当前root没有修改
      firstEffect = finishedWork.firstEffect;
    }

    let nextEffect = firstEffect;
    while (nextEffect) {
      let effectTag = nextEffect.effectTag;
      let primaryEffectTag = effectTag & (constance.effects.Placement | constance.effects.Update | constance.effects.Deletion);
      switch (primaryEffectTag) {
        case constance.effects.Placement:
          {
            this.commitPlacement(nextEffect);
            nextEffect.effectTag &= ~constance.effects.Placement; // 去掉当前任务
            break;
          }
      }
      nextEffect = nextEffect.nextEffect;
    }
  }

  commitPlacement(finishedWork) {
    this._internalRoot.containerInfo.appendChild(finishedWork.stateNode);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (ReactRoot);

/***/ }),

/***/ "./src/ScheduleWork.js":
/*!*****************************!*\
  !*** ./src/ScheduleWork.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constance */ "./src/Constance.js");
/* harmony import */ var _FiberNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FiberNode */ "./src/FiberNode.js");
/**
 * 调度工作
 */



const constance = new _Constance__WEBPACK_IMPORTED_MODULE_0__["default"]();
let isRootReadyForCommit = false;

class ScheduleWork {
  workLoop(nextUnitOfWork) {
    while (nextUnitOfWork !== null) {
      nextUnitOfWork = this.performUnitOfWork(nextUnitOfWork);
    }
  }

  performUnitOfWork(workInProgress) {
    const next = this.beginWork(workInProgress.alternate, workInProgress, 1);

    if (next === null) {
      // 当前分支解析到叶子结点了，返回efftces给return，并寻找其他分支还未解析的节点
      this.completeUnitOfWork(workInProgress);
    }

    return next;
  }

  completeUnitOfWork(workInProgress) {
    // 合并当前effects到return上，然后找到其他还未解析的fiber节点
    while (true) {
      let current = workInProgress.alternate;
      let returnFiber = workInProgress.return;
      let siblingFiber = workInProgress.siblings;

      if ((workInProgress.effectTag & constance.effects.Incomplete) === constance.effects.NoEffect) {
        // 当前节点已经完成
        // 处理当前节点，做好commit前的准备工作
        let next = this.completeWork(current, workInProgress);
        if (next) {}
        // 要保证return的所有子节点都complete，才会合并effects提交
        if (returnFiber && (returnFiber.effectTag & constance.effects.Incomplete) === constance.effects.NoEffect) {
          // 合并children的effects到return
          if (returnFiber.firstEffect === null) {
            returnFiber.firstEffect = workInProgress.firstEffect;
          }
          if (workInProgress.lastEffect) {
            if (returnFiber.lastEffect) {
              returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
            }
            returnFiber.lastEffect = workInProgress.lastEffect;
          }
        }
        // 合并自身的effects到return，并且是在children的后面
        const effectTag = workInProgress.effectTag;
        if (effectTag > constance.effects.PerformedWork) {
          if (returnFiber.lastEffect) {
            returnFiber.lastEffect.nextEffect = workInProgress; // 这里的结构类似于链表结构
          } else {
            returnFiber.firstEffect = workInProgress;
          }
          returnFiber.lastEffect = workInProgress;
        }

        if (siblingFiber) {
          return siblingFiber;
        } else if (returnFiber) {
          workInProgress = returnFiber;
          continue;
        } else {
          // reached the root
          isRootReadyForCommit = true;
          return null;
        }
      }

      return null;
    }
  }

  completeWork(current, workInProgress, renderExpirationTime) {
    const newProps = workInProgress.pendingProps;
    switch (workInProgress.tag) {
      case constance.tags.HostText:
        {
          let newText = newProps;
          if (current && workInProgress.stateNode !== null) {} else {
            // TODO: 后面要采用栈的形式来获取ContainerInstance
            const _rootContainerInstance = document.getElementById('root');
            workInProgress.stateNode = this.createTextInstance(newText, workInProgress);
          }
          return null;
        }
    }
  }

  createTextInstance(text, internalInstanceHandle) {
    const randomKey = Math.random().toString(36).slice(2);
    const internalInstanceKey = '__reactInternalInstance$' + randomKey;
    const textNode = document.createTextNode(text);
    textNode[internalInstanceKey] = internalInstanceHandle;
    return textNode;
  }

  beginWork(current, workInProgress, renderExpirationTime) {
    switch (workInProgress.tag) {
      case constance.tags.HostRoot:
        return this.updateHostRoot(current, workInProgress, renderExpirationTime);
      case constance.tags.HostText:
        return this.updateHostText(current, workInProgress);
    }
  }

  updateHostText(current, workInProgress) {
    workInProgress.memorizedProps = workInProgress.pendingProps;
    return null;
  }

  updateHostRoot(current, workInProgress, renderExpirationTime) {
    let updateQuene = workInProgress.updateQuene;
    if (updateQuene) {
      const prevState = workInProgress.memorizedState;
      const state = this.processUpdateQuene(current, workInProgress, updateQuene, null, null, renderExpirationTime);
      workInProgress.memorizedState = state;
      updateQuene = workInProgress.updateQuene;

      let element = state.element;

      this.reconcileChildren(current, workInProgress, element);
    }
    return workInProgress.child;
  }

  processUpdateQuene(current, workInProgress, quene, instance, props, renderExpirationTime) {
    const currentQuene = quene;
    quene = workInProgress.updateQuene = {
      baseState: currentQuene.baseState,
      expirationTime: currentQuene.expirationTime,
      first: currentQuene.first,
      last: currentQuene.last,
      isInitialized: currentQuene.isInitialized,
      capturedValues: currentQuene.capturedValues,
      // These fields are no longer valid because they were already committed.
      // Reset them.
      callbackList: null,
      hasForceUpdate: false
    };

    quene.expirationTime = constance.works.NoWork;

    let state = null;
    if (quene.isInitialized) {
      state = quene.baseState;
    } else {
      state = quene.baseState = workInProgress.memorizedState;
      quene.isInitialized = true;
    }
    let dontMutatePrevState = true;
    let update = quene.first;
    let didSkip = false;

    while (update) {
      let updateExpirationTime = update.expirationTime;
      if (updateExpirationTime > renderExpirationTime) {}

      if (!didSkip) {
        quene.first = quene.next;
        if (quene.first === null) {
          quene.last = null;
        }
      }

      // process the update
      let _partialState = null;
      if (update.isReplace) {} else {
        _partialState = update.partialState;
        if (_partialState) {
          if (dontMutatePrevState) {
            state = Object.assign({}, state, _partialState);
          }
        }
        dontMutatePrevState = false;
      }
      if (update.isForced) {
        queue.hasForceUpdate = true;
      }
      update = update.next;
    }

    if (!didSkip) {
      didSkip = true, quene.baseState = state;
    }
    return state;
  }

  reconcileChildren(current, workInProgress, nextChildren) {
    if (current === null) {} else {
      workInProgress.child = this.reconcileChildFibers(workInProgress, current.child, nextChildren, 1);
    }
  }

  reconcileChildFibers(returnFiber, currentFirstChild, newChild, expirationTime) {
    if (newChild && typeof newChild === 'object') {}

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      let newFiber = this.reconcileSingleTextNode(returnFiber, currentFirstChild, newChild, expirationTime);
      this.placeSingleChild(newFiber);
      return newFiber;
    }
  }

  placeSingleChild(newFiber) {
    newFiber.effectTag = constance.effects.Placement;
  }

  reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, expirationTime) {
    if (currentFirstChild && currentFirstChild.tag === constance.tags.HostText) {}
    let created = this.createFiberFromText(textContent, null, expirationTime);
    created.return = returnFiber;
    return created;
  }

  createFiberFromText(content, mode, expirationTime) {
    const fiber = new _FiberNode__WEBPACK_IMPORTED_MODULE_1__["default"](constance.tags.HostText, content);
    fiber.expirationTime = expirationTime;
    return fiber;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ScheduleWork);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map