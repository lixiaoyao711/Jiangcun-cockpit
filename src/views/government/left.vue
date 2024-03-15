<template>
  <div class="left">
    <Left1 />
    <Left2 />
    <Left3 />
    <Left4 />
    <Left5 />
  </div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
import Left1 from '@/views/government/left/left1';
import Left2 from '@/views/government/left/left2';
import Left3 from '@/views/government/left/left3';
import Left4 from '@/views/government/left/left4';
import Left5 from '@/views/government/left/left5';
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
.left {
  width: 500px;
  height: calc(1080px - 69px);
  margin: -18px 0 0 0;
  background-image: linear-gradient(90deg, #0f276c 1%, rgba(15, 39, 108, 0.3) 100%);
  padding-left: 22px;
  box-sizing: border-box;
  pointer-events: auto;
}
</style>
