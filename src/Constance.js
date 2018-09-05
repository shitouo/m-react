/**
 * 常量
 */
class Constance {
  constructor () {
    this.effects = {
      NoEffect: 0,
      Placement: 2,
      Incomplete: 512
    }
    this.tags = {
      HostRoot: 3,
      ClassComponent: 2,
      FunctionalComponent: 1,
      HostText: 6
    }
    this.works = {
      NoWork: 0
    }
  }
}

export default Constance