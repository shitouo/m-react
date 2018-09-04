/**
 * react的root类
 */
import FiberNode from './FiberNode'
import Constance from './Constance'

const constance = new Constance()
const NoWork = 0

class ReactRoot {
  constructor (containerInfo) {
     this._internalRoot = this.createFiberRoot(containerInfo)
  }

  createFiberRoot (containerInfo) {
    // 创建带fiber的root对象
    const rootFiber = new FiberNode(constance.tags.HostRoot, null)
    const root = {
      current: rootFiber,
      containerInfo: containerInfo,
      pendingChildren: null,
      pendingCommitExpirationTime: NoWork,
      finishedWork: null,
      remainingExpirationTime: NoWork,
      firstBatch: null,
      nextScheduleRoot: null
    }
    rootFiber.stateNode = root
    return root
  }

  render () {
    
  }
}