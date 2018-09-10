/**
 * 自造的reactDom
 */
import ReactRoot from './ReactRoot'

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