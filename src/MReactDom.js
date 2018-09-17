/**
 * 自造的reactDom
 */
import ReactRoot from './ReactRoot'

// 定义全局变量
window.lastScheduledRoot = null
window.firstScheduledRoot = null
window.nextFlushedRoot = null
window.nestedUpdateCount = 0
window.nextFlushedExpirationTime = 0
window.isRendering = false
window.nextUnitOfWork = null
window.isRootReadyForCommit = false
window.interruptedBy = null
window.enableGetDerivedStateFromCatch = false

class MReactDom {
  render (elements, container) {
    // 1、把reactElement，转成Fiber tree
    // 2、解析
    // 3、commit
    
    // 先生成reactRoot，然后调用ReactRoot的render
    let reactRoot = new ReactRoot(container)
    reactRoot.render(elements)// 在调用到这的时候，elements已经通过babel和MReact.createElement生成reactElement了。
  }
}

export default new MReactDom()