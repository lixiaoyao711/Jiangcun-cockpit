<template>
  <div class="left1">
    <div class="title">
      <div class="left">
        <img class="title-img" src="@/assets/image/lsjt.png" alt="" />
        <div class="text">爱心护老</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="info">
      <Tabs @tabChange="tabChange" :propsData="tabsData" v-model:index="currentIndex" />
      <div v-if="currentIndex === 0" class="bar" id="bar"></div>
      <div v-if="currentIndex === 1" class="bar" id="bar1"></div>
      <div v-if="currentIndex === 2" class="content-box">
        <div class="content">
          <div class="pie-icon">
            <div class="value">
              <div class="number">{{ oneClickRank.kcdjs }}</div>
              <div class="unit"></div>
            </div>
            <div class="pie-title">课程点击量</div>
          </div>
          <div class="card-list">
            <div class="card-item">
              <div class="card-item-title">服务机构数</div>
              <div class="card-item-value">
                <div class="number">{{ oneClickCount.jcjdjgsl }}</div>
                <div class="unit">家</div>
              </div>
            </div>
            <div class="card-item">
              <div class="card-item-title">志愿者数</div>
              <div class="card-item-value">
                <div class="number">{{ showDataMap('数字社会', '1742842896161222657').value }}</div>
                <div class="unit">人</div>
              </div>
            </div>
          </div>
        </div>
        <div class="sub-title">
          <el-icon><CaretRight /></el-icon>
          <div class="text">志愿者活动动态</div>
        </div>
        <vue3-seamless-scroll class="box-window" :list="oneClickData.slice(0, 5)" :step="0.5" :hover="true">
          <!-- <div class="box-window"> -->
          <div class="window" v-for="(item, index) in oneClickData.slice(0, 5)" :key="index">
            <img :src="item.activity_img" alt="" />
            <div class="window-info">{{ item.activity_name }}</div>
          </div>
          <!-- </div> -->
        </vue3-seamless-scroll>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import { getForestZyzhdxx, getForestJgslxx, getForestKcdjs, getForestTjxx } from '@/api';
import { showDataMap } from '@/utils/common';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';

import * as echarts from 'echarts';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const test = computed(() => {
  return null;
});
function tabChange(index) {
  myChart && myChart.dispose();
  myChart1 && myChart1.dispose();
  if (index === 0) {
    setTimeout(() => {
      initBar();
    }, 10);
  }
  if (index === 1) {
    setTimeout(() => {
      initBar1();
    }, 10);
  }
}
let tabsData = ['老人概况', '津贴发放', '一键养老'];
let currentIndex = ref(0);
let myChart = null;
let myChart1 = null;
function initBar() {
  let chartDemo = document.getElementById('bar');
  myChart = echarts.init(chartDemo);
  let yList = [
    showDataMap('数字社会', '1650384914216243202').value,
    showDataMap('数字社会', '1650385012891439105').value,
    showDataMap('数字社会', '1650385071276150786').value,
  ];
  let xList = [10, 55, 44];
  let xData = ['空巢老人', '孤寡老人', '独居老人'];
  let color = ['#CC1CAA', '#8D67FF', '#00FFFF', '#48DE13', '#FFC516', '#DC3E14', '#8E16F8'];

  // let dom = 800;
  // let barWidth = dom / 20;
  let colors = [];
  for (let i = 0; i < 4; i++) {
    colors.push({
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: '#73fcff', // 最左边
        },
        {
          offset: 0.5,
          color: '#86eef1', // 左边的右边 颜色
        },
        {
          offset: 0.5,
          color: '#5ad6d9', // 右边的左边 颜色
        },
        {
          offset: 1,
          color: '#3dc8ca',
        },
      ],
    });
  }
  let option = {
    // backgroundColor: '#010d3a',
    //提示框
    tooltip: {
      trigger: 'axis',
      formatter: '{b} : {c}',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },

    /**区域位置*/
    grid: {
      left: '0%',
      right: '16%',
      top: '20%',
      bottom: '0%',
      containLabel: true, //是否把标题也包括在内
    },
    //X轴
    xAxis: {
      data: xData,
      type: 'category',
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,1)',
          shadowColor: 'rgba(255,255,255,1)',
          shadowOffsetX: '20',
        },
        symbol: ['none', 'arrow'],
        symbolOffset: [0, 25],
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: 30,
        fontSize: 15,
      },
    },
    yAxis: {
      show: true,
      splitNumber: 4,
      axisLine: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#075858',
        },
      },
      axisLabel: {
        color: '#FFFFFF',
        margin: 30,
        fontSize: 15,
      },
    },
    series: [
      {
        type: 'bar',
        barWidth: 40,
        itemStyle: {
          normal: {
            color: function (params) {
              return colors[params.dataIndex % 7];
            },
          },
        },
        label: {
          show: true,
          position: [40 / 2, -30],
          color: '#ffffff',
          fontSize: 14,
          fontStyle: 'bold',
          align: 'center',
        },
        data: yList,
      },
      {
        z: 2,
        type: 'pictorialBar',
        data: yList,
        symbol: 'diamond',
        symbolOffset: [0, '50%'],
        symbolSize: [40, 40 * 0.5],
        itemStyle: {
          normal: {
            color: function (params) {
              return colors[params.dataIndex % 7];
            },
          },
        },
      },
      {
        z: 3,
        type: 'pictorialBar',
        symbolPosition: 'end',
        data: yList,
        symbol: 'diamond',
        symbolOffset: [0, '-50%'],
        symbolSize: [40, 40 * 0.5],
        itemStyle: {
          normal: {
            borderWidth: 0,
            color: function (params) {
              return colors[params.dataIndex % 7].colorStops[0].color;
            },
          },
        },
      },
    ],
  };
  option && myChart.setOption(option);
  window.addEventListener('resize', () => {
    myChart.resize();
  });
}
function initBar1() {
  let chartDemo = document.getElementById('bar1');
  myChart1 = echarts.init(chartDemo);
  let yList = allowanceData.value;
  let xData = ['高龄普惠', '高龄津贴'];

  // let dom = 800;
  // let barWidth = dom / 20;
  let colors = [];
  for (let i = 0; i < 4; i++) {
    colors.push({
      type: 'linear',
      x: 0,
      x2: 1,
      y: 0,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: '#73fcff', // 最左边
        },
        {
          offset: 0.5,
          color: '#86eef1', // 左边的右边 颜色
        },
        {
          offset: 0.5,
          color: '#5ad6d9', // 右边的左边 颜色
        },
        {
          offset: 1,
          color: '#3dc8ca',
        },
      ],
    });
  }
  let option = {
    // backgroundColor: '#010d3a',
    //提示框
    tooltip: {
      trigger: 'axis',
      formatter: '{b} : {c}',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    /**区域位置*/
    grid: {
      left: '0%',
      right: '16%',
      top: '20%',
      bottom: '0%',
      containLabel: true, //是否把标题也包括在内
    },
    //X轴
    xAxis: {
      data: xData,
      type: 'category',
      axisLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255,255,255,1)',
          shadowColor: 'rgba(255,255,255,1)',
          shadowOffsetX: '20',
        },
        symbol: ['none', 'arrow'],
        symbolOffset: [0, 25],
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        margin: 30,
        fontSize: 15,
      },
    },
    yAxis: {
      show: true,
      splitNumber: 4,
      axisLine: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#075858',
        },
      },
      axisLabel: {
        color: '#FFFFFF',
        margin: 30,
        fontSize: 15,
      },
    },
    series: [
      {
        type: 'bar',
        barWidth: 40,
        itemStyle: {
          normal: {
            color: function (params) {
              return colors[params.dataIndex % 7];
            },
          },
        },
        label: {
          show: true,
          position: [40 / 2, -30],
          color: '#ffffff',
          fontSize: 14,
          fontStyle: 'bold',
          align: 'center',
        },
        data: yList,
      },
      {
        z: 2,
        type: 'pictorialBar',
        data: yList,
        symbol: 'diamond',
        symbolOffset: [0, '50%'],
        symbolSize: [40, 40 * 0.5],
        itemStyle: {
          normal: {
            color: function (params) {
              return colors[params.dataIndex % 7];
            },
          },
        },
      },
      {
        z: 3,
        type: 'pictorialBar',
        symbolPosition: 'end',
        data: yList,
        symbol: 'diamond',
        symbolOffset: [0, '-50%'],
        symbolSize: [40, 40 * 0.5],
        itemStyle: {
          normal: {
            borderWidth: 0,
            color: function (params) {
              return colors[params.dataIndex % 7].colorStops[0].color;
            },
          },
        },
      },
    ],
  };
  option && myChart1.setOption(option);
  window.addEventListener('resize', () => {
    myChart1.resize();
  });
}
let oneClickData = ref({});
let oneClickCount = ref(0);
let oneClickRank = ref(0);
let allowanceData = ref({});
function getData() {
  getForestJgslxx().then((res) => {
    oneClickCount.value = res.data;
  });
  getForestZyzhdxx({
    pageNum: 1,
    pageSize: 5,
    orderByColumn: 'createTime',
    isAsc: 'desc',
  }).then((res) => {
    oneClickData.value = res.rows || [];
  });
  getForestKcdjs().then((res) => {
    oneClickRank.value = res.data;
  });
  getForestTjxx().then((res) => {
    allowanceData.value = [res.data.glphrs, showDataMap('数字社会', '1742842718888964098').value];
    console.log('allowanceData', allowanceData.value);
  });
}
watch();
onMounted(() => {
  // initChart();
  initBar();
  getData();
  // initBar1();
});
onUnmounted(() => {
  myChart && myChart.dispose();
  myChart1 && myChart1.dispose();
});
</script>
<style lang="less" scoped>
.left1 {
  margin: 6px 0 0 0;
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
  .info {
    .icon-box {
      margin: 24px 0 0 0;
      height: 180px;
      display: flex;
      justify-content: space-between;
      .circle {
        width: 117px;
        height: 117px;
        // flex: 1;
        background-image: radial-gradient(circle at 50% 50%, rgba(71, 182, 240, 0) 0%, rgba(75, 112, 239, 0.41) 50%);
        border: 1px solid #5ed9ff;
        box-shadow: inset 0 -8px 12px 0 rgba(255, 255, 255, 0.16);
        border-radius: 1160px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .value-box {
          .number {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 30px;
            color: #ffffff;
            margin: 0 6px 0 0;
          }
          .unit {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: #ffffff;
          }
        }
        .name {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
          margin: 10px 0 0 0;
        }
      }
      .charts {
        flex: 1;
      }
    }
    .window-box {
      margin: 6px 0 0 0;

      width: 100%;
      display: flex;
      justify-content: space-between;
      .window {
        width: 48%;

        // width: 200px;
        background: #295e8f;
        height: 46px;
        display: flex;
        align-items: center;
        padding: 0 16px;
        box-sizing: border-box;
        color: #fff;
        display: flex;
        justify-content: space-between;
        .window-value {
          display: flex;
          align-items: center;
          .number {
            margin: 0 6px 0 0;
            font-size: 26px;
            color: #e0fffe;
          }
          .value {
            font-size: 14px;
          }
        }
      }
    }
    .tags {
      display: flex;
      justify-content: space-between;
      .tag {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 12px;
        color: #49aa19;
        // text-align: justify;
        // line-height: 20px;
        height: 22px;
        background: #162312;
        border: 1px solid #274916;
        border-radius: 2px;
        padding: 1px 8px;
        box-sizing: border-box;
      }
    }
    .bar {
      // width: 500px;
      height: 222px;
      margin: 16px 0 0 0;
    }
    .content-box {
      height: 226px;
      .content {
        margin: 12px 0 0 0;
        display: flex;
        justify-content: space-between;
        padding: 0 16px;
        box-sizing: border-box;
        .pie-icon {
          width: 120px;
          height: 120px;
          background-image: radial-gradient(circle at 50% 50%, rgba(71, 184, 240, 0) 0%, rgba(75, 207, 239, 0.41) 50%);
          border: 1px solid #5efbff;
          box-shadow: inset 0 -8px 12px 0 rgba(255, 255, 255, 0.16);
          border-radius: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .value {
            display: flex;
            align-items: center;
            .number {
              font-family: DINAlternate-Bold;
              font-weight: 700;
              font-size: 36px;
              color: #28caf0;
            }
            .unit {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 14px;
              color: #ffffff;
              align-self: flex-end;
            }
          }
          .pie-title {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: #ffffff;
          }
        }
        .card-list {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .card-item {
            width: 240px;
            height: 44px;
            background: rgba(116, 190, 255, 0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 16px;
            box-sizing: border-box;
            margin: 10px 0 0 0;
            .card-item-title {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 16px;
              color: #ffffff;
            }
            .card-item-value {
              display: flex;
              align-items: center;
              .number {
                font-family: DINAlternate-Bold;
                font-weight: 700;
                font-size: 32px;
                color: #e0fffe;
                margin: 0 16px 0 0;
              }
              .unit {
                font-family: PingFangSC-Regular;
                font-weight: 400;
                font-size: 14px;
                color: #ffffff;
              }
            }
          }
        }
      }
      .box-window {
        height: 80px;
        overflow: scroll;
      }
      .window {
        height: 60px;
        background: url('@/assets/image/info-bg.png');
        padding: 0 16px;
        box-sizing: border-box;
        background-size: 100% 100%;
        border-radius: 8px;
        display: flex;
        align-items: center;
        margin: 8px 0 0 0;
        img {
          width: 78.09px;
          height: 48px;
          border-radius: 4px;
        }
        .window-info {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          margin: 0 0 0 10px;
        }
      }
    }
  }
}
.sub-title {
  display: flex;
  align-items: center;
  color: #fff;
  margin: 8px 0 0 0;
  .text {
    margin: 0 0px 0 6px;
  }
}
</style>
