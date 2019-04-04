import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components';
import { AtForm, AtInput, AtButton, AtToast } from 'taro-ui'

import {State} from '@/interface/login'

import './index.less'

export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '登录'
  }

  private userName:string =  ''
  private password:string =  ''

  state: State

  constructor () {
    super(...arguments)
    this.state = {
      isOpened: false,
      loading: true,
      isOpenMSg: false,
      errMsg: ''
    }
  }

  componentWillMount () {
    if(Taro.getStorageSync('username') === 'admin') {
      Taro.redirectTo({
        url: '/pages/index/index'
      })
      return
    }
  }

  onChangeUsername (value) {
    this.userName = value
  }

  onChangePassword (value) {
    this.password = value
  }

  onSubmit () {
    if(Object.is(this.userName,'') || Object.is(this.password,'')) {
      this.setState({
        isOpenMSg: true,
        errMsg: '请输入昵称或密码'
      })
      return
    }

    if(this.userName !== 'admin' || this.password !== '123456') {
      this.setState({
        isOpenMSg: true,
        errMsg: '昵称或密码错误'
      })
      return
    }

    this.setState({
      isOpened: true,
      isOpenMSg: false,
      loading: true
    })

    Taro.setStorageSync('username', this.userName)

    Taro.redirectTo({
      url: '/pages/index/index'
    })

  }
  onReset () {
   this.userName = ''
   this.password = ''
  }

  render () {
    return (
      <View className="wrap">
        <View className="title">
          <Text>益丰大药房人流统计</Text>
        </View>
        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            name='value'
            title='昵称'
            type='text'
            placeholder='请输入昵称'
            border
            value={this.userName}
            onChange={this.onChangeUsername.bind(this)}
          />
          <AtInput
            name='value'
            title='密码'
            type='password'
            placeholder='请输入密码'
            border
            value={this.password}
            onChange={this.onChangePassword.bind(this)}
          />
          <AtButton type='primary' formType='submit' className="login">登录</AtButton>
        </AtForm>

        <AtToast isOpened={this.state.isOpened} text="登录中"  status="loading"></AtToast>
        <AtToast isOpened={this.state.isOpenMSg} text={this.state.errMsg}  duration={1000}></AtToast>
      </View>

    )
  }
}
