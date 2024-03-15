<template>
  <div class="left1">
    <div class="title">
      <div class="left">
        <img src="@/assets/image/lsjt.png" alt="" />
        <div class="text">“1516”体系</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="sub1">
      <div class="sub-title">
        <el-icon><CaretRight /></el-icon>
        <div class="text">指挥中心</div>
      </div>
      <div class="item" v-for="(item, index) in sub1Data" :key="index">
        <div class="leder">{{ item.leder }}</div>
        <div class="name">{{ item.name }}</div>
        <div class="phone">{{ item.phone }}</div>
      </div>
    </div>
    <div class="sub2">
      <div class="sub-title">
        <el-icon><CaretRight /></el-icon>
        <div class="text">五级人员力量</div>
      </div>
      <Tabs :propsData="tabsData" v-model:index="currentIndex" />
      <div class="tab-list">
        <div class="item" v-for="(item, index) in sub2Data[tabsData[currentIndex]]" :key="index">
          <div class="name">{{ item.leder }}</div>
          <div class="right">
            <span class="number">{{ item.value }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="sub3">
      <div class="sub-title">
        <el-icon><CaretRight /></el-icon>
        <div class="text">一套网格体系</div>
      </div>
      <div class="tab-list">
        <div class="item" v-for="(item, index) in sub3Data" :key="index">
          <div class="name">{{ item.leder }}</div>
          <div class="right">
            <span class="number">{{ item.value }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="sub4">
      <div class="sub-title">
        <el-icon><CaretRight /></el-icon>
        <div class="text">六项工作体系</div>
      </div>
      <div class="list">
        <div class="item" @click="openDialog(item)" v-for="(item, index) in sub4Data" :key="index">
          <img src="@/assets/image/book.png" alt="" />
          <span class="text">{{ item.leder }}</span>
        </div>
      </div>
    </div>
    <Dialog :title="dialogData.leder" @close="isShowDialog = false" v-if="isShowDialog">
      <template v-slot:content>
        <div class="dialog-content">
          <div v-html="dialogData.value"></div>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import store from '@/store';
import { IndicatorLevelFivePowerList, IndicatorEnforcementTeamList } from '@/api/index';
import { showDataMap } from '@/utils/common';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const ruleOflawData = computed(() => {
  return store.state.ruleOflawData;
});
let isShowDialog = ref(false);
let dialogData = ref({});
function openDialog(row) {
  isShowDialog.value = true;
  dialogData.value = row;
}
let sub1Data = ref([]);
let sub2Data = ref([]);
let sub3Data = ref([]);
let sub4Data = ref([]);
let sub5Data = ref([]);
let tabsData = ['群防群治', '网格员', '物业联盟', '部门平台', '综合执法'];
let currentIndex = ref(0);
async function getFiveList() {
  const res = await IndicatorLevelFivePowerList();
  const ret = await IndicatorEnforcementTeamList();

  if (res.code === 200) {
    sub2Data.value = {
      群防群治: [
        {
          leder: '党员干部',
          value: res.rows.filter((item) => item.type === '群防群治队伍-党员干部').length,
          unit: '人',
        },
        {
          leder: '居民小组长',
          value: res.rows.filter((item) => item.type === '群防群治队伍-居民小组长').length,
          unit: '人',
        },
        {
          leder: '股民代表',
          value: res.rows.filter((item) => item.type === '群防群治队伍-股民代表').length,
          unit: '人',
        },
        {
          leder: '楼道长',
          value: res.rows.filter((item) => item.type === '群防群治队伍-楼道长').length,
          unit: '人',
        },
        {
          leder: '热心群众',
          value: res.rows.filter((item) => item.type === '群防群治队伍-热心群众').length,
          unit: '人',
        },
      ],
      网格员: [
        {
          leder: '网格员',
          value: res.rows.filter((item) => item.type === '网格员队伍-网格员').length,
          unit: '人',
        },
      ],
      物业联盟: [
        {
          leder: '主管',
          value: res.rows.filter((item) => item.type === '物业联盟队伍-主管').length,
          unit: '人',
        },
        {
          leder: '保安',
          value: res.rows.filter((item) => item.type === '物业联盟队伍-保安').length,
          unit: '人',
        },
      ],
      部门平台: [
        {
          leder: '公安',
          value: res.rows.filter((item) => item.type === '部门平台队伍-公安').length,
          unit: '人',
        },
        {
          leder: '交警',
          value: res.rows.filter((item) => item.type === '部门平台队伍-交警').length,
          unit: '人',
        },
        {
          leder: '城管',
          value: res.rows.filter((item) => item.type === '部门平台队伍-城管').length,
          unit: '人',
        },
        {
          leder: '市场监管',
          value: res.rows.filter((item) => item.type === '部门平台队伍-市场监管').length,
          unit: '人',
        },
        {
          leder: '司法所',
          value: res.rows.filter((item) => item.type === '部门平台队伍-司法所').length,
          unit: '人',
        },
        {
          leder: '国土',
          value: res.rows.filter((item) => item.type === '部门平台队伍-国土').length,
          unit: '人',
        },
        {
          leder: '劳动监察',
          value: res.rows.filter((item) => item.type === '部门平台队伍-劳动监察').length,
          unit: '人',
        },
      ],
      综合执法: [
        {
          leder: '执法队伍',
          value: showDataMap('数字法治', '1582678742403391490').value,
          unit: showDataMap('数字法治', '1582678742403391490').unit,
        },
      ],
    };
  }
}
function getData() {
  sub1Data.value = [
    {
      leder: '指挥长',
      name: ruleOflawData.value['数字法治-指挥中心-指挥长姓名'].value,
      phone: ruleOflawData.value['数字法治-指挥中心-指挥长电话'].value,
    },
    {
      leder: '综合调度岗',
      name: ruleOflawData.value['数字法治-指挥中心-综合调度岗姓名'].value,
      phone: ruleOflawData.value['数字法治-指挥中心-综合调度岗电话'].value,
    },
    {
      leder: '视频巡查岗',
      name: ruleOflawData.value['数字法治-指挥中心-视频巡查岗姓名'].value,
      phone: ruleOflawData.value['数字法治-指挥中心-视频巡查岗电话'].value,
    },
    {
      leder: '信息研判岗',
      name: ruleOflawData.value['数字法治-指挥中心-信息研判岗姓名'].value,
      phone: ruleOflawData.value['数字法治-指挥中心-信息研判岗电话'].value,
    },
    {
      leder: '事件流转岗',
      name: ruleOflawData.value['数字法治-指挥中心-事件流转岗姓名'].value,
      phone: ruleOflawData.value['数字法治-指挥中心-事件流转岗电话'].value,
    },
  ];
  // sub2Data.value = {
  //   群防群治: [
  //     {
  //       leder: '党员干部',
  //       value: ruleOflawData.value['数字法治-五级人员力量-群防群治队伍-党员干部'].value,
  //       unit: '人',
  //     },
  //     {
  //       leder: '居民小组长',
  //       value: ruleOflawData.value['数字法治-五级人员力量-群防群治队伍-居民小组长'].value,
  //       unit: '人',
  //     },
  //     {
  //       leder: '股民代表',
  //       value: ruleOflawData.value['数字法治-五级人员力量-群防群治队伍-股民代表'].value,
  //       unit: '人',
  //     },
  //     {
  //       leder: '楼道长',
  //       value: ruleOflawData.value['数字法治-五级人员力量-群防群治队伍-楼道长'].value,
  //       unit: '人',
  //     },
  //     {
  //       leder: '热心群众',
  //       value: ruleOflawData.value['数字法治-五级人员力量-群防群治队伍-热心群众'].value,
  //       unit: '人',
  //     },
  //   ],
  //   网格员: [
  //     {
  //       leder: '党员干部',
  //       value: ruleOflawData.value['数字法治-五级人员力量-网格员队伍-网格员'].value,
  //       unit: '人',
  //     },
  //   ],
  //   物业联盟: [
  //     {
  //       leder: '主管',
  //       value: ruleOflawData.value['数字法治-五级人员力量-物业联盟队伍-主管'].value,
  //       unit: '人',
  //     },
  //     {
  //       leder: '保安',
  //       value: ruleOflawData.value['数字法治-五级人员力量-物业联盟队伍-保安'].value,
  //       unit: '人',
  //     },
  //   ],
  //   部门平台: [
  //     {
  //       leder: '公安',
  //       value: ruleOflawData.value['数字法治-五级人员力量-部门平台队伍-公安'].value,
  //       unit: '人',
  //     },
  //     {
  //       leder: '交警',
  //       value: ruleOflawData.value['数字法治-五级人员力量-部门平台队伍-交警'].value,
  //       unit: '人',
  //     },
  //     {
  //       leder: '城管',
  //       value: ruleOflawData.value['数字法治-五级人员力量-部门平台队伍-城管'].value,
  //       unit: '人',
  //     },
  //     {
  //       leder: '市场监管',
  //       value: ruleOflawData.value['数字法治-五级人员力量-部门平台队伍-市场监管'].value,
  //       unit: '人',
  //     },
  //     {
  //       leder: '司法所',
  //       value: ruleOflawData.value['数字法治-五级人员力量-部门平台队伍-司法所'].value,
  //       unit: '人',
  //     },
  //     {
  //       leder: '国土',
  //       value: ruleOflawData.value['数字法治-五级人员力量-部门平台队伍-国土'].value,
  //       unit: '人',
  //     },
  //     {
  //       leder: '劳动监察',
  //       value: ruleOflawData.value['数字法治-五级人员力量-部门平台队伍-劳动监察'].value,
  //       unit: '人',
  //     },
  //   ],
  //   综合执法: [
  //     {
  //       leder: '党员干部',
  //       value: ruleOflawData.value['数字法治-五级人员力量-综合执法队伍-执法队伍'].value,
  //       unit: '个',
  //     },
  //   ],
  // };
  sub3Data.value = [
    {
      leder: '执法圈',
      value: ruleOflawData.value['数字法治-一套网格体系-联合执法片'].value,
      unit: ruleOflawData.value['数字法治-一套网格体系-联合执法片'].unit,
    },
    {
      leder: '防范区域',
      value: ruleOflawData.value['数字法治-一套网格体系-风险防控区'].value,
      unit: ruleOflawData.value['数字法治-一套网格体系-风险防控区'].unit,
    },
    {
      leder: '网格',
      value: ruleOflawData.value['数字法治-一套网格体系-基层网格'].value,
      unit: ruleOflawData.value['数字法治-一套网格体系-基层网格'].unit,
    },
    {
      leder: '微网格',
      value: ruleOflawData.value['数字法治-一套网格体系-微网格'].value,
      unit: ruleOflawData.value['数字法治-一套网格体系-微网格'].unit,
    },
    {
      leder: '问题清单',
      value: ruleOflawData.value['数字法治-一套网格体系-问题清单'].value,
      unit: ruleOflawData.value['数字法治-一套网格体系-问题清单'].unit,
    },
  ];
  sub4Data.value = [
    {
      leder: '工作会商机制',
      value: ruleOflawData.value['数字法治-六项工作机制-工作会商机制'].value,
    },
    {
      leder: '社会面排摸稳控机制',
      value: ruleOflawData.value['数字法治-六项工作机制-社会面排摸稳控机制'].value,
    },
    {
      leder: '培训演练机制',
      value: ruleOflawData.value['数字法治-六项工作机制-培训演练机制'].value,
    },
    {
      leder: '应急处置机制',
      value: ruleOflawData.value['数字法治-六项工作机制-应急处置机制'].value,
    },
    {
      leder: '考核奖励机制',
      value: ruleOflawData.value['数字法治-六项工作机制-考核奖励机制'].value,
    },
    {
      leder: '晒单亮绩机制',
      value: ruleOflawData.value['数字法治-六项工作机制-晒单亮绩机制'].value,
    },
  ];
}
watch();
onMounted(() => {
  setTimeout(() => {
    getData();
    getFiveList();
  }, 500);
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.left1 {
  padding: 0 26px 0 22px;
  box-sizing: border-box;
  margin-top: 28px;
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
  .sub-title {
    padding: 0 0 0 14px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .el-icon {
      font-size: 20px;
      color: #ffffff;
    }
    .text {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
      margin-left: 16px;
    }
  }
  .sub1 {
    padding: 0 16px 0 0;
    box-sizing: border-box;
    margin-top: 20px;
    height: 180px;
    overflow: auto;
    .item {
      margin-top: 12px;
      // width: 425px;
      height: 40px;
      background-image: linear-gradient(90deg, rgba(108, 167, 255, 0.2) 0%, rgba(67, 102, 255, 0.3) 100%);
      border-radius: 8px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
      display: flex;
      align-items: center;
      padding: 0 0 0 22px;
      box-sizing: border-box;
      justify-content: space-around;
    }
    .item > div {
      flex: 1;
    }
  }
  .sub2,
  .sub3 {
    margin: 20px 0 0 0;
    .item:not(:first-child) {
      margin-top: 16px;
    }
    .item {
      // margin-top: 16px;
      height: 44px;
      background: rgba(116, 190, 255, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      box-sizing: border-box;
      .name {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
      }
      .right {
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
  .sub4 {
    margin-top: 10px;
    .list {
      padding: 6px 0 0 20px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      // align-items: center;
      position: relative;
      .item:nth-child(2n-1) {
        margin: 20px 64px 0 0;
      }
      .item {
        display: flex;
        align-items: center;
        margin: 20px 0px 0 0;
        cursor: pointer;
        img {
          width: 36px;
          height: 28px;
          font-family: AppleColo0pxoji;
          font-size: 36px;
          color: #ffffff;
          margin: 0 8px 0 0;
        }
        .text {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #73d5e5;
        }
      }
    }
  }
  .tab-list {
    height: 120px;
    overflow: scroll;
    margin: 16px 0 0 0;
  }
  .tab-list1 {
    height: 120px;
    // overflow: scroll;
    margin: 16px 0 0 0;
    display: flex;
    align-items: center;
    width: 100%;
    .item {
      width: 100%;
    }
  }
  .tab-list::-webkit-scrollbar {
    display: none;
  }
  .dialog {
    background: rgba(13, 24, 101, 0.9);
    border-radius: 16px;
    min-width: 500px;
    position: absolute;

    // right: 0%;
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
      margin: 26px 0 0 0;
      color: #fff;
    }
  }
  .dialog-content {
    min-width: 200px;
  }
}

/* 去除滚动条 */
::-webkit-scrollbar {
  display: none;
}
</style>
