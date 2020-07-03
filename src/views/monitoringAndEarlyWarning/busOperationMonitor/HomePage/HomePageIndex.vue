<template>
  <div class="homepage-wrapper">
    <BaseLayoutContent>
      <template #leftPanel>
        <div class="panel-wrapper left">
          <div class="left-content">
            <div class="item item1" @click="activeXW" :class="{active:activeNo==1}"  >公交线网(<span>{{busLineInternet}}</span>)</div>
            <div class="item" @click="activeZD" :class="{active:activeNo==2}">公交站点(<span>{{busStation}}</span>)</div>
            <div class="item item3" @click="activeCL" :class="{active:activeNo==3}">在线车辆(<span>{{onLineBus}}</span>)</div>
          </div>
        </div>
      </template>
      <template #midContent>
        <div class="testmap">
          <Basemap></Basemap>
          <div class="top">
            <!--<div class="lineDetail-wrap">
                <div class="lineDetail-inner">
                    <verticesBorderStyle></verticesBorderStyle>
                    <table>
                        <tr>
                            <th>今日公交客流</th>
                            <td>
                                {{personNum}}
                                <span class="unit">万</span>
                            </td>
                        </tr>
                        <tr>
                            <th>公交线路</th>
                            <td>
                            {{busLineInternet}}
                            <span class="unit">条</span>
                            </td>
                        </tr>
                        <tr>
                            <th>公交车辆</th>
                            <td>
                            {{busVehicle}}
                            <span class="unit">辆</span>
                            </td>
                        </tr>
                        <tr>
                            <th width="40%">公交驾驶员</th>
                            <td width="60%">
                            {{busDriver}}
                            <span class="unit">人</span>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>-->
            <div class="er">
              <ul class="zhu1">
                <!--                              <li>-->
                <!--          						<span >-->
                <!--          						 <h3 class="mi">企业数量</h3>-->
                <!--          						<h3 class="mi1">{{busEnterprise}}</h3>-->
                <!--          						<h3 class="mi2">家</h3>-->
                <!--          						</span>-->
                <!--                              </li>-->
                <li>
            <span>
              <h3 class="mi">今日公交客流</h3>
              <h3 class="mi1">{{personNum}}</h3>
              <h3 class="mi2">万</h3>
            </span>
                </li>
                <li>
            <span>
              <h3 class="mi">公交线路</h3>
              <h3 class="mi1">{{busLineInternet}}</h3>
              <h3 class="mi2">条</h3>
            </span>
                </li>
                <li>
            <span>
              <h3 class="mi">公交车辆</h3>
              <h3 class="mi1">{{busVehicle}}</h3>
              <h3 class="mi2">辆</h3>
            </span>
                </li>
                <!--                              <li>-->
                <!--          						<span >-->
                <!--          						 <h3 class="mi">公交从业人员</h3>-->
                <!--          						<h3 class="mi1">{{busPerson}}</h3>-->
                <!--          						<h3 class="mi2">人</h3>-->
                <!--          						</span>-->
                <!--                              </li>-->
                <li>
            <span id="tong">
              <h3 class="mi">公交驾驶员</h3>
              <h3 class="mi1">{{busDriver}}</h3>
              <h3 class="mi2">人</h3>
            </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="top2">
            <ul class="data_box" v-if="activeNo==1">
              <!--                <li>-->
              <!--                    <span class="data_name">公交线路<span class="cut_s">|</span>客流</span>-->
              <!--                    <div class="layer_cont">-->
              <!--                        <div class="data_left"></div>-->
              <!--                        <div class="data_right"></div>&lt;!&ndash;亮色边角&ndash;&gt;-->
              <!--                        <div class="data data_bg">-->
              <!--                            <span class="blue_data">{{busLineInternet}}</span>-->
              <!--                            <span class="unit">条</span>-->
              <!--                            <span class="cut">|</span>-->
              <!--                            <span class="yellow">{{personNum}}</span>-->
              <!--                            <span class="unit">万人次</span>-->
              <!--                        </div>-->
              <!--                    </div>-->
              <!--                </li>-->
              <li @click="activeQuick">
          <span class="data_name">
            快线
            <span class="cut_s">|</span>客流
          </span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">{{quickLine}}</span>
                    <span class="unit">条</span>
                    <span class="cut">|</span>
                    <span class="blue_data">
                <count-to :startVal="0" :endVal="quickLinePerson" :duration="4000" />
              </span>
                    <span class="unit">人次</span>
                  </div>
                </div>
              </li>
              <li @click="activeMain">
          <span class="data_name">
            干线
            <span class="cut_s">|</span>客流
          </span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">{{mainLine}}</span>
                    <span class="unit">条</span>
                    <span class="cut">|</span>
                    <span class="blue_data">
                <count-to :startVal="0" :endVal="mainLinePerson" :duration="4000" />
              </span>
                    <span class="unit">人次</span>
                  </div>
                </div>
              </li>
              <li @click="activeRegional">
          <span class="data_name">
            支线
            <span class="cut_s">|</span>客流
          </span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">{{regionalLine}}</span>
                    <span class="unit">条</span>
                    <span class="cut">|</span>
                    <span class="blue_data">
                <count-to :startVal="0" :endVal="regionalLinePerson" :duration="4000" />
              </span>
                    <span class="unit">人次</span>
                  </div>
                </div>
              </li>
              <li @click="activeMicro">
          <span class="data_name">
            微线
            <span class="cut_s">|</span>客流
          </span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">{{microLine}}</span>
                    <span class="unit">条</span>
                    <span class="cut">|</span>
                    <span class="blue_data">
                <count-to :startVal="0" :endVal="microLinePerson" :duration="4000" />
              </span>
                    <span class="unit">人次</span>
                  </div>
                </div>
              </li>
              <li @click="activeOther">
          <span class="data_name">
            特色
            <span class="cut_s">|</span>客流
          </span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">{{busLineOther}}</span>
                    <span class="unit">条</span>
                    <span class="cut">|</span>
                    <span class="blue_data">
                <count-to :startVal="0" :endVal="personNumOther" :duration="4000" />
              </span>
                    <span class="unit">人次</span>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="data_box" v-if="activeNo==2">
              <li @click="activeBusHub">
                <span class="data_name">公交枢纽站</span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">{{hubStationNum}}</span>
                    <span class="unit">个</span>
                  </div>
                </div>
              </li>
              <li @click="activeBusStation">
                <span class="data_name">公交站点</span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">{{busStation}}</span>
                    <span class="unit">个</span>
                  </div>
                </div>
              </li>
              <li @click="activeRate300m">
                <span class="data_name">300米覆盖率</span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">82.8</span>
                    <span class="unit">%</span>
                  </div>
                </div>
              </li>
              <li @click="activeRate500m">
                <span class="data_name">500米覆盖率</span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">99.56</span>
                    <span class="unit">%</span>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="data_box" v-if="activeNo==3">
              <!--                <li>-->
              <!--                    <span class="data_name">在线车辆</span>-->
              <!--                    <div class="layer_cont">-->
              <!--                        <div class="data_left"></div>-->
              <!--                        <div class="data_right"></div>&lt;!&ndash;亮色边角&ndash;&gt;-->
              <!--                        <div class="data data_bg">-->
              <!--                            <span class="blue_data">{{onLineBus}}</span>-->
              <!--                            <span class="unit">辆</span>-->

              <!--                        </div>-->
              <!--                    </div>-->
              <!--                </li>-->
              <li @click="activeBusDD">
                <span class="data_name">电动公交车</span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">{{ddBus}}</span>
                    <span class="unit">辆</span>
                  </div>
                </div>
              </li>
              <li @click="activeBusCNG">
                <span class="data_name">CNG</span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">{{cngBus}}</span>
                    <span class="unit">辆</span>
                  </div>
                </div>
              </li>
              <li @click="activeBusLNG">
                <span class="data_name">混合动力</span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">{{hhBus}}</span>
                    <span class="unit">辆</span>
                  </div>
                </div>
              </li>
              <li @click="activeBusDiesel">
                <span class="data_name">柴油</span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">{{cyBus}}</span>
                    <span class="unit">辆</span>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="data_box" v-if="activeNo==5">
              <li @click="activeZYD">
          <span class="data_name">
            公交专用道条数
            <span class="cut_s">|</span>长度
            <span class="cut_s">|</span>车速
          </span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">{{busLane}}</span>
                    <span class="unit">条</span>
                    <span class="cut">|</span>
                    <span class="blue_data">{{busLaneLength}}</span>
                    <span class="unit">公里</span>
                    <span class="cut">|</span>
                    <span class="blue_data">{{busLaneSpeed}}</span>
                    <span class="unit">km/h</span>
                  </div>
                </div>
              </li>
              <li @click="activeLaneQuick">
          <span class="data_name">
            双向全天候
            <span class="cut_s">|</span>长度
            <span class="cut_s">|</span>车速
          </span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">{{busLaneQuick}}</span>
                    <span class="unit">条</span>
                    <span class="cut">|</span>
                    <span class="blue_data">{{busLaneQuickLen.toFixed(3)}}</span>
                    <span class="unit">公里</span>
                    <span class="cut">|</span>
                    <span class="blue_data">{{busLaneQuickSpeed}}</span>
                    <span class="unit">km/h</span>
                  </div>
                </div>
              </li>
              <li @click="activeLaneOneway">
          <span class="data_name">
            单向全天候
            <span class="cut_s">|</span>长度
            <span class="cut_s">|</span>车速
          </span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">{{busLaneOneway}}</span>
                    <span class="unit">条</span>
                    <span class="cut">|</span>
                    <span class="blue_data">{{busLaneOnewayLen.toFixed(3)}}</span>
                    <span class="unit">公里</span>
                    <span class="cut">|</span>
                    <span class="blue_data">{{busLaneOnewaySpeed}}</span>
                    <span class="unit">km/h</span>
                  </div>
                </div>
              </li>
              <li @click="activeLaneDay">
          <span class="data_name">
            白天时段
            <span class="cut_s">|</span>长度
            <span class="cut_s">|</span>车速
          </span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">{{busLaneDay}}</span>
                    <span class="unit">条</span>
                    <span class="cut">|</span>
                    <span class="blue_data">{{busLaneDayLen.toFixed(3)}}</span>
                    <span class="unit">公里</span>
                    <span class="cut">|</span>
                    <span class="blue_data">{{busLaneDaySpeed}}</span>
                    <span class="unit">km/h</span>
                  </div>
                </div>
              </li>
              <li @click="activeLanePeak">
          <span class="data_name">
            高峰时段
            <span class="cut_s">|</span>长度
            <span class="cut_s">|</span>车速
          </span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">{{busLanePeak}}</span>
                    <span class="unit">条</span>
                    <span class="cut">|</span>
                    <span class="blue_data">{{busLanePeakLen.toFixed(3)}}</span>
                    <span class="unit">公里</span>
                    <span class="cut">|</span>
                    <span class="blue_data">{{busLanePeakSpeed}}</span>
                    <span class="unit">km/h</span>
                  </div>
                </div>
              </li>
              <li @click="activeLaneTide">
          <span class="data_name">
            潮汐
            <span class="cut_s">|</span>长度
            <span class="cut_s">|</span>车速
          </span>
                <div class="layer_cont">
                  <div class="data_left"></div>
                  <div class="data_right"></div>
                  <!--亮色边角-->
                  <div class="data data_bg">
                    <span class="blue_data">{{busLaneTide}}</span>
                    <span class="unit">条</span>
                    <span class="cut">|</span>
                    <span class="blue_data">{{busLaneTideLen.toFixed(3)}}</span>
                    <span class="unit">公里</span>
                    <span class="cut">|</span>
                    <span class="blue_data">{{busLaneTideSpeed}}</span>
                    <span class="unit">km/h</span>
                  </div>
                </div>
              </li>



            </ul>
          </div>
        </div>
        <div>
          <div class="bottom" v-if="activeNo==1">
            <div style="width:100%;height:100%" v-if="activeLineTOP==0">
              <v-chart :options="option" :autoresize="true"></v-chart>
            </div>
            <div style="width:100%;height:100%" v-if="activeLineTOP==1">
              <v-chart :options="quickLineOption" :autoresize="true"></v-chart>
            </div>
            <div style="width:100%;height:100%" v-if="activeLineTOP==2">
              <v-chart :options="mainLineOption" :autoresize="true"></v-chart>
            </div>
            <div style="width:100%;height:100%" v-if="activeLineTOP==3">
              <v-chart :options="regionalLineOption" :autoresize="true"></v-chart>
            </div>
            <div style="width:100%;height:100%" v-if="activeLineTOP==4">
              <v-chart :options="microLineOption" :autoresize="true"></v-chart>
            </div>
            <div style="width:100%;height:100%" v-if="activeLineTOP==5">
              <v-chart :options="otherLineOption" :autoresize="true"></v-chart>
            </div>
          </div>
          <div class="bottom" v-if="activeNo==2&&activeStationNo==1">
            <div style="width:100%;height:100%" v-if="activeStationNo==1">
              <v-chart :options="topStationOption" :autoresize="true"></v-chart>
            </div>
          </div>
          <div class="bottom" v-if="activeNo==4">
            <div style="width:100%;height:100%">
              <div class="title">{{xzqhName}}<span>({{lineNum}})</span></div>
              <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="item in busTopicToCityLineList">
                  <div  class="line_content">
                    <ul>
                      <li class="gjLineName"><span>{{item.lineName}}</span></li>
                      <li>{{item.startStationName}}-{{item.endStationName}}</li>
                      <li>全长 {{item.lineLen}}公里</li>
                      <li>客流 {{item.personNum}} 人次</li>
                    </ul>
                  </div>
                </swiper-slide>

                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </swiper>
            </div>

          </div>
          <div class="bottom" v-if="activeNo==5">
            <div style="width:100%;height:100%">
              <v-chart :options="laneSpeedOption" :autoresize="true"></v-chart>
            </div>
            <!--        <div class="timeSelect">-->
            <!--          <SearchPanel :searchConfig="searchConfig2" @getSearchValue="getSearchValueSelf"></SearchPanel>-->
            <!--        </div>-->
          </div>
          <div class="bottom" v-if="activeNo==6">
            <div style="width:100%;height:100%">
              <v-chart :options="busMetroOption" :autoresize="true"></v-chart>
            </div>
          </div>
        </div>

        <div class="mapLegend" v-if="activeNo==1">
          <MapLegend :mapLegend="mapLegend" />
        </div>
        <div class="mapLegend" v-if="activeNo==2">
          <MapLegend :mapLegend="mapLegendStation" />
        </div>
        <div class="mapLegend" v-if="activeNo==3">
          <MapLegend :mapLegend="mapLegendOnline" />
        </div>
        <div class="mapLegend" v-if="activeNo==5">
          <MapLegend :mapLegend="mapLegendLane" />
        </div>
        <div class="busMetro-wrap" v-if="showBusMetro">
          <!-- 线路详情 -->
          <!-- <span class="close" @click="close">x</span> -->
          <i class="el-icon-close close" @click="closeBusMetroDetail"></i>
          <div class="content-radius top-left"></div>
          <div class="content-radius bottom-right"></div>
          <div class="content-radius top-right"></div>
          <div class="content-radius bottom-left"></div>

          <div class="busMetro-inner">
            <table>
              <tr>
                <th>地铁站点名称:</th>
                <td class="station_name">{{busMetroStationName}}</td>
              </tr>
              <tr>
                <th>换乘客流人数:</th>
                <td>
                  <!--                            <count-to :startVal="0" :endVal="content.mileage" :duration="2000" />-->
                  {{busMetroPersonNum}}
                  <span class="unit">人次</span>
                </td>
              </tr>
              <tr>
                <th>50米线路|站点数量:</th>
                <td>
                  {{lineNum50m}} | {{stationNum50m}}
                  <!--<span class="unit">%</span>-->
                </td>
              </tr>
              <tr>
                <th width="50%">100米线路|站点数量:</th>
                <td width="50%">
                  {{lineNum100m}} | {{stationNum100m}}
                  <!--                            <count-to :startVal="0" :endVal="content.linePassengerFlow" :duration="4000" />-->
                  <!--                            <span class="unit">人次</span>-->
                </td>
              </tr>
              <tr>
                <th>150米线路|站点数量:</th>
                <td>
                  {{lineNum150m}} | {{stationNum150m}}
                  <!--                            {{content.passengerFlowProp}}-->
                  <!--                            <span class="unit">%</span>-->
                </td>
              </tr>
            </table>
          </div>
        </div>
      </template>
      <template #rightPanel>
        <div class="panel-wrapper right">
          <div class="right-content">
            <div class="item item1" @click="activeZL" :class="{active:activeNo==4}">交通走廊(<span>{{channel}}</span>)</div>
            <div class="item" @click="activeZYD" :class="{active:activeNo==5}">公交专用道(<span>{{busLane}}</span>)</div>
            <div class="item item3" @click="activeHC" :class="{active:activeNo==6}">换乘地铁出行(<span>{{busMetro}}</span>)</div>
          </div>
        </div>
      </template>
    </BaseLayoutContent>

  </div>
</template>

<script>
import echarts from "echarts";
import $ from "jquery";
export default {
  name: "",
  // computed: {
  //   swiper() {
  //     return this.$refs.mySwiper.$swiper;
  //   }
  // },
  mounted() {
    this.getData();
    tmap.addLayer("BUS_LINE").loadData(); //加载路线图层
    window.getBaseInfoHtml = this.getBaseInfoHtml;
    window.showDetail = this.showDetail;
    window.showBusMetroInfo = this.showBusMetroInfo;
    this.autohand = setInterval(() => {
      this.getData();
    }, 5 * 60 * 1000);
  },
  methods: {
    showDetail(data) {
      //显示途经线路的详细数据
      if (document.getElementById("xq_" + data).style.display == "block") {
        document.getElementById("xq_" + data).style.display = "none";
      } else {
        document.getElementById("xq_" + data).style.display = "block";
      }
    },
     getBaseInfoHtml (type, data, feaCoordinate, titleText, width, height) {
      //重写omap 的getBaseInfoHtml 方法
      var content = "";
      if (type.indexOf("BUS_LINE") !== -1) {
        // sessionStorage.setItem("stationId",data.station_id);
        var busLineData = {};
        for (var i = 0; i < this.gjBusLineInternetList.length; i++) {
          if (this.gjBusLineInternetList[i].lineId == data.name) {
            busLineData = this.gjBusLineInternetList[i];
            break;
          }
        }
        var title = [
          { display: "线路名称", name: "lineName", colspan: 3 },
          { display: "起点站", name: "lineStartName", colspan: 3 },
          { display: "终点站", name: "lineEndName", colspan: 3 },
          { display: "线路长度", name: "lineLen", colspan: 3 },
          { display: "线路类型", name: "lineType", colspan: 3 },
          { display: "乘客数", name: "personNum", colspan: 3 }
        ];
        content = [
          {
            name: "详细信息",
            content: window.creatInfoHtml(title, busLineData, 2)
          }
        ];
      }
      else if (type.indexOf("BUS_STATION") !== -1||type.indexOf("BUS_HUB_STATION")!==-1) {
        //公交站点
        var busStationData = {};
        var stationId=data.station_id;
        // for (var i = 0; i < this.busTopicStationList.length; i++) {
        //   if (this.busTopicStationList[i].stationId == data.station_id) {
        //     busStationData = this.busTopicStationList[i];
        //     break;
        //   }
        // };
        var title = [
          { display: "站点名称", name: "stationName", colspan: 3 },
          { display: "乘客数", name: "personNum", colspan: 3 },
          {
            display: "站点类型",
            name: "stationType",
            colspan: 3,
            // render: function(data, index, value) {
            //   if (value === "1") {
            //     return "首末站";
            //   } else {
            //     return "中间站";
            //   }
            // }
          },
          { display: "途经线路条数", name: "lineNumber", colspan: 3 },
          { display: "途经线路", name: "lines", colspan: 3 },

        ];
        $.ajax({
          url:'http://192.167.252.246:8088/p/tocc/irest/base/gjjc_busTopicInfo/getBusStationInfoById',
          type:'POST', //GET
          async:false,    //或false,是否异步
          data:{
            stationId:stationId
          },
          timeout:20000,    //超时时间
          dataType:'json',    //返回的数据格式：
          beforeSend:function(xhr){
          },
          success:function(data,textStatus,jqXHR){
            debugger;
            busStationData=data.data;
            var lineNumber=0, lines="";
            var busTopicStationLineList=data.data.busTopicStationLineList;
            if(busTopicStationLineList!=null&&busTopicStationLineList.length>0){
              lineNumber=busTopicStationLineList.length;
              busTopicStationLineList.forEach(e=>{
                lines+=e.lineName+",";
              })

            }
            busStationData.lineNumber=lineNumber;
            busStationData.lines=lines.substr(0,lines.length-1);
            content = [
              {
                name: "详细信息",
                content: window.creatInfoHtml(title, busStationData, 2)
              }
            ];
            // return content;
          },
          error:function(xhr,textStatus){
          },
          complete:function(){
          }
        })
        //  this.$http.$get("gjjc_busTopicInfo/getBusStationInfoById",{stationId:data.station_id}).then(param => {
        //  debugger;
        //   content = [
        //     {
        //       name: "详细信息",
        //       content: window.creatInfoHtml(title, busStationData, 2)
        //     }
        //   ];
        //   return content;
        // });

      }
      else if (type.indexOf("BUS_ONLINE") !== -1) {
        //在线车辆
        var busOnlineData = {};
        var vehicleId=data.name;
        // for (var i = 0; i < this.busTopicOnLineBusList.length; i++) {
        //   if (this.busTopicOnLineBusList[i].vehicleId == data.name) {
        //     busOnlineData = this.busTopicOnLineBusList[i];
        //     break;
        //   }
        // }
        var title = [
          { display: "车牌号", name: "vehiclePlateNum", colspan: 3 },
          { display: "所属公司", name: "enterpriseName", colspan: 3 },
          { display: "运行线路", name: "lineName", colspan: 3 },
          // { display: "纬度", name: "latitude", colspan: 3 },
          // { display: "经度", name: "longitude", colspan: 3 }
        ];
        $.ajax({
          url:'http://192.167.252.246:8088/p/tocc/irest/base/gjjc_busTopicInfo/getBusOnLineVehicleInfoById',
          type:'POST', //GET
          async:false,    //或false,是否异步
          data:{
            vehicleId:vehicleId
          },
          timeout:20000,    //超时时间
          dataType:'json',    //返回的数据格式：
          beforeSend:function(xhr){
          },
          success:function(data,textStatus,jqXHR){
            debugger;
            busOnlineData=data.data;
            var stationcontent=""
            var busTopicStationList=data.data.busTopicStationList;
            if(busTopicStationList!=null&&busTopicStationList.length>0){
              busTopicStationList.forEach(e=>{
                if(e.personNum==null) e.personNum=0;
                stationcontent+="<tr><td></td><td class=\"map-infowindow-title\" style=\"width:200px;\">"+e.stationName+"：</td><td class=\"map-infowindow-content tab_cont_name\" colspan=\"2\">"+e.personNum+"</td></tr>";
              })

            }
          var tableStation='<table class="map-infowindow-table">' + stationcontent + '</table>';
            content = [
              {
                name: "详细信息",
                content: window.creatInfoHtml(title, busOnlineData, 2)
              },
              {
                name: "线路站点信息",
                height:200,
                content: tableStation
              }
            ];
            // return content;
          },
          error:function(xhr,textStatus){
          },
          complete:function(){
          }
        })
        // content = [
        //   {
        //     name: "详细信息",
        //     content: window.creatInfoHtml(title, busOnlineData, 2)
        //   },{
        //     name:"test",
        //     content:"<table class=\"map-infowindow-table\"><tbody><tr><td class=\"map-infowindow-title\" style=\"width:62px;\">车牌号：</td><td class=\"map-infowindow-content tab_cont_name\" colspan=\"3\">川AQ3796</td></tr><tr><td class=\"map-infowindow-title\" style=\"width:89px;\">速度(km/h)：</td><td class=\"map-infowindow-content\" colspan=\"3\">4.932</td></tr><tr><td class=\"map-infowindow-title\" style=\"width:49px;\">纬度：</td><td class=\"map-infowindow-content\" colspan=\"3\">30.642206</td></tr><tr><td class=\"map-infowindow-title\" style=\"width:49px;\">经度：</td><td class=\"map-infowindow-content\" colspan=\"3\">104.053063</td></tr></tbody></table>"
        //   }
        // ];
      }
      else if (type.indexOf("BUS_SPECIAL") !== -1) {
        //专用道
        var busLaneId=data.id;
        var busLaneData = {};
        // for (var i = 0; i < this.busTopicBusLaneList.length; i++) {
        //   if (this.busTopicBusLaneList[i].busLaneId == data.id) {
        //     busLaneData = this.busTopicBusLaneList[i];
        //     break;
        //   }
        // }
        var title = [
          { display: "专用道名称", name: "busLaneName", colspan: 3 },
          { display: "起点名称", name: "startName", colspan: 3 },
          { display: "终点名称", name: "endName", colspan: 3 },
          { display: "专用道类型", name: "busType", colspan: 3 },
          { display: "长度(km)", name: "length", colspan: 3 },
          { display: "速度(km/h)", name: "speed", colspan: 3 },
          { display: "途经线路条数", name: "lineNumber", colspan: 3 },
          { display: "途经线路", name: "lines", colspan: 3 },
        ];
        $.ajax({
          url:'http://192.167.252.246:8088/p/tocc/irest/base/gjjc_busTopicInfo/getBusLaneInfoById',
          type:'POST', //GET
          async:false,    //或false,是否异步
          data:{
            busLaneId:busLaneId
          },
          timeout:20000,    //超时时间
          dataType:'json',    //返回的数据格式：
          beforeSend:function(xhr){
          },
          success:function(data,textStatus,jqXHR){
            debugger;
              busLaneData=data.data;
            var lineNumber=0, lines="";
            var busTopicBusLaneLinelist=data.data.busTopicBusLaneLinelist;
            var arr=[];
            if(busTopicBusLaneLinelist!=null&&busTopicBusLaneLinelist.length>0){
                busTopicBusLaneLinelist.forEach(e=>{
                  arr.push(e.lineName)
                // lines+=e.lineName+",";
              })

            }
            var set = new Set(arr);
            if(set.size>0){
                lineNumber=set.size;
                for (let item of set) {
                    lines+=item+",";
                }
            }

              busLaneData.lineNumber=lineNumber;
              busLaneData.lines=lines.substr(0,lines.length-1);
            content = [
              {
                name: "详细信息",
                content: window.creatInfoHtml(title, busLaneData, 2)
              }
            ];
            // return content;
          },
          error:function(xhr,textStatus){
          },
          complete:function(){
          }
        })
        // content = [
        //   {
        //     name: "详细信息",
        //     content: window.creatInfoHtml(title, busLaneData, 2)
        //   }
        // ];
      }
      else if (type.indexOf("BUS_METRO") !== -1) {
        //公交地铁换乘
        for (var i = 0; i < this.busTopicMetroStationList.length; i++) {
          if (this.busTopicMetroStationList[i].stationName == data.name) {
            this.busMetroDetail(this.busTopicMetroStationList[i]);
            break;
          }
        }
        content = null;
      }
      else {
        content = null;
        console.warn("图层：" + type + "没有配置弹窗展示内容！");
      }
      return content;
    },
    getData() {
      //获取页面数据
      this.$http.$get("gjjc_busTopicInfo/getBusTopicInfo").then(param => {
        //
        this.dealWithBusTopicInfo(param);
      });
      this.$http.$get("gjjc_busTopicInfo/getBusLineInternetInfo") .then(param => {
          //公交线网
          this.dealWithBusLineInternetInfo(param);
        });
      this.$http.$get("gjjc_busTopicInfo/getBusStationInfo").then(param => {
        //公交站点
        this.dealWithBusStationInfo(param);
      });
      this.$http.$get("gjjc_busTopicInfo/getBusOnLineVehicleInfo").then(param => {
          //在线车辆
          this.dealWithBusOnLineVehicleInfo(param);
        });
      this.$http.$get("gjjc_busTopicInfo/getBusToCityCountyList").then(param => {
        //公交走廊
        this.dealWithBusChannelInfo(param);
      });
      this.$http.$get("gjjc_busTopicInfo/getBusLaneInfo").then(param => {
        //公交专用道
        // this.dealWithBusStationInfo(param);
        this.dealWithBusLaneInfo(param);
      });
      this.$http.$get("gjjc_busTopicInfo/getBusMetroInfo").then(param => {
        //公交地铁换乘
        this.dealWithBusMetroInfo(param);
      });

      this.$http.$get("lkfx_busStationCoverRateHandler/getBusStations?isCd6Zone=true")  .then(param => {
          //公交地铁换乘
          // this.dealWithBusStationInfo(param);
          this.stationRate = param;
        });
      this.$http .$get("lkfx_busStationCoverRateHandler/getBusStationCoverRate300").then(param => {
          //300米覆盖率
          this.coverageRate300m = param == null ? 0 : param; //300m覆盖率
        });
      this.$http.$get("lkfx_busStationCoverRateHandler/getBusStationCoverRate500").then(param => {
          //500米覆盖率
          this.coverageRate500m = param == null ? 0 : param; //500m覆盖率
        });
    },
    dealWithBusMetroInfo(data) {
      //处理公交地铁换乘数据
      this.busMetro = data.busMetro == null ? 0 : data.busMetro;
      if (
        data.busTopicMetroStationList &&
        data.busTopicMetroStationList.length > 0
      ) {
        this.busTopicMetroStationList = data.busTopicMetroStationList;
        var top10BusMetroList = [],
          station = [],
          personNum = [];
        var pointData = [];
        var radius = [40, 38, 36, 34, 32, 30, 28, 26, 24, 22];
        for (var i = 0; i < 10; i++) {
          station.push(data.busTopicMetroStationList[i].stationName);
          personNum.push(
            data.busTopicMetroStationList[i].personNum == null
              ? 0
              : data.busTopicMetroStationList[i].personNum
          );
          pointData.push({
            name: data.busTopicMetroStationList[i].stationName,
            value: [
              data.busTopicMetroStationList[i].longitude,
              data.busTopicMetroStationList[i].latitude,
              data.busTopicMetroStationList[i].personNum= null ? 0: data.busTopicMetroStationList[i].personNum,
              radius[i]
            ]
          });
        }
        top10BusMetroList.push(station);
        top10BusMetroList.push(personNum);
        this.busMetroOption = this.creatOption(
          top10BusMetroList,
          "换乘地铁站点客流TOP10",
          "人次",
          0,0
        );
        this.echartoption = this.$utils.echart.getMigrationOption(
          {
            seriesData: {
              pointData: pointData
              // linesData: [res]
            }
          },
          {
            series: [
              {
                label: {
                  normal: {
                    show: true,
                    position: "right",
                    formatter: ["{a|{b}}", "{b|换乘客流 {@[2]} 人次}"].join(
                      "\n"
                    ),
                    rich: {
                      a: {
                        color: "#00ffff",
                        fontSize: this.$utils.setSize(16)
                        // lineHeight: 10
                      },
                      b: {
                        // height: 40
                        padding: [5, 0],
                        color: "#00ffff"
                      },
                      x: {
                        fontSize: this.$utils.setSize(18),
                        borderColor: "#449933",
                        borderRadius: 4
                      }
                    }
                  }
                }
              }
            ]
            // tooltip: {
            //   formatter: function(params, ticket, callback) {
            //     //根据业务自己拓展要显示的内容
            //     if (params.seriesType == "effectScatter") {
            //       var res = "";
            //       var name = params.data.name;
            //       var value = params.data.value[2];
            //       var value2 = params.data.value[3];
            //       res =
            //         "<span style='color:#fff;'>" +
            //         name +
            //         "</span><br/>客流量：" +
            //         value +
            //         "</span><br/>班次数量：" +
            //         value2;
            //       return res;
            //     }
            //   }
            // }
          },
          "换乘客流"
        );
        if (this.activeNo == 6) {
          tmap.removeChart("channelDetail");
          tmap
            .addChart("channelDetail", this.echartoption)
            .$chart.on("click", param => {
              this.showBusMetroTop10(param);
            });
        }
      }
    },
    dealWithBusChannelInfo(data) {
      //处理公交走廊数据
      if (data.busTopicToCityCountyList && data.busTopicToCityCountyList.length > 0) {
        this.channel=data.busTopicToCityCountyList.length;
        this.busTopicChannelList = data.busTopicToCityCountyList;
      }

      if(this.activeNo == 4){
        this.removeZLArea();
        var lq=0,sl=0,tf=0,wj=0,pd=0,xd=0;
        var lqlineNum=0,sllineNum=0,tflineNum=0,wjlineNum=0,pdlineNum=0,xdlineNum=0;

        for(var i=0;i< this.busTopicChannelList.length;i++){
          switch(this.busTopicChannelList[i].districtName){
            case '天府新区':
              tf=this.busTopicChannelList[i].personNum;
              tflineNum=this.busTopicChannelList[i].lineNum;
              break;
            case '龙泉驿区':
              lq=this.busTopicChannelList[i].personNum;
              lqlineNum=this.busTopicChannelList[i].lineNum;
              break;
            case '新都区':
              xd=this.busTopicChannelList[i].personNum;
              xdlineNum=this.busTopicChannelList[i].lineNum;
              break;
            case '温江区':
              wj=this.busTopicChannelList[i].personNum;
              wjlineNum=this.busTopicChannelList[i].lineNum;
              break;
            case '双流区':
              sl=this.busTopicChannelList[i].personNum==null?0:this.busTopicChannelList[i].personNum;
              sllineNum=this.busTopicChannelList[i].lineNum;
              break;
            case '郫都区':
              pd=this.busTopicChannelList[i].personNum;
              pdlineNum=this.busTopicChannelList[i].lineNum;
              break;
          }
        }
        tmap.addChart('zc',this.createPieOption1("主城区",'rgb(12,40,106)'),104.072165,30.663431,{width:180,height:180});
        tmap.addChart('lq',this.createPieOption("龙泉驿",lq,'人次',lqlineNum,'rgb(25,88,217)'),104.269181,30.56065,{width:140,height:140}).$chart.on("click", param => {
          this.getOneAreaData('龙泉驿区');
          // this.showBusMetroTop10(param);
        });
        tmap.addChart('sl',this.createPieOption("双流",sl,'人次',sllineNum,'rgb(25,88,217)'),103.922706,30.573243,{width:140,height:140}).$chart.on("click", param => {
          this.getOneAreaData('双流区');

        });
        tmap.addChart('tf',this.createPieOption("天府新区",tf,'人次',tflineNum,'rgb(25,88,217)'),104.066307,30.491921,{width:140,height:140}).$chart.on("click", param => {
          this.getOneAreaData('天府新区');

        });
        tmap.addChart('wj',this.createPieOption("温江",wj,'人次',wjlineNum,'rgb(25,88,217)'),103.836776,30.697996,{width:140,height:140}).$chart.on("click", param => {
          this.getOneAreaData('温江区');

        });
        tmap.addChart('xd',this.createPieOption("新都",xd,'人次',xdlineNum,'rgb(25,88,217)'),104.16022000,30.82422300,{width:140,height:140}).$chart.on("click", param => {
          this.getOneAreaData('新都区');
        });
        tmap.addChart('pd',this.createPieOption("郫都",pd,'人次',pdlineNum,'rgb(25,88,217)'),103.887842,30.808752,{width:140,height:140}).$chart.on("click", param => {
          this.getOneAreaData('郫都区');
        });
        this.getOneAreaData('龙泉驿区');
        this.addLineArea();//加线
      }
      // this.channel = data.channel == null ? 0 : data.channel; //
    },
    dealWithBusOnLineVehicleInfo(data) {
      //处理在线车辆数据
      this.onLineBus = data.onLineBus == null ? 0 : data.onLineBus; //公交在线车辆数量
      if (
        data.busTopicOnLineBusStatisticList &&
        data.busTopicOnLineBusStatisticList.length > 0
      ) {
        if (this.ddBus != 0) {
          this.ddBus = 0;
          this.cngBus = 0;
          this.hhBus = 0;
          this.cyBus = 0;
        }
        data.busTopicOnLineBusStatisticList.forEach(e => {
          var level = e.vehicleType,
            num = e.vehicleNum == null ? 0 : parseInt(e.vehicleNum);
          if (level == 2 || level == 4) {
            this.ddBus += num;
          } else if (level == 1 || level == 7) {
            this.cngBus += num;
          } else if (level == 3 || level == 5 || level == 6) {
            this.hhBus += num;
          } else if (level == 8) {
            this.cyBus = num;
          }
        });
      }
      if (data.busTopicOnLineBusList && data.busTopicOnLineBusList.length > 0) {
        this.busTopicOnLineBusList = data.busTopicOnLineBusList;
      }

      /*busTopicOnLineBusStatisticList:
                0: {vehicleType: "1", vehicleNum: "3037"}
                1: {vehicleType: "2", vehicleNum: "2609"}
                2: {vehicleType: "3", vehicleNum: "439"}
                3: {vehicleType: "4", vehicleNum: "61"}
                4: {vehicleType: "5", vehicleNum: "30"}
                5: {vehicleType: "6", vehicleNum: "16"}
                6: {vehicleType: "7", vehicleNum: "9"}
                7: {vehicleType: "8", vehicleNum: "46"}*/
    },
    dealWithBusLaneInfo(data) {
      //处理公交专用道数据
      this.busLane = data.busLane == null ? 0 : data.busLane; //公交专用道数量
      this.busLaneLength =
        data.busTopicBusLaneStatisticModel.busLaneLength == null? 0: data.busTopicBusLaneStatisticModel.busLaneLength;
      if ( data.busTopicBusLaneList !== null && data.busTopicBusLaneList.length > 0 ) {
        this.busTopicBusLaneList = data.busTopicBusLaneList;
        var top10LaneMaxSpeedList = [],
          line = [],
          speed = [];
        for (var i = 0; i < 10; i++) {
          line.push(data.busTopicBusLaneList[i].busLaneName);
          speed.push(data.busTopicBusLaneList[i].speed);
        }
        top10LaneMaxSpeedList.push(line);
        top10LaneMaxSpeedList.push(speed);
        this.laneSpeedOption = this.creatOption(
          top10LaneMaxSpeedList,
          "专用道公交车运行速度TOP10",
          "km/h",
          0,1
        );
        if (this.busLaneDay != 0) {
          this.busLaneDay = 0;
          this.busLaneDayLen = 0;
          this.busLaneTide = 0;
          this.busLaneTideLen = 0;
          this.busLaneOneway = 0;
          this.busLaneOnewayLen = 0;
          this.busLanePeak = 0;
          this.busLanePeakLen = 0;
          this.busLaneQuick = 0;
          this.busLaneQuickLen = 0;
        }
        data.busTopicBusLaneList.forEach(e => {
          var len = parseFloat(parseFloat(e.length).toFixed(3));
          if (e.busTypeCode == 1) {
            this.busLaneDay += 1;
            this.busLaneDayLen += len;
          } else if (e.busTypeCode == 2) {
            this.busLaneTide += 1;
            this.busLaneTideLen += len;
          } else if (e.busTypeCode == 3) {
            this.busLaneOneway += 1;
            this.busLaneOnewayLen += len;
          } else if (e.busTypeCode == 4) {
            this.busLanePeak += 1;
            this.busLanePeakLen += len;
          } else if (e.busTypeCode == 5) {
            this.busLaneQuick += 1;
            this.busLaneQuickLen += len;
          }
        });

      }
      if(data.busTopicBusLaneTypeStatisticList!=null&&data.busTopicBusLaneTypeStatisticList.length>0){
        data.busTopicBusLaneTypeStatisticList.forEach(e=>{
          if (e.busTypeCode == 1) {
            this.busLaneDaySpeed =e.busLaneSpeed;
          } else if (e.busTypeCode == 2) {
            this.busLaneTideSpeed=e.busLaneSpeed;
          } else if (e.busTypeCode == 3) {
            this.busLaneOnewaySpeed=e.busLaneSpeed;
          } else if (e.busTypeCode == 4) {
            this.busLanePeakSpeed=e.busLaneSpeed;
          } else if (e.busTypeCode == 5) {
            this.busLaneQuickSpeed=e.busLaneSpeed;
          }
        })
        this.busLaneSpeed=data.busTopicBusLaneStatisticModel==null||data.busTopicBusLaneStatisticModel.busLaneSpeed==null?0:data.busTopicBusLaneStatisticModel.busLaneSpeed;
      }
    },
    dealWithBusLineInternetInfo(data) {
      //处理公交贤网数据
      this.busLineInternet =
        data.busLineInternet == null ? 0 : data.busLineInternet; //公交线网数量

      if (
        data.gjBusLineInternetList !== null &&
        data.gjBusLineInternetList.length > 0
      ) {
        this.gjBusLineInternetList = data.gjBusLineInternetList;
        var top10LineMaxPersonList = [],
          line = [],
          person = [];
        for (var i = 0; i < 10; i++) {
          line.push(data.gjBusLineInternetList[i].lineId);
          person.push(
            (data.gjBusLineInternetList[i].personNum / 10000).toFixed(2)
          );
        }
        top10LineMaxPersonList.push(line);
        top10LineMaxPersonList.push(person);
        this.option = this.creatOption(
          top10LineMaxPersonList,
          "公交线路客流TOP10",
          "万人",
          0
        );
        var quickLineMaxPersonList = [],
          quickLine = [],
          quickPerson = [];
        var mainLineMaxPersonList = [],
          mainLine = [],
          mainPerson = [];
        var regionalLineMaxPersonList = [],
          regionalLine = [],
          regionalPerson = [];
        var microLineMaxPersonList = [],
          microkLine = [],
          microPerson = [];
        var otherLineMaxPersonList=[], otherLine = [], otherPerson = [];
        data.gjBusLineInternetList.forEach(e => {
          if (e.lineType == "快线" && quickLine.length < 10) {
            quickLine.push(e.lineId);
            quickPerson.push(e.personNum == null ? 0 : parseInt(e.personNum));
          } else if (e.lineType == "干线" && mainLine.length < 10) {
            mainLine.push(e.lineId);
            mainPerson.push(e.personNum == null ? 0 : parseInt(e.personNum));
          } else if (e.lineType == "支线" && regionalLine.length < 10) {
            regionalLine.push(e.lineId);
            regionalPerson.push(
              e.personNum == null ? 0 : parseInt(e.personNum)
            );
          } else if (e.lineType == "微循环" && microkLine.length < 10) {
            microkLine.push(e.lineId);
            microPerson.push(e.personNum == null ? 0 : parseInt(e.personNum));
          }else if(e.lineType!="快线"&&e.lineType!="干线"&&e.lineType!="支线"&&e.lineType!="微循环"&&otherLine.length<10){
            otherLine.push(e.lineId);
            otherPerson.push(e.personNum == null ? 0 : parseInt(e.personNum));
          }
        });
        quickLineMaxPersonList.push(quickLine);
        quickLineMaxPersonList.push(quickPerson);
        mainLineMaxPersonList.push(mainLine);
        mainLineMaxPersonList.push(mainPerson);
        regionalLineMaxPersonList.push(regionalLine);
        regionalLineMaxPersonList.push(regionalPerson);
        microLineMaxPersonList.push(microkLine);
        microLineMaxPersonList.push(microPerson);
        otherLineMaxPersonList.push(otherLine);
        otherLineMaxPersonList.push(otherPerson);
        this.quickLineOption = this.creatOption(
          quickLineMaxPersonList,
          "快线客流TOP10",
          "人",
          0,0
        );
        this.mainLineOption = this.creatOption(
          mainLineMaxPersonList,
          "干线客流TOP10",
          "人",
          0,0
        );
        this.regionalLineOption = this.creatOption(
          regionalLineMaxPersonList,
          "支线客流TOP10",
          "人",
          0,0
        );
        this.microLineOption = this.creatOption(
          microLineMaxPersonList,
          "微线客流TOP10",
          "人",
          0, 1
        );
        this.otherLineOption=this.creatOption(
                otherLineMaxPersonList,
                "特色线路客流TOP10",
                "人",
                0,0
        );
      }

      if (
        data.busPersonNumByLineTypeList != null &&
        data.busPersonNumByLineTypeList.length
      ) {
        if (this.busLineOther != 0) {
          this.busLineOther = 0;
          this.personNumOther = 0;
        }
        data.busPersonNumByLineTypeList.forEach(e => {
          if (e.lineTypeCode == 1) {
            this.quickLine = e.lineNum == null ? 0 : e.lineNum; //快线
            this.quickLinePerson = e.personNum == null ? 0 : e.personNum; //快线人数
          } else if (e.lineTypeCode == 2) {
            this.mainLine = e.lineNum == null ? 0 : e.lineNum; //干线
            this.mainLinePerson = e.personNum == null ? 0 : e.personNum; //快线人数
          } else if (e.lineTypeCode == 3) {
            this.regionalLine = e.lineNum == null ? 0 : e.lineNum; //支线
            this.regionalLinePerson = e.personNum == null ? 0 : e.personNum; //支线人数
          } else if (e.lineTypeCode == 4) {
            this.microLine = e.lineNum == null ? 0 : e.lineNum; //微线
            this.microLinePerson = e.personNum == null ? 0 : e.personNum; //微线线人数
          } else {
            this.busLineOther += parseInt(
              e.lineNum == null ? "0" : e.lineNum.toString()
            ); //其它公交线路数
            this.personNumOther += parseInt(
              e.personNum == null ? "0" : e.personNum.toString()
            ); //其它公交人数
          }
        });
          this.personNum =((this.quickLinePerson+this.mainLinePerson+this.regionalLinePerson+this.microLinePerson+this.personNumOther)/ 10000).toFixed(2); //总客流量
      }
    },
    dealWithBusStationInfo(data) {
      //处理公交站点数据
      this.busStation = data.busStation == null ? 0 : data.busStation; //公交站点数量
      // this.coverageRate300m=data.busTopicStationStatisticModel.coverageRate300m==null?0:data.busTopicStationStatisticModel.coverageRate300m;//300m覆盖率
      this.hubStationNum =
        data.busTopicStationStatisticModel.hubStationNum == null
          ? 0
          : data.busTopicStationStatisticModel.hubStationNum; //公交枢纽站数量
      // this.coverageRate500m=data.busTopicStationStatisticModel.coverageRate500m==null?0:data.busTopicStationStatisticModel.coverageRate500m;//500m覆盖率
      if (
        data.busTopicStationList !== null &&
        data.busTopicStationList.length > 0
      ) {
        this.busTopicStationList = data.busTopicStationList;
        var top10StationMaxPersonList = [],
          station = [],
          person = [];
        for (var i = 0; i < 10; i++) {
          station.push(data.busTopicStationList[i].stationName);
          person.push(data.busTopicStationList[i].personNum);
        }

        top10StationMaxPersonList.push(station);
        top10StationMaxPersonList.push(person);
        this.topStationOption = this.creatOption(
          top10StationMaxPersonList,
          "公交站点客流TOP10",
          "人",
          0,
                0
        );
      }
    },
    dealWithBusTopicInfo(data) {
      //
      this.busDriver = data.busDriver == null ? 0 : data.busDriver;
      this.assageWaydata = data.assageWaydata == null ? 0 : data.assageWaydata;

      this.busEnterprise = data.busEnterprise == null ? 0 : data.busEnterprise; //企业数
      this.busLine = data.busLine == null ? 0 : data.busLine; //公交线路数

      this.busPerson = data.busPerson == null ? 0 : data.busPerson; // 公交从业人员
      // this.personNum =data.personNum == null ? 0 : (data.personNum / 10000).toFixed(2); //总客流量
      this.busVehicle = data.busVehicle == null ? 0 : data.busVehicle; //车辆数
      this.busMetro = data.busMetro == null ? 0 : data.busMetro; //公交地铁换乘数量
      // this.busStation=data.busStation==null?0:data.busStation;//公交站点数量
    },
    activeQuick() {
      //展示快线图层
      // tmap.removeLayer();
      tmap.centerAt(104.072165, 30.663431);
      tmap.qTipTool.hidePopupWindow();
      this.activeLineTOP = 1;
      tmap.removeLayer("BUS_ONLINE");
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_LINE_QUICK")) {
        tmap.setLayerVisible("BUS_LINE_QUICK", true);
      } else {
        tmap.addLayer("BUS_LINE_QUICK").loadData();
      }
    },
    activeMain() {
      //展示干线图层
      tmap.centerAt(104.072165, 30.663431);
      tmap.qTipTool.hidePopupWindow();
      // tmap.removeLayer();
      // tmap.removeLayer("BUS_ONLINE");
      this.activeLineTOP = 2;
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_LINE_MAIN")) {
        tmap.setLayerVisible("BUS_LINE_MAIN", true);
      } else {
        tmap.addLayer("BUS_LINE_MAIN").loadData();
      }
    },
    activeRegional() {
      //展示支线数据
      tmap.centerAt(104.072165, 30.663431);
      tmap.qTipTool.hidePopupWindow();
      // tmap.removeLayer();
      this.activeLineTOP = 3;
      tmap.removeLayer("BUS_ONLINE");
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_LINE_REGIONAL")) {
        tmap.setLayerVisible("BUS_LINE_REGIONAL", true);
      } else {
        tmap.addLayer("BUS_LINE_REGIONAL").loadData();
      }
    },
    activeMicro() {
      //展示微线数据
      tmap.centerAt(104.072165, 30.663431);
      tmap.qTipTool.hidePopupWindow();
      // tmap.removeLayer();
      // tmap.removeLayer("BUS_ONLINE");
      this.activeLineTOP = 4;
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_LINE_MICRO")) {
        tmap.setLayerVisible("BUS_LINE_MICRO", true);
      } else {
        tmap.addLayer("BUS_LINE_MICRO").loadData();
      }
    },
    activeOther() {
      //展示其它种类数据
      tmap.centerAt(104.072165, 30.663431);
      tmap.qTipTool.hidePopupWindow();
      // tmap.removeLayer();
      // tmap.removeLayer("BUS_ONLINE");
      this.activeLineTOP = 5;
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_LINE_OTHER")) {
        tmap.setLayerVisible("BUS_LINE_OTHER", true);
      } else {
        tmap.addLayer("BUS_LINE_OTHER").loadData();
      }
    },
    activeXW() {
      this.removeZLArea();
      //展示公交线网数据
      tmap.centerAt(104.072165, 30.663431);
      tmap.setMapZoomLevel(11);
      tmap.qTipTool.hidePopupWindow();
      this.activeNo = 1;
      this.activeLineTOP = 0;
      // tmap.removeLayer();
      tmap.removeLayer("BUS_ONLINE");
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_LINE")) {
        tmap.setLayerVisible("BUS_LINE", true);
      } else {
        tmap.addLayer("BUS_LINE").loadData();
      }
      this.deleteZLDataOverLay();
      tmap.removeChart("channelDetail");
      this.closeBusMetroDetail();
    },
    activeZD() {
      this.removeZLArea();
      //展示公交站点数据
      tmap.centerAt(104.072165, 30.663431);
      tmap.setMapZoomLevel(11);
      tmap.qTipTool.hidePopupWindow();
      this.activeNo = 2;
      this.activeStationNo = 1;
      // tmap.setLayerVisible("",false);
      tmap.removeLayer("BUS_ONLINE");
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_STATION")) {
        tmap.setLayerVisible("BUS_STATION", true);
        tmap.setLayerVisible("BUS_HUB_STATION", true);
      } else {
        tmap.addLayer("BUS_STATION").loadData();
        tmap.addLayer("BUS_HUB_STATION").loadData();
      }
      this.deleteZLDataOverLay();
      tmap.removeChart("channelDetail");
      this.closeBusMetroDetail();
    },
    activeBusStation() {
      //公交站点图层
      tmap.centerAt(104.072165, 30.663431);
      tmap.qTipTool.hidePopupWindow();
      this.activeNo = 2;
      this.activeStationNo = 1;
      // tmap.setLayerVisible("",false);
      tmap.removeLayer("BUS_ONLINE");
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_STATION")) {
        tmap.setLayerVisible("BUS_STATION", true);
        // tmap.setLayerVisible("BUS_HUB_STATION",true);
      } else {
        tmap.addLayer("BUS_STATION").loadData();
        // tmap.addLayer('BUS_HUB_STATION').loadData();
      }
      this.deleteZLDataOverLay();
      tmap.removeChart("channelDetail");
      this.closeBusMetroDetail();
    },
    activeBusHub() {
      //公交枢纽站
      tmap.centerAt(104.072165, 30.663431);
      tmap.qTipTool.hidePopupWindow();
      this.activeNo = 2;
      this.activeStationNo = 1;
      // tmap.setLayerVisible("",false);
      tmap.removeLayer("BUS_ONLINE");
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_HUB_STATION")) {
        // tmap.setLayerVisible("BUS_STATION",true);
        tmap.setLayerVisible("BUS_HUB_STATION", true);
      } else {
        // tmap.addLayer('BUS_STATION').loadData();
        tmap.addLayer("BUS_HUB_STATION").loadData();
      }
      this.deleteZLDataOverLay();
      tmap.removeChart("channelDetail");
      this.closeBusMetroDetail();
    },
    activeRate300m() {
      //展示站点300m覆盖率图层
      tmap.centerAt(104.072165, 30.663431);
      tmap.setMapZoomLevel(11);
      this.activeStationNo = 2;
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_CoverRate300")) {
        tmap.setLayerVisible("BUS_CoverRate300", true);
      } else {
        tmap.addLayer("BUS_CoverRate300");
        if (this.stationRate.length > 0) {
          this.stationRate.forEach(e => {
            tmap.addPolygonOnLayer(
              "BUS_CoverRate300",
              e.stationId,
              e.circle300m,
              "rgba(0,176,80,.4)",
              "{color:'rgba(0,176,80,.4)',width:0}"
            );
          });
        }
      }
    },
    activeRate500m() {
      //展示站点500m覆盖率图层
      tmap.centerAt(104.072165, 30.663431);
      tmap.setMapZoomLevel(11);
      this.activeStationNo = 3;
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_CoverRate500")) {
        tmap.setLayerVisible("BUS_CoverRate500", true);
      } else {
        tmap.addLayer("BUS_CoverRate500");
        if (this.stationRate.length > 0) {
          this.stationRate.forEach(e => {
            tmap.addPolygonOnLayer(
              "BUS_CoverRate500",
              e.stationId,
              e.circle500m,
              "rgba(32,86,221,.4)",
              "{color:'rgba(32,86,221,.4)',width:0}"
            );
          });
        }
      }
    },
    activeCL() {
      this.removeZLArea();
      //展示在线车辆数据
      tmap.setLayerVisible("", false);
      tmap.removeLayer([
        "BUS_ONLINE",
        "BUS_ONLINE_LNG",
        "BUS_ONLINE_CNG",
        "BUS_ONLINE_DD",
        "BUS_ONLINE_DIESEL"
      ]);
      tmap.centerAt(104.072165, 30.663431);
      tmap.setMapZoomLevel(11);
      tmap.qTipTool.hidePopupWindow();
      this.activeNo = 3;
      tmap.setMapZoomLevel(13);
      tmap.addLayer("BUS_ONLINE").loadData();
      this.deleteZLDataOverLay();
      tmap.removeChart("channelDetail");
      this.closeBusMetroDetail();
    },
    activeBusLNG() {
      tmap.centerAt(104.072165, 30.663431);
      tmap.qTipTool.hidePopupWindow();
      // this.activeNo=3;
      // tmap.setLayerVisible("",false);
      tmap.removeLayer([
        "BUS_ONLINE",
        "BUS_ONLINE_LNG",
        "BUS_ONLINE_CNG",
        "BUS_ONLINE_DD",
        "BUS_ONLINE_DIESEL"
      ]);
      tmap.setMapZoomLevel(13);
      tmap.addLayer("BUS_ONLINE_LNG").loadData();
    },
    activeBusDD() {
      tmap.centerAt(104.072165, 30.663431);
      tmap.qTipTool.hidePopupWindow();
      // this.activeNo=3;
      // tmap.setLayerVisible("",false);
      tmap.removeLayer([
        "BUS_ONLINE",
        "BUS_ONLINE_LNG",
        "BUS_ONLINE_CNG",
        "BUS_ONLINE_DD",
        "BUS_ONLINE_DIESEL"
      ]);
      tmap.setMapZoomLevel(13);
      tmap.addLayer("BUS_ONLINE_DD").loadData();
    },
    activeBusCNG() {
      tmap.centerAt(104.072165, 30.663431);
      tmap.qTipTool.hidePopupWindow();
      // this.activeNo=3;
      // tmap.setLayerVisible("",false);
      tmap.removeLayer([
        "BUS_ONLINE",
        "BUS_ONLINE_LNG",
        "BUS_ONLINE_CNG",
        "BUS_ONLINE_DD",
        "BUS_ONLINE_DIESEL"
      ]);
      tmap.setMapZoomLevel(13);
      tmap.addLayer("BUS_ONLINE_CNG").loadData();
    },
    activeBusDiesel() {
      //在线车辆柴油
      tmap.centerAt(104.072165, 30.663431);
      tmap.qTipTool.hidePopupWindow();
      // this.activeNo=3;
      // tmap.setLayerVisible("",false);
      tmap.removeLayer([
        "BUS_ONLINE",
        "BUS_ONLINE_LNG",
        "BUS_ONLINE_CNG",
        "BUS_ONLINE_DD",
        "BUS_ONLINE_DIESEL"
      ]);
      tmap.setMapZoomLevel(13);
      tmap.addLayer("BUS_ONLINE_DIESEL").loadData();
      // this.deleteZLDataOverLay();
      // tmap.removeChart('channelDetail');
      // this.closeBusMetroDetail();
    },
    activeZL() {
      //展示公交走廊数据
      tmap.centerAt(104.072165, 30.663431);
      tmap.qTipTool.hidePopupWindow();
      this.activeNo = 4;
      tmap.removeLayer("BUS_ONLINE");
      tmap.setLayerVisible("", false);
      tmap.setMapZoomLevel(11);
      // if (tmap.getLayer("BUS_CORRIDOR")) {
      //   tmap.setLayerVisible("BUS_CORRIDOR", true);
      // } else {
      //   tmap.addLayer("BUS_CORRIDOR").loadData();
      // }
      // if (this.busTopicChannelList.length > 0) {
      //   this.busTopicChannelList.forEach(e => {
      //     this.addZLDataOverLay(e);
      //   });
      // }
      tmap.removeChart("channelDetail");
      this.closeBusMetroDetail();
      var lq=0,sl=0,tf=0,wj=0,pd=0,xd=0;
      var lqlineNum=0,sllineNum=0,tflineNum=0,wjlineNum=0,pdlineNum=0,xdlineNum=0;

      for(var i=0;i< this.busTopicChannelList.length;i++){
        switch(this.busTopicChannelList[i].districtName){
          case '天府新区':
            tf=this.busTopicChannelList[i].personNum;
            tflineNum=this.busTopicChannelList[i].lineNum;
            break;
          case '龙泉驿区':
            lq=this.busTopicChannelList[i].personNum;
            lqlineNum=this.busTopicChannelList[i].lineNum;
            break;
          case '新都区':
            xd=this.busTopicChannelList[i].personNum;
            xdlineNum=this.busTopicChannelList[i].lineNum;
            break;
          case '温江区':
            wj=this.busTopicChannelList[i].personNum;
            wjlineNum=this.busTopicChannelList[i].lineNum;
            break;
          case '双流区':
            sl=this.busTopicChannelList[i].personNum==null?0:this.busTopicChannelList[i].personNum;
            sllineNum=this.busTopicChannelList[i].lineNum;
            break;
          case '郫都区':
            pd=this.busTopicChannelList[i].personNum;
            pdlineNum=this.busTopicChannelList[i].lineNum;
            break;
        }
      }
      tmap.addChart('zc',this.createPieOption1("主城区",'rgb(12,40,106)'),104.072165,30.663431,{width:180,height:180});
      tmap.addChart('lq',this.createPieOption("龙泉驿",lq,'人次',lqlineNum,'rgb(25,88,217)'),104.269181,30.56065,{width:140,height:140}).$chart.on("click", param => {
        this.getOneAreaData('龙泉驿区');
        // this.showBusMetroTop10(param);
      });
      tmap.addChart('sl',this.createPieOption("双流",sl,'人次',sllineNum,'rgb(25,88,217)'),103.922706,30.573243,{width:140,height:140}).$chart.on("click", param => {
        this.getOneAreaData('双流区');

      });
      tmap.addChart('tf',this.createPieOption("天府新区",tf,'人次',tflineNum,'rgb(25,88,217)'),104.066307,30.491921,{width:140,height:140}).$chart.on("click", param => {
        this.getOneAreaData('天府新区');

      });
      tmap.addChart('wj',this.createPieOption("温江",wj,'人次',wjlineNum,'rgb(25,88,217)'),103.836776,30.697996,{width:140,height:140}).$chart.on("click", param => {
        this.getOneAreaData('温江区');

      });
      tmap.addChart('xd',this.createPieOption("新都",xd,'人次',xdlineNum,'rgb(25,88,217)'),104.16022000,30.82422300,{width:140,height:140}).$chart.on("click", param => {
        this.getOneAreaData('新都区');
      });
      tmap.addChart('pd',this.createPieOption("郫都",pd,'人次',pdlineNum,'rgb(25,88,217)'),103.887842,30.808752,{width:140,height:140}).$chart.on("click", param => {
        this.getOneAreaData('郫都区');
      });
      this.getOneAreaData('龙泉驿区');


      // tmap.addChart("test",option,104.269181,30.56065,{width:100,height:100});
      // var line= "104.078846,30.504502;104.078822,30.510648;104.078779,30.510833;104.078699,30.511064;104.078515,30.511342;104.077892,30.512115;104.077443,30.512513;104.076762,30.512942;104.076013,30.513156;104.075338,30.51323;104.073948,30.513222;104.073196,30.513215;104.072491,30.513216;104.072279,30.513229;104.072034,30.513252;104.071664,30.513294;104.071294,30.513361;104.070889,30.513456;104.070393,30.513598;104.069891,30.513779;104.06946,30.513968;104.069,30.51424;104.068649,30.514551;104.068325,30.514945;104.06811,30.515261;104.067901,30.515739;104.067723,30.516259;104.06765,30.516676;104.067616,30.517301;104.067616,30.518601;104.067616,30.519822;104.067327,30.527486;104.067327,30.528212;104.067327,30.528981;104.067001,30.538838;104.067001,30.539569;104.067001,30.54027;104.066696,30.547874;104.066695,30.548663;104.066695,30.54947;104.066422,30.556651;104.066422,30.557327;104.066422,30.558001;104.065873,30.566202;104.065688,30.567037;104.065343,30.567772;104.064906,30.568487;104.064617,30.568999;104.064247,30.569635;104.064023,30.570178;104.063786,30.570707;104.06353,30.571011;104.06315,30.571341;104.062726,30.571696;104.062496,30.572103;104.062292,30.572619;104.062198,30.573557;104.061836,30.576833;104.061823,30.577135;104.061816,30.577352;104.061816,30.577659;104.061812,30.578329;104.061808,30.579003;104.061638,30.584398;104.061646,30.585033;104.061653,30.585669;104.061376,30.59617;104.061346,30.596818;104.061306,30.597472;104.061294,30.597732;104.061275,30.59797;104.061282,30.598227;104.061351,30.598534;104.061501,30.598802;104.061754,30.599119;104.063672,30.601833;104.064133,30.60276;104.064581,30.603811;104.064755,30.604582;104.06478,30.605591;104.064905,30.606959;104.064885,30.6079;104.064859,30.608839;104.064607,30.617747;104.064373,30.626564;104.064377,30.627207;104.064373,30.627852;104.064099,30.634653;104.064098,30.635792;104.064099,30.636929;104.063976,30.638952;104.063771,30.645248;104.063545,30.65247;104.063523,30.653261;104.063242,30.65916;104.063244,30.659875;104.063242,30.660768;104.063134,30.66797;104.063109,30.668932;104.063081,30.669892;104.063139,30.67047;104.063261,30.671072;104.063419,30.671609;104.063613,30.672187;104.063807,30.672598;104.064128,30.673065;104.065524,30.674947;104.066911,30.676831;104.067079,30.67712;104.067999,30.678769;104.068996,30.680847;104.069568,30.682625;104.069916,30.684339;104.070282,30.685922;104.070535,30.687233;104.070797,30.688597;104.070928,30.689349;104.071031,30.690051;104.071112,30.690717;104.071187,30.691408;104.071355,30.693249;104.071489,30.6954;104.071533,30.69676;104.071533,30.697911;104.071533,30.698805;104.071545,30.698962;104.071571,30.699099;104.071608,30.699219;104.071663,30.699347;104.071746,30.699486;104.071877,30.699665;104.072027,30.699797;104.072284,30.699953;104.072562,30.700091;104.07297,30.700224;104.073575,30.700361;104.074604,30.700558;104.076288,30.700877;104.078075,30.701237;104.078797,30.701429;104.079326,30.701596;104.079858,30.701816;104.080282,30.70205;104.080671,30.702313;104.080938,30.702537;104.081179,30.702782;104.081352,30.703035;104.081449,30.703245;104.081526,30.703523;104.081569,30.703784;104.081609,30.70409;104.081611,30.704364;104.081585,30.704627;104.081507,30.704996;104.081392,30.705536;104.081236,30.706055;104.080939,30.707006;104.080768,30.707546;104.080694,30.708178;104.080683,30.708667;104.080737,30.709202;104.084321,30.720017";
      //        var line="104.269181,30.56065;103.922706,30.573243";

              // tmap.addLineOnLayer('BUS_CORRIDOR',"test2",line,6,'#fff')
                      // [[104.269181,30.56065],[103.922706,30.573243]];
      this.addLineArea();

    },
    getOneAreaData(areaName){
      this.xzqhName=areaName;

      this.$http.$get("gjjc_busTopicInfo/getBusToCityLineInfo",{districtName:areaName}).then(param => {
        this.lineNum=param.lineNum==null?0:param.lineNum;
       this.busTopicToCityLineList=param.busTopicToCityLineList;
      });
    },
    addLineArea(){
      // tmap.centerAt(104.072165, 30.663431);
      //wj 103.836776	30.697996
      //103.887842	30.808752
      //xd 104.16022000,30.82422300
      var data = [
        {
          "fromName": "新都 ",
          "toName": "主城区 ",
          "coords": [
            [
              104.165220,30.824223
            ],
            [
              104.077165, 30.670431
            ],
          ]
        },
        {
          "fromName": "郫都 ",
          "toName": "主城区 ",
          "coords": [
            [
              103.887842,30.813752
            ],
            [
              104.072165, 30.670431
            ],
          ]
        },
        {
          "fromName": "温江 ",
          "toName": "主城区 ",
          "coords": [
            [
              103.836776,30.702996
            ],
            [
              104.072165, 30.668431
            ],
          ]
        },
        {
          "fromName": "longquan ",
          "toName": "主城区 ",
          "coords": [
            [
              104.269181, 30.56065
            ],
            [
              104.072165, 30.663431
            ],
          ]
        },
        {
          "fromName": "shuangliu ",
          "toName": "主城区 ",
          "coords": [
            [
              103.922706,30.563243
            ],
            [
              104.072165, 30.653431
            ],
          ]
        },{
          "fromName": "tianfu ",
          "toName": "主城区 ",
          "coords": [
            [
              104.071307,30.491921
            ],
            [
              104.077165, 30.663431
            ],
          ]
        }
      ];
      var planePath = 'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705';

      var option2={
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        // backgroundColor: 'rgba(128, 128, 128, 0.6)', //rgba设置透明度0.1
        title: {
          text: '',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          show: false,
          orient: 'vertical',
          top: 'auto',
          left: 'right',
          data: ['地点', '线路'],
          textStyle: {
            color: '#fff'
          }
        },
        // geo: {
        //   map: '山西',
        //   "show": true,
        //
        //   "label": {
        //     "normal": {
        //       "show": true,
        //       "textStyle": {
        //         "color": "#fff",
        //         "fontSize": 16,
        //         "fontFamily": "Arial"
        //       }
        //     }
        //   },
        //   "aspectScale": 1.2,
        //   "itemStyle": {
        //     "emphasis": {
        //       "label": {
        //         "show": true
        //       }
        //     },
        //     "normal": {
        //       "areaColor": "#1E90FF",
        //       "borderWidth": 2,
        //       "borderColor": "#fff",
        //       "shadowColor": "rgba(30,144,255,1)",
        //       "shadowBlur": 10
        //     }
        //   },
        //   "zoom": 1.2,
        //   "left": 140
        // },
        series: [ {
          name: "线",
          type: 'lines',
          polyline: true,
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
          },
          lineStyle: {
            normal: {
              color:"#fff",
              width: 4,
              opacity: 0.8,
              curveness: 0.2,
              type:'dotted'
            }
          },
          data: data
        },
          {
            name: "特效",
            type: 'lines',
            polyline: true,
            zlevel: 2,
            effect: {
              show: true,
              period:5,
              trailLength: 0.6,
              color: '#fff',
              symbolSize: 10
            },
            lineStyle: {
              normal: {
                color: "#fff",
                width: 0,
                curveness: 0.2
              }
            },
            data:data
          }
        ]
      };
      var data2 = [
        {
          "fromName": "主城区 ",
          "toName": "新都",
          "coords": [
            [
              104.067165, 30.670431
            ],
            [
              104.155220,30.824223
            ],

          ]
        },
        {
          "fromName": "主城区",
          "toName": " 郫都 ",
          "coords": [
            [
              104.072165, 30.660431
            ],
            [
              103.887842,30.800752
            ],

          ]
        },
        {
          "fromName": "主城区 ",
          "toName": "温江",
          "coords": [
            [
              104.072165, 30.658431
            ],
            [
              103.836776,30.692996
            ],

          ]
        },
        {
          "fromName": "主城区 ",
          "toName": "龙泉 ",
          "coords": [
            [
              104.072165, 30.673431
            ],
            [
              104.269181, 30.57065
            ],

          ]
        },
        {
          "fromName": "shuangliu ",
          "toName": "主城区 ",
          "coords": [
            [
              104.072165, 30.673431
            ],
            [
              103.922706,30.583243
            ],

          ]
        },
        {
          "fromName": "主城区 ",
          "toName": "天府",
          "coords": [
            [
              104.067165, 30.653431
            ],
            [
              104.061307,30.491921
            ],

          ]
        }
      ];
      var option3={
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        // backgroundColor: 'rgba(128, 128, 128, 0.6)', //rgba设置透明度0.1
        title: {
          text: '',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          show: false,
          orient: 'vertical',
          top: 'auto',
          left: 'right',
          data: ['地点', '线路'],
          textStyle: {
            color: '#fff'
          }
        },

        series: [ {
          name: "线",
          type: 'lines',
          polyline: true,
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
          },
          lineStyle: {
            normal: {
              color:"#3affff",
              width: 4,
              opacity: 0.8,
              curveness: 0.2,
              type:'dotted'
            }
          },
          data: data2
        },
          {
            name: "特效",
            type: 'lines',
            polyline: true,
            zlevel: 2,
            effect: {
              show: true,
              period:5,
              trailLength: 0.6,
              color: '#fff',
              symbolSize: 10
            },
            lineStyle: {
              normal: {
                color: "#fff",
                width: 0,
                curveness: 0.2
              }
            },
            data:data2
          }
        ]
      };
      tmap.addChart("test",option2);
      tmap.addChart("test2",option3);
    },
    removeZLArea(){
      tmap.removeChart('zc');
      tmap.removeChart('lq');;
      tmap.removeChart('sl');
      tmap.removeChart('tf');
      tmap.removeChart('wj');
      tmap.removeChart('xd');
      tmap.removeChart('pd');
      tmap.removeChart("test");
      tmap.removeChart("test2");
    },
    createPieOption1(title,color){
      var option = {
        title: {
          text: '{a|'+ title +'}',
          x: 'center',
          y: 'center',
          textStyle: {
            rich:{
              a: {
                fontSize: 18,
                color: '#fff'
              },
              b: {
                fontSize: 14,
                color: '#29EEF3',
                padding: [0,0,14,0]
              },
              c: {
                fontSize: 10,
                color: '#ffffff',
                padding: [5,0]
              }
            }
          }
        },
        series: [ {
          name: '',
          type: 'pie',
          radius: ['60%', '82%'],
          label: {
            show: false,
          },
          labelLine: {
            show: false
          },
          data: [{
            value: 100,
            name: '1',
            itemStyle:{
              color:color
            }
          }
          ]
        },
          {
            name: '',
            type: 'pie',
            radius: ['0%', '60%'],
            label: {
              show: false,
            },
            labelLine: {
              show: false
            },
            hoverAnimation:false,
            data: [{
              value: 100,
              name: '1',
              itemStyle:{
                color:'rgb(12,26,75)'
              }
            }
            ]
          }]
      };
      return option;
    },
    createPieOption(title,int,unit,lineNum,color){
      var option = {
        title: {
          text: '{a|'+ title +'}\n{b|'+int+'}{c|'+unit+'}\n{d|'+lineNum+'}{e|条}',
          x: 'center',
          y: 'center',
          textStyle: {
            rich:{
              a: {
                fontSize: 12,
                color: '#fff'
              },
              b: {
                fontSize: 14,
                color: '#fff',
                padding: [0,0,5,0]
              },
              c: {
                fontSize: 10,
                color: '#ffffff',
                padding: [0,0,5,0,]
              },
              d: {
                fontSize: 14,
                color: '#fff',
                padding: [0,0,5,0]
              },
              e: {
                fontSize: 10,
                color: '#fff',
                padding: [0,0,5,0,]
              },
            }
          }
        },
        series: [ {
          name: '',
          type: 'pie',
          radius: ['60%', '82%'],
          label: {
            show: false,
          },
          labelLine: {
            show: false
          },
          data: [{
            value: 100,
            name: '1',
            itemStyle:{
              color:color
            }
          }
          ]
        },
          {
            name: '',
            type: 'pie',
            radius: ['0%', '60%'],
            label: {
              show: false,
            },
            labelLine: {
              show: false
            },
            hoverAnimation:false,
            data: [{
              value: 100,
              name: '1',
              itemStyle:{
                color:'rgb(12,26,75)'
              }
            }
            ]
          }]
      };
      return option;
    },
    // addZLDataOverLay(data) {
    //   //添加走廊的 overLay
    //
    //   var geoms = data.geom.split(";");
    //   if (data.personNum == null) {
    //     data.personNum = 0;
    //   }
    //   if (geoms.length > 0) {
    //     var num =
    //       geoms.length % 2 == 0 ? geoms.length / 2 : (geoms.length + 1) / 2;
    //     var lineNum = data.line == null ? 0 : data.line.split(",").length;
    //     var center = geoms[num].split(",");
    //
    //     var html =
    //       "<div style=\"width: 200px;  transition: all 1.6s; font-family: '幼圆','微软雅黑'; background-color: rgba(35, 94, 243, 0.05);border: 1px solid rgba(32,86,221,.2);\">" +
    //       '       <div class="content-radius top-left" ></div>\n' +
    //       '       <div class="content-radius bottom-right"> </div>\n' +
    //       '       <div class="content-radius top-right"></div>\n' +
    //       '       <div class="content-radius bottom-left"></div>' +
    //       ' <div style="  padding: 5px; ">' +
    //       '      <table class="zlxq" style="width:190px;background-color: rgba(35, 94, 243, 0.15)" >' +
    //       '        <tr style=" display:block; line-height: 20px;width:190px">\n' +
    //       '          <th style=" width:81px;text-align: left; padding-left: 4px;color: rgba(255, 255, 255, 0.9);font-size: 14px;font-weight:normal">通道名称</th>\n' +
    //       '          <td style=" width:100px;text-align: left;"><span style="font-size:this.$utils.setSize(14);font-weight: bold;">' +
    //       data.channelName +
    //       "</span></td>\n" +
    //       "        </tr>\n" +
    //       '        <tr style="display:block; line-height: 20px;width:190">\n' +
    //       '          <th style="width:81px; text-align: left;padding-left: 4px; color: rgba(255, 255, 255, 0.9);font-size: 14px;font-weight:normal">全长</th>\n' +
    //       '          <td style="width:100px;text-align: left;"><span style="font-size:this.$utils.setSize(14);font-weight: bold;">' +
    //       data.length +
    //       '</span> <span style="font-weight: normal;font-size: 14px;">公里</span></td>\n' +
    //       "        </tr>\n" +
    //       '        <tr style=" display:block;line-height: 20px;width:190px">\n' +
    //       '          <th style=" width:81px;text-align: left; padding-left: 4px;color: rgba(255, 255, 255, 0.9);font-size: 14px;font-weight:normal">客流量</th>\n' +
    //       '          <td style=" width:100px;text-align: left;"><span style="font-size:this.$utils.setSize(14);font-weight: bold;">' +
    //       data.personNum +
    //       '</span> <span style="font-weight: normal;font-size: 14px;">人次</span></td>\n' +
    //       "        </tr>\n" +
    //       '        <tr style="display:block; line-height: 20px;width:190px">\n' +
    //       '          <th style=" width:81px;text-align: left;padding-left: 4px; color: rgba(255, 255, 255, 0.9);font-size: 14px;font-weight:normal">途经线路</th>\n' +
    //       '          <td style=" width:100px; text-align: left; word-wrap: break-word;word-break: break-all;" onclick="showDetail(' +
    //       data.channelId +
    //       ')"><span style="text-decoration:underline;font-size:this.$utils.setSize(14);font-weight: bold;color:#72F6FA; cursor:pointer;">' +
    //       lineNum +
    //       '</span><span style="font-weight: normal;font-size:this.$utils.setSize(14);"> 条</span></td>\n' +
    //       "        </tr>\n" +
    //       '        <tr id="xq_' + data.channelId +
    //       '" style="display:none; line-height: 20px;width:190px">\n' +
    //       '          <th style=" width:81px; text-align: left;padding-left: 4px; color: rgba(255, 255, 255, 0.9);font-size:this.$utils.setSize(14);font-weight:normal">详情</th>\n' +
    //       '          <td style="width:100px; text-align: left; word-wrap: break-word;word-break: break-all;" ><span style="font-size:this.$utils.setSize(14);font-weight: bold;">' +
    //       data.line +
    //       "</span></td>\n" +
    //       "        </tr>\n" +
    //       "      </table>\n" +
    //       "    </div></div>";
    //     tmap.addOverlay("channel", data.channelId, html, center[0], center[1]);
    //   }
    // },

    deleteZLDataOverLay() {
      //删除公交走廊的 overLay
      if (this.busTopicChannelList.length > 0) {
        this.busTopicChannelList.forEach(e => {
          tmap.deleteOverlay(e.channelId, "channel");
        });
      }
    },
    activeZYD() {
      //展示公交专用道数据
      tmap.centerAt(104.072165, 30.663431);
      tmap.setMapZoomLevel(11);
      tmap.qTipTool.hidePopupWindow();
      this.activeNo = 5;
      tmap.removeLayer("BUS_ONLINE");
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_SPECIAL")) {
        tmap.setLayerVisible("BUS_SPECIAL", true);
      } else {
        tmap.addLayer("BUS_SPECIAL").loadData();
      }
      this.deleteZLDataOverLay();
      tmap.removeChart("channelDetail");
      this.closeBusMetroDetail();
      this.removeZLArea();
    },
    activeLaneDay() {
      //公交专用道白天时段图层
      tmap.centerAt(104.072165, 30.663431);
      tmap.qTipTool.hidePopupWindow();
      // tmap.removeLayer("BUS_ONLINE");
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_SPECIAL_DAY")) {
        tmap.setLayerVisible("BUS_SPECIAL_DAY", true);
      } else {
        tmap.addLayer("BUS_SPECIAL_DAY").loadData();
      }
      // this.deleteZLDataOverLay();
    },
    activeLaneTide() {
      //公交专用道潮汐图层
      tmap.centerAt(104.072165, 30.663431);
      tmap.qTipTool.hidePopupWindow();
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_SPECIAL_TIDE")) {
        tmap.setLayerVisible("BUS_SPECIAL_TIDE", true);
      } else {
        tmap.addLayer("BUS_SPECIAL_TIDE").loadData();
      }
    },
    activeLaneOneway() {
      //公交专用道 全天单向通行图层
      tmap.centerAt(104.072165, 30.663431);
      tmap.qTipTool.hidePopupWindow();
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_SPECIAL_ONEWAY")) {
        tmap.setLayerVisible("BUS_SPECIAL_ONEWAY", true);
      } else {
        tmap.addLayer("BUS_SPECIAL_ONEWAY").loadData();
      }
    },
    activeLanePeak() {
      //公交专用道高峰图层
      tmap.centerAt(104.072165, 30.663431);
      tmap.qTipTool.hidePopupWindow();
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_SPECIAL_PEAK")) {
        tmap.setLayerVisible("BUS_SPECIAL_PEAK", true);
      } else {
        tmap.addLayer("BUS_SPECIAL_PEAK").loadData();
      }
    },
    activeLaneQuick() {
      //公交专用道快速路图层
      tmap.centerAt(104.072165, 30.663431);
      tmap.qTipTool.hidePopupWindow();
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_SPECIAL_QUICK")) {
        tmap.setLayerVisible("BUS_SPECIAL_QUICK", true);
      } else {
        tmap.addLayer("BUS_SPECIAL_QUICK").loadData();
      }
    },
    activeHC() {
      //展示公交地铁换乘数据
      tmap.centerAt(104.072165, 30.663431);
      tmap.setMapZoomLevel(11);
      tmap.qTipTool.hidePopupWindow();
      this.activeNo = 6;
      this.removeZLArea();
      tmap.removeLayer("BUS_ONLINE");
      tmap.setLayerVisible("", false);
      if (tmap.getLayer("BUS_METRO")) {
        tmap.setLayerVisible("BUS_METRO", true);
      } else {
        tmap.addLayer("BUS_METRO").loadData();
        // tmap.addCircleOnLayer('BUS_METRO','channelDetail',103,30.5,500/11100,'channelDetail');
      }
      tmap.addChart("channelDetail", this.echartoption) .$chart.on("click", param => {
          this.showBusMetroTop10(param);
        });
      this.deleteZLDataOverLay();
    },
    showBusMetroTop10(param) {
      //显示公交地铁换乘TOP10的详情
      if (
        this.busTopicMetroStationList &&
        this.busTopicMetroStationList.length > 0
      ) {
        for (var i = 0; i < this.busTopicMetroStationList.length; i++) {
          if (this.busTopicMetroStationList[i].stationName == param.name) {
            this.busMetroDetail(this.busTopicMetroStationList[i]);
            break;
          }
        }
      }

      // this.showBusMetro=true;
    },

    busMetroDetail(data) {
      this.showBusMetro = true;
      this.busMetroStationName =
        data.stationName == null ? "" : data.stationName;
      this.busMetroPersonNum = data.personNum == null ? 0 : data.personNum;
      this.lineNum50m = data.lineNum50m == null ? 0 : data.lineNum50m;
      this.stationNum50m = data.stationNum50m == null ? 0 : data.stationNum50m;
      this.lineNum100m = data.lineNum100m == null ? 0 : data.lineNum100m;
      this.stationNum100m =
        data.stationNum100m == null ? 0 : data.stationNum100m;
      this.lineNum150m = data.lineNum150m == null ? 0 : data.lineNum150m;
      this.stationNum150m =
        data.stationNum150m == null ? 0 : data.stationNum150m;
    },
    closeBusMetroDetail() {
      //关闭公交地铁换乘详情框
      this.showBusMetro = false;
    },
    creatOption: function(data, title, unitName, rotate,interval) {
      const option = {
        title: {
          text: title,
          subtext: "",
          x: "center",
          textStyle: { fontSize: this.$utils.setSize(18), color: "#fff",fontWeight:"normal"}
        },
        // backgroundColor: '#23243a',
        tooltip: {
          //提示框组件
          trigger: "axis",
          formatter: "{b}: {c}",
          axisPointer: {
            type: "shadow",
            label: {
              backgroundColor: "#6a7985"
            }
          },
          textStyle: {
            color: "#fff",
            fontStyle: "normal",
            fontSize: this.$utils.setSize(14)
          }
        },
        grid: {
          //    left: '1%',
          //     right: '4%',
          //     bottom: '6%',
          //     top: 30,
          //     padding: '0 0 10 0',
          top: 40,
          left: 50,
          right: 50,
          bottom: 40
          // containLabel: true,
        },
        // legend: { //图例组件，颜色和名字
        //     // right: 10,
        //     // top: 0,
        //     // itemGap: 16,
        //     // itemWidth: 18,
        //     // itemHeight: 10,
        //     data: data[0],
        //     textStyle: {
        //         color: '#a8aab0',
        //         fontStyle: 'normal',
        //         fontFamily: '微软雅黑',
        //         fontSize: 12,
        //     }
        // },
        xAxis: [
          {
            type: "category",
            boundaryGap: true, //坐标轴两边留白
            data: data[0],
            axisLabel: {
              //坐标轴刻度标签的相关设置。
              interval: interval, //设置为 1，表示『隔一个标签显示一个标签』
              rotate: rotate,
              margin: 15,
              textStyle: {
                color: "#ffffff",
                fontStyle: "normal",
                fontSize: this.$utils.setSize(14)
              }
            },
            axisTick: {
              //坐标轴刻度相关设置。
              show: false
            },
            axisLine: {
              //坐标轴轴线相关设置
              show: false,
              lineStyle: {
                color: "#fff",
                opacity: 0.2
              }
            },
            splitLine: {
              //坐标轴在 grid 区域中的分隔线。
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: unitName,
            // nameLocation: 'end',
            nameTextStyle: {
              color: "#ffffff",
              padding: [0, 0, 0, -20] // 四个数字分别为上右下左与原位置距离
            },
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                color: "#a8aab0",
                fontStyle: "normal",
                fontSize: this.$utils.setSize(14)
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: ["#fff"],
                opacity: 0.06
              }
            }
          }
        ],
        series: [
          {
            // name: data[1],
            type: "pictorialBar",
            symbol: 'rect',
            symbolSize: [20, 3],
            symbolOffset: [0, -0],
            z: 2,
            tooltip: {
                show: false
            },
            data: data[1],
            symbolPosition: 'end',
            label: {
              //图形上的文本标签
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: "#a8aab0",
                  fontStyle: "normal",
                  fontSize: this.$utils.setSize(14)
                }
              }
            },
            itemStyle: {
              //图形样式
              normal: {
                color: "#00FFFF"
              }
            }
          },
          {
            // name: data[1],
            type: "bar",
            data: data[1],
            barWidth: 20,
            barGap: 0, //柱间距离
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [{
                                offset: 0,
                                color: 'rgba(0,255,255,0.4)'
                            },
                            {
                                offset: 0.5,
                                color: 'rgba(0,255,255,0.2)'
                            },
                            {
                                offset: 1,
                                color: 'transparent'
                            }
                        ]
                    )
                },

            },
          }
        ]
      };
      return option;
    },
    getSearchValueSelf(param) {
      //时间类型选择
    }
  },
  data() {
    return {
      timetype: 1, //时间类型
      xzqhName:"",//行政区划名称
      lineNum:0,//线路条数
      busTopicToCityLineList:[],
      swiperOption: {
        // autoplay:true,
        initialSlide: 0,
        slidesPerView: 4,
        spaceBetween: 30,
        observer:true,
        observeParents:true,
        // centeredSlides: true,
        // loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      searchConfig2: {
        searchCondition: [
          {
            order: 36,
            type: "select",
            label: "",
            placeholder: "",
            width: 100,
            VModelvalue: {
              name: "timetype",
              defaultValue: "1"
            },
            options: [
              {
                value: "1",
                label: "早高峰"
              },
              {
                value: "2",
                label: "晚高峰"
              }
            ]
          }
        ]
      },
      showBusMetro: false,
      busMetroStationName: "",
      busMetroPersonNum: 0,
      lineNum50m: 0,
      stationNum50m: 0,
      lineNum100m: 0,
      stationNum100m: 0,
      lineNum150m: 0,
      stationNum150m: 0,
      mapLegend: {
        list: [
          {
            color: "rgba(26, 117, 209,1)",
            name: "快线" // 圖例名字
          },
          {
            color: "#FFFF00",
            name: "干线"
          },
          {
            color: "rgb(68, 209, 53)",
            name: "支线"
          },
          {
            color: "#72F6FA",
            name: "微线"
          },
          {
            color: "#CC91E2",
            name: "特色"
          }
        ]
      }, //图例
      mapLegendLane: {
        list: [
          {
            color: "#8D3DD7",
            name: "双向全天候"
          },
          {
            color: "#54A74D",
            name: "单向全天候"
          },
          {
            color: "#006AFA",
            name: "白天时段" // 圖例名字
          },
          {
            color: "#E03F46",
            name: "高峰时段"
          },
          {
            color: "#35AAE7",
            name: "潮汐"
          },



        ]
      }, //图例
      mapLegendStation: {
        list: [
          {
            color: "rgba(26, 117, 209,1)",
            name: "中间站" // 圖例名字
          },
          {
            color: "#FFFF00",
            name: "首末站"
          }
        ]
      },
      mapLegendOnline: {
        list: [
          {
            color: "rgba(26, 117, 209,1)",
            name: "CNG" // 圖例名字
          },
          {
            color: "#FFFF00",
            name: "混合动力"
          },
          {
            color: "rgb(68, 209, 53)",
            name: "电动"
          },
          {
            color: "rgba(127,45,0,1)",
            name: "柴油"
          }
        ]
      },
      stationRate: [], //覆盖率相关数据

      busLaneSpeed: 0, //专用道平均时速
      busLaneDaySpeed: 0, //白天平均时速
      busLaneTideSpeed: 0, //潮汐时速
      busLaneOnewaySpeed: 0, //全天单向时速
      busLanePeakSpeed: 0, //高峰时速
      busLaneQuickSpeed: 0, //快速路时速

      busLaneDay: 0, //白天条数
      busLaneDayLen: 0, //白天长度
      busLaneTide: 0, //潮汐条数
      busLaneTideLen: 0, //潮汐长度
      busLaneOneway: 0, //全天单向条数
      busLaneOnewayLen: 0, //全天单向长度
      busLanePeak: 0, //高峰条数
      busLanePeakLen: 0, //高峰长度
      busLaneQuick: 0, //快速路条数
      busLaneQuickLen: 0, //快速路长度

      activeLineTOP: 0, //线路top10展示顺序
      activeStationNo: 1, //站点展示顺序
      quickLine: 0, //快线
      quickLinePerson: 0, //快线人数
      mainLine: 0, //干线
      mainLinePerson: 0, //快线人数
      regionalLine: 0, //支线
      regionalLinePerson: 0, //支线人数
      microLine: 0, //微线
      microLinePerson: 0, //微线线人数
      quickLineOption: {}, //快线TOP10
      mainLineOption: {}, //干线top10
      regionalLineOption: {}, //支线TOP10
      microLineOption: {}, //微线top10
      otherLineOption:{},//特色Top10
      busMetroOption: {}, //公交地铁换乘TOP10
      echartoption: {}, //echarts配置文件

      busTopicMetroStationList: [], //公交地铁换乘集合
      busTopicBusLaneList: [], //公交专用道集合
      busTopicChannelList: [], //公交走廊集合
      busTopicOnLineBusList: [], //在线车辆
      busTopicStationList: [], //公交站点集合
      gjBusLineInternetList: [], //公交线路集合
      laneSpeedOption: {}, //公交专用道速度TOP
      topStationOption: {}, //公交站点客流TOP10图表展示配置
      option: {},
      activeNo: 1, //当前页面
      testData: [
        ["1路", "2路", "3路", "4路", "5路"],
        [5, 4, 3, 2, 1]
      ],
      busLineOther: 0, //其它公交线路数
      personNumOther: 0, //其它公交人数
      busDriver: 0, //  公交驾驶人员
      busLane: 0, //公交专用道数量
      busEnterprise: 0, //企业数
      busLine: 0, //公交线路数
      busLineInternet: 0, //公交线网数量
      busPerson: 0, // 公交从业人员
      personNum: 0, //总客流量
      busVehicle: 0, //车辆数
      busMetro: 0, //公交地铁换乘数量
      busStation: 0, //公交站点数量
      onLineBus: 0, //公交在线车辆数量
      coverageRate300m: 0, //300m覆盖率
      hubStationNum: 0, //公交枢纽站数量
      coverageRate500m: 0, //500m覆盖率
      channel: 0, //公交走廊
      hhBus: 0, //混合动力
      ddBus: 0, //电动
      cngBus: 0, //CNG
      cyBus: 0 //柴油
    };
  },
  beforeDestroy() {
    if (this.autohand) {
      window.clearInterval(this.autohand);
    }
  },
  destroy() {
    if (this.autohand) {
      window.clearInterval(this.autohand);
    }
  }
};
</script>
<style lang="css" scoped>
.timeSelect >>> .search-panel-container {
  height: 30px;
}
.timeSelect >>> .search-panel-wrap {
  height: 30px;
}
</style>
<style lang="scss" scoped>
.homepage-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  .panel-wrapper {
    height: 300px;
    // padding: 10px 0;
    position: absolute;
    top: 50%;
    width: 310px;
    transform: translateY(-50%);
    // border: 1px solid red;
  }
  .top {
    position: absolute;
    top: 25px;
     width: 800px;
     height: 48px;
     left: 50%;
    right:156px;
    transform: translateX(-50%);
    /*margin: 0px auto;*/
    justify-content: center;
    /*background: url(img/bj.png) center no-repeat;*/
    background-size: 100%;
     margin-top: 3px;
     .zhu1 {
       margin-left: 38px;
       li {
         line-height: 30px;
       }
       .mi {
         float: left;
         font-size: 14px;
         color: #ffffff;
         margin-right: 4px;
         font-weight: normal;
         margin-left: 10px;
         margin-top: 10px;
       }
       .mi1 {
         float: left;
         font-size: 24px;
         font-weight: bold;
         color: #00ffff;
         margin-top: 10px;
       }
       .mi2 {
         float: left;
         font-size: 14px;
         font-weight: normal;
         color: #00ffff;
         margin-top: 10px;
         margin-left: 2px;
      }
     }
  /*  .lineDetail-wrap {*/
  /*    position: relative;*/
  /*    width: 300px;*/
  /*    // background-color: rgba(7, 18, 49, 0.8);*/
  /*    border-radius: 2px;*/
  /*    transition: all 1.6s;*/
  /*    border: 1px solid rgba(32, 86, 221,.2);*/
  /*    // border: 1px solid rgba(35, 94, 243, 0.4);*/
  /*    .lineDetail-inner {*/
  /*        // height: 100%;*/
  /*        // width: 100%;*/
  /*        margin:10px;*/
  /*        padding:10px;*/
  /*        background: rgba(32, 86, 221,.2);*/
  /*    }*/
  /*    table {*/
  /*        padding-top: 20px;*/
  /*        width: 100%;*/
  /*        tr {*/
  /*            line-height: 36px;*/
  /*            td:not(.line_name) {*/
  /*                text-align: left;*/
  /*                font-size: 24px;*/
  /*                // font-family: "datafont";*/
  /*                color: #00ffff;*/
  /*                span.unit {*/
  /*                font-size: 14px;*/
  /*                color: #fff;*/
  /*                }*/
  /*            }*/
  /*            th {*/
  /*                text-align: left;*/
  /*                color: rgba(255, 255, 255, 0.6);*/
  /*                font-size: 14px;*/
  /*                font-weight: normal;*/
  /*            }*/
  /*        }*/
  /*    }*/
  /*}*/
  }
  .top2 {
    position: absolute;
    top: 70px;
    /*width: 823px;*/
    /*height: 48px;*/
    left: 50%;
    transform: translateX(-50%);
    height: 100px;
    width: 100%;
    .data_box {
      display: flex;
      width: 100%;
      justify-content: center;
      position: absolute;
      li {
        display: block;
        /* float: left; */
        list-style: none;
        margin-right: 20px;
      }

      .data_name {
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 30px;
        display: block;
      }
      .layer_cont {
        cursor: pointer;
        position: relative;
        border-radius: 4px;
        margin-top: 5px;
        background: url(img/top_data_bg.png) center no-repeat;
        /*background-size: 100%;*/
        height: 60px;
        padding: 0px 20px;
        animation: turn 14s ease-in-out;
        -webkit-animation: turn 14s ease-in-out;
        -moz-animation: turn 14s ease-in-out;
      }
      .data_left,
      .data_right {
        position: absolute;
        width: 20px;
        height: 71px;
      }
      .data_left {
        top: -6px;
        left: -6px;
        /*background: url(img/left_data.png) 0px center no-repeat;*/
        background-size: 100%;
      }

      .data_right {
        top: -6px;
        right: -6px;
        /*background: url(img/right_data.png) 0px center no-repeat;*/
        background-size: 100%;
      }

      .data_bg span {
        font-size: 36px;
        font-family: "datafont";
        line-height: 60px;
        font-weight: bold;
      }
      .data_name span.cut_s {
        font-size: 14px;
        color: #144b8c;
        margin: 0px 5px;
      }
      .data_bg span.cut {
        font-size: 36px;
        color: rgba(20, 75, 140,.2);
        font-weight:normal;
        margin: 0px 1px;
        font-family: "Microsoft YaHei";
      }

      .data_bg span.unit {
        font-size: 14px;
        color: #72f6fa;
        margin-left: 2px;
      }
      .blue_data {
        color: #00ffff !important;
      }
      .yellow {
        color: #ffff00;
        font-size: 30px;
      }
    }
  }
  .left {
    /*position: absolute;*/
    left: 0;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    justify-content: center;
    .left-content {
      .item {
        width: 260px;
        height: 79px;
        line-height: 79px;
        text-align: center;
        font-size: 20px;
        background: url(img/bg_normal.png) center no-repeat;
        background-size: 100%;
        margin: 5px 0px;
        cursor: pointer;
        color:rgba(255,255,255,.6);
        span{
          color:rgba(0,355,255,.6)
        }
      }
      .item:hover {
        background: url(img/bg_hover.png) center no-repeat;
        background-size: 100%;
        color:rgba(255,255,255,1);
        span{
          color:rgba(0,355,255,1)
        }
      }
      /*<!--.item1{-->
                <!--    transform: rotateZ(8deg);-->
                <!--}-->
                <!--.item3{-->
                <!--    transform: rotateZ(-8deg);-->
                <!--}-->*/
      .active {
        background: url(img/bg_hover.png) center no-repeat;
        background-size: 100%;
        color:rgba(255,255,255,1);
        font-weight: bold;
        span{
          color:rgba(0,355,255,1)
        }
      }
    }
  }
  .right {
    /*position: absolute;*/
    right: 0;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    justify-content: center;
    .right-content {
      .item {
        width: 260px;
        height: 79px;
        line-height: 79px;
        font-size: 20px;
        text-align: center;
        background: url(img/bg_normal.png) center no-repeat;
        background-size: 100%;
        margin: 5px 0px;
        cursor: pointer;
        color:rgba(255,255,255,.6);
        span{
          color:rgba(0,355,255,.6)
        }
      }
      .item:hover {
        background: url(img/bg_hover.png) center no-repeat;
        background-size: 100%;
        color:rgba(255,255,255,1);
        span{
          color:rgba(0,355,255,1)
        }
      }
      /*.item1{
                    transform: rotateZ(-8deg);
                }
                .item3{
                    transform: rotateZ(8deg);
                }*/
      .active {
        background: url(img/bg_hover.png) center no-repeat;
        background-size: 100%;
        color:rgba(255,255,255,1);
        font-weight: bold;
        span{
          color:rgba(0,355,255,1)
        }
      }
    }
  }
  .bottom {
    background: -webkit-gradient(linear,top,bottom, from(rgba(5, 14, 38, 0.2)), to(#050e26));
    background: linear-gradient(to bottom, rgba(5, 14, 38, 0.2), #050e26);
    border-radius:4px;
    position: absolute;
    bottom: 20px;
    height: 200px;
    width: calc(100% - 600px);
    /*width: 823px;*/
    /*height: 48px;*/
    left: 50%;
    transform: translateX(-50%);
    .timeSelect {
      position: absolute;
      top: 2px;
      right: 2px;
    }
    .title{
      text-align:center ;
      font-size: 18px;
      font-weight: normal;
      /*font-family: '幼圆';*/
    }
    .line_content{
      /*font-family: '幼圆';*/
      margin-top: 20px;
      height:180px;
      margin-left: 20px;
      ul{
         padding-left: 20px;
        .gjLineName span{
          border: 1px solid rgb(255,255,255);
          border-radius: 2px;
        }
        li{
          height: 34px;
          line-height: 34px;
        }
      }
    }
  }
  .mapLegend {
    position: absolute;
    z-index: 6;
    right: -3.1rem;
    bottom: -0.25rem;
    width: 110px;
  }
  .busMetro-wrap {
    position: absolute;
    top: 132px;
    right: 307px;
    width: 300px;
    background-color: rgba(35, 94, 243, 0.05);
    border-radius: 2px;
    transition: all 1.6s;
    border: 1px solid rgba(32, 86, 221, 0.2);
    .content-radius {
      position: absolute;
      width: 10px;
      height: 10px;
      z-index: 999;
    }
    .top-left {
      top: -1px;
      left: -1px;
      border-left: 1px solid #2056dd;
      border-top: 1px solid #2056dd;
    }

    .bottom-right {
      bottom: -1px;
      right: -1px;
      border-bottom: 1px solid #2056dd;
      border-right: 1px solid #2056dd;
    }

    .top-right {
      top: -1px;
      right: -1px;
      border-right: 1px solid #2056dd;
      border-top: 1px solid #2056dd;
    }

    .bottom-left {
      bottom: -1px;
      left: -1px;
      border-bottom: 1px solid #2056dd;
      border-left: 1px solid #2056dd;
    }
    .close {
      position: absolute;
      right: 10px;
      top: 1px;
      font-size: 22px;
      color: rgba(255, 255, 255, 0.9);
      display: inline-block;
      cursor: pointer;
    }
    .close:hover {
      color: rgba(35, 94, 243, 1);
    }
    .busMetro-inner {
      height: 100%;
      /*width: 100%;*/
      padding: 20px 10px 10px 10px;
    }
    table {
      padding-top: 20px;
      background-color: rgba(35, 94, 243, 0.15);
      width: 100%;
      tr {
        line-height: 36px;
        td {
          padding-left: 5px;
        }
        td.station_name {
          color: #00ffff;
          font-size: 14px;
          font-weight: bold;
        }
        td:not(.station_name) {
          text-align: left;
          font-size: 14px;
          font-weight: bold;
          /*font-family: "datafont";*/
          /*color: #00ffff;*/
          span.unit {
            font-size: 14px;
            color: rgba(255,255,255,.6);
            font-weight: normal;
          }
        }
        th {
          text-align: left;
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          font-weight: normal;
        }
      }
    }
  }
}
</style>