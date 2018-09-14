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
      this.insertUpdateIntoFiber(fiber, update);
      scheduleWork(fiber, expirationTime);
    },
    insertUpdateIntoFiber (fiber, update, expirationTime) {
      let alternate = fiber.alternate
      let queue1
      let queue2
      if (!alternate) {
        queue1 = fiber.updateQueue
        queue2 = null
        if (queue1 === null) {
          queue1 = fiber.updateQueue = this.createUpdateQueue(fiber.memorizedState)
        }
      }else {
        // there are two owners???
        queue1 = fiber.updateQueue
        queue2 = alternate.updateQueue
        if (queue1 === null) {
          if (queue2 === null) {
            // 两个队列都没有
            queue1 = fiber.updateQueue = this.createUpdateQueue(fiber.memorizedState)
            queue2 = alternate.updateQueue = this.createUpdateQueue(alternate.memorizedState)
          }else {
            // queue1没有，queue2有
            queue1 = fiber.updateQueue = this.createUpdateQueue(fiber.memorizedState)
          }
        }else {
          if (queue2 === null) {
            // queue1有，queue2没有
            queue2 = alternate.updateQueue = this.createUpdateQueue(alternate.memorizedState)
          }else {
            // 都有，不做任何操作
          }
        }
      }

      if (queue2 === null || queue1 === queue2) {
        // there's a single queue
        this.appendUpdateToQueue(queue1, update, expirationTime)
      }
    },
    appendUpdateToQueue (queue, update, expirationTime) {

    },
    createUpdateQueue (baseState) {
      const queue = {
        expirationTime: constance.works.NoWork,
        baseState: baseState,
        firstUpdate: null,
        lastUpdate: null,
        firstCapturedUpdate: null,
        lastCapturedUpdate: null,
        firstEffect: null,
        lastEffect: null,
        firstCapturedEffect: null,
        lastCapturedEffect: null
      }
      return queue
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