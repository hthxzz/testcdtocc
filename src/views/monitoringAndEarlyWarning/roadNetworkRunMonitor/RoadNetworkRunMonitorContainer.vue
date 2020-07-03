<template>
    <div class="road-network-run-monitor-container">
        <div class="road-network-left-float-menu">
            <LeftMenu></LeftMenu>
        </div>
        <div class="road-network-content">
            <transition name='bounce'>
                <router-view />
            </transition>
            
        </div>
    </div>
</template>

<script>
import LeftMenu from "../../../components/common/LeftMenu.vue";
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
    .road-network-run-monitor-container{
        display: flex;
        height: 100%;
        width: 100%;
        .road-network-left-float-menu{
            flex: 60;
            min-width: 60px;
            z-index: 666;
            position: relative;
        }
        .road-network-content{
            flex: 1861;
            position: relative;
        }
    }

</style>



<style >
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>