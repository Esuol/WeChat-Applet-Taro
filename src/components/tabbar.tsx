import Taro from "@tarojs/taro";
import { AtTabBar } from 'taro-ui'

import './index.less'

export default class Tabbar extends Taro.Component {
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
      Taro.navigateTo({
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