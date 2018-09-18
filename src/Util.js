/**
 * 通用的工具函数
 */
import Constance from './Constance'

const constance = new Constance()

class Util {
  processUpdateQueue (current, workInProgress, quene, instance, props, renderExpirationTime) {
    const currentQuene = quene
    quene = workInProgress.updateQuene = {
      baseState: currentQuene.baseState,
      expirationTime: currentQuene.expirationTime,
      first: currentQuene.first,
      last: currentQuene.last,
      isInitialized: currentQuene.isInitialized,
      capturedValues: currentQuene.capturedValues,
      // These fields are no longer valid because they were already committed.
      // Reset them.
      callbackList: null,
      hasForceUpdate: false
    }

    quene.expirationTime = constance.works.NoWork

    let state = null
    if (quene.isInitialized) {
      state = quene.baseState
    }else {
      state = quene.baseState = workInProgress.memorizedState
      quene.isInitialized = true
    }
    let dontMutatePrevState = true
    let update = quene.first
    let didSkip = false

    while(update) {
      // 遍历所有的update，assign所有的_partialState
      let updateExpirationTime = update.expirationTime
      if (updateExpirationTime > renderExpirationTime) {

      }

      if (!didSkip) {
        quene.first = quene.next
        if (!quene.first) {
          quene.last = null
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

    if (!didSkip) {
      didSkip = true,
      quene.baseState = state
    }
    return state
  }
}

export default Util