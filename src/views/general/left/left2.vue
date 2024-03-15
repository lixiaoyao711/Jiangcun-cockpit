<template>
  <div class="left2">
    <div class="title">
      <div class="text">人大监督</div>
      <div class="link" @click="openDialog">查看链接</div>
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
const generalData = computed(() => {
  return store.state.generalData;
});

function openDialog() {
  window.open(generalData.value['首页-人大监督-录入链接'].value);
}

watch();
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.tabs {
  margin-top: 26px;
  width: 455px;
  height: 28px;
  background-image: linear-gradient(180deg, rgba(205, 245, 255, 0.24) 0%, rgba(101, 166, 255, 0.12) 99%);
  border-radius: 5px;
  display: flex;
  .tab {
    width: 97px;
    height: 28px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
  }
  .clickTab {
    background-image: linear-gradient(180deg, rgba(96, 172, 255, 0.8) 0%, rgba(96, 160, 255, 0.24) 98%);
  }
}
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
    position: relative;
  }
}
.dialog-content {
  height: 20px;
}
.url {
  cursor: pointer;
  color: aqua;
}
.left2 {
  margin-top: 16px;
}
</style>
