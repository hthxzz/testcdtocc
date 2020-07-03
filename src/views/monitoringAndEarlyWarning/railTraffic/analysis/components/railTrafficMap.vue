<template>
  <div class="railTrafficMap-wrap">
    <Basemap />
  </div>
</template>

<script>
import { lineConfig } from "./lineConfig.js";
export default {
  name: "",
  mounted() {
    this.addLine();
  },
  methods: {
    addLine() {
      tmap.addLayer("GD_STATION").loadData();
      for (const item of lineConfig) {
        let geom = item.geom.split(";");
        for (const iterator of geom) {
          let point = iterator.split(",");

          // tmap.addPointOnLayer(
          //   "railStation",
          //   item.order + Math.random(),
          //   point[0],
          //   point[1],
          //   6,
          //   3,
          //   "#fff",
          //   "",
          //   "",
          //   "",
          //   undefined,
          //   "",
          //   {
          //     text: ""
          //   }
          // );
        }

        tmap.addLineOnLayer(
          item.order,
          item.order,
          item.geom,
          item.Linewidth,
          item.color,
          "",
          null,
          e => {
            let id = e.id_;
            switch (id) {
              case "2828":
                this.$emit("getLineInfo", "01");
                break;
              case "2832":
                this.$emit("getLineInfo", "02");
                break;
              case "2834":
                this.$emit("getLineInfo", "03");
                break;
              case "2836":
                this.$emit("getLineInfo", "04");
                break;
              case "2838":
                this.$emit("getLineInfo", "05");
                break;
              case "2842":
                this.$emit("getLineInfo", "10");
                break;
              case "2844":
                this.$emit("getLineInfo", "07");
                break;
              default:
                break;
            }
          }
        );
      }
      // tmap.getLayer("railStation").setZIndex(1);
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.railTrafficMap-wrap {
  height: 100%;
}
</style>