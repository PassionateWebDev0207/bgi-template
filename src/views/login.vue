<template>
  <div class="login-view">
    <el-card v-if="!isLoggedIn" class="login-form">
      <h1>Login</h1>
      <el-form ref="loginForm" label-position="top" :model="loginForm">
        <el-form-item
          prop="email"
          label="Email"
          :rules="[
            { required: true, message: 'Please input email address', trigger: 'blur' },
            { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
          ]"
        >
          <el-input v-model="loginForm.email" @keyup.enter.native="submit('loginForm')" />
        </el-form-item>
        <el-form-item
          prop="password"
          label="Password"
          :rules="[
            { required: true, message: 'Please input password', trigger: 'blur' },
            { min: 8, max: 32, message: 'Lenght should be 8 to 32', trigger: ['blur', 'change'] }
          ]"
        >
          <el-input v-model="loginForm.password" type="password" @keyup.enter.native="submit('loginForm')" />
        </el-form-item>
        <el-divider />
        <el-form-item>
          <el-button type="primary" @click="submit('loginForm')">
            Login
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div v-else>
      <el-button @click="goToAppPage">Go to Application</el-button>
      <el-button @click="logout">Log out</el-button>
    </div>
  </div>
</template>

<script>
import firebaseApp from '@/firebase/app'

export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      isLoggedIn: false,
      user: null      
    }
  },
  created() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.isLoggedIn = true
        this.user = user
      } else {
        this.isLoggedIn = false
        this.user = null
      }
    });
  },
  methods: {
    submit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const { email, password } =  this.loginForm
          firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then(result => {
              const userId = result.user.uid
              const userRef = firebaseApp.database().ref(`/users/${userId}`)
              
              userRef.on('value', (res) => {
                const data = res.val()
                this.$store.commit('setUser', result.user)
                this.$router.push(`/app/${Object.keys(data.vessels)[0]}`)
              })
            })
            .catch((error) => {
              console.log(error.message)
            })
        }
      })
    },
    goToAppPage() {
      const userId = this.user.uid
      const userRef = firebaseApp.database().ref(`/users/${userId}`)
      
      userRef.on('value', (res) => {
        const data = res.val()
        this.$store.commit('setUser', this.user)
        this.$router.push(`/app/${Object.keys(data.vessels)[0]}`)
      })
    },
    logout() {
      firebaseApp.auth().signOut().then(() => {
        this.$router.push('/')
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';

.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  .login-form {
    width: 375px;
    background-color: white;
    border-radius: 10px;
    h1 {
      margin: 0;
      text-align: center;
    }
  }
}
</style>

<style lang="scss">
.login-view {
  .login-form {
    .el-form {
      &-item {
        margin-bottom: 20px;
        &__label {
          padding: 0;
          line-height: 20px;
        }
        &__content {
          color: #606266;
          line-height: 20px;
        }
        .el-button {
          width: 100%;
        }
      }
    }
  }
}
</style>