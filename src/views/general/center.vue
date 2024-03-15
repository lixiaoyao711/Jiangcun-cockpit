<template>
  <div class="center">
    <header>
      <div class="title1">
        <div class="list">
          <div class="item" v-for="(item, index) in dataList" :key="index">
            <div class="title">{{ item.title }}</div>
            <div class="info">
              <span class="number">{{ item.value }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="title2">
        <vue3-seamless-scroll :list="leaderList" class="item-box" :step="0.5">
          <div class="item" v-for="(item, index) in leaderList" :key="index">
            <span class="leader">值班领导</span>
            <span class="name">{{ item.dutyLeader }}</span>
          </div>
        </vue3-seamless-scroll>
        <vue3-seamless-scroll :list="personList" class="item-box" :step="0.5" :hover="true">
          <div class="item" v-for="(item, index) in personList" :key="index">
            <span class="leader">值班人员</span>
            <span class="name">{{ item.dutyPersonnel }}</span>
          </div>
        </vue3-seamless-scroll>
      </div>
    </header>
    <main>
      <div @click="tabChange(0)" :class="currentIndex === 0 ? 'changeIcon' : ''" class="show-icon">
        风采展示
      </div>
      <div
        @click="tabChange(1)"
        :class="currentIndex === 1 ? 'changeIcon' : ''"
        class="show-icon"
      >
        地图展示
      </div>
    </main>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import { IndicatorDutyCalendarLeaderList, IndicatorDutyCalendarPersonnelList } from '@/api/index';
import { formatDateTime, timeFormat } from '@/utils/common';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import IndexBgImg from '@/assets/image/index-bg.webp'
import HomeBgImg from '@/assets/image/home-bg.webp'
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['tabChange']);
const props = defineProps({});
const {} = props;
const generalData = computed(() => {
  return store.state.generalData;
});
let dataList = ref([]);
let currentIndex = ref(0);
let leaderList = ref([]);
let personList = ref([]);
async function getPersonList() {
  const res = await IndicatorDutyCalendarLeaderList({
    dutyDate: timeFormat(new Date(), 'yyyy-MM-dd'),
  });
  const ret = await IndicatorDutyCalendarPersonnelList({
    dutyDate: timeFormat(new Date(), 'yyyy-MM-dd'),
  });
  leaderList.value = res.rows.length === 1 ? res.rows : [...res.rows, ...res.rows];
  personList.value = ret.rows.length === 1 ? ret.rows : [...ret.rows, ...ret.rows];
}
function tabChange(val) {
  store.commit('setHomeBg', val === 0 ? HomeBgImg : IndexBgImg);
  emit('tabChange', val);

  currentIndex.value = val;
}
function initList() {
  dataList.value = [
    {
      title: '街道人口',
      value: generalData.value['首页-街道信息-街道人口'].value,
      unit: generalData.value['首页-街道信息-街道人口'].unit,
    },
    {
      title: '常驻人口',
      value: generalData.value['首页-街道信息-常驻人口'].value,
      unit: generalData.value['首页-街道信息-常驻人口'].unit,
    },
    {
      title: '流动人口',
      value: generalData.value['首页-街道信息-流动人口'].value,
      unit: generalData.value['首页-街道信息-流动人口'].unit,
    },
    {
      title: '街道区域面积',
      value: generalData.value['首页-街道信息-街道区域总面积'].value,
      unit: generalData.value['首页-街道信息-街道区域总面积'].unit,
    },
    {
      title: '社区数量',
      value: generalData.value['首页-街道信息-社区数量'].value,
      unit: generalData.value['首页-街道信息-社区数量'].unit,
    },
    {
      title: '网格数量',
      value: generalData.value['首页-街道信息-网格数量'].value,
      unit: generalData.value['首页-街道信息-网格数量'].unit,
    },
  ];
}
watch();
onMounted(() => {
  initList();
  getPersonList();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.center {
  padding-top: 30px;
  box-sizing: border-box;
  position: relative;

  header {
    display: flex;
    .title1 {
      width: 678px;
      height: 80px;
      background: rgba(18, 73, 147, 0.7);
      border-radius: 10px;
      margin-right: 18px;
      .list {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 26px;
        box-sizing: border-box;
        .item {
          .title {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
          }
          .info {
            .number {
              font-family: DINAlternate-Bold;
              font-weight: 700;
              font-size: 28px;
              color: #e0fffe;
              margin-right: 3px;
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
    }
    .title2 {
      width: 169px;
      height: 80px;
      background: rgba(18, 73, 147, 0.7);
      border-radius: 10px;
      padding: 0px 16px;
      box-sizing: border-box;
      position: relative;
      pointer-events: auto;

      .item-box:first-child {
        margin-top: 0;
      }
      .item-box {
        height: 30px;
        overflow: scroll;
        margin-top: 10px;
        .item {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          .leader {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
          }
          .name {
            font-family: PingFangSC-S0pxibold;
            font-weight: 600;
            font-size: 16px;
            color: #e0fffe;
          }
        }
      }
    }
  }
  main {
    .show-icon {
      pointer-events: auto;
      margin-top: 22px;
      width: 86px;
      height: 34px;
      background: url('@/assets/image/tab-change.png');
      background-size: 100% 100%;
      // border: 1px solid #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
    }
    .changeIcon {
      background: url('@/assets/image/tab-change1.png');
      background-size: 100% 100%;
    }
    .screening {
      margin-top: 580px;
      width: 154px;
      height: 40px;
      background-image: linear-gradient(180deg, rgba(59, 231, 249, 0.7) 0%, rgba(21, 146, 145, 0.7) 100%);
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      float: right;
      position: relative;
      .show-window {
        position: absolute;
        padding-left: 16px;
        box-sizing: border-box;
        bottom: 60px;
        width: 156px;
        height: 196px;
        opacity: 0.84;
        background: #101c39;
        border-radius: 4px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
