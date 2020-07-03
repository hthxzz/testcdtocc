<template>
    <div class="jtwf-wrapper nomap-content-container">
        <h2>客运线路</h2>
        <p>2017-1-1成都发生重大道路行车事故（2017-1-1 12:30:30）</p>
        <div class="SearchContent-wrapper">
            <div class="item-wrapper" v-for="item in itemList" :key="item.name" >
                        <div class="table-wrapper">
                            <table border="1" >
                                <tr>
                                    <!-- <th>事故地点:</th> -->
                                    <th style="color: #ea1c2f;" colspan="6"><div>{{ item.sgdd }}</div></th>
                                </tr>
                                <tr>
                                    <th class="yello-lable">车牌号:</th>
                                    <td class="yello-lable"> <div>{{ item.cph }}</div> </td>
                                    <th>起点:</th>
                                    <td><div>{{ item.qd }}</div></td>
                                    <th>终点:</th>
                                    <td><div>{{ item.zd }}</div></td>
                                </tr>
                                <tr>
                                    <th>批准文号:</th>
                                    <td colspan="5"><div>{{ item.pzwh }}</div> </td>
                                </tr>
                                <tr>
                                    <th>批准日期:</th>
                                    <td><div>{{ item.pzrq }}</div> </td>
                                    <th>有效期:</th>
                                    <td><div>{{ item.yyzh }}</div></td>
                                </tr>
                                <tr>
                                    <th>途中路线:</th>
                                    <td colspan="5"><div>{{ item.tzlx }}</div> </td>                             
                                </tr>
                                <tr>
                                    <th class="yello-lable">经营企业:</th>
                                    <td class="yello-lable" colspan="5"><div>{{ item.jyqy }}</div></td>
                                </tr>
                            </table>
                        </div>
                    </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                itemList:[
                    {
                        sgdd:'成都-安岳',
                        cph:'川AB8787',                               
                        qd:'城北中心/客运总站',
                        zd:'信智客运站',
                        pzwh:"川交运管客许字2016H0048",
                        pzrq:"2016/3/25",
                        yxq: '2016/3/25~2021/3/31',
                        tzxl:"G76(成都-狮子桥立交)、G4201(狮子桥立交-G4201成安渝高速互通)、G5013(G4201成安渝高速互通-安岳)",
                        jyqy:"四川东方龙运业有限公司"
                    },
                    {
                        sgdd:'成都-安岳',
                        cph:'川AB8787',                               
                        qd:'城北中心/客运总站',
                        zd:'信智客运站',
                        pzwh:"川交运管客许字2016H0048",
                        pzrq:"2016/3/25",
                        yxq: '2016/3/25~2021/3/31',
                        tzxl:"G76(成都-狮子桥立交)、G4201(狮子桥立交-G4201成安渝高速互通)、G5013(G4201成安渝高速互通-安岳)",
                        jyqy:"四川东方龙运业有限公司"
                    },{
                        sgdd:'成都-安岳',
                        cph:'川AB8787',                               
                        qd:'城北中心/客运总站',
                        zd:'信智客运站',
                        pzwh:"川交运管客许字2016H0048",
                        pzrq:"2016/3/25",
                        yxq: '2016/3/25~2021/3/31',
                        tzxl:"G76(成都-狮子桥立交)、G4201(狮子桥立交-G4201成安渝高速互通)、G5013(G4201成安渝高速互通-安岳)",
                        jyqy:"四川东方龙运业有限公司"
                    }
                    ]
            }
        }
    }
</script>

<style lang="scss" scoped>

    .jtwf-wrapper{
        height: 100%;
        h2{
            background-color: rgba(30, 86, 221, 1);
            padding: 6px;
            width: 100px;
            border-radius: 10px;
            cursor: pointer;
            color: #FFFF00;
            text-align: center;
            margin-bottom: 10px;
        }
        p{
            margin: 10px 0;
            color: #ea1c2f;
        }
    }
    

    .SearchContent-wrapper{
        // height: 100%;
        width: 100%;
    }
    .item-wrapper{
                    &:not(:first-child){
                        margin-top: 40px;
                    }
                    position: relative;
                    background-color: rgb(16, 49, 122);
                    padding: 10px;
                    border-radius: 9px;
                    .table-wrapper{
                        table{
                            // width: 100%;
                            text-align: center;
                            tr{
                                th{
                                    width: 150px;
                                    font-size: 16px;
                                    font-weight: bold;
                                    // display: inline-block;
                                    text-align: right;
                                    padding-left: 6px;
                                    padding-right: 10px;
                                    padding-top: 10px;
                                    // padding-bottom: 16px;
                                }
                                td{
                                    // width: 160px;
                                    text-align: left;
                                    font-size: 14px;
                                    // display: inline-block;
                                }
                                .yello-lable{
                                    color: #FFFF00;
                                }
                            }
                        }
                    }
                }
    // .btn-wrapper{
    //     position: absolute;
    //     display: flex;
    //     bottom: -36px;
    //     .item{
    //         margin-left: 10px;
    //         background-color: rgba(30, 86, 221, 1);
    //         padding: 6px;
    //         border-radius: 10px;
    //         cursor: pointer;
    //         span{
    //             color: #FFFF00;
    //         }
    //     }
    // }
</style>