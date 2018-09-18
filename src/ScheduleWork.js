/**
 * 调度工作，控制work的流程
 */
import Constance from './Constance'
import UpdateWorks from './UpdateWorks'

const constance = new Constance()
let isRootReadyForCommit = false
let isWorking = false
let isCommiting = false

class ScheduleWork extends UpdateWorks {
  scheduleWork (fiber, expirationTime) {
    // walk the parent path to the root and update each node's expiration time
    let node = fiber
    while (node) {
      if (node.expirationTime === constance.works.NoWork || node.expirationTime > expirationTime) {
        node.expirationTime = expirationTime
      }

      if (node.alternate) {
        let alternate = node.alternate
        if (alternate.expirationTime === constance.works.NoWork || alternate.expirationTime > expirationTime) {
          alternate.expirationTime = expirationTime
        }
      }

      if (!node.return) {
        // walk to the top
        if (node.tag === constance.tags.HostRoot) {
          let root = node.stateNode
          this.requestWork(root, expirationTime)
        }
      }

      node = node.return
    }
  }
  
  requestWork (root, expirationTime) {
    // requestWork is called by the scheduler whenever a root receives an update
    // it's up to the renderer to call renderRoot at some point in the future
    this.addRootToSchedule(root, expirationTime)

    if (window.isRendering) {
      // Prevent reentrancy(重新进去). Remaining work will be scheduled at the end of
      // the currently rendering batch.
      return;
    }

    if (window.isBatchingUpdates) {
      // Flush work at the end of the batch.
      return
    }

    if (expirationTime === constance.mode.sync) {
      this.performeWork(expirationTime, false, null)
    }

  }

  performeWork (minExpirationTime, isAsync, dl) {
    let deadline = dl

    // keep working on roots until there's no more work, or until we reach the deadline
    this.findHighestPriorityRoot()

    if (isAsync) {
      // TODO
    }else {
      while (window.nextFlushedRoot && window.nextFlushedExpirationTime !== constance.works.NoWork && (minExpirationTime === constance.works.NoWork || minExpirationTime >= window.nextFlushedExpirationTime)) {
        this.performWorkOnRoot(window.nextFlushedRoot, window.nextFlushedExpirationTime, false)
        this.findHighestPriorityRoot()
      }
    }
  }

  performWorkOnRoot (root, expirationTime, isAsync) {
    window.isRendering = true

    // check if this is async work or sync/expired work
    if (!isAsync) {
      // flush sync work
      let finishedWork = root.finishedWork
      if (finishedWork) {
        // this root is already complete. we can commit it

      }else {
        root.finishedWork = null
        finishedWork = this.renderRoot(root, expirationTime,false)
        if (finishedWork) {
          this.completeRoot(root, finishedWork, expirationTime)
        }
      }
    }else {
      // flush async work
    }

    window.isRendering = false
  }

  completeRoot (root, finishedWork, expirationTime) {
    let firstBatch = root.firstBatch
    if (firstBatch && firstBatch._expirationTime <= expirationTime) {
      // TODO
    }

    // commit the root
    root.finishedWork = null
    root.remainingExpirationTime = this.commitRoot(finishedWork)
  }

  findHighestPriorityRoot () {
    let highestPriorityWork = constance.works.NoWork
    let highestPriorityRoot = null
    if (window.lastScheduledRoot) {
      let previousScheduledRoot = window.lastScheduledRoot
      let root = window.firstScheduledRoot
      while (root) {
        let remainingExpirationTime = root.remainingExpirationTime
        if (remainingExpirationTime === constance.works.NoWork) {
          // this root no longer has work. Remove it from the scheduler.
          if (root === root.nextScheduledRoot) {
            // this is the only root in the list
            root.nextScheduleRoot = null
            window.firstScheduledRoot = window.lastScheduledRoot = null
            break
          }else if (root === window.firstScheduledRoot) {
            // this is the first root in the list 
            let next = root.nextScheduleRoot
            window.firstScheduledRoot = next
            window.lastScheduledRoot.nextScheduleRoot = next // 这个链表要永远成环
            root.nextScheduleRoot = null // ?
          }else if (root === window.lastScheduledRoot) {
            // this is the last root in the list
            window.lastScheduledRoot = previousScheduledRoot
            window.lastScheduledRoot.nextScheduleRoot = window.firstScheduledRoot
            root.nextScheduleRoot = null
            break
          }else {
            previousScheduledRoot.nextScheduleRoot = root.nextScheduleRoot
            root.nextScheduleRoot = null
          }
          root = previousScheduledRoot.nextScheduleRoot
        }else {
          // this root has more work
          if (highestPriorityWork === constance.works.NoWork || remainingExpirationTime < highestPriorityWork) {
            // update the priority, if it's higher
            highestPriorityWork = remainingExpirationTime
            highestPriorityRoot = root
          }
          if (root === window.lastScheduledRoot) {
            break
          }
          previousScheduledRoot = root
          root = root.nextScheduleRoot
        }
      }
    }

    // if the next root is the same as the previous root, this is a nested update. To prevent an infinite loop, increment the nested udpate count
    let previousFlushedRoot = window.nextFlushedRoot
    if (previousFlushedRoot && previousFlushedRoot === highestPriorityRoot && highestPriorityWork === constance.mode.sync) {
      window.nestedUpdateCount++
    }else {
      // reset whenever we switch roots
      window.nestedUpdateCount = 0
    }

    window.nextFlushedRoot = highestPriorityRoot
    window.nextFlushedExpirationTime = highestPriorityWork
  }

  addRootToSchedule (root, expirationTime) {
    // add the root to the schedule

    // check if  this root is already part of the schedule
    if (root.nextScheduleRoot === null) {
      // this root is not already scheduled. add it
      root.remainingExpirationTime = expirationTime
      if (window.lastScheduledRoot === null) {
        window.lastScheduledRoot = window.firstScheduledRoot = root
        root.nextScheduleRoot = root
      }else {
        window.lastScheduledRoot.nextScheduleRoot = root
        window.lastScheduledRoot = root
        window.lastScheduledRoot.nextScheduleRoot = window.firstScheduledRoot // 为什么非要让链表成环呢？
      }
    }else {
      // this root is already scheduled, but its priority may have increased
      let remainingExpirationTime = root.remainingExpirationTime
      if (remainingExpirationTime === constance.works.NoWork || remainingExpirationTime < expirationTime) {
        root.remainingExpirationTime = expirationTime
      }
    }
  }

  workLoop (isAsync) {
    while (window.nextUnitOfWork !== null) {
      window.nextUnitOfWork = this.performUnitOfWork(window.nextUnitOfWork);
    }
  }

  performUnitOfWork (workInProgress) {
    const next = this.beginWork(workInProgress.alternate, workInProgress, 1)

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
        // 要保证return的所有子节点都complete，才会合并effects提交
        if (returnFiber && (returnFiber.effectTag & constance.effects.Incomplete) === constance.effects.NoEffect) {
          // 合并children的effects到return
          if (returnFiber.firstEffect === null) {
            returnFiber.firstEffect = workInProgress.firstEffect
          }
          if (workInProgress.lastEffect) {
            if (returnFiber.lastEffect) {
              returnFiber.lastEffect.nextEffect = workInProgress.firstEffect
            }
            returnFiber.lastEffect = workInProgress.lastEffect
          }
          
        }
        // 合并自身的effects到return，并且是在children的后面
        const effectTag = workInProgress.effectTag
        if (effectTag > constance.effects.PerformedWork) {
          if (returnFiber.lastEffect) {
            returnFiber.lastEffect.nextEffect = workInProgress // 这里的结构类似于链表结构
          }else {
            returnFiber.firstEffect = workInProgress
          }
          returnFiber.lastEffect = workInProgress
        }

        if (siblingFiber) {
          return siblingFiber
        }else if(returnFiber) {
          workInProgress = returnFiber
          continue
        }else {
          // reached the root
          window.isRootReadyForCommit = true
          return null
        }
      }

      return null
    }
  }

  completeWork (current, workInProgress, renderExpirationTime) {
    const newProps = workInProgress.pendingProps
    const type = workInProgress.type
    switch(workInProgress.tag) {
      case constance.tags.HostText: {
          let newText = newProps
          if (current && workInProgress.stateNode !== null) {

          }else {
            // TODO: 后面要采用栈的形式来获取ContainerInstance
            workInProgress.stateNode = this.createTextInstance(newText, workInProgress)
          }
          return null
        }
      case constance.tags.HostComponent: {
        if (current && workInProgress.stateNode) {
          // 之前已经创建了
          let oldProps = current.memorizedProps
          let _instance = workInProgress.stateNode
          let updatePayload = this.diffProperties(_instance, workInProgress.tag, oldProps, newProps, null)
          workInProgress.updateQueue = updatePayload
          if (updatePayload) {
            workInProgress.effectTag |= Update
          }
        }else {
          if (!newProps) {
            return null
          }
          workInProgress.stateNode = this.createInstance(type, workInProgress)
          this.appendAllChildren()
          this.finalizeInitialChildren(workInProgress.stateNode, type, newProps)
        }
        return null
      }  
    }
  }

  diffProperties (domElement, tag, lastRawProps, nextRawProps, rootContainerElement) {
    let updatePayload = null
    let lastProps = void 0
    let nextProps = void 0
    switch (tag) {
      default: {
        lastProps = lastRawProps
        nextProps = nextRawProps
        if (typeof lastProps.onClick !== 'function' || typeof nextProps.onClick === 'function') {
          // TODO
        }
        break
      } 
    }

    let propKey = void 0
    let styleName = void 0
    let styleUpdates = null
    for (propKey in lastProps) {
      if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] === null) {
        continue
      }
      if (propKey === 'style') {
        // TODO
      }else if (propKey === 'children') {
        // NOOP. This is handled by the clear text mechanism.
      }else {
        (updatePayload = updatePayload || []).push(propKey, null)
      }
    }

    for (propKey in nextProps) {
      let nextProp = nextProps[propKey]
      let lastProp = lastProps ? lastProps[propKey] : undefined // 之前的属性值
      if (!nextProps.hasOwnProperty(propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
        continue
      }
      if (propKey === 'style') {
        // TODO
      }else if (propKey === 'children') {
        if (lastProp !== nextProp && (typeof nextProp === 'string' || typeof nextProp === 'number')) {
          (updatePayload = updatePayload || []).push(propKey, '' + nextProp)
        }
      }else {
        (updatePayload = updatePayload || []).push(propKey, nextProp)
      }
    }

    if (styleUpdates) {
      (updatePayload = updatePayload || []).push('style', styleUpdates)
    }

    return updatePayload
  }

  beginWork (current, workInProgress, renderExpirationTime) {
    switch(workInProgress.tag) {
      case constance.tags.HostRoot:
        return this.updateHostRoot(current, workInProgress, renderExpirationTime)
      case constance.tags.ClassComponent:
        return this.updateClassComponent(current, workInProgress, renderExpirationTime)  
      case constance.tags.HostText:
        return this.updateHostText(current, workInProgress)
      case constance.tags.HostComponent:
        return this.updateHostComponent(current, workInProgress, renderExpirationTime)
    }
  }

  commitRoot (finishedWork, container) {
    isWorking = true
    isCommiting = true

    let root = finishedWork.stateNode
    let committedExpirationTime = root.pendingCommitExpirationTime
    root.pendingCommitExpirationTime = constance.works.NoWork
    
    let firstEffect = null
    if (finishedWork.effectTag > constance.effects.PerformedWork) {
      // 当前root也有修改
      if (finishedWork.lastEffect) {
        finishedWork.lastEffect.nextEffect = finishedWork
        firstEffect = finishedWork.firstEffect
      } else {
        firstEffect = finishedWork
      }
    }else {
      // 当前root没有修改
      firstEffect = finishedWork.firstEffect
    }

    // 在root消费掉所有的effect
    let nextEffect = firstEffect
    while (nextEffect) {
      let effectTag = nextEffect.effectTag
      let primaryEffectTag = effectTag & (constance.effects.Placement | constance.effects.Update | constance.effects.Deletion);
      switch(primaryEffectTag) {
        case constance.effects.Placement: {
          this.commitPlacement(nextEffect)
          nextEffect.effectTag &= ~constance.effects.Placement // 去掉当前任务
          break;
        }
        case constance.effects.PlacementAndUpdate: {
          // Placement
          this.commitPlacement(nextEffect)
          nextEffect.effectTag &= ~constance.effects.Placement // 去掉当前任务
          
          // Update
          let _current = nextEffect.alternate
          this.commitWork(_current, nextEffect)
        }
      }
      nextEffect = nextEffect.nextEffect;
    }

    // 这里要消费掉所有的生命周期
    nextEffect = firstEffect
    while (nextEffect) {
      let effectTag = nextEffect.effectTag;

      if (effectTag & (constance.effects.Update | constance.effects.Callback)) { 
        // 如果effectTag里面包含Update或者Callback
        let current = nextEffect.alternate;
        this.commitLifeCycles(null, current, nextEffect, null, committedExpirationTime)
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

    isCommiting = false
    isWorking = false

    let remainingTime = root.current.expirationTime
    return remainingTime
  }

  commitPlacement(finishedWork) {
    document.getElementById('root').appendChild(finishedWork.stateNode)
  }

  commitWork (current, finishedWork) {
    // Update的commit工作
    switch (finishedWork.tag) {
      case constance.tags.ClassComponent: {
        return
      }
      case constance.tags.HostComponent: {
        let _instance8 = finishedWork.stateNode
        if (_instance8) {
          let newProps = finishedWork.memorizedProps
          let oldProps = current ? current.memorizedProps : newProps
          let type = finishedWork.type
          let updatePayload = finishedWork.updateQueue
          finishedWork.updateQueue = null
          if (updatePayload) {
            this.commitUpdate(_instance8, updatePayload, type, oldProps, newProps, finishedWork)
          }
        }
        return
      }
      case constance.tags.HostText: {
        let textInstance = finishedWork.stateNode
        let nextText = finishedWork.memorizedProps

        let oldText = current ? current.memorizedProps : newText
        this.commitTextUpdate(textInstance, oldText, newText)
        return
      }
    }
  }

  commitUpdate (domElement, updatePayload, type, oldProps, newProps, internalInstanceHandle) {
    // update the props handle so that we know which props are the ones with current event handles
    // updateFiberProps
    const randomKey = Math.random().toString(36).slice(2);
    const internalEventHandlersKey = '__reactEventHandlers$' + randomKey;
    domElement[internalEventHandlersKey] = newProps;

    // apply the diff to the dom node
    // updateProperties
    for (let i = 0; i < updatePayload.length; i += 2) {
      let propKey = updatePayload[i]
      let propValue = updatePayload[i + 1]
      if (propKey === 'style') {
        // TODO
      }else if (propKey === 'children') {
        if (propValue) {
          let firstChild = domElement.firstChild
          if (firstChild && firstChild === node.lastChild && firstChild.nodeType === 3) {
            firstChild.nodeValue = propValue
            return
          }
        }
        node.textContent = propValue
      }else {
        // TODO
      }
    }
  }

  commitTextUpdate (textInstance, oldText, newText) {
    textInstance.nodeValue = newText
  }

  commitLifeCycles (finishedRoot, current, finishedWork, currentTime, committedExpirationTime) {
    switch (finishedWork.tag) {
      case constance.tags.ClassComponent: {
        let _instance2 = finishedWork.stateNode
        if (finishedWork.effectTag & constance.effects.Update) {
          if (current) {
            // TODO
          }else {
            _instance2.props = finishedWork.memorizedProps
            _instance2.state = finishedWork.memorizedState
            _instance2.componentDidMount()
          }
        }

        let updateQueue = finishedWork.updateQueue
        if (updateQueue) {
          // TODO
        }

        return
      }
    }
  }

}

export default ScheduleWork