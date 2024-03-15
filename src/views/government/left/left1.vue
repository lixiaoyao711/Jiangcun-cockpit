<template>
  <div class="left1">
    <div class="title">
      <div class="left">
        <img src="@/assets/image/lsjt.png" alt="" />
        <div class="text">街道重点工作</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="info" v-if="governmentData['数字政府-街道重点工作-区对街重点考核指标'].value">
      <div class="list">
        <div class="item">
          <div class="name">区对街重点考核指标</div>
          <div class="value">
            <div class="number">{{ governmentData['数字政府-街道重点工作-区对街重点考核指标'].value }}</div>
            <div class="unit">{{ governmentData['数字政府-街道重点工作-区对街重点考核指标'].unit }}</div>
          </div>
          <div class="end">完成率</div>
          <div class="end-value">
            <div class="number">{{ governmentData['数字政府-街道重点工作-区对街重点考核指标完成率'].value }}</div>
            <div class="unit">{{ governmentData['数字政府-街道重点工作-区对街重点考核指标完成率'].unit }}</div>
          </div>
        </div>
        <div class="item">
          <div class="name">区领导批示件</div>
          <div class="value">
            <div class="number">{{ governmentData['数字政府-街道重点工作-区领导批示件'].value }}</div>
            <div class="unit">{{ governmentData['数字政府-街道重点工作-区领导批示件'].unit }}</div>
          </div>
          <div class="end">完成率</div>
          <div class="end-value">
            <div class="number">{{ governmentData['数字政府-街道重点工作-区领导批示件完成率'].value }}</div>
            <div class="unit">{{ governmentData['数字政府-街道重点工作-区领导批示件完成率'].unit }}</div>
          </div>
        </div>
      </div>
      <div class="window" @click="dialog = true">
        <span>特色工作专报情况☞</span>
      </div>
    </div>
    <Dialog :title="'特色工作专报'" @close="dialog = false" v-if="dialog">
      <template v-slot:content>
        <div class="dialog-info">
          <div class="text" v-html="governmentData['数字政府-街道重点工作-特色工作专报情况'].value"></div>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
let dialog = ref(false);
const governmentData = computed(() => {
  return store.state.governmentData;
});
watch(governmentData, (n, o) => {
  // console.log('vex', '改变了', governmentData.value);
});
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.left1 {
  margin-top: 20px;
  .title {
    width: 452px;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    padding-bottom: 7px;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 16.97px;
        height: 16.97px;
        margin-right: 10px;
      }
      .text {
        font-family: PingFangSC-S0pxibold;
        font-weight: 600;
        font-size: 20px;
        color: #ffffff;
      }
    }

    .icon {
      width: 12px;
      height: 12px;
      background: rgba(255, 255, 255, 0.5);
    }
  }
  .info {
    padding: 0 0 0 26px;
    box-sizing: border-box;
    .list {
      .item {
        margin-top: 10px;
        display: flex;
        align-items: center;
        .name {
          width: 144px;
          height: 22px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          margin-right: 38px;
        }
        .value {
          display: flex;
          align-items: center;
          margin-right: 46px;
          .number {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 26px;
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
        .end {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          margin-right: 20px;
        }
        .end-value {
          display: flex;
          align-items: center;
          .number {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 26px;
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
    }
    .window {
      margin-top: 12px;
      width: 391px;
      height: 47px;
      background: url('@/assets/image/info-bg.png');
      background-size: 100% 100%;
      border-radius: 8px;
      color: rgba(21, 255, 204, 1);
      font-size: 16px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      box-sizing: border-box;
      cursor: pointer;
      position: relative;
    }
  }

  .dialog-info {
    margin: 30px 0 0 0;
    .text {
      color: #fff;
    }
    img {
      margin: 10px 0 0 0;
      width: 220px;
      height: 130px;
    }
  }
}
</style>
