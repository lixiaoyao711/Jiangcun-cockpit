<template>
  <div class="tabs">
    <div
      class="tab"
      :class="{ clickTab: props.index === index }"
      @click="leftChange(index)"
      v-for="(item, index) in propsData"
      :key="index"
    >
      {{ item }}
    </div>
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
function leftChange(index) {
  emit('update:index', index);
  emit('tabChange', index);
}
watch();
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.tabs {
  margin-top: 16px;
  width: 100%;
  // height: 28px;
  background-image: linear-gradient(180deg, rgba(205, 245, 255, 0.24) 0%, rgba(101, 166, 255, 0.12) 99%);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  .tab {
    flex: 1;
    font-size: 14px;
    min-width: 68px;
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
