<template>
  <div class="left2">
    <div class="title">
      <div class="left">
        <img src="@/assets/image/lsjt.png" alt="" />
        <div class="text">区街两级民生实事</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="info">
      <div class="list">
        <div class="item">
          <div class="item-title">
            <el-icon><CaretRight /></el-icon>
            <span class="text">区级议案建议提案办理</span>
          </div>
          <div class="item-info">
            <div class="items">
              <span class="name">数量</span>
              <span class="number">{{
                governmentData['数字政府-区街两级民生实事-区级议案建议提案办理数量'].value
              }}</span>
              <span class="unit">{{ governmentData['数字政府-区街两级民生实事-区级议案建议提案办理数量'].unit }}</span>
            </div>
            <div class="items">
              <span class="name">完成率</span>
              <span class="number">{{
                governmentData['数字政府-区街两级民生实事-区级议案建议提案办理完成率'].value
              }}</span>
              <span class="unit"
                >{{ governmentData['数字政府-区街两级民生实事-区级议案建议提案办理完成率'].unit }}
              </span>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-title">
            <el-icon><CaretRight /></el-icon>
            <span class="text">街道民生实事项目</span>
          </div>
          <div class="item-info">
            <div class="items">
              <span class="name">数量</span>
              <span class="number">{{ countData.counts }}</span>
              <span class="unit">个</span>
            </div>
            <div class="items">
              <span class="name">完成率</span>
              <span class="number">{{ countData.speedProgress }}</span>
              <span class="unit">%</span>
              <span class="view">
                <span @click="dialog = true">查看详情</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog :title="'项目列表'" @close="dialogClose" v-if="dialog">
      <template v-slot:content>
        <div class="dialog-info">
          <div class="dialog-tabs">
            <div
              @click="selectChange(item, index)"
              :class="currentIndex === index ? 'dialogChange' : ''"
              v-for="(item, index) in listData"
              :key="item.id"
              class="dialog-tab"
            >
              {{ item.projectName }}
            </div>
          </div>
          <div class="dialog-title">项目介绍</div>
          <div class="dialog-value">
            {{selectValue.content}}
          </div>
          <div class="rank-box">
            <div class="rank-title">
              <div class="dialog-title">项目进度</div>
              <div class="number">{{ selectValue.speedProgress }}%</div>
            </div>
            <el-progress
              color="#46f8fd"
              :show-text="false"
              :text-inside="true"
              :stroke-width="18"
              :percentage="selectValue.speedProgress"
            />
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import axios from 'axios';
import { IndicatorPeopleLivelihoodList, IndicatorPeopleLivelihoodBsInfo } from '@/api/index';
import store from '@/store';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const governmentData = computed(() => {
  return store.state.governmentData;
});
let listData = ref([]);
async function getList() {
  const res = await IndicatorPeopleLivelihoodList();
  if (res.code === 200) {
    listData.value = res.rows;
    selectValue.value = res.rows[0];
  }
}
let countData = ref({});
async function getCount() {
  const res = await IndicatorPeopleLivelihoodBsInfo();
  if (res.code === 200) {
    countData.value = res.data;
  }
}
let selectValue = ref({});
let currentIndex = ref(0);
function selectChange(row, index) {
  selectValue.value = row;
  currentIndex.value = index;
}
function dialogClose() {
  dialog.value = false;
  // selectValue.value = {};
  value.value = '';
}
watch(governmentData, (n, o) => {});
let dialog = ref(false);
let value = ref('');
const options = [
  {
    value: '项目1',
    label: '项目1',
  },
  {
    value: '项目2',
    label: '项目2',
  },
  {
    value: '项目3',
    label: '项目3',
  },
  {
    value: '项目4',
    label: '项目4',
  },
  {
    value: '项目5',
    label: '项目6',
  },
];
onMounted(() => {
  getList();
  getCount();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.left2 {
  margin-top: 14px;
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
    margin-top: 10px;
    .list {
      .item {
        color: #ffffff;
        margin-top: 10px;
        .item-title {
          .text {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
          }
        }
        .item-info {
          padding-left: 12px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .items {
            flex: 1;
            .name {
              width: 32px;
              height: 22px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 16px;
              color: #ffffff;
              margin-right: 30px;
            }
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
              margin: 0 10px 0 0;
            }
            .view {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 14px;
              color: #73d5e5;
              cursor: pointer;
              position: relative;
            }
          }
        }
      }
    }
  }
  .dialog-info {
    width: 700px;
    height: 308px;
    box-sizing: border-box;
    .dialog-tabs {
      display: flex;
      .dialog-tab {
        margin: 0 24px 0 0;
        cursor: pointer;
      }
    }
    .dialogChange {
      border-bottom: 2px solid #46f8fd;
    }
    .dialog-title {
      font-size: 16px;
      font-weight: 600;
      color: #fff;
      margin: 24px 0 0 0;
    }
    .dialog-value {
      margin: 24px 0 0 0;
    }
    .rank-box {
      margin: 24px 0 0 0;
      .rank-title {
        font-size: 16px;
        font-weight: 600;
        color: #fff;
        display: flex;
        justify-content: space-between;
        .number {
          color: #fff;
          font-size: 14px !important;
        }
      }

      .el-progress {
        margin: 20px 0 0 0;
      }
    }
  }
}
:deep(.el-input) {
  --el-input-bg-color: rgb(205 245 255 / 0%);
}
</style>
