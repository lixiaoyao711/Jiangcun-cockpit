<template>
  <div class="right1">
    <div class="title">
      <div class="text">文化蒋村</div>
    </div>
    <Tabs :propsData="tabsData" v-model:index="currentIndex" />
    <div class="info" v-if="currentIndex === 0">
      <div class="right1-left">
        <img src="@/assets/image/lz.png" alt="" />
        <div class="text">龙舟文化</div>
      </div>
      <div class="right1-right">
        <div @click="openDialog(0)" class="item">
          <div class="text">龙舟陈列</div>
          <el-icon><Position /></el-icon>
        </div>
        <div @click="openDialog(1)" class="item">
          <div class="text">龙舟胜会</div>
          <el-icon><Position /></el-icon>
        </div>
        <div @click="openDialog(2)" class="item">
          <div class="text">其他非遗</div>
          <el-icon><Position /></el-icon>
        </div>
      </div>
    </div>
    <div class="info1" v-if="currentIndex === 1">
      <!-- <div class="text">这里是介绍</div>
      <img class="info-img" src="@/assets/image/no-data.png" alt="" /> -->
      <div v-html="generalData['首页-文化蒋村-群众文化-群众文化介绍'].value"></div>
    </div>
    <div class="info2" v-if="currentIndex === 2">
      <div class="info2-title">
        <div class="item" @click="oepnUrl('http://www.xixiwetland.com.cn')">
          <el-icon><Orange /></el-icon>西溪湿地
        </div>
        <div class="item" @click="oepnUrl('http://sdbwg.hzxh.gov.cn')">
          <el-icon><Orange /></el-icon>西溪湿地博物馆
        </div>
      </div>
      <el-carousel class="window-box" height="110px" :autoplay="true"  arrow="never">
        <el-carousel-item v-for="(item, index) in cultureList" :key="index" class="window-item">
          <div class="window-title">{{ item.label }}</div>
          <div class="window-name">{{ item.name }}</div>
          <div class="window-info">{{ item.value }}</div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <Dialog :title="'龙舟文化'" @close="dialog = false" v-if="dialog">
      <template v-slot:content>
        <div class="dialog-info">
          <Tabs :propsData="tabsData1" v-model:index="currentIndex1" />
          <div class="box" v-if="currentIndex1 === 0">
            <div class="list">
              <div class="item" v-for="(item, index) in listData" :key="index">
                <img :src="item.url" alt="" />
                <div class="item-title">{{ item.name }}</div>
              </div>
            </div>
          </div>
          <div class="box1" v-if="currentIndex1 === 1">
            <div v-html="generalData['首页-文化蒋村-龙舟胜会-龙舟胜会简介'].value"></div>
          </div>
          <div class="box2" v-if="currentIndex1 === 2">
            <div class="list">
              <div class="item">
                <div class="name">国遗</div>
                <div class="right">
                  <span class="number">{{ generalData['首页-文化蒋村-其他非遗-国遗'].value }}</span>
                  <span class="unit">个</span>
                </div>
              </div>
              <div class="item">
                <div class="name">省遗</div>
                <div class="right">
                  <span class="number">{{ generalData['首页-文化蒋村-其他非遗-省遗'].value }}</span>
                  <span class="unit">个</span>
                </div>
              </div>
              <div class="item">
                <div class="name">市遗</div>
                <div class="right">
                  <span class="number">{{ generalData['首页-文化蒋村-其他非遗-市遗'].value }}</span>
                  <span class="unit">个</span>
                </div>
              </div>
              <div class="item">
                <div class="name">区遗</div>
                <div class="right">
                  <span class="number">{{ generalData['首页-文化蒋村-其他非遗-区遗'].value }}</span>
                  <span class="unit">个</span>
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
import { IndicatorDragonBoatDisplayList } from '@/api/index';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const generalData = computed(() => {
  return store.state.generalData;
});
let tabsData = ['龙舟文化', '群众文化', '湿地文化'];
let tabsData1 = ['龙舟陈列馆', '龙舟胜会', '其他非遗'];
let cultureList = ref([]);
let currentIndex = ref(0);
let currentIndex1 = ref(0);
let dialog = ref(false);
let listData = ref([]);
function oepnUrl(url) {
  window.open(url);
}
async function getList() {
  const res = await IndicatorDragonBoatDisplayList();
  if (res.code === 200) {
    listData.value = res.rows;
  }
  cultureList.value = [
    {
      label: '名人雅集',
      name: generalData.value['首页-文化蒋村-湿地文化-名人名称'].value,
      value: generalData.value['首页-文化蒋村-湿地文化-名人内容'].value,
    },
    {
      label: '古韵胜迹',
      name: generalData.value['首页-文化蒋村-湿地文化-古迹名称'].value,
      value: generalData.value['首页-文化蒋村-湿地文化-古迹内容'].value,
    },
    {
      label: '水乡民俗',
      name: generalData.value['首页-文化蒋村-湿地文化-民俗名称'].value,
      value: generalData.value['首页-文化蒋村-湿地文化-民俗内容'].value,
    },
    {
      label: '西溪风物',
      name: generalData.value['首页-文化蒋村-湿地文化-特产名称'].value,
      value: generalData.value['首页-文化蒋村-湿地文化-特产内容'].value,
    },
  ];
}
function openDialog(index) {
  currentIndex1.value = index;
  dialog.value = true;
}
watch();
onMounted(() => {
  getList();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.tabs {
  margin-top: 26px;
  width: 455px;
  height: 28px;
  background-image: linear-gradient(180deg, rgba(205, 245, 255, 0.24) 0%, rgba(101, 166, 255, 0.12) 99%);
  border-radius: 5px;
  display: flex;
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
.right1 {
  .right-tabs {
    margin-top: 30px;
  }
  .info {
    margin-top: 20px;
    height: 160px;
    display: flex;
    .right1-left {
      width: 80px;
      height: 148px;
      background: rgba(116, 190, 255, 0.2);
      border-radius: 8px;
      margin-right: 18px;
      padding: 12px 12px;
      box-sizing: border-box;
      img {
        width: 57px;
        height: 30px;
        // background: #34ffcc;
      }
      .text {
        margin-top: 16px;
        width: 53px;
        height: 57px;
        font-family: HelloFont-WenYiHei;
        font-weight: WenYiHei;
        font-size: 21px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
      }
    }
    .right1-right {
      .item {
        cursor: pointer;
        width: 353px;
        height: 44px;
        background: rgba(116, 190, 255, 0.2);
        border-radius: 4px;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 18px;
        box-sizing: border-box;
        .text {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
        }
      }
      .item:not(:first-child) {
        margin-top: 8px;
      }
    }
  }
  .info1 {
    margin: 20px 0 0 0;
    color: #fff;
    height: 160px;
    overflow: scroll;
    .text {
      color: #fff;
    }
    .info-img {
      width: 150px;
      height: 100px;
      margin: 20px 0 0 0;
    }
  }
  .info2 {
    height: 160px;
    // overflow: scroll;
    margin: 20px 0 0 0;
    .info2-title {
      cursor: pointer;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 16px;
      color: #73d5e5;
      display: flex;
      justify-content: space-around;
      position: relative;
      .item {
        display: flex;
        align-items: center;
        .el-icon {
          margin: 0 6px 0 0;
          color: #73d5e5;
        }
      }
      .info2-dialog {
        // background: rgba(13, 24, 101, 0.9);
        // width: 350px;
        // color: #fff;
        // padding: 10px 20px;
        // box-sizing: border-box;
        // position: absolute;
        // left: -60%;
        .info2-dialog-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .el-icon {
            cursor: pointer;
          }
        }
        .name {
          margin: 30px 0 0 0;
        }
      }
    }
    .window-box {
      // width: 407px;
      // height: 160px;
      background: rgba(25, 116, 195, 0.1);
      border-radius: 8px;
      padding: 23px;
      box-sizing: border-box;
      .window-title {
        font-family: SourceHanSerifCN-Bold;
        font-weight: 700;
        font-size: 16px;
        color: #15ffcc;
      }
      .window-name {
        font-family: SourceHanSerifCN-Bold;
        font-weight: 700;
        font-size: 16px;
        color: #ffffff;
        margin: 28px 0 0 0;
      }
      .window-info {
        font-family: SourceHanSerifCN-Bold;
        font-weight: 700;
        font-size: 18px;
        color: #ffffff;
        margin: 20px 0 0 0;
      }
      .window-item {
        height: 120px;
        overflow: scroll;
      }
    }
    .window {
      width: 407px;
      height: 47px;
      background: rgba(25, 116, 195, 0.1);
      border-radius: 8px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 16px;
      color: #15ffcc;
      display: flex;
      align-items: center;
      padding: 0 0 0 24px;
      box-sizing: border-box;
      margin: 15px 0 0 0;
    }
  }
}

.dialog-info {
  width: 400px;
  height: 400px;
  overflow: scroll;
  .box {
    .list {
      margin: 30px 0 0 0;
      // padding: 0 0 0 16px;
      box-sizing: border-box;
      display: flex;
      // justify-content: space-between;
      flex-wrap: wrap;
      .item {
        width: 160px;
        text-align: center;
        margin: 0 20px 20px;
        font-size: 20px;
        img {
          // width: 123.64px;
          // height: 76px;
          width: 100%;
          height: auto;
        }
        .item-title {
          color: #fff;
          margin-top: 10px;
        }
      }
    }
  }
  .box1 {
    margin: 30px 0 0 0;

    overflow: scroll;
    .name {
      color: #fff;
      font-size: 18px;
    }
    img {
      width: 123.64px;
      height: 76px;
      margin: 10px 0 0 0;
    }
  }
  .box2 {
    margin: 30px 0 0 0;
    .list {
      width: 400px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .item {
        margin: 16px 0 0 0;
        width: 180px;
        height: 44px;
        background: url('@/assets/image/home-iten-bg.png');
        background-size: 100% 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 12px;
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
  }
}
/* 去除滚动条 */
::-webkit-scrollbar {
  display: none;
}
</style>
