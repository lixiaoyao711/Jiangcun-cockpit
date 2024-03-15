<template>
  <div class="right3">
    <div class="title">
      <div class="text">平安蒋村</div>
    </div>
    <Tabs :propsData="tabsData" v-model:index="currentIndex" />
    <div class="info" v-if="currentIndex === 0">
      <div class="list">
        <div class="item">
          <div class="leder">指挥长</div>
          <div class="name">{{ generalData['数字法治-指挥中心-指挥长姓名'].value }}</div>
          <div class="phone">{{ generalData['数字法治-指挥中心-指挥长电话'].value }}</div>
        </div>
        <div class="item">
          <div class="leder">综合调度岗</div>
          <div class="name">{{ generalData['数字法治-指挥中心-综合调度岗姓名'].value }}</div>
          <div class="phone">{{ generalData['数字法治-指挥中心-综合调度岗电话'].value }}</div>
        </div>
        <div class="item">
          <div class="leder">视频巡查岗</div>
          <div class="name">{{ generalData['数字法治-指挥中心-视频巡查岗姓名'].value }}</div>
          <div class="phone">{{ generalData['数字法治-指挥中心-视频巡查岗电话'].value }}</div>
        </div>
        <div class="item">
          <div class="leder">信息研判岗</div>
          <div class="name">{{ generalData['数字法治-指挥中心-信息研判岗姓名'].value }}</div>
          <div class="phone">{{ generalData['数字法治-指挥中心-信息研判岗电话'].value }}</div>
        </div>
        <div class="item">
          <div class="leder">事件流转岗</div>
          <div class="name">{{ generalData['数字法治-指挥中心-事件流转岗姓名'].value }}</div>
          <div class="phone">{{ generalData['数字法治-指挥中心-事件流转岗电话'].value }}</div>
        </div>
      </div>
    </div>
    <div class="info1" v-if="currentIndex === 1">
      <div class="info1-title">
        <div
          class="title-item"
          :class="{ checkItem: titleIndex === index }"
          v-for="(item, index) in fiveList"
          :key="item"
          @click="titleIndex = index"
        >
          {{ index }}
        </div>
      </div>
      <div class="list">
        <div class="list-item" v-for="(item, index) in fiveList[titleIndex]" :key="index">
          <div class="list-item-title">{{ item.leder }}</div>
          <div class="item-right">
            <span class="number">{{ item.value }}</span>
            <span class="unit">{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="info2" v-if="currentIndex === 2">
      <div class="list">
        <div class="list-item">
          <div class="list-item-title">执法圈</div>
          <div class="item-right">
            <span class="number">{{ generalData['数字法治-一套网格体系-联合执法片'].value }}</span>
            <span class="unit">人</span>
          </div>
        </div>
        <div class="list-item">
          <div class="list-item-title">防范区域</div>
          <div class="item-right">
            <span class="number">{{ generalData['数字法治-一套网格体系-风险防控区'].value }}</span>
            <span class="unit">人</span>
          </div>
        </div>
        <div class="list-item">
          <div class="list-item-title">网格</div>
          <div class="item-right">
            <span class="number">{{ generalData['数字法治-一套网格体系-基层网格'].value }}</span>
            <span class="unit">人</span>
          </div>
        </div>
        <div class="list-item">
          <div class="list-item-title">微网格</div>
          <div class="item-right">
            <span class="number">{{ generalData['数字法治-一套网格体系-微网格'].value }}</span>
            <span class="unit">人</span>
          </div>
        </div>
        <div class="list-item">
          <div class="list-item-title">问题清单</div>
          <div class="item-right">
            <span class="number">{{ generalData['数字法治-一套网格体系-问题清单'].value }}</span>
            <span class="unit">人</span>
          </div>
        </div>
      </div>
    </div>
    <div class="info3" v-if="currentIndex === 3">
      <div class="list">
        <div class="list-item" @click="showDialog(item)" v-for="(item, index) in sixList" :key="index">
          <img src="@/assets/image/book.png" alt="" />
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
    <Dialog :title="dialogData.name" @close="isShowDialog = false" v-show="isShowDialog">
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
const generalData = computed(() => {
  return store.state.generalData;
});
let tabsData = ['1个指挥中心', '5支力量队伍', '1套网格体系', '6个机制保障'];
let titleItem = ['群防群治', '网格员', '物业联盟', '部门平台', '综合执法'];
let currentIndex = ref(0);
let titleIndex = ref('群防群治');
let isShowDialog = ref(false);
let dialogData = ref({});
let fiveList = ref([]);
let fiveTotal = ref([]);
async function getFiveList() {
  const res = await IndicatorLevelFivePowerList();
  const ret = await IndicatorEnforcementTeamList();

  if (res.code === 200) {
    fiveList.value = {
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
let sixList = ref([]);
function getSixList() {
  sixList.value = [
    {
      name: '工作会商机制',
      value: generalData.value['数字法治-六项工作机制-工作会商机制'].value,
    },
    {
      name: '社会面排摸稳控机制',
      value: generalData.value['数字法治-六项工作机制-社会面排摸稳控机制'].value,
    },
    {
      name: '培训演练机制',
      value: generalData.value['数字法治-六项工作机制-培训演练机制'].value,
    },
    {
      name: '应急处置机制',
      value: generalData.value['数字法治-六项工作机制-应急处置机制'].value,
    },
    {
      name: '考核奖励机制',
      value: generalData.value['数字法治-六项工作机制-考核奖励机制'].value,
    },
    {
      name: '晒单亮绩机制',
      value: generalData.value['数字法治-六项工作机制-晒单亮绩机制'].value,
    },
  ];
}
function showDialog(row) {
  dialogData.value = row;
  isShowDialog.value = true;
}
watch();
onMounted(() => {
  getFiveList();
  getSixList();
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
.right3 {
  margin-top: 30px;
  .info {
    margin: 20px 0 0 0;
    .list {
      height: 200px;
      overflow: scroll;
      scrollbar-width: none;
    }
    .item {
      width: 453px;
      height: 40px;
      background: rgba(116, 190, 255, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px;
      box-sizing: border-box;
      margin-top: 14px;
      color: #fff;
      .leder {
        width: 40%;
      }
      .name {
        width: 20%;
      }
      .phone {
        width: 40%;
      }
    }
  }
  .list {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  .list::-webkit-scrollbar {
    display: none;
  }
  .info1 {
    .info1-title {
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 30px 0 0 0;
      cursor: pointer;
      position: relative;
    }
    .title-item {
      padding: 0 0 10px 0;
      box-sizing: border-box;
    }
    .checkItem {
      border-bottom: 1px solid #fff;
    }
    .list {
      height: 140px;
      overflow: scroll;
      scrollbar-width: none;
      margin: 30px 0 0 0;
      .list-item {
        width: 453px;
        height: 50px;
        background: rgba(116, 190, 255, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 12px;
        box-sizing: border-box;
        margin-top: 14px;
        .list-item-title {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
        .item-right {
          .number {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 32px;
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
    .list {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
    .list::-webkit-scrollbar {
      display: none;
    }
  }
  .info2 {
    .list {
      height: 200px;
      overflow: scroll;
      scrollbar-width: none;
      margin-top: 30px;

      .list-item {
        width: 453px;
        height: 50px;
        background: rgba(116, 190, 255, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 12px;
        box-sizing: border-box;
        margin-top: 14px;

        .list-item-title {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
        .item-right {
          .number {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 32px;
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
    .list {
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
    .list::-webkit-scrollbar {
      display: none;
    }
  }
  .info3 {
    .list {
      display: flex;
      flex-wrap: wrap;
      margin: 46px 0 0 0;
      justify-content: space-around;
      .list-item {
        width: 48%;
        display: flex;
        align-items: center;
        margin: 20px 0 0 0;

        img {
          width: 38px;
          height: 26px;
          margin: 0 8px 0 0;
        }
        span {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 18px;
          color: #73d5e5;
        }
      }
    }
  }
  .dialog-content {
    min-width: 200px;
  }
}
</style>
