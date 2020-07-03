<template>
    <div class="bridge-container">
        <div class="bridge-wrap">
            <div class="search">
                <el-input v-model="input" placeholder="请输入内容" suffix-icon="el-icon-search"></el-input>
            </div>
            <div class="bridge-list">
                <span class="item" v-for="item in menuList" :key="item.uid">
                    {{ item.name }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { getUniqueID } from "@/untils/dom.js";
    export default {
        name: '',
        props:{
            show : {
                default : false,
                type : Boolean
            }
        },
        data() {
            return {
                menuList : [... new Array(36).fill({
                    name : '汪水湾碾桥',
                })]
                // [{
                //     name : '新桥'
                // },
                // {
                //     name : '机耕桥',
                // },{
                //     name : '汪水湾碾桥',
                // }
                
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bridge-container{
        .bridge-wrap{
            width:566px;
            height:421px;
            background:rgba(9,28,74,1);
            box-shadow:0px 4px 5px 0px rgba(81, 116, 103, 0.35);
            opacity:0.9;
            .search{
                // width: 316px;
                // margin: 0 auto;
                padding: 21px;
            }
            .bridge-list{
                padding: 0 30px;
                text-align: left;
                overflow-y: hidden;
                height: 300px;
                // overflow-y: auto;
                &:hover{
                    overflow-y: auto;
                }
                &:hover > .item{
                    width: 156px;
                }
                .item{
                    display: inline-block;
                    width: 160px;
                    cursor: pointer;
                    font-size: 14px;
                    height: 26px;
                    text-align: center;
                    background:rgba(32,86,221,1);
                    border-radius:4px;
                    line-height: 26px;
                }
                .item:nth-child(3n - 1){
                    margin: 0 10px;
                }
                .item:nth-child(3n - 2){
                   margin-top: 10px;
                }
            }   
        }
    }
</style>