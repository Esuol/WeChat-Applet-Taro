import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import BarChart from '../../components/BarChart';
import PieChart from '../../components/PieChart';
import LineChart from '../../components/LineChart';

import './index.less';

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页'
  };

  barChart: { refresh: any };

  pieChart: { refresh: any };

  lineChart: { refresh: any };

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidMount() {
    const chartData = {
      dimensions: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      measures: [
        {
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };

    this.barChart.refresh(chartData);

    const chartDataPie = [
      { value: 335, name: '直接访问' },
      { value: 310, name: '邮件营销' },
      { value: 234, name: '联盟广告' },
      { value: 135, name: '视频广告' },
      { value: 1548, name: '搜索引擎' }
    ];
    this.pieChart.refresh(chartDataPie);

    const chartDataLine = {
      dimensions: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
