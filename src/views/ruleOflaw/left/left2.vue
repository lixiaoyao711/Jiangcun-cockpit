<template>
  <div class="left2">
    <div class="title">
      <div class="left">
        <img src="@/assets/image/lsjt.png" alt="" />
        <div class="text">晒单亮绩</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="info">
      <div class="list">
        <div class="item" v-for="(item, index) in subData" :key="index">
          <div class="bg">
            <div class="text">第{{ item.value }}名</div>
          </div>
          <div class="name">{{ item.leder }}</div>
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
const ruleOflawData = computed(() => {
  console.log('vuex', store.state.ruleOflawData);

  return store.state.ruleOflawData;
});
let subData = ref([]);
console.log('ruleOflawData', ruleOflawData.value);
function getData() {
  subData.value = [
    {
      leder: '安全生产',
      value: ruleOflawData.value['数字法治-晒单亮绩-安全生产名次'].value,
    },
    {
      leder: '消防安全',
      value: ruleOflawData.value['数字法治-晒单亮绩-消防安全名次'].value,
    },
    {
      leder: '平安考核',
      value: ruleOflawData.value['数字法治-晒单亮绩-平安考核名次'].value,
    },
    {
      leder: '信访',
      value: ruleOflawData.value['数字法治-晒单亮绩-信访名次'].value,
    },
    {
      leder: '西湖码',
      value: ruleOflawData.value['数字法治-晒单亮绩-西湖码名次'].value,
    },
  ];
}
watch();
onMounted(() => {
  setTimeout(() => {
    getData();
  }, 500);
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.left2 {
  padding: 0 26px 0 22px;
  box-sizing: border-box;
  margin-top: 20px;
  .title {
    padding: 0 0 8px 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 16.97px;
        height: 16.97px;
        margin-right: 12px;
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
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }
  .info {
    margin: 34px 0 0 0;
    .list {
      display: flex;
      justify-content: space-around;
      .item {
        .bg {
          width: 50px;
          height: 32px;
          background: url('@/assets/image/sdlj-bg.png');
          background-size: 100% 100%;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          font-size: 16px;
          color: #fdcd46;
          position: relative;
          .text {
            position: absolute;
            left: 4px;
            width: 60px;
            font-size: 16px;
            bottom: 30px;
            // text-align: center;
          }
        }
        .name {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
          margin: 10px 0 0 0;
          text-align: center;
        }
      }
    }
  }
}
</style>
