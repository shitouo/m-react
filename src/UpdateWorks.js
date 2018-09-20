/**
 * update类，记录所有节点类型的update方法
 */
import FiberNode from './FiberNode'
import Constance from './Constance'
import ClassComponent from './classComponent'
import Util from './Util'

const constance = new Constance()
const util = new Util()

class UpdateWorks {
  get updater () {
    const that = this
    return {
      enqueueSetState: (function (instance, partialState, callback) {
        const fiber = instance._reactInternalFiber
        callback = callback === undefined ? null : callback;
        // var expirationTime = computeExpirationForFiber(fiber);
        // TODO:计算有效期
        const expirationTime = 1
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
      }).bind(that)
    }
  }

  insertUpdateIntoFiber (fiber, update, expirationTime) {
    let alternate = fiber.alternate
    let queue1
    let queue2
    if (!alternate) {
      queue1 = fiber.updateQueue
      queue2 = null
      if (!queue1) {
        queue1 = fiber.updateQueue = this.createUpdateQueue(fiber.memorizedState)
      }
    }else {
      // there are two owners???
      queue1 = fiber.updateQueue
      queue2 = alternate.updateQueue
      if (queue1 === null) {
        if (queue2 === null) {
          // 两个队列都没有
          queue1 = fiber.updateQueue = this.createUpdateQueue(fiber.memorizedState)
          queue2 = alternate.updateQueue = this.createUpdateQueue(alternate.memorizedState)
        }else {
          // queue1没有，queue2有
          queue1 = fiber.updateQueue = this.createUpdateQueue(fiber.memorizedState)
        }
      }else {
        if (queue2 === null) {
          // queue1有，queue2没有
          queue2 = alternate.updateQueue = this.createUpdateQueue(alternate.memorizedState)
        }else {
          // 都有，不做任何操作
        }
      }
    }

    if (queue2 === null || queue1 === queue2) {
      // there's a single queue
      this.appendUpdateToQueue(queue1, update, expirationTime)
    }
  }

  appendUpdateToQueue (queue, update, expirationTime) {
    if (!queue.last) {
      queue.first = queue.last = update
    }else {
      queue.last.next = update
      queue.last = update
    }
    if (queue.expirationTime === constance.works.NoWork || queue.expirationTime > update.expirationTime) {
      queue.expirationTime = update.expirationTime
    }
  }

  createUpdateQueue (baseState) {
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
    }
    return queue
  }

  updateHostText (current, workInProgress) {
    workInProgress.memorizedProps = workInProgress.pendingProps
    return null
  }

  updateHostRoot (current, workInProgress, renderExpirationTime) {
    let updateQueue = workInProgress.updateQueue
    if (updateQueue) {
      const prevState = workInProgress.memorizedState
      const state = util.processUpdateQueue(current, workInProgress, updateQueue, null, null, renderExpirationTime)
      workInProgress.memorizedState = state
      let element
      if (prevState === state) {
        // if the state is the same as before, that's a bailout because we had no work that expires at this time
        return this.bailoutOnAlreadyFinishedWork(current, workInProgress)
      }else {
        element = state.element
      }

      this.reconcileChildren(current, workInProgress, element)
    }
    return workInProgress.child
  }

  bailoutOnAlreadyFinishedWork (current, workInProgress) {
    this.cloneChildFibers(current, workInProgress)
    return workInProgress.child
  }

  cloneChildFibers (current, workInProgress) {
    if (workInProgress.child === null) {
      return
    }

    let currentChild = workInProgress.child
    let newChild = this.createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime)
    workInProgress.child = newChild

    newChild.return = workInProgress
    while(currentChild.sibling) {
      currentChild = currentChild.sibling
      newChild = newChild.sibling = this.createWorkInProgress(currentChild, currentChild.pendingProps, currentChild.expirationTime)
      newChild.return = workInProgress
    }
    newChild.sibling = null
  }

  updateClassComponent (current, workInProgress, renderExpirationTime) {
    let shouldUpdate // 标识是否需要更新

    if (!current) {
      // 还未装载过
      if (!workInProgress.stateNode) {
        ClassComponent.constructClassInstance(workInProgress, workInProgress.pendingProps, this.updater)
        ClassComponent.mountClassInstance(workInProgress)

        shouldUpdate = true
      }else {
        // TODO
      }
    }else {
      // 已经装载过，现在是更新
      shouldUpdate = ClassComponent.updateClassInstance(current, workInProgress, renderExpirationTime)
    }

    return this.finishClassComponent(current, workInProgress, shouldUpdate, null, null, renderExpirationTime)
  }

  finishClassComponent (current, workInProgress, shouldUpdate, hasContext, didCaptureError, renderExpirationTime) {
    // update结束
    const instance = workInProgress.stateNode
    const nextChildren = instance.render()
    let currentChild = current ? current.child : null
    this.reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime)

    // 更新缓存
    workInProgress.memorizedProps = instance.props
    workInProgress.memorizedState = instance.state

    return workInProgress.child
  }

  updateHostComponent (current, workInProgress, renderExpirationTime) {
    const type = workInProgress.type
    const memorizedProps = workInProgress.memorizedProps
    const nextProps = workInProgress.pendingProps
    const prevPops = current ? current.memorizedProps : null
    let nextChildren

    if (memorizedProps !== nextProps) {
      nextChildren = nextProps.children
      if (typeof nextChildren === 'string' || typeof nextChildren === 'number') {
        nextChildren = null
      }
    }
    this.reconcileChildren(current, workInProgress, nextChildren)
    workInProgress.memorizedProps = nextProps
    return workInProgress.child
  }

  createTextInstance (text, internalInstanceHandle) {
    const randomKey = Math.random().toString(36).slice(2);
    const internalInstanceKey = '__reactInternalInstance$' + randomKey;
    const textNode = document.createTextNode(text)
    textNode[internalInstanceKey] = internalInstanceHandle
    return textNode
  }

  createInstance (type,internalInstanceHandle) {
    const randomKey = Math.random().toString(36).slice(2);
    const internalInstanceKey = '__reactInternalInstance$' + randomKey;
    const textNode = document.createElement(type)
    textNode[internalInstanceKey] = internalInstanceHandle
    return textNode
  }

  appendAllChildren (parent, workInProgress) {

  }

  finalizeInitialChildren (domElement, type, props) {
    let newProps
    switch (type) {
      case 'img':
      case 'image':
      case 'link': {
        break
      }
      default: {
        newProps = props
        // 根据props设置dom属性
        for (let propKey in newProps) {
          if (!newProps.hasOwnProperty(propKey)) {
            continue
          }
          switch(propKey) {
            case 'children': {
              domElement.textContent = newProps.children
            }
          }
        }
      }
    }
  }

  reconcileChildren (current, workInProgress, nextChildren, expirationTime) {
    if (!current) {
      // If this is a fresh new component that hasn't been rendered yet, we
      // won't update its child set by applying minimal side-effects. Instead,
      // we will add them all to the child before it gets rendered. That means
      // we can optimize this reconciliation pass by not tracking side-effects.
      window.shouldTrackSideEffects = false
      workInProgress.child = this.reconcileChildFibers(workInProgress, null, nextChildren, 1)
    }else {
      window.shouldTrackSideEffects = true
      workInProgress.child = this.reconcileChildFibers(workInProgress, current.child, nextChildren, 1)
    }
  }

  reconcileChildFibers (returnFiber, currentFirstChild, newChild, expirationTime) {
    // currentFirstChild是本来节点上就有的child，newChild是要新添加上去的child
    if (newChild && typeof newChild === 'object') {
      switch(newChild.$$typeof) {
        case constance.$$types.REACT_ELEMENT_TYPE: {
          let newFiber = this.reconcileSingleElement(returnFiber, currentFirstChild, newChild, expirationTime)
          this.placeSingleChild(newFiber)
          return newFiber
        }
        case constance.$$types.REACT_PORTAL_TYPE: {
          // TODO
        }
      }
    }

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      let newFiber = this.reconcileSingleTextNode(returnFiber, currentFirstChild, newChild, expirationTime)
      this.placeSingleChild(newFiber)
      return newFiber
    }

    return null
  }

  reconcileSingleElement (returnFiber, currentFirstChild, element, expirationTime) {
    const key = element.key
    const child = currentFirstChild

    while (child) {
      // 已经装载过child
      if (child.key === key) {
        if (child.tag === constance.tags.Fragment ? element.type === constance.$$types.REACT_FRAGMENT_TYPE : child.type === element.type) {
          let existing = this.createWorkInProgress(child, element.props, expirationTime)
          existing.index = 0
          existing.sibling = null
          existing.return = returnFiber
          return existing
        }else {
          break
        }
      }else {
        // TODO
      }
      child = child.sibling
    }

    let _create4 = this.createFiberFromElement(element, expirationTime)
    _create4.return = returnFiber
    return _create4
  }

  reconcileSingleTextNode (returnFiber, currentFirstChild, textContent, expirationTime) {
    if (currentFirstChild && currentFirstChild.tag === constance.tags.HostText) {

    }
    let created = this.createFiberFromText(textContent, null, expirationTime)
    created.return = returnFiber
    return created
  }

  createFiberFromElement (element, expirationTime) {
    let fiberTag
    if (typeof element.type === 'function') {
      fiberTag = constance.tags.ClassComponent
    }else if (typeof element.type === 'string') {
      // TODO
      fiberTag = constance.tags.HostComponent
    }

    let fiber = new FiberNode(fiberTag, element.props)
    fiber.type = element.type
    fiber.expirationTime = expirationTime
    return fiber
  }

  createFiberFromText (content, mode, expirationTime) {
    const fiber = new FiberNode(constance.tags.HostText, content)
    fiber.expirationTime = expirationTime
    return fiber
  }

  placeSingleChild (newFiber) {
    if (window.shouldTrackSideEffects && newFiber.alternate === null) {
      // 只有在
      newFiber.effectTag = constance.effects.Placement
    }
    return newFiber
  }
  
}

export default UpdateWorks