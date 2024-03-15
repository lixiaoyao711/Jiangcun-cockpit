<template>
  <div class="left4">
    <div class="title">
      <div class="text">活力蒋村</div>
    </div>

    <Tabs :propsData="tabsData" v-model:index="currentIndex" />
    <div class="content">
      <div class="list" v-if="currentIndex === 0">
        <div class="item">
          <div class="name">园区数</div>
          <div class="right">
            <div class="number">{{ showDataMap('数字经济', '1640953080495489026').value }}</div>
            <div class="unit">个</div>
          </div>
        </div>
        <div class="item">
          <div class="name">企业总数</div>
          <div class="right">
            <div :title="workCount" class="number">{{ workCount }}</div>
            <div class="unit">家</div>
          </div>
        </div>
        <div class="item">
          <div class="name">亿元楼</div>
          <div class="right">
            <div class="number">{{ showDataMap('数字经济', '1640953130235740162').value }}</div>
            <div class="unit">幢</div>
          </div>
        </div>
        <div class="item">
          <div class="name">千万元楼</div>
          <div class="right">
            <div class="number">{{ showDataMap('数字经济', '1640953175513251842').value }}</div>
            <div class="unit">幢</div>
          </div>
        </div>
        <div class="item">
          <div class="name">亩均坪效</div>
          <div class="right">
            <div :title="showDataMap('数字经济', '1640953312511803394').value" class="number">
              {{ showDataMap('数字经济', '1640953312511803394').value }}
            </div>
            <div class="unit">元/㎡</div>
          </div>
        </div>
      </div>
      <div class="list2" v-if="currentIndex === 1">
        <div class="item2">
          <div class="item2-title">总税收</div>
          <div class="item2-value">
            <div>
              {{ showDataMap('数字经济', '1582667112638586881').value.replace(/\,/g, '~') }}
            </div>
            <div>
              {{ showDataMap('数字经济', '1582667181127376897').value }}
              {{ showDataMap('数字经济', '1582667181127376897').unit }}
            </div>
          </div>
        </div>
        <div class="item2">
          <div class="item2-title">一般公共预算收入</div>
          <div class="item2-value">
            <div>
              {{ showDataMap('数字经济', '1602584137766883329').value.replace(/\,/g, '~') }}
            </div>
            <div>
              {{ showDataMap('数字经济', '1602584467799887873').value }}
              {{ showDataMap('数字经济', '1602584467799887873').unit }}
            </div>
          </div>
        </div>
      </div>
      <div class="list3" v-if="currentIndex === 2">
        <div class="item3">
          <div class="item3-box">
            <div class="item3-title">本月走访</div>
            <div class="item3-value">
              <div class="item3-number">{{ showDataMap('数字经济', '1640956459087052801').value }}</div>
              <div class="item3-unit">次</div>
            </div>
          </div>
          <div class="item3-box">
            <div class="item3-title">累计走访</div>
            <div class="item3-value">
              <div class="item3-number">{{ showDataMap('数字经济', '1640956608379109378').value }}</div>
              <div class="item3-unit">次</div>
            </div>
          </div>
        </div>
        <div class="item3">
          <div class="item3-box">
            <div class="item3-title">解决企业问题</div>
            <div class="item3-value">
              <div class="item3-number">{{ showDataMap('数字经济', '1640956660212318210').value }}</div>
              <div class="item3-unit">个</div>
            </div>
          </div>
          <!-- <div class="item3-box">
            <div class="item3-title">累计兑付</div>
            <div class="item3-value">
              <div class="item3-number">80</div>
              <div class="item3-unit">万</div>
            </div>
          </div> -->
        </div>
        <div class="item3-window">
          <div class="item3-window-title">政策惠企</div>
          <div class="item3-window-value">
            <div class="item3-window-number">{{ showDataMap('数字经济', '1640956725844787201').value }}</div>
            <div class="item3-window-unit">家</div>
          </div>
        </div>
      </div>
      <div class="list4" v-if="currentIndex === 3">
        <div class="item3">
          <div class="item3-box">
            <div class="item3-title">助企平台日活</div>
            <div class="item3-value">
              <div class="item3-number">9</div>
              <div class="item3-unit">家</div>
            </div>
          </div>
          <div class="item3-box">
            <div class="item3-title">助企平台月活</div>
            <div class="item3-value">
              <div class="item3-number">12</div>
              <div class="item3-unit">家</div>
            </div>
          </div>
        </div>
        <div class="item3">
          <div class="item3-box">
            <div class="item3-title">注册数</div>
            <div class="item3-value">
              <div class="item3-number">100</div>
              <div class="item3-unit">家</div>
            </div>
          </div>
          <div class="item3-box">
            <div class="item3-title">信息回复率</div>
            <div class="item3-value">
              <div class="item3-number">90</div>
              <div class="item3-unit">%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { showDataMap } from '@/utils/common';
import { getForestQydztjxx } from '@/api';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
let workCount = ref(0);
let tabsData = ['楼宇概况', '区域经济', '走楼访企'];
let currentIndex = ref(0);
async function getForestQydztjxxData() {
  let res = await getForestQydztjxx();
  if (res.code === 200) {
    workCount.value =
      Number(res.rows[0].all_in) +
      Number(res.rows[0].zcdin_szdnot_czfpin) +
      Number(res.rows[0].zcdnot_szdin_czfpin) +
      Number(res.rows[0].zcdnot_szdnot_czfpin);
  }
}

watch();
onMounted(() => {
  getForestQydztjxxData();
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
.left4 {
  margin-top: 16px;
  .content {
    height: 160px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      width: 50%;
      display: flex;
      align-items: center;
      padding-left: 26px;
      // padding-right: 26px;
      margin-top: 16px;
      box-sizing: border-box;
      .name {
        width: 80px;
        height: 22px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
        margin-right: 8px;
      }
      .right {
        // width: 00px;
        display: flex;
        align-items: center;
        .number {
          font-family: DINAlternate-Bold;
          font-weight: Bold;
          font-size: 26px;
          color: #e0fffe;
          margin-right: 12px;
          cursor: pointer;
          width: 60px;
          overflow: hidden; //溢出内容隐藏
          display: inline-block;
          white-space: nowrap; //强制文本在一行内显示
          text-overflow: ellipsis; //当对象内文本溢出时显示省略号标记
        }
        .unit {
          width: 50px;
          height: 20px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
  }
  .list2 {
    // padding: 0px 6px 0px 6px;
    // box-sizing: border-box;
    overflow: auto;
    .item2 {
      height: 56px;
      background: url('@/assets/image/info-bg.png');
      background-size: 100% 100%;
      margin: 16px 0 0 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      .item2-title {
        color: #fff;
        font-size: 18px;
      }
      .item2-value {
        display: flex;
        justify-content: space-between;
        color: #6ec9d5;
        width: 50%;
        font-size: 16px;
      }
    }
  }
  .list3,
  .list4 {
    padding: 10px 20px 0;
    box-sizing: border-box;
    .item3 {
      display: flex;

      justify-content: space-between;
      .item3-box {
        width: 44%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item3-title {
          font-size: 16px;
          color: #ffffff;
        }
        .item3-value {
          display: flex;
          align-items: center;
          .item3-number {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 26px;
            color: #e0fffe;
            margin: 0 8px 0 0;
          }
          .item3-unit {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: #ffffff;
          }
        }
      }
    }
    .item3:not(:first-child) {
      margin: 20px 0 0 0;
    }
    .item3-window {
      height: 60px;
      background: url('@/assets/image/info-bg.png');
      background-size: 100% 100%;
      margin: 8px 0 0 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      box-sizing: border-box;
      .item3-window-title {
        font-size: 16px;
        color: #ffffff;
      }
      .item3-window-value {
        display: flex;
        align-items: center;
        .item3-window-number {
          font-family: DINAlternate-Bold;
          font-weight: 700;
          font-size: 26px;
          color: #e0fffe;
          margin: 0 8px 0 0;
        }
        .item3-window-unit {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
  }
  .list4 {
    .item3-box {
      margin: 10px 0 0 0;
    }
    .item3:not(:first-child) .item3-box {
      // background: rgba(24, 103, 255, 0.33);
      background: url('@/assets/image/home-iten-bg.png');
      background-size: 100% 100%;
      border-radius: 8px;
      padding: 10px 12px;
      box-sizing: border-box;
    }
  }
}
</style>
