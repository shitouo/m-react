/**
 * MReact的主文件
 */
const REACT_ELEMENT_TYPE = (typeof Symbol === 'function' && Symbol.for)? Symbol.for('react.element') : 0xeac7

let didWarnStateUpdateForUnmountedComponent = {}

const ReactNoopUpdateQuene = {
  isMounted () {
    return false
  },
  warnNoop (publicInstance, callerName) {
    const _constructor = publicInstance.constructor
    const componentName = _constructor && (_constructor.name || _constructor.displayName) || 'ReactClass'
    const warningKey = `&{componentName}.${callerName}`
    if ()
  },
  enqueneForceUpdate (publicInstance, callback) {
    this.warnNoop(publicInstance, 'forceUpdate')
  },
  enqueneSetState (publicInstance, partialState, callback) {
    this.warnNoop(publicInstance, 'setState')
  }
}

class Component {
  // 所有的组件都要继承这个类，因为这个类上有setState和forceUpdate
  constructor (props, context, updater) {
    this.props = props
    this.context = context
    this.update = updater || 
  }
  setState () {}
  forUpdate () {}
}

const MReact = {
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
  },
  Component: Component
}

export default MReact