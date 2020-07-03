<!--右侧车辆分布查询 -->
<template>
    <div class="vehicles-distribution-container">
        <div class="vehicles-distribution-wrap">  
            <div class="vehicles-list">
                    <div class="search">
                        <div class="search-vehicle-type">
                        <div class="hbgk">
                            <div class="first part">
                                <div :class="isChangeBackgroud_Bule_bxky? 'item buleImage':'item greyImage'" @click="qk1">
                                        <img :src="picUrls_bxky">
                                        <p>班线客运</p>
                                </div>
                                <div :class="isChangeBackgroud_Bule_bcky? 'item buleImage':'item greyImage'"  @click="qk2">
                                        <img :src="picUrls_bcky"> 
                                        <p>包车客运</p>
                                </div>
                                <div :class="isChangeBackgroud_Bule_whys? 'item buleImage':'item greyImage'" @click="qk3">
                                        <img :src="picUrls_whys">
                                        <p>危货运输</p>
                                </div>
                                <div :class="isChangeBackgroud_Bule_gjys? 'item buleImage':'item greyImage'" ref="gj" @click="qk4">
                                        <img :src="picUrls_gjys">
                                        <p>公交运输</p>
                                </div>
                            </div>
                            <div class="second part">                             
                                <div :class="isChangeBackgroud_Bule_xycz? 'item buleImage':'item greyImage'" ref="xy" @click="qk5">
                                        <img :src="picUrls_xycz">
                                        <p>巡游出租</p>
                                </div>
                                <div :class="isChangeBackgroud_Bule_wyc? 'item buleImage':'item greyImage'" ref="wy" @click="qk6">
                                        <img :src="picUrls_wyc">
                                        <p>网约车</p>
                                </div>
                            <!--<div :class="isChangeBackgroud_Bule_jlc? 'item buleImage':'item greyImage'" ref="wy" @click="qk7">
                                        <img :src="picUrls_jlc">
                                        <p>教练车</p>
                                </div>-->
                            </div>
                        </div>
                    </div>    
                        <div class="search-condition">
                                <div class="query-left-lab">
                                    <el-input v-model="input_cph" placeholder="请输入车牌号"></el-input>
                                    <el-button type="primary" class="searchButton" @click="vehiclesQuery()">查询</el-button>  
                                </div>    
                                <div class="query-right-lab"> 
                                    <p @click="advancedQueryJump()">高级查询></p>
                                </div>
                            </div>
                        </div>                     
                        <div class="search-result">
                            <div class="result-num">
                                相关<span>{{queryResult_Enterprise}}</span>条记录
                            </div>
                            <div class="result-table" style="width:96%;">
                                <el-table
                                    :data="tableData_Enterprise"
                                    stripe
                                    style="overflow:auto;" > 
                                    <!-- ref="list"
                                      v-infinite-scroll="load" 
                                      infinite-scroll-disabled="disabled"
                                      infinite-scroll-distance="5"  -->
                                    <el-table-column
                                        prop="enterpriseName"
                                        label="经营企业" width="" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                        prop="vehicleNo"
                                        label="车牌号" width="66px;">
                                        <template slot-scope="scope">
                                            <span style="border: 1px solid rgba(255,255,255,.2);
                                                            border-radius: 4px;text-align: center;
                                                            display: block;width: 70px;color:#fff;">
                                                {{scope.row.vehicleNo}}
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="statusName"
                                        label="状态" align="center" width="90px;">
                                        <template slot-scope="scope">
                                            <span style="color: #00B050;font-weight:bold;" v-if="scope.row.statusName=='在线'">
                                                {{scope.row.statusName}}
                                            </span>
                                            <span v-else>
                                                {{scope.row.statusName}}
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" width="50px;">
                                        <template slot-scope="scope">
                                            <el-button size="mini" class="table-detail-btn" @click="handleEdit(scope.$index, scope.row)">定位</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                        

                                <el-pagination small  :pager-count="5" 
                                    background layout="prev, pager, next" 
                                    :total="queryResult_Enterprise" 
                                    @current-change="handleCurrentChange"
                                ></el-pagination>
                            </div>
                        </div> 
                </div>
        </div>
    </div>
</template>

<script>
import mapAnimation from '@/components/common/map/animation/mapAnimation'
    export default {
        name: 'EnterpriseVehiclesQuery',
        mixins:[mapAnimation],
        props:{
            show : {
                default : false,
                type : Boolean
            }
        },
        create(){},
        mounted(){
            // this.getAllVehicle();
            this.qk1();
            this.vehiclesQuery();
            // this.load();
        },computed: {
            noMore () {
                return this.tableData_Enterprise.length >= this.queryResult_Enterprise;
            },
            disabled () {
                return this.isLoading || this.noMore
            }
        },
        methods:{
            advancedQueryJump(){
                //console.log("dfdgdg");
                let cph = this.input_cph ;
                this.$router.push({path: '/monitoringAndEarlyWarn/keyTransportVehicles/dataSearch/vehiclesSearch', query: {"input_cph": cph}});
                                           
            },
            //获取数据
            load(curPage){
                
                //表示正在加载数据
                this.isLoading=true;
                setTimeout(() => {
                    // 
                    let cph = this.input_cph;
                    let enterpriseName = this.input_enterprise;
                    let vehicleTypeTemp = this.vehicleTypeTemp;
                    let vehicleType = vehicleTypeTemp.value!=""&&vehicleTypeTemp.value!=undefined?vehicleTypeTemp.value:'111';

                    // let pageNum = curPage!=""&&curPage!=undefined?curPage:1;
                    let pageNum = this.page ++;
                    let pageSize = this.pageSize!=null&&this.pageSize!=undefined?this.pageSize:10;

                    this.$http.$get("zdjc_vehiclegpsstatistic/getVehicleByCondition",
                    {"vehicleType":vehicleType,"enterpriseName":enterpriseName,"vehicleNo":cph,
                    "pageSize":pageSize,"pageNum":pageNum,"export":false}).then((param) => {

                        let tem = this.tableData_Enterprise;
                        this.tableData_Enterprise = this.tableData_Enterprise.concat(param.results);
                        let tem1 = this.tableData_Enterprise; 
                        this.queryResult_Enterprise = param.totalRecordNum;
                        //数据请求完成
                        this.isLoading = false;
                    });
                }, 2000);
            },
            // handleScroll(){
            //     console.log("dfsaf");
            //     const $list=this.$refs.list;
            //         //如果数据有在加载中则这次请求退出
            //     if(this.isLoading) return; 
            //     //已经滚动的距离加页面的高度等于整个内容区高度时,视为接触到底部 
            //     //scrollTop 获取到顶部的滚动距离
            //     // clientHeight 表示页面视口高度
            //     // scrollHeight 页面内容的高度 
            //     if($list.scrollTop+document.body.clientHeight>=$list.scrollHeight){
            //         this.load();
            //     }
            // },
            // 修改table header的背景色
            tableHeaderColor({ row, column, rowIndex, columnIndex }) {
                if (rowIndex === 0 && (columnIndex>=0)) {
                    return 'color: #ff0;'
                }               
            },handleVehicleTypeChange(val){

                var obj = {}
                obj = this.options.find(function(item){
                    return item.value === val
                });
                this.vehicleTypeTemp = obj;

            },handleCurrentChange(curPage){

                this.vehiclesQuery(curPage);

            },vehiclesQuery(curPage){

                
                let cph = this.input_cph;
                
                let vehicleTypeTemp = this.vehiclesInfoList[0];
                //let vehicleType = vehicleTypeTemp.value!=""&&vehicleTypeTemp.value!=undefined?vehicleTypeTemp.value:'111';
                //let vehicleType = vehicleTypeTemp!=""&&vehicleTypeTemp!=undefined?vehicleTypeTemp:'111';
                //let vehicleType = vehicleTypeTemp;

                let pageNum = curPage!=""&&curPage!=undefined?curPage:1;
                let pageSize = this.pageSize!=null&&this.pageSize!=undefined?this.pageSize:5;

                this.$http.$get("zdjc_vehiclegpsstatistic/getVehicleInfoByVehicleNo",
                {"vehicleType":vehicleTypeTemp,"vehicleNo":cph,
                "pageSize":pageSize,"pageNum":pageNum,"export":false}).then((param) => {
                    if(param!=null && param!=undefined){

                        let tableData = param.results;
                        this.tableData_Enterprise = tableData;      
                        this.queryResult_Enterprise = param.totalRecordNum;
                    }else{
                        this.tableData_Enterprise = [];
                        this.queryResult_Enterprise = 0;
                    }
                });
            },handleEdit(index, row) {
                //定位
                // console.log(index, row);
                this.$emit('childFn',false);
                let lon = row.lon;
                let lat = row.lat;
                let arr = []
                arr.push(lon,lat)
                // console.log(arr);
                if(lon!=""&&lon!=undefined&&lat!=""&&lat!=undefined){
                    // alert("请选择区域名称");
                    tmap.removeLayer("WXPC_VEHICLES");
                    tmap.removeLayer("LYBC_VEHICLES");
                    tmap.removeLayer("BXKY_VEHICLES");
                    tmap.removeLayer("NETABOUT_VEHICLES");
                    tmap.removeLayer("BUS_VEHICLES");
                    tmap.removeLayer("CRUISE_VEHICLES");
                    tmap.removeLayer("PROVINCE_VEHICLES");
                    tmap.removeLayer("NATIONWIDE_VEHICLES");
                    tmap.removeLayer("AREA_VEHICLES");

                    this.moveToPoint(arr,1000,function(){
                        tmap.centerAt(lon,lat,10);
                    })
                    // tmap.centerAt(lon,lat,13);
                    tmap.addFeatureOnLayer('AREA_VEHICLES',row,'AREA_VEHICLES',false,false);
                }else{
                    tmap.removeLayer("AREA_VEHICLES");
                    this.$message({message: '车辆经纬度丢失无法定位',type: 'warning'});
                }
            },setVehiclesInfoList(vehicleType){
                if(this.vehiclesInfoList.length>0){
                    this.vehiclesInfoList.shift();
                }
                this.vehiclesInfoList.push(vehicleType);
                

            },qk1(){
                
                this.isChangeBackgroud_Bule_bxky = true;
                this.isChangeBackgroud_Bule_bcky = false;
                this.isChangeBackgroud_Bule_whys = false;
                this.isChangeBackgroud_Bule_gjys = false;
                this.isChangeBackgroud_Bule_xycz = false;
                this.isChangeBackgroud_Bule_wyc = false;
                this.isChangeBackgroud_Bule_jlc = false;  
                
                this.setVehiclesInfoList('111');
                
            },
            qk2(){
                
                this.isChangeBackgroud_Bule_bxky = false;
                this.isChangeBackgroud_Bule_bcky = true;
                this.isChangeBackgroud_Bule_whys = false;
                this.isChangeBackgroud_Bule_gjys = false;
                this.isChangeBackgroud_Bule_xycz = false;
                this.isChangeBackgroud_Bule_wyc = false;
                this.isChangeBackgroud_Bule_jlc = false;    
                this.setVehiclesInfoList('114'); 

            },
            qk3(){
                
                this.isChangeBackgroud_Bule_bxky = false;
                this.isChangeBackgroud_Bule_bcky = false;
                this.isChangeBackgroud_Bule_whys = true;
                this.isChangeBackgroud_Bule_gjys = false;
                this.isChangeBackgroud_Bule_xycz = false;
                this.isChangeBackgroud_Bule_wyc = false;
                this.isChangeBackgroud_Bule_jlc = false;  
                this.setVehiclesInfoList('141');
            },
            qk4(){
                
                this.isChangeBackgroud_Bule_bxky = false;
                this.isChangeBackgroud_Bule_bcky = false;
                this.isChangeBackgroud_Bule_whys = false;
                this.isChangeBackgroud_Bule_gjys = true;
                this.isChangeBackgroud_Bule_xycz = false;
                this.isChangeBackgroud_Bule_wyc = false;
                this.isChangeBackgroud_Bule_jlc = false;  
                this.setVehiclesInfoList('112');
            },
            qk5(){
                
                this.isChangeBackgroud_Bule_bxky = false;
                this.isChangeBackgroud_Bule_bcky = false;
                this.isChangeBackgroud_Bule_whys = false;
                this.isChangeBackgroud_Bule_gjys = false;
                this.isChangeBackgroud_Bule_xycz = true;
                this.isChangeBackgroud_Bule_wyc = false;
                this.isChangeBackgroud_Bule_jlc = false; 
                this.setVehiclesInfoList('113');
            },
            qk6(){
                
                this.isChangeBackgroud_Bule_bxky = false;
                this.isChangeBackgroud_Bule_bcky = false;
                this.isChangeBackgroud_Bule_whys = false;
                this.isChangeBackgroud_Bule_gjys = false;
                this.isChangeBackgroud_Bule_xycz = false;
                this.isChangeBackgroud_Bule_wyc = true;
                this.isChangeBackgroud_Bule_jlc = false; 
                this.setVehiclesInfoList('115');
            },qk7(){
                
                this.isChangeBackgroud_Bule_bxky = false;
                this.isChangeBackgroud_Bule_bcky = false;
                this.isChangeBackgroud_Bule_whys = false;
                this.isChangeBackgroud_Bule_gjys = false;
                this.isChangeBackgroud_Bule_xycz = false;
                this.isChangeBackgroud_Bule_wyc = false;
                this.isChangeBackgroud_Bule_jlc = true; 
                this.setVehiclesInfoList('120');
            }
        },
        data() {
            return {
                isChangeBackgroud_Bule_bcky:true,
                isChangeBackgroud_Bule_bxky:true,
                isChangeBackgroud_Bule_whys:true,
                isChangeBackgroud_Bule_gjys:true,
                isChangeBackgroud_Bule_xycz:true,
                isChangeBackgroud_Bule_wyc:true,
                isChangeBackgroud_Bule_jlc:true,
                
                picUrls_bcky : require('../img/bcys_little@2x.png'),
                picUrls_bxky : require('../img/bxky_little@2x.png'),
                picUrls_whys : require('../img/whys_little@2x.png'),
                picUrls_gjys : require('../img/gjys_little@2x.png'),
                picUrls_xycz : require('../img/taxi_little@2x.png'),
                picUrls_wyc : require('../img/wyc_little@2x.png'),
                picUrls_jlc : require('../img/jlc_little@2x.png'),

                vehiclesInfoList:[],

                isLoading:false,
                page:0,
                zdyqy:require('../img/zdyqy.png'),
                // checkList:['班线客运'],
                input_cph:'',
                queryResult_Enterprise:0,
                input_enterprise:'',
                // value_vehicleType:'',
                options: [{
                        value: '0',
                        label: '全部'
                    },{
                        value: '111',
                        label: '班线客运'
                    }, {
                        value: '114',
                        label: '包车客运'
                    }, {
                        value: '140',
                        label: '危货运输'
                    }, {
                        value: '112',
                        label: '公交运输'
                    }, {
                        value: '113',
                        label: '巡游出租'
                    }, {
                        value: '115',
                        label: '网约出租'
                    }],
                value_vehicleType: '111',//此处默认 下拉列 什么都不选中
                tableData_Enterprise:[],
                vehicleTypeTemp:{}
            }
        }
    }

    
</script>

<style lang="scss" scoped>
    .vehicles-distribution-container{
        .vehicles-distribution-wrap{
            // width:360px;
            width: 100%;
            height: 100%;
            // height:544px;
            // box-shadow:0px 4px 5px 0px rgba(131, 152, 144, 0.35);
            opacity:0.9;  //透明度
            float: left;
            // border:solid 2px #1b49b7;
            border-top-style: none;
            .vehicles-list{
                text-align: left;
                overflow-y: hidden;
                height: 550px;
                overflow-y: auto;    
                
                .search{
                    height: 180px;
                    .search-vehicle-type{
                        float: left;
                        margin-bottom:5px;
                        width: 100%;
                        .hbgk{
                            //display: flex;
                            height: 100%;
                            // width: 100%;
                            position: relative;
                            // background: url('./img/zhjc_hb_bg.png') no-repeat;
                           
                            //margin-left:10px;
                            .part{
                                display: flex;
                                /*height: 50%;*/
                                justify-content: space-evenly;
                                .item{
                                    flex-direction: column;
                                    text-align: center;
                                    width:79px;
                                    height:53px;
                                    // border:2px solid rgba(32,86,221,.4);
                                    //background-image: url(../img/xzzt@2x.png);
                                    border-radius:4px;
                                    padding-top: 10px;
                                    cursor: pointer;
                                    margin-right: 10px;
                                    //background-color: rgba(32, 86, 221, .4);
                                    
                                    p{
                                        width: 100%;
                                        color:#FFFFFF;
                                        // color: rgb(239, 252, 116);
                                        // color:#00FFFF;
                                        // color: #ead72c;
                                        font-size:14px;
                                        // font-weight: bold;
                                        margin:5px 0px 5px;
                                        
                                        font-family:Source Han Sans CN;
                                        font-weight:400;
                                        color:rgba(255,255,255,1);
                                    }
                                }
                                .buleImage{
                                    background-image: url(../img/xzzt@2x.png);
                                }
                                .greyImage{
                                    background-image: url(../img/wxz@2x.png);
                                }
                                .item:hover{
                                    background-color: rgba(32, 86, 221, .2);
                                    transition:0.4s;
                                    cursor: pointer;
                                }
                            }
                            .first{
                                //margin-top: 10px;
                                //align-items: flex-end;
                                margin-bottom: 10px;
                                width:100%;
                            }
                            .second{
                                //align-items: flex-start;
                                margin-top: 10px;
                                // width:75%;
                                width: 50%;
                            }
                        }
                    }
                    .search-condition-select{
                        height: 40px;
                        width: 98%;
                        margin-bottom: 15px; 
                        .el-select{
                            width: 98%;
                        }
                        .el-input{
                            width: 98%;
                        }
                    }
                    .search-condition{
                        height: 20px;
                        width:98%;
                        .query-left-lab{
                            float: left;
                            width: 74%;
                            margin-bottom: 10px;
                            .el-input{
                                width:65%;
                            }
                            .searchButton{
                                margin-left:5px;
                                width:32%;
                            }
                        }
                        .query-right-lab{
                            float: left;
                            width: 24%;
                            p{
                                margin-top: 12px;
                                text-decoration: underline;
                                cursor: pointer;
                            }
                            .searchButton{
                                float:right;
                            } 
                        }
                         
                    }
                }
                
                .search-result{
                    height:350px;
                    .result-num{
                        margin-bottom:5px;
                        float: left;
                        width:100%;
                        height: 30px;
                        color: #1d4fc9;
                        span{
                            margin: 0px 10px 0px 5px;
                            color: #fff;
                            font-weight: bold;
                        }
                    }
                    .result-table{
                        // opacity: 0.9;//table表后背景无法设置透明，该设置无效
                        height: 90%;
                        width: 98%;
                        p{
                            text-align: center;
                        }
                    }
                    
                }

                
                                   
            }
        }
    }
</style>
<style lang="css" scoped>
    .vehicles-list >>> .pane-1{
        margin-top:10px !important;
    }
    .result-table >>> .el-table--scrollable-x .el-table__body-wrapper {
          overflow-x: hidden;
    }
</style>
