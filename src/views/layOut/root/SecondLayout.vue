<template>
    <div class="second-layout-wrap">
        <transition name="slide-fade">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .second-layout-wrap{
        // margin-top: 10px;
        height: 100%;
    }
</style>