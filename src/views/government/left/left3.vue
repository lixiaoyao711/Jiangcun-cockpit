<template>
  <div class="left2">
    <div class="title">
      <div class="left">
        <img src="@/assets/image/lsjt.png" alt="" />
        <div class="text">城管城建年度考核指标</div>
      </div>
      <!-- <div class="right">
        <TitleIcon></TitleIcon>
      </div> -->
    </div>
    <div class="info">
      <div class="list">
        <div class="item">
          <div class="item-left">城管主要考核指标</div>
          <div @click="dialog = true" class="item-right">查看全部</div>
        </div>
        <div class="sub-item">
          <div class="item-title">
            <div class="title-left">
              <el-icon><CaretRight /></el-icon>
              <span class="text">城建</span>
            </div>
          </div>
          <div class="item-info">
            <div class="item">
              <span class="name">精品物业</span>
              <div class="count">
                <span class="number">{{ showDataMap('数字政府', '1749641293585448961').value }}</span>
                <span class="unit">{{ showDataMap('数字政府', '1749641293585448961').unit }}</span>
              </div>
            </div>
            <div class="item">
              <span class="name">城市体检</span>
              <div class="count">
                <span class="number">{{ showDataMap('数字政府', '1749641352850964481').value }}</span>
                <span class="unit">{{ showDataMap('数字政府', '1749641352850964481').unit }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog title="城管考核指标" @close="dialog = false" v-if="dialog">
      <template v-slot:content>
        <div class="veteran-dialog-content">
          <Tabs @tabChange="getList" :propsData="tabsData" v-model:index="tabIndex" />
          <div class="table">
            <table>
              <thead>
                <tr class="thead">
                  <th>日期</th>
                  <th>排名</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in tableData" :key="index">
                  <td style="width: 140px">{{ item.date }}</td>
                  <td style="width: 100px">{{ item.rank }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <el-pagination
            v-model:current-page="query.pageNum"
            v-model:page-size="query.pageSize"
            :page-sizes="[10, 50, 100, 200]"
            :small="small"
            :background="true"
            layout="sizes, prev, pager, next"
            :total="total"
            @size-change="getList"
            @current-change="getList"
          />
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
import { showDataMap } from '@/utils/common';
import { IndicatorSetTableTrendsList } from '@/api/index';
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const governmentData = computed(() => {
  return store.state.governmentData;
});
watch(governmentData, (n, o) => {});
let query = ref({
  pageNum: 1,
  pageSize: 10,
  orderByColumn: 'updateTime',
  isAsc: 'desc',
});
let dialog = ref(false);
let tableData = ref([]);
let tabIndex = ref(0);
let total = ref(0);
const tabsData = ['城市环境整治', '垃圾分类', '五水共治', 'PM2.5平均排名', '生态环境满意度排名', '大综合一体化改革'];
const tabsMap = {
  城市环境整治: 'city-environment',
  垃圾分类: 'garbage-classify',
  五水共治: 'five-water',
  'PM2.5平均排名': 'pm2.5',
  生态环境满意度排名: 'env-satisfaction',
  大综合一体化改革: 'unify-reform',
};
async function getList() {
  console.log('tabsMap[tabsData[tabIndex.value]]', tabsMap[tabsData[tabIndex.value]]);
  const res = await IndicatorSetTableTrendsList(tabsMap[tabsData[tabIndex.value]], query.value);
  if (res.code === 200) {
    tableData.value = res.rows;
    total.value = res.total;
  }
}
onMounted(() => {
  getList();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.left2 {
  margin-top: 10px;
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
    }
  }
  .info {
    padding-left: 26px;
    padding-right: 20px;
    box-sizing: border-box;
    margin-top: 10px;
    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      height: 130px;
      overflow: scroll;
      .item {
        cursor: pointer;
        width: 100%;
        height: 40px;
        background: #1974c31a;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        box-sizing: border-box;
        background: url('@/assets/image/info-bg.png');
        background-size: 100% 100%;
        font-size: 16px;
        .item-left {
          color: #15ffcc;
        }
        .item-right {
          color: #73d5e5;
        }
      }
      .item:nth-child(n + 3) {
        margin: 16px 0 0 0;
      }
    }
    .sub-item {
      color: #ffffff;
      margin-top: 6px;
      
      .item-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title-right {
          display: flex;
          font-size: 14px;
          color: #73d5e5;
          cursor: pointer;
        }
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
        margin: 12px 0 0 0;
        .item {
          width: 197px;
          height: 50px;
          background: url('@/assets/image/home-iten-bg.png');
          background-size: 100% 100%;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 16px;
          margin: 0 6px 0 0;
          box-sizing: border-box;
          .count {
            .number {
              font-weight: 700;
              font-size: 28px;
              color: #e0fffe;
              margin: 0 14px 0 0;
            }
          }
        }
        .items {
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
          }
        }
      }
    }
  }

  .dialog {
    background: rgba(13, 24, 101, 0.9);
    border-radius: 16px;
    min-width: 400px;
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    padding: 16px 30px 30px 30px;
    box-sizing: border-box;
    .title-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title-text {
        font-family: PingFangSC-Regular;
        font-weight: 600;
        font-size: 16px;
        color: #ffffff;
      }
      .el-icon {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .dialog-info {
      margin: 30px 0 0 0;
      .info-data {
        margin: 16px 0 0 0;
        .info-data-title {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
        }
        .text {
          color: #fff;
          margin: 10px 0 0 0;
        }
      }
      .rank-box {
        margin: 60px 0 0 0;

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
}

:deep(.el-input) {
  --el-input-bg-color: rgb(205 245 255 / 0%);
}
.veteran-dialog-content {
  width: 820px;
  height: 460px;
  overflow: scroll;
  .table {
    height: 80%;
    overflow: scroll;
  }
  table {
    width: 100%;

    border-collapse: collapse;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 18px;
    color: #ffffff;
    letter-spacing: 0;
    margin: 10px 0 0 0;
    thead {
      th {
        background: #23448e;
        padding: 10px;
        box-sizing: border-box;
      }
      tr {
        background-image: linear-gradient(180deg, #2e53a7 0%, #21376f 100%);
        border: 1px solid #6175a9;
        box-shadow: inset 0 1px 3px 0 #86d9ff80;
      }
    }
    tbody {
      tr:nth-child(odd) {
        background: #1d2c53;
      }
      tr:nth-child(even) {
        background: #0f1c3f;
      }
      tr {
        margin: 10px 0 0 0;
      }
    }
    td {
      text-align: center;
      padding: 10px;
      box-sizing: border-box;
    }
  }
}
.el-pagination {
  float: right;
  margin: 10px 0 0 0;
}
</style>
