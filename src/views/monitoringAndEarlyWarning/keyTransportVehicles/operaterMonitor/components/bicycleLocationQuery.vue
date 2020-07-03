<!--右侧车辆分布查询 -->
<template>
    <div class="vehicles-distribution-container">
        <div class="vehicles-distribution-wrap">  
            <div class="vehicles-list">
                    <div class="search">
                        <div class="vehicles-distribution-area">
                            <div class="area-left">
                                <label>区域类型：</label>
                            </div>
                            <div class="area-right">
                                <el-select v-model="value_AreaType" placeholder="请选择" @change="handleAreaTypeChange">
                                    <el-option
                                    v-for="item in options_AreaType"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="vehicles-distribution-area">
                            <div class="area-left">
                                <label>区域名称：</label>
                            </div>
                            <div class="area-right">
                              <!--  <el-select v-model="value_AreaName" multiple placeholder="请选择">-->
                                <el-select v-model="value_AreaName" placeholder="请选择" @change="handleAreaNameChange">
                                    <el-option
                                    v-for="item in options_AreaName"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    <!--<div class="vehicles-distribution-area">
                            <div class="area-left">
                                <label>车牌号码：</label>
                            </div>
                            <div class="area-right">
                                <el-input v-model="input_cph" placeholder="请输入车牌号"></el-input>
                            </div>
                        </div>-->
                        <div class="vehicles-distribution-area">
                            <div class="area-left">
                                <label>在线状况：</label>
                            </div>
                            <div class="area-right">
                                <el-checkbox class="selectAll" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                <el-checkbox-group class="selectItem" v-model="checkedItems" @change="handleCheckedItemChange">
                                    <el-checkbox v-for="item in onlineItems" :label="item" :key="item">{{item}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
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
                    </div>
                    <div class="query-right-lab">
                        <el-button type="primary" class="searchButton" @click="vehiclesQuery()">查询</el-button>  
                    </div>
                </div>            
            </div>  
                        <div class="search-result">
                            <div class="result-num">
                                 为您查询到<span>{{queryResult_Enterprise}}</span>条车辆信息
                             <!--   为您查询到<span>{{queryResult_Enterprise}}</span>条车辆信息，在线数量<span>{{online_Enterprise}}</span>条-->
                            </div>
                            <div class="result-table" style="width:98%;">
                                <el-table
                                    :data="tableData_Enterprise"
                                    @row-click="rowHanddle"
                                    stripe
                                    style="overflow:auto;" > 
                                    <el-table-column
                                        prop="vehiclePlateNum"
                                        label="车牌号" width="80px;">
                                        <template slot-scope="scope">
                                            <span style="border: 1px solid rgba(255,255,255,.2);
                                                            border-radius: 4px;text-align: center;
                                                            display: block;width: 70px;color:#fff;">
                                                {{scope.row.vehiclePlateNum}}
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="enterpriseName"
                                        label="公司" width="" show-overflow-tooltip>
                                    </el-table-column>
                                    <el-table-column
                                        prop="statusName"
                                        label="状态" width="60px;">
                                        <template slot-scope="scope">
                                            <span style="color: #00B050;font-weight:bold;" v-if="scope.row.statusName=='在线'">
                                                {{scope.row.statusName}}
                                            </span>
                                            <span v-else>
                                                {{scope.row.statusName}}
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <!--<el-table-column label="操作" width="50px;">
                                        <template slot-scope="scope">
                                            <el-button size="mini" class="table-detail-btn" @click="handleEdit(scope.$index, scope.row)">定位</el-button>
                                        <el-button size="mini" class="table-detail-btn" @click="handleEdit(scope.$index, scope.row)">跟踪</el-button>
                                            <el-button size="mini" class="table-detail-btn" @click="handleEdit(scope.$index, scope.row)">更多</el-button>
                                        </template>
                                    </el-table-column>-->
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
        name: 'BicycleQuery',
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
            this.routeParameterReceiving();
            this.qk1();
            this.vehiclesQuery();
            tmap.removeLayer();
            // this.load();
            //this.loadEnterprise();
        },computed: {
            noMore () {
                return this.tableData_Enterprise.length >= this.queryResult_Enterprise;
            },
            disabled () {
                return this.isLoading || this.noMore;
            },
            
        },
        methods:{
            handleAreaTypeChange(val){
                if(val == 0){
                    //此处加载重点区域的信息
                    this.getAreaName(1);
                }else if(val == 1){
                    //此处加载禁行区域的信息
                    this.getAreaName(2);
                }else{
                    //此处加载行政区域的信息
                    this.getAdministrativeDivision();
                }
            },
            handleAreaNameChange(val){
                debugger;
                var obj = {};
                obj = this.options_AreaName.find(function(item) {
                    return item.value === val;
                });
                this.areaNameTemp = obj;
            },
            getAreaName(areaType){
                this.$http
                    .$get("zdjc_AlertSettingHandler/getAllAreaInfo",{areaType:areaType})
                    .then(res => {
                    debugger;
                    let options = [{
                                    value: '',
                                    label: '全部'
                                }];
                    for(let i in res){
                        let option = [];
                        option.value = res[i].id;
                        //option.value = res[i].codeName;
                        option.label = res[i].areaName;
                        options.push(option);
                    }
                    this.options_AreaName = options;
                });
            },
            getAdministrativeDivision(){
                this.$http
                    .$get("zdjc_AlertSettingHandler/getAdministrativeDivision")
                    .then(res => {
                    let options = [{
                                    value: '0',
                                    label: '全部'
                                }];
                    for(let i in res){
                        let option = [];
                        option.value = res[i].codeValue;
                        //option.value = res[i].codeName;
                        option.label = res[i].codeName;
                        options.push(option);
                    }
                    this.options_AreaName = options;
                });
            }, 
            routeParameterReceiving(){
                this.input_cph =this.$route.query.input_cph;
            },
            handleCheckAllChange(val) {
                this.checkedItems = val ? this.onlineItems : [];
                this.isIndeterminate = false;
            },
            handleCheckedItemChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.onlineItems.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.onlineItems.length;
            },
            getStatues(){

            },
            setVehiclesInfoList(vehicleType){
                if(this.vehiclesInfoList.length>0){
                    this.vehiclesInfoList.shift();
                }
                this.vehiclesInfoList.push(vehicleType);
            
            },
            qk1(){
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
            },
            querySearch(queryString, cb) {
                debugger;
                let enterpriseSearchData = this.enterpriseSearchData;
                let results = queryString ? enterpriseSearchData.filter(this.createFilter(queryString)) : enterpriseSearchData;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },createFilter(queryString) {
                debugger;
                return (enterpriseSearchData) => {
                    let temp = enterpriseSearchData.enterpriseName;
                    if(temp!=null &&temp!=""){
                        return (enterpriseSearchData.enterpriseName.indexOf(queryString) !== -1);
                    }
                    
                    //return (enterpriseSearchData.enterpriseName.toLowerCase().indexOf(queryString.toLowerCase()) === 0));
                };
            },handleSelect(item) {
                console.log(item);
            },loadEnterprise(){
                this.$http.$get("zdjc_vehiclegpsstatistic/getEnterpriseList").then(data => {
                    debugger;
                     //for(var i=0;i<data.length;i++){
                      //  data[i].value = data[i].enterpriseName;   
                     //}
                    this.enterpriseSearchData = data;
                });
                
            },
            //获取数据
            load(curPage){
                
                //表示正在加载数据
                this.isLoading=true;
                setTimeout(() => {
                    // debugger;
                    let cph = this.input_cph;
                    let enterpriseName = this.input_enterprise;
                    let vehicleTypeTemp = this.vehicleTypeTemp;
                    let vehicleType = vehicleTypeTemp.enterpriseId!=""&&vehicleTypeTemp.enterpriseId!=undefined?vehicleTypeTemp.enterpriseId:'';

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
                        this.online_Enterprise
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
                var obj = {};
                obj = this.options.find(function(item){
                    return item.value === val
                });
                this.vehicleTypeTemp = obj;

            },handleCurrentChange(curPage){

                this.vehiclesQuery(curPage);

            },vehiclesQuery(curPage){
                
                let areaNameTemp = this.areaNameTemp;
                let areaId = areaNameTemp.value;  
                //let enterpriseName = this.input_enterprise;
                let onlineStateArr = this.checkedItems;
                let onlineStateTemp = onlineStateArr[0];
                let onlineState = 1; //不在线
                if(onlineStateTemp=="离线"){
                    onlineState = 0;
                }
                //let vehicleTypeTemp = this.vehicleTypeTemp;
                //let vehicleType = vehicleTypeTemp.value!=""&&vehicleTypeTemp.value!=undefined?vehicleTypeTemp.value:'111';
                let vehicleType = this.vehiclesInfoList[0];

                let pageNum = curPage!=""&&curPage!=undefined?curPage:1;
                let pageSize = this.pageSize!=null&&this.pageSize!=undefined?this.pageSize:5;

               // this.$http.$get("zdjc_vehiclegpsstatistic/getVehicleByCondition",
                this.$http.$get("zdjc_vehiclegpsstatistic/getVehicleAreaInfoAdvance",
                {"vehicleType":vehicleType,"areaId":areaId,"status":onlineState,
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
            },
            //handleEdit(index, row) {
            rowHanddle(row, column, event){
                //定位
                // console.log(index, row);
                this.$emit('childFn',false);
                //因为车辆高级检索接口不通，暂时注释
                let lon = row.lon;
                let lat = row.lat;
                //let lon = '103.86280589980335';
                //let lat = '30.640837467483166';
                row.lon = lon ;
                row.lat = lat;
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
            }
        },
        data() {
            return {
                checkAll: false,
                checkedItems: ['在线'],
                onlineItems: ['在线', '离线'],
                isIndeterminate: true,
                areaNameTemp:{},
                qk1Active:'',
                qk2Active:'',
                qk3Active:'',
                qk4Active:'',
                qk5Active:'',
                qk6Active:'',
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
                
               // input_cph:this.$router.query.input_cph,

                isLoading:false,
                page:0,
                zdyqy:require('../img/zdyqy.png'),
                // checkList:['班线客运'],
                input_cph:'',
                queryResult_Enterprise:0,
                online_Enterprise:0,
                input_enterprise:'',
                // value_vehicleType:'',
                value_AreaType:'',
                options_AreaType:[
                    {
                        value: '0',
                        label: '重点区域'
                    },{
                        value: '1',
                        label: '禁行区域'
                    }, {
                        value: '2',
                        label: '行政区域'
                    }
                ],
                value_AreaName:'',
                options_AreaName:[],
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
                vehiclesInfoList:[],
                value_vehicleType: '111',//此处默认 下拉列 什么都不选中
                tableData_Enterprise:[],
                vehicleTypeTemp:{},
                enterpriseSearchData:[],
                enterprise_input:''

            }
        }
    }

    
</script>

<style lang="scss" scoped>
    .vehicles-distribution-container{
        .vehicles-distribution-wrap{
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
                height: 750px;
                overflow-y: auto;    
                
                .search{
                    height: 300px;
                    .vehicles-distribution-area{
                        float: left;
                        margin-bottom:10px;
                        width: 100%;
                        .area-left{
                            float: left;  
                            width: 23%;
                            margin-top:5px;
                            
                        }
                        .area-right{
                            float: left;
                            //width:290px;
                            width: 75%;
                            .el-select{
                                width: 98%;
                            }
                            /** .inline-input{
                                width:100%;
                            }*/
                            .selectAll{
                                float:left;
                                font-size:14px;
                                font-family:Microsoft YaHei;
                                font-weight:400;
                                color:rgba(255,255,255,1);
                                line-height:30px;
                            }
                            .selectItem{
                                margin-left:20px;
                                float:left;
                                font-size:14px;
                                font-family:Microsoft YaHei;
                                font-weight:400;
                                color:rgba(255,255,255,1);
                                line-height:30px;
                            }
                        }

                    }
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
                    .search-condition{
                        height: 20px;
                        width:98%;
                        .query-left-lab{
                            float: left;
                            width: 75%;
                            margin-bottom: 10px;
                        }
                        .query-right-lab{
                            float: left;
                            width: 20%;
                            margin-left: 10px;
                            .searchButton{
                                float:right;
                            } 
                        }
                         
                    }
                }
                
                .search-result{
                    height:350px;
                    .result-num{
                        margin-top: 15px;
                        //margin-bottom:5px;
                        width:100%;
                        height: 30px;
                        //color: #1d4fc9;
                        color: #fff;
                        span{
                            margin: 0px 10px 0px 5px;
                            //color: #fff;
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
