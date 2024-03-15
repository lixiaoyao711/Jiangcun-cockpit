<template>
  <div class="left3">
    <div class="title">
      <div class="left">
        <img class="title-img" src="@/assets/image/lsjt.png" alt="" />
        <div class="text">激发创新活力</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="info">
      <Tabs :propsData="tabsData" v-model:index="currentIndex" />
      <div class="main0" v-show="currentIndex === 0">
        <div class="main0-list">
          <div class="main0-item" v-for="(item, index) in tableList" :key="index">
            <div class="item-title">{{ item.name }}</div>
            <div class="item-content">
              <span class="span-value">{{ item.value }}</span>
              <span class="span-unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="main" v-show="currentIndex === 1">
        <div class="left">
          <div class="info-data">
            <div class="left-box">
              <div class="sub-title">
                <el-icon><CaretRight /></el-icon>
                <div class="text">高校经济项目</div>
              </div>
              <div class="list">
                <div class="item">
                  <div class="item-title">当年个数</div>
                  <div class="value-box">
                    <div class="number">{{ schoolData.yearCount }}</div>
                    <div class="unit">个</div>
                  </div>
                </div>
                <div class="item">
                  <div class="item-title">累计个数</div>
                  <div class="value-box">
                    <div class="number">{{ schoolData.allCount }}</div>
                    <div class="unit">个</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="info-data">
            <div class="left-box">
              <div class="sub-title">
                <el-icon><CaretRight /></el-icon>
                <div class="text">产学研合作</div>
              </div>
              <div class="list">
                <div class="item">
                  <div class="item-title">当年个数</div>
                  <div class="value-box">
                    <div class="number">{{ economicData['数字经济-激发创新活力-产学研合作-当年个数'].value }}</div>
                    <div class="unit">{{ economicData['数字经济-激发创新活力-产学研合作-当年个数'].unit }}</div>
                  </div>
                </div>
                <div class="item">
                  <div class="item-title">累计个数</div>
                  <div class="value-box">
                    <div class="number">{{ economicData['数字经济-激发创新活力-产学研合作-累计个数'].value }}</div>
                    <div class="unit">{{ economicData['数字经济-激发创新活力-产学研合作-累计个数'].unit }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="sub1">
            <div class="tabs">
              <div class="tab" @click="tabClick(0)" :class="tabIndex === 0 ? 'change-tab' : ''">行业类别</div>
              <div class="tab" @click="tabClick(1)" :class="tabIndex === 1 ? 'change-tab' : ''">项目类别</div>
            </div>
            <div class="charts" id="pie"></div>
          </div>
          <div class="sub2">
            <div class="sub-title">
              <el-icon><CaretRight /></el-icon>
              <div class="text">高校经济项目概览</div>
            </div>
            <el-carousel height="60px" direction="vertical" :autoplay="true" indicator-position="none">
              <el-carousel-item v-for="(item, index) in schoolList" :key="index">
                <img @click="openDialog(item)" class="school" :src="item.url" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      <div class="main1" v-if="currentIndex === 2">
        <div class="main1-title">
          <div class="rank-icon"></div>
          <div class="line"></div>
          <div class="main1-window">
            <div class="name">人才团队</div>
            <div class="right">
              <span class="text">{{ economicData['数字经济-激发创新活力-人才引进-人才团队'].value }}</span>
              <span class="unit">{{ economicData['数字经济-激发创新活力-人才引进-人才团队'].unit }}</span>
            </div>
          </div>
        </div>
        <vue3-seamless-scroll :list="progress" class="demo-progress" :hover="true" :step="0.5">
          <el-progress
            v-for="(item, index) in progress"
            :key="index"
            :percentage="(Number(item.peopleSum) / progressSum) * 100"
            :text-inside="true"
            :stroke-width="18"
            :color="colorMap[item.name]"
            :format="(e) => format(item)"
          />
        </vue3-seamless-scroll>
      </div>
    </div>
    <Dialog :title="'项目详情'" @close="dialog = false" v-if="dialog">
      <template v-slot:content>
        <div class="dialog-content">
          <img :src="dialogData.url" alt="" />
          <div class="dialog-content-text">
            <div class="content-title">高校名称</div>
            <div class="content-value">{{ dialogData.name }}</div>
            <div class="content-title">高校介绍</div>
            <div class="content-value">
              {{ dialogData.content }}
            </div>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import store from '@/store';
import * as echarts from 'echarts';
import {
  IndicatorTalentIntroductionList,
  IndicatorCollegeEconomyGetBsInfo,
  IndicatorCollegeEconomyGetBsInfoByIndustrType,
  IndicatorCollegeEconomyGetBsInfoByProjectType,
  IndicatorCollegeEconomyList,
} from '@/api/index';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const economicData = computed(() => {
  return store.state.economicData;
});
let tabsData = ['招大引强', '高校经济', '人才引进'];
let currentIndex = ref(0);
let option = ref({});
let dialog = ref(false);
function format(val) {
  return `${val.name} ${val.peopleSum}`;
}
let progress = ref([]);
let myChart = null;
let charData = ref([]);
let dialogData = ref({});
function openDialog(row) {
  dialogData.value = row;
  dialog.value = true;
}
async function initChart() {
  let chartDemo = document.getElementById('pie');
  myChart = echarts.init(chartDemo);

  if (tabIndex.value === 0) {
    const res = await IndicatorCollegeEconomyGetBsInfoByIndustrType();
    if (res.code === 200) {
      charData.value = res.rows.map((item, i) => {
        item.name = item.typeName;
        item.value = item.allCount;
        return item;
      });
    }
  }
  if (tabIndex.value === 1) {
    const res = await IndicatorCollegeEconomyGetBsInfoByProjectType();
    if (res.code === 200) {
      charData.value = res.rows.map((item) => {
        item.name = item.typeName;
        item.value = item.allCount;
        return item;
      });
    }
  }
  option.value = {
    // title: {
    //   text: 'Referer of a Website',
    //   subtext: 'Fake Data',
    //   left: 'center',
    // },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: '50%',
      top: 'center',
      type: 'scroll',
      tooltip: {
        show: true,
      },
      pageIcons: {
        vertical: [
          'path:M966.4 668.8l-435.2-432c-9.6-9.6-25.6-9.6-35.2 0l-441.6 432c-9.6 9.6-9.6 25.6 0 35.2 9.6 9.6 25.6 9.6 35.2 0l425.6-416 416 416c9.6 9.6 25.6 9.6 35.2 0S976 678.4 966.4 668.8z',
          'path:M966.4 323.2c-9.6-9.6-25.6-9.6-35.2 0l-416 416-425.6-416c-9.6-9.6-25.6-9.6-35.2 0-9.6 9.6-9.6 25.6 0 35.2l441.6 432c9.6 9.6 25.6 9.6 35.2 0l435.2-432C976 345.6 976 332.8 966.4 323.2z',
        ],
      },
      pageIconColor: '#fff',
      pageIconInactiveColor: '#1296db',
      pageTextStyle: {
        color: '#fff',
      },
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: '#fff',
      },
    },
    series: [
      {
        center: ['26%', '50%'],
        name: '',
        type: 'pie',
        radius: ['40%', '70%'],
        label: {
          normal: {
            position: 'inner',
            show: false,
          },
        },
        data: charData.value,
        labelLine: {
          show: false,
        },
        // emphasis: {
        //   itemStyle: {
        //     shadowBlur: 10,
        //     shadowOffsetX: 0,
        //     shadowColor: 'rgba(0, 0, 0, 0.5)',
        //   },
        // },
      },
    ],
  };
  option.value && myChart.setOption(option.value);
  window.addEventListener('resize', () => {
    myChart.resize();
  });
}
let tableList = ref([]);
function initData() {
  tableList.value = [
    {
      name: '外出招商',
      value: economicData.value['数字经济-激发创新活力-招大招强-外出招商'].value,
      unit: economicData.value['数字经济-激发创新活力-招大招强-外出招商'].unit,
    },
    {
      name: '重大项目签约',
      value: economicData.value['数字经济-激发创新活力-招大招强-重大项目签约'].value,
      unit: economicData.value['数字经济-激发创新活力-招大招强-重大项目签约'].unit,
    },
    {
      name: '亿元项目落地',
      value: economicData.value['数字经济-激发创新活力-招大招强-亿元项目落地'].value,
      unit: economicData.value['数字经济-激发创新活力-招大招强-亿元项目落地'].unit,
    },
    {
      name: '六张清单落地',
      value: economicData.value['数字经济-激发创新活力-招大招强-六张清单落地'].value,
      unit: economicData.value['数字经济-激发创新活力-招大招强-六张清单落地'].unit,
    },
  ];
}
let tabIndex = ref(0);
function tabClick(index) {
  tabIndex.value = index;
  initChart();
}
let colorMap = {
  A类人才: '#fdcd46',
  B类人才: '#1492ff',
  C类人才: '#ce60ff',
  D类人才: '#60ffbd',
  E类人才: '#ff6060',
};
let progressSum = ref(0);
async function initprogressData() {
  const res = await IndicatorTalentIntroductionList();
  if (res.code === 200) {
    progress.value = res.rows.map((item) => {
      progressSum.value += Number(item.peopleSum);
      return item;
    });
  }
}
let schoolData = ref([]);
let schoolList = ref([]);
async function getSchoolList() {
  const list = await IndicatorCollegeEconomyList();
  if (list.code === 200) {
    schoolList.value = list.rows;
  }
  const res = await IndicatorCollegeEconomyGetBsInfo();
  if (res.code === 200) {
    schoolData.value = res.data;
  }
}
watch();
onMounted(() => {
  initChart();
  initData();
  initprogressData();
  getSchoolList();
});
onUnmounted(() => {
  myChart && myChart.dispose();
});
</script>
<style lang="less" scoped>
.left3 {
  margin: 10px 0 0 0;
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
    height: 280px;
    .sub-title {
      display: flex;
      align-items: center;
      color: #fff;
      .text {
        margin: 0 0px 0 6px;
      }
    }
    .main0 {
      height: 240px;
      .main0-list {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin: 8px 0 0 0;
        .main0-item {
          margin: 16px 0 0 0;
          .item-title {
            width: 218px;
            height: 32px;
            background: url('@/assets/image/info-bg.png');
            background-size: 100% 100%;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            font-size: 14px;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .item-content {
            width: 218px;
            height: 56px;
            margin: 6px 0 0 0;
            background: url('@/assets/image/info-bg.png');
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .span-value {
              font-family: DINAlternate-Bold;
              font-weight: 700;
              font-size: 22px;
              color: #73d5e5;
            }
            .span-unit {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 14px;
              color: #ffffff;
            }
          }
        }
      }
    }
    .main {
      display: flex;
      justify-content: space-between;
      .left {
        width: 44%;
        .info-data {
          margin: 28px 0 0 0;
          .left-box {
            .list {
              display: flex;
              justify-content: space-between;
              margin: 22px 0 0 0;
              padding: 0 0 0 20px;
              box-sizing: border-box;
            }
            .item {
              width: 70px;
              .item-title {
                font-family: PingFangSC-Regular;
                font-weight: 400;
                font-size: 16px;
                color: #ffffff;
              }
              .value-box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .number {
                  font-family: DINAlternate-Bold;
                  font-weight: 700;
                  font-size: 28px;
                  color: #e0fffe;
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
      }
      .right {
        margin: 28px 0 0 26px;
        flex: 1;
        .sub1 {
          .tabs {
            display: flex;
            .tab {
              width: 56px;
              height: 20px;
              font-family: PingFangSC-S0pxibold;
              font-weight: 600;
              font-size: 14px;
              color: #ffffff;
              margin: 0 30px 0 0;
              cursor: pointer;
            }
            .change-tab {
              border-bottom: 3px solid #fff;
            }
          }
          .charts {
            width: 220px;
            height: 120px;
          }
        }
        .sub2 {
          // margin: 10px 0 0 0;
          .school {
            margin: 10px 0 0 6px;
            width: 152.06px;
            height: 60px;
            cursor: pointer;
            // background: yellowgreen;
          }
        }
      }
    }
    .main1 {
      .main1-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 32px 0 0 19px;
        box-sizing: border-box;
        .line {
          width: 1px;
          height: 56px;
          background-image: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            #ffffff 51%,
            rgba(255, 255, 255, 0) 100%
          );
        }
        .main1-window {
          width: 274px;
          height: 50px;
          background: rgba(24, 103, 255, 0.33);
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0px 16px;
          box-sizing: border-box;
          .name {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
          }
          .right {
            .text {
              font-family: DINAlternate-Bold;
              font-weight: 700;
              font-size: 28px;
              color: #e0fffe;
              margin: 0 14px 0 0;
            }
            .unit {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 14px;
              color: #ffffff;
            }
          }
        }
        .rank-icon {
          background: url('@/assets/image/编组 99.png');
          background-size: 100% 100%;
          width: 88px;
          height: 71.85px;
        }
      }
      .demo-progress {
        height: 150px;
        // overflow-y: auto;
        overflow: hidden;
        .el-progress {
          margin: 10px 0 0 0;
        }
      }
    }
  }
  .dialog-content {
    width: 680px;
    height: 330px;
    display: flex;
    overflow: scroll;
    img {
      width: 250px;
      height: 260px;
      object-fit: contain;
      margin: 0 24px 0 0;
    }
    .dialog-content-text {
      .content-title {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 14px;
        color: #ffffff;
        opacity: 0.6;
        margin: 6px 0 0 0;
      }
      .content-value {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 14px;
        color: #ffffff;
        margin: 6px 0 0 0;
      }
    }
  }
}
:deep(.el-progress-bar__innerText) {
  color: #000;
}
</style>
