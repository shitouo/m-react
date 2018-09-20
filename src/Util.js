/**
 * 通用的工具函数
 */
import Constance from './Constance'

const constance = new Constance()

class Util {
  processUpdateQueue (current, workInProgress, queue, instance, props, renderExpirationTime) {
    const currentQueue = queue
    queue = workInProgress.updateQueue = {
      baseState: currentQueue.baseState,
      expirationTime: currentQueue.expirationTime,
      first: currentQueue.first,
      last: currentQueue.last,
      isInitialized: currentQueue.isInitialized,
      capturedValues: currentQueue.capturedValues,
      // These fields are no longer valid because they were already committed.
      // Reset them.
      callbackList: null,
      hasForceUpdate: false
    }

    queue.expirationTime = constance.works.NoWork

    let state = null
    if (queue.isInitialized) {
      state = queue.baseState
    }else {
      state = queue.baseState = workInProgress.memorizedState
      queue.isInitialized = true
    }
    let dontMutatePrevState = true
    let update = queue.first
    let didSkip = false

    while(update) {
      // 遍历所有的update，assign所有的_partialState
      let updateExpirationTime = update.expirationTime
      if (updateExpirationTime > renderExpirationTime) {

      }

      if (!didSkip) {
        queue.first = queue.next
        if (!queue.first) {
          queue.last = null
        }
      }

      // process the update
      let _partialState = null
      if (update.isReplace) {

      }else {
        _partialState = update.partialState
        if (_partialState) {
          if (dontMutatePrevState) {
            state = Object.assign({}, state, _partialState)
          }
        }
        dontMutatePrevState = false
      }
      if (update.isForced) {
        queue.hasForceUpdate = true
      }
      update = update.next
    }

    if (update.callback) {
      let _callBackList = queue.callbackList
      if (_callBackList === null) {
        _callBackList = queue.callbackList = []
      }
      _callBackList.push(update)
    }

    if (queue.callbackList !== null) {
      workInProgress.effectTag |= constance.effects.Callback
    } else if (!queue.first && !queue.hasForceUpdate && !queue.capturedValues) {
      // The queue is empty. We can reset it.
      workInProgress.updateQueue = null
    }

    if (!didSkip) {
      didSkip = true,
      queue.baseState = state
    }
    return state
  }
}

export default Util