<template>
  <div class="panel-item-container">
    <div class="panelTitle-wrap" v-if="showPanelTitle">
      <panelTitle
        :title="title"
        :isTip="isTip"
        :isShowDeatilBtn="isShowDeatilBtn"
        :displaySwitch="displaySwitch"
        :show="showTitleName"
        @moreInfo="moreInfo"
        @showPanel="showPanel"
      ></panelTitle>
    </div>
    <div class="PanelContent-wrap" ref="PanelContentwrap">
      <PanelContent>
        <slot></slot>
      </PanelContent>
    </div>
  </div>
</template>

<script>
import panelTitle from "../../components/common/panelTitle/panelTitle.vue";
import PanelContent from "./PanelContent.vue";
// import VerticesBorderStyle from "./verticesBorderStyle.vue";
export default {
  name: "PanelItem",
  components: {
    panelTitle,
    PanelContent
    // VerticesBorderStyle
  },
  computed: {
    showPanelTitle() {
      return this.title ? true : false;
    }
  },
  props: {
    // 是否显示详情按钮
    isShowDeatilBtn: {
      type: Boolean,
      default: false
    },
    // 是否显示关闭按钮
    isTip: {
      type: Boolean,
      default: false
    },
    displaySwitch: {
      type: Boolean,
      default: true
    },
    showTitleName: {
      default: true
    },
    title: {
      default: ""
    }
  },
  methods: {
    showPanel() {
      if (this.show) {
        this.$refs.PanelContentwrap.style.maxHeight = this.proheight;
        this.show = false;
        console.log("aaaaaaaaaaaaaaaaaaaa");
      } else {
        this.$refs.PanelContentwrap.style.maxHeight = this.height + "px";
        this.show = true;
      }
    },
    moreInfo() {
      this.$emit("moreInfo");
    }
  },
  mounted() {
    // this.height = this.$refs.PanelContentwrap.getBoundingClientRect().height;
    // this.$refs.PanelContentwrap.style.maxHeight = this.height +'px';
    // this.$nextTick(function(){
    //     this.$refs.PanelContentwrap.style.maxHeight = this.height +'px';
    // })
  },

  data() {
    return {
      proheight: 0,
      height: 0,
      show: true
    };
  }
};
</script>

<style lang="scss" scoped>
@mixin row {
  width: 16px;
  height: 1px;
  background-color: rgba(32, 86, 221, 1);
}
@mixin col {
  width: 1px;
  height: 16px;
  background-color: rgba(32, 86, 221, 1);
}
.left-panel{
  .panel-item-container {
  background: linear-gradient(90deg,#030919,rgba(8, 25, 64,.8));
  box-shadow: rgb(16, 49, 122) 0px 0px 18px inset;
  border: 1px solid #153a86;
  box-shadow: 0px 0px 50% #134492;
  }
}
.right-panel{
  .panel-item-container {
  background: linear-gradient(to right,rgba(8, 25, 64,.8),#030919);
  box-shadow: rgb(16, 49, 122) 0px 0px 18px inset;
  border: 1px solid #153a86;
  box-shadow: 0px 0px 50% #134492;
  }
}
.panel-item-container {
  // margin: 20px;
  padding-bottom:25px;
  padding-top:15px;
  margin-bottom:7px;
  width: 97%;
  // height: 100%;
  // border: 1px solid rgba(32, 86, 221, 0.4);
  // margin-bottom: 10px;
  box-sizing: border-box;
  // background:rgba(5,12,38,.4);
  position: relative;
  // background: linear-gradient(rgba(0, 8, 21, 0.6), rgba(0, 7, 21, 0.8));
  border-radius: 4px;
  .panelTitle-wrap {
    padding: 0 $panel-padding-left;
    height: 45px;
    // padding-top: 10px;
  }
  .PanelContent-wrap {
    padding-left: $panel-padding-left;
    overflow-y: hidden;
    transition: all 0.6s;
    height: calc(100% - 50px);
  }
  // span{
  //     position: absolute;
  //     background-color: #2056DD;
  // }
  // .left-top-border-row{
  //     @include row;
  //     left:0;
  //     top:-1px;
  // }
  // .left-top-border-col{
  //     @include col;
  //     left:0;
  //     top:-1px;
  // }
  // .left-bot-border-row{
  //     @include row;
  //     left:0;
  //     bottom: -1px;
  // }
  // .left-bot-border-col{
  //     @include col;
  //     left:0;
  //     bottom: 0;
  // }
  // .right-top-border-row{
  //     @include row;
  //     right: 0;
  //     top: -1px;
  // }
  // .right-top-border-col{
  //     @include col;
  //     right:0;
  //     top: 0;
  // }
  // .right-bot-border-col{
  //     @include col;
  //     right:0;
  //     bottom: 0;
  // }
  // .right-bot-border-row{
  //     @include row;
  //     right:0;
  //     bottom: 0;
  // }
}
</style>