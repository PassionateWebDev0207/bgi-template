<template>
  <div class="home-view">
    <img src="@/assets/images/bgi-logo.png" alt="logo" />
    <p style="margin-top: 60px">Welcome to the BG-Link Plus Web portal. Here you can chart your boat's data, manage maintenance logs and more.</p>
    <p>Login with you BG-Link Plus app credentials.</p>
    <p style="margin: 20px 0 60px">If you don't have an account visit bluebgi.com to get started with the BG-Link Plus system.</p>
    <el-button v-if="!isLoggedIn" class="login-btn" @click="goToLoginPage">Login</el-button>
  </div>
</template>

<script>
import firebaseApp from '@/firebase/app'
export default {
  name: 'home',
  data() {
    return {
      isLoggedIn: false
    }
  },
  created() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    });
  },
  methods: {
    goToLoginPage() {
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';

.home-view {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 15px;

  .login-btn {
    color: $clr-primary;
    font-family: $font-primary;
    font-weight: 300;
  }

  p {
    color: white;
    text-align: center;
  }
}
</style>

