<template>
  <div class="right-box">
    <Right1 />
    <Left3 />
    <Right2 />
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import Right1 from './right/right1.vue';
import Left3 from './left/left3.vue';
import Right2 from './right/right2.vue';
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
  // height: calc(1080px - 72px);
  width: 500px;
  background-image: linear-gradient(270deg, #08163e 1%, #0a1c4f00 100%);

  padding: 0px 26px 36px 22px;
  box-sizing: border-box;
  margin: -19px 0 0 0;
  pointer-events: auto;
}
</style>
