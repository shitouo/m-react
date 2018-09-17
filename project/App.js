import MReact from '../src/MReact'

class App extends MReact.Component {
  constructor () {
    super()
    this.state = {
      'content': 111
    }
  }

  getDerivedStateFromProps () {

  }

  componentDidMount () {
    this.setState({
      'content': '222'
    })
  }

  render () {
    return (
      <div>{this.state.content}</div>
    )
  }
}

export default App