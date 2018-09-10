/**
 * update类，记录所有节点类型的update方法
 */
class UpdateWorks {
  updateHostText (current, workInProgress) {
    workInProgress.memorizedProps = workInProgress.pendingProps
    return null
  }

  updateHostRoot (current, workInProgress, renderExpirationTime) {
    let updateQuene = workInProgress.updateQuene
    if (updateQuene) {
      const prevState = workInProgress.memorizedState
      const state = this.processUpdateQuene(current, workInProgress, updateQuene, null, null, renderExpirationTime)
      workInProgress.memorizedState = state
      updateQuene = workInProgress.updateQuene

      let element = state.element

      this.reconcileChildren(current, workInProgress, element)
    }
    return workInProgress.child
  }

  
}