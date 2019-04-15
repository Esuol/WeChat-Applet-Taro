import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Picker, Text } from '@tarojs/components';
import { AtActivityIndicator } from 'taro-ui';
import BarChart from '@/components/BarChart';
import PieChart from '@/components/PieChart';
import LineChart from '@/components/LineChart';
import TableList from '@/components/TableList';
import getDays from '@/utils/day';
import getday from '@/utils/getday';
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
      bardata: [],
      piedata: [],
      linedate: [],
      OutsiderList: {},
      pageNum:0,
      barloading: false,
      pieloading: false,
      dateSel: getday(-1, '-'),
      modalShow: false
    };
  }

  barChart: { refresh: any };

  pieChart: { refresh: any };

  lineChart: { refresh: any };

  componentWillReceiveProps() {
    // console.log(this.props, nextProps);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidMount() {
    this.loading();
    setInterval(() => {
      this.loading();
    }, 10000);
  }

  loading() {
    Promise.all([
      this.getBarData(),
      this.getPieData(),
      this.getTableList(false)
    ]).then(() => {
      this.setState({
        loadingPie: false,
        loadingBar: false
      });
      this.getLineData();
    });
  }

  async getBarData() {
    if (!this.state.barloading) {
      this.setState({
        loadingBar: true
      });
    }

    const data = await Taro.request({
      url: API_GETWAY + 'faceInfo/classify',
      data: {
        date: this.state.dateSel
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

    if (JSON.stringify(this.state.bardata) !== JSON.stringify(chartData)) {
      this.setState({
        bardata: chartData,
        barloading: true
      });
      this.barChart.refresh(chartData);
    }
  }

  async getPieData() {
    if (!this.state.pieloading) {
      this.setState({
        loadingPie: true
      });
    }

    const data = await Taro.request({
      url: API_GETWAY + 'faceInfo/sum',
      data: {
        date: this.state.dateSel
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

    if (JSON.stringify(this.state.piedata) !== JSON.stringify(chartDataPie)) {
      this.setState({
        piedata: chartDataPie,
        pieloading: true
      });
      this.pieChart.refresh(chartDataPie);
    }
  }

  async getTableList(val:any) {
    const getData = async () => {
      const TableListdata = await Taro.request({
        url: API_GETWAY + 'faceInfo/page',
        data: {
          date: this.state.dateSel,
          page: this.state.pageNum,
          size: 10
        }
      })

      if (TableListdata.data.code !== 'OK') {
        Taro.showToast({
          title: '请求超时',
          icon: 'error',
          duration: 1000
        });
        return;
      }

      this.setState({
        OutsiderList: TableListdata.data.data
      })
    }

    if(val) {
      this.setState({
        pageNum: val.current
      }, () => getData()
      )
    }else {
      getData()
    }
  }

  getLineData() {
    const chartDataLine = {
      dimensions: {
        data: getDays(-7, this.state.dateSel)
      },
      measures: [
        {
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    };

    if (JSON.stringify(this.state.linedate) !== JSON.stringify(chartDataLine)) {
      this.setState({
        linedate: chartDataLine
      });
      this.lineChart.refresh(chartDataLine);
    }
  }

  onShowModal (val:any) {
    this.setState({
      modalShow: val
    });
  }

  refBarChart = (node: any) => (this.barChart = node);

  refPieChart = (node: any) => (this.pieChart = node);

  refLineChart = (node: any) => (this.lineChart = node);

  onDateChangePie = e => {
    this.setState(
      {
        dateSel: e.detail.value
      }, () => {
        this.loading();
        this.getTableList(false);
      }
    );
  };

  render() {
    return (
      <View className='wrap' >
        <View className='br' />

        {this.state.loadingPie && this.state.loadingBar ? (
          <AtActivityIndicator mode='center' content='加载中...' />
        ) : (
          ''
        )}
        <View className='pie-chart'  style={this.state.modalShow === true?"display:none":"display:normal"}>
          {!this.state.loadingPie && !this.state.loadingBar ? (
            <Picker
              mode='date'
              onChange={this.onDateChangePie}
              className='date'
              value={this.state.dateSel}
            >
              <View className='picker'>当前选择：{this.state.dateSel}</View>
            </Picker>
          ) : ('')}
          <Text className='title'>
            每天到店人数:
            {this.state.piedata.length > 1 ?this.state.piedata[0].value + this.state.piedata[1].value: ''}
          </Text>
          <PieChart ref={this.refPieChart} />
        </View>

        <View className='bar-chart'  style={this.state.modalShow === true?"display:none":"display:normal"}>
          <Text className='title'>客流量年龄分布</Text>
          <BarChart ref={this.refBarChart} />
        </View>

        <TableList
          OutsiderList={this.state.OutsiderList}
          onPageChange={this.getTableList.bind(this)}
          onShowModal={this.onShowModal.bind(this)} />

        <View className='line-chart'  style={this.state.modalShow === true?"display:none":"display:normal"}>
          <Text className='title'>近一周访问流量</Text>
          <LineChart ref={this.refLineChart} />
        </View>
        <Tabbar current={0} fixed={false} />
      </View>
    );
  }
}

export default Index as ComponentClass;
