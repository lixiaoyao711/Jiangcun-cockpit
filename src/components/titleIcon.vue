<template>
  <div class="icon-box" :class="type" v-if="effect === 'circle'">
    <div class="icon"></div>
  </div>
  <div class="icon-box-square" :class="type" v-if="effect === 'card'"></div>
</template>
<script setup>
import axios from 'axios';
import store from '@/store';
const router = useRouter();
const route = useRoute();
const emit = defineEmits(['close']);
const props = defineProps({
  type: {
    type: String,
    default: 'success',
  },
  effect: {
    type: String,
    default: 'circle',
  },
});
const {} = props;
const test = computed(() => {
  return null;
});
watch();
onMounted(() => {});
onUnmounted(() => {});
</script>
<style lang="less" scoped>
.icon-box {
  width: 26px;
  height: 26px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 16px;
  .icon {
    width: 18px;
    height: 18px;
    border-radius: 30px;
  }
}
.success {
  background: rgba(78, 255, 143, 0.4);
  .icon {
    background: #4eff8f;
  }
}
.warning {
  background: rgba(255, 189, 78, 0.4);
  .icon {
    background: rgba(255, 189, 78, 1);
  }
}
.danger {
  background: rgba(249, 89, 26, 0.4);
  .icon {
    background: rgb(255, 0, 0);
  }
}
.icon-box-square {
  width: 12px;
  height: 12px;
  background: #ffffff80;
}
</style>
