import Taro, { Component } from "@tarojs/taro";
import * as echarts from "./ec-canvas/echarts";
// import "./ec-canvas/macarons"

function setChartData(chart, data) {
  let option = {
    grid: {
      left: '12%',
      right: '5%',
      bottom: '15%'
    },
    xAxis : [
      {
        type: 'category',
        data: [],
        axisTick: {
          alignWithLabel: true
        },
        nameTextStyle: {
          color: '#fff',
          fontSize: 14
        },
        splitLine: {
          show: true
        },
        axisLine: {
          lineStyle: {
            color: '#eee'
          }
        }
      }
    ],
    yAxis : [
      {
        type : 'value',
        nameTextStyle: {
          color: '#fff',
          fontSize: 14
        },
        splitLine: {
          show: true
        },
        axisLine: {
          lineStyle: {
            color: '#eee'
          }
        }
      }
    ],
    series : []
  };
  if (data && data.dimensions && data.measures) {
    option.xAxis[0].data = data.dimensions.data
    option.series = data.measures.map(item => {
      return {
        ...item,
        type:'line',
      }
    })
  }
  chart.setOption(option);
}

export default class LineChart extends Component {
  config = {
    usingComponents: {
      "ec-canvas": "./ec-canvas/ec-canvas"
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
