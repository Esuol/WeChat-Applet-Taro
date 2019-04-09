import Taro from "@tarojs/taro";
import { AtTabBar } from 'taro-ui'

export default class Tabbar extends Taro.Component {
  defaultProps = {
    current: 1,
    fixed: false
  }

  state: {
    current:number
  }

  constructor () {
    super(...arguments)
    this.state = {
      current: this.props.current
    }
  }
  handleClick (value) {
    this.setState({
      current: value
    },() => {
      Taro.redirectTo({
        url: this.state.current === 0 ? '/pages/index/index' : '/pages/personal/index'
      })
    })
  }
  render () {

    return (
      <AtTabBar
        className="tabbar"
        fixed={this.props.fixed}
        backgroundColor="#fff"
        tabList={[
          { title: '主页', },
          { title: '个人中心' }
        ]}
        onClick={this.handleClick.bind(this)}
        current={this.state.current}
      />
    )
  }
}


//120.55.44.51:8086