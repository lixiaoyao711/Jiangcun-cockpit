<template>
  <div class="footer">
    <div class="windows-list"></div>
    <div class="list">
      <div class="screening-box">
        <div class="screening">
          <span @click="checkboxDialog = !checkboxDialog"> 图例筛选(已选{{ checkList.length }})</span
          ><el-icon><ArrowDownBold /></el-icon>
          <div class="show-window" v-if="checkboxDialog">
            <el-checkbox-group v-model="checkList" @change="changeBox">
              <el-checkbox v-for="(item, index) in propsCheckbox" :key="index" :label="index">
                <template #default>
                  <div class="check-box">
                    <img :src="item.icon" alt="" />
                    <span>
                      {{ index }}
                    </span>
                  </div>
                </template>
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
    </div>
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
import { watch } from 'vue';

const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({
  propsCheckbox: Array,
});
const {} = props;
const storeCheckList = computed(() => {
  // console.log('checkList变了');
  return store.state.checkList;
});
let checkboxDialog = ref(true);
let listData = ref([
  {
    name: '综合门户',
    img: 'image/zhmh.png',
    dom: General,
    title: '魅力水乡,数智蒋村',
  },
  {
    name: '数字党建',
    img: 'image/szdj.png',
    dom: RuleOflaw,
    title: '蒋村街道综合管理驾驶舱',
  },
  {
    name: '数字政府',
    img: 'image/szzf.png',
    dom: Government,
    title: '蒋村街道综合管理驾驶舱',
  },
  {
    name: '数字经济',
    img: 'image/szjj.png',
    dom: Economic,
    title: '蒋村街道综合管理驾驶舱',
  },
  {
    name: '数字社会',
    img: 'image/szsh.png',
    dom: Social,
    title: '蒋村街道综合管理驾驶舱',
  },
  {
    name: '数字文化',
    img: 'image/szwh.png',
    dom: Party,
    title: '蒋村街道综合管理驾驶舱',
  },
  {
    name: '数字法治',
    img: 'image/szfz.png',
    dom: Culture,
    title: '蒋村街道综合管理驾驶舱',
  },
]);
let checkList = ref([]);
function changeItem(row) {
  listData.value.map((item) => {
    if (item.name === row.name) {
      if (item.img.indexOf('1') !== -1) {
        return;
      }
      item.img = item.img + '1';
      return;
    }
    if (item.img.indexOf('1') != -1) {
      item.img = item.img.slice(0, -1);
    }
    emit('update:index', row.dom);
  });
}

function changeBox() {
  console.log(checkList.value);
  store.commit('setCheckboxData', checkList.value);
}
watch(storeCheckList, (newValue, oldValue) => {
  checkList.value = newValue;
});
watch(() => props.propsCheckbox, () => {
  checkList.value = []
  changeBox()
})
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.footer {
  position: absolute;
  left: 50%;
  transform: translate(-50%); //水平、垂直都居中,也可以写成下面的方式
  // bottom: -23%;
  .windows-list {
    display: flex;
    width: 869px;
    .windows {
      flex: 1;
      height: 135px;
      background: rgba(15, 39, 108, 0.7);
      border: 2px solid #2ba9bd;
      border-radius: 8px;
      margin: 0 16px 0 0;
    }
    .title {
      width: 194px;
      height: 36px;
      background: #2ba9bd;
      border-radius: 8px 0 20px 0;
    }
  }

  .list {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    .item {
      text-align: center;
      cursor: pointer;
      img {
        width: 64.02px;
        height: 53.71px;
      }
      .title {
        font-family: PangMenZhengDao-3;
        font-weight: 3;
        font-size: 24px;
        color: #b7e9fd;
      }
    }
  }
  .screening-box {
    position: absolute;
    bottom: 8.520833vw;
    right: 0;
    font-size: 16px;
    .screening {
      width: 160px;
      height: 50px;
      background-image: linear-gradient(180deg, rgba(59, 231, 249, 0.7) 0%, rgba(21, 146, 145, 0.7) 100%);
      border-radius: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      float: right;
      position: relative;
      .show-window {
        position: absolute;
        padding-left: 16px;
        box-sizing: border-box;
        bottom: 60px;
        min-width: 156px;
        width: 190px;
        opacity: 0.84;
        background: #101c39;
        border-radius: 4px;
        display: flex;
        align-items: center;
      }
    }
  }
  .el-checkbox {
    white-space: normal;
    color: #fff;
  }
  .check-box {
    display: flex;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      margin: 0 12px 0 0;
    }
  }
}
</style>
