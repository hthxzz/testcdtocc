<template>
    <div class="road-network-query-container" >
        <div class="full-map">
            <Basemap></Basemap>
        </div>
        <div class="right-menu">
            <rightFloatMenu @activeSidebarMenu="activeSidebarMenu"></rightFloatMenu>
        </div>
        <div class="right-line">
            <RoadLine></RoadLine>
        </div>
        <div class="right-search">
            <DropDownSearch></DropDownSearch>
        </div>
        <div class="bridge-search">
            <bridgeSearch></bridgeSearch>
        </div>
        <div class="sidebar-search">
            <sidebarMenu :sidebarMenuShow='sidebarMenuShow' :menuList="sidebar1" ></sidebarMenu>
        </div>
        <div class="sidebar2-search">
            <sidebarMenu :sidebarMenuShow='sidebarMenuShow'  :menuList="sidebar2"></sidebarMenu>
        </div>
    </div>
</template>

<script>
import { getUniqueID, activeBackgroundColorMixins } from "@/untils/dom.js";
import rightFloatMenu from "./components/rightFloatMenu.vue";
import RoadLine from "./components/RoadLine.vue";
import DropDownSearch from "./components/DropDownSearch.vue";
import bridgeSearch from "./components/bridgeSearch.vue";
import sidebarMenu from "./components/sidebarMenu.vue";
    export default {
        name: '',
        components: {
            rightFloatMenu,
            RoadLine,
            DropDownSearch,
            bridgeSearch,
            sidebarMenu
        },

        created () {
            console.log("query-created");
            
        },
        methods: {
            activeSidebarMenu(status){
                this.sidebarMenuShow = status.show;
            }
        },
        data() {
            return {
                sidebarMenuShow : false,
                sidebar1 : [{
                    uid:getUniqueID('side-bar'),
                    pic : require('./img/lw_lx.png'),
                    title : '路线'
                },
                {
                    uid:getUniqueID('side-bar'),
                    pic : require('./img/lw_ql.png'),
                    title : '桥梁'
                },{
                    uid:getUniqueID('side-bar'),
                    pic : require('./img/lw_sd.png'),
                    title : '隧道'
                }
                ],
                sidebar2 : [{
                    uid:getUniqueID('side-bar'),
                    pic : require('./img/lw_gsgx.png'),
                    title : '国省干线'
                },
                {
                    uid:getUniqueID('side-bar'),
                    pic : require('./img/lw_gsgl.png'),
                    title : '高速公路'
                },{
                    uid:getUniqueID('side-bar'),
                    pic : require('./img/lw_csdl.png'),
                    title : '城市道路'
                }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
    .road-network-query-container{
        height: 100%;
        width: 100%;
        position: relative;
        .full-map{
            height: 100%;
            width: 100%;
            position: absolute;
        }
        .right-menu{
            position: absolute;
            // right: 20px;
            top: 30px;
        }
        .right-line{
            position: absolute;
             right: 120px;
            top: 100px;
        }
        .right-search{
            position: absolute;
             left: 220px;
            top: 100px;
        }
        .bridge-search{
            position: absolute;
             left: 620px;
            top: 100px;
        }
        .sidebar-search{
            position: absolute;
             left: 220px;
            top: 300px;
        }
        .sidebar2-search{
            position: absolute;
             left: 360px;
            top: 300px;
        }
        
    }
</style>