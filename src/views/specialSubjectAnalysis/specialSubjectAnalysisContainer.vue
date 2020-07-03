<template>
    <div class="subject-analysis-container">
        <div class="subject-analysis-left-float-menu">
            <LeftMenu :menu="menu" ></LeftMenu>
        </div>
        <div class="subject-analysis-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import LeftMenu from "@/components/common/LeftMenu.vue";
    export default {
        name: '',
        created () {
            let currentKeyMenu =  this.$route.meta.childMenu;
            let menuList = this.$store.state.app.menuList;
            this.menu =  menuList[currentKeyMenu];
        },
        components: {
          LeftMenu  
        },
        data() {
            return {
                menu : []
            }
        }
    }
</script>

<style lang="scss" scoped>
    .subject-analysis-container{
        display: flex;
        height: 100%;
        width: 100%;
        .subject-analysis-left-float-menu{
            flex: 59;
            // min-width: 59px;
            z-index: 666;
            position: relative;
        }
        .subject-analysis-content{
            flex: 1861;
            position: relative;
        }
    }
</style>