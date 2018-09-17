/**
 * ClassComponent相关方法
 */
import Constance from './Constance'
import Util from './Util'

const constance = new Constance()
const util = new Util()

const ClassComponent = {
  callGetDerivedStateFromProps (workInProgress, nextProps, prevState) {
    const type = workInProgress.type
    let partialState
    if (typeof type.getDerivedStateFromProps === 'function') {
      // 注册了getDerivedStateFromProps
      partialState = type.getDerivedStateFromProps.call(null, nextProps, prevState)
    }
    return partialState
  },

  constructClassInstance (workInProgress, props, updater) {
    const ctor = workInProgress.type // 构造器
    let instance = new ctor(props)

    instance.updater = updater
    workInProgress.stateNode = instance
    instance._reactInternalFiber = workInProgress

    let state = instance.state || null
    workInProgress.memorizedState = state

    let partialState = this.callGetDerivedStateFromProps(workInProgress, props, state)
    if (partialState) {
      workInProgress.memorizedState = Object.assign({}, state, partialState)
    }
  },

  mountClassInstance (workInProgress) {
    const instance = workInProgress.stateNode
    const props = workInProgress.pendingProps

    instance.props = props
    instance.state = workInProgress.memorizedState

    if (typeof instance.componentDidMount === 'function') {
      workInProgress.effectTag |= constance.effects.Update
    }
  },

  updateClassInstance (current, workInProgress, renderExpirationTime) {
    // invokes the update life-cycles and returns false if it should't rerender
    let ctor = workInProgress.type
    let instance = workInProgress.stateNode

    instance.props = workInProgress.memorizedProps
    instance.state = workInProgress.memorizedState

    let oldProps = workInProgress.memorizedProps
    let newProps = workInProgress.pendingProps
    let hasNewLifecycles = typeof ctor.getDerivedStateFromProps === 'function' || typeof instance.getSnapshotBeforeUpdate === 'function'
    if (!hasNewLifecycles &&  typeof instance.UNSAFE_componentWillReceiveProps === 'function' && instance.componentWillReceiveProps === 'function') {
      // TODO
    }

    let oldState = workInProgress.memorizedState
    let newState = void 0
    let derivedStateFromCatch = void 0
    if (workInProgress.updateQueue) {
      newState = util.processUpdateQueue(current, workInProgress, workInProgress.updateQueue, instance, newProps, renderExpirationTime)

      let updateQueue = workInProgress.updateQueue
      if (updateQueue && updateQueue.capturedValues && window.enableGetDerivedStateFromCatch && typeof ctor.getDerivedStateFromCatch === 'function') {
        // TODO
      }
    }else {
      newState = oldState
    }

    // get newState from props
    let derivedStateFromProps = void 0
    if (oldProps !== newProps) {
      derivedStateFromProps = this.callGetDerivedStateFromProps(workInProgress, newProps, newState)
    }
    if (derivedStateFromProps) {
      newState = !newState ? derivedStateFromProps : _assign({}, newState, derivedStateFromProps)
      var _updateQueue3 = workInProgress.updateQueue;
      if (_updateQueue3 !== null) {
        _updateQueue3.baseState = _assign({}, _updateQueue3.baseState, derivedStateFromProps);
      }
    }
  }
}

export default ClassComponent