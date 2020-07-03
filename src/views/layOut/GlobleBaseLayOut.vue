<template>
  <div class="globle-layout-container" :class="classObj">
    <aside class="globle-layout-menu">
      <LeftMenu :menu="menu"></LeftMenu>
    </aside>

    <div class="globle-layout-content">
      <nav class="tagsView-wrap" v-show="!isFullscreen">
        <div class="toggle-wrap">
          <hamburger
            id="hamburger-container"
            :is-active="sidebar.opened"
            class="hamburger-container"
            @toggleClick="toggleSideBar"
          />
        </div>
        <div class="tagview-wrap">
          <TagsView />
        </div>
      </nav>
      <transition name="slide-fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import LeftMenu from "@/components/common/LeftMenu.vue";
import Hamburger from "@/components/common/Hamburger";
import TagsView from "./TagsView/index.vue";
import { createLeftMenu } from "@/router/createMenu";
import { setOptionSize } from "@/untils/rem.js";
import $ from "jquery";
export default {
  name: "",
  created() {
    this.setLeftMenu();
  },
  computed: {
    ...mapState({
      //   sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader,
      isFullscreen(state) {
        return state.app.isFullscreen;
      },
      opened(state) {
        return state.app.sidebar.opened;
      }
    }),
    ...mapGetters(["sidebar", "avatar", "dev"]),
    menu() {
      return this.$store.state.app.leftMenu;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  watch: {
    opened(val) {
      var nomapContentContainer = document.querySelector(
        ".nomap-content-container"
      );
      if (nomapContentContainer && !val) {
        $(".nomap-content-container")
          .removeClass("nomap-content-container")
          .addClass("menuclose");
      } else {
        $(".menuclose")
          .removeClass("menuclose")
          .addClass("nomap-content-container");
      }
    }
  },
  components: {
    LeftMenu,
    TagsView,
    Hamburger
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var nomapContentContainer = document.querySelector(
        ".nomap-content-container"
      );
      var contentContainerWidth = document
        .querySelector(".content")
        .getBoundingClientRect().width;
      if (nomapContentContainer) {
        nomapContentContainer.style.width =
          contentContainerWidth - setOptionSize(210) + "px";
      }
    },
    setLeftMenu() {
      const routeArr = this.$route.path.split("/");
      this.$store.state.app.leftMenu = createLeftMenu(routeArr)[0].children;
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    }
  },
  data() {
    return {
      // menu : []
    };
  }
};
</script>


<style lang="scss" scoped>
.globle-layout-container {
  transition: all 0.6s;
  display: flex;
  height: 100%;
  width: 100%;
  // z-index: 6666;
  position: relative;
  .globle-layout-menu {
    transition: all 0.6s;
    height: 100%;
  }
}
.tagsView-wrap {
  // display: flex;
  position: absolute;
  z-index: 99999;
  width: 100%;
  height: 36px;
  transition: all 0.6s;
  // left: 210px;
  .toggle-wrap {
    // flex-basis: 36px;
    height: 34px;
    width: 36px;
    transition: all 0.6s;
    position: absolute;
  }
  .tagview-wrap {
    // flex: 1;
    position: relative;
    left: 36px;
  }
}
.openSidebar {
  .globle-layout-menu {
    transition: all 0.6s;
    // z-index: 6666;
    position: absolute;
    width: 210px;
    z-index: 999999;
  }
  .globle-layout-content {
    transition: all 0.6s;
    // flex: 1861;
    // width: calc(100% - 210px);
    width: 100%;
    // margin-left: 216px;
    position: relative;
    margin-bottom: 2px;
    margin-right: 2px;
    .tagsView-wrap {
      left: 210px;
    }
  }
}
.hideSidebar {
  .globle-layout-menu {
    transition: all 0.6s;
    z-index: 999999;
    position: absolute;
    width: 60px;
  }
  .globle-layout-content {
    // flex: 1861;
    transition: all 0.6s;
    // width: calc(100% - 60px);
    width: 100%;
    // margin-left: 66px;
    position: relative;
    .tagsView-wrap {
      left: 61px;
    }
  }
}
</style>
<style >
.menuclose {
  width: calc(100% - 80px) !important;
  height: calc(100% - 36px) !important;
  transition: all 0.6s;
  margin-top: 36px;
  padding-left: 70px;
  padding-right:10px;
}
</style>