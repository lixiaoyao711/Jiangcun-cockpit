<template>
  <div class="left-box">
    <Left1 />
    <Left2 />
    <Left3 />
    <Left4 />
    <Left5 />
  </div>
</template>
<script setup>
import Left1 from './left/left1.vue';
import Left2 from './left/left2.vue';
import Left3 from './left/left3.vue';
import Left4 from './left/left4.vue';
import Left5 from './left/left5.vue';
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
  width: 500px;
  height: calc(1080px - 71px);
  background-image: linear-gradient(90deg, #0f276c 1%, rgba(15, 39, 108, 0.3) 100%);
  padding: 27px 26px 36px 22px;
  box-sizing: border-box;
  pointer-events: auto;
}
</style>
