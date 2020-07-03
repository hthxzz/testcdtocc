<template>
  <div class="map-wrapper">
    <!-- <transition name="slide-fade"> -->
    <div id="map" ref="map"></div>
    <!-- </transition> -->
  </div>
</template>

<script>
// !Object.prototype.toString.call(html) == "[object HTMLDivElement]"
import mapConfig from "./baseConfig/mapconfig";
import axios from "axios";
// import { ol3Echarts } from "ol3Echarts";
export default {
  name: "clientMap",
  mounted() {
    window.mapConfig = mapConfig;
    // this.initOLMap();
    this.initMap();
    // this.getMapconfig();
    // this.getQxtOption();
  },

  methods: {
    getMapconfig() {
      axios
        .get("http://192.167.252.246:8088/irest/base/basemap/mapconfig", {
          responseType: "responseType/json"
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    initMap() {
      let tmap = new TMap(this.$refs.map);
      tmap.initBaseMap();
      window.tmap = tmap;
      tmap.centerAt(104.072165, 30.663431);
      tmap.setMapZoomLevel(11);
      // tmap.addLayer("luk");
      tmap.omap.on("click", params => {
        console.log(params);
        console.log(tmap.getMapZoomLevel());
      });
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.map-wrapper {
  width: 100%;
  height: 100%;
  z-index: 0;
  position: absolute;
  // margin-top: -5%;
  top: 0;
  bottom: 0;
  #map {
    height: 100%;
    width: 100%;
    background-color: rgba(5, 14, 38, 0.9);
  }
}
</style>
<style lang="css" scoped>
.aaaaaaa >>> .bbbbb {
  font-size: 14px;
}
</style>