<template>
  <div class="right2">
    <div class="title">
      <div class="text">幸福蒋村</div>
    </div>
    <div class="item">
      <div class="item-title">
        <el-icon><CaretRight /></el-icon>
        <div class="item-title-text">幸福荟民生综合体</div>
        <div class="item-value">
          <span class="item-value-number">{{ showDataMap('数字门户', '1597514375319834626').value }}</span
          >个
        </div>
      </div>
    </div>
    <div class="item">
      <div class="item-title">
        <el-icon><CaretRight /></el-icon>
        <div class="item-title-text">15分钟便民生活圈</div>
      </div>
      <div class="item-info-box">
        <div class="item-info">
          <div class="item-info-title">学校</div>
          <div class="text-box">
            <span class="value">{{ generalData['首页-幸福蒋村-15分钟便民生活圈-学校'].value }}</span>
            <span class="unit">个</span>
          </div>
        </div>
        <div class="item-info">
          <div class="item-info-title">商超</div>
          <div class="text-box">
            <span class="value">{{ generalData['首页-幸福蒋村-15分钟便民生活圈-商超'].value }}</span>
            <span class="unit">个</span>
          </div>
        </div>
        <div class="item-info">
          <div class="item-info-title">医院</div>
          <div class="text-box">
            <span class="value">{{ generalData['首页-幸福蒋村-15分钟便民生活圈-医院'].value }}</span>
            <span class="unit">个</span>
          </div>
        </div>
        <div class="item-info">
          <div class="item-info-title">商业综合体</div>
          <div class="text-box">
            <span class="value">{{ generalData['首页-幸福蒋村-15分钟便民生活圈-商业综合体'].value }}</span>
            <span class="unit">个</span>
          </div>
        </div>
      </div>
    </div>
    <div class="item-box">
      <div class="item">
        <div class="item-title">
          <el-icon><CaretRight /></el-icon>
          <div class="item-title-text">幸福养老</div>
        </div>
        <div class="item-info-box">
          <div class="item-info1">
            <div class="item-info-title">居家养老服务中心</div>
            <div class="text-box">
              <span class="value">{{ mapPath.length }}</span>
              <span class="unit">个</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="item-title">
          <el-icon><CaretRight /></el-icon>
          <div class="item-title-text">快乐托幼</div>
        </div>
        <div class="item-info-box">
          <div class="item-info1">
            <div class="item-info-title">托育机构</div>
            <div class="text-box">
              <span class="value">{{ generalData['首页-幸福蒋村-快乐托幼-托育机构'].value }}</span>
              <span class="unit">个</span>
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
import { showDataMap } from '@/utils/common';
import { mapIndexList } from '@/api/index';
import { getLocalData, formatMapData } from '@/utils/map.js';

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const generalData = computed(() => {
  return store.state.generalData;
});

let mapPath = ref([]);
// 获取地图数据
async function getMapData() {
  const res = await mapIndexList();
  if (res) {
    console.log('获取地图数据', res);
    mapPath.value = res.rows.filter((item) => item.typeTwo === '居家养老中心');
  }
}
watch();
onMounted(() => {
  getMapData();
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
.right2 {
  margin-top: 30px;
  .item {
    margin-top: 20px;
    .item-title {
      display: flex;
      align-items: center;
      .el-icon {
        color: #fff;
      }
      .item-title-text {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 16px;
        color: #73d5e5;
        margin-left: 16px;
      }
      .info {
        margin-left: 28px;
        .value {
          font-weight: 700;
          font-size: 28px;
          color: #e0fffe;
          letter-spacing: 1.56px;
          margin-right: 16px;
        }
        .unit {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
    .item-value {
      color: #fff;

      margin: 0 0 0 30px;
      .item-value-number {
        font-size: 28px;
        font-weight: 600;
        margin: 0 10px 0 0;
      }
    }
    .item-info-box {
      display: flex;
      justify-content: space-around;
      .item-info {
        margin-top: 16px;
        .item-info-title {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
        }
        .text-box {
          margin-top: 2px;
          .value {
            font-weight: 700;
            font-size: 28px;
            color: #e0fffe;
            letter-spacing: 1.56px;
            margin-right: 16px;
          }
          .unit {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: #ffffff;
          }
        }
      }
      .item-info1 {
        margin-top: 16px;
        display: flex;
        align-items: center;
        padding-left: 16px;
        box-sizing: border-box;
        .item-info-title {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          margin-right: 10px;
        }
        .text-box {
          margin-top: 2px;
          .value {
            font-weight: 700;
            font-size: 28px;
            color: #e0fffe;
            letter-spacing: 1.56px;
            margin-right: 16px;
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
  .item-box {
    display: flex;
    justify-content: space-between;
  }
}
</style>
