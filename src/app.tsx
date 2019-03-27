import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'


import Index from './pages/login/index'

import configStore from './store'

import 'taro-ui/dist/style/index.scss'

import './app.less'

const store = configStore()

class App extends Component {

  config: Config = {
    pages: [
      'pages/login/index',
      'pages/index/index',
      'pages/personal/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#38393e',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    plugins: {}
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
