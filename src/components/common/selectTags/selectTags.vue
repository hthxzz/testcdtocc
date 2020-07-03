<template>
  <div class="select-tags-container">
    <div class="tag-wrap" ref="tagWrap">
      <div
        class="item"
        v-for="item in content"
        @click="selectedEle($event)"
        :key="item.uid"
        :data-uid="item.uid"
        :data-code="item.code"
      >{{ item.tag }}</div>
    </div>
  </div>
</template>

<script>
let activedEle = "";
import $ from "jquery";
export default {
  name: "SelectTag",
  props: {
    content: {
      type: Array
    }
  },
  mounted () {
    let $el = $(this.$refs.tagWrap).children().first();
    $el.addClass("activedEle");
    // $el.removeClass("notactivedEle");
    
    
  },
  methods: {
    selectedEle(event) {
      let $el = $(event.currentTarget);
      if ($el.hasClass("activedEle")) {
        return;
      }else{
        $el.siblings().removeClass("activedEle");
        $el.addClass("activedEle");
        let content = $el.text();
        let code = $el.data("code");
        console.log(code);
        
        this.$emit("activeTag",{
          code:code,
          tag:content,
        });
      }
      //   let activedEleUID = activedEle.getAttribute("data-uid");
      //   let currentEleUID = event.srcElement.getAttribute("data-uid");
      //   if (activedEleUID === currentEleUID) {
      //     activedEle.classList.remove("activedEle");
      //     activedEle.classList.add("notactivedEle");
      //     activedEle = "";
      //   } else {
      //     event.srcElement.classList.add("activedEle");
      //     event.srcElement.classList.remove("notactivedEle");

      //     activedEle.classList.remove("activedEle");
      //     activedEle.classList.add("notactivedEle");
      //     activedEle = event.srcElement;
      //     let content = event.srcElement.innerText;
      //     this.$emit("getContent", content);
      //   }
      // } else {
      //   event.srcElement.classList.add("activedEle");
      //   event.srcElement.classList.remove("notactivedEle");
      //   activedEle = event.srcElement;
      // }

    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.select-tags-container {
  .tag-wrap {
    display: flex;
    .item {
      width: 32px;
      height: 20px;
      border-radius: 1px;
      flex: 1;
      margin-left: 1px;
      cursor: pointer;
      justify-content: center;
      align-self: center;
      font-size: 14px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      display: flex;
      align-items: center;
      padding: 6px;
      background: rgba(32, 86, 221, 0.4);
    }
  }
}
.activedEle {
  background: rgba(32, 86, 221, 1) !important;
}
.notactivedEle {
  background: rgba(32, 86, 221, 0.4);
}
</style>