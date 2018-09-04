/**
 * MReact的主文件
 */
const REACT_ELEMENT_TYPE = (typeof Symbol === 'function' && Symbol.for)? Symbol.for('react.element') : 0xeac7

class MReact {
  createElement (type, config, ...children) {
    let props = {}
    if (config) {
      for (let propName in config) {
        if (config.hasOwnProperty(propName)) {
          props[propName] = config[propName]
        }
      }
    }
    if (children) {
      props.children = children
    }
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      props
    }
  }
}

export default new MReact()