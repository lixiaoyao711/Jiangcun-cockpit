<template>
  <div class="right-box">
    <Right1 />
    <Right2 />
    <Right3 />
    <Right4 />
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import Right1 from './right/right1.vue';
import Right2 from './right/right2.vue';
import Right3 from './right/right3.vue';
import Right4 from './right/right4.vue';
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
    margin: -19px 0 0 0;

  pointer-events: auto;
  // height: 1080px;
  width: 500px;
  background-image: linear-gradient(270deg, #0f276c 1%, rgba(15, 39, 108, 0.3) 100%);
  padding: 0px 26px 36px 22px;
  box-sizing: border-box;
}
</style>
