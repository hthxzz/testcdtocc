import Vue from 'vue'
import Router from 'vue-router'
import {
  store
} from "../store/index";
Vue.use(Router)

import monitoringAndEarlyWarn from "./subRouters/monitoringAndEarlyWarn";
import emergencyCoordination from "./subRouters/emergencyCoordination";
import specialSubjectAnalysis from "./subRouters/specialSubjectAnalysis";
import assistantDecision from "./subRouters/assistantDecision";
import informationPublish from "./subRouters/informationPublish";
import test from "./subRouters/test";
import {
  login
} from "@/request/axios";
import {
  setItem,
  getItem
} from "@/untils/storage";
import request from "@/request/axios";
if (process.env.NODE_ENV == "development") {
  // setItem("loginToken",'8789a411383f42bf8adc0c09a631acee@sso')
  login();
} else {
  let url = window.location.href.split("?");
  if (url.length > 1) {
    for (var i = 1; i < url.length; i++) {
      var a = url[i].split('&');
      for (var j = 0; j < a.length; j++) {
        if (a[j].indexOf('loginToken') > -1) {
          var b = a[j].split('=');
          setItem("loginToken", decodeURIComponent(b[1].toString()));
        }
        if (a[j].indexOf('userId') > -1) {
          var c = a[j].split('=');
          setItem("userId", decodeURIComponent(c[1].toString()));
        }
      }

    }
  }
}
var params = {};
params.access_code = '57119669042A428AB337980C7B96F8F7';

params.token = getItem("loginToken");
params.loginToken = getItem("loginToken");
params.topFuncId = "SYS-CDJTWYXJCXT";
params.parentFuncId = "SYS-CDJTWYXJCXT";

const tem = [];
tem.push(monitoringAndEarlyWarn);
tem.push(emergencyCoordination);
tem.push(specialSubjectAnalysis);
tem.push(assistantDecision);
tem.push(informationPublish);
// 所有人都能够访问的页面
const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
  },

  {
    path: '/test1',
    name: 'test1',
    component: () => import( /* webpackChunkName: "about" */ '../test/test1.vue')
  },
  {
    path: '/testAddForm',
    name: 'testAddForm',
    component: () => import( /* webpackChunkName: "about" */ '../test/testAddForm.vue')
  },
  {
    path: '/maptest',
    name: 'maptest',
    component: () => import('../components/common/map/clientMap.vue')
  },
  // {
  //   path: '',
  //   name: 'index',
  //   redirect: '/index',
  //   component: () => import('../views/layOut/mainPage.vue'),
  //   // component: () => import('../views/index/index.vue')
  //   children: [{
  //       path: '/index',
  //       component: () => import('../views/index/index.vue')
  //     },
  //     ...tem
  //   ]
  //
  // },
  // {
  //   path: '/index2',
  //   name: 'index2',
  //   redirect: '/index2',
  //   component: () => import('../views/layOut/mainPage2.vue'),
  //   children: [{
  //       path: '/index2',
  //       component: () => import('../views/index/index.vue')
  //     },
  //     ...tem
  //   ]

  // },
  // {
  //   path: '/SpringFestivalSpecial',
  //   name: 'SpringFestivalSpecial',
  //   component: () => import('../views/specialSubjectAnalysis/SpringFestivalSpecial/index.vue')
  // }
];
// 为路由加入固定路由
// routes.push(constantRoutes);
// 监测预警
// routes.push(monitoringAndEarlyWarn);
// 应急协同
// routes.push(emergencyCoordination);
// // 专题分析
// routes.push(specialSubjectAnalysis);
// // 辅助决策
// routes.push(assistantDecision);
// routes.push(informationPublish);
// 测试页面
// routes.push(test);
const router = new Router({
  routes,
  linkActiveClass: 'leftMenuActive',
})
// router.addRoutes();
router.beforeEach((to, from, next) => {
  if (getIsLogon()) {
    if (to.name == 'taxi') {
      window.open("https://cdtocc.paircity.com:20443/cdtocc/#/logDirectly?username=tocc_bdqf&password=123456", "_blank ");
    } else {
      next();
    }
  } else {
    setItem("loginToken", '');
    window.location = "http://192.167.252.252:8080/TSSOWeb/login.action"
  }
  window._axiosPromiseArr.forEach((ele, index) => {
    ele.cancel() // 路由跳转之前，清空（终止）上一个页面正在请求的内容
    // 清空请求的参数 清空请求的参数
    delete window._axiosPromiseArr[index]
  })
})

getData();
async function getUserId() {
  await request.$getsso("ssoService/getUserId", params).then((param) => {
    setItem("userId", param.text);
  });
}
async function getData() {
  if (!await getIsLogon()) return;
  await getUserId();
  var data = [];
  params.userId = getItem("userId");
  request.$getsso("ssoService/getAllAuthByTree", params).then((param) => {
    var tem = [];
    if (param.length > 0) {
      for (var i = 0; i < param.length; i++) {
        if (param[i].appFunction.funcId == "SYS-CDJTWYXJCXT-GNCD") {}
        data = param[i].children;
        break;
      }
    }
    if (data.length > 0) {
      for (var i = 0; i < data.length; i++) {
        var a = setRouts(data[i], '');
        a.path = '/' + a.path;
        tem.push(a);
      }
    }
    if (tem.length == 0) return;
    setItem('caidan', JSON.stringify(tem));
    var routes = [];
    var route = {
      path: '',
      name: tem[0].name,
      redirect: tem[0].children ? tem[0].path + '/' + tem[0].children[0].path : tem[0].path,
      component: () => import('../views/layOut/mainPage.vue'),
      //   // component: () => import('../views/index/index.vue')
      children: tem,
    }
    routes.push(route);
    router.addRoutes(routes);
    console.log(route);

    // router.addRoutes([
    //   {
    //     path: '',
    //     name: 'index',
    //     redirect: '/SYS-CDJTWYXJCXT-GNCD-XTSY',
    //     component: () => import('../views/layOut/mainPage.vue'),
    //     //   // component: () => import('../views/index/index.vue')
    //     children: [{
    //       path: '/SYS-CDJTWYXJCXT-GNCD-XTSY',
    //       name: 'SYS-CDJTWYXJCXT-GNCD-XTSY',
    //       component: () => import('../views/index/index.vue')
    //
    //     }, {
    //         path: '/SYS-CDJTWYXJCXT-GNCD-JCYJ',
    //         name: '/SYS-CDJTWYXJCXT-GNCD-JCYJ',
    //       component: () => import('@/views/layOut/GlobleBaseLayOut.vue'),
    //         children:[{
    //           path:'SYS-CDJTWYXJCXT-GNCD-JCYJ-GGJT',
    //           name:'SYS-CDJTWYXJCXT-GNCD-JCYJ-GGJT',
    //           component: () => import('@/views/monitoringAndEarlyWarning/busOperationMonitor/HomePage/HomePageIndex.vue')
    //         }]
    //         // component: () => import('../views/index/index.vue')
    //       },
    //
    //     ]
    //
    //   }])
  });
}

function setRouts(data, baseUrl) {
  baseUrl += '/' + data.appFunction.methodName;
  var a = {};

  a.path = data.appFunction.methodName;
  a.name = data.appFunction.methodName;
  a.fullPath = baseUrl;
  if (data.appFunction.remark == "redirect" && data.children != null && data.children.length > 0) {
    // a.redirect=data.appFunction.remark;
    a.redirect = baseUrl + '/' + data.children[0].appFunction.methodName;
  }
  if (data.appFunction.url != null && data.appFunction.url != "") {
    a.component = () => import('@/views/' + data.appFunction.url);

  }
  var meta = {
    title: data.appFunction.funcName,
    icon: data.appFunction.icon != null && data.appFunction.icon != "" ? data.appFunction.icon : ""
  }
  a.meta = meta;
  if (data.children != null && data.children.length > 0) {
    a.children = [];
    for (var i = 0; i < data.children.length; i++) {
      a.children.push(setRouts(data.children[i], baseUrl))
    }
  }
  return a;
}
async function getIsLogon() {
  let islogon = false;
  try {
    await request.$getsso("ssoService/isLogonByToken", params).then((param) => {
      islogon = param;
    });
  } catch (e) {
    window.location = "http://192.167.252.252:8080/TSSOWeb/login.action"
  }

  return islogon;
}
export default router;