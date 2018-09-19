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

/***/ "./project/App.js":
/*!************************!*\
  !*** ./project/App.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_MReact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/MReact */ "./src/MReact.js");


class App extends _src_MReact__WEBPACK_IMPORTED_MODULE_0__["default"].Component {
  constructor() {
    super();
    this.state = {
      'content': 111
    };
  }

  getDerivedStateFromProps() {}

  componentDidMount() {
    this.setState({
      'content': '222'
    });
  }

  render() {
    return _src_MReact__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(
      'div',
      null,
      this.state.content
    );
  }
}

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

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
/* harmony import */ var _App_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App.js */ "./project/App.js");




_src_MReactDom__WEBPACK_IMPORTED_MODULE_0__["default"].render(_src_MReact__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(_App_js__WEBPACK_IMPORTED_MODULE_2__["default"], null), document.getElementById('root'));

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
      PlacementAndUpdate: 6,
      Incomplete: 512,
      PerformedWork: 1,
      Update: 4,
      Deletion: 8,
      Callback: 32,
      Snapshot: 2048
    };
    this.tags = {
      HostRoot: 3,
      ClassComponent: 2,
      FunctionalComponent: 1,
      HostText: 6,
      HostComponent: 5
    };
    this.works = {
      NoWork: 0
    };
    this.$$types = {
      REACT_ELEMENT_TYPE: typeof Symbol === 'function' && Symbol.for ? Symbol.for('react.element') : 0xeac7,
      REACT_PORTAL_TYPE: typeof Symbol === 'function' && Symbol.for ? Symbol.for('react.portal') : 0xeaca
    };

    this.mode = {
      sync: 1
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
/* harmony import */ var _Constance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constance */ "./src/Constance.js");
/**
 * MReact的主文件
 */


const constance = new _Constance__WEBPACK_IMPORTED_MODULE_0__["default"]();

let didWarnStateUpdateForUnmountedComponent = {};

const ReactNoopUpdateQuene = {
  isMounted() {
    return false;
  },
  warnNoop(publicInstance, callerName) {
    const _constructor = publicInstance.constructor;
    const componentName = _constructor && (_constructor.name || _constructor.displayName) || 'ReactClass';
    const warningKey = `&{componentName}.${callerName}`;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return false;
    }
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  },
  enqueueForceUpdate(publicInstance, callback) {
    this.warnNoop(publicInstance, 'forceUpdate');
  },
  enqueueSetState(publicInstance, partialState, callback) {
    this.warnNoop(publicInstance, 'setState');
  }
};

class Component {
  // 所有的组件都要继承这个类，因为这个类上有setState和forceUpdate
  constructor(props, context, updater) {
    this.props = props;
    this.context = context;
    this.updater = updater || ReactNoopUpdateQuene;
  }
  setState(partialState, callback) {
    this.updater.enqueueSetState(this, partialState, callback);
  }
  forUpdate(callback) {
    this.updater.enqueneForceUpdate(this, callback);
  }
}

const MReact = {
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
      if (children.length === 1) {
        props.children = children[0];
      }
    }
    return {
      $$typeof: constance.$$types.REACT_ELEMENT_TYPE,
      type,
      props
    };
  },
  Component: Component
};

/* harmony default export */ __webpack_exports__["default"] = (MReact);

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


// 定义全局变量
window.lastScheduledRoot = null;
window.firstScheduledRoot = null;
window.nextFlushedRoot = null;
window.nestedUpdateCount = 0;
window.nextFlushedExpirationTime = 0;
window.isRendering = false;
window.nextUnitOfWork = null;
window.isRootReadyForCommit = false;
window.interruptedBy = null;
window.enableGetDerivedStateFromCatch = false;

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

let isWorking = false;
let isCommiting = false;

class ReactRoot extends _ScheduleWork__WEBPACK_IMPORTED_MODULE_2__["default"] {
  constructor(containerInfo) {
    super();
    this._internalRoot = this.createFiberRoot(containerInfo);
    //  this.nextUnitOfWork = null
    this.rootWorkInProgress = null;
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
    current.updateQueue = quene;
    this.scheduleWork(current, expirationTime);
  }

  render(children) {
    this.scheduleRootUpdate(this._internalRoot.current, children, 1);
  }

  renderRoot(root, expirationTime, isAsync) {
    window.nextUnitOfWork = this.createWorkInProgress(root.current, null, 1);
    this.workLoop(false);

    let didCompleteRoot = false;
    window.isWorking = false;

    if (window.nextUnitOfWork === null) {
      // we reached the root
      if (window.isRootReadyForCommit) {
        didCompleteRoot = true;
        root.pendingCommitExpirationTime = expirationTime;
        let finishedWork = root.current.alternate;
        return finishedWork;
      } else {
        // the root did not complete
        window.interruptedBy = null;
      }
    } else {
      window.interruptedBy = null;
      return null;
    }
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
    workInProgress.updateQueue = current.updateQueue;

    return workInProgress;
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
/* harmony import */ var _UpdateWorks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UpdateWorks */ "./src/UpdateWorks.js");
/**
 * 调度工作，控制work的流程
 */



const constance = new _Constance__WEBPACK_IMPORTED_MODULE_0__["default"]();
let isRootReadyForCommit = false;
let isWorking = false;
let isCommiting = false;

class ScheduleWork extends _UpdateWorks__WEBPACK_IMPORTED_MODULE_1__["default"] {
  scheduleWork(fiber, expirationTime) {
    // walk the parent path to the root and update each node's expiration time
    let node = fiber;
    while (node) {
      if (node.expirationTime === constance.works.NoWork || node.expirationTime > expirationTime) {
        node.expirationTime = expirationTime;
      }

      if (node.alternate) {
        let alternate = node.alternate;
        if (alternate.expirationTime === constance.works.NoWork || alternate.expirationTime > expirationTime) {
          alternate.expirationTime = expirationTime;
        }
      }

      if (!node.return) {
        // walk to the top
        if (node.tag === constance.tags.HostRoot) {
          let root = node.stateNode;
          this.requestWork(root, expirationTime);
        }
      }

      node = node.return;
    }
  }

  requestWork(root, expirationTime) {
    // requestWork is called by the scheduler whenever a root receives an update
    // it's up to the renderer to call renderRoot at some point in the future
    this.addRootToSchedule(root, expirationTime);

    if (window.isRendering) {
      // Prevent reentrancy(重新进去). Remaining work will be scheduled at the end of
      // the currently rendering batch.
      return;
    }

    if (window.isBatchingUpdates) {
      // Flush work at the end of the batch.
      return;
    }

    if (expirationTime === constance.mode.sync) {
      this.performeWork(expirationTime, false, null);
    }
  }

  performeWork(minExpirationTime, isAsync, dl) {
    let deadline = dl;

    // keep working on roots until there's no more work, or until we reach the deadline
    this.findHighestPriorityRoot();

    if (isAsync) {
      // TODO
    } else {
      while (window.nextFlushedRoot && window.nextFlushedExpirationTime !== constance.works.NoWork && (minExpirationTime === constance.works.NoWork || minExpirationTime >= window.nextFlushedExpirationTime)) {
        this.performWorkOnRoot(window.nextFlushedRoot, window.nextFlushedExpirationTime, false);
        this.findHighestPriorityRoot();
      }
    }
  }

  performWorkOnRoot(root, expirationTime, isAsync) {
    window.isRendering = true;

    // check if this is async work or sync/expired work
    if (!isAsync) {
      // flush sync work
      let finishedWork = root.finishedWork;
      if (finishedWork) {
        // this root is already complete. we can commit it

      } else {
        root.finishedWork = null;
        finishedWork = this.renderRoot(root, expirationTime, false);
        if (finishedWork) {
          this.completeRoot(root, finishedWork, expirationTime);
        }
      }
    } else {
      // flush async work
    }

    window.isRendering = false;
  }

  completeRoot(root, finishedWork, expirationTime) {
    let firstBatch = root.firstBatch;
    if (firstBatch && firstBatch._expirationTime <= expirationTime) {}
    // TODO


    // commit the root
    root.finishedWork = null;
    root.remainingExpirationTime = this.commitRoot(finishedWork);
  }

  findHighestPriorityRoot() {
    let highestPriorityWork = constance.works.NoWork;
    let highestPriorityRoot = null;
    if (window.lastScheduledRoot) {
      let previousScheduledRoot = window.lastScheduledRoot;
      let root = window.firstScheduledRoot;
      while (root) {
        let remainingExpirationTime = root.remainingExpirationTime;
        if (remainingExpirationTime === constance.works.NoWork) {
          // this root no longer has work. Remove it from the scheduler.
          if (root === root.nextScheduledRoot) {
            // this is the only root in the list
            root.nextScheduleRoot = null;
            window.firstScheduledRoot = window.lastScheduledRoot = null;
            break;
          } else if (root === window.firstScheduledRoot) {
            // this is the first root in the list 
            let next = root.nextScheduleRoot;
            window.firstScheduledRoot = next;
            window.lastScheduledRoot.nextScheduleRoot = next; // 这个链表要永远成环
            root.nextScheduleRoot = null; // ?
          } else if (root === window.lastScheduledRoot) {
            // this is the last root in the list
            window.lastScheduledRoot = previousScheduledRoot;
            window.lastScheduledRoot.nextScheduleRoot = window.firstScheduledRoot;
            root.nextScheduleRoot = null;
            break;
          } else {
            previousScheduledRoot.nextScheduleRoot = root.nextScheduleRoot;
            root.nextScheduleRoot = null;
          }
          root = previousScheduledRoot.nextScheduleRoot;
        } else {
          // this root has more work
          if (highestPriorityWork === constance.works.NoWork || remainingExpirationTime < highestPriorityWork) {
            // update the priority, if it's higher
            highestPriorityWork = remainingExpirationTime;
            highestPriorityRoot = root;
          }
          if (root === window.lastScheduledRoot) {
            break;
          }
          previousScheduledRoot = root;
          root = root.nextScheduleRoot;
        }
      }
    }

    // if the next root is the same as the previous root, this is a nested update. To prevent an infinite loop, increment the nested udpate count
    let previousFlushedRoot = window.nextFlushedRoot;
    if (previousFlushedRoot && previousFlushedRoot === highestPriorityRoot && highestPriorityWork === constance.mode.sync) {
      window.nestedUpdateCount++;
    } else {
      // reset whenever we switch roots
      window.nestedUpdateCount = 0;
    }

    window.nextFlushedRoot = highestPriorityRoot;
    window.nextFlushedExpirationTime = highestPriorityWork;
  }

  addRootToSchedule(root, expirationTime) {
    // add the root to the schedule

    // check if  this root is already part of the schedule
    if (root.nextScheduleRoot === null) {
      // this root is not already scheduled. add it
      root.remainingExpirationTime = expirationTime;
      if (window.lastScheduledRoot === null) {
        window.lastScheduledRoot = window.firstScheduledRoot = root;
        root.nextScheduleRoot = root;
      } else {
        window.lastScheduledRoot.nextScheduleRoot = root;
        window.lastScheduledRoot = root;
        window.lastScheduledRoot.nextScheduleRoot = window.firstScheduledRoot; // 为什么非要让链表成环呢？
      }
    } else {
      // this root is already scheduled, but its priority may have increased
      let remainingExpirationTime = root.remainingExpirationTime;
      if (remainingExpirationTime === constance.works.NoWork || remainingExpirationTime < expirationTime) {
        root.remainingExpirationTime = expirationTime;
      }
    }
  }

  workLoop(isAsync) {
    while (window.nextUnitOfWork !== null) {
      window.nextUnitOfWork = this.performUnitOfWork(window.nextUnitOfWork);
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
          window.isRootReadyForCommit = true;
          return null;
        }
      }

      return null;
    }
  }

  completeWork(current, workInProgress, renderExpirationTime) {
    const newProps = workInProgress.pendingProps;
    const type = workInProgress.type;
    switch (workInProgress.tag) {
      case constance.tags.HostText:
        {
          let newText = newProps;
          if (current && workInProgress.stateNode !== null) {} else {
            // TODO: 后面要采用栈的形式来获取ContainerInstance
            workInProgress.stateNode = this.createTextInstance(newText, workInProgress);
          }
          return null;
        }
      case constance.tags.HostComponent:
        {
          if (current && workInProgress.stateNode) {
            // 之前已经创建了
            let oldProps = current.memorizedProps;
            let _instance = workInProgress.stateNode;
            let updatePayload = this.diffProperties(_instance, workInProgress.tag, oldProps, newProps, null);
            workInProgress.updateQueue = updatePayload;
            if (updatePayload) {
              workInProgress.effectTag |= Update;
            }
          } else {
            if (!newProps) {
              return null;
            }
            workInProgress.stateNode = this.createInstance(type, workInProgress);
            this.appendAllChildren();
            this.finalizeInitialChildren(workInProgress.stateNode, type, newProps);
          }
          return null;
        }
    }
  }

  diffProperties(domElement, tag, lastRawProps, nextRawProps, rootContainerElement) {
    let updatePayload = null;
    let lastProps = void 0;
    let nextProps = void 0;
    switch (tag) {
      default:
        {
          lastProps = lastRawProps;
          nextProps = nextRawProps;
          if (typeof lastProps.onClick !== 'function' || typeof nextProps.onClick === 'function') {
            // TODO
          }
          break;
        }
    }

    let propKey = void 0;
    let styleName = void 0;
    let styleUpdates = null;
    for (propKey in lastProps) {
      if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] === null) {
        continue;
      }
      if (propKey === 'style') {
        // TODO
      } else if (propKey === 'children') {
        // NOOP. This is handled by the clear text mechanism.
      } else {
        (updatePayload = updatePayload || []).push(propKey, null);
      }
    }

    for (propKey in nextProps) {
      let nextProp = nextProps[propKey];
      let lastProp = lastProps ? lastProps[propKey] : undefined; // 之前的属性值
      if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
        continue;
      }
      if (propKey === 'style') {
        // TODO
      } else if (propKey === 'children') {
        if (lastProp !== nextProp && (typeof nextProp === 'string' || typeof nextProp === 'number')) {
          (updatePayload = updatePayload || []).push(propKey, '' + nextProp);
        }
      } else {
        (updatePayload = updatePayload || []).push(propKey, nextProp);
      }
    }

    if (styleUpdates) {
      (updatePayload = updatePayload || []).push('style', styleUpdates);
    }

    return updatePayload;
  }

  beginWork(current, workInProgress, renderExpirationTime) {
    switch (workInProgress.tag) {
      case constance.tags.HostRoot:
        return this.updateHostRoot(current, workInProgress, renderExpirationTime);
      case constance.tags.ClassComponent:
        return this.updateClassComponent(current, workInProgress, renderExpirationTime);
      case constance.tags.HostText:
        return this.updateHostText(current, workInProgress);
      case constance.tags.HostComponent:
        return this.updateHostComponent(current, workInProgress, renderExpirationTime);
    }
  }

  commitRoot(finishedWork, container) {
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

    // 在root消费掉所有的effect
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
        case constance.effects.PlacementAndUpdate:
          {
            // Placement
            this.commitPlacement(nextEffect);
            nextEffect.effectTag &= ~constance.effects.Placement; // 去掉当前任务

            // Update
            let _current = nextEffect.alternate;
            this.commitWork(_current, nextEffect);
          }
      }
      nextEffect = nextEffect.nextEffect;
    }

    // 这里要消费掉所有的生命周期
    nextEffect = firstEffect;
    while (nextEffect) {
      let effectTag = nextEffect.effectTag;

      if (effectTag & (constance.effects.Update | constance.effects.Callback)) {
        // 如果effectTag里面包含Update或者Callback
        let current = nextEffect.alternate;
        this.commitLifeCycles(null, current, nextEffect, null, committedExpirationTime);
      }

      var next = nextEffect.nextEffect;
      // Ensure that we clean these up so that we don't accidentally keep them.
      // I'm not actually sure this matters because we can't reset firstEffect
      // and lastEffect since they're on every node, not just the effectful
      // ones. So we have to clean everything as we reuse nodes anyway.
      nextEffect.nextEffect = null;
      // Ensure that we reset the effectTag here so that we can rely on effect
      // tags to reason about the current life-cycle.
      nextEffect = next;
    }

    isCommiting = false;
    isWorking = false;

    let remainingTime = root.current.expirationTime;
    return remainingTime;
  }

  commitPlacement(finishedWork) {
    document.getElementById('root').appendChild(finishedWork.stateNode);
  }

  commitWork(current, finishedWork) {
    // Update的commit工作
    switch (finishedWork.tag) {
      case constance.tags.ClassComponent:
        {
          return;
        }
      case constance.tags.HostComponent:
        {
          let _instance8 = finishedWork.stateNode;
          if (_instance8) {
            let newProps = finishedWork.memorizedProps;
            let oldProps = current ? current.memorizedProps : newProps;
            let type = finishedWork.type;
            let updatePayload = finishedWork.updateQueue;
            finishedWork.updateQueue = null;
            if (updatePayload) {
              this.commitUpdate(_instance8, updatePayload, type, oldProps, newProps, finishedWork);
            }
          }
          return;
        }
      case constance.tags.HostText:
        {
          let textInstance = finishedWork.stateNode;
          let nextText = finishedWork.memorizedProps;

          let oldText = current ? current.memorizedProps : newText;
          this.commitTextUpdate(textInstance, oldText, newText);
          return;
        }
    }
  }

  commitUpdate(domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
    // update the props handle so that we know which props are the ones with current event handles
    // updateFiberProps
    const randomKey = Math.random().toString(36).slice(2);
    const internalEventHandlersKey = '__reactEventHandlers$' + randomKey;
    domElement[internalEventHandlersKey] = newProps;

    // apply the diff to the dom node
    // updateProperties
    for (let i = 0; i < updatePayload.length; i += 2) {
      let propKey = updatePayload[i];
      let propValue = updatePayload[i + 1];
      if (propKey === 'style') {
        // TODO
      } else if (propKey === 'children') {
        if (propValue) {
          let firstChild = domElement.firstChild;
          if (firstChild && firstChild === node.lastChild && firstChild.nodeType === 3) {
            firstChild.nodeValue = propValue;
            return;
          }
        }
        node.textContent = propValue;
      } else {
        // TODO
      }
    }
  }

  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.nodeValue = newText;
  }

  commitLifeCycles(finishedRoot, current, finishedWork, currentTime, committedExpirationTime) {
    switch (finishedWork.tag) {
      case constance.tags.ClassComponent:
        {
          let _instance2 = finishedWork.stateNode;
          if (finishedWork.effectTag & constance.effects.Update) {
            if (current) {
              // TODO
            } else {
              _instance2.props = finishedWork.memorizedProps;
              _instance2.state = finishedWork.memorizedState;
              _instance2.componentDidMount();
            }
          }

          let updateQueue = finishedWork.updateQueue;
          if (updateQueue) {
            // TODO
          }

          return;
        }
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ScheduleWork);

/***/ }),

/***/ "./src/UpdateWorks.js":
/*!****************************!*\
  !*** ./src/UpdateWorks.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _FiberNode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FiberNode */ "./src/FiberNode.js");
/* harmony import */ var _Constance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constance */ "./src/Constance.js");
/* harmony import */ var _classComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classComponent */ "./src/classComponent.js");
/* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Util */ "./src/Util.js");
/**
 * update类，记录所有节点类型的update方法
 */





const constance = new _Constance__WEBPACK_IMPORTED_MODULE_1__["default"]();
const util = new _Util__WEBPACK_IMPORTED_MODULE_3__["default"]();

class UpdateWorks {
  get updater() {
    const that = this;
    return {
      enqueueSetState: function (instance, partialState, callback) {
        const fiber = instance._reactInternalFiber;
        callback = callback === undefined ? null : callback;
        // var expirationTime = computeExpirationForFiber(fiber);
        // TODO:计算有效期
        const expirationTime = 1;
        var update = {
          expirationTime: expirationTime,
          partialState: partialState,
          callback: callback,
          isReplace: false,
          isForced: false,
          capturedValue: null,
          next: null
        };
        this.insertUpdateIntoFiber(fiber, update);
        this.scheduleWork(fiber, expirationTime);
      }.bind(that)
    };
  }

  insertUpdateIntoFiber(fiber, update, expirationTime) {
    let alternate = fiber.alternate;
    let queue1;
    let queue2;
    if (!alternate) {
      queue1 = fiber.updateQueue;
      queue2 = null;
      if (!queue1) {
        queue1 = fiber.updateQueue = this.createUpdateQueue(fiber.memorizedState);
      }
    } else {
      // there are two owners???
      queue1 = fiber.updateQueue;
      queue2 = alternate.updateQueue;
      if (queue1 === null) {
        if (queue2 === null) {
          // 两个队列都没有
          queue1 = fiber.updateQueue = this.createUpdateQueue(fiber.memorizedState);
          queue2 = alternate.updateQueue = this.createUpdateQueue(alternate.memorizedState);
        } else {
          // queue1没有，queue2有
          queue1 = fiber.updateQueue = this.createUpdateQueue(fiber.memorizedState);
        }
      } else {
        if (queue2 === null) {
          // queue1有，queue2没有
          queue2 = alternate.updateQueue = this.createUpdateQueue(alternate.memorizedState);
        } else {
          // 都有，不做任何操作
        }
      }
    }

    if (queue2 === null || queue1 === queue2) {
      // there's a single queue
      this.appendUpdateToQueue(queue1, update, expirationTime);
    }
  }

  appendUpdateToQueue(queue, update, expirationTime) {
    if (!queue.last) {
      queue.first = queue.last = update;
    } else {
      queue.last.next = update;
      queue.last = update;
    }
    if (queue.expirationTime === constance.works.NoWork || queue.expirationTime > update.expirationTime) {
      queue.expirationTime = update.expirationTime;
    }
  }

  createUpdateQueue(baseState) {
    const queue = {
      expirationTime: constance.works.NoWork,
      baseState: baseState,
      firstUpdate: null,
      lastUpdate: null,
      firstCapturedUpdate: null,
      lastCapturedUpdate: null,
      firstEffect: null,
      lastEffect: null,
      firstCapturedEffect: null,
      lastCapturedEffect: null
    };
    return queue;
  }

  updateHostText(current, workInProgress) {
    workInProgress.memorizedProps = workInProgress.pendingProps;
    return null;
  }

  updateHostRoot(current, workInProgress, renderExpirationTime) {
    let updateQueue = workInProgress.updateQueue;
    if (updateQueue) {
      const prevState = workInProgress.memorizedState;
      const state = util.processUpdateQueue(current, workInProgress, updateQueue, null, null, renderExpirationTime);
      workInProgress.memorizedState = state;
      updateQueue = workInProgress.updateQueue;
      let element;
      if (prevState === state) {
        // if the state is the same as before, that's a bailout because we had no work that expires at this time
        return this.bailoutOnAlreadyFinishedWork(current, workInProgress);
      } else {
        element = state.element;
      }

      this.reconcileChildren(current, workInProgress, element);
    }
    return workInProgress.child;
  }

  bailoutOnAlreadyFinishedWork(current, workInProgress) {
    this.cloneChildFibers(current, workInProgress);
    return workInProgress.child;
  }

  cloneChildFibers(current, workInProgress) {
    if (workInProgress.child === null) {
      return;
    }

    let currentChild = workInProgress.child;
    let newChild = this.createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
    workInProgress.child = newChild;

    newChild.return = workInProgress;
    while (currentChild.sibling) {
      currentChild = currentChild.sibling;
      newChild = newChild.sibling = this.createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime);
      newChild.return = workInProgress;
    }
    newChild.sibling = null;
  }

  updateClassComponent(current, workInProgress, renderExpirationTime) {
    let shouldUpdate; // 标识是否需要更新

    if (!current) {
      // 还未装载过
      if (!workInProgress.stateNode) {
        _classComponent__WEBPACK_IMPORTED_MODULE_2__["default"].constructClassInstance(workInProgress, workInProgress.pendingProps, this.updater);
        _classComponent__WEBPACK_IMPORTED_MODULE_2__["default"].mountClassInstance(workInProgress);

        shouldUpdate = true;
      } else {
        // TODO
      }
    } else {
      // 已经装载过，现在是更新
      shouldUpdate = _classComponent__WEBPACK_IMPORTED_MODULE_2__["default"].updateClassInstance(current, workInProgress, renderExpirationTime);
    }

    return this.finishClassComponent(current, workInProgress, shouldUpdate, null, null, renderExpirationTime);
  }

  finishClassComponent(current, workInProgress, shouldUpdate, hasContext, didCaptureError, renderExpirationTime) {
    // update结束
    const instance = workInProgress.stateNode;
    const nextChildren = instance.render();
    let currentChild = current ? current.child : null;
    this.reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);

    return workInProgress.child;
  }

  updateHostComponent(current, workInProgress, renderExpirationTime) {
    const type = workInProgress.type;
    const memorizedProps = workInProgress.memorizedProps;
    const nextProps = workInProgress.pendingProps;
    const prevPops = current ? current.memorizedProps : null;
    let nextChildren;

    if (memorizedProps !== nextProps) {
      nextChildren = nextProps.children;
      if (typeof nextChildren === 'string' || typeof nextChildren === 'number') {
        nextChildren = null;
      }
    }
    this.reconcileChildren(current, workInProgress, nextChildren);
    return workInProgress.child;
  }

  createTextInstance(text, internalInstanceHandle) {
    const randomKey = Math.random().toString(36).slice(2);
    const internalInstanceKey = '__reactInternalInstance$' + randomKey;
    const textNode = document.createTextNode(text);
    textNode[internalInstanceKey] = internalInstanceHandle;
    return textNode;
  }

  createInstance(type, internalInstanceHandle) {
    const randomKey = Math.random().toString(36).slice(2);
    const internalInstanceKey = '__reactInternalInstance$' + randomKey;
    const textNode = document.createElement(type);
    textNode[internalInstanceKey] = internalInstanceHandle;
    return textNode;
  }

  appendAllChildren(parent, workInProgress) {}

  finalizeInitialChildren(domElement, type, props) {
    let newProps;
    switch (type) {
      case 'img':
      case 'image':
      case 'link':
        {
          break;
        }
      default:
        {
          newProps = props;
          // 根据props设置dom属性
          for (let propKey in newProps) {
            if (!newProps.hasOwnProperty(propKey)) {
              continue;
            }
            switch (propKey) {
              case 'children':
                {
                  domElement.textContent = newProps.children;
                }
            }
          }
        }
    }
  }

  reconcileChildren(current, workInProgress, nextChildren, expirationTime) {
    if (!current) {
      // If this is a fresh new component that hasn't been rendered yet, we
      // won't update its child set by applying minimal side-effects. Instead,
      // we will add them all to the child before it gets rendered. That means
      // we can optimize this reconciliation pass by not tracking side-effects.
      window.shouldTrackSideEffects = false;
      workInProgress.child = this.reconcileChildFibers(workInProgress, null, nextChildren, 1);
    } else {
      window.shouldTrackSideEffects = true;
      workInProgress.child = this.reconcileChildFibers(workInProgress, current.child, nextChildren, 1);
    }
  }

  reconcileChildFibers(returnFiber, currentFirstChild, newChild, expirationTime) {
    // currentFirstChild是本来节点上就有的child，newChild是要新添加上去的child
    if (newChild && typeof newChild === 'object') {
      switch (newChild.$$typeof) {
        case constance.$$types.REACT_ELEMENT_TYPE:
          {
            let newFiber = this.reconcileSingleElement(returnFiber, currentFirstChild, newChild, expirationTime);
            this.placeSingleChild(newFiber);
            return newFiber;
          }
        case constance.$$types.REACT_PORTAL_TYPE:
          {
            // TODO
          }
      }
    }

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      let newFiber = this.reconcileSingleTextNode(returnFiber, currentFirstChild, newChild, expirationTime);
      this.placeSingleChild(newFiber);
      return newFiber;
    }

    return null;
  }

  reconcileSingleElement(returnFiber, currentFirstChild, element, expirationTime) {
    const key = element.key;
    const child = currentFirstChild;

    while (child) {
      // TODO
      break;
    }

    let _create4 = this.createFiberFromElement(element, expirationTime);
    _create4.return = returnFiber;
    return _create4;
  }

  reconcileSingleTextNode(returnFiber, currentFirstChild, textContent, expirationTime) {
    if (currentFirstChild && currentFirstChild.tag === constance.tags.HostText) {}
    let created = this.createFiberFromText(textContent, null, expirationTime);
    created.return = returnFiber;
    return created;
  }

  createFiberFromElement(element, expirationTime) {
    let fiberTag;
    if (typeof element.type === 'function') {
      fiberTag = constance.tags.ClassComponent;
    } else if (typeof element.type === 'string') {
      // TODO
      fiberTag = constance.tags.HostComponent;
    }

    let fiber = new _FiberNode__WEBPACK_IMPORTED_MODULE_0__["default"](fiberTag, element.props);
    fiber.type = element.type;
    fiber.expirationTime = expirationTime;
    return fiber;
  }

  createFiberFromText(content, mode, expirationTime) {
    const fiber = new _FiberNode__WEBPACK_IMPORTED_MODULE_0__["default"](constance.tags.HostText, content);
    fiber.expirationTime = expirationTime;
    return fiber;
  }

  placeSingleChild(newFiber) {
    if (window.shouldTrackSideEffects && newFiber.alternate === null) {
      // 只有在
      newFiber.effectTag = constance.effects.Placement;
    }
    return newFiber;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (UpdateWorks);

/***/ }),

/***/ "./src/Util.js":
/*!*********************!*\
  !*** ./src/Util.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constance */ "./src/Constance.js");
/**
 * 通用的工具函数
 */


const constance = new _Constance__WEBPACK_IMPORTED_MODULE_0__["default"]();

class Util {
  processUpdateQueue(current, workInProgress, quene, instance, props, renderExpirationTime) {
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
      // 遍历所有的update，assign所有的_partialState
      let updateExpirationTime = update.expirationTime;
      if (updateExpirationTime > renderExpirationTime) {}

      if (!didSkip) {
        quene.first = quene.next;
        if (!quene.first) {
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
}

/* harmony default export */ __webpack_exports__["default"] = (Util);

/***/ }),

/***/ "./src/classComponent.js":
/*!*******************************!*\
  !*** ./src/classComponent.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Constance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constance */ "./src/Constance.js");
/* harmony import */ var _Util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Util */ "./src/Util.js");
/**
 * ClassComponent相关方法
 */



const constance = new _Constance__WEBPACK_IMPORTED_MODULE_0__["default"]();
const util = new _Util__WEBPACK_IMPORTED_MODULE_1__["default"]();

const ClassComponent = {
  callGetDerivedStateFromProps(workInProgress, nextProps, prevState) {
    const type = workInProgress.type;
    let partialState;
    if (typeof type.getDerivedStateFromProps === 'function') {
      // 注册了getDerivedStateFromProps
      partialState = type.getDerivedStateFromProps.call(null, nextProps, prevState);
    }
    return partialState;
  },

  constructClassInstance(workInProgress, props, updater) {
    const ctor = workInProgress.type; // 构造器
    let instance = new ctor(props);

    instance.updater = updater;
    workInProgress.stateNode = instance;
    instance._reactInternalFiber = workInProgress;

    let state = instance.state || null;
    workInProgress.memorizedState = state;

    let partialState = this.callGetDerivedStateFromProps(workInProgress, props, state);
    if (partialState) {
      workInProgress.memorizedState = Object.assign({}, state, partialState);
    }
  },

  mountClassInstance(workInProgress) {
    const instance = workInProgress.stateNode;
    const props = workInProgress.pendingProps;

    instance.props = props;
    instance.state = workInProgress.memorizedState;

    if (typeof instance.componentDidMount === 'function') {
      workInProgress.effectTag |= constance.effects.Update;
    }
  },

  updateClassInstance(current, workInProgress, renderExpirationTime) {
    // invokes the update life-cycles and returns false if it should't rerender
    let ctor = workInProgress.type;
    let instance = workInProgress.stateNode;

    instance.props = workInProgress.memorizedProps;
    instance.state = workInProgress.memorizedState;

    let oldProps = workInProgress.memorizedProps;
    let newProps = workInProgress.pendingProps;
    let hasNewLifecycles = typeof ctor.getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function';
    if (!hasNewLifecycles && typeof instance.UNSAFE_componentWillReceiveProps === 'function' && instance.componentWillReceiveProps === 'function') {
      // TODO
    }

    let oldState = workInProgress.memorizedState;
    let newState = void 0;
    let derivedStateFromCatch = void 0;

    // 从updateQueue中获取新的state
    if (workInProgress.updateQueue) {
      newState = util.processUpdateQueue(current, workInProgress, workInProgress.updateQueue, instance, newProps, renderExpirationTime);

      let updateQueue = workInProgress.updateQueue;
      if (updateQueue && updateQueue.capturedValues && window.enableGetDerivedStateFromCatch && typeof ctor.getDerivedStateFromCatch === 'function') {
        // TODO
      }
    } else {
      newState = oldState;
    }

    // 从生命周期中获取新的state
    let derivedStateFromProps = void 0;
    if (oldProps !== newProps) {
      derivedStateFromProps = this.callGetDerivedStateFromProps(workInProgress, newProps, newState);
    }
    if (derivedStateFromProps) {
      newState = !newState ? derivedStateFromProps : Object.assign({}, newState, derivedStateFromProps);
      let _updateQueue3 = workInProgress.updateQueue;
      if (_updateQueue3) {
        _updateQueue3.baseState = Object.assign({}, _updateQueue3.baseState, derivedStateFromProps);
      }
    }

    // if an update was already in progress, we should schedule an update effect
    // even though we are bailing out, so that cWU/cDU are called
    if (oldProps === newProps && oldState === newState && !(workInProgress.updateQueue !== null && workInProgress.updateQueue.hasForceUpdate)) {
      if (typeof instance.componentDidUpdate === 'function') {
        if (oldProps !== current.memorizedProps || oldState !== current.memorizedState) {
          workInProgress.effectTag |= constance.effects.Update;
        }
      }
      if (typeof instance.getSnapshotBeforeUpdate === 'function') {
        if (oldProps !== current.memorizedProps || oldState !== current.memorizedState) {
          workInProgress.effectTag |= constance.effects.Snapshot;
        }
      }
      return false;
    }

    // 判断shouldUpdate
    let shouldUpdate = this.checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, null);

    if (shouldUpdate) {
      if (typeof instance.componentDidUpdate === 'function') {
        workInProgress.effectTag |= constance.effects.Update;
      }
      if (typeof instance.getSnapshotBeforeUpdate === 'function') {
        workInProgress.effectTag |= constance.effects.Snapshot;
      }
    } else {
      // TODO
    }

    instance.props = newProps;
    instance.state = newState;

    return shouldUpdate;
  },

  checkShouldComponentUpdate(workInProgress, oldProps, newProps, oldState, newState, newContext) {
    if (oldProps === null || workInProgress.updateQueue !== null && workInProgress.updateQueue.hasForceUpdate) {
      return true;
    }

    let instance = workInProgress.stateNode;
    let ctor = workInProgress.type;
    if (typeof instance.shouldComponentUpdate === 'function') {
      let shouldUpdate = instance.shouldComponentUpdate(newProps, newState, newContext);
      return shouldUpdate;
    }

    return true;
  }
};

/* harmony default export */ __webpack_exports__["default"] = (ClassComponent);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map