<template>
<!-- 热门运输线路 -->
    <div class="rmysxl-wrapper">
        <v-chart :options="option"/>
        <!-- <clientMap></clientMap> -->
    </div>
</template>

<script>
    import { option5 } from "../options";
    export default {
        name: '',
        data() {
            return {
                option:option5
            }
        }
    }
</script>

<style lang="scss" scoped>
    .rmysxl-wrapper{
        width: 100%;
        height: 100%;

    }
</style>