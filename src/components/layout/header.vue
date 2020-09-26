<template>
  <div class="bgi-header">
    <div class="bgi-logo">
      <img src="@/assets/images/bgi-logo.png" alt="logo" height="40" />
    </div>
    <div class="bgi-nav-items">
      <router-link
        v-for="item in navItems"
        :key="item.name"
        class="bgi-nav-item"
        :class="item.name === currentRoute ? 'hide' : null"
        :to="{ name: item.name }"
      >
        <el-button type="primary">{{ item.title }}</el-button>
      </router-link>
    </div>
    <div class="bgi-avatar">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link" style="margin-right: 10px">
          <i class="el-icon-user-solid" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            icon="el-icon-setting"
            command="goSettings"
          >
            Settings
          </el-dropdown-item>
          <el-dropdown-item
            icon="el-icon-switch-button"
            command="logout"
          >
            Log out
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-search" />
        </span>
        <el-dropdown-menu slot="dropdown">
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import firebaseApp from '@/firebase/app'

export default {
  data: () => ({
    navItems: [
      { name: 'dashboard', title: 'Home' },
      { name: 'sensors', title: 'Sensors' },
      { name: 'users', title: 'Users' },
      { name: 'charts', title: 'Charts' },
      { name: 'log', title: 'Maintenance Log' }
    ]
  }),
  computed: {
    currentRoute() {
      return this.$route.name
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        firebaseApp.auth().signOut().then(() => {
          this.$router.push('/')
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bgi-header {
  width: 100%;
  height: 60px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .bgi-logo {
    display: block;
    height: 100%;
    >img {
      height: 100%;
    }
  }
  .bgi-nav-items {
    display: flex;
    .bgi-nav-item {
      > a {
        text-decoration: none;
        color: white;
      }
    }
  }
  .bgi-avatar {
    display: block;
    .el-dropdown-link {
      font-size: 1.5rem;
      color: white;
    }
  }
}
</style>