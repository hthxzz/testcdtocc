<template>
  <div class="panel-container" ref="container">
    <div class="panel-wrap" ref="wrap">
      <slot ref="slot"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      app: 0,
      nav: 0
    };
  },
  beforeMount() {
    //    this.app = document.querySelector("#app").getBoundingClientRect().height;
    //    this.nav = document.querySelector("#nav").getBoundingClientRect().height;
  },
  mounted() {
    setTimeout(() => {
      this.setPanelSize();
    }, 100);
  },
  methods: {
    setPanelSize() {
      let containerElement = this.$refs.container;
      let containerElementStyle = containerElement.getBoundingClientRect();
      // containerElement.style.height = this.app - this.nav - 20 +"px";
      containerElement.style.width = containerElementStyle.width - 11 + "px";
      this.$refs.wrap.style.width = containerElementStyle.width + "px";
      this.$refs.wrap.style.maxWidth = containerElementStyle.width + "px";
      // containerElement.style.width = containerElementStyle.width +"px";
    }
  }
};
</script>


<style lang="scss" scoped>
.panel-container {
  width: 100%;
  height: 100%;
  // max-width: 410px;
  overflow: hidden;
  .panel-wrap {
    height: 100%;
    overflow-y: scroll;
  }
}
</style>