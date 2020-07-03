<template>
  <div class="ChangeEchar-wrapper" @click="getStatues" ref="ChangeEchar">
    <span
      v-for="item in itemList"
      :data-code="item.code"
      :class="{activeEle:item.active}"
      :key="item.value"
    >{{ item.value }}</span>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "ChangeTag",
  props: ["itemList"], // [{"code":111111,value:"test"]
  mounted() {
    this.setActiveEle();
    if (this.activeFirst) {
      this.$refs.ChangeEchar.children[0].classList.add("activeEle");
    }
  },
  data() {
    return { activeFirst: true };
  },
  methods: {
    setActiveEle() {
      for (const item of this.itemList) {
        if (item.active) {
          this.activeFirst = false;
        }
      }
    },
    getStatues(e) {
      let $ele = $(e.srcElement);
      let code = $ele.data("code");
      let value = $ele.text();

      $ele.siblings().removeClass("activeEle");
      $ele.addClass("activeEle");
      this.$emit("getStatues", { code: code, value: value });
    }
  }
};
</script>

<style lang="scss" scoped>
.ChangeEchar-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  span {
    display: inline-block;
    cursor: pointer;
    padding: 4px 10px;
    border-radius: 2px;
    font-size: 14px;
    margin-right: 1px;
    background-color: #10317a;
    border: 1px solid #10317a;
    color: rgba(255,255,255,.6);
  }
  span:hover{
    color:#fff;
  }
}
.activeEle {
  background-color: #2056dd !important;
  border: 1px solid #2056dd !important;
  color: #fff !important;
}
.notactiveEle {
  margin-left: 20px;
  background-color: #10317a;
  border: 1px solid #10317a;
  color: #fff;
}
</style>