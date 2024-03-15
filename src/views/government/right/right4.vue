<template>
  <div class="right4">
    <div class="title">
      <div class="left">
        <img src="@/assets/image/lsjt.png" alt="" />
        <div class="text">“大综合一体化”行政执法改革</div>
      </div>
      <div class="right">
        <span class="view">查看详情</span>
        <div class="icon"></div>
      </div>
    </div>
    <div class="info">
      <div class="item">
        <div class="left">办案数量☞</div>
        <div class="right">
          <span class="number">51</span>
          <span class="unit">个</span>
        </div>
      </div>
      <div class="item">
        <div class="left">综合查一次☞</div>
        <div class="right">
          <span class="number">90</span>
          <span class="unit">个</span>
        </div>
      </div>
    </div>
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
const test = computed(() => {
  return null;
});
watch();
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.right4 {
  margin-top: 32px;
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
    .right {
      display: flex;
      align-items: center;
      .view {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 14px;
        color: #73d5e5;
        cursor: pointer;
        margin-right: 16px;
      }
      .icon {
        width: 12px;
        height: 12px;
        background: rgba(255, 255, 255, 0.5);
      }
    }
  }
  .info {
    padding: 0 36px 0 16px;
    box-sizing: border-box;
    .item {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      .left {
        color: #38c2ff;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
      }
      .right {
        .number {
          font-family: DINAlternate-Bold;
          font-weight: 700;
          font-size: 26px;
          color: #38c2ff;
        }
        .unit {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #38c2ff;
        }
      }
    }
  }
}
</style>
