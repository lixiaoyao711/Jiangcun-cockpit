<template>
  <div class="right1">
    <div class="title">
      <div class="left">
        <img src="@/assets/image/lsjt.png" alt="" />
        <div class="text">高标准管控</div>
      </div>
      <div class="right">
        <TitleIcon effect="card" />
      </div>
    </div>
    <div class="item-title">
      <div class="left">
        <el-icon><CaretRight /></el-icon>
        <span class="text">环境品质提升</span>
      </div>
      <div class="right">
        <!-- <span @click="fiveDialog = true"> 查看详情 </span> -->
        <TitleIcon :type="typeMap[governmentData['数字政府-高标准管控-环境品质提升-考核名次'].value]" />
      </div>
    </div>
    <div class="info">
      <div class="month">
        <div class="month-title">月度抄告</div>
        <div class="value-box">
          <div class="number">{{ governmentData['数字政府-高标准管控-环境品质提升-月度抄告'].value }}</div>
          <div class="unit">{{ governmentData['数字政府-高标准管控-环境品质提升-月度抄告'].unit }}</div>
        </div>
      </div>
      <div class="info-list">
        <div class="info-item">
          <div class="info-item-title">问题整改率</div>
          <div class="value-box">
            <div class="number">{{ governmentData['数字政府-高标准管控-环境品质提升-问题整改率'].value }}</div>
            <div class="unit">{{ governmentData['数字政府-高标准管控-环境品质提升-问题整改率'].unit }}</div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item-title">复核通过率</div>
          <div class="value-box">
            <div class="number">{{ governmentData['数字政府-高标准管控-环境品质提升-复合通过率'].value }}</div>
            <div class="unit">{{ governmentData['数字政府-高标准管控-环境品质提升-复合通过率'].unit }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="info1">
      <div class="list">
        <div class="item">
          <div class="item-title">
            <div class="left">
              <el-icon><CaretRight /></el-icon>
              <span class="text">垃圾分类</span>
            </div>
            <div class="right">
              <span @click="rubbishDialog = true"> 查看详情 </span>
              <TitleIcon :type="typeMap[governmentData['数字政府-高标准管控-垃圾分类-考核名次'].value]" />
            </div>
          </div>
          <div class="item-info">
            <div class="items" v-for="(item, index) in rubbishTable" :key="index">
              <div class="name">{{ item.name }}</div>
              <div class="value-box">
                <div class="number">{{ item.value }}</div>
                <div class="unit">{{ item.unit }}</div>
              </div>
            </div>
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
          <el-progress :percentage="countData.speedProgress" :show-text="false" stroke-width="18" color="#46f8fd" />
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
            <div class="center-item">
              <div class="name">河道A</div>
              <div class="icon">
                <div class="footer-value"></div>
                <div class="footer-value"></div>
                <div class="footer-value"></div>
              </div>
            </div>
            <div class="center-item">
              <div class="name">河道B</div>
              <div class="icon">
                <div class="footer-value"></div>
                <div class="footer-value"></div>
                <div class="footer-value"></div>
              </div>
            </div>
            <div class="center-item">
              <div class="name">河道C</div>
              <div class="icon">
                <div class="footer-value"></div>
                <div class="footer-value"></div>
                <div class="footer-value"></div>
              </div>
            </div>
            <div class="center-item">
              <div class="name">河道D</div>
              <div class="icon">
                <div class="footer-value"></div>
                <div class="footer-value"></div>
                <div class="footer-value"></div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Dialog>
    <Dialog :title="'垃圾分类巡检分数'" @close="rubbishDialog = false" v-if="rubbishDialog">
      <template v-slot:content>
        <div class="five-dialog-info">
          <div class="center-list">
            <div class="rubbish-title-item">
              <div
                @click="dialogTabClick(index)"
                :class="dialogCurrentIndex === index ? 'time' : 'name'"
                v-for="(item, index) in dialogSub"
                :key="index"
              >
                {{ item }}
              </div>
            </div>
            <div
              class="rubbish-item"
              v-for="(item, index) in rubbishList.filter((item) => item.type == dialogCurrentIndex + 1)"
              :key="index"
            >
              <div class="time" v-if="dialogCurrentIndex === 0">{{ item.inspectionTime }}</div>
              <div class="time" v-else>{{ index + 1 }}</div>
              <div class="name" v-if="dialogCurrentIndex === 0">{{ item.pointName }}</div>
              <div class="name" v-else>{{ item.name }}</div>
              <div class="value" v-if="dialogCurrentIndex === 0">{{ item.fraction }}分</div>
            </div>
          </div>
        </div>
      </template>
    </Dialog>
    <Dialog :title="dialogData.title.slice(0, -1)" @close="isShowDialog = false" v-if="isShowDialog">
      <template v-slot:content>
        <div class="dialog-info-1">
          <div class="info-item" v-for="(data, index) in dialogData.info" :key="index">
            <span class="name">{{ data.name }}</span>
            <div class="value-box">
              <div class="number">{{ data.value }}</div>
              <div class="unit">{{ data.unit }}</div>
            </div>
          </div>
        </div>
        <div class="info-content" v-html="dialogData.remark"></div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import {
  IndicatorFiveWaterTreatmentList,
  IndicatorFiveWaterTreatmentBsInfo,
  IndicatorRefuseClassificationList,
  IndicatorEcologyList,
  IndicatorEcologyBsInfo,
  IndicatorRefuseClassificationGetBsInfo,
} from '@/api/index';
import { showDataMap } from '@/utils/common';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
let typeMap = {
  前列: 'success',
  居中: 'warning',
  靠后: 'danger',
};

let listData = ref([
  {
    title: '抄告数量',
    dialog: false,
    value: '23',
    unit: '个',
    info: [
      {
        name: '上级抄告数量',
        value: 12,
        unit: '个',
      },
      {
        name: '自查自纠数量',
        value: 12,
        unit: '个',
      },
      {
        name: '夜间亮灯景观点位数',
        value: 9,
        unit: '处',
      },
    ],
  },
  {
    title: '整改率',
    dialog: false,
    value: '23',
    unit: '%',
    info: [
      {
        name: '犬证办里数量',
        value: 12,
        unit: '个',
      },
    ],
  },
  {
    title: '外立面整治☞',
    dialog: false,

    info: [
      {
        name: '问题点位',
        value: 12,
        unit: '个',
      },
      {
        name: '整改完毕',
        value: 12,
        unit: '个',
      },
    ],
  },
  {
    title: '宣传设施整治☞',
    dialog: false,

    info: [
      {
        name: '数量',
        value: 12,
        unit: '个',
      },
      {
        name: '面积',
        value: 129,
        unit: '平方',
      },
    ],
  },
  {
    title: '扮靓家园☞',
    dialog: false,

    info: [
      {
        name: '数量',
        value: 12,
        unit: '个',
      },
      {
        name: '面积',
        value: 129,
        unit: '平方',
      },
    ],
  },
  {
    title: '安全检查情况☞',
    dialog: false,

    info: [
      {
        name: '数量',
        value: 12,
        unit: '个',
      },
      {
        name: '面积',
        value: 129,
        unit: '平方',
      },
    ],
  },
]);
let rubbishTable = ref([]);
let dialog = ref(false);
let fiveDialog = ref(false);
let rubbishDialog = ref(false);
const governmentData = computed(() => {
  return store.state.governmentData;
});
function getData() {
  listData.value = [
    {
      title: '抄告数量',
      dialog: false,
      value: governmentData.value['数字政府-高标准管控-环境品质提升-抄告数量-抄告数量'].value,
      unit: '个',
      // info: [
      //   {
      //     name: '上级抄告数量',
      //     value: 12,
      //     unit: '个',
      //   },
      //   {
      //     name: '自查自纠数量',
      //     value: 12,
      //     unit: '个',
      //   },
      //   {
      //     name: '夜间亮灯景观点位数',
      //     value: 9,
      //     unit: '处',
      //   },
      // ],
    },
    {
      title: '整改率',
      dialog: false,
      value: governmentData.value['数字政府-高标准管控-环境品质提升-抄告数量-整改率'].value,
      unit: '%',
      // info: [
      //   {
      //     name: '犬证办里数量',
      //     value: 12,
      //     unit: '个',
      //   },
      // ],
    },
    {
      title: '外立面整治☞',
      dialog: false,
      remark: governmentData.value['数字政府-高标准管控-环境品质提升-专项整治完成情况-外立面整治-说明'].value,
      info: [
        {
          name: '问题点位',
          value: governmentData.value['数字政府-高标准管控-环境品质提升-专项整治完成情况-外立面整治-问题点位'].value,
          unit: '个',
        },
        {
          name: '整改完毕',
          value: governmentData.value['数字政府-高标准管控-环境品质提升-专项整治完成情况-外立面整治-整改完毕'].value,
          unit: '个',
        },
      ],
    },
    {
      title: '宣传设施整治☞',
      dialog: false,
      remark: governmentData.value['数字政府-高标准管控-环境品质提升-专项整治完成情况-宣传设施整治-说明'].value,
      info: [
        {
          name: '问题点位',
          value: governmentData.value['数字政府-高标准管控-环境品质提升-专项整治完成情况-宣传设施整治-问题点位'].value,
          unit: '个',
        },
        {
          name: '整改完毕',
          value: governmentData.value['数字政府-高标准管控-环境品质提升-专项整治完成情况-宣传设施整治-整改完毕'].value,
          unit: '个',
        },
      ],
    },
    {
      title: '扮靓家园☞',
      dialog: false,
      remark: governmentData.value['数字政府-高标准管控-环境品质提升-专项整治完成情况-扮靓家园-说明'].value,

      info: [
        {
          name: '问题点位',
          value: governmentData.value['数字政府-高标准管控-环境品质提升-专项整治完成情况-扮靓家园-问题点位'].value,
          unit: '个',
        },
        {
          name: '整改完毕',
          value: governmentData.value['数字政府-高标准管控-环境品质提升-专项整治完成情况-扮靓家园-整改完毕'].value,
          unit: '个',
        },
      ],
    },
    {
      title: '安全检查情况☞',
      dialog: false,
      remark: governmentData.value['数字政府-高标准管控-环境品质提升-安全检查情况-安全检查-说明'].value,

      info: [
        {
          name: '问题点位',
          value: governmentData.value['数字政府-高标准管控-环境品质提升-安全检查情况-安全检查-问题点位'].value,
          unit: '个',
        },
        {
          name: '整改完毕',
          value: governmentData.value['数字政府-高标准管控-环境品质提升-安全检查情况-安全检查-整改完毕'].value,
          unit: '个',
        },
      ],
    },
  ];
  rubbishTable.value = [
    {
      name: '垃圾分类巡检',
      value: governmentData.value['数字政府-高标准管控-垃圾分类-垃圾分类巡检'].value,
      unit: governmentData.value['数字政府-高标准管控-垃圾分类-垃圾分类巡检'].unit,
    },
    {
      name: '餐盒回收覆盖率',
      value: governmentData.value['数字政府-高标准管控-垃圾分类-餐盒回收覆盖率'].value,
      unit: governmentData.value['数字政府-高标准管控-垃圾分类-餐盒回收覆盖率'].unit,
    },
    {
      name: '日均减量',
      value: governmentData.value['数字政府-高标准管控-垃圾分类-日均减量'].value,
      unit: governmentData.value['数字政府-高标准管控-垃圾分类-日均减量'].unit,
    },
    {
      name: '垃圾控量目标',
      value: governmentData.value['数字政府-高标准管控-垃圾分类-垃圾控量目标'].value,
      unit: governmentData.value['数字政府-高标准管控-垃圾分类-垃圾控量目标'].unit,
    },
  ];
}
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
  }
}
let rubbishList = ref([]);
async function getRubbishList() {
  const res = await IndicatorRefuseClassificationList();
  if (res.code === 200) {
    rubbishList.value = res.rows;
  }
}
let ecologyList = ref([]);
let ecologyCount = ref({});
let refuseCountData = ref({});
async function getEcologyData() {
  const res = await IndicatorEcologyList();
  const count = await IndicatorEcologyBsInfo();
  const refuse = await IndicatorRefuseClassificationGetBsInfo();
  if (res.code === 200) {
    ecologyList.value = res.rows;
  }
  if (count.code === 200) {
    ecologyCount.value = count.data;
  }
  if (refuse.code === 200) {
    refuseCountData.value = refuse.data;
  }
}
let dialogSub = ref(['垃圾分类巡检分数', '鲸灵回收点', '示范小区']);
let dialogCurrentIndex = ref(0);
function dialogTabClick(index) {
  dialogCurrentIndex.value = index;
}
let dialogData = ref({});
let isShowDialog = ref(false);
function showDialog(row, index) {
  if (index < 2) {
    return;
  }
  dialogData.value = row;
  isShowDialog.value = true;
  console.log('dialogData.value ', dialogData.value);
}
let AQIData = ref({});

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
watch(governmentData, (n, o) => {});
onMounted(() => {
  // setTimeout(() => {
  getData();
  getFiveWaterList();
  getRubbishList();
  getEcologyData();
  getPM25();
  // }, 3000);
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.right1 {
  margin-top: 30px;
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
        margin: 0 0 0 16px;
        .icon {
          width: 18px;
          height: 18px;
          background: #4eff8f;
          border-radius: 30px;
        }
      }
    }
  }
  .info {
    margin-top: 18px;
    // padding-left: 26px;
    padding: 0 46px 0 26px;
    box-sizing: border-box;

    .month {
      width: 410px;
      height: 50px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      box-sizing: border-box;
      color: #ffffff;
      background: #1867ff54;
      border-radius: 8px;
      background: url('@/assets/image/home-iten-bg.png');
      background-size: 100% 100%;
      .month-title {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
      }
    }
    .value-box {
      display: flex;
      align-items: center;
      .number {
        font-family: DINAlternate-Bold;
        font-weight: 700;
        font-size: 28px;
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
    .info-list {
      display: flex;
      justify-content: space-between;
      margin: 10px 0 0 0;
      .info-item {
        width: 197px;
        height: 50px;
        background: #1867ff54;
        border-radius: 8px;
        background: url('@/assets/image/home-iten-bg.png');
        background-size: 100% 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        box-sizing: border-box;
        .info-item-title {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
      }
    }
  }
  .info1 {
    box-sizing: border-box;
    margin-top: 20px;
    .list {
      .item {
        color: #ffffff;
        margin-top: 40px;
        .item-title {
          .text {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
          }
        }
        .item-info {
          // padding-left: 12px;
          padding: 0 42px 0 12px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;

          margin: 20px 0 0 0;
          .items {
            width: 46%;
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
              .number {
                font-family: DINAlternate-Bold;
                font-weight: 700;
                font-size: 26px;
                color: #e0fffe;
                margin: 0 12px 0 0;
              }
              .unit {
                font-weight: 400;
                font-size: 14px;
                color: #ffffff;
              }
            }
          }
        }
      }
    }
  }
  .info-2-box {
    margin: 50px 0 0 0;
  }
  .info2 {
    display: flex;
    padding: 30px 0 0 16px;
    box-sizing: border-box;
    align-items: center;
    .left {
      .info-title {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
      }
      .number {
        font-family: DINAlternate-Bold;
        font-weight: 700;
        font-size: 28px;
        color: #e0fffe;
      }
    }
    .line {
      width: 1px;
      height: 56px;
      background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 51%, rgba(255, 255, 255, 0) 100%);
      margin: 0 36px;
    }
    .right {
      flex: 1;
      padding: 0 50px 0 0;
      box-sizing: border-box;
      // margin: -6px 0 0 0;
      .one {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: -12px 0 0 0;
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
            font-size: 28px;
            color: #e0fffe;
            margin-right: 6px;
          }
          .unit {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
          }
        }
      }
      .two {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 4px;
        .name {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
        .rank-box {
          width: 148px;
          height: 16px;
          background: rgba(255, 255, 255, 0.21);
          border-radius: 11px;
          .show-rank {
            // width: 100%;
            height: 16px;
            background: #ffb86e;
            border-radius: 11px;
          }
        }
        .view {
          color: #1492ff;
          cursor: pointer;
          position: relative;
        }
      }
    }
  }
  .info3 {
    // padding: 0 60px 0 6px;
    box-sizing: border-box;
    margin: 52px 0 0 0;
    .list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 40px 0 16px;
      box-sizing: border-box;
      .list-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .right {
          display: flex;
          align-items: center;
          margin: 0 13px 0 0;
          .value {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 28px;
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
      .item1 {
        margin-top: 12px;
        width: 196.82px;
        height: 47px;
        background: url('@/assets/image/home-iten-bg.png');
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        padding: 0 0 0 20px;
        box-sizing: border-box;
        color: #3afff9;
        cursor: pointer;
        position: relative;
      }
      .item {
        margin-top: 12px;
        width: 196.82px;
        height: 47px;
        background: url('@/assets/image/info-bg.png');
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        padding: 0 0 0 20px;
        box-sizing: border-box;
        color: #3afff9;
        cursor: pointer;
        position: relative;
      }
    }

    .dialog {
      background: rgba(13, 24, 101, 0.9);
      border-radius: 16px;
      min-width: 270px;
      position: absolute;
      width: 430px;
      right: 100%;
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #102469;
        padding: 12px;
        box-sizing: border-box;
        border: 1px solid #fff;
        .info-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .value-box {
            display: flex;
            color: #ffffff;
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
              align-self: flex-end;
            }
          }
        }
      }
      .info-content {
        margin: 10px 0 0 0;
      }
    }
  }
  .dialog-info-1 {
    margin: 26px 0 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background: #102469;
    background: url('@/assets/image/info-bg.png');
    background-size: 100% 100%;
    padding: 12px;
    box-sizing: border-box;
    width: 430px;
    color: #fff;
    // border: 1px solid #fff;
    .info-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .value-box {
        display: flex;
        color: #ffffff;
        margin: 0 0 0 16px;
        align-items: center;
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
          // align-self: flex-end;
        }
      }
    }
  }
  .info-content {
    margin: 10px 0 0 0;
  }
  .dialog {
    background: rgba(13, 24, 101, 0.9);
    border-radius: 16px;
    min-width: 500px;
    position: absolute;

    right: 200%;
    // top: 50%;
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
      .dialog-item {
        // width: 429px;
        height: 114px;
        background: rgba(25, 116, 195, 0.1);
        border-radius: 8px;
        margin: 10px 0 0 0;
        padding: 10px 20px 0 20px;
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
          .item1 {
            width: 73px;
            .numer {
              color: #73d5e5;
            }
          }
          .item2 {
            width: 100px;
          }
          .item4 {
            margin: 14px 0 0 0;
          }
        }
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
  .item-title {
    display: flex;
    justify-content: space-between;
    padding: 0 30px 0 0;
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
      height: 400px;
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
            height: 20px;
            background: #73d5e5;
            width: 2px;
            margin: 0 2px;
          }
        }
      }
    }
  }
  .el-icon {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
  }
}
img {
  max-width: 960px;
  max-height: 900px;
}
</style>
