/**
 * 调度工作，控制work的流程
 */
import Constance from './Constance'
import UpdateWorks from './UpdateWorks'

const constance = new Constance()
const updateWorks = new UpdateWorks()
let isRootReadyForCommit = false
let isWorking = false
let isCommiting = false

class ScheduleWork {
  workLoop (nextUnitOfWork) {
    while (nextUnitOfWork !== null) {
      nextUnitOfWork = this.performUnitOfWork(nextUnitOfWork);
    }
  }

  performUnitOfWork (workInProgress) {
    const next = this.beginWork(workInProgress.alternate, workInProgress, 1)

    if (next === null) {
      // 当前分支解析到叶子结点了，返回efftces给return，并寻找其他分支还未解析的节点
       this.completeUnitOfWork(workInProgress)
    }

    return next
  }

  completeUnitOfWork (workInProgress) {
    // 合并当前effects到return上，然后找到其他还未解析的fiber节点
    while(true) {
      let current = workInProgress.alternate
      let returnFiber = workInProgress.return
      let siblingFiber = workInProgress.siblings

      if ((workInProgress.effectTag & constance.effects.Incomplete) === constance.effects.NoEffect) {
        // 当前节点已经完成
        // 处理当前节点，做好commit前的准备工作
        let next = this.completeWork(current, workInProgress)
        if (next) {

        }
        // 要保证return的所有子节点都complete，才会合并effects提交
        if (returnFiber && (returnFiber.effectTag & constance.effects.Incomplete) === constance.effects.NoEffect) {
          // 合并children的effects到return
          if (returnFiber.firstEffect === null) {
            returnFiber.firstEffect = workInProgress.firstEffect
          }
          if (workInProgress.lastEffect) {
            if (returnFiber.lastEffect) {
              returnFiber.lastEffect.nextEffect = workInProgress.firstEffect
            }
            returnFiber.lastEffect = workInProgress.lastEffect
          }
          
        }
        // 合并自身的effects到return，并且是在children的后面
        const effectTag = workInProgress.effectTag
        if (effectTag > constance.effects.PerformedWork) {
          if (returnFiber.lastEffect) {
            returnFiber.lastEffect.nextEffect = workInProgress // 这里的结构类似于链表结构
          }else {
            returnFiber.firstEffect = workInProgress
          }
          returnFiber.lastEffect = workInProgress
        }

        if (siblingFiber) {
          return siblingFiber
        }else if(returnFiber) {
          workInProgress = returnFiber
          continue
        }else {
          // reached the root
          isRootReadyForCommit = true
          return null
        }
      }

      return null
    }
  }

  completeWork (current, workInProgress, renderExpirationTime) {
    const newProps = workInProgress.pendingProps
    switch(workInProgress.tag) {
      case constance.tags.HostText: 
        {
          let newText = newProps
          if (current && workInProgress.stateNode !== null) {

          }else {
            // TODO: 后面要采用栈的形式来获取ContainerInstance
            const _rootContainerInstance = document.getElementById('root')
            workInProgress.stateNode = updateWorks.createTextInstance(newText, workInProgress)
          }
          return null
        }
    }
  }

  beginWork (current, workInProgress, renderExpirationTime) {
    switch(workInProgress.tag) {
      case constance.tags.HostRoot:
        return updateWorks.updateHostRoot(current, workInProgress, renderExpirationTime)
      case constance.tags.HostText:
        return updateWorks.updateHostText(current, workInProgress)  
    }
  }

  commitRoot (finishedWork, container) {
    isWorking = true
    isCommiting = true

    let root = finishedWork.stateNode
    let committedExpirationTime = root.pendingCommitExpirationTime
    root.pendingCommitExpirationTime = constance.works.NoWork
    
    let firstEffect = null
    if (finishedWork.effectTag > constance.effects.PerformedWork) {
      // 当前root也有修改
      if (finishedWork.lastEffect) {
        finishedWork.lastEffect.nextEffect = finishedWork
        firstEffect = finishedWork.firstEffect
      } else {
        firstEffect = finishedWork
      }
    }else {
      // 当前root没有修改
      firstEffect = finishedWork.firstEffect
    }

    let nextEffect = firstEffect
    while (nextEffect) {
      let effectTag = nextEffect.effectTag
      let primaryEffectTag = effectTag & (constance.effects.Placement | constance.effects.Update | constance.effects.Deletion);
      switch(primaryEffectTag) {
        case constance.effects.Placement: {
          this.commitPlacement(nextEffect, container)
          nextEffect.effectTag &= ~constance.effects.Placement // 去掉当前任务
          break;
        }
      }
      nextEffect = nextEffect.nextEffect;
    }
  }

  commitPlacement(finishedWork, container) {
    container.appendChild(finishedWork.stateNode)
  }

}

export default ScheduleWork