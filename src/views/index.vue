<template>
  <!-- 动态设置背景--------------有纯色背景设置纯色背景,没有纯色背景设置图片背景 -->
  <div
    v-if="currentIndex.name !== '数字政府' || showDataMap('数字政府', '1597485758657384449').value === 'false'"
    class="General"
  >
    <img :src="backgroundImageUrl" alt="">
  </div>
  <el-carousel v-else indicator-position="none" :interval="5000">
    <el-carousel-item v-for="(item, index) in backgroundImageUrl" :key="index">
      <div class="General" >
        <img :src="item" alt="">
      </div>
    </el-carousel-item>
  </el-carousel>
    <!-- <img :src="imgUrl" alt=""> -->
  <div class="content">
    <Header v-model:index="currentIndex" @openHome="openHome" />
    <main>
      <component :is="currentIndex.dom" v-model:checkbox="checkbox"></component>
    </main>
    <Footer :propsCheckbox="checkbox" v-if="currentIndex.isFooter && isFooter" />
  </div>
</template>
<script setup>
import axios from 'axios';
// import store from '@/store';
import {useStore} from 'vuex'
import {toWebP, base64ToFile} from '@/utils/common.js'
import Header from '@/views/index/header';
import Government from '@/views/government/government'; //数字政府
import RuleOflaw from '@/views/ruleOflaw/ruleOflaw'; //数字法治
import Economic from '@/views/economic/economic'; //数字经济
import Social from '@/views/social/social'; //数字社会
import General from '@/views/general/general'; //综合门户
import { indicatorSetTreMapList, IndicatorFeaturedWorkList, mapGovernmentList } from '@/api/index';

import Party from '@/views/party/party'; //数字党建
import Culture from '@/views/culture/culture'; //数字文化
import Footer from '@/views/index/footer';
import { showDataMap } from '@/utils/common';
import HomeBgPng from '@/assets/image/home-bg.webp'
import { computed } from 'vue';
const router = useRouter();
const route = useRoute();
const store = useStore()
const emit = defineEmits(['close', 'openHome']);
const props = defineProps({});
let isShow = ref(false);
let backgroundImageUrl = computed(() => store.state.homeBg);
let imgUrl = ref('')
const isFooter = computed(() => {
  return store.state.isFooter;
});
async function getList() {
  let obj = {
    fullPath: '数字政府',
    searchValue: 'isNotNull',
  };
  const { data } = await indicatorSetTreMapList(obj);
  if (data) {
    store.commit('setGovernmentData', data);
    isShow.value = true;
  }
}
const {} = props;
let currentIndex = ref({
  dom: General,
  isFooter: true,
  backgroundImage: HomeBgPng,
  title: '魅力水乡,数智蒋村',
});
let checkbox = ref([]);
function openHome() {
  console.log(currentIndex.value);
  emit('openHome');
}
watch(currentIndex, (newValue, oldValue) => {
  store.commit('setHomeBg', newValue.backgroundImage); 
});
onMounted(() => {
  store.commit('setHomeBg', HomeBgPng);
  getList();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.General {
  background-size: 100% 100% !important;
  width: 1920px;
  height: 1090px;
  position: relative;
  // margin-top: -500px;
  // &+img{
  //   line-height: 1;
  //   vertical-align: top;
  //   position: absolute;
  //   left: 50%;
  //   top: 0;
  // }
}
:deep(.el-carousel__container) {
  position: relative;
  height: 1090px;
  background-size: 100% 100%;
  .General{
    height: 100%;
    img{
      object-fit: cover;
    }
  }
}
.content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
main {
  height: calc(100% - 112px) !important;
}
</style>
