<template>
  <el-container class="dashboard">
    <el-aside class="dashboard-aside">
      <bgi-aside />
    </el-aside>
    <el-main class="dashboard-main">
      <bgi-tiles />
    </el-main>
  </el-container>
</template>

<script>
import BgiAside from '@/components/dashboard/aside.vue'
import BgiTiles from '@/components/dashboard/tiles.vue'
export default {
  components: {
    BgiAside,
    BgiTiles
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 0;
  margin: 0;
  &-main {
    padding: 0;
    margin: 0;
  }
  &-aside {
    padding: 0;
    margin: 0;
    width: auto !important;
  }
}
</style>