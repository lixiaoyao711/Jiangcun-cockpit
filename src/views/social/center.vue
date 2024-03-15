<template>
  <div class="center-box">
    <div class="center">
      <div class="box" @click="openUrl('https://xhwlsq.hzxh.gov.cn/thinscreen/#/Home')">未来社区☞</div>
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
function openUrl(url) {
  window.open(url);
}
watch();
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.center-box {
  width: 900px;
  padding: 0 6px 0 16px;
  box-sizing: border-box;
}
.center {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding: 0 46px 0 0;
  box-sizing: border-box;
  .box {
    pointer-events: auto;
    width: 124px;
    height: 32px;
    background: rgba(92, 170, 255, 0.3);
    border-radius: 16px;
    color: rgba(255, 255, 255, 1);
    margin: 20px 0 0 0;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
