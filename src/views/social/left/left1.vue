<template>
  <div class="left1">
    <div class="title">
      <div class="left">
        <img class="title-img" src="@/assets/image/lsjt.png" alt="" />
        <div class="text">人群概况</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="info">
      <!-- <Tabs :propsData="tabsData" v-model:index="currentIndex" /> -->
      <div class="icon-box">
        <div class="circle">
          <div class="value-box">
            <span class="number">{{ socialData['数字社会-人群概况-老人数量'].value }}</span>
            <span class="unit">人</span>
          </div>
          <div class="name">老人总数</div>
        </div>
        <div class="circle">
          <div class="value-box">
            <span class="number">{{ socialData['数字社会-人群概况-妇女人员数量'].value }}</span>
            <span class="unit">人</span>
          </div>
          <div class="name">妇女数量</div>
        </div>
        <div class="circle">
          <div class="value-box">
            <span class="number">{{ socialData['数字社会-人群概况-儿童人员数量'].value }}</span>
            <span class="unit">人</span>
          </div>
          <div class="name">儿童数量</div>
        </div>
        <!-- <div class="charts" id="pie"></div> -->
      </div>
      <!-- <div class="tags">
        <div class="tag">残疾：1234人</div>
        <div class="tag">困难：34人</div>
        <div class="tag">失独：134人</div>
        <div class="tag">伤残独生子女：134人</div>
      </div> -->
      <div class="sub-title">
        <el-icon><CaretRight /></el-icon>
        <div class="text">特殊人群</div>
      </div>
      <div class="window-box">
        <div class="window">
          <div class="window-title">残疾</div>
          <div class="window-value">
            <div class="number">{{ socialData['数字社会-人群概况-残疾人员数量'].value }}</div>
            <div class="unit">人</div>
          </div>
        </div>
        <div class="window">
          <div class="window-title">困难</div>
          <div class="window-value">
            <div class="number">{{ socialData['数字社会-人群概况-困难人员数量'].value }}</div>
            <div class="unit">人</div>
          </div>
        </div>
        <div class="window">
          <div class="window-title">失独</div>
          <div class="window-value">
            <div class="number">{{ socialData['数字社会-人群概况-失独人员数量'].value }}</div>
            <div class="unit">人</div>
          </div>
        </div>
        <div class="window">
          <div class="window-title">伤残独生子女</div>
          <div class="window-value">
            <div class="number">{{ socialData['数字社会-人群概况-伤残独生子女家庭人数'].value }}</div>
            <div class="unit">人</div>
          </div>
        </div>
      </div>
      <!-- <div class="bar" id="bar"></div> -->
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import * as echarts from 'echarts';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const socialData = computed(() => {
  return store.state.socialData;
});
let tabsData = ['老人概况', '一键养老'];
let currentIndex = ref(0);
let option = ref({});
let myChart = null;
function initChart() {
  let chartDemo = document.getElementById('pie');
  myChart = echarts.init(chartDemo);
  option.value = {
    // title: {
    //   text: 'Referer of a Website',
    //   subtext: 'Fake Data',
    //   left: 'center',
    // },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      // orient: 'vertical',
      right: 'center',
      bottom: '0%',
      itemWidth: 8,
      width: 150,
      itemHeight: 8,
    },
    series: [
      {
        center: ['50%', '40%'],
        name: 'Access From',
        type: 'pie',
        radius: ['36%', '63%'],
        label: {
          normal: {
            position: 'inner',
            show: false,
          },
        },
        data: [
          { value: 250, name: '60-70岁' },
          { value: 250, name: '61-70岁' },
          { value: 250, name: '62-70岁' },
          { value: 250, name: '63-70岁' },
        ],
        labelLine: {
          show: false,
        },
        // emphasis: {
        //   itemStyle: {
        //     shadowBlur: 10,
        //     shadowOffsetX: 0,
        //     shadowColor: 'rgba(0, 0, 0, 0.5)',
        //   },
        // },
      },
    ],
  };
  option.value && myChart.setOption(option.value);
  window.addEventListener('resize', () => {
    myChart.resize();
  });
}
let myChart1 = null;
function initBar() {
  let chartDemo = document.getElementById('bar');
  myChart1 = echarts.init(chartDemo);
  let yList = [32, 58, 64];
  let xList = [10, 55, 44];
  let xData = ['电子津贴', '高龄普惠', '高龄津贴'];
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
      top: '5%',
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
          show: false,
          position: [40 / 2, -(40 + 20)],
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
watch();
onMounted(() => {
  // initChart();
  initBar();
});
onUnmounted(() => {
  myChart && myChart.dispose();
  myChart1 && myChart1.dispose();
});
</script>
<style lang="less" scoped>
.left1 {
  margin: 8px 0 0 0;
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
      height: 130px;
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
      height: 56px;
      overflow: scroll;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .window {
        width: 48%;
        margin: 6px 0 0 0;
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
      width: 500px;
      height: 180px;
      margin: 16px 0 0 0;
    }
  }
}
.sub-title {
  display: flex;
  align-items: center;
  color: #fff;
  .text {
    margin: 0 0px 0 6px;
  }
}
/* 去除滚动条 */
::-webkit-scrollbar {
  display: none;
}
</style>
