<template>
  <div class="keyAreaDetail-wrapper">
    <div class="area-wrap">
      <el-input v-model="name"></el-input>
    </div>

    <el-button type="primary" @click="onSubmit">保存</el-button>
    <el-button type="primary" @click="onClose">取消</el-button>
  </div>
</template>

<script>
export default {
  name: "vehiclesSearchDetail",
  data() {
    return {
      name: ""
    };
  },
  methods: {
    onSubmit() {
      this.$emit("transferName", this.name);
      tmap.drawTool.features.clear();
      tmap.hidePopupWindow();
      this.name = "";
    },
    onClose() {
      tmap.drawTool.features.clear();
      tmap.hidePopupWindow();
      this.name = "";
    }
  }
};
</script>

<style scoped>
.area-wrap {
  margin-bottom: 10px;
}
</style>