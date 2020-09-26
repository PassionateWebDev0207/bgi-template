<template>
  <div class="vessel">
    <div class="vessel-info" :class="vesselListCollapse ? 'hide' : null">
      <template v-if="!dataLoading">
        <h2>{{ meta.name }}</h2>
        <p>{{ `Last Alarm: ${lastAlarm}` }}</p>
        <p>Sensors: Connected</p>
      </template>
    </div>
    <div class="vessel-img">
      <img v-if="!imageLoading" :src="image.src" alt="vessel" />
      <img v-else src="@/assets/images/boat.png" alt="vessel" />
    </div>
  </div>
</template>

<script>
import firebaseApp from '@/firebase/app'
import { mapState } from 'vuex'
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    vesselId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      imageUrl: '',
      imageLoading: true,
      image: new Image(),
      lastAlarm: '',
      meta: null,
      dataLoading: true
    }
  },
  computed: {
    ...mapState(['user', 'vesselListCollapse'])
  },
  created() {
    const userId = this.user.uid
    const userRef = firebaseApp.database().ref(`/vessels/${userId}/${this.vesselId}`)
    const storageRef = firebaseApp.storage().ref()
    this.dataLoading = true

    userRef.on('value', (res) => {
      const vessel = res.val()
      const alarmKeys = Object.keys(vessel.alarms)
      const lastKey = alarmKeys[alarmKeys.length - 1]
      this.meta = vessel.meta
      this.lastAlarm = alarmKeys.length > 0 ? vessel.alarms[lastKey].lastTriggered : 'None'
      this.dataLoading = false
      this.imageLoading = true
      storageRef.child(`userPhotos/${this.meta.imageUrl}`).getDownloadURL().then((url) => {
        this.image = new Image()
        this.image.onload = () => {
          this.imageLoading = false
        }
        this.image.onerror = () => {
          this.imageLoading = true
        }
        this.image.src = url
      })
    })
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.vessel {
  width: 100%;
  min-height: 90px;
  height: 90px;
  display: flex;
  background-color: rgba(#000, 0.2);
  padding: 5px 0;
  &-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: calc(100% - 100px);
    height: 100%;
    min-height: 80px;
    margin-right: 10px;
    padding-left: 20px;
    color: white;
    h2, p {
      margin: 0;
    }
    h2 {
      font-weight: 300;
      margin-bottom: 15px;
    }
    p {
      font-size: 12px;
    }
  }
  &-img {
    height: 100%;
    min-height: 80px;
    width: 90px;
    padding: 0 5px;
    > img {
      height: 100%;
      border: 2px solid rgba(white, 0.5);
    }
  }
}
</style>