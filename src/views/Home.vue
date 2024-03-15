<template>
  <transition name="bounce">
    <div class="home-box" v-if="showHone">
      <div class="Home" @click="showIndex">
        <div class="time">
          <div class="hours">{{ time }}</div>
          <div class="week">{{ week }}</div>
          <div class="month">{{ month }}</div>
        </div>
        <div class="info">
          <div class="one">
            <div class="weather">
              <div class="chars">
                <div id="chars"></div>
              </div>
              <div class="weather-box">
                <img
                  class="weather-icon"
                  :class="
                    weatherImgMap[weatherData.weather] === '台风_龙卷风.png' ||
                    weatherImgMap[weatherData.weather] === '晴.png'
                      ? 'rotate360'
                      : 'showHide'
                  "
                  :src="`image/weather/${
                    weatherImgMap[weatherData.weather] ? weatherImgMap[weatherData.weather] : '晴.png'
                  }`"
                  alt=""
                />
                <div class="weather-text">{{ weatherData.weather }}</div>
              </div>
            </div>
            <div class="pm">
              <div class="one">
                <div class="aqi">AQI</div>
                <div>PM2.5</div>
              </div>
              <div class="two">
                <div class="number">{{ AQIData.aqi }}</div>
                <div>{{ AQIData.pm2p5 }}μm/m³</div>
              </div>
            </div>
          </div>
          <div class="userinfo">
            <div class="title">今日值班情况</div>
            <div class="leder-box">
              <div class="leder">
                <div class="leder-title">值班领导</div>
                <vue3-seamless-scroll :list="leaderList" class="scroll-box" :step="0.5">
                  <div class="info-box" v-for="(item, index) in leaderList" :key="index">
                    <div class="name">{{ item.dutyLeader }}</div>
                    <div class="phone">{{ item.dutyLeaderPhone }}</div>
                  </div>
                </vue3-seamless-scroll>
              </div>
              <div class="leder">
                <div class="leder-title">值班人员</div>
                <vue3-seamless-scroll :list="personList" class="scroll-box" :step="0.5">
                  <div class="info-box" v-for="(item, index) in personList" :key="index">
                    <div class="name">{{ item.dutyPersonnel }}</div>
                    <div class="phone">{{ item.dutyPersonnelPhone }}</div>
                  </div>
                </vue3-seamless-scroll>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="index-box" v-else>
      <Index @openHome="openHome" />
    </div>
  </transition>
</template>
<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import { formatDateTime, timeFormat } from '@/utils/common';
import axios from 'axios';
import store from '@/store';
import { useRouter } from 'vue-router';
import * as echarts from 'echarts';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import {
  dndicatorDutyCalendarList,
  IndicatorDutyCalendarLeaderList,
  IndicatorDutyCalendarPersonnelList,
} from '@/api/index';
import Index from '@/views/index';

const router = useRouter();
const emit = defineEmits(['close']);
const props = defineProps({});

const test = computed(() => {
  return null;
});
let option = ref({});
let showHone = ref(true);
let myChart = null;
let leaderList = ref([]);
let personList = ref([]);
function initChart() {
  let chartDemo = document.getElementById('chars');
  myChart = echarts.init(chartDemo);
  option.value = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: -9,
        max: 47,
        splitNumber: 4,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#FF931F' },
            { offset: 0.5, color: '#b9c97b' },
            { offset: 1, color: ' #73FFD6' },
          ]),
          shadowColor: 'rgba(0,138,255,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
          roundCap: true,
          width: 10,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          roundCap: true,

          lineStyle: {
            width: 10,
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
          distance: -42,
          color: '#999',
          fontSize: 16,
          color: '#fff',
        },
        title: {
          show: true,
          offsetCenter: ['10', '0%'],
          color: '#fff',
        },
        detail: {
          valueAnimation: true,
          fontSize: 32,
          offsetCenter: [0, '-30%'],
          color: '#fff',
        },
        data: [
          {
            value: weatherData.value.temperature,
            name: '温度（℃）',
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
function showIndex() {
  showHone.value = false;
  myChart.dispose();
}
function openHome() {
  showHone.value = true;
  nextTick(() => {
    initChart();
  });
}
async function getList() {
  // let get = {
  //   dutyDate: timeFormat(new Date(), 'yyyy-MM-dd'),
  // };
  // const { data } = await dndicatorDutyCalendarList(get);
  // if (data) {
  //   console.log(data);
  // }
}
async function getPersonList() {
  const res = await IndicatorDutyCalendarLeaderList({
    dutyDate: timeFormat(new Date(), 'yyyy-MM-dd'),
  });
  const ret = await IndicatorDutyCalendarPersonnelList({
    dutyDate: timeFormat(new Date(), 'yyyy-MM-dd'),
  });
  leaderList.value = res.rows.map((e) => {
    let p = e.dutyLeaderPhone.split('');
    p.splice(3, 4, '****');
    e.dutyLeaderPhone = p.join('');
    return e;
  });
  personList.value = ret.rows.map((e) => {
    let p = e.dutyPersonnelPhone.split('');
    p.splice(3, 4, '****');
    e.dutyPersonnelPhone = p.join('');
    return e;
  });
  console.log(leaderList.value);
}
function initMap() {
  AMap.plugin('AMap.Weather', function () {
    var weather = new AMap.Weather();
    //查询实时天气信息, 查询的城市到行政级别的城市，如朝阳区、杭州市
    weather.getLive('杭州市', function (err, data) {
      console.log(data);
      weatherData.value = data;
      initChart();
    });
  });
}
let AQIData = ref({});
let weatherData = ref({});
let weatherImgMap = {
  晴: '晴.png',
  多云: '多云.png',
  阴: '阴天.png',
  阵雨: '小雨.png',
  雷阵雨: '雷雨_冰雹.png',
  雷阵雨并伴有冰雹: '雷雨_冰雹.png',
  雨夹雪: '雨夹雪_冻雨.png',
  小雨: '中_大雨.png',
  中雨: '中_大雨.png',
  大雨: '中_大雨.png',
  暴雨: '暴雨.png',
  大暴雨: '大_特大暴雨.png',
  特大暴雨: '大_特大暴雨.png',
  阵雪: '小雪.png',
  小雪: '小雪.png',
  中雪: '中雪_弱高吹雪.png',
  大雪: '大雪.png',
  暴雪: '暴雪.png',
  雾: '雾_霾.png',
  冻雨: '雨夹雪_冻雨.png',
  '小雨-中雨': '小雨.png',
  '中雨-大雨': '中_大雨.png',
  '大雨-暴雨': '中_大雨.png',
  '暴雨-大暴雨': '暴雨.png',
  '小雪-中雪': '小雪.png',
  '中雪-大雪': '中雪_弱高吹雪.png',
  '大雪-暴雪': '大雪.png',
  浮尘: '沙尘_扬沙_沙尘暴_飑.png',
  扬沙: '沙尘_扬沙_沙尘暴_飑.png',
  强沙尘暴: '沙尘_扬沙_沙尘暴_飑.png',
  飑: '沙尘_扬沙_沙尘暴_飑.png',
  龙卷风: '沙尘_扬沙_沙尘暴_飑.png',
  弱高吹雪: '中雪_弱高吹雪.png',
  轻雾: '雾_霾.png',
  霾: '雾_霾.png',
};
async function getPM25() {
  const res = await axios({
    url: 'https://devapi.qweather.com/v7/air/now?location=101210101&key=aeecf8ccd69d4741aa280aff329143fa',
    method: 'get',
    baseURL: null,
  });
  if (res) {
    console.log('getPM25', res);
    AQIData.value = res.data.now;
  }
}
watch(() => {});
onMounted(() => {
  setInterval(() => {
    getTime();
  }, 1000);
  getList();
  getPersonList();
  initMap();
  getPM25();
});
onUnmounted(() => {
  myChart && myChart.dispose();
});
let time = ref('');
let week = ref('');
let month = ref('');
function getTime() {
  time.value = timeFormat(new Date(), 'hh:mm');
  week.value = getWeekDate();
  month.value = formatDateTime(new Date());
}
function getWeekDate() {
  let now = new Date();
  let day = now.getDay();
  let weeks = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  let week = weeks[day];
  return week;
}

function toPath() {
  console.log(123);
  router.push('/about');
}
</script>
<style lang="less" scoped>
.home-box {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 99999;
  cursor: pointer;
}
.index-box {
  height: 100%;
  width: 100%;
  position: absolute;
}
.Home {
  width: 100%;
  height: 100%;
  background: url('@/assets/image/home-bg.webp');
  background-size: 100% 100%;
  padding: 250px 250px 0 250px;
  box-sizing: border-box;
  display: flex;
  .time {
    .week,
    .month,
    .hours {
      width: 450px;
      height: 140px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 100px;
      color: #ffffff;
      letter-spacing: 4.55px;
      text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    }
  }
  .info {
    .one {
      display: flex;
      .weather {
        width: 370px;
        height: 191px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 12px;
        padding: 30px 26px 0 21px;
        box-sizing: border-box;
        filter: blur(0);
        margin-right: 30px;
        display: flex;
        .chars {
          width: 260px;
          height: 230px;
          #chars {
            width: 100%;
            height: 100%;
          }
        }
        .weather-box {
          margin-left: 3px;
          margin-top: 16px;
          .weather-icon {
            width: 64px;
            height: 64px;
          }
          .weather-text {
            margin-top: 16px;
            font-weight: 400;
            font-size: 20px;
            color: #ffffff;
            text-align: center;
          }
        }
      }
      .pm {
        width: 500px;
        height: 191px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 12px;
        filter: blur(0);
        padding: 32px 0 0 50px;
        box-sizing: border-box;
        .one {
          font-size: 32px;
          color: #ffffff;
          .aqi {
            width: 140px;
          }
        }
        .two {
          font-weight: Bold;
          font-size: 56px;
          color: #75ffec;
          display: flex;
          margin-top: 16px;
          .number {
            width: 140px;
          }
        }
      }
    }
    .userinfo {
      margin-top: 38px;
      width: 900px;
      height: 360px;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 12px;
      filter: blur(0);
      padding: 32px 0 0 50px;
      box-sizing: border-box;
      .title {
        font-weight: 600;
        font-size: 32px;
        color: #ffffff;
      }
      .leder-box {
        display: flex;
        .leder {
          width: 383px;
          margin-right: 52px;
          box-sizing: border-box;
          .leder-title {
            font-weight: 400;
            font-size: 32px;
            color: #ffffff;
            margin-top: 16px;
          }
          .scroll-box {
            height: 180px;
            overflow: hidden;
            margin: 20px 0 0 0;
            padding: 0 0 20px 0;
            box-sizing: border-box;
          }
          .info-box {
            display: flex;
            align-items: center;
            margin-top: 24px;
            .name {
              font-family: PingFangSC-S0pxibold;
              font-weight: 600;
              font-size: 32px;
              color: #ffffff;
              margin-right: 24px;
              width: 126px;
            }
            .phone {
              font-family: DINAlternate-Bold;
              font-weight: Bold;
              font-size: 36px;
              color: #75ffec;
              width: 300px;
            }
          }
        }
      }
    }
  }
}
.bounce-enter-active {
  animation: bounce-in 1s;
}
.bounce-leave-active {
  animation: bounce-in 1s reverse;
}
@keyframes bounce-in {
  0% {
    bottom: 100%;
  }

  100% {
    bottom: 0%;
  }
}

// 无限显隐动画
.showHide {
  animation: showHide 7s linear 0.2s infinite;
}
@keyframes showHide {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
// 无限旋转动画
.rotate360 {
  animation: rotate360 7s linear 0.2s infinite;
}
@keyframes rotate360 {
  100% {
    transform: rotate(360deg);
  }
}
</style>
