<template>
  <div class="left1">
    <div class="title">
      <div class="left">
        <img class="title-img" src="@/assets/image/lsjt.png" alt="" />
        <div class="text">“1234”机制</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="info">
      <Tabs :propsData="tabsData" v-model:index="currentIndex"></Tabs>
      <div class="content1" v-if="currentIndex === 0">
        <div class="sub-title">
          <el-icon><CaretRight /></el-icon>
          <div class="text">助企平台</div>
        </div>
        <div class="scroll-box" @click="oepnUrl">
          <div class="item" >
            <el-icon><Orange /></el-icon>
            <span>管理平台</span>
            <el-icon><Promotion /></el-icon>
          </div>
        </div>
      </div>
      <div class="content1" v-if="currentIndex === 1">
        <div class="sub-title">
          <el-icon><CaretRight /></el-icon>
          <div class="text">双千服务</div>
        </div>
        <div class="list current-list">
          <div class="item">
            <img src="@/assets/image/sqfw.webp" alt="" />
            <div class="item-content">
              <div class="item-name">双千服务企业家</div>
              <div class="item-value">{{ economicData['数字经济-"1234"机制-二套服务体系-双千服务-双千服务企业家']?.value }}</div>
            </div>
          </div>
          <div class="item">
            <img src="@/assets/image/sqgb.webp" alt="" />
            <div class="item-content">
              <div class="item-name">双千干部</div>
              <div class="item-value">{{ economicData['数字经济-"1234"机制-二套服务体系-双千服务-双千干部']?.value }}</div>
            </div>
          </div>
        </div>
        <div class="content-title">
          <div class="name">组团式服务</div>
          <div class="number" v-if="tableList[0]">{{ tableList[0].length }}</div>
          <div class="unit">组</div>
        </div>
        <vue3-seamless-scroll :list="tableList[0]" class="scroll-box" :step="0.5" :hover="true">
          <div class="item" v-for="(item, index) in tableList[0]" :key="index">{{ item.name }}</div>
        </vue3-seamless-scroll>
      </div>
      <div class="content2" v-if="currentIndex === 2">
        <div class="list">
          <div class="item" v-for="(item, index) in tableList[2]" :key="index">
            <div class="name">{{ item.name }}</div>
            <div class="value">{{ item.value }}人</div>
          </div>
        </div>

        <!-- <vue3-seamless-scroll :list="threenList" class="window" :step="0.5" :hover="true"> -->
        <div class="window">
          <div class="n-word">“N”</div>
          <div class="threen-list">
            <div class="threen" v-for="(item, index) in threenList" :key="index">
              <span class="threen-name">{{ item.name }}</span>
              <span class="threen-value">{{ item.value }}人</span>
            </div>
          </div>
          <!-- <div class="threen  n">
            <span class="threen-name">“N”</span>
            <span class="threen-value"></span>
          </div> -->
        </div>
        <!-- </vue3-seamless-scroll> -->
      </div>
      <div class="content3" v-if="currentIndex === 3">
        <div class="list">
          <div class="item" @click="openDialog(item)" v-for="(item, index) in tableList[3]" :key="index">
            <img src="@/assets/image/book.png" alt="" />
            <div class="name">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <Dialog title="考核方案" @close="dialog = false" v-if="dialog">
      <template v-slot:content>
        <div class="dialog-content">
          <div class="dialog-title">{{ dialogData.name }}</div>
          <div class="dialog-window" v-html="dialogData.content"></div>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import store from '@/store';
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import { IndicatorSetTableTrendsList } from '@/api/index';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
let tabsData = ['一套应用体系', '二套服务体系', '三级服务力量', '四套考核方案'];
let currentIndex = ref(0);
let tableList = ref({});
let threenList = ref({});
let dialog = ref(false);
let dialogData = ref({});
const economicData = computed(() => {
  return store.state.economicData;
});
async function initListData() {
  const res = await IndicatorSetTableTrendsList('service_system');
  if (res.code === 200) {
    tableList.value[0] = res.rows;
  }
  const ret = await IndicatorSetTableTrendsList('assessment_scheme');
  console.log('rer', ret);
  if (ret.code === 200) {
    tableList.value[3] = ret.rows;
  }
  tableList.value[2] = [
    {
      name: '区管干部',
      value: economicData.value['数字经济-"1234"机制-三级服务力量-区管干部'].value,
      unit: economicData.value['数字经济-"1234"机制-三级服务力量-区管干部'].unit,
    },
    {
      name: '经合社书记',
      value: economicData.value['数字经济-"1234"机制-三级服务力量-经合社书记'].value,
      unit: economicData.value['数字经济-"1234"机制-三级服务力量-经合社书记'].unit,
    },
    {
      name: '企服中心',
      value: economicData.value['数字经济-"1234"机制-三级服务力量-企服中心'].value,
      unit: economicData.value['数字经济-"1234"机制-三级服务力量-企服中心'].unit,
    },
  ];
  threenList.value = [
    {
      name: '工商所',
      value: economicData.value['数字经济-"1234"机制-三级服务力量-工商所'].value,
    },
    {
      name: '派出所',
      value: economicData.value['数字经济-"1234"机制-三级服务力量-派出所'].value,
    },
    {
      name: '执法中队',
      value: economicData.value['数字经济-"1234"机制-三级服务力量-执法中队'].value,
    },
    {
      name: '司法所',
      value: economicData.value['数字经济-"1234"机制-三级服务力量-司法所'].value,
    },
    {
      name: '蒋村物业联盟数量',
      value: economicData.value['数字经济-"1234"机制-三级服务力量-蒋村物业联盟'].value,
    },
  ];
  console.log('tab', tableList.value);
}
function openDialog(row) {
  dialogData.value = row;
  dialog.value = true;
}
function oepnUrl() {
  window.open(economicData.value['数字经济-"1234"机制-一套应用体系-助企平台-平台链接']?.value);
}

watch();
onMounted(() => {
  initListData();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.left1 {
  margin: 20px 0 0 0;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    height: 350px;
    overflow: scroll;
    .sub-title {
      display: flex;
      align-items: center;
      color: #fff;
      margin: 12px 0 0 0;
      .text {
        margin: 0 0px 0 6px;
      }
    }
    .content {
      .content-title {
        display: flex;
        align-items: center;
        margin: 20px 0 0 0;
        .name {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          margin: 0 24px 0 0;
        }
        .number {
          font-family: DINAlternate-Bold;
          font-weight: 700;
          font-size: 26px;
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
    .content1 {
      // padding: 0px 66px 0 12px;
      box-sizing: border-box;
      .content-title {
        display: flex;
        align-items: center;
        margin: 14px 0 0 0;
        .name {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          margin: 0 24px 0 0;
        }
        .number {
          font-family: DINAlternate-Bold;
          font-weight: 700;
          font-size: 26px;
          line-height: 1;
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
      .scroll-box {
        margin: 24px 0 0 0;
        height: 120px;
        overflow: scroll;
        .item {
          width: 442px;
          height: 48px;
          border-radius: 8px;
          background: url('@/assets/image/info-bg.png');
          background-size: 100% 100%;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #73D5E5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 18px 0 18px;
          box-sizing: border-box;
          margin-bottom: 12px;
          // margin: 12px 0 0 0;
          span{
            flex: 1;
            margin-left: 12px;
          }
        }
      }
      .list {
        margin: 16px 0 0 0;
        display: flex;
        justify-content: space-between;
        height: 104px;
        .item {
          display: flex;
          img {
            width: 55px;
            height: 55px;
            margin: 0 16px 0 0;
          }
          .item-content {
            .item-name {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 16px;
              color: #ffffff;
            }
            .item-value {
              font-family: DINAlternate-Bold;
              font-weight: 700;
              font-size: 28px;
              color: #e0fffe;
            }
          }
        }
      }
      .current-list {
        height: 60px;
        padding: 0 24px;
      }
      .sub-text {
        margin: 18px 0 0 6px;
        font-family: PingFangSC-SNaNpxibold;
        font-weight: 600;
        font-size: 16px;
        color: #73d5e5;
        cursor: pointer;
        display: flex;
        align-items: center;
        .el-icon {
          margin: 0 6px 0 0;
        }
      }
    }
    .content2 {
      .list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 6px 0 0 0;
        .item {
          margin: 12px 0 0 0;
          width: 48%;
          height: 40px;
          background: #74beff3d;
          border-radius: 4px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 18px;
          box-sizing: border-box;
        }
      }
      .window {
        background: url('@/assets/image/info-bg.png');
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        overflow: scroll;
        height: 110px;
        border-radius: 8px;
        margin: 36px 0 0 0;
        padding: 10px 0;
        box-sizing: border-box;
        position: relative;
        &::before, &::after{
          content: '';
          position: absolute;
          height: 90px;
          width: 0;
          border-left: 1px solid #ffffff80;
          top: 10px;
          left: 68px;
        }
        &::after{
          left: 260px;
        }
        .n-word {
          font-family: Arial-Black;
          font-weight: 900;
          font-size: 24px;
          color: #ccfaff;
          width: 68px;
          height: 100%;
          place-items: center;
          display: flex;
        }
        .threen-list{
          flex: 1;
          display: flex;
          // flex-direction: column;
          flex-wrap: wrap;
        }
        .threen {
          width: 190px;
          height: 28px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ccfaff;
          padding: 0 10px;
          box-sizing: border-box;
          display: flex;
          margin: 0px 0 0 0;
          justify-content: space-between;
          .threen-name {
            width: 130px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .threen-value {
            width: 40px;
            text-align: right;
            white-space: nowrap;
          }
        }
        .threen-last {
          margin: 0 30px 0 0;
        }
        .threen:nth-child(odd) {
          // border-right: 1px solid #ffffff80;
        }
      }
    }
    .content3 {
      max-height: 280px;
      margin-top: 30px;
      overflow: scroll;
      .list {
        .item {
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 0 0 0 10px;
          margin: 8px 0 0 0;
          background: url('@/assets/image/info-bg.png');
          background-size: 100% 100%;
          height: 47px;
          img {
            width: 36px;
            height: 28px;
            margin: 0 14px 0 0;
          }
          .name {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: #73d5e5;
          }
        }
      }
    }
  }
  .dialog-content {
    width: 680px;
    height: 429px;
    overflow: scroll;
    .dialog-title {
      font-family: PingFangSC-Medium;
      font-weight: 500;
      font-size: 20px;
      color: #73d5e5;
    }
    .dialog-window {
      // width: 632px;
      // height: 337px;
      // overflow: scroll;
      // // background-image: linear-gradient(90deg, #6ca7ff33 0%, #4366ff4d 100%);
      // margin: 16px 0 0 0;
      // background: url('@/assets/image/home-iten-bg.png');
      // background-size: 100% 100%;
      // border-radius: 8px;
      padding: 16px;
      box-sizing: border-box;
    }
  }
}
</style>
