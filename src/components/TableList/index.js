import Taro, { Component } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtPagination } from 'taro-ui';
import 'taro-ui/dist/style/components/flex.scss';
import './index.less';

export default class stayersTab extends Component {
  static defaultProps = {
    OutsiderList: {},
    onShowModal: () => {},
    onPageChange: () => {}
  };

  constructor() {
    this.state = {
      bigImg: false,
      imgUrl: ''
    }
  }

  showImg(imgUrl, ifshow) {
    this.props.onShowModal(ifshow)

    this.setState({
      bigImg: ifshow,
      imgUrl
    });
  }

  render() {
    const { OutsiderList: {list} } = this.props;
    const { OutsiderList } = this.props;

    if(!list) return

    const firstTableList = list.map((item) => {
      return (
        <View key={item.id} className='List at-row at-row__align--center'>
          <Text className='at-col at-col-2'>{item.id}</Text>
          <Image
            mode='widthFix'
            className='at-col at-col-4'
            style='padding:0 10px;width:90rpx;height:90rpx'
            src={item.image}
            onClick={() => this.showImg(item.image, true)}
          />
          <Text className='at-col at-col-2'>{item.age}</Text>
          <Text className='at-col at-col-2'>{item.gender === 0 ? '女': '男'}</Text>
          <Text className='at-col at-col-2'>{item.expression === 0 ? '中性表情' : (item.expression === 1?'微笑':'大笑')}</Text>
        </View>
      );
    });

    return (
      <View className='stayersTab'>
        <Image
          style={this.state.bigImg?'display:normal':'display:none'}
          className='bigSize'
          src={this.state.imgUrl}
          onClick={() => this.showImg('', false)}
        />
        <Text className='title'>流量统计列表</Text>
        {/* <ScrollView
          scrollY
          scrollWithAnimation
          style='height: 800rpx;background-color: #FAFBFC;'
        > */}
        <View className='Stayertable'>
          <View className='tableTitle at-row'>
            <Text className='at-col at-col-2'>ID</Text>
            <Text className='at-col at-col-4'>图像</Text>
            <Text className='at-col at-col-2'>年龄</Text>
            <Text className='at-col at-col-2'>性别</Text>
            <Text className='at-col at-col-2'>表情</Text>
          </View>
          {list.length <= 1 ? <Text className='noData'>暂无数据</Text> : firstTableList}
        </View>
        {/* </ScrollView> */}
        <View className='margin20'>
          <AtPagination
            onPageChange={this.props.onPageChange}
            total={OutsiderList.total}
            pageSize={10}
            current={OutsiderList.pageNum}
          />
        </View>
      </View>
    );
  }
}
