<template>
  <!-- 地图浮动菜单 -->
  <div class="map-float-menu-container">
    <div class="item" :key="item.id" v-for="item in mapItemList" @click="rederMap">
      <img :src="item.picSrc" alt>
      <h2>{{ item.name }}</h2>
      <verticesBorderStyle />
      
    </div>
    <!-- <VerticesBorderStyle /> -->
  </div>
</template>

<script>
// import VerticesBorderStyle from "./verticesBorderStyle.vue";
export default {
  name: "",
  components: {
    // VerticesBorderStyle
  },
  methods: {
    rederMap(){

    }
  },
  data() {
    return {
      mapItemList: [
        {
          id: "afa1sfs",
          name: "班线客运",
          picSrc: require('../../image/monitoringAndEarlyWarning/keyTransportVehicles/bxky.png')
        },
        {
          id: "afa2sfs",
          name: "旅游包车",
          picSrc: require('../../image/monitoringAndEarlyWarning/keyTransportVehicles/lybc.png')
        },
        {
          id: "afas3fs",
          name: "危险品车",
          picSrc: require('../../image/monitoringAndEarlyWarning/keyTransportVehicles/wxpc.png')
        },
        {
          id: "af4asfs",
          name: "重型货车",
          picSrc: require('../../image/monitoringAndEarlyWarning/keyTransportVehicles/zxhc.png')
        },
        {
          id: "afa5sfs",
          name: "图层清除",
          picSrc: require('../../image/monitoringAndEarlyWarning/keyTransportVehicles/bxky.png')
        }
      ]
    };
  }
};
</script>


<style lang="scss" scoped>
.map-float-menu-container {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  position: relative;
  .item {
    width: 82px;
    // height: 80px;
    margin-left: 10px;
    background: rgba(32, 86, 221, 0.2);
    text-align: center;
    border: $base-border;
    position: relative;
    cursor: pointer;
    &:hover{
      background: rgba(32, 86, 221,1);
      transition: all 0.2s;
    }
    img {
      width: 50px;
      height: 32px;
      margin-top: 10px;
    }
    h2 {
      // height: 14px;
      font-size: 14px;
      font-weight: 400;
      // margin: 10px 0;
      margin-bottom: 10px;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>