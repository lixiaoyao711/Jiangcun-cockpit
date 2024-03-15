<template>
  <div class="right">
    <Right1 />
    <Right2 />
    <!-- <Right3 />
    <Right4 /> -->
    <Right5 />
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import Right1 from '@/views/government/right/right1';
import Right2 from '@/views/government/right/right2';
import Right3 from '@/views/government/right/right3';
import Right4 from '@/views/government/right/right4';
import Right5 from '@/views/government/right/right5';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({ propsData: Object });
const {} = props;
const test = computed(() => {
  return null;
});
watch();
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.right {
  width: 500px;
  // height: 1080px;
  background-image: linear-gradient(270deg, #0f276c 1%, rgba(15, 39, 108, 0.3) 100%);
  padding: 0 0 0 16px;
  box-sizing: border-box;
  margin: -19px 0 0 0;
  height: calc(1080px - 68px);
  pointer-events: auto;
}
</style>
