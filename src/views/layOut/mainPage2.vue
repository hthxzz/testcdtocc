
<template>
  <div id="app">
    <header id="nav">
      <div class="bj"></div>
      <div class="time">
        <h2>{{time}}</h2>
      </div>
      <div
        class="menu left"
        @click="selectSubSys"
        @mouseover="debounceShowMenu"
        @mouseleave="hideMenu"
      >
        <router-link to="/index">
          <div class="index left-actived" ref="index" @click="activeIndex">共享单车</div>
        </router-link>

        <div class="jcyj" ref="jcyj">地面公交</div>
        <div class="ztjc" ref="ztjc">重点车俩</div>
      </div>
      <div class="logo">
        <img src="../../assets/logo.png" alt srcset />
        <h2>{{ currentActiveMenuTitle }}</h2>
      </div>
      <div
        class="menu right"
        @click="selectSubSys"
        @mouseover="debounceShowMenu"
        @mouseleave="hideMenu"
      >
        <div class="yjxt" ref="yjxt" @click="railTrafficIndustryOviews">轨道交通</div>
        <div class="xxfb" ref="xxfb">道路运输</div>
        <div class="fzjc" ref="fzjc"></div>
      </div>
      <div class="user">
        <div class="icon">
          <img src="../../assets/user.png" alt />
        </div>
        <h2>你好Administrater</h2>
        <div class="logout"></div>
      </div>
    </header>
    <div class="content">
      <transition name="slide-fade">
        <router-view />
      </transition>
    </div>
    <sub-menu :show="show" :sysName="sysName" :pelementWidth="elementWidth" :position="position"></sub-menu>
  </div>
</template>
<script>
import $ from "jquery";
import subMenu from "@/components/index/subMenu.vue";
import dayjs from "dayjs";
import _ from "lodash";
// import { mapMutations } from "vuex";
export default {
  name: "",
  components: {
    subMenu
  },
  watch: {
    $route(to) {
      this.$store.commit("app/setCurrentActiveMenuTitle", to.meta.title);
    }
  },
  data() {
    return {
      time: "",
      sysName: "",
      elementNav: "",
      elementHover: "",
      position: [0, 0],
      elementWidth: 0
    };
  },
  mounted() {
    this.$store.state.app.currentActiveMenuEle = this.$refs.index;
    this.$store.state.app.preActiveMenuEle = this.$refs.index;
    this.elementNav = document.querySelector("#nav").getBoundingClientRect();
    let height = document.querySelector("#nav").getBoundingClientRect().height;
    document.querySelector("#nav").style.minHeight = height + "px";
    let contentheight = document
      .querySelector(".content")
      .getBoundingClientRect().height;
    document.querySelector(".content").style.minHeight = contentheight + "px";

    this.activeTopMenu();
    this.setTime();
  },
  computed: {
    hasSmallApp: function() {
      return this.$store.state.app.hasSmallApp;
    },
    show: function() {
      return this.$store.state.app.menushow;
    },
    headShow: function() {
      return this.$store.state.app.headShow;
    },
    //当前激活菜单标题
    currentActiveMenuTitle: function() {
      return this.$store.state.app.currentActiveMenuTitle;
    }
  },
  created() {
    this.debounceShowMenu = _.debounce(this.showMenu, 100);
  },
  methods: {
    // 设置时间
    setTime() {
      setInterval(() => {
        this.time = dayjs().format("YYYY-MM-DD HH:mm:ss");
      }, 1000);
    },
    railTrafficIndustryOviews() {
      this.$router.push({
        name: "railTrafficIndustryOviews"
      });
    },
    // 激活最上面的菜单
    activeTopMenu() {
      let topMenuActive = sessionStorage.getItem("topMenuActive");
      if (topMenuActive) {
        let topMenuActiveEle = document.getElementsByClassName(topMenuActive);
        let preTopMenuActiveEle = document.getElementsByClassName("index");
        $(topMenuActiveEle).addClass("left-actived");
        $(preTopMenuActiveEle).removeClass("left-actived");
      }
    },
    showMenu(event) {
      let selectEleClass = event.srcElement.classList[0];
      if (
        this.contentOfLeftMenu(selectEleClass) ||
        this.contentOfRightMenu(selectEleClass)
      ) {
        let subMenuActive = sessionStorage.getItem("subMenuActive");
        if (subMenuActive) {
          let subMenuActiveEle = document.getElementById(subMenuActive);
          $(subMenuActiveEle).addClass("subMenuActive");
        }

        this.elementHover = event.srcElement.getBoundingClientRect();
        this.$store.state.app.currentActiveMenuEle = event.srcElement;
        this.$store.state.app.hoverMenuEle = selectEleClass;
        setTimeout(() => {
          let wrapper = document.querySelector(".wrapper");
          this.elementWidth = wrapper.getBoundingClientRect().width;
          this.$store.state.app.menushow = true;
        }, 100);
        this.position[0] = this.elementHover.x + this.elementHover.width / 2;
        this.position[1] = this.elementNav.height - 10;
      }
      let size = document.querySelector(".wrapper").getBoundingClientRect();
      this.$store.commit("app/setMenuWrapperSize", size);
    },
    hideMenu() {
      this.$store.commit("app/switchMenuShow", false);
    },
    contentOfLeftMenu(selectEleClass) {
      const leftmenu = ["jcyj", "ztjc"];
      return leftmenu.indexOf(selectEleClass) != -1 ? true : false;
    },
    contentOfRightMenu(selectEleClass) {
      const rightmenu = ["yjxt", "xxfb", "fzjc"];
      return rightmenu.indexOf(selectEleClass) != -1 ? true : false;
    },
    activeIndex() {
      let leftActiveEle = document.querySelector(".left-actived");
      let rightActiveEle = document.querySelector(".right-actived");
      leftActiveEle && leftActiveEle.classList.remove("left-actived");
      rightActiveEle && rightActiveEle.classList.remove("right-actived");

      this.$refs.index.classList.add("left-actived");
    },
    selectSubSys(event) {
      var refs = this.$refs,
        selectEleClass = event.srcElement.classList[0],
        //选中的元素是否是菜单
        lflag = this.contentOfLeftMenu(selectEleClass),
        rflag = this.contentOfRightMenu(selectEleClass) != -1;
      if (lflag) {
        this.leftmenu.forEach(function(item) {
          refs[item].classList.remove("left-actived");
        });
        event.srcElement.classList.add("left-actived");
        this.$router.push(selectEleClass);
      }
      if (rflag) {
        this.rightmenu.forEach(function(item) {
          refs[item].classList.remove("right-actived");
        });
        event.srcElement.classList.add("right-actived");
        this.$router.push(selectEleClass);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin center {
  justify-content: center;
  align-items: center;
}
.content {
  flex: 970;
  overflow: hidden;
}
#nav {
  display: flex;
  background: url("../../assets/head_bg.png") no-repeat;
  background-size: 100% 100%;
  text-align: center;
  flex: 110;
  .title {
    position: absolute;
    width: 100%;
    height: 1.04rem;
    text-align: center;
  }
  .time {
    flex: 241;
    @include center;
    display: flex;
    h2 {
      font-size: 0.14rem /* 14/100 */;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 30px;
    }
  }
  .menu {
    display: flex;
    width: 360px;
    flex: 400;
    @include center;
    > div,
    a > div {
      width: 1.11rem /* 111/100 */;
      height: 0.36rem /* 36/100 */;
      font-size: 0.18rem /* 18/100 */;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      line-height: 0.36rem;
      text-align: center;
      cursor: pointer;
    }
    > div:nth-child(1) {
      margin-left: 0.3rem /* 20/100 */;
    }
    > div:nth-child(2) {
      margin-left: 0.2rem /* 20/100 */;
    }
    > div:nth-child(3) {
      margin-left: 0.1rem /* 20/100 */;
    }
  }
  .left {
    flex: 425;
  }
  .left > div,
  a > div {
    background: url("../../assets/left_nav.png") no-repeat;
    background-size: 100% 100%;
  }
  .right {
    flex: 425;
  }
  .right > div {
    background: url("../../assets/right_nav.png") no-repeat;
    background-size: 100% 100%;
  }
  .logo {
    flex: 616;
    background-size: 100% 100%;
    width: 100%;
    display: flex;
    position: relative;
    img {
      width: 100%;
      height: 87px;
    }
    h2 {
      position: absolute;
      font-size: 16px;
      bottom: 6px;
      width: 100%;
    }
  }
  .user {
    flex: 263;
    display: flex;
    align-items: center;
    .icon {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      img {
        width: 16px;
        height: 18px;
      }
    }
    h2 {
      flex: 3;
      width: 127px;
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    .logout {
      flex: 1;
    }
  }
}
</style>

<style>
#app {
  color: #ffffff;
  display: flex;
  font-size: 16px;
  height: 100vh;
  background: url("../../assets/all_bg.png") no-repeat;
  background-size: 100% 100%;
  flex-direction: column;
}
.left-actived {
  background: url("../../assets/left_nav_h.png") no-repeat !important;
  background-size: 100% 100% !important;
}
.right-actived {
  background: url("../../assets/right_nav_h.png") no-repeat !important;
  background-size: 100% 100% !important;
}
</style>
