/**
 * react的root类
 */
import FiberNode from './FiberNode'
import Constance from './Constance'
import ScheduleWork from './ScheduleWork'

const constance = new Constance()
const scheduleWork = new ScheduleWork()

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
      callback: callback,
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
  }

  createWorkInProgress (current, pendingProps, expirationTime) {
    // 创建alternate的fiber
    let workInProgress = current.alternate
    if (workInProgress === null) {
      workInProgress = new FiberNode(current.tag, pendingProps)
      workInProgress.type = current.type
      workInProgress.stateNode = workInProgress.stateNode
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
}