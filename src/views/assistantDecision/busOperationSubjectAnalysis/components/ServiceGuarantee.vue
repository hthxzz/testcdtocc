<template>
    <!-- 服务保障相关 -->
    <div class="ServiceGuarantee-wrapper">
        <section>
            <div class="content left">
                <ul>
                    <li class="item">
                        <span>9873</span>
                        <span>标台/万人</span>
                    </li>
                    <li class="item">
                        万人公共交通车辆保有量
                    </li>
                    <li class="item">
                        较去年同期
                    </li>
                    <li class="item">
                        <span>2.3%</span>
                        <span>⬆</span>
                    </li>
                </ul>
            </div>
            <div class="content">
                <img :src=src1 alt="" srcset="">
            </div>
        </section>
        <section class="service">
            
            <div class="item">
                <section class="first section">
                    <img :src=src2 alt="" srcset="">
                </section>
                <section class="second section">
                    <h2 style="color:#fff">绿色公共交通车辆比率 <span class="test" >78%</span> </h2>
                    <img :src=src3 alt="" srcset="">
                </section>
                <section class="three section">
                    <h2 >较去年同期</h2>
                    <p>2.0%⬆</p>
                </section>
            </div>
            <div class="item">
                <section class="first section">
                    <img :src=src4 alt="" srcset="">
                </section>
                <section class="second section">
                    <h2 style="color:#fff" >城乡客运线路公交化运营比<span class="test" >54%</span></h2>
                    <img :src=src3 alt="" srcset="">
                </section>
                <section class="three section">
                    <h2>较去年同期</h2>
                    <p>2.0%⬆</p>
                </section>
            </div>
            <div class="item">
                <section class="first section">
                    <img :src=src5 alt="" srcset="">
                </section>
                <section class="second section">
                    <h2 style="color:#fff">公交优先通行交叉口比率<span class="test" >63%</span></h2>
                    <img :src=src3 alt="" srcset="">
                </section>
                <section class="three section">
                    <h2>较去年同期</h2>
                    <p>2.0%⬆</p>
                </section>
            </div>
        </section>
        <section>
            <div class="item">
                <v-chart :options="option"/>
            </div>
            <div class="item">
                <v-chart :options="option"/>
            </div>
        </section>
        <section>
            <div class="item">
                <ul class="b1">
                    <li>公共汽电车</li>
                    <li>平均车龄</li>
                    <li>
                        <span>6.7</span>
                        <span>年</span>
                    </li>
                </ul>
            </div>
            <div class="item">
                <ul class="b2">
                    <li>公交汽电车</li>
                    <li>车均场站面积</li>
                    <li>
                        <span>9.4</span>
                        <span>㎡标台</span>
                    </li>
                </ul>
            </div>
            <div class="item">
                <ul class="b3">
                    <li>公交汽电车</li>
                    <li>港湾式停靠站</li>
                    <li>
                        <span>78</span>
                        <span>%</span>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    import { option1 } from "./options";
    export default {
        name: '',
        data() {
            return {
                option:option1,
                src1:require('../img/fwbz_bg.png'),
                src2:require('../img/lsggjt.png'),
                src3:require('../img/jdt_bg.png'),
                src4:require('../img/cxky.png'),
                src5:require('../img/yxtx.png'),
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ServiceGuarantee-wrapper{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        section{
            flex: 1;
            display: flex;
            .left{
                ul{
                    li{
                        margin-top: 20px;
                        margin-left: 20px;
                    }
                    li:nth-child(1){
                        color: #00FFFF;
                        
                        span:nth-child(1){
                            font-size: 24px;
                        }
                        span:nth-child(2){
                            font-size: 16px;
                            margin-left: 20px;
                        }
                    }
                    li:nth-child(2){
                        span:nth-child(1){
                            
                        }
                        span:nth-child(2){

                        }
                    }
                    li:nth-child(3){
                        opacity: 0.6;
                        span:nth-child(1){
                            
                        }
                        span:nth-child(2){

                        }
                    }
                    li:nth-child(4){
                        color: #FF0000;
                        span:nth-child(1){
                            
                        }
                        span:nth-child(2){

                        }
                    }
                }
            }
            div{
                flex: 1;
                img{

                }
            }
        }
        section:nth-child(1){
            flex: 1;
        }
        section:nth-child(2){
            flex: 2;
        }
        section:nth-child(3){
            flex: 2;

            display: flex;
            .item{
                flex: 1;
                width: 100%;
                height: 100%;
            }
        }
        section:nth-child(4){
            flex: 1;
            .item{
               
                ul{
                    
                    background-color:rgba(32,86,221,0.1);
                    margin: 10px;
                    li:nth-child(1){
                        padding: 10px;
                        
                    }
                    li:nth-child(2){
                        padding-left: 10px;
                        
                    }
                    li:nth-child(3){
                         padding-left: 10px;
                         padding-bottom: 20px;
                    }
                    li{
                        height: 30px;
                        // padding: 20px;
                        span{
                            color: aqua;
                            &:first-child{
                                font-size: 36px;
                            }
                            &:last-child{
                                margin-left: 10px;
                            }
                        }
                    }
                }
            }
        }

    }
    .b1{
                        border-top: 2px solid #2056DD;
                    }
    .b2{
                        border-top: 2px solid #00FFFF;
                    }
    .b3{
                        border-top: 2px solid #FFF100;
                    }

    .service{
        display: flex;
        flex-direction: column;
        .item{
            flex: 1;
            display: flex;
            .first{
                flex: 60;
            }
            .second{
                flex: 216;
                color: #fff;
            }
            .three{
                 flex: 128;
                  background-image: url('../img/bfs_bg.png')  ;
                  background-repeat: no-repeat;
                //   background-size: 50%
            }
            .section{
                
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: 45px;
                    height: 45px;
                }
            }
            .section{
                
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                h2{
                    text-align: center;
                }
                img{
                    width: 100%;
                }
            }
            .section{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
               
               
                h2{
                    font-size:14px;
                    font-weight:400;
                    color:rgba(255,255,255,.4);
                }
                p{
                    color: #FF0000;
                    margin-top: 10px;
                }
            }
        }
    }
    .color{
        color: #fff;
    }
    .test{
        font-size: 26px;
        color: #00FFFF;
        margin-left: 10px;
    }
</style>