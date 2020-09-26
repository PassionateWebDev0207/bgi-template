export default {
  setUser(state, user) {
    state.user = user
  },
  setMeta(state, meta) {
    state.meta = meta
  },
  setVessels(state, vessels) {
    state.vessels = vessels
  },
  setVesselListCollapse(state, status) {
    state.vesselListCollapse = status
  },
  setSelectedVessel(state, vessel) {
    state.selectedVessel = vessel
  }
}