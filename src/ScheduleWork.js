/**
 * 调度工作
 */
import Constance from './Constance'
import FiberNode from './FiberNode'
import updateWorks from './UpdateWorks'

const constance = new Constance()
const hostRootWork = new HostRootWork()
let isRootReadyForCommit = false

class ScheduleWork {
  workLoop (nextUnitOfWork) {
    while (nextUnitOfWork !== null) {
      nextUnitOfWork = this.performUnitOfWork(nextUnitOfWork);
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
          isRootReadyForCommit = true
          return null
        }
      }

      return null
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
            workInProgress.stateNode = this.createTextInstance(newText, workInProgress)
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
        return updateWorks.updateHostRoot(current, workInProgress, renderExpirationTime)
      case constance.tags.HostText:
        return updateWorks.updateHostText(current, workInProgress)  
    }
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
      workInProgress.child = this.reconcileChildFibers(workInProgress, current.child, nextChildren, 1)
    }
  }

  reconcileChildFibers (returnFiber, currentFirstChild, newChild, expirationTime) {
    if (newChild && typeof newChild === 'object') {

    }

    if (typeof newChild === 'string' || typeof newChild === 'number') {
      let newFiber = this.reconcileSingleTextNode(returnFiber, currentFirstChild, newChild, expirationTime)
      this.placeSingleChild(newFiber)
      return newFiber
    }
  }

  placeSingleChild (newFiber) {
    newFiber.effectTag = constance.effects.Placement
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

  commitRoot (finishedWork) {
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
      }
      nextEffect = nextEffect.nextEffect;
    }
  }

  commitPlacement(finishedWork) {
    this._internalRoot.containerInfo.appendChild(finishedWork.stateNode)
  }

}

export default ScheduleWork