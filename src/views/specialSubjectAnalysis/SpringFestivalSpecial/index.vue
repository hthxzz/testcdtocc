<template>
    <!--  -->
    <div class="SpringFestivalSpecial-wrapper"  >
        <canvas id="canvas" width="3840" height="2160"></canvas>
        <LeftPanel></LeftPanel>
        <div class="sidebar-container" v-if="false" >
            <sidebar></sidebar>
        </div>
        <!-- <div class="map-container">
            <LBaseMap />
        </div> -->
        
    </div>
</template>

<script>
    import sidebar from "./components/sidebar.vue";
    import LeftPanel from "./components/externalTraffic/LeftPanel.vue";
    // import LBaseMap from "./components/map/LBaseMap.vue";
    // import './js/main.js'
    // import OLBaseMap from "./components/map/OLBaseMap.vue";
    export default {
        name: '',
        data() {
            return {
                
            }
        },
        components: {
            sidebar,
            LeftPanel,
            // LBaseMap,
            // OLBaseMap,
        },
        methods: {
            goto(){
                this.$router.push({
                    "name":"index"
                })
            }
        },
        beforeRouteEnter (to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例
            vm.$store.state.app.headShow = false;            
            vm.$store.state.app.hasSmallApp = false;            
        })
        },
        beforeRouteLeave (to, from , next) {
            console.log(to);
            this.$store.state.app.headShow = true;   
            this.$store.state.app.hasSmallApp = true;   
            next();
            // debugger;
            
        }
    }
</script>

<style lang="scss" scoped>
    .SpringFestivalSpecial-wrapper{
        width:3839px;
        height:1080px;
        // width: 100%;
        // height: 100%;
        // width: 100vw;
        // height: 100vh;
        position: relative;
        background:linear-gradient(90deg,rgba(5,8,26,1),rgba(9,26,75,1),rgba(5,8,26,1));
        .sidebar-container{
            position: absolute;
            left: 200px;
            top: 16px;
            height: 800px;
            // width: 100px;
        }
        .map-container{
            position: absolute;
            left: 360px;
            top: 16px;
            height: 600px;
            width: 700px;
        }
    }
    #canvas{
        position: absolute;
    }
</style>

<style  scoped>
@charset "utf-8";
/* CSS Document */
*{ padding:0px; margin:0px; transition:0.4s;}
.bg_box{ background:#05081A url(./img/cy_bg.png) no-repeat; width:3840px; height:1080px; overflow:hidden;}
.left_cont,.right_cont{ position:absolute; top:90px;width:1036px; height:978px;}
.left_cont{left:100px; background: url(./img/left_cont_bg.png) no-repeat;}
.right_cont{left:2704px; background: url(./img/right_cont_bg.png) no-repeat;}
.theme_list li{ display:block; float:left; width:253px; height:377px; background:url(./img/data_box_bg.png) center no-repeat; position:absolute;}
.theme_list li:hover{ background:url(./img/data_box_bg_h.png) center no-repeat;}
.theme_list li i{ display:block; width:40px; height:40px; float:left;margin-left:40px; margin-top:15px;}
.theme_name{ font-size: 30px; color:#fff; margin-left:10px; margin-top:15px; float:left;}
.theme_list li dt{ width:100%; text-align:left; display:block; clear:both; margin-bottom:5px;}
.theme_list li dt:first-child{ height:80px;}
.theme_list li dt.list{ margin-left:30px; margin-top:8px;}
.data{ font-size:24px;}
.yellow{ color:#FFFF00; font-size:30px;}
.blue_data{ color:#72F6FA;}
.normal{ font-size:14px; color:#fff;}
.hkky{ top:60px; left:40px;}
.hkky i{ background:url(./img/hkky_nav.png) center no-repeat;}
.tlky{ top:100px; right:50px;}
.tlky i{ background:url(./img/tlky_nav.png) center no-repeat;}
.glky{ top:550px; left:40px;}
.glky i{ background:url(./img/glky_nav.png) center no-repeat;}
.lwyx{ top:510px;right:50px;}
.lwyx i{ background:url(./img/lwyx_nav.png) center no-repeat;}
.gdjt{ top:100px; left:40px;}
.gdjt i{ background:url(./img/gdjt_nav.png) center no-repeat;}
.gjys{ top:60px; right:50px;}
.gjys i{ background:url(./img/gjys_nav.png) center no-repeat;}
.cz{ top:510px; left:40px;}
.cz i{ background:url(./img/cz_nav.png) center no-repeat;}
.gxdc{ top:550px;right:50px;}
.gxdc i{ background:url(./img/gxdc_nav.png) center no-repeat;}
.theme_list li.light{ left:340px; top:300px; background:none;}
.loader {
    width: 20em;
    height: 20em;
    font-size: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
	transform-style:preserve-3d;
	transform:perspective(1000px) rotateX(60deg) rotateZ(40deg);
}

.loader .face {
    position: absolute;
    border-radius: 50%;
    border-style: solid;
    animation: animate 3s linear infinite;
}

.loader .face:nth-child(1) {
    width: 100%;
    height: 100%;
    color:#FEFE00;
    border-color: currentColor transparent transparent currentColor;
    border-width: 0.2em 0.2em 0em 0em;
    --deg: -45deg;
    animation-direction: normal;
}

.loader .face:nth-child(2) {
    width: 70%;
    height: 70%;
    color:#00e2ff;
    border-color: currentColor currentColor transparent transparent;
    border-width: 0.2em 0em 0em 0.2em;
    --deg: -135deg;
    animation-direction: reverse;
}

.loader .face .circle {
    position: absolute;
    width: 50%;
    height: 0.1em;
    top: 50%;
    left: 50%;
    background-color: transparent;
    transform: rotate(var(--deg));
    transform-origin: left;
}

.loader .face .circle::before {
    position: absolute;
    top: -0.5em;
    right: -0.5em;
    content: '';
    width: 1em;
    height: 1em;
    background-color: currentColor;
    border-radius: 50%;
    box-shadow: 0 0 2em,
                0 0 4em,
                0 0 6em,
                0 0 8em,
                0 0 10em,
                0 0 0 0.5em rgba(0, 226, 255, 0.1);
}

@keyframes animate {
    to {
        transform: rotate(1turn);
    }
}
</style>