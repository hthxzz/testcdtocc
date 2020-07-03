<template>
  <div class="first-layout-wrap">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.first-layout-wrap {
  // margin-top: 10px;
  // height: calc(100% - 50px);
  height: 100%;
}
</style>