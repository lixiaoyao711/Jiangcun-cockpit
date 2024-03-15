<template>
  <div class="center">
    <main class="content">
      <div class="left">
        <div
          @click="tabChange(0, '/image/jingji-bg.webp')"
          :class="currentIndex === 0 ? 'changeIcon' : ''"
          class="show-icon"
        >
          风采展示
        </div>
        <div
          @click="tabChange(1, '/image/index-bg.png')"
          :class="currentIndex === 1 ? 'changeIcon' : ''"
          class="show-icon"
        >
          地图展示
        </div>
      </div>
      <div class="week-box" v-if="showDataMap('数字政府', '1640980720585580545').value !== 'false'">
        <div class="week-title-box">
          <div class="week-title">本周重点工作</div>
        </div>
        <div class="week-info">
          <div class="week-item" v-for="(item, index) in workList" :key="index">
            <span>{{ index + 1 }}.{{ item.content }} </span>
          </div>
        </div>
      </div>
      <div class="right" v-if="weatherData">
        <div class="item">
          <div class="item-left">
            <img src="@/assets/image/jg.png" alt="" />
            <vue3-seamless-scroll
              :list="weatherData.split('')"
              direction="left"
              class="scroll"
              :hover="true"
              :step="0.5"
            >
              <div class="scroll-div">
                <span class="name" v-for="(item, index) in weatherData" :key="index">{{ item }}</span>
              </div>
            </vue3-seamless-scroll>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import { showDataMap } from '@/utils/common';
import { IndicatorSetTableTrendsList } from '@/api/index';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close', 'tabChange']);
const props = defineProps({ propsData: Object });
const {} = props;
const governmentData = computed(() => {
  return store.state.governmentData;
});
let currentIndex = ref(0);
function tabChange(val, img) {
  if (showDataMap('数字政府', '1597485758657384449').value !== 'false' && val) {
    store.commit('setHomeBg', [img]);
  }
  if (showDataMap('数字政府', '1597485758657384449').value === 'false') {
    store.commit('setHomeBg', img);
  }
  emit('tabChange', val);
  currentIndex.value = val;
}
let weatherData = ref('');
async function getWeatherWarning() {
  const res = await axios({
    url: 'https://devapi.qweather.com/v7/warning/now?location=101210101&lang=en&key=aeecf8ccd69d4741aa280aff329143fa&lang=zh',
    method: 'get',
    baseURL: null,
  });
  if (res.data.warning.length > 0) {
    weatherData.value = res.data.warning[0].title + ',' + res.data.warning[0].text;
  }
}
let workList = ref([]);
async function getWork() {
  const res = await IndicatorSetTableTrendsList('point_work');
  // console.log('getWork',res)
  workList.value = res.rows;
}
watch();
onMounted(() => {
  getWeatherWarning();
  getWork();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.center {
  // width: 100%;
  width: 900px;
  padding: 0 6px 0 16px;
  box-sizing: border-box;
  position: relative;

  .content {
    display: flex;
    justify-content: space-between;
    pointer-events: auto;
    margin: 20px 0 0 0;

    .show-icon {
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
    .week-box {
      width: 416px;
      // height: 130px;
      background: #0f276cb3;
      border: 2px solid #2ba9bd;
      border-radius: 8px;
      margin: 0 16px 0 16px;
      box-sizing: border-box;
      overflow: scroll;

      .week-title-box {
        display: flex;
        justify-content: center;
        height: 30px;
        .week-title {
          width: 220px;
          background: url('@/assets/image/week-bg.png');
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: PingFangSC-SNaNpxibold;
          font-weight: 600;
          font-size: 16px;
          color: #ffffff;
        }
      }
      .week-info {
        // margin: 20px 0 0 16px;
        height: 80px;
        margin: 10px 20px;
        box-sizing: border-box;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 14px;
        overflow-y: auto;
        color: #ffffff;
        line-height: 1.2;
        .week-item {
          margin: 10px 0 0 0;
        }
      }
    }
    .right {
      width: 455px;
      // height: 133px;
      background: rgba(11, 22, 64, 0.5);
      border-radius: 18px;
      padding: 0 0 0 20px;
      box-sizing: border-box;
      // margin: 20px 0 0 0;
      display: flex;
      align-items: center;
      border: 2px solid #2ba9bd;
      .item {
        width: 415px;
        height: 50px;
        background-image: linear-gradient(90deg, rgba(216, 26, 26, 0.4) 0%, rgba(255, 176, 176, 0.2) 100%);
        border-radius: 27px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // padding: 0 0 0 12px;
        box-sizing: border-box;
        // margin-top: 12px;
        .item-left {
          display: flex;
          align-items: center;
          .scroll {
            width: 320px;
            overflow: hidden;
            height: 20px;
            .scroll-div {
              height: 20px;
            }
          }

          img {
            width: 46.84px;
            height: 50px;
            margin-right: 20px;
          }
          .name {
            color: rgba(255, 255, 255, 1);
            font-size: 16px;
            font-weight: 400;
          }
        }
        .item-right {
          color: rgba(255, 255, 255, 1);
          font-size: 16px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
