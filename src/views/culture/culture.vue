<template>
  <div class="general">
    <div class="main-title">
      <div class="main-title-text">文以化人</div>
    </div>
    <div class="map" id="cultureMap"></div>

    <main>
      <Left />
      <Center />
      <Right />
    </main>

    <featureWorkList v-if="isShowFooter" :tableData="tableData" />
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import Left from '@/views/culture/left';
import Right from '@/views/culture/right';
import Center from '@/views/culture/center';
import { indicatorSetTreMapList, IndicatorFeaturedWorkList, mapDigitalCultureList } from '@/api/index';
import { getLocalData, formatMapData } from '@/utils/map.js';
import gcoord from 'gcoord';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import featureWorkList from '@/components/featureWorkList.vue';

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const test = computed(() => {
  return null;
});
// let isShow = ref(false);
let tableData = ref([]);
let isShowFooter = ref(false);
async function getList() {
  let obj = {
    fullPath: '数字文化',
    searchValue: 'isNotNull',
  };

  const res = await IndicatorFeaturedWorkList({
    type: 5,
  });
  if (res) {
    tableData.value = res.rows;
  }
  const { data } = await indicatorSetTreMapList(obj);
  if (data) {
    isShowFooter.value = data['数字文化-特色工作-是否展示'].value === 'true';
    store.commit('setCultureData', data);
    // isShow.value = true;
  }
}

///====================地图相关============================
const checkList = computed(() => {
  // console.log('checkList变了');
  return store.state.checkList;
});
let savePolygons = []
let savePonits = []
let polygons = []
let points =  []
let infoWindow = ref([]);
watch(checkList, (newValue, oldValue) => {
  // 多次点击清除上一次的多边形避免重复渲染
  savePolygons = [];
  savePonits = [];
  //清除地图所有覆盖物
  map && map.clearMap();
  newValue.map((item, index) => {
    // 处理多边形数据
    if (checkbox.value[item].chartType === 'polygons') {
      // console.log('checkbox.value[item].path', checkbox.value[item].data);
      for (const key of checkbox.value[item].data) {
        savePolygons.push(key);
      }
    }
    //处理点位数据
    else {
      for (const key of checkbox.value[item].data) {
        savePonits.push(key);
      }
    }
  });
  // 绘制多边形
  savePolygons.map((line, index) => {
    polygons[index] = new AMap.Polygon({
      path: line.path,
      strokeColor: line.strokeColor,
      strokeWeight: 3,
      strokeOpacity: 1,
      fillOpacity: 0.4,
      fillColor: line.fillColor,
      zIndex: 50,
    });
    map.add(polygons[index]);
    //鼠标点击marker弹出自定义的信息窗体
    AMap.event.addListener(polygons[index], 'click', function () {
      // console.log('123', savePolygons[index]);
    });
  });
  //绘制点
  savePonits.map((item, index) => {
    // console.log(item);
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
      // console.log('123', savePonits[index]);
      // infowidnow 的 innerHTML
      var infoWindowContent = `<div><label style="color:#fff">${savePonits[index].addressName}</label></div>`;
      // 创建一个自定义内容的 infowindow 实例
      infoWindow[index] = new AMap.InfoWindow({
        position: savePonits[index].point,
        offset: new AMap.Pixel(0, -15),
        content: infoWindowContent,
      });
      infoWindow[index].open(map);
    });
  });
});
function markerClick(e) {
  infoWindow.value = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });
  infoWindow.value.setContent(e.target.content);
  infoWindow.value.open(map, e.target.getPosition());
}
let checkbox = ref({
  实践站: {
    data: [],
    chartType: '',
    icon: 'image/wmdw.png',
  },
  体育健身场地: {
    data: [],
    chartType: '',
    icon: 'image/tyjscd.png',
  },
  公共文化设施: {
    data: [],
    chartType: '',
    icon: 'image/ggwhss.png',
  },
});

let map
let mapPath = ref([]);
// 获取地图数据
async function getMapData() {
  const res = await mapDigitalCultureList();
  if (res) {
    mapPath.value = res.rows;
    formatMapData(mapPath.value, checkbox.value);
    // console.log('formatMapData', mapPath.value, checkbox.value);
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
    map = new AMap.Map('cultureMap', {
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
    let color = 'rgba(2,33,46,0.7)'; //rgba
    var wall = new AMap.Object3D.Wall({
      path: bounds,
      height: height,
      color: color,
    });
    wall.transparent = true;
    object3Dlayer.add(wall);
  });
  store.commit('setIsFooter', true);
}
///====================地图相关============================
watch();
onMounted(() => {
  // 控制footer和地图同时渲染避免报错
  store.commit('setIsFooter', false);
  getList();
  getMapData();
  emit('update:checkbox', checkbox.value);
 
  initMap(AMap);
});
onUnmounted(() => {
  map && map.destroy();
});
</script>
<style lang="less" scoped>
.general {
  height: 100%;
  width: 100%;
  position: relative;

  .main-title {
    position: absolute;
    color: #fff;
    display: flex;
    width: 100%;
    justify-content: center;
    font-size: 40px;
    font-family: YouSheBiaoTiHei;
    .main-title-text {
      // border: 1px solid #fff;
    }
  }
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
    width: 869px;
    height: 140px;
    background: rgba(15, 39, 108, 0.7);
    border: 2px solid #2ba9bd;
    border-radius: 8px;
    .window-box {
      height: 50px;
      width: 100%;
      overflow: hidden;
      // display: flex;
    }
    .title-box {
      display: flex;
      overflow: hidden;
      .title-item {
        flex: 0 0 140px;
        height: 50px;
        overflow: scroll;
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
  }
}
</style>
