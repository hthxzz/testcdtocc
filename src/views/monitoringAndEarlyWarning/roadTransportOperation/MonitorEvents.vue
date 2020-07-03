<template>
  <div class="MonitorEvents-wrapper nomap-content-container">
    <!-- <h2>监测事件</h2> -->

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="脱班车辆" name="first" lazy="true">
        <tbcl></tbcl>
      </el-tab-pane>
      <el-tab-pane label="脱离线路车辆" name="second" lazy="true">
        <tlxlcl></tlxlcl>
      </el-tab-pane>
      <el-tab-pane label="运能异常班线" name="third" lazy="true">
        <ynycbx></ynycbx>
      </el-tab-pane>
      <el-tab-pane label="线路延班" name="fourth" lazy="true">
        <xlyb></xlyb>
      </el-tab-pane>
      <el-tab-pane label="区域客流异常" name="five" lazy="true">
        <qyklyc />
      </el-tab-pane>
      <el-tab-pane label="路网异常" name="six" lazy="true">
        <lwyc />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tableMixins from "@/components/common/tableAndPagination/tableMixins";
import tbcl from "./components/MonitorEvents/tbcl.vue";
import xlyb from "./components/MonitorEvents/xlyb.vue";
import tlxlcl from "./components/MonitorEvents/tlxlcl.vue";
import ynycbx from "./components/MonitorEvents/ynycbx.vue";
import qyklyc from "./components/MonitorEvents/qyklyc.vue";
import lwyc from "./components/MonitorEvents/lwyc.vue";
export default {
  name: "",
  components: {
    tbcl,
    xlyb,
    tlxlcl,
    ynycbx,
    qyklyc,
    lwyc
  },
  data() {
    return {
      activeName: "second"
    };
  }
};
</script>

<style lang="scss" scoped>
.MonitorEvents-wrapper {
  height: 100%;
}
</style>