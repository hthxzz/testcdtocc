<template>
    <!-- 服务保障相关 -->
    <div class="ServiceGuarantee-wrapper">
        <section>
            <div class="content left">
                <ul>
                    <li class="item">
                        <span>{{thousandVehicleownership}}</span>
                        <span>标台/万人</span>
                    </li>
                    <li class="item">
                        万人公共交通车辆保有量
                    </li>
<!--                    <li class="item">-->
<!--                        较去年同期-->
<!--                    </li>-->
<!--                    <li class="item">-->
<!--                        <span>2.3%</span>-->
<!--                        <span>⬆</span>-->
<!--                    </li>-->
                </ul>
                <div class="bottom">
                    <h2 class="" >较去年同期</h2>
                    <p class="up" v-if="ownershipOversameRate>=0">{{ownershipOversameRate}}% <span>⬆</span> </p>
                    <p class="down" v-else>{{ownershipOversameRate}}% <span>⬇</span> </p>
                </div>
            </div>
            <div class="content right imgsrc">
<!--                <img :src=src1 alt="" srcset="">-->
            </div>

        </section>
        <section class="service">
            <span class="line"></span>
            <div class="item">
                <div class="first section">
                    <img class="imgStyle" :src=src2 alt="" srcset="">
                </div>
                <div class="second section">
                    <h2 style="color:#fff">绿色公共交通车辆比率 <span class="test">{{greenVehiclerate}}%</span></h2>
                    <div class="bar-wrapper">
<!--                        <img :src=src3 alt="" srcset="">-->
                        <span :style="{width: greenVehiclerate*0.95 + '%'}" ></span>
                    </div>
                </div>
                <div class="three section">
                    <h2>较去年同期</h2>
                    <p class="up" v-if="greenvehicleOversameRate>=0">{{greenvehicleOversameRate}}% <span>⬆</span> </p>
                    <p class="down" v-else>{{greenvehicleOversameRate}}% <span>⬇</span> </p>
                </div>
            </div>
            <div class="item">
                <div class="first section">
                    <img class="imgStyle" :src=src4 alt="" srcset="">
                </div>
                <div class="second section">
                    <h2 style="color:#fff">城乡客运线路公交化运营比<span class="test">{{urbanruralLineOperaterate}}%</span></h2>
                    <div class="bar-wrapper">
                        <span :style="{width: urbanruralLineOperaterate*0.95 + '%'}" ></span>
                    </div>
                </div>
                <div class="three section">
                    <h2>较去年同期</h2>
                    <p class="up" v-if="urbanruralLineOversameRate>=0">{{urbanruralLineOversameRate}}% <span>⬆</span> </p>
                    <p class="down" v-else>{{urbanruralLineOversameRate}}% <span>⬇</span> </p>
                </div>
            </div>
            <div class="item">
                <div class="first section">
                    <img class="imgStyle" :src=src5 alt="" srcset="">
                </div>
                <div class="second section">
                    <h2 style="color:#fff">公交优先通行交叉口比率<span class="test">{{buspriorityInterseciotnrate}}%</span></h2>
                    <div class="bar-wrapper">
                        <span :style="{width: buspriorityInterseciotnrate*0.95 + '%'}" ></span>
                    </div>
                </div>
                <div class="three section">
                    <h2>较去年同期</h2>
                    <p class="up" v-if="buspriorityOversameRate>=0">{{buspriorityOversameRate}}% <span>⬆</span> </p>
                    <p class="down" v-else>{{buspriorityOversameRate}}% <span>⬇</span> </p>
                </div>
            </div>
        </section>
        <section>
            <span class="line"></span>
        </section>
        <section>
            <div class="item">
                <v-chart :options="option"/>
                <h2>
                    公共交通平均拥挤度
                    <div>（早晚高峰时段）</div>
                </h2>
            </div>
            <div class="item">
                <v-chart :options="option1"/>
                <h2>
                    公共交通正点率
<!--                    <div>责任事故死亡率</div>-->
                </h2>
            </div>
        </section>
        <section>
            <span class="line"></span>
        </section>
        <section>
            <div class="item">
                <ul class="b1">
                    <li>公共汽电车</li>
                    <li>平均车龄</li>
                    <li>
                        <span>{{publicvehicleAvgage}}</span>
                        <span>年</span>
                    </li>
                </ul>
            </div>
            <div class="item">
                <ul class="b2">
                    <li>公交汽电车</li>
                    <li>车均场站面积</li>
                    <li>
                        <span>{{pubicvehicleAvgStationarea}}</span>
                        <span>㎡标台</span>
                    </li>
                </ul>
            </div>
            <div class="item">
                <ul class="b3">
                    <li>公交汽电车</li>
                    <li>港湾式停靠站</li>
                    <li>
                        <span>{{harborstyleSiterate}}</span>
                        <span>%</span>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    import createOption from "./options";

    export default {
        name: '',
        mixins: [createOption],
        props:{getdata:{
                type: Object,
            }},
        watch:{
            getdata() {
                this.publicvehicleAvgage = this.getdata.publicvehicleAvgage == null ? 0 : parseFloat(this.getdata.publicvehicleAvgage);
                this.urbanruralLineOperaterate = this.getdata.urbanruralLineOperaterate == null ? 0 : parseFloat(this.getdata.urbanruralLineOperaterate).toFixed(1);
                this.greenvehicleOversameRate = this.getdata.greenvehicleOversameRate == null ? 0 : parseFloat(this.getdata.greenvehicleOversameRate);
                this.trafficPunctuality = this.getdata.trafficPunctuality == null ? 0 : parseFloat(this.getdata.trafficPunctuality);
                this.buspriorityInterseciotnrate = this.getdata.buspriorityInterseciotnrate == null ? 0 : parseFloat(this.getdata.buspriorityInterseciotnrate).toFixed(1);
                this.pubicvehicleAvgStationarea = this.getdata.pubicvehicleAvgStationarea == null ? 0 : parseFloat(this.getdata.pubicvehicleAvgStationarea);
                this.urbanruralLineOversameRate = this.getdata.urbanruralLineOversameRate == null ? 0 : parseFloat(this.getdata.urbanruralLineOversameRate);
                this.greenVehiclerate = this.getdata.greenVehiclerate == null ? 0 : parseFloat(this.getdata.greenVehiclerate).toFixed(1);
                this.thousandVehicleownership = this.getdata.thousandVehicleownership == null ? 0 : parseFloat(this.getdata.thousandVehicleownership);
                this.peakAvgCongesiton = this.getdata.publicvehicleAvgage == null ? 0 : parseFloat(this.getdata.publicvehicleAvgage);
                this.ownershipOversameRate = this.getdata.ownershipOversameRate == null ? 0 : parseFloat(this.getdata.ownershipOversameRate);
                this.harborstyleSiterate = this.getdata.harborstyleSiterate == null ? 0 : parseFloat(this.getdata.harborstyleSiterate);
                this.buspriorityOversameRate = this.getdata.buspriorityOversameRate == null ? 0 : parseFloat(this.getdata.buspriorityOversameRate);
                this.option = this.createPieOption3(this.peakAvgCongesiton, '#FFF100');
                this.option1 = this.createPieOption3(this.trafficPunctuality, '#00FFFF');
            }

        },

        data() {
            return {
                publicvehicleAvgage:6.7,//公交汽电车平均年龄
                urbanruralLineOperaterate:54,//城乡客运线路公交化运营比
                greenvehicleOversameRate:-2.0,//绿色公共交通车辆比率较去年同期比
                trafficPunctuality:96,// 公共交通正点率
                buspriorityInterseciotnrate:63,// 公交优先通行交叉口比率
                pubicvehicleAvgStationarea:9.4,//公交汽电车车均场站面积
                urbanruralLineOversameRate:2.0,//城乡客运线路公交化运营比较去年同期比
                greenVehiclerate:78,//绿色公共交通车辆比率
                thousandVehicleownership:9873,// 万人公共交通车辆保有量
                peakAvgCongesiton:67,//公共交通平均拥挤度（早晚高峰时段）
                ownershipOversameRate:10,//万人公共交通车辆保有量较去年同期比
                harborstyleSiterate:78,//公交汽电车港湾式停靠站设
                buspriorityOversameRate:-5.3,//公交优先通行交叉口比率较去年同期比
                option: {},
                option1:{},
                src1: require('../img/fwbz_bg.png'),
                src2: require('../img/lsggjt.png'),
                src3: require('../img/jdt_bg.png'),
                src4: require('../img/cxky.png'),
                src5: require('../img/yxtx.png'),
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ServiceGuarantee-wrapper {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        position: absolute;
        section {
            /*flex: 1;*/
            display: flex;

            .line{
                width:100%;
                height:1px;
                background-color:rgba(32,86,221,1);
                opacity:0.2;
                margin:0 10px;
            }
            /*div {*/
            /*    flex: 1;*/
            /*    img {*/

            /*    }*/
            /*}*/
        }
        section:nth-child(1) {
            flex: 1;
            .left {
                ul {
                    li {
                      margin:10px 10px;
                    }
                    li:nth-child(1) {
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        border-radius: 3px;
                        margin-top: 10px;
                        color: #00FFFF;
                        background-color: rgba(32,86,221,.4);
                        span:nth-child(1) {
                            font-size: 24px;
                        }
                        span:nth-child(2) {
                            font-size: 14px;
                            margin-left: 20px;
                        }
                    }
                    li:nth-child(2) {
                        font-size: 14px;
                        font-weight: bold;
                        span:nth-child(1) {

                        }
                        span:nth-child(2) {

                        }
                    }
                    li:nth-child(3) {
                        opacity: 0.6;
                        span:nth-child(1) {

                        }
                        span:nth-child(2) {

                        }
                    }
                    li:nth-child(4) {
                        color: #FF0000;
                        span:nth-child(1) {

                        }
                        span:nth-child(2) {

                        }
                    }
                }
                /*div {*/
                /*    flex: 1;*/
                /*    img {*/

                /*    }*/
                /*}*/
                .bottom{
                    margin-left: 10px;
                    h2{
                        font-size: 14px;
                        font-weight: bold;
                        color: rgba(255, 255, 255, 0.4);
                    }
                    p{
                        margin-top: 10px;
                        font-size: 14px;
                    }
                    .up{
                        color: #FF0000;
                    }
                    .down{
                        color:#00ff00;
                    }
                }
            }
            .right{
                position: absolute;
                top:10px;
                left:200px;
            }
            .imgsrc{
                width:200px;
                height:150px;
                background: url("../img/fwbz_bg.png") no-repeat;
                background-size: 100%;
            }


        }
        section:nth-child(2) {
            margin-top: 10px;
            flex: 2;
        }
        section:nth-child(3) {
            margin-top: 10px;
        }
        section:nth-child(4) {

            flex: 1.5;

            /*display: flex;*/
            .item {
                /*flex: 1;*/
                position: relative;
                width: 220px;
                height: 185px;
                h2{
                    position: absolute;
                    top: 155px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 96%;
                    font-size: 14px;
                    text-align: center;
                    div{
                        color:#FFF100;
                        margin-top: 6px;
                    }
                }
            }
        }
        section:nth-child(5) {
            margin-top: 10px;
        }
        section:nth-child(6) {
            margin-top: 10px;
            flex: 1.5;
            .item {
                background: url("../img/data_bg.png") no-repeat;
                background-size: 100%;
                background-position:  center bottom;
                width:140px ;
                height:140px;
                .b1 {
                    border-top: 2px solid #2056DD;
                }

                .b2 {
                    border-top: 2px solid #00FFFF;
                }

                .b3 {
                    border-top: 2px solid #FFF100;
                }
                ul {
                    /*height:100%;*/

                    background-color: rgba(32, 86, 221, 0.1);
                    margin: 10px;
                    li:nth-child(1) {
                        padding: 10px;

                    }
                    li:nth-child(2) {
                        padding-left: 10px;

                    }
                    li:nth-child(3) {
                        padding-top: 25px;
                        padding-left: 10px;
                        padding-bottom: 20px;
                    }
                    li {
                        /*height: 30px;*/
                        // padding: 20px;
                        font-size: 14px;
                        font-weight: bold;
                        span {
                            color: aqua;
                            &:first-child {
                                font-size: 36px;
                            }
                            &:last-child {
                                margin-left: 10px;
                            }
                        }
                    }
                }
            }
        }

    }



    .service {
        display: flex;
        flex-direction: column;
        .item {
            flex: 1;
            display: flex;
            .first {
                flex: 60;
                background: url("../img/gj_fwbz_png_bg.png") center no-repeat;
                background-size: 100%;
                .imgStyle{
                width: 46px;
                margin: 0 auto;
                }
            }
            .second {
                flex: 216;
                color: #fff;
                align-items: flex-start;
                margin-left: 10px;
              .bar-wrapper{
                  height: 37px;
                  width: 237px;
                  padding-left: 10px;
                  line-height: 40px;
                  position: relative;
                  background: url("../img/jdt_bg.png") no-repeat;
                  background-size: 100%;
                  text-align: left;
                  /*background-position: -8px 10px;*/
                  span{

                      max-width: 95%;
                      display: inline-block;
                      background-color: #2056DD;
                      border-radius: 6px;
                      height: 14px;
                      /*position: absolute;*/
                      /*left: 5px;*/
                      /* right: 0px; */
                      /*  top: 21px;*/
                    }
                }

            }
            .three {
                flex: 128;
                background: url('../img/bfs_bg.png') center no-repeat;
                background-size: 100%;
                //   background-size: 50%
                p.up{
                    color: #FF0000;
                }
                p.down{
                    color:#00ff00;
                }
            }
            /*.section {*/

            /*    display: flex;*/
            /*    justify-content: center;*/
            /*    align-items: center;*/
            /*    img {*/
            /*        width: 45px;*/
            /*        height: 45px;*/
            /*    }*/
            /*}*/
            /*.section {*/

            /*    display: flex;*/
            /*    flex-direction: column;*/
            /*    justify-content: center;*/
            /*    align-items: center;*/
            /*    h2 {*/
            /*        text-align: left;*/
            /*    }*/
            /*    img {*/
            /*        width: 100%;*/
            /*    }*/
            /*}*/
            .section {
                display: flex;
                flex-direction: column;
                justify-content: center;
                /*align-items: center;*/
                text-align: center;

                h2 {
                    font-size: 14px;
                    font-weight:bold;
                    color: rgba(255, 255, 255, .4);
                }
                p {
                    /*color: #FF0000;*/
                    margin-top: 10px;
                }
            }
        }
    }

    .color {
        color: #fff;
    }

    .test {
        font-size: 20px;
        color: #00FFFF;
        margin-left: 5px;
    }
</style>