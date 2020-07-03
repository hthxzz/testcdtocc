<template>
    <div class="test-video">


        <player></player>
    </div>
</template>

<script>
import  player  from "./player.vue";
    export default {
        name: 'testvideo',
        components: {
            player
        },
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .test-video{
        // width: 200px;
        // height: 100px;
    }
</style>