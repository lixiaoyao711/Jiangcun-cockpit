<template>
  <div class="left5">
    <div class="title">
      <div class="text">生态蒋村</div>
    </div>
    <div class="list">
      <div class="item">
        <img src="@/assets/image/mlhd.png" alt="" />
        <div class="text-box">
          <div class="text">
            <div class="name">巡河率</div>
            <div class="number">{{ showDataMap('数字政府','1640979193573711873')?.value }}</div>
            <div class="unit">%</div>
          </div>
          <div class="text">
            <div class="name">水质等级</div>
            <div class="number">{{ showDataMap('数字政府','1640979053098082305')?.value}}</div>
            <div class="unit"></div>
          </div>
          <div class="line"></div>
        </div>
      </div>
      <div class="item">
        <img src="@/assets/image/ljfl.png" alt="" />
        <div class="text-box">
          <div class="text">
            <div class="name">回收覆盖率</div>
            <div class="number">{{ showDataMap('数字政府','1640969950393049089')?.value}}</div>
            <!-- <div class="number">{{ generalData['数字政府-高标颜值守护-五水共治-鲸灵回收点'].value }}</div> -->
            <div class="unit">%</div>
          </div>
          <div class="text">
            <div class="name">日均减量</div>
            <div class="number">{{ showDataMap('数字政府','1640969981703528450')?.value}}</div>
            <!-- <div class="number">{{ generalData['数字政府-高标颜值守护-五水共治-鲸灵回收点'].value }}</div> -->
            <div class="unit">公斤</div>
          </div>
          <!-- <div class="text">
            <div class="name">回收量</div>
            <div class="number">{{ generalData['数字政府-高标颜值守护-五水共治-回收量'].value }}</div>
            <div class="unit">吨</div>
          </div> -->
          <div class="line"></div>
        </div>
      </div>
      <div class="item">
        <img src="@/assets/image/环境治理.png" alt="" />
        <div class="text-box">
          <div class="text">
            <div class="name">抄告数量</div>
            <div class="number">{{ showDataMap('数字政府','1640969692233637890')?.value}}</div>

            <!-- <div class="number">{{ generalData['数字政府-高标准管控-环境品质提升-抄告数量-抄告数量'].value }}</div> -->
            <div class="unit">个</div>
          </div>
          <div class="text">
            <div class="name">整改率</div>
            <div class="number">{{ showDataMap('数字政府','1640969754061873154')?.value}}</div>
            <div class="unit">%</div>
          </div>
          <div class="line"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import { showDataMap } from '@/utils/common';

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const generalData = computed(() => {
  return store.state.generalData;
});
watch();
onMounted(() => {});
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
.left5 {
  margin-top: 16px;
  .list {
    .item {
      display: flex;
      margin-top: 16px;
      img {
        width: 48px;
        height: 40px;
        margin-right: 24px;
      }
      .text-box {
        display: flex;
        justify-content: space-between;
        flex: 1;
        // padding-right: 20px;
        box-sizing: border-box;
        position: relative;
        .text {
          display: flex;
          align-items: center;
          width: 180px;
          // margin-right: 67px;
          .name {
            min-width: 64px;
            height: 22px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
            margin-right: 10px;
          }
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

        .window {
          width: 241px;
          height: 35px;
          background: rgba(25, 116, 195, 0.1);
          border-radius: 4px;
          font-weight: 400;
          font-size: 14px;
          color: #ffd474;
          display: flex;
          align-items: center;
          padding-left: 8px;
          box-sizing: border-box;
        }
      }
      .line {
        position: absolute;
        bottom: 0;
        width: 352px;
        height: 1px;
        background-image: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, #ffffff 51%, rgba(255, 255, 255, 0) 100%);
      }
    }
  }
}
</style>
