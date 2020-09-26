<template>
  <div class="tiles-view"
    v-loading="dataLoading"
    element-loading-background="rgba(0, 0, 0, 0.1)"  
  >
    <template v-if="!dataLoading">
      <el-container>
        <el-header class="selected-name">
          {{ meta.name }}
        </el-header>
        <el-main class="tiles-viewer">
          <div class="on-board">
            <el-switch v-model="isOnBoard" active-text="On Board" />
          </div>
          <el-row :gutter="10">
            <el-col v-for="(tile, index) in tiles" :key="index" :xl="4" :lg="6" :md="8" :sm="12" :xs="24">
              <bgi-tile :tile="tile" />
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import firebaseApp from '@/firebase/app'
import BgiTile from './tile'

export default {
  components: {
    BgiTile
  },
  data() {
    return {
      isOnBoard: false,
      dataLoading: true,
      tiles: null,
      meta: null
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    const userId = this.user.uid
    const userRef = firebaseApp.database().ref(`/vessels/${userId}/${this.$route.params.vesselId}`)
    this.dataLoading = true

    userRef.on('value', (res) => {
      const vessel = res.val()
      this.tiles = vessel.tiles
      this.meta = vessel.meta
      this.dataLoading = false
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';
.tiles-view {
  width: 100%;
  min-height: calc(100vh - 120px);
  .selected-name {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $clr-bg-primary;
    color: $clr-text-primary;
    text-transform: uppercase;
    box-shadow: 0 0 5px rgba(#000, 0.5);
    font-size: 24px;
    z-index: 99;
  }
  .tiles-viewer {
    padding: 20px;
    height: calc(100vh - 180px);
    overflow-y: auto;
    .on-board {
      margin-bottom: 20px;
    }
  }
}
</style>