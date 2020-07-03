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
  width: 12px;
  height: 2px;
}
@mixin col {
  width: 2px;
  height: 12px;
}
span {
  position: absolute;
  background-color: rgba(1, 254, 254, 1);
}
.left-top-border-row {
  @include row;
  left: -5px;
  top: -5px;
}
.left-top-border-col {
  @include col;
  left: -5px;
  top: -5px;
}
.left-bot-border-row {
  @include row;
  left: -5px;
  bottom: -5px;
}
.left-bot-border-col {
  @include col;
  left: -5px;
  bottom: -5px;
}
.right-top-border-row {
  @include row;
  right: -5px;
  top: -5px;
}
.right-top-border-col {
  @include col;
  right: -5px;
  top: -5px;
}
.right-bot-border-col {
  @include col;
  right: -5px;
  bottom: -5px;
}
.right-bot-border-row {
  @include row;
  right: -5px;
  bottom: -5px;
}
</style>