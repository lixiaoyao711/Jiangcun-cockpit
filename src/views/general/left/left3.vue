<template>
  <div class="left3">
    <div class="title">
      <div class="text">政治协商</div>
    </div>
    <div class="list">
      <div class="item" @click="dialog1 = true">
        <div class="text">协商委员</div>
        <div class="right">
          <div class="number">{{ dataList.filter((item) => item.type == 1).length }}</div>
          <div class="unit">个</div>
        </div>
      </div>
      <div class="item" @click="dialog2 = true">
        <div class="text">协商驿站</div>
        <div class="right">
          <div class="number">{{ dataList.filter((item) => item.type == 2).length }}</div>
          <div class="unit">个</div>
        </div>
      </div>
    </div>
    <!-- <vue3-seamless-scroll class="scroll-box" :list="dataList" :step="0.5" :hover="true"> -->
    <div class="window scroll-box" @click="openInfo">
      <span>协商活动</span>
      <el-icon><ArrowRight /></el-icon>
    </div>
    <!-- </vue3-seamless-scroll> -->

    <Dialog :title="'协商委员'" @close="dialog1 = false" v-if="dialog1">
      <template v-slot:content>
        <div class="dialog1-list">
          <div class="dialog1-item" v-for="(item, index) in dataList.filter((item) => item.type == 1)" :key="index">
            <div class="name">{{ item.subject }}</div>
            <div class="leader" :title="item.jobs">{{ item.jobs }}</div>
          </div>
        </div>
      </template>
    </Dialog>
    <Dialog :title="'协商驿站'" @close="dialog2 = false" v-if="dialog2">
      <template v-slot:content>
        <div class="dialog1-list">
          <div class="list-title">
            <div class="text1">驿站名称</div>
            <div class="text2">站长</div>
            <div class="text3">站内委员</div>
          </div>
          <div class="list-item" v-for="(item, index) in dataList.filter((item) => item.type == 2)" :key="index">
            <div class="text1">{{ item.subject }}</div>
            <div class="text2">{{ item.leader }}</div>
            <div class="text3" :title="item.committeeMember">{{ item.committeeMember }}</div>
          </div>
        </div>
      </template>
    </Dialog>
    <Dialog :title="'活动详情'" @close="dialog3 = false" v-if="dialog3">
      <template v-slot:content>
        <div class="info">
          <Tabs class="tabs" :propsData="tabsData" v-model:index="tabIndex" @tabChange="handleTabChange" />
          <el-carousel height="360px" :autoplay="false" v-if="showCarousel">
            <el-carousel-item v-for="(item, index) in carouselList" :key="index">
              <div class="content" v-if="item.url">
                <img class="dialog-img" :src="item.url" alt="" />
                <div class="dialog-cotent">
                  <div class="content-title">活动时间</div>
                  <div class="content-text">{{ item.useDate }}</div>
                  <div class="content-title">活动内容</div>
                  <div class="content-text">
                    {{ item.content }}
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import { IndicatorPoliticalConsultationList } from '@/api/index';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import { computed, nextTick } from 'vue';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const test = computed(() => {
  return null;
});
let tabsData = ['请你来协商', '协商驿站', '共享法庭'];
let dialog1 = ref(false);
let dialog2 = ref(false);
let dialog3 = ref(false);
let tabIndex = ref(0);
let dataList = ref([]);
let showCarousel = ref(true);
let carouselList = computed(() => dataList.value.filter((item) => item.xshdType == tabIndex.value + 1).slice(0, 5));

async function getList() {
  const res = await IndicatorPoliticalConsultationList({
    orderByColumn: 'createTime',
    isAsc: 'desc',
  });
  if (res.code === 200) {
    dataList.value = res.rows;
  }
}
let infoData = ref({});
function openInfo(row) {
  console.log(row);
  infoData.value = row;
  dialog3.value = true;
}
function handleTabChange() {
  showCarousel.value = false;
  nextTick(() => {
    showCarousel.value = true;
  });
}
watch();
onMounted(() => {
  getList();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
div.tabs {
  height: 28px;
  background-image: linear-gradient(180deg, rgba(205, 245, 255, 0.24) 0%, rgba(101, 166, 255, 0.12) 99%);
  border-radius: 5px;
  display: flex;
  margin-top: 0;
  .tab {
    width: 97px;
    height: 28px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
  }
  .clickTab {
    background-image: linear-gradient(180deg, rgba(96, 172, 255, 0.8) 0%, rgba(96, 160, 255, 0.24) 98%);
  }
}
.title {
  width: 452px;
  height: 44px;
  background-image: url('@/assets/image/title-bg (2).png');
  background-size: 100% 100%;
  padding: 0 0 0 56px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .text {
    font-family: YouSheBiaoTiHei;
    font-size: 28px;
    color: #ffffff;
  }
  .link {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    font-size: 14px;
    color: #73d5e5;
    cursor: pointer;
  }
}
.left3 {
  margin-top: 16px;
  .list {
    display: flex;
    justify-content: space-between;
    .item {
      padding-left: 22px;
      box-sizing: border-box;
      width: 182px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      cursor: pointer;
      .text {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
      }
      .right {
        display: flex;
        align-items: center;
        .number {
          font-family: DINAlternate-Bold;
          font-weight: Bold;
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
  .scroll-box {
    overflow: hidden;
    height: 47px;
    background: url('@/assets/image/info-bg.png');
    background-size: 100% 100%;
  }
  .window {
    width: 407px;
    height: 47px;

    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    // position: relative;
    cursor: pointer;
    font-size: 16px;
    color: #15ffcc;
    .el-icon {
      color: #fff;
      font-size: 20px;
    }
  }

  .title-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-text {
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

  .dialog1-list {
    margin: 10px 0 0 0;
    max-height: 400px;
    overflow: scroll;
    width: 600px;
    .dialog1-item {
      margin: 10px 0 0 0;
      height: 47px;
      background: rgba(25, 116, 195, 0.1);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      box-sizing: border-box;
      .name {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
        width: 200px;
      }
      .leader {
        cursor: pointer;
        font-family: PingFangSC-S0pxibold;
        font-weight: 600;
        font-size: 16px;
        color: #73d5e5;
        width: 400px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; //多行在这里修改数字即可
        overflow: hidden;
        -webkit-box-orient: vertical;
      }
    }
    .list-title {
      display: flex;
      padding: 0 0 0 20px;
      div {
        font-family: PingFangSC-Regular;
        font-weight: 600;
        font-size: 18px;
        color: #ffffff;
      }
      .text1 {
        width: 200px;
      }
      .text2 {
        width: 100px;
      }
      .text3 {
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; //多行在这里修改数字即可
        overflow: hidden;
        -webkit-box-orient: vertical;
      }
    }
    .list-item {
      height: 47px;
      background: rgba(25, 116, 195, 0.1);
      border-radius: 8px;
      display: flex;
      align-items: center;
      margin: 10px 0 0 0;
      padding: 0 0 0 20px;
      box-sizing: border-box;
      div {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
      }
      .text1 {
        width: 200px;
      }
      .text2 {
        width: 100px;
      }
      .text3 {
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; //多行在这里修改数字即可
        overflow: hidden;
        -webkit-box-orient: vertical;
        cursor: pointer;
      }
    }
  }
  .info {
    .text {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 16px;
      color: #ffffff;
    }
    .dialog-img {
      max-width: 300px;
      max-height: 300px;
      width: auto;
      height: auto;
      object-fit: scale-down;
      float: left;
      margin-right: 20px;
      margin-bottom: 10px;
      line-height: 1;
      vertical-align: top;
    }
    .content {
      margin: 16px 0 0 0;
      height: 100%;
      overflow: scroll;
    }
    .dialog-cotent {
      .content-title {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 14px;
        color: #8392a1;
        margin: 6px 0 0 0;
      }
      .content-text {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 14px;
        color: #ffffff;
        margin: 6px 0 0 0;
      }
    }
  }
}
.info {
  width: 600px;
  height: 400px;
}
/* 去除滚动条 */
::-webkit-scrollbar {
  display: none;
}
</style>
