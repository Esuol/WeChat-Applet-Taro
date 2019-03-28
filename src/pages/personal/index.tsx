import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components';
import {  AtButton , AtModal } from 'taro-ui'
import Tabbar from '@/components/tabbar'
import './index.less'

export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '个人中心'
  }

  state:{
    isOpened: boolean
  }

  constructor () {
    super(...arguments)
    this.state = {
      isOpened: false
    }
  }

  loginOut () {
    this.setState({
      isOpened: true
    })
  }

  handleClose () {
    this.setState({
      isOpened: false
    })
  }

  handleCancel () {
    this.setState({
      isOpened: false
    })
  }

  handleConfirm () {
    this.setState({
      isOpened: false
    })
    Taro.removeStorageSync('username')
    Taro.showToast({
      title: '退出成功',
      icon: 'success',
      duration: 1000
    }).then(() => {
      setTimeout(() => {
        Taro.navigateTo({
          url: '/pages/login/index'
        })
      }, 1000);
    })
  }
  render () {
    return (
      <View className="wrap">
        <AtButton type='primary' onClick={this.loginOut}>退出登录</AtButton>
        <View>
          <Tabbar current={1} fixed={true}></Tabbar>
        </View>

        <AtModal
          isOpened={this.state.isOpened}
          title='提示'
          cancelText='取消'
          confirmText='确认'
          onClose={ this.handleClose }
          onCancel={ this.handleCancel }
          onConfirm={ this.handleConfirm }
          content='确认退出登录吗！'
        />
      </View>
    )
  }

}