/**
 * 调度工作
 */
import Constance from './Constance'
import FiberNode from './FiberNode';

const constance = new Constance()

class ScheduleWork {
  workLoop (nextUnitOfWork) {
    while (nextUnitOfWork !== null) {
      nextUnitOfWork = this.performUnitOfWork(nextUnitOfWork);
    }
  }

  performUnitOfWork (workInProgress) {
    const next = this.beginWork()

    if (next === null) {
      // 当前分支解析到叶子结点了，返回efftces给return，并寻找其他分支还未解析的节点
       this.completeUnitOfWork(workInProgress)
    }

    return next
  }

  completeUnitOfWork (workInProgress) {
    // 合并当前effects到return上，然后找到其他还未解析的fiber节点
    while(true) {
      let current = workInProgress.alternate
      let returnFiber = workInProgress.return
      let siblingFiber = workInProgress.siblings

      if ((workInProgress.effectTag & constance.effects.Incomplete) === constance.effects.NoEffect) {
        // 当前节点已经完成
        // 处理当前节点，做好commit前的准备工作
        let next = this.completeWork(current, workInProgress)
        if (next) {

        }
        if (returnFiber && (returnFiber.effectTag & constance.effects.Incomplete) === constance.effects.NoEffect) {
          if (returnFiber.firstEffect === null) {
            returnFiber.firstEffect = workInProgress.firstEffect
          }
        }
      }
    }
  }

  completeWork (current, workInProgress, renderExpirationTime) {
    const newProps = workInProgress.pendingProps
    switch(workInProgress.tag) {
      case constance.tags.HostText: 
        {
          let newText = newProps
          if (current && workInProgress.stateNode !== null) {

          }else {
            // TODO: 后面要采用栈的形式来获取ContainerInstance
            const _rootContainerInstance = document.getElementById('root')
            workInProgress.stateNode = this.createTextNode(newText, workInProgress)
          }
          return null
        }
    }
  }

  createTextInstance (text, internalInstanceHandle) {
    const randomKey = Math.random().toString(36).slice(2);
    const internalInstanceKey = '__reactInternalInstance$' + randomKey;
    const textNode = document.createTextNode(text)
    textNode[internalInstanceKey] = internalInstanceHandle
    return textNode
  }

  beginWork (current, workInProgress, renderExpirationTime) {
    switch(workInProgress.tag) {
      case constance.tags.HostRoot:
        return this.updateHostRoot(current, workInProgress, renderExpirationTime)
      case constance.tags.HostText:
        return this.updateHostText()  
    }
  }

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

  processUpdateQuene (current, workInProgress, quene, instance, props, renderExpirationTime) {
    const currentQuene = quene
    quene = workInProgress.updateQuene = {
      baseState: currentQueue.baseState,
      expirationTime: currentQueue.expirationTime,
      first: currentQueue.first,
      last: currentQueue.last,
      isInitialized: currentQueue.isInitialized,
      capturedValues: currentQueue.capturedValues,
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
      let updateExpirationTime = update.expirationTime
      if (updateExpirationTime > renderExpirationTime) {

      }

      if (!didSkip) {
        quene.first = quene.next
        if (quene.first === null) {
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
      workInProgress.child = this.reconcileChildFibers(workInProgress, current.child, nextChildren, renderExpirationTime)
    }
  }

  reconcileChildFibers (returnFiber, currentFirstChild, newChild, expirationTime) {
    if (newChild && typeof newChild === 'object') {

    }

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      this.placeSingleChild(this.reconcileSingleTextNode(returnFiber, currentFirstChild, newChild, expirationTime))
    }
  }

  placeSingleChild (newFiber) {
    newFiber.effectTag = constance.effects.Placement
    return newFiber
  }

  reconcileSingleTextNode (returnFiber, currentFirstChild, textContent, expirationTime) {
    if (currentFirstChild && currentFirstChild.tag === constance.tags.HostText) {

    }
    let created = this.createFiberFromText(textContent, null, expirationTime)
    created.return = returnFiber
    return created  
  }

  createFiberFromText (content, mode, expirationTime) {
    const fiber = new FiberNode(constance.tags.HostText, content)
    fiber.expirationTime = expirationTime
    return fiber
  }

}

export default ScheduleWork