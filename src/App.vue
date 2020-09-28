<template>
  <div class="big-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';
.bgi-app {
  width: 100%;
  min-height: 100vh;
  background-color: $clr-primary;
}
</style>
