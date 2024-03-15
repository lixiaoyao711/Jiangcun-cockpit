<template>
  <div class="center">
    <header>
      <div class="list">
        <div class="item">
          <div class="value-box">
            <div class="number">{{ showDataMap('数字经济', '1606179026748428290')?.value }}</div>
            <div class="unit">家</div>
          </div>
          <div class="title">上市公司</div>
        </div>
        <div class="item">
          <div class="value-box">
            <div class="number">
              {{ showDataMap('数字经济', '1606179112781991937')?.value}}
            </div>
            <div class="unit">家</div>
          </div>
          <div class="title">独角兽/准独角兽</div>
        </div>
        <div class="item">
          <div class="value-box">
            <div class="number">{{showDataMap('数字经济', '1640956034724151297')?.value }}</div>
            <div class="unit">家</div>
          </div>
          <div class="title">专精特新</div>
        </div>
        <div class="item">
          <div class="value-box">
            <div class="number">
              {{ showDataMap('数字经济', '1606179230293807106')?.value}}
            </div>
            <div class="unit">家</div>
          </div>
          <div class="title">国家高新技术企业</div>
        </div>
        <div class="item">
          <div class="value-box">
            <div class="number">
              {{ showDataMap('数字经济', '1606179294160474114')?.value }}
            </div>
            <div class="unit">家</div>
          </div>
          <div class="title">浙江省科技型中小企业</div>
        </div>
      </div>
    </header>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import * as echarts from 'echarts';
import { showDataMap } from '@/utils/common';

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;

const economicData = computed(() => {
  return store.state.economicData;
});

onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.center {
  padding: 22px 0 0 0;
  box-sizing: border-box;
  width: 900px;

  header {
    .list {
      display: flex;
      .item {
        width: 159.14px;
        height: 68px;
        background-image: linear-gradient(135deg, rgba(45, 145, 255, 0.3) 0%, rgba(20, 146, 255, 0.6) 100%);
        border-radius: 8px;
        // filter: blur(2px);
        margin: 0 12px 0 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        .value-box {
          display: flex;
          align-items: center;
          .number {
            font-family: DINAlternate-Bold;
            font-weight: 700;
            font-size: 36px;
            color: #ffffff;
            margin: 0 10px 0 0;
          }
          .unit {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 12px;
            color: #ffffff;
          }
        }
        .title {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
  }
  main {
    width: 510px;
    height: 459px;
    background: rgba(13, 24, 101, 0.8);
    border-radius: 8px;
    // margin: 88px 0 0 0;
    padding: 14px;
    box-sizing: border-box;

    .title {
      font-family: PingFangSC-S0pxibold;
      font-weight: 600;
      font-size: 16px;
      color: #73d5e5;
    }
    .sub-title {
      display: flex;
      align-items: center;
      color: #fff;
      .text {
        margin: 0 0px 0 6px;
      }
    }
    .sub1 {
      margin: 16px 0 0 0;
      .title-box {
        display: flex;
        .info-box {
          flex: 1;
          margin: 8px 0 0 0;
          .item {
            width: 214px;
            height: 36px;
            margin: 8px 0 0 0;
            background: rgba(116, 190, 255, 0.2);
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            box-sizing: border-box;
          }
        }
      }
    }
    .sub2 {
      margin: 20px 0 0 0;
      .title-box {
        display: flex;
        .info-box {
          flex: 1;
          margin: 8px 0 0 0;
          .item {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: #ffd474;
            width: 214px;
            height: 35px;
            background: rgba(25, 116, 195, 0.1);
            border-radius: 4px;
            display: flex;
            align-items: center;
            padding: 0 0 0 10px;
            box-sizing: border-box;
            margin: 12px 0 0 0;
          }
        }
      }
      .charts {
        width: 200px;
        height: 200px;
        // margin: 16px 0 0 0;
        position: relative;
        .m {
          bottom: 40px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          height: 20px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 14px;
          color: #ffffff;
          background-image: linear-gradient(180deg, rgba(0, 204, 253, 0) 0%, rgba(0, 204, 253, 0.8) 100%);
        }
      }
    }
  }
}
</style>
