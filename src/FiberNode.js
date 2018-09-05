/**
 * fiber节点类
 */
import Constance from './Constance'

const constance = new Constance()

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
    this.updateQuene = null

    this.effectTag = constance.effects.NoEffect
    this.nextEffect = null
    this.firstEffect = null
    this.lastEffect = null

    this.expirationTime = constance.works.NoWork

    this.alternate = null
  }
}

export default FiberNode