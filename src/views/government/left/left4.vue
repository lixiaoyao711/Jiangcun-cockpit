<template>
  <div class="left2">
    <div class="title">
      <div class="left">
        <img src="@/assets/image/lsjt.png" alt="" />
        <div class="text">高质量建设</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="info">
      <vue3-seamless-scroll :list="tableData" :hover="true" :step="0.5" class="scroll-box">
        <div class="list">
          <div class="item" v-for="(item, index) in tableData" :key="index" @click="oepnDialog(item)">
            {{ item.name }} ☞
          </div>
        </div>
      </vue3-seamless-scroll>
    </div>
    <Dialog title="高质量建设" @close="dialog = false" v-if="dialog">
      <template v-slot:content>
        <div class="dialog-content">
          <div class="dialog-item">
            <div class="item-title">项目名称</div>
            <div class="item-name">{{ dialogData.name }}</div>
          </div>
          <div class="dialog-item">
            <div class="item-title">项目所处阶段</div>
            <div class="item-name" :class="typeMap[dialogData.stage]">{{ dialogData.stage }}</div>
          </div>
          <div class="dialog-item">
            <div class="item-title">项目进度</div>
            <div class="dialog-item-count">
              <div class="item-rank-box">
                <div class="rank" :style="{ width: `${dialogData.progress}%` }"></div>
              </div>
              <div class="dialog-sum">{{ dialogData.progress }}%</div>
            </div>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import { IndicatorSetTableTrendsList } from '@/api';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const test = computed(() => {
  return null;
});
let dialog = ref(false);
let typeMap = {
  施工中: 'success',
  招投标: 'warning',
  竣工: 'primary',
};

let dialogData = ref({});
let tableData = ref([
  {
    name: '蒋墩路现代街区提升',
    status: '施工中',
  },
  {
    name: '余杭塘路亚运提升',
    status: '施工中',
  },
  {
    name: '未来社区基础设施建设',
    status: '施工中',
  },
  {
    name: '府苑新村立面改造',
    status: '施工中',
  },
  {
    name: '两大花园补漏（四期）',
    status: '施工中',
  },
  {
    name: '蒋村龙舟馆',
    status: '施工中',
  },
]);
function oepnDialog(row) {
  dialog.value = true;
  dialogData.value = row;
}
async function getTableData() {
  let res = await IndicatorSetTableTrendsList('high_quality_construction');
  if (res.code === 200) {
    tableData.value = res.rows;
  }
}
const governmentData = computed(() => {
  return store.state.governmentData;
});
watch(governmentData, (n, o) => {});
onMounted(() => {
  getTableData();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.left2 {
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
    padding-left: 26px;
    padding-right: 20px;
    box-sizing: border-box;
    margin-top: 22px;
    .scroll-box {
      height: 96px;
      overflow: hidden;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .item {
        width: 196.82px;
        height: 40px;
        background: #1974c31a;
        border-radius: 8px;
        display: flex;
        align-items: center;
        padding: 0 0 0 12px;
        box-sizing: border-box;
        color: #ccfaffff;
        background: url('@/assets/image/info-bg.png');
        background-size: 100% 100%;
        font-size: 16px;
        cursor: pointer;
        margin: 16px 0 0 0;
      }
      // .item:nth-child(n + 3) {
      //   margin: 16px 0 0 0;
      // }
    }
    // .list {
    //   .item {
    //     color: #ffffff;
    //     margin-top: 30px;
    //     .item-title {
    //       .text {
    //         font-family: PingFangSC-Regular;
    //         font-weight: 400;
    //         font-size: 16px;
    //         color: #ffffff;
    //       }
    //     }
    //     .item-info {
    //       padding-left: 12px;
    //       box-sizing: border-box;
    //       display: flex;
    //       align-items: center;
    //       justify-content: space-between;
    //       margin: 20px 0 0 0;
    //       .items {
    //         // flex: 1;
    //         .name {
    //           width: 32px;
    //           height: 22px;
    //           font-family: PingFangSC-Regular;
    //           font-weight: 400;
    //           font-size: 16px;
    //           color: #ffffff;
    //           margin-right: 30px;
    //         }
    //         .number {
    //           font-family: DINAlternate-Bold;
    //           font-weight: 700;
    //           font-size: 26px;
    //           color: #e0fffe;
    //           margin-right: 12px;
    //         }
    //         .unit {
    //           font-family: PingFangSC-Regular;
    //           font-weight: 400;
    //           font-size: 14px;
    //           color: #ffffff;
    //           margin: 0 10px 0 0;
    //         }
    //         .view {
    //           font-family: PingFangSC-Regular;
    //           font-weight: 400;
    //           font-size: 14px;
    //           color: #73d5e5;
    //           cursor: pointer;
    //           position: relative;
    //         }
    //       }
    //     }
    //   }
    // }
  }
  .dialog-content {
    width: 466px;
    height: 239px;
    .dialog-item {
      .item-title {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.8);
        margin: 16px 0 0 0;
      }
      .item-name {
        font-family: PingFangSC-Medium;
        font-weight: 500;
        font-size: 14px;
        color: #ffffff;
        margin: 16px 0 0 0;
      }
      .dialog-item-count {
        display: flex;
        .item-rank-box {
          width: 370px;
          height: 16px;
          background: #ffffff1a;
          border-radius: 8px;
          margin: 16px 20px 0 0;

          .rank {
            // width: 324px;
            height: 16px;
            background-image: linear-gradient(90deg, #8bf6ff 0%, #0091ff 100%);
            border-radius: 8px;
          }
        }
        .dialog-sum {
          font-family: PingFangSC-Medium;
          font-weight: 500;
          font-size: 14px;
          color: #57e7ff;
          align-self: flex-end;
        }
      }
    }
    .success {
      color: #4cff7b !important;
    }
    .warning {
      color: #fbff4c !important;
    }
    .primary {
      color: #4cc4ff !important;
    }
  }
}
:deep(.el-input) {
  --el-input-bg-color: rgb(205 245 255 / 0%);
}
</style>
