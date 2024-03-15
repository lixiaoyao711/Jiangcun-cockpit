<template>
  <div class="right1">
    <div class="title">
      <div class="name">文明创建</div>
    </div>
    <div class="info">
      <Tabs :propsData="tabsData" v-model:index="tabIndex" />
      <div class="list" v-if="tabIndex === 0">
        <div class="left">
          <div class="left-text">近一季度</div>
          <div class="left-text">区级检查排名</div>
          <div class="left-text">
            <div>第</div>
            <div class="value">{{ cultureData['数字文化-文明创建-文明创建-近一季度区创建检查排名'].value }}</div>
            <div>{{ cultureData['数字文化-文明创建-文明创建-近一季度区创建检查排名'].unit }}</div>
          </div>
        </div>
        <div class="right">
          <div class="right-item" v-for="(item, index) in tableData" :key="index">
            <div class="month">{{ item.rankMonth }}月</div>
            <div class="strrt">{{ item.community }}</div>
            <div class="rank">
              <div>第</div>
              <div class="value">{{ item.ranking }}</div>
              <div>名</div>
            </div>
          </div>
        </div>
      </div>
      <div class="list1" v-if="tabIndex === 1">
        <div class="item">
          <div class="item-title">志愿团队数量</div>
          <div class="item-value">
            <div class="number">{{ cultureData['数字文化-文明创建-志愿力量-志愿团队数量'].value }}</div>
            <div class="unit">{{ cultureData['数字文化-文明创建-志愿力量-志愿团队数量'].unit }}</div>
          </div>
        </div>
        <div class="item">
          <div class="item-title">活动开展场次</div>
          <div class="item-value">
            <div class="number">{{ cultureData['数字文化-文明创建-志愿力量-活动开展场次'].value }}</div>
            <div class="unit">{{ cultureData['数字文化-文明创建-志愿力量-活动开展场次'].unit }}</div>
          </div>
        </div>
        <div class="item">
          <div class="item-title">志愿者活跃率</div>
          <div class="item-value">
            <div class="number">{{ cultureData['数字文化-文明创建-志愿力量-志愿者活跃率'].value }}</div>
            <div class="unit">{{ cultureData['数字文化-文明创建-志愿力量-志愿者活跃率'].unit }}</div>
          </div>
        </div>
      </div>
      <vue3-seamless-scroll
        v-if="tabIndex === 2"
        :list="peopleData"
        direction="left"
        class="list2-box"
        :hover="true"
        :step="0.5"
      >
        <div class="list2">
          <div class="item" v-for="(item, index) in peopleData" :key="index">
            <img :src="item.url" alt="" />
            <div class="item-name">{{ item.name }}</div>
            <div :title="item.remark" class="ml-2" type="info">{{ item.remark }}</div>
          </div>
        </div>
      </vue3-seamless-scroll>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import { IndicatorCommunityCheckRankingList, IndicatorGoodManList } from '@/api/index';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const cultureData = computed(() => {
  return store.state.cultureData;
});
let tabIndex = ref(0);
let tabsData = ['文明创建', '志愿力量', '蒋村好人'];
let tableData = ref([]);
let peopleData = ref([]);
async function getData() {
  // 镇街排名
  const res = await IndicatorCommunityCheckRankingList({
    rankMonth: new Date().getMonth() + 1,
    rankYear: new Date().getFullYear(),
  });
  if (res) {
    tableData.value = res.rows;
  }
  //蒋村好人
  const people = await IndicatorGoodManList();
  if (people) {
    peopleData.value = people.rows;
  }
}
watch();
onMounted(() => {
  getData();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.ml-2 {
  width: 70px;
  height: 20px;
  box-sizing: border-box;
  overflow: hidden;
  background: #fff;
  color: #000;
  border-radius: 4px;
  font-size: 14px;
  margin: 4px 0 0 0;
}
.right1 {
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
  .info {
    height: 186px;

    .list {
      display: flex;
      margin: 10px 0 0 0;
      .left {
        width: 116px;
        height: 140px;
        overflow-y: scroll;
        background: rgba(116, 190, 255, 0.2);
        border-radius: 8px;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
        padding: 0px 10px 16px 10px;
        box-sizing: border-box;
        margin: 0 12px 0 0;
        .left-text {
          margin: 18px 0 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .value {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 28px;
            color: #e0fffe;
          }
        }
      }
      .right {
        // width: 315px;
        flex: 1;
        height: 140px;
        overflow-y: scroll;
        background: rgba(116, 190, 255, 0.2);
        border-radius: 8px;
        padding: 11px 38px 20px 22px;
        box-sizing: border-box;
        .right-item {
          display: flex;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          justify-content: space-between;
          align-items: center;
          margin: 8px 0 0 0;
          .right-item > div {
            flex: 1;
          }
          .month {
            width: 57px;
            height: 29px;
            background: rgba(255, 255, 255, 0.11);
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .rank {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .value {
              font-family: DINAlternate-Bold;
              font-weight: 700;
              font-size: 26px;
              color: #e0fffe;
              margin: 0 10px;
            }
          }
        }
      }
    }
    .list1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 116px;
      margin: 10px 0 0 0;

      .item {
        flex: 1;
        margin: 0 30px 0 0;
        color: #fff;
        .item-value {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .number {
            font-size: 36px;
          }
        }
      }
    }
    .list2-box {
      width: 100%;
      overflow: hidden;
    }
    .list2 {
      display: flex;
      // flex-wrap: wrap;
      justify-content: space-between;
      // align-items: center;
      height: 186px;
      overflow: hidden;
      margin: 0px 0 0 0;
      .item {
        width: 80px;
        flex: 0 0 auto;
        margin: 16px 16px 0 0;
        text-align: center;
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 80px;
          height: 80px;
        }
        .el-tag {
          margin: 6px 0 0 0;
        }
      }
    }
  }
}
/* 去除滚动条 */
::-webkit-scrollbar {
  display: none;
}
</style>
