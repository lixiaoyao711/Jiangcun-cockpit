<template>
  <div class="right3">
    <div class="title">
      <div class="left">
        <img src="@/assets/image/lsjt.png" alt="" />
        <div class="text">环境品质提升</div>
      </div>
      <div class="right">
        <div class="icon-box">
          <div class="icon"></div>
        </div>
      </div>
    </div>
    <div class="info">
      <div class="list">
        <div class="left">
          <div class="item">
            <div class="info-title">空气质量</div>
            <div class="box">
              <span class="number">24</span>
              <span class="unit">个</span>
            </div>
          </div>
          <div class="item">
            <div class="info-title">整改率</div>
            <div class="box">
              <span class="number">100</span>
              <span class="unit">%</span>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="left">
          <div class="item">
            <div class="info-title">空气质量</div>
            <div class="box">
              <span class="number">24</span>
              <span class="unit">个</span>
            </div>
          </div>
          <div class="item">
            <div class="info-title">整改率</div>
            <div class="box">
              <span class="number">100</span>
              <span class="unit">%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="window">
        <div class="window-list">
          <div @click="dialog = true" class="window-item">外立面整治☞</div>
          <div class="window-item">宣传设施整治☞</div>
          <div class="window-item">扮靓家园☞</div>
          <div class="window-item">安全检查情况☞</div>
        </div>
      </div>
    </div>
    <div class="dialog" v-if="dialog">
      <div class="title-box">
        <div class="title-text">外立面政治</div>
        <el-icon @click.stop="dialog = false"><CircleClose /></el-icon>
      </div>
      <div class="dialog-info">
        <div class="window">
          <div class="item">
            <span class="name">问题点位</span>
            <span class="number">17个</span>
          </div>
          <div class="item">
            <span class="name">整改完毕</span>
            <span class="number">17个</span>
          </div>
        </div>
        <div class="info">
          大范德萨给夫高度给了卡的房间阿里大家法拉第就flak大家法律凯撒的结果来看案发经过两款发动机离开就
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const test = computed(() => {
  return null;
});
let dialog = ref(false);
watch();
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.right3 {
  margin-top: 34px;
  // padding: 0 32px 0 0;
  // box-sizing: border-box;
  .title {
    width: 452px;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    padding-bottom: 7px;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 16.97px;
        height: 16.97px;
        margin-right: 10px;
      }
      .text {
        font-family: PingFangSC-S0pxibold;
        font-weight: 600;
        font-size: 20px;
        color: #ffffff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .view {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 14px;
        color: #73d5e5;
        cursor: pointer;
        margin-right: 16px;
      }
      .icon-box {
        width: 26px;
        height: 26px;
        background: rgba(78, 255, 143, 0.4);
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          width: 18px;
          height: 18px;
          background: #4eff8f;
          border-radius: 30px;
        }
      }
    }
  }
  .info {
    padding: 30px 0 0 16px;
    box-sizing: border-box;
    .list {
      display: flex;

      .left {
        display: flex;
        // align-items: center;
        justify-content: space-between;
        width: 36%;
        .item {
          // margin-right: 32px;
          .info-title {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 16px;
            color: #ffffff;
          }
          .box {
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
              // float: right;
              align-self: flex-end;
            }
          }
        }
      }
      .line {
        margin: 0 36px;
        width: 1px;
        height: 56px;
        background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #ffffff 51%, rgba(255, 255, 255, 0) 100%);
      }
    }
    .window {
      margin-top: 10px;
      .window-list {
        display: flex;
        flex-wrap: wrap;
        .window-item {
          cursor: pointer;
          margin-top: 13px;
          width: 197px;
          height: 47px;
          background: rgba(25, 116, 195, 0.1);
          border-radius: 8px;
          color: rgba(21, 255, 204, 1);
          font-size: 16px;
          font-weight: 400;
          display: flex;
          align-items: center;
          padding: 0 0 0 20px;
          box-sizing: border-box;
        }
      }
    }
  }
  .dialog {
    background: rgba(13, 24, 101, 0.9);
    border-radius: 16px;
    width: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    padding: 16px 30px 30px 30px;
    box-sizing: border-box;
    .title-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title-text {
        font-family: PingFangSC-Regular;
        font-weight: 600;
        font-size: 16px;
        color: #ffffff;
      }
      .el-icon {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
      }
    }
    .dialog-info {
      margin: 26px 0 0 0;
      .dialog-item {
        // width: 429px;
        height: 114px;
        background: rgba(25, 116, 195, 0.1);
        border-radius: 8px;
        margin: 10px 0 0 0;
        padding: 10px 20px 0 20px;
        box-sizing: border-box;
        .dialog-item-title {
          font-family: PingFangSC-S0pxibold;
          font-weight: 600;
          font-size: 16px;
          color: #ffffff;
        }
        .dialog-info-data {
          margin: 14px 0 0 0;
          color: #fff;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .item1 {
            width: 73px;
            .numer {
              color: #73d5e5;
            }
          }
          .item2 {
            width: 100px;
          }
          .item4 {
            margin: 14px 0 0 0;
          }
        }
      }
      .window {
        width: 429px;
        height: 47px;
        background: rgba(25, 116, 195, 0.1);
        border-radius: 8px;
        display: flex;
        align-items: center;
        padding: 0 0 0 16px;
        box-sizing: border-box;
        .item {
          flex: 1;
          .name {
            margin: 0 16px 0 0;
            color: #fff;
          }
          .number {
            color: #6ecddf;
          }
        }
      }
      .info {
        color: #fff;
      }
    }
  }
}
</style>
