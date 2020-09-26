<template>
  <el-container class="application">
    <el-header>
      <bgi-header />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>
      <bgi-footer />
    </el-footer>
  </el-container>
</template>

<script>
import BgiHeader from '@/components/layout/header.vue'
import BgiFooter from '@/components/layout/footer.vue'
export default {
  name: 'application',
  components: {
    BgiHeader,
    BgiFooter
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';

.application {
  width: 100%;
  height: 100vh;
  .el-header, .el-footer {
    width: 100%;
    height: 60px;
    margin: 0;
    padding: 0;
    background-color: $clr-primary;
    box-shadow: 0 0 5px rgba(#000, 0.3) !important;
    z-index: 99;
  }
  .el-main {
    width: 100%;
    height: calc(100vh -120px);
    margin: 0;
    padding: 0;
    background-color: white;
  }
}
</style>