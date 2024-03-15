<template>
  <div class="featureWorkList">
    <div class="title-big-box">
      <div class="title-box" ref="titleBox">
        <div
          @click="titleChange(item, index)"
          class="title"
          :title="item.subject"
          :class="currentIndex === index ? 'changeTab' : ''"
          v-for="(item, index) in tableData"
          :key="index"
        >
          {{ item.subject }}
        </div>
      </div>
      <div @click="scrollTo(titleBox, 0)" class="title-box-left title-box-icon">
        <el-icon><ArrowLeft /></el-icon>
      </div>
      <div @click="scrollTo(titleBox, 1)" class="title-box-right title-box-icon">
        <el-icon><ArrowRight /></el-icon>
      </div>
    </div>
    <div class="content" v-if="showData">
      <div class="text">
        {{ showData.content }}
      </div>
      <vue3-seamless-scroll class="scroll" :list="showData.urlList" :step="0.5">
        <div v-for="(url, index) in showData.urlList" :key="index">
        <img v-if="url" :src="url + '?thumbnail=true'" alt="" />
        <img v-else src='https://lstatic.educity.cn/educity/h5/cmsng/img/nodata.png'/>
        </div>
      </vue3-seamless-scroll>
    </div>
  </div>
</template>
<script setup>
import store from '@/store';
// 自动滚动
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
const emit = defineEmits(['close']);
const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
  // 是否需要切换背景图
  backImgChange: {
    type: Boolean,
    default: false,
  },
});
const {} = props;
let currentIndex = ref(0);
let showData = ref({});
let titleBox = ref(null);
function titleChange(row, val) {
  console.log('row', row, val);
  // console.log('props.backImgChange.value', props.backImgChange);
  if (props.backImgChange) {
    // 获取每个重点工作的背景List
    let bgList = row.backOssIds
      ?.split(',')
      .map((item) => `${import.meta.env.VITE_APP_API_BASE_URL}/system/oss/download/${item}`);
    store.commit('setHomeBg', bgList);
  }

  showData.value = row;
  currentIndex.value = val;
}
function scrollTo(dom, val) {
  const px = 800;
  dom.scrollBy({
    left: val ? px : -px,
    behavior: 'smooth',
  });
}
watch(
  props.tableData,
  (newValue, oldValue) => {
    console.log('newValue', newValue);
    if (newValue.length) {
      titleChange(newValue[0], 0);
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.featureWorkList {
  position: absolute;
  bottom: 0.75vw;
  left: 50%;
  transform: translate(-50%); //水平、垂直都居中,也可以写成下面的方式
  pointer-events: auto;
  .title-big-box {
    position: relative;
    padding: 0 24px;
    box-sizing: border-box;
    .title-box {
      display: flex;
      overflow: hidden;
      background: #2ba9bd4d;
      border-radius: 8px 8px 0 0;
      // padding: 0 34px;
      box-sizing: border-box;
      .title-box-icon:hover {
        background: #2ba9bd;
      }

      .title {
        flex-shrink: 0;
        width: 160px;
        padding: 10px;
        box-sizing: border-box;
        background: rgba(43, 169, 189, 0.5);
        border-radius: 0 0 20px 20px;
        font-weight: 600;
        font-size: 14px;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        //   margin: 0 18px 0 0;
        cursor: pointer;
        overflow: hidden; //溢出内容隐藏
        // width: 300px;
        //   display: inline-block;
        white-space: nowrap; //强制文本在一行内显示
        text-overflow: ellipsis; //当对象内文本溢出时显示省略号标记
      }
      .changeTab {
        background: #2ba9bd;
      }
    }

    .title-box-left {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 24px;
      height: 100%;
      // opacity: 0.6;
      background: rgba(43, 169, 189, 0.6);
      color: #fff;
      font-size: 22px;
      border-radius: 6px 0 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .title-box-right {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 24px;
      height: 100%;
      // opacity: 0.6;
      background: rgba(43, 169, 189, 0.6);
      color: #fff;
      font-size: 22px;
      border-radius: 6px 0 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }

  .content {
    margin: 10px 0 10px 0;
    padding: 0px 40px 0px 16px;
    box-sizing: border-box;
    font-weight: 400;
    font-size: 14px;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90px;
    overflow: scroll;

    img {
      width: 141.53px;
      height: 87px;
      border-radius: 4px;
      object-fit: cover;
    }
    .text {
      width: 80%;
    }
    .scroll {
      width: 141.53px;
      height: 87px;
      overflow: hidden;
    }
  }
  width: 869px;
  min-height: 135px;
  background: rgba(15, 39, 108, 0.7);
  border: 2px solid #2ba9bd;
  border-radius: 8px;
}
</style>
