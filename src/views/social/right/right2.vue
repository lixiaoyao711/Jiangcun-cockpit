<template>
  <div class="right2">
    <div class="title">
      <div class="left">
        <img class="title-img" src="@/assets/image/lsjt.png" alt="" />
        <div class="text">公共服务</div>
      </div>
      <div class="icon"></div>
    </div>
    <div class="info">
      <Tabs :propsData="tabsData" v-model:index="currentIndex" />
      <div class="info-data" v-if="currentIndex === 0">
        <div class="info-data-title">
          <div class="info-data-title-name">AED点位数量</div>
          <div class="info-data-title-value-box">
            <div class="number">{{ AEDdata.length }}</div>
            <div class="unit">个</div>
          </div>
        </div>
        <div class="AED-list">
          <vue3-seamless-scroll :list="AEDdata" :hover="true" :step="0.5">
            <div @click="showMapInfoWindow(item)" class="AED-item" v-for="(item, index) in AEDdata" :key="index">
              <div :title="item.addressName" class="name">{{ item.addressName }}</div>
              <el-icon ><Promotion /></el-icon>
            </div>
          </vue3-seamless-scroll>
        </div>
      </div>
      <!-- <div class="info-data" v-if="currentIndex === 1">
        <el-slider v-model="value" range :max="100" />
        <div class="list">
          <div class="item">
            <div class="icon">82.3%</div>
            <div>
              <div class="value-box">
                <span class="number">86.86</span>
                <span class="unit">万人</span>
              </div>
              <div class="name">第一剂接种</div>
            </div>
          </div>
          <div class="item">
            <div class="icon">82.3%</div>
            <div>
              <div class="value-box">
                <span class="number">61.3</span>
                <span class="unit">万人</span>
              </div>
              <div class="name">第二剂接种</div>
            </div>
          </div>
          <div class="item">
            <div class="icon">79%</div>
            <div>
              <div class="value-box">
                <span class="number">50</span>
                <span class="unit">万人</span>
              </div>
              <div class="name">加强针接种</div>
            </div>
          </div>
          <div class="item">
            <div class="icon">0.9%</div>
            <div>
              <div class="value-box">
                <span class="number">1.77</span>
                <span class="unit">万人</span>
              </div>
              <div class="name">未接种人数</div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="info-data" v-if="currentIndex === 1">
        <div class="tab3">
          <div class="tab3-bg">
            <div class="tab3-titile">劳动年龄段常住人口</div>
            <div class="value-box">
              <div class="value">
                {{ showDataMap('数字社会', '1648665974276370433').value }}
              </div>
              <div class="unit">
                {{ showDataMap('数字社会', '1648665974276370433').unit }}
              </div>
            </div>
            <div class="icon-box" :class="item.class" v-for="(item, index) in peopleList" :key="item">
              <div class="icon-title">
                <span class="title-value"> {{ item.value }} </span>
                <span class="title-unit"> {{ item.unit }} </span>
              </div>
              <div class="footer">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import { mapDigitalSocietyList } from '@/api/index';
import { formatMapData } from '@/utils/map.js';
import { showDataMap } from '@/utils/common';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
let currentIndex = ref(0);
const socialData = computed(() => {
  return store.state.socialData;
});

let tabsData = ['AED', '就业帮扶'];

let value = ref(0);
let AEDdata = ref([]);

let peopleList = ref([]);
// 初始化数据
function initData() {
  peopleList.value = [
    {
      name: '就业人员',
      class: 'one',
      value: showDataMap('数字社会', '1648666056417619970').value,
      unit: showDataMap('数字社会', '1648666056417619970').unit,
    },
    {
      name: '其他未就业',
      class: 'two',
      value: showDataMap('数字社会', '1648666207634862081').value,
      unit: showDataMap('数字社会', '1648666207634862081').unit,
    },
    {
      name: '失业人员',
      class: 'three',
      value: showDataMap('数字社会', '1648666136642072578').value,
      unit: showDataMap('数字社会', '1648666136642072578').unit,
    },
  ];
}
// 获取AED点位
async function getMapData() {
  const res = await mapDigitalSocietyList();
  if (res) {
    AEDdata.value = res.rows.filter((item) => item.typeTwo === 'AED点位');
    formatMapData(AEDdata.value);
    console.log('AED数据', AEDdata.value);
  }
}
// 在地图上显示对应窗体信息
function showMapInfoWindow(row) {
  store.commit('setMapInfoWindow', row);
}
watch();
onMounted(() => {
  getMapData();
  initData();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.right2 {
  margin: 20px 0 0 0;
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
    height: 230px;
    .info-data {
      margin: 20px 0 0 0;
      padding: 0 16px;
      box-sizing: border-box;
      height: 180px;
      .tab3 {
        display: flex;
        justify-content: center;
        .tab3-bg {
          width: 321.5px;
          height: 200px;
          background: url('@/assets/image/位图.png');
          background-size: 100% 100%;
          padding: 0 0 0 0;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          .tab3-titile {
            font-weight: 600;
            font-size: 14px;
            color: #ffffff;
            text-align: center;
          }
          .value-box {
            display: flex;
            align-items: center;
            margin: 0 0 0 0;
            .value {
              font-family: DINAlternate-Bold;
              font-weight: 700;
              font-size: 32px;
              color: #26e0ff;
              margin: 0 6px 0 0;
            }
            .unit {
              font-family: PingFangSC-SNaNpxibold;
              font-weight: 600;
              font-size: 12px;
              color: #ffffff;
            }
          }
          .icon-box {
            width: 85px;
            height: 70px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            .icon-title {
              font-family: PingFangSC-Medium;
              font-weight: 500;
              font-size: 22px;
              color: #ffffff;
              .title-value {
                margin: 0 2px 0 0;
                font-size: 19px;
              }
              .title-unit {
                font-family: PingFangSC-Regular;
                font-weight: 400;
                font-size: 14px;
                color: #ffffff;
              }
            }
            .footer {
              font-family: PingFangSC-Regular;
              font-weight: 400;
              font-size: 14px;
              color: #ffffff;
            }
          }
          .one {
            background: url('@/assets/image/jyry.png');
            background-size: 100% 100%;
            position: absolute;
            left: 0;
            bottom: 50px;
          }
          .two {
            background: url('@/assets/image/qtwwc.png');
            background-size: 100% 100%;
            position: absolute;
            transform: translateX(-50%);
            left: 50%;
            bottom: 30px;
          }
          .three {
            background: url('@/assets/image/syry.png');
            background-size: 100% 100%;
            position: absolute;
            right: 0;
            bottom: 50px;
          }
        }
      }
    }
    .info-data-title {
      width: 435px;
      height: 44px;
      background: rgba(116, 190, 255, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
      box-sizing: border-box;
      .info-data-title-name {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
      }
      .info-data-title-value-box {
        display: flex;
        align-items: center;
        .number {
          font-family: DINAlternate-Bold;
          font-weight: 700;
          font-size: 32px;
          color: #e0fffe;
        }
        .unit {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
          margin: 0 0 0 16px;
        }
      }
    }
    .AED-list {
      height: 130px;
      overflow: scroll;
      .AED-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        height: 40px;
        border-radius: 8px;
        background: url('@/assets/image/info-bg.png');
        background-size: 100% 100%;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
        margin: 16px 0 0 0;
        cursor: pointer;
        .name {
          width: 2000px;
          overflow: hidden; //溢出内容隐藏
          display: inline-block;
          white-space: nowrap; //强制文本在一行内显示
          text-overflow: ellipsis; //当对象内文本溢出时显示省略号标记
        }
      }
    }
    .list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .item {
        display: flex;
        margin: 10px 0 0 0;
        width: 38%;
        .icon {
          width: 44px;
          height: 47px;
          // background-image: linear-gradient(180deg, rgba(205, 247, 255, 0) 0%, rgba(158, 234, 255, 0.7) 100%);
          background: url('@/assets/image/jz-blue.png');
          background-size: 100% 100%;
          margin: 0 10px 0 0;
          font-family: DINAlternate-Bold;
          font-weight: 700;
          font-size: 16px;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .value-box {
          .number {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 24px;
            color: #ffffff;
            margin: 0 6px 0 0;
          }
          .unit {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
          }
        }
        .name {
          margin: 6px 0 0 0;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #c5fbfc;
        }
      }
    }
    .tab-card-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .tab-card {
        width: 34%;
        margin: 6px 0 0 0;
        .tab-card-title {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
        .value {
          margin: 4px 0 0 0;
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
        .tag {
          height: 21px;
          background: rgba(78, 171, 255, 0.44);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 12px;
          color: #ffffff;
        }
        .tag-red {
          background: rgba(120, 67, 91, 0.44);
        }
      }
    }
    .info-window {
      // width: 429px;
      height: 43px;
      background: url('@/assets/image/home-iten-bg.png');
      background-size: 100% 100%;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 14px;
      box-sizing: border-box;
      .info-window-title {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
      }
      .info-window-value {
        display: flex;
        align-items: center;
        .numer {
          font-family: PingFangSC-SNaNpxibold;
          font-weight: 600;
          font-size: 24px;
          color: #ffffff;
          margin: 0 8px 0 0;
        }
        .unit {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
      }
    }
    .info-window-list {
      height: 93px;
      background: url('@/assets/image/home-iten-bg.png');
      background-size: 100% 100%;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
      box-sizing: border-box;
      margin: 16px 0 0 0;
      .info-window-list-item {
        width: 40%;
        .el-icon {
          margin: 0 0 0 6px;
        }
        .info-window-title {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
        .info-window-value {
          display: flex;
          align-items: center;
          .numer {
            font-family: PingFangSC-SNaNpxibold;
            font-weight: 600;
            font-size: 24px;
            color: #ffffff;
            margin: 0 8px 0 0;
          }
          .unit {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
          }
        }
      }
      .sub-item {
        width: 22%;
      }
    }
  }
}
</style>
