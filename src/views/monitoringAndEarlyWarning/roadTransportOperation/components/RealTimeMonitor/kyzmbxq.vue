<template>
  <!-- 客运站详情 -->
  <div class="kyzxq-wraper" v-if="isShowPanel">
    <panelTitle
      title="客运站"
      tip="客运站"
      :displaySwitch="false"
      :isShowDeatilBtn="false"
      :isShowCloseBtn="true"
      @close="close"
    />
  </div>
</template>

<script>
export default {
  name: "",
  methods: {
    close() {
      this.isShowPanel = false;
    }
  },
  data() {
    return { isShowPanel: true };
  }
};
</script>

<style lang="scss" scoped>
</style>