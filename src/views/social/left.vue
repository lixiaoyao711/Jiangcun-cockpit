<template>
  <div class="left-box">
    <Left1 />
    <Left2 />
    <Left3 />
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import Left1 from './left/left1.vue';
import Left2 from './left/left2.vue';
import Left3 from './left/left3.vue';

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
.left-box {
  margin: -19px 0 0 0;
  pointer-events: auto;
  width: 500px;
  // height: 1080px;
  background-image: linear-gradient(90deg, #08163e 1%, rgba(10, 28, 79, 0) 100%);
  padding: 0 26px 46px 20px;
  box-sizing: border-box;
}
</style>
