<template>
  <div class="App" id="app">
    <router-view />
  </div>
</template>
<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import store from '@/store';
const test = computed(() => {
  return null;
});
watch(() => {});
onMounted(() => {
  store.dispatch('getAllData');
});
onUnmounted(() => {});
</script>
<style lang="less" scoped></style>
