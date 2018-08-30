/**
 * MReact的主文件
 */
import FiberNode from './FiberNode'
import Constance from './Constance'

const constance = new Constance()
const NoWork = 0

class MReact {
  render (elements, container) {
    // 1、把elements生成Fiber tree
    // 2、解析
    // 3、commit
    this.elements2FiberTree(elements)
  }

  elements2FiberTree (elements) {

  }

  createFiberRoot (containerInfo) {
    let uninitiallizedFiber = new FiberNode(constance.tags.HostRoot,constance.effects.NoEffect)
    let root = {
      current: uninitiallizedFiber,
      containerInfo: containerInfo,
      finishedWork: null,
      remainingExpirationTime: NoWork,
      firstBatch: null
    }
    uninitiallizedFiber.stateNode = root
    return root
  }

  Reconciler () {

  }

  commit () {

  }

}