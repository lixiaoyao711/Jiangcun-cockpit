<template>
  <div class="left2">
    <div class="title">
      <div class="left">
        <img class="title-img" src="@/assets/image/lsjt.png" alt="" />
        <div class="text">六六行动比学赶超</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="info">
      <Tabs :propsData="tabsData" v-model:index="currentIndex" />
      <div class="list" v-if="currentIndex === 0">
        <div class="list-box">
          <div class="item" v-for="(item, index) in listData" :key="index">
            <div class="name">{{ item.name }}</div>
            <div class="value-box">
              <div class="number" :title="item.value">{{ item.value }}</div>
              <div class="unit">{{ item.unit }}</div>
            </div>
            <div :class="orderMap[item.order]">
              <div class="number">{{ item.rank }}</div>
            </div>
            <div :class="orderMap[item.order]">
              <div class="number">{{ item.orderNumber }}</div>
              <el-icon v-if="item.order === '上升'"><Top /></el-icon>
              <el-icon v-if="item.order === '水平'">-</el-icon>
              <el-icon v-if="item.order === '下降'"><Bottom /></el-icon>
            </div>
            <div class="tags">贡献 {{ item.contribution }}%</div>
          </div>
        </div>
      </div>
      <div class="list1" v-if="currentIndex === 1">
        <div class="list1-count">
          <div class="count-left">
            <div class="sub-title">
              <div class="left">
                <el-icon><CaretRight /></el-icon>
                <div class="text sub-title-text">财政总税收</div>
              </div>
              <div class="time"></div>
            </div>
            <div class="count-item">
              <div class="count-item-name">
                {{ economicData['数字经济-六六行动比学赶超-财政税收-时间范围'].value.replace(/\,/g, '~') }}
              </div>
              <div class="count-item-value-box">
                <div class="number">{{ economicData['数字经济-六六行动比学赶超-财政税收-金额'].value }}</div>
                <div class="unit">{{ economicData['数字经济-六六行动比学赶超-财政税收-金额'].unit }}</div>
              </div>
            </div>
            <div class="count-item">
              <div class="count-item-name">排名</div>
              <div class="count-item-value-box">
                <div class="unit">第</div>
                <div class="number">{{ economicData['数字经济-六六行动比学赶超-财政税收-排名'].value }}</div>
                <div class="unit">名</div>
              </div>
            </div>
          </div>
          <div class="count-right">
            <div class="sub-title">
              <div class="left">
                <el-icon><CaretRight /></el-icon>
                <div class="text sub-title-text">一般公共预算收入</div>
              </div>
              <div class="time"></div>
            </div>
            <div class="count-item">
              <div class="count-item-name">
                {{ economicData['数字经济-六六行动比学赶超-一般公共预算收入-时间范围'].value.replace(/\,/g, '~') }}
              </div>
              <div class="count-item-value-box">
                <div class="number">{{ economicData['数字经济-六六行动比学赶超-一般公共预算收入-金额'].value }}</div>
                <div class="unit">{{ economicData['数字经济-六六行动比学赶超-一般公共预算收入-金额'].unit }}</div>
              </div>
            </div>
            <div class="count-item">
              <div class="count-item-name">排名</div>
              <div class="count-item-value-box">
                <div class="unit">第</div>
                <div class="number">{{ economicData['数字经济-六六行动比学赶超-一般公共预算收入-排名'].value }}</div>
                <div class="unit">名</div>
              </div>
            </div>
          </div>
        </div>

        <div class="list-box">
          <div class="item" v-for="(item, index) in listData1" :key="index">
            <div class="name">{{ item.name }}</div>
            <div class="value-box">
              <div class="number" :title="item.value">{{ item.value }}</div>
              <div class="unit">{{ item.unit }}</div>
            </div>
            <div :class="orderMap[item.order]">
              <div class="number">{{ item.rank }}</div>
            </div>
            <div :class="orderMap[item.order]">
              <div class="number">{{ item.orderNumber }}</div>
              <el-icon v-if="item.order === '上升'"><Top /></el-icon>
              <el-icon v-if="item.order === '水平'">-</el-icon>
              <el-icon v-if="item.order === '下降'"><Bottom /></el-icon>
            </div>
            <div class="tags">贡献 {{ item.contribution }}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import { timeFormat } from '@/utils/common';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const economicData = computed(() => {
  return store.state.economicData;
});
let currentIndex = ref(0);
let tabsData = ['主要经济指标', '其他指标'];
let listData = ref([]);
let listData1 = ref([]);
const orderMap = {
  上升: 'rank',
  水平: 'line',
  下降: 'rankDown',
};
function initListData() {
  listData.value = [
    {
      name: '规上工业增加值增速',
      value: economicData.value['数字经济-六六行动比学赶超-主要经济指标-规上工业增加值增速-金额'].value,
      unit: economicData.value['数字经济-六六行动比学赶超-主要经济指标-规上工业增加值增速-金额'].unit,
      rank: economicData.value['数字经济-六六行动比学赶超-主要经济指标-规上工业增加值增速-名次'].value,
      contribution: economicData.value['数字经济-六六行动比学赶超-主要经济指标-规上工业增加值增速-贡献占比'].value,
      order: economicData.value['数字经济-六六行动比学赶超-主要经济指标-规上工业增加值增速-顺序'].value,
      orderNumber: economicData.value['数字经济-六六行动比学赶超-主要经济指标-规上工业增加值增速-数量'].value,
    },
    {
      name: '服务业增加值增速',
      value: economicData.value['数字经济-六六行动比学赶超-主要经济指标-服务业增加值增速-金额'].value,
      unit: economicData.value['数字经济-六六行动比学赶超-主要经济指标-服务业增加值增速-金额'].unit,
      rank: economicData.value['数字经济-六六行动比学赶超-主要经济指标-服务业增加值增速-名次'].value,
      contribution: economicData.value['数字经济-六六行动比学赶超-主要经济指标-服务业增加值增速-贡献占比'].value,
      order: economicData.value['数字经济-六六行动比学赶超-主要经济指标-服务业增加值增速-顺序'].value,
      orderNumber: economicData.value['数字经济-六六行动比学赶超-主要经济指标-服务业增加值增速-数量'].value,
    },
    {
      name: '数字经济核心产业增加值增速',
      value: economicData.value['数字经济-六六行动比学赶超-主要经济指标-数字经济核心产业增加值增速-金额'].value,
      unit: economicData.value['数字经济-六六行动比学赶超-主要经济指标-数字经济核心产业增加值增速-金额'].unit,
      rank: economicData.value['数字经济-六六行动比学赶超-主要经济指标-数字经济核心产业增加值增速-名次'].value,
      contribution:
        economicData.value['数字经济-六六行动比学赶超-主要经济指标-数字经济核心产业增加值增速-贡献占比'].value,
      order: economicData.value['数字经济-六六行动比学赶超-主要经济指标-数字经济核心产业增加值增速-顺序'].value,
      orderNumber: economicData.value['数字经济-六六行动比学赶超-主要经济指标-数字经济核心产业增加值增速-数量'].value,
    },
    {
      name: '固定资产投资增速',
      value: economicData.value['数字经济-六六行动比学赶超-主要经济指标-固定资产投资增速-金额'].value,
      unit: economicData.value['数字经济-六六行动比学赶超-主要经济指标-固定资产投资增速-金额'].unit,
      rank: economicData.value['数字经济-六六行动比学赶超-主要经济指标-固定资产投资增速-名次'].value,
      contribution: economicData.value['数字经济-六六行动比学赶超-主要经济指标-固定资产投资增速-贡献占比'].value,
      order: economicData.value['数字经济-六六行动比学赶超-主要经济指标-固定资产投资增速-顺序'].value,
      orderNumber: economicData.value['数字经济-六六行动比学赶超-主要经济指标-固定资产投资增速-数量'].value,
    },
    {
      name: '社会消费品零售总额增速',
      value: economicData.value['数字经济-六六行动比学赶超-主要经济指标-社会消费品零售总额增速-金额'].value,
      unit: economicData.value['数字经济-六六行动比学赶超-主要经济指标-社会消费品零售总额增速-金额'].unit,
      rank: economicData.value['数字经济-六六行动比学赶超-主要经济指标-社会消费品零售总额增速-名次'].value,
      contribution: economicData.value['数字经济-六六行动比学赶超-主要经济指标-社会消费品零售总额增速-贡献占比'].value,
      order: economicData.value['数字经济-六六行动比学赶超-主要经济指标-社会消费品零售总额增速-顺序'].value,
      orderNumber: economicData.value['数字经济-六六行动比学赶超-主要经济指标-社会消费品零售总额增速-数量'].value,
    },
    {
      name: '货物出口总额增速',
      value: economicData.value['数字经济-六六行动比学赶超-主要经济指标-货物出口总额增速-金额'].value,
      unit: economicData.value['数字经济-六六行动比学赶超-主要经济指标-货物出口总额增速-金额'].unit,
      rank: economicData.value['数字经济-六六行动比学赶超-主要经济指标-货物出口总额增速-名次'].value,
      contribution: economicData.value['数字经济-六六行动比学赶超-主要经济指标-货物出口总额增速-贡献占比'].value,
      order: economicData.value['数字经济-六六行动比学赶超-主要经济指标-货物出口总额增速-顺序'].value,
      orderNumber: economicData.value['数字经济-六六行动比学赶超-主要经济指标-货物出口总额增速-数量'].value,
    },
    // {
    //   name: '产业投促指标',
    //   value: economicData.value['数字经济-六六行动比学赶超-主要经济指标-产业投促指标-金额'].value,
    //   unit: economicData.value['数字经济-六六行动比学赶超-主要经济指标-产业投促指标-金额'].unit,
    //   rank: economicData.value['数字经济-六六行动比学赶超-主要经济指标-产业投促指标-名次'].value,
    //   contribution: economicData.value['数字经济-六六行动比学赶超-主要经济指标-产业投促指标-贡献占比'].value,
    //   order: economicData.value['数字经济-六六行动比学赶超-主要经济指标-产业投促指标-顺序'].value,
    //   orderNumber: economicData.value['数字经济-六六行动比学赶超-主要经济指标-产业投促指标-数量'].value,
    // },
  ];
  listData1.value = [
    {
      name: '外贸进出口',
      value: economicData.value['数字经济-六六行动比学赶超-其他指标-外贸进出口-金额'].value,
      unit: economicData.value['数字经济-六六行动比学赶超-其他指标-外贸进出口-金额'].unit,
      rank: economicData.value['数字经济-六六行动比学赶超-其他指标-外贸进出口-名次'].value,
      contribution: economicData.value['数字经济-六六行动比学赶超-其他指标-外贸进出口-贡献占比'].value,
      order: economicData.value['数字经济-六六行动比学赶超-其他指标-外贸进出口-顺序'].value,
      orderNumber: economicData.value['数字经济-六六行动比学赶超-其他指标-外贸进出口-数量'].value,
    },
    {
      name: '跨境电商出口',
      value: economicData.value['数字经济-六六行动比学赶超-其他指标-跨境电商出口-金额'].value,
      unit: economicData.value['数字经济-六六行动比学赶超-其他指标-跨境电商出口-金额'].unit,
      rank: economicData.value['数字经济-六六行动比学赶超-其他指标-跨境电商出口-名次'].value,
      contribution: economicData.value['数字经济-六六行动比学赶超-其他指标-跨境电商出口-贡献占比'].value,
      order: economicData.value['数字经济-六六行动比学赶超-其他指标-跨境电商出口-顺序'].value,
      orderNumber: economicData.value['数字经济-六六行动比学赶超-其他指标-跨境电商出口-数量'].value,
    },

    // {
    //   name: '网络零售额',
    //   value: economicData.value['数字经济-六六行动比学赶超-其他指标-网络零售额-金额'].value,
    //   unit: economicData.value['数字经济-六六行动比学赶超-其他指标-网络零售额-金额'].unit,
    //   rank: economicData.value['数字经济-六六行动比学赶超-其他指标-网络零售额-名次'].value,
    //   contribution: economicData.value['数字经济-六六行动比学赶超-其他指标-网络零售额-贡献占比'].value,
    //   order: economicData.value['数字经济-六六行动比学赶超-其他指标-网络零售额-顺序'].value,
    //   orderNumber: economicData.value['数字经济-六六行动比学赶超-其他指标-网络零售额-数量'].value,
    // },
    {
      name: '服务贸易',
      value: economicData.value['数字经济-六六行动比学赶超-其他指标-服务贸易-金额'].value,
      unit: economicData.value['数字经济-六六行动比学赶超-其他指标-服务贸易-金额'].unit,
      rank: economicData.value['数字经济-六六行动比学赶超-其他指标-服务贸易-名次'].value,
      contribution: economicData.value['数字经济-六六行动比学赶超-其他指标-服务贸易-贡献占比'].value,
      order: economicData.value['数字经济-六六行动比学赶超-其他指标-服务贸易-顺序'].value,
      orderNumber: economicData.value['数字经济-六六行动比学赶超-其他指标-服务贸易-数量'].value,
    },

    {
      name: '企业上市培育',
      value: economicData.value['数字经济-六六行动比学赶超-其他指标-企业上市培育-家数'].value,
      unit: economicData.value['数字经济-六六行动比学赶超-其他指标-企业上市培育-家数'].unit,
      rank: economicData.value['数字经济-六六行动比学赶超-其他指标-企业上市培育-名次'].value,
      contribution: economicData.value['数字经济-六六行动比学赶超-其他指标-企业上市培育-贡献占比'].value,
      order: economicData.value['数字经济-六六行动比学赶超-其他指标-企业上市培育-顺序'].value,
      orderNumber: economicData.value['数字经济-六六行动比学赶超-其他指标-企业上市培育-数量'].value,
    },
    {
      name: '技术交易额',
      value: economicData.value['数字经济-六六行动比学赶超-其他指标-技术交易额-金额'].value,
      unit: economicData.value['数字经济-六六行动比学赶超-其他指标-技术交易额-金额'].unit,
      rank: economicData.value['数字经济-六六行动比学赶超-其他指标-技术交易额-名次'].value,
      contribution: economicData.value['数字经济-六六行动比学赶超-其他指标-技术交易额-贡献占比'].value,
      order: economicData.value['数字经济-六六行动比学赶超-其他指标-技术交易额-顺序'].value,
      orderNumber: economicData.value['数字经济-六六行动比学赶超-其他指标-技术交易额-数量'].value,
    },
    {
      name: '实际利用外资',
      value: economicData.value['数字经济-六六行动比学赶超-其他指标-实际利用外资-金额'].value,
      unit: economicData.value['数字经济-六六行动比学赶超-其他指标-实际利用外资-金额'].unit,
      rank: economicData.value['数字经济-六六行动比学赶超-其他指标-实际利用外资-名次'].value,
      contribution: economicData.value['数字经济-六六行动比学赶超-其他指标-实际利用外资-贡献占比'].value,
      order: economicData.value['数字经济-六六行动比学赶超-其他指标-实际利用外资-顺序'].value,
      orderNumber: economicData.value['数字经济-六六行动比学赶超-其他指标-实际利用外资-数量'].value,
    },
  ];
  console.log(listData.value, listData1.value);
}
watch();
onMounted(() => {
  setTimeout(() => {
    initListData();
  }, 200);
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.sub-title-text {
  font-size: 14px;
}
.left2 {
  margin: 16px 0 0 0;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    padding: 0 0 8px 0;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
      .title-img {
        width: 16.97px;
        height: 16.97px;
        margin: 0 10px 0 0;
      }
      .text {
        font-family: PingFangSC-S0pxibold;
        font-weight: 600;
        font-size: 20px;
        color: #ffffff;
      }
    }
    .icon {
      width: 12px;
      height: 12px;
      background: rgba(255, 255, 255, 0.5);
    }
  }
  .sub-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    .left {
      display: flex;
      align-items: center;
    }
    .text {
      margin: 0 0px 0 6px;
    }
  }
  .info {
    padding-top: 10px;
    .list {
      // padding: 0 16px 0 28px;
      box-sizing: border-box;
      margin: 16px 0 0 0;
      display: flex;
      // height: 150px;
      justify-content: space-between;
      .list-box {
        // margin: 30px 0 0 0;
        min-height: 420px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .item {
          display: flex;
          align-items: center;
          justify-content: space-around;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0 0 10px 0;
          box-sizing: border-box;
          margin: 12px 0 0 0;

          .name {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
            width: 190px;
            margin: 0 10px 0 0;
          }
          .value-box {
            display: flex;
            align-items: center;
            width: 110px;
            .number {
              font-family: DINAlternate-Bold;
              font-weight: 700;
              font-size: 26px;
              color: #e0fffe;
              margin: 0 12px 0 0;
              width: 60px;
              overflow: hidden; //溢出内容隐藏
              display: inline-block;
              white-space: nowrap; //强制文本在一行内显示
              text-overflow: ellipsis; //当对象内文本溢出时显示省略号标记
              cursor: pointer;
            }
            .unit {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 14px;
              color: #ffffff;
              white-space: nowrap;
            }
          }
          .rank {
            width: 38px;
            height: 21px;
            background: rgba(255, 78, 78, 0.44);
            color: #fff;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          .line {
            width: 38px;
            height: 21px;
            background: rgba(49, 49, 49, 0.44);
            color: #fff;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          .rankDown {
            width: 38px;
            height: 21px;
            background: #0c8563;
            color: #fff;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          .tags {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: #ffffff;
            width: 67px;
            height: 21px;
            background: rgba(255, 255, 255, 0.3);
            line-height: 21px;
            text-align: center;
          }
        }
      }
    }
    .list1 {
      padding: 0 16px 0 28px;
      box-sizing: border-box;
      margin: 16px 0 0 0;
      // height: 150px;
      overflow: scroll;
      .list1-count {
        display: flex;
        .count-left,
        .count-right {
          flex: 1;
          padding: 0 10px;
          box-sizing: border-box;
        }
        .count-left {
          border-right: 1px solid #ffffff4d;
        }
        .count-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 20px 0 0 0;
          .count-item-name {
            font-size: 14px;
            color: #fff;
          }
          .count-item-value-box {
            display: flex;
            align-items: center;
            .number {
              color: #25faf8;
              font-size: 24px;
              margin: 0 6px;
            }
            .unit {
              font-size: 14px;
              color: #fff;
            }
          }
        }
      }
      .item-title {
        display: flex;
        align-items: center;
        justify-content: space-around;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        padding: 0 0 10px 0;
        box-sizing: border-box;
        font-size: 14px;
        .name {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
          width: 144px;
        }
        .value-box {
          display: flex;
          align-items: center;
          width: 110px;
          .number {
            color: #e0fffe;
            margin: 0 12px 0 0;
          }
          .unit {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: #ffffff;
          }
        }
        .rank {
          width: 38px;

          color: #fff;
        }
        .tags {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #ffffff;
          width: 67px;
        }
      }
      .list-box {
        // margin: 30px 0 0 0;
        .item {
          display: flex;
          align-items: center;
          justify-content: space-around;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0 0 10px 0;
          box-sizing: border-box;
          margin: 12px 0 0 0;

          .name {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
            width: 144px;
          }
          .value-box {
            display: flex;
            align-items: center;
            width: 110px;
            .number {
              font-family: DINAlternate-Bold;
              font-weight: 700;
              font-size: 26px;
              color: #e0fffe;
              margin: 0 12px 0 0;
              width: 60px;
              overflow: hidden; //溢出内容隐藏
              display: inline-block;
              white-space: nowrap; //强制文本在一行内显示
              text-overflow: ellipsis; //当对象内文本溢出时显示省略号标记
              cursor: pointer;
            }
            .unit {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 14px;
              color: #ffffff;
              white-space: nowrap;
            }
          }
          .rank {
            width: 38px;
            height: 21px;
            background: rgba(255, 78, 78, 0.44);
            color: #fff;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          .line {
            width: 38px;
            height: 21px;
            background: rgba(49, 49, 49, 0.44);
            color: #fff;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          .rankDown {
            width: 38px;
            height: 21px;
            background: #0c8563;
            color: #fff;
            display: flex;
            justify-content: space-around;
            align-items: center;
          }
          .tags {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: #ffffff;
            width: 67px;
            height: 21px;
            background: rgba(255, 255, 255, 0.3);
            line-height: 21px;
            text-align: center;
          }
        }
      }
    }
  }
}
/* 去除滚动条 */
::-webkit-scrollbar {
  display: none;
}
</style>
