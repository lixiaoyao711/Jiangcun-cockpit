<template>
  <div class="item4">
    <div class="sub1">
      <div class="title">品牌强“蒋”</div>
      <div class="info">
        <div class="list">
          <div class="item" v-for="(item, index) in tableData" :key="index" @click="showDialog(item)">
            <img :src="item.url+'?thumbnail=true'" alt="" />
            <div class="item-title">{{ item.subject }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sub2">
      <div class="title">同心凝“蒋”</div>
      <Tabs :propsData="tabsData" v-model:index="currentIndex" @tabChange="tabChange" />
      <div v-if="currentIndex === 0" class="list0">
        <img src="@/assets/image/tz-bg.png" alt="" />
      </div>
      <div v-if="currentIndex === 1" class="list1">
        <div class="item" v-for="(item, index) in listData" :key="index" @click="showDialog(item)">
          <img :src="item.url+'?thumbnail=true'" alt="" />
          <div class="name">{{ item.subject }}</div>
          <div class="tag">{{ item.jobs }}</div>
        </div>
      </div>
      <div v-if="currentIndex === 2" class="list2">
        <div class="item" v-for="(item, index) in listData" :key="index" @click="showDialog(item)">
          <div class="left">
            <img :src="item.url+'?thumbnail=true'" alt="" />
            <div class="item-title">{{ item.subject }}</div>
          </div>
          <div class="time">{{ item.useTime }}</div>
        </div>
      </div>
    </div>
    <Dialog :title="dialogData.subject" @close="isShowDialog = false" v-if="isShowDialog">
      <template v-slot:content>
        <div class="dialog-content">
          <img :src="dialogData.url" alt="" />
          <span class="content-text">{{ dialogData.content }}</span>
          <!-- <div class="img-box">
            <img :src="dialogData.url" alt="" />
          </div> -->
        </div>
      </template>
    </Dialog>
    <Dialog :title="'详情'" @close="isShowDialog1 = false" v-if="isShowDialog1">
      <template v-slot:content>
        <div class="dialog-people">
          <img :src="dialogData.url" alt="" />
          <div class="item">
            <div class="name">{{ dialogData.subject }}</div>
            <div class="tag">{{ dialogData.jobs }}</div>
          </div>
          <div class="info">{{ dialogData.content }}</div>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import { IndicatorStrongBrandList, IndicatorMajorEventsList } from '@/api/index';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const test = computed(() => {
  return null;
});
let tabsData = ['一核五会', '新乡贤代表', '重大活动'];

let isShowDialog = ref(false);
let isShowDialog1 = ref(false);
let currentIndex = ref(0);
let dialogData = ref({});
function showDialog(row) {
  isShowDialog.value = true;
  dialogData.value = row;
}
function showPeople() {
  isShowDialog1.value = true;
}
let tableData = ref([]);
async function getData() {
  const res = await IndicatorStrongBrandList();
  if (res) {
    tableData.value = res.rows;
  }
}

let listData = ref([]);
async function tabChange() {
  listData.value = []
  const res = await IndicatorMajorEventsList({
    type: currentIndex.value === 1 ? 2 : 1,
  });
  if (res) {
    listData.value = res.rows;
  }
}
watch();
onMounted(() => {
  getData();
});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.item4 {
  overflow: hidden;
  margin: 0 16px 0 0;
  .title {
    // width: 348px;
    background: url('@/assets/image/djbt.png');
    background-size: 100% 100%;
    align-items: center;
    height: 40px;
    font-family: PingFangSC-S0pxibold;
    font-weight: 600;
    font-size: 21px;
    color: #30f7fd;
    display: flex;
    justify-content: center;
    letter-spacing: 0;
    text-shadow: 0 2px 2px rgba(76, 255, 244, 0.5);
    // padding: 8px 0 0 0;
    box-sizing: border-box;
  }
  .sub1 {
    width: 400px;
    height: 386px;
    background: rgba(92, 132, 253, 0.1);
    border-radius: 8px;
    padding: 0 12px;
    box-sizing: border-box;
    .info {
      .list {
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
        height: 300px;
        .item {
          text-align: center;
          width: 50%;
          margin: 32px 0 0 0;
          cursor: pointer;
          img {
            width: 152.92px;
            height: 94px;
            background: #d8d8d8;
            border-radius: 4px;
          }
          .item-title {
            font-family: PingFangSC-Medium;
            font-weight: 500;
            font-size: 16px;
            color: #ffffff;
          }
        }
      }
    }
  }
  .sub2 {
    width: 400px;
    height: 386px;
    background: rgba(92, 132, 253, 0.1);
    border-radius: 8px;
    padding: 0 12px;
    box-sizing: border-box;
    margin: 28px 0 0 0;
    .list0 {
      display: flex;
      justify-content: center;
      margin: 10px 0 0 0;
      img {
        width: 306px;
        height: 274px;
      }
    }
    .list1 {
      display: flex;
      flex-wrap: wrap;
      height: 300px;
      overflow: scroll;
      .item {
        width: 33%;
        // text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px 0 0 0;
        cursor: pointer;
        img {
          width: 76px;
          height: 76px;
          border-radius: 6px;
        }
        .name {
          color: #fff;
          margin: 6px 0 0 0;
        }
        .tag {
          padding: 3px;
          border-radius: 6px;
          border: 1px solid #fff;
          color: #fff;
          width: 60px;
          // height: 20px;
          font-size: 14px;
          margin: 3px 0 0 0;
          text-align: center;
        }
      }
    }
    .list2 {
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 24px 10px 8px;
        box-sizing: border-box;
        margin: 14px 0 0 0;
        border-bottom: 1px solid rgba(92, 132, 253, 0.1);
        cursor: pointer;
        .left {
          display: flex;
          align-items: center;
          img {
            width: 70.44px;
            height: 58px;
            margin: 0 26px 0 0;
          }
          .item-title {
            font-family: PingFangSC-S0pxibold;
            font-weight: 600;
            font-size: 16px;
            color: #ffffff;
          }
        }

        .time {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          font-size: 12px;
          color: #ffffff;
        }
      }
    }
  }
  .dialog-content {
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

    .item {
      width: 33%;
      // text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px 0 0 0;

      .name {
        color: #fff;
        margin: 6px 0 0 0;
      }
      .tag {
        padding: 3px;
        border-radius: 6px;
        border: 1px solid #fff;
        color: #fff;
        width: 60px;
        height: 20px;
        font-size: 14px;
        margin: 3px 0 0 0;
      }
    }
  }
  .dialog-people {
    display: flex;
    .item {
      width: 33%;
      // text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 10px 0 0 0;
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
      .name {
        color: #fff;
        margin: 6px 0 0 0;
      }
      .tag {
        padding: 3px;
        border-radius: 6px;
        border: 1px solid #fff;
        color: #fff;
        width: 60px;
        height: 20px;
        font-size: 14px;
        margin: 3px 0 0 0;
      }
    }
  }
}
::-webkit-scrollbar {
  display: none;
}
.dialog {
  img {
    width: 230px;
    height: 130px;
    margin: 10px 0 0 0;
  }
}
</style>
