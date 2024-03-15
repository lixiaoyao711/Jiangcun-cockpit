<template>
  <div class="item3">
    <div>
      <img src="@/assets/image/hjlh.png" alt="" class="img1" />
    </div>
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
.item3 {
  margin: 0 30px 0 0;
  .img1 {
    width: 180px;
    height: 792px;
  }
}
</style>
