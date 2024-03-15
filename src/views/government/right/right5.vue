<template>
  <div class="right5">
    <div class="title">
      <div class="left">
        <img src="@/assets/image/lsjt.png" alt="" />
        <div class="text">高水平安居</div>
      </div>
      <div class="right">
        <TitleIcon effect="card"></TitleIcon>
      </div>
    </div>
    <div class="info">
      <div class="lincharts" id="pie"></div>
      <div class="item-top">
        <div class="item-top-name">业主组织覆盖率</div>
        <div class="item-top-number">{{ governmentData['数字政府-高水平安居-业主组织覆盖率'].value }}</div>
        <div class="item-top-unit">{{ governmentData['数字政府-高水平安居-业主组织覆盖率'].unit }}</div>
      </div>
      <div class="list">
        <div class="item">
          <div class="item-name">专业化物业</div>
          <div class="item-number">{{ governmentData['数字政府-高水平安居-专业化物业'].value }}</div>
          <div class="item-unit">{{ governmentData['数字政府-高水平安居-专业化物业'].unit }}</div>
        </div>
        <div class="item">
          <div class="item-name">覆盖率</div>
          <div class="item-number">{{ governmentData['数字政府-高水平安居-覆盖率'].value }}</div>
          <div class="item-unit">{{ governmentData['数字政府-高水平安居-覆盖率'].unit }}</div>
        </div>
      </div>
    </div>
    <Dialog :title="dialogData.title" @close="isShowDialog = false" v-if="isShowDialog">
      <template v-slot:content>
        <div class="dialog-info">
          <div class="info-item" v-for="(data, index) in dialogData.info" :key="index">
            <span class="name">{{ data.name }}</span>
            <div class="value-box">
              <div class="number">{{ data.value }}</div>
              <div class="unit">{{ data.unit }}</div>
            </div>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import axios from 'axios';
import { IndicatorSetTableTrendsList } from '@/api/index';
import store from '@/store';
import * as echarts from 'echarts';

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const governmentData = computed(() => {
  return store.state.governmentData;
});
let myChart = null;
let option = ref({});

function initChart() {
  let chartDemo = document.getElementById('pie');
  myChart = echarts.init(chartDemo);
  let data = tableList.value;
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
      orient: 'vertical',
      pageIcons: {
        vertical: [
          'path://M472.064 272.448l-399.232 399.232c-22.08 22.08-22.08 57.792 0 79.872 22.016 22.016 57.792 22.08 79.872 0L512 392.256l359.296 359.296c22.016 22.016 57.792 22.08 79.872 0 22.08-22.08 22.016-57.792 0-79.872L551.936 272.448C529.856 250.432 494.144 250.432 472.064 272.448z',
          'path://M472.064 751.552 72.832 352.32c-22.08-22.08-22.08-57.792 0-79.872 22.016-22.016 57.792-22.08 79.872 0L512 631.744l359.296-359.296c22.016-22.016 57.792-22.08 79.872 0 22.08 22.08 22.016 57.792 0 79.872l-399.232 399.232C529.856 773.568 494.144 773.568 472.064 751.552z',
        ],
      },
      pageTextStyle: {
        color: '#fff',
      },
      pageIconColor: '#29bca8', // 可以点击的翻页按钮颜色
      pageIconInactiveColor: '#fff', // 禁用的按钮颜色
      pageIconSize: 15, //这当然就是按钮的大小
      left: '40%',
      top: 0,
      type: 'scroll',
      icon: 'rect', //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      fontSize: '20',
      textStyle: {
        color: '#fff',
      },
      itemWidth: 10,
      // itemHeight: 14,
      formatter: (val) => {
        return `${val}  ${data.filter((item) => item.name === val)[0].value}       个`;
      },
    },

    series: [
      {
        name: '',
        type: 'pie',
        radius: ['50%', '90%'],
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

let dialog = ref(false);
let tableList = ref([]);
async function getData() {
  const res = await IndicatorSetTableTrendsList('high_level_hous');
  if (res.code === 200) {
    tableList.value = res.rows.map((item) => {
      item.value = item.num;
      return item;
    });
    initChart();
  }
}
let isShowDialog = ref(false);
let dialogData = ref({});
function openDialog(row) {
  isShowDialog.value = true;
  dialogData.value = row;
}
watch();
onMounted(() => {
  getData();
});
onUnmounted(() => {
  myChart && myChart.dispose();
});
</script>
<style lang="less" scoped>
.right5 {
  margin-top: 48px;
  box-sizing: border-box;
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
    .right {
      display: flex;
      align-items: center;
      .view {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 14px;
        color: #73d5e5;
        cursor: pointer;
        margin-right: 16px;
      }
      .icon-box {
        width: 26px;
        height: 26px;
        background: rgba(78, 255, 143, 0.4);
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          width: 18px;
          height: 18px;
          background: #4eff8f;
          border-radius: 30px;
        }
      }
    }
  }
  .info {
    padding: 16px 60px 0 6px;
    box-sizing: border-box;
    .lincharts {
      height: 100px;
    }
    .item-top {
      display: flex;
      align-items: center;
      .item-top-name {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
        margin: 0 14px 0 0;
      }
      .item-top-number {
        font-family: DINAlternate-Bold;
        font-weight: 700;
        font-size: 26px;
        color: #e0fffe;
        margin: 0 12px 0 0;
      }
      .item-top-unit {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 14px;
        color: #ffffff;
      }
    }
    .list {
      display: flex;
      .item {
        display: flex;
        margin: 0 40px 0 0;
        align-items: center;
        .item-name {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          margin: 0 20px 0 0;
        }
        .item-number {
          font-family: DINAlternate-Bold;
          font-weight: 700;
          font-size: 26px;
          color: #e0fffe;
          margin: 0 12px 0 0;
        }
        .item-unit {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
  }
  .dialog-info {
    margin: 26px 0 0 0;
    min-width: 200px;
    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .value-box {
        display: flex;
        color: #ffffff;
        align-items: center;
        .number {
          font-family: DINAlternate-Bold;
          font-weight: 700;
          font-size: 26px;
          color: #e0fffe;
          margin: 0 12px 0 0;
        }
        .unit {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          align-self: flex-end;
        }
      }
    }
  }
}
</style>
