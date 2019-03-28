import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Picker } from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui';
import BarChart from '@/components/BarChart';
import PieChart from '@/components/PieChart';
import LineChart from '@/components/LineChart';
import getDays from '@/utils/day';
import Tabbar from '@/components/tabbar';
import { State } from '@/interface/charts';
import './index.less';

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页'
  };

  state: State;

  constructor() {
    super(...arguments);
    this.state = {
      loadingPie: true,
      loadingBar: true,
      dateSelPie:
        new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1 < 10
          ? '0' + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1) +
        '-' +
        (new Date().getDate() - 1 < 10
          ? '0' + (new Date().getDate() - 1)
          : new Date().getDate() - 1)
    };
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

  componentDidMount() {
    this.loading();
  }

  loading() {
    Promise.all([this.getBarData(), this.getPieData()]).then(() => {
      this.setState({
        loadingPie: false,
        loadingBar: false
      });
      this.getLineData();
    });
  }

  async getBarData() {
    this.setState({
      loadingBar: true
    });

    const data = await Taro.request({
      url:  API_GETWAY + 'faceInfo/classify',
      data: {
        date: this.state.dateSelPie
      }
    });
    if (data.data.code !== 'OK') {
      Taro.showToast({
        title: '请求超时',
        icon: 'error',
        duration: 1000
      });
      return;
    }

    const chartData = {
      dimensions: {
        data: data.data.data.map(item => item[0] + '-' + item[1])
      },
      measures: [
        {
          data: data.data.data.map(item => item[2])
        }
      ]
    };
    this.barChart.refresh(chartData);
  }

  async getPieData() {
    this.setState({
      loadingPie: true
    });

    const data = await Taro.request({
      url: API_GETWAY + 'faceInfo/sum',
      data: {
        date: this.state.dateSelPie
      }
    });
    if (data.data.code !== 'OK') {
      Taro.showToast({
        title: '请求超时',
        icon: 'error',
        duration: 1000
      });
      return;
    }
    const chartDataPie = [
      { value: data.data.data.maleNum, name: '男' },
      { value: data.data.data.femaleNum, name: '女' }
    ];
    this.pieChart.refresh(chartDataPie);
  }

  getLineData() {
    const chartDataLine = {
      dimensions: {
        data: getDays(-7, this.state.dateSelPie)
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

  onDateChangePie = e => {
    this.setState(
      {
        dateSelPie: e.detail.value
      },
      () => {
        this.loading();
      }
    );
  };

  render() {
    return (
      <View className='wrap'>
        <View className='br' />

        {this.state.loadingPie && this.state.loadingBar ? (
          <AtActivityIndicator mode='center' content='加载中...' />
        ) : (
          ''
        )}
        <View className='pie-chart'>
          {!this.state.loadingPie && !this.state.loadingBar ? (
            <Picker
              mode='date'
              onChange={this.onDateChangePie}
              className='date'
              value={this.state.dateSelPie}
            >
              <View className='picker'>当前选择：{this.state.dateSelPie}</View>
            </Picker>
          ) : (
            ''
          )}

          <PieChart ref={this.refPieChart} />
        </View>

        <View className='bar-chart'>
          <BarChart ref={this.refBarChart} />
        </View>

        <View className='line-chart'>
          <LineChart ref={this.refLineChart} />
        </View>
        <Tabbar current={0} fixed={false} />
      </View>
    );
  }
}


export default Index as ComponentClass;
