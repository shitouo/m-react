/**
 * update类，记录所有节点类型的update方法
 */
import FiberNode from './FiberNode'
import Constance from './Constance'
import ClassComponent from './classComponent'

const constance = new Constance()

class UpdateWorks {
  updateHostText (current, workInProgress) {
    workInProgress.memorizedProps = workInProgress.pendingProps
    return null
  }

  updateHostRoot (current, workInProgress, renderExpirationTime) {
    let updateQuene = workInProgress.updateQuene
    if (updateQuene) {
      const prevState = workInProgress.memorizedState
      const state = this.processUpdateQuene(current, workInProgress, updateQuene, null, null, renderExpirationTime)
      workInProgress.memorizedState = state
      updateQuene = workInProgress.updateQuene

      let element = state.element

      this.reconcileChildren(current, workInProgress, element)
    }
    return workInProgress.child
  }

  updateClassComponent (current, workInProgress, renderExpirationTime) {
    let shouldUpdate // 标识是否需要更新

    if (!current) {
      // 还未装载过
      if (!workInProgress.stateNode) {
        ClassComponent.constructClassInstance(workInProgress, workInProgress.pendingProps)
        ClassComponent.mountClassInstance(workInProgress)

        shouldUpdate = true
      }else {
        // TODO
      }
    }else {
      // TODO 已经装载过
    }

    return this.finishClassComponent(current, workInProgress, shouldUpdate, null, null, renderExpirationTime)
  }

  finishClassComponent (current, workInProgress, shouldUpdate, hasContext, didCaptureError, renderExpirationTime) {
    // update结束
    const instance = workInProgress.stateNode
    const nextChildren = instance.render()
    let currentChild = current ? current.child : null
    this.reconcileChildFibers(workInProgress, currentChild, nextChildren, renderExpirationTime)

    return workInProgress.child
  }

  createTextInstance (text, internalInstanceHandle) {
    const randomKey = Math.random().toString(36).slice(2);
    const internalInstanceKey = '__reactInternalInstance$' + randomKey;
    const textNode = document.createTextNode(text)
    textNode[internalInstanceKey] = internalInstanceHandle
    return textNode
  }

  processUpdateQuene (current, workInProgress, quene, instance, props, renderExpirationTime) {
    const currentQuene = quene
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
    }

    quene.expirationTime = constance.works.NoWork

    let state = null
    if (quene.isInitialized) {
      state = quene.baseState
    }else {
      state = quene.baseState = workInProgress.memorizedState
      quene.isInitialized = true
    }
    let dontMutatePrevState = true
    let update = quene.first
    let didSkip = false

    while(update) {
      // 遍历所有的update，assign所有的_partialState
      let updateExpirationTime = update.expirationTime
      if (updateExpirationTime > renderExpirationTime) {

      }

      if (!didSkip) {
        quene.first = quene.next
        if (!quene.first) {
          quene.last = null
        }
      }

      // process the update
      let _partialState = null
      if (update.isReplace) {

      }else {
        _partialState = update.partialState
        if (_partialState) {
          if (dontMutatePrevState) {
            state = Object.assign({}, state, _partialState)
          }
        }
        dontMutatePrevState = false
      }
      if (update.isForced) {
        queue.hasForceUpdate = true
      }
      update = update.next
    }

    if (!didSkip) {
      didSkip = true,
      quene.baseState = state
    }
    return state
  }

  reconcileChildren (current, workInProgress, nextChildren) {
    if (current === null) {

    }else {
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
  }

  reconcileSingleElement (returnFiber, currentFirstChild, element, expirationTime) {
    const key = element.key
    const child = currentFirstChild

    while (child) {
      // TODO
      break
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
    newFiber.effectTag = constance.effects.Placement
  }
  
}

export default UpdateWorks