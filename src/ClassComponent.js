/**
 * ClassComponent相关方法
 */
import Constance from './Constance'

const constance = new Constance()

const ClassComponent = {
  updater: {
    enqueueSetState: function (instance, partialState, callback) {
      const fiber = instance._reactInternalFiber
      callback = callback === undefined ? null : callback;
      // var expirationTime = computeExpirationForFiber(fiber);
      // TODO:计算有效期
      const expirationTime = 1
      var update = {
        expirationTime: expirationTime,
        partialState: partialState,
        callback: callback,
        isReplace: false,
        isForced: false,
        capturedValue: null,
        next: null
      };
      insertUpdateIntoFiber(fiber, update);
      scheduleWork(fiber, expirationTime);
    }
  },

  callGetDerivedStateFromProps (workInProgress, nextProps, prevState) {
    const type = workInProgress.type
    let partialState
    if (typeof type.getDerivedStateFromProps === 'function') {
      // 注册了getDerivedStateFromProps
      partialState = type.getDerivedStateFromProps.call(null, nextProps, prevState)
    }
    return partialState
  },

  constructClassInstance (workInProgress, props) {
    const ctor = workInProgress.type // 构造器
    let instance = new ctor(props)

    instance.updater = this.updater
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
  }
}

export default ClassComponent