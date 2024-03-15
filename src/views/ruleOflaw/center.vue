<template>
  <div class="center">
    <!-- <div class="window">
      <div class="title">西区五级人员力量</div>
      <div class="info">
        <div class="left">
          <div class="sub1">
            <div class="sub-title">
              <el-icon><CaretRight /></el-icon>
              <div class="text">群防群治队伍</div>
            </div>
            <div class="list">
              <div class="item">
                <div class="name">党员干部</div>
                <div class="value-box">
                  <div class="number">334</div>
                  <div class="unit">人</div>
                </div>
              </div>
              <div class="item">
                <div class="name">党员干部</div>
                <div class="value-box">
                  <div class="number">334</div>
                  <div class="unit">人</div>
                </div>
              </div>
              <div class="item">
                <div class="name">党员干部</div>
                <div class="value-box">
                  <div class="number">334</div>
                  <div class="unit">人</div>
                </div>
              </div>
              <div class="item">
                <div class="name">党员干部</div>
                <div class="value-box">
                  <div class="number">334</div>
                  <div class="unit">人</div>
                </div>
              </div>
              <div class="item">
                <div class="name">党员干部</div>
                <div class="value-box">
                  <div class="number">334</div>
                  <div class="unit">人</div>
                </div>
              </div>
            </div>
          </div>
          <div class="sub2">
            <div class="sub-title">
              <el-icon><CaretRight /></el-icon>
              <div class="text">网格员队伍</div>
            </div>
            <div class="list">
              <div class="item">
                <div class="name">党员干部</div>
                <div class="value-box">
                  <div class="number">334</div>
                  <div class="unit">人</div>
                </div>
              </div>
            </div>
          </div>
          <div class="sub3">
            <div class="sub-title">
              <el-icon><CaretRight /></el-icon>
              <div class="text">物业联盟队伍</div>
            </div>
            <div class="list">
              <div class="item">
                <div class="name">党员干部</div>
                <div class="value-box">
                  <div class="number">334</div>
                  <div class="unit">人</div>
                </div>
              </div>
              <div class="item">
                <div class="name">党员干部</div>
                <div class="value-box">
                  <div class="number">334</div>
                  <div class="unit">人</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <div class="sub4">
            <div class="sub-title">
              <el-icon><CaretRight /></el-icon>
              <div class="text">部门平台队伍</div>
            </div>
            <div class="list">
              <div class="item">
                <div class="name">党员干部</div>
                <div class="value-box">
                  <div class="number">334</div>
                  <div class="unit">人</div>
                </div>
              </div>
              <div class="item">
                <div class="name">党员干部</div>
                <div class="value-box">
                  <div class="number">334</div>
                  <div class="unit">人</div>
                </div>
              </div>
              <div class="item">
                <div class="name">党员干部</div>
                <div class="value-box">
                  <div class="number">334</div>
                  <div class="unit">人</div>
                </div>
              </div>
              <div class="item">
                <div class="name">党员干部</div>
                <div class="value-box">
                  <div class="number">334</div>
                  <div class="unit">人</div>
                </div>
              </div>
              <div class="item">
                <div class="name">党员干部</div>
                <div class="value-box">
                  <div class="number">334</div>
                  <div class="unit">人</div>
                </div>
              </div>
              <div class="item">
                <div class="name">党员干部</div>
                <div class="value-box">
                  <div class="number">334</div>
                  <div class="unit">人</div>
                </div>
              </div>
              <div class="item">
                <div class="name">党员干部</div>
                <div class="value-box">
                  <div class="number">334</div>
                  <div class="unit">人</div>
                </div>
              </div>
            </div>
          </div>
          <div class="sub5">
            <div class="sub-title">
              <el-icon><CaretRight /></el-icon>
              <div class="text">综合执法队伍</div>
            </div>
            <div class="list">
              <div class="item">
                <div class="name">党员干部</div>
                <div class="value-box">
                  <div class="number">334</div>
                  <div class="unit">人</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
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
let isShowDialog = ref(false);
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.center {
  flex: 1;
  // position: relative;
  // pointer-events: auto;

  .window {
    width: 510px;
    background: rgba(13, 24, 101, 0.8);
    padding: 14px 18px 40px 18px;
    box-sizing: border-box;
    margin: 80px 0 0 0;
    .title {
      font-family: PingFangSC-S0pxibold;
      font-weight: 600;
      font-size: 16px;
      color: #73d5e5;
    }
    .info {
      display: flex;
      justify-content: space-between;
      .sub-title {
        display: flex;
        align-items: center;
        color: #fff;
        .text {
          margin: 0 0px 0 6px;
        }
      }
      .list {
        margin: 12px 0 0 0;
        .item {
          width: 214px;
          height: 36px;
          background: rgba(116, 190, 255, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 16px;
          box-sizing: border-box;
          margin: 10px 0 0 0;
          .name {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            font-size: 14px;
            color: #ffffff;
          }
          .value-box {
            display: flex;
            align-items: center;
            .number {
              font-family: DINAlternate-Bold;
              font-weight: 700;
              font-size: 24px;
              color: #e0fffe;
              margin: 0px 12px 0 0;
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
      .sub1 {
        margin: 32px 0 0 0;
      }
      .sub2 {
        margin: 10px 0 0 0;
      }
      .sub3 {
        margin: 10px 0 0 0;
      }
      .sub4 {
        margin: 32px 0 0 0;
      }
      .sub5 {
        margin: 14px 0 0 0;
      }
    }
  }
}
</style>
