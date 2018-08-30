/**
 * fiber节点类
 */
const NoEffect = 0

class FiberNode {
  constructor (tag, pendingProps) {
    this.tag = tag
    this.type = null
    this.stateNode = null

    this.return = null
    this.child = null
    this.sibling = null

    this.pendingProps = pendingProps
    this.memorizedProps = null
    this.memorizedState = null

    this.effectTag = NoEffect

    this.alternate = null
  }
}

export default FiberNode