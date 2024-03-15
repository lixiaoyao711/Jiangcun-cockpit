<template>
  <div class="item5">
    <div class="sub1">
      <div class="title">阵地聚“蒋”</div>
      <div class="info" @click="mapClick" id="map"></div>
    </div>
    <div class="sub2">
      <div class="title">群团兴“蒋”</div>
      <div class="info">
        <div class="icon-box">
          <div class="item1">
            <div class="number">{{ sum }}</div>
            <div class="name">群团集市</div>
          </div>
          <div class="item2">
            <div class="number">{{ tableData.length }}</div>
            <div class="name">活动风采</div>
          </div>
        </div>
        <div class="charts" id="charts"></div>
        <vue3-seamless-scroll :list="tableData" class="window" :hover="true" :step="0.5" :limitScrollNum="1" >
          <div class="window-item" v-for="(item, index) in tableData" :key="index">
            <span class="name" :title="item.subject">{{ item.subject }}</span>
            <span class="view" @click="showDialog(item)">详情☞</span>
          </div>
        </vue3-seamless-scroll>
      </div>
    </div>
    <Dialog :title="dialogData.subject" @close="isShowDialog = false" v-if="isShowDialog">
      <template v-slot:content>
        <div class="dialog-content">
          <img :src="dialogData.url" alt="" />
          <span class="item">{{ dialogData.content }}</span>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import { IndicatorGroupBazaarList, IndicatorGroupActivityStyleList } from '@/api/index';
import * as echarts from 'echarts';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['showMap']);
const props = defineProps({});
const {} = props;
const test = computed(() => {
  return null;
});
let option = ref({});
let map = ref(null);
function mapClick() {
  console.log('点击了地图');
  store.commit('setHomeBg', '/image/index-bg.png');
  emit('showMap');
}
// 地图的渲染最好写在init后,避免地图渲染不成功
function initMap(AMap) {
  map.value = new AMap.Map('map', {
    resizeEnable: true, //是否监控地图容器尺寸变化
    showIndoorMap: false, //关闭室内地图
    // mapStyle: 'amap://styles/darkblue',
    // viewMode: '3D', //开启3d模式
    // pitch: 50,
    zoom: 12,
    center: [120.089277, 30.197987],
  });
  // 设置光照
  map.value.AmbientLight = new AMap.Lights.AmbientLight([1, 1, 1], 1);
  map.value.DirectionLight = new AMap.Lights.DirectionLight([0, 0, 1], [1, 1, 1], 0.8);
  let object3Dlayer = new AMap.Object3DLayer();
  let bounds = [];
  map.value.add(object3Dlayer);
  new AMap.DistrictSearch({
    subdistrict: 0, //返回下一级行政区
    extensions: 'all', //返回行政区边界坐标组等具体信息
    level: 'city', //查询行政级别为 市
  }).search('西湖区', function (status, result) {
    console.log('result', result);
    bounds = result.districtList[0].boundaries;
    let height = 2000;
    let color = '#0088ff'; // rgba
    let prism = new AMap.Object3D.Prism({
      path: bounds,
      height: height,
      color: color,
    });
    let prism1 = new AMap.Object3D.Prism({
      path: bounds,
      height: 5000,
      color: '#c8c920cc',
    });

    prism.transparent = true;
    prism1.transparent = true;
    object3Dlayer.add(prism);
    object3Dlayer.add(prism1);

    for (let i = 0; i < bounds.length; i += 1) {
      let line = new AMap.Object3D.ThinLine({
        path: bounds[i],
        color: 'red',
      });
      object3Dlayer.add(line);
    }
  });
  //为地图注册click事件获取鼠标点击出的经纬度坐标
  // map.value.on('click', (e) => {
  //   store.commit('setHomeBg', '/image/index-bg.png');
  //   // emit('showMap');
  // });
}
let myChart = null;
function initChart(data) {
  console.log(data);
  let chartDemo = document.getElementById('charts');
  myChart = echarts.init(chartDemo);
  option.value = {
    // title: {
    //   text: 'Referer of a Website',
    //   subtext: 'Fake Data',
    //   left: 'center',
    // },
    // color: ['#57e7cb', '#e4f600', '#007cf6', '#8e57e7'],
    tooltip: {
      trigger: 'item',
      formatter: `{b}:{d}%`,
    },
    legend: {
      show: true,
      orient: 'vertical',
      right: '20%',
      bottom: '26%',
      type: 'scroll',
      pageIcons: {
        vertical: [
          'path:M966.4 668.8l-435.2-432c-9.6-9.6-25.6-9.6-35.2 0l-441.6 432c-9.6 9.6-9.6 25.6 0 35.2 9.6 9.6 25.6 9.6 35.2 0l425.6-416 416 416c9.6 9.6 25.6 9.6 35.2 0S976 678.4 966.4 668.8z',
          'path:M966.4 323.2c-9.6-9.6-25.6-9.6-35.2 0l-416 416-425.6-416c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l441.6 432c9.6 9.6 25.6 9.6 35.2 0l435.2-432C976 345.6 976 332.8 966.4 323.2z',
        ],
      },
      pageIconColor: '#fff',
      pageIconInactiveColor: '#1296db',
      pageTextStyle: {
        color: '#fff',
      },
      itemWidth: 8,
      // width: 150,
      itemHeight: 8,
      textStyle: {
        color: '#fff',
        fontSize: '12',
      },
      formatter: (val) => {
        let back = '';
        data.map((item, index) => {
          if (item.name == val) {
            console.log(item, val);
            back = `${val}    ${item.value}个`;
          }
        });
        return back;
      },
    },
    series: [
      {
        center: ['30%', '40%'],
        name: '',
        type: 'pie',
        radius: ['36%', '63%'],
        label: {
          normal: {
            // position: 'inner',
            show: false,
          },
        },
        data,
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
let tableData = ref([]);
async function getData() {
  const res = await IndicatorGroupActivityStyleList();
  if (res) {
    tableData.value = res.rows;
  }
}
let sum = ref(0);

async function getChartData() {
  const res = await IndicatorGroupBazaarList();
  if (res) {
    let data = res.rows.map((item) => {
      item.value = item.groupSum;
      sum.value += item.value * 1.0;
      return item;
    });
    initChart(data);
  }
}
let dialogData = ref({});
let isShowDialog = ref(false);
function showDialog(row) {
  dialogData.value = row;
  isShowDialog.value = true;
}
watch();
onMounted(() => {
  getChartData();
  getData();
  initMap(AMap);
});
onUnmounted(() => {
  myChart && myChart.dispose();
});
</script>
<style lang="less" scoped>
.item5 {
  .title {
    background: url('@/assets/image/djbt.png');
    background-size: 100% 100%;
    align-items: center;
    height: 40px;
    font-family: PingFangSC-S0pxibold;
    font-weight: 600;
    font-size: 21px;
    color: #30f7fd;
    display: flex;
    justify-content: center;
    letter-spacing: 0;
    text-shadow: 0 2px 2px rgba(76, 255, 244, 0.5);
    box-sizing: border-box;
  }
  .sub1 {
    width: 400px;
    height: 386px;
    background: rgba(92, 132, 253, 0.1);
    border-radius: 8px;
    padding: 0 18px 0 20px;
    box-sizing: border-box;
    .info {
      width: 361.01px;
      height: 314px;
      // background: thistle;
      margin: 8px 0 0 0;
    }
  }
  .sub2 {
    width: 400px;
    height: 386px;
    background: rgba(92, 132, 253, 0.1);
    border-radius: 8px;
    padding: 0 18px 34px 20px;
    box-sizing: border-box;
    margin: 28px 0 0 0;
    .info {
      .icon-box {
        margin: 12px 0 0 0;
        width: 338.17px;
        height: 76px;
        background: url('@/assets/image/qtxj-bg.png');
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .item1 {
          margin: 0 60px 0 0;
        }
        .number {
          font-family: DINAlternate-Bold;
          font-weight: 700;
          font-size: 36px;
          color: #ccfaff;
        }
        .name {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ccfaff;
        }
      }
      .charts {
        width: 380.06px;
        height: 160px;
        margin: 22px 0 0 0;
      }
      .window {
        width: 358px;
        height: 47px;
        background: rgba(25, 116, 195, 0.1);
        border-radius: 8px;
        overflow: hidden;
        padding: 0 20px;
        box-sizing: border-box;
        .window-item {
          height: 47px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }
        .name {
          color: rgba(255, 255, 255, 1);
          font-size: 16px;
          width: 80%;
          overflow: hidden; //溢出内容隐藏
          display: inline-block;
          white-space: nowrap; //强制文本在一行内显示
          text-overflow: ellipsis; //当对象内文本溢出时显示省略号标记
        }
        .view {
          color: rgba(20, 146, 255, 1);
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
  }
  .dialog-content {
    img {
      max-width: 400px;
      max-height: 400px;
      width: auto;
      height: auto;
      object-fit: scale-down;
      float: left;
      margin-right: 20px;
      line-height: 1;
      vertical-align: top;
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
</style>
