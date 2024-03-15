<template>
  <div class="left1">
    <div class="title">
      <div class="name">文体团队塑形</div>
    </div>
    <div class="info">
      <Tabs :propsData="tabsData" v-model:index="currentIndex" @tabChange="titleTabChange" />
      <div v-show="currentIndex === 0" class="tab-box">
        <div class="sub1">
          <div class="sub1-tabs">
            <div
              class="tab"
              @click="tabChange(index)"
              :class="index === tabIndex ? 'changeTab' : ''"
              v-for="(item, index) in subTab"
              :key="index"
            >
              {{ item }}
            </div>
          </div>
          <vue3-seamless-scroll :list="tableData" class="box" :hover="true" :step="0.5">
            <div class="window" v-for="(item, index) in tableData" :key="index">
              <span class="name">{{ item.name }}</span>
              <span class="view" @click="viewItem(item)">查看详情</span>
            </div>
          </vue3-seamless-scroll>
        </div>
        <div class="sub2">
          <div class="sub-title">
            <el-icon><CaretRight /></el-icon>
            <div class="text">每月活动开展次数</div>
          </div>
          <div class="line" id="line"></div>
          <div class="list">
            <div class="item">
              <div @click="showVideo">
                <img src="@/assets/image/yyjc.png" alt="" />
                <div class="name">云游蒋村</div>
              </div>
            </div>
            <div class="item" @click="showMapDialog">
              <div>
                <img src="@/assets/image/sxjc.png" alt="" />
                <div class="name">书香蒋村</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="currentIndex === 1" class="tab-box">
        <div class="sub2">
          <div class="sub-title">
            <el-icon><CaretRight /></el-icon>
            <div class="text">每月活动开展次数</div>
          </div>
          <div class="line1" id="line1"></div>
          <div class="list">
            <div class="item">
              <div @click="showVideo">
                <img src="@/assets/image/yyjc.png" alt="" />
                <div class="name">云游蒋村</div>
              </div>
            </div>
            <div class="item" @click="showMapDialog">
              <div>
                <img src="@/assets/image/sxjc.png" alt="" />
                <div class="name">书香蒋村</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog :title="dialogData.name" @close="isShowDialog = false" v-if="isShowDialog">
      <template v-slot:content>
        <div class="dialog-content">
          <div>{{ dialogData.content }}</div>
        </div>
      </template>
    </Dialog>
    <Dialog :title="'书香蒋村'" @close="isShowDialog1 = false" v-if="isShowDialog1">
      <template v-slot:content>
        <div class="dialog-map" id="map"></div>
      </template>
    </Dialog>

    <Dialog :title="'书香详情'" @close="isShowDialog2 = false" v-if="isShowDialog2">
      <template v-slot:content>
        <div class="dialog-content1">
          <div class="img-box">
            <img class="dx" src="@/assets/image/dx.png" alt="" />
            <img class="school" src="@/assets/image/school.png" alt="" />
          </div>
          <div class="content">
            <div class="dialog-title">{{ dialogData.addressName }}</div>
            <div class="dialog-info1 dialog-info">
              <div class="dialog-info-title">特色:</div>
              <!-- {{ dialogData.address }} -->
              <div class="dialog-info-text">
                {{ dialogData.characteristic }}
              </div>
            </div>
            <div class="dialog-info">
              <div class="dialog-info-title">地址:</div>
              <div class="dialog-info-text">{{ dialogData.address }}</div>
            </div>
            <div class="dialog-info">
              <div class="dialog-info-title">开放时间:</div>
              <div class="dialog-info-text">{{ dialogData.openTime }}</div>
            </div>
            <div class="dialog-info">
              <div class="dialog-info-title">联系方式:</div>
              <div class="dialog-info-text">{{ dialogData.phone }}</div>
            </div>
            <div class="dialog-info">
              <div class="dialog-info-text">
                <el-carousel trigger="click" arrow="never">
                  <el-carousel-item
                    @click="openViewImg(url)"
                    v-for="(url, index) in dialogData.url.split(',')"
                    :key="index"
                  >
                    <el-image :src="url" :zoom-rate="1.2" :initial-index="4" fit="contain" :z-index="99999" />
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
          </div>
          <img class="xrk" src="@/assets/image/xrk.png" alt="" />
        </div>
      </template>
    </Dialog>
    <Dialog :title="'预览'" @close="isShowDialogImg = false" v-if="isShowDialogImg">
      <template v-slot:content>
        <div class="dialog-content1-img">
          <img class="proview-img" :src="viewUrl" alt="" />
        </div>
      </template>
    </Dialog>
    <Dialog :title="'云游蒋村'" @close="isShowDialog3 = false" v-if="isShowDialog3">
      <template v-slot:content>
        <div class="video-box">
          <div class="video-left">
            <div
              class="video-item"
              @click="videoChange(index, item)"
              :class="videoCurrentIndex === index ? 'video-item-click' : ''"
              v-for="(item, index) in videoList"
              :key="index"
            >
              {{ item.name }}
            </div>
            <p>
              选择播放速率：<select id="selRate" @change="videoSelect" v-if="isShowVideo">
                <option value="0.5" selected>0.5</option>
                <option value="1">1.0</option>
                <option value="1.25">1.25</option>
                <option value="1.5">1.5</option>
                <option value="2">2.0</option>
              </select>
            </p>
          </div>
          <video class="video-right" autoplay controls loop ref="video" v-if="isShowVideo">
            <source :src="videoPath" type="video/mp4" />
          </video>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import * as echarts from 'echarts';
import { getLocalData, formatMapData } from '@/utils/map.js';

import { IndicatorSportsTeamList, mapDigitalCultureList, IndicatorNumberActivitiesList } from '@/api/index';
import { nextTick } from '@vue/runtime-core';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const cultureData = computed(() => {
  console.log('vuex', store.state.cultureData);

  return store.state.cultureData;
});
let tabsData = ['精彩群文', '活力体育'];
let tabIndex = ref(0);
let currentIndex = ref(0);
let videoCurrentIndex = ref(0);
let subTab = ['街道文体团队', '社区文体团队'];
let myChart = null;
let myChart1 = null;

let video = ref(null);
let videoList = ref([
  {
    name: '全域阅读路线',
    path: 'video/书香阅读路线.mp4',
  },
  {
    name: '民俗文化路线',
    path: 'video/民俗文化路线.mp4',
  },
  {
    name: '健体观光路线',
    path: 'video/健体观光路线.mp4',
  },
]);
let videoPath = ref('video/书香阅读路线.mp4');
let isShowVideo = ref(true);

///====================地图相关============================

let map = ref(null);
let mapPath = ref([]);
let points = ref([]);
// 获取地图数据
async function getMapData() {
  const res = await mapDigitalCultureList({
    type: '阅读场所',
  });
  if (res) {
    mapPath.value = res.rows.map((item) => {
      item.point = item.pointData.split(',').map((obj) => Number(obj));
      return item;
    });

    console.log('阅读场所', mapPath.value);
  }
}

// 地图的渲染最好写在init后,避免地图渲染不成功
function initMap(AMap) {
  map.value = new AMap.Map('map', {
    resizeEnable: true, //是否监控地图容器尺寸变化
    zoom: 14, //初始化地图层级
    center: [120.053644, 30.291592],
  });
  let icon = 'image/sxjc (2).png';
  //绘制点
  mapPath.value.map((item, index) => {
    points.value[index] = new AMap.Marker({
      icon: new AMap.Icon({
        image: icon,
        size: new AMap.Size(52, 52), //图标大小
        imageSize: new AMap.Size(36, 36),
      }),
      position: item.point,
    });
    map.value.add(points.value[index]);
    AMap.event.addListener(points.value[index], 'click', function () {
      console.log('123', mapPath.value[index]);
      console.log('img', mapPath.value[index].url.split(','));
      dialogData.value = mapPath.value[index];
      isShowDialog2.value = true;
    });
  });
}

///====================地图相关============================

function tabChange(index) {
  tabIndex.value = index;
  getData();
}
function titleTabChange() {
  if (currentIndex.value === 0) {
    initChart();
  }
  if (currentIndex.value === 1) {
    initChart1();
  }
}
let dialogData = ref({});
let isShowDialog = ref(false);
let isShowDialog1 = ref(false);
let isShowDialog2 = ref(false);
let isShowDialog3 = ref(false);
let isShowDialogImg = ref(false);
let viewUrl = ref('');
function openViewImg(url) {
  viewUrl.value = url;

  isShowDialogImg.value = true;
}
function videoChange(index, item) {
  isShowVideo.value = false;
  videoCurrentIndex.value = index;
  videoPath.value = item.path;
  setTimeout(() => {
    isShowVideo.value = true;
    nextTick(() => {
      video.value.playbackRate = 0.5;
    });
  }, 200);
}
// 改变播放速率
function videoSelect() {
  let eleSelect = document.getElementById('selRate');
  video.value.playbackRate = eleSelect.options[eleSelect.selectedIndex].value;
}
function viewItem(row) {
  isShowDialog.value = true;
  dialogData.value = row;
}
function showMapDialog() {
  isShowDialog1.value = true;
  nextTick(() => {
    initMap(AMap);
  })
}
function showVideo() {
  isShowDialog3.value = true;
  setTimeout(() => {
    video.value.playbackRate = 0.5;
  }, 200);
}
function initChart() {
  let chartDemo = null;
  chartDemo = document.getElementById('line');
  myChart = echarts.init(chartDemo);
  let option = {
    color: '#1fffff',

    title: {
      text: '',
      subtext: '',
      textStyle: {
        fontSize: 18,
        color: '#fff',
      },
      subtextStyle: {
        fontSize: 12,
        color: '#fff',
      },
      top: '5%',
      right: '5%',
      bottom: '5%',
      left: '5%',
    },
    tooltip: {
      // 鼠标移动上去是否显示信息

      trigger: 'axis',
    },
    // 每列标题
    legend: {
      show: false,
      right: '5%',
      top: '5%',
      zleval: '',
      itemWidth: 25, //图标的宽度类型number
      itemHeight: 14, //图标的高度类型number
      icon: 'circle',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '20%',
      containLabel: true, //是否把标题也包括在内
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: chartsData.value.map((item) => item.activeMonth),
      // 坐标轴轴线相关设置。
      axisLine: {
        show: false,
      },
      // 坐标轴刻度配置
      axisTick: {
        show: false,
      },
      axisLabel: {
        // 坐标轴刻度标签的相关设置。
        interval: 0, // 解决x轴数据显示不完全的bug
        rotate: 0, // 旋转
        color: '#fff',
        formatter: (val) => {
          return val + '月';
        },
      },
    },
    yAxis: {
      type: 'value',
      min: 1,
      axisLine: {
        // 坐标轴轴线相关设置。
        show: false,
      },
      axisTick: {
        // 坐标轴刻度配置
        show: false,
      },
      // y轴背景线是否显示
      splitLine: { show: true },
      axisLabel: {
        // 坐标轴刻度标签的相关设置。
        interval: 0, // 解决x轴数据显示不完全的bug
        rotate: 0, // 旋转
        color: '#fff',
        formatter: (val) => {
          return val;
        },
      },
    },
    // 滑动条型数据区域缩放组件（dataZoomInside）
    dataZoom: [
      {
        show: false,
      },
    ],
    series: [
      {
        name: '',
        type: 'line',
        symbolSize: 16, //设定实心点的大小
        // 是否重叠
        stack: '',
        // y轴数据显示
        label: {
          show: false,
          position: 'top',
        },
        data: chartsData.value.map((item) => item.culture),
        // 线条宽度
        barWidth: '',
        // 平均线
        markLine: {
          // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
          silent: true,
          // 平均值
          data: [{ type: 'average', name: '' }],
          itemStyle: {
            normal: {
              lineStyle: {
                color: '',
                opacity: 0, // 平均线透明度设置设置为0为隐藏,1为显示
              },
            },
          },
          label: {
            formatter: '',
            position: 'insideEndTop', //更多标签位置：'start', 'middle', 'end', 'insideStartTop', 'insideStartBottom', 'insideMiddleTop', 'insideMiddleBottom', 'insideEndTop', 'insideEndBottom'
          },
        },
      },
    ],
  };
  myChart.setOption(option);
  window.addEventListener('resize', () => {
    myChart.resize();
  });
}
function initChart1() {
  let chartDemo = null;
  chartDemo = document.getElementById('line1');
  myChart1 = echarts.init(chartDemo);
  let option = {
    color: '#1fffff',
    title: {
      text: '',
      subtext: '',
      textStyle: {
        fontSize: 18,
        color: '#fff',
      },
      subtextStyle: {
        fontSize: 12,
        color: '#fff',
      },
      top: '5%',
      right: '5%',
      bottom: '5%',
      left: '5%',
    },
    tooltip: {
      // 鼠标移动上去是否显示信息

      trigger: 'axis',
    },
    // 每列标题
    legend: {
      show: false,
      right: '5%',
      top: '5%',
      zleval: '',
      itemWidth: 25, //图标的宽度类型number
      itemHeight: 14, //图标的高度类型number
      icon: 'circle',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '20%',
      containLabel: true, //是否把标题也包括在内
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: chartsData.value.map((item) => item.activeMonth),
      // 坐标轴轴线相关设置。
      axisLine: {
        show: false,
      },
      // 坐标轴刻度配置
      axisTick: {
        show: false,
      },
      axisLabel: {
        // 坐标轴刻度标签的相关设置。
        interval: 0, // 解决x轴数据显示不完全的bug
        rotate: 0, // 旋转
        color: '#fff',
        formatter: (val) => {
          return val + '月';
        },
      },
    },
    yAxis: {
      type: 'value',
      min: 1,
      axisLine: {
        // 坐标轴轴线相关设置。
        show: false,
      },
      axisTick: {
        // 坐标轴刻度配置
        show: false,
      },
      // y轴背景线是否显示
      splitLine: { show: true },
      axisLabel: {
        // 坐标轴刻度标签的相关设置。
        interval: 0, // 解决x轴数据显示不完全的bug
        rotate: 0, // 旋转
        color: '#fff',
        formatter: (val) => {
          return val;
        },
      },
    },
    // 滑动条型数据区域缩放组件（dataZoomInside）
    dataZoom: [
      {
        show: false,
      },
    ],
    series: [
      {
        name: '',
        type: 'line',
        // 是否重叠
        stack: '',
        // symbol: 'none', //设定为实心点
        symbolSize: 20, //设定实心点的大小
        // y轴数据显示
        label: {
          show: false,
          position: 'top',
        },
        data: chartsData.value.map((item) => item.sprots),
        // 线条宽度
        barWidth: '',
        // 平均线
        markLine: {
          // 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
          silent: true,
          // 平均值
          data: [{ type: 'average', name: '' }],
          itemStyle: {
            normal: {
              lineStyle: {
                color: '',
                opacity: 0, // 平均线透明度设置设置为0为隐藏,1为显示
              },
            },
          },
          label: {
            formatter: '',
            position: 'insideEndTop', //更多标签位置：'start', 'middle', 'end', 'insideStartTop', 'insideStartBottom', 'insideMiddleTop', 'insideMiddleBottom', 'insideEndTop', 'insideEndBottom'
          },
        },
      },
    ],
  };
  myChart1.setOption(option);
  window.addEventListener('resize', () => {
    myChart1.resize();
  });
}
let tableData = ref([]);
async function getData() {
  const res = await IndicatorSportsTeamList({
    type: tabIndex.value + 1,
  });
  if (res) {
    tableData.value = res.rows;
  }
}
let chartsData = ref([]);
async function getChartsData() {
  const res = await IndicatorNumberActivitiesList({
    activeYear: new Date().getFullYear(),
  });
  if (res) {
    chartsData.value = res.rows;
    titleTabChange();
  }
}
function resizeFun() {
  myChart.resize();
  myChart1.resize();
}
watch();
onMounted(() => {
  getData();
  getChartsData();
  getMapData();

  window.addEventListener('resize', () => {
    // resizeFun();
  });
});
onUnmounted(() => {
  myChart && myChart.dispose();
  myChart1 && myChart1.dispose();
});
</script>
<style lang="less" scoped>
.left1 {
  margin: 28px 0 0 0;
  .title {
    width: 420px;
    height: 35px;
    // background: rgba(47, 120, 194, 0.3);
    background: url('@/assets/image/szwh-item.png');
    background-size: 100% 100%;
    border-radius: 0 0 17px 0;
    display: flex;
    align-items: center;
    padding: 0 0 0 60px;
    box-sizing: border-box;
    .icon {
      width: 35px;
      height: 35px;
      background-image: linear-gradient(180deg, #a8ffe1 0%, #3df8ff 96%);
      margin: 0 16px 0 0;
    }
    .name {
      font-family: HelloFont-WenYiHei;
      font-weight: WenYiHei;
      font-size: 20px;
      color: #ffffff;
    }
  }
  .sub-title {
    display: flex;
    align-items: center;
    color: #fff;
    .text {
      margin: 0 0px 0 6px;
    }
  }
  .tab-box {
    height: 450px;
  }
  .sub1 {
    margin: 18px 0 0 0;
    img {
      width: 67px;
      height: 51px;
      margin: 0 14px 0 0;
    }
    .sub1-tabs {
      display: flex;
      font-weight: 600;
      font-size: 14px;
      color: #ffffff;
      .tab {
        margin: 0 46px 0 0;
        padding: 0 0 6px 0;
        box-sizing: border-box;
        cursor: pointer;
      }
      .changeTab {
        font-weight: 600;
        border-bottom: 2px solid #fff;
      }
    }
    .box {
      // display: flex;
      height: 120px;
      overflow: auto;
      .window {
        width: 100%;
        height: 51px;
        margin: 10px 0 0 0;
        background: rgba(93, 162, 221, 0.23);
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 18px;
        box-sizing: border-box;
        .name {
          color: rgba(255, 255, 255, 1);
          font-size: 16px;
        }
        .view {
          color: rgba(115, 213, 229, 1);
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
  }
  .sub2 {
    margin: 16px 0 0 0;
    .line {
      width: 418px;
      height: 140.36px;
    }
    .line1 {
      width: 418px;
      height: 300.36px;
    }
    .list {
      display: flex;
      justify-content: space-between;
      margin: 16px 0 0 0;
      .item {
        cursor: pointer;
        width: 200px;
        height: 108px;
        // background-image: linear-gradient(90deg, rgba(47, 93, 142, 0.2) 0%, rgba(31, 127, 255, 0.3) 100%);
        background: url('@/assets/image/yyjc-bg.png');
        background-size: 100% 100%;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 71px;
          height: 58px;
        }
        .name {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
      }
    }
  }
  .dialog-map {
    width: 1208px;
    height: 678px;
    img {
      width: 48px;
      height: 48px;
    }
  }
  .dialog-content1-img {
    .proview-img {
      width: 400px;
      height: 400px;
      object-fit: contain;
    }
  }
  .dialog-content1 {
    width: 1053px;
    height: 620px;
    background: #ffffff;
    border: 10px solid #ffc447;
    box-shadow: inset 0 0 6px 3px rgba(255, 255, 255, 0.16);
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 50px 50px 0 50px;
    box-sizing: border-box;
    .img-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      .dx {
        width: 198px;
        height: 192px;
      }
      .school {
        width: 140px;
        height: 162px;
      }
    }
    .xrk {
      width: 184px;
      height: 176px;
      align-self: flex-end;
    }
    .content {
      margin: 0 60px 0px 60px;
      padding: 0 0 46px 0;
      box-sizing: border-box;
      height: 100%;
      overflow: scroll;
      .dialog-title {
        font-family: HelloFont-WenYiHei;
        font-weight: WenYiHei;
        font-size: 24px;
        color: #000000;
        margin: 0 0 0px 0;
      }
      .dialog-info {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #000000;
        display: flex;
        margin: 16px 0 0 0;
        .dialog-info-title {
          width: 80px;
          height: 22px;
          margin: 0 16px 0 0;
        }
        .dialog-info-text {
          flex: 1;
          cursor: pointer;
          img {
            width: 366.29px;
            height: 206px;
            box-shadow: 14px 11px 0 0 #bce5e5;
            cursor: pointer;
            object-fit: contain;
          }
          :deep(.el-image) {
            width: 366.29px;
            height: 206px;
            box-shadow: 14px 11px 0 0 #bce5e5;
            cursor: pointer;
            :deep(img) {
              object-fit: contain;
            }
          }
        }
      }
      .dialog-info1 {
        margin: 30px 0 0 0;
      }
    }
  }
  .video-box {
    width: 960px;
    // background: #000000;
    // display: flex;
    .video-left {
      padding: 20px 0 0 0;
      box-sizing: border-box;
      display: flex;
      .video-item {
        width: 142px;
        height: 40px;
        background: #a0c5f2;
        color: #186bcc;
        margin: 0px 26px 0 0;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
      .video-item-click {
        background: #1374e5 !important;
        color: #fff !important;
      }
    }
    .video-right {
      width: 960px;
      height: 700px;
      margin: 20px 0 0 0;
    }
  }
}
/* 去除滚动条 */
::-webkit-scrollbar {
  display: none;
}
</style>
<style lang="less">
.dialog-map {
  width: 1208px;
  height: 678px;
  img {
    width: 48px;
    height: 48px;
  }
}
</style>
