<template>
  <div class="right-box">
    <Right1 />
    <Right2 />
    <Right3 />
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import Right1 from './right/right1.vue';
import Right2 from './right/right2.vue';
import Right3 from './right/right3.vue';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({});
const {} = props;
const test = computed(() => {
  return null;
});

watch();
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.right-box {
  height: calc(1080px - 71px);
  width: 500px;
  background-image: linear-gradient(270deg, #0f276c 1%, rgba(15, 39, 108, 0.3) 100%);
  padding: 27px 26px 0px 22px;
  box-sizing: border-box;
  margin: -19px 0 0 0;
  pointer-events: auto;
  overflow: hidden;
}
</style>
