<template>
  <div class="right">
     <Right1 />
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import Right1 from './right/right1';
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
.right {
  pointer-events: auto;
  margin: -19px 0 0 0;
  width: 500px;
  // height: 1080px;
  background-image: linear-gradient(270deg, #08163e 1%, rgba(10, 28, 79, 0) 100%);
}
</style>
