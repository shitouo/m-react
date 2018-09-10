/**
 * react的root类
 */
import FiberNode from './FiberNode'
import Constance from './Constance'
import ScheduleWork from './ScheduleWork'

const constance = new Constance()
const scheduleWork = new ScheduleWork()

let isWorking = false
let isCommiting = false

class ReactRoot {
  constructor (containerInfo) {
     this._internalRoot = this.createFiberRoot(containerInfo)
     this.nextUnitOfWork = null
  }

  createFiberRoot (containerInfo) {
    // 创建带fiber的root对象
    const rootFiber = new FiberNode(constance.tags.HostRoot, null)
    const root = {
      current: rootFiber,
      containerInfo: containerInfo,
      pendingChildren: null,
      pendingCommitExpirationTime: constance.works.NoWork,
      finishedWork: null,
      remainingExpirationTime: constance.works.NoWork,
      firstBatch: null,
      nextScheduleRoot: null
    }
    rootFiber.stateNode = root
    return root
  }

  scheduleRootUpdate (current, element, expirationTime) {
    const update = {
      expirationTime: expirationTime,
      partialState: { element: element },
      callback: null,
      isReplace: false,
      isForced: false,
      capturedValue: null,
      next: null
    }
    const quene = {
      baseState: null,
      expirationTime: expirationTime,
      first: update,
      last: update,
      callbackList: null,
      hasForceUpdate: false,
      isInitialized: false,
      capturedValues: null
    }
    current.updateQuene = quene
  }

  render (children) {
    this.scheduleRootUpdate(this._internalRoot.current, children, 1)
    this.nextUnitOfWork = this.createWorkInProgress(this._internalRoot.current, null, 1)
    scheduleWork.workLoop(this.nextUnitOfWork)
    this.commitRoot(this._internalRoot.current.alternate)
  }

  createWorkInProgress (current, pendingProps, expirationTime) {
    // 创建alternate的fiber
    let workInProgress = current.alternate
    if (workInProgress === null) {
      workInProgress = new FiberNode(current.tag, pendingProps)
      workInProgress.type = current.type
      workInProgress.stateNode = current.stateNode
      workInProgress.alternate = current
      current.alternate = workInProgress
    }else {
      workInProgress.pendingProps = pendingProps
      workInProgress.effectTag = constance.effects.NoEffect
      workInProgress.nextEffect = null
      workInProgress.firstEffect = null
      workInProgress.lastEffect = null
    }
    workInProgress.expirationTime = expirationTime
    workInProgress.child = current.child
    workInProgress.sibling = current.sibling
    // workInProgress.return = current.return
    workInProgress.memorizedProps = current.memorizedProps
    workInProgress.memorizedState = current.memorizedState
    workInProgress.updateQuene = current.updateQuene

    return workInProgress
    
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

export default ReactRoot