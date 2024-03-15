<template>
  <div class="right3">
    <div class="title">
      <div class="left">
        <img class="title-img" src="@/assets/image/lsjt.png" alt="" />
        <div class="text">指标考核</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="info">
      <div class="rank">
        <div class="rank-title">卫健排行</div>
        <TitleIcon :type="typeMap[showDataMap('数字社会', '1650397232568324098').value]" />
      </div>
      <div class="rank">
        <div class="rank-title">民政排行</div>
        <TitleIcon :type="typeMap[showDataMap('数字社会', '1650397300591546369').value]" />
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import { showDataMap } from '@/utils/common';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const typeMap = {
  前列: 'success',
  居中: 'warning',
  靠后: 'danger',
};
const test = computed(() => {
  return null;
});
let currentIndex = ref(0);
let tabsData = ['幸福荟来', '暖心家庭', '急救普及'];

watch();
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.right3 {
  margin: 6px 0 0 0;
  .info {
    display: flex;
    justify-content: space-between;
    .rank {
      flex: 1;
      display: flex;
      margin: 28px 0 0 0;
      .rank-title {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #73d5e5;
        margin: 0 18px 0 0;
      }
      .icon {
        width: 26px;
        height: 26px;
        background: rgba(78, 255, 143, 0.4);
        border-radius: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        .sub-icon {
          width: 18px;
          height: 18px;
          background: #4eff8f;
          border-radius: 18px;
        }
      }
    }
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    padding: 0 0 8px 0;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
      .title-img {
        width: 16.97px;
        height: 16.97px;
        margin: 0 10px 0 0;
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
}
</style>
