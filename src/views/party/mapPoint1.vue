<template>
  <div class="mapPoint">
    <div class="check-box">
      <div class="back" @click="back">
        <el-icon><Back /></el-icon>返回
      </div>
      <el-checkbox-group v-model="checkList" @change="changeBox" v-if="isShowCheck">
        <el-checkbox v-for="(item, index) in checkbox" :key="index" :label="index">
          <template #default>
            <div class="check-label">
              <img :src="item.icon" alt="" />
              <span>
                {{ index }}
              </span>
            </div>
          </template>
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="map" id="container"></div>
    <div class="windows" v-if="windowsDialog">
      <div class="title">
        <span>{{ `${windowData[0].community}1+3+N网格力量配置` }}</span>
        <el-icon @click="windowsDialog = false" class="icon"><Close /></el-icon>
      </div>
      <div class="window-content">
        <Tabs :propsData="windowData.map((item) => item.gridName)" v-model:index="currentIndex" />
        <div class="list1">
          <div class="item">
            <span class="item-name">网格编号</span>
            <span class="item-value">{{ windowData[currentIndex].gridCode }}</span>
          </div>
          <div class="item">
            <span class="item-name">范围</span>
            <span class="item-value">{{ windowData[currentIndex].address }}</span>
          </div>
          <div class="item">
            <span class="item-name">网格户数</span>
            <span class="item-value">{{ windowData[currentIndex].gridHouseholds }}</span>
          </div>
          <div class="item">
            <span class="item-name">覆盖人数</span>
            <span class="item-value">{{ windowData[currentIndex].coveredPeople }}</span>
          </div>
          <div class="item">
            <span class="item-name">微网格</span>
            <span class="item-value">{{ windowData[currentIndex].microgridCount }}</span>
          </div>
        </div>
        <div class="list2">
          <div class="item">
            <span class="item-name">网格长</span>
            <span class="item-value">{{ windowData[currentIndex].gridLeader }}</span>
          </div>
          <div class="item">
            <span class="item-name">专职网格员</span>
            <span class="item-value">{{ windowData[currentIndex].fullTimeGridWorker }}</span>
          </div>
          <div class="item">
            <span class="item-name">兼职网格员</span>
            <span class="item-value">{{ windowData[currentIndex].partTimeGridWorker }}</span>
          </div>
          <div class="item">
            <span class="item-name">网格指导员 (包联干部)</span>
            <span class="item-value">{{ windowData[currentIndex].gridInstructor }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import { mapPostStationList, mapRridPowerGetListByCommunity } from '@/api/index';
import { formatMapData } from '@/utils/map.js';
import { nextTick } from '@vue/runtime-core';
import gcoord from 'gcoord';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['back']);
const props = defineProps({});
const {} = props;
const test = computed(() => {
  return null;
});
let checkList = ref([]);
function changeBox() {}
let tabsData = ['第一网格', '第二网格', '第三网格', '第四网格', '第五网格'];
let currentIndex = ref(0);
///====================地图相关============================

let savePolygons = ref([]);
let savePonits = ref([]);
let polygons = ref([]);
let points = ref([]);
let windowsDialog = ref(false);
let windowData = ref([]);
let infoWindow = ref([]);
let polygonsInfoWindow = ref([]);
let isShowCheck = ref(false);
watch(checkList, (newValue, oldValue) => {
  // 多次点击清除上一次的多边形避免重复渲染
  savePolygons.value = [];
  savePonits.value = [];
  //清除地图所有覆盖物
  map.value.clearMap();
  newValue.map((item, index) => {
    // 处理多边形数据
    console.log(checkbox.value[item]);
    if (checkbox.value[item].chartType === 'polygons') {
      console.log('checkbox.value[item].path', checkbox.value[item].data);
      for (const key of checkbox.value[item].data) {
        savePolygons.value.push(key);
      }
    }
    //处理点位数据
    else {
      for (const key of checkbox.value[item].data) {
        savePonits.value.push(key);
      }
    }
  });
  // 绘制多边形
  savePolygons.value.map((line, index) => {
    polygons.value[index] = new AMap.Polygon({
      path: line.path,
      strokeColor: line.strokeColor,
      strokeWeight: 5,
      strokeOpacity: 1,
      fillOpacity: 0.4,
      fillColor: line.fillColor,
      zIndex: 50,
    });
    map.value.add(polygons.value[index]);
    //鼠标点击marker弹出自定义的信息窗体
    AMap.event.addListener(polygons.value[index], 'click', async function () {
      currentIndex.value = 0;
      const res = await mapRridPowerGetListByCommunity({
        community: savePolygons.value[index].parentAreaName || savePolygons.value[index].cunshe,
      });
      if (res) {
        windowData.value = res.rows;
        console.log(windowData.value);
        windowsDialog.value = true;
      }
    });
    // var infoWindowContent = `<div><label style="color:#fff">${line.name}</label></div>`;
    // // 创建一个自定义内容的 infowindow 实例
    // polygonsInfoWindow[index] = new AMap.InfoWindow({
    //   position: line.path[0],
    //   offset: new AMap.Pixel(0, -15),
    //   content: infoWindowContent,
    // });
    // polygonsInfoWindow[index].open(map.value);
  });
  //绘制点
  savePonits.value.map((item, index) => {
    points.value[index] = new AMap.Marker({
      icon: new AMap.Icon({
        image: item.icon,
        size: new AMap.Size(52, 52), //图标大小
        imageSize: new AMap.Size(36, 36),
      }),

      // icon: item.icon,
      position: item.point,
    });
    map.value.add(points.value[index]);
    //鼠标点击marker弹出自定义的信息窗体
    AMap.event.addListener(points.value[index], 'click', function () {
      console.log('123', savePonits.value[index]);
      // infowidnow 的 innerHTML
      var infoWindowContent = `<div><label style="color:#fff">${savePonits.value[index].addressName}</label></div>`;
      // 创建一个自定义内容的 infowindow 实例
      infoWindow[index] = new AMap.InfoWindow({
        position: savePonits.value[index].point,
        offset: new AMap.Pixel(0, -15),
        content: infoWindowContent,
      });
      infoWindow[index].open(map.value);
    });
  });
});

function back() {
  //清除地图所有覆盖物
  map.value.clearMap();
  store.commit('setHomeBg', '/image/szdj-bg.png');
  emit('back');
}
let checkbox = ref({
  小区党组织: {
    data: [],
    chartType: '',

    icon: 'image/小区(功能型)党组织.png',
  },
  网格: {
    data: [],
    chartType: '',
    strokeColor: '#81fafe',
    fillColor: '#81fafe',
    icon: 'image/网格.png',
  },
  街道党群服务中心: {
    data: [],
    chartType: '',
    icon: 'image/街道党群服务中心.png',
  },
  社区党群服务中心: {
    data: [],
    chartType: '',
    icon: 'image/社区党群服务中心.png',
  },
  '“水乡记忆”党群服务阵地': {
    data: [],
    chartType: '',
    icon: 'image/“水乡记忆”党群服务阵地.png',
  },
  '商圈1·9集聚区党群服务中心': {
    data: [],
    chartType: '',
    icon: 'image/商圈1•9集聚区党群服务中心.png',
  },
  蒋村花园小区党建示范点: {
    data: [],
    chartType: '',
    icon: 'image/蒋村花园小区党建示范点.png',
  },
  三深国际园区党群服务中心: {
    data: [],
    chartType: '',
    icon: 'image/三深国际园区党群服务中心.png',
  },
  竞渡社区青少年党群教育基地: {
    data: [],
    chartType: '',
    icon: 'image/竞渡社区青少年党群教育基地.png',
  },
  小区党群微驿站: {
    data: [],
    chartType: '',
    icon: 'image/小区党群微驿站.png',
  },
  暖蜂驿站: {
    data: [],
    chartType: '',
    icon: 'image/暖蜂驿站.png',
  },
  统战阵地分布: {
    data: [],
    chartType: '',
    icon: 'image/统战阵地分布.png',
  },
  宗教场所分布: {
    data: [],
    chartType: '',
    icon: 'image/宗教场所分布.png',
  },
  清廉阵地: {
    data: [],
    chartType: '',
    icon: 'image/清廉阵地.png',
  },
  文溪小学少儿龙舟文化研究院: {
    data: [],
    chartType: '',
    icon: 'image/文溪小学少儿龙舟文化研究院.png',
  },
  府苑社区党群服务中心: {
    data: [],
    chartType: '',
    icon: 'image/府苑社区党群服务中心.png',
  },
});

let map = ref(null);
let mapPath = ref([]);
// 获取地图数据
async function getMapData() {
  const map = await axios({
    url: 'json/grid-网格.geojson',
    method: 'get',
    baseURL: null,
    params: {},
  });
  let mapData = map.data.features
    .filter((obj) => obj.properties.zhenjie == '蒋村街道')
    .map((item) => {
      item.geometry.coordinates[0] = item.geometry.coordinates[0].map((subItem) => {
        return gcoord.transform(subItem, gcoord.WGS84, gcoord.GCJ02);
      });
      return {
        pointData: item.geometry.coordinates.map((item) => item.join(';')).join(','),
        posthouseType: '网格',
        ...item.properties,
      };
    });
  console.log('map', map, mapData);
  const res = await mapPostStationList();
  if (res) {
    mapPath.value = [...res.rows, ...mapData];
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
    map.value = new AMap.Map('container', {
      mask: mask,
      center: [120.071336, 30.266836],
      disableSocket: true,
      viewMode: '3D',
      showLabel: true,
      features: ['bg', 'road', 'building'],
      labelzIndex: 130,
      pitch: 30,
      zoom: 14.5,
      layers: [
        new AMap.TileLayer.RoadNet({
          //rejectMapMask:true
        }),
        new AMap.TileLayer.Satellite(),
      ],
    });

    //添加高度面
    let object3Dlayer = new AMap.Object3DLayer({ zIndex: 1 });
    map.value.add(object3Dlayer);
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
    //     map: map.value,
    //   });
    // }
    isShowCheck.value = true;
  });
}
///====================地图相关============================

watch();
onMounted(() => {
  getMapData();
  initMap(AMap);
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.mapPoint {
  height: calc(1080px - 121px);
  box-sizing: border-box;
  width: 100%;
  position: relative;
  // background: red;
  overflow: hidden;
  display: flex;
  .check-box {
    .back {
      width: 60px;
      height: 30px;
      border: 1px solid #fff;
      border-radius: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .el-checkbox-group {
      margin: 40px 0 0 0;
    }
    .el-checkbox {
      margin: 8px 0 0 0;
    }
    width: 160px;
    color: #fff;
    // height: 1009px;
    .check-label {
      display: flex;
      align-items: center;
      color: #fff;
      img {
        margin: 0 6px 0 0;
        width: 30px;
        height: 30px;
      }
    }
  }
  .map {
    width: 100%;
    height: 100%;
    margin: 30px 0 0 0;
    // height: 1080px;
    // position: absolute;
  }
  .windows {
    width: 520px;
    height: 660px;
    background: rgba(6, 23, 40, 0.5);
    border-radius: 4px;
    // padding: 0 0 26px 0;
    right: 26px;
    position: absolute;
    box-sizing: border-box;
    .title {
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: 16px;
      color: #ffffff;
      background: #07223a;
      padding: 12px 10px 14px 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .icon {
        cursor: pointer;
      }
    }
    .window-content {
      padding: 26px 20px;
      box-sizing: border-box;
      .list1,
      .list2 {
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: 14px;
        .item {
          margin: 30px 0 0 0;
          .item-name {
            color: rgba(255, 255, 255, 0.8);
            width: 70px;
            margin: 0 36px 0 0;
            display: inline-block;
          }
          .item-value {
            color: #ffffff;
          }
        }
      }
      .list1 {
        border-bottom: 2px solid rgba(255, 255, 255, 0.14);
        padding: 0 0 26px 0;
        box-sizing: border-box;
      }
    }
  }
}
</style>
