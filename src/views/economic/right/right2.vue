<template>
  <div class="right2">
    <div class="title">
      <div class="left">
        <img class="title-img" src="@/assets/image/lsjt.png" alt="" />
        <div class="text">迭代创业生态</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="info">
      <Tabs @tabChange="tabChange" :propsData="tabsData" v-model:index="currentIndex" />

      <div class="main" v-if="currentIndex === 0">
        <div class="main-tabs">
          <div
            class="tab"
            :class="subIndex === index ? 'changeTab' : ''"
            @click="subTabChange(index)"
            v-for="(item, index) in subTabs"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <div class="main-contetn" v-if="subIndex === 0">
          <div class="content-left">
            <div class="item">
              <div class="item-title">户</div>
              <div class="item-check">
                <el-radio-group @change="getForestQydztjxxData" v-model="radio1" class="ml-4">
                  <el-radio :label="true" size="large">在街道</el-radio>
                  <el-radio :label="false" size="large">不在街道</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div class="item">
              <div class="item-title">人</div>
              <div class="item-check">
                <el-radio-group @change="getForestQydztjxxData" v-model="radio2" class="ml-4">
                  <el-radio :label="true" size="large">在街道</el-radio>
                  <el-radio :label="false" size="large">不在街道</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div class="item">
              <div class="item-title">纳税</div>
              <div class="item-check">
                <el-radio-group @change="getForestQydztjxxData" v-model="radio3" class="ml-4">
                  <el-radio :label="true" size="large">在街道</el-radio>
                  <el-radio :label="false" size="large">不在街道</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="content-right">
            <div class="right-title"><img src="@/assets/image/right.png" alt="" /> <span>企业统计</span></div>
            <div class="right-count">
              <span :title="qydztjxxData" class="count-value">{{ qydztjxxData }}</span>
              <span class="count-unit">家</span>
            </div>
          </div>
        </div>
        <div class="main-contetn" v-if="subIndex === 1">
          <div class="line" id="line"></div>
        </div>
      </div>
      <div class="main1" v-if="currentIndex === 1">
        <div class="tabs">
          <div class="sub-title">
            <el-icon><CaretRight /></el-icon>
            <div class="text">走楼访企</div>
          </div>
        </div>
        <div class="main1-content">
          <div class="main1-list">
            <div class="main1-item" v-for="(item, index) in listData" :key="index">
              <span class="main1-title">{{ item.name }}</span>
              <div class="value-box">
                <span class="number">{{ item.value }}</span>
                <span class="unit">{{ item.unit }}</span>
              </div>
            </div>
          </div>
          <div class="main1-sub-list">
            <div class="main1-sub-item">
              <span class="name">政策惠企</span>
              <div class="value-box">
                <span class="number">{{ economicData['数字经济-迭代创业生态-走楼访企-政策惠企家数'].value }}</span>
                <span class="unit">{{ economicData['数字经济-迭代创业生态-走楼访企-政策惠企家数'].unit }}</span>
              </div>
            </div>
            <div class="main1-sub-item">
              <span class="name">补助金额</span>
              <div class="value-box">
                <span class="number">{{ economicData['数字经济-迭代创业生态-走楼访企-累计惠企补助金额'].value }}</span>
                <span class="unit">{{ economicData['数字经济-迭代创业生态-走楼访企-累计惠企补助金额'].unit }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import store from '@/store';
import * as echarts from 'echarts';
import { showDataMap } from '@/utils/common';
import { getForestQydztjxx } from '@/api';

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const economicData = computed(() => {
  return store.state.economicData;
});
let subIndex = ref(0);
function subTabChange(value) {
  subIndex.value = value;

  if (value === 1) {
    setTimeout(() => {
      initChart();
    }, 200);
  } else {
    myChart.dispose();
  }
}
function tabChange() {
  subIndex.value = 0;
  myChart && myChart.dispose();
}
let myChart = null;
let listData = ref([]);
function initChart() {
  let chartDemo = null;
  chartDemo = document.getElementById('line');
  myChart = echarts.init(chartDemo);
  let data = [
    showDataMap('数字经济', '1743107993752350722')?.value,
    showDataMap('数字经济', '1743108071682519042')?.value,
    showDataMap('数字经济', '1743108174157754369')?.value,
  ];

  let option = {
    // backgroundColor:"#111c4e",
    color: ['#3398DB'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          opacity: 0,
        },
      },
      formatter: function (prams) {
        return prams[0].data;
      },
    },
    legend: {
      show: false,
    },
    grid: {
      top: '20%',
      right: '5%',
      bottom: '5%',
      left: '5%',
      containLabel: true, //是否把标题也包括在内
    },
    xAxis: {
      type: 'category',
      data: ['成长型', '稳定型', '风险型'],
      axisLine: {
        // 坐标轴轴线相关设置。
        show: true,
      },
      axisTick: {
        // 坐标轴刻度配置
        show: true,
      },
      axisLabel: {
        // 坐标轴刻度标签的相关设置。
        interval: 0, // 解决x轴数据显示不完全的bug
        rotate: 0, // 旋转
        textStyle: {
          color: '#fff',
        },
        formatter: (val) => {
          return val;
        },
      },
    },
    yAxis: [
      {
        type: 'value',
        gridIndex: 0,
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#0c3b71',
          },
        },
        axisLabel: {
          // 坐标轴刻度标签的相关设置。
          textStyle: {
            color: '#fff',
          },
          interval: 0, // 解决x轴数据显示不完全的bug
          rotate: 0, // 旋转
          formatter: (val) => {
            return val;
          },
        },
      },
      {
        type: 'value',
        gridIndex: 0,
        splitNumber: 12,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)'],
          },
        },
      },
    ],
    series: [
      {
        name: '',
        data: data,
        type: 'bar',
        // 线条宽度
        barWidth: '15%',
        // 平均线
        markLine: {
          // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
          silent: true,
          // 平均值
          data: [{ type: 'average', name: '' }],
          itemStyle: {
            normal: {
              lineStyle: {
                color: '',
                opacity: 0, // 平均线透明度设置设置为0为隐藏,1为显示
              },
            },
          },
          label: {
            formatter: '',
            position: 'insideEndTop', //更多标签位置：'start', 'middle', 'end', 'insideStartTop', 'insideStartBottom', 'insideMiddleTop', 'insideMiddleBottom', 'insideEndTop', 'insideEndBottom'
          },
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(31, 255, 255, 1)',
              },
              {
                offset: 0.5,
                color: 'rgba(31, 255, 255, 0.5)',
              },
              {
                offset: 1,
                color: 'rgba(31, 255, 255,0.1)',
              },
            ]),
          },
        },
        zlevel: 11,
      },

      {
        name: '',
        type: 'bar',
        barWidth: '25%',
        xAxisIndex: 0,
        yAxisIndex: 1,
        barGap: '-135%',
        data: [100, 100, 100, 100, 100, 100, 100],
        itemStyle: {
          normal: {
            color: 'rgba(255,255,255,0.1)',
          },
        },
        zlevel: 9,
      },
    ],
  };

  myChart.setOption(option);
}
function initData() {
  listData.value = [
    {
      name: '本月走访',
      value: economicData.value['数字经济-迭代创业生态-走楼访企-当月走访次数'].value,
      unit: economicData.value['数字经济-迭代创业生态-走楼访企-当月走访次数'].unit,
    },
    {
      name: '累计走访',
      value: economicData.value['数字经济-迭代创业生态-走楼访企-累计走访次数'].value,
      unit: economicData.value['数字经济-迭代创业生态-走楼访企-累计走访次数'].unit,
    },
    {
      name: '本月双千走访',
      value: economicData.value['数字经济-迭代创业生态-走楼访企-本月双千走访次数'].value,
      unit: economicData.value['数字经济-迭代创业生态-走楼访企-本月双千走访次数'].unit,
    },
    {
      name: '累计双千走访',
      value: economicData.value['数字经济-迭代创业生态-走楼访企-累计双千走访次数'].value,
      unit: economicData.value['数字经济-迭代创业生态-走楼访企-累计双千走访次数'].unit,
    },
    {
      name: '解决企业问题',
      value: economicData.value['数字经济-迭代创业生态-走楼访企-解决企业问题'].value,
      unit: economicData.value['数字经济-迭代创业生态-走楼访企-解决企业问题'].unit,
    },
  ];
}
let qydztjxxData = ref({});
async function getForestQydztjxxData() {
  let res = await getForestQydztjxx();
  if (res.code === 200) {
    console.log(radio1.value, radio2.value, radio3.value);
    if (radio1.value && radio2.value && radio3.value) {
      qydztjxxData.value = res.rows[0].all_in;
    }
    if (radio1.value && radio2.value && !radio3.value) {
      qydztjxxData.value = res.rows[0].zcdin_szdin_czfpnot;
    }
    if (radio1.value && !radio2.value && radio3.value) {
      qydztjxxData.value = res.rows[0].zcdin_szdnot_czfpin;
    }
    if (radio1.value && !radio2.value && !radio3.value) {
      qydztjxxData.value = res.rows[0].zcdin_szdnot_czfpnot;
    }
    if (!radio1.value && radio2.value && radio3.value) {
      qydztjxxData.value = res.rows[0].zcdnot_szdin_czfpin;
    }
    if (!radio1.value && radio2.value && !radio3.value) {
      qydztjxxData.value = res.rows[0].zcdnot_szdin_czfpnot;
    }
    if (!radio1.value && !radio2.value && radio3.value) {
      qydztjxxData.value = res.rows[0].zcdnot_szdnot_czfpin;
    }
    if (!radio1.value && !radio2.value && !radio3.value) {
      qydztjxxData.value = res.rows[0].notall_in;
    }
  }
}

let radio1 = ref(true);
let radio2 = ref(true);
let radio3 = ref(true);
let tabsData = ['企业培育', '企业服务'];
let subTabs = ['企业底数', '梯度培育'];
let subTabs1 = ['走楼访企'];
let currentIndex = ref(0);
watch();
onMounted(() => {
  initData();
  getForestQydztjxxData();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.right2 {
  margin: 10px 0 0 0;
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
    color: rgb(255, 0, 0);
    .text {
      margin: 0 0px 0 6px;
    }
  }
  .info {
    .tabs {
      display: flex;
      margin: 16px 0 0 0;
      .sub-title {
        display: flex;
        align-items: center;
        color: #fff;
        .text {
          margin: 0 0px 0 6px;
        }
      }
      .tab {
        // width: 56px;
        height: 20px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffffa6;
        margin: 0 30px 0 0;
        cursor: pointer;
      }
      .changeTab {
        color: #ffffff;
        border-bottom: 2px solid #fff;
      }
    }
    .main-tabs {
      display: flex;
      margin: 16px 0 0 0;
      justify-content: center;
      .tab {
        width: 90px;
        height: 28px;
        border-radius: 16px 0 0 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        border-top: 1px solid rgba(255, 255, 255, 1);
        border-left: 1px solid rgba(255, 255, 255, 0.3);
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      }
      .tab:nth-child(even) {
        width: 90px;
        height: 28px;
        // transform: scaleX(-1);
        border-radius: 0px 16px 16px 0px;
      }

      .changeTab {
        box-shadow: inset 0 0 50px 0 rgba(56, 155, 255, 0.5);
        color: #1fffff;
        border-top: 1px solid rgba(255, 255, 255, 1);
        border-left: 1px solid rgba(255, 255, 255, 0.3);
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      }
    }

    .main {
      width: 452px;
      height: 200px;
      .main-contetn {
        // margin: 0 0 0 0;
        display: flex;
        width: 100%;
        height: 100%;
        .content-left {
          margin: 0 56px 0 0;
          // width: 60%;
          .item {
            display: flex;
            align-items: center;
            margin: 10px 0 0 0;
            .item-title {
              width: 53px;
              height: 32px;
              background: #42bbf4;
              border-radius: 4px;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #fff;
              margin: 0 16px 0 0;
            }
          }
        }
        .content-right {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          margin: 20px 0 0 0;
          .right-title {
            display: flex;
            align-items: center;
            img {
              width: 16px;
              height: 16px;
              margin: 0 8px 0 0;
            }
          }

          .right-count {
            // display: flex;
            .count-value {
              font-family: PingFangSC-Medium;
              font-weight: 500;
              font-size: 40px;
              color: #ffffff;
              width: 120px;
              overflow: hidden; //溢出内容隐藏
              display: inline-block;
              white-space: nowrap; //强制文本在一行内显示
              text-overflow: ellipsis; //当对象内文本溢出时显示省略号标记
            }
            .count-unit {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 16px;
              color: #ffffff;
            }
          }
        }
        .line {
          width: 100%;
          height: 100%;
          margin: 20px 0 0 0;
        }
      }
    }
    .sub-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #f7625e;
      .left {
        display: flex;
        align-items: center;
      }
      .text {
        margin: 0 0px 0 6px;
      }
    }
    .main1 {
      .main1-content {
        .main1-list {
          display: flex;
          align-items: center;
          margin: 10px 0 0 0;
          flex-wrap: wrap;
          .main1-item {
            width: 43%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 10px 0 0 0;
            .main1-title {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 16px;
              color: #ffffff;
            }
            .value-box {
              display: flex;
              align-items: center;
              .number {
                font-family: DINAlternate-Bold;
                font-weight: 700;
                font-size: 26px;
                color: #e0fffe;
                margin: 0 6px 0 0;
              }
              .unit {
                font-family: PingFangSC-Regular;
                font-weight: 400;
                font-size: 14px;
                color: #ffffff;
              }
            }
          }
          .main1-item:nth-child(odd) {
            margin: 0 60px 0 0;
          }
        }
        .main1-sub-list {
          display: flex;
          justify-content: space-between;
          margin: 10px 0 0 0;
          .main1-sub-item {
            width: 185px;
            height: 50px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            box-sizing: border-box;
            background: url('@/assets/image/home-iten-bg.png');
            background-size: 100% 100%;
            .name {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 16px;
              color: #ffffff;
            }
            .value-box {
              display: flex;
              align-items: center;
              .number {
                font-family: DINAlternate-Bold;
                font-weight: 700;
                font-size: 28px;
                color: #e0fffe;
                margin: 0 8px 0 0;
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
        .count-item {
          width: 140px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .count-item-name {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
          }
          .count-item-value {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 26px;
            color: #e0fffe;
          }
          .count-item-unit {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: #ffffff;
          }
        }

        .main1-count {
          display: flex;
          justify-content: space-between;
          .count-left {
            width: 70%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .count-right {
            width: 120px;
            height: 70px;
            background: #ff8a3b4a;
            border: 1px solid #ffb55e;
            border-radius: 8px 35px 35px 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 0 0 12px;
            box-sizing: border-box;
            .count-right-name {
              font-family: PingFangSC-SNaNpxibold;
              font-weight: 600;
              font-size: 14px;
              color: #ffffff;
              width: 28px;
              height: 40px;
            }
            .count-right-value {
              width: 70px;
              height: 70px;
              background-image: radial-gradient(circle at 50% 50%, #f0974700 0%, #ef864b69 50%);
              border: 1px solid #ffb55e;
              box-shadow: inset 0 -8px 12px 0 #ffffff29;
              border-radius: 80px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              .number {
                font-family: DINAlternate-Bold;
                font-weight: 700;
                font-size: 24px;
                color: #f08128;
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
        .count-list {
          display: flex;
          justify-content: space-between;
          padding: 0 20px 0 0;
          box-sizing: border-box;
          margin: 0px 0 0 0;
          .count-item {
            width: 48%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .count-item-name {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 16px;
              color: #ffffff;
            }
            .count-item-value {
              font-family: DINAlternate-Bold;
              font-weight: 700;
              font-size: 26px;
              color: #e0fffe;
            }
            .count-item-unit {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 14px;
              color: #ffffff;
            }
          }
        }
        .warning {
          width: 443px;
          height: 50px;
          background-image: linear-gradient(90deg, #d81a1a66 0%, #ffb0b033 100%);
          border-radius: 27px;
          display: flex;
          align-items: center;
          img {
            width: 48px;
            height: 48px;
            margin: 0 18px 0 0;
          }
          span {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
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
