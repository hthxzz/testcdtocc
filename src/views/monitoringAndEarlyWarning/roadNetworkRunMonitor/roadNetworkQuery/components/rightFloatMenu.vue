<template>
    <div class="right-float-menu-container">
        <div class="right-float-menu-wrap">
            <div class="menu-item" v-for="item in menuList" :key="item.uid" :data-uid="item.uid" @click="activeRightMenu($event)"  >
                <div class="img-wrapper">
                    <div class="img-wrap">
                        <img :src="item.pic" alt="" >
                    </div>
                </div>
                
                <div class="title">{{ item.title }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { getUniqueID, activeBackgroundColorMixins } from "@/untils/dom.js";
    export default {
        name: '',
        mixins: [activeBackgroundColorMixins],
        methods: {
          activeRightMenu($event){
              this.activeBackgroundColor($event, "active");
              this.$emit("activeSidebarMenu",{
                  show : this.show
              });
            //   setTimeout(() => {
            //       this.show = !this.show;
            //   }, 100);
              
          },
          
        },
        data() {
            return {
                isActive : false,
                show:true,
                activeEleUid : '',
                menuList : [{
                    uid:getUniqueID('right-float'),
                    pic : require('../img/lw_jcss.png'),
                    title : '基础设施'
                },
                {
                    uid:getUniqueID('right-float'),
                    pic : require('../img/lw_fsss.png'),
                    title : '附属设施'
                },{
                    uid:getUniqueID('right-float'),
                    pic : require('../img/lw_fssb.png'),
                    title : '附属设备'
                }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .right-float-menu-container{
        // width: 100%;
        // height: 100%;
        position: relative;
        .right-float-menu-wrap{
            position: absolute;
            display: flex;
            flex-direction: column;
            background:rgba(9,28,74,1);
            border:1px solid rgba(8,29,72,1);
            opacity:0.9;
            width: 80px;
            max-height: 450px;
            overflow-y: auto;
            .menu-item{
                transition: all 0.6s;
                cursor: pointer;
                .img-wrapper{
                    width:60px;
                    height:60px;
                    background:rgba(32,86,221,.2);
                    // opacity:0.2;
                    border-radius:50%;
                    margin: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .img-wrap{
                        width:48px;
                        height:48px;
                        background:rgba(32,86,221,1);
                        border-radius:50%;
                        margin: 0 auto;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            width: 34px;
                            height: 34px;
                        }
                    }
                }
                
            }

        }
    }
.title{
    font-size:14px;
    font-weight:400;
    color:#fff;
    // line-height:31px;
}
.active{
    background-color: #fff;
    .title{
        color: rgba(0, 0, 0, 1);
    }
}
</style>