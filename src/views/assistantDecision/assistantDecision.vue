<template>
    <div class="assistantDecision-container">
        辅助决策aaaaaaaaaaaaaa
        <!-- <Sidebar></Sidebar> -->
        path:<h2>{{ path }}</h2>
    </div>
</template>

<script>
import Sidebar from "../layOut/Sidebar/index";
    export default {
        name: '',
        components: {
            Sidebar
        },
        mounted () {
            // debugger;
           this.path =  this.$route.path;
        },
        data() {
            return {
               path:'' 
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>