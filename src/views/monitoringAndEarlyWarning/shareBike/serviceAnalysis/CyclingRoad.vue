<template>
  <div class="content-container">
    <!--骑行路段-->
    <Basemap />
  </div>
</template>

<script>
import Basemap from "../../../../components/common/map/baseMap";

export default {
  components: { Basemap },
  name: "",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.content-container {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>