<template>
  <div class="item2">
    <div class="sub1">
      <div class="title">先锋劲“蒋”</div>
      <div class="info">
        <div class="list">
          <div class="item">
            <div class="item-title">党员总数</div>
            <div class="value-box">
              <span class="number">{{ partyData['数字党建-先锋劲“蒋”-党员画像-党员总数'].value }}</span>
              <span class="unit">{{ partyData['数字党建-先锋劲“蒋”-党员画像-党员总数'].unit }}</span>
            </div>
          </div>
          <div class="item">
            <div class="item-title">流动党员数量</div>
            <div class="value-box">
              <span class="number font-bule">{{ partyData['数字党建-先锋劲“蒋”-党员画像-流动党员数量'].value }}</span>
              <span class="unit">{{ partyData['数字党建-先锋劲“蒋”-党员画像-流动党员数量'].unit }}</span>
            </div>
          </div>
          <div class="item">
            <div class="item-title">在职党员数量</div>
            <div class="value-box">
              <span class="number font-bule">{{ partyData['数字党建-先锋劲“蒋”-党员画像-在职党员数量'].value }}</span>
              <span class="unit">{{ partyData['数字党建-先锋劲“蒋”-党员画像-在职党员数量'].unit }}</span>
            </div>
          </div>
        </div>
        <div class="tabs">
          <Tabs :propsData="tabsData" v-model:index="tabIndex" @tabChange="tabChange" />
        </div>
        <div v-if="tabIndex === 0 || tabIndex === 1">
          <div class="sub-list">
            <div class="sub-list-item" @click="openUrl(item)" v-for="(item, index) in tableData1" :key="index">
              <div class="sub-list-item-left">
                <img :src="item.url + '?thumbnail=true'" alt="" />
                <span class="sub-list-item-title">{{ item.subject }}</span>
              </div>
            </div>
          </div>
        </div>
        <div v-show="tabIndex === 2 || tabIndex === 3 || tabIndex === 4" class="charts" id="pie"></div>
      </div>
    </div>
    <div class="sub2">
      <div class="title">宣传亮“蒋”</div>
      <div class="list">
        <div class="item">
          <div class="text-box">
            <span>宣讲团</span>
            <span
              >{{ partyData['数字党建-宣传亮“蒋”-七彩宣讲团-七彩宣讲队伍'].value }}
              {{ partyData['数字党建-宣传亮“蒋”-七彩宣讲团-七彩宣讲队伍'].unit }}</span
            >
          </div>
          <div class="text-box">
            <span>开展宣讲</span>
            <span
              >{{ partyData['数字党建-宣传亮“蒋”-七彩宣讲团-开展宣讲'].value }}
              {{ partyData['数字党建-宣传亮“蒋”-七彩宣讲团-开展宣讲'].unit }}</span
            >
          </div>
        </div>
        <div class="item">
          <div class="text-box">
            <span>舆情瞭望哨</span>
            <span
              >{{ partyData['数字党建-宣传亮“蒋”-七彩宣讲团-舆情瞭望哨'].value }}
              {{ partyData['数字党建-宣传亮“蒋”-七彩宣讲团-舆情瞭望哨'].unit }}</span
            >
          </div>
          <div class="text-box">
            <span>上报舆情</span>
            <span
              >{{ partyData['数字党建-宣传亮“蒋”-七彩宣讲团-上报舆情'].value }}
              {{ partyData['数字党建-宣传亮“蒋”-七彩宣讲团-上报舆情'].unit }}</span
            >
          </div>
        </div>
      </div>
      <div class="window">
        <span class="name">街道组工宣传赛马</span>
        <span @click="openDialog" class="text">赛马详情☞</span>
      </div>
      <div class="rank">
        <div class="rank-title">社区组工宣传排行</div>
        <vue3-seamless-scroll :list="tableData" direction="left" class="scrrol" :hover="true" :step="0.5">
          <div class="rank-list">
            <div
              class="rank-item"
              :class="index < 3 ? `rank-item${index}` : 'rank-item2'"
              v-for="(item, index) in tableData"
              :key="index"
            >
              <div class="rank-value">{{ item.fraction }}</div>
              <div class="rank-name">{{ index + 1 }}.{{ item.name }}</div>
            </div>
          </div>
        </vue3-seamless-scroll>
      </div>
    </div>
    <Dialog :title="dialogData.subject" @close="isShowDialog = false" v-if="isShowDialog">
      <template v-slot:content>
        <div class="dialog-content">
          <img :src="dialogData.url" alt="" />
          <span>{{ dialogData.content }}</span>
        </div>
      </template>
    </Dialog>
    <Dialog :title="'街道组工宣传赛马榜'" @close="isShowDialog1 = false" v-if="isShowDialog1">
      <template v-slot:content>
        <div class="rank-box">
          <div class="rank">
            <div class="rank-value rotate360"></div>
            <div class="rank-value-box">
              <div class="numer">{{ rankValue.scoreSum }}</div>
              <div class="unit">分</div>
            </div>
            <div class="rank-img">
              <img src="@/assets/image/blue-ma.png" alt="" />
              <span> 蒋村街道赛马场分数</span>
            </div>
          </div>
          <div class="rank-1-box">
            <el-checkbox-group v-model="checkList" @change="checkBoxChange">
              <el-checkbox v-for="(item, index) in checkOptions" :key="index" :label="item" />
            </el-checkbox-group>
            <div class="rank-1">
              <div class="rank1-item" v-for="(item, index) in showData" :key="index">
                <div class="item-title">{{ item.title }}</div>
                <div class="item-contetn">
                  <div
                    class="item-number"
                    :style="{
                      background: item.icon ? `url(${item.icon})` : ``,
                      color: `${item.color}`,
                      border: `2px solid ${item.rankColor}`,
                    }"
                  >
                    {{ item.list.length }}
                  </div>
                  <vue3-seamless-scroll :list="item.list" class="item-text-box" :hover="true" :step="0.5">
                    <div class="item-text" v-for="(obj, index) in item.list" :key="index">
                      <div class="text" :title="obj.title">{{ obj.title }}</div>
                      <div class="sub-text">
                        <span :title="obj.unit" class="sub-unit">{{ obj.unit }} </span><span>{{ obj.time }}</span>
                      </div>
                    </div>
                  </vue3-seamless-scroll>
                </div>
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
import * as echarts from 'echarts';
import {
  IndicatorOrganizationalInfluenceList,
  IndicatorPartyMemberEducationList,
  IndicatorAiringComparisonList,
  IndicatorPortraitPartyMembersList,
  forestSmcfs,
  forestBzry,
  forestYqgk,
  forestDxfy,
  forestSdtg,
  forestPskd,
  forestRwyg,
  forestMtbd,
  forestOther,
} from '@/api/index';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const partyData = computed(() => {
  return store.state.partyData;
});
const showData = computed(() => {
  return Object.values(dialogTableData.value).filter((item) => item.isShow);
});
let tabsData = ['党员教育', '亮晒比学', '性别分布', '年龄分布', '学历分布'];
let isShowDialog = ref(false);
let isShowDialog1 = ref(false);
let dialogData = ref({});
let option = ref({});
let tabIndex = ref(0);
let checkList = ref(['表彰荣誉', '典型发言', '试点推广', '批评表扬', '任务约稿', '舆情管控', '媒体报道', '其他']);
let checkOptions = ref(['表彰荣誉', '典型发言', '试点推广', '批评表扬', '任务约稿', '舆情管控', '媒体报道', '其他']);
let dialogTableData = ref({
  表彰荣誉: {
    title: '蒋村街道表彰荣誉列表',
    value: '34',
    icon: 'image/jd-lan.png',
    color: '#19ffff',
    isShow: true,
    list: [
      {
        title: '成效明显，望继续总结提升',
        unit: '区人社局',
        time: '2022-11-24 12:00',
      },
      {
        title: '成效明显，望继续总结提升',
        unit: '区人社局',
        time: '2022-11-24 12:00',
      },
    ],
  },
  典型发言: {
    title: '蒋村街道典型发言列表',
    value: '34',
    color: '#7bff76',
    isShow: true,

    icon: 'image/jd-lv.png',
    list: [
      {
        title: '成效明显，望继续总结提升',
        unit: '区人社局',
        time: '2022-11-24 12:00',
      },
      {
        title: '成效明显，望继续总结提升',
        unit: '区人社局',
        time: '2022-11-24 12:00',
      },
    ],
  },
  试点推广: {
    title: '蒋村街道试点推广列表',
    value: '34',
    color: '#ff429a',
    isShow: true,

    icon: 'image/jd-hong.png',
    list: [
      {
        title: '成效明显，望继续总结提升',
        unit: '区人社局',
        time: '2022-11-24 12:00',
      },
      {
        title: '成效明显，望继续总结提升',
        unit: '区人社局',
        time: '2022-11-24 12:00',
      },
    ],
  },
  批评表扬: {
    title: '蒋村街道批评表扬列表',
    value: '34',
    color: '#fff',
    isShow: true,

    icon: 'image/jd-bai.png',
    list: [
      {
        title: '成效明显，望继续总结提升',
        unit: '区人社局',
        time: '2022-11-24 12:00',
      },
      {
        title: '成效明显，望继续总结提升',
        unit: '区人社局',
        time: '2022-11-24 12:00',
      },
    ],
  },
  任务约稿: {
    title: '蒋村街道任务约稿列表',
    value: '34',
    color: '#ffa44e',
    isShow: true,

    icon: 'image/jd-cheng.png',
    list: [
      {
        title: '成效明显，望继续总结提升',
        unit: '区人社局',
        time: '2022-11-24 12:00',
      },
      {
        title: '成效明显，望继续总结提升',
        unit: '区人社局',
        time: '2022-11-24 12:00',
      },
    ],
  },
  舆情管控: {
    title: '蒋村街道舆情管控列表',
    value: '34',
    color: '#c28eff',
    isShow: true,

    icon: 'image/jd-zi.png',
    list: [
      {
        title: '成效明显，望继续总结提升',
        unit: '区人社局',
        time: '2022-11-24 12:00',
      },
      {
        title: '成效明显，望继续总结提升',
        unit: '区人社局',
        time: '2022-11-24 12:00',
      },
    ],
  },
  媒体报道: {
    title: '蒋村街道媒体报道列表',
    value: '34',
    color: '#7e76ff',
    isShow: true,

    icon: 'image/jd-zi1.png',
    list: [
      {
        title: '成效明显，望继续总结提升',
        unit: '区人社局',
        time: '2022-11-24 12:00',
      },
      {
        title: '成效明显，望继续总结提升',
        unit: '区人社局',
        time: '2022-11-24 12:00',
      },
    ],
  },
  其他: {
    title: '蒋村街道其他列表',
    value: '34',
    color: '#ffd844',
    isShow: true,

    icon: 'image/jd-huang.png',
    list: [
      {
        title: '成效明显，望继续总结提升',
        unit: '区人社局',
        time: '2022-11-24 12:00',
      },
      {
        title: '成效明显，望继续总结提升',
        unit: '区人社局',
        time: '2022-11-24 12:00',
      },
    ],
  },
});
let myChart = null;
function initChart(data) {
  let chartDemo = document.getElementById('pie');
  myChart = echarts.init(chartDemo);
  option.value = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      show: false,
      right: 'center',
      bottom: '0%',
      itemWidth: 8,
      width: 150,
      itemHeight: 8,
    },
    series: [
      {
        center: ['50%', '50%'],
        name: tabsData[tabIndex.value],
        type: 'pie',
        radius: ['36%', '63%'],
        label: {
          textStyle: {
            color: '#fff',
          },
          formatter: `{b}\n{percent|{d}%}`,
          rich: {
            percent: {
              fontWeight: 'bold',
              fontSize: 15,
              padding: [10, 0, 0, 0],
            },
          },
        },
        data,
        labelLine: {
          show: true,
        },
      },
    ],
  };
  option.value && myChart.setOption(option.value);
  window.addEventListener('resize', () => {
    myChart.resize();
  });
}
// 组工影响力列表
let tableData = ref([]);
// 党员教育列表  查询晾晒比学列表
let tableData1 = ref([]);
async function getData() {
  let params = {
    type: 2,
  };
  const res = await IndicatorOrganizationalInfluenceList(params);
  if (res) {
    tableData.value = res.rows;
  }
  let ret = null;
  if (tabIndex.value === 0) {
    ret = await IndicatorPartyMemberEducationList();
  }
  if (tabIndex.value === 1) {
    ret = await IndicatorAiringComparisonList();
  }
  if (ret) {
    tableData1.value = ret.rows;
  }
}
async function getChartData() {
  const res = await IndicatorPortraitPartyMembersList({
    type: tabIndex.value - 1,
  });
  if (res) {
    let data = res.rows.map((item) => {
      item.value = item.peopleSum;
      return item;
    });
    initChart(data);
  }
}

function openUrl(row) {
  isShowDialog.value = true;
  dialogData.value = row;
}
let rankValue = ref([]);
async function openDialog() {
  const res = await forestSmcfs();
  if (res) {
    rankValue.value = res.data;
  }
  const bzry = await forestBzry();
  if (bzry) {
    dialogTableData.value['表彰荣誉'].list = bzry.rows.map((item) => {
      item.title = item.content;
      item.unit = item.commendObject;
      item.time = item.commendDate;
      return item;
    });
  }
  const yqgk = await forestYqgk();
  if (yqgk) {
    console.log(yqgk);
    // dialogTableData.value['舆情管控'].list = yqgk.rows.map((item) => {
    //   item.title = item.content;
    //   item.unit = item.commendObject;
    //   item.time = item.commendDate;
    // });
  }
  const dxfy = await forestDxfy();
  if (dxfy) {
    // dialogTableData.value['典型发言'].list = yqgk.rows.map((item) => {
    //   item.title = item.content;
    //   item.unit = item.commendObject;
    //   item.time = item.commendDate;
    // });
  }
  const sdtg = await forestSdtg();
  if (sdtg) {
    // dialogTableData.value['试点推广'].list = yqgk.rows.map((item) => {
    //   item.title = item.content;
    //   item.unit = item.commendObject;
    //   item.time = item.commendDate;
    // });
  }
  const pskd = await forestPskd();
  if (pskd) {
    dialogTableData.value['批评表扬'].list = pskd.rows.map((item) => {
      item.title = item.content;
      item.unit = item.materialName;
      item.time = item.approvalDate;
      return item;
    });
  }
  const rwyg = await forestRwyg();
  if (rwyg) {
    dialogTableData.value['任务约稿'].list = rwyg.rows.map((item) => {
      item.title = item.title;
      item.unit = item.unitName;
      item.time = item.createTime;
      return item;
    });
  }
  const mtbd = await forestMtbd();
  if (mtbd) {
    dialogTableData.value['媒体报道'].list = mtbd.rows.map((item) => {
      item.title = item.title;
      item.unit = item.mediaName;
      item.time = item.releaseDate;
      return item;
    });
  }
  const other = await forestOther();
  if (other) {
    dialogTableData.value['其他'].list = other.rows.map((item) => {
      item.title = item?.description || '';
      item.unit = item.unitName;
      item.time = item.createTime;
      return item;
    });
  }
  // 恢复默认全部勾选状态并显示
  checkList.value = ['表彰荣誉', '典型发言', '试点推广', '批评表扬', '任务约稿', '舆情管控', '媒体报道', '其他'];
  Object.values(dialogTableData.value).map((item) => (item.isShow = true));

  isShowDialog1.value = true;
}
function tabChange() {
  tableData1.value = [];
  if (tabIndex.value < 2) {
    getData();
  } else {
    getChartData();
  }
}
function checkBoxChange() {
  //遍历判断数据是否勾选,勾选渲染
  for (const index in dialogTableData.value) {
    if (checkList.value.some((item) => item == index)) {
      dialogTableData.value[index].isShow = true;
    } else {
      dialogTableData.value[index].isShow = false;
    }
  }
}
watch();
onMounted(() => {
  initChart();
  tabChange();
});
onUnmounted(() => {
  myChart && myChart.dispose();
});
</script>
<style lang="less" scoped>
.item2 {
  overflow: hidden;
  margin: 0 30px 0 0;
  .title {
    // width: 348px;
    background: url('@/assets/image/djbt.png');
    background-size: 100% 100%;
    height: 40px;
    font-family: PingFangSC-S0pxibold;
    font-weight: 600;
    font-size: 21px;
    color: #30f7fd;
    display: flex;
    justify-content: center;
    letter-spacing: 0;
    text-shadow: 0 2px 2px rgba(76, 255, 244, 0.5);
    // padding: 8px 0 0 0;
    box-sizing: border-box;
    align-items: center;
  }
  .tabs {
    display: flex;
    justify-content: space-between;
    .tab1 {
      width: 152px;
    }
    .tab2 {
      width: 210px;
    }
  }
  .sub1 {
    width: 400px;
    height: 386px;
    background: rgba(92, 132, 253, 0.1);
    border-radius: 8px;
    padding: 0 12px;
    box-sizing: border-box;
    .info {
      .list {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        margin: 20px 0 0 0;
        .item {
          .item-title {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
          }
          .value-box {
            .number {
              font-family: DINAlternate-Bold;
              font-weight: 700;
              font-size: 24px;
              color: #ff6e6e;
              margin: 0 4px 0 0;
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
      .tabs-list {
      }
      .charts {
        width: 380px;
        height: 200px;
        margin: 22px 0 0 0;
      }
    }
  }
  .sub2 {
    margin: 28px 0 0 0;
    width: 400px;
    height: 386px;
    background: rgba(92, 132, 253, 0.1);
    border-radius: 8px;
    padding: 0 12px;
    box-sizing: border-box;
    .list {
      padding: 0 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      .item {
        width: 170.63px;
        height: 88px;
        background: rgba(116, 190, 255, 0.18);
        border-radius: 4px;
        padding: 0px 10px 10px 10px;
        box-sizing: border-box;
        overflow: hidden;
        margin: 14px 0 0 0;
        border-top: 6px solid #1492ff;
        .text-box {
          margin: 13px 0 0 0;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .window {
      margin: 12px 0 0 0;
      // width: 338.17px;
      height: 42px;
      // background-image: linear-gradient(
      //   90deg,
      //   rgba(47, 93, 142, 0) 1%,
      //   rgba(39, 112, 202, 0.38) 53%,
      //   rgba(31, 127, 255, 0) 100%
      // );
      background: url('@/assets/image/home-iten-bg.png');
      background-size: 100% 100%;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 14px;
      box-sizing: border-box;
      .name {
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
      }
      .text {
        color: rgba(115, 213, 229, 1);
        font-size: 14px;
        cursor: pointer;
      }
    }

    .rank {
      margin: 14px 0 0 0;
      padding: 0 0 0 14px;
      box-sizing: border-box;
      .rank-title {
        font-weight: 400;
        font-size: 14px;
        color: #ffffff;
      }
      .rank-list {
        display: flex;
        margin: 12px 0 0 0;
        flex-wrap: nowrap;
        overflow: hidden;
        .rank-item {
          width: 104px;
          flex: 0 0 auto;
          margin: 0 10px 0 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          // justify-content: center;
        }
        .rank-item0 {
          height: 104px;
          background: rgba(255, 229, 63, 0.1);
          border-top: 1px solid #ffe53f;
          .rank-value {
            font-family: PingFangSC-SNaNpxibold;
            font-weight: 600;
            font-size: 32px;
            color: #ffe53f;
          }
          .rank-name {
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
            text-align: center;
          }
        }
        .rank-item1 {
          height: 104px;
          background: rgba(31, 255, 255, 0.1);

          border-top: 1px solid #1fffff;
          .rank-value {
            font-family: PingFangSC-SNaNpxibold;
            font-weight: 600;
            font-size: 32px;
            color: #1fffff;
          }
          .rank-name {
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
            text-align: center;
          }
        }
        .rank-item2 {
          height: 104px;
          background: rgba(75, 156, 255, 0.1);

          border-top: 1px solid #4b9cff;
          .rank-value {
            font-family: PingFangSC-SNaNpxibold;
            font-weight: 600;
            font-size: 32px;
            color: #4b9cff;
          }
          .rank-name {
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
            text-align: center;
          }
        }
      }
    }
  }
}
.sub-list {
  padding: 0 30px 0 0;
  box-sizing: border-box;
  margin: 16px 0 0 0;
  overflow: auto;
  height: 190px;
  .sub-list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0 10px 0;
    box-sizing: border-box;
    margin: 12px 0 0 0;
    cursor: pointer;
    .sub-list-item-left {
      display: flex;
      align-items: center;
      img {
        width: 70.44px;
        height: 58px;
        margin: 0 26px;
      }
      .sub-list-item-title {
        font-weight: 600;
        font-size: 16px;
        color: #ffffff;
      }
    }

    .sub-list-item-time {
      font-weight: 400;
      font-size: 12px;
      color: #ffffff;
    }
    border-bottom: 1px solid rgba(92, 132, 253, 0.1);
  }
}
.sub-list::-webkit-scrollbar {
  display: none;
}
.font-bule {
  color: #1fffff !important;
}
.dialog {
  img {
    width: 220px;
    height: 150px;
    margin: 10px 0 0 0;
  }
}
.scrrol {
  margin: 20px 0 0 0;
  height: 105px;
  overflow: hidden;
}
.rank-box {
  width: 1683px;
  height: 820px;
  background: #061728;
  box-shadow: inset 0 0 6px 3px rgba(255, 255, 255, 0.16);
  border-radius: 4px;
  padding: 15px 66px 54px 66px;
  box-sizing: border-box;
  display: flex;
  .item-title {
    width: 452px;
    height: 40px;
    background: url('@/assets/image/ma-rank-bg.png');
    background-size: 100% 100%;
    font-family: YouSheBiaoTiHei;
    font-size: 18px;
    color: #ffffff;
    text-shadow: 0 2px 12px rgba(96, 150, 255, 0.5);
    // line-height: 40;
    display: flex;
    align-items: center;
    padding: 0 0 0 10px;
    box-sizing: border-box;
  }
  .rank {
    width: 431px;
    height: 779px;
    background: url('@/assets/image/rank-value-bg.png');
    background-size: 100% 100%;
    margin: 0 60px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    .rank-value {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 260px;
      height: 260px;
      // border-radius: 260px;
      background: url('@/assets/image/rank-ma-bg.png');
      background-size: 100% 100%;
    }
    .rank-value-box {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      position: absolute;
      transform: translateY(-110%);
      top: 50%;
      .numer {
        font-family: DINAlternate-Bold;
        font-weight: 700;
        font-size: 60px;
        color: #ffffff;
      }
      .unit {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 24px;
        color: #ffffff;
      }
    }
    .rank-img {
      width: 292px;
      height: 49px;
      background-image: linear-gradient(180deg, rgba(96, 172, 255, 0.8) 0%, rgba(96, 160, 255, 0.24) 98%);
      border-radius: 24.5px;
      margin: 90px 0 0 0;
      position: relative;
      font-family: PingFangSC-SNaNpxibold;
      font-weight: 600;
      font-size: 24px;
      color: #2fe0fd;
      display: flex;
      align-items: center;
      padding: 0 0 0 56px;
      box-sizing: border-box;
      img {
        width: 4.125vw;
        height: 4.125vw;
        position: absolute;
        top: -15px;
        left: -15px;
      }
    }
  }
  .rank-1 {
    width: 1060px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    // margin: 0 0 0 82px;
    .rank1-item {
      // display: flex;
      // width: 50%;
      flex: 1;
      margin: 16px 0px 0 0;
      .item-contetn {
        display: flex;
        align-items: center;
        margin: 20px 0 0 0;
        .item-number {
          width: 90px;
          height: 78px;
          background-size: 100% 100% !important;
          font-family: DINAlternate;
          font-size: 20px;
          color: #ffd844;
          text-align: center;
          line-height: 50px;
          margin: 0 30px 0 0;
        }
        .item-text-box {
          // width: 30%;
          height: 112px;
          overflow: hidden;
          .item-text {
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            padding: 0 0 10px 0;
            box-sizing: border-box;
            .text {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 16px;
              color: #ffffff;
              overflow: hidden; //溢出内容隐藏
              width: 300px;
              display: inline-block;
              white-space: nowrap; //强制文本在一行内显示
              text-overflow: ellipsis; //当对象内文本溢出时显示省略号标记
              cursor: pointer;
            }
            .sub-text {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 12px;
              color: rgba(255, 255, 255, 0.5);
              margin: 8px 0 0 0;
              .sub-unit {
                margin: 0 16px 0 0;
                overflow: hidden; //溢出内容隐藏
                width: 120px;
                display: inline-block;
                white-space: nowrap; //强制文本在一行内显示
                text-overflow: ellipsis; //当对象内文本溢出时显示省略号标记
                cursor: pointer;
              }
            }
          }
          .text-line {
            height: 1px;
            background: rgba(255, 255, 255, 0.3);
            margin: 10px 0;
            width: 100%;
          }
        }
      }
    }
  }
}
.progress-img {
  position: absolute;
  right: -42px;
  bottom: -20px;
}
:deep(.el-progress-bar__outer) {
  overflow: visible;
  border-radius: 0px;
}
:deep(.el-progress-bar__inner) {
  border-radius: 0px;
}
// 无限旋转动画
.rotate360 {
  animation: rotate360 7s linear 0.2s infinite;
}
@keyframes rotate360 {
  100% {
    transform: rotate(360deg);
  }
}
</style>
