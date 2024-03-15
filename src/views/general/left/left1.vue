<template>
  <div class="left1">
    <div class="title">
      <div class="text">党建统领</div>
    </div>
    <Tabs :propsData="tabsData" v-model:index="currentIndex" />
    <div>
      <div class="list">
        <div
          :class="tableData[tabsData[currentIndex]].length > 2 ? 'item-box' : 'item-big-box'"
          v-for="(item, index) in tableData[tabsData[currentIndex]]"
          :key="index"
        >
          <div class="item" v-if="tabsData[currentIndex] !== '统战同心'">
            <div class="name">{{ item.name }}</div>
            <div class="right">
              <div class="number">{{ item.value }}</div>
              <div class="unit">{{ item.unit }}</div>
            </div>
          </div>
          <div v-else class="scroll-box">
            <vue3-seamless-scroll :list="imgList" :hover="true" :step="0.5" direction="left">
              <div class="img-box">
                <img v-for="(item, index) in imgList" :key="index" :src="`image/tz${index + 1}.png`" alt="" />
              </div>
            </vue3-seamless-scroll>
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
  IndicatorIncorruptibleProtectionList,
  IndicatorGroupBazaarList,
  IndicatorGroupActivityStyleList,
  mapPostStationList,
} from '@/api/index';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const generalData = computed(() => {
  return store.state.generalData;
});
let imgList = ref(['', '', '', '', '', '']);
let currentIndex = ref(0);
let tabsData = ['红色根脉', '清廉蒋村', '七彩宣讲', '统战同心', '群团活力'];
let tableData = ref([]);
async function getData() {
  let sum = 0;
  let count = 0;
  let total = 0;
  let mapPath = 0;
  const res = await IndicatorIncorruptibleProtectionList();
  if (res) {
    sum = res.total;
  }
  const ret = await IndicatorGroupBazaarList();
  if (ret) {
    ret.rows.map((item) => {
      count += item.groupSum * 1.0;
      return item;
    });
  }
  const rem = await IndicatorGroupActivityStyleList();
  if (rem) {
    total = rem.total;
  }
  const map = await mapPostStationList();
  if (map) {
    mapPath = map.rows.filter((item) => item.posthouseType === '清廉阵地');
  }

  tableData.value = {
    红色根脉: [
      {
        name: '党委',
        value: generalData.value['数字党建-堡垒筑“蒋”-堡垒分布-党委数量'].value,
        unit: generalData.value['数字党建-堡垒筑“蒋”-堡垒分布-党委数量'].unit,
      },
      {
        name: '党总支',
        value: generalData.value['数字党建-堡垒筑“蒋”-堡垒分布-党总支数量'].value,
        unit: generalData.value['数字党建-堡垒筑“蒋”-堡垒分布-党总支数量'].unit,
      },
      {
        name: '党支部',
        value: generalData.value['数字党建-堡垒筑“蒋”-堡垒分布-党支部数量'].value,
        unit: generalData.value['数字党建-堡垒筑“蒋”-堡垒分布-党支部数量'].unit,
      },
      {
        name: '党员数',
        value: generalData.value['数字党建-先锋劲“蒋”-党员画像-党员总数'].value,
        unit: generalData.value['数字党建-先锋劲“蒋”-党员画像-党员总数'].unit,
      },
    ],
    清廉蒋村: [
      {
        name: '清廉活动',
        value: sum,
        unit: '个',
      },
      {
        name: '清廉阵地',
        value: mapPath.length,
        unit: '个',
      },
    ],
    七彩宣讲: [
      {
        name: '宣讲团数量',
        value: generalData.value['数字党建-宣传亮“蒋”-七彩宣讲团-七彩宣讲队伍'].value,
        unit: generalData.value['数字党建-宣传亮“蒋”-七彩宣讲团-七彩宣讲队伍'].unit,
      },
      {
        name: '场次',
        value: generalData.value['数字党建-宣传亮“蒋”-七彩宣讲团-开展宣讲'].value,
        unit: generalData.value['数字党建-宣传亮“蒋”-七彩宣讲团-开展宣讲'].unit,
      },
      {
        name: '宣讲人员数',
        value: generalData.value['数字党建-宣传亮“蒋”-七彩宣讲团-宣讲人员数'].value,
        unit: '人',
      },
    ],
    统战同心: [{}],
    群团活力: [
      {
        name: '群团数量',
        value: count,
        unit: '个',
      },
      {
        name: '活动数量',
        value: total,
        unit: '个',
      },
    ],
  };
  console.log('tableData.value ', tableData.value);
}
watch();
onMounted(() => {
  setTimeout(() => {
    getData();
  }, 500);
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.title {
  width: 452px;
  height: 44px;
  background-image: url('@/assets/image/title-bg (2).png');
  background-size: 100% 100%;
  padding: 0 0 0 56px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .text {
    font-family: YouSheBiaoTiHei;
    font-size: 28px;
    color: #ffffff;
  }
  .link {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 14px;
    color: #73d5e5;
    cursor: pointer;
  }
}
.left1 {
  .list {
    margin-top: 16px;
    display: flex;
    // align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 8px;
    box-sizing: border-box;
    min-height: 120px;
    .item-box {
      min-width: 48%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
    }
    .item-big-box {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
    }
    .item {
      // min-width: 48%;
      width: 100%;
      height: 50px;
      background: rgba(116, 190, 255, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
      box-sizing: border-box;
      margin-top: 10px;
      .name {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
      }
      .right {
        display: flex;
        align-items: center;
        .number {
          font-family: DINAlternate-Bold;
          font-weight: Bold;
          font-size: 32px;
          color: #e0fffe;
          margin-right: 12px;
        }
        .unit {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
    .scroll-box {
      overflow: hidden;
      width: 100%;
      // height: 102px;
      margin: 3.5vw 0 0 0;
      .img-box {
        width: 100%;
        display: flex;
        align-items: center;
        img {
          width: 102px;
          height: 102px;
        }
      }
    }

    .item2 {
      .item2-title {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
      }
      .value-box {
        display: flex;
        justify-content: space-between;
        .number {
          font-family: DINAlternate-Bold;
          font-weight: 700;
          font-size: 28px;
          color: #e0fffe;
        }
        .text {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
          align-self: flex-end;
        }
      }
    }
  }
  .box3 {
    margin-top: 22px;

    padding: 0 8px;
    box-sizing: border-box;
    min-height: 120px;
    .item3 {
      // width: 209.8px;
      width: 100%;
      height: 50px;
      background: rgba(116, 190, 255, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
      box-sizing: border-box;
      margin-top: 10px;
      .name {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
      }
      .right {
        display: flex;
        .number {
          font-family: DINAlternate-Bold;
          font-weight: Bold;
          font-size: 32px;
          color: #e0fffe;
          margin-right: 12px;
        }
        .unit {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
          align-self: flex-end;
        }
      }
    }
  }
}
</style>
