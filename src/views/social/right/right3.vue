<template>
  <div class="right3">
    <div class="title">
      <div class="left">
        <img class="title-img" src="@/assets/image/lsjt.png" alt="" />
        <div class="text">民生动态</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="info">
      <Tabs :propsData="tabsData" v-model:index="currentIndex" />
      <div class="info-content" v-if="currentIndex === 0">
        <div class="sub1">
          <!-- <div class="sub-title">
            <el-icon><CaretRight /></el-icon>
            <div class="text">活动预告信息</div>
          </div> -->
          <div class="window-box-one" direction="vertical" :autoplay="true" indicator-position="none">
            <div v-for="(item, index) in loveList" :key="index" class="window">
              <img :src="item.url" alt="" />
              <div>
                <div class="text">{{ item.subject }}</div>
                <div class="time">{{ item.useTime }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="info-content" v-if="currentIndex === 1">
        <div class="sub1">
          <div class="sub-title">
            <el-icon><CaretRight /></el-icon>
            <div class="text">活动预告信息</div>
          </div>
          <el-carousel class="window-box" direction="vertical" :autoplay="true" indicator-position="none">
            <el-carousel-item
              v-for="(item, index) in familyList.filter((item) => item.type == 1)"
              :key="index"
              class="window"
              @click="showDialog(item)"
            >
              <img :src="item.url" alt="" />
              <div>
                <div class="text">{{ item.subject }}</div>
                <div class="time">{{ item.useTime }}</div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="sub1">
          <div class="sub-title">
            <el-icon><CaretRight /></el-icon>
            <div class="text">暖心橙色桥</div>
          </div>
          <el-carousel class="window-box" direction="vertical" :autoplay="true" indicator-position="none">
            <el-carousel-item
              v-for="(item, index) in familyList.filter((item) => item.type == 2)"
              :key="index"
              class="window"
              @click="showDialog(item)"
            >
              <img :src="item.url" alt="" />
              <div>
                <div class="text">{{ item.subject }}</div>
                <div class="time">{{ item.useTime }}</div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="info-content" v-if="currentIndex === 2">
        <div class="records-tabs">
          <div class="records-tab" :class="tabIndex === 0 ? 'tabClick' : ''" @click="recordsTabChange(0)">
            救护员培训
          </div>
          <div class="records-tab" :class="tabIndex === 1 ? 'tabClick' : ''" @click="recordsTabChange(1)">普及培训</div>
        </div>
        <vue3-seamless-scroll
          :list="popularizationList.filter((item) => item.type == tabIndex + 1)"
          :hover="true"
          :step="0.5"
          class="records-list"
        >
          <div>
            <div
              @click="showDialog(item)"
              class="records-item"
              v-for="(item, index) in popularizationList.filter((item) => item.type == tabIndex + 1)"
              :key="index"
            >
              {{ item.subject }}
            </div>
          </div>
        </vue3-seamless-scroll>
      </div>
      <div class="info-content" v-if="currentIndex === 3">
        <div class="sub1">
          <div class="veteran-sub-title">
            <div class="sub-title-left">
              <el-icon><CaretRight /></el-icon>
              <div class="text">走访慰问</div>
            </div>
            <div @click="openDialog('veteranDialog')" class="sub-title-right">查看全部</div>
          </div>
          <el-carousel class="window-box" direction="vertical" :autoplay="true" indicator-position="none">
            <div v-for="(item, index) in veteranList" :key="index" class="veteran-window">
              <div class="text">被走访:{{ item.visiting_content }}</div>
              <div class="time">走访方式：{{ visitingTypeMap[item.visiting_type] }}</div>
            </div>
          </el-carousel>
        </div>
        <div class="sub1">
          <div class="veteran-sub-title">
            <div class="sub-title-left">
              <el-icon><CaretRight /></el-icon>
              <div class="text">立功人员</div>
            </div>
            <div @click="openDialog('forestSxbbtjxxDialog')" class="sub-title-right">查看全部</div>
          </div>
          <el-carousel class="window-box" direction="vertical" :autoplay="true" indicator-position="none">
            <div v-for="(item, index) in forestSxbbtjxxData" :key="index" class="veteran-window">
              <div class="text">立功人员：{{ item.awarding_person_name }}</div>
              <div class="time">嘉奖类别：{{ awardingTypeMap[item.awarding_type] }}</div>
            </div>
          </el-carousel>
        </div>
      </div>
    </div>
    <Dialog :title="dialogData.subject" @close="isShowDialog = false" v-if="isShowDialog">
      <template v-slot:content>
        <div class="dialog-content">
          <img :src="dialogData.url" alt="" />
          <div class="text-box">
            <div class="text">{{ dialogData.content }}</div>
            <div class="text">{{ dialogData.useTime }}</div>
          </div>
        </div>
      </template>
    </Dialog>
    <Dialog title="走访慰问" @close="veteranDialog = false" v-if="veteranDialog">
      <template v-slot:content>
        <div class="veteran-dialog-content">
          <table>
            <thead>
              <tr class="thead">
                <th>被走访</th>
                <th>走访方式</th>
                <th>走访内容</th>
                <th>走访时间</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in veteranList" :key="index">
                <td style="width: 140px">{{ item.be_visiting_people_name }}</td>
                <td style="width: 100px">{{ visitingTypeMap[item.visiting_type] }}</td>
                <td style="width: 300px">{{ item.visiting_content }}</td>
                <td>{{ item.visiting_people_date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </Dialog>
    <Dialog title="立功人员" @close="forestSxbbtjxxDialog = false" v-if="forestSxbbtjxxDialog">
      <template v-slot:content>
        <div class="veteran-dialog-content">
          <table>
            <thead>
              <tr class="thead">
                <th>立功授勋人员</th>
                <th>嘉奖类别</th>
                <th>所属部队</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in forestSxbbtjxxData" :key="index">
                <td>{{ item.awarding_person_name }}</td>
                <td>{{ awardingTypeMap[item.awarding_type] }}</td>
                <td>{{ item.troops_name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import {
  IndicatorWarmFamilyList,
  IndicatorFirstAidPopularizationList,
  getForestTyjrzfxx,
  getForestSxbbtjxx,
  IndicatorSetTableTrendsList,
} from '@/api/index';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const test = computed(() => {
  return null;
});
let currentIndex = ref(0);
let tabIndex = ref(0);
let tabsData = ['幸福荟来', '暖心家庭', '急救普及', '退役风采'];
const awardingTypeMap = {
  1: '一等功',
  2: '二等功',
  3: '三等功',
  4: '优秀士兵',
  5: '八一勋章',
  6: '全军士优秀人才奖',
  7: '大军区以上荣誉称号',
  8: '其他',
};
const visitingTypeMap = {
  1: '重要节日',
  2: '退役返乡',
  3: '立功受奖',
  4: '三色人员走访',
  5: '困难帮扶',
  6: '困难核实',
  7: '部队慰问',
  8: '其他',
};
function recordsTabChange(val) {
  tabIndex.value = val;
}
let isShowDialog = ref(false);
let veteranDialog = ref(false);
let forestSxbbtjxxDialog = ref(false);
let dialogData = ref({});
let veteranList = ref([]);
function showDialog(row) {
  console.log(123);
  dialogData.value = row;
  isShowDialog.value = true;
}
function openDialog(dialog) {
  if (dialog === 'veteranDialog') {
    veteranDialog.value = true;
  } else if (dialog === 'forestSxbbtjxxDialog') {
    forestSxbbtjxxDialog.value = true;
  }
}
let familyList = ref([]);
let popularizationList = ref([]);
let loveList = ref([]);
async function getLoveList() {
  const res = await IndicatorSetTableTrendsList('happiness_come', {
    pageNum: 1,
    pageSize: 3,
    orderByColumn: 'useTime',
    isAsc: 'desc',
  });
  if (res.code === 200) {
    loveList.value = res.rows;
  }
}
async function getPopularizationList() {
  const res = await IndicatorFirstAidPopularizationList();
  if (res.code === 200) {
    popularizationList.value = res.rows;
  }
}
async function getFamilyList() {
  const res = await IndicatorWarmFamilyList();
  if (res.code === 200) {
    familyList.value = res.rows;
  }
}
async function getVeteranList() {
  const res = await getForestTyjrzfxx();
  if (res.code === 200) {
    console.log('getForestTyjrzfxx', res.rows);
    veteranList.value = res.rows;
  }
}
let forestSxbbtjxxData = ref([]);
async function getForestSxbbtjxxData() {
  const res = await getForestSxbbtjxx();
  if (res.code === 200) {
    forestSxbbtjxxData.value = res.rows;
  }
}

watch();
onMounted(() => {
  getFamilyList();
  getPopularizationList();
  getVeteranList();
  getForestSxbbtjxxData();
  getLoveList();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.right3 {
  margin: 6px 0 0 0;
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
  .info-content {
    height: 250px;
    .records-tabs {
      display: flex;
      margin: 20px 0 0 0;
      padding: 0 0 0 30px;
      box-sizing: border-box;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.49);
      .records-tab {
        // width: 80px;
        cursor: pointer;
        margin: 0 76px 0 0;
        padding: 0 0 6px 0;
        box-sizing: border-box;
      }
      .tabClick {
        border-bottom: 2px solid #fff;
      }
    }
    .records-list {
      height: 170px;
      overflow: scroll;
      .records-item {
        display: flex;
        align-items: center;
        padding: 0 20px;
        margin: 16px 0 0 0;
        box-sizing: border-box;
        height: 40px;
        background: url('@/assets/image/info-bg.png');
        background-size: 100% 100%;
        border-radius: 8px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
      }
    }
    .sub1 {
      margin: 18px 0 0 0;
      .sub-title {
        display: flex;
        align-items: center;
        color: #fff;
        .text {
          margin: 0 0px 0 6px;
        }
      }
      .veteran-sub-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        .sub-title-left {
          display: flex;
          .text {
            margin: 0 0px 0 6px;
          }
        }
        .sub-title-right {
          width: 56px;
          height: 20px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #26e0ff;
          cursor: pointer;
        }
      }

      .window-box {
        height: 100px;
        overflow: hidden;
      }
      .window-box-one {
        height: 220px;
        overflow: scroll;
      }
      .window {
        width: 428px;
        height: 79px;
        background: rgba(25, 116, 195, 0.2);
        border-radius: 8px;
        display: flex;
        align-items: center;
        padding: 0 0 0 16px;
        box-sizing: border-box;
        margin: 16px 0 0 0;
        img {
          width: 58px;
          height: 58px;
          border-radius: 4px;
          margin: 0 22px 0 0;
        }
        .text {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
        .time {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
          margin: 10px 0 0 0;
        }
      }
      .veteran-window {
        padding: 0 24px;
        box-sizing: border-box;
        background: url('@/assets/image/veteran-bg.png');
        height: 40px;
        background-size: 100% 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #cce7ff;
        margin: 8px 0 0 0;
      }
      .icon-list {
        margin: 12px 0 0 0;
        display: flex;
        .icon-item {
          display: flex;
          margin: 0 12px 0 0;
          img {
            width: 78.09px;
            height: 78px;
            border-radius: 4px;
            object-fit: contain;
            margin: 0 12px 0 0;
          }
          .user {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .icon-name {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 14px;
              color: #ffffff;
              letter-spacing: 0;
            }
            .icon-tag {
              width: 52px;
              height: 22px;
              background: #ffffff14;
              border: 1px solid #ffffff33;
              border-radius: 2px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #ffffffa6;
              margin: 8px 0 0 0;
            }
          }
        }
      }
    }
  }
  .dialog-content {
    display: flex;
    img {
      width: 400px;
      height: 400px;
      // width: auto;
      // height: auto;
      object-fit: scale-down;
      float: left;
      margin-right: 20px;
      line-height: 1;
      vertical-align: top;
    }
    .text-box {
      width: 400px;
    }
  }
  .veteran-dialog-content {
    width: 820px;
    height: 460px;
    overflow: scroll;
    table {
      width: 100%;
      border-collapse: collapse;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 18px;
      color: #ffffff;
      letter-spacing: 0;

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
}
</style>
