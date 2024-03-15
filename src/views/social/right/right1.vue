<template>
  <div class="right1">
    <div class="title">
      <div class="left">
        <img class="title-img" src="@/assets/image/lsjt.png" alt="" />
        <div class="text">爱心救助</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="info">
      <div class="list">
        <div class="item">
          <div class="name">低保</div>
          <div class="value-box">
            <span class="number">{{ dataObject.sfdbh || 0 }}</span>
            <span class="unit">人</span>
          </div>
        </div>
        <div class="item">
          <div class="name">低边</div>
          <div class="value-box">
            <span class="number">{{ dataObject.shlsj || 0 }}</span>
            <span class="unit">人</span>
          </div>
        </div>
        <div class="item">
          <div class="name">特困</div>
          <div class="value-box">
            <span class="number">{{ dataObject.sftkry || 0 }}</span>
            <span class="unit">人</span>
          </div>
        </div>
        <div class="item">
          <div class="name">善粮公社</div>
          <div class="value-box">
            <span class="number">{{ showDataMap('数字社会', '1614826644537896961').value }}</span>
            <span class="unit">个</span>
          </div>
        </div>
        <div class="item">
          <div class="name">申请残疾证办理</div>
          <div class="value-box">
            <span class="number">{{ dataObject.sfcjry || 0 }}</span>
            <span class="unit">人</span>
          </div>
        </div>
        <div class="item">
          <div class="name">残疾人概况</div>
          <div class="value-box">
            <span class="view" @click="openDialog">查看详情</span>
          </div>
        </div>
      </div>
    </div>
    <Dialog title="残疾人概况" @close="dialog = false" v-if="dialog">
      <template v-slot:content>
        <div class="dialog-content">
          <div class="dialog-title">
            <span class="title-type">残疾类型</span>
            <span class="title-unit">人数（人）</span>
          </div>
          <div class="dialog-item" v-for="(item, index) in dialogList" :key="index">
            <span>{{ item.type }}</span>
            <span>{{ item.num }}</span>
          </div>
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
import { getForestTkcjdbtjxx, getForestShlsj, IndicatorSetTableTrendsList } from '@/api';
const {} = props;
import { showDataMap } from '@/utils/common';
const test = computed(() => {
  return null;
});
let dialog = ref(false);
let dialogList = ref([]);
let dataObject = ref({});
async function initData() {
  const res = await IndicatorSetTableTrendsList('overview_disabled_persons');
  if (res.code === 200) {
    dialogList.value = res.rows;
  }
  // dialogList.value = [
  //   {
  //     name: '多重残疾',
  //     value: showDataMap('数字社会', '1648671464339288065').value,
  //   },
  //   {
  //     name: '精神残疾',
  //     value: showDataMap('数字社会', '1648671526767308802').value,
  //   },
  //   {
  //     name: '肢体残疾',
  //     value: showDataMap('数字社会', '1648671597621686273').value,
  //   },
  //   {
  //     name: '视力残疾',
  //     value: showDataMap('数字社会', '1648671682254352386').value,
  //   },
  //   {
  //     name: '听力残疾',
  //     value: showDataMap('数字社会', '1648671729415106562').value,
  //   },
  // ];
}
async function getData() {
  const res = await getForestTkcjdbtjxx();
  if (res.code === 200) {
    dataObject.value = res.rows[0];
  }
  const shlsj = await getForestShlsj();
  console.log('shlsj', shlsj.data);
  if (shlsj.code === 200) {
    dataObject.value.shlsj = shlsj.total;
  }
}
function openDialog() {
  dialog.value = true;
}
watch();
onMounted(() => {
  initData();
  getData();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.right1 {
  margin: 8px 0 0 0;
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
  .info {
    padding: 0 22px 0 0;
    box-sizing: border-box;
    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: 210px;
        height: 44px;
        background: rgba(116, 190, 255, 0.2);
        margin: 18px 0 0 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        box-sizing: border-box;
        .name {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
        .value-box {
          .number {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 20px;
            color: #e0fffe;
            margin: 0 12px 0 0;
          }
          .unit {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: #ffffff;
          }
          .view {
            cursor: pointer;
            color: #26e0ff;
          }
        }
      }
      .items {
        // width: 200px;
        width: 100%;
        height: 44px;
        background: rgba(116, 190, 255, 0.2);
        margin: 18px 0 0 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        box-sizing: border-box;
        .name {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
        .value-box {
          .number {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 32px;
            color: #e0fffe;
            margin: 0 12px 0 0;
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
  }
  .dialog-content {
    width: 466px;
    height: 376px;
    overflow: scroll;
    .dialog-title {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
      display: flex;
      justify-content: space-between;
      padding: 0 46px 0 18px;
      box-sizing: border-box;
    }
    .dialog-item {
      margin: 10px 0 0 0;
      width: 429px;
      height: 47px;
      background: url('@/assets/image/home-iten-bg.png');
      background-size: 100% 100%;
      border-radius: 8px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 60px 0 20px;
      box-sizing: border-box;
    }
  }
}
</style>
