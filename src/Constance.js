/**
 * 常量
 */
class Constance {
  constructor () {
    this.effects = {
      NoEffect: 0,
      Placement: 2,
      PlacementAndUpdate: 6,
      Incomplete: 512,
      PerformedWork: 1,
      Update: 4,
      Deletion: 8,
      Callback: 32,
      Snapshot: 2048
    }
    this.tags = {
      HostRoot: 3,
      ClassComponent: 2,
      FunctionalComponent: 1,
      HostText: 6,
      HostComponent: 5
    }
    this.works = {
      NoWork: 0
    }
    this.$$types = {
      REACT_ELEMENT_TYPE: (typeof Symbol === 'function' && Symbol.for)? Symbol.for('react.element') : 0xeac7,
      REACT_PORTAL_TYPE: (typeof Symbol === 'function' && Symbol.for)? Symbol.for('react.portal') : 0xeaca,
    }

    this.mode = {
      sync: 1
    }
  }
}

export default Constance