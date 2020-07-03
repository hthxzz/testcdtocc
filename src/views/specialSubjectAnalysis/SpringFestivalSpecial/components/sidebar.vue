<template>
    <div class="sidebar-wrapper" ref="sideBarjr" >
        <div class="all-wrapper" >
            <div class="content-wrapper" :class="{allActive : allActive}" @click="activeall" >
                <div class="circular-wrapper">
                    <div class="mid-circular"></div>
                    <div class="small-circular">全部</div>
                </div>
            </div>
            <div class="bar-wrapper">
                <div class="bar-content" :class="{activeBar : activeBar}" ></div>
            </div>
        </div>
        <div class="scrollBar-outside" ref="sidecontent" >
            <div class="scrollBar-inside">
                <div class="item-wrapper" v-for="item in itemList" :key="item.day" >
                    <div class="content-wrapper" :class="{contentActive : contentActive}" @click="activeContent" >
                        <h2>第</h2>
                        <div class="circular-wrapper">
                            <div class="big-circular"></div>
                            <div class="mid-circular"></div>
                            <div class="small-circular">{{item.day}}</div>
                        </div>
                        <h2>天</h2>
                    </div>
                    <div class="bar-wrapper">
                        <div class="bar-content" :class="{activeBar : activeBar}" ></div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: '',
        mounted () {
            activeContent();
        },

        methods: {
            activeContent(e){
                console.log(e);
                let list = e.currentTarget.classList;
                const listarry = Array.from(e.currentTarget.classList);
                if (listarry.includes("contentActive")) {
                    e.currentTarget.classList.remove("contentActive");
                }else{
                    e.currentTarget.classList.add("contentActive")
                }
          },
            // 激活 全部   
            activeall(e){
                console.log(e);
                let list = e.currentTarget.classList;
                const listarry = Array.from(e.currentTarget.classList);
                if (listarry.includes("allActive")) {
                    e.currentTarget.classList.remove("allActive");
                    this.activeSub(false);
                }else{
                    e.currentTarget.classList.add("allActive");
                    this.activeSub(true);
                }
          },
            // 激活累计天数   activeEle：true 激活元素  activeEle：false 取消激活元素 
            /** */
            activeSub(activeEle){
                let sidecontent = this.$refs.sidecontent;
                let contentList = sidecontent.querySelectorAll(".item-wrapper");
                contentList.forEach((element, index) => {
                    const listarry = Array.from(element.children[0].classList);
                    const list = element.children[0];
                    const listBar= Array.from(element.children[1].children[0].classList);
                    const bar = element.children[1].children[0];
                    // 激活从第一天到当前天数 的累计天数
                    if (index < this.activeDay) {
                        this.activeContentLJ(listarry, list, "contentActive", activeEle);
                        this.activeContentLJ(listBar, bar, "activeBar", activeEle);
                    }
                });

            },
            activeContentLJ(arr, ele, className, activeEle){
                if (arr.includes(className)) {
                    if (activeEle) {
                        
                    }else{
                        ele.classList.remove(className)
                    }
                }else{
                    if (activeEle) {
                        ele.classList.add(className);
                    }else{

                    }
                }
            }
        },
        data() {
            return {
                activeDay:3,
                allActive:false,
                activeBar:false,
                contentActive:false,
                itemList: [
                    {
                        day: 1
                    },
                    {
                        day: 2
                    },
                    {
                        day: 3
                    },
                    {
                        day: 4
                    },
                    {
                        day: 5
                    },
                    {
                        day: 6
                    },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    $activeColor: rgba(0,255,255,1);
    .sidebar-wrapper{
        width: 113px;
        height: 100%;
        text-align: center;
        color: #fff;
        background:linear-gradient(90deg,rgba(5,8,27,1),rgba(27,71,182,1) 51%,rgba(32, 86, 221, .4) 49%,rgba(32, 86, 221, .4));
        .scrollBar-outside{
            height: calc(100% - 71px);
            overflow: hidden;
        }
        .scrollBar-inside{
            height: 100%;
            transition: all 1.6s;
            overflow-y: auto;
            width: calc(100% + 10px);
        }
   }
   .item-wrapper{
        font-size:18px;
        font-family:PingFang SC;
        font-weight:bold;
        
        color:rgba(255,255,255,.4);
        // line-height:30px;
       .content-wrapper{
           position: relative;
           width: 100%;
           h2:first-child{
               margin-bottom: 2px;
           }
           h2:last-child{
               margin-top: 2px;
           }
           .circular-wrapper{
               position: relative;
                @include h-center;
               height: 60px;
               width: 100%;
               .big-circular{
                    position: absolute;
                }
                .mid-circular{
                        width:50px;
                        height:50px;
                        position: absolute;
                        text-align: center;
                        
                        background:rgba(32,86,221,.4);
                        border-radius:50%;
                }
                .small-circular{
                    @include allCenter;
                    position: absolute;
                    width:30px;
                    height:30px;
                    background:rgba(0,255,255,.4);
                    border-radius:50%;
                }
           }
           
        }
        // content激活
       .contentActive{
           position: relative;
           width: 100%;
           color:rgba(255,255,255,1);
           h2:first-child{
               margin-bottom: 2px;
           }
           h2:last-child{
               margin-top: 2px;
           }
           .circular-wrapper{
               position: relative;
                @include h-center;
               height: 60px;
               width: 100%;
               .big-circular{
                    position: absolute;
                }
                .mid-circular{
                    border:4px solid $activeColor;
                }
                .small-circular{
                    @include allCenter;
                    background:rgba(32,86,221,1);
                }
           }
           
        }
        .bar-wrapper{
            position: relative;
            width: 100%;
            margin: 2px 0;
            @include h-center;
            .bar-content{
                width:5px;
                height:50px;
                border: 1px solid activeColor;
                border-radius: 2px;
                background:rgba(32,86,221,.4);
            }
            .activeBar{
                background:rgba(0,255,255,1);
            }
        }
   }
   
   .all-wrapper{
        font-size:18px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,255,255,.4);
        // line-height:30px;
        height: 70px;
       .content-wrapper{
           position: relative;
           width: 100%;
           .circular-wrapper{
               position: relative;
                @include h-center;
               height: 60px;
               width: 100%;
               .big-circular{
                    position: absolute;
                }
                .mid-circular{
                        width:60px;
                        height:60px;
                        position: absolute;
                        text-align: center;
                        @include v-center;
                        background:rgba(32,86,221,.4);
                        border-radius:50%;
                }
                .small-circular{
                    @include allCenter;
                    position: absolute;
                    width:50px;
                    height:50px;
                    background:rgba(0,255,255,.4);
                    border-radius:50%;
                }
           }
           
        }
   
   .allActive{
        color:rgba(255,255,255,1);
        height: 70px;
           .circular-wrapper{
               position: relative;
                @include h-center;
               height: 60px;
               width: 100%;
               .big-circular{
                    position: absolute;
                }
                .mid-circular{
                        position: absolute;
                        text-align: center;
                        @include v-center;
                        // background:rgba(32,86,221,.4);
                        border: 4px solid $activeColor;
                        border-radius:50%;
                }
           }
           
   }
   }
</style>