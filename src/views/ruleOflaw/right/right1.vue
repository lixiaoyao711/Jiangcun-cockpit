<template>
  <div class="right1">
    <div class="title">
      <div class="left">
        <img src="@/assets/image/lsjt.png" alt="" />
        <div class="text">事件协同处置中心</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="sub1">
      <div class="list">
        <div class="item" :class="item.className" v-for="(item, index) in dayCount" :key="index">
          <div class="name">{{ item.name }}</div>
          <div class="value-box">
            <span class="number">{{ item.value }}</span>
            <span class="unit">个</span>
          </div>
        </div>
      </div>
      <div class="pie-box">
        <div style="height:180px" id="pie"></div>
      </div>
    </div>
    <div class="sub2">
      <div class="sub-title">
        <el-icon><CaretRight /></el-icon>
        <div class="text">二级分析</div>
      </div>
      <Tabs :propsData="tabsData" v-model:index="currentIndex" @tabChange="getEventSystemListData" />
      <!-- <div class="pie2" id="pie2"></div> -->
    </div>
    <div class="sub3">
      <div class="sub-title">
        <el-icon><CaretRight /></el-icon>
        <div class="text">滚动事件</div>
      </div>
      <vue3-seamless-scroll :list="eventList" class="list" :hover="true" :step="0.5">
        <div class="item" v-for="(item, index) in eventList" :key="item.id" :title="item.title">
          <div class="name">{{ item.title }}</div>
          <div class="view" @click="openDialog(item)">详情☞</div>
        </div>
      </vue3-seamless-scroll>
    </div>
    <Dialog :title="'事件详情'" @close="dialog = false" v-if="dialog">
      <template v-slot:content>
        <div class="dialog-info">
          <div class="left-box">
            <div class="left-title">
              <div class="icon"></div>
              {{ dialogData.title }}
            </div>
            <!-- <div class="sub-title">事件编号：{{ dialogData.id }}</div> -->
            <div class="item">
              <div class="sub">
                <span>事件发生时间：{{ dialogData.eventTime }}</span>
              </div>
              <div class="sub">
                <span>事件发生镇街：{{ dialogData.areaName }}</span>
              </div>
              <div class="sub">
                <span>事件发生地点：{{ dialogData.location }}</span>
              </div>
              <div class="sub">
                <span>事件内容：{{ dialogData.content }}</span>
              </div>
              <!-- <div class="sub">
                <span>现场资料：/</span>
              </div> -->
            </div>
            <!-- <div class="item">
              <div class="sub">
                <span>事件报警人员姓名：/</span>
                <span>事件接警人员姓名：/</span>
              </div>
              <div class="sub">
                <span>事件报警人员电话：/</span>
                <span>事件接警人员电话：/</span>
              </div>
              <div class="sub">
                <span>事件处置人员姓名：/</span>
                <span>事件报送状态：未报送</span>
              </div>
              <div class="sub">
                <span>事件处置人员电话：/</span>
                <span>事件星级：<el-rate v-model="value" size="large" /></span>
              </div>
            </div> -->
          </div>
          <div class="right-box">
            <div class="right-title">处置过程</div>
            <div class="right-info">
              <div class="item" v-for="(item, index) in dialogData.eventDisposes" :key="index">
                <div class="sub">处置人员：{{ item.disposer }}</div>
                <div class="sub">处置部门：{{ item.disposeDepartment }}</div>
                <div class="sub">处置情况：{{ item.content }}</div>
                <div class="sub">
                  <!-- <img src="@/assets/image/no-data.png" alt="" />
                  <img src="@/assets/image/no-data.png" alt="" /> -->
                </div>
                <div class="time">{{ item.disposeTime }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import { getEventList, getEvent, getEventStatisticsByDay } from '@/api/index.js';
import * as echarts from 'echarts';
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const test = computed(() => {
  return null;
});
let tabsData = ['四平台', '三件套', '110联动', '值班值守'];

let dialog = ref(false);
let dialogData = ref({});
let option = ref({});
let currentIndex = ref(0);
let myChart = null;
let eventList = ref([]);
async function getEventSystemListData() {
  eventList.value = [];
  let res = await getEventList({
    pageNum: 1,
    pageSize: 10,
    searchValue: tabsData[currentIndex.value],
  });
  console.log('getEventList', res);
  if (res.code === 200) {
    eventList.value = res.rows;
  }
}
let dayCount = ref([]);
async function getEventStatisticsByDayData() {
  let res = await getEventStatisticsByDay();
  console.log('getEventStatisticsByDay', res);
  if (res.code === 200) {
    dayCount.value = [
      {
        name: '今日事件数',
        value: res.rows.reduce((pre, next) => pre + next.dataCount, 0),
        className: 'sum',
      },
      {
        name: '待受理事件',
        value: res.rows.reduce((pre, next) => pre + next.pendingCount, 0),
        className: 'ing',
      },
      {
        name: '已办结',
        value: res.rows.reduce((pre, next) => pre + next.overCount, 0),
        className: 'end',
      },
    ];
    initHcharts(res.rows);
  }
  console.log('dayCount', dayCount.value);
}

async function openDialog(row) {
  const res = await getEvent(row.id);
  if (res.code === 200) {
    dialogData.value = res.data;
  }
  dialog.value = true;
}
function initChart() {
  let chartDemo = document.getElementById('pie2');
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
    // legend: {
    //   orient: 'vertical',
    //   left: 'left',
    // },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 8, name: '四平台' },
          { value: 4, name: '三件套' },
          { value: 2, name: '110联动' },
          { value: 0, name: '值班值守' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  option.value && myChart.setOption(option.value);
  window.addEventListener('resize', () => {
    myChart.resize();
  });
}
function initHcharts(rows) {
  let data = rows.map((item) => {
    return {
      name: item.systemName,
      y: item.dataCount,
    };
  });

  myChart = Highcharts.chart('pie', {
    colors: ['#8E57E7', '#56e8cd', '#007ff9', '#e8f700'],
    chart: {
      type: 'pie',
      // 指定内边距，下面的四个配置可以用 spacing: [10, 10, 15, 10] 来代替
      spacingBottom: 15,
      spacingTop: 10,
      spacingLeft: 10,
      spacingRight: 100,
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },
      backgroundColor: 'rgba(255, 255, 255, 0)',
    },
    title: {
      text: '',
    },
    credits: { enabled: false },
    tooltip: {
      //控制鼠标悬停显示的信息
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    legend: {
      //控制图例显示位置
      floating: true,
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'center',
      borderWidth: 0,
      y: 30,
      x: 70,
      itemMarginBottom: 16,
      itemStyle: {
        color: '#fff',
      },
      itemHoverStyle: {
        color: '#fff',
      },
      labelFormat: `<span >{name} </span><span style="margin-left:16px;color:#35FBF0">{y}</span>`,
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 35,
        dataLabels: {
          enabled: false,
          format: '{point.name}',
        },
        showInLegend: true,
      },
    },

    series: [
      {
        type: 'pie',
        name: '事件协同处置中心',
        data,
      },
    ],
  });
  window.addEventListener('resize', () => {
    myChart && myChart.reflow();
  });
}
watch();
onMounted(() => {
  // initChart();
  // F();
  getEventSystemListData();
  getEventStatisticsByDayData();
});
onUnmounted(() => {
  // myChart && myChart.dispose();
});
</script>
<style lang="less" scoped>
.right1 {
  margin: 50px 0 0 0;
  padding: 0 26px 0 22px;

  box-sizing: border-box;
  .title {
    padding: 0 0 8px 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 16.97px;
        height: 16.97px;
        margin-right: 12px;
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
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }
  .sub-title {
    padding: 0 0 0 14px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .el-icon {
      font-size: 20px;
      color: #ffffff;
    }
    .text {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
      margin-left: 16px;
    }
  }
  .sub1 {
    margin: 8px 0 0 0;
    .list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item {
        width: 216.6px;
        height: 50px;
        background: rgba(116, 190, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        box-sizing: border-box;
        margin: 12px 0 0 0;
        color: #e0fffe;
        .name {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
        .value-box {
          .number {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 32px;
          }
          .unit {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
          }
        }
      }
      .end {
        background: rgba(30, 105, 137, 0.8);
        color: #5afdee;
      }
      .out {
        background: rgba(61, 68, 93, 0.8);
        color: #ffac78;
      }
    }
    .pie-box {
      width: 400px;
      margin: 20px 0 0 0;
      height: 180px;
      // background: yellowgreen;
      .chart {
        width: 100%;
        height: 200px;
      }
    }
  }
  .sub2 {
    margin: 26px 0 0 0;
    .pie2 {
      height: 160px;
      margin: 22px 0 0 0;
    }
  }
  .sub3 {
    margin: 30px 0 0 0;
    .list {
      margin: 18px 0 0 0;
      height: 400px;
      overflow: hidden;
      .item {
        margin: 12px 0 0 0;
        width: 452px;
        height: 47px;
        background: rgba(25, 116, 195, 0.1);
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .name {
          color: rgba(255, 255, 255, 1);
          font-size: 16px;
          width: 400px;
          display: inline-block;
          white-space: nowrap; //强制文本在一行内显示
          text-overflow: ellipsis; //当对象内文本溢出时显示省略号标记
          overflow: hidden; //溢出内容隐藏
        }
        .view {
          color: rgba(20, 146, 255, 1);
          font-size: 16px;
          width: 60px;
          cursor: pointer;
        }
      }
    }
  }
  .dialog-info {
    // margin: 26px 0 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding: 24px;
    box-sizing: border-box;
    color: #fff;
    // background: #061728;
    .left-box {
      // width: 776px;
      height: 500px;
      background: #0a253f;
      box-shadow: inset 0 0 4px 2px rgba(255, 255, 255, 0.16);
      border-radius: 4px;
      padding: 24px;
      margin: 0 16px 0 0;
      box-sizing: border-box;
      .left-title {
        display: flex;
        align-items: center;

        .icon {
          width: 8px;
          height: 20px;
          background: #3198f4;
          border-radius: 4px;
          margin: 0 16px 0 0;
        }
      }
      .sub-title {
        margin: 22px 0 0 16px;
      }
      .item {
        width: 500px;
        height: 340px;
        overflow: scroll;
        background: #133251;
        box-shadow: inset 0 0 4px 2px rgba(255, 255, 255, 0.16);
        border-radius: 4px;
        margin: 44px 0 0 0;
        padding: 0px 30px 10px 30px;
        box-sizing: border-box;
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        .sub {
          display: flex;
          justify-content: space-between;
          margin: 20px 0 0 0;
        }
      }
    }
    .right-box {
      width: 371px;
      height: 500px;

      background: #0a253f;
      box-shadow: inset 0 0 4px 2px rgba(255, 255, 255, 0.16);
      border-radius: 4px;
      .right-title {
        height: 54px;
        border-bottom: 1px solid #fff;
        display: flex;
        align-items: center;
        padding: 0 0 0 20px;
        box-sizing: border-box;
      }
      .right-info {
        overflow: scroll;
        height: 440px;
        .item {
          padding: 18px 48px 0 24px;
          box-sizing: border-box;

          .sub {
            margin: 12px 0 0 0;
            img {
              width: 100px;
              height: 100px;
              border-radius: 4px;
              margin: 0 12px 0 0;
            }
          }
          .time {
            font-family: MicrosoftYaHei;
            font-size: 14px;
            color: rgba(206, 222, 242, 0.5);
            border-bottom: 1px solid rgba(206, 222, 242, 0.16);
            padding: 0 0 16px 0;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
:deep(.highcharts-root) {
  font-family: 'Microsoft Yahei' !important;
}
</style>
