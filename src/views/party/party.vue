<template>
  <div class="party" v-if="isShow">
    <div v-if="!isShowMpa">
      <main class="list">
        <Item1 />
        <Item2 />
        <Item3 />
        <Item4 />
        <Item5 @showMap="isShowMpa = true" />
      </main>
      <footer>
        <div v-if="isShowFooter" class="footer-box">
          <div class="title">近期重点工作</div>
          <vue3-seamless-scroll :list="tableData.concat(tableData)" class="scroll-box" direction="left" :hover="true" :step="0.5" :limitScrollNum="1" >
            <div class="scroll-list">
              <div class="item" v-for="(item, index) in tableData" :key="index">
                <div class="item-title">{{ item.subject }}</div>
                <div class="content">
                  <div class="info">{{ item.content }}</div>
                  <!-- <img :src="item.url" alt="" /> -->
                  <vue3-seamless-scroll class="scroll" :list="item.urlList" :step="0.5" :hover="true">
                    <img v-for="(url, index) in item.urlList" :key="index" :src="url+'?thumbnail=true'" alt="" />
                    <!-- <div v-for="(url, index) in item.urlList" :key="index">45665</div> -->
                  </vue3-seamless-scroll>
                </div>
              </div>
            </div>
          </vue3-seamless-scroll>
        </div>
      </footer>
    </div>
    <MapPoint v-else @back="isShowMpa = false" />
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import Item1 from './item1.vue';
import Item2 from './item2.vue';
import Item3 from './item3.vue';
import Item4 from './item4.vue';
import Item5 from './item5.vue';
import MapPoint from './mapPoint.vue';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';

import { indicatorSetTreMapList, IndicatorFeaturedWorkList } from '@/api/index';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const test = computed(() => {
  return null;
});
let isShowMpa = ref(false);
let isShow = ref(false);
let tableData = ref([]);
let isShowFooter = ref(false);
async function getList() {
  let obj = {
    fullPath: '数字党建',
    searchValue: 'isNotNull',
  };
  const { data } = await indicatorSetTreMapList(obj);
  if (data) {
    isShowFooter.value = data['数字党建-特色工作-是否展示'].value === 'false' ? false : true;
    store.commit('setPartyData', data);
    isShow.value = true;
  }
  const res = await IndicatorFeaturedWorkList({
    type: 1,
  });
  if (res) {
    tableData.value = res.rows//.slice(0,1)
    console.log('tableData', tableData.value);
  }
}
watch();
onMounted(() => {
  getList();
});
onUnmounted(() => {
});
</script>
<style lang="less" scoped>
.party {
  // min-height: 100%;
  // background: #091b47;
  padding: 19px 20px 12px 20px;
  box-sizing: border-box;
  main {
    display: flex;
  }
  footer {
    height: 139px;
  }
  .footer-box {
    display: flex;
    margin: 20px 0 0 0;
    align-items: center;
    .title {
      width: 220px;
      height: 57px;
      background-image: linear-gradient(
        90deg,
        rgba(47, 93, 142, 0) 1%,
        rgba(39, 112, 202, 0.38) 1%,
        rgba(31, 127, 255, 0) 100%
      );
      border-radius: 4px;
      font-weight: 600;
      font-size: 18px;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      // margin: 0 40px 0 0;
      padding-right: 40px;
      box-sizing: border-box;
    }

    .scroll-list {
      display: flex;
      align-items: center;
      justify-content: center;
      .item {
        width: calc(50vw);
        height: 135px;
        background: rgba(15, 39, 108, 0.7);
        border: 2px solid #2ba9bd;
        border-radius: 8px;
        color: #fff;
        margin: 0 32px 0 0;
        box-sizing: border-box;
        position: relative;
        .item-title {
          width: 300px;
          height: 36px;
          background: #2ba9bd;
          border-radius: 8px 0 20px 0;
          font-weight: 600;
          font-size: 14px;
          color: #ffffff;
          display: flex;
          align-items: center;
          padding: 0 18px;
          box-sizing: border-box;
          position: absolute;
          left: 0;
          top: 0;
        }
        .content {
          display: flex;
          height: 100px;
          padding: 20px 20px;
          .info {
            margin: 28px 0 0;
            overflow: scroll;
            // overflow: hidden;
            box-sizing: border-box;
            flex: 1;
            margin-right: 20px;
          }
          img {
            // width: 140px;
            height: 100px;
            border-radius: 4px;
            object-fit: contain;
          }
        }
      }
    }
  }
  .scroll-box {
    // width: 200px;
    width: calc(100% - 220px);
    height: 140px;
    overflow: hidden;
  }
}
.scroll {
  width: 150px;
  height: 100px;
  overflow: hidden;
}
</style>
