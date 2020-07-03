<template>
    <div class="monitor-earlywarn-container">
        <div class="monitor-earlywarn-left-float-menu">
            <LeftMenu :menu=menu></LeftMenu>
        </div>
        <div class="monitor-earlywarn-content">
            <transition name="slide-fade">
                <router-view></router-view>
            </transition>
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
    .monitor-earlywarn-container{
        display: flex;
        height: 100%;
        width: 100%;
        .monitor-earlywarn-left-float-menu{
            flex: 59;
            // min-width: 59px;
            z-index: 666;
            position: relative;
            // margin-top: 10px;
        }
        .monitor-earlywarn-content{
            flex: 1861;
            position: relative;
        }
    }

</style>