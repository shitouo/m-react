/**
 * react的root类
 */
import FiberNode from './FiberNode'
import Constance from './Constance'
import ScheduleWork from './ScheduleWork'

const constance = new Constance()

let isWorking = false
let isCommiting = false

class ReactRoot extends ScheduleWork {
  constructor (containerInfo) {
    super()
     this._internalRoot = this.createFiberRoot(containerInfo)
    //  this.nextUnitOfWork = null
    this.rootWorkInProgress = null
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
      callback: function () {},
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
    current.updateQueue = quene
    this.scheduleWork(current, expirationTime)
  }

  render (children) {
    this.scheduleRootUpdate(this._internalRoot.current, children, 1)
  }

  renderRoot (root, expirationTime, isAsync) {
    window.nextUnitOfWork = this.createWorkInProgress(root.current, null, 1)
    this.workLoop(false)

    let didCompleteRoot = false
    window.isWorking = false

    if (window.nextUnitOfWork === null) {
      // we reached the root
      if (window.isRootReadyForCommit) {
        didCompleteRoot = true
        root.pendingCommitExpirationTime = expirationTime
        let finishedWork = root.current.alternate
        return finishedWork
      }else {
        // the root did not complete
        window.interruptedBy = null
      }
    }else {
      window.interruptedBy = null
      return null
    }
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
    workInProgress.updateQueue = current.updateQueue

    return workInProgress
    
  }
  
}

export default ReactRoot