/**
 * 自造的reactDom
 */
class MReactDom {
  render (elements, container) {
    // 1、把reactElement，转成Fiber tree
    // 2、解析
    // 3、commit
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
}