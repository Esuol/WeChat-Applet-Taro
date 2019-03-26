import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui'
import BarChart from '../../components/BarChart';
import PieChart from '../../components/PieChart';
import LineChart from '../../components/LineChart';
import getDays from '../../utils/day'
import {State} from '../../interface/charts'
import './index.less';

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页'
  };

  state: State

  constructor () {
    super(...arguments)
    this.state = {
      loadingPie: true,
      loadingBar: true
    }
  }

  barChart: { refresh: any };

  pieChart: { refresh: any };

  lineChart: { refresh: any };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  async componentDidMount() {
    await this.getBarData()
    await this.getPieData()
    await this.getLineData()
    this.setState({
      loadingPie: false
    })

    this.setState({
      loadingBar: false
    })
  }

  async getBarData () {
    console.log('bar')
    const data = await Taro.request({
      url: 'http://192.168.2.155:8086/faceInfo/classify'
    })
   if(data.data.code !== 'OK') {
    Taro.showToast({
      title: '请求超时',
      icon: 'error',
      duration: 1000
    })
    return
   }

    const chartData = {
      dimensions: {
        data: data.data.data.map(item => item[0] + '/' + item[1])
      },
      measures: [
        {
          data: data.data.data.map(item => item[2])
        }
      ]
    }
    this.barChart.refresh(chartData);
  }

  async getPieData () {
    console.log('pie')
    const data = await Taro.request({
      url: 'http://192.168.2.155:8086/faceInfo/sum'
    })
    if(data.data.code !== 'OK') {
      Taro.showToast({
        title: '请求超时',
        icon: 'error',
        duration: 1000
      })
      return
     }
     const chartDataPie = [
        { value: data.data.data.maleNum, name: '男' },
        { value: data.data.data.femaleNum, name: '女' }
      ];
      this.pieChart.refresh(chartDataPie);
  }

  getLineData () {
    const chartDataLine = {
      dimensions: {
        data: getDays(-7)
      },
      measures: [
        {
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };
    this.lineChart.refresh(chartDataLine);
  }

  refBarChart = (node: any) => (this.barChart = node);

  refPieChart = (node: any) => (this.pieChart = node);

  refLineChart = (node: any) => (this.lineChart = node);

  render() {

    return (
         <View className='wrap'>
              <View className='br'></View>
              {(this.state.loadingPie)
                 ? <AtActivityIndicator content='加载中...'></AtActivityIndicator>
                 : ''
              }

              <View className='bar-chart'>
                <BarChart ref={this.refBarChart} />
              </View>

              <View className='pie-chart'>
                <PieChart ref={this.refPieChart} />
              </View>

              <View className='line-chart'>
                <LineChart ref={this.refLineChart} />
            </View>
          </View>
    );
  }
}

export default Index as ComponentClass;
