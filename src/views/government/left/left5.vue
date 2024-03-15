<template>
  <div class="left5">
    <div class="title">
      <div class="left">
        <img src="@/assets/image/lsjt.png" alt="" />
        <div class="text">高效能治理</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="info">
      <div class="list">
        <div class="item">
          <div class="item-title">
            <div class="title-left">
              <el-icon><CaretRight /></el-icon>
              <span class="text">大综合一体化行政执法改革</span>
            </div>
            <div class="title-right" @click="openDialog">
              查看详情
              <TitleIcon
                :type="typeMap[governmentData['数字政府-高效能治理-大综合一体化行政执法改革-考核名次'].value]"
              ></TitleIcon>
            </div>
          </div>
          <div class="item-info">
            <div class="items">
              <span class="name">办案数量</span>
              <span class="number">{{
                governmentData['数字政府-高效能治理-大综合一体化行政执法改革-办案数量'].value
              }}</span>
              <span class="unit">{{
                governmentData['数字政府-高效能治理-大综合一体化行政执法改革-办案数量'].unit
              }}</span>
            </div>
            <div class="items">
              <span class="name">综合查一次</span>
              <span class="number">{{
                governmentData['数字政府-高效能治理-大综合一体化行政执法改革-综合查一次数量'].value
              }}</span>
              <span class="unit">{{
                governmentData['数字政府-高效能治理-大综合一体化行政执法改革-综合查一次数量'].unit
              }}</span>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-title">
            <div class="title-left">
              <el-icon><CaretRight /></el-icon>
              <span class="text">防违控违</span>
            </div>
          </div>
          <div class="item-info">
            <div class="item">
              <span class="name">拆除违建</span>
              <div class="count">
                <span class="number">{{ governmentData['数字政府-高效能治理-防违控违-数量'].value }}</span>
                <span class="unit">{{ governmentData['数字政府-高效能治理-防违控违-数量'].unit }}</span>
              </div>
            </div>
            <div class="item">
              <span class="name">面积</span>
              <div class="count">
                <span class="number">{{ governmentData['数字政府-高效能治理-防违控违-面积'].value }}</span>
                <span class="unit">{{ governmentData['数字政府-高效能治理-防违控违-面积'].unit }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog title="大综改" @close="isDialog = false" v-if="isDialog">
      <template v-slot:content>
        <div class="dialog-content">
          <div class="dialog-left">
            <div class="left-title">本周工作动态</div>
            <div class="left-info">
              {{ governmentData['数字政府-高效能治理-大综合一体化行政执法改革-本周工作动态'].value }}
            </div>
          </div>
          <div class="dialog-right">
            <div class="charts" ref="pie" id="pie123"></div>
            <div class="count-box">
              <div class="count-left">
                <img src="@/assets/image/qian.png" alt="" />
                <span>累计处罚金额</span>
              </div>
              <div class="count-right">
                <div class="right-number">
                  {{ governmentData['数字政府-高效能治理-大综合一体化行政执法改革-累计处罚金额'].value }}
                </div>
                <div class="right-unit">
                  {{ governmentData['数字政府-高效能治理-大综合一体化行政执法改革-累计处罚金额'].unit }}
                </div>
              </div>
            </div>
            <div class="end-box">
              <div class="end-title">监管一件事完成数量</div>
              <div class="end-value-box">
                <div class="number">
                  {{ governmentData['数字政府-高效能治理-大综合一体化行政执法改革-监管一件事完成数量'].value }}
                </div>
                <div class="unit">
                  {{ governmentData['数字政府-高效能治理-大综合一体化行政执法改革-监管一件事完成数量'].unit }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import store from '@/store';
import * as echarts from 'echarts';
import { IndicatorSetTableTrendsList } from '@/api/index';

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const governmentData = computed(() => {
  return store.state.governmentData;
});
let option = ref({});
let pie = ref(null);
let myChart = ref(null);
let isDialog = ref(false);
let typeMap = {
  前列: 'success',
  居中: 'warning',
  靠后: 'danger',
};
let chartsData = ref([]);
async function getChartsData() {
  const res = await IndicatorSetTableTrendsList('case_statistics');
  if (res.code === 200) {
    chartsData.value = res.rows.map((item) => {
      item.value = item.num;
      return item;
    });
    initChart();
  }
}
function initChart() {
  let chartDemo = document.getElementById('pie123');
  myChart = echarts.init(chartDemo);
  let data = chartsData.value
  option.value = {
    // color: ['#0CC191', '#F7A82B'],
    tooltip: {
      trigger: 'item',
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      left: '40%',
      top: 'center',
      bottom: 0,
      icon: 'rect', //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      fontSize: '20',
      textStyle: {
        color: '#fff',
      },
      formatter: (val) => {
        console.log(val);
        return `${val}  ${data.filter((item) => item.name === val)[0].value}       个`;
      },
    },

    series: [
      {
        name: '',
        type: 'pie',
        radius: ['50%', '80%'],
        center: ['20%', '50%'],
        labelLine: {
          show: false,
        },
        label: {
          show: false,
          position: 'center',
        },
        data,
        emphasis: {
          itemStyle: {
            show: false,
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
function openDialog() {
  isDialog.value = true;
  getChartsData();
}
watch();
onMounted(() => {});
onUnmounted(() => {
  window.removeEventListener('resize', () => {
    myChart.resize();
  });
});
</script>
<style lang="less" scoped>
.left5 {
  margin-top: 20px;
  .title {
    width: 452px;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    padding-bottom: 7px;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 16.97px;
        height: 16.97px;
        margin-right: 10px;
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
    padding-left: 26px;
    padding-right: 40px;
    box-sizing: border-box;
    margin-top: 20px;
    .list {
      .item {
        color: #ffffff;
        margin-top: 22px;
        .item-title {
          display: flex;
          justify-content: space-between;
          .title-right {
            display: flex;
            font-size: 14px;
            color: #73d5e5;
            cursor: pointer;
          }
          .text {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
          }
        }
        .item-info {
          padding-left: 12px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .item {
            width: 197px;
            height: 50px;
            background: url('@/assets/image/home-iten-bg.png');
            background-size: 100% 100%;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 16px;
            box-sizing: border-box;
            .count {
              .number {
                font-weight: 700;
                font-size: 28px;
                color: #e0fffe;
                margin: 0 14px 0 0;
              }
            }
          }
          .items {
            .name {
              width: 32px;
              height: 22px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 16px;
              color: #ffffff;
              margin-right: 30px;
            }
            .number {
              font-family: DINAlternate-Bold;
              font-weight: 700;
              font-size: 26px;
              color: #e0fffe;
              margin-right: 12px;
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
  }
  .dialog-content {
    width: 681px;
    height: 367px;
    display: flex;
    .dialog-left {
      width: 40%;
      border-right: 4px solid #ffffff29;
      padding: 0 26px 0 0;
      box-sizing: border-box;
      height: 100%;
      .left-title {
        width: 220px;
        height: 31px;
        border-radius: 0 0 22px 20px;
        background: url('@/assets/image/week-bg.png');
        background-size: 100% 100%;
        font-family: PingFangSC-SNaNpxibold;
        font-weight: 600;
        font-size: 16px;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .left-info {
        margin: 20px 0 0 0;
      }
    }
    .dialog-right {
      flex: 1;
      height: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      .charts {
        height: 150px;
      }
      .count-box {
        display: flex;
        align-items: center;
        position: relative;
        margin-top:25px;
        .count-left {
          width: 360px;
          height: 36px;
          background-image: linear-gradient(270deg, #f0974700 25%, #ef864b69 75%);
          border-radius: 8px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
          display: flex;
          align-items: center;
          padding: 0 0 0 20px;
          box-sizing: border-box;
          img {
            width: 14px;
            height: 16px;
            margin: 0 14px 0 0;
          }
        }
        .count-right {
          width: 84px;
          height: 84px;
          background-image: radial-gradient(circle at 50% 50%, #f0974700 0%, #ef864b69 50%);
          border: 1px solid #ffb55e;
          box-shadow: inset 0 -8px 12px 0 #ffffff29;
          position: absolute;
          right: 10px;
          border-radius: 80px;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .right-number {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 36px;
            color: #f08128;
          }
          .right-unit {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: #ffffff;
          }
        }
      }
      .end-box {
        width: 360px;
        height: 50px;
        border-radius: 8px;
        margin: 40px 0 0 0;
        background: url('@/assets/image/home-iten-bg.png');
        background-size: 100% 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        box-sizing: border-box;
        .end-title {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
        .end-value-box {
          display: flex;
          align-items: center;
          .number {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 28px;
            color: #e0fffe;
            margin: 0 14px 0 0;
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
}
</style>
