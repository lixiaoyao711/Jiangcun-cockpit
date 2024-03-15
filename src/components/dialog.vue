<template>
  <div class="Dialog">
    <div class="mask"></div>
    <div class="info">
      <div class="title-box">
        <div class="title-text">{{ title }}</div>
        <div class="close" @click.stop="close"></div>
        <!-- <el-icon @click.stop="close"><CircleClose /></el-icon> -->
      </div>
      <div class="content">
        <slot name="content"></slot>
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
const props = defineProps({
  title: String,
});
const {} = props;
const test = computed(() => {
  return null;
});
function close() {
  emit('close');
}
watch();
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.Dialog {
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99;
  }
  .info {
    z-index: 100;
    min-width: 400px;
    // min-height: 250px;
    border-radius: 8px;
    // padding: 30px 30px 30px 30px;
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url(@/assets/image/dialog-modal.webp);
    background-size: 100% 100%;
    .title-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 44px;
      padding: 0 10px 0 60px;
      margin: 10px;
      box-sizing: border-box;
      background: url(@/assets/image/dialog-title.webp) no-repeat;
      background-size: auto 100%;
      .title-text {
        font-family: PingFangSC-Regular;
        font-weight: bold;
        font-size: 20px;
        color: #ffffff;
        text-shadow: 0 0 9px #159AFF;
        margin-top: -5px;
      }
      .close{
        width: 30px;
        height: 30px;
        background: url(@/assets/image/dialog-close.webp);
        background-size: 100% 100%;
        margin-top: -10px;
        cursor: pointer;
      }
      .el-icon {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
      }
    }

    .content {
      margin-bottom: 36px;
      padding: 24px 24px 0;
      box-sizing: border-box;
      color: #fff;
      max-height: 70vh;
      overflow: scroll;
    }
  }
}
</style>
