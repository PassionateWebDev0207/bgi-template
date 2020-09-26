<template>
  <div class="tile">
    <div class="tile-content">
      <img v-if="getType === 'battery'" src="@/assets/images/battery.png" alt="battery" />
      <img v-else-if="getType === 'geofence'" src="@/assets/images/geo.png" alt="geofence" />
      <img v-else-if="getType === 'temperature'" src="@/assets/images/temp.png" alt="temperature" />
      <img v-else-if="getType === 'pump'" src="@/assets/images/pump.png" alt="pump" />
      <img v-else src="@/assets/images/bell.png" alt="alarm" />
      <div class="alarm-content">
        <p>{{ tile.name }}</p>
        <p v-if="tile.status !== undefined">{{ tile.status ? 'Configured' : 'Not Configured' }}</p>
        <p v-if="tile.parentName !== undefined">{{ tile.parentName }}</p>
        <p v-if="tile.voltage !== undefined">{{ `${tile.voltage} Vdc` }}</p>
        <p v-if="tile.current !== undefined">{{ `${Number(tile.current).toFixed(1)} Amps` }}</p>
      </div>
      <div class="last-alarm">
        {{ `Last Alarm: ${Object.keys(tile.alarms).length > 0 ? getLastAlarm : 'None'}` }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tile: {
      require: true,
    }
  },
  computed: {
    getLastAlarm() {
      const lastKey = Object.keys(this.tile.alarms)[Object.keys(this.tile.alarms).length - 1]
      const lastAlarm = this.tile.alarms[lastKey].lastTriggered
      return lastAlarm === undefined ? 'None' : lastAlarm
    },
    getType() {
      const tileName = this.tile.name.toLowerCase();
      if (tileName.includes('battery')) return 'battery'
      if (tileName.includes('temperature')) return 'temperature'
      if (tileName.includes('pump')) return 'pump'
      if (tileName.includes('battery')) return 'battery'
      if (tileName.includes('geofence')) return 'geofence'
      return 'alarm'
    }
  },
  mounted() {
    console.log(this.tile)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';

.tile {
  width: 100%;
  padding-top: 100%;
  background-color: $clr-bg-primary;
  position: relative;
  margin-bottom: 10px;
  &-content {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: 30px 10px 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    >img {
      height: 60px;
    }
    >div {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      >p {
        text-align: center;
      }
    }
  }
}
</style>