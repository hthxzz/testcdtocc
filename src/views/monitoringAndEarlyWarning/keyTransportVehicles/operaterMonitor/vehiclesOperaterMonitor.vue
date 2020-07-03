<!--重点运输车辆运行监测-运行监测-运行状态-->
<template>
  <div class="vehicles-operate-query-container">
    <BaseLayoutContent>
      <template #leftPanel>
        <panel>
          <PanelItem title="营运车辆总数" :displaySwitch="false">
            <div class="item-content number-wrapper">
              <RollNumber title="营运车辆总数" :value="vehicleAllNum" unit="辆"></RollNumber>
            </div>
          </PanelItem>
          <PanelItem title="车辆信息[辆]" :displaySwitch="false" class="vehicleInfo">
            <ChangeTagItem :tagitemList="selectRangeItemList" @getStatues="getStatues" />
            <div class="hbgk">
              <div class="first part">
                <div class="item" :style="qk1Active" @click="qk1">
                  <img :src="picUrls_bxky" />
                  <p>{{bxky}}</p>
                  <span>班线客运</span>
                </div>
                <div class="item bj" :style="qk2Active" @click="qk2">
                  <img :src="picUrls_bcky" />
                  <p>{{bcky}}</p>
                  <span>包车客运</span>
                </div>
                <div class="item" :style="qk3Active" @click="qk3">
                  <img :src="picUrls_whys" />
                  <p>{{whys}}</p>
                  <span>危货运输</span>
                </div>
              </div>
              <div class="second part">
                <div class="item gj" :style="qk4Active" ref="gj" @click="qk4">
                  <img :src="picUrls_gjys" />
                  <p>{{gjys}}</p>
                  <span>公交运输</span>
                </div>
                <!-- <div class="messageBox-gj">
                </div>-->
                <div class="item xy" :style="qk5Active" ref="xy" @click="qk5">
                  <img :src="picUrls_xycz" />
                  <p>{{xycz}}</p>
                  <span>巡游出租</span>
                </div>
                <div class="item wy" :style="qk6Active" ref="wy" @click="qk6">
                  <img :src="picUrls_wycz" />
                  <p>{{wycz}}</p>
                  <span>网约出租</span>
                </div>
              </div>
            </div>
            <!-- <el-checkbox-group class="hbgk" v-model="vehiclesInfoList" @change="groupchange">
                                <div class="first part">
                                    <div class="item">
                                        <div>
                                            <div style="float:left;width:90%;">
                                                <img :src="picUrls_bxky">
                                            </div>
                                            <div style="float:left;width:10%">
                                                <el-checkbox label="111" >&nbsp;</el-checkbox>
                                            </div>
                                        </div>
                                        <p>{{bxky}} </p>
                                        <span>班线客运</span>
                                    </div>
                                    <div class="item bj">
                                        <div>
                                            <div style="float:left;width:90%;">
                                                <img :src="picUrls_bcky">
                                            </div>
                                            <div style="float:left;width:10%">
                                                <el-checkbox label="114">&nbsp;</el-checkbox>
                                            </div>
                                        </div>
                                        <p>{{bcky}} </p>
                                        <span>包车客运</span>
                                    </div>
                                    <div class="item">
                                        <div>
                                            <div style="float:left;width:90%;">
                                                <img :src="picUrls_whys">
                                            </div>
                                            <div style="float:left;width:10%">
                                                <el-checkbox label="141">&nbsp;</el-checkbox>
                                            </div>
                                        </div>
                                        <p>{{whys}} </p>
                                        <span>危货运输</span>
                                    </div>
                                </div>
                                <div class="second part">
                                    <div class="item">
                                        <div>
                                            <div style="float:left;width:90%;">
                                                <img :src="picUrls_gjys">
                                            </div>
                                            <div style="float:left;width:10%">
                                                <el-checkbox label="112">&nbsp;</el-checkbox>
                                            </div>
                                        </div>
                                        <p>{{gjys}} </p>
                                        <span>公交运输</span>
                                    </div>
                                    <div class="item">
                                        <div>
                                            <div style="float:left;width:90%;">
                                                <img :src="picUrls_xycz">
                                            </div>
                                            <div style="float:left;width:10%">
                                                <el-checkbox label="113" >&nbsp;</el-checkbox>
                                            </div>
                                        </div>
                                        <p>{{xycz}} </p>
                                        <span>巡游出租</span>
                                    </div>
                                    <div class="item">
                                        <div>
                                            <div style="float:left;width:90%;">
                                                <img :src="picUrls_wycz">
                                            </div>
                                            <div style="float:left;width:10%">
                                                <el-checkbox label="115">&nbsp;</el-checkbox>
                                            </div>
                                        </div>
                                        <p>{{wycz}} </p>
                                        <span>网约出租</span>
                                    </div>
                                </div>
            </el-checkbox-group>-->
          </PanelItem>
          <PanelItem
            :title="in_out_title_name"
            :displaySwitch="false"
            v-show="vehicleInOutShow"
            class="vehicleInOut"
          >
            <div class="vehicle-in-out">
              <!-- <table>
                                <tr>
                                    <td>川A出域:</td>
                                    <td>{{aOutNum}}</td>
                                </tr>
                                <tr>
                                    <td>川A入域:</td>
                                    <td>{{aInNum}}</td>
                                </tr>
                                <tr>
                                    <td>川籍入域:</td>
                                    <td>{{chuanInNum}}</td>
                                </tr>
              </table>-->
              <table>
                <tr>
                  <th>川A出域</th>
                  <th>川A入域</th>
                  <th>川籍入域</th>
                </tr>
                <tr>
                  <td>
                    <count-to :startVal="0" :endVal="aOutNum" :duration="4000" />
                  </td>
                  <td>
                    <count-to :startVal="0" :endVal="aInNum" :duration="4000" />
                  </td>
                  <td>
                    <count-to :startVal="0" :endVal="chuanInNum" :duration="4000" />
                  </td>
                </tr>
              </table>
              <!-- <div class="vehicle-in-out-left">
                                <div class="item-top">
                                    <span>川A出域(辆)</span>
                                    <p><span>{{aOutNum}}</span></p>
                                </div>
                                <div class="item-bottom">
                                    <span>出租出域(辆)</span>
                                    <p> <span>{{taxiOutNum}}</span></p>
                                </div>
                            </div>
                            <div class="vehicle-in-out-center">
                                <img :src="in_out_picture_url" >
                            </div>
                            <div class="vehicle-in-out-right">
                                <div class="item-top">
                                    <span>川A入域(辆)</span>
                                    <p><span>{{aInNum}} </span></p>
                                </div>
                                <div class="item-bottom">
                                    <span>川籍入域(辆)</span>
                                    <p> <span>{{chuanInNum}}</span></p>
                                </div>
              </div>-->
            </div>
          </PanelItem>

          <PanelItem
            title="出租网约出域情况[辆]"
            :displaySwitch="false"
            v-show="taxiShow"
            class="vehicleInOut"
          >
            <div class="vehicle-in-out">
              <table>
                <tr>
                  <th>出租出域</th>
                  <th>网约出域</th>
                </tr>
                <tr>
                  <td>
                    <count-to :startVal="0" :endVal="taxiOutNum" :duration="4000" />
                  </td>
                  <td>
                    <count-to :startVal="0" :endVal="onlineOutNum" :duration="4000" />
                  </td>
                </tr>
              </table>

              <!-- <table>
                                <tr>
                                    <td>出租出域:</td>
                                    <td>{{taxiOutNum}}</td>
                                </tr>
                                <tr>
                                    <td>网约出域:</td>
                                    <td>{{onlineOutNum}}</td>
                                </tr>
              </table>-->
              <!-- <div class="vehicle-in-out-left">
                                <div class="item-top">
                                    <span>出租出域(辆)</span>
                                    <p><span>{{aOutNum}}</span></p>
                                </div>
                                
                            </div>
                            <div class="vehicle-in-out-center">
                                <img :src="in_out_picture_url" >
                            </div>
                            <div class="vehicle-in-out-right">
                                <div class="item-top">
                                    <span>网约出域(辆)</span>
                                    <p><span>{{aInNum}} </span></p>
                                </div>
                                
              </div>-->
            </div>
          </PanelItem>

          <PanelItem :title="vehicleRange_title_name" :displaySwitch="false" class="rangePanel">
            <div class="rangeTable">
              <VehiclesRange :vehicleRangeTableData="vehicleRangeTableData1" :ref="range"></VehiclesRange>
            </div>
          </PanelItem>
        </panel>
      </template>
      <!-- <template #midContent>
        <div class="testmap">
          <Basemap></Basemap>
        </div>
        
        <section class="maptool-wrapper">
          <MapTool :mapToolList="mapToolList" @activeLayer="activeLayer" />
        </section>
      </template>-->
      <template #midContent>
        <div class="full-map">
          <Basemap></Basemap>
        </div>
        <div class="top">
          <div class="traffic-wrapper">
            <div class="item-wrapper">
              <mapDataCenterList :itemList="itemList"></mapDataCenterList>
            </div>
          </div>
        </div>
        <!--  <div class="middle-left-top">
                    <ChangeTagItem :tagitemList="selectRangeItemList" @getStatues="getStatues" />
                    
                </div>
                <el-radio-group v-model="radio_selectRange" @change="change_selectRange_radio" >
                                <el-radio  label="0" >全国</el-radio>
                                <el-radio  label="1" >四川省</el-radio>
                                <el-radio  label="2" >成都市</el-radio>
        </el-radio-group>-->
        <div class="mapLegend" v-if="ishide">
          <MapLegend :mapLegend="mapLegend" />
        </div>
      </template>
      <template #rightPanel>
        <panel>
          <PanelItem title="车辆查询" :displaySwitch="false">
            <div class="vehicles-query">
              <el-tabs>
                <el-tab-pane label="企业车辆查询" class="vehicles-distribution-query-tab">
                  <EnterpriseVehicleQuery @childFn="parentFn"></EnterpriseVehicleQuery>
                </el-tab-pane>
                <el-tab-pane label="区域车辆查询" class="vehicles-location-query-tab">
                  <VehiclesLocationQuery @childFn="parentFn"></VehiclesLocationQuery>
                </el-tab-pane>
              </el-tabs>
            </div>
          </PanelItem>
          <PanelItem title="违法监测" :displaySwitch="false">
            <div class="wfjc">
              <IllegalMonitor></IllegalMonitor>
            </div>
          </PanelItem>
          <PanelItem
            title="实时告警"
            :displaySwitch="false"
            :isShowDeatilBtn="true"
            @moreInfo="realtimeBroadcast"
            class="realtimeBroadcost"
          >
            <div class="ssbj">
              <RealtimeBroadcast @childFn="parentFn"></RealtimeBroadcast>
              <!-- <div class="ssbj-left">
                                <span>实时播报</span>
                            </div>
                            <div class="ssbj-right">
                                <RealtimeBroadcast></RealtimeBroadcast>
              </div>-->
            </div>
          </PanelItem>
        </panel>
      </template>
    </BaseLayoutContent>
    <ptus
      style=" position: absolute;top: 140px;left: 550px;width:550px;"
      v-if="isshowhide"
      :test="vehicleNo"
      ref="ptus"
    />
  </div>
</template>
<script>
import ptus from "./components/ptus";
import { getUniqueID, activeBackgroundColorMixins } from "@/untils/dom.js";
import operaterStatus from "./components/operaterStatus.vue";
import VehiclesInfo from "./components/vehiclesInfo.vue";
// import VehiclesDistributionQuery from "./components/vehiclesDistributionQuery.vue";
import VehiclesLocationQuery from "./components/vehiclesLocationQuery.vue";
// import VehiclesAlarm from "./components/vehicleAlarm.vue";
import IllegalMonitor from "./components/illegalMonitor.vue";
import RealtimeBroadcast from "./components/realtimeBroadcast.vue";
import EnterpriseVehicleQuery from "./components/enterpriseVehiclesQuery.vue";
import mapDataCenterList from "./components/mapDataCenter.vue";
import VehiclesRange from "./components/vehiclesRange.vue";
import VehicleTotalNumber from "./components/vehicleTotalNumber.vue";
import ChangeTagItem from "./components/changeTag.vue";
import mapAnimation from "@/components/common/map/animation/mapAnimation";

import { lemonchiffon } from "color-name";
export default {
  name: "",
  mixins: [mapAnimation],
  components: {
    // operaterStatus,
    VehiclesInfo,
    // VehiclesDistributionQuery,
    VehiclesLocationQuery,
    // VehiclesAlarm,
    IllegalMonitor,
    RealtimeBroadcast,
    EnterpriseVehicleQuery,
    mapDataCenterList,
    VehiclesRange,
    // VehicleTotalNumber,
    ChangeTagItem,
    ptus
  },
  created() {
    console.log("query-created");
  },
  mounted() {
    // let abs = localStorage.getItem('obj')
    // this.ishide = abs
    this.VehicleGPSCarInfo(0);
    this.getVehiclesIn_Out();
    //页面加载，默认全国地图，并且
    tmap.setMapZoomLevel(5);
    // let val = '0';
    let val = { code: "0" };
    let firstLoad = true;
    this.getStatues(val, firstLoad);

    window.getBaseInfoHtml = this.getBaseInfoHtml;
    // this.getVehiclesIn_Out();

    // this.getVehiclesInfo(val.code,firstLoad);  //初次加载只
    // this.qk1();//用来控制是否默认选中一个车辆类型
    // let checkbox_value = this.vehiclesInfoList[0];
    // console.log(1111111);
  },
  methods: {
    parentFn(item) {
      this.ishide = item;
    },
    //两客一危
    getVehicleListOf(areaType, vehicleType) {
      //{areaType:areaType,vehicleType:vehicleType} ||
      // console.log(11111);
      // console.log(areaType);
      // console.log(vehicleType);
      this.$http
        .$get("zdjc_vehiclegpsstatistic/getVehicleListOfLonAndLatByType", {
          areaType: areaType,
          vehicleType: vehicleType
        })
        .then(res => {
          // console.log(res);
          // console.log(res.charteredList); //包车
          // console.log(res.dangerList); //危
          // console.log(res.passengerList); //班线
          let isinfos = {};
          if (areaType == 0) {
            res.infos.forEach(item => {
              let geomstr = item.coordinates;
              isinfos = { ...item, geomstr };
              tmap.addFeatureOnLayer(
                "NATIONWIDE_VEHICLES",
                isinfos,
                "NATIONWIDE_VEHICLES",
                false,
                false
              );
            });
          } else if (areaType == 1) {
            res.infos.forEach(item => {
              let geomstr = item.coordinates;
              isinfos = { ...item, geomstr };
              tmap.addFeatureOnLayer(
                "PROVINCE_VEHICLES",
                isinfos,
                "PROVINCE_VEHICLES",
                false,
                false
              );
            });
          } else if (areaType == 2) {
            if (vehicleType == "111") {
              res.passengerList.forEach(element => {
                //班线
                tmap.addFeatureOnLayer(
                  "BXKY_VEHICLES",
                  element,
                  "BXKY_VEHICLES",
                  false,
                  false
                );
              });
            } else if (vehicleType == "114") {
              res.charteredList.forEach(element => {
                //包车
                tmap.addFeatureOnLayer(
                  "LYBC_VEHICLES",
                  element,
                  "LYBC_VEHICLES",
                  false,
                  false
                );
              });
            } else if (vehicleType == "141") {
              res.dangerList.forEach(element => {
                //危
                tmap.addFeatureOnLayer(
                  "WXPC_VEHICLES",
                  element,
                  "WXPC_VEHICLES",
                  false,
                  false
                );
              });
            } else {
              res.passengerList.forEach(element => {
                //班线
                tmap.addFeatureOnLayer(
                  "BXKY_VEHICLES",
                  element,
                  "BXKY_VEHICLES",
                  false,
                  false
                );
              });
              res.charteredList.forEach(element => {
                //包车
                tmap.addFeatureOnLayer(
                  "LYBC_VEHICLES",
                  element,
                  "LYBC_VEHICLES",
                  false,
                  false
                );
              });
              res.dangerList.forEach(element => {
                //危
                tmap.addFeatureOnLayer(
                  "WXPC_VEHICLES",
                  element,
                  "WXPC_VEHICLES",
                  false,
                  false
                );
              });
            }
          }
        });
    },
    // //巡游出租
    getTaxiVehicleList() {
      this.$http
        .$get("zdjc_vehiclegpsstatistic/getTaxiVehicleList")
        .then(res => {
          let vehicleGPSArea = {};
          res.forEach(element => {
            let lon = element.lng;
            vehicleGPSArea = { ...element, lon };
            tmap.addFeatureOnLayer(
              "CRUISE_VEHICLES",
              vehicleGPSArea,
              "CRUISE_VEHICLES",
              false,
              false
            );
          });
        });
    },
    // //网约出租
    getNetCarList() {
      this.$http.$get("zdjc_vehiclegpsstatistic/getNetCarList").then(res => {
        console.log(res);
        if (res) {
          res.forEach(element => {
            tmap.addFeatureOnLayer(
              "NETABOUT_VEHICLES",
              element,
              "NETABOUT_VEHICLES",
              false,
              false
            );
          });
        } else {
          console.log("object");
        }
      });
    },
    // //公交运输 //巡游113 //网约115
    getBusList() {
      this.$http.$get("zdjc_vehiclegpsstatistic/getBusList").then(res => {
        res.forEach(element => {
          tmap.addFeatureOnLayer(
            "BUS_VEHICLES",
            element,
            "BUS_VEHICLES",
            false,
            false
          );
        });
      });
    },
    //区域查询定位的基本信息
    getBaseInfoHtml(type, data, feaCoordinate, titleText, width, height) {
      if (type.indexOf("AREA_VEHICLES") !== -1) {
        this.vehicleNo = data.vehicleNo;
        if (this.isshowhide == true) {
          this.$refs.ptus.getVehicle(data.vehicleNo);
        }
        this.isshowhide = true;
        return null;
      } else if (type.indexOf("BUS_VEHICLES") !== -1) {
        this.vehicleNo = data.vehicleNo;
        if (this.isshowhide == true) {
          this.$refs.ptus.getVehicle(data.vehicleNo);
        }
        this.isshowhide = true;
        return null;
      } else if (type.indexOf("NETABOUT_VEHICLES") !== -1) {
        this.vehicleNo = data.vehicleNo;
        if (this.isshowhide == true) {
          this.$refs.ptus.getVehicle(data.vehicleNo);
        }
        this.isshowhide = true;
        return null;
      } else if (type.indexOf("CRUISE_VEHICLES") !== -1) {
        this.vehicleNo = data.vehicleNo;
        if (this.isshowhide == true) {
          this.$refs.ptus.getVehicle(data.vehicleNo);
        }
        this.isshowhide = true;
        return null;
      } else if (type.indexOf("LKYW_VEHICLES") !== -1) {
        this.vehicleNo = data.vehicleNo;
        if (this.isshowhide == true) {
          this.$refs.ptus.getVehicle(data.vehicleNo);
        }
        this.isshowhide = true;
        return null;
      } else {
        return null;
      }
      // return null;
    },
    VehicleGPSCarInfo(num) {
      this.$http
        .$get("zdjc_vehiclegpsstatistic/queryVehicleGPSCarInfo", {
          areaType: num
        })
        .then(param => {
          // console.log(param);
          let vehicleGPSArea = {};
          let CarInfos = param.vehicleGPSAreaCarInfos;
          CarInfos.forEach(element => {
            let geomstr = element.coordinates;
            vehicleGPSArea = { ...element, geomstr };
            if (num === 0) {
              tmap.addFeatureOnLayer(
                "NATIONWIDE_VEHICLES",
                vehicleGPSArea,
                "NATIONWIDE_VEHICLES",
                false,
                false
              );
            } else if (num === 1) {
              tmap.addFeatureOnLayer(
                "PROVINCE_VEHICLES",
                vehicleGPSArea,
                "PROVINCE_VEHICLES",
                false,
                false
              );
            }
          });
        });
    },
    activeSidebarMenu(status) {
      this.sidebarMenuShow = status.show;
    },
    toggle: function() {
      this.isShow = !this.isShow;
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex >= 0) {
        return "color: #ff0;";
      }
    },
    /**
     * radio切换，设置地图
     */
    // change_selectRange_radio:function(val){
    //     debugger;
    //     if(val ==='1'){//四川省
    //         tmap.setMapZoomLevel(7);
    //     }else if(val === '2'){//成都市
    //         tmap.setMapZoomLevel(11);
    //     }else{//默认全国 val=0
    //         tmap.setMapZoomLevel(5);
    //     }
    //     this.getVehiclesInfo(val);
    // },
    getStatues(val, firstLoad) {
      //获取tag选择状态

      let areaType = val.code;
      // console.log(areaType);
      if (areaType === 1) {
        //四川省
        debugger;
        this.ishide = false;
        this.setVehiclesDisable();
        let centerPoint = [103.88625572875976, 30.752351593261714];
        tmap.removeLayer("NATIONWIDE_VEHICLES");
        tmap.removeLayer("AREA_VEHICLES");
        tmap.removeLayer("VEHICLES_KEY_FOCUS_AREA");
        tmap.removeLayer("WXPC_VEHICLES");
        tmap.removeLayer("LYBC_VEHICLES");
        tmap.removeLayer("BXKY_VEHICLES");
        tmap.removeLayer("NETABOUT_VEHICLES");
        tmap.removeLayer("BUS_VEHICLES");
        tmap.removeLayer("CRUISE_VEHICLES");
        this.point2point(centerPoint, 3000, this.currentLevel, 7, this.temp);
        this.currentLevel = 7;
        this.isstatus = 1;
        // tmap.setMapZoomLevel(7);
        // console.log(this.isType);
        if (this.isType == "111") {
          this.getVehicleListOf(1, this.isType);
        } else if (this.isType == "114") {
          this.getVehicleListOf(1, this.isType);
        } else if (this.isType == "141") {
          this.getVehicleListOf(1, this.isType);
        } else {
          this.VehicleGPSCarInfo(1);
        }
        this.selectRangeItem = 1;
        //只有成都和全国会清除原来选中的公交运输、网约出租、巡游出租三个车辆类型
        this.qk4Active = "";
        this.qk5Active = "";
        this.qk6Active = "";
        let templist = this.vehiclesInfoList;
        if (
          templist.length > 0 &&
          (templist[0] == "112" || templist[0] == "113" || templist[0] == "115")
        ) {
          this.vehiclesInfoList.shift();
        }
        this.in_out_title_name = "两客一危出入域情况[辆]";
        this.vehicleRange_title_name = "车辆排名[辆]";
      } else if (areaType === 2) {
        //成都市
        this.ishide = !this.ishide;
        this.setVehiclesEnable();
        let centerPoint = [103.88625572875976, 30.752351593261714];
        this.point2point(centerPoint, 3000, this.currentLevel, 11, this.temp);
        this.currentLevel = 2;
        // tmap.setMapZoomLevel(11);
        this.isstatus = 2;
        tmap.removeLayer("NATIONWIDE_VEHICLES");
        tmap.removeLayer("AREA_VEHICLES");
        tmap.removeLayer("PROVINCE_VEHICLES");
        tmap.removeLayer("VEHICLES_KEY_FOCUS_AREA");
        tmap.removeLayer("WXPC_VEHICLES");
        tmap.removeLayer("LYBC_VEHICLES");
        tmap.removeLayer("BXKY_VEHICLES");
        tmap.removeLayer("NETABOUT_VEHICLES");
        tmap.removeLayer("BUS_VEHICLES");
        tmap.removeLayer("CRUISE_VEHICLES");
        if (this.isType == "111") {
          this.getVehicleListOf(2, this.isType);
        } else if (this.isType == "114") {
          this.getVehicleListOf(2, this.isType);
        } else if (this.isType == "141") {
          this.getVehicleListOf(2, this.isType);
        } else {
          this.getBusList(); //公交
          this.getTaxiVehicleList(); //巡游
          this.getNetCarList(); //网约
          this.getVehicleListOf(2); //lkyw
        }

        this.selectRangeItem = 2;
        this.getVehicleInOutNumByTaxiOrNetCar("");
      } else {
        //默认全国
        this.ishide = false;
        this.setVehiclesDisable();
        // tmap.setMapZoomLevel(5);
        let centerPoint = [103.35323786401555, 36.96039667758301];
        this.point2point(centerPoint, 3000, this.currentLevel, 5, this.temp);
        this.currentLevel = 5;
        tmap.removeLayer("NATIONWIDE_VEHICLES");
        tmap.removeLayer("AREA_VEHICLES");
        tmap.removeLayer("VEHICLES_KEY_FOCUS_AREA");
        tmap.removeLayer("WXPC_VEHICLES");
        tmap.removeLayer("LYBC_VEHICLES");
        tmap.removeLayer("BXKY_VEHICLES");
        tmap.removeLayer("NETABOUT_VEHICLES");
        tmap.removeLayer("PROVINCE_VEHICLES");
        tmap.removeLayer("BUS_VEHICLES");
        tmap.removeLayer("CRUISE_VEHICLES");
        if (this.isType == "111") {
          this.getVehicleListOf(0, this.isType);
        } else if (this.isType == "114") {
          this.getVehicleListOf(0, this.isType);
        } else if (this.isType == "141") {
          this.getVehicleListOf(0, this.isType);
        } else {
          this.VehicleGPSCarInfo(0);
        }
        this.isstatus = 0;
        this.selectRangeItem = 0;
        //只有成都和全国会清除原来选中的公交运输、网约出租、巡游出租三个车辆类型
        this.qk4Active = "";
        this.qk5Active = "";
        this.qk6Active = "";
        let templist = this.vehiclesInfoList;
        if (
          templist.length > 0 &&
          (templist[0] == "112" || templist[0] == "113" || templist[0] == "115")
        ) {
          this.vehiclesInfoList.shift();
        }
        this.in_out_title_name = "两客一危出入域情况[辆]";
        this.vehicleRange_title_name = "车辆排名[辆]";
      }

      //此处需要获取车辆类型，并传值，对出入域进行赋值

      let vehiclesType = "";
      if (this.vehiclesInfoList.length > 0) {
        vehiclesType = this.vehiclesInfoList[0];
      }
      this.vehicleInOutShow = true;
      if (vehiclesType == "") {
        this.getVehiclesStatus(null, this.isLoadVehicleType, firstLoad);
      } else {
        this.getVehiclesStatus(vehiclesType, this.isLoadVehicleType, firstLoad);
      }
      this.getVehiclesIn_Out(vehiclesType);
      this.getVehiclesInfo(vehiclesType, areaType, firstLoad);
    },
    temp() {},
    // groupchange(val){
    //     console.log("变化：",this.vehiclesInfoList);
    //     if(this.vehiclesInfoList.length>1){
    //         this.vehiclesInfoList.shift();
    //         let checkbox_value = this.vehiclesInfoList[0];
    //         this.getVehiclesStatus(checkbox_value);
    //         this.$refs.range.getVehicleRange();
    //         this.getVehiclesStatus(checkbox_value);
    //     }
    // },
    //该方法仅供点击班线客运，包车客运、危险品运输时调用该接口 车辆出入域(两客一危)
    getVehiclesIn_Out(vehicleType) {
      this.$http
        .$get("zdjc_vehiclegpsstatistic/getDlVehicleInOutNum", {
          vehicleType: vehicleType
        })
        .then(param => {
          // debugger;
          if (param != null && param != undefined) {
            this.aInNum = param.aInNum != null ? param.aInNum : 0;
            this.aOutNum = param.aOutNum != null ? param.aOutNum : 0;
            this.chuanInNum = param.chuanInNum != null ? param.chuanInNum : 0;
          }
        });
    },
    //点击车辆类型为出租或网约时，调动该方法，qk5，qk6，车辆类型为113、115
    getVehicleInOutNumByTaxiOrNetCar(vehicleType) {
      this.$http
        .$get("zdjc_vehiclegpsstatistic/getVehicleInOutNumByType", {
          vehicleType: vehicleType
        })
        .then(param => {
          //debugger;
          if (param != null && param != undefined) {
            this.taxiOutNum = param.taxiOutNum != null ? param.taxiOutNum : 0;
            this.onlineOutNum =
              param.netCarOutNum != null ? param.netCarOutNum : 0;
          }
        });
    },
    getVehiclesStatus(type, isLoadVehicleType, firstLoad) {
      //debugger;
      this.$http
        .$get("zdjc_vehiclegpsstatistic/getVehicleGPSCarInfo", {
          carType: type
        })
        .then(param => {
          if (param != null && param != undefined) {
            let operationCarNum = param.operationCarNum;
            let onlineTodayCarNum = param.onlineTodayCarNum;
            let realTimeCarNum = param.realTimeCarNum;
            let onlineRate = param.onlineRate;

            if (firstLoad) {
              this.vehicleAllNum = operationCarNum;
              this.firstLoad = false;
            }
            if (isLoadVehicleType) {
              let vehicleType = "";
              if (type == null) {
                vehicleType == "";
              } else {
                vehicleType == type;
              }
              switch (vehicleType) {
                case "111":
                  this.bxky =
                    param.passengerLineNum != null ? param.passengerLineNum : 0;
                  break;
                case "114":
                  this.bcky =
                    param.charteredCarNum != null ? param.charteredCarNum : 0;
                  break;
                case "141":
                  this.whys =
                    param.dangerousCarNum != null ? param.dangerousCarNum : 0;
                  break;
                case "112":
                  this.gjys = param.transitNum != null ? param.transitNum : 0;
                  break;
                case "113":
                  this.xycz =
                    param.fastTourTaxiNum != null ? param.fastTourTaxiNum : 0;
                  break;
                case "115":
                  this.wycz =
                    param.networkCarNum != null ? param.networkCarNum : 0;
                  break;
                case "":
                  let bxky_temp =
                    param.passengerLineNum != null ? param.passengerLineNum : 0;
                  this.bxky = bxky_temp;
                  console.log("this-bxky" + this.bxky);
                  this.bcky =
                    param.charteredCarNum != null ? param.charteredCarNum : 0;
                  this.whys =
                    param.dangerousCarNum != null ? param.dangerousCarNum : 0;
                  this.gjys = param.transitNum != null ? param.transitNum : 0;
                  this.xycz =
                    param.fastTourTaxiNum != null ? param.fastTourTaxiNum : 0;
                  this.wycz =
                    param.networkCarNum != null ? param.networkCarNum : 0;
                  break;
              }
            }

            this.getVehicleStatues(
              operationCarNum,
              onlineTodayCarNum,
              realTimeCarNum,
              onlineRate
            );
          } else {
            let myObj = [
              {
                id: 1,
                key: "operationCarNum",
                sub: "营运车辆",
                number: 0,
                unite: "辆"
              },
              {
                id: 2,
                key: "onlineTodayCarNum",
                sub: "今日上线",
                number: 0,
                unite: "辆"
              },
              {
                id: 3,
                key: "realTimeCarNum",
                sub: "实时在线",
                number: 0,
                unite: "辆"
              },
              {
                id: 4,
                key: "onlineRate",
                sub: "在线率",
                number: "0.0%",
                unite: ""
              }
            ];
            this.itemList = myObj;
          }
        });
    },
    getVehiclesInfo: function(vehiclesType, areaType, firstLoad) {
      // debugger;
      // this.$http.$get("zdjc_vehiclegpsstatistic/queryVehicleGPSCarInfo",{"areaType":areaType}).then((param) => {
      this.$http
        .$get("zdjc_vehiclegpsstatistic/queryVehicleGPSCarInfo", {
          vehicleType: vehiclesType,
          areaType: areaType
        })
        .then(param => {
          // this.$http.$get("zdjc_vehiclegpsstatistic/queryVehicleGPSCarInfo",{"vehicletype":areaType}).then((param) => {
          let paramArray = param;

          // switch(vehiclesType){
          //     case '111':
          //         this.bxky = paramArray.passengerLineNum!=null?paramArray.passengerLineNum:0;
          //         break;
          //     case '114':
          //         this.bcky = paramArray.charteredCarNum!=null?paramArray.charteredCarNum:0;
          //         break;
          //     case '141':
          //         this.whys = paramArray.dangerousCarNum!=null?paramArray.dangerousCarNum:0;
          //         break;
          //     case '112':
          //         this.gjys = paramArray.transitNum!=null?paramArray.transitNum:0;
          //         break;
          //     case '113':
          //         this.xycz = paramArray.fastTourTaxiNum!=null?paramArray.fastTourTaxiNum:0;
          //         break;
          //     case '115':
          //         this.wycz = paramArray.networkCarNum!=null?paramArray.networkCarNum:0;
          //         break;
          //     case '':
          //         let bxky_temp = paramArray.passengerLineNum!=null?paramArray.passengerLineNum:0;
          //         this.bxky = bxky_temp;
          //         this.bcky = paramArray.charteredCarNum!=null?paramArray.charteredCarNum:0;
          //         this.whys = paramArray.dangerousCarNum!=null?paramArray.dangerousCarNum:0;
          //         this.gjys = paramArray.transitNum!=null?paramArray.transitNum:0;
          //         this.xycz = paramArray.fastTourTaxiNum!=null?paramArray.fastTourTaxiNum:0;
          //         this.wycz = paramArray.networkCarNum!=null?paramArray.networkCarNum:0;
          //         break;

          // }

          // if(firstLoad){

          //     let operationCarNum = paramArray.operationCarNum!=null?paramArray.operationCarNum:0;
          //     let onlineTodayCarNum = paramArray.onlineTodayCarNum!=null?paramArray.onlineTodayCarNum:0;
          //     let realTimeCarNum = paramArray.realTimeCarNum!=null?paramArray.realTimeCarNum:0;
          //     let onlineRate = paramArray.onlineRate!=null?paramArray.onlineRate:0;

          //     this.getVehicleStatues(operationCarNum,onlineTodayCarNum,realTimeCarNum,onlineRate);

          //     this.vehicleAllNum = operationCarNum;  //车辆总数
          //     firstLoad = false;

          // }

          let vehicleGPSArea_temp = paramArray.vehicleGPSAreaCarInfos;
          this.vehicleRangeTableData1 = vehicleGPSArea_temp;
          // let vehicleRangeTableData1_temp = vehicleGPSArea_temp;
          //父组件往子组件传值
          // this.$props.vehicleRangeTableData = this.vehicleRangeTableData1;
          // this.$props.vehicleRangeTableData = vehicleRangeTableData1_temp;
          // this.$refs.range.getVehicleRange();
          //父组件调用子组件的方法
          // this.$refs.range.getVehicleRange();
        });
    },
    getVehicleStatues(
      operationCarNum,
      onlineTodayCarNum,
      realTimeCarNum,
      onlineRate
    ) {
      //获取选中
      let myObj = [
        {
          id: 1,
          key: "operationCarNum",
          sub: "营运车辆",
          number: 0,
          unite: "辆"
        },
        {
          id: 2,
          key: "onlineTodayCarNum",
          sub: "今日上线",
          number: 0,
          unite: "辆"
        },
        {
          id: 3,
          key: "realTimeCarNum",
          sub: "实时在线",
          number: 0,
          unite: "辆"
        },
        { id: 4, key: "onlineRate", sub: "在线率", number: "0.0%", unite: "" }
      ];

      for (let i = 0; i < myObj.length; i++) {
        let temp = myObj[i];
        let key = temp.key;

        if (key == "operationCarNum") {
          temp.number =
            operationCarNum != null &&
            (operationCarNum != "") & (operationCarNum != undefined)
              ? operationCarNum
              : "0";
        }
        if (key == "onlineTodayCarNum") {
          temp.number =
            onlineTodayCarNum != null &&
            (onlineTodayCarNum != "") & (onlineTodayCarNum != undefined)
              ? onlineTodayCarNum
              : "0";
        }
        if (key == "realTimeCarNum") {
          temp.number =
            realTimeCarNum != null &&
            (realTimeCarNum != "") & (realTimeCarNum != undefined)
              ? realTimeCarNum
              : "0";
        }
        if (key == "onlineRate") {
          temp.number =
            onlineRate != null && (onlineRate != "") & (onlineRate != undefined)
              ? onlineRate
              : "0.0%";
        }
      }

      this.itemList = myObj;
    },
    qk1(firstLoad) {
      debugger;
      this.vehicleInOutShow = true;
      this.in_out_title_name = "班线客运出入域情况[辆]";
      this.vehicleRange_title_name = "班线客运车辆排名[辆]";
      //当前选中的节点
      let areaType = this.selectRangeItem;
      let vehicleType = "111";
      this.isType = "111";

      if (this.isstatus == 0) {
        this.getVehicleListOf(0, vehicleType);
      } else if (this.isstatus == 1) {
        this.getVehicleListOf(1, vehicleType);
      } else if (this.isstatus == 2) {
        tmap.removeLayer("NETABOUT_VEHICLES");
        tmap.removeLayer("BUS_VEHICLES");
        tmap.removeLayer("CRUISE_VEHICLES");
        tmap.removeLayer("WXPC_VEHICLES");
        tmap.removeLayer("LYBC_VEHICLES");
        tmap.removeLayer("BXKY_VEHICLES");
        this.getVehicleListOf(2, vehicleType);
      }

      this.vehiclesInfoList.push(vehicleType);
      if (this.vehiclesInfoList.length > 1) {
        let list = this.vehiclesInfoList;
        if (list[0] == list[1] && list[0] == "111" && this.qk1Active != "") {
          vehicleType = "";
          this.qk1Active = "";
          this.isLoadVehicleType = true;
          if (this.isstatus == 0) {
            this.VehicleGPSCarInfo(0);
          } else if (this.isstatus == 1) {
            this.VehicleGPSCarInfo(1);
          } else if (this.isstatus == 2) {
            // tmap.removeLayer("WXPC_VEHICLES");
            // tmap.removeLayer("LYBC_VEHICLES");
            tmap.removeLayer("BXKY_VEHICLES");
            this.getBusList(); //公交
            this.getTaxiVehicleList(); //巡游
            this.getNetCarList(); //网约
            this.getVehicleListOf(2); //lkyw
          }
          this.vehicleInOutShow = true;
          this.in_out_title_name = "两客一危出入域情况[辆]";
          this.vehicleRange_title_name = "车辆排名[辆]";
        } else if (
          list[0] == list[1] &&
          list[0] == "111" &&
          this.qk1Active == ""
        ) {
          //当连续点击同一个车辆类型3次时
          this.isLoadVehicleType = false;
          this.qk1Active = "background-color: rgb(14, 41, 104);";
          // console.log(1111);
          if (this.isstatus == 0) {
            this.getVehicleListOf(0, vehicleType);
          } else if (this.isstatus == 1) {
            this.getVehicleListOf(1, vehicleType);
          } else if (this.isstatus == 2) {
            tmap.removeLayer("NETABOUT_VEHICLES");
            tmap.removeLayer("BUS_VEHICLES");
            tmap.removeLayer("CRUISE_VEHICLES");
            tmap.removeLayer("WXPC_VEHICLES");
            tmap.removeLayer("LYBC_VEHICLES");
            tmap.removeLayer("BXKY_VEHICLES");
            this.getVehicleListOf(2, vehicleType);
          }
        } else if (list[0] != list[1] && list[0] != "111") {
          this.isLoadVehicleType = false;
          this.qk1Active = "background-color: rgb(14, 41, 104);";
        }
        this.vehiclesInfoList.shift();
      } else if (this.vehiclesInfoList.length == 1) {
        this.isLoadVehicleType = false;
        this.qk1Active = "background-color: rgb(14, 41, 104);";
        // if(this.isstatus == 0){
        //     this.getVehicleListOf(0,vehicleType);
        // }else if(this.isstatus == 1){
        //     this.getVehicleListOf(1,vehicleType);
        // }else if(this.isstatus == 2){
        //     tmap.removeLayer("NETABOUT_VEHICLES");
        //     tmap.removeLayer("BUS_VEHICLES");
        //     tmap.removeLayer("CRUISE_VEHICLES");
        //     tmap.removeLayer("WXPC_VEHICLES");
        //     tmap.removeLayer("LYBC_VEHICLES");
        //     tmap.removeLayer("BXKY_VEHICLES");
        //     this.getVehicleListOf(2,vehicleType);
        // }
      }
      this.qk2Active = "";
      this.qk3Active = "";
      this.qk4Active = "";
      this.qk5Active = "";
      this.qk6Active = "";
      console.log("111click");

      if (vehicleType == "") {
        this.getVehiclesStatus(null, this.isLoadVehicleType);
      } else {
        this.getVehiclesStatus(vehicleType, this.isLoadVehicleType);
      }
      this.getVehiclesIn_Out(vehicleType);
      this.getVehiclesInfo(vehicleType, areaType);

      // if(this.vehiclesInfoList.length>1){
      //     this.vehiclesInfoList.shift();
      //     this.getVehiclesStatus(vehicleType);
      //     this.getVehiclesIn_Out(vehicleType);
      //     // this.$refs.range.getVehicleRange();
      // }else if(this.vehiclesInfoList.length == 1){
      //     this.getVehiclesStatus(vehicleType);
      //     this.getVehiclesIn_Out(vehicleType);
      //     // this.$refs.range.getVehicleRange();
      // }
    },
    qk2() {
      this.vehicleInOutShow = true;
      this.in_out_title_name = "包车客运出入域情况[辆]";
      this.vehicleRange_title_name = "包车客运车辆排名[辆]";
      console.log("222click");

      //当前选中的节点
      let areaType = this.selectRangeItem;
      let vehicleType = "114";
      this.isType = "114";
      debugger;

      if (this.isstatus == 0) {
        this.getVehicleListOf(0, vehicleType);
      } else if (this.isstatus == 1) {
        this.getVehicleListOf(1, vehicleType);
      } else if (this.isstatus == 2) {
        tmap.removeLayer("WXPC_VEHICLES");
        tmap.removeLayer("LYBC_VEHICLES");
        tmap.removeLayer("BXKY_VEHICLES");
        tmap.removeLayer("NETABOUT_VEHICLES");
        tmap.removeLayer("BUS_VEHICLES");
        tmap.removeLayer("CRUISE_VEHICLES");
        this.getVehicleListOf(2, vehicleType);
      }

      //选中按钮，则将车辆类型放置在vehiclesInfoList表中
      //长度大于1时，将其中的元素移除
      this.vehiclesInfoList.push(vehicleType);
      if (this.vehiclesInfoList.length > 1) {
        let list = this.vehiclesInfoList;
        if (list[0] == list[1] && list[0] == "114" && this.qk2Active != "") {
          vehicleType = "";
          this.qk2Active = "";
          this.isLoadVehicleType = true;
          if (this.isstatus == 0) {
            this.VehicleGPSCarInfo(0);
          } else if (this.isstatus == 1) {
            this.VehicleGPSCarInfo(1);
          } else if (this.isstatus == 2) {
            // tmap.removeLayer("WXPC_VEHICLES");
            tmap.removeLayer("LYBC_VEHICLES");
            // tmap.removeLayer("BXKY_VEHICLES");
            this.getBusList(); //公交
            this.getTaxiVehicleList(); //巡游
            this.getNetCarList(); //网约
            this.getVehicleListOf(2); //lkyw
          }
          this.vehicleInOutShow = true;
          this.in_out_title_name = "两客一危出入域情况[辆]";
          this.vehicleRange_title_name = "车辆排名[辆]";
        } else if (
          list[0] == list[1] &&
          list[0] == "114" &&
          this.qk2Active == ""
        ) {
          //当连续点击同一个车辆类型3次时
          this.isLoadVehicleType = false;
          this.qk2Active = "background-color: rgb(14, 41, 104);";
          if (this.isstatus == 0) {
            this.getVehicleListOf(0, vehicleType);
          } else if (this.isstatus == 1) {
            this.getVehicleListOf(1, vehicleType);
          } else if (this.isstatus == 2) {
            tmap.removeLayer("WXPC_VEHICLES");
            tmap.removeLayer("LYBC_VEHICLES");
            tmap.removeLayer("BXKY_VEHICLES");
            tmap.removeLayer("NETABOUT_VEHICLES");
            tmap.removeLayer("BUS_VEHICLES");
            tmap.removeLayer("CRUISE_VEHICLES");
            this.getVehicleListOf(2, vehicleType);
          }
        } else if (list[0] != list[1] && list[0] != "114") {
          this.isLoadVehicleType = false;
          this.qk2Active = "background-color: rgb(14, 41, 104);";
        }
        this.vehiclesInfoList.shift();
      } else if (this.vehiclesInfoList.length == 1) {
        this.isLoadVehicleType = false;
        this.qk2Active = "background-color: rgb(14, 41, 104);";
        // if(this.isstatus == 0){
        //     this.getVehicleListOf(0,vehicleType);
        // }else if(this.isstatus == 1){
        //     this.getVehicleListOf(1,vehicleType);
        // }else if(this.isstatus == 2){
        //     tmap.removeLayer("WXPC_VEHICLES");
        //     tmap.removeLayer("LYBC_VEHICLES");
        //     tmap.removeLayer("BXKY_VEHICLES");
        //     tmap.removeLayer("NETABOUT_VEHICLES");
        //     tmap.removeLayer("BUS_VEHICLES");
        //     tmap.removeLayer("CRUISE_VEHICLES");
        //     this.getVehicleListOf(2,vehicleType);
        // }
      }
      this.qk1Active = "";
      this.qk3Active = "";
      this.qk4Active = "";
      this.qk5Active = "";
      this.qk6Active = "";

      if (vehicleType == "") {
        this.getVehiclesStatus(null, this.isLoadVehicleType);
      } else {
        this.getVehiclesStatus(vehicleType, this.isLoadVehicleType);
      }
      this.getVehiclesIn_Out(vehicleType);
      this.getVehiclesInfo(vehicleType, areaType);
    },
    qk3() {
      this.vehicleInOutShow = true;
      this.in_out_title_name = "危货运输出入域情况[辆]";
      this.vehicleRange_title_name = "危货运输车辆排名[辆]";
      console.log("333click");

      //当前选中的节点
      let areaType = this.selectRangeItem;
      let vehicleType = "141";
      this.isType = "141";
      if (this.isstatus == 0) {
        this.getVehicleListOf(0, vehicleType);
      } else if (this.isstatus == 1) {
        this.getVehicleListOf(1, vehicleType);
      } else if (this.isstatus == 2) {
        tmap.removeLayer("WXPC_VEHICLES");
        tmap.removeLayer("LYBC_VEHICLES");
        tmap.removeLayer("BXKY_VEHICLES");
        tmap.removeLayer("NETABOUT_VEHICLES");
        tmap.removeLayer("BUS_VEHICLES");
        tmap.removeLayer("CRUISE_VEHICLES");
        this.getVehicleListOf(2, vehicleType);
      }

      this.vehiclesInfoList.push(vehicleType);
      if (this.vehiclesInfoList.length > 1) {
        let list = this.vehiclesInfoList;
        if (list[0] == list[1] && list[0] == "141" && this.qk3Active != "") {
          vehicleType = "";
          this.qk3Active = "";
          this.isLoadVehicleType = true;
          if (this.isstatus == 0) {
            this.VehicleGPSCarInfo(0);
          } else if (this.isstatus == 1) {
            this.VehicleGPSCarInfo(1);
          } else if (this.isstatus == 2) {
            tmap.removeLayer("WXPC_VEHICLES");
            // tmap.removeLayer("LYBC_VEHICLES");
            // tmap.removeLayer("BXKY_VEHICLES");
            this.getBusList(); //公交
            this.getTaxiVehicleList(); //巡游
            this.getNetCarList(); //网约
            this.getVehicleListOf(2); //lkyw
          }
          this.vehicleInOutShow = true;
          this.in_out_title_name = "两客一危出入域情况[辆]";
          this.vehicleRange_title_name = "车辆排名[辆]";
        } else if (
          list[0] == list[1] &&
          list[0] == "141" &&
          this.qk3Active == ""
        ) {
          //当连续点击同一个车辆类型3次时
          this.isLoadVehicleType = false;
          this.qk3Active = "background-color: rgb(14, 41, 104);";
          if (this.isstatus == 0) {
            this.getVehicleListOf(0, vehicleType);
          } else if (this.isstatus == 1) {
            this.getVehicleListOf(1, vehicleType);
          } else if (this.isstatus == 2) {
            tmap.removeLayer("WXPC_VEHICLES");
            tmap.removeLayer("LYBC_VEHICLES");
            tmap.removeLayer("BXKY_VEHICLES");
            tmap.removeLayer("NETABOUT_VEHICLES");
            tmap.removeLayer("BUS_VEHICLES");
            tmap.removeLayer("CRUISE_VEHICLES");
            this.getVehicleListOf(2, vehicleType);
          }
        } else if (list[0] != list[1] && list[0] != "141") {
          this.isLoadVehicleType = false;
          this.qk3Active = "background-color: rgb(14, 41, 104);";
        }
        this.vehiclesInfoList.shift();
      } else if (this.vehiclesInfoList.length == 1) {
        this.isLoadVehicleType = false;
        this.qk3Active = "background-color: rgb(14, 41, 104);";
        // if(this.isstatus == 0){
        //     this.getVehicleListOf(0,vehicleType);
        // }else if(this.isstatus == 1){
        //     this.getVehicleListOf(1,vehicleType);
        // }else if(this.isstatus == 2){
        //     tmap.removeLayer("WXPC_VEHICLES");
        //     tmap.removeLayer("LYBC_VEHICLES");
        //     tmap.removeLayer("BXKY_VEHICLES");
        //     tmap.removeLayer("NETABOUT_VEHICLES");
        //     tmap.removeLayer("BUS_VEHICLES");
        //     tmap.removeLayer("CRUISE_VEHICLES");
        //     this.getVehicleListOf(2,vehicleType);
        // }
      }
      this.qk1Active = "";
      this.qk2Active = "";
      this.qk4Active = "";
      this.qk5Active = "";
      this.qk6Active = "";
      if (vehicleType == "") {
        this.getVehiclesStatus(null, this.isLoadVehicleType);
      } else {
        this.getVehiclesStatus(vehicleType, this.isLoadVehicleType);
      }
      this.getVehiclesInfo(vehicleType, areaType);
      this.getVehiclesIn_Out(vehicleType);
      // this.getVehiclesStatus(vehicleType);
    },
    qk4() {
      this.vehicleInOutShow = false;
      // this.in_out_title_name = '公交运输出入域情况[辆]';
      this.vehicleRange_title_name = "公交运输车辆排名[辆]";
      console.log("444click");

      //当前选中的节点
      let areaType = this.selectRangeItem;
      let vehicleType = "112";

      if (this.isstatus == 0) {
        console.log(1111);
        // this.getisVehicleGPS(vehicleType,areaType)
      } else if (this.isstatus == 1) {
        console.log(2222);
      } else if (this.isstatus == 2) {
        tmap.removeLayer("WXPC_VEHICLES");
        tmap.removeLayer("LYBC_VEHICLES");
        tmap.removeLayer("BXKY_VEHICLES");
        tmap.removeLayer("NETABOUT_VEHICLES");
        tmap.removeLayer("BUS_VEHICLES");
        tmap.removeLayer("CRUISE_VEHICLES");
        this.getBusList();
      }

      this.vehiclesInfoList.push(vehicleType);
      if (this.vehiclesInfoList.length > 1) {
        let list = this.vehiclesInfoList;
        if (list[0] == list[1] && list[0] == "112" && this.qk4Active != "") {
          vehicleType = "";
          this.qk4Active = "";
          this.isLoadVehicleType = true;
          tmap.removeLayer("BUS_VEHICLES");
          // tmap.removeLayer("LYBC_VEHICLES");
          // tmap.removeLayer("BXKY_VEHICLES");
          this.getBusList(); //公交
          this.getTaxiVehicleList(); //巡游
          this.getNetCarList(); //网约
          this.getVehicleListOf(2); //lkyw
          this.vehicleInOutShow = true;
          this.in_out_title_name = "两客一危出入域情况[辆]";
          this.vehicleRange_title_name = "车辆排名[辆]";
        } else if (
          list[0] == list[1] &&
          list[0] == "112" &&
          this.qk4Active == ""
        ) {
          //当连续点击同一个车辆类型3次时
          this.isLoadVehicleType = false;
          this.qk4Active = "background-color: rgb(14, 41, 104);";
          tmap.removeLayer("WXPC_VEHICLES");
          tmap.removeLayer("LYBC_VEHICLES");
          tmap.removeLayer("BXKY_VEHICLES");
          tmap.removeLayer("NETABOUT_VEHICLES");
          tmap.removeLayer("BUS_VEHICLES");
          tmap.removeLayer("CRUISE_VEHICLES");
          this.getBusList();
        } else if (list[0] != list[1] && list[0] != "112") {
          this.isLoadVehicleType = false;
          this.qk4Active = "background-color: rgb(14, 41, 104);";
        }
        this.vehiclesInfoList.shift();
      } else if (this.vehiclesInfoList.length == 1) {
        this.isLoadVehicleType = false;
        this.qk4Active = "background-color: rgb(14, 41, 104);";
        // if(this.isstatus == 0){
        //     console.log(1111);
        //     // this.getisVehicleGPS(vehicleType,areaType)
        // }else if(this.isstatus == 1){
        //     console.log(2222);
        // }else if(this.isstatus == 2){
        // tmap.removeLayer("WXPC_VEHICLES");
        // tmap.removeLayer("LYBC_VEHICLES");
        // tmap.removeLayer("BXKY_VEHICLES");
        // tmap.removeLayer("NETABOUT_VEHICLES");
        // tmap.removeLayer("BUS_VEHICLES");
        // tmap.removeLayer("CRUISE_VEHICLES");
        // this.getBusList();
        // }
      }
      this.qk1Active = "";
      this.qk2Active = "";
      this.qk3Active = "";
      this.qk5Active = "";
      this.qk6Active = "";
      if (vehicleType == "") {
        this.getVehiclesStatus(null, this.isLoadVehicleType);
      } else {
        this.getVehiclesStatus(vehicleType, this.isLoadVehicleType);
      }
      this.getVehiclesInfo(vehicleType, areaType);
      this.getVehiclesIn_Out(vehicleType);
      // this.getVehiclesStatus(vehicleType);
    },
    qk5() {
      this.vehicleInOutShow = false;
      // this.in_out_title_name = '巡游出租出入域情况[辆]';
      this.vehicleRange_title_name = "巡游出租车辆排名[辆]";

      console.log("555click");

      //当前选中的节点
      let areaType = this.selectRangeItem;
      let vehicleType = "113";

      if (this.isstatus == 0) {
        console.log(1111);
        // this.getisVehicleGPS(vehicleType,areaType)
      } else if (this.isstatus == 1) {
        console.log(2222);
      } else if (this.isstatus == 2) {
        tmap.removeLayer("WXPC_VEHICLES");
        tmap.removeLayer("LYBC_VEHICLES");
        tmap.removeLayer("BXKY_VEHICLES");
        tmap.removeLayer("NETABOUT_VEHICLES");
        tmap.removeLayer("BUS_VEHICLES");
        tmap.removeLayer("CRUISE_VEHICLES");
        this.getTaxiVehicleList();
      }

      this.vehiclesInfoList.push(vehicleType);
      if (this.vehiclesInfoList.length > 1) {
        let list = this.vehiclesInfoList;
        if (list[0] == list[1] && list[0] == "113" && this.qk5Active != "") {
          vehicleType = "";
          this.qk5Active = "";
          this.isLoadVehicleType = true;
          tmap.removeLayer("CRUISE_VEHICLES");
          this.getBusList(); //公交
          this.getTaxiVehicleList(); //巡游
          this.getNetCarList(); //网约
          this.getVehicleListOf(2); //lkyw
          this.vehicleInOutShow = true;
          this.in_out_title_name = "两客一危出入域情况[辆]";
          this.vehicleRange_title_name = "车辆排名[辆]";
        } else if (
          list[0] == list[1] &&
          list[0] == "113" &&
          this.qk5Active == ""
        ) {
          //当连续点击同一个车辆类型3次时
          this.isLoadVehicleType = false;
          this.qk5Active = "background-color: rgb(14, 41, 104);";
          tmap.removeLayer("WXPC_VEHICLES");
          tmap.removeLayer("LYBC_VEHICLES");
          tmap.removeLayer("BXKY_VEHICLES");
          tmap.removeLayer("NETABOUT_VEHICLES");
          tmap.removeLayer("BUS_VEHICLES");
          tmap.removeLayer("CRUISE_VEHICLES");
          this.getTaxiVehicleList();
        } else if (list[0] != list[1] && list[0] != "113") {
          this.isLoadVehicleType = false;
          this.qk5Active = "background-color: rgb(14, 41, 104);";
        }
        this.vehiclesInfoList.shift();
      } else if (this.vehiclesInfoList.length == 1) {
        this.isLoadVehicleType = false;
        this.qk5Active = "background-color: rgb(14, 41, 104);";
        // if(this.isstatus == 0){
        //     console.log(1111);
        //     // this.getisVehicleGPS(vehicleType,areaType)
        // }else if(this.isstatus == 1){
        //     console.log(2222);
        // }else if(this.isstatus == 2){
        // tmap.removeLayer("WXPC_VEHICLES");
        // tmap.removeLayer("LYBC_VEHICLES");
        // tmap.removeLayer("BXKY_VEHICLES");
        // tmap.removeLayer("NETABOUT_VEHICLES");
        // tmap.removeLayer("BUS_VEHICLES");
        // tmap.removeLayer("CRUISE_VEHICLES");
        // this.getTaxiVehicleList();
        // }
      }
      this.qk1Active = "";
      this.qk2Active = "";
      this.qk3Active = "";
      this.qk4Active = "";
      this.qk6Active = "";
      this.getVehiclesInfo(vehicleType, areaType);
      // this.getVehiclesStatus(vehicleType);
      if (vehicleType == "") {
        this.getVehiclesStatus(null, this.isLoadVehicleType);
      } else {
        this.getVehiclesStatus(vehicleType, this.isLoadVehicleType);
      }
      //控制出租
      this.getVehicleInOutNumByTaxiOrNetCar(vehicleType);
    },
    qk6() {
      this.vehicleInOutShow = false;
      // this.in_out_title_name = '网约出租出入域情况[辆]';
      this.vehicleRange_title_name = "网约出租车辆排名[辆]";
      console.log("666click");

      //当前选中的节点
      let areaType = this.selectRangeItem;
      let vehicleType = "115";

      if (this.isstatus == 0) {
        console.log(1111);
        // this.getisVehicleGPS(vehicleType,areaType)
      } else if (this.isstatus == 1) {
        console.log(2222);
      } else if (this.isstatus == 2) {
        tmap.removeLayer("WXPC_VEHICLES");
        tmap.removeLayer("LYBC_VEHICLES");
        tmap.removeLayer("BXKY_VEHICLES");
        tmap.removeLayer("NETABOUT_VEHICLES");
        tmap.removeLayer("BUS_VEHICLES");
        tmap.removeLayer("CRUISE_VEHICLES");
        this.getNetCarList();
      }

      this.vehiclesInfoList.push(vehicleType);
      if (this.vehiclesInfoList.length > 1) {
        let list = this.vehiclesInfoList;
        if (list[0] == list[1] && list[0] == "115" && this.qk6Active != "") {
          vehicleType = "";
          this.qk6Active = "";
          this.isLoadVehicleType = true;
          tmap.removeLayer("NETABOUT_VEHICLES");
          this.getBusList(); //公交
          this.getTaxiVehicleList(); //巡游
          this.getNetCarList(); //网约
          this.getVehicleListOf(2); //lkyw
          this.vehicleInOutShow = true;
          this.in_out_title_name = "两客一危出入域情况[辆]";
          this.vehicleRange_title_name = "车辆排名[辆]";
        } else if (
          list[0] == list[1] &&
          list[0] == "115" &&
          this.qk6Active == ""
        ) {
          //当连续点击同一个车辆类型3次时
          this.isLoadVehicleType = false;
          this.qk6Active = "background-color: rgb(14, 41, 104);";
          tmap.removeLayer("WXPC_VEHICLES");
          tmap.removeLayer("LYBC_VEHICLES");
          tmap.removeLayer("BXKY_VEHICLES");
          tmap.removeLayer("NETABOUT_VEHICLES");
          tmap.removeLayer("BUS_VEHICLES");
          tmap.removeLayer("CRUISE_VEHICLES");
          this.getNetCarList();
        } else if (list[0] != list[1] && list[0] != "115") {
          this.isLoadVehicleType = false;
          this.qk6Active = "background-color: rgb(14, 41, 104);";
        }
        this.vehiclesInfoList.shift();
      } else if (this.vehiclesInfoList.length == 1) {
        this.isLoadVehicleType = false;
        this.qk6Active = "background-color: rgb(14, 41, 104);";
        // if(this.isstatus == 0){
        //     console.log(1111);
        //     // this.getisVehicleGPS(vehicleType,areaType)
        // }else if(this.isstatus == 1){
        //     console.log(2222);
        // }else if(this.isstatus == 2){
        // tmap.removeLayer("WXPC_VEHICLES");
        // tmap.removeLayer("LYBC_VEHICLES");
        // tmap.removeLayer("BXKY_VEHICLES");
        // tmap.removeLayer("NETABOUT_VEHICLES");
        // tmap.removeLayer("BUS_VEHICLES");
        // tmap.removeLayer("CRUISE_VEHICLES");
        // this.getNetCarList();
        // }
      }
      this.qk1Active = "";
      this.qk2Active = "";
      this.qk3Active = "";
      this.qk4Active = "";
      this.qk5Active = "";
      this.getVehiclesInfo(vehicleType, areaType);
      // this.getVehiclesStatus(vehicleType);
      if (vehicleType == "") {
        this.getVehiclesStatus(null, this.isLoadVehicleType);
      } else {
        this.getVehiclesStatus(vehicleType, this.isLoadVehicleType);
      }
      //控制出入域网约车
      this.getVehicleInOutNumByTaxiOrNetCar(vehicleType);
    },
    realtimeBroadcast() {
      this.$router.push({
        name: "carAlarm"
      });
    },
    setVehiclesDisable() {
      //将巡游出租、网约出租、公交出租置空置灰
      let gj = this.$refs.gj;
      let wy = this.$refs.wy;
      let xy = this.$refs.xy;

      //隐藏出租网约
      gj.style.pointerEvents = "none";
      gj.style.filter = "grayscale(1)";

      wy.style.pointerEvents = "none";
      wy.style.filter = "grayscale(1)";

      xy.style.pointerEvents = "none";
      xy.style.filter = "grayscale(1)";

      this.taxiShow = false;
    },
    setVehiclesEnable() {
      let gj = this.$refs.gj;
      let wy = this.$refs.wy;
      let xy = this.$refs.xy;

      //隐藏出租网约
      gj.style.pointerEvents = "auto";
      gj.style.filter = "none";

      wy.style.pointerEvents = "auto";
      wy.style.filter = "none";

      xy.style.pointerEvents = "auto";
      xy.style.filter = "none";

      this.taxiShow = true;
    }
  },
  data() {
    return {
      ishide: false,
      isType: "",
      isstatus: 0,
      in_out_title_name: "两客一危出入域情况[辆]",
      vehicleRange_title_name: "车辆排名[辆]",
      currentLevel: 5, //默认层级是5，全国
      isshowhide: false,
      vehicleNo: "",
      vehicleAllNum: 0,
      firstLoad: false, //初次加载
      qk1Active: "",
      qk2Active: "",
      qk3Active: "",
      qk4Active: "",
      qk5Active: "",
      qk6Active: "",
      aInNum: 0,
      aOutNum: 0,
      chuanInNum: 0,
      taxiOutNum: 0,
      onlineOutNum: 0,
      taxiShow: false,
      vehicleInOutShow: false,
      isLoadVehicleType: true,
      // radio_selectRange : "0",   //选择范围默认全国
      in_out_picture_url: require("./img/in_out.png"),
      picUrls_bcky: require("./img/bcky.png"),
      picUrls_bxky: require("./img/bxky.png"),
      picUrls_whys: require("./img/whys.png"),
      picUrls_gjys: require("./img/gjys.png"),
      picUrls_xycz: require("./img/xycz.png"),
      picUrls_wycz: require("./img/wycz.png"),
      selectRangeItemList: [
        { code: "0", value: "全国" },
        { code: "1", value: "四川" },
        { code: "2", value: "成都" }
      ],
      selectRangeItem: 0,
      bxky: 0,
      bcky: 0,
      whys: 0,
      gjys: 0,
      xycz: 0,
      wycz: 0,
      // vehiclesInfoList:['111'],
      vehiclesInfoList: [], //默认不选中任何车辆类型
      itemTagList: [
        { code: 1, value: "企业车辆查询" },
        { code: 2, value: "区域车辆查询" }
      ],
      sidebarMenuShow: false,
      vehiclesAlarmNum: 2,
      vehicleRangeTableData1: [],
      isShow: false,
      itemList: [],
      range: {},
      mapLegend: {
        list: [
          {
            color: "#2056DDFF",
            name: "班线客运" // 圖例名字
          },
          {
            color: "#01AF50FF",
            name: "旅游包车"
          },
          {
            color: "#FF0000FF",
            name: "危险品车"
          },
          {
            color: "#00B4FFFF",
            name: "公交运输"
          },
          {
            color: "#005811FF",
            name: "巡游出租"
          },
          {
            color: "#FFFF01FF",
            name: "网约出租"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@mixin flexLayOut {
  position: relative;
  display: flex;
  flex-direction: column;
}
@mixin in-out-itemSet {
  width: 94px;
  height: 55px;
  border: 2px solid rgba(32, 86, 221, 0.4);
  border-radius: 4px;
  background-color: rgba(32, 86, 221, 0.4);
  @include v-center;
  span {
    font-size: 14px;
  }
  p {
    margin-top: 6px;
    color: #00ffff;
    span {
      font-size: 24px;
    }
  }
}
.vehicles-operate-query-container {
  display: flex;
  height: 100%;
  // width: 100%;
  position: relative;
  // .vehicleInfo{
  //     padding-bottom: 10px;
  // }
  .vehicleInOut {
    padding-bottom: 10px;
  }

  .vehicle-in-out {
    float: left;
    margin-top: 5px;
    margin-left: 5px;
    width: 98%;
    table {
      width: 100%;
      height: 66px;
      tr {
        th {
          color: rgba(255, 255, 255, 0.6);
          font-size: 16px;
          font-weight: normal;
          vertical-align: middle;
        }
        td {
          text-align: center;
          font-size: 36px;
          font-weight: bold;
          color: #00ffff;
          letter-spacing: 2px;
          vertical-align: bottom;
          font-family: "datafont";
          animation: turn 8s ease-in-out infinite;
        }
      }
    }
    // .vehicle-in-out-left{
    //     width:32%;
    //     float: left;
    //     .item-top{
    //         margin-top: 0.12rem;
    //         float: left;
    //         @include in-out-itemSet;
    //     }
    //     .item-bottom{
    //         margin-top: 0.2rem;
    //         float: left;
    //         @include in-out-itemSet;
    //     }
    // }
    // .vehicle-in-out-center{
    //     width:35%;
    //     float: left;
    //     img{
    //             margin-top: 10px;
    //             max-width: 100%;
    //             max-height: 100%;
    //             display:inline-block;
    //     }
    // }
    // .vehicle-in-out-right{
    //     width:32%;
    //     float: left;
    //     margin-left: -5px;
    //     .item-top{
    //         margin-top: 0.12rem;
    //         float: right;
    //         @include in-out-itemSet;
    //     }
    //     .item-bottom{
    //         // @include itemSet;
    //         margin-top: 0.2rem;
    //         float: right;
    //         @include in-out-itemSet;
    //     }
    // }
  }
  .rangeTable {
    .real-time-traffic-flow-wrap {
      overflow-x: hidden;
      overflow-y: auto;
      .table-list {
        .el-table--scrollable-x {
          .el-table__body-wrapper {
            overflow-x: hidden;
          }
        }
      }
    }
  }
  .ChangeEchar-wrapper {
    // margin-left: 10px;
    margin-bottom: 20px;
    width: 180px;
  }
  .hbgk {
    // background: url('./img/zhjc_hb_bg.png') no-repeat;
    background-size: 203px 118px;
    margin-left: -10px;
    .part {
      display: flex;
      /*height: 50%;*/
      justify-content: space-evenly;
      .item {
        @include allCenter;
        flex-direction: column;
        text-align: center;
        width: 110px;
        height: 130px;
        // border:2px solid rgba(32,86,221,.4);
        border-radius: 4px;
        padding-bottom: 10px;
        cursor: pointer;
        // background-color: rgba(32, 86, 221, .4);
        h2 {
          width: 100%;
        }
        p {
          width: 100%;
          color: #ffffff;
          // color: rgb(239, 252, 116);
          // color:#00FFFF;
          // color: #ead72c;
          font-size: 24px;
          // font-size:18px ;
          // font-weight: bold;
          margin: 20px 0px 5px;
        }
        span {
          // color:#00FFFF;
          color: rgba(255, 255, 255, 0.6);
          // color:rgb(156,187,215);
          // font-weight: bold;
          font-size: 14px;
        }
      }
      .item:hover {
        background-color: rgba(32, 86, 221, 0.2);
        transition: 0.4s;
        cursor: pointer;
      }
    }
    .first {
      margin-top: 10px;
      align-items: flex-end;
      margin-bottom: 10px;
    }
    .second {
      align-items: flex-start;
      // margin-top: 20px;
      .messageBox-gj {
        width: 110px;
        height: 110px;
        z-index: -999;
      }
    }
  }
  .ssbj {
    width: 100%;
    // margin:10px 0px 0px 10px;
    .ssbj-left {
      width: 20%;
      height: 100%;
      float: left;
      display: block;
      position: relative;
      top: 20%;
      line-height: 1.5;
      span {
        text-align: center;
        font-size: 34px;
        color: rgb(255, 102, 51);
        font-weight: 300;
        font-style: italic;
      }
    }
    .ssbj-right {
      width: 80%;
      // height:100%;
      float: left;
    }
  }
  .full-map {
    height: 100%;
    width: 100%;
    position: absolute;
  }
  .middle-left-top {
    position: absolute;
    top: 40px;
    left: 400px;
    width: 240px;
    margin-top: 10px;
    .el-radio-group {
      .el-radio {
        color: #fff;
        margin-top: 10px;
      }
    }
  }
  .top {
    position: absolute;
    top: 40px;
    left: 50%;
    width: 800px;
    height: 90px;
    border-radius: 16px;
    transform: translateX(-50%);
    justify-content: center;
    .traffic-wrapper {
      display: flex;
      flex-direction: column;
      margin-top: 10px;
      .bj {
        margin: 20px 0;
      }
      .item-wrapper {
        display: flex;
        justify-content: space-around;
        .status {
          width: 50px;
          margin-top: 20px;
          span {
            font-size: 18px;
            font-weight: bold;
          }
        }
        .item {
          width: 110px;
          height: 70px;
          border: 2px solid rgba(32, 86, 221, 0.4);
          border-radius: 8px;
          background-color: rgba(32, 86, 221, 0.4);
          .section {
            p {
              font-size: 12px;
              color: #ea1c2f;
            }
          }
          @include v-center;
          h2 {
            font-size: 14px;
          }
          p {
            margin-top: 6px;
            font-size: 18px;
            color: #ead72c;
            span {
              font-size: 14px;
            }
          }
        }
      }
      .data-time {
        p {
          color: #00ff00;
        }
      }
    }
  }
  .vehicles-query {
    margin-right: 10px;
  }
}
</style>
<style lang="css" scoped>
.rangeTable >>> .el-table__body-wrapper {
  overflow-x: hidden;
}
.realtimeBroadcost >>> .PanelContent-wrap {
  overflow-x: hidden;
}
.vehicles-query >>> .el-tabs__header {
  /* border-bottom: 1px solid #0C4AC8 !important; */
  margin: 0 0 10 !important;
}
.vehicles-query >>> .el-tabs__content .colItem {
  width: 100%;
  margin-left: 0 !important;
  margin-top: 8px;
}
.vehicles-query >>> .el-tabs__content .colItem + .button-wrap {
  /* width: 100%;
        margin-left: 0 !important; */
  margin-top: 8px;
}
.vehicles-query >>> .el-tabs__content .colItem + .button-wrap .button {
  flex: 1;
  text-align: right;
  align-self: center;
  margin-right: 5px;
}
.vehicles-query >>> .el-tabs__content .table-content {
  height: calc(100% - 160px);
}
/* .vehicles-query >>> .el-tabs__content {
        border:solid 2px #1b49b7 !important;
        border-top-style: none !important; 
    }
    .vehicles-query >>> .el-tabs__nav{
        border: 2px solid #0E4CCA !important;
        border-bottom-style: none !important; 
    }
    .vehicles-query >>> .el-tabs__item{
        border-left: 1px solid #0E4CCA;
    }
    .vehicles-query >>> .el-tabs__content .el-tabs__item {
        border-left-style: none;          
    }
    .vehicles-query >>> .el-tabs__content .el-tabs__nav{
        border-style: none !important;
    }  */
</style>