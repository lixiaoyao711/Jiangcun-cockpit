<template>
  <div class="left2">
    <div class="title">
      <div class="name">文创企业强体</div>
    </div>
    <div class="info">
      <div class="sub-title">
        <div class="left">
          <el-icon><CaretRight /></el-icon>
          <div class="text">文创企业</div>
        </div>
        <div class="time">{{ cultureData['数字文化-文创发展-年份'].value }}年更新</div>
      </div>
      <div class="list">
        <div class="item">
          <div class="name">重点企业家数</div>
          <div class="value-box">
            <div class="number">{{ cultureData['数字文化-文创发展-重点企业家数'].value }}</div>
            <div class="unit">{{ cultureData['数字文化-文创发展-重点企业家数'].unit }}</div>
          </div>
        </div>
        <div class="item">
          <div class="name">文化产业增加值</div>
          <div class="value-box">
            <div class="number">{{ cultureData['数字文化-文创发展-文创产业增加值'].value }}</div>
            <div class="unit">{{ cultureData['数字文化-文创发展-文创产业增加值'].unit }}</div>
          </div>
        </div>
      </div>
      <el-carousel class="window-box" direction="vertical" :autoplay="true" indicator-position="none">
        <el-carousel-item
          v-for="(item, index) in tableData.filter((item) => item.type === '2')"
          :key="index"
          class="window"
        >
          <span class="left">{{ item.subject }}</span>
          <div class="right">
            <div class="numer">{{ item.content }}</div>
            <div class="unit">奖</div>
          </div>
        </el-carousel-item>
      </el-carousel>
      <vue3-seamless-scroll :list="tableData" class="img-list" :hover="true" :step="0.5">
        <img
          v-for="(item, index) in tableData.filter((item) => item.type === '1')"
          :key="index"
          :src="item.url"
          alt=""
        />
      </vue3-seamless-scroll>
    </div>
  </div>
</template>
<script setup>
import store from '@/store';
import { IndicatorCulturalDevelopmentList } from '@/api/index';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const cultureData = computed(() => {
  return store.state.cultureData;
});
let tableData = ref([]);
async function getList() {
  const res = await IndicatorCulturalDevelopmentList();
  if (res) {
    tableData.value = res.rows;
    console.log(' tableData.value ', tableData.value);
  }
}
onMounted(() => {
  getList();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.left2 {
  margin: 30px 0 0 0;
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
    margin: 26px 0 0 0;
    .sub-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
      .left {
        display: flex;
        align-items: center;
      }
      .text {
        margin: 0 0px 0 6px;
      }
    }
    .list {
      display: flex;
      justify-content: space-between;
      margin: 32px 0 0 0;
      padding: 0 46px 0 18px;
      box-sizing: border-box;
      .item {
        width: 124px;
        height: 58px;
        .name {
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
    .window-box {
      height: 80px;
      overflow: hidden;
      // margin: 20px 0 0 0;
    }
    .window {
      margin: 26px 0 0 0;
      background: #245778;
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 40px 0 12px;
      box-sizing: border-box;
      justify-content: space-between;
      .left {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #7ffff1;
      }
      .right {
        display: flex;
        color: #7ffff1;
        align-items: center;
        .numer {
          font-family: DINAlternate-Bold;
          font-weight: 700;
          font-size: 18px;
          margin: 0 12px 0 0;
        }
        .unit {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 18px;
          align-self: flex-end;
        }
      }
    }
    .img-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      height: 130px;
      overflow: hidden;
      margin: 20px 0 0 0;
      img:nth-child(odd) {
        margin: 26px 120px 0 0;
      }
      img {
        width: 112.69px;
        height: 35.84px;
        background: #fdfaff;
        margin: 26px 0 0 0;
      }
    }
  }
}
</style>
