<template>
  <div class="header">
    <header>
      <img
        v-if="!isMaxLeft"
        @click="changeItem(dataLeft, null, 'maxLeft')"
        class="img-left"
        src="@/assets/image/szzf.png"
        alt=""
      />
      <img v-else class="img-left" src="@/assets/image/szzf1.png" alt="" />
      <div class="list">
        <div
          :class="{ itemChange: currentIndex === index }"
          @click="changeItem(item, index, 'left')"
          class="item"
          v-for="(item, index) in listData"
          :key="index"
        >
          <span> {{ item.name }}</span>
        </div>
      </div>
      <div class="title">{{ title }}</div>
      <div class="list">
        <div
          :class="{ itemChange: currentIndex1 === index }"
          @click="changeItem(item, index, 'right')"
          class="item"
          v-for="(item, index) in listData1"
          :key="index"
        >
          <span> {{ item.name }}</span>
        </div>
      </div>
      <img @click="changeItem(dataLeft, null, 'maxRight')" class="img-right" src="@/assets/image/zhmh.png" alt="" />
    </header>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import General from '@/views/general/general';
import Government from '@/views/government/government';
import RuleOflaw from '@/views/ruleOflaw/ruleOflaw';
import Economic from '@/views/economic/economic';
import Social from '@/views/social/social';
import Party from '@/views/party/party';
import Culture from '@/views/culture/culture';
import IndexBgImg from '@/assets/image/index-bg.webp'
import HomeBgImg from '@/assets/image/home-bg.webp'
import JingjiBgImg from '@/assets/image/jingji-bg.webp'
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close', 'openHome']);
const props = defineProps({});
const {} = props;
const test = computed(() => {
  return null;
});
let dataLeft = ref({
  name: '综合门户',
  img: 'image/szdj',
  dom: General,
  isFooter: true,
  backgroundImage: HomeBgImg, //背景图片
  title: '魅力水乡,数智蒋村',
});
let listData = ref([
  {
    name: '数字党建',
    img: 'image/szdj',
    dom: Party,
    isFooter: false,
    title: '蒋村街道综合管理驾驶舱',
    backgroundImage: '/image/szdj-bg.png', //背景图片
  },
  {
    name: '数字政府',
    img: 'image/szzf',
    dom: Government,
    isFooter: true,
    title: '蒋村街道综合管理驾驶舱',
    backgroundImage: JingjiBgImg, //背景图片
  },
  {
    name: '数字经济',
    img: 'image/szjj',
    dom: Economic,
    isFooter: true,
    title: '蒋村街道综合管理驾驶舱',
    backgroundImage: IndexBgImg, //背景图片
  },
]);
let currentIndex = ref(null);
let currentIndex1 = ref(null);
let listData1 = ref([
  {
    name: '数字社会',
    img: 'image/szsh',
    dom: Social,
    isFooter: true,
    title: '蒋村街道综合管理驾驶舱',
    backgroundImage: IndexBgImg, //背景图片
  },
  {
    name: '数字文化',
    img: 'image/szwh',
    dom: Culture,
    isFooter: true,
    title: '蒋村街道综合管理驾驶舱',
    backgroundImage: IndexBgImg, //背景图片
  },
  {
    name: '数字法治',
    img: 'image/szfz',
    dom: RuleOflaw,
    isFooter: true,
    title: '蒋村街道综合管理驾驶舱',
    backgroundImage: IndexBgImg, //背景图片
  },
]);
let isMaxLeft = ref(true);
let isMaxRight = ref(false);
let title = ref('魅力水乡,数智蒋村');
function changeItem(row, index, type) {
  title.value = row.title;
  // 首页
  if (type === 'maxLeft') {
    currentIndex.value = currentIndex1.value = null;
    isMaxLeft.value = true;
    emit('update:index', row);
    return;
  }
  // 屏保
  if (type === 'maxRight') {
    currentIndex.value = currentIndex1.value = null;
    emit('openHome');
    return;
  }
  isMaxLeft.value = false;
  if (type === 'left') {
    currentIndex.value = index;
    currentIndex1.value = null;
  }
  if (type === 'right') {
    currentIndex1.value = index;
    currentIndex.value = null;
  }
  emit('update:index', row);
  emit('update:title', title.value);
}
watch();
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.header {
  z-index: 9999;
  header {
    height: 90px;
    background: url('@/assets/image/head.png') no-repeat;
    // background-color: #103760;
    background-size: 100% 100%;
    display: flex;
    // align-items: center;
    // justify-content: space-between;
    // padding-left: 92px;
    padding: 0 20px;
    box-sizing: border-box;
    img {
      width: 64.02px;
      height: 54.71px;
    }
    .img-left {
      // width: 132px;
      // height: 112px;
      cursor: pointer;
      width: 56px;
      height: 46px;
      margin: 10px 34px 0 0;
    }
    .img-right {
      margin: 10px 0px 0 34px;
      cursor: pointer;
    }
    .list {
      display: flex;
      justify-content: space-between;
      width: 27%;
    }
    .title {
      flex: 1;
      font-family: YouSheBiaoTiHei;
      font-size: 42px;
      color: #ffffff;
      letter-spacing: 4.2px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .item {
      width: 120px;
      height: 38px;
      background: url('@/assets/image/title-bg.png') no-repeat;
      background-size: 100% 100%;
      font-family: PangMenZhengDao-3;
      font-weight: 3;
      font-size: 24px;
      color: #b7e9fd;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 16px 0px 0 0;
      cursor: pointer;
      span {
        background-image: -webkit-linear-gradient(bottom, #8cfffb, #a7fcff, #ffffff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .itemChange {
      background: url('@/assets/image/titble-bg1.png') no-repeat;
      background-size: 100% 100%;
      span {
        background-image: -webkit-linear-gradient(bottom, #d69944, #ffebd1, #ffffff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
}
</style>
