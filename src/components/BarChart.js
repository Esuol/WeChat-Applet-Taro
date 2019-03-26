import Taro, { Component } from '@tarojs/taro';
import * as echarts from './ec-canvas/echarts';
// import "./ec-canvas/macarons"

function setChartData(chart, data) {
  let option = {
    title: {
        text: '直方图',
        textStyle:{
          fontSize: 14
        }
    },
    series: [],
    grid: {
      left: '12%',
      right: '7%',
      bottom: '15%'
    },
    xAxis: [
      {
        name: 'x',
        type: 'category',
        data: [],
        axisTick: {
          alignWithLabel: true
        },
        nameTextStyle: {
          color: '#000',
          fontSize: 14
        },
        splitLine: {
          show: true
        },
        axisLine: {
          lineStyle: {
            color: '#000'
          }
        }
      }
    ],
    yAxis: [
      {
        name: 'y',
        type: 'value',
        nameTextStyle: {
          color: '#000',
          fontSize: 14
        },
        axisLine: {
          lineStyle: {
            color: '#000'
          }
        }
      }
    ],
    color:['#1E9C0D']
  };
  if (data && data.dimensions && data.measures) {
    option.xAxis[0].data = data.dimensions.data;
    option.series = data.measures.map(item => {
      return {
        ...item,
        type: 'bar',
        name: 'value',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'top',
                color: '#1E9C0D',
            }
        }
      };
    });
  }
  chart.setOption(option);
}

export default class PieChart extends Component {
  config = {
    usingComponents: {
      'ec-canvas': './ec-canvas/ec-canvas'
    }
  };

  constructor(props) {
    super(props);
  }

  state = {
    ec: {
      lazyLoad: true
    }
  };

  refresh(data) {
    this.Chart.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setChartData(chart, data);
      return chart;
    });
  }

  refChart = node => (this.Chart = node);

  render() {
    return (
      <ec-canvas
        ref={this.refChart}
        canvas-id='mychart-area'
        ec={this.state.ec}
      />
    );
  }
}
