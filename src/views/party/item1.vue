<template>
  <div class="item1">
    <div class="sub1">
      <div class="title">堡垒筑“蒋”</div>
      <div class="info">
        <Tabs :propsData="tabsData" v-model:index="tabIndex" @tabChange="tabChange" />
        <div class="list" v-if="tabIndex === 0">
          <div class="item" v-for="(item, index) in listItem" :key="index">
            <div class="name">{{ item.name }}</div>
            <div class="value-box">
              <span class="number">{{ item.value }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
        <div class="list1" v-if="tabIndex === 1">
          <div class="item" v-for="(item, index) in listItem" :key="index">
            <div class="name">{{ item.name }}</div>
            <div class="value-box">
              <span class="number">{{ item.value }}</span>
              <span class="unit">{{ item.unit }}</span>
            </div>
          </div>
        </div>
        <vue3-seamless-scroll v-if="tabIndex === 2" :list="listItem" class="list2" :hover="true" :step="0.5">
          <!-- <div class="list2" v-if="tabIndex === 2"> -->
          <div class="item" v-for="(item, index) in listItem" :key="index">
            <div class="name">{{ item.name }}</div>
            <div class="rank"><el-rate disabled v-model="item.starSum" /></div>
          </div>
          <!-- </div> -->
        </vue3-seamless-scroll>

        <div class="list3" v-if="tabIndex === 3">
          <div class="head">
            <el-date-picker value-format="YYYY" v-model="year" type="year" placeholder="请选择" @change="tabChange" />
            <el-select v-model="value" class="m-2" placeholder="请选择" @change="tabChange">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="list3-title">
            <div class="name">名称</div>
            <div class="flex">发现问题</div>
            <div class="flex">已完成</div>
            <div class="flex">未完成</div>
          </div>
          <vue3-seamless-scroll :list="listItem" class="list3-list" :hover="true" :step="0.5">
            <!-- <div class="list3-list"> -->
            <div class="item" v-for="(item, index) in listItem" :key="index">
              <div class="name">{{ item.name }}</div>
              <div class="flex">{{ item.discoverProblems }}</div>
              <div class="flex">{{ item.rectified }}</div>
              <div class="flex">{{ item.notRectified }}</div>
            </div>
            <!-- </div> -->
          </vue3-seamless-scroll>
        </div>
      </div>
    </div>
    <div class="sub2">
      <div class="title">清廉护“蒋”</div>
      <div class="info">
        <div class="sub2-info">
          <div class="icon-box">
            <div class="number">{{ mapPath.length }}</div>
            <div class="name">清廉阵地</div>
          </div>
        </div>
        <div class="sub-list">
          <Tabs :propsData="tabsDatas" v-model:index="tabIndexs" />
          <div class="img-list" v-if="tabIndexs === 0">
            <el-carousel indicator-position="none" height="130px" trigger="click" arrow="never">
              <el-carousel-item class="img-item" v-for="(item, index) in imgList" :key="index">
                <img @click="openViewImg(item)" :src="item+'?thumbnail=true'" alt="" />
              </el-carousel-item>
            </el-carousel>
            <!-- 
            <div class="img-item" v-for="(item, index) in imgList" :key="index">
              <img :src="item" alt="" />
            </div> -->
          </div>
          <div class="list" v-if="tabIndexs === 1">
            <div
              class="sub-list-item"
              @click="openUrl(item)"
              v-for="(item, index) in tableData.slice(0, 10)"
              :key="index"
            >
              <div class="sub-list-item-left">
                <img :src="item.url+'?thumbnail=true'" alt="" />
                <span class="sub-list-item-title">{{ item.subject }}</span>
              </div>
              <span class="sub-list-item-time">{{ item.useTime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Dialog :title="'活动详情'" @close="isShowDialog = false" v-if="isShowDialog">
      <template v-slot:content>
        <div class="dialog-content">
          <img :src="dialogData.url" alt="" />
          <div class="content-text">
            <div class="dialog-title">活动时间</div>
            <div class="dialog-value">{{ dialogData.useTime }}</div>
            <div class="dialog-title">活动介绍</div>
            <div class="dialog-value">
              {{ dialogData.content }}
            </div>
          </div>
        </div>
      </template>
    </Dialog>
    <Dialog :title="'预览'" @close="isShowDialogImg = false" v-if="isShowDialogImg">
      <template v-slot:content>
        <div class="dialog-content1-img">
          <img class="proview-img" :src="viewUrl" alt="" />
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import store from '@/store';
import { timeFormat } from '@/utils/common';
import {
  mapPostStationList,
  IndicatorPositionStarList,
  IndicatorAnnualInspectionList,
  IndicatorIncorruptibleProtectionList,
} from '@/api/index';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';

const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const partyData = computed(() => {
  return store.state.partyData;
});
const options = [
  {
    label: '1季度',
    value: '1',
  },
  {
    label: '2季度',
    value: '2',
  },
  {
    label: '3季度',
    value: '3',
  },
  {
    label: '4季度',
    value: '5',
  },
];
let listItem = ref([]);
let isShowDialog = ref(false);
let value = ref('1');
let year = ref(timeFormat(new Date(), 'yyyy'));
let tabsData = ['堡垒分布', '网格智治', '争星晋位', '月查季督年考'];
let tabsDatas = ref(['清廉文化', '清廉活动']);

let tableData = ref([]);
let tabIndex = ref(0);
let tabIndexs = ref(0);
let dialogData = ref({});
let mapPath = ref([]);
function openUrl(row) {
  console.log(row);
  isShowDialog.value = true;
  dialogData.value = row;
}
async function tabChange(val) {
  if (tabIndex.value === 0) {
    listItem.value = [
      {
        name: '党委',
        value: partyData.value['数字党建-堡垒筑“蒋”-堡垒分布-党委数量'].value,
        unit: partyData.value['数字党建-堡垒筑“蒋”-堡垒分布-党委数量'].unit,
      },
      {
        name: '党总支',
        value: partyData.value['数字党建-堡垒筑“蒋”-堡垒分布-党总支数量'].value,
        unit: partyData.value['数字党建-堡垒筑“蒋”-堡垒分布-党总支数量'].unit,
      },
      {
        name: '党支部',
        value: partyData.value['数字党建-堡垒筑“蒋”-堡垒分布-党支部数量'].value,
        unit: partyData.value['数字党建-堡垒筑“蒋”-堡垒分布-党支部数量'].unit,
      },
      {
        name: '两新',
        value: partyData.value['数字党建-堡垒筑“蒋”-堡垒分布-“两新”组织数量'].value,
        unit: partyData.value['数字党建-堡垒筑“蒋”-堡垒分布-“两新”组织数量'].unit,
      },
    ];
  }
  if (tabIndex.value === 1) {
    listItem.value = [
      {
        name: '社区党组织数量',
        value: partyData.value['数字党建-堡垒筑“蒋”-网格智治-社区党组织数量'].value,
        unit: partyData.value['数字党建-堡垒筑“蒋”-网格智治-社区党组织数量'].unit,
      },
      {
        name: '小区（功能型）党组织数量',
        value: partyData.value['数字党建-堡垒筑“蒋”-网格智治-小区(功能型)党组织数量'].value,
        unit: partyData.value['数字党建-堡垒筑“蒋”-网格智治-小区(功能型)党组织数量'].unit,
      },
      {
        name: '网格数量',
        value: partyData.value['数字党建-堡垒筑“蒋”-网格智治-网格数量'].value,
        unit: partyData.value['数字党建-堡垒筑“蒋”-网格智治-网格数量'].unit,
      },
      {
        name: '微网格数量',
        value: partyData.value['数字党建-堡垒筑“蒋”-网格智治-微网格数量'].value,
        unit: partyData.value['数字党建-堡垒筑“蒋”-网格智治-微网格数量'].unit,
      },
    ];
  }
  if (tabIndex.value === 2) {
    const res = await IndicatorPositionStarList();
    if (res) {
      listItem.value = res.rows;
    }
  }
  if (tabIndex.value === 3) {
    const res = await IndicatorAnnualInspectionList({
      month: value.value,
      year: year.value,
    });
    if (res) {
      listItem.value = res.rows;
    }
  }
}
let isShowDialogImg = ref(false);
let viewUrl = ref('');
function openViewImg(url) {
  viewUrl.value = url;
  isShowDialogImg.value = true;
}
let imgList = ref([]);
async function initImgList() {
  setTimeout(() => {
    imgList.value = partyData.value['数字党建-清廉护“蒋”-清廉文化'].value.split(',').map((item) => {
      return `${import.meta.env.VITE_APP_API_BASE_URL}/system/oss/download/${item}`;
    });
    console.log('imgList.value', imgList.value);
  }, 300);
}
async function getData() {
  const res = await IndicatorIncorruptibleProtectionList();
  if (res) {
    tableData.value = res.rows;
  }
  const map = await mapPostStationList();
  if (map) {
    mapPath.value = map.rows.filter((item) => item.posthouseType === '清廉阵地');
  }
}
watch();
onMounted(() => {
  getData();
  initImgList();
  tabChange();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.item1 {
  overflow: hidden;
  margin: 0 16px 0 0;
  .title {
    // width: 348px;
    // background: whitesmoke;
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
    // padding: 8px 0 0 8px;
    align-items: center;
    box-sizing: border-box;
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
        margin: 20px 0 0 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 86px 0 62px;
        box-sizing: border-box;
        height: 280px;
        overflow: scroll;
        .item {
          width: 34%;
          margin: 24px 0 0 0;

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
              font-family: PingFangSC-S0pxibold;
              font-weight: 600;
              font-size: 36px;
              color: #c5fbfc;
              margin: 0 18px 0 0;
            }
            .unit {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 16px;
              color: rgba(255, 255, 255, 0.8);
            }
          }
        }
      }
      .list1 {
        margin: 20px 0 0 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 16px 0 16px;
        box-sizing: border-box;

        .item {
          width: 50%;
          margin: 24px 0 0 0;
          .name {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
            height: 40px;
          }
          .value-box {
            display: flex;
            // justify-content: space-between;
            align-items: center;
            .number {
              font-family: PingFangSC-S0pxibold;
              font-weight: 600;
              font-size: 36px;
              color: #c5fbfc;
              margin: 0 30px 0 0;
            }
            .unit {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 16px;
              color: rgba(255, 255, 255, 0.8);
            }
          }
        }
      }
      .list2 {
        height: 280px;
        overflow: scroll;
        .item {
          height: 40px;
          background: #122e63;
          color: #fff;
          margin: 16px 0 0 0;
          display: flex;
          align-items: center;
          padding: 0 16px;
          box-sizing: border-box;
          justify-content: space-between;
        }
      }
      .list3 {
        // overflow: hidden;
        height: 280px;
        .list3-list {
          height: 200px;
          overflow: auto;
        }
        /* 去除滚动条 */
        .list3-list::-webkit-scrollbar {
          display: none;
        }
        .list3-title {
          color: #61f7f9;
          display: flex;
          padding: 0 16px;
          .name {
            width: 30%;
          }
          .flex {
            flex: 1;
            text-align: center;
          }
        }
        .item {
          height: 40px;
          background: #122e63;
          color: #fff;
          margin: 16px 0 0 0;
          display: flex;
          align-items: center;
          padding: 0 16px;
          box-sizing: border-box;
          justify-content: space-between;
          .name {
            width: 30%;
          }
          .flex {
            flex: 1;
            text-align: center;
          }
        }
      }
    }
  }
  .sub2 {
    width: 400px;
    height: 386px;
    background: rgba(92, 132, 253, 0.1);
    border-radius: 8px;
    margin: 28px 0 0 0;
    padding: 0 12px;
    box-sizing: border-box;
    .info {
      .icon-box {
        margin: 12px 0 0 0;
        // width: 338.17px;
        height: 76px;
        text-align: center;
        // background-image: linear-gradient(
        //   90deg,
        //   rgba(47, 93, 142, 0) 1%,
        //   rgba(39, 112, 202, 0.38) 53%,
        //   rgba(31, 127, 255, 0) 100%
        // );
        border-radius: 4px;
        .number {
          font-family: DINAlternate-Bold;
          font-weight: 700;
          font-size: 36px;
          color: #ccfaff;
        }
        .name {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ccfaff;
        }
      }
      .sub-title {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        margin: 18px 0 0 0;
        .left {
          color: rgba(255, 255, 255, 1);
          font-size: 16px;
        }
        .right {
          color: rgba(20, 255, 252, 1);
          font-size: 16px;
        }
      }
      .sub-list {
        // padding: 0 30px 0 0;
        box-sizing: border-box;
        // margin: 16px 0 0 0;
        // overflow: auto;
        height: 190px;
        .img-list {
          height: 150px;
          margin: 12px 0 0 0;
          display: flex;
          justify-content: center;
          .img-item {
            display: flex;
            justify-content: center;
            // width: 273px;
            // height: 157px;
          }
          img {
            // width: 273px;
            // height: 157px;
            // border-radius: 4px;
            object-fit: contain;
            cursor: pointer;
          }
        }
        .list {
          height: 150px;
          overflow: scroll;
          padding: 0 30px 0 0;
          box-sizing: border-box;
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
      }
      /* 去除滚动条 */
      // .sub-list::-webkit-scrollbar {
      //   display: none;
      // }
    }
  }
}
.dialog {
  img {
    width: 220px;
    height: 150px;
    margin: 10px 0 0 0;
  }
}
.dialog-content {
  width: 680px;
  // height: 330px;
  // display: flex;
  // overflow: scroll;
  img {
    max-width: 400px;
    max-height: 400px;
    width: auto;
    height: auto;
    object-fit: scale-down;
    float: left;
    margin-right: 20px;
    line-height: 1;
    vertical-align: top;
  }
  .content-text {
    .dialog-title {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 14px;
      color: #bbb;
      margin: 6px 0 0 0;
    }
    .dialog-value {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 14px;
      color: #ffffff;
      margin: 6px 0 0 0;
    }
  }
}
.dialog-content1-img {
  .proview-img {
    width: 400px;
    height: 400px;
    object-fit: contain;
  }
}
:deep(.el-input) {
  --el-input-bg-color: rgb(205 245 255 / 0%);
  --el-input-border-color: rgb(205 245 255 / 0%);
  width: 80px;
}
:deep(.el-carousel) {
  width: 273px;
  height: 157px;
}
:deep(.el-select) {
  --el-border-color-hover: rgb(205 245 255 / 0%);
}
.head {
  display: flex;
  // justify-content: flex-end;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
}
.el-select {
  // margin: 20px 0 0 0;
}
::-webkit-scrollbar {
  display: none;
}
.sub2-info {
  background: url('@/assets/image/qlhj-bg.png');
  background-size: 100% 100%;
  padding: 0 0 20px 0;
  box-sizing: border-box;
}
</style>
