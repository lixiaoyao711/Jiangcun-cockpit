<template>
  <div class="right2">
    <div class="title">
      <div class="left">
        <img src="@/assets/image/lsjt.png" alt="" />
        <div class="text">高颜值守护</div>
      </div>
      <div class="right"></div>
    </div>
    <div class="content1">
      <div class="item-title">
        <div class="left">
          <el-icon><CaretRight /></el-icon>
          <span class="text">五水共治</span>
        </div>
        <div class="right">
          <span @click="fiveDialog = true"> 查看详情 </span>
          <TitleIcon :type="typeMap[governmentData['数字政府-高标颜值守护-五水共治-考核名次'].value]" />
        </div>
      </div>
      <div class="info">
        <div class="rank">
          <div class="rank-box-left">
            <div class="rank-icon"></div>
            <div class="rank-name">水质等级</div>
            <div class="rank-value">{{ governmentData['数字政府-高标颜值守护-五水共治-水质等级'].value }}级</div>
          </div>
          <div class="rank-box-right">
            <div class="rank-name">巡河率</div>
            <div class="rank-value">{{ governmentData['数字政府-高标颜值守护-五水共治-巡河率'].value }}%</div>
          </div>
        </div>
        <div class="water-window">
          <div class="water-window-title">污水零直排项目进度</div>
          <div class="value-box">{{ governmentData['数字政府-高标颜值守护-五水共治-污水零直排项目进度'].value }}%</div>
        </div>
      </div>
    </div>
    <div class="content2">
      <div class="item-title">
        <div class="left">
          <el-icon><CaretRight /></el-icon>
          <span class="text">生态环保</span>
        </div>
        <div class="right">
          <TitleIcon :type="typeMap[governmentData['数字政府-高标颜值守护-生态环保-考核名次'].value]" />
        </div>
      </div>
      <div class="info">
        <div class="list">
          <div class="item">
            <div class="name">空气质量</div>
            <div class="value-box">
              <div class="value">{{ showDataMap('数字政府', '1640980157374439425').value }}</div>
              <div class="unit"></div>
            </div>
          </div>
          <div class="item">
            <div class="name">在线油烟监测装置安装</div>
            <div class="value-box">
              <div class="value">{{ governmentData['数字政府-高标颜值守护-生态环保-在线油烟监测装置安装'].value }}</div>
              <div class="unit">个</div>
            </div>
          </div>
          <div class="item">
            <div class="name">工地数量</div>
            <div class="value-box">
              <div class="value">{{ ecologyList.length }}</div>
              <div class="unit">个</div>
            </div>
          </div>
          <div class="item">
            <div class="name">建设进度</div>
            <div class="rank-box">
              <!-- <div class="rank" :style="{ width: `${rankData.speedProgress}%` }"></div> -->
              <el-progress :percentage="rankData.speedProgress" :text-inside="true" stroke-width="18" color="#fda646" />
            </div>
            <div class="item-info" @click="dialog = true">详情</div>
          </div>
        </div>
      </div>
    </div>
    <Dialog :title="'各工地建设情况'" @close="dialog = false" v-if="dialog">
      <template v-slot:content>
        <div class="dialog-info">
          <div class="dialog-item" v-for="(item, index) in ecologyList" :key="index">
            <div class="dialog-item-title">{{ item.name }}</div>
            <div class="dialog-info-data">
              <div class="item1">
                <span>进度：</span><span class="numer">{{ item.speedProgress }}%</span>
              </div>
              <div class="item2">PM2.5：{{ item.pmValue }}</div>
              <div class="item3">预计竣工：{{ item.expectedCompletion }}</div>
              <div class="item4">地址：{{ item.address }}</div>
            </div>
          </div>
        </div>
      </template>
    </Dialog>
    <Dialog :title="'五水共治'" @close="fiveDialog = false" v-if="fiveDialog">
      <template v-slot:content>
        <div class="five-dialog-info">
          <div class="top-item">
            <div class="name">自查自纠问题</div>
            <!-- <div class="value">{{ governmentData['数字政府-高标准管控-垃圾分类-自查自纠问题'].value }}</div> -->
            <div class="value">{{ showDataMap('数字政府', '1640979308912877569').value }}</div>
          </div>
          <div class="item-title">
            <div class="left">
              <el-icon><CaretRight /></el-icon>
              <span class="text">重点项目进度</span>
            </div>
          </div>
          <el-progress :percentage="countData.speedProgress" :text-inside="true" stroke-width="18" color="#46f8fd" />
          <div class="item-title">
            <div class="left">
              <el-icon><CaretRight /></el-icon>
              <span class="text">重点项目明细</span>
            </div>
          </div>
          <div class="center-list">
            <div class="center-item" v-for="(item, index) in fiveWaterList" :key="index">
              <div class="name">{{ item.name }}</div>
              <div class="value">进度：{{ item.speedProgress }}%</div>
            </div>
          </div>
          <div class="item-title">
            <div class="left">
              <el-icon><CaretRight /></el-icon>
              <span class="text">河道水质</span>
            </div>
          </div>
          <div class="center-list">
            <div class="center-item" v-for="(item, index) in waterList" :key="index">
              <div class="name">{{ item.name }}</div>
              <div class="icon">
                <div class="footer-value">{{ item.level }}</div>
                <!-- <div class="footer-value"></div>
                <div class="footer-value"></div> -->
              </div>
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
import {
  IndicatorSetTableTrendsList,
  IndicatorEcologyList,
  IndicatorFiveWaterTreatmentList,
  IndicatorFiveWaterTreatmentBsInfo,
  IndicatorEcologyBsInfo,
} from '@/api/index';
import { showDataMap } from '@/utils/common';

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const governmentData = computed(() => {
  return store.state.governmentData;
});
let typeMap = {
  前列: 'success',
  居中: 'warning',
  靠后: 'danger',
};
let AQIData = ref({});
let fiveDialog = ref(false);
let fiveWaterList = ref([]);
let countData = ref([]);
async function getFiveWaterList() {
  const res = await IndicatorFiveWaterTreatmentList();
  if (res.code === 200) {
    fiveWaterList.value = res.rows;
  }
  const count = await IndicatorFiveWaterTreatmentBsInfo();
  if (res.code === 200) {
    countData.value = count.data;
    console.log('IndicatorFiveWaterTreatmentBsInfo', countData.value);
  }
}
async function getPM25() {
  const res = await axios({
    url: 'https://devapi.qweather.com/v7/air/now?location=101210101&key=aeecf8ccd69d4741aa280aff329143fa',
    method: 'get',
    baseURL: null,
  });
  if (res) {
    AQIData.value = res.data.now;
  }
}
let rankData = ref({});
async function getIndicatorEcologyBsInfoData() {
  const res = await IndicatorEcologyBsInfo();
  if (res.code === 200) {
    rankData.value = res.data;
    rankData.value.speedProgress = rankData.value.speedProgress.toFixed(2);
  }
}
let dialog = ref(false);
let ecologyList = ref([]);
async function getEcologyData() {
  const res = await IndicatorEcologyList();

  if (res.code === 200) {
    ecologyList.value = res.rows;
  }
}
let waterList = ref([]);
async function getWaterList() {
  const res = await IndicatorSetTableTrendsList('river_water_quality');
  if (res.code === 200) {
    waterList.value = res.rows;
  }
}
watch();
onMounted(() => {
  getEcologyData();
  getFiveWaterList();
  getWaterList();
  getPM25();
  getIndicatorEcologyBsInfoData();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.right2 {
  margin-top: 36px;
  padding: 0 32px 0 0;
  box-sizing: border-box;
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
      .icon-box {
        width: 26px;
        height: 26px;
        background: rgba(78, 255, 143, 0.4);
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          width: 18px;
          height: 18px;
          background: #4eff8f;
          border-radius: 30px;
        }
      }
    }
  }
  .item-title {
    display: flex;
    justify-content: space-between;
    padding: 0 20px 0 0;
    box-sizing: border-box;
    margin: 24px 0 0 0;
    .left {
      display: flex;
      align-items: center;
    }
    .right {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 14px;
      color: #73d5e5;
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      .icon-box {
        width: 26px;
        height: 26px;
        background: rgba(255, 189, 78, 0.4);
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0 0 16px;
        .icon {
          width: 18px;
          height: 18px;
          background: rgba(255, 189, 78, 1);
          border-radius: 30px;
        }
      }
      .icon-box1 {
        width: 26px;
        height: 26px;
        background: rgba(78, 255, 143, 0.4);
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 0 0 16px;
        .icon {
          width: 18px;
          height: 18px;
          background: rgba(78, 255, 143, 1);
          border-radius: 30px;
        }
      }
    }
    .text {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
    }
    .el-icon {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .content1 {
    .info {
      .rank {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 60px 0 20px;
        box-sizing: border-box;
        margin: 10px 0 0 0;
        .rank-box-left {
          display: flex;
          align-items: center;
          .rank-icon {
            width: 16px;
            height: 22px;
            // background: #3bf685;
            background: url('@/assets/image/水质信息.png');
            background-size: 100% 100%;
            margin: 0 8px 0 0;
          }
          .rank-name {
            font-family: PingFangSC-SNaNpxibold;
            font-weight: 600;
            font-size: 14px;
            color: #ffffff;
            margin: 0 10px 0 0;
          }
          .rank-value {
            font-family: SourceHanSerifCN-Heavy;
            font-weight: 900;
            font-size: 18px;
            color: #ffffff;
          }
        }
        .rank-box-right {
          display: flex;
          align-items: center;
          .rank-name {
            font-family: PingFangSC-SNaNpxibold;
            font-weight: 600;
            font-size: 14px;
            color: #ffffff;
          }
          .rank-value {
            font-family: SourceHanSerifCN-Heavy;
            font-weight: 900;
            font-size: 18px;
            color: #ffffff;
          }
        }
      }
      .water-window {
        // width: 410px;
        height: 34px;
        background: url('@/assets/image/info-bg.png');
        background-size: 100% 100%;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        margin: 16px 0 0 0;
        .water-window-title {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ccfaff;
        }
        .value-box {
          font-family: SourceHanSerifCN-Heavy;
          font-weight: 900;
          font-size: 18px;
          color: #ffffff;
        }
      }
    }
  }
  .content2 {
    .list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 0 0 20px;
      box-sizing: border-box;
      margin: 16px 0 0 0;
      .item {
        color: #ffffff;
        width: 54%;
        // min-width: 40%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
        .value-box {
          display: flex;
          align-items: center;
          .value {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 26px;
            color: #e0fffe;

            margin: 0 14px 0 0;
          }
          .unit {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
          }
        }
        .rank-box {
          width: 107px;
          height: 16px;
          background: #ffffff36;
          border-radius: 11px;
          .rank {
            width: 57.82px;
            height: 16px;
            background: #fda646;
            border-radius: 11px;
          }
        }
        .item-info {
          color: #1492ffff;
          font-size: 16px;
          font-face: PingFangSC;
          cursor: pointer;
        }
      }
      .item:nth-child(odd) {
        width: 38%;
      }
    }
  }
  .dialog-info {
    margin: 26px 0 0 0;
    overflow: scroll;
    height: 400px;
    .dialog-item {
      width: 429px;
      // height: 114px;
      // background: rgba(25, 116, 195, 0.1);
      background: url('@/assets/image/info-bg.png');
      background-size: 100% 100%;
      border-radius: 8px;
      margin: 10px 0 0 0;
      padding: 10px 20px 20px 20px;
      box-sizing: border-box;

      .dialog-item-title {
        font-family: PingFangSC-S0pxibold;
        font-weight: 600;
        font-size: 16px;
        color: #ffffff;
      }
      .dialog-info-data {
        margin: 14px 0 0 0;
        color: #fff;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        font-size: 16px;
        .item1 {
          // width: 73px;
          .numer {
            color: #73d5e5;
          }
        }
        .item2 {
          // width: 100px;
          margin: 0 16px;
        }
        .item4 {
          margin: 14px 0 0 0;
        }
      }
    }
  }
  .five-dialog-info {
    max-height: 500px;
    overflow: scroll;
    .top-item {
      width: 429px;
      height: 43px;
      border-radius: 8px;
      background: url('@/assets/image/home-iten-bg.png');
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 18px;
      box-sizing: border-box;
      margin: 18px 0 0 0;
      .name {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
      }
      .value {
        font-weight: 600;
        font-size: 24px;
        color: #ffffff;
      }
    }
    .el-progress {
      margin: 12px 0 0 0;
    }
    .center-list {
      max-height: 400px;
      overflow: scroll;
      .rubbish-title-item {
        width: 610px;
        height: 47px;

        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 18px;
        box-sizing: border-box;
        margin: 10px 0 0 0;
        .time {
          width: 30%;
          font-weight: 600;
          font-size: 16px;
          color: #ffffff;
          cursor: pointer;
        }
        .name {
          width: 30%;
          font-weight: 400;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
        }
        .value {
          width: 40%;
          font-size: 16px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }
      }
      .rubbish-item {
        width: 610px;
        height: 47px;
        background: url('@/assets/image/info-bg.png');
        background-size: 100% 100%;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 18px;
        box-sizing: border-box;
        margin: 10px 0 0 0;
        .time {
          width: 30%;
        }
        .name {
          width: 30%;
        }
        .value {
          width: 40%;
          font-size: 16px;
          color: #73d5e5;
        }
      }
      .center-item {
        width: 429px;
        height: 47px;
        background: url('@/assets/image/info-bg.png');
        background-size: 100% 100%;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 18px;
        box-sizing: border-box;
        margin: 10px 0 0 0;
        .name {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
        .value {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
        .icon {
          display: flex;
          .footer-value {
            color: #73d5e5;
            // height: 20px;
            // background: #73d5e5;
            // width: 2px;
            // margin: 0 2px;
          }
        }
      }
    }
  }
}
::v-deep .el-progress-bar__innerText {
  color: #000;
}
</style>
