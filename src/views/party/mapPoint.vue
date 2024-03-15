<template>
  <div class="mapPoint">
    <div class="check-box">
      <div class="back" @click="back">
        <el-icon><Back /></el-icon>返回
      </div>

      <el-tree
        @check="treeCheck"
        :data="treeMapData"
        highlight-current
        :props="defaultProps"
        show-checkbox
        default-expand-all
      >
        <template #default="{ node, data }">
          <span v-if="data.label !== '网格'">
            <img :src="`${ossPath}${data.ossId}`" alt="" style="width: 20px; height: 20px; margin-right: 5px" />
            {{ node.label }}
          </span>
          <span v-else>
            <img src="@/assets/image/网格.png" alt="" style="width: 20px; height: 20px; margin-right: 5px" />
            {{ node.label }}
          </span>
        </template>
      </el-tree>
    </div>
    <div class="map" id="container"></div>
    <div class="windows" v-if="windowsDialog">
      <div class="title">
        <span>{{ `${windowData[0].community}1+3+N网格力量配置` }}</span>
        <el-icon @click="windowsDialog = false" class="icon"><Close /></el-icon>
      </div>
      <div class="window-content">
        <tabsScroll :propsData="windowData.map((item) => item.gridName)" v-model:index="currentIndex" />
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
import {
  mapPostStationList,
  mapRridPowerGetListByCommunity,
  mapPointTypeTreeList,
  mapPointDataList,
} from '@/api/index';
import { formatMapData } from '@/utils/map.js';
import gcoord from 'gcoord';
import tabsScroll from '@/components/tabsScroll.vue';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['back']);
const props = defineProps({});
const {} = props;
const test = computed(() => {
  return null;
});
const defaultProps = {
  children: 'children',
  label: 'label',
};
let ossPath = `${import.meta.env.VITE_APP_API_BASE_URL}/system/oss/download/`;

const checkAll = ref(false);
const isIndeterminate = ref(false);
let currentIndex = ref(0);
///====================地图相关============================
let savePolygons = [];
let polygons = [];
let points = [];
let windowsDialog = ref(false);
let windowData = ref([]);
let infoWindow = ref([]);
let isShowCheck = ref(false);
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
  // console.log('map', map, mapData);
  savePolygons = mapData;
  // const res = await mapPostStationList();
  // if (res) {
  //   mapPath.value = [...res.rows, ...mapData];
  //   formatMapData(mapPath.value, checkbox.value);
  //   formatMapData(mapPath.value, checkbox1.value);
  //   console.log('formatMapData', mapPath.value, checkbox.value);
  // }
}
function back() {
  //清除地图所有覆盖物
  map.clearMap();
  store.commit('setHomeBg', '/image/szdj-bg.png');
  emit('back');
}

let isOpenAll = ref(true);
let checkbox1 = ref({
  网格: {
    data: [],
    chartType: '',
    strokeColor: '#81fafe',
    fillColor: '#81fafe',
    icon: 'image/网格.png',
  },
  '商圈1·9集聚区党群服务中心': {
    data: [],
    chartType: '',
    icon: 'image/商圈1•9集聚区党群服务中心.png',
  },
  三深国际园区党群服务中心: {
    data: [],
    chartType: '',
    icon: 'image/三深国际园区党群服务中心.png',
  },
  蒋村花园小区党建示范点: {
    data: [],
    chartType: '',
    icon: 'image/蒋村花园小区党建示范点.png',
  },
  竞渡社区青少年党群教育基地: {
    data: [],
    chartType: '',
    icon: 'image/竞渡社区青少年党群教育基地.png',
  },
  文溪小学少儿龙舟文化研究院: {
    data: [],
    chartType: '',
    icon: 'image/文溪小学少儿龙舟文化研究院.png',
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
});

let map = ref(null);
let mapPath = ref([]);

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
    map = new AMap.Map('container', {
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

    map.on('click', (e) => {
      console.log('e', e);
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
    isShowCheck.value = true;
  });
}
///====================地图相关============================

///====================Tree相关============================
let treeMapData = ref([]);
async function getMapList() {
  const res = await mapPointTypeTreeList();
  if (res.code === 200) {
    console.log('mapPointTypeTreeList', res);
    treeMapData.value = [
      {
        label: '网格',
        ossId: '1',
        id: '1',
      },
      ...res.data,
    ];
  }
}
let showMapPoint = ref([]);
async function treeCheck(data, check) {
  // if (data.label === '网格') {
  //   drawingPolygons();
  // } else {
  let checkData = check.checkedNodes;
  // console.log('checkData', checkData);
  let ids = checkData.map((item) => item.id).join(',');
  const idArray = ids.split(',');
  console.log('ids', ids);
  // 判断是否选则点位,未选择直接清空所有点位信息
  if (checkData.length) {
    const res = await mapPointDataList(ids);
    if (res.code === 200) {
      // console.log('res.code', res);
      showMapPoint.value = res.rows.map((item) => {
        item.url = ossPath + checkData.find((subItem) => subItem.id == item.pointType).ossId;
        return item;
      });
      console.log('showMapPoint', showMapPoint.value);
      drawingPoints(showMapPoint.value);
      if (idArray.includes('1')) {
        drawingPolygons();
      }
    }
  } else {
    showMapPoint.value = [];
    //清除地图所有覆盖物
    map.clearMap();
  }
  // }
}
const strokeColorMap = {
  府苑社区: '#FF6363',
  蒋村花园社区: '#34D6FF',
  仕林社区: '#B63FF7',
  竞渡社区: '#FFC21F',
  诚园社区: '#1FFF24',
  蝶园社区: '#24AAFF',
  西溪里社区: '#4E7AFF',
  河滨社区: '#FF713B',
  西溪庐海社区: '#0DE3A2',
};
//绘制多边形
function drawingPolygons() {
  // // 多次点击清除上一次的多边形避免重复渲染
  // savePolygons = [];
  // 绘制多边形
  savePolygons.map((line, index) => {
    polygons[index] = new AMap.Polygon({
      path: [line.pointData.split(';').map((item) => item.split(',').map((obj) => obj * 1))],
      strokeColor: strokeColorMap[line.cunshe],
      strokeWeight: 5,
      strokeOpacity: 1,
      fillOpacity: 0.3,
      fillColor: strokeColorMap[line.cunshe],
      zIndex: 50,
    });
    map.add(polygons[index]);
    //鼠标点击marker弹出自定义的信息窗体
    AMap.event.addListener(polygons[index], 'click', async function (e) {
      console.log('e', e);
      currentIndex.value = 0;
      const res = await mapRridPowerGetListByCommunity({
        community: savePolygons[index].parentAreaName || savePolygons[index].cunshe,
      });
      if (res) {
        windowData.value = res.rows;
        windowsDialog.value = true;
      }
    });
  });
  const point = [
    {
      name: '府苑社区',
      path: [120.072714, 30.270631],
      color: '#289FB2',
    },
    {
      name: '蒋村花园社区',
      path: [120.077633, 30.283671],
      color: '#289FB2',
    },
    {
      name: '仕林社区',
      path: [120.064968, 30.282695],
      color: '#289FB2',
    },
    {
      name: '竞渡社区',
      path: [120.056549, 30.282619],
      color: '#289FB2',
    },
    {
      name: '诚园社区',
      path: [120.078732, 30.290774],
      color: '#289FB2',
    },
    {
      name: '蝶园社区',
      path: [120.066473, 30.291027],
      color: '#289FB2',
    },
    {
      name: '西溪里社区',
      path: [120.059778, 30.290353],
      color: '#289FB2',
    },
    {
      name: '西溪庐海社区',
      path: [120.054942, 30.292306],
      color: '#289FB2',
    },
    {
      name: '河滨社区',
      path: [120.060073, 30.297638],
      color: '#289FB2',
    },
  ];
  let points = [];
  //绘制点
  point.map((item, index) => {
    points[index] = new AMap.Text({
      text: item.name,
      anchor: 'center', // 设置文本标记锚点
      draggable: false,
      cursor: 'pointer',
      style: {
        'margin-bottom': '1rem',
        'border-radius': '30px',
        'background-color': 'rgba(255,255,255,1)',
        width: '100px',
        height: '20px',
        'border-width': 0,
        'text-align': 'center',
        'font-size': '14px',
        color: item.color,
      },
      position: item.path,
    });
    map.add(points[index]);
    //鼠标点击marker弹出自定义的信息窗体
    AMap.event.addListener(points[index], 'click', async function (e) {
      currentIndex.value = 0;
      const res = await mapRridPowerGetListByCommunity({
        community: item.name,
      });
      if (res) {
        windowData.value = res.rows;
        windowsDialog.value = true;
      }
    });
  });
}
// 绘制点
function drawingPoints(data) {
  //清除地图所有覆盖物
  map.clearMap();
  //绘制点
  data.map((item, index) => {
    points[index] = new AMap.Marker({
      icon: new AMap.Icon({
        image: item.url,
        size: new AMap.Size(52, 52), //图标大小
        imageSize: new AMap.Size(36, 36),
      }),
      position: item.pointData.split(','), //position只接收数组[]
    });
    map.add(points[index]);
    // //鼠标点击marker弹出自定义的信息窗体
    AMap.event.addListener(points[index], 'click', function () {
      console.log('123', item);
      // infowidnow 的 innerHTML
      var infoWindowContent = `<div><label style="color:#fff">${item.name}</label></div>`;
      // 创建一个自定义内容的 infowindow 实例
      infoWindow[index] = new AMap.InfoWindow({
        position: item.pointData.split(','), //position只接收数组[]
        offset: new AMap.Pixel(0, -15),
        content: infoWindowContent,
      });
      infoWindow[index].open(map);
    });
  });
}
///====================Tree相关============================

watch();
onMounted(() => {
  getMapList();
  getMapData();

  initMap(AMap);
});
onUnmounted(() => {
  map && map.destroy();
});
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
  .el-tree {
    margin: 60px 0 0 0;
  }
  .check-box {
    // width: 160px;
    color: #fff;
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
    .group {
      padding: 16px;
      box-sizing: border-box;
      width: 320px;
      margin: 0 0 0 16px;
      background: url('@/assets/image/group-bg.png');
      background-size: 100% 100%;
    }
    .all-check {
      color: #fff;
    }
    .el-checkbox {
      margin: 8px 0 0 0;
    }

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

.el-tree {
  background: none;
  color: #fff;
}
:deep(.el-tree-node__content:hover) {
  background: none;
}
//使用的地方  不要加scoped
:deep(.el-tree-node.is-current > .el-tree-node__content) {
  background: none !important;
}
:deep(.el-tree-node.is-focusable > .el-tree-node__content) {
  background: none !important;
}
</style>
<style lang="less"></style>
