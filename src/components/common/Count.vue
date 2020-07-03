<template>
    <div class="nums">
        <slot name="prefix"></slot>
        <div class="num"  v-for="no in numberStr" v-bind:style="styleObject">
            {{no}}
        </div>
        <slot name="suffix"></slot>
    </div>
</template>

<script>
    export default {
        name: '',
        props:['figure','widthNum','fontNum'],
        data() {
            return {
                numberStr:[],
                styleObject: {
                    width:"60px",
                    fontSize:"72px"
                }
            }
        },
        mounted () {
            var strs=this.figure.split("");
            for (let i = 0; i < strs.length; i++) {

                if(strs[i]=="."){
                    this.numberStr[i-1]= this.numberStr[i-1]+".";
                }else{
                    this.numberStr.push(strs[i]);
                }
            }
            // this.numberStr=
            if(this.widthNum){
                this.styleObject.width=this.widthNum;
            }
            if(this.fontNum){
                this.styleObject.fontSize=this.fontNum;
            }

        },
    }
</script>

<style lang="scss" scoped>
    .nums{
        display: flex;
        margin-top: 13px;
        .num{
            /*width:60px;*/
            // height:74px;
            /*font-size:72px;*/
            font-family:MicrosoftYaHei;
            font-weight:400;
            color:rgba(255,255,0,1);
            // line-height:30px;
            text-shadow:0px 5px 0px rgba(0, 0, 0, 0.35);
            background:rgba(32,86,221,1);
            // box-shadow:0px 5px 5px 0px rgba(0, 0, 0, 0.35);
            border-radius:8px;
            background: url('../../assets/index/index/big_data_bg.png') no-repeat;
            background-size: 100% 100%;
        }
    }
</style>