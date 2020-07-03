<template>
  <div class="MonitorEvents-wrapper nomap-content-container">
    <!-- <h2>关注设置</h2> -->

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="关注车辆" name="first" lazy="true">
        <gzcl />
      </el-tab-pane>
      <el-tab-pane label="关注路线" name="second" lazy="true">
        <gzlx />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import gzcl from "./components/MonitorEvents/gzcl.vue";
import gzlx from "./components/MonitorEvents/gzlx.vue";
export default {
  name: "",
  components: {
    gzcl,
    gzlx
  },
  data() {
    return {
      activeName: "first"
    };
  }
};
</script>

<style lang="scss" scoped>
.MonitorEvents-wrapper {
  height: 100%;
}
</style>