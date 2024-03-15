<template>
  <div class="tabs-box">
    <el-icon @click="scrollTo(titleBox, 0)" class="arrowleft"><ArrowLeft /></el-icon>
    <div class="tabs" ref="titleBox">
      <div
        class="tab"
        :class="{ clickTab: props.index === index }"
        @click="leftChange(titleBox,index)"
        v-for="(item, index) in propsData"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
    <el-icon @click="scrollTo(titleBox, 1)" class="arrowright"><ArrowRight /></el-icon>
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close', 'tabChange']);
const props = defineProps({
  propsData: {
    type: String,
  },
  index: {
    type: Number,
    default: 0,
  },
});
const {} = props;
const test = computed(() => {
  return null;
});
function leftChange(dom,index) {
  dom.scrollBy({
    left: 0,
    behavior: 'smooth',
  });
  emit('update:index', index);
  emit('tabChange', index);
}
let titleBox = ref(null);
function scrollTo(dom, val) {
  const px = 400;
  dom.scrollBy({
    left: val ? px : -px,
    behavior: 'smooth',
  });
}
watch();
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.tabs-box {
  position: relative;
  padding: 0 16px;
  box-sizing: border-box;
}
.el-icon {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  cursor: pointer;
  color: #fff;
}
.arrowleft {
  left: 0;
}
.arrowright {
  right: 0;
}
.tabs {
  margin-top: 16px;
  width: 100%;
  // height: 28px;
  background-image: linear-gradient(180deg, rgba(205, 245, 255, 0.24) 0%, rgba(101, 166, 255, 0.12) 99%);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // flex-wrap: wrap;
  overflow: scroll;
  position: relative;

  .tab {
    flex: 1;
    font-size: 14px;
    min-width: 80px;
    height: 28px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
  }
  .clickTab {
    background-image: linear-gradient(180deg, rgba(96, 172, 255, 0.8) 0%, rgba(96, 160, 255, 0.24) 98%);
  }
}
</style>
