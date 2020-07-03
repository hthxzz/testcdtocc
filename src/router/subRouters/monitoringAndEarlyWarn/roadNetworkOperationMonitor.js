export default [{
    path: 'roadNetworkOperationMonitor', //辅助决策 --- 运行监测
    name: 'roadNetworkOperationMonitor',
    redirect: "/monitoringAndEarlyWarn/roadNetworkOperationMonitor/operationMonitor",
    meta: {
        title: "路网运行",
        icon: require("@/assets/index/menu/lwyx.png"),
    },
    component: () => import('@/views/layOut/root/FirstLayout.vue'),
    children: [{
            path: 'operationMonitor', //路网运行监测 --- 运行监测
            name: 'operationMonitor',
            meta: {
                title: "运行监测",
                icon: require("@/image/common/leftmenu/yxjc.png"),
            },
            component: () => import('@/views/monitoringAndEarlyWarning/roadNetworkRunMonitor/operationMonitor/OperationMonitor.vue')
        },
        {
            path: 'roadNetworkQuery', //路网运行监测 --- 路网查询
            name: 'roadNetworkQuery',
            meta: {
                icon: require("@/image/common/leftmenu/jcss.png"),
                title: "路网查询"
            },
            component: () => import('@/views/monitoringAndEarlyWarning/roadNetworkRunMonitor/roadNetworkQuery/RoadNetworkQuery.vue')
        }, {
            path: 'roadNetworkEvent', //路网运行监测 --- 路网事件
            name: 'roadNetworkEvent',
            meta: {
                icon: require("@/image/common/leftmenu/lwsj.png"),
                title: "路网事件"
            },
            component: () => import('@/views/monitoringAndEarlyWarning/roadNetworkRunMonitor/roadNetworkEvent/RoadNetworkEvent.vue')
        }, {
            path: 'statisticalAndanalysis', //路网运行监测 --- 统计分析
            name: 'statisticalAndanalysis',
            meta: {
                icon: require("@/image/common/leftmenu/tjfx.png"),
                title: "统计分析"
            },
            component: () => import('@/views/monitoringAndEarlyWarning/roadNetworkRunMonitor/statisticalAndanalysis/StatisticalAndanalysis.vue')
        }, {
            path: 'congestionPrediction', //路网运行监测 --- 拥堵预测
            name: 'congestionPrediction',
            meta: {
                icon: require("@/image/common/leftmenu/ydyc.png"),
                title: "拥堵预测"
            },
            component: () => import('@/views/monitoringAndEarlyWarning/roadNetworkRunMonitor/congestionPrediction/CongestionPrediction.vue')
        }, {
            path: 'inforManage', //路网运行监测 --- 信息管理
            name: 'monitoringAndEarlyWarning_roadNetworkRunMonitor_inforManage',
            meta: {
                icon: require("@/image/common/leftmenu/xxgl.png"),
                title: "信息管理"
            },
            component: () => import('@/views/monitoringAndEarlyWarning/roadNetworkRunMonitor/inforManage/InforManage.vue')
        }
    ]
}]