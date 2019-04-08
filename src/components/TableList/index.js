import Taro, { Component } from '@tarojs/taro';
import { View, ScrollView, Text, Image } from '@tarojs/components';
import { AtPagination } from 'taro-ui';
import 'taro-ui/dist/style/components/flex.scss';
import './index.less';

export default class stayersTab extends Component {
  static defaultProps = {
    OutsiderList: []
  };

  render() {
    const { OutsiderList } = this.props;

    const firstTableList = OutsiderList.map((item, index) => {
      return (
        <View key={item.id} className='List at-row at-row__align--center'>
          <Text className='at-col at-col-6'>{index + 1}</Text>
          <Image
            mode='widthFix'
            className='at-col at-col-6'
            style='padding: 10px;'
            src={item}
          />
        </View>
      );
    });

    return (
      <View className='stayersTab'>
        <Text className='title'>流量统计列表</Text>
        <ScrollView
          scrollY
          scrollWithAnimation
          style='height: 800rpx;background-color: #FAFBFC;'
        >
          <View className='Stayertable'>
            <View className='tableTitle at-row'>
              <Text className='at-col at-col-2'>序号</Text>
              <Text className='at-col at-col-4'>图像</Text>
              <Text className='at-col at-col-2'>年龄</Text>
              <Text className='at-col at-col-2'>性别</Text>
              <Text className='at-col at-col-2'>表情</Text>
            </View>
            {firstTableList}
          </View>
        </ScrollView>

        <View className='margin20'>
          <AtPagination total={50} pageSize={10} current={1} />
        </View>
      </View>
    );
  }
}
