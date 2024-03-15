<template>
  <div class="general">
    <div class="map" id="economicMap"></div>
    <main>
      <Left />
      <Center />
      <Right />

      <featureWorkList v-if="isShowFooter" :tableData="tableData" />
    </main>

    <Dialog :title="'楼宇信息'" @close="isShowDialog = false" v-show="isShowDialog">
      <template v-slot:content>
        <div class="main">
          <div class="title">{{ dialogData.buildingName }}楼宇信息</div>
          <div class="content">
            <div class="content-title">简介</div>
            <div class="content-list">
              <div class="item">
                <span class="item-title">商务面积:</span>
                <span class="item-text">60000㎡</span>
              </div>
              <div class="item">
                <span class="item-title">运营方：</span>
                <span class="item-text">杭州极氪科技发展有限公司</span>
              </div>
              <div class="item">
                <span class="item-title">空置率:</span>
                <span class="item-text">3.0%</span>
              </div>
              <div class="item">
                <span class="item-title">楼宇类型：</span>
                <span class="item-text">房地产总部经济</span>
              </div>
              <div class="item">
                <span class="item-title">荣誉：</span>
                <span class="item-text"
                  >杭州市级科技企业孵化器
                  （2017）、杭州市两创示范“小微企业创业创新基地”（2017）、杭州市小微企业创业创新基地城市示范“活动券”服务机构（2017）</span
                >
              </div>
              <div class="item">
                <span class="item-title">重点企业：</span>
                <span class="item-text"
                  >绿城物业服务集团有限公司、绿城房地产建设管理集团有限公司、辉迈建设集团有限公司、浙江当代建筑设计研究院有限公司、杭州变现猫网络科技有限公司、杭州易己产业科技有限公司</span
                >
              </div>
            </div>
          </div>
          <div class="content">
            <div class="content-title">服务</div>
            <div class="content-list1">
              <div class="item">
                <span class="item-title">区管干部：</span>
                <span class="item-text">蒋村街道办事处副主任 傅芸秀 二级调研员 江浩</span>
              </div>
              <div class="item">
                <span class="item-title">经合社：</span>
                <span class="item-text">深潭口经合社书记 蒋士坤</span>
              </div>
              <div class="item">
                <span class="item-title">企服中心：</span>
                <span class="item-text">为企服务员 侯明明</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import Left from '@/views/economic/left';
import Right from '@/views/economic/right';
import Center from '@/views/economic/center';
import { indicatorSetTreMapList, IndicatorFeaturedWorkList, mapEconomicParkList } from '@/api/index';
import * as echarts from 'echarts';
import { getLocalData, formatMapData } from '@/utils/map.js';
import gcoord from 'gcoord';
import featureWorkList from '@/components/featureWorkList.vue';

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
let tableData = ref([]);

let isShowFooter = ref(false);

async function getList() {
  let obj = {
    fullPath: '数字经济',
    searchValue: 'isNotNull',
  };

  const res = await IndicatorFeaturedWorkList({
    type: 3,
  });
  if (res) {
    tableData.value = res.rows;
  }
  const { data } = await indicatorSetTreMapList(obj);
  if (data) {
    isShowFooter.value = data['数字经济-特色工作-是否展示'].value === 'false' ? false : true;
    store.commit('setEconomicData', data);
  }
}

///====================地图相关============================
const checkList = computed(() => {
  console.log('checkList变了');
  return store.state.checkList;
});
let saveLines = [];
let savePonits = [];
let lines = [];
let points = [];
let infoWindow = ref([]);
let isShowDialog = ref(false);
let dialogData = ref({});
watch(checkList, (newValue, oldValue) => {
  // 多次点击清除上一次的多边形避免重复渲染
  saveLines = [];
  savePonits = [];
  //清除地图所有覆盖物
  map.clearMap();
  newValue.map((item, index) => {
    // 处理线数据
    console.log(checkbox.value[item]);
    if (checkbox.value[item].chartType === 'line') {
      console.log('checkbox.value[item].path', checkbox.value[item].data);
      for (const key of checkbox.value[item].data) {
        saveLines.push(key);
      }
    }
    //处理点位数据
    else {
      for (const key of checkbox.value[item].data) {
        savePonits.push(key);
      }
    }
  });
  // 绘制线
  saveLines.map((line, index) => {
    lines[index] = new AMap.Polyline({
      path: line.line,
      isOutline: true,
      outlineColor: '#DBFAFF',
      borderWeight: 3,
      strokeColor: '#CFF9FF',
      strokeOpacity: 1,
      strokeWeight: 6,
      // 折线样式还支持 'dashed'
      strokeStyle: 'solid',
      // strokeStyle是dashed时有效
      strokeDasharray: [10, 5],
      lineJoin: 'round',
      lineCap: 'round',
      zIndex: 50,
    });
    map.add(lines[index]);
    //鼠标点击marker弹出自定义的信息窗体
    AMap.event.addListener(lines[index], 'click', function () {
      console.log('123', saveLines[index]);
      // infowidnow 的 innerHTML
      var infoWindowContent = `<div style="background: #fff"><label style="color:#1890FF">${saveLines[index].buildingName}</label></div>`;
      // 创建一个自定义内容的 infowindow 实例
      infoWindow[index] = new AMap.InfoWindow({
        position: saveLines[index].line[0],
        offset: new AMap.Pixel(0, -15),
        content: infoWindowContent,
      });
      infoWindow[index].open(map);
    });
  });
  //绘制点
  savePonits.map((item, index) => {
    points[index] = new AMap.Marker({
      icon: new AMap.Icon({
        image: item.icon,
        size: new AMap.Size(52, 52), //图标大小
        imageSize: new AMap.Size(36, 36),
      }),
      position: item.point,
    });
    map.add(points[index]);
    //鼠标点击marker弹出自定义的信息窗体
    AMap.event.addListener(points[index], 'click', function () {
      dialogData.value = savePonits[index];
      isShowDialog.value = true;
      setTimeout(() => {
        initChart();
      }, 300);
    });
  });
});

let checkbox = ref({
  楼宇: {
    data: [],
    chartType: '',
    strokeColor: '#0DC5C7',
    fillColor: '#4AFFFD',
    icon: 'image/ly.png',
  },
  经济产业带: {
    data: [],
    chartType: '',
    // strokeColor: '#FF5D5D',
    // fillColor: '#FFA2A2',
    icon: 'image/cyd.png',
  },
});

let map = null;
let mapPath = ref([]);
// 获取地图数据
async function getMapData() {
  const res = await mapEconomicParkList();
  if (res) {
    mapPath.value = res.rows.map((item) => {
      item.keyEnterprises ? (item.keyEnterprisesList = item.keyEnterprises.split(',')) : '';
      return item;
    });
    formatMapData(mapPath.value, checkbox.value);
    console.log('formatMapData', mapPath.value, checkbox.value);
  }
}

// 地图的渲染最好写在init后,避免地图渲染不成功
function initMap(AMap) {
  var opts = {
    subdistrict: 0,
    extensions: 'all',
    level: 'city',
  };
  //利用行政区查询获取边界构建mask路径
  //也可以直接通过经纬度构建mask路径
  var district = new AMap.DistrictSearch(opts);
  district.search('西湖区', async function (status, result) {
    const res = await axios({
      url: 'json/town-street.geojson',
      method: 'get',
      baseURL: null,
    });

    console.log('西湖区', result);
    console.log('res.features', res.data.features);
    var bounds = [];
    // 画西湖区全区地图
    res.data.features.forEach((e) => {
      let coordinates = e.geometry.coordinates;
      if (coordinates.length > 1) {
        coordinates.forEach((f) => {
          bounds.push(f[0]);
        });
      } else {
        bounds.push(coordinates[0]);
      }
    });
    //  转换坐标系geojson坐标系为WGS84,高德地图坐标系为GCJ02,如果不转换会有偏差
    bounds[0] = bounds[0].map((item) => {
      return gcoord.transform(item, gcoord.WGS84, gcoord.GCJ02);
    });
    var mask = [];
    for (var i = 0; i < bounds.length; i += 1) {
      mask.push([bounds[i]]);
    }
    map = new AMap.Map('economicMap', {
      mask: mask,
      center: [120.071336, 30.266836],
      disableSocket: true,
      viewMode: '3D',
      showLabel: true,
      features: ['bg', 'road', 'building'],

      labelzIndex: 130,
      pitch: 30,
      zoom: 14.6,
      layers: [
        new AMap.TileLayer.RoadNet({
          //rejectMapMask:true
        }),
        new AMap.TileLayer.Satellite(),
      ],
    });

    //添加高度面
    let object3Dlayer = new AMap.Object3DLayer({ zIndex: 1 });
    map.add(object3Dlayer);
    var height = -2000;
    var color = 'rgba(2,33,46,0.7)'; //rgba
    var wall = new AMap.Object3D.Wall({
      path: bounds,
      height: height,
      color: color,
    });
    wall.transparent = true;
    object3Dlayer.add(wall);
    //添加描边
    // for (var i = 0; i < bounds.length; i += 1) {
    //   new AMap.Polyline({
    //     path: bounds[i],
    //     strokeColor: '#99ffff',
    //     strokeWeight: 4,
    //     map: map,
    //   });
    // }
  });
  // 控制footer和地图同时渲染避免报错
  store.commit('setIsFooter', true);
}
///====================地图相关============================
let option = ref({});
let myChart = null;
function initChart() {
  let chartDemo = document.getElementById('pie-charts1');
  myChart = echarts.init(chartDemo);
  option.value = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 4,
        itemStyle: {
          color: '#58D9F9',
          shadowColor: 'rgba(0,138,255,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
          roundCap: true,
          width: 16,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 16,
          },
        },
        axisTick: {
          show: false,
          splitNumber: 2,
          lineStyle: {
            width: 2,
            color: '#999',
          },
        },
        splitLine: {
          show: false,
          length: 12,
          lineStyle: {
            width: 3,
            color: '#999',
          },
        },
        axisLabel: {
          show: false,
          distance: -46,
          color: '#999',
          fontSize: 16,
          color: '#fff',
        },
        title: {
          show: true,
          offsetCenter: ['0', '30%'],
          color: '#fff',
        },
        detail: {
          valueAnimation: true,
          fontSize: 28,
          offsetCenter: [0, '-30%'],
          color: '#fff',
          formatter: (val) => {
            return `${val}%`;
          },
        },
        data: [
          {
            value: Number(dialogData.value.vacancyRate * 100).toFixed(2),
            name: '空置率',
          },
        ],
      },
    ],
  };
  option.value && myChart.setOption(option.value);
  window.addEventListener('resize', () => {
    myChart.resize();
  });
}
watch();
onMounted(() => {
  // 控制footer和地图同时渲染避免报错
  store.commit('setIsFooter', false);
  emit('update:checkbox', checkbox.value);
  getList();
  getMapData();
 
  initMap(AMap);
});
onUnmounted(() => {
  myChart && myChart.dispose();
  map && map.destroy();
});
</script>
<style lang="less" scoped>
.general {
  height: 100%;
  width: 100%;
  position: relative;
  .map {
    width: 100%;
    height: calc(1080px - 90px);
    position: relative;
  }
  main {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: calc(1080px - 90px);
    // height: 100%;
    justify-content: space-between;
    box-sizing: border-box;
    pointer-events: none;
  }
  footer {
    position: absolute;
    bottom: 0.75vw;
    left: 50%;
    transform: translate(-50%); //水平、垂直都居中,也可以写成下面的方式
    pointer-events: auto;
    .title-box {
      display: flex;
      .title {
        padding: 10px;
        box-sizing: border-box;
        background: rgba(43, 169, 189, 0.5);
        border-radius: 8px 0 20px 0;
        font-weight: 600;
        font-size: 14px;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 0 18px 0 0;
        cursor: pointer;
      }

      .changeTab {
        background: #2ba9bd;
      }
    }
    .content {
      padding: 0px 40px 0px 16px;
      box-sizing: border-box;
      font-weight: 400;
      font-size: 14px;
      color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 88px;
      overflow: scroll;
      img {
        width: 141.53px;
        height: 87px;
        border-radius: 4px;
      }
    }

    width: 869px;
    height: 135px;
    background: rgba(15, 39, 108, 0.7);
    border: 2px solid #2ba9bd;
    border-radius: 8px;
  }
  .main {
    width: 680px;
    height: 542px;
    // background: #082543;
    padding: 14px;
    box-sizing: border-box;

    .title {
      font-family: PingFangSC-S0pxibold;
      font-weight: 600;
      font-size: 16px;
      color: #73d5e5;
    }
    .content {
      width: 632px;
      // height: 290px;
      background-image: linear-gradient(90deg, #6ca7ff33 0%, #4366ff4d 100%);
      border-radius: 8px;
      background: url('@/assets/image/home-iten-bg.png');
      background-size: 100% 100%;
      padding: 16px;
      box-sizing: border-box;
      margin: 16px 0 0 0;
      .content-title {
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: 16px;
        color: #ffffff;
      }
      .content-list {
        display: flex;
        flex-wrap: wrap;
        .item {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          margin: 16px 40px 0 0;
        }
      }
      .content-list1 {
        .item {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          margin: 16px 40px 0 0;
        }
      }
    }
  }
}
:deep(.amap-info-content) {
  background: #fff;
  border-radius: 60px;
  color: #b7e9fd;
  border: 2px solid #1492ff;
}
</style>
