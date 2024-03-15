<template>
  <div class="center">
  </div>
</template>
<script setup>

import axios from 'axios';
import store from '@/store';
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
.center {
  width: 900px;
  padding: 0 6px 0 16px;
  box-sizing: border-box;
}
</style>
