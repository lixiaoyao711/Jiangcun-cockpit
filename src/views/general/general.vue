<template>
  <div class="general">
    <div v-if="isShowMap === 1" class="map" id="generalMap"></div>
    <main v-if="isShow">
      <Left />
      <Center @tabChange="tabChange" />
      <Right />
    </main>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import Left from '@/views/general/left';
import Center from '@/views/general/center';

import Right from '@/views/general/right';
import { indicatorSetTreMapList, IndicatorFeaturedWorkList, mapIndexList } from '@/api/index';
import { getLocalData, formatMapData } from '@/utils/map.js';
import gcoord from 'gcoord';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const test = computed(() => {
  return null;
});
let isShow = ref(false);
async function getList() {
  let obj = {
    fullPath: '',
    searchValue: 'isNotNull',
  };
  const { data } = await indicatorSetTreMapList(obj);
  if (data) {
    store.commit('setGeneralData', data);
    isShow.value = true;
  }
}
let isShowMap = ref(0);
function tabChange(val) {
  isShowMap.value = val;
  if (val === 1) {
    initMap(AMap);
  } else {
    store.commit('setIsFooter', false);
  }
}
///====================地图相关============================
const checkList = computed(() => {
  console.log('checkList变了');
  return store.state.checkList;
});
let savePolygons = [];
let savePonits = [];
let polygons = [];
let points = [];
let infoWindow = ref([]);
watch(checkList, (newValue, oldValue) => {
  // 多次点击清除上一次的多边形避免重复渲染
  savePolygons = [];
  savePonits = [];
  //清除地图所有覆盖物
  map.clearMap();
  newValue.map((item, index) => {
    // 处理多边形数据
    console.log(checkbox.value[item]);
    if (checkbox.value[item].chartType === 'polygons') {
      console.log('checkbox.value[item].path', checkbox.value[item].data);
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
      console.log('123', savePolygons[index]);
    });
  });
  //绘制点
  savePonits.map((item, index) => {
    console.log(item);
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
      console.log('123', savePonits[index]);
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
  公园: {
    data: [],
    chartType: '',
    icon: 'image/hdgy.png',
  },
  '2个执法圈': {
    data: [],
    chartType: '',
    strokeColor: '#0DC5C7',
    fillColor: '#4AFFFD',
    icon: 'image/lhzfp.png',
  },
  '8个防范区域': {
    data: [],
    chartType: '',
    strokeColor: '#FF5D5D',
    fillColor: '#FFA2A2',
    icon: 'image/fxfkq.png',
  },
  幸福荟民生综合体: {
    data: [],
    chartType: '',
    icon: 'image/zht.png',
  },
  居家养老中心: {
    data: [],
    chartType: '',
    icon: 'image/yly.png',
  },
});

let map = null;
let mapPath = ref([]);
// 获取地图数据
async function getMapData() {
  const res = await mapIndexList();
  if (res) {
    mapPath.value = res.rows;
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
    map = new AMap.Map('generalMap', {
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
  store.commit('setIsFooter', true);
}
///====================地图相关============================

watch();
onMounted(() => {
  // 控制footer和地图同时渲染避免报错
  store.commit('setIsFooter', false);
 
  getList();
  emit('update:checkbox', checkbox.value);
  getMapData();
});
onUnmounted(() => {
  map&&map.destroy();


});
</script>
<style lang="less" scoped>
.general {
  height: 100%;
  width: 100%;
  position: relative;
  .map {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  main {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    box-sizing: border-box;
    pointer-events: none;
  }
}
</style>

<style lang="less">
.map {
  img {
    width: 24px;
    height: 24px;
  }
}
</style>
