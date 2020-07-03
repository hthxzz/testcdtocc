<template>
    <div class="no-display-wrapper">
        <p :style="{color: color}">{{  percent }} <sub>%</sub></p>
        <h2>{{ title }}</h2>
    </div>
</template>

<script>
    export default {
        name: 'NoDisplay',
        props: ["percent","title","color"],
        data() {
            return {
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    @mixin center{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .no-display-wrapper{
        display: flex;
        flex-direction: column;
        text-align: center;
        p{
            font-size: 36px;
            background-color: rgba(32,86,221, 0.8);
            height: 70px;
            letter-spacing: 3px;
            position: relative;
            @include center;
            sub{
                position: absolute;
                font-size: 14px;
                left: 60%;
                top: 50%;
            }
        }
        h2{
            font-size: 18px;
            background-color: #162136;
            height: 55px;
            line-height: 50px;
             @include center;
        }
    }
</style>