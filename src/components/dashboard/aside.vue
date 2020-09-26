<template>
  <div class="bgi-aside">
    <div class="collapse-trigger">
      <el-button
        :icon="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"
        type="primary"
        @click="isCollapse = !isCollapse"
      />
    </div>
    <el-menu class="vessel-list" :collapse="isCollapse">
      <el-menu-item v-for="(item, index) in vessels" :key="index">
        <vessel :vessel-id="item.id" :isCollapse="isCollapse" />
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebaseApp from '@/firebase/app'
import Vessel from './vessel'

export default {
  components: {
    Vessel
  },
  data() {
    return {
      isCollapse: false,
      vessels: null
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    const userId = this.user.uid
    const userRef = firebaseApp.database().ref(`/users/${userId}`)
    userRef.on('value', (res) => {
      this.vessels = res.val().vessels ? res.val().vessels : null
    })
    this.$store.commit('setVesselListCollapse', this.isCollapse)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';
.bgi-aside {
  height: calc(100vh - 120px);
  background-color: $clr-primary;
  .collapse-trigger {
    display: flex;
    flex-direction: row-reverse;
    padding: 5px 0;
    .el-button {
      border-radius: 5px 0 0 5px;
      padding: 0;
      width: 40px;
      height: 40px;
    }
  }
  .vessel-list {
    background-color: $clr-primary;
    height: calc(100% - 50px);
    border: none;
    overflow-y: auto;
    &:not(.el-menu--collapse) {
      width: 320px;
    }
    .el-menu-item {
      height: 90px;
      margin-bottom: 5px;
      padding: 0 !important;
      background-color: transparent;
      border: none;
      line-height: 1;
      &:hover {
        background-color: transparent;
        border: none;
      }
    }
  }
  .el-menu--collapse {
    width: 90px;
  }
}
</style>