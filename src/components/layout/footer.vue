<template>
  <div class="bgi-footer">
    <a class="privacy-policy" href="#">
      Privacy Policy
    </a>
    <div class="company-address">
      <p>Blue Guard Innovations</p>
      <p>520 Zang Street Suite 221</p>
      <p>Broomfield, CO 80021</p>
    </div>
    <a class="contact-us" href="#">
      Contact Us
    </a>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';
.bgi-footer {
  width: 100%;
  height: 60px;
  background-color: $clr-bg-secondary;
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  color: white;
  .privacy-policy, .contact-us {
    color: white;
    cursor: pointer;
  }
  .company-address {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>