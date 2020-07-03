<template>
    <div class="emergency-coordination-container">
        <div class="emergency-coordination-left-float-menu">
            <LeftMenu></LeftMenu>
        </div>
        <div class="emergency-coordination-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import LeftMenu from "@/components/common/LeftMenu.vue";
    export default {
        name: '',
        components: {
          LeftMenu  
        },
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .emergency-coordination-container{
        display: flex;
        height: 100%;
        width: 100%;
        .emergency-coordination-left-float-menu{
            flex: 59;
            min-width: 59px;
            z-index: 666;
            position: relative;
        }
        .emergency-coordination-content{
            flex: 1861;
            position: relative;
        }
    }
</style>