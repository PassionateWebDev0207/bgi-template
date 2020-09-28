<template>
  <el-container
    class="users-view"
    v-loading="vesselLoading || usersLoading"
    element-loading-background="rgba(0, 0, 0, 0.1)"
  >
    <el-header class="vessel-name">{{ vesselLoading ? '' : vessel.name }}</el-header>
    <el-main v-if="!usersLoading" class="users">
      <el-dialog
        :title="isEdit ? 'Edit User' : 'New User'"
        :visible.sync="openDlg"
        width="40%"
      >
        <div class="user-dlg">
          <div class="user-dlg-photo">
            <el-avatar icon="el-icon-user-solid" class="avatar" :size="150" shape="square" />
            <el-button type="text">Upload Profile Image</el-button>
          </div>
          <div class="user-dlg-form">
            <el-form ref="userForm" label-position="top" :model="userForm" >
              <el-form-item prop="firstName">
                <el-input v-model="userForm.firstName" placeholder="First Name" size="small" />
              </el-form-item>
              <el-form-item prop="lastName">
                <el-input v-model="userForm.lastName" placeholder="Last Name" size="small" />
              </el-form-item>
              <el-form-item prop="email">
                <el-input v-model="userForm.email" placeholder="Email" size="small" />
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dlg-footer">
          <el-button type="primary" @click="handleSave">Save</el-button>
        </div>
      </el-dialog>
      <div class="user-create">
        <el-button icon="el-icon-plus" circle @click="handleOpenDlg('new', null)" />
      </div>
      <div class="users-container">
        <el-row :gutter="20">
          <el-col v-for="(user, index) in vesselUsers" :key="index" :xl="6" :lg="8" :md="8" :sm="12" :xs="24">
            <div class="user">
              <div class="user-photo">
                <el-avatar icon="el-icon-user-solid" :size="150" shape="square" />
              </div>
              <div class="user-info">
                <h3>{{ `${user.meta.firstName} ${user.meta.lastName}` }}</h3>
                <p>{{ user.meta.email }}</p>
                <p>303-333-3333</p>
                <p>Description</p>
                <p>Notification Only</p>
                <div class="user-actions">
                  <el-button size="mini" type="text" @click="handleOpenDlg('edit', user)">Edit</el-button>
                  <el-divider direction="vertical" type="primary" />
                  <el-button size="mini" type="text" @click="removeUser(user)">Remove</el-button>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
import firebaseApp from '@/firebase/app'

export default {
  data() {
    return {
      vesselLoading: true,
      usersLoading: true,
      vesselUsers: [],
      vessel: null,
      isEdit: true,
      openDlg: false,
      selectedUser: null,
      userForm: {
        firstName: '',
        lastName: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.vesselLoading = true
      firebaseApp.database().ref(`/users/${this.user.uid}/vessels/${this.$route.params.vesselId}`).on('value', (res) => {
        this.vessel = res.val()
        this.vesselLoading = false
      })
      while(this.vesselUsers.length > 0) this.vesselUsers.pop()
      this.usersLoading = true
      firebaseApp.database().ref('/users').on('value', (res) => {
        const userIds = Object.keys(res.val())
        const users = res.val()
        userIds.forEach(id => {
          if (users[id].vessels && users[id].vessels[this.$route.params.vesselId]) {
            this.vesselUsers.push({
              userId: id,
              meta: users[id].meta
            })
          }
        })
        this.usersLoading = false
      })
    },
    handleOpenDlg(openType, user) {
      if (openType === 'new') {
        this.userForm = {
          firstName: '',
          lastName: '',
          email: ''
        }
        this.isEdit = false
      } else {
        this.userForm = {
          firstName: user.meta.firstName,
          lastName: user.meta.lastName,
          email: user.meta.email
        }
        this.selectedUser = user
        this.isEdit = true
      }
      this.openDlg = true
    },
    handleSave() {
      if (this.isEdit) {
        const vessels = {}
        vessels[this.$route.params.vesselId] = this.vessel
        firebaseApp.database().ref(`/users/${this.selectedUser.userId}`).set({
          meta: {
            firstName: this.userForm.firstName,
            lastName: this.userForm.lastName,
            email: this.userForm.email
          },
          vessels
        }).then(() => {
          this.openDlg = false
          this.getData()
        })
      } else {
        const vessels = {}
        vessels[this.$route.params.vesselId] = this.vessel
        firebaseApp.database().ref('/users').on('value', (res) => {
          const users = res;
          let identifier = this.userForm.email.replaceAll('.', '-dot-')
          if (users[identifier] === undefined) {
            firebaseApp.database().ref(`/users/${identifier}`).set({
              meta: {
                firstName: this.userForm.firstName,
                lastName: this.userForm.lastName,
                email: this.userForm.email
              },
              vessels
            }).then(() => {
              this.openDlg = false
              this.getData()
            })
          }
        })
      }
    },
    removeUser(user) {
      firebaseApp.database().ref(`/users/${user.userId}/vessels`).remove().then(() => {
        this.getData()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';

.users-view {
  width: 100%;
  min-height: calc(100vh - 120px);
  .vessel-name {
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
  .users {
    padding: 20px 60px;
    height: calc(100vh - 180px);
    overflow-y: auto;
    .user-dlg {
      display: flex;
      width: 100%;
      &-photo {
        width: 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-right: 20px;
        .el-avatar {
          background-color: $clr-primary;
          font-size: 150px;
        }
      }
      &-form {
        width: calc(100% - 170px);
        .el-form {
          &-item {
            margin: 0;
          }
        }
      }
    }
    .dlg-footer {
      display: flex;
      justify-content: center;
    }
    .user-create {
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      margin-bottom: 20px;
    }
    .users-container {
      .user {
        display: flex;
        width: 100%;
        height: 150px;
        .user-photo {
          width: 150px;
          margin-right: 10px;
          .el-avatar {
            background-color: $clr-primary;
            font-size: 150px;
          }
        }
        .user-info {
          h3, p {
            margin: 4px 0;
          }
        }
      }
    }
  }
}
</style>