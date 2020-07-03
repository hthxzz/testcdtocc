import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      menushow:false,
      preActiveMenuEle: '',
      hoverMenuEle: 'index',
      currentActiveMenuEle:'',
      menuList:{ jcyj: [{
          "id": "1",
          "title": "居民出行监测",
          "icon": require("./assets/index/menu/jmcx.png"),
          "route": "/jmcxjc"
        },
        {
          "id": "2",
          "title": "路网运行监测",
          "icon": require("./assets/index/menu/lwyx.png"),
          "route": "/roadnetworkrunmonitor/a"
        },
        {
          "id": "3",
          "title": "重点运输车辆监测",
          "icon": require("./assets/index/menu/zdyscl.png"),
          "route": "/roadnetworkrunmonitor/KeyTransportVehiclesIndex"
        },
        {
          "id": "4",
          "title": "交通运输驾驶员",
          "icon": require("./assets/index/menu/jtysjsy.png"),
          "route": "jtysjsy"
        },
        {
          "id": "5",
          "title": "地面公共交通运行监测",
          "icon": require("./assets/index/menu/dmgj.png"),
          "route": "dmjtyxjc"
        },
        {
          "id": "6",
          "title": "出租车运行监测",
          "icon": require("./assets/index/menu/czc.png"),
          "route": "czc"
        },
        {
          "id": "8",
          "title": "轨道交通运行监测",
          "icon": require("./assets/index/menu/gdjt.png"),
          "route": "gdjt"
        },
        {
          "id": "9",
          "title": "慢行交通运行监测",
          "icon": require("./assets/index/menu/mxjt.png"),
          "route": "/roadnetworkrunmonitor/slowTrafficMonitorIndex"
        },
        {
          "id": "10",
          "title": "静态交通运行监测",
          "icon": require("./assets/index/menu/jtjt.png"),
          "route": "jtjt"
        },
        {
          "id": "11",
          "title": "航空运输运行监测",
          "icon": require("./assets/index/menu/hkys.png"),
          "route": "hkys"
        },
        {
          "id": "12",
          "title": "铁路运输运行监测",
          "icon": require("./assets/index/menu/tlys.png"),
          "route": "tlys"
        },
        {
          "id": "13",
          "title": "公路运输运行监测",
          "icon": require("./assets/index/menu/glys.png"),
          "route": "glys"
        },
        {
          "id": "14",
          "title": "新能源车运行监测",
          "icon": require("./assets/index/menu/xnyc.png"),
          "route": "xnyc"
        },
        {
          "id": "15",
          "title": "分时租赁车辆",
          "icon": require("./assets/index/menu/fszlcl.png"),
          "route": "fszlcl"
        },
        {
          "id": "16",
          "title": "重点设施运行监测",
          "icon": require("./assets/index/menu/zdss.png"),
          "route": "zdss"
        },
        {
          "id": "17",
          "title": "行业静态信息监测",
          "icon": require("./assets/index/menu/hyjtxx.png"),
          "route": "hyjtxx"
        },
        {
          "id": "18",
          "title": "驾培维修运行监测",
          "icon": require("./assets/index/menu/jpwx.png"),
          "route": "jpwx"
        }

      ],
      //专题检测
      ztjc:[{
          "id": "19",
          "title": "共享单车服务分析",
          "icon": require("./assets/index/menu/hyjtxx.png"),
          "route": "/specialSubjectAnalysis/majorActivitiesIndex"
      },
      {
        "id": "20",
        "title": "地面公交运行专题分析",
        "icon": require("./assets/index/menu/jpwx.png"),
        "route": "/specialSubjectAnalysis/groundBusOperationIndex"
      },
      {
        "id": "21",
        "title": "重大活动专题监测",
        "icon": require("./assets/index/menu/fszlcl.png"),
        "route": "/specialSubjectAnalysis/shareBikeServiceIndex"
      }
    ]
    }
    

  },
  mutations: {

  },
  actions: {

  }
})
