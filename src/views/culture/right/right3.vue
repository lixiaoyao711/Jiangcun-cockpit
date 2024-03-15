<template>
  <div class="right3">
    <div class="title">
      <div class="name">文脉传承铸魂</div>
    </div>
    <div class="info">
      <div class="sub1">
        <div class="sub-title">
          <el-icon><CaretRight /></el-icon>
          <div class="text">非遗代表性项目</div>
        </div>
        <div class="list">
          <div class="item" @click="openDialog(item)" v-for="(item, index) in tableType" :key="index">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="sub2">
        <div class="sub-title">
          <el-icon><CaretRight /></el-icon>
          <div class="text">非遗代表性传承人</div>
        </div>
        <div class="list-box">
          <vue3-seamless-scroll
            :list="tableData.filter((item) => item.type == 2)"
            direction="left"
            :hover="true"
            :step="0.5"
          >
            <div class="list">
              <div
                class="item"
                @click="openDialogOne(item, index)"
                v-for="(item, index) in tableData.filter((item) => item.type == 2)"
                :key="index"
              >
                <img :src="item.url" alt="" />
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
          </vue3-seamless-scroll>
        </div>
        <vue3-seamless-scroll :list="tableData" class="window-box" :hover="true" :step="0.5">
          <div
            class="window"
            @click="openDialog1(item)"
            v-for="(item, index) in tableData.filter((item) => item.type == 3)"
          >
            {{ item.name }}
          </div>
        </vue3-seamless-scroll>
      </div>
    </div>
    <Dialog :title="dialogData" @close="dialog = false" v-if="dialog">
      <template v-slot:content>
        <el-carousel class="carousel" indicator-position="outside" height="360px">
          <el-carousel-item v-for="item in tableData.filter((item) => item.difference === dialogData)" :key="item">
            <img :src="item.url" alt="" />
            <div class="dialog-title">{{ item.name }}</div>
            <div class="dialog-info">
              <div class="dialog-info-content">{{ item.content }}</div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </Dialog>
    <Dialog title="人物信息" @close="dialogOne = false" v-if="dialogOne">
      <template v-slot:content>
        <el-carousel class="carousel" :initial-index="initialIndex" indicator-position="outside" height="360px">
          <el-carousel-item v-for="item in tableData.filter((item) => item.type == 2)" :key="item">
            <img :src="item.url" alt="" />
            <div class="dialog-title">{{ item.name }}</div>
            <div class="dialog-info">
              <div class="dialog-info-content">{{ item.content }}</div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </Dialog>
    <Dialog :title="'活动详情'" @close="dialog1 = false" v-if="dialog1">
      <template v-slot:content>
        <div class="dialog-info">
          <img :src="dialogData.url" alt="" />
          <div>
            <div class="dialog-title">{{ dialogData.name }}</div>
            <div class="dialog-text">
              <div class="label">活动时间</div>
              <div class="value">{{ dialogData.useTime }}</div>
            </div>
            <div class="dialog-text">
              <div class="label">活动地点</div>
              <div class="value">{{ dialogData.address }}</div>
            </div>
            <div class="dialog-text">
              <div class="label">活动内容</div>
              <div class="value">{{ dialogData.content }}</div>
            </div>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import store from '@/store';
import { IndicatorCulturalHeritageList } from '@/api/index';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const cultureData = computed(() => {
  return store.state.cultureData;
});
let dialog = ref(false);
let dialog1 = ref(false);
let dialogOne = ref(false);
let dialogData = ref({});
let initialIndex = ref(0);
function openDialog(row) {
  console.log('openDialog', row);
  dialogData.value = row;
  dialog.value = true;
}
function openDialogOne(row, index) {
  dialogData.value = row;
  dialogOne.value = true;
  initialIndex.value = index;
}
function openDialog1(row) {
  dialogData.value = row;
  dialog1.value = true;
}
let tableData = ref([]);
let tableType = ['国家级非遗代表性项目', '省级非遗代表性项目', '市级非遗代表性项目', '区级非遗代表性项目'];
async function getData() {
  const res = await IndicatorCulturalHeritageList();
  if (res) {
    tableData.value = res.rows;
    console.log(
      'IndicatorCulturalHeritageList',
      tableData.value.filter((item) => item.type == 1)
    );
  }
}
watch();
onMounted(() => {
  getData();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.right3 {
  margin: 22px 0 0 0;
  .title {
    width: 420px;
    height: 35px;
    // background: rgba(47, 120, 194, 0.3);
    background: url('@/assets/image/szwh-item.png');
    background-size: 100% 100%;
    border-radius: 0 0 17px 0;
    display: flex;
    align-items: center;
    padding: 0 0 0 60px;
    box-sizing: border-box;
    .icon {
      width: 35px;
      height: 35px;
      background-image: linear-gradient(180deg, #a8ffe1 0%, #3df8ff 96%);
      margin: 0 16px 0 0;
    }
    .name {
      font-family: HelloFont-WenYiHei;
      font-weight: WenYiHei;
      font-size: 20px;
      color: #ffffff;
    }
  }
  .info {
    .sub-title {
      display: flex;
      align-items: center;
      color: #fff;
      .text {
        margin: 0 0px 0 6px;
      }
    }
    .sub1 {
      margin: 22px 0 0 0;
      .scroll-box {
        height: 120px;
        overflow: hidden;
      }
      .list {
        height: 120px;
        overflow: hidden;
        margin: 6px 0 0 0;
        display: flex;
        flex-wrap: wrap;
        .item:nth-child(odd) {
          margin: 14px 12px 0 0;
        }
        .item {
          cursor: pointer;
          width: 220px;
          height: 43px;
          background-image: linear-gradient(90deg, rgba(108, 167, 255, 0.2) 0%, rgba(67, 102, 255, 0.3) 100%);
          border-radius: 8px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 16px;
          color: #ffffff;
          display: flex;
          align-items: center;
          padding: 0 0 0 18px;
          box-sizing: border-box;
          margin: 14px 0px 0 0;
        }
      }
    }
    .sub2 {
      margin: 20px 0 0 0;
      .list-box {
        overflow: hidden;
        height: 110px;
      }
      .list {
        padding: 0 0 0 12px;
        box-sizing: border-box;
        margin: 22px 0 0 0;
        display: flex;
        overflow: hidden;
      }
      .item {
        margin: 0 32px 0 0;
        cursor: pointer;

        img {
          width: 52px;
          height: 52px;
          border: 1px solid #ffffff;
          border-radius: 40px;
        }
        .name {
          margin: 8px 0 0 0;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          font-size: 16px;
          color: #ffffff;
          text-align: center;
        }
      }
      .window-box {
        height: 60px;
        overflow: hidden;
        margin: 10px 0 0 0;
        .window {
          padding: 16px 20px;
          box-sizing: border-box;
          cursor: pointer;
          color: #3df8ff;
          display: flex;
          background: url('@/assets/image/info-bg.png');
          background-size: 100% 100%;
          margin: 20px 0 0 0;
        }
      }
    }
  }
  .carousel {
    width: 880px;
    max-height: 70vh;
    cursor: pointer;
    .dialog-title {
      box-sizing: border-box;
      margin-bottom: 10px;
      background-size: 100% 100%;
      box-sizing: border-box;
      font-family: PingFangSC-SNaNpxibold;
      font-weight: 600;
      font-size: 20px;
      display: flex;
    }
    img {
      max-width: 400px;
      max-height: 400px;
      width: auto;
      height: auto;
      object-fit: scale-down;
      float: left;
      margin-right: 20px;
      line-height: 1;
      vertical-align: top;
    }
  }
  .dialog-info {
    max-height: 70vh;
    overflow: scroll;
    font-size: 16px;
    display: flex;
    img {
      width: 400px;
      height: 400px;
    }
    .dialog-title {
      // padding: 0 0 11px 0;
      box-sizing: border-box;
      font-family: PingFangSC-SNaNpxibold;
      font-weight: 600;
      font-size: 20px;
      display: flex;
    }
    .dialog-info-content {
      // height: 100px;
      // overflow: scroll;
    }
    .dialog-text {
      padding: 8px 0;
      box-sizing: border-box;
      // display: flex;
      .label {
        // width: 120px;
        white-space: nowrap;
        margin-right: 20px;
        margin-bottom: 5px;
        color: #ffffffaa;
      }
      // border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
    img {
      max-width: 400px;
      max-height: 400px;
      width: auto;
      height: auto;
      object-fit: scale-down;
      float: left;
      margin-right: 20px;
      line-height: 1;
      vertical-align: top;
    }
  }
}
</style>
