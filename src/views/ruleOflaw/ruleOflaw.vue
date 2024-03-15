<template>
  <div class="ruleOflaw">
    <div class="map" id="ruleOflawMap"></div>
    <main>
      <Left class="info" />
      <Center class="info" />
      <Right class="info" />
    </main>

    <featureWorkList v-if="isShowFooter" :tableData="tableData" />

    <Dialog :title="fiveDialogTitle" @close="isShowDialog = false" v-if="isShowDialog">
      <template v-slot:content>
        <div class="window">
          <div class="info">
            <div class="left">
              <div class="sub1" v-for="(item, index) in fiveList.slice(0, 3)" :key="index">
                <div class="sub-title">
                  <el-icon><CaretRight /></el-icon>
                  <div class="text">{{ item.name }}</div>
                </div>
                <div class="list">
                  <div class="item" @click="showSubDialog(subItem)" v-for="(subItem, index) in item.list" :key="index">
                    <div class="name">{{ subItem.leder }}</div>
                    <div class="value-box">
                      <div class="number">{{ subItem.value.length }}</div>
                      <div class="unit">人</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="sub4" v-for="(item, index) in fiveList.slice(3)" :key="index">
                <div class="sub-title">
                  <el-icon><CaretRight /></el-icon>
                  <div class="text">{{ item.name }}</div>
                </div>
                <div class="list">
                  <div class="item" @click="showSubDialog(subItem)" v-for="(subItem, index) in item.list" :key="index">
                    <div class="name">{{ subItem.leder }}</div>
                    <div class="value-box">
                      <div class="number">{{ subItem.value.length }}</div>
                      <div class="unit">人</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Dialog :title="subTitle" @close="subDialog = false" v-if="subDialog">
            <template v-slot:content>
              <div class="dialog-content">
                <div class="sub-item" v-for="(item, index) in subDialogList" :key="index">
                  <div class="sub-index">{{ index + 1 }}</div>
                  <div class="sub-name">{{ item.name }}</div>
                  <div class="sub-phone">{{ item.phone }}</div>
                </div>
              </div>
            </template>
          </Dialog>
        </div>
      </template>
    </Dialog>
    <Dialog title="点位详情" @close="fireDialog = false" v-if="fireDialog">
      <template v-slot:content>
        <div class="fire-dialog-content">
          <div class="fire-name">名称</div>
          <div class="fire-content">{{ dialogData.addressName }}</div>
          <div class="fire-item">
            <div class="fire-item-name">人员力量</div>
            <div class="fire-item-value">
              <span class="number">{{ dialogData.peoplePower }}</span>
              <span class="unit">人</span>
            </div>
          </div>
          <div class="fire-item">
            <div class="fire-item-name">装备</div>
            <div class="fire-item-value">
              <span class="number">{{ dialogData.equip }}</span>
              <span class="unit">个</span>
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
import Left from '@/views/ruleOflaw/left';
import Right from '@/views/ruleOflaw/right';
import Center from '@/views/ruleOflaw/center';
import {
  indicatorSetTreMapList,
  IndicatorFeaturedWorkList,
  mapGovernmentList,
  IndicatorLevelFivePowerList,
  IndicatorEnforcementTeamList,
} from '@/api/index';
import { getLocalData, formatMapData } from '@/utils/map.js';
import gcoord from 'gcoord';
import featureWorkList from '@/components/featureWorkList.vue';
import { showDataMap } from '@/utils/common.js';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
let isShow = ref(false);
let tableData = ref([]);
let dialogData = ref({});
let isShowFooter = ref(false);
let isShowDialog = ref(false);
let fireDialog = ref(false);
let subDialog = ref(false);
let fiveDialogTitle = ref('');
async function getList() {
  let obj = {
    fullPath: '数字法治',
    searchValue: 'isNotNull',
  };

  const res = await IndicatorFeaturedWorkList({
    type: 6,
  });
  if (res) {
    tableData.value = res.rows;
  }
  const { data } = await indicatorSetTreMapList(obj);
  if (data) {
    isShowFooter.value = data['数字法治-特色工作-是否展示'].value === 'false' ? false : true;

    // store.commit('setRuleOflawData', data);
    isShow.value = true;
  }
}

let fiveList = ref({});
async function getFiveList(region) {
  const res = await IndicatorLevelFivePowerList({ region });
  const ret = await IndicatorEnforcementTeamList({ region });

  if (res.code === 200) {
    // fiveList.value = res.rows;
    fiveList.value = [
      {
        name: '群防群治队伍',
        list: [
          {
            leder: '党员干部',
            value: res.rows.filter((item) => item.type === '群防群治队伍-党员干部'),
            unit: '人',
          },
          {
            leder: '居民小组长',
            value: res.rows.filter((item) => item.type === '群防群治队伍-居民小组长'),
            unit: '人',
          },
          {
            leder: '股民代表',
            value: res.rows.filter((item) => item.type === '群防群治队伍-股民代表'),
            unit: '人',
          },
          {
            leder: '楼道长',
            value: res.rows.filter((item) => item.type === '群防群治队伍-楼道长'),
            unit: '人',
          },
          {
            leder: '热心群众',
            value: res.rows.filter((item) => item.type === '群防群治队伍-热心群众'),
            unit: '人',
          },
        ],
      },
      {
        name: '网格员队伍',
        list: [
          {
            leder: '网格员',
            value: res.rows.filter((item) => item.type === '网格员队伍-网格员'),
            unit: '人',
          },
        ],
      },
      {
        name: '物业联盟队伍',
        list: [
          {
            leder: '主管',
            value: res.rows.filter((item) => item.type === '物业联盟队伍-主管'),
            unit: '人',
          },
          {
            leder: '保安',
            value: res.rows.filter((item) => item.type === '物业联盟队伍-保安'),
            unit: '人',
          },
        ],
      },
      {
        name: '部门平台队伍',
        list: [
          {
            leder: '公安',
            value: res.rows.filter((item) => item.type === '部门平台队伍-公安'),
            unit: '人',
          },
          {
            leder: '交警',
            value: res.rows.filter((item) => item.type === '部门平台队伍-交警'),
            unit: '人',
          },
          {
            leder: '城管',
            value: res.rows.filter((item) => item.type === '部门平台队伍-城管'),
            unit: '人',
          },
          {
            leder: '市场监管',
            value: res.rows.filter((item) => item.type === '部门平台队伍-市场监管'),
            unit: '人',
          },
          {
            leder: '司法所',
            value: res.rows.filter((item) => item.type === '部门平台队伍-司法所'),
            unit: '人',
          },
          {
            leder: '国土',
            value: res.rows.filter((item) => item.type === '部门平台队伍-国土'),
            unit: '人',
          },
          {
            leder: '劳动监察',
            value: res.rows.filter((item) => item.type === '部门平台队伍-劳动监察'),
            unit: '人',
          },
        ],
      },
      {
        name: '综合执法队伍',
        list: [
          {
            leder: '执法队伍',
            value: ret.rows,
            unit: '人',
          },
        ],
      },
    ];
  }
}
let subTitle = ref('');
let subDialogList = ref([]);
function showSubDialog(row) {
  console.log(row);
  subTitle.value = row.name;
  subDialogList.value = row.value;
  subDialog.value = true;
}
///====================地图相关============================
const checkList = computed(() => {
  return store.state.checkList;
});
let savePolygons = []
let savePonits = []
let polygons = []
let points = []
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
    // 联合执法片需要特殊处理成不同的颜色
    if (line.typeTwo === '联合执法片') {
      let color = line.addressName === '西片区' ? 'yellow' : 'blue'
      polygons[index] = new AMap.Polygon({
          path: line.path,
          strokeColor: color,
          strokeWeight: 3,
          strokeOpacity: 1,
          fillOpacity: 0.4,
          fillColor: color,
          zIndex: 50,
        });
    } else {
      polygons[index] = new AMap.Polygon({
        path: line.path,
        strokeColor: line.strokeColor,
        strokeWeight: 3,
        strokeOpacity: 1,
        fillOpacity: 0.4,
        fillColor: line.fillColor,
        zIndex: 50,
      });
    }
    map.add(polygons[index]);
    //鼠标点击marker弹出自定义的信息窗体
    AMap.event.addListener(polygons[index], 'click', function () {
      fiveDialogTitle.value = line.address + '五级人员力量';
      getFiveList(line.address);
      isShowDialog.value = true;
    });
  });
  if (savePolygons.some((item) => item.typeTwo === '联合执法片')) {
    let point = [
      {
        name: '西区',
        path: [120.062734, 30.287936],
        color: '#FF1616',
      },
      {
        name: '东区',
        path: [120.076997, 30.286872],
        color: '#289FB2',
      },
    ];
    let points = [];
    //绘制点
    point.map((item, index) => {
      points[index] = new AMap.Text({
        text: item.name,
        anchor: 'center', // 设置文本标记锚点
        draggable: true,
        cursor: 'pointer',
        style: {
          'margin-bottom': '1rem',
          'border-radius': '30px',
          'background-color': 'rgba(255,255,255,0.70)',
          width: '53px',
          height: '20px',
          'border-width': 0,
          'text-align': 'center',
          'font-size': '14px',
          color: item.color,
        },
        position: item.path,
      });
      map.add(points[index]);
    });
  }
  console.log('savePonits', savePonits);
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
    console.log(points[index]);
    map.add(points[index]);
    //鼠标点击marker弹出自定义的信息窗体
    AMap.event.addListener(points[index], 'click', function () {
      // type==='区域性消防站'或者'社区微型消防站'需要展示弹窗
      if (savePonits[index].typeTwo === '区域性消防站' || savePonits[index].typeTwo === '社区微型消防站') {
        fireDialog.value = true;
        dialogData.value = savePonits[index];
      }
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

let checkbox = ref({
  联合执法片: {
    data: [],
    chartType: '',
    strokeColor: '#0DC5C7',
    fillColor: '#4AFFFD',
    icon: 'image/lhzfp.png',
  },
  风险防控区: {
    data: [],
    chartType: '',
    strokeColor: '#FF5D5D',
    fillColor: '#FFA2A2',
    icon: 'image/fxfkq.png',
  },
  社区综治站: {
    data: [],
    chartType: '',
    icon: 'image/sqzzz.png',
  },
  社区警务室: {
    data: [],
    chartType: '',
    icon: 'image/sqjws.png',
  },
  流动平安岗亭: {
    data: [],
    chartType: '',
    icon: 'image/ldpagt.png',
  },
  区域性消防站: {
    data: [],
    chartType: '',
    icon: 'image/qyxxfz.png',
  },
  社区微型消防站: {
    data: [],
    chartType: '',
    icon: 'image/sqwxxfz.png',
  },
  避灾安置点: {
    data: [],
    chartType: '',
    icon: 'image/bzazd.png',
  },
  应急物资储备点: {
    data: [],
    chartType: '',
    icon: 'image/yjwzcbd.png',
  },
  应急体验馆: {
    data: [],
    chartType: '',
    icon: 'image/yjtyg.png',
  },
});

let map
let mapPath = ref([]);
// 获取地图数据
async function getMapData() {
  const res = await mapGovernmentList();
  if (res) {
    mapPath.value = res.rows;
    formatMapData(mapPath.value, checkbox.value);
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
    map = new AMap.Map('ruleOflawMap', {
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
    map.on('click', (e) => {
      console.log(e);
    })
    //添加高度面
    let object3Dlayer = new AMap.Object3DLayer({ zIndex: 1 });
    console.log(object3Dlayer);
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
 
  initMap(AMap);
});
onUnmounted(() => {
  map && map.destroy();
});
</script>
<style lang="less" scoped>
.ruleOflaw {
  height: 100%;
  width: 100%;
  position: relative;
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
.window {
  width: 510px;
  background: rgba(13, 24, 101, 0.8);
  padding: 14px 18px 40px 18px;
  box-sizing: border-box;
  // margin: 80px 0 0 0;
  .title {
    font-family: PingFangSC-S0pxibold;
    font-weight: 600;
    font-size: 16px;
    color: #73d5e5;
  }
  .info {
    display: flex;
    justify-content: space-between;
    .sub-title {
      display: flex;
      align-items: center;
      color: #fff;
      .text {
        margin: 0 0px 0 6px;
      }
    }
    .list {
      margin: 12px 0 0 0;
      .item {
        width: 214px;
        height: 36px;
        background: rgba(116, 190, 255, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        box-sizing: border-box;
        margin: 10px 0 0 0;
        .name {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
        }
        .value-box {
          display: flex;
          align-items: center;
          .number {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 24px;
            color: #e0fffe;
            margin: 0px 12px 0 0;
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
    .sub1 {
      margin: 32px 0 0 0;
    }
    .sub2 {
      margin: 10px 0 0 0;
    }
    .sub3 {
      margin: 10px 0 0 0;
    }
    .sub4 {
      margin: 32px 0 0 0;
    }
    .sub5 {
      margin: 14px 0 0 0;
    }
  }
  .sub-item {
    width: 280px;
    height: 40px;
    background: url('@/assets/image/info-bg.png');
    background-size: 100% 100%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 0 10px;
    box-sizing: border-box;
    margin: 6px 0 0 0;
    .sub-index {
      width: 10%;
    }
    .sub-name {
      width: 30%;
    }
    .sub-phone {
      width: 60%;
      color: #73d5e5;
    }
  }
}
.fire-dialog-content {
  width: 326px;
  height: 236px;
  .fire-name {
    font-family: PingFangSC-SNaNpxibold;
    font-weight: 600;
    font-size: 16px;
    color: #ffffff;
  }
  .fire-content {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
    margin: 12px 0 0 0;
  }
  .fire-item {
    display: flex;
    width: 280px;
    height: 47px;
    border-radius: 8px;
    background: url('@/assets/image/info-bg.png');
    background-size: 100% 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    box-sizing: border-box;
    margin: 16px 0 0 0;
    .fire-item-name {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
    }
    .fire-item-value {
      .number {
        font-family: DINAlternate-Bold;
        font-weight: 700;
        font-size: 20px;
        color: #73d5e5;
        margin: 0 4px 0 0;
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
.dialog-content {
  min-height: 300px;
  max-height: 400px;
  overflow: scroll;
}
</style>
<style lang="less">
.amap-info-content {
  // width: 89px;
  // height: 28px;
  background: rgba(0, 0, 0, 0.5);
  border: 0 solid #979797;
  border-radius: 60px;
  color: #b7e9fd;
}
.amap-info-sharp {
  display: none;
}
.amap-container {
  background: rgba(0, 0, 0, 0) !important;
}
</style>
