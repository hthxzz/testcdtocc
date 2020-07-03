<template>
  <div
    class="wrapper" :data-topic="hoc"
    v-bind:style="{top:position[1] + 'px',left:position[0] - elementWidth/2 < 10 ? '10px' : position[0] - elementWidth/2 +'px',visibility:visibility}"
    @mouseover="showMenu"
    @mouseleave="hideMenu"
  >
    <span class="tran" v-bind:style="{top:position[1] -10 + 'px',left:position[0] - 16 +'px'}"></span>
    <div class="item" :key="item.id" v-for="(item,index) in menuList" :id='"item" + index' @click="goto($event)">
      <router-link :to="item.path" replace>
        <img :src="item.meta.icon" alt />
       <!-- <img :src="avatar" alt />-->
        <h2>{{item.meta.title}}</h2>
      </router-link>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import {createLeftMenu} from "@/router/createMenu";
import {setItem,getItem} from "@/untils/storage";

export default {
  name: "",
  data() {
    return {
      elementWidth: this.pelementWidth,
      hoc:''
    };
  },
  created() {

    
  },
  props: {
    position: {
      type: Array
    },
    pelementWidth: {
      default: 0
    },
    show: {
      default: false,
      type: Boolean
    }
  },





  computed: {
    visibility: function() {
      return this.show ? "visible" : "hidden";
    },
    menuList() {
      let hoc = this.$store.state.app.hoverMenuEle;
      //
      // return this.$store.state.app.menuList[hoc];
      let a=JSON.parse(getItem("caidan"));
      var route=[];
      for(var i=0;i<a.length;i++){
        if(a[i].name==hoc){
          route=a[i].children!=undefined?a[i].children:[];
          route.forEach(e=>{
            e.path='/'+hoc+'/'+e.path;
            if(e.meta.icon!=""&&e.meta.icon!=null){
              e.meta.icon=require('@/assets/' +e.meta.icon);
            }else{
              e.meta.icon="";
            }

          })
          break;
        }
      }
      return route;
    },
    // elementWidth(){

    //     return this.$store.state.app.menuWrapperSize.width;
    // }
  },
  mounted() {
    if (this.$store.state.app.hoverMenuEle != "index") {
      let wrapper = document.querySelector(".wrapper");
      this.$store.state.app.menuWrapperSize.width = wrapper.getBoundingClientRect().width;
    }
  },
beforeRouteUpdate (to, from, next) {
  // just use `this`
  this.name = to.params.name
  next()
},
  beforeUpdate() {
    let wrapper = document.querySelector(".wrapper");

    this.elementWidth = wrapper.getBoundingClientRect().width;
  },
  updated() {
      let wrapper = document.querySelector(".wrapper");

    this.elementWidth = wrapper.getBoundingClientRect().width;
  },
  methods: {
    goto(event) {
      const routeArr = event.currentTarget.querySelector("a").getAttribute("href").split("/");
      this.$store.dispatch('tagsView/delAllViews');
      
      // this.$store.state.app.leftMenu = createLeftMenu(routeArr)[0].children.map((ele)=>{
      //   return ele.fullpath = routeArr[1] + "/"+ routeArr[2];
      // })
      let id = event.currentTarget.getAttribute("id");
      $(event.currentTarget).siblings().removeClass("subMenuActive");
      sessionStorage.setItem("subMenuActive",id);
      let hoc = this.$store.state.app.hoverMenuEle;
      const test = createLeftMenu(routeArr)[0].children;
      this.$store.dispatch('tagsView/addView', test[0]);

      sessionStorage.setItem("topMenuActive",hoc);
      this.$store.state.app.leftMenu = test;
      // 当前激活的菜单项默认为index
      let currentActiveMenuEle = this.$store.state.app.currentActiveMenuEle;
      $(".left1").removeClass("left-actived");
      $(".right1").removeClass("right-actived");
      if(currentActiveMenuEle._prevClass.indexOf('left1')>-1){
        $(currentActiveMenuEle).addClass("left-actived");
      }else{
        $(currentActiveMenuEle).addClass("right-actived");
      }
      // 上一个激活的菜单默认也是index
      // let preActiveMenuEle = this.$store.state.app.preActiveMenuEle;
      // this.$store.state.app.menushow = false;
      // let currentActiveClass = currentActiveMenuEle.classList[0];
      // let leftActiveEle = document.querySelector(".left-actived");
      // let rightActiveEle = document.querySelector(".right-actived");
      // leftActiveEle && leftActiveEle.classList.remove("left-actived");
      // rightActiveEle && rightActiveEle.classList.remove("right-actived");
      //
      // if (this.contentOfLeftMenu(currentActiveClass)) {
      //   this.$store.state.app.currentActiveMenuEle.classList.add(
      //     "left-actived"
      //   );
      // } else {
      //   this.$store.state.app.currentActiveMenuEle.classList.add(
      //     "right-actived"
      //   );
      // }
      this.$store.state.app.currentActiveMenuTitle = event.currentTarget.querySelector(
        "h2"
      ).innerHTML;
    },
    contentOfLeftMenu(selectEleClass) {
      const leftmenu = ["jcyj", "ztjc"];
      return leftmenu.indexOf(selectEleClass) != -1 ? true : false;
    },
    contentOfRightMenu(selectEleClass) {
      const rightmenu = ["yjxt", "xxfb", "fzjc"];
      return rightmenu.indexOf(selectEleClass) != -1 ? true : false;
    },
    showMenu() {
      this.$store.state.app.menushow = true;
      // this.elementHeight =document.querySelector('.wrapper').getBoundingClientRect().width;
    },
    hideMenu() {
      this.$store.state.app.menushow = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  // top: 90px;
  // width:1821px;
  // height:471px;
  // visibility:hidden;
  flex-wrap: wrap;
  z-index: 99999999;
  max-width: 1690px;
  display: flex;
  background-color: rgba(5, 12, 38, 1);
  border: 1px solid rgba(32, 86, 221, 1);
  opacity: 0.9;
  // background-image: url('../../assets/index/menu/nav_bg.png');
  background-size: 100% 100%;
  span {
    position: fixed;
    width: 0;
    height: 0;
    border-width: 0 10px 10px;
    border-style: solid;
    border-color: transparent transparent rgba(32, 86, 221, 1);
    left: 300px;
    // top: -11px;
  }
  .item {
    width: 110px;
    height: 110px;
    margin: 0.21rem;
    // border: 1px solid rgba(32, 86, 221, 1);
    text-align: center;
    // background: linear-gradient(
    //   0deg,
    //   rgba(32, 86, 221, 1),
    //   rgba(0, 150, 255, 1)
    // );
    // // opacity:0.2;
    background-color: rgba(32, 86, 221,.2);
    background:  url("../../assets/index/menu/list_bg.png") no-repeat;
    background-size: 100% 100%;
    &:hover {
      // background: url("../../assets/index/menu/list_bg_h.png") no-repeat;
      cursor: pointer;
      background-size: 100% 100%;
      transform: scale(1.1);
      background-color: #2056dd;
    }
    img {
      width: 40px;
      height: 40px;
      margin-top: 10px;
      // background: rgba(255, 255, 255, 1);
      // box-shadow: 0px 5px 10px 0px rgba(31, 166, 111, 0.35);
      border-radius: 50%;
    }
    h2 {
      font-size: 16px;
      margin-top: 6px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 30px;
      text-shadow: 0px 1px 3px rgba(31, 92, 36, 0.35);
    }
  }
}
</style>
