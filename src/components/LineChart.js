import Taro, { Component } from "@tarojs/taro";

import * as echarts from "./ec-canvas/echarts";
// import "./ec-canvas/macarons"

function setChartData(chart, data) {
  let option = {
    title: {
        text: '近一周访问流量',
        textStyle:{
          fontSize: 14
        }
    },
    grid: {
      left: '12%',
      right: '6%',
      bottom: '15%'
    },
    xAxis : [
      {
        name:'',
        type: 'category',
        axisLabel: {
          show: true,
          textStyle: {
              fontSize:'8'
          }
        },
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
    yAxis : [
      {
        name:'人数(个)',
        type : 'value',
        axisLabel: {
          show: true,
          textStyle: {
              fontSize:'8'
          }
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
    series : [
     {
      name: 'xx',
      type: 'line',
      lineStyle: {
        normal:{
          color: '#1E9C0D',
          width: 3
        }
      }
     }
    ],
    color:['#1E9C0D'],
    tooltip: {
        trigger: 'axis',
        position: function (point, params, dom, rect, size) {
          // 固定在顶部

      }
    },
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
