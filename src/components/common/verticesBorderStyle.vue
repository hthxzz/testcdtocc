<template>
  <!-- 边款的4个顶点样式,用css实现，需要上一级元素自动或者相对定位 -->
  <div class="verticesBorderStyle">
    <span class="left-top-border-row"></span>
    <span class="left-top-border-col"></span>
    <span class="left-bot-border-row"></span>
    <span class="left-bot-border-col"></span>
    <span class="right-top-border-row"></span>
    <span class="right-bot-border-row"></span>
    <span class="right-top-border-col"></span>
    <span class="right-bot-border-col"></span>
  </div>
</template>

<script>
export default {
  name: "",
  // functional:true,
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@mixin row {
  width: 16px;
  height: 2px;
}
@mixin col {
  width: 2px;
  height: 16px;
}
span {
  position: absolute;
  z-index: 6;
  background-color: rgba(32, 86, 221, 1);
}
.left-top-border-row {
  @include row;
  left: -1px;
  top: -1px;
}
.left-top-border-col {
  @include col;
  left: -1px;
  top: -1px;
}
.left-bot-border-row {
  @include row;
  left: -1px;
  bottom: -1px;
}
.left-bot-border-col {
  @include col;
  left: -1px;
  bottom: -1px;
}
.right-top-border-row {
  @include row;
  right: -1px;
  top: -1px;
}
.right-top-border-col {
  @include col;
  right: -1px;
  top: -1px;
}
.right-bot-border-col {
  @include col;
  right: -1px;
  bottom: -1px;
}
.right-bot-border-row {
  @include row;
  right: -1px;
  bottom: -1px;
}
</style>