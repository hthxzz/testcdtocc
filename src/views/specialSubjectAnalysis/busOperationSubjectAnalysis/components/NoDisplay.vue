<template>
    <div class="no-display-wrapper">
        <p :style="{color: color}">{{percent}} <label>%</label></p>
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
            font-weight: bold;
            background-color: rgba(32,86,221, 0.8);
            height: 60px;
            border-radius: 5px 5px 0 0;
            letter-spacing: 3px;
            position: relative;
            //@include center;
            flex-direction: row;
            display: flex;
            /*flex-direction: column;*/
            justify-content: center;
            align-items: center;
            label{
                font-size: 18px;
                font-weight: bold;
                margin-top: 10px;
            }
            sub{
                position: absolute;
                font-size: 18px;
                font-weight: bold;
                left: 62%;
                top: 50%;
            }
        }
        h2{
            font-size: 14px;
            background-color: #162136;
            height: 50px;
            line-height: 45px;
            border-radius: 0 0 5px 5px ;
             @include center;
        }
    }
</style>