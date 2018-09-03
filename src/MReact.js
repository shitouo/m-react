/**
 * MReact的主文件
 */
import FiberNode from './FiberNode'
import Constance from './Constance'

const constance = new Constance()
const NoWork = 0

class MReact {
  render (elements, container) {
    // 1、把elements生成Fiber tree
    // 2、解析
    // 3、commit
    // this.elements2FiberTree(elements)
    // 先实现将jsx转为reactElement，然后插入到页面中
    if (typeof elements === 'string') {
      console.log(elements)
      container.innerHTML = elements
      return
    }
    if (typeof elements === 'object') {
      const dom = document.createElement(elements.type)
      if (elements.props && elements.props.children) {
        const children = elements.props.children
        children.forEach(item => {
          this.render(item, dom)
        });
      }
      container.appendChild(dom)
    }
  }

  createElement (type, config, ...children) {
    let props = {}
    if (config) {
      props.config = config
    }
    if (children) {
      props.children = children
    }
    return {
      type,
      props
    }
  }

  elements2FiberTree (elements) {

  }

  createFiberRoot (containerInfo) {
    // let uninitiallizedFiber = new FiberNode(constance.tags.HostRoot,constance.effects.NoEffect)
    // let root = {
    //   current: uninitiallizedFiber,
    //   containerInfo: containerInfo,
    //   finishedWork: null,
    //   remainingExpirationTime: NoWork,
    //   firstBatch: null
    // }
    // uninitiallizedFiber.stateNode = root
    // return root
  }

  Reconciler () {

  }

  commit () {

  }

}

export default new MReact()