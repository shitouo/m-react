/**
 * MReact的主文件
 */
import Constance from './Constance'

const constance = new Constance()

let didWarnStateUpdateForUnmountedComponent = {}

const ReactNoopUpdateQuene = {
  isMounted () {
    return false
  },
  warnNoop (publicInstance, callerName) {
    const _constructor = publicInstance.constructor
    const componentName = _constructor && (_constructor.name || _constructor.displayName) || 'ReactClass'
    const warningKey = `&{componentName}.${callerName}`
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return false
    }
    didWarnStateUpdateForUnmountedComponent[warningKey] = true
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
    this.update = updater || ReactNoopUpdateQuene
  }
  setState (partialState, callback) {
    this.updater.enqueneSetState(this, partialState, callback)
  }
  forUpdate (callback) {
    this.updater.enqueneForceUpdate(this, callback)
  }
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
      if (children.length === 1) {
        props.children = children[0]
      }
    }
    return {
      $$typeof: constance.$$types.REACT_ELEMENT_TYPE,
      type,
      props
    }
  },
  Component: Component
}

export default MReact