<template>
  <div class="right2">
    <div class="title">
      <div class="name">融媒发展聚气</div>
    </div>
    <div class="info">
      <Tabs :propsData="tabsData" v-model:index="tabIndex" />
      <div class="data" v-if="tabIndex === 0">
        <el-carousel trigger="click" height="150px" indicator-position="none" arrow="never">
          <el-carousel-item v-for="item in imgUrl" :key="item">
            <img :src="item" alt="" />
          </el-carousel-item>
        </el-carousel>
        <div class="text">
          <div class="item">
            <span class="name">公众号发布</span>
            <span class="number">{{ cultureData['数字文化-融媒发展-街道融媒体中心-公众号发布数量'].value }}</span>
            <span class="unit">{{ cultureData['数字文化-融媒发展-街道融媒体中心-公众号发布数量'].unit }}</span>
          </div>
          <div class="item">
            <span class="name">视频号发布</span>
            <span class="number">{{ cultureData['数字文化-融媒发展-街道融媒体中心-视频号发布数量'].value }}</span>
            <span class="unit">{{ cultureData['数字文化-融媒发展-街道融媒体中心-视频号发布数量'].unit }}</span>
          </div>
        </div>
      </div>
      <div class="data1" v-if="tabIndex === 1">
        <div class="item1">
          <div class="item1-title">近三个月排名</div>
          <div class="list1">
            <div class="text" v-for="(item, index) in tableData.slice(0, 3)" :key="index">
              <div class="text-left">{{ item.rankMonth }}月</div>
              <div class="text-right">
                <span class="number" :title="item.ranking">{{ item.ranking }}</span>
                <span class="rank">名</span>
              </div>
            </div>
          </div>
        </div>
        <div class="item1">
          <div class="item1-title">宣传数量</div>
          <div class="list1">
            <div class="text">
              <div class="text-left">国家级</div>
              <div class="text-right">
                <span :title="cultureData['数字文化-融媒发展-媒体宣传-宣传数量-国家级'].value" class="number">{{
                  cultureData['数字文化-融媒发展-媒体宣传-宣传数量-国家级'].value
                }}</span>
                <span class="unit">{{ cultureData['数字文化-融媒发展-媒体宣传-宣传数量-国家级'].unit }}</span>
              </div>
            </div>
            <div class="text">
              <div class="text-left">省级</div>
              <div class="text-right">
                <span :title="cultureData['数字文化-融媒发展-媒体宣传-宣传数量-省级'].value" class="number">{{
                  cultureData['数字文化-融媒发展-媒体宣传-宣传数量-省级'].value
                }}</span>
                <span class="unit">{{ cultureData['数字文化-融媒发展-媒体宣传-宣传数量-省级'].unit }}</span>
              </div>
            </div>
            <div class="text">
              <div class="text-left">市级</div>
              <div class="text-right">
                <span :title="cultureData['数字文化-融媒发展-媒体宣传-宣传数量-市级'].value" class="number">{{
                  cultureData['数字文化-融媒发展-媒体宣传-宣传数量-市级'].value
                }}</span>
                <span class="unit">{{ cultureData['数字文化-融媒发展-媒体宣传-宣传数量-市级'].unit }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="data2" v-if="tabIndex === 2">
        <div class="top">
          <div class="top-name">蒋村街道</div>
          <div class="top-rank">
            全区第 <span class="rank-value">{{ showDataMap('数字文化', '1651491112210526209').value }}</span> 名
          </div>
        </div>
        <vue3-seamless-scroll :list="studyList" :hover="true" :step="0.5" class="item2">
          <div>
            <div class="text" v-for="(item, index) in studyList" :key="index">
              <div class="text-left">{{ item.street }}</div>
              <div class="text-right">
                <span class="rank"></span>
                <span class="number">{{ item.score }}</span>
                <span class="rank">分</span>
              </div>
            </div>
          </div>
        </vue3-seamless-scroll>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import { IndicatorMonthlyRankingList, IndicatorStudyPowerList } from '@/api/index';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import { showDataMap } from '@/utils/common';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const cultureData = computed(() => {
  return store.state.cultureData;
});
let tabsData = ['街道融媒体中心', '媒体宣传', '学习强国'];
let tabIndex = ref(0);
let imgUrl = ref([]);
let tableData = ref([
  {
    rankMonth: new Date().getMonth() + 1,
    rankYear: new Date().getFullYear(),
    ranking: '-',
  },
  {
    rankMonth: new Date().getMonth() === 0 ? 12 : new Date().getMonth(),
    rankYear: new Date().getMonth() === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear(),
    ranking: '-',
  },
  {
    rankMonth: new Date().getMonth() - 1 === 0 ? 12 : new Date().getMonth() - 1,
    rankYear: new Date().getMonth() - 1 === 0 ? new Date().getFullYear() - 1 : new Date().getFullYear(),

    ranking: '-',
  },
]);
let studyList = ref([]);
async function getData() {
  console.log('getData', tableData.value);
  const res = await IndicatorMonthlyRankingList({
    orderByColumn: 'rank_year desc,rank_month',
    isAsc: 'desc',
  });
  if (res) {
    tableData.value = tableData.value.map((item) => {
      let data = res.rows.find((i) => i.rankMonth == item.rankMonth && i.rankYear == item.rankYear);
      if (data) {
        item.ranking = data.ranking;
      }
      return item;
    });
  }
}

async function getList() {
  const res = await IndicatorStudyPowerList();
  if (res) {
    studyList.value = res.rows;
  }
}
watch();
onMounted(() => {
  getData();
  getList();
  setTimeout(() => {
    imgUrl.value = cultureData.value['数字文化-融媒发展-街道融媒体中心-场地照片'].value.split(',').map((item) => {
      return `${import.meta.env.VITE_APP_API_BASE_URL}/system/oss/download/${item}`;
    });
    console.log('imgUrl.value', imgUrl.value);
  }, 200);
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.right2 {
  margin: 0px 0 0 0;
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
  .info {
    .data {
      padding: 0 12px;
      box-sizing: border-box;
      margin: 20px 0 0 0;
      img {
        width: 427px;
        height: 129px;
        border-radius: 10px;
      }
      .text {
        display: flex;
        justify-content: space-between;
        padding: 0 px;
        box-sizing: border-box;
        .item {
          margin: 0 6px 0 0;
          .name {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
            margin: 0 26px 0 0;
          }
          .number {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 22px;
            color: #e0fffe;
            margin: 0 12px 0 0;
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
    .data1 {
      padding: 0 12px;
      box-sizing: border-box;
      margin: 20px 0 0 0;
      display: flex;
      justify-content: space-between;
      height: 185px;
      .item1 {
        flex: 1;
        margin: 10px 20px 0 0;

        color: #fff;
        .list1 {
          margin: 6px 0px 0 0;
          background: rgba(39, 85, 143, 0.3);
          padding: 10px 30px;
          box-sizing: border-box;
          border-radius: 10px;
          height: 160px;
          .text {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 0 0 0;
          }
          .text-right {
            display: flex;
            align-items: center;
            .number {
              font-size: 26px;
              margin: 0 16px 0 0;
              display: inline-block;
              width: 40px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              cursor: pointer;
            }
          }
        }
      }
    }
    .data2 {
      padding: 0 12px;
      box-sizing: border-box;
      margin: 20px 0 0 0;
      // display: flex;
      justify-content: space-between;
      height: 185px;
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 32px 0 40px;
        box-sizing: border-box;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 18px;
        color: #ffffff;
        .rank-value {
          font-family: DINAlternate-Bold;
          font-weight: 700;
          font-size: 26px;
          color: #e0fffe;
        }
      }
      .item2 {
        margin: 12px 0 0 0;
        height: 136px;
        overflow: hidden;
        flex: 1;
        color: #fff;
        background: rgba(39, 85, 143, 0.3);
        padding: 0 26px 20px 26px;
        box-sizing: border-box;
        border-radius: 10px;
        .text {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 20px 0 0 0;
        }
        .text-right {
          display: flex;
          align-items: center;
          .number {
            font-size: 26px;
            margin: 0 16px;
          }
        }
      }
    }
  }
}
</style>
